let words = ['all', 'am', 'are','at','ate','be','black','brown','but','came',]
        // 'did','do','eat','four','get','good','have','he','into','like','must','new','no','now','on','our','out','please','pretty','ran','ride','saw','say','she','so','soon','that','there','they','this','too','under','want','was','well','went','what','white','who','will','with','yes','red','blue','green','yellow','pink','purple','orange']

module.exports = {
    getWords: (req, res) => {
        console.log('getwords')
        res.status(200).send(words)
    },

    addWords: (req, res) => {
        let {word}=req.body
        console.log(req.body)
        if(words.indexOf(word) < 0){
            words.push(word)
        }
        res.status(200).send(words)
    },
    
    updateWords: (req,res) => {
        console.log('editWords')
        for(let i=0; i<words.length; i++){
            if(words[i]===req.params.oldWord){
                words.splice(i,1,req.body.word)
            }
        }
        console.log(words)
        res.status(200).send(words)

    }

    // find the word based on the word in the body
}