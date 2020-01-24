/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */

guiEasy.forms.controller.C005 = {};
guiEasy.forms.controller.C005.name = "Home Assistant (openHAB)";
guiEasy.forms.controller.C005.category = "mqtt";
guiEasy.forms.controller.C005.state = "normal"; //normal, testing, development
//------------------------------- HTML or CURLY -------------------------------//
guiEasy.forms.controller.C005.html = `
{{IPorHOST--IP--C005-1--ip or hostname}}
{{IPorHOST--PORT--C005-2--C005-1--controller port}}
<div id="c005-1-HOST" class="is-hidden">
{{STRING--settings-hostname--C005-1-HOST--controller hostname}}
{{NUMBER--settings-port--C005-2-HOST--controller port--0}}
</div>
<div id="c005-1-IP" class="is-hidden">
{{STRING--extra-ip--C005-1-IP--controller ip}}
{{NUMBER--extra-port--C005-2-IP--controller port--0}}
</div>
`;  //--------------------------- HTML or CURLY -------------------------------//

