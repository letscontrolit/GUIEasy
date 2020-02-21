/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */

guiEasy.forms.controller.C005 = {};
guiEasy.forms.controller.C005.name = "home assistant (openhab)";
guiEasy.forms.controller.C005.category = "mqtt";
guiEasy.forms.controller.C005.state = "normal"; //normal, testing, development
//------------------------------- HTML or CURLY -------------------------------//
guiEasy.forms.controller.C005.html = `
{{IPorHOST--IP--C005-1--ip or hostname}}
{{IPorHOST--PORT--C005-2--C005-1--controller port}}
<hr>
{{IPorHOST--INTERVAL--C005-3--C005-1--minimum send interval}}
{{IPorHOST--QUE--C005-4--C005-1--max in que}}
{{IPorHOST--TRIES--C005-5--C005-1--max send tries}}
{{IPorHOST--QUE_ACTION--C005-6--C005-1--if full que, ignore new|if full que, delete oldest}}
{{IPorHOST--ACKNOWLEDGE--C005-7--C005-1--wait for ok when send|send and forget}}
<div id="c005-1-HOST" class="is-hidden">
{{STRING--settings-hostname--C005-1-HOST--controller hostname}}
{{NUMBER--settings-port--C005-2-HOST--controller port--0}}
{{NUMBER--settings-X--C005-3-HOST--minimum send interval--100}}
{{NUMBER--settings-X--C005-4-HOST--max in que--10}}
{{NUMBER--settings-X--C005-5-HOST--max send tries--10}}
{{TOGGLE--settings-X--C005-6-HOST--if full que, ignore new|if full que, delete oldest}}
{{TOGGLE--settings-X--C005-7-HOST--wait for ok when send|send and forget}}
</div>
<div id="c005-1-IP" class="is-hidden">
{{STRING--extra-ip--C005-1-IP--controller ip}}
{{NUMBER--extra-port--C005-2-IP--controller port--0}}
{{NUMBER--extra-X--C005-3-IP--minimum send interval--100}}
{{NUMBER--extra-X--C005-4-IP--max in que--10}}
{{NUMBER--extra-X--C005-5-IP--max send tries--10}}
{{TOGGLE--extra-X--C005-6-IP--if full que, ignore new|if full que, delete oldest}}
{{TOGGLE--extra-X--C005-7-IP--wait for ok when send|send and forget}}
</div>
`;  //--------------------------- HTML or CURLY -------------------------------//

