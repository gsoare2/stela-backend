module.exports = shipit => {
  require('shipit-deploy')(shipit);
  require('shipit-shared')(shipit);

  shipit.initConfig({
    default: {
      deployTo: '/stela/stelabackend',
      repositoryUrl: 'https://github.com/gsoare2/stelabackend',
      keepReleases: 5,
      shared: {
        overwrite: true,
        dirs: ['node_modules']
      }
    },
    production: {
      servers: 'root@35.238.139.206'
    }
  });

  shipit.on('where', () => {
    shipit.start('pwd');
  });

  shipit.on('pull', () => {
    shipit.start('git pull');
  });

  shipit.on('update', () => {
    shipit.start('npm-install');
  });

  shipit.on('update', () => {
    shipit.start('pm2-start-server');
  });
};