import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import Header2 from '../components/Header2'
// import { useEffect } from 'react';
function Sellpages({ user }) {
    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (!user) {
    //         return navigate("/unauth");
    //     }
    // }, [user]);
    return (
        <>
            <Header2 />
            <Outlet />
        </>
    );
}

export default Sellpages