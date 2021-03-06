import { Row, Card, ButtonGroup } from "react-bootstrap";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import { useGlobalActions, useGlobalState } from "../../context/globalContext";
import { useThemeState } from "../../context/themeContext";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ChartsModal from "./charts";
import { useEffect, useRef, useState } from "react";

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
    setInitialPopulation,
    setStatus,
    setSpeed,
    setRestart,
    setCalamityType,
    setCalamityAmplitude,
    setCalamityDuration,
    setCalamitySize,
    setResourceType,
    setResourceSize,
    setFoodSpawnRate,
    setIsChartModalVisible,
  } = useGlobalActions();
  const {
    initialPopulation,
    status,
    speed,
    restarted,
    totalPopulation,
    calamityType,
    calamityAmplitude,
    calamityDuration,
    calamitySize,
    resourceType,
    resourceSize,
    foodSpawnRate,
    chartData,
  } = useGlobalState();

  const { theme } = useThemeState();

  return (
    <Card
      style={{
        padding: 2,
        borderRadius: 0,
        width: 300,
        overflowY: "scroll",
        height: window.innerHeight,
        minWidth: 300,
        border: "none",
        backgroundColor: theme.optionsColor,
      }}
    >
      <Row
        style={{
          padding: 1,
          margin: 2,
          borderRadius: 4,
          border: `2px solid ${theme.optionsBorderColor}`,
          justifyContent: "left",
          alignItems: "center",
        }}
        onClick={(e) => {
          e.preventDefault();
          window.open(
            "http://localhost:3000/evolution_visualizer/docs",
            "_blank"
          );
        }}
      >
        <InfoOutlinedIcon style={{ padding: 0, margin: 0 }}></InfoOutlinedIcon>
        <span
          style={{
            textDecoration: "none",
            fontSize: 12,
            padding: "0px 8px 0px 8px",
            fontWeight: "600",
            color: "#FF8400",
            userSelect: "none",
          }}
        >
          Documentation
        </span>
      </Row>

      <Row style={{ margin: 0, padding: 4 }}>
        <ButtonGroup>
          <Button
            variant={theme.buttonTheme}
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
            disabled={restarted}
            variant={theme.buttonTheme}
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
          <Button
            disabled={restarted}
            variant={theme.buttonTheme}
            style={{
              padding: "2px 8px 2px 8px",
              boxShadow: "none",
              fontSize: 12,
            }}
            onClick={(e) => {
              e.preventDefault();
              setIsChartModalVisible(true);
            }}
          >
            Show charts
          </Button>
        </ButtonGroup>
        <span
          style={{ fontWeight: "600", fontSize: 12, padding: 2, margin: 2 }}
        >{`Total Population : ${totalPopulation}`}</span>
      </Row>

      {/* <Divider style={{ backgroundColor: theme.optionsBorderColor }}></Divider> */}

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
              color: theme.optionsFontColor,
            }}
          >
            Initial Population
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
              style={{ boxShadow: "none", color: theme.optionsFontColor }}
              style={{ padding: 0 }}
              ValueLabelComponent={ValueLabelComponent}
              value={initialPopulation}
              min={1}
              max={200}
              onChange={(e, v) => {
                e.preventDefault();
                setInitialPopulation(v);
              }}
            />
          </Grid>
        </Grid>
      </Row>

      {/* <Divider style={{ backgroundColor: theme.optionsBorderColor }}></Divider> */}

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
              color: theme.optionsFontColor,
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
              style={{ boxShadow: "none", color: theme.optionsFontColor }}
              style={{ padding: 0 }}
              ValueLabelComponent={ValueLabelComponent}
              value={speed}
              min={0}
              step={0.1}
              max={2}
              onChange={(e, v) => {
                e.preventDefault();
                setSpeed(v);
              }}
            />
          </Grid>
        </Grid>
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
              color: theme.optionsFontColor,
            }}
          >
            Food spawn rate
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
              style={{ boxShadow: "none", color: theme.optionsFontColor }}
              style={{ padding: 0 }}
              ValueLabelComponent={ValueLabelComponent}
              value={foodSpawnRate}
              min={0}
              step={0.1}
              max={1}
              onChange={(e, v) => {
                e.preventDefault();
                setFoodSpawnRate(v);
              }}
            />
          </Grid>
        </Grid>
      </Row>

      <div
        style={{
          borderRadius: 4,
          border: `2px solid ${theme.optionsBorderColor}`,
          padding: 2,
          margin: 2,
        }}
      >
        <Row style={{ margin: 0, padding: "8px 4px 4px 4px" }}>
          <FormControl
            // variant="outlined"
            style={{
              width: "100%",
              padding: 0,
              borderColor: theme.optionsBorderColor,
            }}
            size="small"
          >
            <Select
              disableUnderline={true}
              value={calamityType}
              onChange={(e) => {
                e.preventDefault();
                setResourceType("none");
                setCalamityType(e.target.value);
              }}
              style={{
                padding: 0,
                margin: 0,
                fontSize: 12,
                fontWeight: "600",
                borderRadius: 4,
                color: theme.optionsFontColor,
                border: `2px solid ${theme.optionsBorderColor}`,
              }}
            >
              <MenuItem
                value="none"
                style={{
                  padding: 4,
                  margin: 0,
                  fontSize: 12,
                  fontWeight: "600",
                  color: theme.optionsFontColor,
                }}
              >
                None
              </MenuItem>
              <MenuItem
                value="plague"
                style={{
                  padding: 4,
                  margin: 0,
                  fontSize: 12,
                  fontWeight: "600",
                  color: theme.optionsFontColor,
                }}
              >
                Plague
              </MenuItem>
              <MenuItem
                value="radiation"
                style={{
                  padding: 4,
                  margin: 0,
                  fontSize: 12,
                  fontWeight: "600",
                  color: theme.optionsFontColor,
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
                  fontWeight: "600",
                  color: theme.optionsFontColor,
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
                  fontWeight: "600",
                  color: theme.optionsFontColor,
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
                color: theme.optionsFontColor,
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
                style={{
                  boxShadow: "none",
                  color: theme.optionsFontColor,
                }}
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
                color: theme.optionsFontColor,
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
                style={{
                  boxShadow: "none",
                  color: theme.optionsFontColor,
                }}
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
                color: theme.optionsFontColor,
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
                style={{
                  boxShadow: "none",
                  color: theme.optionsFontColor,
                }}
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

      <div
        style={{
          borderRadius: 4,
          border: `2px solid ${theme.optionsBorderColor}`,
          padding: 2,
          margin: 2,
        }}
      >
        <Row style={{ margin: 0, padding: "8px 4px 4px 4px" }}>
          <FormControl style={{ width: "100%", padding: 0 }} size="small">
            <Select
              disableUnderline={true}
              value={resourceType}
              onChange={(e) => {
                e.preventDefault();
                setCalamityType("none");
                setResourceType(e.target.value);
              }}
              style={{
                padding: 0,
                margin: 0,
                fontSize: 12,
                fontWeight: "600",
                borderRadius: 4,
                color: theme.optionsFontColor,
                border: `2px solid ${theme.optionsBorderColor}`,
              }}
            >
              <MenuItem
                value="none"
                style={{
                  padding: 4,
                  margin: 0,
                  fontSize: 12,
                  fontWeight: "600",
                  color: theme.optionsFontColor,
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
                  fontWeight: "600",
                  color: theme.optionsFontColor,
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
                color: theme.optionsFontColor,
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
                style={{ boxShadow: "none", color: theme.optionsFontColor }}
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
      </div>
    </Card>
  );
};

export default Statisitcs;
