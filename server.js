const ROLES = {
    OWNER: { name: 'Owner', power: 100 },
    MOD: { name: 'Moder', power: 50 },
    USER: { name: 'User', power: 1 }
};

let users = {}; // Храним до 20 пользователей

function processCommand(adminId, command) {
    const admin = users[adminId];
    const args = command.split(' ');
    const action = args[0]; // Например /freeze
    const targetId = args[1]; // ID того, кого наказываем

    // Права Овнера (самые высокие)
    if (admin.role.power === 100) {
        if (action === '/addmod') {
            users[targetId].role = ROLES.MOD;
            return `Пользователь ${targetId} теперь Модератор.`;
        }
        if (action === '/setpremium') {
            users[targetId].isPremium = true;
            return `Premium активирован для ${targetId}.`;
        }
    }

    // Права Модератора (и Овнера тоже)
    if (admin.role.power >= 50) {
        if (action === '/freeze') {
            users[targetId].status = 'frozen';
            return `Аккаунт ${targetId} заморожен!`;
        }
        if (action === '/mute') {
            users[targetId].canWrite = false;
            return `Пользователь ${targetId} получил мут.`;
        }
    }
    
    return "Ошибка: Неизвестная команда или нет прав.";
}
