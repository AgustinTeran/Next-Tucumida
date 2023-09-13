var router = require("express").Router()


router.use("/categorias",require("./categorias"))
router.use("/imagenes",require("./imagenes"))
router.use("/restaurantes",require("./restaurantes"))
router.use("/ubicaciones",require("./ubicaciones"))
router.use("/usuarios",require("./usuarios"))


module.exports = router