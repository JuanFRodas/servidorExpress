const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

const conection = mysql.createConnection({
  host: "db4free.net",
  port: 3306,
  user: "estudiantesweb",
  password: "admin12345",
  database: "cursoweb",
});

conection.connect((err) => {
  if (err) console.log("error", err);
  console.log("Conectado a mysql");
});

app.use(cors());
app.use(express.json());

// -------------- GET ------------------

app.get("/lista", (req, res) => {
  conection.query("SELECT * FROM student", (err, results) => {
    if (err) {
    }

    res.json(results);
  });
});

//-------------- POST ------------------

app.post("/lista", (req, res) => {
  const { name, last_name, identification, email, phone } = req.body;

  conection.query(
    "INSERT INTO student (name,last_name,identification,email,phone) VALUES (?,?,?,?,?)",
    [name, last_name, identification, email, phone],
    (err, result) => {}
  );
  res.json({ Mensaje: "agregado" });
});

//------------------ FIND BY --------------

app.get("/lista2/:identification", (req, res) => {
  const identification = req.params.identification;
  conection.query(
    "SELECT * FROM student WHERE identification=?",
    [identification],
    (err, result) => {
      if (err) {
      }

      res.json(result);
    }
  );
});

//-------------- UPDATE --------------------- //Este metodo no ha sido verificado.

app.put("/lista/:identification", (req, res) => {
  const id = req.params.id;
  const { name, last_name, identification, email, phone } = req.body;

  conection.query(
    "UPDATE student SET name = ?, last_name = ?, email = ?, phone = ? WHERE id = ?",
    [name, last_name, identification, email, phone, id],
    (err, result) => {
      if (err) {
        return res.json({ error: "Error en la consulta" });
      }

      res.json({ mensaje: "Estudiante actualizado correctamente" });
    }
  );
});

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
