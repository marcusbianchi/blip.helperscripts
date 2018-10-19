# Addextras
Add extra attributte to track events for blip builer.

# Requiriments
Node.JS installed

# Usage
Put the extras that you wish to add in the file extras.json and saves in "ProcessedFile.json"

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
