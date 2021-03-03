FROM node

ENV PORT 3000

RUN mkdir -p /app/startup_directory
WORKDIR /app/startup_directory

COPY package*.json /app/startup_directory
RUN yarn install
COPY . /app/startup_directory

RUN yarn run build

EXPOSE 3000
CMD "yarn" "dev"