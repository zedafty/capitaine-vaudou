<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                         Returns token property                          -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- USAGE
	macroname(property)
	macroname(property, key)
	macroname(property, id, map)
	macroname(property, key, id, map)
-->

[if (argCount() == 3): return(0, getProperty(arg(0), arg(1), arg(2)))]
[if (argCount() == 4): return (0, json.get(getProperty(arg(0), arg(2), arg(3)), arg(1)))]
[if (argCount() < 3), code: {
	[id = getPlayerToken()]
	[if (id == ""): abort(0)]
	[map = getTokenMap(id)]
	[if (map == ""): abort(0)]
	[if (argCount() == 1): return(0, getProperty(arg(0), id, map))]
	[if (argCount() == 2): return (0, json.get(getProperty(arg(0), id, map), arg(1)))]
}]
