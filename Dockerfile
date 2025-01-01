FROM oven/bun:1.1.42-alpine as base
WORKDIR /app

FROM base as build
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM base as final
COPY package.json bun.lockb ./
RUN bun install --production
COPY proto ./proto
COPY --from=build /app/dist ./dist
ENTRYPOINT ["bun"]
