import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Snackbar,
  useTheme,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { SettingsProvider, useSettings } from "./SettingsContext";
import RenderFieldComponent from "./RenderFieldComponent";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
  },
  componentWithPaddingLeft: {
    paddingLeft: theme.spacing(2),
  },
  tabs: {
    minWidth: "200px",
    borderRight: `1px solid ${theme.palette.divider}`,
    overflowY: "auto",
    height: "100%",
  },
  tabContent: {
    flex: 1,
    padding: theme.spacing(2),
    overflowY: "auto",
  },
  formDataContainer: {
    width: "25%",
    padding: theme.spacing(2),
    overflowY: "auto",
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
  fieldWrapper: {
    marginBottom: theme.spacing(2),
  },
  sectionInfo: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: `0 2px 4px rgba(0, 0, 0, 0.4)`,
  },
}));

const SettingsComponent = ({ settings }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const {
    formData,
    activeStep,
    open,
    handleTabChange,
    handleClose,
    formatJSON,
  } = useSettings();

  return (
    <Box className={classes.container}>
      <Box className={`${classes.tabs} ${classes.componentWithPaddingLeft}`}>
        <Tabs
          value={activeStep}
          onChange={handleTabChange}
          orientation="vertical"
        >
          {settings.map((setting) => (
            <Tab
              key={setting.title}
              label={setting.title}
              value={setting.title}
            />
          ))}
        </Tabs>
      </Box>
      <Box className={`${classes.tabContent} ${classes.componentWithPaddingLeft}`}>
        {settings
          .filter((setting) => setting.title === activeStep)
          .flatMap((setting) => setting.sections)
          .map((section) => (
            <Box key={section.title} className={classes.fieldWrapper}>
              <Box className={classes.sectionInfo}>
                <Typography variant="h4">{section.title}</Typography>
                {section.caption && (
                  <Typography className={classes.caption}>
                    {section.caption}
                  </Typography>
                )}
                {section.description && (
                  <Typography className={classes.description}>
                    {section.description}
                  </Typography>
                )}
                {section.settings &&
                  section.settings.map((field) => (
                    <Box key={field.targetKey} className={classes.fieldWrapper}>
                      {field.subCaption && (
                        <Typography className={classes.subCaption}>
                          {field.subCaption}
                        </Typography>
                      )}
                      <RenderFieldComponent field={field} />
                    </Box>
                  ))}
              </Box>
            </Box>
          ))}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Changes saved successfully!
          </Alert>
        </Snackbar>
      </Box>
      <Box className={`${classes.formDataContainer} ${classes.componentWithPaddingLeft}`}>
        <pre>{formatJSON(formData)}</pre>
      </Box>
    </Box>
  );
};

SettingsComponent.propTypes = {
  settings: PropTypes.array.isRequired,
};

const SettingsWrapper = ({ settings, dataObj, onChangeSettings }) => (
  <SettingsProvider settings={settings} dataObj={dataObj} onChangeSettings={onChangeSettings}>
    <SettingsComponent settings={settings} />
  </SettingsProvider>
);

SettingsWrapper.propTypes = {
  settings: PropTypes.array.isRequired,
  dataObj: PropTypes.object.isRequired,
  onChangeSettings: PropTypes.func.isRequired,
};

export default SettingsWrapper;
