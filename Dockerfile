# for production we give name as build
FROM node:20.14.0 as build

# Set working directory to /app
WORKDIR /app

# Copy package.json to /app
COPY package*.json .

# copy dependencies . . means all files in current directory with node_modules and other files
COPY . .


# run npm install to install dependencies
RUN npm install


# for production
RUN npm run build

# after run npm run build we get build folder in our project
# pull nginx image from docker hub

FROM nginx:1.25.3

# node name as build
#  take local folder directory /app/build which is create in this command npm run build above  and copy to nginx folder /usr/share/nginx/html
# the default folder for nginx is /usr/share/nginx/html because nginx require the static files to run the app. when i try to npm run build it create stic files in build folder and we copy that build folder to nginx folder
COPY --from=build /app/build /usr/share/nginx/html


# default port for nginx is 80
EXPOSE 80

CMD [ "nginx","-g","daemon off;" ]