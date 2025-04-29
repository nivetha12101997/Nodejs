const pool = require('../config/database');

const getAllFeesStructure = async () => {
    const [rows] = await pool.query(`SELECT * FROM fees_structure`);
    return rows;
}

const getFeesStructure = async (id) => {
    const [rows] = await pool.query(`SELECT * FROM fees_structure WHERE id=?`, [id]);
    return rows[0];
}

const createFeesStructure = async ({ program, tuitionFee, registration, inclusion, total }) => {
    const result = await pool.query(`
        INSERT INTO fees_structure (program,tuitionFee,registration,inclusion,total) values(?,?,?,?,?)`,
        [program, tuitionFee, registration, inclusion, total]);
    return result;
}

const updateFeesStructure = async (id, { program, tuitionFee, registration, inclusion, total }) => {
    const result = await pool.query(`UPDATE fees_structure
        SET program=?,tuitionFee=?,registration=?,inclusion=?,total=? WHERE id=?`,
        [program, tuitionFee, registration, inclusion, total, id]);
    return getFeesStructure(id);
}

const deleteFeesStructure = async (id) => {
    const result = await pool.query(`DELETE FROM fees_structure
        WHERE id=?`, [id]);
    return result;
}

module.exports = {
    getAllFeesStructure, getFeesStructure, createFeesStructure, updateFeesStructure, deleteFeesStructure
}