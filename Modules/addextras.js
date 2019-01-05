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
				var extrasService = require('./../resources/extras')
				var extrasObj = extrasService.getExtrasScripts()
				Object.keys(blipJson).forEach(function (k) {
					var blipblock = blipJson[k]
					blipblock['$leavingCustomActions'] = ReplaceExtras(blipblock['$leavingCustomActions'], extrasObj, replace)
					blipblock['$enteringCustomActions'] = ReplaceExtras(blipblock['$enteringCustomActions'], extrasObj, replace)
				})

				return blipJson;
				
			} catch (error) {
				console.log(error)
			}
		}
	
})()