## Descripción
Prueba técnica para Treda Solutions donde se crea una aplicación CRUD utilizando Node.js 22, MySQL, Sequelize, Docker. 

El proyecto está diseñado para gestionar usuarios. Contiene dos vistas principales:
1. **Vista de Autenticación**: Permite registrar nuevos usuarios y autenticar las credenciales de los usuarios existentes.
2. **Vista de Usuarios**: Permite obtener la lista de usuarios, actualizar y eliminar.
3. **Vista de Sedes**: Migración inicial con 5 ciudades principales.

## Requisitos

1. Docker
2. VSC
3. Extensión Remote Development

## Instalación

1. Clonar el repositorio.
2. Se debe abrir el dev container Ctrl + Shift + p => Dev Containers: Reopen Container
3. Crear y Ejecutar las migraciones (Las instrucción se encuentran en src/readme.md)
4. En este punto puede probar la aplicación en un servicio consistente con los ambientes de producción
    
    ```bash
    http://localhost:8080/api/swagger
    ```
   
   O puede ejecutar la aplicación en un ambiente de desarrollo accediendo a src/Api

    ```bash
    cd src/Api
    http://localhost:5500/api/swagger
    ```

5. Para acceder a PhpMyAdmin se puede desde:

    ```bash
    http://localhost:8081
    ```

## DockerHub Container Registry

    
```bash
docker pull pilotbase6/node-mysql-test:latest
```

Recordatorio: Si quieres ejecutar la imagen del proyecto recuerda tener un servicio de MySQL corriendo en el mismo Network (Cambiar el nombre del servicio MySQL si se quiere ejecutar con un servicio diferente al devcontainer).

```bash
  node-mysql:
    container_name: node-mysql
    image: mysql:8.0
    restart: unless-stopped
    volumes:
      - db_data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: testnode
      MYSQL_DATABASE: testdb
      MYSQL_USER: testnode
      MYSQL_PASSWORD: testnode
    ports:
      - "33060:3306"
    networks:
      - node-dev
```

En la aplicación hay dos archivos que son importantes para mi solución:

Repository.ts: Contiene una clase abstracta que contiene los métodos CRUD reutilizables, al tener un tipado generico permite que cualquier módelo lo utilice facilitando la creación de nuevos servicios y manteniendo una consistencia.

IService.ts Contiene un conjunto de interfaces que mantienen una consistencia de la manera en que se deben desarrollar los diferentes servicios, esto ayuda a mantener un orden tanto en el desarrollo del código como en las respuestas de las APIs.