const express = require('express');
const { client, connection } = require('./db');
const md = require('mongodb')

const app = express();
const port = 3000;

connection();

app.get('/', (req, res) => {
  return res.send({
    stat: 200,
    text: "I'm fine"
  });
});

app.get('/getdata', async (req, res) => {
    if(Object.keys(req.query).length == null || 0) return res.send({
        stat: 404,
        text: "No Query!"
    })

    const database = client.db('reccatlog');
    const collection = database.collection('catlog');
    const cursor = await collection.find(req.query).toArray();

    return res.send(cursor);
});

app.delete('/delete', async (req, res) => {
  const database = client.db('reccatlog');
  const collection = database.collection('catlog');

  try {
      const result = await collection.deleteOne(req.query)

      if (result.deletedCount === 1) {
          return res.json({ message: 'Document deleted successfully' });
      } else {
          return res.status(404).json({ error: 'Document not found' });
      }
  } catch (error) {
      console.error('Error deleting document:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
  return;
});

app.post('/add', async (req, res) => {
  const database = client.db('reccatlog');
  const collection = database.collection('catlog');

  try {
      const result = await collection.insertOne(req.query);
      return res.json({ message: 'Document added successfully'});
  } catch (error) {
      console.error('Error adding document:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

