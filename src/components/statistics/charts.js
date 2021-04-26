import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { useThemeState } from "../../context/themeContext";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

class PopulationChart extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.data);
    this.state = props.data;
  }

  render() {
    return (
      <AreaChart
        width={500}
        height={400}
        data={this.state}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="population"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    );
  }
}

const ChartsModal = (props) => {
  const { theme } = useThemeState();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Charts Statisitcs
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row style={{ margin: 0, padding: 2 }}>
          <Col
            style={{
              padding: 0,
              margin: 0,
              borderRadius: 4,
              border: `2px solid ${theme.optionsBorderColor}`,
              padding: 2,
              margin: 2,
              height: "100%",
              width: "100%",
            }}
          >
            <PopulationChart data={props.data}></PopulationChart>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChartsModal;
