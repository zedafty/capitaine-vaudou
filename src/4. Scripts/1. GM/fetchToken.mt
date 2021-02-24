<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--              Finds a token over maps and move screen to it              -->
<!--               Optionally, impersonates the fetched token                -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- USAGE
	macroname()                     find impersonated or assigned token
	macroname(1)                    find impersonated or assigned token and impersonate it
	macroname(0, id)                find token with provided id
	macroname(1, id)                find token with provided id and impersonate it
-->

<!-- Get token ID -->
[h: id = ""]
[h, if (argCount() > 1), code: {
	[h: id = arg(1)]
}; {
	[h: id = getAssigned()]
	[h, if (id == "" && hasImpersonated()): id = getImpersonated(1)]
}]

<!-- Get macro arguments -->
[h: grab = 0]
[h: num = arg(0)]
[h, if (isNumber(num) == 1): grab = num]
[h, if (!isNumber(num) && num != ""): grab = varsFromStrProp(arg(0))]

<!-- Check errors -->
[h: assert((id != ""), getError("no_player_token_id"), 0)]
[h: map = getTokenMap(id)]
[h: assert((map != ""), getError("no_player_token_map"), 0)]
[h: assert(isGM() == 1 || getMapVisible(map) == 1, getError("player_token_map_not_visible"), 0)]

<!-- Switch map -->
[h: setCurrentMap(map)]

<!-- Move screen to token -->
[h, if (getConst("fetch_center") == 1), code: {
	[h: goto(id)]
};{
	[h: x = getTokenX(0, id)]
	[h: y = getTokenY(0, id)]
	[h: v = getViewArea(0, "json")]
	[h: w = ceil((json.get(v, "endX") - json.get(v, "startX") - 1) / 2)]
	[h: h = ceil((json.get(v, "endY") - json.get(v, "startY") - 1) / 2)]
	[h: goto(x + w - 1, y + h - 1))]
}]

<!-- Reset zoom -->
[h, if (getConst("fetch_rezoom") == 1): setZoom(1.0)]

<!-- Select token -->
[h: deselectTokens()]
[h: selectTokens(id)]

<!-- Grab token -->
[h, if (grab == 1), code: {
	[h: switchToken(id)]
	[h: impersonate(id)]
}]
