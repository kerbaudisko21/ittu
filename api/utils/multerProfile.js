import multer from 'multer';
import fs from 'fs';

const defaultPath = 'public';

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    // console.log('multebosss');
    let directoryExists = fs.existsSync(`${defaultPath}/userProfile`);
    if (!directoryExists) {
      await fs.promises.mkdir(`${defaultPath}/userProfile`, {
        recursive: true,
      });
    }
    cb(null, `${defaultPath}/userProfile`);
  },
  filename: (req, file, cb) => {
    cb(null, `PPIMG-${Date.now()}.${file.mimetype.split('/')[1]}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[1] === 'jpg' || file.mimetype.split('/')[1] === 'jpeg' || file.mimetype.split('/')[1] === 'png') {
    cb(null, true);
  } else {
    cb(new Error('file not supported'));
  }
};

const multerProfile = multer({ storage: storage, fileFilter: fileFilter });

export default multerProfile;
// module.exports = {
//   multerProfile,
// };
