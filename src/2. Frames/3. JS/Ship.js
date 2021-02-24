[r: "
/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                      CAPITAINE VAUDOU SHIP JAVASCRIPT                      */
/*                                                                            */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Configuration */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

cfg = Object.assign({
	targets : ['natural', 'human', 'artificial', 'supernatural'], // Targets keys index -- Default : ['natural', 'human', 'artificial', 'supernatural']
	distance: ['boarding', 1, 0, -1, -2, -3, -4, 'impossible'], // Cannonade difficulty arrray -- Default : ['Abordage', 1, 0, -1, -2, -3, -4, 'Impossible']
	cannons : ['port', 'star'], // Cannons side index -- Default : ['port', 'star']
	cannonballs : ['hollowed', 'chained', 'canister', 'heated'] // Cannonballs keys index -- Default : ['hollowed', 'chained', 'canister', 'heated']
}, cfg);

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Languages */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

lng = Object.assign({
	'none_char' : '&mdash;',
	'wreck' : '\\u00c9pave',
	'sunk' : 'Coul\\u00e9',
	'sail' : 'Voile',
	'hull' : 'Coque',
	'boarding' : 'Abordage',
	'impossible' : 'Impossible',
	'each_turn' : 'chaque tour',
	'rate_fstr' : 'tous les %1 tours',
	'crew_fstr' : 'Seulement %1&#37; de man&oelig;uvre (%2 sur %3)'
}, lng);

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Graphical User Interface */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

gui = Object.assign({
	'radio_check' : false
}, gui);

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Functions */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function updateInputMax(sv, sm, prp) { // sv = val id, sm = max id, prp = token property key
	let o = document.getElementById(sv);
	let q = document.getElementById(sm);
	let v = parseInt(o.value);
	let m = parseInt(q.value);
	if (v > m) o.value = m;
	o.setAttribute('max', m);
	if (prp !== undefined) callMacro('jobj=' + prp + ';' + o.id + '=' + o.value); // TEMP -- put temporary in order to passthrough calltimedmacro limitation ... bad thing
}

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Points */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

/**
	NOTE
	Corvette has 32 sail points, but the speed maneuver penalty doesn't apply strictly the third rule.
	Pen => Core    Code
	 0  => 32-21   32-23
	-2  => 20-13   22-13
	-4  => 12-0    12-0
	The above hasn't been implemented has it is assumed a paging convenience or a simple mistake.
*/

function updateSpeedPenalty(b) { // b = check sailing and cannons flag
	if (typeof b === 'undefined') b = true;
	let r = document.querySelector('.portrait').parentElement;
	let o = document.getElementById('maneuver_penalty');
	let q = document.getElementById('speed_maneuver_val');
	let v1 = getVal('#sail_pts');
	let v2 = getVal('#hull_pts');
	let m1 = getVal('#sail_max');
	let m2 = getVal('#hull_max');
	let n = 0, s = lng.none_char;
	r.classList.remove('wreck', 'sunk');
	if (v2 <= 0) { // sunk => 0% hull points
		r.classList.add('sunk');
		o.innerHTML = lng.sunk;
	} else if (v2 <= Math.round(m2 * 0.09)) { // wreck => less than 10% of hull points (at least 6 hull points)
		r.classList.add('wreck');
		o.innerHTML = lng.wreck;
	} else { // penalty per each max third
		let p1 = (Math.min(Math.max(Math.floor((m1 - v1) / Math.floor(m1 / 3)), 0), 2)) * -2; // sail penalty
		let p2 = (Math.min(Math.max(Math.floor((m2 - v2) / Math.floor(m2 / 3)), 0), 2)) * -1; // hull penalty
		n = p1 + p2;
		o.innerHTML = n;
		n < 0 ? o.classList.add('malus') : o.classList.remove('malus');
		o.parentElement.setAttribute('title', lng.sail + ' + ' + lng.hull + ' = ' + p1 + ' + ' + p2 + ' = ' + (n));
		s = getVal('#speed_maneuver') + n;
	} q.innerHTML = s;
	if (b) {
		checkSailing();
		checkCannons();
	}
}

document.querySelectorAll('#points input').forEach(function(o) {
	o.addEventListener('change', function() {
		let s = this.id;
		if (s.substr(-3) == 'max') updateInputMax(s.slice(0, -4) + '_pts', s, 'Points');
		updateTokenProperty(this, 'Points');
		callTimedFunction(function() {
			updateSpeedPenalty();
			callMacro('false', 'checkPoints'); // check and update token points without refreshing sheet (back-end)
		});
	});
});

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Crew */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function updateCrewTokenProperties() {
	callTimedFunction(function() {
		callMacro('jobj=Crew;maneuver=' + getVal('#maneuver'));
		callMacro('jobj=Crew;maneuver_min=' + getVal('#maneuver_min'));
		callMacro('jobj=Crew;additional=' + getVal('#additional'));
		callMacro('jobj=Crew;additional_max=' + getVal('#additional_max'));
		callMacro('jobj=Crew;crew_total=' + getVal('#crew_total'));
		callMacro('jobj=Crew;crew_max=' + getVal('#crew_max'));
		callMacro('jobj=Crew;vacant=' + getVal('#vacant'));
	});
}

function updateCrew(b) { // b = check sailing and cannons flag
	if (typeof b === 'undefined') b = true;
	let n = getVal('#crew_total');
	let m1 = getVal('#maneuver_min');
	let m2 = getVal('#additional_max');
	let o1 = document.getElementById('maneuver');
	let o2 = document.getElementById('additional');
	let o3 = document.getElementById('vacant');
	o1.value = n >= m1 ? m1 : n;
	n = Math.max(0, n - m1);
	o2.value = n >= m2 ? m2 : n;
	n = Math.max(0, n - m2);
	o3.innerText = n;
	parseInt(o1.value) < m1 ? o1.classList.add('wrong') : o1.classList.remove('wrong');
	if (b) {
		checkSailing();
		checkCannons();
	}
}

function checkCrew(b) { // b = check sailing and cannons flag
	if (typeof b === 'undefined') b = true;
	let n = getVal('#crew_max');
	let p = document.getElementById('maneuver_min');
	let q = document.getElementById('additional_max');
	p.max = Math.max(0, n - parseInt(q.value));
	q.max = Math.max(0, n - parseInt(p.value));
	if (parseInt(p.value) > p.max) p.value = p.max;
	if (parseInt(q.value) > q.max) q.value = q.max;
	updateCrew(b);
}

document.querySelectorAll('#crew input').forEach(function(o) {
	o.addEventListener('change', function() {
		checkInputValue(o);
		if (['maneuver_min', 'additional_max', 'crew_max'].indexOf(o.id) >= 0) checkCrew();
		if (o.id == 'crew_max') updateInputMax('crew_total', 'crew_max', 'Crew');
		if (o.id == 'crew_total') updateCrew();
		updateCrewTokenProperties(); // any way, update ALL token properties
	})
});

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Staff */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function updateGroup(i) { // i = group index
	let j = m = n = 0;
	let a = k = s = '';
	let q;
	document.querySelectorAll(`[data-group='` + i + `'] input`).forEach(function(o) {
		a = o.id.split('_');
		if (j == 0) k = a[0];
		if (cfg.targets.indexOf(a[1]) == -1) { // not target input
			m = parseInt(o.value);
			n += m;
			if (j > 0) s += ' + ';
			s += lng[a[1]] + ' (' + m + ')';
			j++;
		}
	});
	q = document.getElementById(k + '_val');
	q.innerHTML = n;
	q.parentElement.setAttribute('title', s);
}

document.querySelectorAll('#staff input').forEach(function(o) {
	o.addEventListener('change', function() {
		updateGroup(o.parentElement.parentElement.dataset.group);
		updateTokenProperty(this, 'Staff');
	})
});

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Sailing */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function checkSailing() {
	let o = document.getElementById('roll_navigation');
	let q = document.getElementById('roll_maneuver');
	let n = getVal('#maneuver');
	let m = getVal('#maneuver_min');
	o.classList.remove('warning');
	q.classList.remove('warning');
	if (isNaN(getVal('#speed_maneuver_val')) || getVal('#maneuver') == 0) { // has a maneuver speed and is not sunk
		disableLink(o);
		disableLink(q);
	} else {
		enableLink(o);
		enableLink(q);
		if (n < m) {
			o.classList.add('warning');
			q.classList.add('warning');
		}
	}
}

function updateSpeedManeuver() {
	let o = document.getElementById('speed_maneuver_val');
	o.innerHTML = getVal('#speed_maneuver');
	updateSpeedPenalty();
}

document.querySelectorAll('#sailing input').forEach(function(o) {
	o.addEventListener('change', function() {
		updateTokenProperty(this, 'Sailing');
		if (this.id == 'speed_maneuver') updateSpeedManeuver();
	})
});

document.getElementById('speed_maneuver_modifier').addEventListener('change', function() {
	callTimedMacro('jobj=Sailing;speed_maneuver_modifier=' + this.value);
});

document.getElementById('toggle_speed_maneuver_modifier').addEventListener('click', function() {
	let o = document.querySelector('.range');
	let q = o.querySelector('input');
	let i = this.querySelector('i');
	let b = o.classList.contains('hidden') ? false : true;
	q.value = 0; // reset value
	updateRange(q); // TEMP
	if (b) {
		o.classList.add('hidden');
		i.classList.add('balance');
		i.classList.remove('balance-reverse');
	} else {
		o.classList.remove('hidden');
		i.classList.add('balance-reverse');
		i.classList.remove('balance');
	}
	callTimedMacro('jobj=Sailing;toggle_speed_maneuver_modifier=' + (b ? 0 : 1));
});

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Cannons */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function getMarginSuccessBonus(n) { // n = integer
	return Math.floor(Math.max(n - 1, 0) / 3);
}

/**
	NOTE
	According to core sheets, no matter what the number of cannon is, merchant ship doesn't have any MSB.
	This doesn't sound right with explicit global rule and has been deactivated until required otherwise.
*/

function updateMarginSuccessBonus(s, k) { // s = side, k = level
	let o = document.getElementById(s + k + '_msb');
	let q = document.getElementById(s + k + '_broadside');
	let n = parseInt(document.getElementById(s + k + '_pts').value);
	let m = parseInt(document.getElementById(s + k + '_cur').value);
	let bf = n <= 3 ? n : 3 + Math.ceil((n - 3) / 2); // broadside fire
	let msb = getMarginSuccessBonus(n); // margin success bonus
	o.innerHTML = signInteger(msb);
	msb > 0 ? o.classList.add('bonus') : o.classList.remove('bonus');
	o.parentElement.setAttribute('title', lng.broadside + ' : ' + bf);
	q.value = bf;
}

/**
	NOTE
	The core rule is:
	Before battle, the gunner choses crew members from additional pool and affects them to any cannon.
	A cannon with crew members handling it can fire at a rate per turn as below:
	> 3 servants : 1 fire per turn
	> 2 servants : 1 fire per 2 turns
	> 1 servant  : 1 fire per 3 turn
	For convenience, the above is automated, all additional crew members are assumed being affected equally to cannons.
	Thus, the additional crew members must at least equal to the number of cannons for the minimal rate of 1 fire per 3 turns.
*/

function checkCannons(t) { // t = update cannonballs
	let a = cfg.cannons;
	let i, j, k, l;
	let b = false;
	let v = null;
	let n = h = x = 0;
	let m = u = getVal('#additional'); // current number of additional crew members
	let o = document.getElementById('cannonade_rate'); // cannonade rate or fire
	let q = document.querySelector(`[name='cannonballs']:checked`); // current checked cannonballs
	let p = document.getElementById('difficulty').value; // cannonade difficulty value
	let c = hasTarget() && p != '' && !isNaN(parseInt(p)) && m > 0 && q != null && q.id != 'cannonballs_none' && getVal('#hull_pts') > 0 ? true : false;
	for (i = 1; i < 3; i++) {
		for (j = 0; j < a.length; j++) {
			k = a[j] + i;
			h = getVal('#' + k + '_pts');
			l = document.getElementById(k + '_clear');
			h > 0 ? l.classList.remove('hidden') : l.classList.add('hidden');
			q = document.getElementById('roll_' + k);
			if (c && h > 0 && m >= h) {
				enableLink(q);
				b = true;
				n += h;
			} else disableLink(q);
			m = Math.max(m - h, 0);
			if (t) x += parseInt(document.querySelector('#' + k + '_cur').max);
		}
	}
	if (t) document.getElementById('cannonballs_max').value = x * 60;
	if (c && n > 0 && u >= n) v = 4 - Math.max(Math.min(Math.floor(u / n), 3), 1); // maximum additional crew members per cannon
	if (v == null) o.innerHTML = lng.none_char;
	else o.innerHTML = v == 1 ? lng.each_turn : lng.rate_fstr.replace('%1', v);
	checkRequirements();
}

document.querySelectorAll('#cannons1 input, #cannons2 input').forEach(function(o) {
	o.addEventListener('change', function() {
		let s = o.id;
		let k = 'Cannons' + s.substr(4,1);
		updateTokenProperty(o, k);
		if (s.substr(-3) == 'cur') updateInputMax(s.slice(0, -4) + '_pts', s, k);
		updateMarginSuccessBonus(s.substr(0, 4), s.substr(4, 1));
		checkCannons();
	});
});

document.querySelectorAll('#port1_clear, #star1_clear, #port2_clear, #star2_clear').forEach(function(o) {
	o.addEventListener('click', function() {
		let k = o.id.substr(0, 5);
		let i = k.slice(-1)
		let q = document.getElementById(k + '_pts');
		q.value = 0;
		updateTokenProperty(q, 'Cannons' + i);
		updateMarginSuccessBonus(k.substr(0, 4), i);
		checkCannons();
	});
});

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Cannonade */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function updateDifficulty(b) { // b = check cannons flag
	if (typeof b === 'undefined') b = true;
	let o = document.querySelector(`[name='distance']:checked`);
	let s = lng.none_char, v = null;
	if (o.value != 'null') {
		s = cfg.distance[parseInt(o.value)];
		v = s;
		if (s == 'impossible') v = NaN;
		else if (s == 'boarding') v = 2;
		s = typeof s === 'string' ? s = lng[s] : signInteger(s);
	}
	document.getElementById('difficulty_str').innerHTML = s;
	document.getElementById('difficulty').value = v;
	if (b) checkCannons();
}

function updateTargetTitle(s) {
	let o = document.getElementById('target_title');
	o.innerHTML = s;
}

document.querySelectorAll(`[name='distance']`).forEach(function(o) {
	o.addEventListener('change', function() {
		callTimedMacro('jobj=Cannonade;distance=' + this.value);
		updateDifficulty();
	});
});

document.querySelectorAll(`[name='target']`).forEach(function(o) {
	o.addEventListener('change', function() {
		callTimedMacro('jobj=Cannonade;target=' + this.value);
		checkCannons();
	});
	o.addEventListener('mouseenter', function() {
		updateTargetTitle(this.dataset.title);
	});
	o.addEventListener('mouseout', function() {
		updateTargetTitle('&nbsp;');
	});
});

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Cannonballs */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function updateCannonballsMax(e, n) { // e = HTML element, n = cannonballs number
	let a = cfg.cannonballs, i;
	let o, q = document.querySelector('#cannonballs_none');
	let m = getVal('#cannonballs_max');
	for (i = 0; i < a.length; i++) {
		o = document.querySelector('#' + a[i]);
		if (n >= m) o.max = o == e ? m - (n - o .value) : o.value;
		else o.max = m;
		if (o.max == 0) {
			let g = document.querySelector('#cannonballs_' + a[i]);
			g.setAttribute('disabled', 'disabled');
			if (g.checked) q.checked = true;
		}
	}
}

function checkCannonballs(b, e) { // b = check cannons flag, e = HTML element
	if (typeof b === 'undefined') b = true;
	let a = cfg.cannonballs, i;
	let o, q = document.querySelector('#cannonballs_none');
	let n = m = 0;
	for (i = 0; i < a.length; i++) {
		o = document.querySelector('#cannonballs_' + a[i]);
		m = getVal('#' + a[i]);
		if (m > 0) {
			o.removeAttribute('disabled');
			n += m;
		} else {
			o.setAttribute('disabled', 'disabled');
			if (o.checked) q.checked = true;
		}
	}
	if (e !== undefined) updateCannonballsMax(e, n);
	if (b) checkCannons();
}

document.querySelectorAll(`#cannonballs input[type='number']`).forEach(function(o) {
	o.addEventListener('change', function() {
		checkCannonballs(true, this);
		updateTokenProperty(this, 'Cannonballs');
	})
});

document.querySelectorAll(`[name^='cannonballs']`).forEach(function(o) {
	o.addEventListener('mousedown', function() {
		if (this.checked == true) {
			gui.radio_check = true;
			document.querySelector('#cannonballs_none').checked = true;
		}
	});
	o.addEventListener('change', function() {
		if (gui.radio_check == true) {
			this.checked = false;
			document.querySelector('#cannonballs_none').checked = true;
			gui.radio_check = false;
		}
		callTimedMacro('jobj=Cannonballs;last=' + this.id.substr(12));
		checkCannons();
	})
});

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Requirements */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function isCannonballLoaded() {
	let o = document.querySelector(`[name='cannonballs']:checked`)
	return (o != null && o.id != 'cannonballs_none');
}

function hasEnoughServants() {
	let n = getVal('#port1_pts') + getVal('#star1_pts') + getVal('#port2_pts') + getVal('#star2_pts');
	let m = getVal('#additional');
	return (m >= n);
}

function isDistanceValid() {
	let v = getVal(`[name='distance']:checked`);
	return !isNaN(v) && v < 7;
}

function hasTarget() { // returns boolean
	return document.querySelector(`[name='target']:checked`).value != 'null';
}

function checkRequirements() {
	let q1 = document.getElementById('require_cannonball');
	let q2 = document.getElementById('require_servant');
	let q3 = document.getElementById('require_distance');
	let q4 = document.getElementById('require_target');
	isCannonballLoaded() ? q1.classList.add('hidden') : q1.classList.remove('hidden');
	hasEnoughServants() ? q2.classList.add('hidden') : q2.classList.remove('hidden');
	isDistanceValid() ? q3.classList.add('hidden') : q3.classList.remove('hidden');
	hasTarget() ? q4.classList.add('hidden') : q4.classList.remove('hidden');
}

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Roll Processing */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

////////////////////////////////////////////////////////////////////////////////
// * Roll Functions
////////////////////////////////////////////////////////////////////////////////

function getRoll(r) { // r = JSON ; returns JSON

	if (typeof r === 'undefined') r = {};

	// * Register Difficulty
	if (r.difficulty === undefined) r.difficulty = 0;

	// * Register Modifier
	if (r.difficulty === undefined) r.modifier = 0;

	// * Register Energies
	r.energies = {}; // TODO : energies could be used

	// * Register Potentials
	r.potentials = {}; // always empty for ship rolls

	// * Register Dice Roll
	r.roll = [roll(), roll()];

	// * Return Result
	return r;
}

function outputRollResult(r) { // r =roll object
	// ---------------------------------------------------------------------------
	// ** Dev
	// ---------------------------------------------------------------------------
	// popup = window.open('', null, 'height=400,width=800,status=no,toolbar=no,menubar=no,location=no');
	// popup.document.write(getResult(getRoll(r)));
	// console.log(getResult(getRoll(r))); // DEBUG
	// ---------------------------------------------------------------------------
	// ** MapTool
	// ---------------------------------------------------------------------------
	callMacro(getResult(getRoll(r)), 'printRollResult', 'Rolls', 'all');
	// ---------------------------------------------------------------------------
}

function getManeuverString() {
	let o = getVal('#maneuver');
	let q = getVal('#maneuver_min');
	let n = Math.floor(o * 100 / q);
	return o < q ? lng.crew_fstr.replace('%1', n).replace('%2', o).replace('%3', q) : '';
}

function rollManeuverTest() { // captain
	if (this.classList.contains('disabled')) return false;
	let r = {};
	r.ship = {
		'test' : 'maneuver',
		'crew' : getManeuverString()
	};
	r.combination = {
		'component': ['speed_maneuver', getVal('#speed_maneuver_val')],
		'mean': ['action', getVal('#skipper_action')]
	};
	r.target = {'artificial': getVal('#skipper_artificial')};
	r.skill = ['navigation', getVal('#skipper_navigation')];
	r.modifier = getVal('#speed_maneuver_modifier');

	outputRollResult(r);
}

function rollNavigationTest() { // skipper
	if (this.classList.contains('disabled')) return false;
	let r = {};
	r.ship = {
		'test' : 'navigation',
		'crew' : getManeuverString(),
		'speed' : getVal('#speed_day')
	};
	r.combination = {
		'component': ['mind', getVal('#skipper_mind')],
		'mean': ['action', getVal('#skipper_action')]
	};
	r.target = {'artificial': getVal('#skipper_artificial')};
	r.skill = ['navigation', getVal('#skipper_navigation')];

	outputRollResult(r);
}

function rollCannonadeTest() {
	if (this.classList.contains('disabled')) return false;
	let k = this.id.slice(-5); // cannons type and level (e.g. port1, star2, etc.)
	let o = document.querySelector(`[name='cannonballs']:checked`);
	let p = document.getElementById(k + '_pts'); // cannons input
	let t = o.id.substr(12); // cannonballs type : (e.g. hollowed, chained, etc.)
	let q = document.getElementById(t); // cannonballs input
	let n = parseInt(p.value); // number of fireable cannons
	let m = parseInt(q.value); // remaining checked number of cannonballs
	let v = Math.max(0, m - n);
	let s = document.querySelector(`[name='target']:checked`).value;
	q.value = v; // update number of cannonballs

	let r = {};
	r.ship = {
		'test' : 'cannonade_' + k,
		'msb' : getMarginSuccessBonus(Math.min(n, m)), // cannonade margin success bonus
		'fired' : Math.min(n, m), // number of fired cannons
		'cannonballs' : document.querySelector(`[name='cannonballs']:checked`).value // cannonballs type
	};
	r.combination = {
		'component': ['broadside', getVal('#'+ k + '_broadside')],
		'mean': ['action', getVal('#gunner_perception')]
	};
	r.target = {};
	if (s != null) r.target[s] = getVal('#gunner_' + s)
	else r.target['artificial'] = getVal('#gunner_artificial' + s)
	r.skill = ['artillery', getVal('#gunner_artillery')];
	r.difficulty = getVal('#difficulty');
	r.modifier = 0;

	outputRollResult(r);

	checkCannonballs();
	callTimedMacro('jobj=Cannonballs;' + t + '=' + v);
}

document.getElementById('roll_navigation').addEventListener('click', rollNavigationTest);
document.getElementById('roll_maneuver').addEventListener('click', rollManeuverTest);
document.getElementById('roll_port1').addEventListener('click', rollCannonadeTest);
document.getElementById('roll_star1').addEventListener('click', rollCannonadeTest);
document.getElementById('roll_port2').addEventListener('click', rollCannonadeTest);
document.getElementById('roll_star2').addEventListener('click', rollCannonadeTest);

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Window Events */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

window.addEventListener('focus', function() {
	callMacro('', 'checkSheet', 'Scripts', 'self');
});

window.addEventListener('load', function() {
	updateSpeedPenalty(false); // don't check cannons
	updateDifficulty(false); // don't check cannons
	updateMarginSuccessBonus('port', 1); // 1st floor
	updateMarginSuccessBonus('star', 1); // 1st floor
	updateMarginSuccessBonus('port', 2); // 2nd floor
	updateMarginSuccessBonus('star', 2); // 2nd floor
	checkCrew(false); // don't check cannons or sailings
	checkSailing();
	checkCannonballs(); // don't check cannons
	checkCannons(true); // also update cannonballs
	updateRange(document.getElementById('speed_maneuver_modifier')); // TEMP
});
"]
