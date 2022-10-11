# frontend build stage
FROM node:18 as frontend-builder

WORKDIR /reactjs
COPY ./frontend/package.json ./package.json
RUN npm i

COPY ./frontend .

RUN npm run build

# backend build stage
FROM node:18 as backend-builder

WORKDIR /nestjs

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./backend/package*.json .

# Install app dependencies
RUN npm install


# Bundle app source
COPY ./backend .

# Creates a "dist" folder with the production build
RUN npm run build

# integrade backend and front end
FROM node:18

WORKDIR /app
COPY --from=backend-builder /nestjs .
COPY --from=frontend-builder /reactjs/build ./public

# Start the server using the production build
CMD [ "node", "dist/app" ]