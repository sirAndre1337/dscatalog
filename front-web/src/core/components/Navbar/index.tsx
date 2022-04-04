import './styles.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getAccessTokenDecode, logout } from 'core/utils/auth';
import menu from 'core/assets/images/menu.svg';


const Navbar = () => {

    const [user, setUser] = useState('');
    const location = useLocation();
    const [drawerActive, setDrawerActive] = useState(false);

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

            <Link to="/" className='nav-logo-text' onClick={() => setDrawerActive(false)}>
                <h4>Ds Catalog</h4>
            </Link>

            <button className="menu-mobile-btn" type='button' onClick={() => setDrawerActive(!drawerActive)}>
                <img src={menu} alt="Mobile Menu" />
            </button>

            <div className={drawerActive ? "menu-mobile-container" : "menu-container"}>
                <ul className='main-menu'>
                    <li>
                        <NavLink className='nav-link' to="/" exact onClick={() => setDrawerActive(false)}>
                            HOME
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className='nav-link' to="/products" onClick={() => setDrawerActive(false)}>
                            CATÁLOGO
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className='nav-link' to="/admin" onClick={() => setDrawerActive(false)}>
                            ADMIN
                        </NavLink>
                    </li>
                    {
                        drawerActive && (
                            <li>
                                {user && (
                                    <a href="#logout" className='nav-link active d-inline'
                                        onClick={(e) => {
                                            setDrawerActive(false);
                                            handleLogout(e);
                                        }}>
                                        {`LOGOUT - ${user}`}
                                    </a>
                                )}
                            </li>
                        )}
                    {
                        drawerActive && (
                            <>
                                {
                                    !user && (
                                        <li>
                                            <Link to="/auth/login" className='nav-link active' onClick={() => setDrawerActive(false)}>
                                                LOGIN
                                            </Link>
                                        </li>
                                    )
                                }
                            </>
                        )
                    }
                </ul>
            </div>
            <div className='user-info-dnone nav-login'>
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