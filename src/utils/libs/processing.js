const textract = require('textract')


const processFile = async (file) => {
  try {
    const rawData = await extractTextFile(file)
    return Promise.resolve(rawData)
  } catch (error) {
    return Promise.reject(error)
  }
}

const extractTextFile = async (file) => {
  return new Promise((resolve, reject) => {
    textract.fromFileWithPath(file, { preserveLineBreaks: true }, (err, data) => {
      if (err) return reject(err)
      data = cleanTextByRows(data)
      return resolve(data)
    })
  })
}

const cleanTextByRows = (data) => {
  const rows = data.split('\n')
  const clearRows = []
  let clearRow
  
  for (let i = 0; i < rows.length; i++) {
    clearRow = cleanStr(rows[i])
    if (clearRow) clearRows.push(clearRow)
  }

  return clearRows.join('\n') + '\n{end}'
}


const cleanStr = (str) => {
  return str.replace(/\r?\n|\r|\t|\n/g, '').trim()
}

module.exports = { runFile: processFile }