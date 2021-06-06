import React, { useEffect, useState } from 'react';
import { getUserData, removeUserCardFav, updateUserCardsAddFav } from '../services/userSer';

function CardsList(props) {

  let [userData, setUserData] = useState();
  let [update,forceUpdate] = useState(1)

  useEffect(() => {
    // בודק מידע על היוזר
    // יעזור לנו להבין למשל במקרה שלה הקומפנינטה למה הוא
    // עשה כבר פייבוריט ולמה לא
    setUserData(getUserData());
  }, [])


  const showBtnFav = (item) => {
    // אם במקרה הביז נאמבר מופיע במאפיין קארד של היוזר 
    // יוצג כפתור צהוב להסרת פייבוריט
    if (!userData.cards.includes(item.bizNumber)) {
      return (
        <button onClick={async () => {
          // מעדכן את המערך קארדס בקולקשן יוזר
          await updateUserCardsAddFav(item.bizNumber);
          // מעדכן סטייט של הקומפ שמחייב אותו לרנדר את עצמו מחדש
          // וככה הוא משנה את הסטטוס של הכפתור בתצוגה
          // forceupdate -> פונקציה שאנחנו יצרנו עם יוז סטייט
          forceUpdate(update + 1);
        
        }} className="btn btn-success">+ fav</button>
      )
    }
    else {
      return (<button onClick={async() => {
        await removeUserCardFav(item.bizNumber)
        forceUpdate(update+1);
      }}  className="btn btn-warning">- fav</button>)
    }
  }

  return (
    <div className="row">
      {props.ar.map(item => {
        // ? -> אם המאפיין לא קיים שלא יתייחס
        let bg = item.bizImage?.length > 2 ? item.bizImage : '/images/default.jpg'
        return (
          <div key={item._id} className="col-lg-4 p-3">
            <div className="border">
              {/* הגדרות עיצוב נמצאות בקובץ card.css */}
              <div className="biz_img" style={{
                backgroundImage: `url(${bg})`
              }} >

              </div>
              <article className="p-3">
                <h2>{item.bizName}</h2>
                <p>{item.bizDescription}</p>
                <hr />
                <div><strong>Phone:</strong> {item.bizPhone}</div>
                <div><strong>Address:</strong> {item.bizAddress}</div>
                <div><strong>Biz number:</strong> {item.bizNumber}</div>
                {userData._id ? showBtnFav(item) :
                  <small className="text text-danger">* log in to add to favorite</small>}
              </article>
            </div>
          </div>
        )
      })}
    </div>

  )
}

export default CardsList



{/* <div className="col-lg-4 p-3">
        <div className="p-2 border">
          <div className="biz_img" style={{ backgroundImage: `url(../images/default.jpg)` }} >

          </div>
          <h2>{prop}</h2>
        </div>
      </div> */}