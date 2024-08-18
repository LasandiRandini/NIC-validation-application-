
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import axios from 'axios';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).array('files', 4);


const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const uploadFiles = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to upload files.' });
    }

    if (req.files.length !== 4) {
      return res.status(400).json({ error: 'Exactly four CSV files must be uploaded.' });
    }

    try {
      
      const filePaths = req.files.map(file => path.join(__dirname, '../../', file.path));

      
      
      const validationResponse = await axios.post('http://localhost:3004/api/nicvalidate/validate-nics', {
        files: filePaths,
      });
      
      
      res.status(200).json({ message: 'Files uploaded and sent for validation.', data: validationResponse.data });
    } catch (error) {
      console.error('Error during file upload and validation:', error);
      res.status(500).json({ error: 'Failed to process the uploaded files.' });
    }
  });
};