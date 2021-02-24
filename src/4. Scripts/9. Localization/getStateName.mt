<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                     Returns state localized string                      -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[str = ""]
[gender = 0]
[if (hasImpersonated() == 1 || getAssigned() != ""), code: {
	[if (getType() == "Char"): gender = getProp("Char", "gender")]
}]
[switch(arg(0)), code:
	case "dead"              : {[str = if (gender == 0 || gender == 2, "Mort", "Morte")]};
	case "unconscious"       : {[str = if (gender == 0 || gender == 2, "Inconscient", "Inconsciente")]};
	case "breathless"        : {[str = if (gender == 0 || gender == 2, "Essoufl&eacute;", "Essoufl&eacute;e")]};
	case "nervous_breakdown" : {[str = "Crise de nerfs")]};
	case "cursed"            : {[str = if (gender == 0 || gender == 2, "Maudit", "Maudite")]};
	case "wreck"             : {[str = "&Eacute;pave"]};
	case "sunk"              : {[str = "Plouf"]};
	default                  : {[str = "&Eacute;tat"]}
]
[return(0, str)]
