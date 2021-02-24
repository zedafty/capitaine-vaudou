<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--           Removes a key/value pair from a JSON token property           -->
<!--                   Optionally, reset a single property                   -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->
<!-- "jobj=Abi;Str=" => remove the key Str in Abi JSON property              -->
<!----------------------------------------------------------------------------->

[str = macro.args]
[if (countStrProp(str) == 1), code : { <!-- Only ONE key/value pair (Property) -->
	[setProperty(indexKeyStrProp(str, 0), "")]
};{ <!-- More than ONE key/value pair (JSON Object) -->
	[prp = json.get(json.fromStrProp(str), "jobj")]
	[str = deleteStrProp(str, "jobj")]
	[setProperty(jobj, json.remove(getProperty(prp), indexKeyStrProp(str, 0)), getImpersonated())]
}]
