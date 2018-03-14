const   express = require('express')
        , bodyParser = require('body-parser')

const ctrl = require('./controller')

const app=express();

const port = 3010;

app.use(bodyParser.json())


app.get('/api/', ctrl.getWords)

app.post('/api/:wordToAdd', ctrl.addWord)

app.put('/api/:oldWord/', ctrl.updateWords)

app.delete('/api/:wordToDelete/', ctrl.deleteWord)





app.listen(port, () => console.log(`hard to port ${port}`))





