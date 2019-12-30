/* GUIEasy  Copyright (C) 2019-2019  Jimmy "Grovkillen" Westberg */
//This one will only run if weather service is activated...
guiEasy.weather = function (processID, processType) {
    //TODO: if paid plan httpS is allowed... how to handle that?
    let url = "http://api.weatherstack.com/";

    helpEasy.processDone(processID, processType);
};

guiEasy.weather.icon = function (weatherCode) {
    if (weatherCode === 395) {

    }
};