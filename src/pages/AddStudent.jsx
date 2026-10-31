import { useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import { addStudent } from "../services/studentService";

function AddStudent() {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    addStudent(data);
    navigate("/students");
  };

  return (
    <>
      <div className="mb-4">
        <h1 className="page-title">Add student</h1>
        <p className="page-sub">Enter the student's details to add them to the register.</p>
      </div>
      <div className="panel panel-body">
        <StudentForm
          submitLabel="Add student"
          onSubmit={handleSubmit}
          onCancel={() => navigate("/students")}
        />
      </div>
    </>
  );
}

export default AddStudent;
