const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let herramientas = [
  { id: "1", nombre: "Almadana", descripcion: "16 libras", precio: 120 },
  { id: "2", nombre: "Taladro", descripcion: "5000rpm", precio: 250 },
  { id: "3", nombre: "Motosierra", descripcion: "9000rpm", precio: 800 },
];

app.get("/", (req, res) => {
  res.send("Servidor 3000");
});

app.get("/lista", (req, res) => {
  res.json(herramientas);
});

app.post("/lista", (req, res) => {
  const { id, nombre, descripcion, precio } = req.body;

  if (!id || !nombre || !descripcion || !precio) {
    return res.json({ mesaje: "Mal ingresado" });
  }

  herramientas.push({ id, nombre, descripcion, precio });
  return res.json({ mesaje: "Todo correcto" });
});

app.put("/lista/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio } = req.body;

  const producto = herramientas.find((p) => p.id === id);

  if (!producto) {
    return res.status(400).json({ mensaje: "Mal ingresado" });
  }
  if (nombre) {
    producto.nombre = nombre;
  }
  if (descripcion) {
    producto.descripcion = descripcion;
  }
  if (precio) {
    producto.precio = precio;
  }
  return res.json({ Mensaje: "Bien" });
});

app.delete("/lista/:id", (req, res) => {
  const { id } = req.params;
  herramientas = herramientas.filter((p) => p.id !== id);
  res.json({ Mensaje: "jugador 52 ELIMINADO" });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
