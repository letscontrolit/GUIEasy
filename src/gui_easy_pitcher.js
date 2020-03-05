/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */
//HERE WE ADD THINGS THAT THE CLIENT WANTS TO DO
guiEasy.pitcher = async function (processID, processType) {
    let maxTimeout = 20 * 1000;
    let urlParams = helpEasy.urlParams();
    helpEasy.getGuiInFields();
    helpEasy.setCurrentIndex(-1);
    //TODO: remove this part when doing a build release (saves almost 1kB)
    if (window.location.hostname === "localhost") {
        let path = window.location.origin + window.location.pathname;
        path = path.replace("index.html", "custom.json");
        await fetch(path)
            .then(res => res.json())
            .then((jsonData) => {
                guiEasy.nodes.push(jsonData);  //THIS ONE IS USED TO RUN THE GUI FROM LOCALHOST
            })
            .catch(error => {
                helpEasy.addToLogDOM('Error fetching (custom.json): ' + error, 0, "error");
                helpEasy.addToLogDOM('You should create a "custom.json", please refer to the "custom-template.json".', 0, "warn");
                helpEasy.addToLogDOM('With this file you can specify what unit you want to connect to during development...', 0, "info");
            });
    } else {
        guiEasy.nodes.push({"ip": window.location.hostname, "type":"queen"});
    }
    helpEasy.pingIP(guiEasy.nodes, helpEasy.handlePingResults, helpEasy.handlePingResults).then(r => r);
    helpEasy.scheduleFetch(guiEasy.nodes, 0);
    //first make sure the "live" json is populated with data
    let timeoutX = guiEasy.fetchSettings.intervalTimeKeeper;
    let maxLoopsX = Math.floor(maxTimeout / timeoutX);
    let LCX = 0;
    let x = setInterval(function () {
        LCX++;
        if (LCX > maxLoopsX) {
            helpEasy.addToLogDOM("'live' not working!", 0, "warn");
            helpEasy.processDone(processID, processType);
            return;
        }
        if (guiEasy.current.live !== undefined) {
            clearInterval(x);
            if (guiEasy.popper.extra !== undefined) {
                guiEasy.popper.loadTheme();
                guiEasy.popper.loadGUIsettings();
            }
            helpEasy.setCurrentIndex(0);
            guiEasy.current.live = helpEasy.getCurrentIndex();
            //update graphics
            helpEasy.guiUpdater();
            helpEasy.addToLogDOM("pageSize", 1);
        }
    }, timeoutX);
    //now make sure that the data is injected into page before continue
    let timeoutY = 50;
    let maxLoopsY = Math.floor(maxTimeout / timeoutY);
    let LCY = 0;
    let y = setInterval(function () {
        LCY++;
        if (LCY > maxLoopsY) {
            helpEasy.addToLogDOM("'gui' not working!", 0, "warn");
            helpEasy.processDone(processID, processType);
            return;
        }
        if (guiEasy.current.gui !== undefined) {
            clearInterval(y);
            //get data from queen... index for queen is zero
            helpEasy.fetchConfigDat(guiEasy.nodes, helpEasy.getCurrentIndex());
            helpEasy.addToLogDOM("pageSize", 1);
        }
    }, timeoutY);

    //now make sure that we have the config of the first unit (queen)
    let timeoutZ = 50;
    let maxLoopsZ = Math.floor(maxTimeout / timeoutZ);
    let LCZ = 0;
    let z = setInterval(function () {
        LCZ++;
        if (LCZ > maxLoopsZ) {
            helpEasy.addToLogDOM("'config' not working!", 0, "warn");
            helpEasy.processDone(processID, processType);
            return;
        }
        if (guiEasy.current.config !== undefined) {
            clearInterval(z);
            helpEasy.guiUpdaterSettings();
            let x = guiEasy.nodes[helpEasy.getCurrentIndex()].settings.config.general;
            if (x.unitnr !== 0 && x.unitname !== "ESP_Easy") {
                document.getElementById("welcome-text").classList.add("is-hidden");
            }
            helpEasy.addToLogDOM("pageSize", 1);
        }
    }, timeoutZ);

    //when all are populated...
    let timeoutU = 1;
    let LCU = 0;
    let maxLoopsU = Math.floor(maxTimeout / timeoutU);
    let u = setInterval(function () {
        LCU++;
        if (LCU > maxLoopsU) {
            helpEasy.addToLogDOM("'live'/'gui'/'config' not working!", 0, "warn");
            helpEasy.processDone(processID, processType);
            return;
        }
        if (
            guiEasy.current.live !== undefined &&
            guiEasy.current.gui !== undefined &&
            guiEasy.current.config !== undefined
        ) {
            clearInterval(u);
            guiEasy.pitcher.createLists();
            //take care of url parameters...
            guiEasy.popper.tab({"args":["tab",urlParams.tab]});
            console.log(urlParams);
            helpEasy.addToLogDOM("pageSize", 1);
            helpEasy.processDone(processID, processType);
            console.log(guiEasy.nodes[helpEasy.getCurrentIndex()]);
            //console.log(JSON.stringify(guiEasy.nodes[helpEasy.getCurrentIndex()].settings));

        }
    }, timeoutU);
    //and we're live and kicking!
};

guiEasy.pitcher.createLists = function () {
    let types = ["plugin", "controller", "notification"];
    guiEasy.list = {};
    for (let i = 0; i < types.length; i++) {
        let shortName = types[i].split("")[0].toUpperCase();
        guiEasy.list[types[i]] = {};
        guiEasy.list[types[i]][0] = {
            "name": "- None -",
            "category": "",
            "state": "",
            "id": ""
        };
        for (let k = 1; k < 1000; k++) {
            if (guiEasy.forms(types[i], k) === null) {
                //no more
            } else {
                let endpoint = shortName + ("000" + k).slice(-3);
                let state = guiEasy.forms[types[i]][endpoint].state;
                if (state === "normal") {
                    state = "";
                }
                guiEasy.list[types[i]][k] = {
                    "name": guiEasy.forms[types[i]][endpoint].name,
                    "category": guiEasy.forms[types[i]][endpoint].category,
                    "state": state,
                    "id": endpoint
                };
            }
        }
    }
};