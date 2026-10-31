import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { getStudents, DEPARTMENTS, YEARS } from "../services/studentService";

function Dashboard() {
  const students = getStudents();
  const total = students.length;
  const cities = new Set(students.map((s) => s.city.toLowerCase())).size;
  const recent = [...students].slice(-3).reverse();

  const byDept = DEPARTMENTS.map((d) => ({
    label: d,
    count: students.filter((s) => s.department === d).length,
  }));
  const maxDept = Math.max(1, ...byDept.map((d) => d.count));

  return (
    <>
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-sub">A quick look at the student register.</p>
        </div>
        <Link to="/students/add" className="btn btn-accent">Add student</Link>
      </div>

      <Row className="g-4">
        <Col lg={5}>
          <div className="panel panel-body h-100">
            <div className="total">{total}</div>
            <p className="page-sub mb-4">students enrolled across {DEPARTMENTS.length} departments</p>

            {YEARS.map((y) => (
              <div className="stat-line" key={y}>
                <span>{y}</span>
                <strong>{students.filter((s) => s.year === y).length}</strong>
              </div>
            ))}
            <div className="stat-line">
              <span>Cities represented</span>
              <strong>{cities}</strong>
            </div>
          </div>
        </Col>

        <Col lg={7}>
          <div className="panel h-100">
            <div className="panel-head"><h2 className="h6 m-0">Students by department</h2></div>
            <div className="panel-body">
              {byDept.map((d) => (
                <div className="bar-row" key={d.label}>
                  <span>{d.label}</span>
                  <div className="bar-track" role="img" aria-label={`${d.label}: ${d.count} students`}>
                    <div className="bar-fill" style={{ width: `${(d.count / maxDept) * 100}%` }} />
                  </div>
                  <strong>{d.count}</strong>
                </div>
              ))}
            </div>
          </div>
        </Col>

        <Col xs={12}>
          <div className="panel">
            <div className="panel-head">
              <h2 className="h6 m-0">Recently added</h2>
              <Link to="/students" className="btn btn-line btn-sm">View all students</Link>
            </div>
            {recent.length === 0 ? (
              <div className="empty">No students yet. Add the first one to get started.</div>
            ) : (
              <div className="table-responsive">
                <table className="table register">
                  <tbody>
                    {recent.map((s) => (
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
                        <td>{s.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
