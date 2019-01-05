function validateFlowJsonFile (blipJson) {
    if (!blipJson) {
        throw console.error('Invalid flow json file!');
    }
}

const addChatBaseIntegration = (blipJson) => {
    validateFlowJsonFile(blipJson)

    let argv = require('minimist')(process.argv.slice(3));
    let platform = 'Blip chat'
    if (argv['platform']) {
        platform = argv['platform']
    }
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
    var addlaststate = require ('./Modules/addlaststate')
    var flow = addlaststate.addlaststatescript(blipJson, addToAll, addJustUserInteraction)
    return flow
}

const addSessionId = (blipJson) => {
    validateFlowJsonFile(blipJson)
    var sessionId = require ('./Modules/addsessionid')
    var flow = sessionId.addsessionidscript(blipJson)
    return flow
}

const addStandardTracking = (blipJson, flag) => {
    validateFlowJsonFile(blipJson)
    var argv = require('minimist')(flag.slice(3));
    var addtoall = false
    if (argv['all']) {
        addtoall = argv['all']
    }
    var addstandardtracking = require ('./Modules/addstandardtracking')
    var flow = addstandardtracking.addstandardtrackingscript(blipJson,addtoall)
    return flow
}

const addTrackingAndSession = (blipJson, flag) => {
    validateFlowJsonFile(blipJson)
    var argv = require('minimist')(flag.slice(3));
    var addtoall = false
    if (argv['all']) {
        addtoall = argv['all']
    }
    var addstandardtracking = require ('./Modules/addstandardtracking')
    var blipJson = addstandardtracking.addstandardtrackingscript(blipJson,addtoall)
    var sessionId = require ('./Modules/addsessionid')
    var flow = sessionId.addsessionidscript(blipJson)
    return flow
}

const addTrackingAndSessionAndChatbase = (blipJson, flag) => {
    validateFlowJsonFile(blipJson)
    var argv = require('minimist')(flag.slice(3));
    var addtoall = false
    if (argv['all']) {
        addtoall = argv['all']
    }
    var platform = 'Blip chat'
    if (argv['platform']) {
        platform = argv['platform']
    }

    var addstandardtracking = require ('./Modules/addstandardtracking')
    var blipJson = addstandardtracking.addstandardtrackingscript(blipJson,addtoall)

    var addchatbaseintegration = require ('./Modules/addchatbaseintegration')
    var blipJson = addchatbaseintegration.addchatbaseintegration(blipJson,platform)	
    var sessionId = require ('./Modules/addsessionid')
    var flow = sessionId.addsessionidscript(blipJson)

    return flow
}

const clearbot = (blipJson) => {
    validateFlowJsonFile(blipJson)
    var clearbot = require ('./Modules/clearbot')
    var flow = clearbot.clearbot(blipJson)
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
    clearbot: clearbot
}