import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { DEPARTMENTS, YEARS, rollNoExists } from "../services/studentService";

const EMPTY = {
  rollNo: "",
  name: "",
  email: "",
  phone: "",
  department: DEPARTMENTS[0],
  year: YEARS[0],
  city: "",
};

function StudentForm({ initial, studentId = null, submitLabel, onSubmit, onCancel }) {
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [errors, setErrors] = useState({});

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.rollNo.trim()) e.rollNo = "Enter a roll number.";
    else if (rollNoExists(form.rollNo, studentId)) e.rollNo = "This roll number is already used.";
    if (!form.name.trim()) e.name = "Enter the student's full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Phone number must be 10 digits.";
    if (!form.city.trim()) e.city = "Enter the city.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...form,
        rollNo: form.rollNo.trim(),
        name: form.name.trim(),
        email: form.email.trim(),
        city: form.city.trim(),
      });
    }
  };

  return (
    <Form onSubmit={submit} noValidate>
      <Row className="g-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Roll number</Form.Label>
            <Form.Control name="rollNo" value={form.rollNo} onChange={change} isInvalid={!!errors.rollNo} placeholder="CE101" />
            <Form.Control.Feedback type="invalid">{errors.rollNo}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={8}>
          <Form.Group>
            <Form.Label>Full name</Form.Label>
            <Form.Control name="name" value={form.name} onChange={change} isInvalid={!!errors.name} placeholder="Aarav Patil" />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={form.email} onChange={change} isInvalid={!!errors.email} placeholder="name@example.com" />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control name="phone" value={form.phone} onChange={change} isInvalid={!!errors.phone} placeholder="10-digit mobile number" maxLength={10} />
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group>
            <Form.Label>Department</Form.Label>
            <Form.Select name="department" value={form.department} onChange={change}>
              {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Year</Form.Label>
            <Form.Select name="year" value={form.year} onChange={change}>
              {YEARS.map((y) => <option key={y}>{y}</option>)}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control name="city" value={form.city} onChange={change} isInvalid={!!errors.city} placeholder="Pune" />
            <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex gap-2 mt-4">
        <Button type="submit" className="btn-accent">{submitLabel}</Button>
        <Button type="button" className="btn-line" onClick={onCancel}>Cancel</Button>
      </div>
    </Form>
  );
}

export default StudentForm;
