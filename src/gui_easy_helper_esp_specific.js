
helpEasy.int32binaryBool = function (obj, int, names, base, emptyString = "_emptyBit", length = 32) {
    let string = (int >>> 0).toString(2);
    //pad with zeros to make sure you got the correct number of 1/0 (MAX 64 int supported by the function
    string = ("0000000000000000000000000000000000000000000000000000000000000000" + string).slice(-length);
    let array = string.split("");
    for (let i = (array.length - 1); i > -1; i--) {
        let path = emptyString + i;
        if (names[i] !== undefined) {
            path = names[i];
        }
        set(obj, base + path, parseInt(array[i]));
    }
};

//should be async + await fetch
helpEasy.getDataFromNode = function (array, index, endpoint, ttl_fallback) {
    array[index]["scheduler"].shift();
    let timeStart = Date.now();
    let path = "http://" + array[index].ip + "/" + endpoint + "?callback=" + timeStart;
    let nextRun = Date.now() + array[index].stats[endpoint].TTL_fallback;
    fetch(path)
        .then(res => res.json())
        .then((dataFromFile) => {
                array[index]["live"][endpoint] = dataFromFile;
                array[index]["live"][endpoint].timestamp = Date.now();
                if (dataFromFile.TTL !== undefined) {
                    //array[index]["live"][endpoint].TTL = dataFromFile.TTL;
                } else {
                    array[index]["live"][endpoint].TTL = ttl_fallback;
                }
                //TODO: fix the TTL level on the logjson endpoint
                if (endpoint === "logjson" && dataFromFile.Log.TTL !== undefined) {
                    array[index]["live"][endpoint].TTL = dataFromFile.Log.TTL;
                }
                //TODO: The if above is not needed if we move the TTL for the log to its correct place.
                if (endpoint === "logjson") {
                    if (array[index]["log"] === undefined) {
                        array[index]["log"] = [];
                    }
                    array[index]["log"].push({
                        "entries": array[index]["live"][endpoint].Log.Entries,
                        "timestamp": Date.now()
                    });
                }
                array[index]["live"][endpoint].TTL_fallback = ttl_fallback;
                nextRun = Date.now() + array[index]["live"][endpoint].TTL;
                array[index].stats.error = 0;
            }
        )
        .catch(error => {
            helpEasy.addToLogDOM('Error fetching (' + endpoint + '): ' + error, 0, "error");
            array[index].stats.error++;
            guiEasy.fetchCount.error++;
        });
    array[index]["scheduler"].push([nextRun, endpoint]);
    array[index]["scheduler"].sort();
    array[index].stats["lastRun"] = Date.now();
    array[index].stats[endpoint].run = Date.now() - timeStart;
    array[index].stats[endpoint].timestamp = Date.now();
    guiEasy.fetchCount.current++;
    if (guiEasy.fetchCount.current === guiEasy.fetchCount.max) {
        guiEasy.current.live = index;
    }
};

helpEasy.fetchConfigDat = function (array, index, updateBrowserSettings = true) {
    let timeStart = Date.now();
    //part of ppisljar's code
    let datFile = ["config.dat", "notification.dat", "security.dat"];
    let path_config = "http://" + array[index].ip + "/" + datFile[0] + "?callback=" + timeStart;
    let path_notice = "http://" + array[index].ip + "/" + datFile[1] + "?callback=" + timeStart;
    let path_security = "http://" + array[index].ip + "/" + datFile[2] + "?callback=" + timeStart;
    //TODO: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    fetch(path_config)
        .then(res => res.arrayBuffer())
        .then(async (res) => {
            let x = helpEasy.parseConfigDat;
            let z = guiEasy.configDat;
            const settings = x(res, z.configDatParseConfig);

            [...Array(guiEasy.maxTasks())].map((x, i) => {
                x = helpEasy.parseConfigDat;
                settings.tasks[i].settings = x(res, z.taskSettings, 1024*4 + 1024 * 2 * i);
                settings.tasks[i].extra = x(res, z.taskSettings, 1024*5 + 1024 * 2 * i);
            });

            [...Array(guiEasy.maxController())].map((x, i) => {
                x = helpEasy.parseConfigDat;
                settings.controllers[i].settings = x(res, z.controllerSettings, 1024*27 + 1024 * 2 * i);
                settings.controllers[i].extra = x(res, z.controllerSettings, 1024*28 + 1024 * 2 * i);
            });

            const notificationResponse = await fetch(path_notice).then(res => res.arrayBuffer());
            [...Array(guiEasy.maxNotification())].map((x, i) => {
                x = helpEasy.parseConfigDat;
                settings.notifications[i].settings = x(notificationResponse, z.notificationSettings, 1024 * i);
            });

            //Only one setup of security is allowed for now (array length = 1)...
            const securityResponse = await fetch(path_security).then(res => res.arrayBuffer());
            settings.security = [...Array(1)].map((x, i) => {
                x = helpEasy.parseConfigDat;
                return x(securityResponse, z.securitySettings, 1024 * i);
            });

            array[index].settings = Object.assign({}, settings);
            array[index].settings.timestamp = timeStart;

            guiEasy.configDat.variousBits();
            guiEasy.configDat.dst("start");
            guiEasy.configDat.dst("end");

            if (updateBrowserSettings === true) {
                array[index].settingsBrowser = Object.assign({}, settings);
                array[index].settingsBrowser.timestamp = timeStart;
            }

            guiEasy.current.config = index;
            array[index].stats["lastRun"] = Date.now();
            if (array[index].stats["configDat"] === undefined) {
                array[index].stats["configDat"] = {};
            }
            array[index].stats["configDat"].run = Date.now() - timeStart;
            array[index].stats["configDat"].timestamp = timeStart;
        })
        .catch(error => {
            helpEasy.addToLogDOM('Error fetching (config.dat): ' + error, 0, "error");
            array[index].stats.error++;
            let nextRun = Date.now() + array[index].stats[endpoint].TTL_fallback;
            array[index]["scheduler"].push([nextRun, endpoint]);
            array[index]["scheduler"].sort();
            array[index].stats["lastRun"] = Date.now();
            array[index].stats["configDat"].run = Date.now() - timeStart;
            array[index].stats["configDat"].timestamp = Date.now();
            guiEasy.fetchCount.error++;
        });
};

helpEasy.parseConfigDat = function (data, config, start) {
    //part of ppisljar's code
    const p = new DataParser(data);
    if (start) p.offset = start;
    const result = {};
    config.map(value => {
        const prop = value.length ? value.length : value.signed;
        set(result, value.prop, p[value.type](prop, value.signed));
    });
    return result;
};

helpEasy.setupDropdownList = function (type) {
    let node = guiEasy.nodes[helpEasy.getCurrentIndex()].live.buildinfo;
    let all = guiEasy.list;
    let list = [];
    let fullList = {};
    let dropdownList = {};
    dropdownList.start = "<span>";
    dropdownList.html_nostate = "<select id='" + type + "-dropdown-list' onchange='guiEasy.forms.setupForm(\"" + type + "\");'>";
    dropdownList.html_default = "<select id='" + type + "-dropdown-list' onchange='guiEasy.forms.setupForm(\"" + type + "\");'>";
    dropdownList.html_stripped = "<select id='" + type + "-dropdown-list' onchange='guiEasy.forms.setupForm(\"" + type + "\");'>";
    if (type === "task") {
        list = node.plugins;
        fullList = all.plugin;
        dropdownList.start += helpEasy.capitalWord("plugin");
    }
    if (type === "controller") {
        list = node.controllers;
        fullList = all.controller;
        dropdownList.start += helpEasy.capitalWord("controller");
    }
    if (type === "notification") {
        list = node.notifications;
        fullList = all.notification;
        dropdownList.start += helpEasy.capitalWord("notifier");
    }
    dropdownList.start += "</span>";
    for (let i = 0; i < list.length; i++) {
        let number = list[i].id;
        fullList[number].active = true;
    }
    let keys = Object.keys(fullList);
    for (let k = 0; k < keys.length; k++) {
        let key = keys[k];
        dropdownList.html_nostate += "<option value='" + key + "'";
        dropdownList.html_default += "<option value='" + key + "'";
        if (fullList[key].active !== undefined && key !== "0") {
            dropdownList.html_stripped += "<option value='" + key + "'";
        }
        if (fullList[key].active === undefined && key !== "0") {
            dropdownList.html_nostate += " disabled";
            dropdownList.html_default += " disabled";
        }
        if (key === "0") {
            dropdownList.html_nostate += ">" + helpEasy.capitalWord(fullList[key].name);
            dropdownList.html_default += ">" + helpEasy.capitalWord(fullList[key].name);
            dropdownList.html_stripped +=  "<option value='" + key + "'>" + helpEasy.capitalWord(fullList[key].name) + "</option>";
        }
        let denied = "";
        if (fullList[key].active === undefined && key !== "0") {
            denied = "⛔ ";
        }
        if (key !== "0") {
            dropdownList.html_nostate += ">" + denied + helpEasy.capitalWord(fullList[key].category) + " - " + helpEasy.capitalWord(fullList[key].name);
            if (fullList[key].state === "") {
                dropdownList.html_default += ">" + denied + helpEasy.capitalWord(fullList[key].category) + " - " + helpEasy.capitalWord(fullList[key].name);
            } else {
                dropdownList.html_default += ">" + denied + helpEasy.capitalWord(fullList[key].category) + " - " + helpEasy.capitalWord(fullList[key].name) + " [" + fullList[key].state.toUpperCase() + "] 🔺";
            }
        }
        if (fullList[key].active !== undefined && key !== "0") {
            dropdownList.html_stripped +=  ">" + helpEasy.capitalWord(fullList[key].category) + " - " + helpEasy.capitalWord(fullList[key].name) + "</option>";
        }
        dropdownList.html_nostate += "</option>";
        dropdownList.html_default += "</option>";
    }
    dropdownList.html_nostate += "</select>";
    dropdownList.html_default += "</select>";
    dropdownList.html_stripped += "</select>";
    dropdownList.end = "<label class='select' for='" + type + "-dropdown-list'></label>";
    return dropdownList;
};

helpEasy.wifilist = function (wifiArray, index) {
    let html = `
                <div data-modal-table="wifi" class="container modal-table" id="wifilist">
                <table>
                <tr>
                    <th class="header">SSID</th>
                    <th class="header">BSSID</th>
                    <th class="header">Ch</th>
                    <th class="header">Signal</th>
                </tr>
         `;
    let sameSSID = "";
    let sameBSSID = [];
    let sameChannel = [];
    let sameRSSI = [];
    let sorted = wifiArray.sort(helpEasy.sortObjectArray("SSID"));
    for (let i = 0; i < sorted.length; i++) {
        sameSSID = sorted[i].SSID;
        sameBSSID.push(sorted[i].BSSID);
        sameChannel.push(sorted[i].Channel);
        sameRSSI.push(sorted[i].RSSI);
        if (i < (sorted.length - 1) && sorted[i].SSID === sorted[(i + 1)].SSID) {
            //
        } else {
            html += "<tr><td>" + sameSSID + "</td><td class='text-little'>";
            for (let i = 0; i < sameBSSID.length; i++) {
                if (sameBSSID[i] === guiEasy.nodes[helpEasy.getCurrentIndex()].live.json.WiFi.BSSID) {
                    html += "<div class='text-main-bg'>" + sameBSSID[i] + "</div>";
                } else {
                    html += sameBSSID[i];
                }
                if (i !== (sameBSSID.length - 1)) {
                    html += "<hr>";
                } else {
                    html += "</td><td class='text-little'>";
                }
            }
            for (let i = 0; i < sameChannel.length; i++) {
                html += sameChannel[i];
                if (i !== (sameChannel.length - 1)) {
                    html += "<hr>";
                } else {
                    html += "</td><td class='text-little'>";
                }
            }
            for (let i = 0; i < sameRSSI.length; i++) {
                html += "<div class='got-tooltip hidden-tooltip'>";
                html += helpEasy.rssiToSVG(sameRSSI[i]);
                if (i !== (sameRSSI.length - 1)) {
                    html += "<div class='tooltip text-tiny'>" + sameRSSI[i] + " dBm</div></div><hr>";
                } else {
                    html += "<div class='tooltip text-tiny'>" + sameRSSI[i] + " dBm</div></div></td></tr>";
                }
            }
            sameSSID = "";
            sameBSSID = [];
            sameChannel = [];
            sameRSSI = [];
        }
    }
    html += `
                </table>
                <div class='text-tiny is-left'>` + wifiArray.length + ` separate APs found</div>
                <div class='text-tiny is-left'>Fetched: ` + helpEasy.epochToHHMMSS(wifiArray.timestamp) + `</div>
                <div class='text-tiny is-left'>Scheduled: ` + helpEasy.epochToHHMMSS(wifiArray.timestamp + wifiArray.TTL) + `</div>
                </div>
                `;
    set(guiEasy.nodes[index], "modal.table.wifi", html);
};

helpEasy.filelist = function (filelistArray, index) {
    let noDeleteFile = ["notification.dat","config.dat","security.dat"];
    let deletingFile = guiEasy.nodes[helpEasy.getCurrentIndex()].deleteFile;
    guiEasy.nodes[helpEasy.getCurrentIndex()].deleteFile = null;
    let html = `
                <div data-modal-table="files" class="container modal-table" id="filelist">
                <table>
                <tr>
                    <th class="header">File Name</th>
                    <th class="header">Size</th>
                </tr>
         `;
    let sorted = filelistArray.sort(helpEasy.sortObjectArray("fileName"));
    for (let i = 0; i < sorted.length; i++) {
        let rowInactive = "";
        if (deletingFile === sorted[i].fileName) {
            rowInactive = "class='is-inactive'";
        }
        html += `
                    <tr ` + rowInactive + ` id="` + sorted[i].fileName + `">
                    <td><button
                        class="main-inverted"
                        onclick="helpEasy.downloadFile('http://` + guiEasy.nodes[helpEasy.getCurrentIndex()].ip + `/`
            + encodeURI(sorted[i].fileName) + `','` + sorted[i].fileName + `');">`
            + sorted[i].fileName +
            `</button>`;
        if (noDeleteFile.indexOf(sorted[i].fileName) === -1) {
            html += `    
                    <button
                        class="main-warning file-action"
                        data-click="delete-file"
                        data-filename="` + sorted[i].fileName + `"">
                        ` + guiEasy.curly.icon(["trash"]) + `
                    </button>
                   `;
        }
        html += `
                    </td>
                    <td>
                        ` + (Math.floor(sorted[i].size / 1024 *10) / 10) + `kB
                    </td>
                    </tr>
            `;
    }
    html += "</table></div>";
    set(guiEasy.nodes[index], "modal.table.files", html);
};

helpEasy.logListBacklog = function (iStart) {
    let listHTML = "";
    let level = {
        "1":"success",
        "2":"bg",
        "3":"sunny",
        "4":"info",
        "5":"",      //not used
        "6":"",      //not used
        "7":"",      //not used
        "8":"",      //not used
        "9":"warning"
    };
    let history = guiEasy.nodes[helpEasy.getCurrentIndex()].log;
    if (history === undefined) {
        guiEasy.nodes[helpEasy.getCurrentIndex()].stats.logjson.timestampLast = 0;
        return "";
    }
    history = history.slice(-3000);             // Slice to only populate the last 3000 chunks of log data
    if (iStart === undefined) {
        iStart = 0;
    }
    for (let i = iStart; i < history.length; i++) {
        let timestamp = history[i].timestamp;
        let entries = history[i].entries;
        let id = "";
        let idToScroll = "";
        if (entries.length > 0) {
            for (let k = 0; k < entries.length; k++) {
                //add to list
                let random = ("0000" + Math.floor(Math.random() * 1000)).slice(-4);
                id = Date.now() + "-" + entries[k].timestamp + "-" + random;
                let hidden = "";
                if (guiEasy.loops.weblogPattern !== undefined) {
                    if (guiEasy.loops.weblogPattern.length > 0) {
                        //must check if the entry should be hidden
                        let check = helpEasy.ifStringContains(entries[k].text.toLowerCase() + " " + entries[k].timestamp, guiEasy.loops.weblogPattern);
                        if (check === false) {
                            hidden = "is-hidden";
                        }
                    }
                }
                if (hidden === "") {
                    idToScroll = id;
                }
                listHTML += `<div class='entry ` + hidden + `' id='` + id + `'
                                 data-web-log-text="` + entries[k].text + `"
                                 data-web-log-level="` + entries[k].level + `"
                                 data-web-log-timestamp="` + timestamp + `"
                              >
                                 <div class='timestamp'>` + entries[k].timestamp + `</div>
                                 <div class='main-` + level[entries[k].level] + `'>` + entries[k].text + `</div>
                             </div>`;
            }
            guiEasy.nodes[helpEasy.getCurrentIndex()].stats.logjson.timestampLast = timestamp;
            guiEasy.nodes[helpEasy.getCurrentIndex()].stats.logjson.lastEntryID = idToScroll;
        }
    }
    return listHTML;
};

helpEasy.logListLive = function (timestampIN) {
    let logList = guiEasy.nodes[helpEasy.getCurrentIndex()].log;
    if (logList === undefined) {
        return "";
    }
    logList = logList.slice(-3000);
    let fromTimestamp = 0;
    for (let i = (logList.length - 1); i > -1; i--) {
        let timestamp = logList[i].timestamp;
        if (timestamp > timestampIN) {
            fromTimestamp = i;
            break;
        }
        if (i === 0) {
            return "";
        }
    }
    return helpEasy.logListBacklog(fromTimestamp);
};

helpEasy.timingstatsList = function (timingArray, index) {
    let unsorted = [];
    let endpoints = ["plugin", "controller", "misc"];
    for (let k = 0; k < endpoints.length; k++) {
        let x = timingArray[endpoints[k]];
        for (let i = 0; i < x.length; i++) {
            let func = x[i]["function"][0];
            let keys = Object.keys(func);
            for (let j = 0; j < keys.length; j++) {
                unsorted.push(
                    {
                        "sortValue": parseFloat(func[keys[j]].avg),
                        "name": x[i].name,
                        "subKey": keys[j],
                        "subLevels": keys.length,
                        "type": endpoints[k].slice(0,1).toUpperCase(),
                        "id": x[i].id,
                        "avg": func[keys[j]].avg,
                        "count": func[keys[j]].count,
                        "call-per-sec": func[keys[j]]["call-per-sec"],
                        "min": func[keys[j]].min,
                        "max": func[keys[j]].max,
                        "unit": func[keys[j]].unit
                    }
                );
            }
        }
    }
    let sorted = unsorted.sort(helpEasy.sortObjectArray("sortValue"));
    let html = `
                <div data-modal-table="timingstats_json" class="container modal-table" id="timingstats_json">
                <table class="is-left">
                <tr>
                    <th class="header">Type</th>
                    <th class="header is-left">Timer</th>
                    <th class="header">Process</th>
                </tr>
         `;
    for (let i = (sorted.length - 1); i > -1; i--) {
        let extraRow = "";
        if (sorted[i].subLevels > 1) {
            extraRow = "<hr>" + sorted[i].subKey;
        }
        html += `
                    <tr class="text-little">
                    <td>
                        ` + sorted[i].type + ("000" + sorted[i].id).slice(-3) + `
                    </td>
                    <td class="got-tooltip hidden-tooltip">
                        ` + sorted[i].sortValue + `
                        <div class="tooltip is-left">
                            avg: ` + sorted[i].avg + `<br>
                            min: ` + sorted[i].min + `<br>
                            max: ` + sorted[i].max + `<br>
                            count: ` + sorted[i].count + `<br>
                            per sec: ` + sorted[i]["call-per-sec"] + `
                        </div>
                    </td>
                    <td>
                        ` + sorted[i].name + extraRow + `
                    </td>
                    </tr>
            `;
    }
    html += `
                </table>
                <div class='text-tiny is-left'>Fetched: ` + helpEasy.epochToHHMMSS(timingArray.timestamp) + `</div>
                <div class='text-tiny is-left'>Scheduled: ` + helpEasy.epochToHHMMSS(timingArray.timestamp + timingArray.TTL) + `</div>
                </div>
                `;
    set(guiEasy.nodes[index], "modal.table.timingstats_json", html);
};

helpEasy.guiUpdater = function () {
    let timeStart = Date.now();
    let index = helpEasy.getCurrentIndex();
    let x = guiEasy.nodes[index];
    if (guiEasy.jsonPathsIN === undefined) {
        guiEasy.jsonPathsIN = [];
    }
    let y = guiEasy.jsonPathsIN;
    for (let i = 0; i < y.length; i++) {
        let z = document.querySelectorAll("[data-json-path='" + y[i] + "']");
        for (let k = 0; k < z.length; k++) {
            let path = y[i].split("--");
            for (let u = 0; u < path.length; u++) {
                if (z[k].innerHTML !== helpEasy.getjsonPathData(path, x)) {
                    z[k].innerHTML = helpEasy.getjsonPathData(path, x);
                }
            }
        }
    }
    //update tab text
    //TODO: make it possible to have live data feed on tab
    let path = ("live--json--System--Unit Name").split("--");
    document.title = helpEasy.getjsonPathData(path, x);
    //update wifi icon(s)
    path = ("live--json--WiFi--RSSI").split("--");
    let bars = helpEasy.rssiToBars(helpEasy.getjsonPathData(path, x));
    let z = document.querySelectorAll("[name=unit-wifi-rssi-icon]");
    for (let i = 0; i < z.length; i++) {
        z[i].classList.remove("level-1","level-2","level-3","level-4","level-5");
        z[i].classList.add(bars);
    }
    //update system gauges
    z = document.querySelectorAll("[data-json-path-gauge]");
    for (let i = 0; i < z.length; i++) {
        helpEasy.gaugeLevel(z[i], x);
    }
    //update wifi modal path                                //TODO: consolidate these since they are essentially equal
    if (x.live.wifiscanner_json !== undefined) {
        helpEasy.wifilist(x.live.wifiscanner_json, index);
    } else {
        let pendingText = "<div data-modal-table='wifi' class='container modal-table'>" + guiEasy.fetchingWait + "</div>";
        set(guiEasy.nodes[index], "modal.table.wifi", pendingText);
    }
    //update files modal path
    if (x.live.filelist_json !== undefined) {
        helpEasy.filelist(x.live.filelist_json, index);
    } else {
        let pendingText = "<div data-modal-table='files' class='container modal-table'>" + guiEasy.fetchingWait + "</div>";
        set(guiEasy.nodes[index], "modal.table.files", pendingText);
    }
    //update sysinfo modal path
    if (x.live.sysinfo_json !== undefined) {
        helpEasy.twoLevelJsonToList("sysinfo_json", index);
    } else {
        let pendingText = "<div data-modal-table='sysinfo_json' class='container modal-table'>" + guiEasy.fetchingWait + "</div>";
        set(guiEasy.nodes[index], "modal.table.sysinfo_json", pendingText);
    }
    //update timingstats modal path
    if (x.live.timingstats_json !== undefined) {
        helpEasy.timingstatsList(x.live.timingstats_json, index);
    } else {
        let pendingText = "<div data-modal-table='timingstats_json' class='container modal-table'>" + guiEasy.fetchingWait + "</div>";
        set(guiEasy.nodes[index], "modal.table.timingstats_json", pendingText);
    }
    //update tables
    z = document.querySelectorAll("[data-modal-table]");
    for (let i = 0; i < z.length; i++) {
        let type = z[i].dataset.modalTable;
        let data = guiEasy.nodes[index].modal.table[type];
        let newInnerHTML = helpEasy.parseHTMLstring(data, "query", '[data-modal-table="' + type + '"]');
        if (z[i].innerHTML !== newInnerHTML) {
            z[i].innerHTML = newInnerHTML
        }
    }
    //task values update, and we need to clean up the non-live once if there's any
    let t = guiEasy.maxTasks();
    let v = guiEasy.maxValuesPerTask();
    x = guiEasy.nodes[index].live.json.Sensors;
    let valueMatrix = [...Array(t)].map(x =>Array(v).fill(""));
    let taskMatrix = [...Array(t)].fill("");
    for (let i = 0; i < x.length; i++) {
        let values = x[i].TaskValues;
        let controllers = x[i].DataAcquisition;
        let taskNumber = x[i].TaskNumber;
        let taskName = x[i].TaskName;
        let taskEnabled = x[i].TaskEnabled;
        let plugin = x[i].Type;
        let pluginNumber = "P" + ("000" + x[i]["taskNumber"]).slice(-3);
        let gpio = guiEasy.nodes[helpEasy.getCurrentIndex()].settings;
        if (gpio === undefined) {
            gpio = ""
        } else {
            gpio = gpio.tasks[(taskNumber-1)];
        }
        let gpios = [];
        for (let k = 1; k < 100; k++) {
            if (gpio["gpio"+k] === undefined) {
                continue;
            }
            if (gpio["gpio"+k] !== 0 && gpio["gpio"+k] !== 255) {
                gpios.push(gpio["gpio"+k]);
            }
        }
        if (gpios.length > 0) {
            gpio = gpios.join(", ");
        } else {
            gpio = "";
        }
        let arrayControllers = [];
        for (let k = 0; k < controllers.length; k++) {
            if (controllers[k].Enabled === "true") {
                if (controllers[k].IDX > 0) {
                    arrayControllers.push(controllers[k].Controller + " (" + controllers[k].IDX + ")");
                } else {
                    arrayControllers.push(controllers[k].Controller);
                }
            }
        }
        if (arrayControllers.length > 0) {
            controllers = arrayControllers.join(", ");
        } else {
            controllers = "";
        }
        taskMatrix[(taskNumber - 1)] = {
            "plugin": plugin,
            "port": "",
            "controller": controllers,
            "gpio": gpio,
            "enabled": taskEnabled,
            "name": taskName
        };
        for (let j = 0; j < values.length; j++) {
            let valueName = values[j].Name;
            let value = values[j].Value;
            let valueNumber = values[j].ValueNumber;
            let valueDecimals = values[j].NrDecimals;
            valueMatrix[(taskNumber - 1)][(valueNumber - 1)] = {
                "name": valueName,
                "value": value.toFixed(valueDecimals)
            }
        }
    }
    for (let i = 0; i < t; i++) {
        if (taskMatrix[i].name === undefined) {
            helpEasy.clearTaskValues(i);
            continue;
        }
        let pathT = "task-" + (i + 1) + "-";
        let keys = ["plugin", "port", "controller", "gpio"];
        for (let k = 0; k < keys.length; k++) {
            let keyPath = keys[k];
            if (taskMatrix[i][keyPath] !== "") {
                if (document.getElementById(pathT + keyPath).innerText !== taskMatrix[i][keyPath]) {
                    document.getElementById(pathT + keyPath).innerText = taskMatrix[i][keyPath];
                }
                document.getElementById(pathT + keyPath + "-row").classList.remove("is-hidden");
            }
        }
        //the name is on the values column
        if (document.getElementById(pathT + "name").innerText !== taskMatrix[i].name) {
            document.getElementById(pathT + "name").innerText = taskMatrix[i].name;
        }
        for (let j = 0; j < v; j++) {
            if (valueMatrix[i][j] === "" || valueMatrix[i][j].name === "") {
                helpEasy.clearTaskValues(i, j);
                continue;
            }
            let pathV = pathT + "value-" + (j + 1) + "-";
            document.getElementById(pathV + "row").classList.remove("is-hidden");
            if (taskMatrix[i].enabled === "true") {
                document.getElementById(pathV + "row").classList.remove("not-enabled");
            } else {
                document.getElementById(pathV + "row").classList.add("not-enabled");
            }
            if (j > 0) {
                document.getElementById(pathV + "hr").classList.remove("is-hidden");
            }
            if (document.getElementById(pathV + "name").innerText !== valueMatrix[i][j].name) {
                document.getElementById(pathV + "name").innerText = valueMatrix[i][j].name;
            }
            if (document.getElementById(pathV + "value").innerText !== valueMatrix[i][j].value) {
                document.getElementById(pathV + "value").innerText = valueMatrix[i][j].value;
            }
        }
    }
    //controller update

    //populate the stats
    guiEasy.current.gui = index;
    if (guiEasy.nodes[index].stats["gui"] === undefined) {
        guiEasy.nodes[index].stats["gui"] = {};
    }
    guiEasy.nodes[index].stats["gui"].run = Date.now() - timeStart;
    guiEasy.nodes[index].stats["gui"].timestamp = timeStart;
};

helpEasy.clearTaskValues = function (taskNumber, valueNumber = null) {
    let v = guiEasy.maxValuesPerTask();
    let s;
    let x = [];
    let h;
    let y = [];
    //set the innerText/HTML to ""
    if (valueNumber !== null) {
        for (let i = 1; i <= v; i++) {
            s = document.querySelectorAll("[id='task-" + (taskNumber+1) + "-value-" + (valueNumber+i) + "-name']");
            if (s.length > 0) {
                x.push([].slice.call(s));
            }
            s = document.querySelectorAll("[id='task-" + (taskNumber+1) + "-value-" + (valueNumber+i) + "-value']");
            if (s.length > 0) {
                x.push([].slice.call(s));
            }
            h = document.getElementById("task-" + (taskNumber+1) + "-value-" + (valueNumber+i) + "-hr");
            if (h !== null) {
                y.push(h);
            }
        }
        if (x.length > 0) {
            x.map(e => e.map(
                z => z.innerHTML = ""
            ));
        }
        if (y.length > 0) {
            y.map(e => e.classList.add("is-hidden"));
        }
    } else {
        s = document.querySelectorAll("[data-clear-task='" + (taskNumber + 1) + "']");
        if (s.length > 0) {
            x = [].slice.call(s);
        }
        if (x.length > 0) {
            x.map(e => e.innerHTML = "");
        }
        h = document.querySelectorAll("[data-clear-hr='" + (taskNumber + 1) + "']");
        if (h.length > 0) {
            y = [].slice.call(h);
        }
        if (y.length > 0) {
            y.map(e => e.classList.add("is-hidden"));
        }
        h = document.querySelectorAll("[data-hide-row='" + (taskNumber + 1) + "']");
        if (h.length > 0) {
            y = [].slice.call(h);
        }
        if (y.length > 0) {
            y.map(e => e.classList.add("is-hidden"));
        }
    }
};

helpEasy.uploadBinaryAsFile = function (what, file, elementID) {
    let uploadSpeed;  //This is a bogus value just to get the upload percentage until fetch have this natively!
    let maxSize;
    let endpoint;
    let label = document.getElementById("label-" + elementID);
    let labelText = label.innerText;
    if (what === "generic") {
        uploadSpeed = 35;  //this is an average speed for generic files
        endpoint = "/upload";
        maxSize = guiEasy.nodes[helpEasy.getCurrentIndex()].live.sysinfo_json.storage.spiffs_free;
    }
    if (what === "firmware") {
        helpEasy.schedulerDelay(guiEasy.nodes, helpEasy.getCurrentIndex(), 60 * 1000);
        uploadSpeed = 25;  //since the firmware is also written and not only uploaded the speed is a bit lower compared to the generic upload...
        endpoint = "/update";
        maxSize = guiEasy.nodes[helpEasy.getCurrentIndex()].live.sysinfo_json.storage.sketch_free;
    }
    maxSize = maxSize * 1000;
    if (maxSize < file.size) {
        label.innerText = helpEasy.capitalWord("file size too big!");
        helpEasy.blinkElement(label.id, "warning");
        setTimeout(function () {
            helpEasy.blinkElement(label.id, "warning");
        }, 500);
        setTimeout(function () {
            label.innerText = labelText;
        }, 750);
    } else {
        label.innerText = file.name;
        let timeout = 100;
        let fullUpload = file.size / uploadSpeed / timeout;
        let i = 0;
        let timer = setInterval(function () {
            i++;
            let percentage = Math.floor(i / fullUpload * 100);
            if (percentage > 100) {
                percentage = 100;
            }
            label.innerText = file.name + " (" + percentage + "%)";
        }, timeout);
        let formData = new FormData();
        formData.append("file", file);
        formData.append("name", what);
        formData.append("enctype", "multipart/form-data");
        let url = "http://" + guiEasy.nodes[helpEasy.getCurrentIndex()].ip + endpoint;
        fetch(url, {
            method : "POST",
            body: formData
        }).then(
            response => response.text()
        ).then(
            html => {
                clearInterval(timer);
                label.innerText = file.name + " (100%)";
                helpEasy.addToLogDOM(html, 3);
                setTimeout(function () {
                    helpEasy.blinkElement(label.id, "success");
                }, 500);
                if (what === "generic") {
                    setTimeout(function () {
                        helpEasy.schedulerBump(guiEasy.nodes[helpEasy.getCurrentIndex()].scheduler, "sysinfo_json");
                        helpEasy.schedulerBump(guiEasy.nodes[helpEasy.getCurrentIndex()].scheduler, "filelist_json");
                        label.innerText = labelText;
                        helpEasy.updateIndicator();
                    }, 900);
                }
                if (what === "firmware") {
                    helpEasy.schedulerBump(guiEasy.nodes[helpEasy.getCurrentIndex()].scheduler, "sysinfo_json");
                    let count = 30;
                    let countdown = setInterval(function () {
                        label.innerText = "Will reboot in " + count;
                        count--;
                        if (count < 1) {
                            clearInterval(countdown);
                            location.reload();
                        }
                    }, 1000);
                }
            }
        );
    }
};

helpEasy.updateIndicator = async function () {
    setTimeout(function () {
        let storage = guiEasy.nodes[helpEasy.getCurrentIndex()].live.sysinfo_json.storage;
        let availablePercentage = Math.floor(parseInt(storage.spiffs_free) / parseInt(storage.spiffs_size) * 100);
        let free = document.getElementById("modal-input-upload-storage-free");
        let occupied = document.getElementById("modal-input-upload-storage-occupied");
        free.style.width = availablePercentage + "%";
        free.innerText = parseInt(storage.spiffs_free) + "kB";
        occupied.style.width = (100 - availablePercentage) + "%";
        occupied.innerText = (parseInt(storage.spiffs_size) - parseInt(storage.spiffs_free)).toString() + "kB";
    }, 5000);
};

helpEasy.parseHTMLstring = function (string, parse, query) {
    //Will only return first object's inner html
    let temp = document.createElement( 'html' );
    temp.innerHTML = string;
    let results = "";
    if (parse === "tag") {
        results = temp.getElementsByTagName(query)[0].innerHTML.toString();
    }
    if (parse === "name") {
        results = temp.getElementsByName(query)[0].innerHTML.toString();
    }
    if (parse === "class") {
        results = temp.getElementsByClassName(query)[0].innerHTML.toString();
    }
    if (parse === "id") {
        results = temp.getElementById(query).innerHTML.toString();
    }
    if (parse === "query") {
        results = temp.querySelectorAll(query)[0].innerHTML.toString();
    }
    temp.remove();
    return results;
};

helpEasy.guiUpdaterSettings = function (type) {
    let x = guiEasy.nodes[helpEasy.getCurrentIndex()];
    let u = defaultSettings;
    let y = helpEasy.getGuiInFields();
    if (type === undefined) {
        type = "settings";
    } else {
        type = "settingsBrowser";
    }
    for (let i = 0; i < y.length; i++) {
        let z = document.querySelectorAll("[data-settings='" + y[i] + "']");
        for (let k = 0; k < z.length; k++) {
            let m = x;
            let path = (type + "--" + y[i]).split("--");
            if (y[i].split("--")[0] === "defaultSettings") {
                path = y[i].split("--").slice(1);
                m = u;
            }
            for (let u = 0; u < path.length; u++) {
                let d = z[k].dataset;
                //populate by type of setting
                if (d.type === "string") {
                    z[k].value = helpEasy.getjsonPathData(path, m);
                    if (d.settingsIp === "true") {
                        z[k].value = helpEasy.getjsonPathData(path, m).join(".");
                    }
                    if (d.valueIfBlank === z[k].value) {
                        z[k].value = "";
                    }
                }
                if (d.type === "dropdown") {
                    if (d.list2value === "true") {
                        let optionList = [];
                        for (let i = 0; i < z[k].options.length; i++) {
                            optionList.push(parseInt(z[k].options[i].value));
                        }
                        z[k].options.selectedIndex = optionList.indexOf(helpEasy.getjsonPathData(path, m)) - parseInt(z[k].dataset.optionListOffset);
                    } else {
                        if (helpEasy.getjsonPathData(path, m) === 255) {
                            z[k].options.selectedIndex = 0;
                        } else {
                            z[k].options.selectedIndex = helpEasy.getjsonPathData(path, m) - parseInt(z[k].dataset.optionListOffset);
                        }
                    }
                }
                if (d.type === "password") {
                    z[k].value = helpEasy.getjsonPathData(path, m);
                    if (d.valueIfBlank === z[k].value) {
                        z[k].value = "";
                    }
                }
                if (d.type === "number") {
                    z[k].value = helpEasy.getjsonPathData(path, m);
                }
                if (d.type === "toggle") {
                    z[k].checked = d["change-" + helpEasy.getjsonPathData(path, m)] === "true";
                    let label = document.getElementById("label-" + d.id);
                    if (d.gotTooltip === "") {
                        label.innerHTML = "<div>" + helpEasy.capitalWord(d[z[k].checked + "Text"]) + "</div>";
                    } else {
                        label.innerHTML = "<div class=" + d.gotTooltip + ">" + helpEasy.capitalWord(d[z[k].checked + "Text"]) + d.tooltip + "</div>";
                    }
                }
            }
        }
    }
};

helpEasy.gaugeLevel = function (gauge, jsonData) {
    let parent = gauge.parentNode;
    let currentValue = helpEasy.getjsonPathData(gauge.dataset.jsonPathGauge.split("--"), jsonData);
    let max = parseInt(gauge.dataset.max);
    let min = parseInt(gauge.dataset.min);
    let minPosition = 574.5;
    let maxPosition = 0;
    let currentPosition;
    let warningLevel = 0.8;         //TODO: move these to settings!
    let infoLevel = 0.6;
    let successLevel = 0.05;
    let gaugeColor = "";
    let test;
    if (max > min) {
        //normal type
        test = (currentValue - min)/(max - min);
        if (test > infoLevel) {
            gaugeColor = "main-info";
        }
        if (test > warningLevel) {
            gaugeColor = "main-warning";
        }
        if (test < successLevel) {
            gaugeColor = "main-success";
        }
    } else {
        //reversed type
        test = (currentValue - max)/(min - max);
        if (test < (1 - infoLevel)) {
            gaugeColor = "main-info";
        }
        if (test < (1 - warningLevel)) {
            gaugeColor = "main-warning";
        }
        if (test > (1 - successLevel)) {
            gaugeColor = "main-success";
        }
    }
    currentPosition = (1-test)*minPosition;
    if (currentPosition > minPosition) {
        currentPosition = minPosition;
    }
    if (currentPosition < maxPosition) {
        currentPosition = maxPosition;
    }
    parent.classList.remove("main-info","main-warning");
    if (gaugeColor !== "") {
        parent.classList.add(gaugeColor);
    }
    gauge.style = "stroke-dashoffset:" + currentPosition + ";";
};

helpEasy.addToolsButton = function (args) {
    let html = "";
    let type = args.type;
    let color = "";
    if (args.color !== undefined) {
        color = " main-" + args.color;
    }
    if (type === "command") {
        html += `
                <div class='dash-box'>
                    <button class='dash-button` + color + `' data-click="` + args.buttonAction + `" data-args="`
            + JSON.stringify(args).replace(/"/g, "'")
            + `">{{ICON-` + args.icon.toUpperCase() + `}}</button>
                    <div class="dash-text text-little">` + helpEasy.capitalWord(args.text) + `</div>
                </div>
            `;
    }
    if (type === "info") {
        html += `
                <div class='dash-box'>
                    <button data-click="` + args.buttonAction + `">` + helpEasy.capitalWord(args.button) + `</button>
                    <div class="dash-text text-little">` + helpEasy.capitalWord(args.text) + `</div>
                </div>
            `;
    }
    if (type === "scanner") {
        html += `
                <div class='dash-box'>
                    <button class='main-inverted' data-click="` + args.buttonAction + `">` + helpEasy.capitalWord(args.button) + `</button>
                    <div class="dash-text text-little">` + helpEasy.capitalWord(args.text) + `</div>
                </div>
            `;
    }
    if (type === "system") {
        html += `
                <div class='dash-box'>
                    <button class='main-font' data-click="` + args.buttonAction + `">` + helpEasy.capitalWord(args.button) + `</button>
                    <div class="dash-text text-little">` + helpEasy.capitalWord(args.text) + `</div>
                </div>
            `;
    }
    return html;
};

//These colors are just for backup, they should be set by the theme
helpEasy.favicon = function (color) {
    let canvas = document.createElement('canvas');
    let iconSide = 113;
    let iconRadius = 15;
    canvas.width = iconSide;
    canvas.height = iconSide;
    let ctx = canvas.getContext('2d');
    ctx.lineWidth = 8;
    //The background badge (with rounded corners)
    ctx.fillStyle = color.inverted;
    ctx.beginPath();
    ctx.moveTo(0,iconRadius);
    ctx.lineTo(0,iconSide-iconRadius);
    ctx.arc(iconRadius,iconSide-iconRadius, iconRadius, Math.PI, 0.5 * Math.PI, true);
    ctx.lineTo(iconRadius,iconSide);
    ctx.lineTo(iconSide-iconRadius,iconSide);
    ctx.arc(iconSide-iconRadius,iconSide-iconRadius, iconRadius, Math.PI, 1.5 * Math.PI, true);
    ctx.lineTo(iconSide,iconSide-iconRadius);
    ctx.lineTo(iconSide,iconRadius);
    ctx.arc(iconSide-iconRadius,iconRadius, iconRadius, 0, 1.5 * Math.PI, true);
    ctx.lineTo(iconSide-iconRadius,0);
    ctx.lineTo(iconRadius,0);
    ctx.arc(iconRadius,iconRadius, iconRadius, 0, 0.5 * Math.PI, true);
    ctx.lineTo(0,iconRadius);
    ctx.closePath();
    ctx.fill();
    //The dot
    ctx.fillStyle = color.font;
    ctx.beginPath();
    ctx.arc(90, 90, 10, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    //The warning line
    ctx.lineCap = "round";
    ctx.strokeStyle = color.warning;
    ctx.beginPath();
    ctx.moveTo(42,99);
    ctx.lineTo(99,42);
    ctx.closePath();
    ctx.stroke();
    //The info line
    ctx.strokeStyle = color.info;
    ctx.beginPath();
    ctx.moveTo(14,99);
    ctx.lineTo(99,14);
    ctx.closePath();
    ctx.stroke();
    //The sunny line
    ctx.strokeStyle = color.sunny;
    ctx.beginPath();
    ctx.moveTo(14,70);
    ctx.lineTo(70,14);
    ctx.closePath();
    ctx.stroke();
    //The success line
    ctx.strokeStyle = color.success;
    ctx.beginPath();
    ctx.moveTo(14,42);
    ctx.lineTo(42,14);
    ctx.closePath();
    ctx.stroke();
    let favicon = document.getElementById("favicon");
    if (favicon !== null) {
        favicon.remove();
    }
    favicon = document.createElement('link');
    favicon.id = "favicon";
    favicon.type = 'image/x-icon';
    favicon.rel = 'shortcut icon';
    favicon.href = canvas.toDataURL("image/x-icon");
    document.head.appendChild(favicon);
};