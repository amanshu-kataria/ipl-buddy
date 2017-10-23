import React, { Component } from "react";
import { Chart, MyPieChart } from "./Graph.js";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Grid, Row, Col } from "react-bootstrap";

class MatchesData extends Component {
  constructor() {
    super();
    this.state = {
      totalMatches: 0,
      tossDecision: [],
      winType: [],
      resultType: [],
      winByRuns: [],
      seasonMatches: [],
      matchesWonOnToss: { name: "Won", value: 0 },
      hostCountries: [
        { name: "India", value: 0 },
        { name: "South Africa", value: 0 }
      ]
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
    var tossDecision = [
      { name: "Field", value: 0, fill: "#8BC34A" },
      { name: "Bat", value: 0, fill: "#009688" }
    ];
    var winType = [
      { name: "By Runs", value: 0, fill: "#673AB7" },
      { name: "By Wickets", value: 0, fill: "#4CAF50" },
      { name: "Tie", value: 0, fill: "#03A9F4" },
      { name: "No Result", value: 0, fill: "#EF5350" }
    ];
    var resultType = [
      { name: "D/L Method", value: 0, fill: "#FF5252" },
      { name: "Normal Result", value: 0, fill: "#AA00FF" }
    ];
    var winByRuns = [
      { name: "1-10", value: 0 },
      { name: "11-30", value: 0 },
      { name: "31-55", value: 0 },
      { name: "56-80", value: 0 },
      { name: "80-110", value: 0 },
      { name: "110+", value: 0 }
    ];

    var seasonMatches = [
      { name: "1", value: 0 },
      { name: "2", value: 0 },
      { name: "3", value: 0 },
      { name: "4", value: 0 },
      { name: "5", value: 0 },
      { name: "6", value: 0 },
      { name: "7", value: 0 },
      { name: "8", value: 0 },
      { name: "9", value: 0 }
    ];

    var matchesWonOnToss = this.state.matchesWonOnToss;

    var hostCountries = this.state.hostCountries;

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

      //calculation for matches played in each season
      seasonMatches[parseInt(resultData[i].Season_Id, 10) - 1].value++;

      if (resultData[i].Toss_Winner_Id === resultData[i].Match_Winner_Id)
        matchesWonOnToss.value++;

      if (resultData[i].Host_Country === "India") hostCountries[0].value++;
      else hostCountries[1].value++;
    }

    this.setState({
      tossDecision,
      winType,
      totalMatches: result.data.length,
      resultType,
      winByRuns,
      seasonMatches,
      matchesWonOnToss,
      hostCountries
    });
  }

  render() {
    const styles = {
      grid: {
        paddingLeft: 0,
        paddingRight: 0
      },
      row: {
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 15,
        paddingBottom: 15
      },
      col: {
        paddingLeft: 0,
        paddingRight: 0
      },
      container: {
        paddingTop: 60
      }
    };
    return (
      <div style={styles.container}>
        <Grid style={styles.grid}>
          <Row style={styles.row}>
            <Col style={styles.col}>
              <h3>Did you know?</h3>
            </Col>
          </Row>
          <Row
            style={{
              marginLeft: 0,
              marginRight: 0
            }}
          >
            <Col style={styles.col}>
              <ul>
                <li>
                  <p>
                    A total of {this.state.totalMatches} matches has been played
                    till date in 9 seasons.
                  </p>
                </li>
                <li>
                  <p>
                    Only {this.state.matchesWonOnToss.value} matches has been
                    won by team winning toss
                  </p>
                </li>
                <li>
                  <p>
                    Only {this.state.hostCountries[0].value} matches has been
                    played in India. The other{" "}
                    {this.state.hostCountries[1].value} matches were played in
                    South Africa.
                  </p>
                </li>
              </ul>
            </Col>
          </Row>
          <Row
            style={{
              marginLeft: 0,
              marginRight: 0
            }}
          >
            <Col>
              <h3>Below are some stats from all 9 seasons.</h3>
            </Col>
          </Row>
          <Row style={styles.row}>
            <Col md={4} sm={6} xs={12} lg={4} style={styles.col}>
              <h4>Decision after winning the toss</h4>
              <MyPieChart data={this.state.tossDecision} />
            </Col>
            <Col md={4} sm={6} xs={12} lg={4} style={styles.col}>
              <h4>Type of Win</h4>
              <MyPieChart data={this.state.winType} />
            </Col>
            <Col md={4} sm={12} xs={12} lg={4} style={styles.col}>
              <h4>Result Type</h4>
              <MyPieChart data={this.state.resultType} />
            </Col>
          </Row>
          <Row style={styles.row}>
            <Col md={6} style={styles.col}>
              <h4>Win by margins of runs</h4>
              <Chart
                name="Number of Wins"
                data={this.state.winByRuns}
                width={400}
                color="#F44336"
              />
            </Col>
            <Col md={6} style={styles.col}>
              <h4>Matches played in each season</h4>
              <Chart
                name="Matches Played"
                data={this.state.seasonMatches}
                width={500}
                color="#4DB6AC"
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default MatchesData;
