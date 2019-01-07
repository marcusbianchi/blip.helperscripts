const getChooseAnswerScript = () => {
    return {
        "type": "ExecuteScript",
        "$title": "Executar script - Choose Answer",
        "$invalid": false,
        "settings": {
            "function": "run",
            "source":"function run(input) {\n    possibleAnswers = #cs1# \n    if(possibleAnswers.indexOf(input)!=-1){\n        var r=input.trim().toLowerCase();\n        r = r.split(' ').join('_');\n        r = r.replace(new RegExp(/\\s/g),\"\");\n        r = r.replace(new RegExp(/[àáâãäå]/g),\"a\");\n        r = r.replace(new RegExp(/æ/g),\"ae\");\n        r = r.replace(new RegExp(/ç/g),\"c\");\n        r = r.replace(new RegExp(/[èéêë]/g),\"e\");\n        r = r.replace(new RegExp(/[ìíîï]/g),\"i\");\n        r = r.replace(new RegExp(/ñ/g),\"n\");                \n        r = r.replace(new RegExp(/[òóôõö]/g),\"o\");\n        r = r.replace(new RegExp(/œ/g),\"oe\");\n        r = r.replace(new RegExp(/[ùúûü]/g),\"u\");\n        r = r.replace(new RegExp(/[ýÿ]/g),\"y\");\n        r = r.replace(new RegExp(/\\W/g),\"\");\n        if(r[0]==='_')\n            r = r.substring(1,r.length)\n        if(r[r.length-1]==='_')\n            r = r.substring(0,r.length-1)\n        r = r.trim()\n        r = r.split('_').join(' ')\n        r = r.charAt(0).toUpperCase() + r.slice(1);\n        return r;\n    }\n    return \"Entrada manual\"\n}",
            "inputVariables": [
                "input.content"
            ],
            "outputVariable": "chooseAnswer"
        }
    }
}

module.exports.getChooseAnswerScript = getChooseAnswerScript