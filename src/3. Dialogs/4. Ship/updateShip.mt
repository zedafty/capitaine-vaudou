<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                           Updates ship status                           -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[h: pid = getPlayerToken()]
[h: map = getTokenMap(pid)]
[h: zShip = getProp("Ship", pid, map)]

[h: dash = decode("%E2%80%94")]
[h: name = decodeString(json.get(zShip, "name"))]

[h: captain = json.get(zShip, "captain")]
[h: abort(input(
	"junkVar||<html><b style='color:#006699'>Modifier le navire</b></html>|LABEL|TEXT=FALSE'",
	"name|" + if (name == "", dash, name) + "|<html>&mdash;&nbsp;Nom</html>|TEXT|WIDTH=16",
	"class|" + getListString("ship_class_list", "") + "|<html>&mdash;&nbsp;Type</html>|LIST|SELECT=" + json.get(zShip, "class"),
	"flag|" + getListString("ship_flag_list", "") + "|<html>&mdash;&nbsp;Pavillon</html>|LIST|SELECT=" + json.get(zShip, "flag")
))]

[h: len = getConst("ship_input_len")]
[h: name = if (name == dash, "", encodeString(name, len))]

[h, if (class != json.get(zShip, "class")): switchShipClass(class, pid, map)]
[h, if (flag != json.get(zShip, "flag")): switchShipFlag(flag, pid, map)]

[h: zShip = json.set("{}", "class", class, "name", name, "flag", flag, "captain", captain)]
[h: setProperty("Ship", zShip, pid, map)]
[h: refreshFrame("ShipSheet")]
