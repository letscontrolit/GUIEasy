/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */
guiEasy.forms = function(type, number) {
    return guiEasy.forms[type](number);
};

guiEasy.forms.regEx = function(string) {
    guiEasy.syntax.curlyLC++;
    const regExp = /(?:{{)([^}]{1,256})(?:}})/g;  //THIS MEANS THAT A FORM CURLY CAN BE 256 CHARS LONG = longer than regular curly...
    let curlyMatches = [];
    let match;
    while (match = regExp.exec(string)) {
        curlyMatches.push([match[1], match[0]]);  // [0] is always the full match..;
    }
    for (let i = 0; i < curlyMatches.length; i++) {
        let curly = guiEasy.curly.compileArgs(curlyMatches[i][0].split("--"));
        let curlyReplace = curlyMatches[i][1].replace(/}/g, "\\}");
        curlyReplace = curlyReplace.replace(/{/g, "\\{");
        curlyReplace = curlyReplace.replace(/\(/g, "\\(");
        curlyReplace = curlyReplace.replace(/\)/g, "\\)");
        curlyReplace = curlyReplace.replace(/\|/g, "\\|");
        curlyReplace = RegExp(curlyReplace);
        curlyMatches[i] = {"type": curly[0], "replace": curlyReplace, "noArgs": curly[1], "args": curly[2]};
    }
    for (let i = 0; i < curlyMatches.length; i++) {
        curlyMatches[i].replaceWith = guiEasy.curly.forms(curlyMatches[i]);
        string = string.replace(curlyMatches[i]["replace"], curlyMatches[i]["replaceWith"]);
    }
    string = string.replace(/"/g, "'");
    return string;
};

guiEasy.forms.plugin = function (number) {
    let start = guiEasy.forms.plugin.start();
    let end = guiEasy.forms.plugin.end();
    let middle = guiEasy.forms.plugin["P" + ("000" + number).slice(-3)];
    if (middle === undefined) {
        return null;
    }
    middle = guiEasy.forms.regEx(middle.toString());
    return start + middle + end;
};

guiEasy.forms.controller = function (number) {
    let start = guiEasy.forms.controller.start();
    let end = guiEasy.forms.controller.end();
    let middle = guiEasy.forms.controller["C" + ("000" + number).slice(-3)];
    if (middle === undefined) {
        return null;
    }
    middle = guiEasy.forms.regEx(middle.toString());
    return start + middle + end;
};

guiEasy.forms.notification = function (number) {
    let start = guiEasy.forms.notification.start();
    let end = guiEasy.forms.notification.end();
    let middle = guiEasy.forms.notification["N" + ("000" + number).slice(-3)];
    if (middle === undefined) {
        return null;
    }
    middle = guiEasy.forms.regEx(middle.toString());
    return start + middle + end;
};

guiEasy.forms.notification.start = function () {
  return "----start----";
};

guiEasy.forms.notification.end = function () {
    return "----end----";
};

guiEasy.forms.controller.start = function () {
    return "----start----";
};

guiEasy.forms.controller.end = function () {
    return "----end----";
};
guiEasy.forms.plugin.start = function () {
    return "----start----";
};

guiEasy.forms.plugin.end = function () {
    return "----end----";
};