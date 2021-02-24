<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--        Checks bubbling icons on token selection through overlay         -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- Check settings -->
[h, if (getConst("bubbling_icons") == 0): abort(0)]

<!-- Check selected token -->
[h: val = 0]
[h: lib = "Lib:Vars"]
[h: sid = getSelected()]
[h, if (listCount(sid) == 1), code: {
	[name = getName(listGet(sid, 0))]
	[val = if (startsWith(lower(name), "lib:") == 0, 1, 0)]
	[val = if (startsWith(lower(name), "image:") == 1, 2, val))]
}]

<!-- Refresh overlay only if necessary-->
[h, if (val != getLibProperty("bubbling", lib) || sid != getLibProperty("bubbling_id", lib)), code: {
	[setLibProperty("bubbling", val, lib)]
	[setLibProperty("bubbling_id", sid, lib)]
	[macro("ToolBar@Lib:Frames"): val]
}]
