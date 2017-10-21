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

class Graph extends Component {
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

export default Graph;
