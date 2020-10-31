const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid, validate } = require('uuid');

const app = express();

function validateRepositoryId(request, response, next) {
  const { id } = request.params;

  const validId = validate(id);

  if(!validId) {
    return response.status(400).json({ error: 'Repository Id is not valid'});
  }

  next();
}

app.use(express.json());
app.use(cors());
app.use('/repositories/:id', validateRepositoryId);

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndexId = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndexId < 0) {
    return response.status(404).json({ error: 'Repository Not Found'});
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndexId].likes
  }

  repositories[repositoryIndexId] = repository;

  return response.status(200).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
