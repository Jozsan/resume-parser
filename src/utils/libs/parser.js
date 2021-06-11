const resume = require('../Resume')
const defaultDictionary = require('../../dictionary.js')

class Parser {

  constructor (dictionary) {
    this._dictionary = dictionary ? { ...defaultDictionary, ...dictionary } : defaultDictionary
    this.makeRegExpFromDictionary()
  }

  get dictionary() {
    return this._dictionary
  }

  set dictionary(dictionary) {
    this._dictionary = dictionary

  }

  capitalize(string) {
    return string[0].toUpperCase() + string.substr(1, string.length)
  }

  makeRegExpFromDictionary() {
    const regularRules = { titles: {} }

    for (let [key, titles] of Object.entries(this.dictionary.titles)) {
      regularRules.titles[key] = []

      titles.forEach((title) => {
        regularRules.titles[key].push(title.toUpperCase())
        regularRules.titles[key].push(this.capitalize(title))
      })
    }

    this.dictionary = { ...this.dictionary, ...regularRules }
  }

  async parse(rawData) {
    const Resume = new resume()
    const rows = rawData.split('\n')

    this.parseDictionaryRegular(rawData, Resume)

    for (let i = 0; i < rows.length; i++) {
      this.parseDictionaryTitles(Resume, rows, i)
    }

    return Promise.resolve(Resume)
  }

  restoreTextByRows(rowNum, allRows) {
    rowNum = rowNum - 1
    var rows = []

    do {
      rows.push(allRows[rowNum])
      rowNum++
    } while (rowNum < allRows.length)

    return rows.join('\n')
  }

  countWords(str) {
    return str.split(' ').length
  }

  parseDictionaryRegular(data, Resume) {
    let find

    for (const [key, expressions] of Object.entries(this.dictionary.regular)) {
      expressions.forEach((expression) => {
        find = new RegExp(expression).exec(data)
        if (find) Resume.addKey(key.toLowerCase(), find[0])
      })
    }
}

  parseDictionaryTitles(Resume, rows, rowIdx) {
    const row = rows[rowIdx]

    let allTitles = Object.values(this.dictionary.titles).flat().join('|')
    let searchExpression = ''
    let ruleExpression
    let isRuleFound
    let result

    for (let [key, expressions] of Object.entries(this.dictionary.titles)) {
      expressions = expressions || []
      if (this.countWords(row) > 5) return

      expressions.forEach((expression) => {
          ruleExpression = new RegExp(expression)
          isRuleFound = ruleExpression.test(row)

          if (isRuleFound) {
            allTitles = allTitles.split('|').filter((value) => value !== key).join('|')
            searchExpression = '(?:' + expression + ')((.*\n)+?)(?:' + allTitles + '|{end})'
            // restore remaining text to search in relevant part of text
            result = new RegExp(searchExpression, 'gm').exec(this.restoreTextByRows(rowIdx, rows))

            if (result) Resume.addKey(key, result[1])
          }
      })
    }
  }
}

module.exports = Parser