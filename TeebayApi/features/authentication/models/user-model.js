const prisma = require('../../../utils/prismaClient');

const UserModel = {
    async findByEmail(email) {
      return prisma.users.findFirst({
        where: {
          email:email,
        },
      });
    },
  
    // Other user operations...
  };
  
  module.exports = UserModel;