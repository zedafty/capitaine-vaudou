<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                        Updates character status                         -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[h: pid = getPlayerToken()]
[h: map = getTokenMap(pid)]
[h: zChar = getProp("Char", pid, map)]

[h: dash = decode("%E2%80%94")]
[h: first_name = decodeString(json.get(zChar, "first_name"))]
[h: last_name = decodeString(json.get(zChar, "last_name"))]
[h: surname = decodeString(json.get(zChar, "surname"))]
[h: citizenship = decodeString(json.get(zChar, "citizenship"))]
[h: trade = decodeString(json.get(zChar, "trade"))]
[h: speciality = decodeString(json.get(zChar, "speciality"))]
[h: sephiroth = decodeString(json.get(zChar, "sephiroth"))]

[h: abort(input(
	"junkVar||<html><b style='color:#006699'>Modifier le personnage</b></html>|LABEL|TEXT=FALSE'",
	"first_name|" + if (first_name == "", dash, first_name) + "|<html>&mdash;&nbsp;Pr&eacute;nom</html>|TEXT|WIDTH=16",
	"last_name|" + if (last_name == "", dash, last_name) + "|<html>&mdash;&nbsp;Nom</html>|TEXT|WIDTH=16",
	"surname|" + if (surname == "", dash, surname) + "|<html>&mdash;&nbsp;Surnom</html>|TEXT|WIDTH=16",
	"age|" + json.get(zChar, "age") + "|<html>&mdash;&nbsp;&Acirc;ge</html>|TEXT|WIDTH=4",
	"gender|" + getListString("gender_list", "") + "|<html>&mdash;&nbsp;Genre</html>|LIST|SELECT=" + json.get(zChar, "gender"),
	"citizenship|" + if (citizenship == "", dash, citizenship) + "|<html>&mdash;&nbsp;Nationalit&eacute;</html>|TEXT|WIDTH=16",
	"trade|" + if (trade == "", dash, trade) + "|<html>&mdash;&nbsp;M&eacute;tier</html>|TEXT|WIDTH=16",
	"speciality|" + if (speciality == "", dash, speciality) + "|<html>&mdash;&nbsp;Sp&eacute;cialit&eacute;</html>|TEXT|WIDTH=16",
	"sephiroth|" + if (sephiroth == "", dash, sephiroth) + "|<html>&mdash;&nbsp;Sephiroth</html>|TEXT|WIDTH=16",
	"sephiroth_type|" + getListString("sephiroth_type_list", "") + "|<html>&mdash;&nbsp;Type</html>|LIST|SELECT=" + json.get(zChar, "sephiroth_type")
))]

[h: len = getConst("char_input_len")]
[h: first_name = if (first_name == dash, "", encodeString(first_name, len))]
[h: last_name = if (last_name == dash, "", encodeString(last_name, len))]
[h: surname = if (surname == dash, "", encodeString(surname, len))]

[h: age = if (isNumber(age), age, 0)]
[h, if (age > 0), code: {[h: age = min(max(round(age), getConst("char_age_min")), getConst("char_age_max"))]};{[h: age = ""]}]

[h: citizenship = if (citizenship == dash, "", encodeString(citizenship, len))]
[h: trade = if (trade == dash, "", encodeString(trade, len))]
[h: speciality = if (speciality == dash, "", encodeString(speciality, len))]
[h: sephiroth = if (sephiroth == dash, "", encodeString(sephiroth, len))]

[h: zChar = json.set(zChar, "first_name", first_name, "surname", surname, "last_name", last_name, "age", age, "gender", gender, "citizenship", citizenship, "trade", trade, "speciality", speciality, "sephiroth", sephiroth, "sephiroth_type", sephiroth_type)]
[h: setProperty("Char", zChar, pid, map)]
[h: refreshFrame("CharSheet")]
