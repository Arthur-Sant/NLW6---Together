import express from 'express';

const app = express();

app.get("/test", (request, response) => {
  return response.send("Olá Arthur");
});

app.post("/test", (request, response) => {
   response.sendStatus(201); 
});

app.listen(3333, () => {
  console.log("Rodando em http://localhost:3333");
})