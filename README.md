# Addextras
Add extra attributte to track events for blip builer.

## Requiriments
Node.JS installed

## Usage
Put the extras that you wish to add in the file extras.json and saves in "/output/ProcessedFile.json"

```
    node addextras.js <inputJson> <optional Append flag>
```

Examples:


Replace extras of all events in the test.json by the content of extras.json

```
    node addextras.js test.json
```

Append extras of all events in the test.json with the content of extras.json

```
    node addextras.js test.json a
```

# Addstandardtrackingscripts
Add standard Trackings to all block that have the "[]" marking in the name

<aside class="warning">
    :boom: WARNING! This script will replace any custom Entering or Leaving Actions :boom:
</aside>

## Requiriments
Node.JS installed

## Usage
Saves in "/output/ProcessedFileWithTrackingScripts.json"

```
    node addstandardtrackingscripts.js <inputJson>
```

Examples:


```
    node addstandardtrackingscripts.js test.json
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

## Usage
Saves in "/output/ProcessedFileWithId.json"

```
    node addsessionidscript.js <inputJson>
```

Examples:

```
    node addsessionidscript.js test.json
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
