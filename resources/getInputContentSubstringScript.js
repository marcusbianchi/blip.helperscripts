const getInputContentSubstringScript= () => {
    return {
        "type": "ExecuteScript",
        "$title": "Executar script - Input Content Substring",
        "$invalid": false,
        "settings": {
            "function": "run",
            "source": "\nfunction run(input) {\n    return input.substring(0, 255);\n}",
            "inputVariables": ["input.content"],
            "outputVariable": "inputContentSubstring"
        }
    }
}

module.exports.getInputContentSubstringScript = getInputContentSubstringScript
