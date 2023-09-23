import React from 'react';
import { Navigation } from '../navigation/Navigation';
import { Outlet } from 'react-router-dom';
// import Outlet

export function Root() {
    return (
        <>
            <Navigation/>
            <Outlet />
        </>
    );
};