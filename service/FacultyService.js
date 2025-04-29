const pool=require('./../config/database');

const getAllFaculties = async () => {
    const [rows] = await pool.query(`SELECT * FROM faculty`);
    return rows;
}

const getFaculty = async (id) => {
    const [rows] = await pool.query(`
        SELECT * FROM faculty WHERE id=?`,
        [id]);
    return rows[0];
}

const createFaculty = async ({ name, designation, experience, email, about, education, achievements, workExperience, imageInfo }) => {
    const result = await pool.query(`
        INSERT INTO 
        faculty(name, designation, experience, email, about, education, achievements,workExperience,image_filename,image_path,image_mimetype,image_size) 
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
        [name, designation, experience, email, about,
            education, achievements, workExperience,
            imageInfo?.filename, imageInfo?.path, imageInfo?.mimetype, imageInfo?.size]);
    return result;
}

const updateFaculty = async (id, name, designation, experience, email, about, education, achievements, workExperience, imageInfo) => {
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

    return getFaculty(id);
}

const deleteFaculty = async (id) => {
    const result = await pool.query(`
        DELETE FROM
        faculty 
        WHERE id=?`,
        [id]
    );
    return result;
}

module.exports = {
    getAllFaculties,
    getFaculty,
    createFaculty,
    updateFaculty,
    deleteFaculty
}




