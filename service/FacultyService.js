const mysql = require('mysql2');
const dotenv = require('dotenv');


dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();


// const pool=require('./../config/database');



const getAllFaculties = async () => {
    const [rows] = await pool.query(`SELECT * FROM faculty`);
    console.log("rows from db \n", rows);
    return rows;
}

const getFaculty = async (id) => {
    console.log("id", id);
    const [rows] = await pool.query(`
        SELECT * FROM faculty WHERE id=?`,
        [id]);
    console.log("rows from db... \n", rows);
    return rows[0];
}




const createFaculty = async ({ name, designation, experience, email, about, education, achievements, workExperience, imageInfo }) => {
    console.log('create FAculty...!! ', imageInfo)
    const result = await pool.query(`
        INSERT INTO 
        faculty(name, designation, experience, email, about, education, achievements,workExperience,image_filename,image_path,image_mimetype,image_size) 
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
        [name, designation, experience, email, about,
            education, achievements, workExperience,
            imageInfo?.filename, imageInfo?.path, imageInfo?.mimetype, imageInfo?.size]);
    console.log("rows from db after createing pOst\n", result);
    return result;
}

const updateFaculty = async (id, name, designation, experience, email, about, education, achievements, workExperience, imageInfo) => {
    console.log("update Faculy ... ")
    const result = await pool.query(`
       UPDATE faculty
       SET name = ?,
       designation = ?,
       experience = ?,
       email = ?,
       about = ?,
       education = ?,
       achievements = ?,
       workExperience = ?,
       image_filename=?,image_path=?,image_mimetype=?,image_size=?
       WHERE id = ?`,
        [name, designation, experience, email, about,
            education, achievements, workExperience,
            imageInfo?.filename, imageInfo?.path, imageInfo?.mimetype, imageInfo?.size,
            id]
    );

    console.log("rows from db \n", result);
    return getFaculty(id);
}

const deleteFaculty = async (id) => {
    const result = await pool.query(`
        DELETE FROM
        faculty 
        WHERE id=?`,
        [id]
    );
    console.log("rows from db \n", result);
    return result;
}

module.exports = {
    getAllFaculties,
    getFaculty,
    createFaculty,
    updateFaculty,
    deleteFaculty
}




