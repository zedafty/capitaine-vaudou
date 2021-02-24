<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                         Checks character Purse                          -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[h: pid = getPlayerToken()]
[h: map = getTokenMap(pid)]
[h: zChar = getProp("Char", pid, map)]

[h: amount = json.get(macro.args, "amount")]
[h: amount = if(!isNumber(amount), 0, amount)]
[h: name = getRealName()]
[r, if (amount == 0), code: {
	[h: return(0, name + " farfouille dans sa bourse &hellip;")]
};{
	<!-- A. Update token properties -->
	[h: old = json.get(zChar, "purse")]
	[h: sum = round(min(getConst("purse_value_max"), max(0, old + amount)))]
	[h: zChar = json.set(zChar, "purse", sum))]
	[h: setProperty("Char", zChar, pid, map)]
	<!-- B. Refresh character sheet -->
	[h, macro("refreshFrame@Lib:Scripts"): "CharSheet"]
	<!-- C. Send feedback to chatlog -->
	[h: amount = sum - old]
	[h: abs = abs(amount)]
	[h: let = if (abs > 1, "s", "")]
	[h: str = if (amount < 0, "paye", "s&rsquo;enrichit de")]
	[r: name + " " + str + " " + abs + " Pi&egrave;ce" + let + " de huit &nbsp;!"]
}]
