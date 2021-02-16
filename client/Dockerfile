FROM node

WORKDIR /app/client
COPY . /app/client

RUN yarn
RUN yarn build

EXPOSE 3000
CMD ['yarn', 'dev']