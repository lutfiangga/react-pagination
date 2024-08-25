import User from "../models/userModel.js";
import { Op } from "sequelize";

export const getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10; // Memperbaiki penggunaan `limit`
        const search = req.query.search_query || ''; // Memperbaiki query parameter `search`
        const offset = limit * page;

        // Menghitung total baris
        const totalRows = await User.count({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: "%" + search + "%" } },
                    { email: { [Op.like]: "%" + search + "%" } }
                ]
            }
        });

        const totalPage = Math.ceil(totalRows / limit);

        // Mendapatkan hasil
        const result = await User.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: "%" + search + "%" } },
                    { email: { [Op.like]: "%" + search + "%" } }
                ]
            },
            offset: offset,
            limit: limit,
            order: [['id', 'DESC']],
        });

        // Mengembalikan hasil dalam respon
        res.json({
            result:result,
            page:page,
            limit:limit,
            totalRows:totalRows,
            totalPage:totalPage
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
