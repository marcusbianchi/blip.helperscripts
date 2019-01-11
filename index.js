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
    let addlaststate = require ('./Modules/addlaststate')
    let flow = addlaststate.addlaststatescript(blipJson, addToAll, addJustUserInteraction)
    return flow
}

const addSessionId = (blipJson) => {
    validateFlowJsonFile(blipJson)
    let sessionId = require ('./Modules/addsessionid')
    let flow = sessionId.addsessionidscript(blipJson)
    return flow
}

const addStandardTracking = (blipJson, flag) => {
    validateFlowJsonFile(blipJson)
    let argv = require('minimist')(flag.slice(3));
    let addtoall = false
    if (argv['all']) {
        addtoall = argv['all']
    }
    let addstandardtracking = require ('./Modules/addstandardtracking')
    let flow = addstandardtracking.addstandardtrackingscript(blipJson,addtoall)
    return flow
}

const addTrackingAndSession = (blipJson, flag) => {
    validateFlowJsonFile(blipJson)
    let argv = require('minimist')(flag.slice(3));
    let addtoall = false
    if (argv['all']) {
        addtoall = argv['all']
    }
    let addstandardtracking = require ('./Modules/addstandardtracking')
    blipJson = addstandardtracking.addstandardtrackingscript(blipJson,addtoall)
    let sessionId = require ('./Modules/addsessionid')
    let flow = sessionId.addsessionidscript(blipJson)
    return flow
}

const addTrackingAndSessionAndChatbase = (blipJson, flag) => {
    validateFlowJsonFile(blipJson)
    let argv = require('minimist')(flag.slice(3));
    let addtoall = false
    if (argv['all']) {
        addtoall = argv['all']
    }
    let platform = 'Blip chat'
    if (argv['platform']) {
        platform = argv['platform']
    }

    let addstandardtracking = require ('./Modules/addstandardtracking')
    blipJson = addstandardtracking.addstandardtrackingscript(blipJson,addtoall)

    let addchatbaseintegration = require ('./Modules/addchatbaseintegration')
    blipJson = addchatbaseintegration.addchatbaseintegration(blipJson,platform)	
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