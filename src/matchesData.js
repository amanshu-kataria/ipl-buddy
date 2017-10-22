import React, { Component } from "react";
import Chart from "./Graph.js";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Grid, Row, Col } from "react-bootstrap";

class MatchesData extends Component {
  constructor() {
    super();
    this.state = {
      totalMatches: "",
      tossDecision: [],
      winType: [],
      resultType: [],
      winByRuns: []
    };
    this.updateData = this.updateData.bind(this);
  }

  componentWillMount() {
    var csvFilePath = require("./datasets/Match.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.updateData
    });
  }

  /**
   * Gets the data after parsing, which is used for calculation and stored in a state.
   * @param {Object} result - contains the parsed data.
   */
  updateData(result) {
    var tossDecision = [{ name: "Field", value: 0 }, { name: "Bat", value: 0 }];
    var winType = [
      { name: "By Runs", value: 0 },
      { name: "By Wickets", value: 0 },
      { name: "Tie", value: 0 },
      { name: "No Result", value: 0 }
    ];
    var resultType = [
      { name: "D/L Method", value: 0 },
      { name: "Normal Result", value: 0 }
    ];
    var winByRuns = [
      { name: "1-10", value: 0 },
      { name: "11-30", value: 0 },
      { name: "31-55", value: 0 },
      { name: "56-80", value: 0 },
      { name: "80-110", value: 0 },
      { name: "110+", value: 0 }
    ];

    var resultData = result.data; //contains data
    for (var i = 0; i < result.data.length; i++) {
      //Toss Decision data calculation
      if (resultData[i].Toss_Decision === "field") tossDecision[0].value++;
      else tossDecision[1].value++;

      //Win type and win by runs data calculation
      if (resultData[i].Win_Type === "by runs") {
        winType[0].value++; //win type

        //win by runs calculation
        if (
          parseInt(resultData[i].Won_By, 10) >= 1 &&
          parseInt(resultData[i].Won_By, 10) <= 10
        )
          winByRuns[0].value++;
        else if (
          parseInt(resultData[i].Won_By, 10) >= 11 &&
          parseInt(resultData[i].Won_By, 10) <= 30
        )
          winByRuns[1].value++;
        else if (
          parseInt(resultData[i].Won_By, 10) >= 31 &&
          parseInt(resultData[i].Won_By, 10) <= 55
        )
          winByRuns[2].value++;
        else if (
          parseInt(resultData[i].Won_By, 10) >= 56 &&
          parseInt(resultData[i].Won_By, 10) <= 80
        )
          winByRuns[3].value++;
        else if (
          parseInt(resultData[i].Won_By, 10) >= 81 &&
          parseInt(resultData[i].Won_By, 10) <= 110
        )
          winByRuns[4].value++;
        else winByRuns[5].value++;
      } else if (resultData[i].Win_Type === "by wickets") {
        winType[1].value++;
      } else if (resultData[i].Win_Type === "Tie") winType[2].value++;
      else winType[3].value++;

      //result type calculation i.e. whether a team won using either D/L method normal result
      if (resultData[i].Is_DuckWorthLewis === "1") resultType[0].value++;
      else resultType[1].value++;
    }

    this.setState({
      tossDecision,
      winType,
      totalMatches: result.data.length,
      resultType,
      winByRuns
    });
  }

  render() {
    return (
      <div>
        <h4>
          The below stats are collected from {this.state.totalMatches} matches.
        </h4>
        <Grid>
          <Row>
            <Col md={4} sm={6} xs={12} lg={4}>
              <Chart
                name="Toss Decision"
                data={this.state.tossDecision}
                width={350}
                color="#82CA9D"
              />
            </Col>
            <Col md={4} sm={6} xs={12} lg={4}>
              <Chart
                name="Win Type"
                data={this.state.winType}
                width={400}
                color="#FF8A65"
              />
            </Col>
            <Col md={4} sm={12} xs={12} lg={4}>
              <Chart
                name="Result Type"
                data={this.state.resultType}
                width={350}
                color="#0091EA"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Chart
                name="Win By Runs"
                data={this.state.winByRuns}
                width={400}
                color="#F44336"
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default MatchesData;
