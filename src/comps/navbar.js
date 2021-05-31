import React,{ useState} from 'react';
import { Link } from 'react-router-dom';
function NavBar(props) {
  let [showMobileNav,setShowMobileNav] = useState(false);

  // מעלים את התפריט נאב במצב מובייל לאחר שלחצנו על לינק
  const hideNavMobile = () => {
    setShowMobileNav(false) ;
  }

  return (
    <div className="container nav_top p-2">
      <div className="row align-items-center">
        <div className="logo col-lg-3 d-flex justify-content-between align-items-center">
          <h2 className="text-danger">Cards project</h2>
          <div className="burger" onClick={() => {
            setShowMobileNav(!showMobileNav);
          }}>
            <i className="fa fa-bars fs-2" aria-hidden="true"></i>
          </div>
        </div>
        {/* style -> with condition */}
        <nav onClick={hideNavMobile} className={"col-lg-9 text-end"} style={{ display: showMobileNav && "block" }} >
          <Link  to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
       
        </nav>
      </div>
    </div>
  )
}

export default NavBar