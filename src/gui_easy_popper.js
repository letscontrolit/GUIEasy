/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */
//HERE WE ADD THINGS THAT WILL HAPPEN
guiEasy.popper = function (processID, processType) {
    //to make sure we don't spam the event listener...
    setInterval(guiEasy.popper.tryCallEvent.counter, 5);
    //add event listeners...
    guiEasy.popper.events();
    guiEasy.popper.rules();
    guiEasy.popper.favicon();
    helpEasy.addToLogDOM("pageSize", 1);
    helpEasy.processDone(processID, processType);
};

guiEasy.popper.events = function() {
    //generic events that will be captured
    document.addEventListener(guiEasy.geekName(), guiEasy.popper.guiEvent, false);
    document.addEventListener('keydown', guiEasy.popper.keyboard, false);
    document.addEventListener('input', guiEasy.popper.input, false);
    document.addEventListener('keyup', guiEasy.popper.keyboard, false);
    document.addEventListener('click', guiEasy.popper.click, true);
    document.addEventListener('change', guiEasy.popper.change, true);
    document.addEventListener('focusout', guiEasy.popper.focus, true);
};

//BELOW IS FUNCTION TO INTERCEPT AND TRANSLATE THE EVENT INTO A ESP EASY EVENT//
guiEasy.popper.focus = function (event) {
    //focus is currently only used to close the action menu ...
    if (event.target.dataset["focus"] === undefined) {
        return;
    }
    let args = event.target.dataset["focus"].split("-");
    if (args !== undefined) {
        let eventDetails = {
            "type": args[0],
            "args": args,
            "x": event.x,
            "y": event.y
        };
        setTimeout(function () {
            guiEasy.popper.tryCallEvent(eventDetails)
        }, 250);
    }
};

guiEasy.popper.input = function (event) {
    let x = event.target.dataset;
    let eventDetails = {
        "type": "update",
        "newValue": event.target.value,
        "newState": event.target.checked,
        "placeholder": event.target.placeholder,
        "args": x
    };
    if (eventDetails.type !== undefined) {
        guiEasy.popper.tryCallEvent(eventDetails);
    }
};

guiEasy.popper.change = function (event) {
    let x = event.target.dataset;
    let eventDetails = {
        "type": "update",
        "newValue": event.target.value,
        "newState": event.target.checked,
        "placeholder": event.target.placeholder,
        "index": event.target.selectedIndex,
        "args": x
    };
    if (eventDetails.type !== undefined) {
        guiEasy.popper.tryCallEvent(eventDetails);
    }
};

guiEasy.popper.keyboard = function (event) {
    let eventDetails = {
           "type": "shortcut",
           "object": event.key,
           "state": event.type,
           "key": event.code,
           "ctrl": event.ctrlKey,
           "alt": event.altKey,
           "event": event
        };
    if (eventDetails.type !== undefined) {
        guiEasy.popper.tryCallEvent(eventDetails);
    }
};

guiEasy.popper.click = function (event) {
    if (event.target.dataset["click"] === undefined) {
        return;
    }
    let args = event.target.dataset["click"].split("-");
    let x = event.target.dataset;
    if (args !== undefined) {
        let eventDetails = {
            "type": args[0],
            "args": args,
            "dataset": x,
            "x": event.x,
            "y": event.y,
            "element": event.target
        };
        guiEasy.popper.tryCallEvent(eventDetails);
    }
};
//ABOVE IS FUNCTION TO INTERCEPT AND TRANSLATE THE EVENT INTO A ESP EASY EVENT//
//BELOW IS THE FUNCTION TO TRIGGER ESP EASY EVENT + FIND WHAT WAS FOCUSED//
guiEasy.popper.guiEvent = function (event) {
    helpEasy.addToLogDOM(JSON.stringify(event.detail), 2);
    let x = event.detail;
    guiEasy.popper[x.type](x);
};

guiEasy.popper.tryCallEvent = function (eventDetails) {
    let x = guiEasy.guiStats.eventCalls;
    if (x < 10) {
        guiEasy.guiStats.eventCalls++;
        helpEasy.addToLogDOM("Calling custom event: " + JSON.stringify(eventDetails), 2);
        document.dispatchEvent(new CustomEvent(guiEasy.geekName(), {'detail': eventDetails}));
    }
};

guiEasy.popper.tryCallEvent.counter = function() {
    if (guiEasy.guiStats.eventCalls > 0) {
        guiEasy.guiStats.eventCalls--;
    }
};
//ABOVE IS THE FUNCTION TO TRIGGER ESP EASY EVENT + FIND WHAT WAS FOCUSED//
//BELOW IS THE "TO EXEC" FUNCTIONS//
guiEasy.popper.clipboard = function (clipboard) {
    let id = clipboard.args[1];
    let element = document.getElementById(id);
    let syntax = defaultSettings.userSettings.clipboardSyntax;
    helpEasy.copyToClipboard(guiEasy.popper.clipboard[syntax](element.innerHTML));
    let eventDetails = {
        "type": "wave",
        "text": "info copied",
        "color": "success"
    };
    guiEasy.popper.tryCallEvent(eventDetails);
};

guiEasy.popper.clipboard.Default = function (rawHTML) {
    let text = "";
    helpEasy.addToLogDOM("Converting (generic): " + rawHTML, 1);
    let data = guiEasy.popper.clipboard.regexTable(rawHTML);

    helpEasy.addToLogDOM("RESULTS (generic): " + text, 1);

    return text;
};

guiEasy.popper.clipboard.GitHub = function (rawHTML) {
    let text = "";
    helpEasy.addToLogDOM("Converting (GitHub): " + rawHTML, 1);
    let data = guiEasy.popper.clipboard.regexTable(rawHTML);

    helpEasy.addToLogDOM("RESULTS (GitHub): " + text, 1);

    return text;
};

guiEasy.popper.clipboard.phpBB = function (rawHTML) {
    let text = "";
    helpEasy.addToLogDOM("Converting (phpBB): " + rawHTML, 1);
    let data = guiEasy.popper.clipboard.regexTable(rawHTML);

    helpEasy.addToLogDOM("RESULTS (phpBB): " + text, 1);

    return text;
};

guiEasy.popper.clipboard.regexTable = function (rawHTML) {

};

guiEasy.popper.gui = function (event) {
    let browserUserSettings = {
        "preventDefaults": {}
    };
    let inputs = document.querySelectorAll("[data-settings^='defaultSettings--userSettings']");
    for (let i = 0; i < inputs.length; i++) {
        let settingsPath = inputs[i].dataset.settings.split("--");
        let value = "";
        if (inputs[i].dataset.type === "toggle") {
            value = JSON.parse(inputs[i].dataset.inputToggle.replace(/'/g, '"'));
            value = value[inputs[i].checked];
        }
        if (inputs[i].dataset.type === "dropdown") {
            value = inputs[i].selectedOptions[0].value;
        }
        if (settingsPath[2] === "preventDefaults") {
            browserUserSettings.preventDefaults[settingsPath[3]] = value;
        } else {
            browserUserSettings[settingsPath[2]] = value;
        }
    }
    defaultSettings.userSettings = browserUserSettings;
    if (document.getElementById("label-temp") !== null) {
        document.getElementById("label-temp").remove();
    }
    let l = document.createElement("label");
    l.id = "label-temp";
    l.style.display = "none";
    document.body.appendChild(l);
    let file = new File(
        [JSON.stringify(defaultSettings.userSettings, null, 2)],
        "gui.txt",
        {
            type: "text/plain"
        }
    );
    helpEasy.uploadBinaryAsFile("generic", file, "temp");
    let eventDetails = {
        "type": "wave",
        "text": "gui settings saved",
        "color": "inverted"
    };
    guiEasy.popper.tryCallEvent(eventDetails);
    eventDetails = {
        "type": "modal",
        "args": ["", "close"]
    };
    guiEasy.popper.tryCallEvent(eventDetails);
};

guiEasy.popper.command = function (x) {
    let waveStuff = JSON.parse(x.dataset.args.replace(/'/g, '"'));
    let url = "http://" + guiEasy.nodes[helpEasy.getCurrentIndex()].ip + "/?cmd=";
    let cmd = x.args[1];
    let waveText = waveStuff.waveText;
    let waveColor = waveStuff.color;
    if (cmd === "reboot") {
        helpEasy.schedulerDelay(guiEasy.nodes, helpEasy.getCurrentIndex(), 15 * 1000);
    } else {
        helpEasy.schedulerDelay(guiEasy.nodes, helpEasy.getCurrentIndex(), 30 * 1000);
    }
    fetch(url + cmd).then( results => {
            helpEasy.addToLogDOM(("response: " + results), 2);
            let eventDetails = {
                "type": "wave",
                "text": waveText,
                "color": waveColor
            };
            guiEasy.popper.tryCallEvent(eventDetails);
        }
    );

};

guiEasy.popper.topNotifier = function (id, string, color, countdown) {
    let x = guiEasy.nodes[helpEasy.getCurrentIndex()].notifierID;
    if (x !== id) {
        guiEasy.nodes[helpEasy.getCurrentIndex()].notifierID = id;
        let notifier = document.getElementById("top-notifier");
        if (notifier.innerHTML !== "") {
            //if it already got something open, replace that one.
            notifier.click();
        }
        notifier.innerHTML = string;
        notifier.classList.add("main-" + color);
        notifier.addEventListener("click", function () {
            notifier.classList.add("is-hidden");
            notifier.innerHTML = "";
            notifier.classList.remove("no-click");
            notifier.classList.remove("internet-down");
            notifier.classList.remove("main-" + color);
            setTimeout(function () {
                //make the notify not pop up for another 30 seconds
                guiEasy.nodes[helpEasy.getCurrentIndex()].notifierID = "";
            }, 30 * 1000);
        });
        if (id === "internetDown") {
            //No click away
            notifier.classList.add("no-click");
            notifier.classList.add("internet-down");
        }
        if (countdown > 0) {
            notifier.innerHTML = "<div id='countdown-bar'></div>" + notifier.innerHTML;
            let bar = document.getElementById("countdown-bar");
            let z = 1;
            bar.setAttribute("style", "width: 0.1%");
            let y = setInterval(function () {
                z++;
                bar.setAttribute("style", "width:" + Math.round( z / countdown * 100 ) + "%");
                if (z === countdown) {
                    clearInterval(y);
                }
            }, 1000);
            setTimeout(function () {
                guiEasy.nodes[helpEasy.getCurrentIndex()].notifierID = "";
                notifier.click();
            }, countdown * 1001)
        }
        notifier.classList.remove("is-hidden")
    }
};

guiEasy.popper.tab = function (tabToOpen) {
    let tab = tabToOpen.args[1];
    if (tab === undefined) {
        tab = "main";
    }
    let tabNumber = parseInt(tab);
    if (tabNumber > -1) {
        tab = guiEasy["tabNumber"][tabNumber];
    }
    tabNumber = guiEasy["tabNumber"].indexOf(tab);
    guiEasy.current.tabNumber = tabNumber;
    guiEasy.current.tab = document.getElementById(tab + "-container");
    //first hide the containers, plus un-hide the wanted container
    let x = document.getElementsByClassName("container");
    for (let i = 0; i < x.length; i++) {
        let y = x[i].id.split("-")[0];
        x[i].classList.add("is-hidden");
        if (y === tab) {
            x[i].classList.remove("is-hidden");
            window.scrollTo(0, 0);
        }
    }
    //now remove the highlight, plus add to the wanted tab
    x = document.getElementsByClassName("nav");
    for (let i = 0; i < x.length; i++) {
        let y = x[i].dataset;
        if (y.highlight === "true") {
            x[i].classList.remove("nav-selected");
        }
        if (y.tab === tab) {
            x[i].classList.add("nav-selected");
        }
    }
    helpEasy.addToLogDOM("tab open: " + tab, 1);
};

guiEasy.popper.menu = function (menuToOpen) {
    let x = menuToOpen.args[1];
    let y = menuToOpen.args[2];
    let posY = menuToOpen.y;
    if (x === "action") {
        let menu = document.getElementById("menu-button-list");
        let menuHeight = parseFloat(window.getComputedStyle(menu).height.slice(0, -2));
        let menuButton = document.getElementById("menu-button");
        if (y === "close") {
            menu.classList.add("closed");
            menuButton.classList.add("is-inactive");
            setTimeout(function () {
                menu.classList.remove("horizontal");
            }, 750)
        }
        if (y === "toggle") {
            menu.classList.toggle("closed");
            menuButton.classList.toggle("is-inactive");
        }
        if (posY < (menuHeight + 50)) {
            menu.classList.add("horizontal");
        }
    }
    helpEasy.addToLogDOM("menu: " + x, 1);
};

guiEasy.popper.modal = function (modalToOpen) {
    let x = modalToOpen.args[1];
    let y = modalToOpen.args[2];
    let index = helpEasy.getCurrentIndex();
    let logic = {"nah": "add", "yep": "remove"};
    // nah = add "is-hidden"... yep = remove "is-hidden"
    let z = {
        "modal": "nah",
        "input": {
            "string": "nah",
            "textarea": "nah",
            "upload": "nah"
        },
        "button": {
            "ok": "nah",
            "cancel": "nah",
            "close": "nah",
            "rescan": "nah",
            "copy": "nah",
            "location": "nah",
            "custom": "nah"
        },
        //Defaults, can be override in the ifs further down.
        "action": {
            "ok": null,
            "cancel": "modal-close",
            "close": "modal-close",
            "rescan": null,
            "copy": "modal-clipboard",
            "upload": null,
            "location": "update-location",
            "custom": null
        },
        "countdown": 0,
        "info": null,
        "table": null,
        "setup": null,
        "title": null,
        "upload": {
            "max": null,
            "free": null,
            "title": null,
            "types": null
        },
        "custom": null
    };
    //What part of the modal should be screenshot:ed?
    if (guiEasy.current.modal === undefined) {
        guiEasy.current.modal = document.getElementById("modal-view");
    }
    if (x === "close") {
        if (guiEasy.current.modal !== undefined) {
            guiEasy.current.modal.remove();
        }
        document.getElementById("modal").innerHTML = document.getElementById("modal").dataset.defaultView;
        document.body.classList.remove("modal");
    } else {
        document.body.classList.add("modal");
    }
    if (x === "theme" && y === "import") {
        z.modal = "yep";
        z.input.textarea = "yep";
        z.button.close = "yep";
        z.button.ok = "yep";
        z.action.ok = "theme-import-modal_input_textarea";
        z.title = "please enter theme settings";
    }
    if (x === "theme" && y === "copy") {
        z.modal = "yep";
        z.title = "added to clipboard!";
        z.info = "<div class='is-center logo-animation'>" + guiEasy.curly.logo(["big"]) + "</div>";
        z.countdown = 3;
    }
    if (x === "wifi" && y === "scanner") {
        z.modal = "yep";
        z.button.close = "yep";
        z.button.copy = "yep";
        z.action.copy = "clipboard-wifi";
        z.title = "found wifi networks";
        z.table = guiEasy.nodes[index].modal.table.wifi;
    }
    if (x === "i2c" && y === "scanner") {
        z.modal = "yep";
        z.button.close = "yep";
        z.title = "found i2c hardware";
        //z.table = guiEasy.nodes[index].modal.table.i2c;;
    }
    if (x === "files" && y === "table") {
        let storage = guiEasy.nodes[helpEasy.getCurrentIndex()].live.sysinfo_json.storage;
        z.modal = "yep";
        z.button.close = "yep";
        z.title = "files on local storage";
        z.table = guiEasy.nodes[index].modal.table.files;
        z.input.upload = "yep";
        z.action.upload = "generic";
        z.upload.max = parseInt(storage.spiffs_size);
        z.upload.free = parseInt(storage.spiffs_free);
        z.upload.types = ".*";
        z.upload.title = "upload file to unit";
    }
    if (x === "firmware" && y === "reset") {
        z.modal = "yep";
        z.button.close = "yep";
        z.title = "reset firmware";
        z.setup = guiEasy.popper.modal.factoryReset();
        z.button.custom = "yep";
        z.action.custom = "firmware-reset-factory";
        z.custom = {
                "text":"factory reset",
                "color": "warning"
                };
    }
    if (x === "firmware" && y === "update") {
        let storage = guiEasy.nodes[helpEasy.getCurrentIndex()].live.sysinfo_json.storage;
        z.modal = "yep";
        z.button.close = "yep";
        z.title = "update firmware";
        z.input.upload = "yep";
        z.action.upload = "firmware";
        z.upload.max = parseInt(storage.sketch_free) + parseInt(storage.sketch_size);
        z.upload.free = parseInt(storage.sketch_free);
        z.upload.types = ".bin";
        z.upload.title = "upload bin file to unit";
    }
    if (x === "settings" && y === "gui") {
        z.modal = "yep";
        z.button.close = "yep";
        z.title = "gui settings";
        z.setup = guiEasy.popper.modal.settings(y);
        z.button.custom = "yep";
        z.action.custom = "gui-settings-save";
        z.custom = {
            "text":"save gui settings to file",
            "color": "success"
        };
    }
    if (x === "settings" && y === "mqtt") {
        z.modal = "yep";
        z.button.close = "yep";
        z.title = "mqtt settings";
        z.setup = guiEasy.popper.modal.settings(y);
        z.button.ok = "yep";
        z.action.ok = "settings-updated";
    }
    if (x === "settings" && y === "rules") {
        z.modal = "yep";
        z.button.close = "yep";
        z.title = "rules settings";
        z.setup = guiEasy.popper.modal.settings(y);
        z.button.ok = "yep";
        z.action.ok = "settings-updated";
    }
    if (x === "settings" && y === "p2p") {
        z.modal = "yep";
        z.button.close = "yep";
        z.title = "p2p settings";
        z.setup = guiEasy.popper.modal.settings(y);
        z.button.ok = "yep";
        z.action.ok = "settings-updated";
    }
    if (x === "settings" && y === "advanced") {
        z.modal = "yep";
        z.button.close = "yep";
        z.title = "advanced settings";
        z.setup = guiEasy.popper.modal.settings(y);
        z.button.ok = "yep";
        z.action.ok = "settings-updated";
    }
    if (x === "settings" && y === "time") {
        z.modal = "yep";
        z.button.close = "yep";
        z.title = "time settings";
        z.setup = guiEasy.popper.modal.settings(y);
        z.button.ok = "yep";
        z.action.ok = "settings-updated";
    }
    if (x === "settings" && y === "log") {
        z.modal = "yep";
        z.button.close = "yep";
        z.title = "serial & log settings";
        z.setup = guiEasy.popper.modal.settings(y);
        z.button.ok = "yep";
        z.action.ok = "settings-updated";
    }
    if (x === "settings" && y === "location") {
        z.modal = "yep";
        z.button.close = "yep";
        z.title = "geolocation settings";
        z.setup = guiEasy.popper.modal.settings(y);
        z.button.ok = "yep";
        z.action.ok = "settings-updated";
        z.button.location = "yep";
    }
    if (x === "info" && y === "system") {
        z.modal = "yep";
        z.button.close = "yep";
        z.title = "system info";
        z.button.copy = "yep";
        z.action.copy = "clipboard-sysinfo_json";
        z.table = guiEasy.nodes[index].modal.table.sysinfo_json;
    }
    if (x === "info" && y === "sysvars") {
        z.modal = "yep";
        z.button.close = "yep";
        z.title = "system variables";
        z.button.copy = "yep";
        z.action.copy = "clipboard-sysvars";
        //z.table = guiEasy.nodes[index].modal.table.sysinfo_json;
    }
    if (x === "info" && y === "pinstate") {
        z.modal = "yep";
        z.button.close = "yep";
        z.title = "current pinstate";
        z.button.copy = "yep";
        z.action.copy = "clipboard-pinstate";
        //z.table = guiEasy.nodes[index].modal.table.sysinfo_json;
    }
    if (x === "info" && y === "log") {
        z.modal = "yep";
        z.button.close = "yep";
        z.action.close = "stop-log";
        let levels = guiEasy.logLevels();
        let currentLevel = levels[guiEasy.nodes[helpEasy.getCurrentIndex()].settings.config.log.web_level];
        z.title = "web log (" + helpEasy.capitalWord(currentLevel.text) + ")";
        z.button.copy = "yep";
        z.action.copy = "clipboard-log";
        z.info = `
            <div class='weblog' id='weblog-container'>Fetching log entries...</div>
        `;
        let autoScrollToggle = helpEasy.addInput(
                    {
                        "type": "toggle",
                        "alt": "settings-change",
                        "title": "auto-scroll",
                        "settingsTrue": 0,
                        "settingsFalse": 1,
                        "falseText": "scrolling on",
                        "trueText": "scrolling off",
                        "default":true
                    }
                );
        z.setup = `
        <div class="column">
            <div class="row"><div id="weblog-filters" class="is-left"></div></div>
            <div class="row"><input id="weblog-filter-input" type="search" placeholder="Filter log..."><label class="search-icon"></label></div>
            ` + autoScrollToggle + `
        </div>
        `;
    }
    if (x === "info" && y === "json") {
        // just open the json endpoint in a new tab... since we're not adding the "a" to DOM it'll be garbage collected
        let a = document.createElement("a");
        a.href = "http://" + guiEasy.nodes[helpEasy.getCurrentIndex()].ip + "/json";
        a.target = "_blank";
        a.click();
        z.countdown = 1; //since the modal never opens up but it's there = input events aren't triggered we set the countdown to 1 to automatically close it
    }
    if (x === "info" && y === "timing") {
        z.modal = "yep";
        z.button.close = "yep";
        z.title = "timing statistics";
        z.button.copy = "yep";
        z.action.copy = "clipboard-timingstats_json";
        z.table = guiEasy.nodes[index].modal.table.timingstats_json;
    }
    if (x === "task" && y === "edit") {
        z.modal = "yep";
        z.button.close = "yep";
        z.title = "editing task " + modalToOpen.args[0];
        z.button.ok = "yep";
        z.action.ok = "settings-updated";
        z.button.custom = "yep";
        z.action.custom = "delete-task";
        z.custom = {
            "text":"delete",
            "color": "warning"
        };
        z.setup = "<div class='column'>";
            z.setup += "<div class='row'>";
            z.setup += modalToOpen.args[3].start + modalToOpen.args[3]["html_" + defaultSettings.userSettings.dropdownList] + modalToOpen.args[3].end;
            z.setup += "</div>";
            z.setup += "<div class='row' id='setup-container'></div>";
        z.setup += "</div>";
    }
    if (x === "controller" && y === "edit") {
        z.modal = "yep";
        z.button.close = "yep";
        z.title = "editing controller " + modalToOpen.args[0];
        z.button.ok = "yep";
        z.action.ok = "settings-updated";
        z.button.custom = "yep";
        z.action.custom = "delete-controller";
        z.custom = {
            "text":"delete",
            "color": "warning"
        };
        z.setup = "<div class='column'>";
            z.setup += "<div class='row'>";
            z.setup += modalToOpen.args[3].start + modalToOpen.args[3]["html_" + defaultSettings.userSettings.dropdownList] + modalToOpen.args[3].end;
            z.setup += "</div>";
            z.setup += "<div class='row' id='setup-container'></div>";
        z.setup += "</div>";
    }
    if (x === "notification" && y === "edit") {
        z.modal = "yep";
        z.button.close = "yep";
        z.title = "editing notification " + modalToOpen.args[0];
        z.button.ok = "yep";
        z.action.ok = "settings-updated";
        z.button.custom = "yep";
        z.action.custom = "delete-notification";
        z.custom = {
            "text":"delete",
            "color": "warning"
        };
        z.setup = "<div class='column'>";
            z.setup += "<div class='row'>";
            z.setup += modalToOpen.args[3].start + modalToOpen.args[3]["html_" + defaultSettings.userSettings.dropdownList] + modalToOpen.args[3].end;
            z.setup += "</div>";
            z.setup += "<div class='row' id='setup-container'></div>";
        z.setup += "</div>";
    }
    if (x === "experimental") {
        z.modal = "yep";
        z.button.close = "yep";
        z.title = "experimental settings";
        z.setup = guiEasy.popper.modal.settings(x);
    }
    if (x === "patreon") {
        z.modal = "yep";
        z.button.close = "yep";
        z.title = "patreon goodies";
        z.setup = guiEasy.popper.modal.patreon();
        z.button.ok = "yep";
        z.action.ok = "settings-updated";
    }
    //Below we unhide "yep"s
    document.getElementById("modal-container").classList[logic[z.modal]]("is-hidden");
    if (z.action.ok !== null) {
        document.getElementById("modal-button-ok").dataset.click = z.action.ok;
    }
    if (z.action.cancel !== null) {
        document.getElementById("modal-button-cancel").dataset.click = z.action.cancel;
    }
    if (z.action.close !== null) {
        document.getElementById("modal-title-button-close").dataset.click = z.action.close;
    }
    if (z.action.copy !== null) {
        document.getElementById("modal-title-button-copy").dataset.click = z.action.copy;
    }
    if (z.action.location !== null) {
        document.getElementById("modal-title-button-location").dataset.click = z.action.location;
    }
    document.getElementById("modal-button-ok").classList[logic[z.button.ok]]("is-hidden");
    document.getElementById("modal-title-button-close").classList[logic[z.button.close]]("is-hidden");
    document.getElementById("modal-title-button-copy").classList[logic[z.button.copy]]("is-hidden");
    document.getElementById("modal-title-button-location").classList[logic[z.button.location]]("is-hidden");
    document.getElementById("modal-button-cancel").classList[logic[z.button.cancel]]("is-hidden");
    document.getElementById("modal-input-string").classList[logic[z.input.string]]("is-hidden");
    document.getElementById("modal-input-textarea").classList[logic[z.input.textarea]]("is-hidden");
    document.getElementById("label-modal-input-upload-file").classList[logic[z.input.upload]]("is-hidden");
    if (z.input.upload === "yep") {
        if (z.upload.max !== null && z.upload.free !== null) {
            let availablePercentage = Math.floor(z.upload.free / z.upload.max * 100);
            let free = document.getElementById("modal-input-upload-storage-free");
            let occupied = document.getElementById("modal-input-upload-storage-occupied");
            free.style.width = availablePercentage + "%";
            free.innerText = z.upload.free + "kB";
            occupied.style.width = (100 - availablePercentage) + "%";
            occupied.innerText = (z.upload.max - z.upload.free).toString() + "kB";
        }
        let inputFile = document.getElementById("modal-input-upload-file");
        inputFile.dataset.typeOfUpload = z.action.upload;
        inputFile.setAttribute("accept", z.upload.types);
        inputFile.addEventListener("change", function (event) {
            let what = event.target.dataset.typeOfUpload;
            let file = event.target.files[0];
            let id = event.target.id;
            helpEasy.uploadBinaryAsFile(what, file, id)
        }, false);
        // drag&drop events
        let labelInputFile = document.getElementById("label-modal-input-upload-file");
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            labelInputFile.addEventListener(eventName, function (e) {
                e.preventDefault();
                e.stopPropagation();
            }, false)
        });
        ['dragenter', 'dragover'].forEach(eventName => {
            labelInputFile.addEventListener(eventName, function () {
                labelInputFile.innerText = helpEasy.capitalWord("drop file here...");
                labelInputFile.classList.add('drag-drop-highlight');
            }, false)
        });
        ['dragleave', 'drop'].forEach(eventName => {
            labelInputFile.addEventListener(eventName, function (event) {
                labelInputFile.classList.remove('drag-drop-highlight');
                labelInputFile.innerText = helpEasy.capitalWord("upload file to unit");
                if (eventName === "drop") {
                    let what = inputFile.dataset.typeOfUpload;
                    let file = event.dataTransfer.files[0];
                    let id = "modal-input-upload-file";
                    if (file.name.slice(-3).toLowerCase() !== "bin" && what === "firmware") {
                        helpEasy.blinkElement("label-modal-input-upload-file", "warning");
                        labelInputFile.innerText = helpEasy.capitalWord("not a bin file!");
                        setTimeout(function () {
                            helpEasy.blinkElement("label-modal-input-upload-file", "warning");
                        },750);
                        setTimeout(function () {
                            labelInputFile.innerText = helpEasy.capitalWord("upload file to unit");
                        },1000);
                    } else {
                        helpEasy.uploadBinaryAsFile(what, file, id);
                    }
                }
            }, false)
        });
    }
    if (z.input.string !== "nah" || z.input.upload !== "nah" || z.input.textarea !== "nah") {
        document.getElementById("modal-input").classList.remove("is-hidden");
    }
    if (z.custom !== null) {
        document.getElementById("modal-button-custom").classList[logic[z.button.custom]]("is-hidden");
        document.getElementById("modal-button-custom").dataset.click = z.action.custom;
        document.getElementById("modal-button-custom").innerText = helpEasy.capitalWord(z.custom.text);
        document.getElementById("modal-button-custom").classList.add("main-" + z.custom.color);
    }
    if (z.upload.title !== null) {
        document.getElementById("label-modal-input-upload-file").innerText = helpEasy.capitalWord(z.upload.title);
    }
    if (z.title !== null) {
        document.getElementById("modal-title-text").innerText = helpEasy.capitalWord(z.title);
    }
    if (z.info !== null) {
        document.getElementById("modal-info").innerHTML = z.info;
        document.getElementById("modal-info").classList.remove("is-hidden");
    }
    if (z.table !== null) {
        document.getElementById("modal-table").innerHTML = z.table;
        document.getElementById("modal-table").classList.remove("is-hidden");
        guiEasy.current.modal = document.querySelectorAll("[data-modal-table]")[0];
    }
    if (z.setup !== null) {
        document.getElementById("modal-setup").innerHTML = z.setup;
        document.getElementById("modal-setup").classList.remove("is-hidden");
        guiEasy.current.modal = document.querySelectorAll("[data-modal-settings-table]")[0];
    }
    helpEasy.guiUpdaterSettings("fromBrowser");
    // since gui uses it's own settings this hackish lookup is done for dropdowns
    if (x === "settings" && y === "gui") {
        let dropdowns = document.querySelectorAll("[data-gui-dropdown-value]");
        for (let k = 0; k < dropdowns.length; k++) {
            if (dropdowns[k].dataset.guiDropdownValue !== "") {
                dropdowns[k].value = dropdowns[k].dataset.guiDropdownValue;
            }
        }
    }
    // we want to populate the setup container with html...
    if (x === "controller" || x === "task" || x === "notification") {
        setTimeout(function () {
            guiEasy.forms.setupForm(x);
        },20);
    }
    if (x === "info" && y === "log") {
        let backlog = helpEasy.logListBacklog();
        if (backlog.length > 0) {
            document.getElementById("weblog-container").innerHTML = backlog;
            let element = guiEasy.nodes[helpEasy.getCurrentIndex()].stats.logjson.lastEntryID;
            if (element !== undefined) {
                document.getElementById(element).scrollIntoView();
            }
        }
        guiEasy.loops.weblog = setInterval(function () {
            let timestamp = guiEasy.nodes[helpEasy.getCurrentIndex()].stats.logjson.timestampLast;
            if (timestamp === undefined) {
                timestamp = 0;
            }
            let timestamp2 = guiEasy.nodes[helpEasy.getCurrentIndex()].stats.logjson.timestamp;
            if (timestamp === timestamp2) {
                // no need to do more
            } else {
                let weblogContainer = document.getElementById("weblog-container");
                let newEntries = helpEasy.logListLive(timestamp);
                let innerText = weblogContainer.innerText;
                if (innerText === "Fetching log entries..." && newEntries.length !== 0) {
                    weblogContainer.innerHTML = newEntries;
                } else if (newEntries.length !== 0) {
                    weblogContainer.insertAdjacentHTML('beforeend', newEntries);
                }
                let element = guiEasy.nodes[helpEasy.getCurrentIndex()].stats.logjson.lastEntryID;
                if (element !== undefined && element !== "") {
                    let holdScroll = document.getElementById("generic-input--auto-scroll").checked;
                    if (holdScroll === false) {
                        document.getElementById(element).scrollIntoView({behavior: "smooth"});
                    }
                }
            }
        }, 100);
        let inputFilter = document.getElementById("weblog-filter-input");
        inputFilter.onkeyup = function (event) {
            if (event.key === "Enter") {
                let filterValue = inputFilter.value;
                inputFilter.value = "";
                let subText = filterValue.split(" ");
                let html = "";
                for (let i = 0; i < subText.length; i++) {
                    html += "<div class='tag with-close' data-click='filter-remove'>" + subText[i] + "</div>";
                }
                document.getElementById("weblog-filters").insertAdjacentHTML('beforeend', html);
                let eventDetails = {
                    "type": "filter",
                    "args": [
                        "filter",
                        "updated"
                    ]
                };
                guiEasy.popper.tryCallEvent(eventDetails);
            }
        }
    }
    //Countdown...
    if (z.countdown > 0) {
        let countdownElement = document.getElementById("modal-title-button-close");
        let messageElement = document.getElementById("modal-click-area");
        //make click on message close it (not just the button in the top right corner)
        messageElement.addEventListener("click", function () {
            clearInterval(timer);
            countdownElement.click();
        });
        countdownElement.innerText = z.countdown;
        countdownElement.classList.add("countdown");
        countdownElement.classList.remove("is-hidden");
        let timer = setInterval( function() {
            let currentValue = parseInt(countdownElement.innerText);
            if (currentValue > 1) {
                countdownElement.innerText = (currentValue - 1).toString();
            } else {
                clearInterval(timer);
                countdownElement.click();
            }
        }, 1000);
    }
};

guiEasy.popper.filter = function (what) {
    if (what.args[1] === "remove") {
        what.element.remove();
        let eventDetails = {
            "type": "filter",
            "args": [
                "filter",
                "updated"
            ]
        };
        guiEasy.popper.tryCallEvent(eventDetails);
    }
    if (what.args[1] === "updated") {
        let filters = document.getElementById("weblog-filters");
        let c = filters.children;
        guiEasy.loops.weblogPattern = [];
        if (c.length > 0) {
            for (let i = 0; i < c.length; i++) {
                let p = c[i].innerText.split(" ");
                for (let k = 0; k < p.length; k++) {
                    guiEasy.loops.weblogPattern.push(p[k].toLowerCase());
                }
            }
        }
        let container = document.getElementById("weblog-container");
        //remove all "is-hidden"
        let html = container.innerHTML.toString();
        container.innerHTML = html.replace(/is-hidden/g, "");
        container.lastChild.scrollIntoView();
        if (guiEasy.loops.weblogPattern.length > 0) {
            //start filtering
            let entries = container.children;
            for (let k = 0; k < entries.length; k++) {
                let check = helpEasy.ifStringContains(entries[k].innerText.toLowerCase(), guiEasy.loops.weblogPattern);
                if (check === false) {
                    //hide it
                    entries[k].classList.add("is-hidden");
                }
            }
            if (container.innerText.length === 0) {
                    let html =  "<div id='nothing-here'>Nothing found...</div>";
                    container.insertAdjacentHTML("afterbegin", html);
                    setTimeout(function () {
                        document.getElementById("nothing-here").remove();
                    }, 3000)
            }
        }
    }
};

guiEasy.popper.stop = function (what) {
    if (what.args[1] === "log") {
        // close the modal
        let eventDetails = {
            "type": "modal",
            "args": ["modal", "close"]
        };
        guiEasy.popper.tryCallEvent(eventDetails);
        // stop the log list ...
        clearInterval(guiEasy.loops.weblog);
    }
};

guiEasy.popper.modal.patreon = function () {
    //TODO: remove this test
    let string = helpEasy.hash.encode("123e4567-e89b-12d3-a456-426655440000", "cgZxarh0l40XV7OO5\n\n\n\n\nJtzyV6dWChocjv9B7DTKndCa3QJC8BUd59hpJtwfkA1xVVOSXEP8qNpxLlsnFgYjpxDg3jIem1rwj8U4tbnzMjrk9REu33XBU5R99qbTtGdm1cP8Y0Roc35f3wKCRVbn63ig870XXCGo8vwUWda57JY3EXX4RyCMqYrjn3hrx4G1UFRwu6qwG9McGCDqAxo3daMSPVSN2OqB9DjQB4ktS8yKj4BWZojH8QQnkL6pzjLKEDpTCwNfCkVhsbehY0URRguc0GsAO95U3OUtcwwlanKHtpmn66zCIGzWJNzqypPPta3Z00wsfnVJk0Hr9b4Nuq1hxBYQ1ZHaGnP6I4dz1fHIhEhWmoZtLMNkYiCCPACtWXgXHQugcbx2w5L4DX5JcsImIg9ZhMp7DxyHf dPuG17qksxTr3r5T1IXkz77rOBHLXvuClAQ4geormatC3AiaaGVxV63ltiK76ou41jaSfAPlJJKK35oITwYiU4BFsTYf0sHi  jLMYGDNeDctF5XLdyDMr0vho eb7uiHmRgR8Ry hbJeBvdoIYJybUWjZHFJHXt7VvAhTTfH1IplnYoSvNpq 1eaF5  qFaxoyeEjKAVNDhyez2t0rznxfr0JPFcqd9lqFuR7unv0ZJdKiE1pex3gGuS01CgRNfdyC9ZL3LBv9dsER2EYrQmy06M39YNVLBXPZHTdfxaISwVmd3pL2aJqQZNXaaepMjZJJyui95gWUnHp3EFj52YwnfLcHMYMQNJnrvPdiJN2AouhvLoB84gw7 REb0vgitqO7J9Vqm25yHih9pYUVzGRUOt5iVR8qIqlnlTpDETfFckBggNcXwK 87 lyY0ryF uJu0ffEVclvWNkRWi OiWgiN2j5dBsNrpw5csy2NN2OOX50ls7y NWxGilkKfofVCV9cOpnBVw5Z8jZxz6sW1I0NS0b4EDSg9HFeif03wLgvGipbDkBJbpFmyRWsMY74ezGCA 3JOaTUdiSNYT4xC791L25M");
    console.log(string);
    let newString = helpEasy.hash.decode("123e4567-e89b-12d3-a456-426655440000", string);
    console.log(newString);
    helpEasy.copyToClipboard(newString);
    //TODO: remove this test
    let html = "<div class='column'>";
    html += helpEasy.addInput(
    {
        "type": "string",
        "toSettings": true,
        "alt": "settings-change",
        "title": "patreon id",
        "settingsId": "defaultSettings--userSettings--preventDefaults--escape",
        "placeholder": ""
        }
    );
    html += helpEasy.addInput(
        {
            "type": "password",
            "toSettings": true,
            "alt": "settings-change",
            "title": "uuid",
            "settingsId": "defaultSettings--userSettings--preventDefaults--KLFSLJ",
            "placeholder": ""
        }
    );
    guiEasy.popper.modal.unlockStuff();
    return html + "</div>";
};

guiEasy.popper.modal.settings = function (type) {
    let html = "";
    html += helpEasy.openColumn("data-modal-settings-table");
    if (type === "gui") {
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toSettings": true,
                "alt": "settings-change",
                "title": "escape key",
                "settingsId": "defaultSettings--userSettings--preventDefaults--escape",
                "settingsTrue": 0,
                "settingsFalse": 1,
                "falseText": "esc = close modals",
                "trueText": "esc = not used",
                "default":true
            }
        );
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toSettings": true,
                "alt": "settings-change",
                "title": "ctrl space key",
                "settingsId": "defaultSettings--userSettings--preventDefaults--ctrl+space",
                "settingsTrue": 0,
                "settingsFalse": 1,
                "falseText": "ctrl + space = open swarm",
                "trueText": "ctrl + space = not used",
                "default":true
            }
        );
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toSettings": true,
                "alt": "settings-change",
                "title": "ctrl enter key",
                "settingsId": "defaultSettings--userSettings--preventDefaults--ctrl+enter",
                "settingsTrue": 0,
                "settingsFalse": 1,
                "falseText": "ctrl + enter = take screenshot",
                "trueText": "ctrl + enter = not used",
                "default":true
            }
        );
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toSettings": true,
                "alt": "settings-change",
                "title": "ctrl keys key",
                "settingsId": "defaultSettings--userSettings--preventDefaults--ctrl+keys",
                "settingsTrue": 0,
                "settingsFalse": 1,
                "falseText": "ctrl + s = save settings",
                "trueText": "ctrl + s = not used",
                "default":true
            }
        );
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toSettings": true,
                "alt": "settings-change",
                "title": "ctrl keyz key",
                "settingsId": "defaultSettings--userSettings--preventDefaults--ctrl+keyz",
                "settingsTrue": 0,
                "settingsFalse": 1,
                "falseText": "ctrl + z = dismiss changes",
                "trueText": "ctrl + z = not used",
                "default":true
            }
        );
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toSettings": true,
                "alt": "settings-change",
                "title": "alt digit key",
                "settingsId": "defaultSettings--userSettings--preventDefaults--alt+digit",
                "settingsTrue": 0,
                "settingsFalse": 1,
                "falseText": "alt + digit = jump to tab",
                "trueText": "alt + digit = not used",
                "default":true
            }
        );
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toSettings": true,
                "alt": "settings-change",
                "title": "alt arrow key",
                "settingsId": "defaultSettings--userSettings--preventDefaults--alt+arrows",
                "settingsTrue": 0,
                "settingsFalse": 1,
                "falseText": "alt + l/r arrow = jump to tab",
                "trueText": "alt + l/r arrow = not used",
                "default": true
            }
        );
        html += helpEasy.addLine();
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toSettings": true,
                "alt": "settings-change",
                "title": "wait for theme",
                "settingsId": "defaultSettings--userSettings--fastBoot",
                "settingsTrue": 1,
                "settingsFalse": 0,
                "trueText": "fast boot (no wait for theme)",
                "falseText": "wait for theme & gui settings",
                "default": false
            }
        );
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toSettings": true,
                "alt": "settings-change",
                "title": "minimize areas",
                "settingsId": "defaultSettings--userSettings--areasMinimized",
                "settingsTrue": 0,
                "settingsFalse": 1,
                "falseText": "areas collapsed by default",
                "trueText": "areas expanded by default",
                "default":false
            }
        );
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toSettings": true,
                "alt": "settings-change",
                "title": "show help links",
                "settingsId": "defaultSettings--userSettings--helpLinks",
                "settingsTrue": 0,
                "settingsFalse": 1,
                "falseText": "help links = show",
                "trueText": "help links &ne; show",
                "default":true
            }
        );
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toSettings": true,
                "alt": "settings-change",
                "title": "warn if internet lost",
                "settingsId": "defaultSettings--userSettings--internetLostShow",
                "settingsTrue": 0,
                "settingsFalse": 1,
                "falseText": "notify on internet lost",
                "trueText": "internet lost, don't care",
                "default":true
            }
        );
        html += helpEasy.addLine();
        html += helpEasy.addInput(
            {
                "type": "dropdown",
                "toSettings": true,
                "alt": "settings-change",
                "title": "syntax of copy to clipboard",
                "settingsId": "defaultSettings--userSettings--clipboardSyntax",
                "placeholder": "",
                "list2value": true,
                "optionListOffset": -1,
                "optionList": [
                    {"text": "default", "value": "default", "disabled":false, "note":""},
                    {"text": "github", "value": "github", "disabled":false, "note":""},
                    {"text": "phpbb", "value": "phpbb", "disabled":false, "note":""}
                ]
            }
        );
        html += helpEasy.addInput(
            {
                "type": "dropdown",
                "toSettings": true,
                "alt": "settings-change",
                "title": "plugin, controller, and notify dropdown",
                "settingsId": "defaultSettings--userSettings--dropdownList",
                "placeholder": "",
                "list2value": true,
                "optionListOffset": -1,
                "optionList": [
                    {"text": "default", "value": "default", "disabled":false, "note":""},
                    {"text": "no state", "value": "nostate", "disabled":false, "note":""},
                    {"text": "stripped", "value": "stripped", "disabled":false, "note":""}
                ]
            }
        );
    }
    if (type === "p2p") {
        html += helpEasy.addInput(
            {
                "type": "number",
                "toSettings": true,
                "alt": "settings-change",
                "title": "udp port",
                "settingsId": "config--espnetwork--port",
                "placeholder": "",
                "tooltip": "8266 is the default<br>ESP Easy UDP port.",
                "default": 8266,
                "max": 65535,
                "min": 0,
                "step": 1
            }
        );
        html += "<div class='is-left'>The setup for the P2P is made in the controller but here you set the port to be used. Why these are separated you may wonder, it's because the node list uses this port even if the P2P controller isn't activated.</div>";
    }
    //TODO: add experimental stuff here...
    if (type === "experimental") {
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toGuiSettings": true,
                "alt": "settings-change",
                "title": "WDI2C address",
                "settingsId": "config--experimental--WDI2CAddress",
                "settingsTrue": 1,
                "settingsFalse": 0,
                "trueText": "todo1",
                "falseText": "todo0",
                "default": false
            }
        );
    }
    if (type === "log") {
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toGuiSettings": true,
                "alt": "settings-change",
                "title": "enable serial",
                "settingsId": "config--serial--enabled",
                "settingsTrue": 1,
                "settingsFalse": 0,
                "trueText": "serial output enabled",
                "falseText": "serial not used",
                "default":false
            }
        );
        html += helpEasy.addInput(
            {
                "type": "dropdown",
                "toGuiSettings": true,
                "alt": "settings-change",
                "title": "serial baud rate",
                "settingsId": "config--serial--baudrate",
                "list2value": true,
                "optionListOffset": 0,
                "default": 3,
                "optionList": [
                    {"text": "9600", "value": 9600, "disabled":false, "note":""},
                    {"text": "19200", "value": 19200, "disabled":false, "note":""},
                    {"text": "57600", "value": 57600, "disabled":false, "note":""},
                    {"text": "115200", "value": 115200, "disabled":false, "note":""},
                    {"text": "128000", "value": 128000, "disabled":true, "note":""},
                    {"text": "256000", "value": 256000, "disabled":true, "note":""}
                ]
            }
        );
        html += helpEasy.addInput(
            {
                "type": "dropdown",
                "toGuiSettings": true,
                "alt": "settings-change",
                "title": "serial log level",
                "settingsId": "config--log--serial_level",
                "list2value": true,
                "optionListOffset": 0,
                "default": 2,
                "optionList": guiEasy.logLevels()
            }
        );
        html += helpEasy.addInput(
            {
                "type": "dropdown",
                "toGuiSettings": true,
                "alt": "settings-change",
                "title": "web log level",
                "settingsId": "config--log--web_level",
                "list2value": true,
                "optionListOffset": 0,
                "default": 2,
                "optionList": guiEasy.logLevels()
            }
        );
        html += helpEasy.addInput(
            {
                "type": "string",
                "toSettings": true,
                "alt": "settings-change",
                "title": "syslog ip",
                "settingsId": "config--log--syslog_ip",
                "settingsMaxLength": (3 + 1 + 3 + 1 + 3 + 1 + 3),
                "settingsIP": true,
                "placeholder": "",
                "valueIfBlank": "0.0.0.0",
                "default": ""
            }
        );
        html += helpEasy.addInput(
            {
                "type": "dropdown",
                "toGuiSettings": true,
                "alt": "settings-change",
                "title": "syslog server level",
                "settingsId": "config--log--syslog_level",
                "list2value": true,
                "optionListOffset": 0,
                "default": 0,
                "optionList": guiEasy.logLevels()
            }
        );
        html += helpEasy.addInput(
            {
                "type": "dropdown",
                "toGuiSettings": true,
                "alt": "settings-change",
                "title": "syslog facility",
                "settingsId": "config--log--syslog_facility",
                "list2value": true,
                "optionListOffset": 0,
                "default": 0,
                "optionList": [
                    {'text':'kernel', 'value':0, 'disabled':false, 'note':''},
                    {'text':'user', 'value':1, 'disabled':false, 'note':''},
                    {'text':'daemon', 'value':3, 'disabled':false, 'note':''},
                    {'text':'message', 'value':5, 'disabled':false, 'note':''},
                    {'text':'local0', 'value':16, 'disabled':false, 'note':''},
                    {'text':'local1', 'value':17, 'disabled':false, 'note':''},
                    {'text':'local2', 'value':18, 'disabled':false, 'note':''},
                    {'text':'local3', 'value':19, 'disabled':false, 'note':''},
                    {'text':'local4', 'value':20, 'disabled':false, 'note':''},
                    {'text':'local5', 'value':21, 'disabled':false, 'note':''},
                    {'text':'local6', 'value':22, 'disabled':false, 'note':''},
                    {'text':'local7', 'value':23, 'disabled':false, 'note':''}
                ]
            }
        );
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toGuiSettings": true,
                "alt": "settings-change",
                "title": "enable sd card logger",
                "settingsId": "config--log--sd_log_enabled",
                "settingsTrue": 1,
                "settingsFalse": 0,
                "trueText": "sd logger enabled",
                "falseText": "sd logger not used",
                "default":false
            }
        );
        html += helpEasy.addInput(
            {
                "type": "dropdown",
                "toGuiSettings": true,
                "alt": "settings-change",
                "title": "sd log level",
                "settingsId": "config--log--sd_level",
                "list2value": true,
                "optionListOffset": 0,
                "default": 0,
                "optionList": guiEasy.logLevels()
            }
        );
        html += helpEasy.addInput(
            {
                "type": "number",
                "toSettings": true,
                "alt": "settings-change",
                "title": "sd gpio",
                "settingsId": "config--log--sd_port",
                "placeholder": "",
                "default": 0,
                "max": 255,
                "min": 0,
                "step": 1
            }
        );
    }
    if (type === "location") {
        html += helpEasy.addInput(
            {
                "type": "number",
                "toSettings": true,
                "alt": "settings-change",
                "title": "Longitude [°]",
                "settingsId": "config--location--long",
                "placeholder": "",
                "default": 0,
                "max": 180,
                "min": -180,
                "step": 0.00000000000001,
                "width": "triple"
            }
        );
        html += helpEasy.addInput(
            {
                "type": "number",
                "toSettings": true,
                "alt": "settings-change",
                "title": "Latitude [°]",
                "settingsId": "config--location--lat",
                "placeholder": "",
                "default": 0,
                "max": 90,
                "min": -90,
                "step": 0.00000000000001,
                "width": "triple"
            }
        );
    }
    if (type === "time") {
        html += helpEasy.addInput(
            {
                "type": "number",
                "toSettings": true,
                "alt": "settings-change",
                "title": "time zone (minutes)",
                "settingsId": "config--dst--TimeZone",
                "placeholder": "",
                "default": 0,
                "max": 720,
                "min": -720,
                "step": 1
            }
        );
        html += helpEasy.addLine();
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toSettings": true,
                "alt": "settings-change",
                "title": "use ntp server",
                "settingsId": "config--ntp--enabled",
                "settingsTrue": 1,
                "settingsFalse": 0,
                "falseText": "ntp disabled",
                "trueText": "use ntp server",
                "default":false
            }
        );
        html += helpEasy.addInput(
            {
                "type": "string",
                "toSettings": true,
                "alt": "settings-change",
                "title": "ntp server",
                "settingsId": "config--ntp--host",
                "placeholder": "blank = default ntp server",
                "default": ""
            }
        );
        html += helpEasy.addLine();
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toSettings": true,
                "alt": "settings-change",
                "title": "daylight saving",
                "settingsId": "config--dst--enabled",
                "settingsTrue": 1,
                "settingsFalse": 0,
                "trueText": "daylight saving is enabled",
                "falseText": "no daylight saving",
                "default":false
            }
        );
        html += helpEasy.addLine();
        html += helpEasy.openArea("dst start");
        html += helpEasy.addInput(
            {
                "type": "number",
                "toSettings": true,
                "alt": "settings-change",
                "title": "hour",
                "settingsId": "config--dst--integer--start--hour",
                "placeholder": "",
                "tooltip": "The hour that <br> will be jumped ahead.",
                "default": 2,
                "max": 23,
                "min": 0,
                "step": 1,
                "prefixHTML": "<span style='width: 100%; text-align: left; margin-bottom: 3px;'>When</span>",
                "appendixHTML": ""
            }
        );
        html += helpEasy.addInput(
            {
                "type": "dropdown",
                "title": "week",
                "toSettings": true,
                "alt": "settings-change",
                "settingsId": "config--dst--integer--start--week",
                "placeholder": "",
                "default": 0,
                "list2value": true,
                "optionListOffset": 0,
                "optionList": guiEasy.timelist.week
            }
        );
        html += helpEasy.addInput(
            {
                "type": "dropdown",
                "title": "day",
                "toSettings": true,
                "alt": "settings-change",
                "settingsId": "config--dst--integer--start--day",
                "placeholder": "",
                "default": 0,
                "list2value": true,
                "optionListOffset": 0,
                "optionList": guiEasy.timelist.day
            }
        );
        html += helpEasy.addInput(
            {
                "type": "dropdown",
                "title": "month",
                "toSettings": true,
                "alt": "settings-change",
                "settingsId": "config--dst--integer--start--month",
                "placeholder": "",
                "default": 0,
                "list2value": true,
                "optionListOffset": 0,
                "optionList": guiEasy.timelist.month
            }
        );
        html += helpEasy.closeArea();
        html += helpEasy.openArea("dst end");
        html += helpEasy.addInput(
            {
                "type": "number",
                "toSettings": true,
                "alt": "settings-change",
                "title": "hour",
                "settingsId": "config--dst--integer--end--hour",
                "placeholder": "",
                "tooltip": "The hour that <br> will be jumped behind.",
                "default": 2,
                "max": 23,
                "min": 0,
                "step": 1,
                "prefixHTML": "<span style='width: 100%; text-align: left; margin-bottom: 3px;'>When</span>",
                "appendixHTML": ""
            }
        );
        html += helpEasy.addInput(
            {
                "type": "dropdown",
                "title": "week",
                "toSettings": true,
                "alt": "settings-change",
                "settingsId": "config--dst--integer--end--week",
                "placeholder": "",
                "default": 0,
                "list2value": true,
                "optionListOffset": 0,
                "optionList": guiEasy.timelist.week
            }
        );
        html += helpEasy.addInput(
            {
                "type": "dropdown",
                "title": "day",
                "toSettings": true,
                "alt": "settings-change",
                "settingsId": "config--dst--integer--end--day",
                "placeholder": "",
                "default": 0,
                "list2value": true,
                "optionListOffset": 0,
                "optionList": guiEasy.timelist.day
            }
        );
        html += helpEasy.addInput(
            {
                "type": "dropdown",
                "title": "month",
                "toSettings": true,
                "alt": "settings-change",
                "settingsId": "config--dst--integer--end--month",
                "placeholder": "",
                "default": 0,
                "list2value": true,
                "optionListOffset": 0,
                "optionList": guiEasy.timelist.month
            }
        );
        html += helpEasy.closeArea();
    }
    if (type === "rules") {
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toSettings": true,
                "alt": "settings-change",
                "title": "use rules",
                "settingsId": "config--rules--enabled",
                "settingsTrue": 0,
                "settingsFalse": 1,
                "trueText": "rules are not used",
                "falseText": "rules are activated",
                "default": true
            }
        );
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toSettings": true,
                "alt": "settings-change",
                "title": "tolerant last parameter",
                "settingsId": "config--rules--tolerantArgs",
                "settingsTrue": 1,
                "settingsFalse": 0,
                "trueText": "last parameter can be left out",
                "falseText": "tolerance is set to strict",
                "default": true
            }
        );
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toSettings": true,
                "alt": "settings-change",
                "title": "use old rules engine",
                "settingsId": "config--rules--useNewEngine",
                "settingsTrue": 1,
                "settingsFalse": 0,
                "falseText": "default engine",
                "trueText": "experimental engine",
                "default": true
            }
        );
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toSettings": true,
                "alt": "settings-change",
                "title": "send to http wait for acknowledge",
                "settingsId": "config--rules--sendToHTTPack",
                "settingsTrue": 1,
                "settingsFalse": 0,
                "trueText": "send to http = wait for ok",
                "falseText": "send to http = send & forget",
                "default": true
            }
        );
    }
    if (type === "mqtt") {
        html += helpEasy.addInput(
            {
                "type": "number",
                "toSettings": true,
                "alt": "settings-change",
                "title": "message interval [ms]",
                "settingsId": "config--mqtt--interval",
                "placeholder": "",
                "tooltip": "This is the minimum time <br> in-between messages.",
                "default": 100,
                "max": 999999,
                "min": 0,
                "step": 1
            }
        );
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toSettings": true,
                "alt": "settings-change",
                "title": "mqtt retain",
                "settingsId": "config--mqtt--retain_flag",
                "settingsTrue": 1,
                "settingsFalse": 0,
                "trueText": "mqtt retain used",
                "falseText": "mqtt retain not used",
                "default": false
            }
        );
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toSettings": true,
                "alt": "settings-change",
                "title": "use user name",
                "settingsId": "config--mqtt--useunitname",
                "settingsTrue": 1,
                "settingsFalse": 0,
                "trueText": "use unit name as client id",
                "falseText": "use generic client id",
                "default": false
            }
        );
        html += helpEasy.addInput(
            {
                "type": "toggle",
                "toSettings": true,
                "alt": "settings-change",
                "title": "use client id",
                "settingsId": "config--mqtt--changeclientidrecon",
                "settingsTrue": 1,
                "settingsFalse": 0,
                "trueText": "change client id each connect",
                "falseText": "persistent client id",
                "default": false
            }
        );
    }
    html += helpEasy.openColumn();
    return html;
};

guiEasy.popper.modal.factoryReset = function () {
    let html = "<div class='column'>";
    html += helpEasy.addInput(
        {
            "type": "toggle",
            "title": "keep unit name",
            "settingsTrue": 0,
            "settingsFalse": 1,
            "trueText": "will keep unit name / no",
            "falseText": "will not keep unit name / no",
            "default":false
            }
        );
    html += helpEasy.addInput(
        {
            "type": "toggle",
            "title": "keep wifi config",
            "settingsTrue": 0,
            "settingsFalse": 1,
            "trueText": "will keep wifi config",
            "falseText": "will not keep wifi config",
            "default":false
        }
    );
    html += helpEasy.addInput(
        {
            "type": "toggle",
            "title": "keep network config",
            "settingsTrue": 0,
            "settingsFalse": 1,
            "trueText": "will keep network config",
            "falseText": "will not keep network config",
            "default":false
        }
    );
    html += helpEasy.addInput(
        {
            "type": "toggle",
            "title": "keep ntp dst config",
            "settingsTrue": 0,
            "settingsFalse": 1,
            "trueText": "will keep ntp / dst config",
            "falseText": "will not keep ntp / dst config",
            "default":false
        }
    );
    html += helpEasy.addInput(
        {
            "type": "toggle",
            "title": "keep log config",
            "settingsTrue": 0,
            "settingsFalse": 1,
            "trueText": "will keep log config",
            "falseText": "will not keep log config",
            "default":false
        }
    );
    html += helpEasy.addLine();
    html += helpEasy.addInput(
        {
            "type": "dropdown",
            "title": "pre-defined config to use",
            "placeholder": "",
            "default": 0,
            "optionList": guiEasy.gpiolist()            //TODO: populate with pre-configs
        }
    );
    return html + "</div>";
};

guiEasy.popper.delete = function (whatToDo) {
    let type = whatToDo.args[1];
    if (type === "file") {
        let z = document.getElementById(whatToDo.dataset.filename);
        z.classList.add("is-inactive");
        guiEasy.nodes[helpEasy.getCurrentIndex()].deleteFile = whatToDo.dataset.filename;
        let url = "http://" + guiEasy.nodes[helpEasy.getCurrentIndex()].ip + "/filelist?delete=" + whatToDo.dataset.filename;
        fetch(url).then( results => {
            helpEasy.addToLogDOM(("response: " + results), 2);
            helpEasy.schedulerBump(guiEasy.nodes[helpEasy.getCurrentIndex()].scheduler, "filelist_json");
            helpEasy.schedulerBump(guiEasy.nodes[helpEasy.getCurrentIndex()].scheduler, "sysinfo_json");
            helpEasy.updateIndicator();
            }
        );
    }
};

guiEasy.popper.ghost = function (whatToDo) {
    console.log(whatToDo);
};

guiEasy.popper.screenshot = function () {
    helpEasy.screenshot();
};

guiEasy.popper.area = function (whatToDo) {
    let newState = whatToDo.args[1];
    let id = whatToDo.args.slice(2).join("-");
    let area = document.getElementById(id);
    let buttonMin = document.getElementById("button-min-" + id);
    let buttonMax = document.getElementById("button-max-" + id);
    if (newState === "min") {
        area.classList.add("hide-contents");
        buttonMax.classList.remove("is-hidden");
        buttonMin.classList.add("is-hidden");
    } else {
        area.classList.remove("hide-contents");
        buttonMax.classList.add("is-hidden");
        buttonMin.classList.remove("is-hidden");
    }
};

guiEasy.popper.update = async function (whatToDo) {
    if (whatToDo.args[1] === "location") {
        if (helpEasy.internet() === true) {
            if (defaultSettings.location === undefined) {
                defaultSettings.location = await helpEasy.locationByIP();
            }
            let longEl = document.getElementById("settings--input--config--location--long");
            let latEl = document.getElementById("settings--input--config--location--lat");
            longEl.value = defaultSettings.location.longitude;
            latEl.value = defaultSettings.location.latitude;
            helpEasy.blinkElement(longEl, "inverted");
            helpEasy.blinkElement(latEl, "inverted");
        } else {
            //flash the screen, since no internet we cannot use the external data..
            let eventDetails = {
                "type": "wave",
                "text": "No internet!",
                "color": "warning"
            };
            guiEasy.popper.tryCallEvent(eventDetails);
        }
    }
    //these can be skipped if the alt isn't populate
    if (whatToDo.args.alt === undefined) {
        return;
    }
    if (whatToDo.args.alt === "settings-change") {
        guiEasy.popper.settingsDiff(whatToDo);
    }
    let type = whatToDo.args.alt.split("-")[0];
    if (type === "css") {
        guiEasy.popper.css(whatToDo);
    }
    if (type === "editor") {
        //TODO: send to syntax highlighter...
        console.log(whatToDo);
    }
};

guiEasy.popper.edit = function (whatToDo) {
        let number = parseInt(whatToDo.args[2]);
        let presetNumber = 0;
        if (whatToDo.args[1] === "task") {
            presetNumber = guiEasy.nodes[helpEasy.getCurrentIndex()].settings.tasks[(number-1)].device;
        }
        if (whatToDo.args[1] === "controller") {
            presetNumber = guiEasy.nodes[helpEasy.getCurrentIndex()].settings.controllers[(number-1)].protocol;
        }
        if (whatToDo.args[1] === "notification") {
            presetNumber = guiEasy.nodes[helpEasy.getCurrentIndex()].settings.notifications[(number-1)].type;
        }
        if (presetNumber === 0) {
            //no plugin is setup
        }
        if (presetNumber) {
            //a plugin is set up but not part of firmware = cannot run
        }
        let options = helpEasy.setupDropdownList(whatToDo.args[1]);
        guiEasy.popper.modal({"args":[number,whatToDo.args[1],"edit", options]});
        helpEasy.sortOptionsInSelect(whatToDo.args[1] + "-dropdown-list");
        document.getElementById(whatToDo.args[1] + "-dropdown-list").value = presetNumber;
};

guiEasy.popper.settingsDiff = function (whatToDo) {
    let type = whatToDo.args.type;
    if (type === "string") {
        if (whatToDo.args.settingsIp !== undefined) {
            let ip = whatToDo.newValue;
            //maximum length of ip number is 15
            ip = ip.slice(0, 15);
            document.getElementById(whatToDo.args.id).value = ip;
            if (helpEasy.checkIfIP(ip)) {
                helpEasy.blinkElement(whatToDo.args.id, "success");
            } else {
                helpEasy.blinkElement(whatToDo.args.id, "warning");
            }
        }
    }
    if (type === "toggle") {
        let toggle = document.getElementById(whatToDo.args.id);
        let label = document.getElementById("label-" + whatToDo.args.id);
        let tooltipElement = false;
        for (let i = 0; i < label.children.length; i++) {
            if (label.children[i].classList.contains("got-tooltip")) {
                tooltipElement = true;
            }
        }
        if (tooltipElement) {
            //we got tooltip TODO: we should make the function only update the text, not the tooltip. Now it flickers....
            let tooltip = label.innerHTML.match(/<div class="tooltip">([\s\S]*?)<\/div>/)[1];
            label.innerHTML = `
                    <div class="got-tooltip">
                ` + helpEasy.capitalWord(toggle.dataset[toggle.checked + "Text"]) +
                `   <div class='tooltip'>` + tooltip + `</div>
                    </div>
            `;
        } else {
            label.innerHTML = "<div>" + helpEasy.capitalWord(toggle.dataset[toggle.checked + "Text"]) + "</div>";
        }
    }
};

guiEasy.popper.settings = function (whatToDo) {
    if (whatToDo.args[2] === undefined) {
        whatToDo.args[2] = "inverted";
    }
    let eventDetails = {
        "type": "wave",
        "text": whatToDo.args[1],
        "color": whatToDo.args[2]
    };
    guiEasy.popper.tryCallEvent(eventDetails);
};

guiEasy.popper.wave = function (args) {
    let waveElement = document.getElementById("wave");
    let textElement = document.getElementById("wave-text");
    waveElement.classList.add("main-" + args.color);
    textElement.innerHTML = helpEasy.capitalWord(args.text);
    waveElement.classList.remove("is-inactive");
    setTimeout( function () {
        waveElement.classList.add("is-inactive");
        waveElement.classList.remove("main-" + args.color);
        document.body.classList.remove("modal");
    }, 800);
};

guiEasy.popper.shortcut = function (keyboard) {
    let keyCombo = "";
    let pd = defaultSettings.userSettings.preventDefaults;
    if (keyboard.alt === true) {
        keyCombo += "alt "
    }
    if (keyboard.ctrl === true) {
        keyCombo += "ctrl ";
    }
    keyCombo += keyboard.key;
    keyCombo = keyCombo.trim().replace(/ /g, "+").toLowerCase();
    // "key" and the letter...
    if (keyCombo === "ctrl+keys" && keyboard.state === "keydown") {
        //Save settings...
        if (pd[keyCombo] === 1) {
            keyboard.event.preventDefault();
            let details = {};
            details.args = ("settings-save-success").split("-");
            guiEasy.popper.settings(details);
        }
    }
    if (keyCombo === "ctrl+keyz" && keyboard.state === "keydown") {
        //Cancel settings...
        if (pd[keyCombo] === 1) {
            keyboard.event.preventDefault();
            let details = {};
            details.args = ("settings-cancel-sunny").split("-");
            guiEasy.popper.settings(details);
            helpEasy.guiUpdaterSettings();
        }
    }
    if (keyCombo === "alt+altleft" && keyboard.state === "keydown") {
        //Show alt keys
        if (pd["alt+digit"] === 1) {
            keyboard.event.preventDefault();
            let alts = document.querySelectorAll(".alt-popup");
            for (let i = 0; i < alts.length; i++) {
                alts[i].classList.remove("is-hidden");
            }
        }
    }
    if (keyCombo === "ctrl+enter" && keyboard.state === "keydown") {
        //Screenshot
        if (pd[keyCombo] === 1) {
            keyboard.event.preventDefault();
            helpEasy.screenshot();
        }
    }
    if (keyCombo === "altleft" && keyboard.state === "keyup") {
        //Hide alt keys
        let alts = document.querySelectorAll(".alt-popup");
        for (let i = 0; i < alts.length; i++) {
            alts[i].classList.add("is-hidden");
        }
    }
    if (keyCombo === "escape" && keyboard.state === "keydown") {
        //close open modal
        if (pd[keyCombo] === 1) {
            keyboard.event.preventDefault();
            guiEasy.popper.modal({"args": ["modal", "close"]});
        }
    }
    if (keyCombo === "ctrl+space" && keyboard.state === "keydown") {
        //Show swarm
        if (pd[keyCombo] === 1) {
            keyboard.event.preventDefault();

        }
    }
    //ALT + DIGIT 0...9
    let number = keyCombo.replace( /^\D+/g, "");
    if (keyCombo === ("alt+digit" + number) && keyboard.state === "keydown") {
        //Goto tab..
        if (pd["alt+digit"] === 1) {
            keyboard.event.preventDefault();
            guiEasy.popper.tab({"args": ["tab", number]});
        }
        //guiEasy.popper.tab({"args":["tab", guiEasy.tabNumber[number]]}); <---- keep as reference now that numerical value is accepted
    }
    //APT + ARROW left/right, skip tabs
    if (
        (keyCombo === "alt+arrowleft"  && keyboard.state === "keydown") ||
        (keyCombo === "alt+arrowright" && keyboard.state === "keydown")
    ) {
        if (pd["alt+arrows"] === 1) {
            keyboard.event.preventDefault();
            let tabNumber = guiEasy.current.tabNumber;
            if (keyCombo === "alt+arrowleft") {tabNumber = tabNumber - 1} else {tabNumber = tabNumber + 1}
            while (guiEasy.tabNumber[tabNumber] === undefined) {
                if (keyCombo === "alt+arrowleft") {tabNumber = tabNumber - 1} else {tabNumber = tabNumber + 1}
                if (tabNumber < 0) {tabNumber = 9}
                if (tabNumber > 9) {tabNumber = 0}
            }
            guiEasy.popper.tab({"args":["tab", tabNumber]});
        }
    }
    helpEasy.addToLogDOM("key combo: " + keyCombo + " (" + keyboard.state + ")", 2);
};

guiEasy.popper.favicon = function () {
    let colors = {
        "inverted": "#2F4252",
        "sunny": "#FFD100",
        "info": "#FF8F12",
        "warning": "#EF483D",
        "success": "#00AE41",
        "font": "#FFFFFF"
    };
    let themeSetting = document.getElementById("custom-theme-settings").dataset;
    if (Object.keys(themeSetting).length > 0) {
        for (let i = 0; i < Object.keys(themeSetting).length; i++) {
            let x = Object.keys(themeSetting)[i].toString();
            let color = x.split(/(?=[A-Z])/).map(s => s.toLowerCase());
            colors[color[1]] = helpEasy.rgb2hex(themeSetting[x].split("|")[1]);
        }
    }
  helpEasy.favicon(colors);
};