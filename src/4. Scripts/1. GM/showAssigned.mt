<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--            Shows assigned player tokens ids, names and maps             -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- USAGE
	macroname()                     output table in chatlog
	macroname(1)                    output table in chatlog with token ids
-->

<!-- Check GM -->
[assert(isGM(), getError("gm_only"), 0)]

<!-- Set variables -->
[lib = "Lib:Players"]
[list = getAllPlayerNames()]
[pl_lst = ""]
[id_lst = ""]
[nm_lst = ""]
[mp_lst = ""]

<!-- Loop over library properties -->
[foreach(key, getLibPropertyNames(lib)), code: {
	[name = if (listFind(list, key) == -1, "<i color=#999999>" + key + "</i>", "<b color=#009900>" + key + "</b>")]
	[id = getLibProperty(key, lib)]
	[val = "<b color=#999999>none</b>"]
	[map = if (id != "", getTokenMap(id), "")]
	[if (id != "" && map == ""): val = "<b color=#990000>DELETED</b>"]
	[if (map != ""): val = "<a href='" + macroLinkText("fetchToken@Lib:Scripts", "self", "grab=0;id=" + id) + "'>" + getName(id, map) + "</a>")]
	[pl_lst = json.append(pl_lst, name)]
	[id_lst = json.append(id_lst, id)]
	[nm_lst = json.append(nm_lst, val)]
	[mp_lst = json.append(mp_lst, map)]
}]

<!-- Build table -->
[out = ""]
[wd = " width=50"]
[tr = " style='border-top: 1px solid #aaaaaa'"]
[td = " style='border-left: 1px solid #aaaaaa'"]
[for (i, 0, json.length(pl_lst)), code: {
	[out = out + "<tr" + tr + ">"]
	[out = out + "<td" + td + ">" + json.get(pl_lst, i) + "</td>"]
	[if (arg(0) == 1): out = out + "<td" + td + ">" + json.get(id_lst, i) + "</td>"]
	[out = out + "<td" + td + ">" + json.get(nm_lst, i) + "</td>"]
	[out = out + "<td" + td + ">" + json.get(mp_lst, i) + "</td>"]
	[out = out + "</tr>"]
}]
[out = "<table cellspacing=0><tr><th" + wd + ">Player</th>" + if (arg(0) == 1, "<th" + wd + ">ID</th>", "") + "<th" + wd + ">Token</th><th" + wd + ">Map</th></tr>" + out + ""]

<!-- Output result -->
[return(0, out)]
