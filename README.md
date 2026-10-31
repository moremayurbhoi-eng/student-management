# Student Management

A student register built with **React** and **Vite**. Add, edit, delete and search students, and see department and year statistics on a dashboard. Data is saved in the browser (localStorage), so it runs without a backend.


## Features

- **Dashboard** with total students, a count per year, cities represented, and a bar chart of students by department
- **Student register** with search (name, roll number, email, city) and a department filter
- **Add and edit students** with form validation
- **Delete with confirmation** so nothing is removed by accident
- **Sample data** loaded on first run, so the app is never empty
- **Responsive layout** that works on phones, tablets and desktops

## Tech stack

| Area | Tools |
|---|---|
| UI library | React 18 |
| Build tool | Vite 5 |
| Routing | React Router 6 |
| Styling | Bootstrap 5, React-Bootstrap, custom CSS |
| Data | Browser localStorage (swappable for a REST API) |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) version 18 or newer
- npm (comes with Node.js)

Check your versions:

```bash
node -v
npm -v
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/moremayurbhoi-eng/student-management.git

# 2. Go into the project folder
cd student-management

# 3. Install the dependencies
npm install

# 4. Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build in `dist/` |
| `npm run preview` | Previews the production build locally |

## Project structure

```
student-management/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                  # Entry point
    ├── App.jsx                   # Routes
    ├── index.css                 # Styles
    ├── components/
    │   ├── Navbar.jsx            # Top navigation
    │   └── StudentForm.jsx       # Shared add/edit form with validation
    ├── pages/
    │   ├── Dashboard.jsx         # Statistics and recent students
    │   ├── Students.jsx          # Register with search, filter, delete
    │   ├── AddStudent.jsx        # Add form page
    │   └── EditStudent.jsx       # Edit form page
    └── services/
        └── studentService.js     # All data access lives here
```

## Routes

| Path | Page |
|---|---|
| `/` | Dashboard |
| `/students` | Student register |
| `/students/add` | Add a student |
| `/students/edit/:id` | Edit a student |

## Form validation

- Roll number is required and must be unique
- Name and city are required
- Email must be a valid address
- Phone must be exactly 10 digits

## Connecting to a backend

All data access is in one file, `src/services/studentService.js`, so moving to a real API only means changing that file.

1. Install axios:

   ```bash
   npm install axios
   ```

2. Replace the functions with API calls, for example:

   ```js
   import axios from "axios";

   const API = "http://localhost:8080/api/students";

   export const getStudents = () => axios.get(API).then((res) => res.data);
   export const addStudent = (data) => axios.post(API, data);
   export const updateStudent = (id, data) => axios.put(`${API}/${id}`, data);
   export const deleteStudent = (id) => axios.delete(`${API}/${id}`);
   ```

3. Update the pages that call these functions to use `async/await`.

A Spring Boot REST API with endpoints for `GET`, `POST`, `PUT` and `DELETE` on `/api/students` works with this setup.

## Future improvements

- Spring Boot and MySQL backend
- Login and role-based access
- Export the student list to CSV or PDF
- Pagination for large registers
- Student attendance and marks

## Author

**Mayur More**
Java Full Stack Developer, Pune

- GitHub: [moremayurbhoi-eng](https://github.com/moremayurbhoi-eng)
- LinkedIn: [mayur-more](https://www.linkedin.com/in/mayur-more-a6b0b738a/)
- Email: moremayurbhoi@gmail.com
