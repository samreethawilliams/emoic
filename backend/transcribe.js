import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { whisper } from "whisper-node";
import ngrok from "@ngrok/ngrok";
import Sentiment from "sentiment";

function timestampToMillis(timestamp) {
  const [hours, minutes, seconds] = timestamp.split(":");
  const [secs, millis] = seconds.split(".").map(Number);
  return (
    Number(hours) * 3600000 + Number(minutes) * 60000 + secs * 1000 + millis
  );
}

function constructSentencesWithEmotion(data) {
  const sentiment = new Sentiment();
  let sentences = [];
  let currentSentence = "";
  let startTimestamp = data[0].start;
  let startMillis = timestampToMillis(startTimestamp);

  data.forEach((wordObj, index) => {
    currentSentence += wordObj.speech;

    if (wordObj.speech === "," || wordObj.speech === ".") {
      const sentimentResult = sentiment.analyze(currentSentence.trim());
      sentences.push({
        start: startTimestamp,
        startMillis: startMillis,
        end: wordObj.end,
        endMillis: timestampToMillis(wordObj.end),
        sentence: currentSentence.trim(),
        sentiment: sentimentResult,
      });

      // Prepare for the next sentence
      currentSentence = "";
      // Set the start time for the next sentence if there is a next element
      if (index + 1 < data.length) {
        startTimestamp = data[index + 1].start;
        startMillis = timestampToMillis(startTimestamp);
      }
    } else {
      currentSentence += " ";
    }
  });

  return sentences;
}

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
  const filePath = path.resolve(__dirname, `uploads/${req.query.audioName}`);

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

  if (transcript) {
    const transcriptWithTimeStamp = constructSentencesWithEmotion(transcript);
    console.log(transcriptWithTimeStamp);
    return res.send({
      status: true,
      transcript: transcriptWithTimeStamp,
    });
  } else {
    res.send({
      status: false,
      message: "Some error occured",
    });
  }
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
