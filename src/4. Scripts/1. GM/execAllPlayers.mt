<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--       execAllPlayers (macro name, arguments, players, output to)        -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- This macro executes the macro on ALL SELECTED clients. Feed it macro@lib:token, args (json array) -->
<!-- And optional third argument is allowed where you give a list of clients where this macro should be executed -->

<!-- Check GM -->
[h: assert(isGM(), getError("gm_only"), 0)]

[h, if (argCount() > 2), code: {
	[userList = arg(2)]
	[if (json.type(userList)=="ARRAY"): userList = json.toList(userList)]
};{
	[userList = getAllPlayerNames()]
}]
[h, if (argCount() > 3), code: {
	[outputList = arg(3)]
	[if (json.type(outputList)=="ARRAY"): outputList = json.toList(outputList)]
};{
	[outputList = "none"]
}]

[h: self = getPlayerName()]
[h: others = listDelete(userList, listFind(userList, self))]

[h, if (others != ""): broadcast(macroLink("<color='red'>", arg(0), outputList, arg(1), ""), others)]
[h, if (listContains(userList, self)), code: {
	[macro(arg(0)): arg(1)]
}]
