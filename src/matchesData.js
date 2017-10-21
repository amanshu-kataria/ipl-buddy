import React, { Component } from "react";
import Graph from "./Graph.js";

class MatchesData extends Component {
  constructor() {
    super();
    this.state = {
      TossDecision: [],
      winType: []
    };
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    var csvFilePath = require("./datasets/Match.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.updateData
    });
  }

  updateData(result) {
    var TossDecision = [{ name: "Field", value: 0 }, { name: "Bat", value: 0 }];
    var winType = [
      { name: "By Runs", value: 0 },
      { name: "By Wickets", value: 0 },
      { name: "Tie", value: 0 }
    ];
    var resultData = result.data;
    for (var i = 0; i < result.data.length; i++) {
      if (resultData[i].Toss_Decision === "field") TossDecision[0].value++;
      else TossDecision[1].value++;

      if (resultData[i].Win_Type === "by runs") winType[0].value++;
      else if (resultData[i].Win_Type === "by wickets") winType[1].value++;
      else winType[2].value++;
    }
    this.setState({ TossDecision, winType });
  }

  render() {
    return (
      <div>
        <Graph
          name="Toss Decision"
          data={this.state.TossDecision}
          width={300}
          color="#82CA9D"
        />
        <Graph
          name="Win Type"
          data={this.state.winType}
          width={350}
          color="#FF8A65"
        />
      </div>
    );
  }
}

export default MatchesData;
