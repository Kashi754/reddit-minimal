import { Outlet } from "react-router-dom";
import { Header } from "../../Components/header/Header";
import './Root.css';

export function Root() {
    return (
        <>
            <Header />
            <div className="body">
                <Outlet />
            </div>
        </>
    )
}