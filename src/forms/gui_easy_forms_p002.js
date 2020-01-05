/* GUIEasy  Copyright (C) 2019-2020  Jimmy "Grovkillen" Westberg */
//syntax of curly... if you want to skip a setting set it to "
//TOGGLE--pathToSettings--uniqueID--label--true(1)Text|false(0)Text
//NUMBER--pathToSettings--uniqueID--label--defaultValue--minValue--maxValue--stepValue

guiEasy.forms.plugin.P002 = {};
guiEasy.forms.plugin.P002.name = "";
guiEasy.forms.plugin.P002.category = "";
guiEasy.forms.plugin.P002.state = "normal"; //normal, testing, development
//------------------------------- HTML or CURLY -------------------------------//
guiEasy.forms.plugin.P002.html = `
{{TOGGLE--configs-0--P002-1--oversampling is active|oversampling is disabled}}
<hr>
<div hidden id="task-_tasknumber_-y=kx+m">
    <svg
        id="task-_tasknumber_-y=kx+m-svg"
        viewbox="0 0 500 100"
        class="chart"
    >
      <g class="grid x-grid">
        <line
            x1="90"
            x2="90"
            y1="5"
            y2="371"
        ></line>
      </g>
      <g class="grid y-grid">
        <line
            x1="90"
            x2="705"
            y1="370"
            y2="370"
        ></line>
    </g>
    <g class="labels x-labels">
      <text x="100" y="400">2008</text>
      <text x="246" y="400">2009</text>
      <text x="392" y="400">2010</text>
      <text x="538" y="400">2011</text>
      <text x="684" y="400">2012</text>
      <text x="400" y="440" class="label-title">Year</text>
    </g>
    <g class="labels y-labels">
      <text x="80" y="15">15</text>
      <text x="80" y="131">10</text>
      <text x="80" y="248">5</text>
      <text x="80" y="373">0</text>
      <text x="50" y="200" class="label-title">Price</text>
    </g>
      <polyline
        id="task-_tasknumber_-y=kx+m-line"
         fill="none"
         stroke="#0074d9"
         stroke-width="3"
         points="
           0,120
           20,60
           40,80
           60,20
         "
      />
    <g class="data">
      <circle cx="90" cy="192" r="4"></circle>
      <circle cx="240" cy="141" r="4"></circle>
    </g>
</svg>
</div>
<script defer>
let task_tasknumber_toggle = document.getElementById("task-_tasknumber_-P002-2");
let task_tasknumber_input1 = document.getElementById("task-_tasknumber_-P002-3");
let task_tasknumber_input2 = document.getElementById("task-_tasknumber_-P002-4");
let task_tasknumber_input3 = document.getElementById("task-_tasknumber_-P002-5");
let task_tasknumber_input4 = document.getElementById("task-_tasknumber_-P002-6");
let task_tasknumber_graph = document.getElementById("task-_tasknumber_-y=kx+m");
task_tasknumber_toggle.addEventListener("change", function() {
  task_tasknumber_graph.hidden = task_tasknumber_toggle.checked;
})
function task_tasknumber_updateGraph() {
  task_tasknumber_graph = "..";
}
</script>
{{TOGGLE--configs-3--P002-2--calibration is active|calibration is disabled}}
{{NUMBER--configs_long-0--P002-3--point 1 (x)--0--0--1023--1}}
{{NUMBER--configs_float-0--P002-4--point 1 (y)--0}}
{{NUMBER--configs_long-1--P002-5--point 2 (x)--0--0--1023--1}}
{{NUMBER--configs_float-1--P002-6--point 2 (y)--0}}
`;  //--------------------------- HTML or CURLY -------------------------------//
