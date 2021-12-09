import {React} from 'react';
import {useState} from 'react';
import {useHistory} from "react-router";
import ApiService from '../Service/ApiService'
import './Login.css'

const UserLogin = ()=> {


  const history = useHistory();

    const [user, setUser] = useState({});


    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: value
        });
      };

      const handleSubmit = e =>{
        e.preventDefault();
        ApiService.userLogin(user)
        .then(resp => {
            console.log(resp.data);//actual response data sent by back end
            //this.setState({message : 'User added successfully.'});
           localStorage.setItem("user", JSON.stringify(resp.data));
            history.push('/UserPortal');
        }).catch( err => {
            alert("Please check the login credentials");             
            history.push('/Userlogin');
        })
      }


    return(
        <div className="login-form-container login-form-content">
                <form  onSubmit={handleSubmit} className='login-form'>
                    <h1>User login</h1><br></br>
                    <div className='login-form-inputs'>
                     <label className='login-form-label'>Email</label>
                    <input
                     type="email"
                      placeholder="email"
                       className='login-form-input'
                       pattern=".+@gmail\.com" 
                       size="30"
                        required
                       name='email'
                        value={user.email}
                        onChange={handleChange}/>
                    </div>
                    <div className='login-form-inputs'>
                    <label className='login-form-label'>Password</label>
                        <input
                         type="password" 
                        placeholder="password" 
                        className='login-form-input'
                        name='password'
                        value={user.password}
                        onChange={handleChange}/>
                        </div>
                        <br></br><br></br>
                            <input type="submit" className='login-form-input-btn' value="login"/>
                          <br></br>
                            </form>
                           
                            </div>
    );

}

export default UserLogin;