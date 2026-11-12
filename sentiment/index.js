const natural = require('natural');

const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");

function analyzeSentiment(text) {
  const words = text.split(" ");
  const score = analyzer.getSentiment(words);
  return score;
}

module.exports = { analyzeSentiment };
