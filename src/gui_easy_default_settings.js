/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */
//INSPIRATION FOR THE LANDING PAGE: https://codepen.io/diegopardo/pen/dGlfC

//THIS IS THE DEFAULT SETTINGS, THEY WILL BE OVERRIDE BY CUSTOM
const defaultSettings = {
    'userSettings': {
        'preventDefaults': {
                "escape": 1,         //used to close modals etc.
                "ctrl+space": 1,     //open swarm
                "ctrl+enter": 1,     //screenshot
                "ctrl+keys": 1,      //save settings to unit
                "ctrl+keyz": 1,      //revert changes (which are not yet saved)
                "alt+digit": 1,     //jump to tab
                "alt+arrows": 1     //jump to next tab
        },
        'areasMinimized': 0,
        'helpLinks': 1,
        'fastBoot': 0,               //only use if you have no theme and no extra feature such as dashboard etc.
        'internetLostShow': 1,
        'clipboardSyntax': "default",
        'dropdownList': "default"
    },
    'css': {
        'variables': [
            ['main-bg-color',          '52,146,226',                    "Background"],
            ['main-inverted-color',    '47,66,82',                      "Contrast"],
            ['main-font-color',        '255,255,255',                   "Font"],
            ['main-info-color',        '255,143,18',                    "Info"],
            ['main-sunny-color',       '255,209,0',                     "Sunny"],
            ['main-warning-color',     '239,72,61',                     "Warning"],
            ['main-success-color',     '0,174,65',                      "Success"],
            ['button-radius-size',     1,                               "Button Radius"],  //1...100
            ['button-icon-size',       0,                               "Button Icon Scale"],  //-20...20
            ['max-width-page-size',    1400,                            "Max Page Width (px)"],  //400...10 000
            ['scale-size',             16,                              "Overall Scale Value"],  //1...100
            ['row-size',               20,                              "Row Height"],  //1...100
            ['overflow-tab-text-size', 24,                              "Tab Text Overflow Value"],  //1...100
            ['state-of-navbar-toggle', "fixed",                         "Navbar Always Show|Navbar Scroll Away"],
            ['default-font-family',    "'Segoe UI', Calibri, Arial",    "Font Family"],
            ['custom-wallpaper-url',   "",                              "Link To Wallpaper Image"]
        ],
        'size': {
            "button-radius-size": {"min": 1, "max": 100, "step": 1, "placeholder": ""},
            "button-icon-size": {"min": -20, "max": 20, "step": 1, "placeholder": ""},
            "max-width-page-size": {"min": 400, "max": 10000, "step": 100, "placeholder": "px"},
            "scale-size": {"min": 1, "max": 100, "step": 1, "placeholder": ""},
            "row-size": {"min": 1, "max": 100, "step": 1, "placeholder": ""},
            "overflow-tab-text-size": {"min": 1, "max": 100, "step": 1, "placeholder": ""}
        },
        'toggle': {
            "state-of-navbar-toggle": {
                "fixed": true,
                "absolute": false
            }
        },
        'family': {
            "default-font-family": [
                {"value": "'Segoe UI', Calibri, Arial|ESP_EASY_CUSTOM_FONT", "text": "Custom Google Font"},
                {"value": "Arial, Helvetica, sans-serif", "text": "Arial"},
                {"value": "'Comic Sans MS', cursive, sans-serif", "text": "Comic Sans"},
                {"value": "Impact, Charcoal, sans-serif", "text": "Impact"},
                {"value": "'Segoe UI', Calibri, Arial", "text": "Segoe UI"},
                {"value": "'Times New Roman', Times, serif", "text": "Times New Roman"},
                {"value": "Verdana, Geneva, sans-serif", "text": "Verdana"}
            ]
        },
        'url': {
            "custom-wallpaper-url": {"placeholder": "png, jpg, gif, blank = none"}
        }
    }
};

const patreon = {};