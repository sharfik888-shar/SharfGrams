const WebSocket = require('ws');

// Render сам выдаст порт, если нет — используем 8080
const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

console.log(`Сервер Шарф Грамс запущен на порту ${PORT}`);

wss.on('connection', (ws) => {
    console.log('Новый пользователь подключился');

    ws.on('message', (message) => {
        // Пересылаем сообщение ВСЕМ, кто сейчас онлайн
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on('close', () => {
        console.log('Пользователь отключился');
    });
});
