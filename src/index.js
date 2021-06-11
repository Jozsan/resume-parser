const parseIt = require('./utils/parseIt')

const parseResumeFile = async (inputFile, dictionary) => {
  try {
    const parsedResume = await parseIt.parseResumeFile(inputFile, dictionary)
    return Promise.resolve(parsedResume)
  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports = { parseResumeFile }