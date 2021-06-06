import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import './css_comps/header_nav.css'
import './css_comps/card.css'
import NavBar from './comps/navbar';
import Home from './comps/home';
import About from './comps/about';
import Page404 from './comps/page404';
import SignUpClient from './comps/signup';
import Login from './comps/login';
import Footer from './comps/footer';
import UserInfo from './comps/userInfo';
import ProtectedRoute from './comps/common/protectedRoute';
import { useEffect, useState } from 'react';
import { updateUserData } from './services/userSer';
import FavoriteCards from './comps/favoriteCards';
import MyCards from './comps/biz/myCards';

function App() {
  let [user,setUser] = useState(null);

  useEffect(() => {
    ifUserLogin()
        
  }, [])

  const ifUserLogin = async() => {
    let data = await updateUserData();
    // במידה ויש טוקן נקבל את כל המידע על היוזר שלנו
    // וגם נבדוק בהתחלה שהיוזר קיבל מידע לפני שנציג את המידע באתר
    setUser(data);
  }
  
  return (
    <Router>
      <header className="container-fluid shadow-sm">
        {/* בצורה הזאת אנחנו מקבלים יכולת לדבר דרך הפרופס
        עם היו אר אל ולראות אם הוא השתנה ובנוסף נוכל לרנדר אותו 
        מחדש כל פעם שיש שינוי ביו אר אל */}
        {/* גם הנאב ממתין שנקבל מידע מהיוזר */}
        { user && <Route path="/" component={NavBar} /> }
      </header>
          {/* לא יציג את המידע עד שלא מקבלים מידע על היוזר */}
      { user &&
      <main className="container" style={{ minHeight: "81vh" }}>
    
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/signup" component={SignUpClient} />
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/userInfo" component={UserInfo}/> */}
          <ProtectedRoute path="/userInfo" comp={UserInfo} />
          <ProtectedRoute path="/favorites" comp={FavoriteCards} />
         {/* bizRoute -> רק עסק יכול להיות בראוט הזה */}
          <ProtectedRoute bizRoute={true} path="/myBizCards" comp={MyCards} />
          <Route path="/" component={Page404} />
        </Switch>
      </main>
      }
      <footer>
        <Footer />
      </footer>
      <ToastContainer />
    </Router>
  );
}

export default App;
