<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--          Updates ship states depending on hull or sail points           -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[h: pid = getPlayerToken()]
[h: map = getTokenMap(pid)]
[h: zPoints = getProp("Points", pid, map)]

<!-- Retrieve token current properties -->
[h: hull_pts = json.get(zPoints, "hull_pts")]
[h: hull_max = json.get(zPoints, "hull_max")]

<!-- Retrieve token previous properties -->
[h: hull_last = json.get(zPoints, "hull_last")]

<!-- Set temporary values -->
[h: hull_threshold = round(hull_max * 0.09)]

<!-- Check ship hull points lower than 10% -->
[r, if (hull_pts <= hull_threshold), code: {
	[h: setState("wreck", 1, pid, map)]
	[if (hull_pts != hull_last && hull_last > hull_threshold): execLink(macroLinkText("getStateChange@Lib:Scripts", "all", "wreck"))]
};{
	[h: setState("wreck", 0, pid, map)]
}]

<!-- Check ship hull points equal to zero -->
[r, if (hull_pts == 0), code: {
	[h: setState("wreck", 0, pid, map)]
	[h: setState("sunk", 1, pid, map)]
	[if (hull_pts != hull_last): execLink(macroLinkText("getStateChange@Lib:Scripts", "all", "sunk"))]
};{
	[h: setState("sunk", 0, pid, map)]
}]

<!-- Set previous properties to current -->
[h: zPoints = json.set(zPoints, "hull_last", hull_pts)]
[h: setProperty("Points", zPoints, pid, map)]

<!-- Refresh ship sheet (if required) -->
[h, if (arg(0) != "false"), code: {
	[h: refreshFrame("ShipSheet")]
}]
