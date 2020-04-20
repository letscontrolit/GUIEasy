/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */
// HERE WE PUT ALL OUR "THIS&THAT" FUNCTIONS
const helpEasy = {
    'copyToClipboard': function (str) {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        const selected =
                document.getSelection().rangeCount > 0
                ? document.getSelection().getRangeAt(0)
                : false;
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        if (selected) {
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(selected);
        }
    },
    'swapKey2Value': function (json) {
        let ret = {};
        for(let key in json){
            ret[json[key]] = key;
        }
        return ret;
    },
    'rgb2hex': function (rgb) {
        rgb = rgb.split(",");
        let hex = "#";
        for (let i=0; i < rgb.length; i++) {
            hex += ( "0" + parseInt(rgb[i]).toString(16) ).substr(-2,2);
        }
        return hex;
    },
    'hex2rgb': function (hex) {
        return hex.match(/[A-Za-z0-9]{2}/g).map(function(v) { return parseInt(v, 16) }).join(",");
    },
    'invertHex': function (hex) {
        const hexCode = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
        let invertedHex = '#';
        hex.replace('#','').split('').forEach(i => {
            const index = hexCode.indexOf(i);
            invertedHex += hexCode.reverse()[index];
        });
        return invertedHex;
    },
    'cleanupWord' : function (word, commas = false) {
        word = word.replace(/_/g, " ");
        if (commas === true) {
            word = word.replace(/,/g, "<br>");
        }
        return word;
    },
    'epochToHHMMSS': function(epoch = Date.now()) {
        let time = new Date(epoch);
        let timeHH = ("0" + time.getHours()).substr(-2,2);
        let timeMM = ("0" + time.getMinutes()).substr(-2,2);
        let timeSS = ("0" + time.getSeconds()).substr(-2,2);
        return timeHH + ":" + timeMM + ":" + timeSS;
    },
    'pingIP': async function (ipArray, isUpFunction, isDownFunction) {
        for (let i = 0; i < ipArray.length; i++) {
            let ip = ipArray[i].ip;
            let startPing = Date.now();
            let ws = await new WebSocket("ws://" + ip);
            ws.onclose = async () => {
                helpEasy.addToLogDOM("The above error is intentional. We do this to 'ping' the unit.", 0,"info");
            };
            ws.onerror = function() {
                ws.close();
                ws = null;
                isUpFunction(ipArray, i, (Date.now() - startPing));
            };
            setTimeout(function() {
                if(ws != null) {
                    ws.close();
                    ws = null;
                    isDownFunction(ipArray, i);
                }
            },2000);
        }
    },
    'handlePingResults': function (array, index, ping = null) {
        array[index].ping = {};
        //This is just a pointer, not a real ping. We divide the results in 3 to get a "close to real" value
        if (ping === null) {
            array[index].ping.result = -1;
        } else {
            array[index].ping.result = Math.round(ping / 3);
        }

        array[index].ping.timestamp = Date.now();
    },
    'capitalWord' : function (str) {
        let allCaps = [
            "ac","ap",
            "bin","bssid",
            "cpu",
            "dc","dhcp","dns","dst",
            "esp",
            "gui","gw","gpio","gps",
            "http","https",
            "ip","id","i2c","io","ir",
            "json",
            "led","l/r","lcd",
            "md5","mqtt","mp3",
            "ntp",
            "ok","oled",
            "p2p",
            "rssi","ram","rfid",
            "ssid","spi","sda","scl","sta","ssl","smtp","sd",
            "ttn",
            "udp","uuid",
            "wpa"
        ];
        let reformat = [
            "AM2320","APDS9960","ADS1115",
            "BMP085/180","BMP280","BMx280","BH1750",
            "CO2","CSE7766",
            "DS18b20","DHT11/12/22","DMX512","DHT12",
            "FHEM",
            "GitHub","GP2Y10","GY-63",
            "HC-SR04","HT16K33","HLW8012/BL0937","HDC1080","HX711",
            "iButton","INA219","ID12LA/RDM6300",
            "LCD2004","LM75A","LoRa",
            "MCP23017","MCP3221","MH-Z19","MLX90614","MS5611","MPU6050","MPR121",
            "OpenHAB",
            "PCF8591","PCF8574","PCF8574/MCP23017","phpBB","PMSx003","POW","PCA9685","PN532",
            "RCW-0001","RN2483/RN2903",
            "SHT1x","SHT30/31/35","SGP30","SI7021/HTU21D","SSD1306","SSD1306/SH1106","SDS011/018/198","SMD120C/220T/230/630",
            "TSL2561","TSL2591","TCS32725","TCS34725","TSOP4838","TTP229",
            "VEML6040","VEML6070"
        ];
        let reformatCheck = [[],[],[],[],[]];
        for (let i = 0; i < reformat.length; i++) {
            reformatCheck[0].push(reformat[i].toLowerCase());
            reformatCheck[1].push("(" + reformat[i].toLowerCase());
            reformatCheck[2].push(reformat[i].toLowerCase() + ")");
            reformatCheck[3].push("(" + reformat[i].toLowerCase() + ")");
            reformatCheck[4].push(reformat[i].toLowerCase() + ",");
        }
        let allCapsCheck = [[],[],[],[],[]];
        for (let i = 0; i < allCaps.length; i++) {
            allCapsCheck[0].push(allCaps[i].toLowerCase());
            allCapsCheck[1].push("(" + allCaps[i].toLowerCase());
            allCapsCheck[2].push(allCaps[i].toLowerCase() + ")");
            allCapsCheck[3].push("(" + allCaps[i].toLowerCase() + ")");
            allCapsCheck[4].push(allCaps[i].toLowerCase() + ",");
        }
        let words = str.toLowerCase().split(" ");
        for (let i = 0; i < words.length; i++) {
            let index = helpEasy.findInArray(words[i], reformatCheck[0]);
            if (index > -1) {
                words[i] = reformat[index];
                continue;
            }
            index = helpEasy.findInArray(words[i], reformatCheck[3]);
            if (index > -1) {
                words[i] = "(" + reformat[index] + ")";
                continue;
            }
            index = helpEasy.findInArray(words[i], reformatCheck[1]);
            if (index > -1) {
                words[i] = "(" + reformat[index];
                continue;
            }
            index = helpEasy.findInArray(words[i], reformatCheck[2]);
            if (index > -1) {
                words[i] = reformat[index] + ")";
                continue;
            }
            index = helpEasy.findInArray(words[i], reformatCheck[4]);
            if (index > -1) {
                words[i] = reformat[index] + ",";
                continue;
            }
            //all caps
            index = helpEasy.findInArray(words[i], allCapsCheck[0]);
            if (index > -1) {
                words[i] = allCaps[index].toUpperCase();
                continue;
            }
            index = helpEasy.findInArray(words[i], allCapsCheck[3]);
            if (index > -1) {
                words[i] = "(" + allCaps[index].toUpperCase() + ")";
                continue;
            }
            index = helpEasy.findInArray(words[i], allCapsCheck[1]);
            if (index > -1) {
                words[i] = "(" + allCaps[index].toUpperCase();
                continue;
            }
            index = helpEasy.findInArray(words[i], allCapsCheck[2]);
            if (index > -1) {
                words[i] = allCaps[index].toUpperCase() + ")";
                continue;
            }
            index = helpEasy.findInArray(words[i], allCapsCheck[4]);
            if (index > -1) {
                words[i] = allCaps[index].toUpperCase() + ",";
                continue;
            }
            //if not found in any of the arrays.. camel case
            if (words[i].charAt(0) === "(") {
                words[i] = "(" + words[i].charAt(1).toUpperCase() + words[i].substring(2);
            } else {
                words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
            }
        }
        return words.join(" ");
    },
    'bumpScheduler': function (array, index, endpoint) {
        let nextRun = Date.now() + 10;
        let x = array[index]["scheduler"];
        for (let i = 0; i < x.length; i++) {
            if (x[i][1] === endpoint) {
                x.splice(i, 1);
                x.push([nextRun, endpoint]);
                x.sort();
            }
        }
    },
    'schedulerBump': function (array, endpoint) {
        let index = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i][1] === endpoint) {
                index = i;
            }
        }
        array[index][0] = Date.now();
        array.sort();
    },
    'schedulerDelay': function (array, index, delay) {
        for (let i = 0; i < array[index]["scheduler"].length; i++) {
            array[index]["scheduler"][i][0] += delay;
        }
        array[index].stats.error = 0;
    },
    'getCurrentIndex': function (type = "") {
        let indexObject = document.querySelectorAll("[data-current-index]")[0];
        if (type === "online") {
            return indexObject.dataset.currentOnline === "true";
        }
        return parseInt(indexObject.dataset.currentIndex);
    },
    'setCurrentIndex': function (index) {
        let indexObject = document.querySelectorAll("[data-current-index]")[0];
        indexObject.dataset.currentIndex = index;
        indexObject.dataset.currentOnline = "true";
    },
    'setCurrentOnline': function (state) {
        let indexObject = document.querySelectorAll("[data-current-index]")[0];
        if (state === "online") {
            indexObject.dataset.currentOnline = "true";
        } else {
            indexObject.dataset.currentOnline = "false";
        }
    },
    'scheduleFetch': function (array, index, endpoint) {
        if (array[index].stats === undefined) {
            array[index].stats = {"error": 0};
        }
        if (endpoint === undefined) {
            //first run
            let endpoints = guiEasy.endpoints.get;
            guiEasy.fetchCount = {"max": 0, "current": 0, "error": 0};
            array[index]["live"] = {};
            array[index]["history"] = {};
            array[index]["scheduler"] = [];
            for (let i=0; i < endpoints.length; i++) {
                let endpoint = endpoints[i].endpoint;
                if (endpoints[i].ttl_fallback === undefined || endpoints[i].ttl_fallback > guiEasy.endpoints.defaultTTL()) {
                    //These endpoints can be fetched once the gui has loaded... to speed up build-up
                    array[index].stats[endpoint] = {
                        "TTL_fallback": guiEasy.endpoints.defaultTTL(),
                        "run": -1,
                        "timestamp": Date.now()
                    };
                    let nextRun = Date.now() + i * guiEasy.fetchSettings.intervalTimeKeeper + 2000;
                    array[index]["scheduler"].push([nextRun, endpoint]);
                    array[index]["scheduler"].sort();
                } else {
                    array[index].stats[endpoint] = {
                        "TTL_fallback": endpoints[i].ttl_fallback,
                        "run": -1,
                        "timestamp": Date.now()
                    };
                    array[index]["scheduler"].push([0, endpoint]);
                    array[index]["scheduler"].sort();
                    let delayExecution = guiEasy.fetchCount.max * guiEasy.fetchSettings.intervalTimeKeeper;
                    setTimeout(function (){
                        helpEasy.getDataFromNode(array, index , endpoint, endpoints[i].ttl_fallback);
                    }, delayExecution);
                    guiEasy.fetchCount.max++;
                }
            }
        } else {
            //relay runner
            let x = guiEasy.fetchSettings;
            let TTL_fallback = array[index].stats[endpoint].TTL_fallback;
            helpEasy.getDataFromNode(array, index , endpoint, TTL_fallback);
            // take a snapshot (plus timestamp it) of the endpointData array and store it
            let temp = Object.assign({}, array[index]["live"][endpoint]);
            temp.fetched = Date.now();
            if (array[index]["history"][endpoint] === undefined) {
                array[index]["history"][endpoint] = [];
            }
            array[index]["history"][endpoint].push(temp);
            if ( array[index]["history"][endpoint].length > ( x.maxToKeep * x.maxToKeepMs - 1 )) {
                array[index]["history"][endpoint].shift();
            }
        }
    },
    'sortOptionsInSelect': function (elementID) {
            let element = document.getElementById(elementID);
            let array = [];
            for (let i = 0; i < element.options.length; i++) {
                array[i] = [];
                array[i][0] = element.options[i].text;
                array[i][1] = element.options[i].value;
                array[i][2] = element.options[i].disabled;
            }
            array.sort();
            while (element.options.length > 0) {
                element.options[0] = null;
            }
            for (let i = 0; i < array.length; i++) {
                element.options[i] = new Option(array[i][0], array[i][1]);
                element.options[i].disabled = array[i][2];
            }
    },
    'getGuiInFields': function () {
        if (guiEasy.jsonPathsIN === undefined) {
            guiEasy.jsonPathsIN = [];
        }
        let z = guiEasy.jsonPathsIN;
        let x = document.querySelectorAll("[data-json-path]");
        for (let i = 0; i < x.length; i++) {
            let y = x[i].dataset.jsonPath;
            if (helpEasy.findInArray(y,z) === -1) {
                z.push(y);
            }
        }
        //jsonPathsIN is already set so we can reuse "z"
        if (guiEasy.jsonPathsSettings === undefined) {
            guiEasy.jsonPathsSettings = [];
        }
        z = guiEasy.jsonPathsSettings;
        x = document.querySelectorAll("[data-settings]");
        for (let i = 0; i < x.length; i++) {
            let y = x[i].dataset.settings;
            if (helpEasy.findInArray(y,z) === -1) {
                z.push(y);
            }
        }
        return z;
    },
    'ifStringContains': function (string, arrayOfWords) {
        let value = 0;
        arrayOfWords.forEach(function(word){
            value = value + string.includes(word);
        });
        return (value === arrayOfWords.length)
    },
    'twoLevelJsonToList': function (endpoint, index) {
        let x = guiEasy.nodes[index].live[endpoint];
        let html = "<div data-modal-table='" + endpoint + "' class='container modal-table' id='" + endpoint + "'>";
        let keysLevel1 = Object.keys(x);
        for (let i = 0; i < keysLevel1.length; i++) {
            let keysLevel2 = Object.keys(x[keysLevel1[i]]);
            if (keysLevel2.length < 1) {
                continue;
            }
            html += "<div class='is-left'>" + helpEasy.capitalWord(helpEasy.cleanupWord(keysLevel1[i])) + "</div>";
            html += "<table>";
            for (let j = 0; j < keysLevel2.length; j++) {
                let valueName = helpEasy.cleanupWord(keysLevel2[j]);
                let value = helpEasy.cleanupWord(x[keysLevel1[i]][keysLevel2[j]], true);
                if (value === "ThisIsTheDummyPlaceHolderForTheBinaryFilename64ByteLongFilenames") {
                    value = "...";
                }
                html += "<tr><td>" + helpEasy.capitalWord(valueName) + "</td><td>" + value + "</td></tr>";
            }
            html += "</table>";
        }
        html += `
                <div class='text-tiny is-left'>Fetched: ` + helpEasy.epochToHHMMSS(x.timestamp) + `</div>
                <div class='text-tiny is-left'>Scheduled: ` + helpEasy.epochToHHMMSS(x.timestamp + x.TTL) + `</div>
                </div>
                `;
        set(guiEasy.nodes[index], "modal.table." + endpoint , html);
        return html;
    },
    'downloadFile': function (url, fileName) {
        //TODO: catch error!
        fetch(url).then(function(t) {
            return t.blob().then((b)=>{
                    let a = document.createElement("a");
                    a.href = URL.createObjectURL(b);
                    a.download = fileName;
                    a.click();
                }
            );
        });
    },
    'rssiToBars': function (rssi) {
        if (rssi >= -55) {
            return "level-5";
        }
        if (rssi >= -66) {
            return "level-4";
        }
        if (rssi >= -77) {
            return "level-3";
        }
        if (rssi >= -88) {
            return "level-2";
        }
        return "level-1";
    },
    'rssiToSVG': function (rssi) {
        let level = helpEasy.rssiToBars(rssi);
        return guiEasy.curly.icon(["wifi", level]);
    },
    'getjsonPathData': function (path, json) {
        //TODO: this can probably be made more elegant?
        if (path.length === 1) {
            return json[path[0]];
        }
        if (path.length === 2) {
            return json[path[0]][path[1]];
        }
        if (path.length === 3) {
            return json[path[0]][path[1]][path[2]];
        }
        if (path.length === 4) {
            return json[path[0]][path[1]][path[2]][path[3]];
        }
        if (path.length === 5) {
            return json[path[0]][path[1]][path[2]][path[3]][path[4]];
        }
        if (path.length === 6) {
            return json[path[0]][path[1]][path[2]][path[3]][path[4]][path[5]];
        }
        if (path.length === 7) {
            return json[path[0]][path[1]][path[2]][path[3]][path[4]][path[5]][path[6]];
        }
        if (path.length === 8) {
            return json[path[0]][path[1]][path[2]][path[3]][path[4]][path[5]][path[6]][path[7]];
        }
        if (path.length === 9) {
            return json[path[0]][path[1]][path[2]][path[3]][path[4]][path[5]][path[6]][path[7]][path[8]];
        }
        if (path.length === 10) {
            return json[path[0]][path[1]][path[2]][path[3]][path[4]][path[5]][path[6]][path[7]][path[8]][path[9]];
        }
    },
    'iniFileToObject': function(string, pipe2array = false) {
      let object = {};
      let sections = string.match(/^\[[^\]\r\n]+](?:[\r\n]([^[\r\n].*)?)*/gm);
      for (let i=0; i < sections.length; i++) {
          let sectionName = sections[i].split("\n")[0];
          sectionName = sectionName.replace(/[\[\]]/g, '').trim();
          object[sectionName] = {};
          let key = sections[i].match(/^((?!\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$).)+/gm);  //we remove comments "//" syntax, single row
          for (let k=1; k < key.length; k++) {
              let keyValue = key[k].split("=");
              if ((keyValue[1].charAt(0) === "0" && keyValue[1].length > 1) || isNaN(Number(keyValue[1]))) {   // leading zeros are interpreted as string values
                  if (pipe2array && keyValue[1].trim().includes("|")) {
                      object[sectionName][keyValue[0].trim()] = keyValue[1].trim().split("|");
                  } else {
                      object[sectionName][keyValue[0].trim()] = keyValue[1].trim();
                  }
              } else {
                  object[sectionName][keyValue[0].trim()] = Number(keyValue[1]);
              }
          }
      }
      return object;
    },
    'sortObjectArray': (propName) =>
        (a, b) => a[propName] === b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1
    ,
    'addToLogDOM': function (str, level, type = "log") {
        if (str === "pageSize") {
            str = document.documentElement.innerHTML.toString().split("").length;
            let currentSize = guiEasy.guiStats.pageSize;
            if (currentSize === 0) {
                guiEasy.guiStats["startSize"] = str;
            }
            guiEasy.guiStats.pageSize += str;
            str = "total page size: " + Math.round(str/1024) + "kB";
        }
        if (guiEasy.logLevel >= level) {
            msg[type](str);
        }
    },
    'numberOfFound': function (str, pattern) {
        return ((str || '').match(pattern) || []).length;
    },
    'findInArray': function (needle, haystack) {
        let lowercaseHaystack = [];
        for (let i = 0; i < haystack.length; i++) {
            lowercaseHaystack.push(haystack[i].toLowerCase());
        }
        return lowercaseHaystack.indexOf(needle);
    },
    'listOfProcesses': function (processID, processText, timestamp, type) {
        let logElement = document.getElementById("modal-loading-log");
        let progressElement = document.getElementById("modal-loading-progress");
        let spinnerElement = document.getElementById("fallback-loading-animation");
        spinnerElement.classList.add("is-hidden");
        logElement.innerHTML += "<div class='" + type + "' id='log-entry-" + processID + "' data-timestart='" + timestamp + "'>" + processText + "</div>";
        progressElement.max = guiEasy[type].length;
        if (guiEasy.guiStats[type] === undefined) {
            guiEasy.guiStats[type] = {};
        }
        guiEasy.guiStats[type][processID] = "running";
    },
    'processDone': function (processID, type) {
        let progressElement = document.getElementById("modal-loading-progress");
        let logRow = document.getElementById("log-entry-" + processID);
        let runtime = Date.now() - logRow.dataset.timestart;
        guiEasy.guiStats.bootTime += runtime;
        logRow.innerHTML += " (" + runtime + "ms)";
        logRow.classList.add("loading-is-done");
        if (type === "startup") {
            if (progressElement.max === progressElement.value) {
                //lets close the loading page
                let modalBackground = document.getElementById("modal-container");
                let loadingPage = document.getElementById("modal-loading-screen");
                modalBackground.classList.remove("is-black");
                modalBackground.classList.add("is-hiding");
                loadingPage.classList.add("is-hidden");
                setTimeout(function () {
                    modalBackground.classList.add("is-hidden");
                    modalBackground.classList.remove("is-hiding");
                }, (500));
                helpEasy.addToLogDOM("total boot time: " + guiEasy.guiStats.bootTime + "ms", 1);
            }
            progressElement.value++;
        }
        guiEasy.guiStats[type][processID] = "done";
    },
    'internet': function () {
        let internet = false;
        if (window.navigator.onLine === true) {
            internet = true;
        }
        return internet;
    },
    'welcomePhrase': function () {
        let now = new Date;
        let hour = now.getHours();
        if (hour > 17) {
            return "Good evening!"
        }
        if (hour > 11) {
            return "Good afternoon!"
        }
        if (hour > 5) {
            return "Good morning!"
        }
        return "Hi!"
    },
    'urlParams': function () {
        let params = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            params[key.toLowerCase()] = value.toLowerCase();
        });
        return params;
    },
    'locationByIP': async function () {
        let timestamp = Date.now();
        let path = "https://ipapi.co/json" + "?at=" + timestamp + "&gui=" + guiEasy.geekNameFull();
        let response = await fetch(path);  //TODO: catch error!
        return await response.json();
    },
    'blinkElement': function (id, color) {
        let element;
        if (typeof id === "object") {
            element = id;
        } else {
            element = document.getElementById(id);
        }
        element.classList.add("main-" + color);
        setTimeout(function (){
            element.classList.remove("main-" + color);
        }, 250)
    },
    'dashGroupContainerOpen': function (title = "") {
        if (title === "") {
            return "<div class='group-container'>";
        } else {
            return "<div class='group-container'>" + helpEasy.capitalWord(title) + "<hr>";
        }
    },
    'dashBoxContainerOpen': function () {
        return "<div class='box-container'>";
    },
    'dashContainerClose': function () {
        return "</div>";
    },
    'addInput': function (args) {
        let type = args.type;
        let disabled = "";
        if (args.disabled !== undefined && args.disabled === true) {
            disabled = "disabled";
        }
        let id;
        if (args.settingsId === undefined) {
            id = args.title.split(" ").join("-");
        } else {
            id = args.settingsId;
        }
        let settingsIdPrefix = "generic-input--";
        let datasetBlob = "";
        let prefixHTML = "";
        let appendixHTML = "";
        if (args.toSettings === true) {
            settingsIdPrefix = "settings--input--";
            datasetBlob += 'data-settings="' + args.settingsId + '"';
        }
        if (args.settingsIP !== undefined) {
            datasetBlob += 'data-settings-ip="' + args.settingsIP + '"';
        }
        if (args.settingsRegEx !== undefined) {
            datasetBlob += 'data-settings-regex="' + args.settingsRegEx + '"';
        }
        if (args.valueIfBlank !== undefined) {
            datasetBlob += 'data-value-if-blank="' + args.valueIfBlank + '"';
        }
        if (args.allowedBlank !== undefined) {
            datasetBlob += 'data-allowed-blank="' + args.allowedBlank + '"';
        }
        if (args.optionListOffset !== undefined) {
            datasetBlob += 'data-option-list-offset="' + args.optionListOffset + '"';
        }
        if (args.list2value !== undefined) {
            datasetBlob += 'data-list2value="' + args.list2value + '"';
        }
        if (args.prefixHTML !== undefined) {
            prefixHTML = args.prefixHTML;
        }
        if (args.appendixHTML !== undefined) {
            appendixHTML = args.appendixHTML;
        }
        id = settingsIdPrefix + id;
        let tooltip = "";
        let gotTooltip = "";
        if (args.tooltip !== undefined) {
            tooltip = "<div class='tooltip'>" + args.tooltip + "</div>";
            gotTooltip = "got-tooltip";
        }
        let html = "<div class='row'>" + prefixHTML;
        if (type === "string") {
            html += "<span class='" + gotTooltip + "'>" + helpEasy.capitalWord(args.title) + tooltip + "</span>";
            html += `
                <input  spellcheck='false'
                        type='text'
                        id='` + id + `'
                        data-id='` + id + `'
                        data-type="string"
                        data-alt='` + args.alt + `'
                        data-settings="` + args.settingsId + `"
                        placeholder='` + args.placeholder + `'
                        value='` + args.default + `'
                        ` + datasetBlob + `
                        data-input-string="` + args.settingsMaxLength + `">
                `;
        }
        if (type === "password") {
            html += "<span class='" + gotTooltip + "'>" + helpEasy.capitalWord(args.title) + tooltip + "</span>";
            html += `
                <input  spellcheck='false'
                        type='password'
                        id='` + id + `'
                        data-id="` + id + `"
                        data-type="password"
                        data-alt='` + args.alt + `'
                        data-settings="` + args.settingsId + `"
                        placeholder='` + args.placeholder + `'
                        ` + datasetBlob + `
                        data-input-password="` + args.settingsMaxLength + `">
                `;
        }
        if (type === "dropdown") {
            let split = (args.settingsId).split("--");
            let guiDropdownValue = null;
            if (split[0] === "defaultSettings") {
                guiDropdownValue = defaultSettings[split[1]][split[2]];
            }
            html += "<span class='" + gotTooltip + "'>" + helpEasy.capitalWord(args.title) + tooltip + "</span>";
            html +=  `    
                    <select
                        id="` + id + `"
                        data-id="` + id + `"
                        data-type="dropdown"
                        data-alt="` + args.alt + `"
                        data-settings="` + args.settingsId + `"
                        data-default-index="` + args.default + `"
                        data-gui-dropdown-value="` + guiDropdownValue + `"
                        ` + disabled + `
                        ` + datasetBlob + `>
                `;
            let options = args.optionList;
            for (let i = 0; i < options.length; i++) {
                let value = options[i].value;
                let text = helpEasy.capitalWord(options[i].text);
                let disabled = "";
                if (options[i].disabled !== undefined && options[i].disabled === true) {
                    disabled = "disabled";
                }
                let note = "";
                if (options[i].note !== undefined) {
                    note = " " + helpEasy.capitalWord(options[i].note);
                }
                if (i === args.default) {
                    html += "<option value='" + value + "' selected='selected'>" + text + note + "</option>";
                } else {
                    html += "<option value='" + value + "' " + disabled + ">" + text + note + "</option>";
                }
            }
            html +=  `</select>
                    <label
                        class="select"
                        for="` + id + `"
                    ></label>
                `;
        }
        if (type === "toggle") {
            html += `
                <input type="checkbox"
                id="` + id + `"
                data-id="` + id + `"
                data-type="toggle"
                data-alt="` + args.alt + `"
                data-settings="` + args.settingsId + `"
                data-true-text="` + args.trueText + `"
                data-false-text="` + args.falseText + `"
                data-default-value="` + args.default + `"
                data-default-text="` + args[(args.default)+"Text"] + `"
                data-change="`+ settingsIdPrefix + `update"
                data-change-` + args.settingsTrue + `="true"
                data-change-` + args.settingsFalse + `="false"
                data-tooltip="`+ tooltip +`"
                data-got-tooltip="`+ gotTooltip +`"
                data-input-toggle="{'true':` + args.settingsTrue + `, 'false': `+ args.settingsFalse +`}"
                ` + datasetBlob + `>
                <label  class="checkbox"
                        id="label-` + id + `"
                        for="` + id + `"
                        tabindex="0">` +
                   `<div class="` + gotTooltip + `">` + helpEasy.capitalWord(args[(args.default+"Text")]) + tooltip + `</div>
                </label>
            `;
        }
        if (type === "number") {
            let placeholderText = "";
            if (args.placeholder !== "") {
                placeholderText = " [" + args.placeholder + "]";
            }
            let extraWidth = "";
            if (args.width !== undefined) {
                extraWidth = " " + args.width + "-width";
            }
            html += `
                <input  type="number"
                class="` + extraWidth  + `"
                id="` + id + `"
                min="` + args.min + `"
                max="` + args.max + `"
                step="` + args.step + `"
                data-alt="` + args.alt + `"
                placeholder="` + args.placeholder + `"
                data-default-value="` + args.default +  `"
                data-change="`+ settingsIdPrefix + `update"
                data-id="` + id + `"
                data-type="number"
                data-input-number="{'max': ` + args.max + `, 'min': ` + args.min + `}"
                value="` + args.default + `"
                ` + datasetBlob + `>
                <label class="number ` + gotTooltip + `"
                       for="` + id + `"
                       id="label-` + id + `">` +
                   helpEasy.capitalWord(args.title) + placeholderText + tooltip + `
                </label>
            `;
        }
        html += appendixHTML + "</div>";
        return html;
    },
    'addLine': function () {
        return "<hr>";
    },
    'openArea': function (title) {
        let id = title.replace(" ", "-") + "-area";
        if (defaultSettings.userSettings.areasMinimized) {
            return `
            <div class="area hide-contents" id="` + id + `">
                <div class="area-title">` + helpEasy.capitalWord(title)
                + `<button id="button-min-` + id + `" data-click="area-min-` + id + `"` + ` class="is-hidden">` + guiEasy.curly.icon(["minimize"]) + `</button>`
                + `<button id="button-max-` + id + `" data-click="area-max-` + id + `">` + guiEasy.curly.icon(["maximize"]) + `</button></div>
            `;
        } else {
            return `
            <div class="area" id="` + id + `">
                <div class="area-title">` + helpEasy.capitalWord(title)
                + `<button id="button-min-` + id + `" data-click="area-min-` + id + `">` + guiEasy.curly.icon(["minimize"]) + `</button>`
                + `<button id="button-max-` + id + `" data-click="area-max-` + id + `"` + ` class="is-hidden">` + guiEasy.curly.icon(["maximize"]) + `</button></div>
            `;
        }
    },
    'closeArea': function () {
        return "</div>"
    },
    'openColumn': function (id) {
        if (id === undefined) {
            return "<div class='column'>";
        } else {
            if (id.split("-")[0] === "data") {
                return "<div class='column' " + id + "=''>";
            } else {
                return "<div class='column' id='" + id + "'>";
            }
        }
    },
    'closeColumn': function () {
        return "</div>"
    },
    'checkIfIP': function (ipaddress) {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress);
    },
    'screenshot': function () {
        let html2canvasVersion = "v1.0.0-rc.5";
        if (helpEasy.internet()) {
            let id = "screenshot-script";
            let eventDetails = {
                "type": "wave",
                "text": guiEasy.curly.icon(["screenshot"]),
                "color": "inverted"
            };
            let background = guiEasy.current.backgroundColor;
            if (background === undefined) {
                background = "#3492e2";
            }
            let inverted = guiEasy.current.invertedColor;
            if (inverted === undefined) {
                inverted = "#2F4252";
            }
            let fileName = helpEasy.capitalWord((guiEasy.current.tab.id).split("-")[0]);
            let element = guiEasy.current.modal;
            if (element === undefined) {
                element = guiEasy.current.tab;
            } else {
                background = inverted;
                fileName = fileName + "-" + document.getElementById("modal-title-text").innerText.replace(/ /g,"_");
            }
            fileName = guiEasy.nodes[helpEasy.getCurrentIndex()].live.json.System["Unit Name"] + "-" + fileName;
            guiEasy.popper.tryCallEvent(eventDetails);
            let script = document.createElement('script');
            script.id = id;
            script.onload = function () {
                html2canvas(element, {
                    backgroundColor: background
                }).then(function(canvas) {helpEasy.binaryDataToFile(canvas, "image/png", fileName + ".png")});
            };
            script.src = "https://github.com/niklasvh/html2canvas/releases/download/" + html2canvasVersion + "/html2canvas.min.js";
            document.head.appendChild(script);
            //TODO: there's left over elements or something when running the screen shots multiple times on different objects. Tabs will stop being rendered after a modal has been shot...
        } else {
            //flash the screen, since no internet we cannot use the external lib..
            let eventDetails = {
                "type": "wave",
                "text": "No internet!",
                "color": "warning"
            };
            guiEasy.popper.tryCallEvent(eventDetails);
        }
    },
    'binaryDataToFile': function (data, type, fileName) {
        let id = "temp-binary-blob-element";
        let check = document.getElementById(id);
        if (check !== null) {
            check.remove();
        }
        let a = document.createElement('a');
        a.id = id;
        document.body.appendChild(a);
        a.style.display = "none";
        a.href = data.toDataURL(type);
        a.download = fileName;
        a.click();
    },
    'hash': {
        encode: function (key, data) {
            data = this.xor_encrypt(key, data);
            return this.b64_encode(data);
        },
        decode: function (key, data) {
            data = this.b64_decode(data);
            return this.xor_decrypt(key, data);
        },
        b64_table: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        b64_encode: function (data) {
            let o1, o2, o3, h1, h2, h3, h4, bits, r, i = 0, enc = "";
            if (!data) { return data; }
            do {
                o1 = data[i++];
                o2 = data[i++];
                o3 = data[i++];
                bits = o1 << 16 | o2 << 8 | o3;
                h1 = bits >> 18 & 0x3f;
                h2 = bits >> 12 & 0x3f;
                h3 = bits >> 6 & 0x3f;
                h4 = bits & 0x3f;
                enc += this.b64_table.charAt(h1) + this.b64_table.charAt(h2) + this.b64_table.charAt(h3) + this.b64_table.charAt(h4);
            } while (i < data.length);
            r = data.length % 3;
            return (r ? enc.slice(0, r - 3) : enc) + "===".slice(r || 3);
        },
        b64_decode: function (data) {
            let o1, o2, o3, h1, h2, h3, h4, bits, i = 0, result = [];
            if (!data) { return data; }
            data += "";
            do {
                h1 = this.b64_table.indexOf(data.charAt(i++));
                h2 = this.b64_table.indexOf(data.charAt(i++));
                h3 = this.b64_table.indexOf(data.charAt(i++));
                h4 = this.b64_table.indexOf(data.charAt(i++));
                bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
                o1 = bits >> 16 & 0xff;
                o2 = bits >> 8 & 0xff;
                o3 = bits & 0xff;
                result.push(o1);
                if (h3 !== 64) {
                    result.push(o2);
                    if (h4 !== 64) {
                        result.push(o3);
                    }
                }
            } while (i < data.length);
            return result;
        },
        keyCharAt: function (key, i) {
            return key.charCodeAt(Math.floor(i % key.length));
        },
        xor_encrypt: function (key, data) {
            let rta = [];
            for (let i = 0; i < data.length; i++) {
                let c = data[i];
                rta.push(c.charCodeAt(0) ^ this.keyCharAt(key, i));
            }
            return rta;
        },
        xor_decrypt: function (key, data) {
            let rta = [];
            for (let i = 0; i < data.length; i++) {
                let c = data[i];
                rta.push(String.fromCharCode(c ^ this.keyCharAt(key, i)));
            }
            return  rta.join("");
        }
    }
};