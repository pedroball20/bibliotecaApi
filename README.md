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

# Modo de uso 
1. login/register: requiere el nombre de usuario, y datos de a utilizar como fecha de
naciomiento.
la ruta es  POST
```http://localhost:3000/login/register```
los datos esperados son 
```
{
  "email":"Jean@gmail.com",
  "password":"Hola123456",
  "fullName":"Jean",
  "dateOfBirth":"1995-01-20",
  "roles":["publicador"]
}
```
![image](https://github.com/pedroball20/bibliotecaApi/assets/62299941/2a4acb89-9c76-47a0-ba4c-bafaa605b97f)

2. login/auth: requiere los datos de usuario y contraseña para iniciar sesión.
la ruta es POST
```http://localhost:3000/login/auth```
los datos esperados son
```
{
  "email":"pedro@gmail.com",
  "password":"Hola123456"
}
```
![image](https://github.com/pedroball20/bibliotecaApi/assets/62299941/b9e7842a-96b3-4da7-856c-891bc0eaa900)

3. books/read: obtiene todas las listas de libros existentes, requiere poder obtener un
orden por autor, alfabético, genero, año de publicación. 

la ruta es GET
```http://localhost:3000/books/read?order=yearOfPublication```
los datos esperados son
```
['author', 'alphabetical', 'gender', 'yearOfPublication']
```
![image](https://github.com/pedroball20/bibliotecaApi/assets/62299941/04e8183a-6415-4996-bf7a-b0cc9b641552)

4. books/read/get: obtiene el libro paginado, de forma de que el front pueda ir
consultando página por página del libro que desea leer
la ruta es GET
```http://localhost:3000/books/read/get?limit=1&offset=0```
![image](https://github.com/pedroball20/bibliotecaApi/assets/62299941/255f8910-7a20-4fa7-800b-8edab60865a5)

5. books/add: permite agregar un libro, requiere la descripción de este o resumen, ruta
de la imagen de portada, genero, autor y solo puede ser cargado por usuarios con
role de publicador.
la ruta es POST
```http://localhost:3000/books/add```
los datos esperados son
```
{
    "title": "El Gran Escape 3",
    "description": "Una emocionante historia de supervivencia",
    "urlImg": "http://www.imagenes.com/456",
    "gender": "Aventura",
    "author": "Juan Perez",
    "authorPopularity": "Media",
    "bookPopularity": "Alta",
    "yearOfPublication": 1985
  }
```
y aparte se espera que antes de poder agregar un libro tenga un token generado y colocarlo en bearer token
![image](https://github.com/pedroball20/bibliotecaApi/assets/62299941/fb38f848-deaa-44fa-9281-b190b54ea91f)
![image](https://github.com/pedroball20/bibliotecaApi/assets/62299941/c0682490-b51b-4cce-b2d3-a3818bf0b2d6)

6. Statistics/get: obtiene la lista de las posibles estadísticas a usar. Las cuáles serán:
libros más leídos, libros menos leídos, autores más populares. 

la ruta es GET
```http://localhost:3000/Statistics/get?type=book&popularity=Media```
```type esperados ['author', 'book']```
```popularity esperados ['Alta', 'Media', 'Baja']```
![image](https://github.com/pedroball20/bibliotecaApi/assets/62299941/ecc81662-da6b-4244-a50e-ad7094696b18)

