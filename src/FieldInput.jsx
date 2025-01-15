import React from "react";
import { Field } from "formik";

const FieldInput = ({ name, placeholder, type, as, options,  onChange }) => {
// Destructuring the props to access the necessary data for rendering the field
  return (
    <div>
        {/* Create select drop down if its a select type*/}
      {type === "select" ? (
        <Field as={as} name={name}>
          <option value="" disabled selected>
            {placeholder}
          </option>
          {options &&
            options.split(",").map((option, index) => (
              <option key={index} value={option}>
                {option} {/* Each option is rendered here */}
              </option>
            ))}
        </Field>
      ) : (
        <Field name={name} placeholder={placeholder} />
      )}
    </div>
  );
};

export default FieldInput;
