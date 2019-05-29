exports.addstandardtrackingscript = (function () {
	var fs = require('fs')
	var chooseAnswerEventService = require('./../resources/chooseAnswerEvent')
	var chooseAnswerScriptService = require('./../resources/chooseAnswerScript')
	var enteringTrackingEventsService = require('./../resources/enteringTrackingEvents')
	var lastStateUpdateEventScriptService = require('./../resources/lastStateUpdateEventScript')
	var contentEventService = require('./../resources/contentEvent')
	var getInputContentSubstring = require('./../resources/getInputContentSubstringScript')
	var getInputContentSubstringScript = getInputContentSubstring.getInputContentSubstringScript()

	var tagChooseAnswer = {}
	tagChooseAnswer['background'] = "#FFBC00"
	tagChooseAnswer['label'] = "ChooseAnswerScripts"
	tagChooseAnswer['canChangeBackground'] = false;
	tagChooseAnswer['id'] = "blip-tag-ce6a9901-5a79-4096-9305-eb072c1e5e34";

	var tagInputScripts = {}
	tagInputScripts['background'] = "#CCA2E1"
	tagInputScripts['label'] = "InputScripts"
	tagInputScripts['canChangeBackground'] = false;
	tagInputScripts['id'] = "blip-tag-8cc68c9d-bdf1-45ef-95b7-7824d8eef532";

	var taglastStateUpdateEventScript = {}
	taglastStateUpdateEventScript['background'] = "#1FE5BD"
	taglastStateUpdateEventScript['label'] = "LastStateUpdateScript"
	taglastStateUpdateEventScript['canChangeBackground'] = false;
	taglastStateUpdateEventScript['id'] = "blip-tag-62d0f16e-9923-4f7d-b397-fb22de20d57c";

	var tagContentEvent = {}
	tagContentEvent['background'] = "#E5BD1F"
	tagContentEvent['label'] = "SaveContent"
	tagContentEvent['canChangeBackground'] = false;
	tagContentEvent['id'] = "blip-tag-62d0f16e-9923-4f7d-b397-fb22de20e57c";



	function UpdateLastStateEvent(selectedCard, taglastStateUpdateEventScript, blockName) {
		blockName = blockName.charAt(0).toUpperCase() + blockName.slice(1);
		var lastStateUpdateEventScript = lastStateUpdateEventScriptService.getLastStateUpdateScript()
		lastStateUpdateEventScript['settings']['source'] = lastStateUpdateEventScript['settings']['source'].replace('#LastState#', "\"" + blockName + "\"");
		selectedCard['$leavingCustomActions'].push(lastStateUpdateEventScript)
		selectedCard['$tags'].push(taglastStateUpdateEventScript)
		return selectedCard
	}

	function addContentEventScript(selectedCard,contentEvent, blockName) {
		selectedCard['$leavingCustomActions'].push(JSON.parse(JSON.stringify(getInputContentSubstringScript)))
		blockName = blockName.charAt(0).toUpperCase() + blockName.slice(1);
		contentEvent['settings']['category'] = blockName + " - conteudo"
		selectedCard['$leavingCustomActions'].push(JSON.parse(JSON.stringify(contentEvent)))		
		selectedCard['$tags'].push(tagContentEvent)
		return selectedCard
	}

	function AddInputScripts(selectedCard, enteringTrackingEvents, blockName, key, tagInputScripts) {
		blockName = blockName.charAt(0).toUpperCase() + blockName.slice(1);

		enteringTrackingEvents[0]['settings']['category'] = blockName + " - origem"
		enteringTrackingEvents[1]['settings']['category'] = blockName
		if (key != "onboarding")
			selectedCard['$enteringCustomActions'] = JSON.parse(JSON.stringify(enteringTrackingEvents))
		else {
			selectedCard['$enteringCustomActions'] = JSON.parse(JSON.stringify([enteringTrackingEvents[1]]))
		}
		selectedCard['$tags'].push(tagInputScripts)
		return selectedCard
	}

	function AddChooseAnswerScript(selectedCard, blockName, possibleAnswers, tagChooseAnswer) {
		blockName = blockName.charAt(0).toUpperCase() + blockName.slice(1);

		var possibleAnswersStr = JSON.stringify(possibleAnswers)
		var chooseAnswerScript = chooseAnswerScriptService.getChooseAnswerScript()
		var chooseAnswerEvent = chooseAnswerEventService.chooseAnswerEventScript()
		chooseAnswerScript['settings']['source'] = chooseAnswerScript['settings']['source'].replace('#cs1#', possibleAnswersStr);
		chooseAnswerEvent['settings']['category'] = blockName + " - cliques"
		selectedCard['$leavingCustomActions'] = JSON.parse(JSON.stringify([chooseAnswerScript, chooseAnswerEvent]))
		selectedCard['$tags'].push(tagChooseAnswer)

		return selectedCard
	}

	function addPreviousScripts(selectedCard, previousSaved) {
		previousSaved['leavingCustomActions'].forEach(function (action) {
			selectedCard['$leavingCustomActions'].push(action)
		})
		previousSaved['enteringCustomActions'].forEach(function (action) {
			selectedCard['$enteringCustomActions'].push(action)
		})
		previousSaved['tags'].forEach(function (tag) {
			selectedCard['$tags'].push(tag)
		})
		return selectedCard
	}

	function savePreviousActions(selectedCard) {
		var previousSaved = {}
		//enteringCustomActions
		previousSaved['enteringCustomActions'] = []
		selectedCard['$enteringCustomActions'].forEach(function (action) {
			if(action['$title']){
				if (action['$title'].toLowerCase() == 'Registro de eventos - Last State'.toLowerCase())
					return
				if (action['$title'].toLowerCase() == 'Registro de eventos - Exibicao'.toLowerCase())
					return
			}
			previousSaved['enteringCustomActions'].push(action)
		})
		//leavingCustomActions
		previousSaved['leavingCustomActions'] = []
		selectedCard['$leavingCustomActions'].forEach(function (action) {
			if (action['$title'].toLowerCase() == 'Executar script - Choose Answer'.toLowerCase())
				return

			if (action['$title'].toLowerCase() == 'Registro de eventos - Cliques'.toLowerCase())
				return

			
			if (action['$title'].toLowerCase() ==  'Executar script - Input Content Substring'.toLowerCase())
				return

			if (action['$title'].toLowerCase() ==  'Registro de eventos - Conteudo'.toLowerCase())
				return

			if (action['$title'].toLowerCase() == 'Executar script - Update lastState'.toLowerCase())
				return

			previousSaved['leavingCustomActions'].push(action)
		})
		//tags
		previousSaved['tags'] = []
		selectedCard['$tags'].forEach(function (tag) {
			if (tag['label'] === 'ChooseAnswerScripts' ||
				tag['label'] === 'InputScripts' || tag['label'] === 'SaveContent' ||
				tag['label'] === 'LastStateUpdateScript')
				return
			previousSaved['tags'].push(tag)
		})
		return previousSaved
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
				} else if (element['action'] &&
					element['action']['settings'] &&
					element['action']['settings']['content'] &&
					element['action']['settings']['content']['items']) {
					for (let k = 0; k < element['action']['settings']['content']['items'].length; k++) {
						const element2 = element['action']['settings']['content']['items'][k];
						if (element2['options']) {
							for (let n = 0; n < element2['options'].length; n++) {
								const element3 = element2['options'][n];
								if (element3['label']['type'] == 'text/plain') {

									possibleAnswers.push(element3['label']['value'])
								}
							}
						}
					}
				}


			}
		}

		return possibleAnswers
	}

	return function (blipJson, addtoall,addContentEvent,searchtag) {
		var checkuserinteraction = require('./checkuserinteraction')
		var checkbotinteraction = require('./checkbotinteraction')
		var contentEvent = contentEventService.getcontentEvent()
		try {
			var enteringTrackingEvents = enteringTrackingEventsService.getEnteringTrackingEventsScripts()

			Object.keys(blipJson).forEach(function (k) {
					let blipblock = blipJson[k]
					let name = ""
					if (!addtoall)
						name = blipblock['$title'].substring(blipblock['$title'].search(" ") + 1, blipblock['$title'].length).toLowerCase()
					else {
						if (blipblock['$title'].search('\\]') == -1) {
							name = blipblock['$title'].toLowerCase()
						} else {
							name = blipblock['$title'].substring(blipblock['$title'].search("\\]") + 1, blipblock['$title'].length).toLowerCase()
						}
					}
					if(searchtag){
						if (blipblock['$title'].search(searchtag) != -1){
							blipblock['$title']=blipblock['$title'].replace(searchtag,'');
							var previousSaved = savePreviousActions(blipblock, name)
							blipblock['$enteringCustomActions'] = []
							blipblock['$tags'] = []
							blipblock['$leavingCustomActions'] = []
							blipblock = AddInputScripts(blipblock, enteringTrackingEvents, name, k, tagInputScripts)
							var possibleAnswers = searchUserInput(blipblock)
	
							if (possibleAnswers.length > 0) { //add only to interaction blocks    
								blipblock = AddChooseAnswerScript(blipblock, name, possibleAnswers, tagChooseAnswer)
							}
							if (blipblock['$title'].search('\\[E') == -1 || addtoall || checkuserinteraction.checkuserinteraction(blipblock)){
								blipblock = UpdateLastStateEvent(blipblock, taglastStateUpdateEventScript, name)							
							}
	
							if(addContentEvent && checkuserinteraction.checkuserinteraction(blipblock)){
								blipblock =addContentEventScript(blipblock,contentEvent,name)
							}
							blipblock = addPreviousScripts(blipblock, previousSaved);
						}
					}
					else if (blipblock['$title'].search('\\[') != -1 || addtoall ||checkbotinteraction.checkbotinteraction(blipblock)) {
						var previousSaved = savePreviousActions(blipblock, name)
						blipblock['$enteringCustomActions'] = []
						blipblock['$tags'] = []
						blipblock['$leavingCustomActions'] = []
						blipblock = AddInputScripts(blipblock, enteringTrackingEvents, name, k, tagInputScripts)
						var possibleAnswers = searchUserInput(blipblock)

						if (possibleAnswers.length > 0) { //add only to interaction blocks    
							blipblock = AddChooseAnswerScript(blipblock, name, possibleAnswers, tagChooseAnswer)
						}
						if (blipblock['$title'].search('\\[E') == -1 || addtoall || checkuserinteraction.checkuserinteraction(blipblock)){
							blipblock = UpdateLastStateEvent(blipblock, taglastStateUpdateEventScript, name)							
						}

						if(addContentEvent && checkuserinteraction.checkuserinteraction(blipblock)){
							blipblock =addContentEventScript(blipblock,contentEvent,name)
						}
						blipblock = addPreviousScripts(blipblock, previousSaved);
					}					
				}

			)
			if (!addtoall) {
				var previousSaved = savePreviousActions(blipJson["onboarding"], "onboarding")
				blipJson["onboarding"]['$enteringCustomActions'] = []
				blipJson["onboarding"]['$tags'] = []
				blipJson["onboarding"]['$leavingCustomActions'] = []
				blipJson["onboarding"] = UpdateLastStateEvent(blipJson["onboarding"], taglastStateUpdateEventScript, "onboarding")
				blipJson["onboarding"] = addPreviousScripts(blipJson["onboarding"], previousSaved)
			}

			return blipJson;
		
		} catch (error) {
			console.log(error)
		}
	}
})()