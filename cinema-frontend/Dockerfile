# Fase 1: Build Angular
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Fase 2: Serve solo la parte client (browser)
FROM node:18-alpine
WORKDIR /app
RUN npm install -g http-server
COPY --from=build /app/dist/cinema-frontend/browser /app
EXPOSE 4200
CMD ["http-server", "/app", "-p", "4200"]
