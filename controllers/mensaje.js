const mdbconn = require('../lib/utils/mongo.js');

function getMensajes() {
    return mdbconn.conn().then((client) => {
      return client.db('chat').collection('mensajes').find({}).toArray();
    });
  }

  function insertMensaje(message) {
    return mdbconn.conn().then((client) => {
      return client.db('chat').collection('mensajes').insertOne(message);
    });
  }

  function getMensaje(ts) {
    return mdbconn.conn().then((client => {
      return client.db('chat').collection('mensajes').findOne({ts: ts});
    }));
  }

  function deleteMensaje(ts) {
    return mdbconn.conn().then((client => {
      return client.db('chat').collection('mensajes').deleteOne({ts: ts});
    }));
  }

  function updateMensaje(mensaje) {
    return mdbconn.conn().then((client => {
      return client.db('chat').collection('mensajes').updateOne({ts: mensaje.ts}, {$set : { author: mensaje.author, message: mensaje.message}});
    }));
  }

  module.exports = [getMensajes, insertMensaje, getMensaje, deleteMensaje, updateMensaje];