import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from './Logo.svg';
import { ReactComponent as Logo } from './Logo.svg';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <Navbar fixed="top" className="nav">
      <Container className="position-relative d-flex justify-content-between align-items-center">
        
        <div></div>

        <Link to="/" style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
          <Logo style={{ height: '73px', width: '120px' }} />
        </Link>

        <div></div>

      </Container>
    </Navbar>
  );
}


export default NavBar;