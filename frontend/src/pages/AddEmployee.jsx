import EmployeeForm from "../components/EmployeeForm";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const navigate = useNavigate();

  const handleAdd = async (data) => {
    await API.post("/employees", data);
    navigate("/");
  };

  return <EmployeeForm submitLabel="Add Employee" onSubmit={handleAdd} />;
}
