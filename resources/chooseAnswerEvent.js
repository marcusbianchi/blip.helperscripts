const chooseAnswerEventScript = () => {
    return {
        "type": "TrackEvent",
        "$title": "Registro de eventos - Cliques",
        "$invalid": false,
        "settings": {
            "extras": {
                "userId": "{{contact.identity}}",
                "originatorMessageId": "{{input.message@id}}",
                "userEmail": "{{contact.email}}",
                "userName": "{{contact.name}}",
                "sessionId": "{{sessionId}}"
            },
            "category": "Cartao pre-pago - cliques",
            "action": "{{chooseAnswer}}"
        }
    }
}
module.exports.chooseAnswerEventScript = chooseAnswerEventScript