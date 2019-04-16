module.exports = {
  apps: [
      {
          name: 'barsik',
          script: 'build/app.js',
          watch: ".",
          env: {
              COMMON_VARIABLE: 'true',
          },
          env_production: {
              NODE_ENV: 'production',
          },
          // output: './logs/out.log',
          // error: './logs/error.log',
          // log: './logs/combined.outerr.log',
      },
  ],
};