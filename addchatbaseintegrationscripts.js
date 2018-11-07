var addchatbaseintegrationscripts = function () {

    var fs = require('fs')
    var jsonPath = process.argv[2]
		var argv = require('minimist')(process.argv.slice(3));

		var platform = 'Blip chat'
		if (argv['platform']) {
			platform = argv['platform']
		}

    var blipJson = {}

    try {
      blipJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    } catch (error) {
      console.log(error)
    }

    var addchatbaseintegration = require ('./Modules/addchatbaseintegration')
    addchatbaseintegration.addchatbaseintegration(blipJson,platform)
   
}

addchatbaseintegrationscripts()
