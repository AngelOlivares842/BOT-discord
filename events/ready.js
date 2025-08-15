
//actividad del
module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`✅ ${client.user.tag} listo!`);
    client.user.setActivity('OverWatch 2');
  }
};

//🔄 Flujo de despliegue
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bot Online!');
  console.log(client.application.commands.cache.map(cmd => cmd.name));
});
server.listen(process.env.PORT || 3000);