module.exports = {
  apps: [
    {
      name: 'calendarBackend',
      script: 'index.js',
      watch: '.',
      env_development: {
        NODE_ENV: 'development',
        PORT: 8080,
        DB_CNN:
          'mongodb+srv://mern_user:SRk9bB0up2KsB5IZ@atlascluster.7vuwqdu.mongodb.net/mern_calendar',
        JWT_SECRET_SEED: 'always@workWitGod'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 80,
        DB_CNN:
          'mongodb+srv://mern_user:SRk9bB0up2KsB5IZ@atlascluster.7vuwqdu.mongodb.net/mern_calendar',
        JWT_SECRET_SEED: 'always@workWitGod'
      }
    }
  ],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
}
