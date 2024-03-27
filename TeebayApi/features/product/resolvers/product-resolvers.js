const { PrismaClient } = require('@prisma/client');
const ProductModel = require('../models/product-model');

const prisma = new PrismaClient();

const productResolvers = {
  Query: {
    products: async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/products');
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    product: async (_, { id }) => await prisma.products.findUnique({
      where: { id: parseInt(id) },
    }),
  },
  Mutation: {
    createProduct: async (_, args) => {
      const { title, description, price, category } = args;
      return await prisma.products.create({
        data: {
          title,
          description,
          price,
          category,
        },
      });
    },
    deleteProduct: async (_, { id }) => {
      return await prisma.products.delete({
        where: { id: parseInt(id) },
      });
    },
    updateProduct: async (_, { id, title, description, price, category }) => {
      return await prisma.products.update({
        where: { id: parseInt(id) },
        data: {
          title,
          description,
          price,
          category,
        },
      });
    },
  },
  Product: {
    price: (parent) => parent.price.toNumber(),
  
  }
};

module.exports = productResolvers;
