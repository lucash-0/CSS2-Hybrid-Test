import React, { Component } from "react";

import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Row>
        <Col sm="4">
          <Card body className="h-100">
            <CardTitle className="h4">Stroop Test</CardTitle>
            <CardText>
              The Stroop test is a classic clinical test of attentional
              filtering. It is typically demonstrated as a reading versus color
              naming task, where reading is more automatic and thus less
              impacted.
            </CardText>
            <Row className="mt-auto">
              <Col>
                <Button
                  color="primary"
                  block
                  onClick={() => this.props.selectTest("stroop")}
                >
                  Play
                </Button>
              </Col>
              <Col>
                <Button color="secondary" block>
                  Instructions
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col sm="4">
          <Card body inverse color="warning" className="h-100">
            <CardTitle className="h4">Hybrid Test</CardTitle>
            <CardText>
              The Hybrid Test is a a cognitive test that incorporates qualities
              of both the Stroop Test and the Trail Making Test. Our experiment
              is to test the validity of this test against the Stroop and Trail
              tests to use in further research.
            </CardText>
            <Row className="mt-auto">
              <Col>
                <Button
                  color="primary"
                  block
                  onClick={() => this.props.selectTest("hybrid")}
                >
                  Play
                </Button>
              </Col>
              <Col>
                <Button color="secondary" block>
                  Instructions
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col sm="4">
          <Card body className="h-100">
            <CardTitle className="h4">Trail Test</CardTitle>
            <CardText>
              The Trail Making Test is a neuropsychological test of visual
              attention and task switching. It consists of two parts in which
              the subject is instructed to connect a set of numbered dots as
              quickly as possible while still maintaining accuracy.
            </CardText>
            <Row className="mt-auto">
              <Col>
                <Button
                  color="primary"
                  block
                  onClick={() => this.props.selectTest("trail")}
                >
                  Play
                </Button>
              </Col>
              <Col>
                <Button color="secondary" block>
                  Instructions
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Menu;
