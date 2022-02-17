import Navbar from "./components/Navbar";
import { Switch } from 'react-router-dom';
import './styles.scss';
import Products from "./components/Products";
import PrivateRoute from "core/components/Routes/PrivateRoute";

const Admin = () => (
    <div className="admin-container">
        <Navbar />
        <div className="admin-content">
            <Switch>
                <PrivateRoute path="/admin/products">
                    <Products />
                </PrivateRoute>
                <PrivateRoute path="/admin/categories">
                    <h1>categories</h1>
                </PrivateRoute>
                <PrivateRoute path="/admin/users" allowedRoutes={['ROLE_ADMIN']}>
                    <h1>Users</h1>
                </PrivateRoute>
            </Switch>
        </div>
    </div>
);

export default Admin;