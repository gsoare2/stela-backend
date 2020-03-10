const plan = require('flightplan');

plan.target('master', {
  host: 'http://35.238.139.206',
  username: 'root',
  agent: process.env.SSH_AUTH_SOCK
});

plan.local((local) => {
  local.log('Run build');
})