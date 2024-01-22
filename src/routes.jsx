import { HomePage } from './pages/HomePage.jsx'
import { BoardIndex } from './pages/BoardIndex.jsx'
import { BoardsIndex } from './cmps/BoardsIndex.jsx'
import { MainBoard } from './pages/MainBoard.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'HomePage',
    },
    {
        // for meantime
        path: '/boards',
        component: <MainBoard />,
        label: 'Boards List',
    },
    {
        path: '/boards/:id',
        component: <BoardIndex />,
        label: 'Board'
    }
]

export default routes