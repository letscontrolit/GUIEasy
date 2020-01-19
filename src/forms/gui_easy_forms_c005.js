/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */

guiEasy.forms.controller.C005 = {};
guiEasy.forms.controller.C005.name = "Home Assistant (openHAB)";
guiEasy.forms.controller.C005.category = "mqtt";
guiEasy.forms.controller.C005.state = "normal"; //normal, testing, development
//------------------------------- HTML or CURLY -------------------------------//
guiEasy.forms.controller.C005.html = `
{{IPorHOST--C005-1}}
<div id="C005-1-HOST" class="is-hidden">
{{STRING--settings-ip--C005-2--controller ip}}
{{NUMBER--settings-port--C005-3--controller port}}
</div>
<div id="C005-1-IP" class="is-hidden">
{{IP--extra-ip--C005-2--controller ip}}
{{NUMBER--extra-port--C005-3--controller port}}
</div>
`;  //--------------------------- HTML or CURLY -------------------------------//

