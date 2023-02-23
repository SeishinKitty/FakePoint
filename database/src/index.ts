import { Prisma, PrismaClient } from '@prisma/client'
import express, {Express, Request, Response} from "express"

const prisma = new PrismaClient()
const app: Express = express()

export interface TBRequest<T> extends Express.Request { body: T }
export interface TPRequest<T> extends Express.Request { params: T }

app.use(express.json())

app.get('/', async (req: Request, res: Response) => {
  res.json("Welcome to my API!")
})

app.get("/ListItem/:id", async (req: TPRequest<{ id: string }>, res: Response) => {
  const result = await prisma.listItem.findUnique({
    where: {
      id: req.params.id,
    },
  })
  res.json(result)
})

app.get("/ListItem", async (req: TBRequest<{ id?: string, title?: string }>, res: Response) => {
  const result = await prisma.listItem.findMany({
    where: {
      ...(req.body.id ? {id: req.body.id} : {}),
      ...(req.body.title ? {title: req.body.title} : {})
    }
  })
  res.json(result)
})

app.delete("/ListItem/:id", async (req: TPRequest<{ id: string }>, res: Response) => {
  const result = await prisma.listItem.delete({
    where: {
      id: req.params.id,
    },
  })
  res.json(result)
})

app.post("/ListItem", async (req: TBRequest<{ title: string }>, res: Response) => {
  const result = await prisma.listItem.create({
    data: {
      title: req.body.title
    },
  })
  res.json(result)
})

app.patch("/ListItem", async (req: TBRequest<{ id: string, title?: string }>, res: Response) => {
  const result = await prisma.listItem.update({
    where: {
      id: req.body.id
    },
    data: {
      ...(req.body.title ? {title: req.body.title} : {})
    },
  })
  res.json(result)
})

app.options("/ListItem", async (req: Request, res: Response) => {
  res.json([{"method":"GET","params":{"id":"string(UUID)"}},{"method":"GET","body?":{"id?":"string(UUID)","title?":"string"}},
           {"method":"DELETE","params":{"id":"string(UUID)"}},{"method":"POST","body":{"title":"string"}},
           {"method":"PATCH","body":{"id":"string(UUID)","title":"string"}}])
})

app.get("/ListRelatedItem/:id", async (req: TPRequest<{ id: string }>, res: Response) => {
  const result = await prisma.listRelatedItem.findUnique({
    where: {
      id: req.params.id,
    },
  })
  res.json(result)
})

app.get("/ListRelatedItem", async (req: TBRequest<{ id?: string, title?: string, relatedId?: string }>, res: Response) => {
  const result = await prisma.listRelatedItem.findMany({
    where: {
      ...(req.body.id ? {id: req.body.id} : {}),
      ...(req.body.title ? {title: req.body.title} : {}),
      ...(req.body.relatedId ? {relatedId: req.body.relatedId} : {})
    }
  })
  res.json(result)
})

app.delete("/ListRelatedItem/:id", async (req: TPRequest<{ id: string }>, res: Response) => {
  const result = await prisma.listRelatedItem.delete({
    where: {
      id: req.params.id,
    },
  })
  res.json(result)
})

app.post("/ListRelatedItem", async (req: TBRequest<{ title: string, relatedId?: string }>, res: Response) => {
  const result = await prisma.listRelatedItem.create({
    data: {
      title: req.body.title,
      ...(req.body.relatedId ? {relatedId: req.body.relatedId} : {})
    },
  })
  res.json(result)
})

app.patch("/ListRelatedItem", async (req: TBRequest<{ id: string, title?: string, relatedId?: string }>, res: Response) => {
  const result = await prisma.listRelatedItem.update({
    where: {
      id: req.body.id
    },
    data: {
      ...(req.body.title ? {title: req.body.title} : {}),
      ...(req.body.relatedId ? {relatedId: req.body.relatedId} : {})
    },
  })
  res.json(result)
})

app.options("/ListRelatedItem", async (req: Request, res: Response) => {
  res.json([{"method":"GET","params":{"id":"string(UUID)"}},{"method":"GET","body?":{"id?":"string(UUID)","title?":"string","relatedId?":"string(UUID)"}},
           {"method":"DELETE","params":{"id":"string(UUID)"}},{"method":"POST","body":{"title":"string","relatedId":"string(UUID)"}},
           {"method":"PATCH","body":{"id":"string(UUID)","title?":"string","relatedId?":"string(UUID)"}}])
})

const server = app.listen(3001, () => console.log("Server ready at: http://localhost:3001"))
