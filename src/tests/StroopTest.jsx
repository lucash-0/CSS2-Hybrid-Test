import React, { Component } from "react";

import Stroop from "@orcatech/react-neuropsych-stroop";

class StroopTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      words: null,
      colours: null,
      combos: null,
    };

    this.data = {
      words: ["green", "red", "blue", "orange", "purple", "yellow"],
      colours: ["008000", "990000", "000099", "EE7600", "800080", "FFFF00"],
      combos: null,
    };
  }

  shuffle = (arr1, arr2) => {
    for (let i = arr1.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr1[i], arr1[j]] = [arr1[j], arr1[i]];
      [arr2[i], arr2[j]] = [arr2[j], arr2[i]];
    }
  };

  onComplete = (data) => {
    // handle test completion
    //const { errors, successes, begin, finish, timeLimitReached } = data;
    this.props.handleResults({ results: { type: "stroop", data } });
  };

  onSuccess = (data) => {
    // handle each success that occurs
  };

  onError = (data) => {
    // handle each error that occurs
  };

  componentDidMount() {
    let wordarr = this.data.words;
    console.log(wordarr);
    let colarr = this.data.colours;
    console.log(colarr);
    this.shuffle(wordarr, colarr);
    console.log(wordarr);
    console.log(colarr);

    const halfsize = Math.floor(wordarr.length / 2);

    let combos = [];

    let lastrand;
    for (let i = 0; i < 3; i++) {
      let rand = Math.round(0 + Math.random() * (wordarr.length - 1));
      while (lastrand === rand) {
        rand = Math.round(0 + Math.random() * (wordarr.length - 1));
      }
      lastrand = rand;
      combos.push({ word: rand, color: rand });
    }

    let i = 3;
    let lastword;
    let lastcol;
    while (i < 12) {
      const rand1 = Math.round(0 + Math.random() * (wordarr.length - 1));
      const rand2 = Math.round(0 + Math.random() * (wordarr.length - 1));
      if (rand1 !== rand2 && rand1 !== lastword && rand2 !== lastcol) {
        lastword = rand1;
        lastcol = rand2;
        combos.push({ word: rand1, color: rand2 });
        i++;
      }
    }

    console.log(combos);

    this.setState({
      words: wordarr,
      colours: colarr,
      combos: combos,
      loading: false,
    });
  }

  componentWillUnmount() {
    this.setState({ loading: true });
  }

  render() {
    const { loading, words, colours, combos } = this.state;
    if (loading) return null;
    return (
      <Stroop
        colors={colours}
        combos={combos}
        onComplete={this.onComplete}
        onError={this.onError}
        onSuccess={this.onSuccess}
        words={words}
        timeLimit={300000}
        completionMessage="Completed! Please select the results button above."
      />
    );
  }
}

export default StroopTest;
