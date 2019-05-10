exports.adjustInputContentTrackingScript = (function () {
	var fs = require('fs')

	return function (blipJson) {
		try {
            //var getInputContentSubstring = require('./../resources/getInputContentSubstringScript')
            var getInputContentSubstring = require('./../resources/getInputContentSubstringScript')
            var getInputContentSubstringScript = getInputContentSubstring.GetInputContentSubstringScript()
            console.log(getInputContentSubstringScript)
			Object.keys(blipJson).forEach(function (k) {
                var blipblock = blipJson[k]		
                // blipblock["$leavingCustomActions"] = CleanExistingClearScritps(blipblock, '$leavingCustomActions')
                let leavingActions = Object.assign([], blipblock["$leavingCustomActions"])
                blipblock["$leavingCustomActions"].forEach((action, idx) => {
                    if (action.type === 'TrackEvent' && action.settings.action === '{{input.content}}') {
                        let script = getInputContentSubstringScript
                        leavingActions[idx].settings.action = "{{inputContentSubstring}}"
                        leavingActions.splice(idx, 0, script)
                    }
                })
                blipblock["$leavingCustomActions"] = leavingActions

                // blipblock["$enteringCustomActions"] = CleanExistingClearScritps(blipblock, '$enteringCustomActions')
                let enteringActions = Object.assign([], blipblock["$enteringCustomActions"])
                blipblock["$enteringCustomActions"].forEach((action, idx) => {
                    if (action && action.settings && action.type === 'TrackEvent' && action.settings.action === '{{input.content}}') {
                        let script = getInputContentSubstringScript
                        enteringActions[idx].settings.action = "{{inputContentSubstring}}"
                        enteringActions.splice(idx, 0, script)
                    }
                })
                blipblock["$enteringCustomActions"] = enteringActions
			})

			return blipJson;
			
		} catch (error) {
			console.log(error)
		}
	}
})()