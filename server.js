// Importación de módulos necesarios
const express = require("express"); // Framework principal de Express
const morgan = require("morgan"); // Middleware para logging de solicitudes HTTP
const app = express(); // Creación de la aplicación Express

// Array que simula una base de datos de productos
let products = [
  {
    id: 1,
    name: "Laptop",
    price: 100,
  },
];

// Configuración de middlewares
app.use(morgan("dev")); // Configura Morgan para mostrar logs en formato 'dev'
app.use(express.json()); // Middleware para parsear JSON en el body de las peticiones

app.get("/note.txt", (req, res) => {
  res.send("esto no es un archivo");
});

// Configuración de variables de la aplicación
app.set("nombre de la app", "express course"); // Establece una variable global de la aplicación

// RUTAS (ENDPOINTS) DE LA API

// GET /products - Obtener todos los productos
app.get("/products", (req, res) => {
  res.json(products);
});

// POST /products - Crear un nuevo producto
app.post("/products", (req, res) => {
  // Crea un nuevo producto con los datos del body y genera un ID automático
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  res.send(newProduct);
});

// PUT /products/:id - Actualizar un producto existente
app.put("/products/:id", (req, res) => {
  const newData = req.body; // Datos actualizados del producto
  // Busca el producto por ID
  const productFound = products.find(
    (product) => product.id === Number.parseInt(req.params.id)
  );

  // Si no encuentra el producto, devuelve error 404
  if (!productFound) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Actualiza el producto manteniendo el mismo ID y mezclando los nuevos datos
  const newProducts = products.map((p) =>
    p.id === Number.parseInt(req.params.id) ? { ...p, ...newData } : p
  );
  res.json({ message: "Product update successfully" });
});

// DELETE /products/:id - Eliminar un producto
app.delete("/products/:id", (req, res) => {
  // Busca el producto por ID
  const productFound = products.find(
    (product) => product.id === Number.parseInt(req.params.id)
  );

  // Si no encuentra el producto, devuelve error 404
  if (!productFound) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Filtra el array para eliminar el producto con el ID especificado
  products = products.filter((p) => p.id !== Number.parseInt(req.params.id));
  res.sendStatus(204); // Responde con código 204 (No Content) indicando éxito
});

// GET /products/:id - Obtener un producto específico por su ID
app.get("/products/:id", (req, res) => {
  // Busca el producto por ID
  const productFound = products.find((product) => {
    return product.id === Number.parseInt(req.params.id);
  });

  // Si no encuentra el producto, devuelve error 404
  if (!productFound) {
    res.status(404).send("Product not found");
    return;
  }
  res.send(productFound);
});

app.use("/public", express.static("./public")); // Configura Express para servir archivos estáticos desde la carpeta 'public'

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
