module.exports = {
    type: "sqlite",
    database: "./src/database/db.sqlite",
    host: 'localhost',
    port: 3333,
    entities: ['src/**/**.entity{.ts,.js}'],
    miagrations: [
        "./src/database/migrations"
    ],
    cli: {
        miagrationsDir: "./src/database/migrations"
    }
}