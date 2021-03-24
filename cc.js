const Groups = ["A", "B", "C"];
const Actions = ["Convert to renewable energy",
                 "Impose carbon taxes in your region",
                 "Subsidize electric vehicles",
                 "Subsidize public transit",
                 "Subsidize improved insulation in housing to reduce heating and cooling energy",
                 "Stop deforestation",
                 "Start reforestation (must happen before 2060)",
                 "Implement new agricultural technologies to decrease emissions",
                 "Develop carbon sequestration technologies",
                 "Develop waste reduction programs"];

const BonusActions = ["Contribute to international climate budget",
                      "Receive money from international climate budget"];

const Costs_A = [-4, 4, -0.1, -0.5, -4, -0.1, -2, -4, -6, -2];
const Costs_B = [-3, 6, -0.1, -0.5, -2, -2, -1, -3, -6, -2];
const COSTS_C = [-1.5, 2, -0.1, -0.5, -2, -1, -0.25, -1.5, -6, -1];

const Effects_A = [-0.1, -0.1, -0.1, -0.1, -0.2, -0.1, -0.1, -0.1, -0.2, -0.1];
const Effects_B = [-0.2, -0.2, -0.1, -0.1, -0.1, -0.2, -0.3, -0.2, -0.2, -0.1];
const Effects_C = [-0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.2, -0.1, -0.2, -0.1];

var Budget_A = 10;
var Budget_B = 6;
var Budget_C = 1;

var International = 0;

var TempChange = 0.6;

var data = {
  years: [2020, 2040, 2060, 2080, 2100],
  defaultTemps: [1.2, 1.8, 2.4, 3.0, 3.6],
  pltYears: [2020],
  pltTemps: [1.2],
  figure: document.getElementById('figure'),
  currentYear: 2020,
  currentCountry: "A",
  selectedAction: ""
};

var groupActions = {
  a: Actions,
  b: Actions,
  c: Actions
};

function plotData() {
  Plotly.react(figure, [{
    x: data.pltYears,
    y: data.pltTemps,
  }],
    {
      title: { text: "Global Temperature Change" }, 
      xaxis: { title: "Year", tickmode: "linear", tick0: 2020, dtick: 20 },
      yaxis: { title: "Change in Temperature (C)" }, 
    });
};
plotData();

function startYear(input) {
  currentButton = document.getElementById(data.currentYear.toString());
  currentButton.classList.remove("active");

  nextButton = document.getElementById(input);
  nextButton.classList.add("active");
  data.currentYear = parseInt(input);
  
};

function makeActionPanel(input) {
  prevPanel = document.getElementById('actionChoice'.concat(data.currentCountry));
  prevPanel.classList.remove("active");
  prevPanel.classList.remove("show");
  prevPanel.setAttribute("aria-current", "false");

  data.currentCountry = input;  

  actionChoice = document.getElementById('actionChoice'.concat(input));
  actionChoice.classList.add("active");
  actionChoice.classList.add("show");
  actionChoice.setAttribute("aria-current", "true");
  actionList = document.getElementById('actionList'.concat(input));
  while (actionList.firstChild) {
    actionList.removeChild(actionList.firstChild);
  }
  
  var countryActions;
  if (input === "A") {
    countryActions = groupActions.a;
  }
  else if (input == "B") {
    countryActions = groupActions.b;
  }
  else if (input == "C") {
    countryActions = groupActions.c;
  }

  for (var i = 0; i < countryActions.length; i++) {
    var actionListDiv = document.createElement("div");
    actionListDiv.classList.add("form-check");

    var actionListInput = document.createElement("input");
    actionListInput.classList.add("form-check-input");
    actionListInput.setAttribute("type", "radio");
    actionListInput.setAttribute("name", "flexRadioDefault");
    actionListInput.setAttribute("id", "action".concat(i.toString()));
    actionListDiv.appendChild(actionListInput);

    var actionListLabel = document.createElement("label");
    actionListLabel.classList.add("form-check-label");
    actionListLabel.setAttribute("for", "action".concat(i.toString()));
    actionListLabel.innerHTML = Actions[i];
    actionListDiv.appendChild(actionListLabel);

    actionList.appendChild(actionListDiv);
    
  }
  actionList.style.display = "block";
};

function submitChoice(group) {
  var countryActions;
  if (input === "A") {
    countryActions = groupActions.a;
  }
  else if (input == "B") {
    countryActions = groupActions.b;
  }
  else if (input == "C") {
    countryActions = groupActions.c;
  }
  for (var i=0; i<; i++) {
    var actionListChild = actionListChildren[i];
    console.log(actionListChild);
    console.log(actionListChild.attributes);
  }
};
