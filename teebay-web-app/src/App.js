
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import CreateProduct from './components/product/create-product';
import GetAllProduct from './components/product/get-all-product';
import UpdateProduct from './components/product/update-product';

function App() {
  return (
    <div className="main">
  <h2 className="main-header">React Crud Operations</h2>

      <Router>
        <Routes> 
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/get-all-product" element={<GetAllProduct />} />
          <Route path="/update-product/:productId" element={<UpdateProduct />} />
        </Routes>
    </Router>
  </div>
    
  );
}

export default App;
