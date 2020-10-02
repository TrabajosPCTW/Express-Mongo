const { JSONCookies } = require("cookie-parser");
var express = require("express");
var router = express.Router();
var [
  getMensajes,
  insertMensaje,
  getMensaje,
  deleteMensaje,
  updateMensaje,
] = require("../controllers/mensaje");

/* GET Mensajes*/
router.get("/", async function (req, res) {
  const mensajes = await getMensajes();
  res.send(mensajes);
});

/* POST Mensaje */
router.post("/", async function (req, res) {
  const newMessage = await insertMensaje(req.body);
  res.send(newMessage);
});

/* GET Mensaje por timestamp*/
router.get("/:ts", async function (req, res) {
  const mensaje = await getMensaje(parseInt(req.params.ts));
  if (mensaje == null) {
    return res
      .status(404)
      .send(
        "No fue encontrado ningun mensaje con el timestamp: " + req.params.ts
      );
  }
  res.send(mensaje);
});

/* DELETE mensaje por timestamp */
router.delete("/:id", async function (req, res) {
  const mensaje = await deleteMensaje(parseInt(req.params.ts));
  if (mensaje == null) {
    return res
      .status(404)
      .send(
        "No fue encontrado ningun mensaje con el timestamp: " + req.params.ts
      );
  }
  res.send(mensaje);
});

/* PUT mensaje */
router.put("/:ts", async function (req, res) {
  const schema = joi.object({
    message: joi.string().min(5).required(),
    author: joi
      .string()
      .pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/)
      .required(),
    ts: joi.number().required(),
  });

  const { error } = schema.validate(msg);

  if (error) {
    return res.status(400).send(error);
  }

  let msg = {
    message: req.body.message,
    author: req.body.author,
    ts: parseInt(req.params.id),
  };

  const mensaje = await updateMensaje(msg);

  if (mensaje == null) {
    return res
      .status(404)
      .send(
        "No fue encontrado ningun mensaje con el timestamp: " + req.params.ts
      );
  }
  res.send(mensaje);
});

module.exports = router;
