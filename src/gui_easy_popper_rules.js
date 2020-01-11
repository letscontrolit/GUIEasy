/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */
guiEasy.popper.rules = function(){
    let x = guiEasy.popper.rules;
    x.splitSyntax();
    let editor = document.getElementById("rules-editor");
    if (editor === null) {
        return;
    }
    let syntax = document.getElementById("rules-editor-syntax");
    let input = document.getElementById("rules-editor-input");
    let selection = document.getElementById("rules-editor-selection");
    let background = document.getElementById("rules-editor-background");
    guiEasy.popper.rules.syntax.editorElement = editor;
    guiEasy.popper.rules.syntax.syntaxElement = syntax;
    guiEasy.popper.rules.syntax.inputElement = input;
    guiEasy.popper.rules.syntax.selectionElement = selection;
    guiEasy.popper.rules.syntax.backgroundElement = background;
    editor.addEventListener("input", x.input, false);
    editor.addEventListener("keyup", x.input.tab, false);
    editor.addEventListener("keydown", x.input.tab, false);
    editor.addEventListener("select", x.selection, false);
    editor.addEventListener("click", x.selection, false);
    editor.addEventListener("blur", x.focus, false);
    editor.addEventListener("focus", x.focus, false);
    x.handleScroll();
    x.input();
    selection.classList.add("no-focus");
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
        ['(']
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
        ['[INT#']
    ],
        'transformer': {
        'binary':
        [
            ']',
            '#C]',
            '#C!]',
            '#H]',
            '#H!]',
            '#I]',
            '#I!]',
            '#M]',
            '#M!]',
            '#m]',
            '#m!]',
            '#O]',
            '#O!]',
            '#U]',
            '#U!]',
            '#u]',
            '#u!]',
            '#V]',
            '#X]',
            '#X!]',
            '#Y]',
            '#Y!]',
            '#y]',
            '#y!]',
            '#Z]',
            '#Z!]'
        ],
            'floatingPoint':
        [
            '#D000.000]',
            '#D000]',
            '#D.000]',
            '#F]',
            '#E]'
        ],
            'justification':
        [
            '#P000]',
            '#S000]',
            '#L000]',
            '#R000]',
            '#U000.000]'
        ]
    }
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
        'variable'
    ];
    for (let i = 0; i < listOfTypes.length; i++) {
        let tempI = x[listOfTypes[i]];
        for (let k = 0; k < tempI.length; k++) {
            let tempK = tempI[k];
            let tempSplit = tempK[0].split("");
            let y = syntaxArray;
            for (let s = 0; s < tempSplit.length; s++) {
                let z = tempSplit[s].toLowerCase();
                if (y[z] === undefined) {
                    y[z] = {};
                }
                if (s !== (tempSplit.length - 1)) {
                    //
                } else {
                    y[z].type = listOfTypes[i];
                    y[z].full = tempK;
                    y[z].elementsPriorToHighlight = s;
                }
                y = y[z];
            }
        }
    }
    guiEasy.popper.rules.syntax.hightlight = syntaxArray;
    //console.log(guiEasy.syntax);
};

guiEasy.popper.rules.input = function () {
    let x = guiEasy.popper.rules.syntax;
    guiEasy.popper.rules.input.highlight(x.editorElement, x.syntaxElement);
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
    //TODO: add delay for the highlighting and only add "uncolored" character blocks to tht div... wait 1-2 seconds with no new input to start highlighting
    let x = guiEasy.popper.rules.syntax.selectionElement;
    let y = guiEasy.popper.rules.syntax.editorElement;
    x.innerHTML = (x.innerHTML).replace(/editor-caret/g, "");
    x.innerHTML = (x.innerHTML).replace(/end-of-line-caret/g, "");
    if (y.selectionEnd - y.selectionStart === 0) {
        let caretElement = document.getElementById("select-" + y.selectionStart);
        if (caretElement !== null) {
            caretElement.classList.add("editor-caret");
        }
        if (caretElement.dataset.endOfLine !== undefined) {
            caretElement.classList.add("end-of-line-caret");
        }
    }
};

guiEasy.popper.rules.input.highlight = function (editorElement, syntaxElmeent) {
    guiEasy.popper.rules.syntaxHighlight(editorElement, syntaxElmeent);
};

guiEasy.popper.rules.input.tab = function (event) {
    let x = guiEasy.popper.rules;
    if (event.type === "keydown") {
        //console.log(event.code);
        if (event.code === "Tab") {
            event.preventDefault();
        }
    }
    if (event.type === "keyup") {
        //console.log(event.code);
        if (event.code === "Tab" ) {
            let editor = x.syntax.editorElement;
            let selectionStart = editor.selectionStart;
            //if its a TAB add 3 spaces
            editor.value = editor.value.substring(0, editor.selectionStart) + "\x20\x20\x20" + editor.value.substring(editor.selectionEnd);
            editor.selectionStart = selectionStart + 3;
            editor.selectionEnd = selectionStart + 3;
            x.input();
        } else {
            x.input();
            x.selection();
        }
    }
};

guiEasy.popper.rules.sizeOfFile = function () {
    //max size/char's 2048
    let editor = guiEasy.popper.rules.syntax.editorElement;
    console.log(editor.value.length);
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
                for (let i = 0; i < elements.length; i++) {
                    let element = x[elements[i] + "Element"];
                    element.scrollTop = this.scrollTop;
                    element.scrollLeft = this.scrollLeft;
                }
            }
            isSyncingEditorScroll = false;
        };
};

guiEasy.popper.rules.syntaxHighlight = function(editor, syntax) {
    let x = guiEasy.popper.rules;
    let syntaxArray = editor.value.split("");
    let selectionStart = editor.selectionStart;
    let selectionEnd = editor.selectionEnd;
    let selectionLength = selectionEnd - selectionStart;
    let p = -1;
    let s = -1;
    let currentRow = 0;
    let syntaxHighlight = "<div class='syntax-row' name='row-" + currentRow + "' data-row-number='1'>";
    let syntaxSelection = "<div class='syntax-row' name='row-" + currentRow + "' data-row-number='1'>";
    let syntaxInput = "<div class='syntax-row' name='row-" + currentRow + "' data-row-number='1'>";
    for (let i = 0; i < syntaxArray.length; i++) {
        //p++; //Did not work with minify (grunt)...
        p = p + 1;
        let selectionSyntax = "";
        if (selectionLength === 0 && s === selectionStart) {
            selectionSyntax += "editor-caret";
        }
        let char = x.syntaxHighlight.fixSpecialChars(syntaxArray[i]);
        if (char === "NEW_ROW") {
            currentRow++;
            syntaxHighlight += "&zwnj;</div><div class='syntax-row' name='row-" + currentRow + "' data-row-number='" + (currentRow + 1) + "'>";
            syntaxSelection += `<div class='` + selectionSyntax + `' id='select-` + p + `' data-end-of-line></div>
                                &zwnj;</div>
                                <div class='syntax-row' name='row-` + currentRow + `' data-row-number='` + (currentRow + 1) + `'>
                                `;
            syntaxInput += "&zwnj;</div><div class='syntax-row' name='row-" + currentRow + "' data-row-number='" + (currentRow + 1) + "'>";
        } else {
            s = s + 1;
            syntaxHighlight += "<div class='syntax-element {{TYPE_OF_SYNTAX_" + s + "}}' id='hightlight-" + s + "'>" + char + "</div>";
            syntaxSelection += "<div class='" + selectionSyntax + "' id='select-" + p + "'>" + char + "</div>";
            syntaxInput += "<div id='input-" + s + "'>" + char + "</div>";
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
    x.syntax.syntaxElement.innerHTML = x.syntaxHighlight.regEx(syntaxHighlight, syntaxArray);
    x.syntax.selectionElement.innerHTML = syntaxSelection;
    x.syntax.inputElement.innerHTML = syntaxInput;
    x.sizeOfFile();
};

guiEasy.popper.rules.syntaxHighlight.regEx = function(syntaxHighlight, rawTextArray) {
    let matrixRow = [];
    let matrixFull = [];
    let x = guiEasy.popper.rules.syntaxHighlight;
    for (let i = 0; i < rawTextArray.length; i++) {
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

guiEasy.popper.rules.syntaxHighlight.fixSyntaxMatrix = function(matrixFull, syntaxHighlight) {
    let z = guiEasy.popper.rules.syntaxHighlight;
    let checkSyntax = guiEasy.popper.rules.syntax.hightlight;
    let s = -1;
    let syntaxTemp = [];
    for (let i = 0; i < matrixFull.length; i++) {
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
    for (let i = 0; i < syntaxTemp.length; i++) {
        syntaxHighlight = syntaxHighlight.replace("{{TYPE_OF_SYNTAX_" + i + "}}", syntaxTemp[i]);
    }
    return syntaxHighlight;
};

guiEasy.popper.rules.syntaxHighlight.parseRow = function(rowChar, k, checkSyntax) {
    let foundSyntax = null;
    let type = null;
    let s = 0;
    let nextK = k;
    let testString = checkSyntax;
    for (let i = k; i < rowChar.length; i++) {
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
                //console.log(checkLeftNum, checkRightNum);

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
                    if (
                        !isNaN(checkRightNum) ||
                        checkRight === " " ||
                        checkRight === "/" ||
                        checkRight === "*" ||
                        checkRight === "+" ||
                        checkRight === "-" ||
                        checkRight === undefined
                    ) {
                        type = "syntax-is-" + testString.type;
                        foundSyntax = true;
                        nextK = i;
                        s = testString.elementsPriorToHighlight;
                    }
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

                if (testString.type === "transformer" ) {
                    if (
                        !isNaN(checkRightNum)
                    ) {
                        type = "syntax-is-" + testString.type;
                        foundSyntax = true;
                        nextK = i;
                        s = testString.elementsPriorToHighlight;
                    }
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

guiEasy.popper.rules.syntaxHighlight.fixSpecialChars = function(char) {
    //console.log(char.charCodeAt(0));
    if (char.charCodeAt(0) === 10) {
        char = "NEW_ROW";
    }
    if (char.charCodeAt(0) === 32) {
        char = "&nbsp;";
    }
    return char;
};