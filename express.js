import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import fsn from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// These two lines are needed to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'arr.html'));
});

app.post('/Arcode', async (req, res) => {
  const a = req?.body.a;
  let basepath = a;
  let files = await fs.readdir(a);
  for (const item of files) {
    let ext = path.extname(item);
    if (ext != ".js" && ext != ".json" && item.split(".").length > 1) {
      if (fsn.existsSync(path.join(basepath, ext))) {
        await fs.rename(path.join(basepath, item), path.join(basepath, ext, item));
      } else {
        await fs.mkdir(path.join(basepath, ext));
      }
    }
  }
  res.send('Received: ' + a);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
