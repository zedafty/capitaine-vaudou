<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--              Refreshes toolbar overlay if map has changed               -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[h: name = arg(0)]
[h, if (getCurrentMapName() != name): refreshOverlay("ToolBar", 3)]
