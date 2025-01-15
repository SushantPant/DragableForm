import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const PreviewMode = ({ formFields }) => {
    const filteredFields = formFields.filter(
        (field) =>
          field.label !== "Text Field" && field.label !== "Radio" && field.label !== "Select"
      );
  // Create the validation schema 
  const validationSchema = formFields.reduce((schema, field) => {
    //Add validation based on the "required" checkbox
    if (field.required && field.fieldType === "textfield" && field.label !== "Text Field") {
      schema[field.label] = Yup.string().required(`${field.label} is required`);
    }
    if ((field.fieldType === "radio" || field.fieldType === "select") && field.label !== "Radio" && field.label !== "Select") {
      schema[field.label] = Yup.string().required(`Please select a ${field.label}`);
    }
    return schema;
  }, {});

  return (
    <div>
      <h2>Preview Mode</h2>
      <Formik
        initialValues={{
          // Set initial values dynamically based on formFields
          ...formFields.reduce((initialValues, field) => {
            initialValues[field.label] = field.fieldType === "radio" || field.fieldType === "select" ? "" : "";
            return initialValues;
          }, {}),
        }}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
            {formFields.map((field, idx) => {
              if (field.fieldType === "textfield" && field.label !== "Text Field") {
                return (
                  <div key={idx}>
                    <label>{field.label}</label>
                    <Field
                      type={field.hidden ? "password" : "text"}
                      name={field.label}
                    />
                    {errors[field.label] && touched[field.label] && (
                      <div style={{ color: "red" }}>{errors[field.label]}</div>
                    )}
                  </div>
                );
              }
              if (field.fieldType === "radio" && field.label !== "Radio") {
                const options = field.options ? field.options.split(",") : [];
                return (
                  <div key={idx}>
                    <label>{field.label}</label>
                    {options.map((option, index) => (
                      <div key={index}>
                        <Field type="radio" name={field.label} value={option} />
                        {option}
                      </div>
                    ))}
                    {errors[field.label] && touched[field.label] && (
                      <div style={{ color: "red" }}>{errors[field.label]}</div>
                    )}
                  </div>
                );
              }
              if (field.fieldType === "select" && field.label !== "Select") {
                const options = field.options ? field.options.split(",") : [];
                return (
                  <div key={idx}>
                    <label>{field.label}</label>
                    <Field as="select" name={field.label}>
                      <option value="" disabled selected>
                        Select {field.label}
                      </option>
                      {options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Field>
                    {errors[field.label] && touched[field.label] && (
                      <div style={{ color: "red" }}>{errors[field.label]}</div>
                    )}
                  </div>
                );
              }
              return null;
            })}

            <div>
              <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PreviewMode;
