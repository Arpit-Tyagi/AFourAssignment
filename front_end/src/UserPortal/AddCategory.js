import {React} from 'react';
import {useState} from 'react';
import  ApiService  from '../Service/ApiService.js';
import { useHistory, Redirect } from 'react-router-dom';
import './AddCategory.css'


const AddCategory = () =>{

    const history = useHistory();

    const userDetails = JSON.parse(localStorage.getItem("user"));

    const[category, setCategory] = useState({});

    if(!userDetails){
      return( <Redirect to='/'/>
    );
  }

      const handleChange = e => {
        const { name, value } = e.target;
        setCategory({
          ...category,
          [name]: value
        });
    };


    const addCategory = () => {

        console.log(category);
        ApiService.addCategory(userDetails.id, category).then(resp => {
            console.log(resp.data);//actual response data sent by back end
            alert("Category Added successfully");
             history.push('/AddCategory'); 
        }).catch( err=>{
            alert("Adding Category Failed");
        })
    }
    
    return(
        
        <div className="category-container category-content" >
        <form  className="category-form">
            <div className="category-form-item"> 
        <div className='category-form-inputs'>
          <label className='category-form-label'>Category Name</label>
          <input
            className='category-form-input'
            type='text'
            name='Name'
            placeholder='Enter Category Name'
            value={category.Name}
            onChange={handleChange}
          />
          </div>
         <div className='category-form-inputs'>
          <label className='category-form-label'>Monthly Budget</label>
          <input
            className='category-form-input'
            type='number'
            name='Budget'
            placeholder='Enter Budget (Optional)'
            value={category.Budget}
            onChange={handleChange}
          />
        </div>
        </div>
        <br></br>
        <br></br>
        <button className='category-btn' type='submit' onClick={addCategory}>
         Add Category
        </button>
        <br></br><br></br>
        
      </form>
    </div>
        

    );


}

export default AddCategory;