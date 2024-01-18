import { HomePage } from './pages/HomePage.jsx'
import { BoardIndex } from './pages/BoardIndex.jsx'
import { BoardsIndex } from './cmps/BoardsIndex.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home',
    },
    {
        path: 'home',
        component: <BoardsIndex />,
        label: 'Boards',
    },
    {
        path: 'board',
        component: <BoardIndex />,
        label: 'Board'
    }
]

export default routes