<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                    Registers current player token id                    -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- USAGE
	macroname()                     register impersonated token id as current player token id
	macroname(id)                   register provided token id as current player token id
	macroname(id, player)           register provided token id as provided player token id
-->

[lib = "Lib:Players"]
[name = getPlayerName()]
[name = if (argCount() > 1, arg(1), "")]
[id = if (hasImpersonated(), getImpersonated(1), "")]
[id = if (argCount() > 0, arg(0), "")]
[if (id != ""): setLibProperty(encode(name), id, lib)]
