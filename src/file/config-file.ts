import { extname } from "path/posix";
import { diskStorage } from "multer";
export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname)

    callback(null, `${name}${fileExtName}`);
};

export const multerConfig = {

    storage: diskStorage({
        destination: '../download/file-uploaded/', filename: editFileName
    })
}