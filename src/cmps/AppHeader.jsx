import { Link, NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'

export function AppHeader() {


    return (
        <section className='header-workspace'>
            <section className='hover-back'>
                <svg viewBox="0 0 16 17" fill=" rgb(0, 51, 56)" width="18" height="18" aria-hidden="true" className="menu" data-testid="icon"><g fill="currentColor" clipPath="url(#clip0_1898_40324)"><path d="M3.68499 2.71044C3.68499 3.66968 2.90737 4.4473 1.94813 4.4473.988882 4.4473.211262 3.66968.211262 2.71044.211262 1.75119.988882.973572 1.94813.973572 2.90737.973572 3.68499 1.75119 3.68499 2.71044zM9.47453 2.71044C9.47453 3.66968 8.69691 4.4473 7.73767 4.4473 6.77843 4.4473 6.0008 3.66968 6.0008 2.71044 6.0008 1.75119 6.77843.973572 7.73767.973572 8.69691.973572 9.47453 1.75119 9.47453 2.71044zM15.2641 2.71044C15.2641 3.66968 14.4865 4.4473 13.5272 4.4473 12.568 4.4473 11.7904 3.66968 11.7904 2.71044 11.7904 1.75119 12.568.973572 13.5272.973572 14.4865.973572 15.2641 1.75119 15.2641 2.71044zM3.68499 8.49999C3.68499 9.45923 2.90737 10.2368 1.94813 10.2368.988882 10.2368.211262 9.45923.211262 8.49999.211262 7.54074.988882 6.76312 1.94813 6.76312 2.90737 6.76312 3.68499 7.54074 3.68499 8.49999zM3.68499 14.2895C3.68499 15.2488 2.90737 16.0264 1.94813 16.0264.988882 16.0264.211262 15.2488.211262 14.2895.211262 13.3303.988882 12.5527 1.94813 12.5527 2.90737 12.5527 3.68499 13.3303 3.68499 14.2895zM9.47453 14.2895C9.47453 15.2488 8.69691 16.0264 7.73767 16.0264 6.77843 16.0264 6.0008 15.2488 6.0008 14.2895 6.0008 13.3303 6.77843 12.5527 7.73767 12.5527 8.69691 12.5527 9.47453 13.3303 9.47453 14.2895zM15.2641 14.2895C15.2641 15.2488 14.4865 16.0264 13.5272 16.0264 12.568 16.0264 11.7904 15.2488 11.7904 14.2895 11.7904 13.3303 12.568 12.5527 13.5272 12.5527 14.4865 12.5527 15.2641 13.3303 15.2641 14.2895zM9.47453 8.49999C9.47453 9.45923 8.69691 10.2368 7.73767 10.2368 6.77843 10.2368 6.0008 9.45923 6.0008 8.49999 6.0008 7.54074 6.77843 6.76312 7.73767 6.76312 8.69691 6.76312 9.47453 7.54074 9.47453 8.49999zM15.2641 8.49999C15.2641 9.45923 14.4865 10.2368 13.5272 10.2368 12.568 10.2368 11.7904 9.45923 11.7904 8.49999 11.7904 7.54074 12.568 6.76312 13.5272 6.76312 14.4865 6.76312 15.2641 7.54074 15.2641 8.49999z"></path></g><defs><clipPath id="clip0_1898_40324"><path transform="translate(.211 .974)" d="M0 0H15.053V15.053H0z"></path></clipPath></defs></svg>
            </section>
            <svg viewBox="0 0 40 40" fill=" rgb(50, 51, 56)" width="27" height="27" aria-hidden="true" className="flower" data-testid="topbar-icon"><g clipPath="url(#clip0_1150_158978)"><path d="M20.3812 4.62863C20.3812 2.47439 18.6357 0.728027 16.4826 0.728027C14.3294 0.728027 12.584 2.47439 12.584 4.62863V8.91568C12.584 11.0699 14.3294 12.8163 16.4826 12.8163C18.6357 12.8163 20.3812 11.0699 20.3812 8.91568V4.62863Z" fill="url(#paint0_linear_1150_158978)"></path><path d="M5.11916 10.0994C3.07035 9.43366 0.870087 10.554 0.204732 12.6018C-0.460623 14.6495 0.660888 16.8492 2.7097 17.5149L6.78692 18.8397C8.83573 19.5054 11.036 18.385 11.7013 16.3373C12.3667 14.2895 11.2452 12.0898 9.19638 11.4241L5.11916 10.0994Z" fill="url(#paint1_linear_1150_158978)"></path><path d="M5.59794 26.3042C4.33171 28.0471 4.71733 30.4859 6.45925 31.7514C8.20117 33.017 10.6398 32.6301 11.906 30.8873L14.4259 27.419C15.6921 25.6762 15.3065 23.2374 13.5646 21.9718C11.8226 20.7062 9.38404 21.0931 8.1178 22.8359L5.59794 26.3042Z" fill="url(#paint2_linear_1150_158978)"></path><path d="M21.1629 30.8429C22.4291 32.5858 24.8677 32.9726 26.6096 31.7071C28.3516 30.4415 28.7372 28.0027 27.471 26.2599L24.9511 22.7916C23.6849 21.0488 21.2463 20.6619 19.5043 21.9275C17.7624 23.193 17.3768 25.6318 18.643 27.3747L21.1629 30.8429Z" fill="url(#paint3_linear_1150_158978)"></path><path d="M16.5188 21.7056C18.6553 21.7056 20.3872 19.9736 20.3872 17.8372 20.3872 15.7007 18.6553 13.9688 16.5188 13.9688 14.3823 13.9688 12.6504 15.7007 12.6504 17.8372 12.6504 19.9736 14.3823 21.7056 16.5188 21.7056zM3.89332 17.6821C6.04138 17.6821 7.78273 15.9408 7.78273 13.7927 7.78273 11.6447 6.04138 9.90332 3.89332 9.90332 1.74526 9.90332.00390625 11.6447.00390625 13.7927.00390625 15.9408 1.74526 17.6821 3.89332 17.6821zM16.4803 8.49289C18.6322 8.49289 20.3767 6.74844 20.3767 4.59654 20.3767 2.44465 18.6322.700195 16.4803.700195 14.3284.700195 12.584 2.44465 12.584 4.59654 12.584 6.74844 14.3284 8.49289 16.4803 8.49289zM8.75854 32.5044C10.9141 32.5044 12.6616 30.7569 12.6616 28.6013 12.6616 26.4457 10.9141 24.6982 8.75854 24.6982 6.60293 24.6982 4.85547 26.4457 4.85547 28.6013 4.85547 30.7569 6.60293 32.5044 8.75854 32.5044zM24.3244 32.4656C26.4753 32.4656 28.2191 30.7219 28.2191 28.571 28.2191 26.42 26.4753 24.6763 24.3244 24.6763 22.1734 24.6763 20.4297 26.42 20.4297 28.571 20.4297 30.7219 22.1734 32.4656 24.3244 32.4656z" fill="#6161FF"></path><path d="M27.8808 10.0984C29.9296 9.43268 32.1299 10.5531 32.7953 12.6008C33.4606 14.6486 32.3391 16.8482 30.2903 17.5139L26.2131 18.8387C24.1643 19.5044 21.964 18.384 21.2987 16.3363C20.6333 14.2885 21.7548 12.0888 23.8036 11.4231L27.8808 10.0984Z" fill="url(#paint4_linear_1150_158978)"></path><path d="M29.1028 17.6807C26.9547 17.6807 25.2134 15.9393 25.2134 13.7913C25.2134 11.6432 26.9547 9.90186 29.1028 9.90186C31.2508 9.90186 32.9922 11.6432 32.9922 13.7913C32.9922 15.9393 31.2508 17.6807 29.1028 17.6807Z" fill="#6161FF"></path></g><defs><linearGradient id="paint0_linear_1150_158978" x1="16.457" y1="-6.763" x2="16.543" y2="13.595" gradientUnits="userSpaceOnUse"><stop offset=".411" stopColor="#6C6CFF" stopOpacity=".9"></stop><stop offset="1" stopColor="#6C6CFF" stopOpacity=".2"></stop></linearGradient><linearGradient id="paint1_linear_1150_158978" x1="-6.928" y1="10.311" x2="12.461" y2="16.521" gradientUnits="userSpaceOnUse"><stop offset=".411" stopColor="#6C6CFF" stopOpacity=".9"></stop><stop offset="1" stopColor="#6C6CFF" stopOpacity=".2"></stop></linearGradient><linearGradient id="paint2_linear_1150_158978" x1="2.077" y1="37.827" x2="13.974" y2="21.306" gradientUnits="userSpaceOnUse"><stop offset=".411" stopColor="#6C6CFF" stopOpacity=".9"></stop><stop offset="1" stopColor="#6C6CFF" stopOpacity=".2"></stop></linearGradient><linearGradient id="paint3_linear_1150_158978" x1="31.034" y1="37.753" x2="18.998" y2="21.333" gradientUnits="userSpaceOnUse"><stop offset=".411" stopColor="#6C6CFF" stopOpacity=".9"></stop><stop offset="1" stopColor="#6C6CFF" stopOpacity=".2"></stop></linearGradient><linearGradient id="paint4_linear_1150_158978" x1="39.928" y1="10.31" x2="20.539" y2="16.52" gradientUnits="userSpaceOnUse"><stop offset=".411" stopColor="#6C6CFF" stopOpacity=".9"></stop><stop offset="1" stopColor="#6C6CFF" stopOpacity=".2"></stop></linearGradient><clipPath id="clip0_1150_158978"><path fill="#fff" d="M0 0H33V33H0z"></path></clipPath></defs></svg>
            <h1><span>monday</span>
            <span className="light"> work management</span></h1>
            <section className='hover-back'>
                <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true" className="invite-person"><path d="M7.27093 2.34404C7.7399 2.14979 8.24254 2.0498 8.75015 2.0498C9.25776 2.0498 9.7604 2.14979 10.2294 2.34404C10.6983 2.53829 11.1245 2.82302 11.4834 3.18195C11.8423 3.54088 12.127 3.967 12.3213 4.43597C12.5156 4.90494 12.6155 5.40758 12.6155 5.91519C12.6155 6.4228 12.5156 6.92544 12.3213 7.39441C12.127 7.86338 11.8423 8.28949 11.4834 8.64843C11.1245 9.00736 10.6983 9.29208 10.2294 9.48634C9.7604 9.68059 9.25776 9.78057 8.75015 9.78057C8.24254 9.78057 7.7399 9.68059 7.27093 9.48634C6.80196 9.29209 6.37584 9.00736 6.01691 8.64843C5.65798 8.28949 5.37325 7.86338 5.179 7.39441C4.98475 6.92544 4.88477 6.4228 4.88477 5.91519C4.88477 5.40758 4.98475 4.90494 5.179 4.43597C5.37325 3.967 5.65798 3.54088 6.01691 3.18195C6.37584 2.82302 6.80196 2.53829 7.27093 2.34404ZM8.75015 3.5498C8.43952 3.5498 8.13194 3.61099 7.84496 3.72986C7.55797 3.84873 7.29722 4.02296 7.07757 4.24261C6.85792 4.46226 6.68369 4.72301 6.56482 5.01C6.44595 5.29698 6.38477 5.60456 6.38477 5.91519C6.38477 6.22582 6.44595 6.5334 6.56482 6.82038C6.68369 7.10736 6.85792 7.36812 7.07757 7.58777C7.29722 7.80742 7.55798 7.98165 7.84496 8.10052C8.13194 8.21939 8.43952 8.28057 8.75015 8.28057C9.06078 8.28057 9.36836 8.21939 9.65534 8.10052C9.94232 7.98165 10.2031 7.80742 10.4227 7.58777C10.6424 7.36812 10.8166 7.10736 10.9355 6.82038C11.0544 6.5334 11.1155 6.22582 11.1155 5.91519C11.1155 5.60456 11.0544 5.29698 10.9355 5.01C10.8166 4.72301 10.6424 4.46226 10.4227 4.24261C10.2031 4.02296 9.94233 3.84873 9.65534 3.72986C9.36836 3.61099 9.06078 3.5498 8.75015 3.5498Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path><path d="M8.33935 10.7312C8.3512 10.7307 8.36306 10.7305 8.37491 10.7305H9.12469C9.13838 10.7305 9.15198 10.7308 9.1655 10.7314 9.7888 10.7566 10.4024 10.8595 10.9888 11.0353 11.4913 11.1859 11.4963 11.8685 11.0942 12.2054 10.9063 12.3628 10.6558 12.4142 10.4202 12.3465 9.99646 12.2249 9.55476 12.1529 9.10634 12.1337H8.39335C7.53853 12.1703 6.70811 12.3988 5.97999 12.7977 5.24701 13.1992 4.64204 13.7602 4.22255 14.4273 3.80542 15.0907 3.58548 15.8372 3.58328 16.5965H9.12469L9.12963 16.5965H9.21466C9.47166 16.5965 9.69353 16.7699 9.78802 17.0089 9.96102 17.4465 9.67351 17.9997 9.203 17.9997H9.12509L9.12014 17.9997H2.79163C2.35443 17.9997 2 17.6856 2 17.2981V16.6097C1.9997 15.6068 2.2887 14.6203 2.83955 13.7443 3.39044 12.8682 4.18491 12.1314 5.14751 11.6041 6.1101 11.0767 7.20884 10.7762 8.33935 10.7312zM14.7002 11.5C15.1144 11.5 15.4502 11.8358 15.4502 12.25V14H17.2002C17.6144 14 17.9502 14.3358 17.9502 14.75 17.9502 15.1642 17.6144 15.5 17.2002 15.5H15.4502V17.25C15.4502 17.6642 15.1144 18 14.7002 18 14.286 18 13.9502 17.6642 13.9502 17.25V15.5H12.2002C11.786 15.5 11.4502 15.1642 11.4502 14.75 11.4502 14.3358 11.786 14 12.2002 14H13.9502V12.25C13.9502 11.8358 14.286 11.5 14.7002 11.5z" fill="currentColor"></path></svg>
            </section>
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