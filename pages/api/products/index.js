import pool from '../../../lib/db';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const conn = await pool.getConnection();
        const rows = await conn.query('SELECT id, name, description, price, image, category, brand FROM products');
        conn.release();

        // Преобразуем price в число, если это необходимо
        const products = rows.map((row) => ({
            ...row,
            price: parseFloat(row.price), // Преобразуем price в число
        }));

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products' });
    }
}