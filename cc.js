const Groups = ["A", "B", "C"];
var Actions = { 1: "Convert to renewable energy",
  2: "Impose carbon taxes in your region",
  3: "Subsidize electric vehicles",
  4: "Subsidize public transit",
  5: "Subsidize improved insulation in housing to reduce heating and cooling energy",
  6: "Stop deforestation",
  7: "Start reforestation (must happen before 2060)",
  8: "Implement new agricultural technologies to decrease emissions",
  9: "Develop carbon sequestration technologies",
  10: "Develop waste reduction programs"};

const BonusActions = ["Contribute to international climate budget",
  "Receive money from international climate budget"];

var Costs_A = {1:-4, 2:4, 3:-0.1, 4:-0.5, 5:-4, 6:-0.1, 7:-2, 8:-4, 9:-6, 10:-2};
var Costs_B = {1:-3, 2:6, 3:-0.1, 4:-0.5, 5:-2, 6:-2, 7:-1, 8:-3, 9:-6, 10:-2};
var Costs_C = {1:-1.5, 2:2, 3:-0.1, 4:-0.5, 5:-2, 6:-1, 7:-0.25, 8:-1.5, 9:-6, 10:-1};

var Effects_A = {1:-0.1, 2:-0.1, 3:-0.1, 4:-0.1, 5:-0.2, 6:-0.1, 7:-0.1, 8:-0.1, 9:-0.2, 10:-0.1};
var Effects_B = {1:-0.2, 2:-0.2, 3:-0.1, 4:-0.1, 5:-0.1, 6:-0.2, 7:-0.3, 8:-0.2, 9:-0.2, 10:-0.1};
var Effects_C = {1:-0.1, 2:-0.1, 3:-0.1, 4:-0.1, 5:-0.1, 6:-0.1, 7:-0.2, 8:-0.1, 9:-0.2, 10:-0.1};

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
  currentYear: 0,
  currentCountry: "A",
};

var groupActions = {
  a: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  b: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  c: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
};

function plotData() {
  Plotly.newPlot(data.figure, [{
    x: data.pltYears,
    y: data.pltTemps,
  }],
    {
      title: { text: "Global Temperature Change" }, 
      xaxis: { title: "Year", tickmode: "linear", tick0: 2020, dtick: 20, nticks:5 },
      yaxis: { title: "Change in Temperature (C)" }, 
    });
};

function hidePanels() {
  for(const group of ['A', 'B', 'C']) {
    const panel = document.getElementById('actionChoice'.concat(group));
    panel.classList.remove("active");
    panel.classList.remove("show");
    panel.setAttribute("aria-current", "false");
  }
}

function startYear() {
  plotData();
  TempChange = 0.6;
  const year = data.years[data.currentYear]
  if(data.currentYear > 0) {
    const lastYear = data.years[data.currentYear - 1]
    currentButton = document.getElementById(lastYear.toString());
    currentButton.classList.remove("active");
  }
  nextButton = document.getElementById(year);
  nextButton.classList.add("active");
  hidePanels();
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
  var countryEffects;
  var countryCosts;
  if (input === "A") {
    countryActions = groupActions.a;
    countryEffects = Effects_A
    countryCosts = Costs_A
  }
  else if (input == "B") {
    countryActions = groupActions.b;
    countryEffects = Effects_B
    countryCosts = Costs_B
  }
  else if (input == "C") {
    countryActions = groupActions.c;
    countryEffects = Effects_C
    countryCosts = Costs_C
  }

  for (var i = 0; i < countryActions.length; i++) {
    var actionListDiv = document.createElement("div");
    actionListDiv.classList.add("form-check");

    var actionListInput = document.createElement("input");
    actionListInput.classList.add("form-check-input");
    actionListInput.setAttribute("type", "radio");
    actionListInput.setAttribute("name", "flexRadioDefault");
    actionListInput.setAttribute("id", "action".concat(countryActions[i].toString()).concat(input));
    actionListDiv.appendChild(actionListInput);

    var actionListLabel = document.createElement("label");
    actionListLabel.classList.add("form-check-label");
    actionListLabel.setAttribute("for", "action".concat(countryActions[i].toString()));
    actionListLabel.innerHTML = `${Actions[countryActions[i]]}\t(Cost: \$${-1 * countryCosts[countryActions[i]]}T, Effect: ${countryEffects[countryActions[i]]} C)`;
    actionListDiv.appendChild(actionListLabel);
    actionList.appendChild(actionListDiv);
  }
  actionList.style.display = "block";
};

function updateBudget(group, val) {
  const budget = document.getElementById(`budget${group}`);
  budget.innerHTML = `\$${val.toString()}T`;
}

function submitChoice(group) {
  var contribute = document.getElementById("bonus".concat(group).concat("Give")).value;
  if (contribute !== "" && contribute != undefined) {
    if (group === "A") {
      Budget_A = Budget_A - Number(contribute);
    }
    else if (group === "B") {
      Budget_B = Budget_B - Number(contribute);
    }
    else if (group === "C") {
      Budget_C = Budget_C - Number(contribute);
    }
    International = International + Number(contribute);
  }

  var receive = document.getElementById("bonus".concat(group).concat("Get")).value;
  if (receive !== "" && receive != undefined) {
    if (group === "A") {
      Budget_A = Budget_A + Number(receive);
    }
    else if (group === "B") {
      Budget_B = Budget_B + Number(receive);
    }
    else if (group === "C") {
      Budget_C = Budget_C + Number(receive);
    }
    International = International - Number(receive);
  }

  var countryActions;
  var costs;
  var effects;
  if (group === "A") {
    countryActions = groupActions.a;
    costs = Costs_A;
    effects = Effects_A;
    budget = Budget_A;
  }
  else if (group == "B") {
    countryActions = groupActions.b;
    costs = Costs_B;
    effects = Effects_B;
    budget = Budget_B;
  }
  else if (group == "C") {
    countryActions = groupActions.c;
    costs = Costs_C;
    effects = Effects_C;
    budget = Budget_C;
  }

  for (var i=0; i<countryActions.length; i++) {
    var form = document.getElementById("action".concat(countryActions[i].toString()).concat(group));
    if (form.checked == true) {
      var actionCost = costs[countryActions[i]];
      var actionEffect = effects[countryActions[i]];
      budget = budget + actionCost;
      TempChange = TempChange + actionEffect;
      countryActions.splice(i, 1);
    }
  }
  if (group === "A") {
    groupActions.a = countryActions;
    Budget_A = budget;
  }
  else if (group == "B") {
    groupActions.b = countryActions;
    Budget_B = budget;
  }
  else if (group == "C") {
    groupActions.c = countryActions;
    Budget_C = budget;
  }

  updateBudget(group, budget);
  updateBudget('Int', International);
};

function submitTimepoint() {
  // Add to temperature array
  data.pltTemps.push(data.pltTemps[data.pltTemps.length - 1] + TempChange);

  // Track new "next year"
  data.currentYear++;
  data.pltYears.push(data.years[data.currentYear]);

  // Call startYear for next year
  startYear();
};
