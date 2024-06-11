module.exports = {
    type: "sqlite",
    database: "src/database/db.sqlite",
    entities: [
        "src/entities/*.ts"
    ],
    migrations: [
        "src/database/migrations/*.ts"
    ],
    cli: {
        entitiesDir: "src/entities",
        migrationsDir: "src/database/migrations"
    }
};