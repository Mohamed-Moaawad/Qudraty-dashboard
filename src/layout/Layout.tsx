import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { resetSidebar } from "../store/sidebar/sidebarSlice";

import Sidebar from "../components/sidebar/Sidebar";


const Layout = () => {
    const isOpen = useAppSelector(state => state.sidebar.isOpen);

    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(resetSidebar());
    }, [location.pathname, dispatch])

    return (
        <>
            <main>
                <div className={`sidebar-box ${isOpen ? 'open' : 'closed'}`}>
                    <Sidebar />
                </div>
                <div className="outlet-box">
                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default Layout;