const prisma = require('../../../utils/prismaClient');

const UserModel = {
    async findByEmail(email) {
      return prisma.users.findFirst({
        where: {
          email:email,
        },
      });
    },
  
    async create(userData) {
      return await prisma.user.create({
          data: userData,
      });
  },
  };
  
  module.exports = UserModel;