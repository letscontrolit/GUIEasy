//https://link.medium.com/c8U3LzyZF2
//When page has loaded, run "initiate"
window.addEventListener("load", initiate, false);

function initiate() {
    //PRE LAUNCH OF GUI
    for (let i = 0; i < guiEasy.startup.length; i++) {
        let x = guiEasy.startup[i].id;
        let y = guiEasy.startup[i].logText;
        let z = "startup";
        let t = Date.now();
        helpEasy.listOfProcesses(x,y,t,z);
        guiEasy[x](x,z);
    }
    //GUI IS LAUNCHED, FETCH ONE TIME STUFF HERE
    for (let i = 0; i < guiEasy.silentStartup.length; i++) {
        let x = guiEasy.silentStartup[i].id;
        let y = guiEasy.silentStartup[i].logText;
        let z = "silentStartup";
        let t = Date.now();
        helpEasy.listOfProcesses(x,y,t,z);
        guiEasy[x](x,z);
    }
}