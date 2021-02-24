<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                   Clears token properties from a ship                   -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- Retrieve macro arguments -->
[h: varsFromStrProp(arg(0))]

<!-- Define character variables -->
[h: mind = 0]
[h: action = 0]
[h: perception = 0]
[h: natural = -1]
[h: human = -1]
[h: artificial = -1]
[h: supernatural = -1]
[h: navigation = -4]
[h: artillery = -4]

<!-- Define ship variables -->
[h: map = getTokenMap(pid)]
[h: staff = getProperty("Staff", pid, map)]

<!-- Set ship variables -->
[h, if (role == "captain"): staff = json.set(staff, "captain_id", "", "captain_name", "", "captain_action", action, "captain_navigation", navigation, "captain_artificial", artificial)]
[h, if (role == "skipper"): staff = json.set(staff, "skipper_id", "", "skipper_name", "", "skipper_mind", mind, "skipper_action", action, "skipper_navigation", navigation, "skipper_artificial", artificial)]
[h, if (role == "gunner"): staff = json.set(staff, "gunner_id", "", "gunner_name", "", "gunner_perception", perception, "gunner_artillery", artillery, "gunner_natural", natural, "gunner_human", human, "gunner_artificial", artificial, "gunner_supernatural", supernatural)]
[h: setProperty("Staff", staff, pid, map)]

<!-- Refresh ship sheet -->
[h: refreshFrame("ShipSheet")]
