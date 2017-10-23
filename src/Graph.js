import React, { Component } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  PieChart,
  Pie,
  CartesianGrid,
  Tooltip
} from "recharts";

class Chart extends Component {
  render() {
    return (
      <BarChart
        width={this.props.width}
        height={200}
        data={this.props.data}
        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="value"
          fill={this.props.color}
          name={this.props.name}
          label
          barSize={30}
        />
      </BarChart>
    );
  }
}

class MyPieChart extends Component {
  render() {
    return (
      <PieChart width={300} height={250}>
        <Pie data={this.props.data} outerRadius={60} label={true} />
        <Legend />
      </PieChart>
    );
  }
}

export { Chart, MyPieChart };
