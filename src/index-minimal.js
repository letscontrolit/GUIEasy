/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */

//TODO: make script external, as well as the style... better minifying possibilities that way
let obj = {};
obj.list = [];
obj.file = "";
obj.frontend = {
    "b": "Upgrade Front End",
    "a": "Select version in the dropdown below (sorted latest to oldest):",
    "baseURL": "https://raw.githubusercontent.com/letscontrolit/GUIEasy/master/build/",
    "rlEndpoint": "releases.txt",
    "infoEndpoint": "release.txt",
    "fileName": "index.htm.gz",
    "uploadEndpoint": "/upload",
    "uploadSpeed": 35,
    "t": "Click the button below to upgrade this unit.",
    "v": "" //FRONTEND <--- don't change this row, used for Grunt
};
obj.backend = {
    "b": "Update Firmware",
    "a": "Select version in the dropdown below (sorted latest to oldest):",
    "baseURL": "https://raw.githubusercontent.com/letscontrolit/GUIEasy/master/build/",
    "rlEndpoint": "releases.txt",
    "infoEndpoint": "release.txt",
    "fileName": "firmware.bin",
    "uploadEndpoint": "/update",
    "uploadSpeed": 25,
    "t": "Click the button below to upgrade this unit to selected firmware version.",
    "v": "" //BACKEND <--- don't change this row, used for Grunt
};
let fe, be, r, rc, n, t, d, f, m, upload, b, a, p, v, w, buttons;
ini = function () {
    let ok = start('frontend');
    dragDropEvent();
};
start = async function (type) {
    document.body.dataset.type = type;
    fe = document.getElementById("fe"); //front end button
    be = document.getElementById("be"); //back end button
    m = document.getElementById("m"); //manual button
    upload = document.getElementById("upload"); //manual upload button
    buttons = document.getElementById("buttons"); //buttons container
    r = document.getElementById("r"); //filter release button
    rc = document.getElementById("rc"); //filter release candidates button
    n = document.getElementById("n"); //filter nightlies button
    a = document.getElementById("a"); //text
    t = document.getElementById("t"); //text
    w = document.getElementById("w"); //warning
    d = document.getElementById("d"); //select version
    f = document.getElementById("f"); //select build
    b = document.getElementById("b"); //button
    p = document.getElementById("p"); //progress bar
    v = document.getElementById("v"); //version
    //------------
    let hides = [fe, be, m, upload, d, f, b, a, t, r, rc, n, v, w, buttons];
    for (let i = 0; i < hides.length; i++) {
        hides[i].style.display = "none";
    }
    //------------
    p.style.width = "0";
    document.documentElement.style.setProperty("--color", "var(--" + type + "-color)");
    if (type === "manual") {
        setupManualPage();
        return;
    }
    filter('r');
    if (window.navigator.onLine === true) {
        //It's ok to download
        obj.list = await fetchReleases(type);
        obj.list.reverse();
        filter('r');
        d.onfocus=function () {
            this.size = 10;
            this.style.fontSize = "1.5em";
            this.style.padding = "0";
        };
        d.onchange=function () {
            this.size = 1;
            this.blur();
        };
        d.onblur=function () {
            this.size = 0;
            this.style.fontSize = "unset";
            this.style.padding = ".65em 2em";
            addFilesToOption();
        };
        f.onfocus=function () {
            this.size = 5;
            this.style.fontSize = "1.5em";
            this.style.padding = "0";
        };
        f.onchange=function () {
            this.size = 1;
            this.blur();
        };
        f.onblur=function () {
            this.size = 0;
            this.style.fontSize = "unset";
            this.style.padding = ".65em 2em";
        };
        t.innerHTML = obj[type].t;
        if (type === "frontend") {
            fe.classList.add("active");
            be.classList.remove("active");
            m.classList.remove("active");
        }
        if (type === "backend") {
            fe.classList.remove("active");
            be.classList.add("active");
            m.classList.remove("active");
        }
        let flexes = [fe, be, m, r, rc, n];
        for (let i = 0; i < flexes.length; i++) {
            flexes[i].style.display = "flex";
        }
        let blocks = [d, f, b, a, t, v];
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].style.display = "block";
        }
        let innerHTMLs = [
            [a, "a"],
            [b, "b"],
            [v, "v"]
        ];
        for (let i = 0; i < innerHTMLs.length; i++) {
            innerHTMLs[i][0].innerHTML = obj[type][innerHTMLs[i][1]];
        }
        buttons.style.display = "inline-flex";
    } else {
        //Cannot download
        setupManualPage('offline');
    }
};
setupManualPage = function (type = "") {
    let flexes = [fe, be, m, upload];
    for (let i = 0; i < flexes.length; i++) {
        flexes[i].style.display = "flex";
    }
    fe.classList.remove("active");
    be.classList.remove("active");
    m.classList.add("active");
    dragDropEvent(true);
    if (type === "offline") {
        let disables = [fe, be];
        for (let i = 0; i < disables.length; i++) {
            disables[i].disabled = "true";
            disables[i].style.cursor = "not-allowed";
            disables[i].style.textDecorationLine = "line-through";
            disables[i].style.textDecorationColor = "rgb(var(--" + type + "-color))";
            disables[i].style.textDecorationStyle = "wavy";
        }
        m.disabled = "true";
        m.style.cursor = "not-allowed";
        document.documentElement.style.setProperty("--color", "var(--manual-color)");
        t.innerHTML = "No Internet connection. Please connect to Internet to download graphical user interface - OR - browse to a Queen.";
        t.style.color = "rgb(var(--" + type + "-color))";
        t.style.display = "block";
    }
};
filter = function (type) {
    r.classList.remove("active");
    rc.classList.remove("active");
    n.classList.remove("active");
    document.getElementById(type).classList.add("active");
    w.innerText = "";
    w.style.display = "none";
    addOptions(type);
    addFilesToOption();
};
addFilesToOption = async function () {
    f.innerHTML = "";
    let version = d.value;
    let type = document.body.dataset.type;
    let info = "";
    if (version !== "") {
        info = await fetchInfo(type, version);
        for (let i = 0; i < info.files.length; i++) {
            let option = document.createElement("option");
            option.text = info.files[i].build + " (" + (Math.round(info.files[i].size * 10) / 10 / 1000).toFixed(1) + "kB)";
            option.value = info.files[i].build;
            f.add(option);
        }
        if (info.warning !== "") {
            w.innerText = info.warning;
            w.style.display = "block";
        }
        obj.timestamp = parseInt(info.timestamp);
    }
};
addOptions = function (type) {
    d.innerHTML = "";
    let contains = "";
    if (type === "rc") {
        contains = "rc";
    }
    if (type === "n") {
        contains = "nightly";
    }
    for (let i = 0; i < obj.list.length; i++) {
        if (obj.list[i] === "") {
            continue;
        }
        if (contains === "") {
            if (obj.list[i].includes("rc") || obj.list[i].includes("nightly")) {
                continue;
            }
        } else {
            if (obj.list[i].includes(contains) !== true) {
                continue;
            }
        }
        let option = document.createElement("option");
        option.text = obj.list[i];
        option.value = obj.list[i];
        d.add(option);
    }
};
dragDropEvent = function () {
    let defaultText = upload.innerText.toString();
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        upload.addEventListener(eventName, function (e) {
            e.preventDefault();
            e.stopPropagation();
        }, false)
    });
    ['dragenter', 'dragover'].forEach(eventName => {
        upload.addEventListener(eventName, function () {
            upload.innerText = "Drop File Here...";
            upload.classList.add('drag-drop');
        }, false)
    });
    ['dragleave', 'drop'].forEach(eventName => {
        upload.addEventListener(eventName, function (event) {
            upload.classList.remove('drag-drop');
            upload.innerText = defaultText;
            if (eventName === "drop" && obj.file === "") {
                let file = event.dataTransfer.files[0];
                obj.file = file.name;
                uploadFile(file);
            }
        }, false)
    });
};
browseFile = function () {
    let i = document.createElement("input");
    i.type = "file";
    i.oninput = function (event) {
        let file = event.path[0].files[0];
        obj.file = file.name;
        uploadFile(file);
        i.remove();
    };
    i.dispatchEvent(new MouseEvent("click"));
};
getPickedFile = async function () {
    let type = document.body.dataset.type;
    let url = obj[type].baseURL;
    url += document.getElementById("d").value + "/";
    url += document.getElementById("f").value + "/" + obj[type].fileName;
    url += "?callback=" + Date.now();
    await fetch(url)
        .then(res => res.blob())
        .then((data) => {
            data.lastModifiedDate = new Date(obj.timestamp);
            data.name = obj[type].fileName;
            data.ext = data.name.match(/\.[0-9a-z]+$/i)[0].toLowerCase();
            file = data;
        })
        .catch(error => {
            console.warn('no warning.txt found: ' + error, 0, "error");
        });
    await update(file);
    setTimeout( function () {
        obj.file = "";
    }, 100);
};
uploadFile = function (file) {
    file.ext = file.name.match(/\.[0-9a-z]+$/i)[0].toLowerCase();
    update(file);
    setTimeout( function () {
        obj.file = "";
    }, 100);
};
fetchInfo = async function (type, version) {
    let info = {};
    const releaseList = obj[type].baseURL + version + "/info/" + obj[type].infoEndpoint + "?callback=" + Date.now();
    await fetch(releaseList)
        .then(res => res.text())
        .then((list) => {
            let temp = list.split(/\n/);
            for (let i = 0; i < temp.length; i++) {
                let att = temp[i].replace(":", "||");
                att = att.split("||");
                info[att[0]] = att[1];
            }
        })
        .catch(error => {
            console.warn('Error fetching info: ' + error, 0, "error");
        });
    info.files = JSON.parse(info.files);
    info.warning = "";
    const warningTxt = obj[type].baseURL + version + "/info/warning.txt?callback=" + Date.now();
    await fetch(warningTxt)
        .then(res => res.text())
        .then((txt) => {
            if (txt === "404: Not Found\n") {
                info.warning = "";
            } else {
                info.warning = txt;
            }
        })
        .catch(error => {
            console.warn('no warning.txt found: ' + error, 0, "error");
        });
    return info;
};
fetchReleases = async function (type) {
    let rl = "";
    const releaseList = obj[type].baseURL + obj[type].rlEndpoint + "?callback=" + Date.now();
    await fetch(releaseList)
        .then(res => res.text())
        .then((list) => {
            rl = list.split(/\n/);
        })
        .catch(error => {
            console.warn('Error fetching releases: ' + error, 0, "error");
        });
    return rl;
};
blinkElement = function (id, color) {
    //TODO: add blink functionality
};
update = async function (file) {
    let maxSize = 1000; //TODO: populate with SPIFF or FLASH free size!
    let uploadSpeed = obj.frontend.uploadSpeed;
    let url = obj.frontend.uploadEndpoint;
    let reboot = false;
    if (file.ext === ".bin") {
        uploadSpeed = obj.backend.uploadSpeed;
        url = obj.backend.uploadEndpoint;
        file.name = obj.backend.fileName;
    }
    if (file.ext === ".gz") {
        reboot = true;
        file.name = obj.frontend.fileName;
    }
    maxSize = maxSize * 1000;
    if (maxSize < file.size) {
        let el = [upload, b];
        for (let i = 0; i < el.length; i++) {
            let temp = el[i].innerText;
            el[i].innerText = "File size too big!";
            blinkElement(el[i].id, "rgb(var(--offline-color))");
            setTimeout(function () {
                blinkElement(el[i].id, "rgb(var(--offline-color))");
            }, 500);
            setTimeout(function () {
                el[i].innerText = temp;
            }, 750);
        }
    } else {
        let timeout = 100;
        let fullUpload = file.size / uploadSpeed / timeout;
        let el = [upload, b];
        let innerTexts = [];
        for (let y = 0; y < el.length; y++) {
            innerTexts[y] = el[y].innerText;
        }
        let i = 0;
        let timer = setInterval(function () {
            i++;
            let percentage = Math.floor(i / fullUpload * 100);
            if (percentage > 100) {
                percentage = 100;
            }
            for (let k = 0; k < el.length; k++) {
                el[k].innerText = file.name + " (" + percentage + "%)";
            }
            p.style.width = percentage + "%";
        }, timeout);
        let formData = new FormData();
        formData.append("file", file, file.name);
        formData.append("enctype", "multipart/form-data");
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.text())
            .then((html) => {
                clearInterval(timer);
                p.style.width = "100%";
                console.log(html);
                for (let k = 0; k < el.length; k++) {
                    el[k].innerText = file.name + " (100%)";
                    setTimeout(function () {
                        blinkElement(el[k].id, "var(--color-2)");
                        p.style.width = "0";
                    }, 500);
                    setTimeout(function () {
                        el[k].innerText = innerTexts[k];
                    }, 1000);
                    setTimeout(function () {
                        if (reboot === true) {
                            location.reload();
                        }
                    }, 2000);
                }
            })
            .catch(error => {
                console.warn('Error uploading (' + obj[type].fileName + '): ' + error, 0, "error");
            });
    }
};