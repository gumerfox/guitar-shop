import pool from '../../../lib/db';

export default async function handler(req, res) {
    const { method, body } = req;

    try {
        const conn = await pool.getConnection();

        if (method === 'POST') {
            const { name, description, price, image, category, brand } = body;

            // Проверка обязательных полей
            if (!name || !price || !brand) {
                return res.status(400).json({ message: 'Необходимо указать название, цену и бренд' });
            }

            const result = await conn.query(
                'INSERT INTO products (name, description, price, image, category, brand) VALUES (?, ?, ?, ?, ?, ?)',
                [name, description, price, image, category, brand]
            );

            const newProduct = {
                id: result.insertId,
                name,
                description,
                price,
                image,
                category,
                brand,
            };

            res.status(201).json(newProduct);
        } else if (method === 'PUT') {
            const { id, name, description, price, image, category, brand } = body;

            // Проверка обязательных полей
            if (!name || !price || !brand) {
                return res.status(400).json({ message: 'Необходимо указать название, цену и бренд' });
            }

            await conn.query(
                'UPDATE products SET name = ?, description = ?, price = ?, image = ?, category = ?, brand = ? WHERE id = ?',
                [name, description, price, image, category, brand, id]
            );

            const updatedProduct = { id, name, description, price, image, category, brand };
            res.status(200).json(updatedProduct);
        } else if (method === 'DELETE') {
            const { id } = body;
            await conn.query('DELETE FROM products WHERE id = ?', [id]);
            res.status(200).json({ message: 'Товар удалён' });
        }

        conn.release();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка обработки запроса' });
    }
}