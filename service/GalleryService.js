const pool = require('../config/database');

const getAllPictures= async ()=>{
    const [rows]=await pool.query(`
        SELECT * FROM gallery`);
        return rows;
}

const getPicture=async(id)=>{
    const [rows]=await pool.query(`
        SELECT * FROM gallery WHERE id=?`,[id]);
        return rows[0];
}

const createPicture=async(ImageInfo)=>{
    console.log("ImageInfo",ImageInfo)
    const result= await pool.query(`
        INSERT INTO gallery(image_filename,image_path,image_size,image_mimetype) VALUES(?,?,?,?)
        `,[ImageInfo?.image_filename,ImageInfo?.image_path,ImageInfo?.image_size,ImageInfo?.image_mimetype]);
        return result;
}

const deletePicture=async(id)=>{
    const result=await pool.query(
        `DELETE FROM gallery WHERE id=?`,[id]
    );
    return result;
}

module.exports={
    getAllPictures,getPicture,createPicture,deletePicture
}
