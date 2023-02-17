import { Prisma, PrismaClient } from '@prisma/client'
import express from "express"

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get('/ListItems', async (req, res) => {
  const users = await prisma.listItem .findMany()
  res.json(users)
})

app.post(`/ListItem`, async (req, res) => {
  const { title } = req.body

  const result = await prisma.listItem.create({
    data: {
      Title: title
    },
  })
  res.json(result)
})

app.delete(`/ListItem/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.listItem.delete({
    where: {
      Id: id,
    },
  })
  res.json(post)
})

app.get('/ListRelatedItems', async (req, res) => {
  const users = await prisma.listRelatedItem .findMany()
  res.json(users)
})

app.post(`/ListRelatedItem`, async (req, res) => {
  const { title } = req.body

  const result = await prisma.listRelatedItem.create({
    data: {
      Title: title,
      RelatedId: ""
    },
  })
  res.json(result)
})

app.delete(`/ListRelatedItem/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.listRelatedItem.delete({
    where: {
      Id: id,
    },
  })
  res.json(post)
})

const server = app.listen(3000, () => console.log("Server ready at: http://localhost:3000"))