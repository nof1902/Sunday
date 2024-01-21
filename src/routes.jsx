import { HomePage } from './pages/HomePage.jsx'
import { BoardIndex } from './pages/BoardIndex.jsx'
import { BoardsIndex } from './cmps/BoardsIndex.jsx'
import { RootCmp } from './RootCmp.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <RootCmp />,
        label: 'welcome',
    },
    {
        // for meantime
        path: '/workspace/home/board/:id',
        component: <BoardIndex />,
        label: 'Board-name',
    },
    {
        path: '/workspace/home',
        component: <BoardsIndex />,
        label: 'Home'
    }
]

export default routes