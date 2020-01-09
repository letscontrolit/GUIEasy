/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */
//HERE WE ADD REPEATING DATA FETCH FROM UNIT
guiEasy.tender = function (processID, processType) {
    let maxMissed = 1;
    let missedBuffer = 5;
    //data fetcher
    setInterval(function () {
        let timestampNow = Date.now();
        let x = guiEasy.nodes;
        let bufferTime = guiEasy.fetchSettings.intervalTimeKeeper;
        for (let i = 0; i < x.length; i++) {
            if (x[i].stats.lastCheck === undefined) {
                x[i].stats.lastCheck = timestampNow;
            }
            //If we have more than 1 missed fetch in a row...
            if (x[i].stats.error > maxMissed) {
                let delay = missedBuffer * guiEasy.fetchSettings.intervalTimeKeeper;
                helpEasy.addToLogDOM("@:" + new Date(timestampNow).toISOString() + ">>> We missed " + (maxMissed + 1) + " fetches in a row... will wait " + delay + " ms before retry.", 0, "warn");
                helpEasy.schedulerDelay(x, i, delay);
                continue;
            }
            if (
                x[i].stats.error < (maxMissed + 1) &&
                x[i].scheduler[0][0] < timestampNow &&
                bufferTime < (timestampNow - x[i].stats.lastRun) &&
                bufferTime < (timestampNow - x[i].stats.lastCheck)
            ) {
                x[i].stats.lastCheck = timestampNow;
                let endpoint = x[i].scheduler[0][1];
                helpEasy.scheduleFetch(guiEasy.nodes, i, endpoint);
                helpEasy.setCurrentOnline("online");
            }
            //trigger lost connection with unit?
            let sinceLastCheck = (Date.now() - x[i].stats.lastCheck);
            if (sinceLastCheck > (missedBuffer * guiEasy.fetchSettings.intervalTimeKeeper)) {
                helpEasy.setCurrentOnline();
            }
        }
    }, 10);
    //gui updater
    setInterval(function () {
        helpEasy.guiUpdater();
        //Lookup if internet is found
        if (helpEasy.internet() === false) {
            guiEasy.popper.topNotifier("internetDown","Internet connection is down.", "warning");
        } else if ( guiEasy.nodes[helpEasy.getCurrentIndex()].notifierID === "internetDown" ) {
            guiEasy.popper.topNotifier("internetUp","Internet connection is re-established.", "success", 5);
        }
        //is the unit reachable
        if (helpEasy.getCurrentIndex("online") === false && helpEasy.internet() === true) {
            guiEasy.popper.topNotifier("unitDown","Connection with unit lost.", "warning");
        } else if (guiEasy.nodes[helpEasy.getCurrentIndex()].notifierID === "unitDown") {
            guiEasy.nodes[helpEasy.getCurrentIndex()].stats.lastCheck = Date.now();
            helpEasy.setCurrentOnline("online");
            guiEasy.popper.topNotifier("unitUp","Connection with unit is re-established.", "success", 3);
        }
        //is the settings in gui updated?
        //helpEasy.guiUpdaterSettings();
        //console.log(defaultSettings);
        //console.log(guiEasy.nodes);
    }, guiEasy.fetchSettings.intervalGUIupdater);

    helpEasy.processDone(processID, processType);
};
