class Resume {

  constructor() {
    this.parts = {}
  }

  addKey(key, value) {

    value = value || ''
    value = value.trim()

    if (value) {
      if (this.has(this.parts, key)) value = this.parts[key] + value;

      this.parts[key] = value
    }
  }

  addObject(key, options) {

    if (this.has(this.parts, key)) this.parts[key] = {}

    for (const [optionVal, optionName] of Object.entries(options)) {
      if (optionVal) self.parts[key][optionName] = optionVal
    }
  }

  has(obj, key) {
    const keyParts = key.split('.')

    return !!obj && (
      keyParts.length > 1
        ? this.has(obj[key.split('.')[0]], keyParts.slice(1).join('.'))
        : hasOwnProperty.call(obj, key)
    )
  }

}

module.exports = Resume