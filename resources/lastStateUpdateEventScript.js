const getLastStateUpdateScript = (blockName) => {
    return {
        "type": "ExecuteScript",
        "$title": "Executar script Update lastState",
        "$invalid": false,
        "settings": {
            "function": "run",
            "source": "function run() {\n    return \"" + blockName + "\"; //Return value will be saved as \"Return value variable\" field name\n}",
            "inputVariables": [],
            "outputVariable": "lastState"
        }
    }
}

module.exports.getLastStateUpdateScript = getLastStateUpdateScript