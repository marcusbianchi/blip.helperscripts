var AddExtras = function () {
  try {
    var fs = require('fs')
    var extrasObj = JSON.parse(fs.readFileSync('./resources/extras.json', 'utf8'))
    var jsonPath = process.argv[2]
    var replace = true
    if (process.argv[3] && process.argv[3] === 'a') {
      replace = false
    }

    var blipJson = {}

    try {
      blipJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    } catch (error) {
      console.log(error)
    }

    if (!blipJson) {
      console.log('Unable to parse BlipJSON')
      return null
    }
    Object.keys(blipJson).forEach(function (k) {
      var blipblock = blipJson[k]
      blipblock['$leavingCustomActions'] = ReplaceExtras(blipblock['$leavingCustomActions'], extrasObj, replace)
      blipblock['$enteringCustomActions'] = ReplaceExtras(blipblock['$enteringCustomActions'], extrasObj, replace)
    })
    fs.writeFileSync('./output/ProcessedFile.json', JSON.stringify(blipJson),{encoding:'utf8',flag:'w+'})
  } catch (error) {
      console.log(error)
  }
}

function ReplaceExtras (searchObject, extrasObj, replace) {
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

AddExtras()
