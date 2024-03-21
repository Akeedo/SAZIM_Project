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

};

module.exports = ProductModel;