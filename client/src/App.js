import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate, Outlet } from 'react-router-dom';
import instance from './utils/axios';

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand><Link to={"/"} style={{color: "white", textDecoration: "none"}}>Navbar</Link></Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/post" style={{color: "wheat", textDecoration: "none"}}>Posts</Link>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end d-flex gap-3">
            {
              window.sessionStorage.getItem('user') ? 
              <>
                <Navbar.Text style={{color: "white"}}>
                  Signed in as: <Link to={'/profile'} style={{color: "white"}}>{ JSON.parse(window.sessionStorage.getItem('user')).name + ' ' + JSON.parse(window.sessionStorage.getItem('user')).lastName }</Link>
                </Navbar.Text>
                <Button variant="outline-danger" onClick={() => {
                  window.sessionStorage.removeItem('user');
                  navigate('/');
                }}>Logout</Button>
              </> :
              <>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>SignUp</Link>
            
              </>
            }
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default App;