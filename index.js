const express = require("express");
const app = express();

app.use(express.json());

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

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.name && body.number) {
    const checkName = !contactList.some((c) => c.name === body.name);
    if (checkName) {
      return response.status(400).json({ error: "name must be unique" });
    }
    const id = Math.round(Math.random() * 10000);
    const newContact = {
      id: id,
      name: body.name,
      number: body.number,
    };
    contactList.push(newContact);
    response.json(newContact);
  } else {
    return response.status(400).json({ error: "name or number is missing" });
  }
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
