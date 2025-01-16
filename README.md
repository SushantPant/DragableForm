# Documentation for Dynamic Form Builder

# Setup Instructions
To run the form builder, ensure you have the following installed on your system:
- Node.js
- npm or yarn (Node package manager)

# How to Use
1. Clone the repository:
   git clone https://github.com/SushantPant/DragableForm.git

2. Install necessary packages:
   npm install

3. Start the application:
   npm start

4. Open your browser and visit:
   http://localhost:5173/

 Technology Choices and Rationale

# 1. **React.js**
   - Provides a flexible structure for handling state and rendering UI components efficiently.

# 2. **Formik**
   - Simplifies form state management, validation, and submission.

# 3. **Yup**
   - Integrates seamlessly with Formik for schema-based input validation.

# 4. **React-DnD**
   - Enables drag-and-drop functionality, allowing intuitive field management.

# 5. **HTML5 Backend (react-dnd-html5-backend)**
   - Offers the backend implementation needed by React-DnD to support drag-and-drop interactions in the browser.

# Known Limitations / Trade-offs
- Limited field types currently supported.
- No server-side integration to save form configurations.
- Drag-and-drop functionality does not yet allow reordering of added fields.
- Lacks advanced styling and theme support.

# Future Improvements

# 1. **Add More Field Types**
   - Expand the form builder to support additional field types such as date, checkbox, number, etc.

# 2. **Server-side Integration**
   - Implement an API to save form data and schema on the server. This would allow users to store the form data in a database and retrieve it later.

# 3. **Drag-and-Drop Enhancements**
   - Improve the drag-and-drop experience by allowing users to reorder fields after they've been added.
   - Introduce pre-configured field templates for faster form building.

# 4. **Field Dependencies**
   - Add support for conditional fields where one field’s visibility or requirement depends on the value of another field (e.g., show a text field only if a specific radio button is selected).

# 5. **Styling and Themes**
   - Enhance the UI by adding themes and better styling options for form elements, making it ready for production use in various projects.

# Summary
This dynamic form builder allows users to create, configure, and preview forms by dragging and dropping field types. It provides basic validation capabilities and outputs a JSON schema based on the selected fields. While the current implementation is simple and effective for small projects, there are several areas for improvement, including more flexible validation and server-side integration.

# Resources
- [Demo Video](https://drive.google.com/file/d/1HfWwyGEqK3ok1E_tyhKvIMfB74NrIfD4/view?usp=drive_link)

