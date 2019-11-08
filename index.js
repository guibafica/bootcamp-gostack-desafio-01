const express = require('express');
const server = express();

server.use(express.json());

const projects = [];

// Criação ID, Title.
server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  projects.push({id, title});

  return res.json(req.body);
});

// Retorno Projects.
server.get('/projects', (req, res) => {
  return res.json(projects);
});

// Edita Projetos.
server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const Projects = projects.find(item => item.id === id);

  Projects.title = title;

  return res.json(projects);
}); 

// Deletar um Projeto.
server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  const Del = projects.findIndex(item => item.id === id);

  projects.splice(Del, 1);

  return res.json(projects);
});

server.post('/projects/:id/tasks', (req, res) => {
  const index = projects.indexOf(req.project);
  const { title } = req.body;
  
  if(!title) {
      return res.status(400).json({ error:'Task não enviada!'});
  }
  projects[index].tasks.push(title);

  return res.json( { Mensagem: 'Task criada com sucesso!!!'});
})

server.listen(3001);
