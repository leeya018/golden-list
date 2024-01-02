import nc from "next-connect"
import { corsMiddleware } from "./validate"
const textToSpeech = require("@google-cloud/text-to-speech")

// Import other required libraries
const fs = require("fs")
const util = require("util")
const handler = nc({ attachParams: true })
handler.use(corsMiddleware)

const client = new textToSpeech.TextToSpeechClient()

handler.get(async (req: Request, res: Response) => {
  console.log("req.body")
  console.log(req.body)
  try {
    // The text to synthesize
    const text = "hello, world!"

    // Construct the request
    const request = {
      input: { text: text },
      // Select the language and SSML voice gender (optional)
      voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
      // select the type of audio encoding
      audioConfig: { audioEncoding: "MP3" },
    }

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request)
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile)
    await writeFile("output.mp3", response.audioContent, "binary")
    console.log("Audio content written to file: output.mp3")
    return res.status(200).json("speakc")
  } catch (error) {
    return res.status(500).json(error.message)
  }
})

export default handler
