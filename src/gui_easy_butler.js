/* GUIEasy  Copyright (C) 2019  Jimmy "Grovkillen" Westberg */
//THE BUTLER IS DOING STUFF ----AFTER---- GUI IS LOADED
guiEasy.butler = async function (processID, processType) {
    if (helpEasy.internet() === true) {
        defaultSettings.location = await helpEasy.locationByIP();
    }
    helpEasy.addToLogDOM("pageSize", 1);
    helpEasy.processDone(processID, processType);
};