import { Outlet } from "react-router-dom";
import { Header } from "../../Components/header/Header";

export function Root() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}