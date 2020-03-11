const plan = require('flightplan');

plan.target('master', {
  host: '35.238.139.206',
  username: 'root',
  password: 'adf7823',
  agent: process.env.SSH_AUTH_SOCK
});

// run commands on the target's remote hosts
plan.local(function (remote) {
  remote.log('Entering on /stela/stelabackend');
  remote.cd('~/../stela/stelabackend')

  remote.log('Where I am');
  remote.sudo('pwd');

  remote.log('Getting the changes')
  remote.exec('git pull')

  remote.log('Updating packages')
  remote.exec('npm install')

  remote.log('Going up the application')
  remote.exec('pm2 start server --watch')
});
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