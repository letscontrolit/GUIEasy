/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */

guiEasy.forms.controller.C005 = {};
guiEasy.forms.controller.C005.name = "Home Assistant (openHAB)";
guiEasy.forms.controller.C005.category = "mqtt";
guiEasy.forms.controller.C005.state = "normal"; //normal, testing, development
//------------------------------- HTML or CURLY -------------------------------//
guiEasy.forms.controller.C005.html = `
{{TOGGLE--NONE--C005-1--use ip address for controller|use host name for controller}}
<script defer>
let ifIP;
ifIP += "{{IP--extra-ip--C005-2--controller ip}}";
ifIP += "{{NUMBER--extra-port--C005-3--controller port}}";
let ifHost;
ifHost += "{{STRING--settings-ip--C005-2--controller ip}}";
ifHost += "{{NUMBER--settings-port--C005-3--controller port}}";
</script>
`;  //--------------------------- HTML or CURLY -------------------------------//

