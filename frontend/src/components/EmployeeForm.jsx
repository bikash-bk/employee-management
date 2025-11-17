import { useState, useEffect } from "react";

export default function EmployeeForm({ initial, onSubmit, submitLabel }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    salary: ""
  });

  
  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || "",
        email: initial.email || "",
        department: initial.department || "",
        salary: initial.salary || ""
      });
    }
  }, [initial]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      ...form, 
      salary: Number(form.salary) 
    });
  };

  return (
    <form onSubmit={handleSubmit}>

      <div className="form-grid">

        <div className="field">
          <label className="label">Name</label>
          <input
            className="input-field"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter name"
          />
        </div>

        <div className="field">
          <label className="label">Email</label>
          <input
            className="input-field"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>

        <div className="field">
          <label className="label">Department</label>
          <input
            className="input-field"
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Enter department"
          />
        </div>

        <div className="field">
          <label className="label">Salary</label>
          <input
            className="input-field"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            placeholder="Enter salary"
          />
        </div>

      </div>

      <br />

      <button className="btn" type="submit">
        {submitLabel}
      </button>

    </form>
  );
}
