<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                             Toggles a frame                             -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- Retrieve arguments -->
[h: name = arg(0)]

<!-- Switch to proper sheet -->
[h: name = if (endsWith(name, "Sheet") == 1, getType() + "Sheet", name)]

<!-- Toggle frame -->
[if (isFrameVisible(name)), code:{
	[h: haltFrame(name)]
};{
	[h: openFrame(name)]
}]
