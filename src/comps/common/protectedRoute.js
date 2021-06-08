import React from 'react';
import { Route, useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { checkIfUser } from '../../services/authSer';
import { getUserData } from '../../services/userSer';

function ProtectedRoute(props) {
  let history = useHistory();

  const checkTokenUser = async () => {
    let data = await checkIfUser()
    console.log(data);
  
    // בודק אם זה ראוט רק של עסק
    if(props.bizRoute){
      // כדי לבדוק אם המשתמש הוא ביז
      // חייב לשלוף את המידע קודם מהסרבס
      let user = getUserData();
      // בדוק אם המשתמש הוא עסק
      if(!user.biz){
        toast.warning("You must be business");
        history.push("/");
      }
    }

      // אם הכל בסדר אנחנו אמורים
    // לקבל סטטוס
    if (!data.status) {
      toast.error("There problem, log in again");
      // למחוק את הטוקן אם הוא לא תקין
      localStorage.removeItem("tok");
      history.push("/login");
    }
  }

  return (
    <Route exact path={props.path}
      render={() => {
        // בודק אם היוזר מחובר ואם לא משגר אותו בחזרה ללוגאין
        checkTokenUser();
        // {...props} -> כדי שנוכל לאסוף פרופס מקומפניטה שמקבלת פרמטר
        return (<props.comp {...props}  />);
      }} />
  )
}

export default ProtectedRoute;