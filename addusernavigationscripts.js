var fs = require('fs')

var addusernavigationhistory = function () {

	try {
		var jsonPath = process.argv[2]
		var argv = require('minimist')(process.argv.slice(3));
		var exportfile = require('./Modules/exportfile')

		var blipJson = {}
		try {
			blipJson = JSON.parse(fs.readFileSync(jsonPath))
		} catch (error) {
			console.log(error)
			return
		}

		if (!blipJson) {
			console.log('Unable to parse BlipJSON')
			return
		}

		var addusernavigationhistory = require ('./Modules/addusernavigationhistory')
		var blipJson = addusernavigationhistory.addusernavigationhistory(blipJson)
		
		exportfile.savefile(blipJson)

	} catch (error) {
		console.log(error)
	}
}




addusernavigationhistory()