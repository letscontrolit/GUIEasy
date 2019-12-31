/* GUIEasy  Copyright (C) 2019-2019  Jimmy "Grovkillen" Westberg */
//------------------------------- HTML or CURLY -------------------------------//
guiEasy.dash.D002 = `
Add HTML or CURLY here...
`;  //--------------------------- HTML or CURLY -------------------------------//

guiEasy.dash.D002.icon = function (weatherCode) {
    if (weatherCode === 113) {
        //Clear sunny
    }
    if (weatherCode === 116) {
        //Sunny intervals
    }
    if (weatherCode === 119) {
        //White clouds
    }
    if (weatherCode === 122) {
        //Black low clouds
    }
    if (weatherCode === 143) {
        //Mist
    }
    if (weatherCode === 260 || weatherCode === 248) {
        //Fog
    }
    if (weatherCode === 353 || weatherCode === 263 || weatherCode === 176) {
        //Light rain showers
    }
    if (weatherCode === 356 || weatherCode === 305 || weatherCode === 299) {
        //Heavy rain showers
    }
    if (weatherCode === 368 || weatherCode === 326 || weatherCode === 323) {
        //Light snow showers
    }
    if (weatherCode === 395 || weatherCode === 371 || weatherCode === 335) {
        //Heavy snow showers
    }
    if (weatherCode === 374 || weatherCode === 365 || weatherCode === 362 || weatherCode === 179) {
        //Sleet showers
    }
    if (weatherCode === 392 || weatherCode === 386 || weatherCode === 200) {
        //Thundery showers
    }
    if (weatherCode === 296 || weatherCode === 293 || weatherCode === 266) {
        //Cloudy with light rain
    }
    if (weatherCode === 359 || weatherCode === 308 || weatherCode === 302) {
        //Cloudy with heavy rain
    }
    if (weatherCode === 320 || weatherCode === 227) {
        //Cloudy with light snow
    }
    if (weatherCode === 338 || weatherCode === 332 || weatherCode === 329 || weatherCode === 230) {
        //Cloudy with heavy snow
    }
    if (weatherCode === 377 || weatherCode === 350 || weatherCode === 317 || weatherCode === 314 || weatherCode === 311 || weatherCode === 284 || weatherCode === 281 || weatherCode === 185 || weatherCode === 182) {
        //Cloudy with sleet
    }
    if (weatherCode === 389) {
        //Thunderstorm
    }
    return "";
};