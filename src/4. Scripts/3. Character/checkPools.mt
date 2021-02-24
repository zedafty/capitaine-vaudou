<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--           Updates character states depending on HP, BP or MP            -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[h: pid = getPlayerToken()]
[h: map = getTokenMap(pid)]
[h: zPools = getProp("Pools", pid, map)]

<!-- Retrieve token current properties -->
[h: hp = json.get(zPools, "hp")]
[h: bp = json.get(zPools, "bp")]
[h: mp = json.get(zPools, "mp")]

<!-- Retrieve token previous properties -->
[h: hp_last = json.get(zPools, "hp_last")]
[h: bp_last = json.get(zPools, "bp_last")]
[h: mp_last = json.get(zPools, "mp_last")]

<!-- Check character breath points -->
[r, if (bp == 0), code: {
	[h: setState("breathless", 1, pid, map)]
	[if (bp != bp_last): execLink(macroLinkText("getStateChange@Lib:Scripts", "all", "breathless"))]
};{
	[h: setState("breathless", 0, pid, map)]
}]

<!-- Check character mind points -->
[h, if (mp == 0), code: {
	[h: setState("nervous_breakdown", 1, pid, map)]
	[if (mp != mp_last): execLink(macroLinkText("getStateChange@Lib:Scripts", "all", "nervous_breakdown"))]
};{
	[h: setState("nervous_breakdown", 0, pid, map)]
}]

<!-- Check character hit points -->
[h, if (hp == 0), code: {
	[h: setState("dead", 1, pid, map)]
	[h: setState("breathless", 0, pid, map)]
	[h: setState("nervous_breakdown", 0, pid, map)]
	[h: setState("unconscious", 0, pid, map)]
	[if (hp != hp_last): execLink(macroLinkText("getStateChange@Lib:Scripts", "all", "dead"))]
};{
	[h: setState("dead", 0, pid, map)]
}]

<!-- Set previous properties to current -->
[h: zPools = json.set(zPools, "hp_last", hp, "bp_last", bp, "mp_last", mp))]
[h: setProperty("Pools", zPools, pid, map)]

<!-- Refresh character sheet (if required) -->
[h, if (arg(0) != "false"), code: {
	[h: refreshFrame("CharSheet")]
	[h: refreshOverlay("DiceRoller")]
}]
