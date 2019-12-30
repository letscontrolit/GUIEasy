/* GUIEasy  Copyright (C) 2019-2019  Jimmy "Grovkillen" Westberg */
//HERE'S THE SETTINGS USED FOR THE SPA ENGINE = TRANSLATIONS ARE PUT IN ANOTHER FILE
const guiEasy = {
    'logLevel': 0,
    'name': 'GUI Easy',
    'version': {
        //--GRUNT-START--
        'major': 0,
        'minor': 0,
        'minimal': 1,
        'development': true,
        'releaseCandidate': 0
        //--GRUNT-END--
        ,
        'full': function () {
            let x = guiEasy.version;
            if (x.development === true && x.releaseCandidate > 0) {
                return x.major + '.' + x.minor + '.rc' + x.releaseCandidate + '.' + x.minimal;
            } else if (x.development === true) {
                return x.major + '.' + x.minor + '.nightly.' + x.minimal;
            } else {
                return x.major + '.' + x.minor + '.' + x.minimal;
            }
        }
    },
    'geekName': function () {
        return guiEasy.name.replace(' ', '-').toLowerCase();
    },
    'geekNameFull': function () {
        return guiEasy.geekName() + '-' + guiEasy.version.full()
    },
    'current': {},
    'fetchSettings':{
        'maxToKeep': 5,                                         //Mintes...
        'minToKeep': 1,
        'intervalGUIupdater': 1000,                             //ms
        'intervalTimeKeeper': 700,                              //min period in-between fetches
        'maxToKeepMs': function () {
            return 60 * 1000 / guiEasy.intervalGUIupdater;
        },
    },
    'nodes': [],
    'startup': [
        {
            'id': 'curly',
            'logText': 'HTML build up'
        },
        {
            'id': 'scrubber',
            'logText': 'HTML scrubbing'
        },
        {
            'id': 'popper',
            'logText': 'Adding event handlers'
        },
        {
            'id': 'pitcher',
            'logText': 'Getting data from unit plus setting up user preferences'
        }
    ],
    'silentStartup': [
        {
            'id': 'butler',
            'logText': 'Fetching stuff from internet'
        },
        {
            'id': 'tender',
            'logText': 'The relay runner is being triggered'
        }
    ],
    'endpoints':{
        'defaultTTL': function () {
            return 60000        //Once a minute
        },
        'get':[
            {'endpoint':'json',                 'ttl_fallback':2000},
            {'endpoint':'buildinfo',            'ttl_fallback':99999999},       //will not update very often...
            {'endpoint':'logjson'},          //Fallback of 29999 will not be part of first boot fetch
            {'endpoint':'sysinfo_json'},
            {'endpoint':'node_list_json'},
            {'endpoint':'filelist_json'},
            {'endpoint':'i2cscanner_json'},
            {'endpoint':'pinstates_json'},
            {'endpoint':'timingstats_json',     'ttl_fallback':999999},
            {'endpoint':'wifiscanner_json'}
        ],
        'post':[
            {'endpoint':'factoryreset_json'},
            {'endpoint':'upload_json'}
        ]
    },
    'fetchingWait': "Fetching not yet completed, please wait...",
    'maxTasks': function (board= 'ESP82XX') {
        if (board === 'ESP82XX') {
            return 12;
        }
        if (board === 'ESP32') {
            return 48;
        }
    },
    'maxValuesPerTask': function (board= 'ESP82XX') {
        if (board === 'ESP82XX') {
            return 4;
        }
        if (board === 'ESP32') {
            return 8;
        }
    },
    'maxNotification': function (board= 'ESP82XX') {
        if (board === 'ESP82XX') {
            return 3;
        }
        if (board === 'ESP32') {
            return 3;
        }
    },
    'maxController': function (board= 'ESP82XX') {
        if (board === 'ESP82XX') {
            return 3;
        }
        if (board === 'ESP32') {
            return 3;
        }
    },
    'maxPluginConfigVar': function (board= 'ESP82XX') {
        if (board === 'ESP82XX') {
            return 8;
        }
        if (board === 'ESP32') {
            return 8;
        }
    },
    'maxPluginConfigFloatVar': function (board= 'ESP82XX') {
        if (board === 'ESP82XX') {
            return 4;
        }
        if (board === 'ESP32') {
            return 4;
        }
    },
    'maxPluginConfigLongVar': function (board= 'ESP82XX') {
        if (board === 'ESP82XX') {
            return 4;
        }
        if (board === 'ESP32') {
            return 4;
        }
    },
    'maxPluginExtraConfigVar': function (board= 'ESP82XX') {
        if (board === 'ESP82XX') {
            return 16;
        }
        if (board === 'ESP32') {
            return 16;
        }
    },
    'maxFormulaLength': function (board= 'ESP82XX') {
        if (board === 'ESP82XX') {
            return 40;
        }
        if (board === 'ESP32') {
            return 40;
        }
    },
    'timelist': {
        'week': [
                {"text":"Last","value":0, "disabled":false, "note":""},
                {"text":"1st","value":1, "disabled":false, "note":""},
                {"text":"2nd","value":2, "disabled":false, "note":""},
                {"text":"3rd","value":3, "disabled":false, "note":""},
                {"text":"4th","value":4, "disabled":false, "note":""}
                ],
        'day':  [
                {"text":"Monday","value":1, "disabled":false, "note":""},
                {"text":"Tuesday","value":2, "disabled":false, "note":""},
                {"text":"Wednesday","value":3, "disabled":false, "note":""},
                {"text":"Thursday","value":4, "disabled":false, "note":""},
                {"text":"Friday","value":5, "disabled":false, "note":""},
                {"text":"Saturday","value":6, "disabled":false, "note":""},
                {"text":"Sunday","value":7, "disabled":false, "note":""}
                ],
        'month':[
                {"text":"January","value":1, "disabled":false, "note":""},
                {"text":"February","value":2, "disabled":false, "note":""},
                {"text":"Mars","value":3, "disabled":false, "note":""},
                {"text":"April","value":4, "disabled":false, "note":""},
                {"text":"May","value":5, "disabled":false, "note":""},
                {"text":"June","value":6, "disabled":false, "note":""},
                {"text":"July","value":7, "disabled":false, "note":""},
                {"text":"August","value":8, "disabled":false, "note":""},
                {"text":"September","value":9, "disabled":false, "note":""},
                {"text":"October","value":10, "disabled":false, "note":""},
                {"text":"November","value":11, "disabled":false, "note":""},
                {"text":"December","value":12, "disabled":false, "note":""}
                ]
    },
    'gpiolist': function (board = 'ESP82XX') {
        if (board === 'ESP82XX') {
            return [
                    {'text':'- None -', 'value':-1, 'disabled':false, 'note':''},
                    {'text':'GPIO 0 (D3)', 'value':0, 'disabled':false, 'note':'\u26A0'},
                    {'text':'GPIO 1 (D10)', 'value':1, 'disabled':true, 'note':'Tx0'},
                    {'text':'GPIO 2 (D4)', 'value':2, 'disabled':false, 'note':'\u26A0'},
                    {'text':'GPIO 3 (D9)', 'value':3, 'disabled':true, 'note':'Rx0'},
                    {'text':'GPIO 4 (D2)', 'value':4, 'disabled':false, 'note':''},
                    {'text':'GPIO 5 (D1)', 'value':5, 'disabled':false, 'note':''},
                    {'text':'GPIO 9 (D11)', 'value':9, 'disabled':false, 'note':'\u26A0'},
                    {'text':'GPIO 10 (D10)', 'value':10, 'disabled':false, 'note':'\u26A0'},
                    {'text':'GPIO 12 (D12)', 'value':12, 'disabled':false, 'note':''},
                    {'text':'GPIO 13 (D13)', 'value':13, 'disabled':false, 'note':''},
                    {'text':'GPIO 14 (D14)', 'value':14, 'disabled':false, 'note':''},
                    {'text':'GPIO 15 (D15)', 'value':15, 'disabled':false, 'note':'\u26A0'},
                    {'text':'GPIO 16 (D16)', 'value':16, 'disabled':false, 'note':''}
                ]
        }
        if (board === 'ESP32') {
            return null;
        }

    },
    'tabs': {
        'left': ['main', 'config', 'hardware', 'devices'],
        'right': ['controllers', 'notification', 'tools', 'rules']
        },
    'guiStats': {           //Not to be mistaken for the unit's stats, this is the queen bee gui buildup stats
        'pageSize': 0,      //the other is how the unit themselves are doing fetch-wise
        'bootTime': 0,
        'eventCalls': 0,
        'eventCallsTotal': 0
    },
    'syntax': {
        'curlyLC': 0,  //USED TO SEE HOW MANY LOOPS ARE NEEDED TO REPLACE ALL CURLY
        'curly': [
                // PUT CURLY's WITH NO SUB-CURLY's FIRST FOR OPTIMIZATION
                // FIRST LEVEL ONLY, the rest will dig down automatically
                // We create this array manually for optimization purpose
                    'fetching',
                    'input',
            'table',
                    'goto',
                    'button',
                    'version',
                    'devicetable',
                    'controllertable',
                    'notificationtable',
                    'setup',
                    'notifier',
                    'drawer',
                    'navbar',
                    'unit',
                    'unitname',
                    'modal',
                    'menu',
                    'wave',
                    'page',
                    'logo',
                    'icon'
                ]
    }
};