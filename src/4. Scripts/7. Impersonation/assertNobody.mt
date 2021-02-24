<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--   Prevents execution of macro if no token is assigned or impersonated   -->
<!--                      Prompts and feedback on error                      -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- Get assigned token id -->
[h: id = getAssigned()]

<!-- A. No token assigned, check impersonated -->
[h, if (id == ""), code: {
	<!-- Prompt if no token is impersonated -->
	[h: assert(hasImpersonated(), getError("not_impersonated"), 0)]
	<!-- Set impersonated token id -->
	[h: id = getImpersonated()]
	<!-- Prompt if multiple tokens impersonated -->
	[h: assert(listCount(id) == 1, getError("more_than_one_token_impersonated"), 0)]
	<!-- Prompt if token is a library -->
	[h: assert(!startsWith(upper(getName(id)), "LIB:"), getError("library_token"), 0)]
	<!-- Prompt if token is not on token or GM layer -->
	[h: assert(getLayer(id) == "TOKEN" || getLayer(id) == "GM", getError("not_token_layer"), 0)]
	<!-- Prompt if not GM or token owner -->
	[h: assert(isGM() || isOwner(getPlayerName()), getError("not_token_owner"), 0)]
	<!-- Reset current token to impersonated token -->
	[h: switchToken(id)]
}]

<!-- Retrieve arguments -->
[h: name = getStrProp(macro.args, "name")]
[h: lib = getStrProp(macro.args, "lib")]
[h: args = getStrProp(macro.args, "args")]
[h: only = getStrProp(macro.args, "only", "undefined")]
[h, if (only != "undefined"): assert(eq(getType(), only), getError(only + "_only"), 0)]
<!-- Execute macro -->
[macro(name + "@Lib:" + lib): args]
