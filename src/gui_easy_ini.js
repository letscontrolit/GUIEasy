/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */
//https://link.medium.com/c8U3LzyZF2
//When page has loaded, run "initiate"
window.addEventListener("load", initiate, false);

function initiate() {
    //REDEFINE CONSOLE
    guiEasy.newConsole();
    helpEasy.addToLogDOM(guiEasy.geekNameFull(), 0, "info");
    //PRE LAUNCH OF GUI
    for (let i = 0; i < guiEasy.startup.length; i++) {
        let x = guiEasy.startup[i].id;
        let y = guiEasy.startup[i].logText;
        let z = "startup";
        let t = Date.now();
        helpEasy.listOfProcesses(x,y,t,z);
        guiEasy[x](x,z);
    }
    //GUI IS LAUNCHED, FETCH ONE TIME STUFF HERE
    for (let i = 0; i < guiEasy.silentStartup.length; i++) {
        let x = guiEasy.silentStartup[i].id;
        let y = guiEasy.silentStartup[i].logText;
        let z = "silentStartup";
        let t = Date.now();
        helpEasy.listOfProcesses(x,y,t,z);
        guiEasy[x](x,z);
    }
}

// In order to distinguish the GUI Easy console messages from the generic messages we have created this:
guiEasy.newConsole = function () {
    window.msg = (function (defaultConsole) {
        return Object.assign({}, defaultConsole, {
            log(text) {
                defaultConsole.log("%cLOG:%c" + text,
                    "background-color: #5CB85C; color: #fff; font-weight: bold; padding: 0 8px; font-size: 1.2em",
                    "background-color: #000000; color: #5CB85C; font-weight: bold; padding-left: 8px; font-size: 1.2em");
            },
            info(text) {
                defaultConsole.info("%cINFO:%c" + text,
                    "background-color: #337AB7; color: #fff; font-weight: bold; padding: 0 8px; font-size: 1.2em",
                    "background-color: #000000; color: #337AB7; font-weight: bold; padding-left: 8px; font-size: 1.2em");
            },
            warn(text) {
                defaultConsole.warn("%cWARN:%c" + text,
                    "background-color: #F0AD4E; color: #fff; font-weight: bold; padding: 0 8px; font-size: 1.2em",
                    "background-color: #000000; color: #F0AD4E; font-weight: bold; padding-left: 8px; font-size: 1.2em");
            },
            error(text) {
                defaultConsole.error("%cERROR:%c" + text,
                    "background-color: #D9534F; color: #fff; font-weight: bold; padding: 0 8px; font-size: 1.2em",
                    "background-color: #000000; color: #D9534F; font-weight: bold; padding-left: 8px; font-size: 1.2em");
            }
        })
    }(window.console));
};