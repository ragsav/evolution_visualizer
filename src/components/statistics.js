import { Row, Card, Col, ButtonGroup, InputGroup } from "react-bootstrap";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { useGlobalActions, useGlobalState } from "../context/globalContext";
import { Button } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import IconButton from "@material-ui/core/IconButton";
// import Cross from "@material-ui/icons/Dehaze";
import ClearIcon from "@material-ui/icons/Clear";
import {
  Divider,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
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
  const {
    setStatus,
    setSpeed,
    setRestart,
    setCalamityType,
    setCalamityAmplitude,
    setCalamityDuration,
    setCalamitySize,
    setResourceType,
    setResourceSize
  } = useGlobalActions();
  const {
    status,
    speed,
    restarted,
    calamityType,
    calamityAmplitude,
    calamityDuration,
    calamitySize,
    resourceType,
    resourceSize
  } = useGlobalState();

  return (
    <Card
      style={{
        padding: 4,

        borderRadius: 0,

        width: 300,
        // zIndex: 10,

        overflowY: "scroll",
        height: "100%",
        border: "none",
      }}
    >
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
            xs={6}
            style={{
              padding: 4,
              margin: 0,
              fontSize: 12,
              fontWeight: "500",
              textAlign: "start",
            }}
          >
            Creature speed
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              padding: "4px 16px 4px 16px",
              margin: 0,
              fontSize: 10,
              fontWeight: "500",
            }}
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

      <div style={{ borderRadius: 4, border: "1px solid #858585", padding: 2 ,margin:2}}>
        <Row style={{ margin: 0, padding: "8px 4px 4px 4px" }}>
          <FormControl
            variant="outlined"
            style={{ width: "100%", padding: 0 }}
            size="small"
          >
            <InputLabel id="calamity-selector-label" style={{}}>
              Calamity
            </InputLabel>
            <Select
              label="Calamity"
              labelId="calamity-selector-label"
              value={calamityType}
              onChange={(e) => {
                e.preventDefault();
                setResourceType("none");
                setCalamityType(e.target.value);
              }}
              style={{
                padding: 0,
                margin: 0,
                fontSize: 14,
                fontWeight: "500",
              }}
            >
              <MenuItem
                value="none"
                style={{
                  padding: 4,
                  margin: 0,
                  fontSize: 12,
                  fontWeight: "500",
                }}
              >
                None
              </MenuItem>
              <MenuItem
                value="radiation"
                style={{
                  padding: 4,
                  margin: 0,
                  fontSize: 12,
                  fontWeight: "500",
                }}
              >
                Radiation
              </MenuItem>
              <MenuItem
                value="earthQuake"
                style={{
                  padding: 4,
                  margin: 0,
                  fontSize: 12,
                  fontWeight: "500",
                }}
              >
                Earth Quake
              </MenuItem>
              <MenuItem
                value="volcano"
                style={{
                  padding: 4,
                  margin: 0,
                  fontSize: 12,
                  fontWeight: "500",
                }}
              >
                Volcano
              </MenuItem>
            </Select>
          </FormControl>
        </Row>

        <Row style={{ margin: 0, padding: 4 }}>
          <Grid container spacing={2} style={{ padding: 0, margin: 0 }}>
            <Grid
              item
              xs={6}
              style={{
                padding: 4,
                margin: 0,
                fontSize: 12,
                fontWeight: "500",
                textAlign: "start",
              }}
            >
              Calamity size
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                padding: "4px 16px 4px 16px",
                margin: 0,
                fontSize: 10,
                fontWeight: "500",
              }}
            >
              <Slider
                style={{ boxShadow: "none" }}
                style={{ padding: 0 }}
                ValueLabelComponent={ValueLabelComponent}
                value={calamitySize}
                min={10}
                max={500}
                step={1}
                onChange={(e, v) => {
                  e.preventDefault();
                  setCalamitySize(v);
                }}
              />
            </Grid>
          </Grid>
        </Row>

        <Divider></Divider>

        <Row style={{ margin: 0, padding: 4 }}>
          <Grid container spacing={2} style={{ padding: 0, margin: 0 }}>
            <Grid
              item
              xs={6}
              style={{
                padding: 4,
                margin: 0,
                fontSize: 12,
                fontWeight: "500",
                textAlign: "start",
              }}
            >
              Calamity amplitude
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                padding: "4px 16px 4px 16px",
                margin: 0,
                fontSize: 10,
                fontWeight: "500",
              }}
            >
              <Slider
                style={{ boxShadow: "none" }}
                style={{ padding: 0 }}
                ValueLabelComponent={ValueLabelComponent}
                value={calamityAmplitude}
                min={1}
                max={10}
                step={1}
                onChange={(e, v) => {
                  e.preventDefault();
                  setCalamityAmplitude(v);
                }}
              />
            </Grid>
          </Grid>
        </Row>

        <Divider></Divider>

        <Row style={{ margin: 0, padding: 4 }}>
          <Grid container spacing={2} style={{ padding: 0, margin: 0 }}>
            <Grid
              item
              xs={6}
              style={{
                padding: 4,
                margin: 0,
                fontSize: 12,
                fontWeight: "500",
                textAlign: "start",
              }}
            >
              Calamity duration
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                padding: "4px 16px 4px 16px",
                margin: 0,
                fontSize: 10,
                fontWeight: "500",
              }}
            >
              <Slider
                style={{ boxShadow: "none" }}
                style={{ padding: 0 }}
                ValueLabelComponent={ValueLabelComponent}
                value={calamityDuration}
                min={2000}
                max={100000}
                step={1000}
                onChange={(e, v) => {
                  e.preventDefault();
                  setCalamityDuration(v);
                }}
              />
            </Grid>
          </Grid>
        </Row>
      </div>

      <div style={{ borderRadius: 4, border: "1px solid #858585", padding: 2 ,margin:2}}>
        <Row style={{ margin: 0, padding: "8px 4px 4px 4px" }}>
          <FormControl
            variant="outlined"
            style={{ width: "100%", padding: 0 }}
            size="small"
          >
            <InputLabel id="resources-selector-label" style={{}}>
              Resources
            </InputLabel>
            <Select
              label="Resources"
              labelId="resources-selector-label"
              value={resourceType}
              onChange={(e) => {
                e.preventDefault();
                setCalamityType("none");
                setResourceType(e.target.value);
              }}
              style={{
                padding: 0,
                margin: 0,
                fontSize: 14,
                fontWeight: "500",
              }}
            >
              <MenuItem
                value="none"
                style={{
                  padding: 4,
                  margin: 0,
                  fontSize: 12,
                  fontWeight: "500",
                }}
              >
                None
              </MenuItem>
              <MenuItem
                value="waterBody"
                style={{
                  padding: 4,
                  margin: 0,
                  fontSize: 12,
                  fontWeight: "500",
                }}
              >
                Water body
              </MenuItem>              
            </Select>
          </FormControl>
        </Row>

        <Row style={{ margin: 0, padding: 4 }}>
          <Grid container spacing={2} style={{ padding: 0, margin: 0 }}>
            <Grid
              item
              xs={6}
              style={{
                padding: 4,
                margin: 0,
                fontSize: 12,
                fontWeight: "500",
                textAlign: "start",
              }}
            >
              Resource size
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                padding: "4px 16px 4px 16px",
                margin: 0,
                fontSize: 10,
                fontWeight: "500",
              }}
            >
              <Slider
                style={{ boxShadow: "none" }}
                style={{ padding: 0 }}
                ValueLabelComponent={ValueLabelComponent}
                value={resourceSize}
                min={10}
                max={300}
                step={1}
                onChange={(e, v) => {
                  e.preventDefault();
                  setResourceSize(v);
                }}
              />
            </Grid>
          </Grid>
        </Row>

        <Divider></Divider>
      </div>
    </Card>
  );
};

export default Statisitcs;
