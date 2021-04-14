import React, { useEffect, useState } from "react";

const darkTheme = {
  adultCreatureColor: "#FF4489",
  babyCreatureColor: "#E8FF95",
  earthColor: "#2A2A2A",
  optionsColor: "#FFFFFF",
  optionsFontColor: "#545454",
  optionsBorderColor: "#ACACAC",
  buttonTheme: "dark",
};
const ThemeStateContext = React.createContext(undefined);
const ThemeActionsContext = React.createContext(undefined);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme);

  return (
    <ThemeStateContext.Provider
      value={{
        theme,
      }}
    >
      <ThemeActionsContext.Provider
        value={{
          setTheme,
        }}
      >
        {children}
      </ThemeActionsContext.Provider>
    </ThemeStateContext.Provider>
  );
};

const useThemeState = () => {
  const context = React.useContext(ThemeStateContext);
  if (context === undefined) {
    throw new Error("useThemeState must be used within a ThemeProvider");
  }

  return context;
};

const useThemeActions = () => {
  const context = React.useContext(ThemeActionsContext);
  if (context === undefined) {
    throw new Error("useThemeActions must be used within a ThemeProvider");
  }

  return context;
};

export { useThemeState, useThemeActions, ThemeProvider };
