import React from 'react';
import PageHeader from '../common/pageHeader';

function MyCards(props){
  return(
    <div className="container">
      <PageHeader title="Biz cards you added before:"/>
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
          <tr>
            <td>0</td>
            <td>koko</td>
            <td>33333</td>
            <td>new york</td>
            <td>0932919</td>
            <td>
              <button>edit</button>
              <button className="ms-2" style={{background:"pink"}}>del</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div> 
  )
}

export default MyCards