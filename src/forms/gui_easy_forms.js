/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */
guiEasy.forms = function(type, number) {
    return guiEasy.forms[type](number);
};

guiEasy.forms.setupForm = function (type) {
    let number = document.getElementById(type + "-dropdown-list").value;
    let html = "";
    if (guiEasy.forms(type, number) !== null) {
        html = guiEasy.forms(type, number);
    }
    let container = document.getElementById("setup-container");
    container.innerHTML = html;
};

guiEasy.forms.plugin = function (number) {
    let start = guiEasy.forms.plugin.start();
    let end = guiEasy.forms.plugin.end();
    let middle = guiEasy.forms.plugin["P" + ("000" + number).slice(-3)];
    if (middle === undefined) {
        return null;
    }
    return start + middle + end;
};

guiEasy.forms.controller = function (number) {
    let start = guiEasy.forms.controller.start();
    let end = guiEasy.forms.controller.end();
    let middle = guiEasy.forms.controller["C" + ("000" + number).slice(-3)];
    if (middle === undefined) {
        return null;
    }
    return start + middle + end;
};

guiEasy.forms.notification = function (number) {
    let start = guiEasy.forms.notification.start();
    let end = guiEasy.forms.notification.end();
    let middle = guiEasy.forms.notification["N" + ("000" + number).slice(-3)];
    if (middle === undefined) {
        return null;
    }
    return start + middle + end;
};

guiEasy.forms.notification.start = function () {
  return "----start----";
};

guiEasy.forms.notification.end = function () {
    return "----end----";
};

guiEasy.forms.controller.start = function () {
    return "<div class='column'>";
};

guiEasy.forms.controller.end = function () {
    return "</div>";
};
guiEasy.forms.plugin.start = function () {
    return "----start----";
};

guiEasy.forms.plugin.end = function () {
    return "----end----";
};