<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                      Adds an item in an inventory                       -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[h: dash = decode("%E2%80%94")]

[h: abort(input(
	"junkVar||<html><b style='color:#006699'>Ajouter " + getItemType("word") + "</b></html>|LABEL|TEXT=FALSE",
	"name|" + dash + "|<html>&mdash;&nbsp;Nom</html>|TEXT|WIDTH=16",
	"type_num|" + getItemType("list") + "|<html>&mdash;&nbsp;Type</html>|LIST|SELECT=0",
	"quantity|1|<html>&mdash;&nbsp;Quantit&eacute;</html>|TEXT|WIDTH=16",
	"value|0|<html>&mdash;&nbsp;Valeur&nbsp;<small>(Ps)</small></html>|TEXT|WIDTH=16",
	"note|" + dash + "|<html>&mdash;&nbsp;Note</html>|TEXT|WIDTH=16"
))]

[h: len = getConst("item_input_len")]
[h: name = if (name == dash, "", encodeString(name, len))]
[h: quantity = if (isNumber(quantity), quantity, 0)]
[h: quantity = min(max(floor(quantity), 0), getConst("item_quantity_max"))]
[h: value = if (isNumber(value), value, 0)]
[h: value = min(max(floor(value), 0), getConst("item_value_max"))]
[h: note = if (note == dash, "", encodeString(note))]

[h: new_item = json.set("{}", "name", name, "type", type_num,"quantity", quantity, "value", value, "note", note)]
[h: Inventory = json.append(Inventory, new_item)]
[h: refreshFrame("Sheet")]
