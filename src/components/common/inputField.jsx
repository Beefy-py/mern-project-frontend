import React from "react";

const InputField = ({ type, label, value, onChangeFunc }) => {
  const inputId = label.toLowerCase();

  switch (type) {
    case "textfield":
      return (
        <div className="input-field">
          <label htmlFor={inputId}>{label}</label>
          <textarea
            type={type}
            id={inputId}
            name={inputId}
            value={value}
            onChange={onChangeFunc}
            placeholder={label}
          />
        </div>
      );

    default:
      return (
        <div className="input-field">
          <label htmlFor={inputId}>{label}</label>
          <input
            type={type}
            id={inputId}
            name={inputId}
            value={value}
            onChange={onChangeFunc}
            placeholder={label}
          />
        </div>
      );
  }
};

export default InputField;
