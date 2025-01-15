import React, { useState, useMemo } from "react";
import { useDrop } from "react-dnd";
import { useDrag } from "react-dnd";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DragItem = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "FORM_FIELD",
    item: { type, label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        padding: "10px",
        margin: "5px",
        backgroundColor: "lightgray",
        cursor: "move",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {label}
    </div>
  );
};

const FormComponents = () => {
  const [formFields, setFormFields] = useState([]);
  const [isPreview, setIsPreview] = useState(false);
  const [draggedField, setDraggedField] = useState(null);

  const handleAddField = (field) => {
    if (!formFields.some(existingField => existingField.label === field.label)) {
      setFormFields([...formFields, field]);
      setDraggedField(field.fieldType);
    } else {
      alert("Field with this label already exists");
    }

  };

  const handleSubmit = () => {
    isPreview !== true ? setIsPreview(true) : setIsPreview(false);

  };

  const [{ isOver }, drop] = useDrop({
    accept: "FORM_FIELD",
    drop: (item) =>
      handleAddField({
        type: item.type,
        label: item.label,
        fieldType: item.type,
      }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const draggingItems = useMemo(
    () => ({
      textfield: { type: "textfield", label: "Text Field" },
      radio: { type: "radio", label: "Radio" },
      select: { type: "select", label: "Select" },
    }),
    []
  );

  const validationSchema = useMemo(
    () =>
      Yup.object().shape(
        formFields.reduce((schema, field) => {
          if (field.required) {
            schema[field.label] = Yup.string().required(
              `${field.label} is required`
            );
          }
          return schema;
        }, {})
      ),
    [formFields]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h1>Drag and Drop Form Builder</h1>

        <div style={{ display: "flex", marginBottom: "20px" }}>
          {Object.values(draggingItems).map((item) => (
            <DragItem type={item.type} label={item.label} />
          ))}
        </div>

        <div
          ref={drop}
          style={{
            border: "2px dashed #ddd",
            padding: "20px",
            minHeight: "200px",
            backgroundColor: isOver ? "lightgreen" : "lightyellow",
          }}
        >
          {formFields.length === 0 || isOver ? (
            <p>Drag a form type here to start building your form.</p>
          ) : (
            <div>
              <h2>Edit Mode</h2>
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
                        <Field
                          name="options"
                          placeholder="Comma separated options"
                          onChange={(e) =>
                            setFieldValue("options", e.target.value)
                          }
                        />
                      </div>
                    )}
                    <div>
                      <button type="submit">Add Field</button>
                    </div>
                  </Form>
                )}
              </Formik>
              <div>
                <button onClick={handleSubmit}>Preview Mode</button>
              </div>
            </div>
          )}
        </div>

        {isPreview && (
          <div>
            <h2>Preview Mode</h2>
            <Formik
              initialValues={{}}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ values, errors, touched }) => (
                <Form>
                  {formFields.map((field, idx) => {
                    if (
                      field.fieldType === "textfield" &&
                      field.label !== "Text Field"
                    ) {
                      return (
                        <div key={idx}>
                          <label>{field.label}</label>
                          <Field
                            type={field.hidden ? "password" : "text"}
                            name={field.label}
                          />
                          {errors[field.label] && touched[field.label] && (
                            <div style={{ color: "red" }}>
                              {errors[field.label]}
                            </div>
                          )}
                        </div>
                      );
                    }
                    if (
                      field.fieldType === "radio" &&
                      field.label !== "Radio"
                    ) {
                      const options = field.options
                        ? field.options.split(",")
                        : [];
                      return (
                        <div key={idx}>
                          <label>{field.label}</label>
                          {options.map((option, index) => (
                            <div key={index}>
                              <Field
                                type="radio"
                                name={field.label}
                                value={option}
                              />
                              {option}
                            </div>
                          ))}
                        </div>
                      );
                    }
                    if (
                      field.fieldType === "select" &&
                      field.label !== "Select"
                    ) {
                      const options = field.options
                        ? field.options.split(",")
                        : [];
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
        )}
      </div>
    </DndProvider>
  );
};

export default FormComponents;
