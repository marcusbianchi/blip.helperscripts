exports.clearbot = (function () {

	return function (blipJson) {
			try {
				var fs = require('fs')
				Object.keys(blipJson).forEach(function (k) {
					var blipblock = blipJson[k]
					blipblock['$leavingCustomActions'] = []
					blipblock['$enteringCustomActions'] = []
					blipblock['$tags'] = []

				})

				return blipJson
			} catch (error) {
				console.log(error)
			}
		}
	
})()