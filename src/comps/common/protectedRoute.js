import React from 'react';
import { Route, useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { checkIfUser } from '../../services/authSer';

function ProtectedRoute(props) {
  let history = useHistory();

  const checkTokenUser = async () => {
    let data = await checkIfUser()
    console.log(data);
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
        return (<props.comp />);
      }} />
  )
}

export default ProtectedRoute;