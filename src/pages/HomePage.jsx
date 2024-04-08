import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_COUNT } from "../store/reducers/user.reducer";
import { utilService } from "../services/util.service";

export function HomePage() {
    const scrollingRef = useRef(null)
    const [scroll, setScroll] = useState(false)
    const [colors, setColors] = useState(utilService.bringColorArray)

    const isAnyColorActive = colors.some(color => color.active);
    const buttonStyle = isAnyColorActive ? { background: `linear-gradient(to right, ${colors.filter(color => color.active).map(color => color.color).join(',')})` } : null;


    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
          const entry = entries[0]
          if (entry.isIntersecting) {
            setScroll(false)
          } else {
            setScroll(true)
          }
      }, { root: null})

      if (observer) {
          observer.observe(scrollingRef.current);
      }

      return () => {
          if (observer) {
              observer.disconnect();
          }
      };
  }, []);


    function colorFunc(clickedColor) {
      const updatedColors = colors.map(color =>
        color.id === clickedColor.id ? { ...color, active: !color.active } : color
      );
      setColors(updatedColors);
    }

    
  return (
    <section className="home-page">
      <nav className={`${scroll  ? "home-page-nav scrolled-nav" : "home-page-nav"}`}>
        <section className="home-nav-contents">
          <img className="sunday-logo" src="./Images/Full_Logo.png" alt="Sunday logo" />
          
          <Link to="/board">
          <button className="btn-started">
            <span>
              <span>Get Started</span>
              <span className="btn-started-arrow">
                <svg width="12" height="10" viewBox="0 0 9 7" xmlns="http://www.w3.org/2000/svg" ><path fillRule="evenodd" clipRule="evenodd" d="M4.628.616a.5.5 0 1 0-.64.768L6.203 3.23H.5a.5.5 0 0 0 0 1h5.612L3.988 6a.5.5 0 1 0 .64.769l3.23-2.693a.5.5 0 0 0 0-.768L4.628.616z" ></path></svg>
              </span>
            </span>
          </button>
          </Link>
          <div><svg viewBox="0 0 16 17" fill=" rgb(0, 51, 56)" width="23" height="23" aria-hidden="true" className="menu" data-testid="icon"><g fill="currentColor" clipPath="url(#clip0_1898_40324)"><path d="M3.68499 2.71044C3.68499 3.66968 2.90737 4.4473 1.94813 4.4473.988882 4.4473.211262 3.66968.211262 2.71044.211262 1.75119.988882.973572 1.94813.973572 2.90737.973572 3.68499 1.75119 3.68499 2.71044zM9.47453 2.71044C9.47453 3.66968 8.69691 4.4473 7.73767 4.4473 6.77843 4.4473 6.0008 3.66968 6.0008 2.71044 6.0008 1.75119 6.77843.973572 7.73767.973572 8.69691.973572 9.47453 1.75119 9.47453 2.71044zM15.2641 2.71044C15.2641 3.66968 14.4865 4.4473 13.5272 4.4473 12.568 4.4473 11.7904 3.66968 11.7904 2.71044 11.7904 1.75119 12.568.973572 13.5272.973572 14.4865.973572 15.2641 1.75119 15.2641 2.71044zM3.68499 8.49999C3.68499 9.45923 2.90737 10.2368 1.94813 10.2368.988882 10.2368.211262 9.45923.211262 8.49999.211262 7.54074.988882 6.76312 1.94813 6.76312 2.90737 6.76312 3.68499 7.54074 3.68499 8.49999zM3.68499 14.2895C3.68499 15.2488 2.90737 16.0264 1.94813 16.0264.988882 16.0264.211262 15.2488.211262 14.2895.211262 13.3303.988882 12.5527 1.94813 12.5527 2.90737 12.5527 3.68499 13.3303 3.68499 14.2895zM9.47453 14.2895C9.47453 15.2488 8.69691 16.0264 7.73767 16.0264 6.77843 16.0264 6.0008 15.2488 6.0008 14.2895 6.0008 13.3303 6.77843 12.5527 7.73767 12.5527 8.69691 12.5527 9.47453 13.3303 9.47453 14.2895zM15.2641 14.2895C15.2641 15.2488 14.4865 16.0264 13.5272 16.0264 12.568 16.0264 11.7904 15.2488 11.7904 14.2895 11.7904 13.3303 12.568 12.5527 13.5272 12.5527 14.4865 12.5527 15.2641 13.3303 15.2641 14.2895zM9.47453 8.49999C9.47453 9.45923 8.69691 10.2368 7.73767 10.2368 6.77843 10.2368 6.0008 9.45923 6.0008 8.49999 6.0008 7.54074 6.77843 6.76312 7.73767 6.76312 8.69691 6.76312 9.47453 7.54074 9.47453 8.49999zM15.2641 8.49999C15.2641 9.45923 14.4865 10.2368 13.5272 10.2368 12.568 10.2368 11.7904 9.45923 11.7904 8.49999 11.7904 7.54074 12.568 6.76312 13.5272 6.76312 14.4865 6.76312 15.2641 7.54074 15.2641 8.49999z"></path></g><defs><clipPath id="clip0_1898_40324"><path transform="translate(.211 .974)" d="M0 0H15.053V15.053H0z"></path></clipPath></defs></svg></div>
          
          
        </section>
      </nav>
      <div id="loading" style={{ height: '0px' }} ref={scrollingRef}></div>

      <main className="root-cmp-main">
        <section className="main-part">
          <section className="title-main">
            <h1>Your go-to work platform</h1>
            <h2>
              <span>
                Run all your work on one platform with customizable products
                that scale with your needs.
              </span>
            </h2>
          </section>

          <section className="option-tab">
            <section className="monday-tab">
              <img
                className="tab-logo"
                src="https://dapulse-res.cloudinary.com/image/upload/remote_mondaycom_static/uploads/Yotam_Ron/local-031023/wm-dark.png"
              />
              <div className="monday-tab-innertext">
                <span className="upper-innertext">Work Management</span>
                <span className="lower-innertext">Run all aspects of work</span>
              </div>
            </section>
            <section className="monday-tab">
              <img
                className="tab-logo"
                src="https://dapulse-res.cloudinary.com/image/upload/remote_mondaycom_static/uploads/Yotam_Ron/local-031023/crm-dark.png"
              />
              <div className="monday-tab-innertext">
                <span className="upper-innertext">Sales CRM</span>
                <span className="lower-innertext">
                  Streamline sales processes
                </span>
              </div>
            </section>
            <section className="monday-tab">
              <img
                className="tab-logo"
                src="https://dapulse-res.cloudinary.com/image/upload/remote_mondaycom_static/uploads/Yotam_Ron/local-031023/dev-dark.png"
              />
              <div className="monday-tab-innertext">
                <span className="upper-innertext">Dev</span>
                <span className="lower-innertext">Manage product lifecycles</span>
              </div>
            </section>
          </section>

          <section className="monday-square-area">
          {colors.map((color) => (
            <div className={`${color.active ? `square ${color.id} on-active` : `square ${color.id}`}`} key={color.id} onClick={() => colorFunc(color)}>
              <div className="checkbox">
                <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" > <path d="M8.53033 14.2478L8 13.7175L7.46967 14.2478C7.76256 14.5407 8.23744 14.5407 8.53033 14.2478ZM8 12.6569L4.53033 9.18718C4.23744 8.89429 3.76256 8.89429 3.46967 9.18718C3.17678 9.48008 3.17678 9.95495 3.46967 10.2478L7.46967 14.2478L8 13.7175L8.53033 14.2478L16.2478 6.53033C16.5407 6.23743 16.5407 5.76256 16.2478 5.46967C15.955 5.17677 15.4801 5.17677 15.1872 5.46967L8 12.6569Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path> </svg>
              </div>
              <img className="square-image" src={color.src} />
              <span className="square-text">{color.txt}</span>
          </div>
        ))}
          </section>

          <section className="get-started">
            <Link to="/board">
              <button className="btn-started" style={buttonStyle}>
                <span>
                  <span>Get Started</span>
                  <span className="btn-started-arrow">
                    <svg width="16" height="12" viewBox="0 0 9 7" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M4.628.616a.5.5 0 1 0-.64.768L6.203 3.23H.5a.5.5 0 0 0 0 1h5.612L3.988 6a.5.5 0 1 0 .64.769l3.23-2.693a.5.5 0 0 0 0-.768L4.628.616z"></path> </svg>
                  </span>
                </span>
              </button>
            </Link>
            <div className="label-under-btn">
              No credit card needed &nbsp; ✦ &nbsp; Unlimited time on Free plan
            </div>
          </section>
        </section>
      </main>

      <section className='monday-customers-images'>
        <div>
          <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/HoltCat.png" alt="HoltCat image" />
        </div>
        <div>
          <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/canva.png" alt="canva image" />
        </div>
        <div>
          <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/coca_cola.png" alt="coca cola image" />
        </div>
        <div>
          <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/oxy.png" alt="oxy image" />
        </div>
        <div>
          <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/lionsgate.png" alt="lionsgate image" />
        </div>
        <div>
          <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/carrefour.png" alt="carrefour image" />
        </div>
        <div>
          <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/bd.png" alt="bd image" />
        </div>
        <div>
          <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/glossier.png" alt="glossier image" />
        </div>
        <div>
          <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/universal.png" alt="universal image" />
        </div>
    </section>

    </section>
  );
}

