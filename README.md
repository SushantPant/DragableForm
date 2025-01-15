# Documentation for Dynamic Form Builder
# Setup Instructions
To run the form builder, ensure you have the following installed on your system:
1. Node.js 
2. npm or yarn (Node package manager)

# How to use
1. clone the repository: git clone https://github.com/SushantPant/DragableForm.git
2. install necessary packages: npm i
3. start using: npm start
4. visit http://localhost:5173/

# Technology Choices and Rationale
React.js: Chosen as it provides a flexible structure for handling state and rendering UI components efficiently.
Formik: A library used for handling form state, validation, and submission. It simplifies the process of working with forms.
Yup: A schema validation library that integrates seamlessly with Formik to validate user inputs.
React-DnD: The library for handling drag-and-drop functionality.
HTML5 Backend (react-dnd-html5-backend): Provides the backend implementation required by React-DnD to support the drag-and-drop interactions in the browser.
Known Limitations / Trade-offs

# Future Improvements
Add More Field Types: Expand the form builder to support additional field types such as date, checkbox, number, etc.
Custom Validation Rules: Introduce custom validation options, such as regex-based validation, dynamic validation rules based on other field values.
Server-side Integration: Implement an API to save form data and schema on the server. This would allow users to store the form data in a database and retrieve it later.
Drag-and-Drop Enhancements: Improve the drag-and-drop experience by allowing users to reorder fields after they've been added, or to add pre-configured field templates.
Field Dependencies: Support conditional fields where one field’s visibility or requirement depends on the value of another field (e.g., show a text field only if a specific radio button is selected).
Styling and Themes: Enhance the UI by adding themes and better styling options for form elements, making it ready for production use in a variety of projects.


# Summary
This dynamic form builder allows users to create, configure, and preview forms by dragging and dropping field types. It provides basic validation capabilities and outputs a JSON schema based on the selected fields. While the current implementation is simple and effective for small projects, there are several areas for improvement, including more flexible validation and server-side integration.

Link: https://drive.google.com/file/d/1HfWwyGEqK3ok1E_tyhKvIMfB74NrIfD4/view?usp=drive_link