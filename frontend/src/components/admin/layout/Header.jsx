
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import './Header.scss'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useEffect } from 'react';

function Header() {

    const Navigate = useNavigate();
    const { user, logout } = useAuth();

    const redirects = {
        home: () => Navigate('/home'),
        stations: () => Navigate('/admin/dashboard/stations'),
        contact: () => Navigate('/contactus'),
    }

    return (
        <Navbar fluid rounded>
            <Navbar.Brand>
                {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="TrailBlaze Logo" /> */}
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">TrailBlaze</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">{user.username}</span>
                        <span className="block truncate text-sm font-medium">{user.email}</span>
                        <span className="block truncate text-xs">{user.balance} €</span>
                    </Dropdown.Header>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => logout()}>Sign out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link onClick={redirects.home} active>
                    Home
                </Navbar.Link>
                <Navbar.Link href="#">About</Navbar.Link>
                <Navbar.Link href="#">Services</Navbar.Link>
                <Navbar.Link href="#">Pricing</Navbar.Link>
                <Navbar.Link onClick={redirects.contact}>Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header