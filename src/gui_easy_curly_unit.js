/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */
// HERE WE PUT ALL OUR "UNIT" FUNCTIONS
guiEasy.curly.unit = function(arg) {
    let x = guiEasy.curly.unit;
    let type = arg[0];
    if (
        type === "gauges" ||
        type === "shortinfo" ||
        type === "welcometext"
    ) {
        return x[type];
    }
    return "";
};

guiEasy.curly.unit.gauges = function() {
    let x = guiEasy.curly.unit.gauges;
    let html = "<div id='main-resources'>";
    html += x.create("LOAD", "Load", 100, 0);
    html += x.create("MEM", "Free RAM", 0, 40000);
    html += x.create("LOOPS", "Load LC", 0, 10000);
    html += "</div>";
    return html;
};

guiEasy.curly.unit.gauges.create = function (text, id, max, min) {
    return `
        <svg class="gauge" viewBox="0 0 200 200" data-json-path-gauge-color="` + id + `">
        <circle cx="100" cy="100" r="85"></circle>
        <circle cx="100" cy="100" r="85" data-json-path-gauge="live--json--System--` + id + `" data-max="` + max + `" data-min="` + min + `" class="value" style="stroke-dashoffset:574.5;"></circle>
        <text class="value" x="100" y="110" text-anchor="middle">
        <tspan data-json-path="live--json--System--` + id + `"></tspan>
        </text>
        <text class="text" x="100" y="140" text-anchor="middle">
        <tspan>` + text + `</tspan>
        </text>
        </svg>
    `;
};

guiEasy.curly.unit.shortinfo = function () {
    return `
        <div id="main-unit-info" class="got-margin">
            <div data-json-path="live--json--System--Unit Name"></div>
            <br>
            <div data-json-path="live--json--System--Local Time"></div>
            <br>
            Uptime: <div data-json-path="live--json--System--Uptime"></div> minutes
            <br>
            {{ICON-WIFI-SELF}}
            <div data-json-path="live--json--WiFi--SSID"></div> (<div data-json-path="live--json--WiFi--RSSI"></div>dBm)
            <br>
            <div data-json-path="live--json--WiFi--IP Address"></div>
        </div>
    `;
};

guiEasy.curly.unit.welcometext = function () {
    return `
        <div id="welcome-text">
            <hr>
           <div class="text-big">` + helpEasy.welcomePhrase() + `</div>
            <div class="got-margin">
                I see that this is you first visit, please configure your unit...
            </div>
            {{GOTO-TAB-CONFIG}}
            <hr class="got-margin">
        </div>
    `;
};