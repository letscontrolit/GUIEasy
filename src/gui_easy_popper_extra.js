/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */
guiEasy.popper.tier = {
    "level": 0,
    "timestamp": null,
    "tier1": 1,
    "tier2": 2,
    "tier3": 3,
    "tier4": 4,
    "tier5": 5
};

guiEasy.popper.modal.unlockStuff = function () {
    let t = guiEasy.popper.tier;
    if (t.level >= t.tier1) {
        document.getElementById("drawer-theme").classList.remove("is-hidden");
    }
};

guiEasy.popper.drawer = function (drawerToOpen) {
    let drawerName = drawerToOpen.args[1];
    let drawerObject = document.getElementById("drawer-" + drawerName);
    let x = drawerObject.dataset;
    drawerObject.classList.toggle(x.close);
    drawerObject.classList.toggle(x.open);
    helpEasy.addToLogDOM("drawer: " + drawerName, 1);
};

guiEasy.popper.theme = function (whatToDo) {
    let what = whatToDo.args[1];
    if (what === "default") {
        let input = document.querySelectorAll('*[id^="theme-"]');
        for (let i = 0; i < input.length; i++) {
            if (input[i].dataset.alt === "css-familycustom") {
                continue;
            }
            let blob = {};
            blob.args = input[i].dataset;
            blob.placeholder = input[i].placeholder;
            blob.newValue = input[i].dataset.defaultValue;
            blob.newState = input[i].dataset.defaultValue;
            blob.index = input[i].dataset.defaultIndex;
            guiEasy.popper.css(blob);
        }
    }
    if (what === "copy" || what === "save") {
        let input = document.getElementById("custom-theme-settings");
        let themeOutput = JSON.stringify(input.dataset);
        themeOutput = themeOutput.match(/".*?\|.*?"/g);
        if (themeOutput === null) {
            themeOutput = ["NO CHANGES WAS MADE TO THE THEME"];
        }
        let themeVars = [];
        for (let i = 0; i < themeOutput.length; i++) {
            let line = themeOutput[i].split('":"')[1];
            if (line !== undefined) {
                themeVars[i] = line.slice(0, line.length-1);
            } else {
                themeVars[i] = themeOutput;
            }
        }
        themeVars.sort();
        let clipboard = "";
        for (let i = 0; i < themeVars.length; i++) {
            clipboard += themeVars[i];
            if (i !== (themeVars.length - 1)) {
                clipboard += "\n";
            }
        }
        if (what === "copy") {
            helpEasy.copyToClipboard(clipboard);
        } else {
            if (document.getElementById("label-temp") !== null) {
                document.getElementById("label-temp").remove();
            }
            let l = document.createElement("label");
            l.id = "label-temp";
            l.style.display = "none";
            document.body.appendChild(l);
            let file = new File(
                [clipboard],
                "theme.txt",
                {
                    type: "text/plain"
                }
            );
            helpEasy.uploadBinaryAsFile("generic", file, "temp");
            let eventDetails = {
                "type": "wave",
                "text": "theme saved",
                "color": "inverted"
            };
            guiEasy.popper.tryCallEvent(eventDetails);
        }
        whatToDo.args[1] = "theme";
        whatToDo.args[2] = what;
        guiEasy.popper.modal(whatToDo);
    }
    if (what === "import") {
        let importData;
        if (whatToDo.localFile) {
            importData = whatToDo.args[2];
        } else {
            importData = whatToDo.args[2].replace(/_/g,"-");
            importData = document.getElementById(importData).value;
        }
        document.getElementById("modal-container").classList.add("is-hidden");
        let themeVariables = importData.split("\n");
        let cssSettings = defaultSettings.css;
        for (let k =0; k < themeVariables.length; k++) {
            let h = themeVariables[k];
            let cssVar = h.split("|")[0];
            let cssValue = h.split("|")[1];
            let type = cssVar.split("-");
            type = type[(type.length - 1)];
            let newState = "";
            let placeholder = "";
            if (type === "toggle") {
                newState = cssSettings.toggle[cssVar][cssValue];
            }
            if (type === "size") {
                placeholder = cssSettings.size[cssVar].placeholder;
                cssValue = parseInt(cssValue);
            }
            let eventDetails = {
                "type": "update",
                "newValue": cssValue,
                "newState": newState,
                "placeholder": placeholder,
                "args": {
                    "alt": "css-" + type,
                    "change": cssVar
                }
            };
            //to not spam the event caller we add a delay (10ms per each call).
            setTimeout(function () {
                guiEasy.popper.tryCallEvent(eventDetails);
            }, (k*10));
        }
        guiEasy.guiStats.themeIsApplied = true;
    }
};

guiEasy.popper.css = function (blob) {
    let z = document.documentElement.style;
    let fallbackFonts = "'Segoe UI', Calibri, Arial";
    let themeSetting = document.getElementById("custom-theme-settings");
    let type = blob.args.alt.split("-")[1];
    let cssVar = blob.args.change;
    let newValue = blob.newValue;
    let inputElement = document.getElementById("theme-" + cssVar);
    if (type === "color") {
        if (newValue.match("#")) {
            newValue = helpEasy.hex2rgb(newValue);
        }
        inputElement.value = helpEasy.rgb2hex(newValue);
        if (cssVar === "main-bg-color") {
            //The overall color used by some browsers to color their navbar and thumbnails etc.
            document.getElementsByName("theme-color")[0].content = helpEasy.rgb2hex(newValue);
            guiEasy.current.backgroundColor = helpEasy.rgb2hex(newValue);
        }
        if (cssVar === "main-inverted-color") {
            guiEasy.current.invetedColor = helpEasy.rgb2hex(newValue);
        }
    }
    if (type === "toggle") {
        let newState = blob.newState;
        let newStateToValue = helpEasy.swapKey2Value(defaultSettings.css.toggle[cssVar]);
        newValue = newStateToValue[newState];
        let alreadySet = document.getElementById("theme-" + cssVar).dataset;
        if (alreadySet[(newState + "Text")] === undefined) {
            document.getElementById("label-" + cssVar).innerText = blob.args[(newState + "Text")];
        } else {
            document.getElementById("label-" + cssVar).innerText = alreadySet[(newState + "Text")];
        }
        document.getElementById("theme-" + cssVar).checked = newState;
    }
    if (type === "size") {
        inputElement.value = newValue;
        newValue += blob.placeholder;
    }
    if (type === "family") {
        let customFontRow = document.getElementById("row-custom-font-family");
        let customFontInput = document.getElementById("theme-custom-font-family");
        let index = 0;
        let loop = defaultSettings.css.family["default-font-family"];
        for (let k = 0; k < loop.length; k++) {
            if (loop[k].value === newValue) {
                index = k;
            }
        }
        if (index > 0) {
            inputElement.selectedIndex = index;
            customFontInput.value = "";
            customFontRow.classList.add("is-hidden");
        } else {
            //CUSTOM FONT WANTED
            inputElement.selectedIndex = 0;
            customFontRow.classList.remove("is-hidden");
            customFontRow.scrollIntoView(true);
            //See if a custom font name is given
            let test = newValue.split("|");
            if (test.length > 1) {
                newValue = fallbackFonts;
            } else {
                //Parse the font name
                let customFontName = newValue.replace(", " + fallbackFonts, "");
                customFontName = customFontName.replace(/'/g, "");
                document.getElementById("theme-custom-font-family").value = customFontName;
                let customFont = guiEasy.popper.css.customFont();
                newValue = "'" + customFont + "', " + fallbackFonts;
            }
        }
    }
    if (type === "familycustom") {
        let customFont = guiEasy.popper.css.customFont();
        newValue = "'" + customFont + "', " + fallbackFonts;
    }
    if (type === "url") {
        inputElement.value = newValue;
        guiEasy.popper.css.customBackground(blob);
    }
    //We store the values in a DOM element to easier fetch them later (export of theme etc.)
    themeSetting.setAttribute("data-" + cssVar, cssVar + "|" + newValue);
    //update the HTML element
    z.setProperty("--" + cssVar, newValue);
    guiEasy.popper.favicon();
};

guiEasy.popper.css.testUrl = function(url, linkId, elementId) {
    let link = document.getElementById(linkId);
    if (link !== null) {
        link.remove();
    }
    link = document.createElement("link");
    link.id = linkId;
    link.type = "text/css";
    link.rel = "stylesheet";
    link.setAttribute("data-error", "warning");
    link.setAttribute("data-load", "success");
    link.addEventListener("error", function () {
        helpEasy.blinkElement(elementId,"warning");
    });
    link.addEventListener("load", function () {
        helpEasy.blinkElement(elementId,"success");
    });
    document.head.appendChild(link);
    link.href = url;
};

guiEasy.popper.css.customFont = function () {
    let linkId = "custom-google-font-link";
    let elementId = "theme-custom-font-family";
    let googleUrl = "https://fonts.googleapis.com/css?family=";
    let fontName = document.getElementById(elementId);
    let url = googleUrl + fontName.value.split(' ').join('+');
    guiEasy.popper.css.testUrl(url, linkId, elementId);
    return fontName.value;
};

guiEasy.popper.css.customBackground = function (blob) {
    let url = blob.newValue;
    let body = document.body;
    let selector1 = "body.got-wallpaper::after";
    let selector2 = "div.got-wallpaper::after";
    //let selector = "body.got-wallpaper nav, body.got-wallpaper::after";
    if (url === "") {
        body.classList.remove("got-wallpaper");
    }
    let linkId = "custom-background-link";
    let elementId = "theme-custom-wallpaper-url";
    guiEasy.popper.css.testUrl(url, linkId, elementId);
    let stylesheet = document.styleSheets[0];
    for (let i = 0; i < stylesheet.cssRules.length; i++) {
        let x = stylesheet.cssRules[i];
        if (x.selectorText === selector1 || x.selectorText === selector2) {
            x.style.background = "url(" + url + ")";
            x.style.backgroundRepeat = "no-repeat";
            x.style.backgroundPosition = "center center";
            x.style.backgroundSize = "cover";
            x.style.backgroundAttachment = "fixed";
            x.style.backgroundAttachment = "fixed";
        }
    }
    if (url !== "") {
        body.classList.add("got-wallpaper");
    }
};

guiEasy.popper.loadGUIsettings = function () {
    let typeOfStartup = "silentStartup";
    if (defaultSettings.userSettings.waitForTheme === 1) {
        typeOfStartup = "startup";
    }
    helpEasy.listOfProcesses(
        "gui",
        "Waiting for gui settings to be applied",
        Date.now(),
        typeOfStartup
    );
    let x = setInterval(function () {
        let y = guiEasy.nodes[helpEasy.getCurrentIndex()].live;
        if (y.filelist_json !== undefined) {
            clearInterval(x);
            let files = y.filelist_json.map(a => a.fileName);
            if (files.indexOf("gui.txt") > -1) {
                helpEasy.addToLogDOM("Applying GUI settings", 1);
                let timeStart = Date.now();
                let path = "http://" + guiEasy.nodes[helpEasy.getCurrentIndex()].ip + "/gui.txt?callback=" + timeStart;
                fetch(path)
                    .then(response => response.json())
                    .then(json => {
                        defaultSettings.userSettings = json;
                        helpEasy.processDone("gui", typeOfStartup);
                    })
            } else {
                helpEasy.processDone("gui", typeOfStartup);
            }
        }
    }, 25)

};

guiEasy.popper.loadTheme = function () {
    let typeOfStartup = "silentStartup";
    if (defaultSettings.userSettings.waitForTheme === 1) {
        typeOfStartup = "startup";
    }
    helpEasy.listOfProcesses(
        "theme",
        "Waiting for theme to be applied",
        Date.now(),
        typeOfStartup
    );
    let x = setInterval(function () {
        let y = guiEasy.nodes[helpEasy.getCurrentIndex()].live;
        if (y.filelist_json !== undefined) {
            clearInterval(x);
            let files = y.filelist_json.map(a => a.fileName);
            if (files.indexOf("theme.txt") > -1) {
                helpEasy.addToLogDOM("Applying theme", 1);
                let timeStart = Date.now();
                let path = "http://" + guiEasy.nodes[helpEasy.getCurrentIndex()].ip + "/theme.txt?callback=" + timeStart;
                fetch(path)
                    .then(response => response.text())
                    .then(text => {
                        guiEasy.popper.theme({
                            "localFile": true,
                            "args":["theme","import",text]
                        });
                        helpEasy.processDone("theme", typeOfStartup);
                    })
            } else {
                helpEasy.processDone("theme", typeOfStartup);
            }
        }
    }, 25)
};

guiEasy.popper.extraFeatures = function () {

};