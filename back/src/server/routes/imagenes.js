var router = require("express").Router()
const { backURL } = require("../../config");
var {sequelize, Op} = require("../../db")

var authMiddleware = require("../middlewares/auth")


const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];

router.get("/", async (req, res) => {
  try {
    const imagenes = await sequelize.models.imagenes.findAll({
      attributes: ['id'] // Solo selecciona el campo 'id'
    });

    const ids = imagenes.map(imagen => imagen.id);

    res.status(200).send( ids );
  } catch (error) {
    console.error("Error al obtener los IDs de las imágenes", error);
    res.status(500).send({ message: "Hubo un error al obtener los IDs de las imágenes", status: 500 });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const imagen = await sequelize.models.imagenes.findByPk(id);

    if (!imagen) {
      res.status(404).send({ message: "Imagen no encontrada", status: 404 });
      return;
    }

    // Obtén los datos de la imagen y su tipo desde la base de datos
    const imagenData = imagen.imagen; // Esto asumiendo que "imagen.imagen" contiene los datos de la imagen en formato BLOB
    const tipoImagen = imagen.tipo;

    // Configura los encabezados de respuesta adecuados para el tipo de imagen
    res.setHeader("Content-Type", `image/${tipoImagen}`);

    // Envía la imagen como respuesta
    res.send(imagenData);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Hubo un error al traer la imagen", status: 500 });
  }
});

router.put("/:id", upload.single("imagen"), async (req, res) => {
  try {
    const { id } = req.params;
    const { buffer, originalname, mimetype } = req.file;

    // Verifica si el tipo de archivo es permitido
    if (!allowedFileTypes.includes(mimetype)) {
      res.status(400).send({ message: "Tipo de archivo no permitido", status: 400 });
      return;
    }

    const imagenExistente = await sequelize.models.imagenes.findByPk(id);

    if (!imagenExistente) {
      res.status(404).send({ message: "Imagen no encontrada", status: 404 });
      return;
    }

    // Realiza la actualización de la imagen
    await imagenExistente.update({
      imagen: buffer,
      tipo: mimetype.split("/")[1],
    });

    res.status(200).send({ message: "Imagen actualizada con éxito", imagen: `${backURL}/imagenes/${id}`});
  } catch (error) {
    console.error("Error al actualizar la imagen", error);
    res.status(500).send({ message: "Hubo un error al actualizar la imagen", status: 500 });
  }
});

router.post("/", upload.single("imagen"), async (req, res) => {
  try {
    const { buffer, originalname, mimetype } = req.file;

    // Verifica si el tipo de archivo es permitido
    if (!allowedFileTypes.includes(mimetype)) {
      res.status(400).send({ message: "Tipo de archivo no permitido", status: 400 });
      return;
    }

    // Inserta la imagen en la base de datos
    const nuevaImagen = await sequelize.models.imagenes.create({
      imagen: buffer,
      tipo: mimetype.split("/")[1], // Obtén la extensión desde el mimetype
    });

    res.status(201).send({ message: "Imagen subida con éxito", imagen: `${backURL}/imagenes/${nuevaImagen.id}` });
  } catch (error) {
    console.error("Error al subir la imagen", error);
    res.status(500).send({ message: "Hubo un error al subir la imagen", status: 500 });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const imagenExistente = await sequelize.models.imagenes.findByPk(id);

    if (!imagenExistente) {
      res.status(404).send({ message: "Imagen no encontrada", status: 404 });
      return;
    }

    // Realiza la eliminación de la imagen
    await imagenExistente.destroy();

    res.status(200).send({ message: "Imagen eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar la imagen", error);
    res.status(500).send({ message: "Hubo un error al eliminar la imagen", status: 500 });
  }
});


module.exports = router