<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                       Returns token property type                       -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- USAGE
	macroname()
	macroname(id)
	macroname(id, map)
-->

[if (argCount() > 0), code: {[id = arg(0)]};{[id = getPlayerToken()]}]
[if (argCount() > 1), code: {[map = arg(1)]};{[map = getTokenMap(id)]}]
[val = if (id != "" && map != "", getPropertyType(id, map), "")]
[return(0, val))]
