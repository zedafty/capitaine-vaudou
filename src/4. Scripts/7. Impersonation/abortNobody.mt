<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--   Prevents execution of macro if no token is assigned or impersonated   -->
<!--                    Prompts without feedback on error                    -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- Get assigned token id -->
[h: id = getAssigned()]

<!-- A. No token assigned, check impersonated -->
[h, if (id == ""), code: {
	<!-- Prompt if no token is impersonated -->
	[if (!hasImpersonated()): abort(0)]
	<!-- Set token id -->
	[h: id = getImpersonated()]
	<!-- Prompt if multiple tokens impersonated -->
	[if (listCount(id) > 1): abort(0)]
	<!-- Prompt if token is a library -->
	[h: test = upper(getName(id))]
	[if (startsWith(test, "LIB:")): abort(0)]
	<!-- Prompt if token is not on token or GM layer -->
	[if (getLayer(id) == "OBJECT" || getLayer(id) == "BACKGROUND"): abort(0)]
	<!-- Prompt if not GM or token owner -->
	[h: c1 = isGM()]
	[h: c2 = isOwner(getPlayerName())]
	[if (!c1 && !c2): abort(0)]
	<!-- Reset current token to impersonated token -->
	[h: switchToken(id)]
}]

<!-- Retrieve arguments -->
[h: name = getStrProp(macro.args, "name")]
[h: lib = getStrProp(macro.args, "lib")]
[h: args = getStrProp(macro.args, "args")]
[h: only = getStrProp(macro.args, "only", "undefined")]
[h, if (only != "undefined"): abort(eq(getType(), only))]
<!-- Execute macro -->
[macro(name + "@Lib:" + lib): args]
