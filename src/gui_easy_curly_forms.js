/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */
//THESE CURLY's ARE A BIT DIFFERENT SINCE THEY ARE CONVERTED @ RUN-TIME

guiEasy.curly.forms = function (x) {
    return guiEasy.curly.forms[x.type](x);
};

guiEasy.curly.forms.iporhost = function (x) {
    if (x.args[0] === "ip") {
        let html = "<div class='row'>";
        html += "<span>" + helpEasy.capitalWord(x.args[2]) + "</span>";
        html += `
            <input  spellcheck='false'
                    type='text'
                    id='` + x.args[1]  + `'
                    data-type='string'
                    data-iporhost="` + x.args[1] + `"
                    oninput='guiEasy.curly.forms.controllerSetup(this)'>
            `;
        return html + "</div>";
    }
    if (x.args[0] === "port") {
        let html = "<div class='row'>";
        html += `
            <input
                type="number"
                id="` + x.args[1] + `"
                data-alt="settings-change"
                data-iporhost="` + x.args[2] + `"
                oninput='guiEasy.curly.forms.controllerSetup(this)'>
            <label
                class="number"
                for="` + x.args[1] + `"
                tabindex="0"
            >` +
            helpEasy.capitalWord(x.args[3])
            + `</label>
       `;
        return html + "</div>";
    }
    if (x.args[0] === "port") {

    }
};

guiEasy.curly.forms.controllerSetup = function (element) {
    let iporhost = document.getElementById(element.dataset.iporhost);
    if (helpEasy.checkIfIP(iporhost.value)) {
        document.getElementById(element.id + "-ip").value = element.value;
        iporhost.dataset.setupType = "ip";
    } else {
        document.getElementById(element.id + "-host").value = element.value;
        iporhost.dataset.setupType = "host";
    }
};

guiEasy.curly.forms.string = function (x) {
    let html = "<div class='row'>";
    html += "<span>" + helpEasy.capitalWord(x.args[2]) + "</span>";
    html += `
            <input  spellcheck='false'
                    type='text'
                    id='` + x.args[1]  + `'
                    data-type='string'
                    data-settigns='` + x.args[0] + `'>
            `;
    return html + "</div>";
};

guiEasy.curly.forms.toggle = function (x) {;
    let html = "<div class='row'>";
    let text = x.args[2].split("|");
    html += `
            <input
                type="checkbox"
                id="` + x.args[1] + `"
                data-alt="settings-change"
                data-true-text="` + helpEasy.capitalWord(text[0]) + `"
                data-false-text="` + helpEasy.capitalWord(text[1]) + `"
                data-default-value="` + (x.args[3]!==undefined) + `"
                data-settings-path="` + x.args[0] + `"
            >
            <label
                for="` + x.args[1] + `"
                tabindex="0"
            >
            </label>
        `;
    return html + "</div>";
};

guiEasy.curly.forms.number = function (x) {
    let html = "<div class='row'>";
    let extra = "";
    if (x.args[4] !== undefined && x.args[4] !== '"') {
        extra += ' min="' + x.args[4] + '"';
    }
    if (x.args[5] !== undefined && x.args[5] !== '"') {
        extra += ' max="' + x.args[5] + '"';
    }
    if (x.args[6] !== undefined && x.args[6] !== '"') {
        extra += ' step="' + x.args[6] + '"';
    }
    html += `
            <input
                type="number"
                id="` + x.args[1] + `"
                data-alt="settings-change"
                data-default-value="` + x.args[3] + `"
                data-settings-path="` + x.args[0] + `"
                ` + extra + `
            >
            <label
                class="number"
                for="` + x.args[1] + `"
                tabindex="0"
            >` +
              helpEasy.capitalWord(x.args[2])
            + `</label>
        `;
    return html + "</div>";
};