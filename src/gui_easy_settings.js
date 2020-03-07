/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */
//HERE'S THE SETTINGS USED FOR THE SPA ENGINE = TRANSLATIONS ARE PUT IN ANOTHER FILE
/*
    V.R.M.build.state
    x.y.odd.odd = test builds
    x.y.odd.even = beta builds
    x.y.even.odd = RC build
    x.y.even.even = released build
*/
const guiEasy = {
    'logLevel': 0,
    'name': 'GUI Easy',
    'version': {
        //--GRUNT-START--
        'major': 0,
        'minor': 1,
        'revision': 5,
        'development': true,
        'releaseCandidate': 0
        //--GRUNT-END--
        ,
        'test': null,    //this one should always be "null", we set it to a timestamp if a test build is made
        'full': function () {
            let x = guiEasy.version;
            let testBuild = "";
            if (x.test !== null) {
                testBuild = "-test-" + x.test;
            }
            if (x.development === true && x.releaseCandidate > 0) {
                return x.major + '.' + x.minor + '.rc' + x.releaseCandidate + '.' + x.revision + testBuild;
            } else if (x.development === true) {
                return x.major + '.' + x.minor + '.nightly.' + x.revision + testBuild;
            } else {
                return x.major + '.' + x.minor + '.' + x.revision + testBuild;
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
    'fetchSettings':{                                           //to store in memory, DOM stuff will grow eternally
        'maxToKeep': 5,                                         //Minutes...
        'minToKeep': 1,
        'intervalGUIupdater': 1000,                             //ms
        'intervalTimeKeeper': 700,                              //min period in-between fetches
        'maxToKeepMs': function () {
            return guiEasy.maxToKeep * 60 * 1000;
        },
        'minToKeepMs': function () {
            return guiEasy.minToKeep * 60 * 1000;
        },
    },
    'nodes': [],
    'loops': {},
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
            {'endpoint':'logjson'},             //Fallback of 29999 will not be part of first boot fetch
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
            {"text":"Sunday","value":1, "disabled":false, "note":""},
            {"text":"Monday","value":2, "disabled":false, "note":""},
            {"text":"Tuesday","value":3, "disabled":false, "note":""},
            {"text":"Wednesday","value":4, "disabled":false, "note":""},
            {"text":"Thursday","value":5, "disabled":false, "note":""},
            {"text":"Friday","value":6, "disabled":false, "note":""},
            {"text":"Saturday","value":7, "disabled":false, "note":""}
        ],
        'month':[
            {"text":"January","value":1, "disabled":false, "note":""},
            {"text":"February","value":2, "disabled":false, "note":""},
            {"text":"March","value":3, "disabled":false, "note":""},
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
    'logLevels': function () {
        return [
            {'text':'- none -', 'value':0, 'disabled':false, 'note':''},
            {'text':'error', 'value':1, 'disabled':false, 'note':''},
            {'text':'info', 'value':2, 'disabled':false, 'note':''},
            {'text':'debug', 'value':3, 'disabled':false, 'note':''},
            {'text':'debug more', 'value':4, 'disabled':false, 'note':''},
            {'text':'not used', 'value':5, 'disabled':true, 'note':'(5)'},
            {'text':'not used', 'value':6, 'disabled':true, 'note':'(6)'},
            {'text':'not used', 'value':7, 'disabled':true, 'note':'(7)'},
            {'text':'not used', 'value':8, 'disabled':true, 'note':'(8)'},
            {'text':'debug development', 'value':9, 'disabled':false, 'note':''}
        ]
    },
    'tabs': {
        'left': ['main', 'config', 'hardware', 'tasks'],
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
            'tasktable',
            'controllertable',
            'notificationtable',
            'setup',
            'notifier',
            'drawer',
            'navbar',
            'unit',
            'unitname',
            'modal',
            'info',
            'menu',
            'wave',
            'page',
            'logo',
            'icon'
        ]
    }
};