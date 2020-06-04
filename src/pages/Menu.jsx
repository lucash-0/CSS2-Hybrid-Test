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
          <Card body>
            <CardTitle className="h4">Stroop Test</CardTitle>
            <CardText>This is the stroop test</CardText>
            <Row>
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
          <Card body inverse color="warning">
            <CardTitle className="h4">Hybrid Test</CardTitle>
            <CardText>This is the stroop test</CardText>
            <Row>
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
          <Card body>
            <CardTitle className="h4">Trail Test</CardTitle>
            <CardText>This is the Trail test</CardText>
            <Row>
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
