/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */

guiEasy.popper.rules = function(){
    let x = guiEasy.popper.rules;
    x.timeoutStarted = false;
    x.splitSyntax();
    let editor = document.getElementById("rules-editor");
    if (editor === null) {
        return;
    }
    let syntax = document.getElementById("rules-editor-syntax");
    let input = document.getElementById("rules-editor-input");
    let selection = document.getElementById("rules-editor-selection");
    let background = document.getElementById("rules-editor-background");
    let fileSize = document.getElementById("rules-editor-file-size");
    guiEasy.popper.rules.syntax.editorElement = editor;
    guiEasy.popper.rules.syntax.syntaxElement = syntax;
    guiEasy.popper.rules.syntax.inputElement = input;
    guiEasy.popper.rules.syntax.selectionElement = selection;
    guiEasy.popper.rules.syntax.backgroundElement = background;
    guiEasy.popper.rules.syntax.filesizeElement = fileSize;
    editor.addEventListener("input", x.input, false);
    editor.addEventListener("keyup", x.input.specialKeys, false);
    editor.addEventListener("keydown", x.input.specialKeys, false);
    editor.addEventListener("mouseup", x.selection, false);
    editor.addEventListener("blur", x.focus, false);
    editor.addEventListener("focus", x.focus, false);
    x.handleScroll();
    x.syntax.lastRun = Date.now();
    selection.position = {"col": 0, "row": 0};
    x.input({isComposing: false});
    setTimeout(function () {
        selection.classList.add("no-focus");
    }, 1000)
};

guiEasy.popper.rules["syntax"] = {
    'command': [
        ['7db','73','P'],
        ['7dn','73','P'],
        ['7doff','73','P'],
        ['7don','73','P'],
        ['7dt','73','P'],
        ['AccessInfo','0','I'],
        ['Background','0','I'],
        ['Backward','48','P'],
        ['BlynkGet','0','I'],
        ['Build','0','I'],
        ['Buzzer','2','N'],
        ['Chime','55','P'],
        ['ChimePlay','55','P'],
        ['ChimeSave','55','P'],
        ['Clear','12','P'],
        ['ClearAccessBlock','0','I'],
        ['ClearRTCRAM','0','I'],
        ['Config','0','I'],
        ['DCMotor','48','P'],
        ['Debug','0','I'],
        ['DeepSleep','0','I'],
        ['Delay','0','I'],
        ['DMX','54','P'],
        ['Double','48','P'],
        ['Email','1','N'],
        ['ENCwrite','59','P'],
        ['Eq','65','P'],
        ['Erase','0','I'],
        ['Event','5','C'],
        ['ExecuteRules','0','I'],
        ['EXTGPIO','11','P'],
        ['EXTLongPulse','11','P'],
        ['EXTPulse','11','P'],
        ['EXTPWM','11','P'],
        ['Forward','48','P'],
        ['GetLevel','21','P'],
        ['GPIO','1','P'],
        ['GPIOtoggle','1','P'],
        ['High','36','P'],
        ['HLWCalibrate','76','P'],
        ['HLWReset','76','P'],
        ['I2CScanner','0','I'],
        ['InputSwitchState','1','P'],
        ['InterLeave','48','P'],
        ['IP','0','I'],
        ['IRSend','35','P'],
        ['JVC','35','P'],
        ['LCDCMD','12','P'],
        ['Let', '0', 'I'],
        ['LogEntry','0','I'],
        ['LongPulse','1','P'],
        ['LongPulse_ms','1','P'],
        ['Low','36','P'],
        ['LowMem','0','I'],
        ['MalLoc','0','I'],
        ['Mbr','57','P'],
        ['MCPGPIO','9','P'],
        ['MCPLongPulse','9','P'],
        ['MCPPulse','9','P'],
        ['MemInfo','0','I'],
        ['MHZABCDisable','49','P'],
        ['MHZABCEnable','49','P'],
        ['MHZCalibrateZero','49','P'],
        ['MHZMeasurementRange1000','49','P'],
        ['MHZMeasurementRange2000','49','P'],
        ['MHZMeasurementRange3000','49','P'],
        ['MHZMeasurementRange5000','49','P'],
        ['MHZReset','49','P'],
        ['MicroStep','48','P'],
        ['Mnum','57','P'],
        ['Monitor','1','P'],
        ['MotorShieldCMD','48','P'],
        ['Mprint','57','P'],
        ['NEC','35','P'],
        ['NeoClockColor','41','P'],
        ['NeoPixel','38','P'],
        ['NeoPixelAll','38','P'],
        ['NeoPixelLine','38','P'],
        ['NeoTestAll','41','P'],
        ['NeoTestLoop','41','P'],
        ['Nextion','75','P'],
        ['NoSleep','0','I'],
        ['Notify','0','I'],
        ['Off','12','P'],
        ['OLEDCMD','23','P'],
        ['OLEDFramedCMD','36','P'],
        ['Panasonic','35','P'],
        ['Password','0','I'],
        ['PCAFrq','22','P'],
        ['PCAPWM','22','P'],
        ['PCFGPIO','19','P'],
        ['PCFLongPulse','19','P'],
        ['PCFPulse','19','P'],
        ['PinState','1','P'],
        ['Pioneer','35','P'],
        ['Publish','0','I'],
        ['Pulse','1','P'],
        ['PWM','1','P'],
        ['Raw','35','P'],
        ['RC5','35','P'],
        ['RC6','35','P'],
        ['Reboot','0','I'],
        ['Release','48','P'],
        ['ResetFlashWriteCounter','0','I'],
        ['Restart','0','I'],
        ['RTTTL','1','P'],
        ['Samsung','35','P'],
        ['SDCard','0','I'],
        ['SDRemove','0','I'],
        ['SendToHTTP','0','I'],
        ['SendToUDP','0','I'],
        ['Senseair_SetABCPeriod','52','P'],
        ['Senseair_SetRelay','52','P'],
        ['SentTo','0','I'],
        ['SerialFloat','0','I'],
        ['SerialSend','20','P'],
        ['Servo','1','P'],
        ['SetLevel','21','P'],
        ['Settings','0','I'],
        ['Single','48','P'],
        ['Sony','35','P'],
        ['Status','1','P'],
        ['Stepper','48','P'],
        ['Stop','65','P'],
        ['SysLoad','0','I'],
        ['Tare','67','P'],
        ['TaskClear','0','I'],
        ['TaskClearAll','0','I'],
        ['TaskRun','0','I'],
        ['TaskValueSet','0','I'],
        ['TaskValueSetAndRun','0','I'],
        ['TimerPause','0','I'],
        ['TimerResume','0','I'],
        ['TimerSet','0','I'],
        ['Tone','1','P'],
        ['UDPTest','0','I'],
        ['Unit','0','I'],
        ['Vol','65','P'],
        ['WDConfig','0','I'],
        ['WDRead','0','I'],
        ['WiFiAPMode','0','I'],
        ['WiFiConnect','0','I'],
        ['WiFiDisconnect','0','I'],
        ['WiFiKey','0','I'],
        ['WiFiKey2','0','I'],
        ['WiFiScan','0','I'],
        ['WiFiSSID','0','I'],
        ['WiFiSSID2','0','I']
    ],
        'event': [
        ['Clock#Time=','0','I'],
        ['GPIO#','0','I'],
        ['GPS#GotFix','82','P'],
        ['GPS#LostFix','82','P'],
        ['Login#Failed','0','I'],
        ['MQTT#Connected','0','I'],
        ['MQTT#Disconnected','0','I'],
        ['MQTTimport#Connected','0','I'],
        ['MQTTimport#Disconnected','0','I'],
        ['Rules#Timer=','0','I'],
        ['Rules#TimerPause=','0','I'],
        ['Rules#TimerResume=','0','I'],
        ['System#Boot','0','I'],
        ['System#Sleep','0','I'],
        ['System#Wake','0','I'],
        ['Time#Initialized','0','I'],
        ['Time#Set','0','I'],
        ['WiFi#APmodeDisabled','0','I'],
        ['WiFi#APmodeEnabled','0','I'],
        ['WiFi#ChangedAccesspoint','0','I'],
        ['WiFi#Connected','0','I'],
        ['WiFi#Disconnected','0','I']
    ],
        'arithmetic': [
        ['+'],
        ['-'],
        ['*'],
        ['/'],
        ['^']
    ],
        'parentheses': [
        [')'],
        ['('],
        ['%']
    ],
        'logic': [
        ['and'],
        ['or'],
        ['='],
        ['!='],
        ['<'],
        ['>'],
        ['>='],
        ['<='],
        ['<>']
    ],
        'block': [
        ['On'],
        ['Do'],
        ['EndOn']
    ],
        'statement': [
        ['If'],
        ['Else'],
        ['EndIf']
    ],
        'comment': [
        ['//', 'EOL']
    ],
        'variable': [
        ['[VAR#'],
        ['[INT#'],
        ['[Plugin#GPIO#Pinstate#']
    ],
        'transformer-binary': [
        [']'],
        ['#C]'],
        ['#!C]'],
        ['#H]'],
        ['#!H]'],
        ['#I]'],
        ['#!I]'],
        ['#M]'],
        ['#!M]'],
        ['#m]'],
        ['#!m]'],
        ['#O]'],
        ['#!O]'],
        ['#U]'],
        ['#!U]'],
        ['#u]'],
        ['#!u]'],
        ['#V]'],
        ['#X]'],
        ['#!X]'],
        ['#Y]'],
        ['#!Y]'],
        ['#y]'],
        ['#!y]'],
        ['#Z]'],
        ['#!Z]']
    ],
        'transformer-floatingPoint': [
        ['#D000.000]'],
        ['#D000]'],
        ['#D.000]'],
        ['#F]'],
        ['#E]']
    ],
        'transformer-justification': [
        ['#P000]'],
        ['#S000]'],
        ['#L000]'],
        ['#R000]'],
        ['#U000.000]']
    ]
};


guiEasy.popper.rules.splitSyntax = function() {
    let x = guiEasy.popper.rules.syntax;
    let syntaxArray = {};
    let listOfTypes = [
        'command',
        'event',
        'arithmetic',
        'logic',
        'block',
        'statement',
        'comment',
        'parentheses',
        'variable',
        'transformer-binary',
        'transformer-floatingPoint',
        'transformer-justification'
    ];
    let l = listOfTypes.length;
    for (let i = 0; i < l; i++) {
        let tempI = x[listOfTypes[i]];
        for (let k = 0; k < tempI.length; k++) {
            let tempK = tempI[k];
            let tempSplit = tempK[0].split("");
            let y = syntaxArray;
            let l = tempSplit.length;
            for (let s = 0; s < l; s++) {
                let z = tempSplit[s].toLowerCase();
                if (y[z] === undefined) {
                    y[z] = {};
                }
                if (s !== (tempSplit.length - 1)) {
                    //
                } else {
                    y[z].type = listOfTypes[i];
                    y[z].full = tempK[0];
                    y[z].elementsPriorToHighlight = s;
                }
                y = y[z];
            }
        }
    }
    guiEasy.popper.rules.syntax.hightlight = syntaxArray;
    //console.log(guiEasy.popper.rules.syntax);
};

guiEasy.popper.rules.input = function (event) {
    let y = guiEasy.popper.rules;
    if (event.isComposing) {
        y.syntax.timePunch = false;
        y.syntax.selectionElement.classList.add("no-focus");
        y.syntaxHighlightTemporary(event.data, y.syntax.editorElement.selectionStart, y.syntax.editorElement.selectionEnd);
    } else {
        if (event.inputType === "insertFromPaste") {
            // TODO: fix the issue when pasting in... position is lost currently!
        }
        y.syntax.timePunch = true;  //makes the parser trigger
    }
    // as long as the user is entering new data this will not be executed. Once the user stops for X ms the parser will kick in
    if (!y.timeoutStarted) {
        y.timeoutStarted = true;
        let p = setInterval(function () {
            y.syntax.timePunch = true;
            if (y.syntax.timePunch) {
                clearInterval(p);
                y.timeoutStarted = false;
                y.syntax.selectionElement.classList.remove("no-focus");
                y.syntaxHighlightAll(y.syntax.editorElement, y.syntax.syntaxElement);
                y.selection();
            }
        }, 25)
    }
};

guiEasy.popper.rules.syntaxHighlightTemporary = function (what, start, end) {
            let x = guiEasy.popper.rules.syntax.selectionElement;
            //default is to insert a character
            let innerText = guiEasy.popper.rules.syntaxHighlightTemporary.checkTypeOfInput(what, start, end);
            if (innerText !== false) {
                x.position.col++;
                let z = guiEasy.popper.rules.syntaxHighlightTemporary;
                z.addCharacter(innerText, x.position.row, x.position.col);
            }
            // this one is special since the "selection" function deals with clicks and inputs, this part deals with the temporary selection
            x.innerHTML = (x.innerHTML).replace(/editor-caret/g, "");
            x.innerHTML = (x.innerHTML).replace(/end-of-line-caret/g, "");
            let children = document.getElementById("row-" + x.position.row).children;
            if (children[x.position.col] !== null) {
                children[x.position.col].classList.add("editor-caret");
            }
            if (children[x.position.col] !== null && children[x.position.col].dataset.endOfLine !== undefined) {
                children[x.position.col].classList.add("end-of-line-caret");
            }
};

// TODO: this part is making grunt compile go locco... BELOW could it be the number of levels???

guiEasy.popper.rules.syntaxHighlightTemporary.checkTypeOfInput = function (what, start, end) {
    if (
        what === "up" ||
        what === "down" ||
        what === "left" ||
        what === "right" ||
        what === "tab" ||
        what === "home" ||
        what === "ctrl+home" ||
        what === "end" ||
        what === "ctrl+end"
    ) {
        // nothing
    } else {
        return what;
    }
    let rows;
    let colsInRow;
    let x = guiEasy.popper.rules.syntax.selectionElement;
    let y = guiEasy.popper.rules.syntax.editorElement;
    let e = document.getElementById("rules-editor-selection").childElementCount;
    let r = document.getElementById("row-" + x.position.row).childElementCount;

    if (e === null || r === null) {
        let p = setInterval(function () {
            if (e !== null || r !== null) {
                clearInterval(p);
                rows = e - 1;
                colsInRow = r - 1;
            }
        }, 10)
    } else {
        rows = e - 1;
        colsInRow = r- 1;
    }

    let colsInRowAbove = document.getElementById("row-" + (x.position.row - 1));
    if (colsInRowAbove !== null) {
        colsInRowAbove = colsInRowAbove.childElementCount - 1;
    } else {
        colsInRowAbove = -1;
    }
    let colsInRowBelow = document.getElementById("row-" + (x.position.row + 1));
    if (colsInRowBelow !== null) {
        colsInRowBelow = colsInRowBelow.childElementCount - 1;
    } else {
        colsInRowBelow = -1;
    }

    if (what === "down") {
        if (rows > x.position.row) {
            x.position.row++;
            if (colsInRowBelow < x.position.col) {
                x.position.col = colsInRowBelow;
            }
        }
        return false;
    }
    if (what === "up") {
        if (x.position.row > 0) {
            x.position.row--;
            if (colsInRowAbove < x.position.col) {
                x.position.col = colsInRowAbove;
            }
        }
        return false;
    }
    if (what === "left") {
        if (x.position.col > 0) {
            x.position.col--;
        } else {
            if (x.position.row > 0) {
                x.position.row--;
                x.position.col = colsInRowAbove;
            }
        }
        return false;
    }
    if (what === "right") {
        if (x.position.col < colsInRow) {
            x.position.col++;
        } else {
            if (rows > x.position.row) {
                x.position.row++;
                x.position.col = 0;
            }
        }
        return false;
    }
    if (what === "tab") {
        //if its a TAB add 3 spaces
        y.value = y.value.substring(0, start) + "\x20\x20\x20" + y.value.substring(end);
        y.selectionStart = start + 3;
        y.selectionEnd = start + 3;
        return ["&nbsp;", "&nbsp;", "&nbsp;"];
    }
    if (what === "home") {
        x.position.col = 0;
        return false;
    }
    if (what === "ctrl+home") {
        x.position.col = 0;
        x.position.row = 0;
        return false;
    }
    if (what === "end") {
        x.position.col = colsInRow;
        return false;
    }
    if (what === "ctrl+end") {
        x.position.col = document.getElementById("row-" + rows).childElementCount - 1;
        x.position.row = rows;
        return false;
    }
};

guiEasy.popper.rules.syntaxHighlightTemporary.addCharacter = function(char, row, col) {
    if (!Array.isArray(char)) {
        if (char === " ") {
            char = "&nbsp;";
        }
        char = [char];
    }
    for (let i = 0; i < char.length; i++) {
        let selectElement = document.createElement("div");
        let charElement = document.createElement("div");
        let syntaxElement = document.createElement("div");
        selectElement.innerHTML = "&nbsp;";
        charElement.innerHTML = char[i];
        charElement.classList.add("input-temp");
        syntaxElement.innerHTML = "&nbsp;";
        let rowSelectElement = document.getElementById("row-" + row);
        let rowInputElement = document.getElementById("input-row-" + row);
        let rowSyntaxElement = document.getElementById("syntax-row-" + row);
        if (rowInputElement === null || rowSelectElement === null) {
            let p = setInterval(function () {
                if (document.getElementById("input-row-" + row) !== null) {
                    clearInterval(p);
                    rowSelectElement = document.getElementById("row-" + row);
                    rowInputElement = document.getElementById("input-row-" + row);
                    rowSyntaxElement = document.getElementById("syntax-row-" + row);
                }
            }, 10);
        }
        let pos = col - 1 + i;
        let siblingSelect = rowSelectElement.children[pos];
        let siblingInput = rowInputElement.children[pos];
        let siblingSyntax = rowSyntaxElement.children[pos];
        if (siblingSelect === undefined) {
            rowSelectElement.appendChild(selectElement);
            rowInputElement.appendChild(charElement);
            rowSyntaxElement.appendChild(syntaxElement);
        } else {
            rowSelectElement.insertBefore(selectElement, siblingSelect);
            rowInputElement.insertBefore(charElement, siblingInput);
            rowSyntaxElement.insertBefore(syntaxElement, siblingSyntax);
        }
    }
    let p = guiEasy.popper.rules.syntax.selectionElement.position;
    p.col = p.col + char.length - 1;  //we do this to not have the input glitch, x.position.col++; is adding this before running this function
};

guiEasy.popper.rules.focus = function (event) {
    let x = guiEasy.popper.rules.syntax.selectionElement;
    if (event.type === "blur") {
        x.classList.add("no-focus");
    } else {
        x.classList.remove("no-focus");
    }
};

guiEasy.popper.rules.selection = function () {
    let x = guiEasy.popper.rules.syntax.selectionElement;
    let y = guiEasy.popper.rules.syntax.editorElement;
    x.innerHTML = (x.innerHTML).replace(/editor-caret/g, "");
    x.innerHTML = (x.innerHTML).replace(/end-of-line-caret/g, "");
    let caretElement = document.getElementById("select-" + y.selectionStart);
    if (y.selectionEnd - y.selectionStart === 0) {
        if (caretElement !== null) {
            caretElement.classList.add("editor-caret");
            x.position.col = Array.from(caretElement.parentNode.children).indexOf(caretElement);
        }
        if (caretElement !== null && caretElement.dataset.endOfLine !== undefined) {
            caretElement.classList.add("end-of-line-caret");
            x.position.col = caretElement.parentElement.childElementCount - 1;
        }
    }
    if (caretElement !== null) {
        x.position.row = parseInt((caretElement.parentElement.id).replace("row-", ""));
    }
};

guiEasy.popper.rules.input.specialKeys = function (event) {
    let x = guiEasy.popper.rules;
    let start = x.syntax.editorElement.selectionStart;
    let end = x.syntax.editorElement.selectionEnd;
    if (event.type === "keydown") {
        if (event.code === "Tab") {
            event.preventDefault();
            return;
        }
        if (event.code === "Home") {
            if (event.ctrlKey === false) {
                x.syntaxHighlightTemporary("home", start, end);
            } else {
                x.syntaxHighlightTemporary("ctrl+home", start, end);
            }
            return;
        }
        if (event.code === "End") {
            if (event.ctrlKey === false) {
                x.syntaxHighlightTemporary("end", start, end);
            } else {
                x.syntaxHighlightTemporary("ctrl+end", start, end);
            }
            return;
        }
        let test = (event.code).toLowerCase().indexOf("arrow");
        if (test === 0) {
            let what = (event.code).toLowerCase().replace("arrow", "");
            x.syntaxHighlightTemporary(what, start, end);
        }
    }
    if (event.type === "keyup") {
        //console.log(event.code);
        if (event.code === "Tab" ) {
            x.syntaxHighlightTemporary("tab", start, end);
        }
    }
};

guiEasy.popper.rules.sizeOfFile = function () {
    let x = guiEasy.popper.rules.syntax;
    let maxSizeOfFile = 2048;
    let currentSizeOfFile = x.editorElement.value.length;
    x.filesizeElement.innerHTML = currentSizeOfFile + "/" + maxSizeOfFile;
    if (currentSizeOfFile > maxSizeOfFile) {
        x.filesizeElement.classList.remove("text-tiny");
        x.filesizeElement.classList.add("text-huge");
        x.filesizeElement.classList.add("text-main-warning");
        x.filesizeElement.classList.add("too-big");
        x.backgroundElement.classList.add("too-big");
    } else {
        x.filesizeElement.classList.add("text-tiny");
        x.filesizeElement.classList.remove("text-huge");
        x.filesizeElement.classList.remove("text-main-warning");
        x.filesizeElement.classList.remove("too-big");
        x.backgroundElement.classList.remove("too-big");
    }
};

guiEasy.popper.rules.handleScroll = function () {
    let isSyncingEditorScroll = false;
    let isSyncingSyntaxScroll = false;
    let x = guiEasy.popper.rules.syntax;
    let elements = [
      "syntax",
      "input",
      "selection"
    ];
    x.editorElement.onscroll = function() {
            if (!isSyncingEditorScroll) {
                isSyncingSyntaxScroll = true;
                let l = elements.length;
                for (let i = 0; i < l; i++) {
                    let element = x[elements[i] + "Element"];
                    element.scrollTop = this.scrollTop;
                    element.scrollLeft = this.scrollLeft;
                }
            }
            isSyncingEditorScroll = false;
        };
};

guiEasy.popper.rules.syntaxHighlightAll = function(editor, syntax) {
    let x = guiEasy.popper.rules;
    editor.value = editor.value.replace(/\t/g, '   ');  //replace all tabs with 3 spaces...
    let syntaxArray = editor.value.split("");
    let selectionStart = editor.selectionStart;
    let selectionEnd = editor.selectionEnd;
    let selectionLength = selectionEnd - selectionStart;
    let p = -1;
    let s = -1;
    let currentRow = 0;
    let syntaxHighlight = "<div class='syntax-row' id='syntax-row-" + currentRow + "'>";
    let syntaxSelection = "<div class='syntax-row' id='row-" + currentRow + "'>";
    let syntaxInput = "<div class='syntax-row' id='input-row-" + currentRow + "'>";
    let l = syntaxArray.length;
    for (let i = 0; i < l; i++) {
        //p++; //Did not work with minify (grunt)...
        p = p + 1;
        let selectionSyntax = "";
        if (selectionLength === 0 && s === selectionStart) {
            selectionSyntax += "editor-caret";
        }
        let char = x.syntaxHighlightAll.fixSpecialChars(syntaxArray[i]);
        if (char === "NEW_ROW") {
            currentRow++;
            syntaxHighlight += "&zwnj;</div><div class='syntax-row' id='syntax-row-" + currentRow + "'>";
            syntaxSelection += `<div class='` + selectionSyntax + `' id='select-` + p + `' data-end-of-line></div>
                                &zwnj;</div>
                                <div class='syntax-row' id='row-` + currentRow + `'>
                                `;
            syntaxInput += "&zwnj;</div><div class='syntax-row' id='input-row-" + currentRow + "'>";
        } else {
            s = s + 1;
            syntaxHighlight += "<div class='syntax-element {{TYPE_OF_SYNTAX_" + s + "}}' id='hightlight-" + s + "'>" + char + "</div>";
            syntaxSelection += "<div class='" + selectionSyntax + "' id='select-" + p + "'>&nbsp;</div>";
            syntaxInput += "<div id='input-" + s + "'>&nbsp;</div>";
        }
    }
    p = p + 1;
    let selectionSyntax = "";
    if (selectionLength === 0 && p === selectionStart) {
        selectionSyntax += "end-of-line-caret editor-caret";
    }
    syntaxHighlight += "</div>&zwnj;";
    syntaxSelection += "<div class='" + selectionSyntax + "' id='select-" + p + "' data-end-of-line></div>&zwnj;";
    syntaxInput += "</div>&zwnj;";
    x.syntax.syntaxElement.innerHTML = x.syntaxHighlightAll.regEx(syntaxHighlight, syntaxArray);
    x.syntax.selectionElement.innerHTML = syntaxSelection;
    x.syntax.inputElement.innerHTML =  syntaxInput;
    x.sizeOfFile();
};

guiEasy.popper.rules.syntaxHighlightAll.regEx = function(syntaxHighlight, rawTextArray) {
    //TODO: redo the whole parser, use RegEx all the way?
    let matrixRow = [];
    let matrixFull = [];
    let x = guiEasy.popper.rules.syntaxHighlightAll;
    let l = rawTextArray.length;
    for (let i = 0; i < l; i++) {
        if (rawTextArray[i] === "\n") {
            matrixFull.push(matrixRow);
            matrixRow = [];
        } else {
            matrixRow.push(rawTextArray[i]);
        }
    }
    if (matrixRow.length > 0) {
        matrixFull.push(matrixRow);
    }
    //console.log(matrixFull);
    return x.fixSyntaxMatrix(matrixFull, syntaxHighlight);
};

guiEasy.popper.rules.syntaxHighlightAll.fixSyntaxMatrix = function(matrixFull, syntaxHighlight) {
    let z = guiEasy.popper.rules.syntaxHighlightAll;
    let checkSyntax = guiEasy.popper.rules.syntax.hightlight;
    let s = -1;
    let syntaxTemp = [];
    let l = matrixFull.length;
    for (let i = 0; i < l; i++) {
        let tempI = matrixFull[i];
        for (let k = 0; k < tempI.length; k++) {
            s++;
            syntaxTemp.push();
            let tempK = tempI[k].toLowerCase();
            syntaxTemp[s] = "";
            if (tempK === " " || tempK === "\xa0" || tempK === "\x20") {
                syntaxTemp[s] = "syntax-is-space";
            }
            if (tempK === ",") {
                syntaxTemp[s] = "syntax-is-comma";
            }
            if (tempK * 0 === 0 || tempK === ".") {
                syntaxTemp[s] = "syntax-is-number";
            }
            if (checkSyntax[tempK] !== undefined) {
                let value = z.parseRow(tempI, k, checkSyntax);
                if (value.found === false) {
                    continue;
                }
                syntaxTemp[s] = value.type;
                if (value.elements > 0) {
                    for (let p = 0; p < value.elements; p++) {
                        s++;
                        syntaxTemp.push();
                        syntaxTemp[s] = value.type;
                    }
                }
                k = value.k;
            }
        }
    }
    l = syntaxTemp.length;
    for (let i = 0; i < l; i++) {
        syntaxHighlight = syntaxHighlight.replace("{{TYPE_OF_SYNTAX_" + i + "}}", syntaxTemp[i]);
    }
    return syntaxHighlight;
};

guiEasy.popper.rules.syntaxHighlightAll.parseRow = function(rowChar, k, checkSyntax) {
    let foundSyntax = null;
    let type = null;
    let s = 0;
    let nextK = k;
    let testString = checkSyntax;
    let l = rowChar.length;
    for (let i = k; i < l; i++) {
        if (foundSyntax !== null) {
            continue;  //THIS MEANS WE GOT A MATCH AND WILL LOOK BEHIND + BEFORE THIS ONE
        }
        s++;
        let tempChar = rowChar[i].toLowerCase();
        if (tempChar === " ") {
            foundSyntax = false;
        }
        if (testString[tempChar] !== undefined) {
            testString = testString[tempChar];
            if (testString.full !== undefined) {
                let checkLeft = rowChar[(i - testString.elementsPriorToHighlight - 1)];
                let checkLeftNum = parseFloat(checkLeft);
                let checkRight = rowChar[(i + 1)];
                let checkRightNum = parseFloat(checkRight);

                if (testString.type === "comment") {
                    type = "syntax-is-" + testString.type;
                    foundSyntax = true;
                    nextK = rowChar.length;
                    s = rowChar.length - i;
                }

                if (testString.type === "logic") {
                    if (
                        (
                            !isNaN(checkLeftNum) ||
                            checkLeft === " " ||
                            checkLeft === "]"
                        ) && (
                            checkRight === " " ||
                            !isNaN(checkRightNum)
                        )
                    ) {
                        type = "syntax-is-" + testString.type;
                        foundSyntax = true;
                        nextK = i;
                        s = testString.elementsPriorToHighlight;
                    }
                }

                if (testString.type === "arithmetic") {
                    if (
                        (
                            !isNaN(checkLeftNum) ||
                            checkLeft === " " ||
                            checkLeft === "]" ||
                            checkLeft === ")"
                        ) && (
                            !isNaN(checkRightNum) ||
                            checkRight === " " ||
                            checkRight === "[" ||
                            checkRight === "("
                        )
                    ) {
                        type = "syntax-is-" + testString.type;
                        foundSyntax = true;
                        nextK = i;
                        s = testString.elementsPriorToHighlight;
                    }
                }

                if (testString.type === "event") {
                    if ( checkRight === " " || !isNaN(checkRightNum) ) {
                        type = "syntax-is-" + testString.type;
                        foundSyntax = true;
                        nextK = i;
                        s = testString.elementsPriorToHighlight;
                    }
                }

                if (
                    testString.type === "command" ||
                    testString.type === "block" ||
                    testString.type === "statement"
                ) {
                    if ( (
                        checkLeft === " " ||
                        checkLeft === undefined
                    ) && (
                        checkRight === " " ||
                        checkRight === "," ||
                        checkRight === undefined
                    )
                    ) {
                        type = "syntax-is-" + testString.type;
                        foundSyntax = true;
                        nextK = i;
                        s = testString.elementsPriorToHighlight;
                    }
                }

                if (testString.type === "parentheses") {
                    type = "syntax-is-" + testString.type;
                    foundSyntax = true;
                    nextK = i;
                    s = testString.elementsPriorToHighlight;
                }

                if (testString.type === "variable") {
                    if (
                        !isNaN(checkRightNum)
                    ) {
                        type = "syntax-is-" + testString.type;
                        foundSyntax = true;
                        nextK = i;
                        s = testString.elementsPriorToHighlight;
                    }
                }

                if (
                    testString.type === "transformer-binary" ||
                    testString.type === "transformer-floatingPoint" ||
                    testString.type === "transformer-justification"
                ) {
                        type = "syntax-is-" + testString.type.split("-")[0];
                        foundSyntax = true;
                        nextK = i;
                        s = testString.elementsPriorToHighlight;
                }
            }
        }
    }
    if (type === null) {
        return {
            "found": false,
            "k": k,
            "elements": 0,
            "type": null
        };
    } else {
        return {
            "found": foundSyntax,
            "k": nextK,
            "elements": s,
            "type": type
        };
    }
};

guiEasy.popper.rules.syntaxHighlightAll.fixSpecialChars = function(char) {
    //console.log(char.charCodeAt(0));
    if (char.charCodeAt(0) === 10) {
        char = "NEW_ROW";
    }
    if (char.charCodeAt(0) === 32) {
        char = "&nbsp;";
    }
    return char;
};