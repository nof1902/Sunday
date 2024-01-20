import { Link, NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'
import routes from '../routes'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch(err) {
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch(err) {
            showErrorMsg('Cannot signup')
        }
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch(err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <header className="app-header">
            <section className='app-header-contents'>
                <div className='app-header-contents-logo'>
                    <img className='app-header-contents-logo-img' src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/monday-logo-x2.png" alt="monday.com logo" />
                </div>
                <div className='app-header-contents-nav'>
                    <div className='app-header-contents-nav-items'>Products</div>
                    <div className='app-header-contents-nav-items'>Teams</div>
                    <div className='app-header-contents-nav-items'>Platform</div>
                    <div className='app-header-contents-nav-items'>Resources</div>
                    <div className='app-header-nav-empty'> </div>  
                    <div className='app-header-contents-nav-items'>Pricing</div>
                    <div className='app-header-contents-nav-items'>Contact sales</div>
                    <div className='app-header-contents-nav-items'>Log in</div> 
                    <button className='btn-started'>Get Started</button>
                </div>
            </section>
        </header>
    )
}