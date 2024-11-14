import db from '../config/db.js';

export const getAllNhom = (req, res) => {
    const sql = 'SELECT * FROM nhom';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.render('nhom', { nhomList: results });
    });
};
