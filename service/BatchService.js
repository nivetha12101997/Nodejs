const pool = require('./../config/database');

const getAllBatches = async () => {
    const [rows] = await pool.query(`SELECT * FROM batches`);
    return rows;
}

const getBatch = async (id) => {
    const row = await pool.query(`SELECT * FROM batches WHERE id=?`, [id]);
    return row[0];
}

const createBatch = async ({batchName,subjects,languages,startDate,duration,fees}) => {
    const response = await pool.query(`INSERT INTO 
        batches (batchName,subjects,languages,startDate,duration,fees) 
        VALUES (?,?,?,?,?,?)`, [batchName, subjects, languages, startDate, duration, fees]);
    return response;
}

const updateBatch = async (id,{batchName,subjects,languages,startDate,duration,fees}) => {
    const response = await pool.query(`UPDATE batches 
        SET batchName=?,subjects=?,languages=?,startDate=?,duration=?,fees =? 
        WHERE id=?`,
        [batchName, subjects, languages, startDate, duration, fees,id]);

    return getBatch(id);
}

const deleteBatch = async (id) => {
    const response = await pool.query(`DELETE FROM batches WHERE id=?`, [id])
    return response;
}

module.exports = {
    getAllBatches, getBatch, createBatch, updateBatch, deleteBatch
}