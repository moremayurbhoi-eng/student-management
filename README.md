# Student Management (React + Vite)

Add, edit, delete and search students, plus a dashboard with department
and year statistics. Data is saved in the browser (localStorage), so no
backend is needed to run it.

## Install and run (Windows / Mac / Linux)

1. Install Node.js (version 18 or newer) from https://nodejs.org
   Check it:  node -v   and   npm -v
2. Open the project folder in VS Code, then open the terminal (Ctrl + `)
3. Install the packages:
       npm install
4. Start the app:
       npm run dev
5. Open http://localhost:5173 in your browser

## Other commands
- npm run build     Create the production build in /dist
- npm run preview   Preview the production build

## Folder structure
src/
  components/   Navbar.jsx, StudentForm.jsx
  pages/        Dashboard.jsx, Students.jsx, AddStudent.jsx, EditStudent.jsx
  services/     studentService.js  (all data access lives here)
  App.jsx       routes
  main.jsx      entry point
  index.css     styles

## Connect to Spring Boot later
Only src/services/studentService.js needs to change. Install axios
(npm install axios) and replace each function with an API call, for example:
    export const getStudents = () => axios.get("http://localhost:8080/api/students");
Then use async/await in the pages that call it.
