<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                 Returns changed state localized string                  -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[h: str = ""]
[h: name = getRealName()]
[h, switch(arg(0)), code:
	case "dead"              : {[str = name + " est " + lower(getStateName("dead")) + "&nbsp;!"]};
	case "unconscious"       : {[str = name + " est " + lower(getStateName("unconscious")) + "&nbsp;!"]};
	case "breathless"        : {[str = name + " est " + lower(getStateName("breathless")) + "&nbsp;!"]};
	case "nervous_breakdown" : {[str = name + " fait une " + lower(getStateName("nervous_breakdown")) + "&nbsp;!"]};
	case "cursed"            : {[str = name + " a &eacute;t&eacute; " + lower(getStateName("cursed")) + "&nbsp;!"]};
	case "wreck"             : {[str = name + " est une " + lower(getStateName("wreck")) + "&nbsp;&hellip;"]};
	case "sunk"              : {[str = name + " a fait " + lower(getStateName("sunk")) + "&nbsp;!"]};
	default                  : {[str = "Un &eacute;tat de " + getName() + " a &eacute;t&eacute; modifi&eacute;."]}
]
[r: return(0, str)]
