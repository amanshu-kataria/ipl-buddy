import React, { Component } from "react";
import { Chart, MyPieChart } from "./Graph.js";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Grid, Row, Col } from "react-bootstrap";

class Stats extends Component {
  constructor() {
    super();
    this.state = {
      totalMatches: 0,
      tossDecision: [],
      winType: [],
      resultType: [],
      winByRuns: [],
      seasonMatches: [],
      matchesWonOnToss: 0,
      hostCountries: [],
      totalDeliveries: 0,
      dotDeliveries: 0,
      totalExtras: 0,
      totalDismissals: 0,
      extrasType: [],
      dismissalTypes: [],
      runTypes: []
    };
  }

  componentWillMount() {
    var data = require("./datasets/IPL_Data.json");
    var matches = data.matchStats;
    var deliveries = data.ballsStats;
    var totalExtras = deliveries.extrasType;

    totalExtras =
      totalExtras[0].value +
      totalExtras[1].value +
      totalExtras[2].value +
      totalExtras[3].value;

    var totalDismissals = 0;
    for (var i = 0; i < deliveries.dismissalTypes.length; i++)
      totalDismissals += deliveries.dismissalTypes[i].value;

    this.setState({
      totalMatches: matches.totalMatches,
      tossDecision: matches.tossDecision,
      winType: matches.winType,
      resultType: matches.resultType,
      winByRuns: matches.winByRuns,
      seasonMatches: matches.seasonMatches,
      matchesWonOnToss: matches.matchesWonOnToss,
      hostCountries: matches.hostCountries,
      totalDeliveries: deliveries.totalDeliveries,
      dotDeliveries: deliveries.runTypes[0].value,
      totalExtras,
      totalDismissals,
      extrasType: deliveries.extrasType,
      dismissalTypes: deliveries.dismissalTypes,
      runTypes: deliveries.runTypes
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
                    Only {this.state.matchesWonOnToss} matches has been won by
                    team winning toss
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
                <li>
                  <p>
                    A total of {this.state.totalDeliveries} has been bowled in 9
                    seasons.
                  </p>
                </li>
                <li>
                  <p>
                    A total of {this.state.dotDeliveries} dot deliveries has
                    been bowled.
                  </p>
                </li>
                <li>
                  <p>
                    A total of {this.state.totalExtras} extras has been given
                    away.
                  </p>
                </li>
                <li>
                  <p>
                    A total of {this.state.totalDismissals} times batsmen had
                    been dismissed.
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
          <Row style={styles.row}>
            <Col md={6} style={styles.col}>
              <h4>Number of different extras given away</h4>
              <Chart
                name="Extras"
                data={this.state.extrasType}
                width={400}
                color="#4CAF50"
              />
            </Col>
            <Col md={6} style={styles.col}>
              <h4>Number of different dismissals</h4>
              <Chart
                name="Dismissals"
                data={this.state.dismissalTypes}
                width={500}
                color="#673AB7"
              />
            </Col>
          </Row>
          <Row style={styles.row}>
            <Col md={12} style={styles.col}>
              <h4>Number of different types of runs scored</h4>
              <Chart
                name="Runs Scored"
                data={this.state.runTypes}
                width={400}
                color="#AA00FF"
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Stats;
