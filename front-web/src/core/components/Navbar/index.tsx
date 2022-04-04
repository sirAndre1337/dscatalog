import './styles.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getAccessTokenDecode, logout } from 'core/utils/auth';


const Navbar = () => {

    const [user,setUser] = useState('');
    const location = useLocation();

    useEffect(() => {
        const userData = getAccessTokenDecode();
        setUser(userData.user_name);
    }, [location]);

    const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        logout();
    }

    return (
        <nav className="bg-primary main-nav">
            
                <Link to="/" className='nav-logo-text'>
                    <h4>Ds Catalog</h4>
                </Link>
           
            <div className="menu-container">
                <ul className='main-menu'>
                    <li>
                        <NavLink className='nav-link' to="/" exact>
                            HOME
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className='nav-link' to="/products">
                            CATÁLOGO
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className='nav-link' to="/admin">
                            ADMIN
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className='nav-login'>
            {user && (
                <>
                        {user}
                    <a
                        href="#logout"
                        className='nav-link active d-inline'
                        onClick={handleLogout}
                        >
                        LOGOUT
                    </a>
                </>
            )}
            {!user && (
                    <Link to="/auth/login" className='nav-link active'>
                        LOGIN
                    </Link>
            )}
            </div>
        </nav>
    )
};

export default Navbar;