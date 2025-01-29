import express, { Request, Response } from "express"

const app = express()

app.get("/", (req: Request, res: Response) => {
  res.send("hola mundp")
})

app.listen(2000, () => {
  console.log("Listen on http://localhost:2000")
})