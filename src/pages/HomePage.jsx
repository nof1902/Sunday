import React from 'react'
import { Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CHANGE_COUNT } from '../store/user.reducer'


export function HomePage() {

    return (
        <section className='home-page'>
            <header className="home-page-header">
                <section className='home-header-contents'>
                    <div className='home-header-contents-logo'>
                        <img className='home-header-contents-logo-img' src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/monday-logo-x2.png" alt="monday.com logo" />
                    </div>
                    <div className='home-header-contents-nav'>
                        <div className='home-header-contents-nav-items'>Products</div>
                        <div className='home-header-contents-nav-items'>Teams</div>
                        <div className='home-header-contents-nav-items'>Platform</div>
                        <div className='home-header-contents-nav-items'>Resources</div>
                        <div className='home-header-nav-empty'> </div>  
                        <div className='home-header-contents-nav-items'>Pricing</div>
                        <div className='home-header-contents-nav-items'>Contact sales</div>
                        <div className='home-header-contents-nav-items'>Log in</div> 
                        <button className='btn-started'>Get Started</button>
                    </div>
                </section>
            </header>
            <main className='root-cmp-main'> 
                <div className='monday-markup-first'>
                <h1><span>A platform built for a</span><br></br><span>new way of working</span></h1>                
                </div> 
                <div className='monday-markup-second'>
                <h2>What would you like to manage with monday.com Work OS?</h2>              
                </div>    
                <Link to="/boards">
                    <button className='btn-started'>Get Started</button>
                </Link>
                <div className='monday-markup-third'>
                <h5>No Credit card needed Unlimited time on free plan</h5>
                </div>     

                <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/uploads/NaamaGros/HP_tests/HP_asset_white_bg.png" alt="" />  
            </main>
    </section>
    )
}


/*

    const dispatch = useDispatch()
    const count = useSelector(storeState => storeState.userModule.count)

    function changeCount(diff) {
        console.log('Changing count by:', diff);
        dispatch({ type: CHANGE_COUNT, diff })
    }

*/