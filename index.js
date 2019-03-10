function validateFlowJsonFile (blipJson) {
    if (!blipJson) {
        throw console.error('Invalid flow json file!');
    }
}

const addChatBaseIntegration = (blipJson, platform = 'Blip Chat') => {
    validateFlowJsonFile(blipJson)
    let addchatbaseintegration = require ('./Modules/addchatbaseintegration')
    let flow = addchatbaseintegration.addchatbaseintegration(blipJson, platform);
    return flow
}

const addExtras = (blipJson, flag) => {
    validateFlowJsonFile(blipJson)
    let replace = true
    if (flag && flag === 'a') {
      replace = false
    }
    let addextras = require ('./Modules/addextras')
    let flow = addextras.addextrastoscripts(blipJson, replace)
    return flow
}

const addLastState = (blipJson, addToAll, addJustUserInteraction) => {
    validateFlowJsonFile(blipJson)
    let addlaststate = require ('./Modules/addlaststate')
    if (!addToAll)
        addToAll = false
    let flow = addlaststate.addlaststatescript(blipJson, addToAll, addJustUserInteraction)
    return flow
}

const addSessionId = (blipJson) => {
    validateFlowJsonFile(blipJson)
    let sessionId = require ('./Modules/addsessionid')
    let flow = sessionId.addsessionidscript(blipJson)
    return flow
}

const addStandardTracking = (blipJson, addtoall) => {
    validateFlowJsonFile(blipJson)
    let addstandardtracking = require ('./Modules/addstandardtracking')
    let flow = addstandardtracking.addstandardtrackingscript(blipJson,addtoall)
    return flow
}

const addTrackingAndSession = (blipJson, addtoall = false) => {
    validateFlowJsonFile(blipJson)
    let addstandardtracking = require ('./Modules/addstandardtracking')
    blipJson = addstandardtracking.addstandardtrackingscript(blipJson, addtoall)
    let sessionId = require ('./Modules/addsessionid')
    let flow = sessionId.addsessionidscript(blipJson)
    return flow
}

const addTrackingAndSessionAndChatbase = (blipJson, platform = 'Blip Chat', addtoall = false) => {
    validateFlowJsonFile(blipJson)
    let addstandardtracking = require ('./Modules/addstandardtracking')
    blipJson = addstandardtracking.addstandardtrackingscript(blipJson, addtoall)

    let addchatbaseintegration = require ('./Modules/addchatbaseintegration')
    blipJson = addchatbaseintegration.addchatbaseintegration(blipJson, platform)	
    let sessionId = require ('./Modules/addsessionid')
    let flow = sessionId.addsessionidscript(blipJson)

    return flow
}

const clearbot = (blipJson) => {
    validateFlowJsonFile(blipJson)
    let clearbot = require ('./Modules/clearbot')
    let flow = clearbot.clearbot(blipJson)
    return flow
}

const adjustInputContentTracking = (blipJson) => {
    validateFlowJsonFile(blipJson)
    let script = require('./Modules/adjustInputContentTracking')
    let flow = script.adjustInputContentTrackingScript(blipJson)
    return flow
}

module.exports = {
    addChatBaseIntegration: addChatBaseIntegration,
    addExtras: addExtras,
    addLastState: addLastState,
    addSessionId: addSessionId,
    addStandardTracking: addStandardTracking,
    addTrackingAndSession: addTrackingAndSession,
    addTrackingAndSessionAndChatbase: addTrackingAndSessionAndChatbase,
    clearbot: clearbot,
    adjustInputContentTracking: adjustInputContentTracking
}