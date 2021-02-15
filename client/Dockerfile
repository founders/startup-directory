FROM node

WORKDIR /app/client
COPY package*.json ./app/client

RUN yarn

CMD ['yarn', 'build']

EXPOSE 3000
CMD ['yarn', 'dev']