import React, { Component } from "react";

import { Table, Button } from "reactstrap";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: {
        stroop: "Stroop Results",
        trails: "Trails Results",
      },
    };
  }
  render() {
    return (
      <div>
        <Table>
          <thead>
            <th>
              {this.props.results
                ? this.state.titles[this.props.results.type]
                : "Results"}
            </th>
          </thead>
          <tbody>
            {
              /*this.props.results.data.map((row) => {
              return (
                <tr>
                  <th scope="row">{row.title}</th>
                  <td>{row.value}</td>
                </tr>
              );
            }*/ null
            }
          </tbody>
        </Table>
        <Button onClick={this.props.goBack} color="primary">
          Go Back
        </Button>
      </div>
    );
  }
}

export default Results;
