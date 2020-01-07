/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */
//HERE'S THE SCRUBBER FUNCTION(S) PUT, SCRUBBER IS ADDING STUFF THAT ARE CALCULATED AFTER THE CULRLY SEQUENCE IS DONE...
guiEasy.scrubber = function (processID, processType) {
    //make sure the page containers (and top notifier) is hidden at start
    let x = document.getElementById("page-container").children;
    for (let i = 0; i < x.length; i++) {
        if (x[i].className === "container" || x[i].className === "top-notifier") {
            x[i].classList.add("is-hidden");
        }
    }
    helpEasy.addToLogDOM("pageSize", 1);
    //add popups for alt-shortcuts (navbar)
    let listOfTabs = [];
    x = document.getElementsByName("nav-group");
    for (let i = 0; i < x.length; i++) {
        let y = x[i].children;
        for (let k = 0; k < y.length; k++) {
            let z = y[k];
            if (
                z.className === "nav" &&
                listOfTabs.length < 10 &&
                i < 2
            ) {
                z.accessKey = "0" + (listOfTabs.length + 1);
                z.accessKey = z.accessKey.substr(-1,1);
                z.dataset.altKey = z.accessKey;
                listOfTabs.push([z.attributes.name.nodeValue, z.accessKey]);
            }
        }
    }
    guiEasy.tabNumber = [];
    for (let i = 0; i < listOfTabs.length; i++) {
        let number = listOfTabs[i][1];
        guiEasy.tabNumber[number] = listOfTabs[i][0].split("-")[1];
    }
    //add default html code to dataset (to easily restore the modal at cancel)
    let modalDefaults = document.getElementById("modal");
    modalDefaults.dataset.defaultView = modalDefaults.innerHTML;
    helpEasy.addToLogDOM("pageSize", 1);
    //add popup divs for tabs...
    for (let i = 0; i < listOfTabs.length; i++) {
        let x = listOfTabs[i];
        let y = document.getElementsByName(x[0]);
        for (let k = 0; k < y.length; k++) {
            let child = document.createElement("div");
            child.className = "alt-popup is-hidden";
            child.innerText = x[1];
            y[k].appendChild(child);
        }
    }
    helpEasy.addToLogDOM("pageSize", 1);

    helpEasy.processDone(processID, processType);
};
