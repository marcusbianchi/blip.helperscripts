exports.addextrastoscripts = (function () {
	function ReplaceExtras(searchObject, extrasObj, replace) {
		Object.keys(searchObject).forEach(function (k) {
			var searchArea = searchObject[k]
			if (searchArea['type'] && searchArea['type'] === 'TrackEvent') {
				if (replace) {
					searchArea['settings']['extras'] = extrasObj
				} else {
					searchArea['settings']['extras'] = Object.assign(searchArea['settings']['extras'], extrasObj)
				}
			}
		})
		return searchObject
	}
	return function (blipJson,replace) {
			try {
				var fs = require('fs')
				var extrasObj = JSON.parse(fs.readFileSync('./resources/extras.json', 'utf8'))
				Object.keys(blipJson).forEach(function (k) {
					var blipblock = blipJson[k]
					blipblock['$leavingCustomActions'] = ReplaceExtras(blipblock['$leavingCustomActions'], extrasObj, replace)
					blipblock['$enteringCustomActions'] = ReplaceExtras(blipblock['$enteringCustomActions'], extrasObj, replace)
				})
				fs.writeFileSync('./output/ProcessedFile.json', JSON.stringify(blipJson), {
					encoding: 'utf8',
					flag: 'w+'
				})
			} catch (error) {
				console.log(error)
			}
		}
	
})()