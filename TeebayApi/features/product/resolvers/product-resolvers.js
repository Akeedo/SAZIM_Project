const { PrismaClient } = require('@prisma/client');
const ProductModel = require('../models/product-model');

const prisma = new PrismaClient();

const productResolvers = {
  Query: {
    products: async () => await prisma.products.findMany(),
    product: async (_, { id }) => await prisma.products.findUnique({
      where: { id: parseInt(id) },
    }),
    userTransactionsWithProducts: async (_, { userId }) => {
      try {
        const userIdInInteger = parseInt(userId);
        const transactions = await ProductModel.getUserTransactionsWithProducts(userIdInInteger);
        return transactions;
      } catch (error) {
        console.error("Error fetching user transactions with products:", error);
        throw new Error("Failed to fetch transactions.");
      }
    },
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
};

module.exports = productResolvers;
