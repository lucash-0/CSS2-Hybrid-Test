import React, { Component } from "react";

import { Table, Button, Spinner } from "reactstrap";

import { CSVLink } from "react-csv";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: {
        stroop: "Stroop Results",
        trails: "Trails Results",
        hybrid: "Hybrid Test Results",
      },
      headers: {
        stroop: [
          { label: "Event", key: "event" },
          { label: "Word", key: "word" },
          { label: "Colour", key: "colour" },
          { label: "Selected Colour", key: "selected" },
          { label: "Outcome", key: "outcome" },
          { label: "Time elapsed", key: "elapsed" },
          { label: "Reaction time", key: "reaction" },
        ],
        trails: [
          { label: "Event", key: "event" },
          { label: "Token", key: "token" },
          { label: "Selected Token", key: "selected" },
          { label: "Outcome", key: "outcome" },
          { label: "Time elapsed", key: "elapsed" },
          { label: "Reaction time", key: "reaction" },
        ],
        hybrid: [
          { label: "Event", key: "event" },
          { label: "Correct Word", key: "correctWord" },
          { label: "Correct Colour", key: "correctColour" },
          { label: "Selected Word", key: "selectedWord" },
          { label: "Selected Colour", key: "selectedColour" },
          { label: "Outcome", key: "outcome" },
          { label: "Time elapsed", key: "elapsed" },
          { label: "Reaction time", key: "reaction" },
        ],
      },
      data: null,
    };
  }

  componentDidMount() {
    if (this.props.results.type === "stroop") {
      this.stroopEvents(this.props.results.data);
    } else if (this.props.results.type === "trails") {
      this.trailsEvents(this.props.results.data);
    } else if (this.props.results.type === "hybrid") {
      this.hybridEvents(this.props.results.data);
    }
  }

  componentWillUnmount() {
    this.setState({ data: null });
  }

  stroopEvents = (results) => {
    const { events, colours, words, start } = results;
    let lastTs = start;

    const data = events.map((event, index) => {
      let obj = {
        event: index + 1,
        word: event.word,
        colour: words[colours.indexOf(event.color)].toUpperCase(),
        selected: words[colours.indexOf(event.selectedColor)].toUpperCase(),
        outcome: event.type,
        elapsed: (event.stamp - start) / 1000,
        reaction: (event.stamp - lastTs) / 1000,
      };
      lastTs = event.stamp;

      return obj;
    });

    this.setState({ data });
  };

  trailsEvents = (results) => {
    const { events, start } = results;
    let lastTs = start;

    const data = events.map((event, index) => {
      let obj = {
        event: index + 1,
        token: event.correctToken.text,
        selected: event.selectedToken.text,
        outcome: event.type,
        elapsed: (event.stamp - start) / 1000,
        reaction: (event.stamp - lastTs) / 1000,
      };
      lastTs = event.stamp;

      return obj;
    });

    this.setState({ data });
  };

  hybridEvents = (results) => {
    const { events, start } = results;
    let lastTs = start;

    const data = events.map((event, index) => {
      let obj = {
        event: index + 1,
        correctWord: event.correctToken.text,
        correctColour: event.correctToken.coltext,
        selectedWord: event.selectedToken.text,
        selectedColour: event.selectedToken.coltext,
        outcome: event.type,
        elapsed: (event.stamp - start) / 1000,
        reaction: (event.stamp - lastTs) / 1000,
      };
      lastTs = event.stamp;

      return obj;
    });

    this.setState({ data });
  };

  render() {
    //const {date } = this.state;
    const date = new Date();
    return (
      <div>
        <h3 className="mb-3">
          {this.props.results
            ? this.state.titles[this.props.results.type]
            : "Results"}
        </h3>
        <Table>
          <thead>
            <tr>
              {this.state.headers[this.props.results.type].map((header) => {
                return <th key={header.key}>{header.label}</th>;
              })}
            </tr>
          </thead>
          {this.state.data ? (
            <tbody>
              {this.state.data.map((event) => {
                return (
                  <tr key={event.event}>
                    {Object.values(event).map((val, index) => {
                      if (index === 0) {
                        return (
                          <th scope="row" key={index}>
                            {val}
                          </th>
                        );
                      } else {
                        return <td key={index}>{val}</td>;
                      }
                    })}
                  </tr>
                );
              })}
            </tbody>
          ) : null}
        </Table>
        <div className="mb-2">
          {this.state.data ? (
            <CSVLink
              data={this.state.data}
              headers={this.state.headers[this.props.results.type]}
              filename={`${
                this.props.results.type
              }_${date.getDate()}-${date.getMonth()}-${date.getFullYear()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.csv`}
              className="btn btn-primary btn-lg"
              target="_blank"
            >
              Download CSV
            </CSVLink>
          ) : (
            <Spinner />
          )}
        </div>

        <Button onClick={this.props.goBack} color="secondary" className="mb-3">
          Go Back
        </Button>
      </div>
    );
  }
}

export default Results;
