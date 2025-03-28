FROM oven/bun:1 AS base
WORKDIR /app

COPY package.json bun.lock ./

RUN bun install -p

COPY . .

EXPOSE 3000

RUN bun build ./src/app.ts --outdir ./dist --target node

ENV NODE_ENV=production

CMD ["bun", "run", "./dist/app.js"]
