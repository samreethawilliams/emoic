import express from "express";
import cors from "cors";
import multer from "multer";
import { sync } from "cross-spawn";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".mp3");
  },
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
});

const upload = multer({ storage });

const app = express();
const port = 8080;

app.use(cors());

app.get("/", (req, res) => {
  res.json("Emoic says hello!!");
});

app.post("/upload_files", upload.single("file"), async (req, res) => {
  const originalFileName = req.file.filename;
  process.chdir("/Users/joelmathew/WebProjects/emoic/backend/uploads");
  const [fileName] = originalFileName.split(".mp3");

  const ffmpegprocess = sync(
    "ffmpeg",
    ["-i", `${originalFileName}`, "-ar", "16000", `${fileName}.wav`],
    {
      stdio: "inherit",
    }
  );

  const error = ffmpegprocess.error;

  if (error) {
    res.send({
      status: false,
      message: "Some error occurred",
    });
  } else {
    res.send({
      status: true,
      convertedAudioFile: `${fileName}.wav`,
      message: "Sucessfully uploaded and converted the files",
    });
  }
});

app.listen(port, () => {
  console.log(`Upload server listening at http://localhost:${port}`);
});
