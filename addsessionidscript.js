var addsessionidscript = function () {
  tagSessionControl = {}
	tagSessionControl['background'] = "#26CAEE"
	tagSessionControl['label'] = "SessionControlPoint"
	tagSessionControl['canChangeBackground'] = false;
	tagSessionControl['id'] = "blip-tag-62d0f16e-9923-4f7d-b397-fb2dae20d57c";
  try {
    var fs = require('fs')
    var sessionscripts = JSON.parse(fs.readFileSync('./resources/sessionscripts.json', 'utf8'))
    var jsonPath = process.argv[2]
    var replace = true
    if (process.argv[3] && process.argv[3] === 'a') {
      replace = false
    }

    var blipJson = {}

    try {
      blipJson = JSON.parse(fs.readFileSync(jsonPath))
    } catch (error) {
      console.log(error)
    }

    if (!blipJson) {
      console.log('Unable to parse BlipJSON')
      return null
    }
    Object.keys(blipJson).forEach(function (k) {
      var blipblock = blipJson[k]
      if(searchUserInput(blipblock))
      {
        AddScripts(blipblock,sessionscripts)
        blipblock['$tags'].push(tagSessionControl)
      }
      
    })
    fs.writeFileSync('./output/ProcessedFileWithId.json', JSON.stringify(blipJson),{encoding:'utf8',flag:'w+'})
  } catch (error) {
      console.log(error)
  }
}

function AddScripts (selectedCard, sessionscripts) {
  for (let index = sessionscripts.length-1; index >= 0; index--) {
    const element = sessionscripts[index];  
    selectedCard['$leavingCustomActions'].unshift(element)  
  }
  return selectedCard
}

function searchUserInput (searchObject) {
    var actions  = searchObject['$contentActions']
    if(actions){
      const element = actions[actions.length-1];
      if (element['input']){
       if(!element['input']['bypass'])
          return true;
      }         
    }  
  return false
}


addsessionidscript()


