<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                         Updates character purse                         -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[h: abort(input(
	"junkVar||<html><b style='color:#006699'>Pi&egrave;ces de huit poss&eacute;d&eacute;es &#183; <code style='color: #990033'>" + getProp("Char", "purse") + "</code></b></html>|LABEL|TEXT=FALSE",
	"amount|0|<html>&mdash;&nbsp;Perte / Gain</html>|TEXT|WIDTH=16"
))]

[r, macro("checkPurse@Lib:Scripts"): '{"amount"=' + amount + '}']
