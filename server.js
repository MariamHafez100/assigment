const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const persons = {};

app.use(bodyParser.json());
app.use(express.static('public'))
app.get('/persons', (req, res) => {
  res.json(Object.values(persons));
});

app.post('/persons', (req, res) => {
  const { name, age, gender, email } = req.body;
  const id = Date.now();
  const person = { id, name, age, gender, email };
  persons[id] = person;

  res.json(person);
});

app.get('/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const person = persons[id];
  if (person) {
    res.json(person);
  } else {
    res.json({ message: 'Person not found' });
  }
});

app.put('/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const person = persons[id];
  if (person) {
    person.name = req.body.name
    person.age = req.body.age
    person.gender = req.body.gender
    person.email = req.body.email
    res.json(person);
  } else {
    res.json({ message: 'Person not found' });
  }
});

app.delete('/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  delete persons[id];
  res.sendStatus(204);
});

app.listen(3000, () => {
  console.log("Working");
});
