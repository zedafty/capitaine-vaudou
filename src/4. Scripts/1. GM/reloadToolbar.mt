<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--               Forces all players toolbar to be refreshed                -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[h: link = macroLinkText("ToolBar@Lib:Frames", "none")]
[h: broadcast(execlink(link, 1, "all"))]
