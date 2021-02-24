<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--               Refreshes an overlay only if already opened               -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[h: name = arg(0)]
[h: args = ""]
[h, if (argCount() > 1): args = arg(1)]
[h, if (isOverlayRegistered(name)): openOverlay(name, args)]
