/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */
guiEasy.configDat = {};

//THIS CONFIG TABLE AND ITS PARSER IS MADE BY https://github.com/ppisljar and NOT Grovkillen, I just formed it to fit my framework.

guiEasy.configDat.configDatParseConfig = [
    { prop: 'status.PID', type: 'int32' },
    { prop: 'status.version', type: 'int32' },
    { prop: 'status.build', type: 'int16' },
    { prop: 'config.IP.ip', type: 'bytes', length: 4 },
    { prop: 'config.IP.gw', type: 'bytes', length: 4 },
    { prop: 'config.IP.subnet', type: 'bytes', length: 4 },
    { prop: 'config.IP.dns', type: 'bytes', length: 4 },
    { prop: 'config.experimental.ip_octet', type: 'byte' },
    { prop: 'config.general.unitnr', type: 'byte' },
    { prop: 'config.general.unitname', type: 'string', length: 26 },
    { prop: 'config.ntp.host', type: 'string', length: 64 },
    { prop: 'config.sleep.sleeptime', type: 'int32' },
    { prop: 'hardware.i2c.sda', type: 'byte' },
    { prop: 'hardware.i2c.scl', type: 'byte' },
    { prop: 'hardware.led.gpio', type: 'byte' },
    { prop: 'config.log.sd_port', type: 'byte' },
    { prop: 'hardware.gpio', type: 'bytes', length: 17 },
    { prop: 'config.log.syslog_ip', type: 'bytes', length: 4 },
    { prop: 'config.espnetwork.port', type: 'int32' },
    { prop: 'config.log.syslog_level', type: 'byte' },
    { prop: 'config.log.serial_level', type: 'byte' },
    { prop: 'config.log.web_level', type: 'byte' },
    { prop: 'config.log.sd_level', type: 'byte' },
    { prop: 'config.serial.baudrate', type: 'int32' },
    { prop: 'config.mqtt.interval', type: 'int32' },
    { prop: 'config.sleep.awaketime', type: 'byte' },
    { prop: 'CustomCSS', type: 'byte' },
    { prop: 'config.dst.enabled', type: 'byte' },
    { prop: 'config.experimental.WDI2CAddress', type: 'byte' },
    { prop: 'config.rules.enabled', type: 'byte' },
    { prop: 'config.serial.enabled', type: 'byte' },
    { prop: 'config.ssdp.enabled', type: 'byte' },
    { prop: 'config.ntp.enabled', type: 'byte' },
    { prop: 'config.experimental.WireClockStretchLimit', type: 'int32' },
    { prop: 'GlobalSync', type: 'byte' },
    { prop: 'config.experimental.ConnectionFailuresThreshold', type: 'int32' },
    { prop: 'config.dst.TimeZone', type: 'int16'},
    { prop: 'config.mqtt.retain_flag', type: 'byte' },
    { prop: 'hardware.spi.enabled', type: 'byte' },
    [...Array(guiEasy.maxController())].map((x, i) => ({ prop: `controllers[${i}].protocol`, type:'byte' })),
    [...Array(guiEasy.maxNotification())].map((x, i) => ({ prop: `notifications[${i}].type`, type:'byte' })),
    [...Array(guiEasy.maxTasks())].map((x, i) => ({ prop: `tasks[${i}].device`, type:'byte' })),
    [...Array(guiEasy.maxTasks())].map((x, i) => ({ prop: `tasks[${i}].OLD_TaskDeviceID`, type:'int32' })),
    [...Array(guiEasy.maxTasks())].map((x, i) => ({ prop: `tasks[${i}].gpio1`, type:'byte' })),
    [...Array(guiEasy.maxTasks())].map((x, i) => ({ prop: `tasks[${i}].gpio2`, type:'byte' })),
    [...Array(guiEasy.maxTasks())].map((x, i) => ({ prop: `tasks[${i}].gpio3`, type:'byte' })),
    [...Array(guiEasy.maxTasks())].map((x, i) => ({ prop: `tasks[${i}].gpio4`, type:'byte' })),
    [...Array(guiEasy.maxTasks())].map((x, i) => ({ prop: `tasks[${i}].pin1pullup`, type:'byte' })),
    [...Array(guiEasy.maxTasks())].map((x, i) => ({ prop: `tasks[${i}].configs`, type:'ints', length: guiEasy.maxPluginConfigVar() })),
    [...Array(guiEasy.maxTasks())].map((x, i) => ({ prop: `tasks[${i}].pin1inversed`, type:'byte' })),
    [...Array(guiEasy.maxTasks())].map((x, i) => ({ prop: `tasks[${i}].configs_float`, type:'floats', length: guiEasy.maxPluginConfigFloatVar() })),
    [...Array(guiEasy.maxTasks())].map((x, i) => ({ prop: `tasks[${i}].configs_long`, type:'longs', length: guiEasy.maxPluginConfigLongVar() })),
    [...Array(guiEasy.maxTasks())].map((x, i) => ({ prop: `tasks[${i}].OLD_senddata`, type:'byte' })),
    [...Array(guiEasy.maxTasks())].map((x, i) => ({ prop: `tasks[${i}].global_sync`, type:'byte' })),
    [...Array(guiEasy.maxTasks())].map((x, i) => ({ prop: `tasks[${i}].data_feed`, type:'byte' })),
    [...Array(guiEasy.maxTasks())].map((x, i) => ({ prop: `tasks[${i}].interval`, type:'int32' })),
    [...Array(guiEasy.maxTasks())].map((x, i) => ({ prop: `tasks[${i}].enabled`, type:'byte' })),
    [...Array(guiEasy.maxController())].map((x, i) => ({ prop: `controllers[${i}].enabled`, type:'byte' })),
    [...Array(guiEasy.maxNotification())].map((x, i) => ({ prop: `notifications[${i}].enabled`, type:'byte' })),
    [...Array(guiEasy.maxTasks())].map((x, i) => ({ prop: `tasks[${i}].TaskDeviceID`, type:'longs', length: guiEasy.maxController() })),
    [...Array(guiEasy.maxTasks())].map((x, i) => ({ prop: `tasks[${i}].TaskDeviceSendData`, type:'bytes', length: guiEasy.maxController() })),
    { prop: 'hardware.led.inverse', type: 'byte' },
    { prop: 'config.sleep.sleeponfailiure', type: 'byte' },
    { prop: 'config.log.sd_log_enabled', type: 'byte' },
    { prop: 'ArduinoOTAEnable', type: 'byte' },
    { prop: 'config.dst.start', type: 'int16' },
    { prop: 'config.dst.end', type: 'int16' },
    { prop: 'UseRTOSMultitasking', type: 'byte' },
    { prop: 'hardware.reset.pin', type: 'byte' },
    { prop: 'config.log.syslog_facility', type: 'byte' },
    { prop: 'StructSize', type: 'int32' },
    { prop: 'config.mqtt.useunitname', type: 'byte' },
    { prop: 'config.location.lat', type: 'float' },
    { prop: 'config.location.long', type: 'float' },
    { prop: 'config.variousBits', type: 'int32' },
    { prop: 'ResetFactoryDefaultPreference', type: 'int32' }
].flat();

guiEasy.configDat.taskSettings = [
    { prop: 'index', type:'byte' },
    { prop: 'name', type:'string', length: guiEasy.maxFormulaLength() + 1 },
    [...Array(guiEasy.maxValuesPerTask())].map((x, i) => ({ prop: `values[${i}].formula`, type:'string', length: guiEasy.maxFormulaLength() + 1 })),
    [...Array(guiEasy.maxValuesPerTask())].map((x, i) => ({ prop: `values[${i}].name`, type:'string', length: guiEasy.maxFormulaLength() + 1 })),
    { prop: 'value_names', type:'string', length: guiEasy.maxFormulaLength() + 1 },
    { prop: 'plugin_config_long', type:'longs', length: guiEasy.maxPluginExtraConfigVar() },
    { prop: 'decimals', type:'bytes', length: guiEasy.maxValuesPerTask() },
    { prop: 'plugin_config', type:'ints', length: guiEasy.maxPluginExtraConfigVar() },
].flat();

guiEasy.configDat.controllerSettings = [
    { prop: 'dns', type:'byte' },
    { prop: 'IP', type:'bytes', length: 4 },
    { prop: 'port', type:'int32' },
    { prop: 'hostname', type:'string', length: 65 },
    { prop: 'publish', type:'string', length: 129 },
    { prop: 'subscribe', type:'string', length: 129 },
    { prop: 'MQTT_lwt_topic', type:'string', length: 129 },
    { prop: 'lwt_message_connect', type:'string', length: 129 },
    { prop: 'lwt_message_disconnect', type:'string', length: 129 },
    { prop: 'minimal_time_between', type:'int32' },
    { prop: 'max_queue_depth', type:'int32' },
    { prop: 'max_retry', type:'int32' },
    { prop: 'delete_oldest', type:'byte' },
    { prop: 'client_timeout', type:'int32' },
    { prop: 'must_check_reply', type:'byte' },
];

guiEasy.configDat.notificationSettings = [
    { prop: 'server', type:'string', length: 65 },
    { prop: 'port', type:'int16' },
    { prop: 'domain', type:'string', length: 65 },
    { prop: 'sender', type:'string', length: 65 },
    { prop: 'receiver', type:'string', length: 65 },
    { prop: 'subject', type:'string', length: 129 },
    { prop: 'body', type:'string', length: 513 },
    { prop: 'pin1', type:'byte' },
    { prop: 'pin2', type:'byte' },
    { prop: 'user', type:'string', length: 49 },
    { prop: 'pass', type:'string', length: 33 },
];

guiEasy.configDat.securitySettings = [
    { prop: 'WifiSSID', type:'string', length: 32 },
    { prop: 'WifiKey', type:'string', length: 64 },
    { prop: 'WifiSSID2', type:'string', length: 32 },
    { prop: 'WifiKey2', type:'string', length: 64 },
    { prop: 'WifiAPKey', type:'string', length: 64 },
    [...Array(guiEasy.maxController())].map((x, i) => ({ prop: `controllers[${i}].user`, type:'string', length: 26 })),
    [...Array(guiEasy.maxController())].map((x, i) => ({ prop: `controllers[${i}].password`, type:'string', length: 64 })),
    { prop: 'password', type:'string', length: 26 },
    { prop: 'AllowedIPrangeLow', type:'bytes', length: 4 },
    { prop: 'AllowedIPrangeHigh', type:'bytes', length: 4 },
    { prop: 'IPblockLevel', type:'byte' },
    { prop: 'ProgmemMd5', type:'bytes', length: 16 },
    { prop: 'md5', type:'bytes', length: 16 },
].flat();

guiEasy.configDat.dst = function(what) {
    let list = [
        "config.dst.binary." + what + "_emptyBit",
        "config.dst.binary." + what + ".week.1",
        "config.dst.binary." + what + ".week.2",
        "config.dst.binary." + what + ".week.3",
        "config.dst.binary." + what + ".day.1",
        "config.dst.binary." + what + ".day.2",
        "config.dst.binary." + what + ".day.3",
        "config.dst.binary." + what + ".month.1",
        "config.dst.binary." + what + ".month.2",
        "config.dst.binary." + what + ".month.3",
        "config.dst.binary." + what + ".month.4",
        "config.dst.binary." + what + ".hour.1",
        "config.dst.binary." + what + ".hour.2",
        "config.dst.binary." + what + ".hour.3",
        "config.dst.binary." + what + ".hour.4",
        "config.dst.binary." + what + ".hour.5"
    ];
    let int = guiEasy.nodes[helpEasy.getCurrentIndex()].settings.config.dst[what];
    helpEasy.int32binaryBool(guiEasy.nodes[helpEasy.getCurrentIndex()], int, list, "settings.", "_emptyBit_dst_" + what, 16);
    let goThrough = [["week", 3],["day", 3],["month", 4],["hour", 5]];
    let path = guiEasy.nodes[helpEasy.getCurrentIndex()].settings.config.dst;
    for (let i = 0; i < goThrough.length; i++) {
        let kMax = goThrough[i][1] + 1;
        let binary = "";
        for (let k = 1; k < kMax; k++) {
            binary += path.binary[what][goThrough[i][0]][k];
        }
        set(path, "integer." + what + "." + goThrough[i][0], parseInt(binary, 2));
    }
};

guiEasy.configDat.variousBits = function() {
    let list = [
        "config._variousBit1",
        "config._variousBit2",
        "config._variousBit3",
        "config._variousBit4",
        "config._variousBit5",
        "config._variousBit6",
        "config._variousBit7",
        "config._variousBit8",
        "config._variousBit9",
        "config._variousBit10",
        "config._variousBit11",
        "config._variousBit12",
        "config._variousBit13",
        "config._variousBit14",
        "config._variousBit15",
        "config._variousBit16",
        "config._variousBit17",
        "config._variousBit18",
        "config._variousBit19",
        "config._variousBit20",
        "config._variousBit21",
        "config.rules.sendToHTTPack",
        "config.rules.tolerantArgs",
        "config.wifi.noGratuitousARP",
        "config.wifi.forceNoSleep",
        "config.power.ecomode",
        "config.wifi.restartconnlost",
        "config.wifi.forcebgmode",
        "config.rules.useNewEngine",
        "config.mqtt.changeclientidrecon",
        "config.general.doNotAppendUnitNumber",
        "config._variousBit32"  // empty bit...
    ];
    let int = guiEasy.nodes[helpEasy.getCurrentIndex()].settings.config.variousBits;
    helpEasy.int32binaryBool(guiEasy.nodes[helpEasy.getCurrentIndex()], int, list, "settings.");

};

const set = (obj, path, value) => {
    let levels = path.replace(/\[/g, '.').replace(/]/g, '').split('.');
    if (levels.length > 1) {
        for (let i = 0; i < levels.length - 1; i++) {
            if (!obj[levels[i]]) obj[levels[i]] = {};
           obj = obj[levels[i]];
        }
    }
    obj[levels[levels.length - 1]] = value;
};

class DataParser {
    constructor(data) {
        this.view = new DataView(data);
        this.offset = 0;
        this.bitbyte = 0;
        this.bitbytepos = 7;
    }

    pad(nr) {
        while (this.offset % nr) {
            this.offset++;
        }
    }

    bit(signed = false, write = false, val) {
        if (this.bitbytepos === 7) {
            if (!write) {
                this.bitbyte = this.byte();
                this.bitbytepos = 0;
            } else {
                this.byte(signed, write, this.bitbyte);
            }
        }
        if (!write) {
            return (this.bitbyte >> this.bitbytepos++) & 1;
        } else {
            this.bitbyte = val ? (this.bitbyte | (1 << this.bitbytepos++)) : (this.bitbyte & ~(1 << this.bitbytepos++));
        }
    }

    byte(signed = false, write = false, val) {
        this.pad(1);
        const fn = `${write ? 'set' : 'get'}${signed ? 'Int8' : 'Uint8'}`;
        const res = this.view[fn](this.offset, val);
        this.offset += 1;
        return res;
    }

    int16(signed = false, write = false, val) {
        this.pad(2);
        let fn = signed ? 'Int16' : 'Uint16';
        const res =  write ? this.view[`set${fn}`](this.offset, val, true) : this.view[`get${fn}`](this.offset, true);
        this.offset += 2;
        return res;
    }

    int32(signed = false, write = false, val) {
        this.pad(4);
        let fn = signed ? 'Int32' : 'Uint32';
        const res =  write ? this.view[`set${fn}`](this.offset, val, true) : this.view[`get${fn}`](this.offset, true);
        this.offset += 4;
        return res;
    }
    float(signed = false, write = false, val) {
        this.pad(4);
        const res =  write ? this.view.setFloat32(this.offset, val, true) : this.view.getFloat32(this.offset, true);
        this.offset += 4;
        return res;
    }
    bytes(nr, signed = false, write = false, vals) {
        const res = [];
        for (let x = 0; x < nr; x++) {
            res.push(this.byte(signed, write, vals ? vals[x] : null));
        }
        return res;
    }
    ints(nr, signed = false, write = false, vals) {
        const res = [];
        for (let x = 0; x < nr; x++) {
            res.push(this.int16(signed, write, vals ? vals[x] : null));
        }
        return res;
    }
    longs(nr, signed = false, write = false, vals) {
        const res = [];
        for (let x = 0; x < nr; x++) {
            res.push(this.int32(signed, write, vals ? vals[x] : null));
        }
        return res;
    }
    floats(nr, signed = false, write = false, vals) {
        const res = [];
        for (let x = 0; x < nr; x++) {
            res.push(this.float(write, vals ? vals[x] : null));
        }
        return res;
    }
    string(nr, signed = false, write = false, val) {
        if (write) {
            for (let i = 0; i < nr; ++i) {
                let code = val.charCodeAt(i) || '\0';
                this.byte(false, true, code);
            }
        } else {
            const res = this.bytes(nr);
            return String.fromCharCode.apply(null, res).replace(/\x00/g, '');
        }
    }
}