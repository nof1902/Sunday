import { Link, NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'
import routes from '../routes'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'

export function AppHeader() {


    return (
        <section className='header-workspace'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grip"><circle cx="12" cy="5" r="1"/><circle cx="19" cy="5" r="1"/><circle cx="5" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="12" cy="19" r="1"/><circle cx="19" cy="19" r="1"/><circle cx="5" cy="19" r="1"/></svg>
            <h1>monday <span>work management</span> </h1>
            
        </section>
    )
}







// const user = useSelector(storeState => storeState.userModule.user)

// async function onLogin(credentials) {
//     try {
//         const user = await login(credentials)
//         showSuccessMsg(`Welcome: ${user.fullname}`)
//     } catch(err) {
//         showErrorMsg('Cannot login')
//     }
// }
// async function onSignup(credentials) {
//     try {
//         const user = await signup(credentials)
//         showSuccessMsg(`Welcome new user: ${user.fullname}`)
//     } catch(err) {
//         showErrorMsg('Cannot signup')
//     }
// }
// async function onLogout() {
//     try {
//         await logout()
//         showSuccessMsg(`Bye now`)
//     } catch(err) {
//         showErrorMsg('Cannot logout')
//     }
// }