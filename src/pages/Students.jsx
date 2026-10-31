import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Modal, Button, Row, Col } from "react-bootstrap";
import {
  getStudents,
  deleteStudent,
  DEPARTMENTS,
} from "../services/studentService";

function Students() {
  const [students, setStudents] = useState(getStudents());
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");
  const [toDelete, setToDelete] = useState(null);
  const [notice, setNotice] = useState("");

  const q = search.trim().toLowerCase();
  const filtered = students.filter((s) => {
    const matchText =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.rollNo.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q);
    const matchDept = dept === "All" || s.department === dept;
    return matchText && matchDept;
  });

  const confirmDelete = () => {
    deleteStudent(toDelete.id);
    setStudents(getStudents());
    setNotice(`${toDelete.name} was deleted.`);
    setToDelete(null);
    setTimeout(() => setNotice(""), 3500);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
        <div>
          <h1 className="page-title">Students</h1>
          <p className="page-sub">{students.length} in the register</p>
        </div>
        <Link to="/students/add" className="btn btn-accent">Add student</Link>
      </div>

      {notice && <div className="alert alert-success py-2" role="status">{notice}</div>}

      <div className="panel">
        <div className="panel-head">
          <Row className="g-2 w-100">
            <Col md={7}>
              <Form.Control
                type="search"
                placeholder="Search by name, roll number, email or city"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search students"
              />
            </Col>
            <Col md={5}>
              <Form.Select value={dept} onChange={(e) => setDept(e.target.value)} aria-label="Filter by department">
                <option value="All">All departments</option>
                {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
              </Form.Select>
            </Col>
          </Row>
        </div>

        {filtered.length === 0 ? (
          <div className="empty">
            {students.length === 0
              ? "The register is empty. Add your first student."
              : "No students match your search. Try a different name or department."}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table register">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Contact</th>
                  <th>City</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <span className="avatar">{s.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</span>
                        <div>
                          <div className="fw-semibold">{s.name}</div>
                          <div className="roll">{s.rollNo}</div>
                        </div>
                      </div>
                    </td>
                    <td>{s.department}</td>
                    <td><span className="tag">{s.year}</span></td>
                    <td>
                      <div>{s.email}</div>
                      <div className="roll">{s.phone}</div>
                    </td>
                    <td>{s.city}</td>
                    <td className="text-end text-nowrap">
                      <Link to={`/students/edit/${s.id}`} className="btn btn-line btn-sm me-2">Edit</Link>
                      <Button className="btn-danger-line btn-sm" onClick={() => setToDelete(s)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal show={!!toDelete} onHide={() => setToDelete(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="h5">Delete this student?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {toDelete && <>This removes <strong>{toDelete.name}</strong> ({toDelete.rollNo}) from the register. You can't undo this.</>}
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-line" onClick={() => setToDelete(null)}>Keep student</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete student</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Students;
