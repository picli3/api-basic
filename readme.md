# API BASIC
Para correr se requiere docker de mongodb

`"mongodb://maykol:123456@localhost:27017/companydb?authSource=admin"`

## Para correr 

`npm run dev`

## Para correrlo mediante docker

`docker build -t api-basic .`

### Ejecutar el contenerdor

`docker run -p 3000:3000 api-basic`

TODO
Crear una red para conectar la base de datos a la app