<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                        Returns Constant Variable                        -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!--
	css_fx              Display CSS Background Effects ; Default = 1
	toolbar_bottom      Put the toolbar to the bottom middle of screen (instead of top left) ; Default = 1
	bubbling_icons      Show bubbling icons when a token is selected (GM option) ; Default = 1
	fetch_center        Center the window on token when it is fetched, set window to token top left otherwise ; Default = 1
	fetch_rezoom        Reset the window zoom level to 100% when a token is fetched ; Default = 1
	token_opacity       Change token opacity when not on token layer or set not visible to all ; Default = 1
	token_opacity_val   Opacity value for token not on token layer or set not visible to all ; Default = 0.5
	note_input_len      Maximum text input length for notes ; Default = 1024
	item_input_len      Maximum text input length for inventory item ; Default = 24
	char_input_len      Maximum text input length for character status ; Default = 24
	ship_input_len      Maximum text input length for ship status ; Default = 32
	char_age_min        Minimum character age ; Default = 15
	char_age_max        Maximum character age ; Default = 115
	purse_value_max     Maximum number of pieces of eight in purse ; Default = 999999
	item_value_max      Maximum item value in pieces of eight ; Default = 999999
	item_quantity_max   Maximum item quantity in inventory (per instance) ; Default = 999
	sail_pts_max        Maximum ship number of sail points ; Default = 42
	hull_pts_max        Maximum ship number of hull points ; Default = 36
	speed_day_max       Maximum ship speed per day in milles ; Default = 200
	speed_maneuver_max  Maxium ship speed maneuver ; Default = 9
	draught_max         Maxium ship draught ; Default = 9
	crew_max            Maxium ship crew members ; Default = 500
	cannons_max         Maxium ship cannons per board and level ; Default = 12
	cannonballs_max     Maxium ship cannonballs per type (core rule: 60 per cannon) ; Default = 2400
-->

[val = ""]
[switch(arg(0)), code:
	case "css_fx"              : {[val = 1]};
	case "toolbar_bottom"      : {[val = 1]};
	case "bubbling_icons"      : {[val = 1]};
	case "fetch_center"        : {[val = 1]};
	case "fetch_rezoom"        : {[val = 1]};
	case "token_opacity"       : {[val = 1]};
	case "token_opacity_val"   : {[val = 0.5]};
	case "note_input_len"      : {[val = 1024]};
	case "item_input_len"      : {[val = 24]};
	case "char_input_len"      : {[val = 24]};
	case "ship_input_len"      : {[val = 32]};
	case "char_age_min"        : {[val = 15]};
	case "char_age_max"        : {[val = 115]};
	case "purse_value_max"     : {[val = 999999]};
	case "item_value_max"      : {[val = 999999]};
	case "item_quantity_max"   : {[val = 999]};
	case "sail_pts_max"        : {[val = 42]};
	case "hull_pts_max"        : {[val = 36]};
	case "speed_day_max"       : {[val = 200]};
	case "speed_maneuver_max"  : {[val = 9]};
	case "draught_max"         : {[val = 9]};
	case "crew_max"            : {[val = 500]};
	case "cannons_max"         : {[val = 12]};
	case "cannonballs_max"     : {[val = 2400]};
	case "equipment_word"      : {[val = "un &eacute;quipement"]};
	case "shipment_word"       : {[val = "une cargaison"]};
	case "equipment_list"      : {[val = "Divers, Arme, V&ecirc;tement, Consommable, Qu&ecirc;te"]};
	case "shipment_list"       : {[val = "Divers, Armement, Passagers, Denr&eacute;es, Tr&eacute;sors"]};
	case "sephiroth_type_list" : {[val = "Loa racine, Ange gardien, D&eacute;mon, Djinn, Golem"]};
	case "gender_list"         : {[val = "Homme, Femme, Autre"]};
	case "ship_class_list"     : {[val = "Hors-classe, Chaloupe, Petit garde-c&ocirc;te, Sloop ou Garde-c&ocirc;te, Cotre, Brigantin, Go&eacute;lette, Marchand, Fr&eacute;gate, Corvette, Galion"]};
	case "ship_flag_list"      : {[val = "Aucun, Pirate, Royaume-uni, Anglais, &Eacute;cossais, Espagnol, Fran&ccedil;ais&#44; marine royale, Fran&ccedil;ais&#44; marine marchande, Hollandais"]};
	case "ship_state_list"     : {[val = "none, pirate, uk, en, scot, es, fr-royal, fr-merch, nl"]};
	case "name_strf"           : {[val = "%1\$s %2\$s"]};
	case "fullname_strf"       : {[val = "%1\$s %2\$s, dit %3\$s"]};
	case "roll_details"        : {[val = "D&eacute;tails"]};
	case "roll_options"        : {[val = "Options"]};
	default                    : {[""]}
]
[return(0, val)]
