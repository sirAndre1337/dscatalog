import './styles.scss';
const Navbar = () => (
    <nav className="row bg-primary main-nav">
        <div className="col-2">
            <a href="link" className='nav-logo-text'>
                <h4>Ds Catalog</h4>
            </a>
        </div>
        <div className="col-6 offset-2">
            <ul className='main-menu'>
                <li>
                    <a href="home" className='active'> 
                        HOME
                    </a>
                </li>
                <li>
                    <a href="home">
                        CATÁLOGO
                    </a>
                </li>
                <li>
                    <a href="home">
                        ADMIN
                    </a>
                </li>
            </ul>
        </div>
    </nav>
);

export default Navbar;