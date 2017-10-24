var fs = require("fs");
var ballsRawData = fs.readFileSync("Ball_by_Ball.json");
var ballsData = JSON.parse(ballsRawData);
var matchRawData = fs.readFileSync("Match.json");
var matchData = JSON.parse(matchRawData);

var iplStats = {
  matchStats: {},
  ballsStats: {}
};

//calculation for match stats

//contains match stats
var matchStats = {
  totalMatches: 0,
  matchesWonOnToss: 0,

  tossDecision: [
    { name: "Field", value: 0, fill: "#8BC34A" },
    { name: "Bat", value: 0, fill: "#009688" }
  ],
  winType: [
    { name: "By Runs", value: 0, fill: "#673AB7" },
    { name: "By Wickets", value: 0, fill: "#4CAF50" },
    { name: "Tie", value: 0, fill: "#03A9F4" },
    { name: "No Result", value: 0, fill: "#EF5350" }
  ],
  resultType: [
    { name: "D/L Method", value: 0, fill: "#FF5252" },
    { name: "Normal Result", value: 0, fill: "#AA00FF" }
  ],
  winByRuns: [
    { name: "1-10", value: 0 },
    { name: "11-30", value: 0 },
    { name: "31-55", value: 0 },
    { name: "56-80", value: 0 },
    { name: "80-110", value: 0 },
    { name: "110+", value: 0 }
  ],

  seasonMatches: [
    { name: "1", value: 0 },
    { name: "2", value: 0 },
    { name: "3", value: 0 },
    { name: "4", value: 0 },
    { name: "5", value: 0 },
    { name: "6", value: 0 },
    { name: "7", value: 0 },
    { name: "8", value: 0 },
    { name: "9", value: 0 }
  ],

  hostCountries: [
    { name: "India", value: 0 },
    { name: "South Africa", value: 0 }
  ]
};

matchStats.totalMatches = matchData.length;

for (var i = 0; i < matchData.length; i++) {
  //Toss Decision data calculation
  if (matchData[i].Toss_Decision === "field")
    matchStats.tossDecision[0].value++;
  else matchStats.tossDecision[1].value++;

  //Win type and win by runs data calculation
  if (matchData[i].Win_Type === "by runs") {
    matchStats.winType[0].value++; //win type

    //win by runs calculation
    if (
      parseInt(matchData[i].Won_By, 10) >= 1 &&
      parseInt(matchData[i].Won_By, 10) <= 10
    )
      matchStats.winByRuns[0].value++;
    else if (
      parseInt(matchData[i].Won_By, 10) >= 11 &&
      parseInt(matchData[i].Won_By, 10) <= 30
    )
      matchStats.winByRuns[1].value++;
    else if (
      parseInt(matchData[i].Won_By, 10) >= 31 &&
      parseInt(matchData[i].Won_By, 10) <= 55
    )
      matchStats.winByRuns[2].value++;
    else if (
      parseInt(matchData[i].Won_By, 10) >= 56 &&
      parseInt(matchData[i].Won_By, 10) <= 80
    )
      matchStats.winByRuns[3].value++;
    else if (
      parseInt(matchData[i].Won_By, 10) >= 81 &&
      parseInt(matchData[i].Won_By, 10) <= 110
    )
      matchStats.winByRuns[4].value++;
    else matchStats.winByRuns[5].value++;
  } else if (matchData[i].Win_Type === "by wickets") {
    matchStats.winType[1].value++;
  } else if (matchData[i].Win_Type === "Tie") matchStats.winType[2].value++;
  else matchStats.winType[3].value++;

  //result type calculation i.e. whether a team won using either D/L method normal result
  if (matchData[i].Is_DuckWorthLewis === "1") matchStats.resultType[0].value++;
  else matchStats.resultType[1].value++;

  //calculation for matches played in each season
  matchStats.seasonMatches[parseInt(matchData[i].Season_Id, 10) - 1].value++;

  if (matchData[i].Toss_Winner_Id === matchData[i].Match_Winner_Id)
    matchStats.matchesWonOnToss++;

  if (matchData[i].Host_Country === "India")
    matchStats.hostCountries[0].value++;
  else matchStats.hostCountries[1].value++;
}

iplStats.matchStats = matchStats;

//calculation for balls stats

//contains balls stats
var ballsStats = {
  totalDeliveries: 0,
  runTypes: [
    { name: "zero", value: 0 },
    { name: "one", value: 0 },
    { name: "two", value: 0 },
    { name: "three", value: 0 },
    { name: "four", value: 0 },
    { name: "five", value: 0 },
    { name: "sixes", value: 0 }
  ],
  dismissalTypes: [
    { name: "Caught", value: 0 },
    { name: "Caught And Bowled", value: 0 },
    { name: "Bowled", value: 0 },
    { name: "Run Out", value: 0 },
    { name: "lbw", value: 0 },
    { name: "Retired Hurt", value: 0 },
    { name: "Stumped", value: 0 }
  ],
  extrasType: [
    { name: "Legbyes", value: 0 },
    { name: "Wides", value: 0 },
    { name: "No Balls", value: 0 },
    { name: "Byes", value: 0 }
  ]
};

ballsStats.totalDeliveries = ballsData.length;

for (var i = 0; i < ballsData.length; i++) {
  // runs batsman scored
  if (Number.isInteger(parseInt(ballsData[i].Batsman_Scored, 10))) {
    ballsStats.runTypes[parseInt(ballsData[i].Batsman_Scored, 10)].value++;
  }

  //Dismissal type
  if (ballsData[i].Dissimal_Type) {
    if (ballsData[i].Dissimal_Type === "caught")
      ballsStats.dismissalTypes[0].value++;
    else if (ballsData[i].Dissimal_Type === "caught and bowled")
      ballsStats.dismissalTypes[1].value++;
    else if (ballsData[i].Dissimal_Type === "bowled")
      ballsStats.dismissalTypes[2].value++;
    else if (ballsData[i].Dissimal_Type === "run out")
      ballsStats.dismissalTypes[3].value++;
    else if (ballsData[i].Dissimal_Type === "lbw")
      ballsStats.dismissalTypes[4].value++;
    else if (ballsData[i].Dissimal_Type === "retired hurt")
      ballsStats.dismissalTypes[5].value++;
    else ballsStats.dismissalTypes[6].value++;
  }

  if (ballsData[i].Extra_Type) {
    if (ballsData[i].Extra_Type === "legbyes") ballsStats.extrasType[0].value++;
    else if (ballsData[i].Extra_Type === "wides")
      ballsStats.extrasType[1].value++;
    else if (ballsData[i].Extra_Type === "noballs")
      ballsStats.extrasType[2].value++;
    else ballsStats.extrasType[3].value++;
  }
}

iplStats.ballsStats = ballsStats;

// console.log(ballsStats);
iplStats = JSON.stringify(iplStats);
fs.writeFileSync("IPL_Data.json", iplStats);
