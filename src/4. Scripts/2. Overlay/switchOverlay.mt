<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--       Refresh an overlay only if opened and nothing else visible        -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[h, if (isFrameVisible("CharSheet") || isFrameVisible("ShipSheet") || isOverlayRegistered("DiceRoller")): abort(0)]
[h: name = arg(0)]
[if (isOverlayRegistered(name)): openOverlay(name)]
