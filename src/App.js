import React from "react";
import { Component } from "react";

import Menu from "./pages/Menu";
import Results from "./pages/Results";

import StroopTest from "./tests/StroopTest";
import TrailTest from "./tests/TrailTest";
import HybridTest from "./tests/HybridTest";

import "./App.css";
import { Container, Card, CardBody, Button } from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: "menu",
      isLoading: false,
      countdown: null,
      results: null,
    };
  }

  sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  countdown = async () => {
    this.setState({ isLoading: true, countdown: 3 });
    await this.sleep(1000);
    this.setState({ countdown: 2 });
    await this.sleep(1000);
    this.setState({ countdown: 1 });
    await this.sleep(1000);
    this.setState({ isLoading: false, countdown: 0 });
  };

  selectTest = (test) => {
    this.countdown();
    this.setState({ selectedPage: test });
  };

  goBack = () => {
    this.setState({ selectedPage: "menu", results: null });
  };

  goToPage = (page) => {
    this.setState({ selectedPage: page });
  };

  handleResults = (results) => {
    this.setState(results);
  };

  componentDidMount() {
    //this.countdown();
  }

  render() {
    const { isLoading, countdown, selectedPage, results } = this.state;

    if (isLoading) {
      return (
        <div className="loading">
          <div className="loading-centre">
            <h1 className="display-1 text-center">{countdown}</h1>
          </div>
        </div>
      );
    }

    return (
      <Container className="text-center">
        <div className="mb-5">
          <h1 className="display-3">CSS2 Hybrid Test Experiment</h1>
        </div>

        {results ? (
          <Button
            size="lg"
            color="primary"
            className="mb-3"
            onClick={() => this.goToPage("results")}
          >
            View Results
          </Button>
        ) : null}

        {selectedPage === "menu" ? (
          <Menu selectTest={this.selectTest} />
        ) : (
          <Card
            className={`test-card mx-auto ${
              selectedPage === "results" ? "border-0" : null
            }`}
          >
            <CardBody>
              {selectedPage === "stroop" ? (
                <StroopTest handleResults={this.handleResults} />
              ) : null}
              {selectedPage === "trail" ? (
                <TrailTest part="A12" handleResults={this.handleResults} />
              ) : null}
              {selectedPage === "hybrid" ? (
                <HybridTest handleResults={this.handleResults} />
              ) : null}
              {selectedPage === "results" ? (
                <Results results={results} goBack={this.goBack} />
              ) : null}
            </CardBody>
          </Card>
        )}
        {selectedPage === "menu" ? (
          <p className="text-monospace text-center mt-3 text-muted">v1.0.1</p>
        ) : null}
      </Container>
    );
  }
}

export default App;
