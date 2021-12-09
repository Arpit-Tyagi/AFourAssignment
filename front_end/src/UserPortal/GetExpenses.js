import {React} from 'react';

import {useState} from 'react';
import  ApiService  from '../Service/ApiService.js';
import { useHistory , Redirect} from 'react-router-dom';
import './GetExpenses.css'

const GetExpenses = () =>{

    const history = useHistory();
    const userDetails = JSON.parse(localStorage.getItem("user"));
    
    const [categoryDetails, setCategoryDetails] = useState();

    const [category, setCategory] = useState();
    const [expense, setExpense] = useState();
    const [month, setMonth] = useState();

    if(!userDetails){
      return( <Redirect to='/UserLogin'/>
    );
  }

    const categoryList = () => {
        if(!categoryDetails){
          ApiService.getCategoryList(userDetails.id).then(resp => {
            setCategoryDetails(resp.data); 
          })
      }
          if(categoryDetails){
          return( 
            categoryDetails.map(item  => 
                  <option value={item.id}>{item.Name}</option>
              )
    
          )
              }
    
      };


      const getExpense = () =>  {
          console.log(category);
          console.log(month);
          alert(month)
          ApiService.seeExpenses(category, month).then(resp => {
            console.log(resp.data);//actual response data sent by back end
            setExpense(resp.data);
        }).catch( err => {
            alert("Error in getting Expenses List" + err.data);             
            
        })
     
  };

  const list = () =>{

    if(expense){
        return(
            <table className="List-table table-striped general-table">
                      <thead>
                          <tr>
                              <th className="hidden">Id</th>
                              <th>Category </th>
                              <th>Description</th>
                              <th>Date</th>
                              <th>Amount</th>
                          </tr>
                      </thead>
                      <tbody>
                      {
                                expense.map(
                            item =>
                  <tr key={item.id}>
                    <td>{item.id}</td>
                  <td>{item.category.Name}</td>
                  <td>{item.description}</td>
                  <td>{item.date}</td>
                  <td>{item.amount}</td>
              </tr>
                                )
                                }
                   </tbody>
                  </table>
                
    
            );
    
    
            }

  }


    
    return(
      <>
        <div className="getExpense-container getExpense-content" >
            <div className="getExpense-form-item"> 
        <div className='getExpense-form-inputs'>
        <label className='getExpense-form-label'>Select Category</label>
        <select className="  getExpense-form-input"  id = "dropdown" value={category} onChange={e => setCategory(e.target.value)}>
           <option>Select Category</option>{categoryList()}
           </select>
          </div>

         <div className='getExpense-form-inputs'>
          <label className='getExpense-form-label'>Select Month </label>
          <input
            className='getExpense-form-input'
            type='month'
            placeholder='Select Month'
            onChange={e => setMonth(e.target.value)}
          />
        </div>
        <div className='getExpense-form-inputs'>
        <button className='getExpense-btn' type='button' onClick={getExpense}>
         See Expenses
        </button>
        </div>
        </div>
     
    </div>
    <div>
        {list()}
    </div>

    
</>


    
        );


}

export default GetExpenses;