# Addtrackingandsessionscripts
Add standard Trackings and SessionId to all block that have the "[]" marking in the name. If you add the flag "-all" at the end will append to all blocks in the buider

## Requiriments
Node.JS installed

## Usage
Saves in "/output/ProcessedFileWithId.json"

```
    node Addtrackingandsessionscripts.js <inputJson>
```

Examples:
Add standard Trackings only to "[]" marked blocks and sessionId checking where there is user interaction.

```
    node Addtrackingandsessionscripts.js test.json
```

Add  standard Trackings to all blocks and sessionId checking where there is user interaction.

```
    node Addtrackingandsessionscripts.js test.json -all
```

# Addextras
Add extra attributte to track events for blip builer.

## Requiriments
Node.JS installed

## Usage
Put the extras that you wish to add in the file extras.json and saves in "/output/ProcessedFile.json"

```
    node addextrastoscripts.js <inputJson> <optional Append flag>
```

Examples:


Replace extras of all events in the test.json by the content of extras.json

```
    node addextrastoscripts.js test.json
```

Append extras of all events in the test.json with the content of extras.json

```
    node addextrastoscripts.js test.json a
```

# Addstandardtrackingscripts
Add standard Trackings to all block that have the "[]" marking in the name. If you add the flag "-all" at the end will append to all blocks in the buider

## Requiriments
Node.JS installed

## Usage
Saves in "/output/ProcessedFileWithTrackingScripts.json"

```
    node addstandardtrackingscripts.js <inputJson>
```

Examples:
Add only to "[]" marked blocks.

```
    node addstandardtrackingscripts.js test.json
```

Add to all blocks.

```
    node addstandardtrackingscripts.js test.json -all
```

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

## Requiriments
Node.JS installed
Bot Variable: 
- {{config.sessionTime}}: Time in Miliseconds for the session

## Usage
Saves in "/output/ProcessedFileWithId.json"

```
    node addsessionidscripts.js <inputJson>
```

Examples:

```
    node addsessionidscripts.js test.json
```

 # Addlaststatescript
 Append laststateUpdate script in all the block that has a "[]" on the name.

## Requiriments
Node.JS installed

## Usage
Saves in "/output/ProcessedFileWithLaststatecript.json"

```
    node addlaststatescript.js <inputJson>
```

Examples:

```
    node addlaststatescript.js test.json
```

# Addchatbaseintegrationscripts
 Add scripts required to integrate manually with chatnase. This scripts will be added on everyblock that has user interaction and or bot interaction and will send it to chatbase using post

## Requiriments
Node.JS installed
Bot Variabels: 
- {{config.chatbaseURL}}: URL to send thepost
- {{config.chatbasekey}}: The chatbase key
- {{config.version}}: Bot Version

## Usage
Saves in "/output/ProcessedwithChatbase.json"

```
    node addchatbaseintegrationscripts.js <inputJson>
```

Examples:

```
    node addchatbaseintegrationscripts.js test.json
```
