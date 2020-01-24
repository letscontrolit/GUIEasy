/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */
// HERE WE PUT ALL OUR "PAGE" FUNCTIONS
guiEasy.curly.page = function (arg) {
    let type = arg[0];
    if (
        type === "main" ||
        type === "config" ||
        type === "hardware" ||
        type === "tasks" ||
        type === "controllers" ||
        type === "notification" ||
        type === "tools" ||
        type === "rules"
    ) {
        return guiEasy.curly.page[type];
    }
};

guiEasy.curly.page.main = function () {
    return `
        {{UNIT-SHORTINFO}}
        {{UNIT-WELCOMETEXT}}
        {{UNIT-GAUGES}}
        <br class="got-margin">
        {{NODELIST}}
    `;
};

guiEasy.curly.page.tasks = function () {
    return `
            {{TASKTABLE}}
        `;
};

guiEasy.curly.page.controllers = function () {
    return `
            {{CONTROLLERTABLE}}
        `;
};

guiEasy.curly.page.notification = function () {
    return `
            {{NOTIFICATIONTABLE}}
        `;
};

guiEasy.curly.page.tools = function () {
    let html = "";
    html += helpEasy.dashGroupContainerOpen("commands");
    html += helpEasy.dashBoxContainerOpen();
    html += helpEasy.addToolsButton(
        {
            "type": "command",
            "buttonAction": "command-reboot",
            "icon": "reboot",
            "text": "reboot the esp",
            "color": "bg",
            "waveText": "unit rebooting..."
        }
    );
    html += helpEasy.addToolsButton(
        {
            "type": "command",
            "buttonAction": "command-wificonnect",
            "icon": "wificonnect",
            "text": "connect to <br> preset wifi",
            "color": "success",
            "waveText": "wifi connecting..."
        }
    );
    html += helpEasy.addToolsButton(
        {
            "type": "command",
            "buttonAction": "command-wifidisconnect",
            "icon": "wifidisconnect",
            "text": "disconnect from <br> current wifi",
            "color": "warning",
            "waveText": "wifi disconnected..."
        }
    );
    html += helpEasy.dashContainerClose();
    html += helpEasy.dashContainerClose();

    html += helpEasy.dashGroupContainerOpen("info pages");
    html += helpEasy.dashBoxContainerOpen();
    html += helpEasy.addToolsButton(
        {
            "type": "info",
            "button": "system info",
            "buttonAction": "modal-info-system",
            "text": "show system <br> info page"
        }
    );
    html += helpEasy.addToolsButton(
        {
            "type": "info",
            "button": "web log",
            "buttonAction": "modal-info-log",
            "text": "show web log"
        }
    );
    html += helpEasy.addToolsButton(
        {
            "type": "info",
            "button": "json endpoint",
            "buttonAction": "modal-info-json",
            "text": "open the <br> json endpoint"
        }
    );
    html += helpEasy.addToolsButton(
        {
            "type": "info",
            "button": "timing stats",
            "buttonAction": "modal-info-timing",
            "text": "show timing <br> statistics"
        }
    );
    html += helpEasy.addToolsButton(
        {
            "type": "info",
            "button": "pin state buffer",
            "buttonAction": "modal-info-pinstate",
            "text": "show pin <br> state buffer"
        }
    );
    html += helpEasy.addToolsButton(
        {
            "type": "info",
            "button": "system variables",
            "buttonAction": "modal-info-sysvars",
            "text": "show all system <br> variables and <br> conversions"
        }
    );
    html += helpEasy.dashContainerClose();
    html += helpEasy.dashContainerClose();

    html += helpEasy.dashGroupContainerOpen("scanners");
    html += helpEasy.dashBoxContainerOpen();
    html += helpEasy.addToolsButton(
        {
            "type": "scanner",
            "buttonAction": "modal-wifi-scanner",
            "button": "wifi",
            "text": "scan for wifi<br> networks"
        }
    );
    html += helpEasy.addToolsButton(
        {
            "type": "scanner",
            "buttonAction": "modal-i2c-scanner",
            "button": "i2c",
            "text": "scan for <br> i2c devices"
        }
    );
    html += helpEasy.dashContainerClose();
    html += helpEasy.dashContainerClose();

    html += helpEasy.dashGroupContainerOpen("system");
    html += helpEasy.dashBoxContainerOpen();
    html += helpEasy.addToolsButton(
        {
            "type": "system",
            "button": "time",
            "buttonAction": "modal-settings-time",
            "text": "time <br> settings"
        }
    );
    html += helpEasy.addToolsButton(
        {
            "type": "system",
            "button": "location",
            "buttonAction": "modal-settings-location",
            "text": "location <br> settings"
        }
    );
    html += helpEasy.addToolsButton(
        {
            "type": "system",
            "button": "user interface",
            "buttonAction": "modal-settings-gui",
            "text": "manage <br> gui settings"
        }
    );
    html += helpEasy.addToolsButton(
        {
            "type": "system",
            "buttonAction": "modal-files-table",
            "button": "files",
            "text": "manage <br> files"
        }
    );
    html += helpEasy.addToolsButton(
        {
            "type": "system",
            "buttonAction": "modal-firmware-update",
            "button": "update",
            "text": "update <br> firmware"
        }
    );
    html += helpEasy.addToolsButton(
        {
            "type": "system",
            "buttonAction": "modal-firmware-reset",
            "button": "reset",
            "text": "factory reset <br> firmware"
        }
    );
    html += helpEasy.addToolsButton(
        {
            "type": "system",
            "button": "patreon goodies",
            "buttonAction": "modal-patreon",
            "text": "unlock <br> paid features"
        }
    );
    html += helpEasy.dashContainerClose();
    html += helpEasy.dashContainerClose();

    html += helpEasy.dashGroupContainerOpen("advanced");
    html += helpEasy.dashBoxContainerOpen();
    html += helpEasy.addToolsButton(
        {
            "type": "system",
            "button": "rules",
            "buttonAction": "modal-settings-rules",
            "text": "rules <br> setup"
        }
    );
    html += helpEasy.addToolsButton(
        {
            "type": "system",
            "button": "p2p",
            "buttonAction": "modal-settings-p2p",
            "text": "easy communication <br> settings"
        }
    );
    html += helpEasy.addToolsButton(
        {
            "type": "system",
            "button": "mqtt",
            "buttonAction": "modal-settings-mqtt",
            "text": "generic mqtt <br> settings"
        }
    );
    html += helpEasy.addToolsButton(
        {
            "type": "system",
            "button": "serial & log",
            "buttonAction": "modal-settings-log",
            "text": "serial and log <br> settings"
        }
    );
    html += helpEasy.addToolsButton(
        {
            "type": "system",
            "button": "experimental",
            "buttonAction": "modal-experimental",
            "text": "highly experimental <br> features"
        }
    );
    html += helpEasy.dashContainerClose();
    html += helpEasy.dashContainerClose();
    return html;
};

guiEasy.curly.page.rules = function () {
    return `
        <div class="editor" id="rules-editor-background">
            <textarea   class="is-monotext"
                        autocomplete="off"
                        autocorrect="off"
                        autocapitalize="off" 
                        spellcheck="false"
                        data-input="editor-syntax"
                        data-alt="rules"
                        wrap="soft"
                        id="rules-editor"
            ></textarea>
            <div class="editor-container">
                <div        class="editor-selection is-monotext"
                            tabindex="-1"
                            id="rules-editor-selection"
                >‌</div>
                <div        class="editor-syntax is-monotext"
                            tabindex="-1"
                            id="rules-editor-syntax"
                >‌</div>
                <div        class="editor-input is-monotext"
                            tabindex="-1"
                            id="rules-editor-input"
                >‌</div>
                <div class="is-right text-tiny" id="rules-editor-file-size"></div>
                <div id="rules-editor-inactive">{{ICON-LOCKED}}</div>
            </div>
        </div>
        `;
};

guiEasy.curly.page.config = function () {
    let html = "";
    html += helpEasy.openArea("unit");
    html += helpEasy.openColumn();
    html += helpEasy.addInput(
        {
            "type": "string",
            "toSettings": true,
            "alt": "settings-change",
            "title": "unit name",
            "settingsId": "config--general--unitname",
            "settingsMaxLength": 99999,
            "settingsRegEx": "",
            "placeholder": "",
            "allowedBlank": false,
            "default": "ESP_Easy"
        }
    );
    html += helpEasy.closeColumn();
    html += helpEasy.openColumn();
    html += helpEasy.addInput(
        {
            "type": "toggle",
            "toSettings": true,
            "alt": "settings-change",
            "title": "append number",
            "settingsId": "config--general--doNotAppendUnitNumber",
            "settingsTrue": 0,
            "settingsFalse": 1,
            "trueText": "Hostname: name_number",
            "falseText": "Hostname: name",
            "default":true
        }
    );
    html += helpEasy.addInput(
        {
            "type": "number",
            "toSettings": true,
            "alt": "settings-change",
            "title": "unit number",
            "settingsId": "config--general--unitnr",
            "placeholder": "",
            "tooltip": "0 and 255 are not valid<br>if you want to use p2p.",
            "default": 0,
            "max": 255,
            "min": 0,
            "step": 1
        }
    );
    html += helpEasy.closeColumn();
    html += helpEasy.openColumn();
    html += helpEasy.addInput(
        {
            "type": "password",
            "toSettings": true,
            "alt": "settings-change",
            "title": "admin password",
            "settingsId": "security--0--password",
            "settingsMaxLength": 99999,
            "settingsRegEx": "",
            "placeholder": "blank = no password",
            "default": ""
        }
    );
    html += helpEasy.closeColumn();
    html += helpEasy.closeArea();

    html += helpEasy.openArea("wifi");
    html += helpEasy.openColumn();
    html += helpEasy.addInput(
        {
            "type": "string",
            "toSettings": true,
            "alt": "settings-change",
            "title": "ssid",
            "settingsId": "security--0--WifiSSID",
            "settingsMaxLength": 99999,
            "settingsRegEx": "",
            "placeholder": "",
            "default": ""
        }
    );
    html += helpEasy.addInput(
        {
            "type": "password",
            "toSettings": true,
            "alt": "settings-change",
            "title": "wpa key",
            "settingsId": "security--0--WifiKey",
            "settingsMaxLength": 99999,
            "settingsRegEx": "",
            "placeholder": "",
            "default": ""
        }
    );
    html += helpEasy.closeColumn();
    html += helpEasy.openColumn();
    html += helpEasy.addInput(
        {
            "type": "string",
            "toSettings": true,
            "alt": "settings-change",
            "title": "ssid fallback",
            "settingsId": "security--0--WifiSSID2",
            "settingsMaxLength": 99999,
            "settingsRegEx": "",
            "placeholder": "",
            "default": ""
        }
    );
    html += helpEasy.addInput(
        {
            "type": "password",
            "toSettings": true,
            "alt": "settings-change",
            "title": "wpa key fallback",
            "settingsId": "security--0--WifiKey2",
            "settingsMaxLength": 99999,
            "settingsRegEx": "",
            "placeholder": "",
            "default": ""
        }
    );
    html += helpEasy.closeColumn();
    html += helpEasy.openColumn();
    html += helpEasy.addInput(
        {
            "type": "password",
            "toSettings": true,
            "alt": "settings-change",
            "title": "ap mode wpa key",
            "settingsId": "security--0--WifiAPKey",
            "settingsMaxLength": 99999,
            "settingsRegEx": "",
            "placeholder": 'blank = "configesp"',
            "default": "",
            "valueIfBlank": "configesp"
        }
    );
    html += helpEasy.closeColumn();
    html += helpEasy.closeArea();

    html += helpEasy.openArea("ip settings");
    html += helpEasy.openColumn();
    html += helpEasy.addInput(
        {
            "type": "string",
            "toSettings": true,
            "alt": "settings-change",
            "title": "esp ip",
            "settingsId": "config--IP--ip",
            "settingsMaxLength": (3 + 1 + 3 + 1 + 3 + 1 + 3),
            "settingsIP": true,
            "placeholder": "blank = DHCP",
            "valueIfBlank": "0.0.0.0",
            "default": ""
        }
    );
    html += helpEasy.addInput(
        {
            "type": "string",
            "toSettings": true,
            "alt": "settings-change",
            "title": "gateway",
            "settingsId": "config--IP--gw",
            "settingsMaxLength": (3 + 1 + 3 + 1 + 3 + 1 + 3),
            "settingsIP": true,
            "placeholder": "blank = DHCP",
            "valueIfBlank": "0.0.0.0",
            "default": ""
        }
    );
    html += helpEasy.closeColumn();
    html += helpEasy.openColumn();
    html += helpEasy.addInput(
        {
            "type": "string",
            "toSettings": true,
            "alt": "settings-change",
            "title": "subnet mask",
            "settingsId": "config--IP--subnet",
            "settingsMaxLength": (3 + 1 + 3 + 1 + 3 + 1 + 3),
            "settingsIP": true,
            "placeholder": "blank = DHCP",
            "valueIfBlank": "0.0.0.0",
            "default": ""
        }
    );
    html += helpEasy.addInput(
        {
            "type": "string",
            "toSettings": true,
            "alt": "settings-change",
            "title": "dns",
            "settingsId": "config--IP--dns",
            "settingsMaxLength": (3 + 1 + 3 + 1 + 3 + 1 + 3),
            "settingsIP": true,
            "placeholder": "blank = DHCP",
            "valueIfBlank": "0.0.0.0",
            "default": ""
        }
    );
    html += helpEasy.closeColumn();
    html += helpEasy.openColumn();
    //blank
    html += helpEasy.closeColumn();
    html += helpEasy.closeArea();

    html += helpEasy.openArea("client ip filtering");
    html += helpEasy.openColumn();
    html += helpEasy.addInput(
        {
            "type": "dropdown",
            "toSettings": true,
            "alt": "settings-change",
            "title": "client ip block level",
            "settingsId": "security--0--IPblockLevel",
            "placeholder": "",
            "default": 1,
            "optionList":[
                {"text": "Allow All",            "value": "0"},
                {"text": "Allow Local Subnet",   "value": "1"},
                {"text": "Allow IP range",       "value": "2"}
            ],
            "optionListOffset": 0
        }
    );
    html += helpEasy.closeColumn();
    html += helpEasy.openColumn();
    html += helpEasy.addInput(
        {
            "type": "string",
            "toSettings": true,
            "alt": "settings-change",
            "title": "access ip lower range",
            "settingsId": "security--0--AllowedIPrangeLow",
            "settingsMaxLength": (3 + 1 + 3 + 1 + 3 + 1 + 3),
            "settingsIP": true,
            "placeholder": "",
            "default": ""
        }
    );
    html += helpEasy.closeColumn();
    html += helpEasy.openColumn();
    html += helpEasy.addInput(
        {
            "type": "string",
            "toSettings": true,
            "alt": "settings-change",
            "title": "access ip upper range",
            "settingsId": "security--0--AllowedIPrangeHigh",
            "settingsMaxLength": (3 + 1 + 3 + 1 + 3 + 1 + 3),
            "settingsIP": true,
            "placeholder": "",
            "default": ""
        }
    );
    html += helpEasy.closeColumn();
    html += helpEasy.closeArea();

    html += helpEasy.openArea("sleep mode");
    html += helpEasy.openColumn();
    html += helpEasy.addInput(
        {
            "type": "number",
            "toSettings": true,
            "alt": "settings-change",
            "title": "awake time",
            "settingsId": "config--sleep--awaketime",
            "placeholder": "s",
            "tooltip": "0 = sleep disabled,<br>else time awake from sleep.",
            "default": 0,
            "max": 12113,
            "min": 0,
            "step": 1
        }
    );
    html += helpEasy.closeColumn();
    html += helpEasy.openColumn();
    html += helpEasy.addInput(
        {
            "type": "number",
            "toSettings": true,
            "alt": "settings-change",
            "title": "sleep time",
            "settingsId": "config--sleep--sleeptime",
            "placeholder": "s",
            "tooltip": "Max 12113 seconds<br>(little over 200 minutes).",
            "default": 3600,
            "max": 12113,
            "min": 10,
            "step": 1
        }
    );
    html += helpEasy.closeColumn();
    html += helpEasy.openColumn();
    html += helpEasy.addInput(
        {
            "type": "toggle",
            "toSettings": true,
            "alt": "settings-change",
            "title": "sleep on connection failure",
            "settingsId": "config--sleep--sleeponfailiure",
            "settingsTrue": 1,
            "settingsFalse": 0,
            "trueText": "Go to sleep on connection failed",
            "falseText": "Stay awake until connected",
            "default":false
        }
    );
    html += helpEasy.closeColumn();
    html += helpEasy.closeArea();
    return html;
};

guiEasy.curly.page.hardware = function () {
    let html = "";
    html += helpEasy.openArea("generic pin setup");
    html += helpEasy.openColumn();
    html += helpEasy.addInput(
        {
            "type": "dropdown",
            "toSettings": true,
            "alt": "settings-change",
            "title": "gpio wifi status led",
            "settingsId": "hardware--led--gpio",
            "placeholder": "",
            "default": 0,
            "optionList": guiEasy.gpiolist(),
            "optionListOffset": -1
        }
    );
    html += helpEasy.addInput(
        {
            "type": "toggle",
            "toSettings": true,
            "alt": "settings-change",
            "title": "inverse led",
            "settingsId": "hardware--led--inverse",
            "settingsTrue": 1,
            "settingsFalse": 0,
            "tooltip": "Use 'GPIO 2 (D4)' with 'Inverse'<br>checked for on board LED",
            "trueText": "led is inverse",
            "falseText": "led is normal",
            "default": true
        }
    );
    html += helpEasy.closeColumn();
    html += helpEasy.openColumn();
    html += helpEasy.addInput(
        {
            "type": "dropdown",
            "toSettings": true,
            "alt": "settings-change",
            "title": "gpio reset button",
            "settingsId": "hardware--reset--pin",
            "placeholder": "",
            "default": 0,
            "optionList": guiEasy.gpiolist(),
            "optionListOffset": -1
        }
    );
    html += helpEasy.closeColumn();
    html += helpEasy.openColumn();
    html += helpEasy.addInput(
        {
            "type": "dropdown",
            "toSettings": true,
            "alt": "settings-change",
            "title": "gpio i2c sda",
            "settingsId": "hardware--i2c--sda",
            "placeholder": "",
            "default": 5,
            "optionList": guiEasy.gpiolist(),
            "optionListOffset": -1
        }
    );
    html += helpEasy.addInput(
        {
            "type": "dropdown",
            "toSettings": true,
            "alt": "settings-change",
            "title": "gpio i2c scl",
            "settingsId": "hardware--i2c--scl",
            "placeholder": "",
            "default": 6,
            "optionList": guiEasy.gpiolist(),
            "optionListOffset": -1
        }
    );
    html += helpEasy.addLine();
    html += helpEasy.addInput(
        {
            "type": "toggle",
            "toSettings": true,
            "alt": "settings-change",
            "title": "initiate spi",
            "settingsId": "hardware--spi--enabled",
            "settingsTrue": 1,
            "settingsFalse": 0,
            "tooltip":'CLK=GPIO 14 (D5)<br>MISO=GPIO 12 (D6)<br>MOSI=GPIO-13 (D7)<hr>Chip Select (CS) config<br>must be done in the plugin!',
            "trueText": "spi will be initiated on boot",
            "falseText": "spi is inactivated",
            "default": false
        }
    );
    html += helpEasy.closeColumn();
    html += helpEasy.closeArea();

    html += helpEasy.openArea("gpio boot states");
    html += helpEasy.openColumn();
    let list = guiEasy.gpiolist();
    let k = 0;
    for (let i = 1; i < list.length; i++) {
        let name = list[i].text;
        let note = list[i].note;
        let disabled = list[i].disabled;
        let gpio = list[i].value;
        html += helpEasy.addInput(
            {
                "type": "dropdown",
                "toSettings": true,
                "alt": "settings-change",
                "title": "pin mode " + name + " " + note + ": ",
                "settingsId": "hardware--gpio--" + gpio,
                "placeholder": "",
                "default": 0,
                "optionList":[
                    {"text": "Default", "value":0},
                    {"text": "Output Low", "value":1},
                    {"text": "Output High", "value":2},
                    {"text": "Input", "value":3}
                ],
                "optionListOffset": 0,
                "disabled": disabled
            }
        );
        k++;
        if (k > (list.length / 3)) {
            html += helpEasy.closeColumn();
            html += helpEasy.openColumn();
            k = 0;
        }
    }
    html += helpEasy.closeColumn();
    html += helpEasy.closeArea();
    return html;
};