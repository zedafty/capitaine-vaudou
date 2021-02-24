[r: "
/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                      CAPITAINE VAUDOU MAIN JAVASCRIPT                      */
/*                                                                            */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Configuration */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

var cfg = {
	number : {
		max : 999999999, // Maximum value of number inputs of no max attribute is set -- Default : 999999999
		min : 0, // Minimum value of number inputs of no min attribute is set -- Default : 0
		step : 10 // Value incremented or decremented when shift key is hold when changing a number input by keys -- Default : 10
	},
	macro : {
		output : 'none', // Macro output scope (can be 'none', 'all, 'gm', 'self', 'gm-self') -- Default : 'none'
		delay : 75 // Time in milliseconds to wait before sending a called macro to back-end (new calls erase older) -- Default : 75
	},
	func : {
		delay : 150 // Time in milliseconds to wait before sending a called function to back-end (new calls erase older) -- Default : 150 (MUST be greater than macro.delay)
	},
	range : {
		delay : 150, // Time in milliseconds to wait before reseting value after a form input -- Default : 150
	},
	callback : {
		delay : 150 // Time in milliseconds to wait before sending a macro callback (new calls DO NOT erase older) -- Default : 500
	},
	overlay : {
		delay : 300 // Time in milliseconds to wait before refreshing overlay (new calls erase older) -- Default : 300
	},
	roll : {
		face : 6, // Default number of faces of a die -- Default : 6
		dice_max : 10, // Maximum number of dice rolled in a single throw -- Default : 10
		face_max : 100 // Maximum number of faces of a die -- Default : 6
	},
	difficulty : [-4, -2, -1, 0, 1, 2, 4] // Difficulty array -- Default : [-4, -2, -1, 0, 1, 2, 4]
};

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Languages */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

var lng = {
	// * Statistics
	'global_value'                : 'Valeur globale',
	'skill'                       : 'Talent',
	'ability'                     : 'Aptitude',
	// * Components
	'body'                        : 'Corps',
	'heart'                       : 'C\\u0153ur',
	'mind'                        : 'Esprit',
	// * Means
	'perception'                  : 'Perception',
	'action'                      : 'Action',
	'resistance'                  : 'R\\u00e9sistance',
	// * Targets
	'natural'                     : 'Nature',
	'human'                       : 'Humain',
	'artificial'                  : 'Artificiel',
	'supernatural'                : 'Surnaturel',
	// * Energies
	'power'                       : 'Puissance',
	'speed'                       : 'Rapidit\\u00e9',
	'accuracy'                    : 'Pr\\u00e9cision',
	// * Potentials
	'heroism'                     : 'H\\u00e9ro\\u00efsme',
	'voodoo'                      : 'Vaudou',
	'black_magic'                 : 'Magie noire',
	'white_magic'                 : 'Magie blanche',
	// * Skills
	'architecture'                : 'Architecture',
	'artillery'                   : 'Artillerie',
	'astronomy'                   : 'Astronomie',
	'esotericism'                 : '\\u00c9sot\\u00e9risme',
	'forgery'                     : 'Falsification',
	'foreign_language'            : 'Langue \\u00e9trang\\u00e8re',
	'lip_reading'                 : 'Lire sur les l\\u00e8vres',
	'read_and_write'              : 'Lire et \\u00e9crire',
	'mathematics'                 : 'Math\\u00e9matiques',
	'medicine'                    : 'M\\u00e9decine',
	'navigation'                  : 'Navigation',
	'locksmithing'                : 'Serrurerie',
	'fire_weapons'                : 'Armes \\u00e0 feu',
	'art_of_war'                  : 'Art de la guerre',
	'cartography'                 : 'Cartographie',
	'carpentry'                   : 'Charpenterie',
	'riding'                      : '\\u00c9quitation',
	'etiquette'                   : '\\u00c9tiquette',
	'history'                     : 'Histoire',
	'music'                       : 'Musique',
	'swimming'                    : 'Natation',
	'nature'                      : 'Nature',
	'voodoo_pratices'             : 'Pratiques vaudoues',
	'sailmaking'                  : 'Voilerie',
	'cold_weapon'                 : 'Arme blanche',
	'handiwork'                   : 'Bricolage',
	'comedy'                      : 'Com\\u00e9die',
	'command'                     : 'Commandement',
	'climb'                       : 'Escalade',
	'pirates_history'             : 'Histoire des pirates',
	'ship_language'               : 'Langue du navire',
	'first_aid'                   : 'Premiers soins',
	'survival'                    : 'Survie',
	'pick_pocket'                 : 'Vol \\u00e0 la tire',
	'athletics'                   : 'Athl\\u00e9tisme',
	'brawling'                    : 'Bagarre',
	'trading'                     : 'Commerce',
	'cooking'                     : 'Cuisine',
	'drawing'                     : 'Dessin',
	'speech'                      : 'Discours',
	'stealth'                     : 'Discr\\u00e9tion',
	'watching'                    : 'Observation',
	// * Ship
	'speed_maneuver'              : 'Vitesse de man\\u0153uvre',
	'broadside'                   : 'Bord\\u00e9e',
	'navigation'                  : 'Navigation',
	'maneuver'                    : 'Man\\u0153uvre',
	'cannonade_port1'             : 'Canonnade b\\u00e2bord',
	'cannonade_star1'             : 'Canonnade tribord',
	'cannonade_port2'             : 'Canonnade b\\u00e2bord (2e pont)',
	'cannonade_star2'             : 'Canonnade tribord (2e pont)',
	'sail_x_mile_fstr'            : 'Navigue %1 mille%2',
	'cannon_fire_fstr'            : 'Tir%1 de canon',
	'cannonballs'                 : 'Boulets',
	'hollowed'                    : 'Creux',
	'chained'                     : 'Ram\\u00e9s',
	'canister'                    : '\\u00c0 mitraille',
	'heated'                      : 'Rouges',
	'to_cannons'                  : 'aux canons',
	'to_sails'                    : 'aux voiles',
	'to_hull'                     : '\\u00e0 la coque',
	'to_crew'                     : '\\u00e0 l\\u2019\\u00e9quipage',
	'paired'                      : 'jumel\\u00e9',
	'inflict_damage_fstr'         : 'Inflige %1 d\\u00e9g\\u00e2t',
	'inflict_heat_damage'         : 'Inflige des d\\u00e9g\\u00e2ts de feu',
	'inflict_no_damage'           : 'N\\u2019inflige aucun d\\u00e9g\\u00e2t',
	'firing_with'                 : 'Tire avec',
	// * Roll
	'difficulty'                  : 'Difficult\\u00e9',
	'modifier'                    : 'Modificateur',
	'success_margin'              : 'Marge de r\\u00e9ussite',
	'failure_margin'              : 'Marge d\\u2019\\u00e9chec',
	'extra_success_rank'          : 'Degr\\u00e9 de succ\\u00e8s suppl\\u00e9mentaire',
	'extra_failure_rank'          : 'Degr\\u00e9 d\\u2019\\u00e9chec suppl\\u00e9mentaire',
	'success_margin_u'            : 'MR',
	'failure_margin_u'            : 'ME',
	'extra_success_rank_u'        : 'DSS',
	'extra_failure_rank_u'        : 'DES',
	'critical_range'              : 'Seuil critique',
	'show_details'                : 'Afficher d\\u00e9tails',
	'show_options'                : 'Afficher options',
	'roll_against'                : 'Contre',
	'roll_on'                     : 'Sur',
	'roll_with'                   : 'Avec',
	'roll_plus'                   : 'Plus',
	'roll_bonus'                  : 'Bonus',
	// * Roll Result
	'success'                     : 'R\\u00e9ussite',
	'critical_success'            : 'R\\u00e9ussite critique',
	'failure'                     : '\\u00c9chec',
	'critical_failure'            : '\\u00c9chec critique',
	'automatic_failure'           : '\\u00c9chec automatique',
	// * Roll Difficulty
	'very_difficult'              : 'Tr\\u00e8s difficile',
	'difficult'                   : 'Difficile',
	'not_easy'                    : 'Malais\\u00e9e',
	'normal'                      : 'Normale',
	'not_difficult'               : 'Ais\\u00e9e',
	'easy'                        : 'Facile',
	'very_easy'                   : 'Tr\\u00e8s facile',
	// * Roll Interpretation
	'exceptional'                 : 'Exceptionnel',
	'excellent'                   : 'Excellent',
	'very_good'                   : 'Tr\\u00e8s bon',
	'good'                        : 'Bon',
	'normal'                      : 'Normal',
	'almost'                      : 'Presque',
	'bad'                         : 'Mauvais',
	'very_bad'                    : 'Tr\\u00e8s mauvais',
	'execrable'                   : 'Ex\\u00e9crable',
	// * Roll bonuses
	'skill_increase_cr_by'        : 'Seuil de critique augment\\u00e9 par le Talent de ',
	'power_increase_mr_by'        : 'MR augment\\u00e9e par la Puissance de ',
	'accuracy_increase_cr_by'     : 'Seuil de critique augment\\u00e9 par la Pr\\u00e9cision de ',
	'skill_increase_mr_by'        : 'Coup critique&nbsp;: MR augment\\u00e9e par le Talent de ',
	'msb_increase_mr_by'          : 'Canonnade&nbsp;: MR augment\\u00e9e par la bord\\u00e9e de ',
	'critical_impossible_success' : 'MR = 0&nbsp;: R\\u00e9ussite critique sur un test pratiquement impossible \\u00e0 r\\u00e9ussir (seuil inf\\u00e9rieur ou \\u00e9gal \\u00e0 2).',
	'critical_impossible_failure' : 'ME = 0&nbsp;: \\u00c9chec critique sur un test pratiquement impossible \\u00e0 rater (seuil strictement sup\\u00e9rieur \\u00e0 13).',
	'accuracy_targeting_bonus'    : 'Pr\\u00e9cision permet de viser ou cibler plus efficacement.',
	// * Roll options
	'at_choice'                   : 'au choix',
	'speed_effects'               : 'Effets de Rapidit\\u00e9',
	'speed_success_draw'          : 'R\\u00e9ussite en cas d\\u2019\\u00e9galit\\u00e9 dans un Duel',
	'speed_time_reduced'          : 'Temps de l\\u2019action diminu\\u00e9 de ',
	'speed_fight_2_enemies'       : 'Se battre contre 2 adversaires en m\\u00eame temps',
	'speed_fight_3_enemies'       : 'Se battre contre 3 adversaires en m\\u00eame temps'
};

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Graphical User Interface */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

var gui = {
	macro : {
		timer : null // Internal
	},
	func : {
		timer : null // Internal
	},
	range : {
		timer : null, // Internal
		hover : false, // Internal
		elem : null // Internal
	},
	overlay : {
		timer : null // Internal
	}
};

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Number Functions */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function signInteger(n) { // n = number ; returns string
	n = typeof n === 'number' ? Math.floor(n) : 0;
	return n > 0 ? '+' + n : n.toString();
}

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Array Functions */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function sumArray(a) {return a.reduce(function(t, n) {return t + n;});} // a = array

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Element Functions */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function getVal(s) { // s = CSS selector
	let o = document.querySelector(s);
	return parseInt(o.tagName == 'INPUT' ? o.value : o.innerText);
}

function getData(s, k) { //s = CSS selector, k = data attribute key
	return parseInt(document.querySelector(s).dataset[k]);
}

function enableLink(o) { // o = HTML element
	o.classList.remove('disabled');
	o.removeAttribute('tabindex');
}

function disableLink(o) { // o = HTML element
	o.classList.add('disabled');
	o.setAttribute('tabindex', '-1');
}

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Classification Functions */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function getType() {
	let s = document.getElementsByTagName('body')[0].classList;
	if (s.contains('pc')) return 'pc';
	else if (s.contains('npc')) return 'npc';
	else if (s.contains('ship')) return 'ship';
}

function isPc() {return getType() == 'pc'}
function isNpc() {return getType() == 'npc'}
function isShip() {return getType() == 'ship'}

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Call Functions */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function callMacro(val, src, lib, out) {
	if (src === undefined) src = 'setProp';
	if (lib === undefined) lib = 'Scripts';
	let url = 'macro://' + src + '@Lib:' + lib + '/' + (out === undefined ? cfg.macro.output : out) + '/Impersonated?' + val;
	let o = document.getElementById('macrolink');
	o.href = url;
	o.click();
	// console.log('callMacro url = ' + url);
}

function callTimedMacro(val, src, lib, out) {
	clearTimeout(gui.macro.timer);
	gui.macro.timer = setTimeout(function() {
		callMacro(val, src, lib, out);
	}, cfg.macro.delay);
}

function callTimedFunction(callback, delay) {
	if (typeof callback !== 'function') callback = function() {};
	if (delay === undefined) delay = cfg.func.delay;
	clearTimeout(gui.func.timer);
	gui.func.timer = setTimeout(function() {
		callback();
	}, delay);
}

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Refresh Functions */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function refreshOverlay(s, d) { // s = name, d = delay (ms)
	if (d === undefined) d = cfg.overlay.delay;
	clearTimeout(gui.overlay.timer);
	gui.overlay.timer = setTimeout(function() {
		callMacro(s, 'refreshOverlay');
	}, d);
}

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Input Fixes */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

////////////////////////////////////////////////////////////////////////////////
// * Ranges Mouse Fix
////////////////////////////////////////////////////////////////////////////////

function updateRange(o) { // o = HTML element
	let n = parseInt(o.value);
	o.nextElementSibling.innerHTML = n > 0 ? '+' + n : n;
}
document.addEventListener('mouseup', function() {
	if (gui.range.hover) {
		gui.range.hover = false;
		gui.range.elem.focus();
	}
});
document.addEventListener('mousemove', function() {
	if (gui.range.hover) updateRange(gui.range.elem);
});
document.querySelectorAll('[type=range]').forEach(function(o) {
	o.addEventListener('mousedown', function() {
		gui.range.hover = true;
		gui.range.elem = this;
	});
	o.addEventListener('change', function() {
		updateRange(this);
	});
});

////////////////////////////////////////////////////////////////////////////////
// * Checkboxes Key Fix
////////////////////////////////////////////////////////////////////////////////

document.querySelectorAll('[type=checkbox]').forEach(function(o) {
	o.addEventListener('keyup', function(e) {
		if (e.which == 13) { // Key ENTER
			this.click(); // Force click
		}
	});
});

////////////////////////////////////////////////////////////////////////////////
// * Radios Click Fix
////////////////////////////////////////////////////////////////////////////////

document.querySelectorAll('[type=radio]').forEach(function(o) {
	o.addEventListener('click', function(e) {
		this.focus(); // Force focus
	});
});

////////////////////////////////////////////////////////////////////////////////
// * Number Ctrl/Shift Polyfill
////////////////////////////////////////////////////////////////////////////////

document.querySelectorAll('[type=number]').forEach(function(o) {
	o.addEventListener('keydown', function(e) {
		let k = e.which;
		if (k == 38 || k == 40) { // Key ArrowUp or ArrowDown
			if (e.shiftKey || e.ctrlKey) {
				e.preventDefault();
				let max = o.max !== '' ? parseInt(o.max) : cfg.number.max;
				let min = o.min !== '' ? parseInt(o.min) : cfg.number.min;
				let num = cfg.number.step;
				let dir = k == 38 ? 1 : -1;
				let val = parseInt(o.value);
				let evt = new Event('change');
				if (typeof val !== 'number') val = 0;
				if (e.ctrlKey) o.value = k == 38 ? max : min;
				else if (e.shiftKey) o.value = Math.max(Math.min(val + (dir * num), max), min);
				o.dispatchEvent(evt);
			}
		}
	});
});

////////////////////////////////////////////////////////////////////////////////
// * Print Icon CSS 1 Style
////////////////////////////////////////////////////////////////////////////////

function printIconStyle(k) { // k = icon key ; returns CSS property
	let s;
	switch(k) {
		case 'body'          : s = '0 0'; break;
		case 'heart'         : s = '-20px 0'; break;
		case 'mind'          : s = '-40px 0'; break;
		case 'perception'    : s = '-60px 0'; break;
		case 'action'        : s = '-80 0'; break;
		case 'resistance'    : s = '-100px 0'; break;
		case 'natural'       : s = '0 -20px'; break;
		case 'human'         : s = '-20px -20px'; break;
		case 'artificial'    : s = '-40px -20px'; break;
		case 'supernatural'  : s = '-60px -20px'; break;
		case 'power'         : s = '0 -40px'; break;
		case 'speed'         : s = '-20px -40px'; break;
		case 'accuracy'      : s = '-40px -40px'; break;
		case 'heroism'       : s = '-80px -20px'; break;
		case 'voodoo'        : s = '-100px -20px'; break;
		case 'white_magic'   : s = '-60px -40px'; break;
		case 'black_magic'   : s = '-80px -40px'; break;
		case 'kabbalah'      : s = '-100px -40px'; break;
		case 'roll'          : s = '-20px -200px'; break;
		case 'd6-f1'         : s = '0 -120px'; break;
		case 'd6-f2'         : s = '-20px -120px'; break;
		case 'd6-f3'         : s = '-40px -120px'; break;
		case 'd6-f4'         : s = '-60px -120px'; break;
		case 'd6-f5'         : s = '-80px -120px'; break;
		case 'd6-f6'         : s = '-100px -120px'; break;
		case 'd6-f1-cs'      : s = '0 -140px'; break;
		case 'd6-f2-cs'      : s = '-20px -140px'; break;
		case 'd6-f3-cs'      : s = '-40px -140px'; break;
		case 'd6-f4-cs'      : s = '-60px -140px'; break;
		case 'd6-f5-cs'      : s = '-80px -140px'; break;
		case 'd6-f6-cs'      : s = '-100px -140px'; break;
		case 'd6-f6-cf'      : s = '0 -160px'; break;
		case 'v0'            : s = '-20px -160px'; break;
		case 'v2'            : s = '-40px -160px'; break;
		case 'v4'            : s = '-60px -160px'; break;
		case 'v6'            : s = '-80px -160px'; break;
		case 'v8'            : s = '-100px -160px'; break;
		case 'v10'           : s = '0 -180px'; break;
		case 'vx'            : s = '-20px -180px'; break;
		default              : s = '0 0';
	} return 'background-position: ' + s + ';';
}

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Roll Functions */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

////////////////////////////////////////////////////////////////////////////////
// * Roll Utility Functions
////////////////////////////////////////////////////////////////////////////////

function roll(t, f, b) { // t = number of rolls, f = number of faces, b = array flag ; returns integer or array
	t = typeof t !== 'number' ? 1 : Math.max(Math.min(t, cfg.roll.dice_max), 1);
	f = typeof f !== 'number' ? cfg.roll.face : Math.max(Math.min(f, cfg.roll.face_max), 1);
	let r = b ? [] : 0;
	let i = n = 0;
	for (i; i < t; i++) {
		n = Math.floor(Math.random() * f) + 1;
		b ? r.push(n) : r += n;
	} return r;
}

function rollArray(t, f) { // t = number of rolls, f = number of faces ; returns array
	return roll(t, f, true);
}

function graduateDifficulty(r, v) { // r = range (-1 for 1 grade down, 2 for 2 grades up), v = difficulty value (e.g. -4 for Very difficult)
	if (v === undefined) v = 0;
	let a = cfg.difficulty;
	let n = a.indexOf(v);
	return a[Math.max(Math.min(a.length - 1, n + r), 0)];
}

function getRollInterpretationKey(n) { // n = roll numeric result
	k = '';
	if (n <= -9) k = 'exceptional';
	else if (n <= -6) k = 'excellent';
	else if (n <= -3) k = 'very_good';
	else if (n <= -1) k = 'good';
	else if (n <= 0) k = 'normal';
	else if (n <= 1) k = 'almost';
	else if (n <= 3) k = 'bad';
	else if (n <= 6) k = 'very_bad';
	else if (n > 6) k = 'execrable';
	return k;
}

function getCannonballDamageAdjustement(k, p) { // k = cannonball type, p = ship hit part ; returns number
	let n = 0;
	if ((k == 'hollowed' || k == 'heated') && p == 'cannons') n = -1;
	else if (k == 'chained' && p == 'sails') n = 1;
	else if (k == 'canister') {
		if (p == 'crew') n = 1;
		if (p == 'hull') n = -2;
	}
	return n;
}

////////////////////////////////////////////////////////////////////////////////
// * Roll Result Functions
////////////////////////////////////////////////////////////////////////////////

function getResult(r) { // r = roll object ; returns HTML string

	let n = 0; // result number
	let d = NaN; // dice result
	let h = ''; // header string
	let f = ''; // footer string
	let s = ''; // details string
	let o = ''; // options string
	let t = ''; // temporary string
	let a = []; // details array
	let b = []; // bonuses array
	let k, l; // loop temporary variables
	let sh = r.ship !== undefined; // is ship
	let sk = r.skill !== undefined && r.skill[0] != null; // has skill
	let skp = sk && r.skill[1] > 0; // is skill positive (greater than 1)

	// * Retrieve roll values
	if (sh) { // ship
		h = ' &ndash; ' + lng[r.ship.test];
		if (r.ship.test == 'navigation' || r.ship.test == 'maneuver') f = r.ship.crew;
	} else if (sk) { // pc or npc with skill defined
		h = ' &ndash; ' + lng[r.skill[0]] + ' (' + signInteger(r.skill[1]) + ')';
	}
	if (r.combination !== undefined) { // pc char or any ship
		n += r.combination.component[1];
		a.push([lng[r.combination.component[0]], r.combination.component[1]]);
		n += r.combination.mean[1];
		a.push([lng[r.combination.mean[0]], r.combination.mean[1]]);
	} else if (r.global_value !== undefined) { // npc char
		n += r.global_value;
		a.push([lng.global_value, r.global_value]);
	}
	if (Object.keys(r.target).length > 0) {
		l = r.target;
		for (k in l) {
			n += l[k];
			a.push([lng[k], l[k]]);
		}
	}
	if (r.difficulty !== undefined) {
		n += r.difficulty;
		if (r.difficulty != 0) a.push([lng.difficulty, r.difficulty]);
	}
	if (r.ability !== undefined) {
		n += r.ability;
		a.push([lng.ability, r.ability]);
	}
	if (sk) {
		n += r.skill[1];
		a.push([(lng[r.skill[0] !== undefined ? r.skill[0] : 'skill']), r.skill[1]]);
	}
	if (r.modifier !== undefined) {
		n += r.modifier;
		if (r.modifier != 0) a.push([lng.modifier, r.modifier]);
	}
	l = r.energies;
	for (k in l) {
		if (l[k] > 0) {
			n += l[k];
			a.push([lng[k], l[k]]);
		}
	}

	// * Retrieve dice values
	let r1 = r.roll[0], r2 = r.roll[1];

	// * Define dice result
	d = r1 + r2;

	// * Calculate roll margin
	let mr = (d) - n; // roll margin
	let mr_arr = 0; // margin additional roll(s) array
	let mr_num = 0; // margin additional roll(s) number

	// * Checks critical
	let v = false; // roll outcome (i.e. success or failure)
	let cs, cf, cr; // critical success, critical failure, critical range
	cr = 2; // base critical range
	// 1. Add Talent bonus to critical range and roll margin
	if (skp) {
		cr += r.skill[1];
		b.push(lng.skill_increase_cr_by + signInteger(r.skill[1]));
	}
	// 2. Add Accuracy Energy to critical range
	if (r.energies.accuracy > 0) {
		cr += r.energies.accuracy;
		b.push(lng.accuracy_increase_cr_by + signInteger(r.energies.accuracy));
	}
	// 3. Resolve critical roll
	cs = (d <= cr);
	cf = (r1 == 6 && r2 == 6); // critical failure
	// 4. Add Power Energy to roll margin
	if (mr <= 0 && r.energies.power > 0) { // only on success
		mr_arr = rollArray(r.energies.power);
		mr_num = sumArray(mr_arr);
		mr -= mr_num;
		b.push(lng.power_increase_mr_by + r.energies.power + 'd&nbsp;: ' + signInteger(mr_num) + ' (' + mr_arr.join(' + ') + ')');
	}
	// 5. Add critical roll bonuses to roll margin
	if (cs && skp) {
		mr_arr = rollArray(r.skill[1] + 1);
		mr_num = sumArray(mr_arr);
		mr -= mr_num;
		b.push(lng.skill_increase_mr_by + (r.skill[1] + 1) + 'd&nbsp;: ' + signInteger(mr_num) + ' (' + mr_arr.join(' + ') + ')');
	}
	if (r.energies.accuracy > 0 && d < cr) { // accuracy spent and roll result strictly lower than critical range (i.e. point unused)
		b.push(lng.accuracy_targeting_bonus);
	}
	// 6. Add cannonade margin success bonus
	if (sh && r.ship.test.indexOf('cannonade') > -1 && mr <= 0) {
		if (r.ship.msb > 0) mr -= r.ship.msb; // only on success
		b.push(lng.msb_increase_mr_by + signInteger(r.ship.msb) + (' (' + r.ship.fired + ' ' + lng.cannon_fire_fstr.replace('%1', (r.ship.fired > 1 ? 's' : '')) + ')').toLowerCase());
	}

	// * Anyway, resolve roll
	if (cs && n <= 2) { // critical throw on impossible to succeed roll (test final value lower or equal to 2), test succeeds with margin zero
		mr = 0; v = true;
		b.push(lng.critical_impossible_success);
	} else if (cf && n > 13) { // critical throw on impossible to fail roll (test final value greater than 13), test fails with margin zero
		mr = 0;
		b.push(lng.critical_impossible_failure);
	} else if (mr <= 0) v = true; // margin lower than or equal to zero, roll succeeds

	// * Calculate extra rank
	let xr = mr < 0 ? Math.abs(Math.ceil(mr / 3)) : Math.max(0, Math.min(2, (Math.floor((mr - 1) / 3))));

	// * Output variables
	let str_result = lng[(cs || cf ? 'critical_' : '') + (v ? 'success' : 'failure')];
	let str_margin = v ? lng.success_margin_u : lng.failure_margin_u;
	let str_extra_rank = v ? lng.extra_success_rank_u : lng.extra_failure_rank_u;
	let str_interpretation = lng[getRollInterpretationKey(mr)]

	// * Define details string
	s = `<div class='details'><b><i>` + str_result + `</i></b>, `
	+ `<i>` + str_interpretation.toLowerCase() + `</i> `
	+ `(` + str_margin + ` <b>` + Math.abs(mr) + `</b> `
	+ str_extra_rank + ` <b>` + xr + `</b>)</div>`
	+ `<div class='details' style='padding-left: 6px;'>`
	+ `<strong color=maroon>` + (d) + `</strong>`
	+ `&nbsp;(<strong color=gray>` + r1 + `</strong>` + ` + <strong color=gray>` + r2 + `</strong>) `
	+ lng.roll_against.toLowerCase() + ` `
	+ `<strong color=maroon>` + n + `</strong> `
	+ ` (` + lng.critical_range + ` <strong>` + cr + `</strong>)</div>`;

	// * Append threshold to details string
	s += `<table class='threshold' width=175 cellspacing=0 cellpadding=0 border=0 valign=middle>`;
	for (k in a) s += `<tr><td width=5>&nbsp;</td><td width=150 align=left>&mdash;&nbsp;<i>` + a[k][0] + ` </i></td><td><b color=teal>` + signInteger(a[k][1]) + `</b></td></tr>`
	s += `</table>`

	// * Append bonuses to details string
	if (b.length > 0) {
		s += `<ul class='bonuses'>`;
		for (k in b) s += `<li>&bull;&nbsp;` + b[k]; + `</li>`;
		s += `</ul>`;
	}

	// * Append roll options to string output
	if (r.energies.speed > 0) {
		o += `<div class='options'><b><i>` + lng.speed_effects + `</i></b> <small color=teal>(` + r.energies.speed + `pt` + (r.energies.speed > 1 ? `s` : ``) + ` ` + lng.at_choice + `)</small>`;
		o += `<br>&mdash;&nbsp;` + lng.speed_success_draw + ` <small color=teal>(1pt)</small>.`;
		o += `<br>&mdash;&nbsp;` + lng.speed_time_reduced + (xr > 0 ? `<strong color=purple>` + (Math.min((xr * 10), 100)) + `%</strong> + ` : ``) + `<strong color=purple>10%</strong> <small color=teal>(/1pt)</small>.`;
		o += `<br>&mdash;&nbsp;` + lng.speed_fight_2_enemies + ` <small color=teal>(1pt)</small>.`;
		if (r.energies.speed > 1) o += `<br>&mdash;&nbsp;` + lng.speed_fight_3_enemies + ` <small color=teal>(2pts)</small>.`;
		o += `</div>`;
	}

	function appendBlockElement(s, m) { // s = string, m = margin left length in px ; returns string
		if (m === undefined) m = 5;
		return `<div style='margin-top: 4px; margin-left: ` + m + `px;'>` + s + `</div>`;
	}

	// * Define footer line
	if (f.length > 0) f = appendBlockElement(`<small style='color: #771111;'>` + f + `</small>`, 10);

	// * Append navigation footer (i.e. miles)
	if (sh && r.ship.test == 'navigation') {
		let n = v && xr > 0 ? xr * 5 : 0;
		let s = n > 0 ? ' <small>(' + n + ' ' + lng.roll_bonus.toLocaleLowerCase() + ')</small>' : '';
		f += appendBlockElement(lng.sail_x_mile_fstr.replace('%1', (r.ship.speed + n)).replace('%2', (r.ship.speed + n > 1 ? 's' : '')) + s, 10);
	}

	/**
		9-12      : crew + sails (paired)
		5-8       : hull + crew (paired)
		3-4       : sails + crew (paired)
		2         : cannons + hull (paired)
		hollowed  : -1 cannons
		chained   : +1 sails
		canister  : +1 crew, -2 hull
		heated    : -1 cannons, flame damage
	*/
	// * Append cannonade footer (i.e. damage)
	if (sh && r.ship.test.indexOf('cannonade') > -1) {
		f += appendBlockElement(lng.firing_with + ' <strong color=#771111>' + r.ship.fired + '</strong> ' + (lng.cannonballs + ' ' + lng[r.ship.cannonballs]).toLowerCase());
		if (v) {
			let dmg = 1 + xr, dmg1, dm2;
			let part = ['cannons', 'hull'];
			if (d >= 9) part = ['crew', 'sails'];
			else if (d >= 5) part = ['hull', 'crew'];
			else if (d >= 3) part = ['sails', 'crew'];
			dmg1 = dmg + getCannonballDamageAdjustement(r.ship.cannonballs, part[0]);
			dmg2 = dmg + getCannonballDamageAdjustement(r.ship.cannonballs, part[1]);
			if (dmg1 > 0) f += appendBlockElement(lng.inflict_damage_fstr.replace('%1', '<strong color=#771111>' + dmg1 + '</strong>') + (dmg1 > 1 ? 's' : '') + ' <strong>' + lng[('to_' + part[0])] + '</strong>');
			else f += appendBlockElement(lng.inflict_no_damage + ' <strong>' + lng[('to_' + part[0])] + '</strong>');
			if (dmg2 > 0) f += appendBlockElement(lng.inflict_damage_fstr.replace('%1', '<strong color=#771111>' + dmg2 + '</strong>') + (dmg2 > 1 ? 's' : '') + ' ' + lng.paired + (dmg2 > 1 ? 's' : '') + ' <strong>' + lng[('to_' + part[1])] + '<strong>');
			else f += appendBlockElement(lng.inflict_no_damage + ' ' + lng.paired + ' <strong>' + lng[('to_' + part[1])] + '</strong>');
			if (dmg1 > 0 && dmg2 > 0 && r.ship.cannonballs == 'heated') f += appendBlockElement('<strong color=#cc3333>' + lng.inflict_heat_damage + '</strong>');
		} else f += appendBlockElement(lng.inflict_no_damage);
	}
"]
////////////////////////////////////////////////////////////////////////////////

	function replaceUrlChars(s) [r:"{"] // s = string ; returns string
		let g1 = new RegExp('\\+', 'g');
		let g2 = new RegExp('\\%', 'g');
		return s.replace(g1, 'hx2b').replace(g2, 'hx25');
	[r:"}"]


	// * Define details and options macro links
	let a1 = "macrolink_details::" + replaceUrlChars(s) + "::macrolink_details";
	let a2 = "macrolink_options::" + replaceUrlChars(o) + "::macrolink_options";

	// * Define name
	s = "<div class='head'><strong>[r:getRealName()]</strong></div>";

	// * Define header table
	t = "<strong style='color: " + (v ? '#226644' : '#882222') + "'>" + str_result + "</strong>";
	t += h;

	// * Concatenate header table
	s = s + "<div class='issue'>" + t + "</div>";

	// * Define result table
	t = "<tr class='th'>"
		+ "<td width=80 colspan=3>Jet</td>"
		+ "<td width=40>Seuil</td>"
		+ "<td width=40>" + str_margin + "</td>"
		+ "<td width=40>" + str_extra_rank + "</td>"
		+ "</tr>"
		+ "<tr class='td'>"
		+ "<td height=28 width=30 class='margin' style='padding-left: 4px;'><div class='icon' style='" + printIconStyle('d6-f' + r1 + (cs ? '-cs' : cf ? '-cf' : '')) + "'>&nbsp;</div></td>"
		+ "<td width=20 class='margin'><div class='icon' style='" + printIconStyle('d6-f' + r2 + (cs ? '-cs' : cf ? '-cf' : '')) + "'>&nbsp;</div></td>"
		+ "<td width=30><strong style='color: " + (cs ? '#226644' : cf ? '#882222' : '#333333') + "'>" + (r1 + r2) + "</strong></td>"
		+ "<td class='border'>" + n + "</td>"
		+ "<td class='border'>" + Math.abs(mr) + "</td>"
		+ "<td class='border'>" + xr + "</td>"
		+ "</tr>";

	// * Concatenate result table
	s = s + "<table class='result' width=200 cellspacing=0 cellpadding=0 border=0 valign=top>" + t + "</table>";

	// * Define params table
	if (!sh && isPc()) [r:"{"] // pc
	t = "<td class='bg'><div class='icon' style='" + [r:"printIconStyle(r.combination.component[0])"] + "'>&nbsp;</div></td>"
		+ "<td class='text'>/</td>"
		+ "<td class='bg'><div class='icon' style='" + [r:"printIconStyle(r.combination.mean[0])"] + "'>&nbsp;</div></td>";
	[r:"}"] else [r:"{"] // npc
	t = "<td><div class='icon' style='" + printIconStyle('v' + r.global_value) + "'>&nbsp;</div></td>";
	[r:"}"] 
	if (Object.keys(r.target).length > 0) [r:"{"]
		l = r.target;
		t += "<td class='text'>" + lng.roll_on.toLocaleLowerCase() + "</td>";
		for (k in l) t += "<td class='bg'><div class='icon' style='" + printIconStyle(k) + "'>&nbsp;</div></td>";
	[r:"}"]
	l = r.energies; m = false; y = ""; // reset vars
	[r:"for (k in l) if (l[k] > 0) {"]
		y += "<td class='bg'><div class='icon' style='" + printIconStyle(k) + "'>&nbsp;</div><center>&times;" + [r:"l[k]"] + "</center></td>";
		m = true;
	[r:"}"]
	if (m) t += "<td class='text'>" + lng.roll_with.toLocaleLowerCase() + "</td>" + y;
	l = r.potentials; m = false; y = ""; // reset vars
	[r:"for (k in l) if (l[k] > 0) {"]
		y += "<td class='bg'><div class='icon' style='" + printIconStyle(k) + "'>&nbsp;</div><center>&times;" + [r:"l[k]"] + "</center></td>";
		m = true;
	[r:"}"]
	if (m) t += "<td class='text'>" + lng.roll_plus.toLocaleLowerCase() + "</td>" + y;

	// * Concatenate params table
	if (!sh) s = s + "<table class='params' width=0 cellspacing=0 cellpadding=0 border=0 valign=top><tr>" + t + "</tr></table>";

	// * Concatenate HTML output
	s = "<div class='" + (isPc() ? 'pc' : 'npc') + "'>" + s + "</div>" + f + a1 + a2;

	// * Replace invalid characters and return result
	let regexp = new RegExp('&', 'g');
	return s.replace(regexp, 'hx0026');

[r: "}"]

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Encoding Functions */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

[r: "function replaceIllegalChars(s) {"]
	let a = [r:"["] '"', "'", "\\+", ";" [r:"]"];
	let b = [r:"["] "%22", "%27", "%2B", "%3B" [r:"]"];
	let i = 0
	let r;
[r: "
	for (i; i < a.length; i++) {
		r = new RegExp(a[i], 'g');
		s = s.replace(r, b[i]);
	}
"]
return s;
[r: "}"]
