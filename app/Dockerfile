FROM node

ENV PORT 3000

RUN mkdir -p /app/startup-dir
WORKDIR /app/startup-dir

COPY package.json /app/startup-dir
COPY yarn.lock /app/startup-dir

RUN yarn

COPY . /app/startup-dir

RUN yarn build

EXPOSE 3000
CMD ['yarn', 'dev']