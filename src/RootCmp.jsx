import { Routes, Route } from 'react-router'
// import { BoardsIndex } from "./cmps/BoardsIndex";
import { BoardIndex } from "./pages/BoardIndex";
import { MainBoard } from "./pages/MainBoard";
import { HomePage } from "./pages/HomePage";
// import { UserMsg } from "./cmps/UserMsg";

export function RootCmp() {
    
    // return (
    //     <main className="main-app">
    //         <Routes>
    //             <Route path="/" element={<HomePage />} />
    //             <Route path="/workspace/home" element={<MainBoard />}/>
    //             <Route path="/workspace/home/board/:id" element={<BoardIndex />}/>
    //                 {/* <Route path=":id" element={<BoardDetails />} /> */}
    //             {/* </Route>          */}
    //         </Routes>
    //         {/* <UserMsg /> */}
    //     </main>
    // )

    return (
        <main className="main-app">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/boards" element={<MainBoard />}>
                    <Route path=":id" element={<BoardIndex />}/>
                    {/* <Route path=":id" element={<BoardDetails />} /> */}
                </Route>
            </Routes>
            {/* <UserMsg /> */}
        </main>
    )
}