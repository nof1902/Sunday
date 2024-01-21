import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CHANGE_COUNT } from '../store/user.reducer'


export function HomePage() {
    const dispatch = useDispatch()
    const count = useSelector(storeState => storeState.userModule.count)

    function changeCount(diff) {
        console.log('Changing count by:', diff);
        dispatch({ type: CHANGE_COUNT, diff })
    }

    return (
        <section>
                        {/* <AppHeader />
             <main className='root-cmp-main'> 
                <div className='monday-markup-first'>
                <h1><span>A platform built for a</span><br></br><span>new way of working</span></h1>                
                </div> 
                <div className='monday-markup-second'>
                <h2>What would you like to manage with monday.com Work OS?</h2>              
                </div>    
                <Link to="/home"> not home
                    <button className='btn-started'>Get Started</button>
                </Link>
                <div className='monday-markup-third'>
                <h5>No Credit card needed Unlimited time on free plan</h5>
                </div>     

                <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/uploads/NaamaGros/HP_tests/HP_asset_white_bg.png" alt="" />  
            </main> */}
        </section >
    )
}