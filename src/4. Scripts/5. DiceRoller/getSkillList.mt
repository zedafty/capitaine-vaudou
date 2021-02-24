<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                   Returns skill list for Dice Roller                    -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- A.1 Retrieve property object -->
[h: zSkills = arg(0)]

<!-- A.2 Define skill arrays -->
[h: srcx = "architecture, artillery, astronomy, esotericism, forgery, foreign_language, lip_reading, read_and_write, mathematics, medicine, navigation, locksmithing"]
[h: src4 = "fire_weapons, art_of_war, cartography, carpentry, riding, etiquette, history, music, swimming, nature, voodoo_pratices, sailmaking"]
[h: src2 = "cold_weapon, handiwork, comedy, command, climb, pirates_history, ship_language, first_aid, survival, pick_pocket"]
[h: src0 = "athletics, brawling, trading, cooking, drawing, speech, stealth, watching"]

<!-- B.1 Retrieve X skill values from token properties -->
[h: lst = json.set("{}", "default", "nil")]
[foreach(skill, srcx), code: {
	[h: val = json.get(zSkills, skill)]
	[h: out = if (isNumber(val), val, "nil")]
	[h: lst = json.set(lst, skill, out)]
}]
[r: json.toVars(lst)]

<!-- B.2 Retrieve -4 skill values from token properties -->
[h: lst = json.set("{}", "default", "-4")]
[foreach(skill, src4), code: {
	[h: val = json.get(zSkills, skill)]
	[h: out = if (isNumber(val), val, -4)]
	[h: lst = json.set(lst, skill, out)]
}]
[r: json.toVars(lst)]

<!-- B.3 Retrieve -2 skill values from token properties -->
[h: lst = json.set("{}", "default", "-2")]
[foreach(skill, src2), code: {
	[h: val = json.get(zSkills, skill)]
	[h: out = if (isNumber(val), val, -2)]
	[h: lst = json.set(lst, skill, out)]
}]
[r: json.toVars(lst)]

<!-- B.4 Retrieve 0 skill values from token properties -->
[h: lst = json.set("{}", "default", "0")]
[foreach(skill, src0), code: {
	[h: val = json.get(zSkills, skill)]
	[h: out = if (isNumber(val), val, 0)]
	[h: lst = json.set(lst, skill, out)]
}]
[r: json.toVars(lst)]

<!-- D. Write HTML -->
[r: "
	<option value='0' selected='selected'>&ndash;</option>
	<optgroup label='Talent X'>
		<option value='" + (architecture) + "'" + if (architecture == 'nil', ' disabled', '') + " data-key='architecture'>Architecture" + if (architecture != 'nil', ' (' + signInteger(architecture) + ')', '') + "</option>
		<option value='" + (artillery) + "'" + if (artillery == 'nil', ' disabled', '') + " data-key='artillery'>Artillerie" + if (artillery != 'nil', ' (' + signInteger(artillery) + ')', '') + "</option>
		<option value='" + (astronomy) + "'" + if (astronomy == 'nil', ' disabled', '') + " data-key='astronomy'>Astronomie" + if (astronomy != 'nil', ' (' + signInteger(astronomy) + ')', '') + "</option>
		<option value='" + (esotericism) + "'" + if (esotericism == 'nil', ' disabled', '') + " data-key='esotericism'>&#201;sot&#233;risme" + if (esotericism != 'nil', ' (' + signInteger(esotericism) + ')', '') + "</option>
		<option value='" + (forgery) + "'" + if (forgery == 'nil', ' disabled', '') + " data-key='forgery'>Falsification" + if (forgery != 'nil', ' (' + signInteger(forgery) + ')', '') + "</option>
		<option value='" + (foreign_language) + "'" + if (foreign_language == 'nil', ' disabled', '') + " data-key='foreign_language'>Langue &#233;trang&#232;re" + if (foreign_language != 'nil', ' (' + signInteger(foreign_language) + ')', '') + "</option>
		<option value='" + (lip_reading) + "'" + if (lip_reading == 'nil', ' disabled', '') + " data-key='lip_reading'>Lire sur les l&#232;vres" + if (lip_reading != 'nil', ' (' + signInteger(lip_reading) + ')', '') + "</option>
		<option value='" + (read_and_write) + "'" + if (read_and_write == 'nil', ' disabled', '') + " data-key='read_and_write'>Lire et &#233;crire" + if (read_and_write != 'nil', ' (' + signInteger(read_and_write) + ')', '') + "</option>
		<option value='" + (mathematics) + "'" + if (mathematics == 'nil', ' disabled', '') + " data-key='mathematics'>Math&#233;matiques" + if (mathematics != 'nil', ' (' + signInteger(mathematics) + ')', '') + "</option>
		<option value='" + (medicine) + "'" + if (medicine == 'nil', ' disabled', '') + " data-key='medicine'>M&#233;decine" + if (medicine != 'nil', ' (' + signInteger(medicine) + ')', '') + "</option>
		<option value='" + (navigation) + "'" + if (navigation == 'nil', ' disabled', '') + " data-key='navigation'>Navigation" + if (navigation != 'nil', ' (' + signInteger(navigation) + ')', '') + "</option>
		<option value='" + (locksmithing) + "'" + if (locksmithing == 'nil', ' disabled', '') + " data-key='locksmithing'>Serrurerie" + if (locksmithing != 'nil', ' (' + signInteger(locksmithing) + ')', '') + "</option>
	</optgroup>
	<optgroup label='Talent -4'>
		<option value='" + (fire_weapons) + "' data-key='fire_weapons'>Armes &#224; feu" + if (fire_weapons > -4, ' (' + signInteger(fire_weapons) + ')', '') + "</option>
		<option value='" + (art_of_war) + "' data-key='art_of_war'>Art de la guerre" + if (art_of_war > -4, ' (' + signInteger(art_of_war) + ')', '') + "</option>
		<option value='" + (cartography) + "' data-key='cartography'>Cartographie" + if (cartography > -4, ' (' + signInteger(cartography) + ')', '') + "</option>
		<option value='" + (carpentry) + "' data-key='carpentry'>Charpenterie" + if (carpentry > -4, ' (' + signInteger(carpentry) + ')', '') + "</option>
		<option value='" + (riding) + "' data-key='riding'>&#201;quitation" + if (riding > -4, ' (' + signInteger(riding) + ')', '') + "</option>
		<option value='" + (etiquette) + "' data-key='etiquette'>&#201;tiquette" + if (etiquette > -4, ' (' + signInteger(etiquette) + ')', '') + "</option>
		<option value='" + (history) + "' data-key='history'>Histoire" + if (history > -4, ' (' + signInteger(history) + ')', '') + "</option>
		<option value='" + (music) + "' data-key='music'>Musique" + if (music > -4, ' (' + signInteger(music) + ')', '') + "</option>
		<option value='" + (swimming) + "' data-key='swimming'>Natation" + if (swimming > -4, ' (' + signInteger(swimming) + ')', '') + "</option>
		<option value='" + (nature) + "' data-key='nature'>Nature" + if (nature > -4, ' (' + signInteger(nature) + ')', '') + "</option>
		<option value='" + (voodoo_pratices) + "' data-key='voodoo_pratices'>Pratiques vaudoues" + if (voodoo_pratices > -4, ' (' + signInteger(voodoo_pratices) + ')', '') + "</option>
		<option value='" + (sailmaking) + "' data-key='sailmaking'>Voilerie" + if (sailmaking > -4, ' (' + signInteger(sailmaking) + ')', '') + "</option>
	</optgroup>
	<optgroup label='Talent -2'>
		<option value='" + (cold_weapon) + "' data-key='cold_weapon'>Arme blanche" + if (cold_weapon > -2, ' (' + signInteger(cold_weapon) + ')', '') + "</option>
		<option value='" + (handiwork) + "' data-key='handiwork'>Bricolage" + if (handiwork > -2, ' (' + signInteger(handiwork) + ')', '') + "</option>
		<option value='" + (comedy) + "' data-key='comedy'>Com&#233;die" + if (comedy > -2, ' (' + signInteger(comedy) + ')', '') + "</option>
		<option value='" + (command) + "' data-key='command'>Commandement" + if (command > -2, ' (' + signInteger(command) + ')', '') + "</option>
		<option value='" + (climb) + "' data-key='climb'>Escalade" + if (climb > -2, ' (' + signInteger(climb) + ')', '') + "</option>
		<option value='" + (pirates_history) + "' data-key='pirates_history'>Histoire des pirates" + if (pirates_history > -2, ' (' + signInteger(pirates_history) + ')', '') + "</option>
		<option value='" + (ship_language) + "' data-key='ship_language'>Langue du navire" + if (ship_language > -2, ' (' + signInteger(ship_language) + ')', '') + "</option>
		<option value='" + (first_aid) + "' data-key='first_aid'>Premiers soins" + if (first_aid > -2, ' (' + signInteger(first_aid) + ')', '') + "</option>
		<option value='" + (survival) + "' data-key='survival'>Survie" + if (survival > -2, ' (' + signInteger(survival) + ')', '') + "</option>
		<option value='" + (pick_pocket) + "' data-key='pick_pocket'>Vol &#224; la tire" + if (pick_pocket > -2, ' (' + signInteger(pick_pocket) + ')', '') + "</option>
	</optgroup>
	<optgroup label='Talent 0'>
		<option value='" + athletics + "' data-key='athletics'>Athl&#233;tisme" + if (athletics > 0, ' (' + signInteger(athletics) + ')', '') + "</option>
		<option value='" + brawling + "' data-key='brawling'>Bagarre" + if (brawling > 0, ' (' + signInteger(brawling) + ')', '') + "</option>
		<option value='" + trading + "' data-key='trading'>Commerce" + if (trading > 0, ' (' + signInteger(trading) + ')', '') + "</option>
		<option value='" + cooking + "' data-key='cooking'>Cuisine" + if (cooking > 0, ' (' + signInteger(cooking) + ')', '') + "</option>
		<option value='" + drawing + "' data-key='drawing'>Dessin" + if (drawing > 0, ' (' + signInteger(drawing) + ')', '') + "</option>
		<option value='" + speech + "' data-key='speech'>Discours" + if (speech > 0, ' (' + signInteger(speech) + ')', '') + "</option>
		<option value='" + stealth + "' data-key='stealth'>Discr&#233;tion" + if (stealth > 0, ' (' + signInteger(stealth) + ')', '') + "</option>
		<option value='" + watching + "' data-key='watching'>Observation" + if (watching > 0, ' (' + signInteger(watching) + ')', '') + "</option>
	</optgroup>
"]
