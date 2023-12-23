import nc from "next-connect"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GPT,
  dangerouslyAllowBrowser: true,
})
const handler = nc({ attachParams: true })

handler.post(async (req: Request, res: Response) => {
  const { question } = req.body
  console.log("req.body")
  console.log(req.body)
  try {
    console.log("I am in servr")

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `${question}`,
        },
      ],
      temperature: 1,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    // console.log("choises 1 ", completion)
    // console.log("choises 1 ", completion.choices)
    // console.log("choises 1 ", completion.choices[0])
    const content = completion.choices[0].message.content
    // const data = choice.message.content
    console.log({ content })

    return res.status(200).json(content)
  } catch (error) {
    return res.status(451).json(error.message)
  }
})

export default handler
