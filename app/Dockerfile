FROM node

WORKDIR /app/startup-dir
COPY . /app/startup-dir

RUN yarn
RUN yarn build

EXPOSE 3000
CMD ['yarn', 'dev']