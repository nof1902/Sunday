import { HomePage } from './pages/HomePage.jsx'
import { BoardIndex } from './pages/BoardIndex.jsx'
// import { BoardDetails } from './pages/BoardDetails.jsx'

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
        component: <BoardIndex />,
        label: 'Boards List',
    },
    {
        path: '/boards/:id',
        component: <BoardDetails />,
        label: 'Board'
    }
]

export default routes