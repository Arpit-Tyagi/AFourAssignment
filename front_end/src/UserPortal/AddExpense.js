import {React} from 'react';
import {useState} from 'react';
import  ApiService  from '../Service/ApiService.js';
import { useHistory , Redirect} from 'react-router-dom';
import './AddExpense.css'


const AddExpense = () => {

    const history = useHistory();

    const userDetails = JSON.parse(localStorage.getItem("user"));

    const [categoryDetails, setCategoryDetails] = useState();

    const [category, setCategory] = useState();


    const[expense, setExpense] = useState({
        description: '',
        amount:'',
        date: '',
      });

      const handleChange = e => {
        const { name, value } = e.target;
        setExpense({
          ...expense,
          [name]: value
        });
    };

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

      const addExpenses = () =>  {
          console.log(category);
         
        ApiService.addExpenses(userDetails.id, expense, category).then(resp => {
                    console.log(resp.data);//actual response data sent by back end
                    alert("Expenses Added successfully");
                     history.push('/AddExpense'); 
                }).catch( err=>{
                    alert("Adding Expenses Failed");
                })
    };



return(

     <div className="expense-container expense-content" >
        <form  className="expense-form">
            <div className="expense-form-item"> 
        <div className='expense-form-inputs'>
          <label className='expense-form-label'>Description</label>
          <input
            className='expense-form-input'
            type='text'
            name='description'
            placeholder='Enter Description'
            value={expense.description}
            onChange={handleChange}
          />
          </div>
         <div className='expense-form-inputs'>
          <label className='expense-form-label'>Expense Amount</label>
          <input
            className='expense-form-input'
            type='number'
            name='amount'
            placeholder='Enter expenditure amount'
            value={expense.amount}
            onChange={handleChange}
          />
        </div>
        </div>
        <br></br>
        <div className='expense-form-item'>
        <div className='expense-form-inputs' >
          <label className='expense-form-label'>Date</label>
          <input
            className='expense-form-input'
            style={{width:"270px"}}
            type='date'
            name='date'
            min="1980-01-01" 
            placeholder='Enter Date'
            value={expense.date}
            onChange={handleChange}
          />
          
        </div>
        <div className='expense-form-inputs' >
        <label className='expense-form-label'>Category</label>
        <select className="  expense-form-input"  id = "dropdown" value={category} onChange={e => setCategory(e.target.value)}>
           <option>Select Category</option>{categoryList()}
           </select>

        </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <button className='expense-btn' type='submit' onClick={addExpenses}>
         Add Expense
        </button>
        <br></br><br></br>
        
      </form>
    </div>
);

}

export default AddExpense;
