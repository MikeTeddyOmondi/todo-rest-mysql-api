FROM node:18.13.0-alpine

WORKDIR /app

COPY package*.json ./

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

COPY . /app

RUN npx prisma generate

RUN addgroup -S appgroup && adduser -S picasso -G appgroup

RUN chown -R picasso:appgroup /app/logs

USER picasso

ENV PORT 5000

EXPOSE $PORT

CMD ["npm", "start"]
