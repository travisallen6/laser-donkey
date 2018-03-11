const   express = require('express')
        , bodyParser = require('body-parser')

const ctrl = require('./controller')

const app=express();


app.use(bodyParser.json())

const port = 3010;

app.get('/api/words', ctrl.wordsList)

app.post('./api/addwords', ctrl.addWords)



app.listen(port, () => console.log(`hard to port ${port}`))





