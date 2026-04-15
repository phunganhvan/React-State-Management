import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
const Header = () => {
  const users = useSelector((state: any) => state.user.listUsers);
  const [mode, setMode] = useState("light");

  return (
    <>
      <Navbar className="bg-body-tertiary" data-bs-theme={mode}>
        <Container>
          <Navbar.Brand href="#home">Navbar with text {users.length}</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Form.Check
              value={mode}
              onChange= {(e) => setMode (e.target.value === "light" ? "dark" : "light")}
              type="switch"
              id="custom-switch"
              label={mode === "light" ? <Navbar.Text>Light Mode</Navbar.Text> : <Navbar.Text>Dark Mode</Navbar.Text>}
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default Header;