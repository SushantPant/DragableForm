import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import FieldInput from "./FieldInput";

const FormEditor = ({ handleAddField, draggedField }) => {
  return (
    <Formik
      initialValues={{
        label: "",
        required: false,
        hidden: false,
        fieldType: draggedField || "textfield",
        options: "",
      }}
      validationSchema={Yup.object({
        label: Yup.string().required("Label is required"),
      })}
      onSubmit={(values) => {
        if (!values.label) {
          alert("Label is required");
          return;
        }
        handleAddField(values);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <div>
            <Field name="label" placeholder="Label" />
          </div>
          <div>
            <label>
              <Field type="checkbox" name="required" />
              Required
            </label>
          </div>

          {values.fieldType === "textfield" && (
            <div>
              <label>
                <Field type="checkbox" name="hidden" />
                Hidden
              </label>
            </div>
          )}

          <div>
            <Field as="select" name="fieldType">
              <option value="textfield">Textfield</option>
              <option value="radio">Radio</option>
              <option value="select">Select</option>
            </Field>
          </div>
          {["radio", "select"].includes(values.fieldType) && (
            <div>
              <FieldInput
                name="options"
                placeholder="Comma separated options"
                onChange={(e) => setFieldValue("options", e.target.value)}
              />
            </div>
          )}
          <div>
            <button type="submit">Add Field</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormEditor;
