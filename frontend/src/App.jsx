import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import EmployeeList from './pages/EmployeeList';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';

export default function App(){
  return (
    <BrowserRouter>
      <div className="container">
        <header className="app-header">
          <div className="brand">
            <div className="logo">EM</div>
            <div>
              <h1>Employee Management</h1>
              <div className="kv">Simple CRUD with Node + Mongo + React</div>
            </div>
          </div>

          <nav className="nav">
            <Link to="/">List</Link>
            <Link to="/add">Add</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/add" element={<AddEmployee />} />
            <Route path="/edit/:id" element={<EditEmployee />} />
          </Routes>
        </main>

        <footer className="footer-note">
          Built with ❤️ • Clean UI • External CSS
        </footer>
      </div>
    </BrowserRouter>
  );
}
