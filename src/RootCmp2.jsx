import { RootCmp } from "./RootCmp";
import { Routes, Route } from 'react-router'
import { BoardsIndex } from "./cmps/BoardsIndex";
import { BoardIndex } from "./pages/BoardIndex";
import { MainBoard } from "./pages/MainBoard";
// import { UserMsg } from "./cmps/UserMsg";

export function RootCmp2() {
    
    return (
        <main className="main-app">
            <Routes>
                <Route path="/" element={<RootCmp />} />
                <Route path="/workspace/home" element={<MainBoard />}/>
                <Route path="/workspace/home/board/:id" element={<BoardIndex />}>
                    {/* <Route path=":id" element={<BoardDetails />} /> */}
                </Route>         
            </Routes>
            {/* <UserMsg /> */}
        </main>
    )
}