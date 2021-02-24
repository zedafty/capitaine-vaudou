<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                     Updates character HP, BP and MP                     -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[h: pid = getPlayerToken()]
[h: map = getTokenMap(pid)]
[h: zPools = getProp("Pools", pid, map)]

[h: name = getRealName()]
[h: hp_cur = json.get(zPools, "hp")]
[h: bp_cur = json.get(zPools, "bp")]
[h: mp_cur = json.get(zPools, "mp")]
[h: hp_max = json.get(zPools, "hp_max")]
[h: bp_max = json.get(zPools, "bp_max")]
[h: mp_max = json.get(zPools, "mp_max")]

[h: abort(input(
	"junkVar|0|<html><b style='color:#006699'>Points de vie actuels &#183; <code style='color: #990033'>" + hp_cur + " / " + hp_max + "</code></b></html>|LABEL|TEXT=FALSE",
	"hp_add|0|<html>&mdash;&nbsp;Perte / Gain</b></html>|TEXT|WIDTH=16",
	"junkVar|0|<html><b style='color:#006699'>Points de souffle actuels &#183; <code style='color: #990033'>" + bp_cur + " / " + bp_max + "</code></b></html>|LABEL|TEXT=FALSE",
	"bp_add|0|<html>&mdash;&nbsp;Perte / Gain</html>|TEXT|WIDTH=16",
	"junkVar|0|<html><b style='color:#006699'>&Eacute;quilibre pyschologique actuel &#183; <code style='color: #990033'>" + mp_cur + " / " + mp_max + "</code></b></html>|LABEL|TEXT=FALSE",
	"mp_add|0|<html>&mdash;&nbsp;Perte / Gain</html>|TEXT|WIDTH=16"
))]

[h, if (!isNumber(hp_add)): hp_add = 0]
[h, if (!isNumber(bp_add)): bp_add = 0]
[h, if (!isNumber(mp_add)): mp_add = 0]

[h: hp_pl = if (abs(hp_add) > 1 || abs(hp_add) < 1, "s", "")]
[h: bp_pl = if (abs(bp_add) > 1 || abs(bp_add) < 1, "s", "")]
[h: mp_pl = if (abs(mp_add) > 1 || abs(mp_add) < 1, "s", "")]

[r, if (hp_add < 0): name + " perd " + abs(hp_add) + " point" + hp_pl + " de vie&nbsp;&hellip;<br>"]
[r, if (hp_add > 0): name + " r&eacute;cup&egrave;re "+ hp_add + " point" + hp_pl + " de vie&nbsp;!<br>"]
[r, if (bp_add < 0): name + " perd " + abs(bp_add) + " point" + bp_pl + " de souffle&nbsp;&hellip;<br>"]
[r, if (bp_add > 0): name + " r&eacute;cup&egrave;re "+ bp_add + " point" + bp_pl + " de souffle&nbsp;!<br>"]
[r, if (mp_add < 0): name + " perd " + abs(mp_add) + " point" + mp_pl + " d&rsquo;&eacute;quilibre psychologique&nbsp;&hellip;<br>"]
[r, if (mp_add > 0): name + " r&eacute;cup&egrave;re "+ mp_add + " point" + mp_pl + " d&rsquo;&eacute;quilibre psychologique&nbsp;!<br>"]
[r, if (hp_add == 0 && bp_add == 0 && mp_add == 0): name + " fait le bilan&nbsp;&hellip;<br>"]

[h: hp = max(min(hp_max, hp_cur + hp_add), 0)]
[h: bp = max(min(bp_max, bp_cur + bp_add), 0)]
[h: mp = max(min(mp_max, mp_cur + mp_add), 0)]

[h: zPools = json.set(zPools, "hp", hp, "bp", bp, "mp", mp))]
[h: setProperty("Pools", zPools, pid, map)]

[h: execLink(macroLinkText("checkPools@Lib:Scripts", "none", ""), 1)]
