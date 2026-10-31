// ============================================================
// Student data service
// Currently stores data in the browser (localStorage) so the app
// works without a backend.
//
// To connect Spring Boot later: replace each function body with an
// axios call, e.g.  api.get("/students")  and make the callers
// use  await.
// ============================================================

const KEY = "students_v1";

export const DEPARTMENTS = [
  "Computer Engineering",
  "Information Technology",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electronics & Telecom",
];

export const YEARS = ["First Year", "Second Year", "Third Year", "Final Year"];

const seed = [
  { id: 1, rollNo: "CE101", name: "Aarav Patil",    email: "aarav.patil@example.com",  phone: "9876543210", department: "Computer Engineering",   year: "Third Year",  city: "Pune" },
  { id: 2, rollNo: "CE102", name: "Sneha Kulkarni", email: "sneha.k@example.com",      phone: "9823456710", department: "Computer Engineering",   year: "Second Year", city: "Nashik" },
  { id: 3, rollNo: "IT201", name: "Rohan Deshmukh", email: "rohan.d@example.com",      phone: "9765432109", department: "Information Technology", year: "Final Year",  city: "Mumbai" },
  { id: 4, rollNo: "ME301", name: "Priya Shinde",   email: "priya.shinde@example.com", phone: "9890123456", department: "Mechanical Engineering", year: "First Year",  city: "Satara" },
  { id: 5, rollNo: "EN401", name: "Kunal Jadhav",   email: "kunal.j@example.com",      phone: "9988776655", department: "Electronics & Telecom",  year: "Third Year",  city: "Pune" },
  { id: 6, rollNo: "CV501", name: "Neha Pawar",     email: "neha.pawar@example.com",   phone: "9345678120", department: "Civil Engineering",      year: "Second Year", city: "Kolhapur" },
];

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(seed));
      return [...seed];
    }
    return JSON.parse(raw);
  } catch {
    return [...seed];
  }
}

function write(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function getStudents() {
  return read();
}

export function getStudent(id) {
  return read().find((s) => String(s.id) === String(id)) || null;
}

export function rollNoExists(rollNo, ignoreId = null) {
  return read().some(
    (s) =>
      s.rollNo.toLowerCase() === rollNo.trim().toLowerCase() &&
      String(s.id) !== String(ignoreId)
  );
}

export function addStudent(data) {
  const list = read();
  const nextId = list.length ? Math.max(...list.map((s) => s.id)) + 1 : 1;
  const student = { ...data, id: nextId };
  write([...list, student]);
  return student;
}

export function updateStudent(id, data) {
  const list = read().map((s) =>
    String(s.id) === String(id) ? { ...s, ...data, id: s.id } : s
  );
  write(list);
}

export function deleteStudent(id) {
  write(read().filter((s) => String(s.id) !== String(id)));
}
