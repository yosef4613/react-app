import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../../services/apiSer';
import PageHeader from '../common/pageHeader';

function MyCards(props) {
  let [ar, setAr] = useState([])

  // לבצע בקשת API 
  useEffect(() => {
    doApi();
  }, [props.location])

  const doApi = async () => {
    let url = API_URL + "/cards/userCardsAdded?perPage=999";
    let data = await doApiMethod(url, "GET");

    console.log(data);
    data.reverse();
    setAr(data);
  }

  const delCard = async(_id) => {
    if(window.confirm("Are you sure you want to del?")){
      let url = API_URL+ "/cards/"+_id;
      let data = await doApiMethod(url,"DELETE");
      if(data.n == 1){
        doApi();
        toast.info("Card deleted forever!!!!!!");
      }
    }
  }

  return (
    <div className="container">
      <PageHeader title="Biz cards you added before:" />
      <Link className="btn btn-success" to="/addCard">Add new biz card</Link>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Descrption</th>
              <th>Address</th>
              <th>Phone</th>
              <th>edit/del</th>

            </tr>
          </thead>
          <tbody>
            {ar.map((item, i) => {
              return (
                <tr key={item._id}>
                  <td>{i+1}</td>
                  <td>{item.bizName}</td>
                  <td>{item.bizDescription.substr(0,40)}...</td>
                  <td>{item.bizAddress}</td>
                  <td>{item.bizPhone}</td>
                  <td className="text-center">
                    {/* כפתור עריכה
                    ייקח למיקום הנכון */}
                    <Link to={"/editCard/"+item._id}>
                    <button>edit</button>
                    </Link>
                    <button onClick={() => {
                      delCard(item._id);
                    }} className="ms-2" style={{ background: "pink" }}>del</button>
                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyCards

