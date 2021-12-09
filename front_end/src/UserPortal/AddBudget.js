import {React} from 'react';

import {useState} from 'react';
import  ApiService  from '../Service/ApiService.js';
import { useHistory, Redirect } from 'react-router-dom';
import './AddBudget.css'

const AddBudget = () =>{

    const history = useHistory();
    const userDetails = JSON.parse(localStorage.getItem("user"));

    const [categoryDetails, setCategoryDetails] = useState();

    const [category, setCategory] = useState();

    const [budget, setBudget] = useState();

    if(!userDetails){
      return( <Redirect to='/'/>
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


      const addBudget = () =>  {
          console.log(budget);
          console.log(category);
      ApiService.addBudget( budget, category).then(resp => {
                  console.log(resp.data);//actual response data sent by back end
                  alert("Budget Added successfully");
                   history.push('/AddBudget'); 
              }).catch( err=>{
                  alert("Adding Budget Failed");
              })
  };


    
    return(
      
        <div className="budget-container budget-content" >
        <form  className="budget-form">
            <div className="budget-form-item"> 
        <div className='budget-form-inputs'>
        <label className='budget-form-label'>Category</label>
        <select className="  budget-form-input"  id = "dropdown" value={category} onChange={e => setCategory(e.target.value)}>
           <option>Select Category</option>{categoryList()}
           </select>
          </div>

         <div className='budget-form-inputs'>
          <label className='budget-form-label'>Monthly Budget</label>
          <input
            className='budget-form-input'
            type='number'
            placeholder='Enter Monthly Budget'
            onChange={e => setBudget(e.target.value)}
          />
        </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <button className='budget-btn' type='submit' onClick={addBudget}>
         Update Budget
        </button>
        <br></br><br></br>
        
      </form>
    </div>
    
        );


}

export default AddBudget;