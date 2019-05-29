# Contents

- [Regexifybot](#regexifybot)
  * [Requirements](#requirements)
  * [Usage](#usage)
    + [Examples](#examples)
- [Addtrackingandsessionscripts](#addtrackingandsessionscripts)
  * [Requirements](#requirements-1)
  * [Usage](#usage-1)
    + [Examples](#examples-1)
- [Addextras](#addextras)
  * [Requirements](#requirements-2)
  * [Usage](#usage-2)
    + [Examples](#examples-2)
- [Addstandardtrackingscripts](#addstandardtrackingscripts)
  * [Requirements](#requirements-3)
  * [Usage](#usage-3)
    + [Examples](#examples-3)
  * [Standard Trackings](#standard-trackings)
- [AddsessionidtoScripts](#addsessionidtoscripts)
  * [Requirements](#requirements-4)
  * [Usage](#usage-4)
    + [Examples](#examples-4)
- [Addlaststatescript](#addlaststatescript)
  * [Requirements](#requirements-5)
  * [Usage](#usage-5)
    + [Examples](#examples-5)
- [Addchatbaseintegrationscripts](#addchatbaseintegrationscripts)
  * [Requirements](#requirements-6)
  * [Usage](#usage-6)
    + [Examples](#examples-6)
- [Clearbotscript](#clearbotscript)
  * [Requirements](#requirements-7)
  * [Usage](#usage-7)
    + [Examples](#examples-7)

# Regexifybot
Turns all the conditions to from a specific bot that check the user input into regex expressions. Can also be used to turn a sigle expression on a regex for blip

## Requirements
Node.JS installed

## Usage
Saves the processed bot in "/output/ProcessedwithRegex.json" and the resulting regex for audit in "/output/regex.json"

```
    npm install
    node regexifybot.js <inputJson>
```
Or:

Returns the regex expressions on the command line

```
    npm install
    node regexifybot.js --value="<expression>"
```

### Examples
Regexify an entire bot:
```
    npm install
    node regexifybot.js test.json
```

Regexigy a single expression:
```
    npm install
    node regexifybot.js --value="saque automático"
```

# Addtrackingandsessionscripts
Add standard Trackings and SessionId to all block that have the "[]" marking in the name. If you add the flag "-all" at the end will append to all blocks in the buider If you add the flag "--searchtag=#" it will search and add the standard tracking only for the blocks marked with the tag added.
 
## Requirements
Node.JS installed

## Usage
Saves in "/output/ProcessedFileWithId.json"

```
    npm install
    node Addtrackingandsessionscripts.js <inputJson>
```

### Examples
Add standard Trackings only to "[]" marked blocks and sessionId checking where there is user interaction.

```
    npm install
    node Addtrackingandsessionscripts.js test.json
```

Add  standard Trackings to all blocks and sessionId checking where there is user interaction.

```
    npm install
    node Addtrackingandsessionscripts.js test.json -all
```

# Addextras
Add extra attributte to track events for blip builer.

## Requirements
Node.JS installed

## Usage
Put the extras that you wish to add in the file "/resources/extras.json" the output will be saved in "/output/ProcessedFile.json"

```
    npm install
    node addextrastoscripts.js <inputJson> <optional Append flag>
```

### Examples
Replace extras of all events in the test.json by the content of "/resources/extras.json"

```
    npm install
    node addextrastoscripts.js test.json
```

Append extras of all events in the test.json with the content of "/resources/extras.json"

```
    npm install
    node addextrastoscripts.js test.json a
```

# Addstandardtrackingscripts
Add standard Trackings to all block that have the bot interaction or wait user message or is marked with "[]" ont the title. If you add the flag "--all" at the end will append to all blocks in the builder. If you add the flag "--addContentEvent true" it will create a event to save the user input. If you add the flag "--searchtag=#" it will search and add the standard tracking only for the blocks marked with the tag added.

## Requirements
Node.JS installed

## Usage
Saves in "/output/ProcessedFileWithTrackingScripts.json"

```
    npm install
    node addstandardtrackingscripts.js <inputJson>
```

### Examples
Add only to "[]" marked blocks.

```
    npm install
    node addstandardtrackingscripts.js test.json
```

Add to all blocks and save the content.

```
    node addstandardtrackingscripts.js test.json --all --addContentEvent true --searchtag=#

## Standard Trackings

Origem
 - category: >block name< + " - Origem"
 - action: >last block name<

Exibição
 - category: >block name< + " - Origem"
 - action: Exibicao

ChooseAnswer (Only if the block contains quick replies or carrroussels)
 - category: >block name< + " - Cliques"
 - action: >choose answer< or "Entrada Manual"

 # AddsessionidtoScripts
 Add scripts required to track the session of the user. This scripts will be added on everyblock that has user interaction and will update the session ID if the last interacion is grater than time configured in {{config.sessionTime}}

## Requirements
Node.JS installed
Bot Variable: 
- {{config.sessionTime}}: Time in Miliseconds for the session

## Usage
Saves in "/output/ProcessedFileWithId.json"

```
   npm install
   node addsessionidscripts.js <inputJson>
```

### Examples

```
    npm install
    node addsessionidscripts.js test.json
```

# Addlaststatescript
 Append laststateUpdate script in all the block that has a "[]" on the name, except blocks starting with "[E...]". If you add the flag "--all" at the second argument it will append the script to all blocks in the builder, and if you add the flag "--all" and "--userInteraction" it will append to all blocks in the builder that wait for some user interaction.

## Requirements
Node.JS installed

## Usage
Saves in "/output/ProcessedFileWithLaststatecript.json"

```
    npm install
    node addlaststatescript.js <inputJson>
```

### Examples

```
    npm install
    node addlaststatescript.js test.json
```

# Addchatbaseintegrationscripts
 Add scripts required to integrate manually with chatnase. This scripts will be added on everyblock that has user interaction and or bot interaction and will send it to chatbase using post. 

## Requirements
Node.JS installed
Bot Variables: 
- {{config.chatbaseURL}}: URL to send thepost
- {{config.chatbasekey}}: The chatbase key
- {{config.version}}: Bot Version
- {{config.chatbasetrack}}: Chatbase track URL ("https://chatbase.com/r?")
- {{config.platform}}: Plataform on which the bot will run

## Usage
Saves in "/output/ProcessedwithChatbase.json"

```
    npm install
    node addchatbaseintegrationscripts.js <inputJson>
```

### Examples

```
    npm install
    node addchatbaseintegrationscripts.js test.json
```


# Clearbotscript
Clear all the input, output actions and tags from all blocks.

## Requirements
Node.JS installed

## Usage
Saves in "/output/ClearedFile.json"

```
    npm install
    node clearbotscript.js <inputJson>
```

### Examples

```
    npm install
    node clearbotscript.js test.json
```