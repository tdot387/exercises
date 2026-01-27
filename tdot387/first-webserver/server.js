const express = require("express");
const app = express();
app.set("view engine", "ejs");
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", {name: 'Harald'});
});

app.post('/', (req, res) => {
  res.send('<h1>Der Post ist da</h1>')
})

app.get('/karottensuppe', (req, res) =>{
  res.send('<h1>Endlich Karottensuppe</h1>')
})

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});


app.post('/willkommen', (req, res) => {
  console.log(req.body);
  res.render('willkommen', {username: req.body.username})
})

app.post("/", (req, res) => {
  res.send("<h1>Die Post ist da!</h1>");
});
