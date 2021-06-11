const Parser = require('./libs/parser')
const processing = require('./libs/processing')

const parseResumeFile = async (file, dictionary) => {
  try {
    const rawData = await processing.runFile(file)
    const parser = new Parser(dictionary)
    const resume = await parser.parse(rawData)
    return Promise.resolve(resume)
  } catch (error) {
    return Promise.reject(error)
  }
}


module.exports = { parseResumeFile }
