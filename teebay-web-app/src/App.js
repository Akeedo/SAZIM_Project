
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import CreateProduct from './features/product/components/create-product';
import GetAllProduct from './features/product/components/get-all-product';
import UpdateProduct from './features/product/components/update-product';

function App() {
  return (
    <div className="main">
  <h2 className="main-header">React Crud Operations</h2>

      <Router>
        <Routes> 
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/" element={<GetAllProduct />} />
          <Route path="/update-product/:productId" element={<UpdateProduct />} />
        </Routes>
    </Router>
  </div>
    
  );
}

export default App;
