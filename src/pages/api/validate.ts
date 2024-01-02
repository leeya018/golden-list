import { getUrl } from "@/util"
import cors from "cors"

const corsMiddleware = cors({
  origin: [getUrl()], // match with your client application's origin
  methods: ["GET", "POST", "PUT", "DELETE"], // specify the methods for which CORS is enabled
  allowedHeaders: ["Content-Type", "Authorization"],
})

export { corsMiddleware }
