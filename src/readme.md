## Migraciones con Sequelize

1. Se debe estar ubicado en src o donde se encuentre el directorio config.

2. Se debe ejecutar el comando:

    ```bash
    
    npx sequelize-cli db:migrate
    
    ```
    Esto ejecutara la migración que inserta la data inicial de las 5 ciudades principales en la entidad sede.

3. Pare revertir la migración:

    ```bash
    
    npx sequelize-cli db:migrate:undo
    
    ```

    si hay usuarios que tengan asignados esa sede, no dejara revertir el script

4. Para Crear nuevas migraciones podemos ejecutar el comando

    ```bash
    
    npx sequelize-cli migration:generate --name create-users-and-sedes
    
    ```