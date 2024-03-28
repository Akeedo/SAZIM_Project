
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import CreateProduct from './features/product/components/create-product';
import GetAllProduct from './features/product/components/get-all-product';
import UpdateProduct from './features/product/components/update-product';
import CreateUser from './auth/user/components/create-user';
import Login from './auth/login/components/login';
import DetailProduct from './features/product/components/detail-product';
import UserTransactionHistory from './auth/user/components/user-transaction-history';
import AuthRoute from './auth/routes/auth-route';


function App() {
  return (
    <div className="main">
  <h2 className="main-header">Teebay</h2>

  <Router>
        <Routes>
          <Route path="/create-product" element={<AuthRoute component={CreateProduct} />} />
          <Route path="/" element={<AuthRoute component={GetAllProduct} />} />
          <Route path="/update-product/:productId" element={<AuthRoute component={UpdateProduct} />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product-detail/:productId" element={<AuthRoute component={DetailProduct} />} />
          <Route path="/user-product-transaction" element={<AuthRoute component={UserTransactionHistory} />} />
        </Routes>
      </Router>
  </div>
    
  );
}

export default App;
