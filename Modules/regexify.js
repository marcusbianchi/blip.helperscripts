exports.regexify = (function () {
	var fs = require('fs')
	var emojiStrip = require('emoji-strip')
	const resultSet = new Set();

	function removeSmallwords(sentence) {
		var words = sentence.split(" ")
		var result = []
		for (let index = 0; index < words.length; index++) {
			if (words[index].length > 2)
				result.push(words[index])
			else if(!isNaN(words[index]))
				result.push(words[index])
		}
		return result.join(" ")
	}

	function addOrFunction(sentence) {
		var words = sentence.split(" ")
		var result = []
		for (let index = 0; index < words.length; index++) {
			if (words[index].search("/") != -1)
				result.push("(" + words[index] + ")")
			else
				result.push(words[index])
		}
		return result.join(" ")
	}

	function regexifyValue(value) {
		if (value.search("\\.\\*")!==-1){
			return value
		}

		value = emojiStrip(value)
		value = value.trim().toLowerCase()
		var trimvalued = removeSmallwords(value)		
		trimvalued = trimvalued.replace('para', '')
		trimvalued = trimvalued.replace('uma', '')
		trimvalued = trimvalued.replace('.', '')
		trimvalued = trimvalued.replace(';', '')
		trimvalued = trimvalued.replace(',', '')
		trimvalued = trimvalued.replace('?', '')
		trimvalued = trimvalued.replace('!', '')
		trimvalued = addOrFunction(trimvalued)
		var valRegex = "(?i)(.*"
		for (let index = 0; index < trimvalued.length; index++) {
			var c = trimvalued[index];
			if (c == " ")
				valRegex += ".*"
			else if (c == "-")
				valRegex += "-*\\s*"
			else if (c == "/")
				valRegex += "|"
			else if (/[À-ú]/.test(c))
				valRegex += "([À-ú]|[a-z])"
			else
				valRegex += c
		}
		valRegex += ".*)"
		return valRegex
	}

	function regexifyValues(values) {
		for (let index = 0; index < values.length; index++) {
			var val = values[index];
			//remove emoticons			
			values[index] = regexifyValue(val)
			resultSet.add(val + " -> " + values[index])

		}
		return values;
	}

	function RexifyBotoutputs(searchObject) {
		var conditions = searchObject['$conditionOutputs']
		if (conditions) {
			for (let index = 0; index < conditions.length; index++) {
				const condition = conditions[index];
				if (condition['conditions'])
					condition['conditions'].forEach(function (con) {
						if (con['source'] == 'input') {
							con['comparison'] = 'matches'
							con['values'] = regexifyValues(con['values'])
						}
					})
			}
		}
		return searchObject
	}

	return {
		regexifyall: function (blipJson) {
			try {
				Object.keys(blipJson).forEach(function (k) {
					var blipblock = blipJson[k]
					blipblock = RexifyBotoutputs(blipblock)
				})
				fs.writeFileSync('./output/regex.json', JSON.stringify(Array.from(resultSet)), {
					encoding: 'utf8',
					flag: 'w+'
				})
				return blipJson
			} catch (error) {
				console.log(error)
			}
		},
		regexifyvalue: regexifyValue
	}
})()