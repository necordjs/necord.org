# Base
FROM node:18 as base

## Set a default workdir that's easy to remember/use
WORKDIR /opt/app

## Expose docusaurus default serve port
EXPOSE 3000

## Install docusaurus globally
RUN yarn global add docusaurus

## Set yarn as entrypoint
ENTRYPOINT [ "yarn" ]



# Build
FROM base as build

## Copy package.json & yarn.lock to prepare for dependency installation
COPY package.json yarn.lock ./

## Install dependencies
RUN yarn

## Copy documentation files
COPY . ./

## Build documenation
RUN yarn build



# Production
FROM nginx as production

## Expose nginx default port
EXPOSE 80

## Copy static build from build stage into nginx serve folder
COPY --from=build /opt/app/build /usr/share/nginx/html