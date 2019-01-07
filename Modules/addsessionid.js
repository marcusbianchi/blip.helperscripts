exports.addsessionidscript = (function () {
	var fs = require('fs')
	var sessionscriptsService = require('./../resources/sessionscripts')

	var tagSessionControl = {}
	tagSessionControl['background'] = "#26CAEE"
	tagSessionControl['label'] = "SessionControlPoint"
	tagSessionControl['canChangeBackground'] = false;
	tagSessionControl['id'] = "blip-tag-62d0f16e-9923-4f7d-b397-fb2dae20d57c";


	function savePreviousActions(selectedCard) {
		previousSaved = {}
		//leavingCustomActions
		previousSaved['leavingCustomActions'] = []
		selectedCard['$leavingCustomActions'].forEach(function (action) {
			if (action['$title'] === 'Executar script - lastUserInteraction' ||
				action['$title'] === 'Executar script - sessionId' ||
				action['$title'] === 'Executar script - Last User Message' ||
				action['$title'] === 'Executar script - Update ChatBaseKey')
				return
			previousSaved['leavingCustomActions'].push(action)
		})
		//tags
		previousSaved['tags'] = []
		if (selectedCard['$tags']) {
			selectedCard['$tags'].forEach(function (tag) {
				if (tag['label'] == 'SessionControlPoint')
					return
				previousSaved['tags'].push(tag)
			})
		}
		return previousSaved
	}


	function addPreviousScripts(selectedCard, previousSaved) {
		previousSaved['leavingCustomActions'].forEach(function (action) {
			selectedCard['$leavingCustomActions'].push(action)
		})
		previousSaved['tags'].forEach(function (tag) {
			selectedCard['$tags'].push(tag)
		})
		return selectedCard
	}

	function AddScripts(selectedCard, sessionscripts) {
		for (let index = sessionscripts.length - 1; index >= 0; index--) {
			const element = sessionscripts[index];
			selectedCard['$leavingCustomActions'].unshift(element)
		}
		return selectedCard
	}


	return function (blipJson) {
		var checkuserinteraction = require('./checkuserinteraction')

		try {
			var sessionscripts = sessionscriptsService.getSessionScripts()
			Object.keys(blipJson).forEach(function (k) {
				var blipblock = blipJson[k]		
				if (checkuserinteraction.checkuserinteraction(blipblock)) {
					var previousSaved = savePreviousActions(blipblock)
					blipblock['$leavingCustomActions'] = []
					blipblock['$tags'] = []
					AddScripts(blipblock, sessionscripts)
					blipblock['$tags'].push(tagSessionControl)
					blipblock = addPreviousScripts(blipblock, previousSaved)
				}
			})

			return blipJson;
			
		} catch (error) {
			console.log(error)
		}
	}
})()