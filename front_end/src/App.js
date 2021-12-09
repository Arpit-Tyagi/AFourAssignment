import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import UserLogin from './UserPortal/UserLogin';
import UserPortal from './UserPortal/UserPortal';
import AddExpense from './UserPortal/AddExpense';
import AddCategory from './UserPortal/AddCategory';
import AddBudget from './UserPortal/AddBudget';
import GetExpenses from './UserPortal/GetExpenses';


function App() {
  return (
    <div className="App">
      <Router>
        <h1>Expense Management System</h1>
          <Switch>
            <Route path='/' exact component={UserLogin} />
            <Route path='/UserPortal' exact component={UserPortal} />
            <Route path='/AddExpense' exact component={AddExpense} />
            <Route path='/AddCategory' exact component={AddCategory} />
            <Route path='/AddBudget' exact component={AddBudget} />
            <Route path='/GetExpenses' exact component={GetExpenses} />
          </Switch>
          
      </Router>
    </div>
  );
}

export default App;
