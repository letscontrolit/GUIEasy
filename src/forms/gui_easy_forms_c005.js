/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */

guiEasy.forms.controller.C005 = {};
guiEasy.forms.controller.C005.name = "Home Assistant (openHAB)";
guiEasy.forms.controller.C005.category = "mqtt";
guiEasy.forms.controller.C005.state = "normal"; //normal, testing, development
//------------------------------- HTML or CURLY -------------------------------//
guiEasy.forms.controller.C005.html = `
{{TOGGLE--NONE--C005-1--use ip address for controller|use host name for controller}}
<div id="C005-1-IP">
{{IP--extra-ip--C005-2-2--controller ip}}
{{NUMBER--extra-port--C005-2-3--controller port}}
</div>
<div id="C005-1-HOST">
{{STRING--settings-ip--C005-3-2--controller ip}}
{{NUMBER--settings-port--C005-3-3--controller port}}
</div>
`;  //--------------------------- HTML or CURLY -------------------------------//

