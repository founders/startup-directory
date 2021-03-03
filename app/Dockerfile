FROM node

ENV PORT 3000

COPY . .

RUN yarn

RUN yarn build

EXPOSE 3000
CMD ['yarn', 'dev']