const plan = require('flightplan');

plan.target('master', {
  host: '35.238.139.206',
  username: 'root',
  password: 'adf7823',
  agent: process.env.SSH_AUTH_SOCK
});

// run commands on the target's remote hosts
plan.remote(function (remote) {
  remote.log('Entering on /stela/stelabackend');
  remote.cd('~/stela/stelabackend')

  remote.log('Entering on /stela/stelabackend');
  remote.sudo('pm2 stop server.js');

  remote.log('Getting the changes')
  remote.exec('git pull')

  remote.log('Updating packages')
  remote.exec('npm install')

  remote.log('Going up the application')
  remote.exec('pm2 start server --watch')
});