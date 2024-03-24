// features/product/productModel.js
const prisma = require('../../../utils/prismaClient');

const ProductModel = {
  async findAll() {
    return await prisma.products.findMany();
  },

  async create(data) {
    return await prisma.products.create({
      data,
    });
  },

    async update(id, data) {
        return await prisma.products.update({
        where: { id },
        data,
        });
    },

    async delete(id) {
        return await prisma.products.delete({
        where: { id },
        });
    },

    async findById(id) {
        return await prisma.products.findUnique({
        where: { id },
        });
    },

    async updateById(id, productData) {
      return await prisma.products.update({
        where: { id },
        data: productData,
      });
    },

    async titleExists(title) {
      try {
        const product = await prisma.products.findFirst({
          where: {
                title: title,
            },
        });
        return product !== null;
      }catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    },

    async createTransaction(data) {
      return await prisma.transactions.create({
        data,
      });
    },

    async createRental(data){
      return await prisma.rentals.create({
        data,
      });
    },

    async getUserTransactionsWithProducts(userId) {
      return await prisma.transactions.findMany({
            where: { user_id: userId },
            select: {
              product: {
                select: {
                  id: true,
                  title: true,
                  description: true,
                  category: true,
                  price: true,
                },
              },
              transaction_type: true,
            },
            orderBy: { date: 'desc' },
          });
        },
    

};

module.exports = ProductModel;
