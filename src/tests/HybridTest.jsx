import React from "react";
import { Component } from "react";
//import PropTypes from "prop-types";
import Hybrid from "@lucash-0/react-stroop-trails-hybrid";

class HybridTest extends Component {
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
    console.log("Hybrid Data:");
    console.log(this.data);

    this.props.handleResults({ results: { data: this.data, type: "hybrid" } });
  };

  render() {
    return (
      <Hybrid
        //part={this.props.part}
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

export default HybridTest;
