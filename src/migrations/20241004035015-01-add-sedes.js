"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Crear la tabla Sedes
        await queryInterface.createTable("Sedes", {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            location: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        });

        // Insertar ciudades principales de Colombia
        await queryInterface.bulkInsert("Sedes", [
            {
                id: Sequelize.literal('UUID()'),
                name: "bogota",
                location: "cundinamarca",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: Sequelize.literal('UUID()'),
                name: "medellin",
                location: "antioquia",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: Sequelize.literal('UUID()'),
                name: "cali",
                location: "valle del cauca",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: Sequelize.literal('UUID()'),
                name: "barranquilla",
                location: "atlantico",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: Sequelize.literal('UUID()'),
                name: "cartagena",
                location: "bolivar",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        // Eliminar los datos insertados en la tabla Sedes
        await queryInterface.bulkDelete("Sedes", {
            name: ["bogota", "medellin", "cali", "barranquilla", "cartagena"]
        });
    },
};
