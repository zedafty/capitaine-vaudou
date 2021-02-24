<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                      Edits an item in an inventory                      -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[h: index = macro.args]
[h: item = json.get(Inventory, index)]

[h: dash = decode("%E2%80%94")]
[h: name = decodeString(json.get(item, "name"))]
[h: note = decodeString(json.get(item, "note"))]

[h: abort(input(
	"junkVar||<html><b style='color:#006699'>Modifier " + getItemType("word") + "</b></html>|LABEL|TEXT=FALSE",
	"name|" + if (name == "", dash, name) + "|<html>&mdash;&nbsp;Nom</html>|TEXT|WIDTH=16",
	"type_num|" + getItemType("list") + "|<html>&mdash;&nbsp;Type</html>|LIST|SELECT=" + json.get(item, "type"),
	"quantity|" + json.get(item, "quantity") + "|<html>&mdash;&nbsp;Quantit&eacute;</html>|TEXT|WIDTH=16",
	"value|" + json.get(item, "value") + "|<html>&mdash;&nbsp;Valeur&nbsp;<small>(Ps)</small></html>|TEXT|WIDTH=16",
	"note|" + if (note == "", dash, note) + "|<html>&mdash;&nbsp;Note</html>|TEXT|WIDTH=16"
))]

[h: len = getConst("item_input_len")]
[h: name = if (name == dash, "", encodeString(name, len))]
[h: quantity = if (isNumber(quantity), quantity, 0)]
[h: quantity = min(max(floor(quantity), 0), getConst("item_quantity_max"))]
[h: value = if (isNumber(value), value, 0)]
[h: value = min(max(floor(value), 0), getConst("item_value_max"))]
[h: note = if (note == dash, "", encodeString(note, getConst("note_input_len")))]

[h: new_item = json.set("{}", "name", name, "type", type_num,"quantity", quantity, "value", value, "note", note)]
[h: Inventory = json.set(Inventory, index, new_item)]
[h: refreshFrame("Sheet")]
