const express = require("express");
const cors = require("cors");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const { sync } = require("cross-spawn");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
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

app.post("/upload_files", upload.single("file"), (req, res) => {
  const originalFileName = req.file.originalname;
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
      message: "Sucessfully uploaded and converted the files",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
