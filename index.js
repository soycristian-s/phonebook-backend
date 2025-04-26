const express = require("express");
const app = express();

let contactList = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(contactList);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const contact = contactList.find((c) => c.id === id);
  // console.log(contact);
  if (contact) {
    response.json(contact);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  contactList = contactList.filter((c) => c.id !== id);
  response.status(204).end();
});

app.get("/info", (request, response) => {
  const fechaActual = new Date().toUTCString();
  response.send(`<p>Phonebook has info for ${contactList.length} people<p>
    <p>${fechaActual}<p>`);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
