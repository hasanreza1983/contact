module.exports = {
    server: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3000
    },
    database: {
            username: process.env.APP_DB_USER,
            name: process.env.APP_DB_NAME,
            password: process.env.APP_DB_PASS,
            options: {
                host: process.env.APP_DB_HOST,
                dialect: 'mysql',
                freezeTableName: true,
                define: {
                    timestamps: false
                },
                pool: {
                    max: 9,
                    min: 0,
                    idle: 10000
                }
            }
    },
    authAPI: process.env.AUTH_API_HOST
};
