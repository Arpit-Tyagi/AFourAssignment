import {React} from 'react';
import './UserPortal.css';
import {useHistory} from "react-router";
import {useState} from 'react';
import { Redirect } from 'react-router-dom';

import  ApiService  from '../Service/ApiService.js';



const UserPortal = ()=> {


    const history = useHistory();
    const [sum, setSum] = useState([]);

    const userDetail = JSON.parse(localStorage.getItem("user"));


    if(!userDetail){
      return( <Redirect to='/'/>
    );
  }

  const logout = () =>{
    localStorage.removeItem("user");
    history.push('/');
    
}

    const getTotalExpense = () =>{
        
        if(!sum){
        ApiService.getExpensesList(userDetail.id).then(resp => {
            console.log(resp.data);//actual response data sent by back end
            setSum(resp.data);
        }).catch( err => {
            alert("Error in getting Expenses List" + err.data);             
            
        })
    }
        return (
            <h2>Total Expense: {sum}. </h2>
        )
        
    }

    
  

    const addExpenses = e =>{
          e.preventDefault();
            history.push('/AddExpense');
            
      }
      const getExpenses = e =>{
        e.preventDefault();
          history.push('/GetExpenses');
          
    }

      const addCategory = e =>{
        e.preventDefault();
          history.push('/AddCategory');
          
    }
    const addBudget = e =>{
        e.preventDefault();
          history.push('/AddBudget');
          
    }

    return(
        <>
        <div className= "container content">
    <h2>Welcome, {userDetail.name}. </h2>
    <h2>Income, {userDetail.income}. </h2>
          {getTotalExpense()}
          <button className='userPortal-btn' type='button' onClick={logout}>
         LogOut
        </button>
        </div>
        <div className="big-container">
            
        <div className= "container content">
        
        <h1>Add Expenses</h1>
        <br></br>
        <button className='userPortal-btn' type='submit' onClick={addExpenses}>
        Add Expense
        </button>
        </div>
        <div className= "container content">
        <h1>Add Category</h1>
        <br></br>
        <button className='userPortal-btn' type='submit' onClick={addCategory}>
         Add Category
        </button>
        </div>
       
        </div>


        <div className="big-container">

        <div className= "container content">
        <h1>Add Budget</h1>
        <br></br>
        <button className='userPortal-btn' type='submit' onClick={addBudget}>
         Add Category
        </button>
        </div>
        <div className= "container content">
        <h1>See Expenses</h1>
        <br></br>
        <button className='userPortal-btn' type='submit' onClick={getExpenses}>
         See Expenses
        </button>
        </div>
        </div>
        </>
    );

}

export default UserPortal;