import { Outlet } from 'react-router-dom';
import './Auth.css';

const Auth = () => {
    return (
        <section className='auth-page'>
            <Outlet />
        </section>
    );
};

export default Auth;