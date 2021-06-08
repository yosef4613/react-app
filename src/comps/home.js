import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet } from '../services/apiSer';

import CardsList from './CardsList';
import PageHeader from './common/pageHeader';
import Pagenation from './common/pagenation';


function Home(props){
  let [cards_ar,setCardsAr] = useState([]);

  useEffect(() => {
    // אופציה לאסוף קווארי סטרינג של מספר העמוד שאנחנו בו
    const quries = new URLSearchParams(window.location.search);
    let page = quries.get("page") ? quries.get("page")-1 : 0;
    // משתמשים ביכולת בצד שרת של איסוף ה5 מעמוד
    let url = API_URL+"/cards?reverse=yes&page="+page;
    doApi(url)
// props.location -> מתשנה שהרואט משתנה למעלה
  },[props.location])

  const doApi = async(_url) => {
    let data = await doApiGet(_url);
    console.log(data);
    setCardsAr(data);
  }


  return(
    <div>
      <PageHeader title="Welcome to home page" />
      {/*  urlOfItemNum-> היו אר אל שמחזיר את כמות הרשומות
      linkTo -> יו אר אל בצד לקוח שישגר אליו כל כפתור
      btnClass -> הקלאס סי אס אס של העיצוב כפתור
      */}
      <Pagenation urlOfItemNum="/cards/totalCards" linkTo="/?page="   />
      <CardsList ar={cards_ar}/>
    </div> 
  )
}

export default Home