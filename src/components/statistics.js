import { Row, Card, Col, ButtonGroup } from "react-bootstrap";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { useGlobalActions, useGlobalState } from "../context/globalContext";
import { Button } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import IconButton from "@material-ui/core/IconButton";
// import Cross from "@material-ui/icons/Dehaze";
import ClearIcon from "@material-ui/icons/Clear";
import { Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const Statisitcs = (props) => {
  const { setStatus, setSpeed } = useGlobalActions();
  const { status, speed } = useGlobalState();

  return (
    <Card
      style={{ padding: 0, margin: 4, top: 4, left: 4, width: 300, zIndex: 10 }}
    >
      <ModalHeader style={{ padding: 0, margin: 0 }}>
        <Row style={{ padding: 4, margin: 0, width: "100%" }}>
          <Col style={{ padding: 2, margin: 0, textAlign: "start" }}>
            Statisitcs
          </Col>
          <Col
            style={{
              padding: 0,
              margin: 0,
              textAlign: "end",
            }}
          >
            <IconButton
              style={{ padding: 0, margin: 0 }}
              onClick={(e) => {
                e.preventDefault();
                props.setIsStatsVisible(false);
              }}
            >
              <ClearIcon fontSize="small"></ClearIcon>
            </IconButton>
          </Col>
        </Row>
      </ModalHeader>
      <Row style={{ margin: 0, padding: 4 }}>
        <ButtonGroup>
          <Button
            variant="dark"
            style={{
              padding: "2px 8px 2px 8px",
              boxShadow: "none",
              fontSize: 12,
            }}
            onClick={(e) => {
              e.preventDefault();
              status.localeCompare("Playing") === 0
                ? setStatus("Paused")
                : setStatus("Playing");
            }}
          >
            {status.localeCompare("Playing") === 0 ? "Pause" : "Play"}
          </Button>
          <Button
            //   disabled={status.localeCompare("Finished") === 0}
            variant="dark"
            style={{
              padding: "2px 8px 2px 8px",
              boxShadow: "none",

              fontSize: 12,
            }}
            onClick={(e) => {
              e.preventDefault();
              status.localeCompare("Finished") === 0
                ? setStatus("Playing")
                : setStatus("Finished");
            }}
          >
            {status.localeCompare("Finished") === 0
              ? "Start simulation"
              : "Finish"}
          </Button>
        </ButtonGroup>
      </Row>
      <Divider></Divider>
      <Row style={{ margin: 0, padding: "4px 8px 4px 8px" }}>
        <Grid container spacing={2}>
          <Grid item style={{ fontSize: 14, fontWeight: "500" }}>
            Speed
          </Grid>
          <Grid item xs>
            <Slider
              style={{ boxShadow: "none" }}
              ValueLabelComponent={ValueLabelComponent}
              value={speed}
              min={1}
              max={100}
              onChange={(e, v) => {
                e.preventDefault();
                setSpeed(v);
              }}
            />
          </Grid>
        </Grid>
      </Row>
      <Divider></Divider>
    </Card>
  );
};

export default Statisitcs;
