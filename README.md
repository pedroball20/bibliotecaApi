<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Bibilioteca Api
# Tener Docker instalado para levantar la db
1. Clonar Proyecto
2. ```yarn install```
3. Clonar el archivo ```.env.template``` y renombrarlo a ```.env``` ('En este caso guardare el .env en el git para que no hagan cambios aqui')
4. Cambiar las variables de entorno acorde a lo necesario (Omitir este paso por lo comentado en el paso anterior)
5. Levantar la Base de Datos
```
docker-compose up -d
```
6. Levantar en modo desarrollo:
```yarn start:dev```