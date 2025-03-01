import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { cardNumber, expDate, cvv, amount, currency } = req.body;

        try {
            // Данные для запроса к CloudPayments
            const paymentData = {
                Amount: amount, // Сумма платежа
                Currency: currency || 'RUB', // Валюта (по умолчанию RUB)
                IpAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress, // IP пользователя
                Name: 'CARDHOLDER NAME', // Имя держателя карты (можно запросить у пользователя)
                CardCryptogramPacket: generateCryptogramPacket(cardNumber, expDate, cvv), // Криптограмма карты
                PublicId: 'YOUR_PUBLIC_ID', // Ваш Public ID из CloudPayments
            };

            // Отправка запроса к CloudPayments
            const response = await axios.post(
                'https://api.cloudpayments.ru/payments/charge',
                paymentData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    auth: {
                        username: 'YOUR_PUBLIC_ID',
                        password: 'YOUR_API_SECRET',
                    },
                }
            );

            // Успешный платеж
            res.status(200).json({ success: true, data: response.data });
        } catch (error) {
            // Ошибка платежа
            res.status(500).json({ success: false, message: error.response?.data?.Message || 'Ошибка платежа' });
        }
    } else {
        res.status(405).json({ message: 'Метод не разрешён' });
    }
}

// Функция для генерации криптограммы карты (пример)
function generateCryptogramPacket(cardNumber, expDate, cvv) {
    // В реальном проекте используйте библиотеку для шифрования, например, crypto-js
    return `${cardNumber}|${expDate}|${cvv}`;
}