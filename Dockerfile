FROM oven/bun:1
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install -p

COPY . ./

ENV NODE_ENV=production

CMD ["bun", "start"]
