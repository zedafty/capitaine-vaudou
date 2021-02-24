<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                          Switches a ship class                          -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- USAGE
	macroname(index, id, mapname)
-->

[h: idx = arg(0)]
[h: pid = arg(1)]
[h: map = arg(2)]

[h: Cannons2 = json.set("{}", "port2_pts", 0, "port2_cur", 0, "port2_max", 0, "port2_msb", 0, "star2_pts", 0, "star2_cur", 0, "star2_max", 0, "star2_msb", 0)]

[h, switch(idx), code:
	case 1 : {
		[h: Points =     json.set("{}", "sail_pts", 6, "sail_max", 6, "hull_pts", 6, "hull_max", 6, "hull_last", 6)]
		[h: Navigation = json.set("{}", "speed_day", 0, "speed_maneuver", 4, "draught", 0, "maneuver_penalty", 0)]
		[h: Crew =       json.set("{}", "maneuver", 4, "maneuver_min", 4, "additional", 0, "additional_max", 4, "crew_total", 4, "crew_max", 10, "vacant", 0)]
		[h: Cannons1 =   json.set("{}", "port1_pts", 2, "port1_cur", 2, "port1_max", 2, "port1_msb", 0, "star1_pts", 2, "star1_cur", 2, "star1_max", 2, "star1_msb", 0)]
	};
	case 2 : {
		[h: Points =     json.set("{}", "sail_pts", 9, "sail_max", 9, "hull_pts", 9, "hull_max", 9, "hull_last", 9)]
		[h: Navigation = json.set("{}", "speed_day", 90, "speed_maneuver", 5, "draught", 1, "maneuver_penalty", 0)]
		[h: Crew =       json.set("{}", "maneuver", 8, "maneuver_min", 8, "additional", 0, "additional_max", 35, "crew_total", 8, "crew_max", 50, "vacant", 0)]
		[h: Cannons1 =   json.set("{}", "port1_pts", 4, "port1_cur", 4, "port1_max", 4, "port1_msb", 1, "star1_pts", 4, "star1_cur", 4, "star1_max", 4, "star1_msb", 1)]
	};
	case 3 : {
		[h: Points =     json.set("{}", "sail_pts", 9, "sail_max", 9, "hull_pts", 9, "hull_max", 9, "hull_last", 9)]
		[h: Navigation = json.set("{}", "speed_day", 90, "speed_maneuver", 5, "draught", 1, "maneuver_penalty", 0)]
		[h: Crew =       json.set("{}", "maneuver", 8, "maneuver_min", 8, "additional", 0, "additional_max", 35, "crew_total", 8, "crew_max", 50, "vacant", 0)]
		[h: Cannons1 =   json.set("{}", "port1_pts", 8, "port1_cur", 8, "port1_max", 8, "port1_msb", 2, "star1_pts", 8, "star1_cur", 8, "star1_max", 8, "star1_msb", 2)]
	};
	case 4 : {
		[h: Points =     json.set("{}", "sail_pts", 9, "sail_max", 9, "hull_pts", 12, "hull_max", 12, "hull_last", 12)]
		[h: Navigation = json.set("{}", "speed_day", 100, "speed_maneuver", 6, "draught", 2, "maneuver_penalty", 0)]
		[h: Crew =       json.set("{}", "maneuver", 10, "maneuver_min", 10, "additional", 0, "additional_max", 40, "crew_total", 10, "crew_max", 60, "vacant", 0)]
		[h: Cannons1 =   json.set("{}", "port1_pts", 8, "port1_cur", 8, "port1_max", 8, "port1_msb", 2, "star1_pts", 8, "star1_cur", 8, "star1_max", 8, "star1_msb", 2)]
	};
	case 5 : {
		[h: Points =     json.set("{}", "sail_pts", 12, "sail_max", 12, "hull_pts", 9, "hull_max", 9, "hull_last", 9)]
		[h: Navigation = json.set("{}", "speed_day", 105, "speed_maneuver", 5, "draught", 3, "maneuver_penalty", 0)]
		[h: Crew =       json.set("{}", "maneuver", 14, "maneuver_min", 14, "additional", 0, "additional_max", 30, "crew_total", 14, "crew_max", 70, "vacant", 0)]
		[h: Cannons1 =   json.set("{}", "port1_pts", 8, "port1_cur", 8, "port1_max", 8, "port1_msb", 2, "star1_pts", 8, "star1_cur", 8, "star1_max", 8, "star1_msb", 2)]
	};
	case 6 : {
		[h: Points =     json.set("{}", "sail_pts", 12, "sail_max", 12, "hull_pts", 12, "hull_max", 12, "hull_last", 12)]
		[h: Navigation = json.set("{}", "speed_day", 120, "speed_maneuver", 6, "draught", 3, "maneuver_penalty", 0)]
		[h: Crew =       json.set("{}", "maneuver", 18, "maneuver_min", 18, "additional", 0, "additional_max", 50, "crew_total", 18, "crew_max", 90, "vacant", 0)]
		[h: Cannons1 =   json.set("{}", "port1_pts", 8, "port1_cur", 8, "port1_max", 8, "port1_msb", 2, "star1_pts", 8, "star1_cur", 8, "star1_max", 8, "star1_msb", 2)]
	};
	case 7 : {
		[h: Points =     json.set("{}", "sail_pts", 18, "sail_max", 18, "hull_pts", 15, "hull_max", 15, "hull_last", 15)]
		[h: Navigation = json.set("{}", "speed_day", 90, "speed_maneuver", 4, "draught", 4, "maneuver_penalty", 0)]
		[h: Crew =       json.set("{}", "maneuver", 21, "maneuver_min", 21, "additional", 0, "additional_max", 40, "crew_total", 21, "crew_max", 80, "vacant", 0)]
		[h: Cannons1 =   json.set("{}", "port1_pts", 4, "port1_cur", 4, "port1_max", 4, "port1_msb", 0, "star1_pts", 4, "star1_cur", 4, "star1_max", 4, "star1_msb", 0)]
	};
	case 8 : {
		[h: Points =     json.set("{}", "sail_pts", 24, "sail_max", 24, "hull_pts", 30, "hull_max", 30, "hull_last", 30)]
		[h: Navigation = json.set("{}", "speed_day", 80, "speed_maneuver", 3, "draught", 5, "maneuver_penalty", 0)]
		[h: Crew =       json.set("{}", "maneuver", 24, "maneuver_min", 25, "additional", 0, "additional_max", 55, "crew_total", 24, "crew_max", 90, "vacant", 0)]
		[h: Cannons1 =   json.set("{}", "port1_pts", 9, "port1_cur", 9, "port1_max", 9, "port1_msb", 2, "star1_pts", 9, "star1_cur", 9, "star1_max", 9, "star1_msb", 2)]
	};
	case 9 : {
		[h: Points =     json.set("{}", "sail_pts", 32, "sail_max", 32, "hull_pts", 24, "hull_max", 24, "hull_last", 24)]
		[h: Navigation = json.set("{}", "speed_day", 110, "speed_maneuver", 5, "draught", 5, "maneuver_penalty", 0)]
		[h: Crew =       json.set("{}", "maneuver", 40, "maneuver_min", 40, "additional", 0, "additional_max", 80, "crew_total", 40, "crew_max", 120, "vacant", 0)]
		[h: Cannons1 =   json.set("{}", "port1_pts", 10, "port1_cur", 10, "port1_max", 10, "port1_msb", 3, "star1_pts", 10, "star1_cur", 10, "star1_max", 10, "star1_msb", 3)]
	};
	case 10 : {
		[h: Points =     json.set("{}", "sail_pts", 36, "sail_max", 36, "hull_pts", 24, "hull_max", 24, "hull_last", 24)]
		[h: Navigation = json.set("{}", "speed_day", 105, "speed_maneuver", 4, "draught", 5, "maneuver_penalty", 0)]
		[h: Crew =       json.set("{}", "maneuver", 50, "maneuver_min", 50, "additional", 0, "additional_max", 140, "crew_total", 50, "crew_max", 210, "vacant", 0)]
		[h: Cannons1 =   json.set("{}", "port1_pts", 10, "port1_cur", 10, "port1_max", 10, "port1_msb", 3, "star1_pts", 10, "star1_cur", 10, "star1_max", 10, "star1_msb", 3)]
		[h: Cannons2 =   json.set("{}", "port2_pts", 10, "port2_cur", 10, "port2_max", 10, "port2_msb", 3, "star2_pts", 10, "star2_cur", 10, "star2_max", 10, "star2_msb", 3)]
	};
	default: {
		[h: Points =     json.set("{}", "sail_pts", 3, "sail_max", 3, "hull_pts", 3, "hull_max", 3, "hull_last", 3)]
		[h: Navigation = json.set("{}", "speed_day", 0, "speed_maneuver", 1, "draught", 0, "maneuver_penalty", 0)]
		[h: Crew =       json.set("{}", "maneuver", 1, "maneuver_min", 1, "additional", 0, "additional_max", 0, "crew_total", 1, "crew_max", 1, "vacant", 0)]
		[h: Cannons1 =   json.set("{}", "port1_pts", 0, "port1_cur", 1, "port1_max", getConst("cannons_max"), "port1_msb", 0, "star1_pts", 0, "star1_cur", 1, "star1_max", getConst("cannons_max"), "star1_msb", 0)]
		[h: Cannons2 =   json.set("{}", "port2_pts", 0, "port2_cur", 1, "port2_max", getConst("cannons_max"), "port2_msb", 0, "star2_pts", 0, "star2_cur", 1, "star2_max", getConst("cannons_max"), "star2_msb", 0)]
	}
]

[h: setProperty("Points", Points, pid, map)]
[h: setProperty("Navigation", Navigation, pid, map)]
[h: setProperty("Crew", Crew, pid, map)]
[h: setProperty("Cannons1", Cannons1, pid, map)]
[h: setProperty("Cannons2", Cannons2, pid, map)]
[h, macro("checkPoints@Lib:Scripts"): ""]
