import { Link, useNavigate, useParams } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import { getStudent, updateStudent } from "../services/studentService";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = getStudent(id);

  if (!student) {
    return (
      <div className="panel empty">
        <p>This student could not be found. They may have been deleted.</p>
        <Link to="/students" className="btn btn-accent">Back to students</Link>
      </div>
    );
  }

  const handleSubmit = (data) => {
    updateStudent(id, data);
    navigate("/students");
  };

  return (
    <>
      <div className="mb-4">
        <h1 className="page-title">Edit student</h1>
        <p className="page-sub">Update the details for {student.name}.</p>
      </div>
      <div className="panel panel-body">
        <StudentForm
          initial={student}
          studentId={student.id}
          submitLabel="Save changes"
          onSubmit={handleSubmit}
          onCancel={() => navigate("/students")}
        />
      </div>
    </>
  );
}

export default EditStudent;
