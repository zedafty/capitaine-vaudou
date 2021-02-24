<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                         User Defined Functions                          -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!----------------------------------------------------------------------------->
<!--                                 Global                                  -->
<!----------------------------------------------------------------------------->
[defineFunction("getConst", "getConst@Lib:Global")]
[defineFunction("getError", "getError@Lib:Global")]
<!----------------------------------------------------------------------------->
<!--                                  Write                                  -->
<!----------------------------------------------------------------------------->
[defineFunction("writeMainJavaScript", "Main.js@Lib:Frames")]
[defineFunction("writeSheetJavaScript", "Sheet.js@Lib:Frames")]
[defineFunction("writeCharJavaScript", "Char.js@Lib:Frames")]
[defineFunction("writeShipJavaScript", "Ship.js@Lib:Frames")]
[defineFunction("writeDiceJavaScript", "Dice.js@Lib:Frames")]
[defineFunction("writeToolJavaScript", "Tool.js@Lib:Frames")]
<!----------------------------------------------------------------------------->
<!--                                   GM                                    -->
<!----------------------------------------------------------------------------->
[defineFunction("execAllPlayers", "execAllPlayers@Lib:Scripts", 1, 1)]
[defineFunction("fetchToken", "fetchToken@Lib:Scripts")]
[defineFunction("showAssigned", "showAssigned@Lib:Scripts")]
<!----------------------------------------------------------------------------->
<!--                                  Frame                                  -->
<!----------------------------------------------------------------------------->
[defineFunction("openFrame", "openFrame@Lib:Scripts")]
[defineFunction("haltFrame", "haltFrame@Lib:Scripts")]
[defineFunction("refreshFrame", "refreshFrame@Lib:Scripts")]
<!----------------------------------------------------------------------------->
<!--                                 Overlay                                 -->
<!----------------------------------------------------------------------------->
[defineFunction("openOverlay", "openOverlay@Lib:Scripts")]
[defineFunction("haltOverlay", "haltOverlay@Lib:Scripts")]
[defineFunction("refreshOverlay", "refreshOverlay@Lib:Scripts")]
<!----------------------------------------------------------------------------->
<!--                               Properties                                -->
<!----------------------------------------------------------------------------->
[defineFunction("getProp", "getProp@Lib:Scripts")]
[defineFunction("getType", "getType@Lib:Scripts")]
<!----------------------------------------------------------------------------->
<!--                                Character                                -->
<!----------------------------------------------------------------------------->
[defineFunction("getPool", "getPool@Lib:Scripts")]
[defineFunction("getComponent", "getComponent@Lib:Scripts")]
[defineFunction("getMean", "getMean@Lib:Scripts")]
[defineFunction("getTarget", "getTarget@Lib:Scripts")]
[defineFunction("getEnergy", "getEnergy@Lib:Scripts")]
[defineFunction("getPotential", "getPotential@Lib:Scripts")]
[defineFunction("getSkill", "getSkill@Lib:Scripts")]
[defineFunction("getEquipment", "getEquipment@Lib:Scripts")]
<!----------------------------------------------------------------------------->
<!--                                  Ship                                   -->
<!----------------------------------------------------------------------------->
[defineFunction("switchShipClass", "switchShipClass@Lib:Scripts")]
[defineFunction("switchShipFlag", "switchShipFlag@Lib:Scripts")]
<!----------------------------------------------------------------------------->
<!--                               Dice Roller                               -->
<!----------------------------------------------------------------------------->
[defineFunction("getSkillList", "getSkillList@Lib:Scripts")]
[defineFunction("getAbilityList", "getAbilityList@Lib:Scripts")]
<!----------------------------------------------------------------------------->
<!--                              Impersonation                              -->
<!----------------------------------------------------------------------------->
[defineFunction("getAssigned", "getAssigned@Lib:Scripts")]
[defineFunction("getPlayerToken", "getPlayerToken@Lib:Scripts")]
[defineFunction("setPlayerToken", "setPlayerToken@Lib:Scripts")]
<!----------------------------------------------------------------------------->
<!--                                 Format                                  -->
<!----------------------------------------------------------------------------->
[defineFunction("signInteger", "signInteger@Lib:Scripts")]
[defineFunction("encodeString", "encodeString@Lib:Scripts")]
[defineFunction("decodeString", "decodeString@Lib:Scripts")]
<!----------------------------------------------------------------------------->
<!--                              Localization                               -->
<!----------------------------------------------------------------------------->
[defineFunction("getRealName", "getRealName@Lib:Scripts")]
[defineFunction("getItemType", "getItemType@Lib:Scripts")]
[defineFunction("getListString", "getListString@Lib:Scripts")]
[defineFunction("getStateName", "getStateName@Lib:Scripts")]

<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                                Execution                                -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->
[execLink(macroLinkText("ToolBar@Lib:Frames", "none"), 1)]
[execLink(macroLinkText("printStyles@Lib:Global", "self"), 1, "self")]
[execLink(macroLinkText("showLicense@Lib:Global", "self"), 1, "self")]
[execLink(macroLinkText("showVersion@Lib:Global", "self"), 1, "self")]
