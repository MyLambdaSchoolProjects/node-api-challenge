const express = require('express');
const helmet = require('helmet');

const actionRouter = require('./data/helpers/actionRouter');
const projectRouter = require('./data/helpers/projectRouter');

const server = express();

server.use(helmet());
server.use(express.json());


server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
    const nameInsert = (req.name) ? ` ${req.name}` : 'Lambda Alumni';
  
    res.send(`
      <h2>Nodejs API Sprint</h2>
      <p>Welcome ${nameInsert} to the Nodejs API Sprint API</p>
      `);
  });

  module.exports = server;