// backend/server.js
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/generate-caption', upload.single('image'), (req, res) => {
  const imagePath = path.resolve(req.file.path);

  exec(`python caption.py "${imagePath}"`, (err, stdout, stderr) => {
    fs.unlinkSync(imagePath); // clean up image
    if (err) {
      console.error('Python error:', stderr);
      return res.status(500).json({ error: 'Caption generation failed' });
    }
    res.json({ caption: stdout.trim() });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
