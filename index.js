const express = require("express");
const app = express();

const contactList = [
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

app.get("/info", (request, response) => {
  const fechaActual = new Date().toUTCString();
  response.send(`<p>Phonebook has info for ${contactList.length} people<p>
    <p>${fechaActual}<p>`);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
