// import { Request } from 'express';
// import multer from 'multer'

// type DestinationCallback = (error: Error | null, destination: string) => void
// type FileNameCallback = (error: Error | null, filename: string) => void

// const maxSize = 2 * 1024 * 1024;

// const storage = multer.diskStorage({
//     destination: (
//         req: Request,
//         file: Express.Multer.File,
//         callback: DestinationCallback
//     ): void => {
//         callback(null, '/tmp/uploads/');
//     },

//     filename: (
//         req: Request, 
//         file: Express.Multer.File, 
//         callback: FileNameCallback
//     ): void => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         callback(null, file.fieldname + '-' + uniqueSuffix)
//     }
// });