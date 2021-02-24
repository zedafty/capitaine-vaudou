<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                 Check if impersonated token has changed                 -->
<!--                 and update provided Overlay accordingly                 -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->
<!-- The below is called EVERY time the onChangeImpersonated event is fired  -->
<!--           The onChangeImpersonated event is fired EVERY time            -->
<!--                      ANY token property is changed                      -->
<!----------------------------------------------------------------------------->

[h: varsFromStrProp(arg(0))]
[h: gid = getImpersonated(1)]
[h, if (id != gid && name == "DiceRoller"), code: {
	[h: haltOverlay(name)]
	[if (gid == ""): abort(0)]
	[if (getType(gid) != "Char"): abort(0)]
	[h, macro("abortNobody@Lib:Scripts"): "name=" + name + ";lib=Frames"]
}]
[h, if (id != gid && name == "ToolBar"): refreshOverlay("ToolBar")]
