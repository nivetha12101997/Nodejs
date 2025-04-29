const pool = require('../config/database');

const getAllSchedules=async ()=>{
    const [rows]=await pool.query(`
        SELECT * FROM schedules`);
        return rows;
}

const getSchedule=async(id)=>{
    const [rows]=await pool.query(`
        SELECT * FROM schedules WHERE id=?`,[id]);
        return rows[0];
}

const createSchedule=async ({pdf_filename,pdf_path,pdf_size,pdf_mimetype},topic,subject)=>{
    console.log("Course Info",topic,subject);
    const result = await pool.query(`
        INSERT INTO schedules(pdf_filename,pdf_path,pdf_size,pdf_mimetype,course_group,course_subject) VALUES(?,?,?,?,?,?)`,
        [pdf_filename,pdf_path,pdf_size,pdf_mimetype,topic,subject]);
        return result;
}

const deleteSchedule=async(id)=>{
    const result= await pool.query(`
        DELETE FROM schedules WHERE id=?`,[id]);
        return result;
}

module.exports={
    getAllSchedules,getSchedule,createSchedule,deleteSchedule
}