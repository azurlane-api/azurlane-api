module.exports = {
    apps: [{
        name: "al-api",
        script: "ts-node",
        args: "-r tsconfig-paths/register ./src/index.ts",
        instances: 1,
        autorestart: true,
        watch: false,
        exec_mode: "fork",
        env: {
            NODE_ENV: "development"
        },
        env_production: {
            NODE_ENV: "production"
        }
    }]
};
