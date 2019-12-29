/* GUIEasy  Copyright (C) 2019  Jimmy "Grovkillen" Westberg */
//HERE WE ADD THINGS THAT THE CLIENT WANTS TO DO
guiEasy.pitcher = function (processID, processType) {
    let urlParams = helpEasy.urlParams();
    helpEasy.getGuiInFields();
    helpEasy.setCurrentIndex(-1);
    guiEasy.nodes.push({"ip":"192.168.74.164", "type":"queen"});
    //guiEasy.nodes.push({"ip":"192.168.73.164", "type":"queen"});
    //guiEasy.nodes.push({"ip":"192.168.43.197", "type":"queen"});
    helpEasy.pingIP(guiEasy.nodes, helpEasy.handlePingResults, helpEasy.handlePingResults).then(r => r);
    helpEasy.scheduleFetch(guiEasy.nodes, 0);
    //TODO: set "timeouts" for these and have them displayed in the log...
    //first make sure the "live" json is populated with data
    let x = setInterval(function () {
        if (guiEasy.current.live !== undefined) {
            clearInterval(x);
            helpEasy.setCurrentIndex(0);
            guiEasy.current.live = helpEasy.getCurrentIndex();
            //update graphics
            helpEasy.guiUpdater();
            helpEasy.addToLogDOM("pageSize", 1);
        }
    },guiEasy.fetchSettings.intervalTimeKeeper);
    //TODO: make a function that will hide all noob guides if name = "ESP_Easy" and number = 0
    //now make sure that the data is injected into page before continue
    let y = setInterval(function () {
        if (guiEasy.current.gui !== undefined) {
            clearInterval(y);
            //get data from queen... index for queen is zero
            helpEasy.fetchConfigDat(guiEasy.nodes, helpEasy.getCurrentIndex());
            helpEasy.addToLogDOM("pageSize", 1);
        }
    },50);

    //now make sure that we have the config of the first unit (queen)
    let z = setInterval(function () {
        if (guiEasy.current.config !== undefined) {
            clearInterval(z);
            helpEasy.guiUpdaterSettings();
            helpEasy.addToLogDOM("pageSize", 1);
        }
    },50);

    //when all are populated...
    let u = setInterval(function () {
        if (
            guiEasy.current.live !== undefined &&
            guiEasy.current.gui !== undefined &&
            guiEasy.current.config !== undefined
        ) {
            clearInterval(u);
            //take care of url parameters...
            guiEasy.popper.tab({"args":["tab",urlParams.tab]});
            console.log(urlParams);
            console.log(guiEasy);
            helpEasy.addToLogDOM("pageSize", 1);
            helpEasy.processDone(processID, processType);
        }
    },1);
    //and we're live and kicking!
};