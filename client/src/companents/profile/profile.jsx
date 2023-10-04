import { Nav } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'

const Profile = () => {
    return (
        <div className="container">
            <div className="w-100 d-flex justify-content-between align-items-center mb-3">
                <h1>Profile</h1>
            </div>
            <Nav justify variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Link to="/profile/my-posts">My Posts</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/profile/favorites">Favorites</Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                        Disabled
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <Outlet />
        </div>
    )
}

export default Profile