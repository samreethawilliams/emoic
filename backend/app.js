import express from "express";
import cors from "cors";
import multer from "multer";
import { sync } from "cross-spawn";
import ngrok from "@ngrok/ngrok";
import pg from "pg";
import argon2 from "argon2";

// database connection
const { Client } = pg;
const connectionString = "postgresql://postgres:postgres@localhost:5432/emoic";

const client = new Client({ connectionString });
await client.connect();

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },

  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
});

const upload = multer({ storage: storage });

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Emoic says hello!!");
});

app.post("/upload-audio", upload.single("file"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
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
    process.chdir("/Users/joelmathew/WebProjects/emoic/backend");
    res.send({
      status: false,
      message: "Some error occurred",
    });
  } else {
    process.chdir("/Users/joelmathew/WebProjects/emoic/backend");
    res.send({
      status: true,
      convertedAudioFile: `${fileName}.wav`,
      message: "Sucessfully uploaded and converted the files",
    });
  }
});

// sign up api
app.post("/sign-up", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.send({
      status: false,
      message: "Required sign up fields missing",
    });
  }

  const hashedPassword = await argon2.hash(password);

  try {
    await client.query(
      `
      insert into users
      (name, email, password)
      values
      ($1, $2, $3)`,
      [name, email, hashedPassword]
    );

    return res.send({
      status: true,
      user: { name: name, email },
      message: "User has been registered successfully",
    });
  } catch (err) {
    if (err.code === "23505") {
      return res.send({
        status: false,
        message: "User is already registered",
      });
    }
    console.error(err);
  }
});

// login api
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send({
      status: false,
      message: "Required login fields missing",
    });
  }

  let user;

  try {
    //select * from users where email='bob@bob.com'
    const tempRes = await client.query(
      `
      select * from users
      where email=$1
      `,
      [email]
    );
    user = tempRes.rows[0];
  } catch (err) {
    console.log(err);
    return res.send({
      status: false,
      message: "Some error occurred",
    });
  }

  if (!user) {
    return res.send({
      status: false,
      message: "User does not exist",
    });
  }

  const valid = await argon2.verify(user.password, password);

  if (!valid) {
    return res.send({
      status: false,
      message: "Invalid credentials",
    });
  }

  return res.send({
    status: true,
    user: { name: user.name, email },
  });
});

app.listen(port, () => {
  console.log(`Upload server listening at http://localhost:${port}`);
});

// ngrok
if (process.env.USE_NGROK === "true") {
  ngrok
    .connect({ addr: port, authtoken_from_env: true })
    .then((listener) =>
      console.log(`Ingress established at: ${listener.url()}`)
    );
}
