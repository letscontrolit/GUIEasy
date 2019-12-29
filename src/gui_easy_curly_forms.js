/* GUIEasy  Copyright (C) 2019  Jimmy "Grovkillen" Westberg */
//THESE CURLY's ARE A BIT DIFFERENT SINCE THEY ARE CONVERTED @ RUN-TIME

guiEasy.curly.forms = function (x) {
    return guiEasy.curly.forms[x.type](x);
};

guiEasy.curly.forms.toggle = function (x) {
    let html = "";
    let text = x.args[2].split("|");
    html += `
            <input
                type="checkbox"
                id="task-_tasknumber_-` + x.args[1] + `"
                data-alt="settings-change"
                data-true-text="` + helpEasy.capitalWord(text[0]) + `"
                data-false-text="` + helpEasy.capitalWord(text[1]) + `"
                data-default-value="` + (x.args[3]!==undefined) + `"
                data-settings-path="` + x.args[0] + `"
            >
            <label
                for="task-_tasknumber_-` + x.args[1] + `"
                tabindex="0"
            >
            </label>
        `;
    return html;
};

guiEasy.curly.forms.number = function (x) {
    let html = "";
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
                id="task-_tasknumber_-` + x.args[1] + `"
                data-alt="settings-change"
                data-default-value="` + x.args[3] + `"
                data-settings-path="` + x.args[0] + `"
                ` + extra + `
            >
            <label
                for="task-_tasknumber_-` + x.args[1] + `"
                tabindex="0"
            >
                
            </label>
        `;
    return html;
};