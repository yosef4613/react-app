import { toast } from "react-toastify";
import { API_URL, doApiMethod } from "./apiSer";

let user = {};


export const updateUserData = async () => {
  if (localStorage["tok"]) {
    // אם יש טוקן מנסים להוציא את המידע
    // על המשתמש ככה שנוכל בכל מקום לשלוף אותו
    // של המשתמש במידה והטוקן לא תקין
    // נשלח אותו ללוג אין
    let url = API_URL + "/users/userInfo";
    try{
      let data = await doApiMethod(url,"GET");
      if(data._id){
        user = data
      }
      else{
        localStorage.removeItem("tok");
        user = {}
      }
      return user
    }
    catch(err){
      localStorage.removeItem("tok");
      user = {};
      return user
    }
  }
  // אם לא קיים טוקן
  else{
    user = {}
    return user;
  }
}



export const getUserData = () => {
  return user;
}

// פונקציה שמעדכנת את המערך קארדס של היוזר שהוא עשה להם פייבורייט
export const updateUserCardsAddFav = async(_bizCardNumber) => {
  // אני אמנע מצב שיש פעמיים את אותו תא במערך
  let temp_ar  = [...user.cards,_bizCardNumber];
  // Set -> מייצר אובייקט שדואג שלא יהיה מצב שיש פעמיים תא מסויים
   temp_ar = new Set([...temp_ar]);
  user.cards.splice(0, user.cards.length, ...temp_ar);
  
  let url = API_URL+"/users/cards"
  try{

    let data = await doApiMethod(url,"PATCH",{cards:user.cards});
     // אם יש הצלחה נקבל מהשרת אן שווה 1
    if(data.n == 1){
      toast.success("Cards fav update")
    }
    return data;
  }
  catch(err){
    console.log(err)
    toast.error("There problem , try again later !")
    throw err
  }
}

// מוריד כרטיס מהפייבורייט
export const removeUserCardFav = async(_bizCardNumber) => {
  // יחזיר לטמפ את כל הכרטיסים חוץ ממי שאנחנו רוצים להוריד
  let temp_ar  = user.cards.filter(item => item != _bizCardNumber)
  user.cards.splice(0, user.cards.length, ...temp_ar);
  
  let url = API_URL+"/users/cards"
  try{

    let data = await doApiMethod(url,"PATCH",{cards:user.cards});
     // אם יש הצלחה נקבל מהשרת אן שווה 1
    if(data.n == 1){
      toast.warning("Cards fav removed")
    }
    return data;
  }
  catch(err){
    console.log(err)
    toast.error("There problem , try again later !")
    throw err
  }
}