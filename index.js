const express = require('express')
const app = express()

//routers
const router = express.Router()
app.use('/notes', router)

//middleware
router.use(express.json())

//notes
const notes = require('./notes.js')


app.get('/', (req, res) => {
  res.send('<h1>Base</h1>')
})

router.get('/', (req, res) => {
  res.json(notes)
})

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  
  if (notes){
    res.json(note)
  } else {
    res.status(404).end()
  }
})


router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})


router.post('/', (req, res) => {
  let note = req.body
  const ids = notes.map(note => note.id)

const maxId = Math.max(...ids)

const newNote = {
  id: maxId + 1,
  content: note.content,
  important: typeof note.important !== 'undefined' ? note.important : false,
  date: new Date().toISOString()
}

  notes = [...notes, newNote]

  res.json(newNote)
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

