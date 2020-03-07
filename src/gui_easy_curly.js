/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */
// HERE WE PUT CURLY MAIN FUNCTION, CURLY IS STRICTLY HTML STRUCTURE, SEMI-EVENT-STUFF IS PUT IN SCRUBBER!
guiEasy.curly = function (processID, processType) {
    //the RegExp will find 64 chars long curlys only!
    guiEasy.syntax.curlyLC++;
    const regExp = /(?:{{)([^}]{1,64})(?:}})/g;
    let documentHTML = document.documentElement.innerHTML.toString();
    let curlyMatches = [];
    let match;
    while (match = regExp.exec(documentHTML)) {
        curlyMatches.push([match[1], match[0]]);  // [0] is always the full match..;
    }
    for (let i = 0; i < curlyMatches.length; i++) {
        let curly = guiEasy.curly.compileArgs(curlyMatches[i][0].split("-"));
        let curlyReplace = curlyMatches[i][1].replace(/}/g, "\\}");
        curlyReplace = curlyReplace.replace(/{/g, "\\{");
        curlyReplace = RegExp(curlyReplace);
        curlyMatches[i] = [curly[0], curlyReplace, curly[1], curly[2]];
    }
    for (let i = 0; i < curlyMatches.length; i++) {
        let x = curlyMatches[i][0];
        let y = document.documentElement.innerHTML.toString();
        let s = curlyMatches[i][1];
        let a = curlyMatches[i][2];      //number of arguments
        let args = curlyMatches[i][3];
        let r = "";  //This will delete non-correct curly.
        let v = helpEasy.findInArray(x, guiEasy.syntax.curly);
        v = v > -1;
        helpEasy.addToLogDOM(("x: '" + x + "' args: '" + args + "' found: " + v), 3);
        if (v === true) { r = guiEasy.curly[x](args); }
        //this one will remove curly where first is met but next one is undefined
        if (r === undefined) { r = ""; }
        helpEasy.addToLogDOM("pageSize", 1);
        helpEasy.addToLogDOM(("replaced: " + s + "with: " + r), 2);
        document.documentElement.innerHTML = y.replace(s, r);
        //re-run to fetch new curlys
        let found = helpEasy.numberOfFound(r.toString(), regExp);
        if (found > 0) { return guiEasy.curly(processID, processType); }
    }
    helpEasy.processDone(processID, processType);
    helpEasy.addToLogDOM(processID + " loop count: " + guiEasy.syntax.curlyLC, 1);
};

// This one is used to make a little blob for the function to parse
guiEasy.curly.compileArgs = function(arg) {
    let returnArray = [];
    let x = [];
    returnArray.push(arg[0].toLowerCase());
    returnArray.push(arg.length - 1);
    for (let i=1; i<arg.length; i++) {
        x.push(arg[i].toLowerCase());
    }
    returnArray.push(x);
    return returnArray;
};

guiEasy.curly.version = function(arg){
    let what = arg[0];
    if (what === "gui") {
        if (arg[1] === "text") {
            return guiEasy.geekNameFull();
        } else {
            return "<div data-gui-easy='version'>" + guiEasy.geekNameFull() + "</div>";
        }
    }
};

guiEasy.curly.unitname = function(){
    return "<div data-json-path='live--json--System--Unit Name'></div>";
};

guiEasy.curly.modal = function (arg) {
    let type = arg[0];
    let info = "";
    let tables = "";
    let setup = "";
    let inputs = "";
    let buttons = "";
    if (type === "message") {
        inputs = "{{INPUT-ALL}}";
        buttons = "{{BUTTON-ALL}}";
    } else {
        return guiEasy.curly[type];
    }
    return `
        <div class="` + type + ` main-inverted" id="modal">
            <div class="area" id="modal-click-area">
                <div class="area-title" id="modal-title">
                    <div id="modal-title-text"></div>
                    <button 
                        class="is-hidden main-inverted left"
                        id="modal-title-button-copy"
                    >{{ICON-COPY}}</button>
                    <button 
                        class="is-hidden main-inverted left"
                        id="modal-title-button-location"
                    >{{ICON-LOCATION}}</button>
                    <button 
                        class="is-hidden main-bg"
                        id="modal-title-button-close"
                    >{{ICON-CLOSE}}</button>
                </div>
                <div class="column" id="modal-view">
                    <div class="row is-hidden" id="modal-info">
                        ` + info + `
                    </div>
                    <div class="row is-hidden" id="modal-table">
                        ` + tables + `
                    </div>
                    <div class="row is-hidden" id="modal-setup">
                        ` + setup + `
                    </div>
                    <div class="row is-hidden" id="modal-input">
                        ` + inputs + `
                    </div>
                    <div class="row" id="modal-buttons">
                        ` + buttons + `
                    </div>
                </div>
            </div>
        </div>
     `;
};

guiEasy.curly.wave = function () {
    return `
        <div class="wave-background is-inactive" id="wave">
            <div class="wave-text" id="wave-text"></div>
        </div>
     `;
};

guiEasy.curly.input = function (arg) {
    let type = arg[0];
    let html = "";
    if (type === "string" || type === "all") {
        html += "<input class='is-hidden' type='text' id='modal-input-string'>";
    }
    if (type === "textarea" || type === "all") {
        html += `
            <textarea
                class='is-hidden'
                id='modal-input-textarea'
                spellcheck='false'
                wrap='soft'
            ></textarea>
        `;
    }
    if (type === "upload" || type === "all") {
        html += `
            <div
                class="text-tiny"
                id="modal-input-upload-storage-occupied"
            ></div>
            <div
                class="text-tiny"
                id="modal-input-upload-storage-free"
            ></div>
            <input
                class='is-hidden'
                type='file'
                id='modal-input-upload-file'
            >
            <label
                tabindex='0'
                id='label-modal-input-upload-file'
                for='modal-input-upload-file'
                class='is-hidden file modal-upload is-dashed'
            ></label>
        `;
    }
    return html;
};

guiEasy.curly.button = function (arg) {
    let type = arg[0];
    let html = "";
    if (type === "ok" || type === "all") {
        html += "<button class='is-hidden main-success' id='modal-button-ok'>Ok</button>";
    }
    if (type === "cancel" || type === "all") {
        html += "<button class='is-hidden main-info' id='modal-button-cancel'>Cancel</button>";
    }
    if (type === "rescan" || type === "all") {
        html += "<button class='is-hidden' id='modal-button-rescan'>Rescan</button>";
    }
    if (type === "custom" || type === "all") {
        html += "<button class='is-hidden' id='modal-button-custom'></button>";
    }
    return html;
};

guiEasy.curly.goto = function (arg) {
    let type = arg[0];
    let name = arg[1];
    if (type === "tab") {
        return "<button class='main-inverted' data-click='" + type + "-" + name + "'>Continue to " + helpEasy.capitalWord(name) + "</button>";
    }
};

guiEasy.curly.menu = function (arg) {
    let type = arg[0];
    if (type === "action") {
        let listItems = [
            {"name": "save", "color": "success", "what": "settings-save"},
            {"name": "cancel", "color": "sunny", "what": "settings-cancel"},
            {"name": "swarm", "color": "inverted", "what": "menu-nodelist"},
            {"name": "ghost", "color": "bg", "what": "ghost-page"},
            {"name": "screenshot", "color": "bg-inverted", "what": "screenshot-page"}
        ];
        let html = "";
        for (let i = 0; i < listItems.length; i++) {
            html += `
                <button tabindex="-1" class="menu-` + listItems[i].name + ` main-` + listItems[i].color + ` got-tooltip" data-click="` + listItems[i].what + `-` + listItems[i].color + `">
                {{ICON-` + listItems[i].name.toUpperCase() + `}}
                    <div class="tooltip"><div class="text">` + helpEasy.capitalWord(listItems[i].name) + `</div></div>
                </button>
            `;
        }
        return `
        <div class="menu">
            <div class="menu-button">
                <button
                    class="icon-button is-inactive menu-action got-badge"
                    data-focus="menu-action-close"
                    data-click="menu-action-toggle"
                    id="menu-button"
                    data-badge-value=""
                >{{ICON-ACTION}}</button>
            </div>
            <div class="icon-button closed" id="menu-button-list">` + html + `</div>
        </div>
        `;
    }
};

guiEasy.curly.notifier = function (arg) {
    let type = arg[0];
    if (type === "top") {
        return `
            <div class="top-notifier" id="top-notifier"></div>
        `;
    }
};

guiEasy.curly.notificationtable = function () {
    let maxControllers = 3;
    let table = `
                <table id="notification-table">
                <tr>
                    <th class="notification-table header">Controller</th>
                    <th class="notification-table header">Service</th>
                    <th class="notification-table header">Info</th>
                </tr>
         `;
    for (let t=0; t<maxControllers; t++) {
        table += `
                <tr>
                    <td class="notification-table controller">
                        <button class="main-font" data-click="edit-notification-` + (t+1) + `">` + (t+1) + `</button>
                    </td>
                    <td class="notification-table service">
                        
                    </td>
                    <td class="notification-table info">` +
            guiEasy.curly.notificationtable.infoCell("host", t)
            + `<hr>` +
            guiEasy.curly.notificationtable.infoCell("port", t)
            +
            guiEasy.curly.notificationtable.infoCell("enabled", t)
            + `<hr>
                    </td>
                </tr>  
                `;
    }
    table += "</table>";
    return table;
};

guiEasy.curly.notificationtable.infoCell = function (name, t) {
    return `
            <div class="notification-row flex is-hidden">
                <div class="notification-row title">` + helpEasy.capitalWord(name) + `</div>
                <div class="notification-plugin" id="notification-` + (t+1) + `-` + name.toLowerCase() + `"></div>
            </div>
        `;
};

guiEasy.curly.controllertable = function () {
    let maxControllers = 3;
    let table = `
                <table id="controller-table">
                <tr>
                    <th class="controller-table header">Controller</th>
                    <th class="controller-table header">Protocol</th>
                    <th class="controller-table header">Info</th>
                </tr>
         `;
    for (let t=0; t<maxControllers; t++) {
        table += `
                <tr>
                    <td class="controller-table controller">
                        <button class="main-font" data-click="edit-controller-` + (t+1) + `">` + (t+1) + `</button>
                    </td>
                    <td class="controller-table protocol" id="controller-` + (t+1) + `-protocol">
                        
                    </td>
                    <td class="controller-table info">` +
                        guiEasy.curly.controllertable.infoCell("host", t)
                        + `<hr>` +
                        guiEasy.curly.controllertable.infoCell("port", t)
                        +
                        guiEasy.curly.controllertable.infoCell("enabled", t)
                        + `<hr>
                    </td>
                </tr>  
                `;
    }
    table += "</table>";
    return table;
};

guiEasy.curly.controllertable.infoCell = function (name, t) {
    return `
            <div class="controller-row flex is-hidden">
                <div class="controller-row title">` + helpEasy.capitalWord(name) + `</div>
                <div class="controller-plugin" id="controller-` + (t+1) + `-` + name.toLowerCase() + `"></div>
            </div>
        `;
};

guiEasy.curly.tasktable = function () {
    //TODO: make a choice if ESP82XX or ESP32, blank = ESP82XX
    let x = guiEasy.maxTasks();
    let y = guiEasy.maxValuesPerTask();
    let table = `
                <table id="task-table">
                <tr>
                    <th class="task-table header">Task</th>
                    <th class="task-table header">Device</th>
                    <th class="task-table header">Value</th>
                </tr>
         `;
    for (let t=0; t<x; t++) {
        table += `
                <tr>
                    <td class="task-table task">
                        <button class="main-font" data-click="edit-task-` + (t+1) + `">` + (t+1) + `</button>
                    </td>
                    <td class="task-table task">` +
                        guiEasy.curly.tasktable.taskCell("plugin", t)
                        + `<hr class="is-hidden" id="task-` + (t+1) + `-port-hr">` +
                        guiEasy.curly.tasktable.taskCell("port", t)
                        + `<hr class="is-hidden" id="task-` + (t+1) + `-controller-hr">` +
                        guiEasy.curly.tasktable.taskCell("controller", t)
                        + `<hr class="is-hidden" id="task-` + (t+1) + `-gpio-hr">` +
                        guiEasy.curly.tasktable.taskCell("gpio", t)
                 + `</td>
                    <td class="task-table value">
                    <div class="task-name value-row" id="task-` + (t+1) + `-name" data-clear-task="` + (t+1) + `"></div>
                    <hr>
                `;
        for (let v=0; v<y; v++) {
            table += `
                        <div class="value-row flex is-hidden" id="task-` + (t+1) + `-value-` + (v+1) + `-row">
                            <div class="value-name classic" id="task-` + (t+1) + `-value-` + (v+1) + `-name" data-clear-task="` + (t+1) + `"></div>
                            <div class="value-digits classic" id="task-` + (t+1) + `-value-` + (v+1) + `-value" data-clear-task="` + (t+1) + `"></div>
                        </div>
                    `;
            if (v !== (y-1)) {
                table += "</div><hr class='is-hidden' id='task-" + (t+1) + "-value-" + (v+2) + "-hr' data-clear-hr='" + (t+1) + "'>";
            } else {
                table += "</div>";
            }
        }
        table += "</td></tr>";
    }
    table += "</table>";
    return table;
};

guiEasy.curly.tasktable.taskCell = function (name, t) {
    return `
            <div class="task-row flex is-hidden" id="task-` + (t+1) + "-" + name.toLowerCase() + `-row" data-hide-row="` + (t+1) + `">
                <div class="task-row title">` + helpEasy.capitalWord(name) + `</div>
                <div class="task-plugin is-right" id="task-` + (t+1) + `-` + name.toLowerCase() + `" data-clear-task="` + (t+1) + `"></div>
            </div>
        `;
};

guiEasy.curly.navbar = function () {
    const tabs = guiEasy.tabs;
    const middle = "{{UNITNAME}}";
    let html = `
            <nav id="navbar">
                <div class="got-wallpaper"></div>
                <ul class="nav" name="nav-group">
        `;
    let x = tabs.left;
    for (let i=0; i < x.length; i++) {
        html += guiEasy.curly.navbar.tab(x[i]);
    }
    html += "</div></li></div>";
    //Area in between the tab groups...
    html += "<li class='nav-middle-area' id='nav-middle-area'>" + middle + "</li>";
    x = tabs.right;
    let rightHtml = "";
    for (let i=0; i < x.length; i++) {
        rightHtml += guiEasy.curly.navbar.tab(x[i]);
    }
    rightHtml += "</div></li>";
    html += "<div class='nav-group' id='nav-right-big-screen' name='nav-group'>" + rightHtml + "</div></ul>";
    html += "<ul class='nav-small-screen'><div class='nav-group' id='nav-right-small-screen' name='nav-group'>" + rightHtml + "</div></ul>";
    html += "</nav>";
    return html;
};

guiEasy.curly.navbar.tab = function (name) {
    return `
            <li class="nav" name="tab-` + name + `">
                <div class="nav icon text" data-click="tab-` + name + `" data-tab="` + name + `" data-highlight="true">
                    <div class="tab-icon" data-click="tab-` + name + `">{{ICON-` + name.toUpperCase() + `}}</div>
                    <div class="tab-text" data-click="tab-` + name + `">` + helpEasy.capitalWord(name) + `</div>
        `;
};

guiEasy.curly.drawer = function (arg) {
    let type = arg[0];
    let html = "";
    if (type === "theme") {
        let x = defaultSettings.css.variables;
        let columnRowsMax = Math.round((x.length + 1) / 3 + 1);
        //  data-open="is-full-size", "is-quarter-size", "is-half-size", "is-small-size" ... no size setting will make it auto height.
        html =  `
                    <div class="bottom-drawer is-inactive is-hidden" data-open="is-half-size" id="drawer-theme" data-close="is-inactive">
                        <div class="bottom-tab" tabindex="0" data-click="drawer-theme">
                        <div id="custom-theme-settings"></div>
                        {{ICON-THEME}}
                        Theme
                        </div>
                        <div class="bottom-container">
                        <div class="area">
                     `;
        let rowCount = 0;
        html += '<div class="column">';
        for (let i = 0; i < x.length; i++) {
            rowCount++;
            if (rowCount === columnRowsMax) {
                html += '</div><div class="column">';
                rowCount = 1;
            }
            html += guiEasy.curly.drawer.theme(x[i]);
        }
        // the space between "main-info" button and the "main-bg" button is needed for the grunt to minify correctly
        html +=  `
            <hr>
            <div class="row">
                    <button class="main-success" data-click="theme-save">Save</button>
                    <button class="main-sunny" data-click="theme-copy">Copy</button>
                    <button class="main-info" data-click="theme-default">Default</button>
                    
                    <button class="main-bg" data-click="modal-theme-import">Import</button>
            </div>
            </div>
            `;
        html += "</div></div></div>";
    }
    return html;
};

guiEasy.curly.drawer.theme = function (cssVar) {
    let type = cssVar[0].split("-");
        type = type[(type.length - 1)];
    let variable = cssVar[0];
    let value = cssVar[1];
    let text = cssVar[2];
    let rowStart = '<div class="row">';
    let rowMiddle = "";
    if (type === "color") {
        let color = variable.replace("-color", "");
            rowMiddle = `
            <input type="color" id="theme-` + variable + `" data-alt="css-color" data-default-value="` + value + `" data-change="` + variable + `">
            <label class="color ` + color + `" for="theme-` + variable + `" tabindex="0">` + text + `</label>
        `;
    }
    if (type === "toggle") {
        let defaultValue = defaultSettings.css.toggle[variable][value];
        let toggleText = text.split("|");
        let defaultText = toggleText[0];
        if (defaultValue !== true) {
            defaultText = toggleText[1];
        }
        rowMiddle = `
            <input type="checkbox" id="theme-` + variable + `" data-alt="css-toggle" data-true-text="` + toggleText[0] +
                                    `" data-false-text="` + toggleText[1] + `" data-default-value="` + defaultValue +
                                    `" data-default-text="` + value + `" data-change="` + variable + `" checked="` + defaultValue + `">
            <label class="checkbox" id="label-` + variable + `" for="theme-` + variable + `" tabindex="0">` + defaultText + `</label>
            `;
    }
    if (type === "size") {
        let x = defaultSettings.css.size;
        let max = x[variable].max;
        let min = x[variable].min;
        let step = x[variable].step;
        let placeholder = x[variable].placeholder;
        rowMiddle = `
            <input type="number" id="theme-` + variable + `" min="` + min + `" max="` + max + `" step="` + step +
                                            `" data-alt="css-size" placeholder="` + placeholder + `" data-default-value="` + value +
                                            `" data-change="` + variable + `" value="` + value + `">
            <label class="number" for="theme-` + variable + `" id="label-` + variable + `">` + text + `</label>
        `;
    }
    if (type === "family") {
        rowMiddle = `
                <span>` + text + `</span>`
                + guiEasy.curly.drawer.theme.family(variable, value) +
                `<label class="select" for="theme-` + variable + `" data-alt="css-family" data-change="default-font-family"></label>
                   </div>
                   <div class="row is-hidden" id="row-custom-font-family">
                    <span>
                        Font name
                        <button
                            class="help-link"
                            data-click="open-url"
                            data-href="https://fonts.google.com/"
                            data-target="_blank"
                            data-href-rel="{{VERSION-GUI-TEXT}}"
                            >
                        </button>
                    </span>
                    <input spellcheck="false" data-alt="css-familycustom" type="text" id="theme-custom-font-family" data-change="default-font-family">
        `;
    }
    if (type === "url") {
        let x = defaultSettings.css.url;
        let placeholder = x[variable].placeholder;
        rowMiddle = `
               <span>` + text + `</span>
               <input spellcheck="false" type="text" id="theme-` + variable + `" placeholder="` + placeholder + `" data-alt="css-url" data-default-value="" data-change="` + variable + `">
        `;
    }
    return rowStart + rowMiddle + "</div>";
};

guiEasy.curly.drawer.theme.family = function (variable, defaultValue) {
    let x = defaultSettings.css.family[variable];
    let startHTML = '<select id="theme-' + variable + '" data-alt="css-family" data-change="' + variable + '"';
    let optionHTML = "";
    let v = 0;
    for (let i = 0; i < x.length; i++) {
        let y = x[i];
        if (y.value === defaultValue) {
            v = i;
            optionHTML += '<option value="' + y.value + '" selected="selected">' + y.text + '</option>';
        } else {
            optionHTML += '<option value="' + y.value + '">' + y.text + '</option>';
        }
    }
    startHTML += 'data-default-index="' + v + '" data-default-value="' + defaultValue + '">';
    return startHTML + optionHTML + "</select>";
};

guiEasy.curly.info = function (what) {
    if (what[0] === "message") {
        helpEasy.addToLogDOM("message", 0, "info");
    }
    if (what[0] === "footer") {
        helpEasy.addToLogDOM("footer", 0, "info");
    }
    if (what[0] === "patreon") {
        helpEasy.addToLogDOM("patreon", 0, "info");
    }
};