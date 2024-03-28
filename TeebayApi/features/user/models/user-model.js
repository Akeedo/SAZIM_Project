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
      return await prisma.users.create({
        data: {
          first_name: userData.firstName,         
          last_name: userData.lastName,           
          address: userData.address,              
          phone_number: userData.phoneNumber,     
          email: userData.email,                  
          password: userData.password,            
        },
      });
    }
    
  };
  
  module.exports = UserModel;