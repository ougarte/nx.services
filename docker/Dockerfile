FROM node:lts-iron
WORKDIR /app

# ARG CACHEBUST=1

# RUN echo "Starting commands"
# RUN pwd
# RUN ls -la

# COPY ../package.json ./
COPY ../package-lock.json ./
COPY ../.npmrc ./
# RUN npm install --legacy-peer-deps

COPY ../ ./
