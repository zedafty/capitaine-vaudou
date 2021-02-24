<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                  Returns ability list for Dice Roller                   -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- Retrieve property object -->
[h: zAbilities = arg(0)]

<!-- Default Option -->
[r: "<option value='0' selected='selected'>&ndash;</option>"]

<!-- Known abilities -->
[r, c(json.length(zAbilities)), code: {
	[h: ability = json.get(zAbilities, roll.count)]
	[r: "
		<option value='-2'>" + decode(ability) + "</option>
	"]
}]
