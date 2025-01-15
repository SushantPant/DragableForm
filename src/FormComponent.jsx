import React, { useState, useMemo } from "react";
import { useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragItem from "./DragItem";
import FormEditor from "./FormEditor";
import PreviewMode from "./PreviewMode";

// Generate JSON Schema function
const generateJsonSchema = (formFields) => {
  const properties = formFields.reduce((acc, field) => {
    // Skip fields that are "Text Field", "Radio", or "Select"
    if (["Text Field", "Radio", "Select"].includes(field.label)) {
      return acc;
    }

    acc[field.label] = {
      type: field.fieldType === 'textfield' ? 'string' : field.fieldType,
      ...(field.required && { required: true }),
      ...(field.fieldType === 'select' || field.fieldType === 'radio') && {
        enum: field.options ? field.options.split(',') : []
      }
    };
    return acc;
  }, {});

  return {
    type: "object",
    properties,
    required: formFields.filter(field => field.required).map(field => field.label),
  };
};


const FormComponents = () => {
  const [formFields, setFormFields] = useState([]);
  const [isPreview, setIsPreview] = useState(false);
  const [draggedField, setDraggedField] = useState(null);

  const handleAddField = (field) => {
    setDraggedField(field.fieldType);
    if (!formFields.some((existingField) => existingField.label === field.label)) {
      setFormFields([...formFields, field]);
    } else {
      if(field.label==="Text Field"||field.label==="Radio"||field.label==="Select"){ }
      else{
        alert("Field with this label already exists");
      }
    }
  };

  const handleSubmit = () => {
    setIsPreview((prev) => !prev);

    // Generate the JSON Schema when submitting
    const jsonSchema = generateJsonSchema(formFields);
    console.log("Generated JSON Schema:", JSON.stringify(jsonSchema, null, 2));
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h1>Drag and Drop Form Builder</h1>

        <div style={{ display: "flex", marginBottom: "20px" }}>
          {Object.values(draggingItems).map((item) => (
            <DragItem type={item.type} label={item.label} key={item.type} />
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
              <FormEditor handleAddField={handleAddField} draggedField={draggedField} />
              <div>
                <button onClick={handleSubmit}>Preview Mode</button>
              </div>
            </div>
          )}
        </div>

        {isPreview && <PreviewMode formFields={formFields} />}
      </div>
    </DndProvider>
  );
};

export default FormComponents;
