<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                Checks if impersonated token has changed                 -->
<!--                  and update provided Frame accordingly                  -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->
<!-- The below is called EVERY time the onChangeImpersonated event is fired  -->
<!--           The onChangeImpersonated event is fired EVERY time            -->
<!--                      ANY token property is changed                      -->
<!----------------------------------------------------------------------------->

[h: varsFromStrProp(arg(0))]
[h: gid = getImpersonated(1)]
[h, if (id != gid), code: {

	[h: sheet = if (endsWith(name, "Sheet") == 1, 1, 0)]
	[h: name = if (sheet == 1, getType(id) + "Sheet", name)]
	[h: closeFrame(name)]

	[h, if (gid == ""): abort(0)]

	[h: name = if (sheet == 1, getType(gid) + "Sheet", name)]
	[h, macro("abortNobody@Lib:Scripts"): "name=" + name + ";lib=Frames"]

}]
