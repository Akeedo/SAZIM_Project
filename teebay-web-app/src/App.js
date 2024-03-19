
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import CreateProduct from './components/product/create-product';

function App() {
  return (
    <Router>
    <div className="main">
      <h2 className="main-header">React Crud Operations</h2>
      <div>
        <Route exact path='/create-product' component={CreateProduct} />
      </div>
    </div>
    </Router>
  );
}

export default App;
