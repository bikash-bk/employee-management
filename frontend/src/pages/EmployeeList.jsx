import { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function EmployeeList(){
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const q = search ? `?search=${encodeURIComponent(search)}` : '';
      const res = await API.get(`/employees${q}`);
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ fetchEmployees(); }, [search]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      await API.delete(`/employees/${id}`);
      setEmployees(prev => prev.filter(e => e._id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div>
      <div className="card">
        <div className="controls">
          <div className="left">
            <div className="input">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <input placeholder="Search by name, email, department..." value={search} onChange={e=>setSearch(e.target.value)} />
            </div>
            <button className="btn ghost" onClick={()=>{ setSearch(''); fetchEmployees(); }}>Clear</button>
          </div>

          <div className="right">
            <Link to="/add"><button className="btn">+ Add Employee</button></Link>
          </div>
        </div>

        {loading ? <div className="spinner" /> : (
          employees.length === 0 ? (
            <div className="empty">No employees found. Click <strong>Add Employee</strong> to create one.</div>
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(emp => (
                    <tr key={emp._id}>
                      <td>
                        <div style={{display:'flex', flexDirection:'column'}}>
                          <strong>{emp.name}</strong>
                          <span className="kv">Joined: {new Date(emp.createdAt).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td>{emp.email}</td>
                      <td><span className="tag">{emp.department}</span></td>
                      <td>₹{emp.salary?.toLocaleString?.()}</td>
                      <td>
                        <div className="actions">
                          <Link to={`/edit/${emp._id}`}><button className="icon-btn" title="Edit">✏️</button></Link>
                          <button className="icon-btn" title="Delete" onClick={()=>handleDelete(emp._id)}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
}
