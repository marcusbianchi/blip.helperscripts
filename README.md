# blip.addextras
Add extra attributte to track events for blip builer.

# Requiriments
Node.JS installed

# Usage
Put the extras that you wish to add in the file extras.json

```
    node index.js <inputJson> <optional Append flag>
```

Examples:


Replace extras to all events by the content of extras.json

```
    node .\index.js .\pagseguro.json
```

Append extras to all events by the content of extras.json

```
    node .\index.js .\pagseguro.json a
```
