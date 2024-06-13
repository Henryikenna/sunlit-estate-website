// 'use strict'

// // pages/api/upload.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import formidable from 'formidable';
// import fs from 'fs';
// import path from 'path';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const uploadDir = path.join(process.cwd(), '/public/uploads');

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     const form = new formidable.IncomingForm();
//     form.uploadDir = uploadDir;
//     form.keepExtensions = true;

//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         res.status(500).json({ error: 'Error parsing files' });
//         return;
//       }

//       const file = files.file as formidable.File;
//       const filePath = path.join(uploadDir, file.newFilename);

//       fs.rename(file.filepath, filePath, (renameErr) => {
//         if (renameErr) {
//           res.status(500).json({ error: 'Error saving file' });
//           return;
//         }

//         res.status(200).json({ message: 'File uploaded successfully', filePath: `/uploads/${file.newFilename}` });
//       });
//     });
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// };

// export default handler;


'use strict'

// import type { NextApiRequest, NextApiResponse } from 'next';
// import formidable, { Fields, Files } from 'formidable';
// import fs from 'fs';
// import path from 'path';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const uploadDir = path.join(process.cwd(), '/public/uploads');

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     const form = new formidable.IncomingForm();
//     form.uploadDir = uploadDir;
//     form.keepExtensions = true;

//     form.parse(req, (err: any, fields: Fields, files: Files) => {
//       if (err) {
//         res.status(500).json({ error: 'Error parsing files' });
//         return;
//       }

//       const file = files.file as formidable.File;
//       const filePath = path.join(uploadDir, file.newFilename);

//       fs.rename(file.filepath, filePath, (renameErr) => {
//         if (renameErr) {
//           res.status(500).json({ error: 'Error saving file' });
//           return;
//         }

//         res.status(200).json({ message: 'File uploaded successfully', filePath: `/uploads/${file.newFilename}` });
//       });
//     });
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// };

// export default handler;


'use strict'

import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { IncomingForm, Fields, Files, File } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), '/public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const form = new IncomingForm({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 50 * 1024 * 1024, // 50 MB
      multiples: false,
    });

    form.parse(req, (err: any, fields: Fields, files: Files) => {
      if (err) {
        res.status(500).json({ error: 'Error parsing files' });
        return;
      }

      const file = files.file as File[];
      const filePath = path.join(uploadDir, file[0].newFilename!);

      fs.rename(file[0].filepath, filePath, (renameErr) => {
        if (renameErr) {
          res.status(500).json({ error: 'Error saving file' });
          return;
        }

        res.status(200).json({ message: 'File uploaded successfully', filePath: `/uploads/${file[0].newFilename}` });
      });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
