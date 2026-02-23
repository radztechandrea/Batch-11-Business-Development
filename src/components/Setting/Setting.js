import React, { useState } from "react";
import PropTypes from "prop-types";
import SettingsComponent from "./SettingsComponent";
import settingsConfig from "./SettingsConfig";

const Setting = () => {
  const [formData, setFormData] = useState({});

  const transformSettings = (settings) =>
    settings.map((tab) => ({
      title: tab.title,
      sections:
        tab.sections?.map((section) => ({
          title: section.title,
          description: section.description,
          settings:
            section.fields?.map((field) => ({
              type: field.type,
              defaultValue: field.defaultValue,
              uiComponent: field.uiComponent,
              targetKey: field.targetKey,
              caption: field.name,
              subCaption: field.description,
              options: field.options,
              columns: field.columns,
              list: field.list,
            })) || [],
        })) || [],
    }));

  const data = transformSettings(settingsConfig);

  return (
    <SettingsComponent
      settings={data}
      dataObj={formData}
      onChangeSettings={setFormData}
    />
  );
};

Setting.propTypes = {
  settings: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      sections: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          description: PropTypes.string,
          settings: PropTypes.arrayOf(
            PropTypes.shape({
              type: PropTypes.oneOf([
                "text",
                "number",
                "select",
                "boolean",
                "json",
              ]).isRequired,
              defaultValue: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.bool,
                PropTypes.array,
              ]).isRequired,
              uiComponent: PropTypes.string.isRequired,
              targetKey: PropTypes.string.isRequired,
              caption: PropTypes.string.isRequired,
              subCaption: PropTypes.string,
              options: PropTypes.arrayOf(
                PropTypes.shape({
                  value: PropTypes.string.isRequired,
                  label: PropTypes.string.isRequired,
                })
              ),
              columns: PropTypes.arrayOf(
                PropTypes.shape({
                  field: PropTypes.string.isRequired,
                  headerName: PropTypes.string.isRequired,
                  width: PropTypes.number,
                })
              ),
              list: PropTypes.bool,
            })
          ).isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default Setting;
