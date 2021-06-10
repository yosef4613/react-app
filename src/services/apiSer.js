import axios from "axios"
// שנעלה לשרת יתחליף לכתובת של השרת
let myApi = "http://localhost:3400";
// אם בכתובת למעלה לא מזהה שהריאקט עובד מהלוקאל משנה את הכתובת
// איי פי איי לשרת הירקו במקרה שלנו
if (!window.location.href.includes("localhost:")) {
  myApi = "https://cards-2035.herokuapp.com";
}

export const API_URL = myApi;

// קבוע שמחזיר כמה פריטים יהיו פר פייג
export const PER_PAGE = 6;

export const doApiGet = async (_url) => {
  try {
    let resp = await axios.get(_url);
    console.log(resp)
    return resp.data;
  } catch (err) {
    console.log(err)
    throw err;
  }
}

export const doApiMethod = async (_url, _method, _bodyData) => {
  try {
    let resp = await axios({
      method: _method,
      url: _url,
      data: _bodyData,
      headers: {
        'content-type': "application/json",
        "x-auth-token": localStorage["tok"]
      }
    })
    return resp.data;
  }
  catch (err) {
    console.log(err);
    // אם יש טעות גם הפרומיס שמאזין יריץ 
    // את ה ERR
    throw err;
  }
}
