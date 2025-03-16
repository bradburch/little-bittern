import multer from "multer";
import util from "util";

const multerUpload = multer({ dest: '/tmp/uploads/' }).single("file");
export const uploadFile = util.promisify(multerUpload);