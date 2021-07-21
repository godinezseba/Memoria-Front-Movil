FROM node:16-alpine

WORKDIR /app

COPY ./ /app

RUN yarn global add expo-cli

RUN yarn install

# RUN yarn build

CMD ["yarn", "run", "start"]
