exports.addstandardtrackingscript = (function () {
	var chooseAnswerEventService = require('./../resources/chooseAnswerEvent')
	var chooseAnswerScriptService = require('./../resources/chooseAnswerScript')
	var enteringTrackingEventsService = require('./../resources/enteringTrackingEvents')
	var lastStateUpdateEventScriptService = require('./../resources/lastStateUpdateEventScript')
	var contentEventService = require('./../resources/contentEvent')
	var getInputContentSubstring = require('./../resources/getInputContentSubstringScript')
	var getInputContentSubstringScript = getInputContentSubstring.getInputContentSubstringScript()

	const Tags = {
		ChooseAnswer: { background: "#FFBC00", label: "ChooseAnswerScripts", canChangeBackground: false, id: "blip-tag-ce6a9901-5a79-4096-9305-eb072c1e5e34" },
		InputScripts: { background: "#CCA2E1", label: "InputScripts", canChangeBackground: false, id: "blip-tag-8cc68c9d-bdf1-45ef-95b7-7824d8eef532" },
		LastStateUpdateEventScript: { background: "#1FE5BD", label: "LastStateUpdateScript", canChangeBackground: false, id: "blip-tag-62d0f16e-9923-4f7d-b397-fb22de20d57c" },
		ContentEvent: { background: "#E5BD1F", label: "SaveContent", canChangeBackground: false, id: "blip-tag-62d0f16e-9923-4f7d-b397-fb22de20e57c" }
	}

	function UpdateLastStateEvent(block, blockName) {
		let lastStateUpdateEventScript = lastStateUpdateEventScriptService.getLastStateUpdateScript(blockName)
		block['$leavingCustomActions'].push(lastStateUpdateEventScript)
		block['$tags'].push(Tags.LastStateUpdateEventScript)
		return block
	}

	function addContentEventScript(block, contentEvent, blockName) {
		let getInputContentSubstringScriptCopy = copyObject(getInputContentSubstringScript)
		let contentEventCopy = copyObject(contentEvent)

		block['$leavingCustomActions'].push(getInputContentSubstringScriptCopy)
		contentEvent['settings']['category'] = capitalize(blockName) + " conteudo"
		block['$leavingCustomActions'].push(contentEventCopy)
		block['$tags'].push(Tags.ContentEvent)
		return block
	}

	function AddInputScripts(block, enteringTrackingEvents, blockName, key) {
		let enteringTrackingEventsCopy = copyObject(enteringTrackingEvents)

		enteringTrackingEventsCopy[0]['settings']['category'] = blockName + " origem"
		enteringTrackingEventsCopy[1]['settings']['category'] = blockName

		if (key !== "onboarding")
			block['$enteringCustomActions'].push(enteringTrackingEventsCopy[0])
		block['$enteringCustomActions'].push(enteringTrackingEventsCopy[1])

		block['$tags'].push(Tags.InputScripts)
		return block
	}

	function AddChooseAnswerScript(block, blockName, possibleAnswers) {
		let chooseAnswerScript = chooseAnswerScriptService.getChooseAnswerScript(JSON.stringify(possibleAnswers))
		let chooseAnswerEventCopy = copyObject(chooseAnswerEventService.chooseAnswerEventScript())

		chooseAnswerEventCopy['settings']['category'] = blockName + " cliques"
		block['$leavingCustomActions'] = block['$leavingCustomActions'].concat([chooseAnswerScript, chooseAnswerEventCopy])
		block['$tags'].push(Tags.ChooseAnswer)

		return block
	}

	function getInputItems(action) {
		try {
			let items = action['action']['settings']['content']['items'];
			for (let k = 0; k < items.length; k++) {
				const options = items[k]['options'];
				for (let n = 0; n < options.length; n++) {
					const type = options[n]['label']['type'];
					if (type == 'text/plain')
						possibleAnswers.push(type)
				}
			}
		} catch {
			return []
		}
	}

	function getInputOptions(action) {
		try {
			let options = action['action']['settings']['content']['options'];
			let optionsArrays = []
			for (o of options)
				optionsArrays.push(o['text'])
			return optionsArrays
		} catch {
			return []
		}
	}

	function searchUserInput(block) {
		var contentActions = block['$contentActions']
		var answers = []
		if (contentActions) {
			for (action of contentActions) {			
				const options = getInputOptions(action)
				const items = getInputItems(action)

				if (options.length > 0)
					answers = answers.concat(options)
				else
					answers = answers.concat(items)
			}
		}

		return answers
	}

	function getBlockName(blipblock) {
		let title = blipblock['$title'].substring().toLowerCase()
		let startingNameIndex = blipblock['$title'].search("]") + 1
		return title.substring(startingNameIndex, title.length).trim()
	}

	let capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1)
	let isNotExceptionBlock = (block) => !block['$title'].includes('[E')
	let isOnboardingBlock = (block) => block['id'] === 'onboarding'
	let blockHasBrackets = (block) => block['$title'].includes('[')
	let removesearchTag = (block, searchTag) => block['$title'].replace(searchTag ? searchTag : '', '')
	let copyObject = (object) => JSON.parse(JSON.stringify(object))

	return function (blipJson, addtoall, addContentEvent, searchTag) {
		var checkuserinteraction = require('./checkuserinteraction')
		var checkbotinteraction = require('./checkbotinteraction')
		var contentEvent = contentEventService.getcontentEvent()
		try {
			let enteringTrackingEvents = enteringTrackingEventsService.getEnteringTrackingEventsScripts()

			for (key of Object.keys(blipJson)) {
				let block = blipJson[key]
				block['$title'] = removesearchTag(block, searchTag)

				let blockName = capitalize(getBlockName(block))

				if (isOnboardingBlock(block))
					block = UpdateLastStateEvent(block, blockName)

				if (addtoall || blockHasBrackets(block) || checkbotinteraction.checkbotinteraction(block)) {
					block = AddInputScripts(block, enteringTrackingEvents, blockName, key)
					
					var possibleAnswers = searchUserInput(block)
					if (possibleAnswers.length > 0)
						block = AddChooseAnswerScript(block, blockName, possibleAnswers)

					if (!isOnboardingBlock(block) || isNotExceptionBlock(block) || addtoall || checkuserinteraction.checkuserinteraction(block))
						block = UpdateLastStateEvent(block, blockName)					

					if (addContentEvent && checkuserinteraction.checkuserinteraction(block))
						block = addContentEventScript(block, contentEvent, blockName)
				}
			}
			
			return blipJson
		
		} catch (error) {
			console.log(error)
		}
	}
})()