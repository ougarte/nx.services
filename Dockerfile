FROM node:lts-iron

WORKDIR /app

# # ARG CACHEBUST=1

# # RUN echo "Starting commands"
# # RUN pwd
# # RUN ls -la

COPY ./package-lock.json ./
COPY ../.npmrc ./

RUN npm install

# # RUN pwd
# # RUN ls -la
