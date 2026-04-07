// База данных пользователей (в памяти сервера для 20 человек)
const users = {}; 

// Настройки ролей
const ROLES = {
    OWNER: { name: 'Owner', color: '#ff0000', power: 100 }, // Твой красный префикс
    MOD: { name: 'Moder', color: '#ffa500', power: 50 },   // Оранжевый для модеров
    USER: { name: 'User', color: '#ffffff', power: 1 }
};

// Функция обработки команд
function handleCommand(userId, text) {
    const user = users[userId];
    const args = text.split(' ');
    const cmd = args[0].toLowerCase();

    // Команда на получение Владельца
    if (cmd === '/addown') {
        user.role = ROLES.OWNER;
        user.isPremium = true;
        return "Система: Вы назначены Владельцем HydMes. Префикс [Owner] активирован.";
    }

    // Команды модерации (доступны Owner и Mod)
    if (user.role.power >= 50) {
        if (cmd === '/freeze') {
            const targetId = args[1];
            if (users[targetId]) {
                users[targetId].isFrozen = true;
                return `Модерация: Аккаунт ${targetId} заморожен.`;
            }
        }
        
        if (cmd === '/mute') {
            const targetId = args[1];
            if (users[targetId]) {
                users[targetId].isMuted = true;
                return `Модерация: Пользователь ${targetId} получил мут.`;
            }
        }
    }

    // Команды только для Owner (выдать премиум за 10р)
    if (user.role.power === 100) {
        if (cmd === '/setpremium') {
            const targetId = args[1];
            if (users[targetId]) {
                users[targetId].isPremium = true;
                return `Система: Пользователю ${targetId} выдан Premium статус.`;
            }
        }
    }

    return "Ошибка: Недостаточно прав или неверная команда.";
}
