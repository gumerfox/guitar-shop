export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { TransactionId, Amount, Currency, Status } = req.body;

        // Обработка уведомления о платеже
        console.log('Получен вебхук:', { TransactionId, Amount, Currency, Status });

        // Ответ для CloudPayments
        res.status(200).json({ code: 0 });
    } else {
        res.status(405).json({ message: 'Метод не разрешён' });
    }
}