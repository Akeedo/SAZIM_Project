const express = require('express');
const bodyParser = require('body-parser');


const cors = require('cors');
const Joi = require('joi');
const { body, validationResult } = require('express-validator');
const ProductRoutes = require('./features/product/product-route');
const AuthRoutes = require('./features/authentication/auth-route');
const UserRoutes = require('./features/user/user-routes');

const setupApolloServer = require('./config/graphql/graphql-config');


const app = express();
const server = setupApolloServer(app);

app.use(bodyParser.json());

app.use(cors());


  app.use('/auth', AuthRoutes);
  app.use('/products', ProductRoutes);
  app.use('/users', UserRoutes);

  app.get('/', (req, res ) => 
  res.json({ message: 'Docker is easy 🐳' }) 
);3
  

const PORT = process.env.PORT || 3030;

(async () => {
  await setupApolloServer(app);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();