<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--         Sets a single key/value pair string in a token property         -->
<!--             Supports JSON Object as well as JSON a                      -->
<!--                    Optionally, set a single property                    -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->
<!-- "Abi=Str" => set the Abi property to Str                                -->
<!-- "jobj=Abi;Str=16" => set the Str key to 16 in Abi JSON property         -->
<!-- "jarr=Abi;jidx=2;Str=16" => set the 2nd JSON in Abi array to Str = 16   -->
<!----------------------------------------------------------------------------->

[h: pid = getPlayerToken()]
[h: map = getTokenMap(pid)]

[str = macro.args]

[if (countStrProp(str) == 1), code : { <!-- Only ONE key/value pair (Property) -->
	[key = indexKeyStrProp(str, 0)]
	[val = indexValueStrProp(str, 0)]
	[setProperty(key, val, pid, map)]
}]
[if (countStrProp(str) == 2), code : { <!-- TWO key/value pairs (JSON Object) -->
	[prp = json.get(json.fromStrProp(str), "jobj")]
	[str = deleteStrProp(str, "jobj")]
	[key = indexKeyStrProp(str, 0)]
	[val = indexValueStrProp(str, 0)]
	[setProperty(prp, json.set(getProperty(prp, pid, map), key, val), pid, map)]
}]
[if (countStrProp(str) == 3), code : { <!-- THREE key/value pairs (JSON Array) -->
	[prp = json.get(json.fromStrProp(str), "jarr")]
	[str = deleteStrProp(str, "jarr")]
	[idx = json.get(json.fromStrProp(str), "jidx")]
	[str = deleteStrProp(str, "jidx")]
	[key = indexKeyStrProp(str, 0)]
	[val = indexValueStrProp(str, 0)]
	[obj = json.set(json.get(getProperty(prp, pid, map), idx), key, val)]
	[setProperty(prp, json.set(getProperty(prp, pid, map), idx, obj), pid, map)]
}]
