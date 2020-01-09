/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */
//THE BUTLER IS DOING STUFF ----AFTER---- GUI IS LOADED
guiEasy.butler = async function (processID, processType) {
    if (helpEasy.internet() === true) {
        defaultSettings.location = await helpEasy.locationByIP();
    }
    helpEasy.addToLogDOM("pageSize", 1);
    helpEasy.processDone(processID, processType);
};

guiEasy.butler.notification = function () {
    //this one get's info from the server, it is also called "once per hour" from the tender to see if new info is present

};