import { Routes, Route } from 'react-router'
import { BoardIndex } from "./pages/BoardIndex";
import { HomePage } from "./pages/HomePage";
import { BoardDetails } from './pages/BoardDetails';
// import { UserMsg } from "./cmps/UserMsg";

export function RootCmp() {

    return (
        <main className="main-app">
            {/* <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/boards" element={<BoardIndex />}>
                    <Route path=":id" element={<BoardDetails />}/>
                </Route>
            </Routes> */}
            {/* <UserMsg /> */}
        </main>
    )
}