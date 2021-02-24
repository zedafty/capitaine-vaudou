<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                Switches weather widget either on or off                 -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- Toggle weather library variable -->
[h: lib = "Lib:Vars"]
[h: val = getLibProperty("weather", lib)]
[h: val = if (val == 1, 0, 1)]
[h: setLibProperty("weather", val, lib)]

<!-- Refresh toolbar for every players -->
[h, macro("reloadTool@Lib:Scripts"): ""]
