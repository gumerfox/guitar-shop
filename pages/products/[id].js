import pool from '../../../lib/db';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { id } = req.query;

    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.query('SELECT id, name, description, price, image, category, brand FROM products WHERE id = ?', [id]);
        conn.release();

        // Проверяем, найден ли товар
        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: 'Товар не найден' });
        }

        // Преобразуем price в число
        const product = {
            ...rows[0],
            price: parseFloat(rows[0].price), // Преобразуем price в число
        };

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении товара' });
    }
}