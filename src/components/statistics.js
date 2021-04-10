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
  const { setStatus, setSpeed, setRestart } = useGlobalActions();
  const { status, speed ,restarted} = useGlobalState();

  return (
    <Card
      style={{
        padding: 0,
        margin: 4,
        top: 4,
        left: 4,
        width: 300,
        zIndex: 10,
        border: "none",
        borderRadius: 2,
      }}
    >
      <ModalHeader style={{ padding: 0, margin: 0 }}>
        <Row style={{ padding: 4, margin: 0, width: "100%" }}>
          <Col
            style={{
              padding: 2,
              margin: 0,
              textAlign: "start",
              fontSize: 14,
              fontWeight: "500",
            }}
          >
            Statisitcs
          </Col>
          <Col
            style={{
              padding: 2,
              margin: 0,
              display:"flex",
              alignItems:"center",
              justifyContent:"flex-end"
            }}
          >
            <IconButton
              variant="outline-dark"
              style={{
                padding: 2,
                boxShadow: "none",
                fontWeight: "400",
                
                fontSize: 10,
              }}
              onClick={(e) => {
                e.preventDefault();
                props.setIsStatsVisible(false);
              }}
            >
                <ClearIcon style={{fontSize:14}}></ClearIcon>
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
              setRestart(false);
              status.localeCompare("Playing") === 0
                ? setStatus("Paused")
                : setStatus("Playing");
            }}
          >
            {status.localeCompare("Playing") === 0 ? "Pause" : "Play"}
          </Button>
          <Button
            //   disabled={status.localeCompare("Finished") === 0}
            disabled={restarted}
            variant="dark"
            style={{
              padding: "2px 8px 2px 8px",
              boxShadow: "none",

              fontSize: 12,
            }}
            onClick={(e) => {
              e.preventDefault();
              setStatus("Paused");
              setRestart(true);
              
              
            }}
          >
            Stop
          </Button>
        </ButtonGroup>
      </Row>
      <Divider></Divider>
      <Row style={{ margin: 0, padding: 4 }}>
        <Grid container spacing={2} style={{ padding: 0, margin: 0 }}>
          <Grid
            item
            style={{ padding: 4, margin: 0, fontSize: 12, fontWeight: "500" }}
          >
            Speed
          </Grid>
          <Grid
            item
            xs
            style={{ padding: "4px 16px 4px 16px", margin: 0, fontSize: 10, fontWeight: "500" }}
          >
            <Slider
              style={{ boxShadow: "none" }}
              style={{ padding: 0 }}
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
