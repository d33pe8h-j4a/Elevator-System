import "./App.css";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";
import useRequestProcess from "./hooks/useRequestProcess";

function App() {
    useRequestProcess();
    return (
        <>
            <Header />
            <main className="content">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default App;
