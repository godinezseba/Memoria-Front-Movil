FROM node:16-alpine

WORKDIR /app

COPY ./ /app

RUN yarn global add expo-cli

RUN yarn install

CMD ["yarn", "run", "start"]
