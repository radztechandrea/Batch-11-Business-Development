import React, { createContext, useState, useEffect, useCallback } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({
  settings,
  dataObj,
  onChangeSettings,
  children,
}) => {
  const [formData, setFormData] = useState(dataObj);
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(settings[0]?.title);
  const [open, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [disable, setDisable] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [Tablecomponent, setTablecomponent] = useState([]);

  const getNestedObject = useCallback((obj, keys) => {
    return keys.reduce((acc, key) => {
      if (!acc[key]) {
        acc[key] = {};
      }
      return acc[key];
    }, obj);
  }, []);

  const handleChange = useCallback(
    (event, targetKey) => {
      const { value, checked, type } = event.target;
      const newErrors = { ...errors };
      const newData = { ...formData };
      const keys = targetKey.split(".");
      const lastKey = keys.pop();
      const nestedObject = getNestedObject(newData, keys);
      if (type === "checkbox") {
        nestedObject[lastKey] = checked;
      } else {
        nestedObject[lastKey] = value;
      }
      if (newErrors[targetKey]) {
        delete newErrors[targetKey];
      }
      setFormData(newData);
      setErrors(newErrors);
      setDisable(false);
      onChangeSettings(newData);
    },
    [errors, formData, getNestedObject, onChangeSettings]
  );

  const handleTabChange = useCallback((event, newValue) => {
    setActiveStep(newValue);
  }, []);

  const handleSave = useCallback(() => {
    const isEmpty = Tablecomponent.some((row) => {
      const foundRow = formData.user.deductions.find(
        (r) =>
          Object.keys(row).every((key) => r[key] === row[key])
      );
      return !foundRow;
    });

    if (isEmpty) {
      alert("Please fill in all fields before saving.");
      return;
    }
    setEdit(false);
    setDisable(true);
    setOpen(true);
  }, [Tablecomponent]);

  const handleInputChange = useCallback(
    (e, index) => {
      const { name, value } = e.target;
      const updatedData = formData.user.deductions || [];
      updatedData[index][name] = value;
      setFormData({
        ...formData,
        user: {
          ...formData.user,
        },
      });
      setDisable(false);
    },
    [formData]
  );

  const handleConfirm = useCallback((index) => {
    setEditIndex(index);
    setShowConfirm(true);
  }, []);

  const handleRemoveClick = useCallback(() => {
    const updatedData = formData.user.deductions || [];
    updatedData.splice(editIndex, 1);
    setFormData({
      ...formData,
      user: {
        ...formData.user,
      },
    });
    setShowConfirm(false);
    setEditIndex(null);
  }, [editIndex, formData]);

  const handleNo = useCallback(() => {
    setShowConfirm(false);
    setEditIndex(null);
  }, []);

  const handleAdd = useCallback(() => {
    const User = formData.user || {};
    const updatedDeductions = [
      ...(User.deductions || []),
      { code: "", desc: "", },
    ];
    setFormData({
      ...formData,
      user: {
        ...User,
        deductions: updatedDeductions,
      },
    });
    setEdit(true);
  }, [formData]);

  const handleAddResponse = useCallback(
    (targetKey) => {
      const newFormData = { ...formData };
      const keys = targetKey.split(".");
      const lastKey = keys.pop();
      const nestedObject = getNestedObject(newFormData, keys);
      if (!Array.isArray(nestedObject[lastKey])) {
        nestedObject[lastKey] = [];
      }
      nestedObject[lastKey].push("");
      setFormData(newFormData);
      onChangeSettings(newFormData);
    },
    [formData, getNestedObject, onChangeSettings]
  );

  const handleDeleteResponse = useCallback(
    (targetKey, index) => {
      const newFormData = { ...formData };
      const keys = targetKey.split(".");
      const lastKey = keys.pop();
      const nestedObject = getNestedObject(newFormData, keys);
      if (Array.isArray(nestedObject[lastKey])) {
        nestedObject[lastKey].splice(index, 1);
      }
      setFormData(newFormData);
      onChangeSettings(newFormData);
    },
    [formData, getNestedObject, onChangeSettings]
  );

  const handleClose = useCallback((event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  }, []);

  const getNestedValue = useCallback((obj, path) => {
    return path.split(".").reduce((acc, key) => acc && acc[key], obj);
  }, []);

  const customReplacer = useCallback((key, value, context) => {
    if (context && context[key]?.type === "select") {
      return `${value}`;
    }
    if (typeof value === "string") {
      return `${value}`;
    }
    return value;
  }, []);

  const formatJSON = useCallback(
    (obj, context) => {
      const jsonString = JSON.stringify(
        obj,
        (key, value) => customReplacer(key, value, context),
        2
      );
      return jsonString
        .replace(/"(\w+)"\s*:/g, '"$1":')
        .replace(/:\s*"([+-]?\d+(?:\.\d+)?)"/g, ": $1")
        .replace(/:\s*"([+-]?\d+)"/g, ": $1");
    },
    [customReplacer]
  );

  useEffect(() => {
    setFormData(dataObj);
  }, [dataObj]);

  useEffect(() => {
    setTablecomponent(formData.user?.deductions || []);
  }, [formData]);

  return (
    <SettingsContext.Provider
      value={{
        formData,
        errors,
        activeStep,
        open,
        isEdit,
        disable,
        showConfirm,
        editIndex,
        handleChange,
        handleTabChange,
        handleSave,
        handleInputChange,
        handleConfirm,
        handleRemoveClick,
        handleNo,
        handleAdd,
        handleAddResponse,
        handleDeleteResponse,
        handleClose,
        getNestedValue,
        formatJSON,
        setEdit,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => React.useContext(SettingsContext);

export default SettingsContext;
