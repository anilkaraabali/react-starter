FROM node:22-alpine AS build

ENV HUSKY=0

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG VITE_APP_API_URL
ENV VITE_APP_API_URL=$VITE_APP_API_URL
ARG VITE_APP_ENABLE_API_MOCKING
ENV VITE_APP_ENABLE_API_MOCKING=$VITE_APP_ENABLE_API_MOCKING

RUN pnpm build

FROM nginx:alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
