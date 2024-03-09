export function Login() {

    function handleChange (ev) {
        console.log ("event on",ev.target.name )
    }

    return (
        <div>
            <section className="login-header">
        <img className="login-header-logo"  src="https://cdn.monday.com/images/logos/monday_logo_short.png" alt="monday logo"/>   
        </section>

        <div className="login-container">  
                <div className="login-input-group">
                <h1 className="login-title">Login to your account</h1>
                <br />
                <label className="login-second-title">Enter your work email address</label>
                </div>
            
            
            <form>
            <div className="login-input-group">
            <input className="login-email" type="text" placeholder="Example@company.com" name="username" onChange={handleChange}></input>
            </div>
            <div className="login-input-group">
            <input className="login-password" type="password" name="userpassword" onChange={handleChange}></input>
            </div>
            <div className="login-input-group">
                <button className="btn-login" >Login</button>
            </div>  
            </form>
            <span className="seperator-line"></span>
            <h2 className="login-alt-login">Or Sign-in with</h2>
            <span className="seperator-line"></span>
            <button>Google</button>
            <label>Don't have an account yet ?</label>

            
        </div>
        </div>
        
        
    


    )
    
}