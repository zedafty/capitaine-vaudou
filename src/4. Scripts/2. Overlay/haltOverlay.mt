<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                            Halts an overlay                             -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[h: name = arg(0)]
[h: refresh = 1]
[h, if (argCount() > 1): refresh = arg(1)]
[h: closeOverlay(name)]
[h, if (name != "ToolBar" && refresh == "1"): execLink(macroLinkText("refreshOverlay@Lib:Scripts", "none", "ToolBar"), 1)]
