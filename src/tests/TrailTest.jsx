import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import Trails from "@lucash-0/react-neuropsych-trails";

class TrailTest extends Component {
  static propTypes = {
    part: PropTypes.string.isRequired,
  };

  state = {
    progress: 0,
  };

  constructor(props) {
    super(props);
    this.data = {
      start: undefined,
      stop: undefined,
      events: [],
    };
  }

  componentDidMount() {
    this.data.start = new Date().getTime();
  }

  update = (type, date, correctToken, selectedToken) => {
    this.data.events.push({
      stamp: date.getTime(),
      type: type,
      correctToken: correctToken,
      selectedToken: selectedToken,
    });
    console.log(this.data.events[this.data.events.length - 1]);
  };

  handleMiss = (date, correctToken, x, y) => {
    this.update("Miss", date, correctToken, { text: "", x: x, y: y });
  };

  handleSuccess = (date, token) => {
    this.update("Success", date, token, token);
    this.setState((prev) => ({ progress: prev.progress + 1 }));
  };

  handleError = (date, correctToken, selectedToken) => {
    this.update("Error", date, correctToken, selectedToken);
  };

  handleCompleted = (date) => {
    this.data.stop = date.getTime();
    console.log("Trails Data:");
    console.log(this.data);

    this.props.handleResults({ results: { data: this.data, type: "trails" } });
  };

  render() {
    return (
      <Trails
        part={this.props.part}
        progress={this.state.progress}
        feedback={true}
        errorText="X"
        errorDuration={500}
        completedText={"Completed! Please press the view results button"}
        onSuccess={this.handleSuccess}
        onError={this.handleError}
        onMiss={this.handleMiss}
        onCompleted={this.handleCompleted}
      />
    );
  }
}

export default TrailTest;
