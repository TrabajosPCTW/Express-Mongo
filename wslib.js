const WebSocket = require("ws");

const clients = [];
let msj = require("./bin/mensajes.json");
let messages = msj.mensajes;

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (message) => {
      messages.push(message);
      sendMessages();
    });
  });

  const sendMessages = () => {
    clients.forEach((client) => {if (client != clients[0]) {client.send(JSON.stringify(messages))}});
  };
};

exports.wsConnection = wsConnection;