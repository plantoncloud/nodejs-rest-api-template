const express = require('express');
const app = express();
const port = 8080;

// this is for demo purposes. remove it when using for production use.
default_routes = [
    {
        description: 'get all todos',
        method: 'GET',
        path: '/todos'
    },
    {
        description: 'get details of a todo',
        method: 'GET',
        path: '/todos/<int:todo_id>'
    },
    {
        description: 'create a new todo',
        method: 'POST',
        path: '/todos'
    }
    ,
    {
        description: 'update a todo',
        method: 'PUT',
        path: '/todos/<int:todo_id>'
    }
    ,
    {
        description: 'delete a todo',
        method: 'DELETE',
        path: '/todos/<int:todo_id>'
    }
]

// This is an in-memory store for the purposes of this example.
// You would typically use a database like MongoDB or MySQL in a real app.
const todos = [
  {
    id: 1,
    task: 'Learn Node.js',
    completed: false
  },
  {
    id: 2,
    task: 'Learn Express',
    completed: false
  }
];

// Returns all default routes
app.get('/', (req, res) => {
  res.send(default_routes);
});

// Returns all todos
app.get('/todos', (req, res) => {
  res.send(todos);
});

// Returns a specific todo
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).send('Todo not found');
  }
  res.send(todo);
});

// Add a new todo
app.post('/todos', (req, res) => {
  // Validate the input
  if (!req.body.task || req.body.task.length < 3) {
    return res.status(400).send('Task must be at least 3 characters long');
  }

  const todo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false
  };
  todos.push(todo);
  res.send(todo);
});

// Update an existing todo
app.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).send('Todo not found');
  }

  // Validate the input
  if (!req.body.task || req.body.task.length < 3) {
    return res.status(400).send('Task must be at least 3 characters long');
  }

  todo.task = req.body.task;
  res.send(todo);
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).send('Todo not found');
  }

  const index = todos.indexOf(todo);
  todos.splice(index, 1);

  res.send(todo);
});

app.listen(port, () => {
  console.log(`todo app listening on port ${port}!`);
});
