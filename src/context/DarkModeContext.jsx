/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect} from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

const DarkModeProvider = (prop) => {
  const {children}=prop
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme:dark)'), 
    "isDarkMode");

  function darkModeToggle() {
    setIsDarkMode((isDark) => !isDark);
  }
  useEffect(() => {
    if (isDarkMode) {
      document.querySelector("html").className = "dark-mode";
    } else {
      document.querySelector("html").className = "light-mode";
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, darkModeToggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("useDarkMode was used outside of DarkModeProvider");
  return context;
}

export {useDarkMode,  DarkModeProvider };
