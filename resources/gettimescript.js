const getTimeScript = () => {
    return {
        "type": "ExecuteScript",
        "$title": "Executar script - GetTime Chatbase",
        "$invalid": false,
        "settings": {
            "function": "run",
            "source": "\nfunction run() {\n    return (new Date()).getTime()\n}",
            "inputVariables": [],
            "outputVariable": "currentTime"
        }
    }
}

module.exports.getTimeScript = getTimeScript