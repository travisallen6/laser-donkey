let words = ['all', 'am', 'are','at','ate','be','black','brown','but','came',]
        // 'did','do','eat','four','get','good','have','he','into','like','must','new','no','now','on','our','out','please','pretty','ran','ride','saw','say','she','so','soon','that','there','they','this','too','under','want','was','well','went','what','white','who','will','with','yes','red','blue','green','yellow','pink','purple','orange']

module.exports = {
    wordsList: (req, res) => {
        res.status(200).send(words)
    },
    addWords: (req, res) => {
        console.log('POST works')
    }
}