<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                   Checks if a sheet should be halted                    -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[h, if (!hasImpersonated(1) && getAssigned() == ""), code: {
	[h, if (isOverlayRegistered("DiceRoller")): haltOverlay("DiceRoller", 0)]
	[h, if (isFrameVisible("CharSheet")): haltFrame("CharSheet", 0)]
	[h, if (isFrameVisible("ShipSheet")): haltFrame("ShipSheet", 0)]
	[h: refreshOverlay("ToolBar")]
	[return(0, getError("not_impersonated"))]
}]
