var addstandardtrackingscripts = function () {

	tagChooseAnswer = {}
	tagChooseAnswer['background'] = "#FFBC00"
	tagChooseAnswer['label'] = "ChooseAnswer"
	tagChooseAnswer['canChangeBackground'] = false;
	tagChooseAnswer['id'] = "blip-tag-ce6a9901-5a79-4096-9305-eb072c1e5e34";

	tagInputScripts = {}
	tagInputScripts['background'] = "#CCA2E1"
	tagInputScripts['label'] = "InputScripts"
	tagInputScripts['canChangeBackground'] = false;
	tagInputScripts['id'] = "blip-tag-8cc68c9d-bdf1-45ef-95b7-7824d8eef532";

	taglastStateUpdateEventScript = {}
	taglastStateUpdateEventScript['background'] = "#1FE5BD"
	taglastStateUpdateEventScript['label'] = "LastStateUpdateEventScript"
	taglastStateUpdateEventScript['canChangeBackground'] = false;
	taglastStateUpdateEventScript['id'] = "blip-tag-62d0f16e-9923-4f7d-b397-fb22de20d57c";
	try {
		var fs = require('fs')
		var enteringTrackingEvents = JSON.parse(fs.readFileSync('./resources/enteringTrackingEvents.json', 'utf8'))
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
      var name = blipblock['$title'].substring(blipblock['$title'].search(" "), blipblock['$title'].length)
      blipblock['$tags'] = []
			if (blipblock['$title'].search('\\[') != -1) {
				AddInputScripts(blipblock, enteringTrackingEvents, name, k)
				var possibleAnswers = searchUserInput(blipblock)
				blipblock['$tags'].push(tagInputScripts)
				if (possibleAnswers.length > 0) { //add only to interaction blocks
					var possibleAnswersStr = JSON.stringify(possibleAnswers)
					var chooseAnswerScript = JSON.parse(fs.readFileSync('./resources/chooseAnswerScript.json', 'utf8'))
					var chooseAnswerEvent = JSON.parse(fs.readFileSync('./resources/chooseAnswerEvent.json', 'utf8'))
					chooseAnswerScript['settings']['source'] = chooseAnswerScript['settings']['source'].replace('#cs1#', possibleAnswersStr);
					AddChooseAnswer(blipblock, chooseAnswerScript, name, chooseAnswerEvent)
					blipblock['$tags'].push(tagChooseAnswer)
				}
        var lastStateUpdateEventScript = JSON.parse(fs.readFileSync('./resources/lastStateUpdateEventScript.json', 'utf8'))
        blipblock['$leavingCustomActions'] = []
				lastStateUpdateEventScript['settings']['source'] = lastStateUpdateEventScript['settings']['source'].replace('#LastState#', "\"" + name + "\"");
				blipblock['$leavingCustomActions'].push(lastStateUpdateEventScript)
				blipblock['$tags'].push(taglastStateUpdateEventScript)
			}

		})
		fs.writeFileSync('./output/ProcessedFileWithTrackingScripts.json', JSON.stringify(blipJson), {
			encoding: 'utf8',
			flag: 'w+'
		})
	} catch (error) {
		console.log(error)
	}
}

function AddInputScripts(selectedCard, enteringTrackingEvents, blockName, key) {
	enteringTrackingEvents[0]['settings']['category'] = blockName
	enteringTrackingEvents[1]['settings']['category'] = blockName
	if (key != "onboarding")
		selectedCard['$enteringCustomActions'] = JSON.parse(JSON.stringify(enteringTrackingEvents))
	else {
		selectedCard['$enteringCustomActions'] = JSON.parse(JSON.stringify([enteringTrackingEvents[1]]))
	}
	return selectedCard
}

function AddChooseAnswer(selectedCard, chooseAnswerScript, blockName, chooseAnswerEvent) {
	chooseAnswerEvent['settings']['category'] = blockName
  selectedCard['$leavingCustomActions'] = JSON.parse(JSON.stringify([chooseAnswerScript, chooseAnswerEvent]))
  if(blockName==' Erro nao entendi (intenção não identificada)')
    console.log(selectedCard['$leavingCustomActions']) 
	return selectedCard
}


function searchUserInput(searchObject) {
	var actions = searchObject['$contentActions']
	var possibleAnswers = []
	if (actions) {
		for (let index = 0; index < actions.length; index++) {
			const element = actions[index];

			if (element['action'] &&
				element['action']['settings'] &&
				element['action']['settings']['content'] &&
				element['action']['settings']['content']['options']) {

				for (let j = 0; j < element['action']['settings']['content']['options'].length; j++) {
					const element1 = element['action']['settings']['content']['options'][j];
					possibleAnswers.push(element1['text'])

				}
			}
		}
	}
	return possibleAnswers
}



addstandardtrackingscripts()