FROM node:20-alpine AS builder

RUN ["mkdir", "-p", "/usr/src/app"]

WORKDIR /usr/src/app


COPY  ["./package.json", "/usr/src/app/"]
COPY  ["./package-lock.json", "/usr/src/app/"]
COPY  ["./tsconfig.json", "/usr/src/app/"]

COPY  ./app/ /usr/src/app/app

RUN [ "npm", "install" ]
RUN [ "npm", "run", "build" ]

FROM node:20-alpine
LABEL org.opencontainers.image.source https://github.com/JimmyBjorklund/redis-test

WORKDIR /usr/src/app
COPY  ["./package.json", "/usr/src/app/"]
COPY  ["./package-lock.json", "/usr/src/app/"]
COPY  ["./tsconfig.json", "/usr/src/app/"]

COPY  --from=builder /usr/src/app/build ./app

RUN [ "npm", "install", "--omit=dev"]

ENV NODE_ENV production
CMD [ "npm","run","pstart" ]
