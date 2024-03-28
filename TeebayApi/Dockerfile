FROM node:16.20.2

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

ENV PORT=3030

EXPOSE 3030

CMD ["npm", "start"]

