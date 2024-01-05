import nc from "next-connect"
import OpenAI from "openai"
import { corsMiddleware } from "./validate"
import type { NextApiRequest, NextApiResponse } from "next"

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GPT,
  dangerouslyAllowBrowser: true,
})
const handler = nc({ attachParams: true })
handler.use(corsMiddleware)

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { searchTxt } = req.body
  console.log("req.body")
  console.log(req.body)
  try {
    console.log("I am in servr")

    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: searchTxt,
      // prompt: "A cute baby sea otter",
    })

    console.log(image.data)
    // const data = choice.message.content
    console.log({ image_url: image.data })

    res.status(200).json(image.data[0].url)
  } catch (error: any) {
    res.status(500).json(error.message)
  }
})

export default handler
