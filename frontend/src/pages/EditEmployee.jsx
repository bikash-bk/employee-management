import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import EmployeeForm from "../components/EmployeeForm";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    API.get(`/employees/${id}`).then((res) => setEmp(res.data));
  }, [id]);

  const handleUpdate = async (data) => {
    await API.put(`/employees/${id}`, data);
    navigate("/");
  };

  if (!emp) return <p>Loading...</p>;

  return (
    <EmployeeForm
      initial={emp}
      onSubmit={handleUpdate}
      submitLabel="Update Employee"
    />
  );
}
