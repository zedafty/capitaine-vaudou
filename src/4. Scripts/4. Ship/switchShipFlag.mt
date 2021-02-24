<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                          Switches a ship flag                           -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- USAGE
	macroname(index, id, mapname)
-->

[h: idx = arg(0)]
[h: pid = arg(1)]
[h: map = arg(2)]

[h: setAllStates(0, pid, map)]
[h: setState(getListString("ship_state_list", idx), 1, pid, map)]
[h, macro("checkPoints@Lib:Scripts"): ""]
