import { HomePage } from './pages/HomePage.jsx'
import { BoardIndex } from './pages/BoardIndex.jsx'
import { BoardsIndex } from './cmps/BoardsIndex.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'welcome',
    },
    {
        // for meantime
        path: 'board/id',
        component: <BoardIndex />,
        label: 'Board-name',
    },
    {
        path: 'home',
        component: <BoardsIndex />,
        label: 'Home'
    }
]

export default routes