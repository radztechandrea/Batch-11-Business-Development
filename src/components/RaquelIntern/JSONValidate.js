import React, { useEffect, useRef, useState, memo } from "react";
import { IconButton, Typography } from "@material-ui/core";
import Brightness4OutlinedIcon from "@material-ui/icons/Brightness4Outlined";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/webpack-resolver";

const JSONEditor = ({ delay = 500, onChange = () => {}, value = "{}", ...props }) => {
  const editorRef = useRef(null);
  const editorJSON = useRef(null);
  const [darkMode, setDarkMode] = useState(true);
  const [tempVal, setTempVal] = useState(value);
  const [isFullScreen, setFullScreen] = useState(false);


  useEffect(() => {
    editorJSON.current = ace.edit(editorRef.current, {
      mode: "ace/mode/json",
      theme: darkMode ? "ace/theme/monokai" : "ace/theme/github",
      fontSize: 14,
      showPrintMargin: false,
    });


    editorJSON.current.setValue(tempVal, 1);


    editorJSON.current.getSession().on("change", () => {
      const newValue = editorJSON.current.getValue();
      setTempVal(newValue);
      onChange({ target: { name: props.name, value: newValue } });
    });

    return () => {
      editorJSON.current?.destroy();
      editorJSON.current = null;
    };
  }, [darkMode]);

  useEffect(() => {
    if (tempVal === value) return;
    setTempVal(value);
    editorJSON.current?.setValue(value, 1);
  }, [value]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    editorJSON.current.setTheme(darkMode ? "ace/theme/github" : "ace/theme/monokai");
  };

  const toggleFullscreen = () => {
    setFullScreen((prev) => !prev);
  };

  return (
    <>
      {!isFullScreen && (
        <Typography>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px", textAlign: "center" }}>
            JSON VALIDATOR EDITOR
          </h2>
        </Typography>
      )}

      <div
        style={{
          position: isFullScreen ? "fixed" : "absolute", 
          top: isFullScreen ? 0 : "50%", 
          left: isFullScreen ? 0 : "50%", 
          transform: isFullScreen ? "none" : "translate(-50%, -50%)", 
          width: isFullScreen ? "100%" : "60%", 
          height: isFullScreen ? "100%" : "500px", 
          zIndex: isFullScreen ? 9999 : "auto", 
          background: darkMode ? "#272822" : "#fff",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            padding: "10px",
            position: isFullScreen ? "absolute" : "relative",
            top: isFullScreen ? "10px" : "auto",
            right: isFullScreen ? "10px" : "auto",
            zIndex: 10000,
          }}
        >
          <IconButton
            onClick={toggleTheme}
            style={{
              cursor: "pointer",
              background: darkMode ? "#444" : "#ddd",
              color: darkMode ? "#fff" : "#000",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
              transition: "background 0.3s",
              marginRight: "10px",
            }}
          >
            <Brightness4OutlinedIcon />
          </IconButton>

          <IconButton
            onClick={toggleFullscreen}
            style={{
              cursor: "pointer",
              background: isFullScreen ? "#f44336" : "#444",
              color: "#fff",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
              transition: "background 0.3s",
            }}
          >
            {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </div>

        <div
          ref={editorRef}
          style={{
            flexGrow: 1, 
            width: "100%",
            height: "100%",
            background: darkMode ? "#272822" : "#fff",
            position: "absolute"
          }}
        />
      </div>
    </>
  );
};

export default memo(JSONEditor);