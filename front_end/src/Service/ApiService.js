import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:3030/user';

class ApiService {

    userLogin(user){
        return axios.post(""+USER_API_BASE_URL+"/userLogin", user);
    }
    getCategoryList(id){
        return axios.get(""+USER_API_BASE_URL+"/allCategory/"+id);
    }
    addExpenses(id, expense, category){
        return axios.post(""+USER_API_BASE_URL+"/addExpenses/"+id+"/"+category, expense); 
    }
    addCategory(id, category){
        return axios.post(""+USER_API_BASE_URL+"/addCategory/"+id, category); 
    }
    addBudget(budget, id){
        return axios.post(""+USER_API_BASE_URL+"/addBudget/"+id+"/"+ budget); 
    }
    getExpensesList(id){
        return axios.get(""+USER_API_BASE_URL+"/getExpensesList/"+id); 
    }
    seeExpenses( category, month){
        return axios.get(""+USER_API_BASE_URL+"/getExpensesList/"+category+"/"+month); 
    }

}

export default new ApiService();