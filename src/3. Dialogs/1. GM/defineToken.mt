<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                  Defines selected token(s) properties                   -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- Check GM -->
[h: assert(isGM(), getError("gm_only"), 0)]

<!-- Check selection -->
[h: sid = getSelected()]
[h: assert(listCount(sid) > 0, getError("not_selected"), 0)]

<!-- Check token type -->
[h: lst = ""]
[h, foreach(id, sid), code: {
	[h: name = lower(getName(id))]
	[h: isLib = startsWith(name, 'lib:')]
	[h: isImg = startsWith(name, 'image:')]
	[h, if (isLib == 0 && isImg == 0): lst = listAppend(lst, id)]
}]
[h: assert(listCount(lst) > 0, getError("library_token"), 0)]

<!-- Define defaults -->
[h: keep = "(no change)"]
[h: ctype = keep + ", <html><b color=#228822>PC</b></html>, <html><span color=#888888>NPC</span></html>"]
[h: propt = keep + ", Basic, Char, Ship"]
[h: owner = listAppend(keep + ", All, None", getAllPlayerNames())]
[h: layrl = keep + ", TOKEN, GM, OBJECT, BACKGROUND"]
[h: layrf = keep + ", <html><b color=#228822>TOKEN</b></html>, <html><span color=#888888>GM</span></html>, <html><span color=#aa2222>OBJECT</span></html>, <html><span color=#aa2222>BACKGROUND</span></html>"]
[h: visib = keep + ", <html><b color=#228822>All</b></html>, <html><span color=#aa2222>None</span></html>, Owner"]

<!-- Set defaults -->
[h: num = listCount(lst)]
[h, if (num == 1), code: {
	[h: id = listGet(lst, 0)]
	[h: title_v = (getName(id))]
	[h: ctype_v = if (isPC(id), "1", "2")]
	[h: propt_v = listFind(propt, getPropertyType(id))]
	[h: layer_v = listFind(layrl, getLayer(id))]
	[h: visib_v = 1]
	[h, if (getVisible(id) == 0): visib_v = 2]
	[h, if (getOwnerOnlyVisible(id) == 1): visib_v = 3]
};{
	[h: title_v = "Tous les pions s&eacute;lectionn&eacute;s"]
	[h: ctype_v = 0]
	[h: propt_v = 0]
	[h: layer_v = 0]
	[h: visib_v = 0]
}]

<!-- Display modal -->
[h: abort(input(
	"junkVar|<html><span style='color: #996600'>" + title_v + "</span></html>|<html><b style='color:#006699'>D&eacute;finir" + if (num == 1, " pion", "") + "</b></html>|LABEL|TEXT=true",
	"ctype|" + ctype + "|<html>&mdash;&nbsp;Type de pion</html>|LIST|SELECT=" + ctype_v,
	"propt|" + propt + "|<html>&mdash;&nbsp;Propri&eacute;t&eacute;s</html>|LIST|SELECT=" + propt_v + " VALUE=STRING",
	"owner|" + owner + "|<html>&mdash;&nbsp;Propri&eacute;taire</html>|LIST|SELECT=0 VALUE=STRING",
	"layer|" + layrf + "|<html>&mdash;&nbsp;Couche</html>|LIST|SELECT=" + layer_v,
	"visib|" + visib + "|<html>&mdash;&nbsp;Visibilit&eacute;</html>|LIST|SELECT=" + visib_v
))]

[h, foreach(id, lst), code: {

	<!-- Set Character Type -->
	[h, if (ctype == 1): setPC(id)]
	[h, if (ctype == 2): setNPC(id)]

	<!-- Set Property Type -->
	[h, if (propt != keep): setPropertyType(propt, id)]
	
	<!-- Set Ownership -->
	[h, if (owner == "All"): setOwnedByAll(1, id)]
	[h, if (owner != "All" && owner != keep): setOwnedByAll(0, id)]
	[h, if (owner == "None" || owner == "All"): setOwner("", id)]
	[h, if (owner != "None" && owner != "All" && owner != keep): setOwner(owner, id)]

	<!-- Set Layer -->
	[h, if (layer > 0): setLayer(listGet(layrl, layer), id)]

	<!-- Set Visbility -->
	[h, if (visib != 0): setVisible(0, id)]
	[h, if (visib != 0): setOwnerOnlyVisible(0, id)]
	[h, if (visib == 1): setVisible(1, id)]
	[h, if (visib == 3): setOwnerOnlyVisible(1, id)]

	<!-- Set Opacity -->
	[h, if (getConst("token_opacity")), code: {
		[h: opacity = 1.0]
		[h, if (visib > 1 || layer > 1): opacity = getConst("token_opacity_val")]
		[h, if (visib > 0): setTokenOpacity(opacity, id)]
	}]

	<!-- Feedback to self -->
	[r: "<b>" + getName(id) + "</b> is now a <b>" + if (isPC(id), "PC", "NPC") + "</b> <u>" + propt + "</u>" +  if (owner != keep, " owned by " + owner, "")]

}]
