<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--               Copie selected token properties into a ship               -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- Check selection -->
[h: sel = getSelected()]
[h: err = "not_selected"]
[h: err = if (listCount(sel) > 1, "more_than_one_token_selected", err)]
[h: assert(listCount(sel) == 1, getError(err), 0)]

<!-- Check token type -->
[h: assert(hasProperty("Char", sel) == 1, getError("not_character_token"), 0)]

<!-- Retrieve macro arguments -->
[h: varsFromStrProp(arg(0))]

<!-- Define character variables -->
[h: mind = json.get(getProperty("Components", sel), "mind")]
[h: action = json.get(getProperty("Means", sel), "action")]
[h: perception = json.get(getProperty("Means", sel), "perception")]
[h: natural = json.get(getProperty("Targets", sel), "natural")]
[h: human = json.get(getProperty("Targets", sel), "human")]
[h: artificial = json.get(getProperty("Targets", sel), "artificial")]
[h: supernatural = json.get(getProperty("Targets", sel), "supernatural")]
[h: navigation = json.get(getProperty("Skills", sel), "navigation")]
[h: navigation = if (navigation == "nil" || navigation == "", -4, navigation)]
[h: artillery = json.get(getProperty("Skills", sel), "artillery")]
[h: artillery = if (artillery == "nil" || artillery == "", -4, artillery)]

<!-- Define ship variables -->
[h: map = getTokenMap(pid)]
[h: staff = getProperty("Staff", pid, map)]
[h: skipper = json.get(staff, "skipper_id")]
[h: gunner =  json.get(staff, "gunner_id")]

<!-- Set ship variables -->
[h, if (role == "captain"): staff = json.set(staff, "captain_id", pid, "captain_name", getRealName(0, sel), "captain_action", action, "captain_navigation", navigation, "captain_artificial", artificial)]
[h, if (role == "skipper" || (role == "captain" && skipper == "")): staff = json.set(staff, "skipper_id", pid, "skipper_name", getRealName(0, sel), "skipper_mind", mind, "skipper_action", action, "skipper_navigation", navigation, "skipper_artificial", artificial)]
[h, if (role == "gunner" || (role == "captain" && gunner == "")): staff = json.set(staff, "gunner_id", pid, "gunner_name", getRealName(0, sel), "gunner_perception", perception, "gunner_artillery", artillery, "gunner_natural", natural, "gunner_human", human, "gunner_artificial", artificial, "gunner_supernatural", supernatural)]
[h: setProperty("Staff", staff, pid, map)]

<!-- Refresh ship sheet -->
[h: refreshFrame("ShipSheet")]
