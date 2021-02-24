<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                        Returns real name string                         -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!--
	macro()
	macro(surname)
	macro(surname, id)
-->

<!-- Retrieve token id and map name -->
[gid = ""]
[if (hasImpersonated() == 1 || getAssigned() != ""): gid = getPlayerToken()]
[if (argCount() > 1): gid = arg(1)]
[if (gid == ""): abort(0)]
[map = getTokenMap(gid)]
[if (map == ""): abort(0)]

<!-- Define output variable -->
[name = ""]
[type_str = getType(gid)]

<!-- Retrieve character name properties -->
[if (type_str == "Char"), code: {
	[full_name = arg(0)] <!-- also returns surname if set to 1 -->
	[zChar = getProp("Char", gid, map)]
	[first_name = json.get(zChar, "first_name")]
	[last_name = json.get(zChar, "last_name")]
	[surname = json.get(zChar, "surname")]
	[if (first_name != ""): name = first_name]
	[if (last_name != ""): name = last_name)]
	[if (first_name != "" && last_name != ""): name = strformat(getConst("name_strf"), first_name, last_name)]
	[if (full_name == 1 && surname != "" && (first_name != "" || last_name != "")): name = strformat(getConst("fullname_strf"), first_name, last_name, surname)]
	[if (first_name == "" && last_name == "" && surname != ""): name = surname]
}]

<!-- Retrieve ship name properties -->
[if (type_str == "Ship"), code: {
	[zShip = getProp("Ship", gid, map)]
	[name = json.get(zShip, "name")]
}]

<!-- Return output variable -->
[if (name != ""): return(0, decode(name))] <!-- Real name -->
[return(0, getName())] <!-- Token name -->
