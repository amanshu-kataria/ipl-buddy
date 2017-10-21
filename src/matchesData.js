import React, { Component } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

class MatchesData extends Component {
  constructor() {
    super();
    this.state = {
      deliveries: [],
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
    var deliveries = [{ name: "Field", value: 0 }, { name: "Bat", value: 0 }];
    var winType = [
      { name: "By Runs", value: 0 },
      { name: "By Wickets", value: 0 },
      { name: "Tie", value: 0 }
    ];
    var resultData = result.data;
    for (var i = 0; i < result.data.length; i++) {
      if (resultData[i].Toss_Decision === "field") deliveries[0].value++;
      else deliveries[1].value++;

      if (resultData[i].Win_Type === "by runs") winType[0].value++;
      else if (resultData[i].Win_Type === "by wickets") winType[1].value++;
      else winType[2].value++;
    }
    this.setState({ deliveries, winType });
  }

  render() {
    var mData = this.state.deliveries;
    var winType = this.state.winType;
    return (
      <div>
        <BarChart
          width={300}
          height={200}
          data={mData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="value"
            fill="#82ca9d"
            name="Toss Decision"
            label
            barSize={30}
          />
        </BarChart>
      </div>
    );
  }
}

export default MatchesData;
