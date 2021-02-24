<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                    Updates ship sail and hull points                    -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[h: pid = getPlayerToken()]
[h: map = getTokenMap(pid)]
[h: zPoints = getProp("Points", pid, map)]

[h: name = getRealName()]
[h: sail_cur = json.get(zPoints, "sail_pts")]
[h: hull_cur = json.get(zPoints, "hull_pts")]
[h: sail_max = json.get(zPoints, "sail_max")]
[h: hull_max = json.get(zPoints, "hull_max")]

[h: abort(input(
	"junkVar|0|<html><b style='color:#006699'>Points de voile actuels &#183; <code style='color: #990033'>" + sail_cur + " / " + sail_max + "</code></b></html>|LABEL|TEXT=FALSE",
	"sail_add| 0 |<html>&mdash;&nbsp;Perte / Gain</b></html>|TEXT|WIDTH=16",
	"junkVar|0|<html><b style='color:#006699'>Points de coque actuels &#183; <code style='color: #990033'>" + hull_cur + " / " + hull_max + "</code></b></html>|LABEL|TEXT=FALSE",
	"hull_add|0|<html>&mdash;&nbsp;Perte / Gain</html>|TEXT|WIDTH=16"
))]

[h, if (!isNumber(sail_add)): sail_add = 0]
[h, if (!isNumber(hull_add)): hull_add = 0]

[h: sail_pl = if (abs(sail_add) > 1 || abs(sail_add) < 1, "s", "")]
[h: hull_pl = if (abs(hull_add) > 1 || abs(hull_add) < 1, "s", "")]

[r, if (sail_add < 0): name + " perd " + abs(sail_add) + " point" + sail_pl + " de voile&nbsp;&hellip;<br>"]
[r, if (sail_add > 0): name + " r&eacute;cup&egrave;re "+ sail_add + " point" + sail_pl + " de voile&nbsp;!<br>"]
[r, if (hull_add < 0): name + " perd " + abs(hull_add) + " point" + hull_pl + " de coque&nbsp;&hellip;<br>"]
[r, if (hull_add > 0): name + " r&eacute;cup&egrave;re "+ hull_add + " point" + hull_pl + " de coque&nbsp;!<br>"]
[r, if (sail_add == 0 && hull_add == 0): name + " fait le bilan&nbsp;&hellip;<br>"]

[h: sail_pts = max(min(sail_max, sail_cur + sail_add), 0)]
[h: hull_pts = max(min(hull_max, hull_cur + hull_add), 0)]

[h: zPoints = json.set(zPoints, "sail_pts", sail_pts, "hull_pts", hull_pts))]
[h: setProperty("Points", zPoints, pid, map)]

[h: execLink(macroLinkText("checkPoints@Lib:Scripts", "none", ""), 1)]
