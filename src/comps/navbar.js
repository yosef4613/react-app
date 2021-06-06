import React, { useEffect, useState } from 'react';
import { Link , useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserData, updateUserData } from '../services/userSer';
function NavBar(props) {
  let [showMobileNav, setShowMobileNav] = useState(false);
  let history = useHistory()

  // מעלים את התפריט נאב במצב מובייל לאחר שלחצנו על לינק
  const hideNavMobile = () => {
    setShowMobileNav(false);
  }

  const logOut = async() => {
    // alert("log out");
    localStorage.removeItem("tok");
    // מעדכן שאין פרטים על היוזר לאחר שעשינו לוג אאוט
     updateUserData();
    history.push("/login");
    toast.info("You logged out from system !");
    
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
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          {!localStorage["tok"] ?
            <React.Fragment>
              <Link to="/login">Log in</Link>
              <Link to="/signup">Sign up</Link>
            </React.Fragment>
            :
            <React.Fragment>
              <Link to="/userInfo">User info</Link>
              <Link to="/favorites">My Favorites</Link>
              <Link onClick={logOut} to="#" className="text-danger">Log out</Link>
            </React.Fragment>
          }
       
        </nav>
      </div>
    </div>
  )
}

export default NavBar