import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { SideNav } from './cmps/SideNav'

//Test commit


export function RootCmp() {

    return (
        <section className='root-cmp'>
            <AppHeader />
             <main className='root-cmp-main'> 
                {/* <SideNav />
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                </Routes> */}
                <div className='monday-markup-first'>
                <h1><span>A platform built for a</span><br></br><span>new way of working</span></h1>                
                </div> 
                <div className='monday-markup-second'>
                <h2>What would you like to manage with monday.com Work OS?</h2>              
                </div>    

                <button className='btn-started'>Get Started</button> 

                <div className='monday-markup-third'>
                <h5>No Credit card needed    Unlimited time on free plan</h5>
                </div>     

                <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/uploads/NaamaGros/HP_tests/HP_asset_white_bg.png" alt="" />  
            </main>
            {/* <AppFooter /> */}
        </section>
    )
}


