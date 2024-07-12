import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { whisper } from "whisper-node";
import ngrok from "@ngrok/ngrok";
import Sentiment from "sentiment";

const sentiment = new Sentiment();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to >
const __dirname = path.dirname(__filename); // get the name of the directory

const app = express();
const port = 8085;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Transcribe server says hi!");
});

app.get("/transcribe", async (req, res) => {
  // Need to provide exact path to your audio file.
  const filePath = path.resolve(__dirname, `uploads/${req.body.audioName}`);

  const options = {
    modelName: "base.en", // default
    // modelPath: "/custom/path/to/model.bin", // use model in a custom directory (cannot use along with 'modelName')
    whisperOptions: {
      language: "auto", // default (use 'auto' for auto detect)
      gen_file_txt: false, // outputs .txt file
      gen_file_subtitle: false, // outputs .srt file
      gen_file_vtt: false, // outputs .vtt file
      word_timestamps: true, // timestamp for every word
      // timestamp_size: 0      // cannot use along with word_timestamps:true
    },
  };

  const transcript = await whisper(filePath, options);
  console.log("transcript: ", transcript);

  const sentences = [];
  if (transcript) {
    let sentence = "";
    transcript.forEach((trans) => {
      // we have reached the end of a sentence
      if (trans.speech === ".") {
        // no space at the end
        sentence += trans.speech;
        sentences.push(sentence);
        sentence = "";
      } else {
        sentence += `${trans.speech} `;
      }
    });

    console.log("sentences: ", sentences);
  }

  sentences.forEach((sentence) => {
    console.log("the sentence: ", sentence);
    console.log("sentiment score: ", sentiment.analyze(sentence));
  });

  res.send({
    status: true,
    transcript,
  });
});

app.listen(port, () => {
  console.log(`Transcribe server listening at http://localhost:${port}`);
});

// ngrok
if (process.env.USE_NGROK === "true") {
  ngrok
    .connect({ addr: port, authtoken_from_env: true })
    .then((listener) =>
      console.log(
        `Transcribe server: Ingress established at: ${listener.url()}`
      )
    );
}
