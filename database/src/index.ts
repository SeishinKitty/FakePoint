import { Prisma, PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import cors from 'cors'
import express, {Express, Request, Response} from "express"
import { title } from 'process'

const prisma = new PrismaClient()
const app: Express = express()
app.use(cors())

export interface TBRequest<T> extends Express.Request { body: T }
export interface TPRequest<T> extends Express.Request { params: T }

app.use(express.json())

app.get('/', async (req: Request, res: Response) => {
  res.status(200).json("Welcome to my API!")
})

app.get("/ListItem/:id", async (req: TPRequest<{ id: string }>, res: Response) => {
  try{
    const result = await prisma.listItem.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        related: true
      }
    })
    res.json(result)
  }
  catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error",
    })
  }
})

app.get("/ListItem", async (req: TBRequest<{ id?: string, title?: string }>, res: Response) => {
  try {
    const result = await prisma.listItem.findMany({
      where: {
        ...(req.body.id ? {id: req.body.id} : {}),
        ...(req.body.title ? {title: req.body.title} : {})
      },
      include: {
        related: true
      }
    })
    res.json(result)
  }
  catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    })
  }
})

app.delete("/ListItem/:id", async (req: TPRequest<{ id: string }>, res: Response) => {
  try {
    const check = await prisma.listItem.findUnique({
      where: {
        id: req.params.id,
      },
    })
    if (!check) {
      res.status(200).json(null)
      return
    }
    const result = await prisma.listItem.delete({
      where: {
        id: req.params.id,
      },
    })
    res.json(result)
  }
  catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    })
  }
})

app.post("/ListItem", async (req: TBRequest<{ title: string }>, res: Response) => {
  try {
    if (!req.body.title) {
      res.status(400).json({
        message: `Bad Request: Missing attribute "title"`,
      })
      return
    }
    const result = await prisma.listItem.create({
      data: {
        title: req.body.title
      },
    })
    res.json(result)
  }
  catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    })
  }
})

app.patch("/ListItem", async (req: TBRequest<{ id: string, title?: string }>, res: Response) => {
  try {
    if(!req.body.id){
      res.status(400).json({
        message: `Bad Request: Missing attribute "id"`,
      })
      return
    }
    const check = await prisma.listItem.findUnique({
      where: {
        id: req.body.id,
      },
    })
    if (!check) {
      res.status(200).json(null)
      return
    }
    const result = await prisma.listItem.update({
      where: {
        id: req.body.id
      },
      data: {
        ...(req.body.title ? {title: req.body.title} : {})
      },
    })
    res.json(result)
  }
  catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    })
  }
})

app.options("/ListItem", async (req: Request, res: Response) => {
  res.json([{"method":"GET","params":{"id":"string(UUID)"}},{"method":"GET","body?":{"id?":"string(UUID)","title?":"string"}},
           {"method":"DELETE","params":{"id":"string(UUID)"}},{"method":"POST","body":{"title":"string"}},
           {"method":"PATCH","body":{"id":"string(UUID)","title":"string"}}])
})

app.get("/ListRelatedItem/:id", async (req: TPRequest<{ id: string }>, res: Response) => {
  try {
    const result = await prisma.listRelatedItem.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        related: true
      }
    })
    res.json(result)
  }
  catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    })
  }
})

app.get("/ListRelatedItem", async (req: TBRequest<{ id?: string, title?: string, relatedId?: string }>, res: Response) => {
  try {
    const result = await prisma.listRelatedItem.findMany({
      where: {
        ...(req.body.id ? {id: req.body.id} : {}),
        ...(req.body.title ? {title: req.body.title} : {}),
        ...(req.body.relatedId ? {relatedId: req.body.relatedId} : {})
      },
      include: {
        related: true
      }
    })
    res.json(result)
  }
  catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    })
  }
})

app.delete("/ListRelatedItem/:id", async (req: TPRequest<{ id: string }>, res: Response) => {
  try {
    const check = await prisma.listRelatedItem.findUnique({
      where: {
        id: req.params.id,
      },
    })
    if (!check) {
      res.status(200).json(null)
      return
    }
    const result = await prisma.listRelatedItem.delete({
      where: {
        id: req.params.id,
      },
    })
    res.json(result)
  }
  catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    })
  }
})

app.post("/ListRelatedItem", async (req: TBRequest<{ title: string, relatedId?: string }>, res: Response) => {
  try {
    if (!req.body.title) {
      res.status(400).json({
        message: `Bad Request: Missing attribute "title"`,
      })
      return
    }
    const result = await prisma.listRelatedItem.create({
      data: {
        title: req.body.title,
        ...(req.body.relatedId ? {relatedId: req.body.relatedId} : {})
      },
    })
    res.json(result)
  }
  catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    })
  }
})

app.patch("/ListRelatedItem", async (req: TBRequest<{ id: string, title?: string, relatedId?: string }>, res: Response) => {
  try {
    if(!req.body.id){
      res.status(400).json({
        message: `Bad Request: Missing attribute "id"`,
      })
      return
    }
    const check = await prisma.listRelatedItem.findUnique({
      where: {
        id: req.body.id,
      },
    })
    if (!check) {
      res.status(200).json(null)
      return
    }
    if(req.body.relatedId){
      const checkRelated = await prisma.listItem.findUnique({
        where: {
          id: req.body.relatedId,
        },
      })
      if (!checkRelated) {
        res.status(400).json({
          message: `Bad Request: ListItem with Id "${req.body.relatedId}" does not exist`,
        })
        return
      }
    }
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
  }
  catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    })
  }
})

app.options("/ListRelatedItem", async (req: Request, res: Response) => {
  res.json([{"method":"GET","params":{"id":"string(UUID)"}},{"method":"GET","body?":{"id?":"string(UUID)","title?":"string","relatedId?":"string(UUID)"}},
           {"method":"DELETE","params":{"id":"string(UUID)"}},{"method":"POST","body":{"title":"string","relatedId":"string(UUID)"}},
           {"method":"PATCH","body":{"id":"string(UUID)","title?":"string","relatedId?":"string(UUID)"}}])
})

const server = app.listen(3001, () => console.log("Server ready at: http://localhost:3001"))
