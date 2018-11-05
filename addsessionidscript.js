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
        var previousSaved = savePreviousActions(blipblock)

        blipblock['$leavingCustomActions'] = []
        AddScripts(blipblock,sessionscripts)
        blipblock['$tags'].push(tagSessionControl)

        blipblock = addPreviousScripts(blipblock,previousSaved)


      }
      
    })
    fs.writeFileSync('./output/ProcessedFileWithId.json', JSON.stringify(blipJson),{encoding:'utf8',flag:'w+'})
  } catch (error) {
      console.log(error)
  }
}


function savePreviousActions(selectedCard){
  previousSaved = {}
  //leavingCustomActions
  previousSaved['leavingCustomActions'] = []
  selectedCard['$leavingCustomActions'].forEach(function(action){
      if(action['title']==='Executar script - lastUserInteraction' || action['title']==='Executar script - sessionId')
          return
      previousSaved['leavingCustomActions'].push(action)
  })
  return previousSaved
}


function addPreviousScripts(selectedCard,previousSaved){
  previousSaved['leavingCustomActions'].forEach(function(action){
      selectedCard['$leavingCustomActions'].push(action)
  })
  return selectedCard
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


