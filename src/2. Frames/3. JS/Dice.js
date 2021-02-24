[r: "
/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                  CAPITAINE VAUDOU DICE ROLLER JAVASCRIPT                   */
/*                                                                            */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Configuration */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

cfg = Object.assign({
	counters : true, // Should the points counters be displayed or not -- Default : true
	pools_max : 4, // Maximum usable pool points -- Default : 4
	buffs_max : 3, // Maximum allotable buff points -- Default : 3
	pools : ['hp', 'bp', 'mp'], // Pool keys array -- Default : ['hp', 'bp', 'mp']
	buffs : ['power', 'speed', 'accuracy', 'heroism', 'voodoo', 'white_magic', 'black_magic'], // Buff keys array -- Default : ['power', 'speed', 'accuracy', 'heroism', 'voodoo', 'white_magic', 'black_magic']
	components : ['body', 'heart', 'mind'], // Components keys array -- Default : ['body', 'heart', 'mind']
	means : ['perception', 'action', 'resistance'] // Means keys array -- Default : ['perception', 'action', 'resistance']
}, cfg);

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Languages */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

lng = Object.assign({
	// * UI
	'fold_pane'                   : 'Replier le panneau des buffs',
	'unfold_pane'                 : 'D\\u00e9plier le panneau des buffs'
}, lng);

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Graphical User Interface */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

gui = Object.assign({
	combination : {
		component : null, // Internal
		mean : null // Internal
	}
}, gui);

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # UI */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

////////////////////////////////////////////////////////////////////////////////
// * UI Functions
////////////////////////////////////////////////////////////////////////////////

function showAbilities() {document.getElementById('abilities').classList.remove('hidden');}
function hideAbilities() {document.getElementById('abilities').classList.add('hidden');}

function lockRoll() {document.getElementById('roll').setAttribute('disabled', 'disabled');}
function unlockRoll() {document.getElementById('roll').removeAttribute('disabled');}

function checkRequirements() {
	let c1 = !isPc() || document.querySelector(`[name='combination']:checked`) != null;
	let o1 = document.getElementById('require_combination');
	if (c1) { // has combination
		o1.classList.add('hidden');
		unlockRoll();
	} else {
		o1.classList.remove('hidden');
		lockRoll();
	}
}

////////////////////////////////////////////////////////////////////////////////
// * Pane Functions
////////////////////////////////////////////////////////////////////////////////

function checkPane() {
	let o = document.querySelector('.diceroller');
	let p = document.getElementById('toggle_pane');
	let q = p.querySelector('i');
	let b = o.classList.contains('unfold');
	p.title = (b ? lng.fold_pane : lng.unfold_pane);
	q.setAttribute('class', 'icon ' + (b ? '' : 'un') + 'fold');
	callMacro('DiceRollerPane=' + (b ? 'unfold' : ''));
}

function togglePane() {
	let o = document.querySelector('.diceroller');
	o.classList.toggle('unfold');
	checkPane();
}

////////////////////////////////////////////////////////////////////////////////
// * Side Functions
////////////////////////////////////////////////////////////////////////////////

function switchDiceRoller() {
	let o = document.querySelector('.diceroller'), b;
	o.classList.toggle('right');
	b = o.classList.contains('right');
	callMacro('DiceRollerSide=' + (b ? 'right' : 'left'));
}

////////////////////////////////////////////////////////////////////////////////
// * UI Events
////////////////////////////////////////////////////////////////////////////////

document.getElementById('toggle_pane').addEventListener('click', togglePane);
document.getElementById('switch_side').addEventListener('click', switchDiceRoller);

////////////////////////////////////////////////////////////////////////////////
// * Combination Functions
////////////////////////////////////////////////////////////////////////////////

function deactivateCombination() {
	document.querySelectorAll('[data-combination]').forEach(function(o) {
		o.classList.remove('active');
	});
}

////////////////////////////////////////////////////////////////////////////////
// * Combination Events
////////////////////////////////////////////////////////////////////////////////

document.querySelectorAll('[data-combination]').forEach(function(o) {
	o.addEventListener('click', function() {
		deactivateCombination();
		cfg.components.indexOf(this.dataset.combination) > -1 ? gui.combination.component = this : gui.combination.mean = this;
		let c1 = gui.combination.component != null
		let c2 = gui.combination.mean != null;
		if (c1) gui.combination.component.classList.add('active');
		if (c2) gui.combination.mean.classList.add('active');
		if (c1 && c2) {
			let a = gui.combination.component.dataset.combination;
			let b = gui.combination.mean.dataset.combination;
			document.querySelector('#' + a + '_' + b).click();
		}
	});
});

document.querySelectorAll('#combination input').forEach(function(o) {
	o.addEventListener('click', function() {
		deactivateCombination();
		let a = this.id.split('_');
		let o = document.querySelector(`[data-combination='` + a[0] + `']`);
		let q = document.querySelector(`[data-combination='` + a[1] + `']`);
		o.classList.add('active');
		q.classList.add('active');
		gui.combination.component = o;
		gui.combination.mean = q;
	});
});

////////////////////////////////////////////////////////////////////////////////
// * Tips Functions
////////////////////////////////////////////////////////////////////////////////

function updateTip(s, o) { // s = CSS selector, o = HTML element
	let q = document.querySelector(s);
	q.innerHTML = o.dataset.title;
}

function clearTip(s, o) { // s = CSS selector, o = HTML element (optionally)
	let q = document.querySelector(s);
	if (o === undefined) o = q;
	q.innerHTML = o.dataset.title;
}

////////////////////////////////////////////////////////////////////////////////
// * Tips Events
////////////////////////////////////////////////////////////////////////////////

document.querySelectorAll('#combination, #target, #difficulty, #pools, #energies, #potentials').forEach(function(o) { // NOTE : load event
	let q = o.querySelector('h4');
	q.dataset.title = q.innerText;
});

document.querySelectorAll('#combination input, #combination [data-combination]').forEach(function(o) {
	o.addEventListener('change', checkRequirements);
	o.addEventListener('mouseenter', function() {
		updateTip('#combination h4', this);
	});
	o.addEventListener('mouseleave', function() {
		clearTip('#combination h4');
	});
});

document.querySelectorAll('#difficulty input').forEach(function(o) {
	o.addEventListener('change', function() {
		parseInt(this.value) < 0 ? showAbilities() : hideAbilities();
	});
	o.addEventListener('mouseenter', function() {
		updateTip('#difficulty h4', this);
	});
	o.addEventListener('mouseleave', function() {
		clearTip('#difficulty h4');
	});
});

document.querySelectorAll('#target input').forEach(function(o) {
	o.addEventListener('mouseenter', function() {
		updateTip('#target h4', this);
	});
	o.addEventListener('mouseleave', function() {
		clearTip('#target h4');
	});
});

document.querySelectorAll('#bp, #mp, #hp').forEach(function(o) {
	o.addEventListener('mouseover', function(e) {
		if (e.target.nodeName == 'INPUT') updateTip('#pools h4', document.querySelector('#' + this.id + '0'));
		else if (e.target.nodeName != 'DIV') clearTip('#pools h4');
	});
});

document.querySelectorAll('#bp, #mp, #hp').forEach(function(o) {
	o.addEventListener('mouseleave', function() {
		clearTip('#pools h4');
	});
});

document.querySelectorAll('#power, #speed, #accuracy').forEach(function(o) {
	o.addEventListener('mouseover', function(e) {
		if (e.target.nodeName == 'INPUT') updateTip('#energies h4', document.querySelector('#' + this.id + '0'));
		else if (e.target.nodeName != 'DIV') clearTip('#energies h4');
	});
});

document.querySelectorAll('#power, #speed, #accuracy').forEach(function(o) {
	o.addEventListener('mouseleave', function() {
		clearTip('#energies h4');
	});
});

document.querySelectorAll('#heroism, #voodoo, #white_magic, #black_magic').forEach(function(o) {
	o.addEventListener('mouseover', function(e) {
		if (e.target.nodeName == 'INPUT') updateTip('#potentials h4', document.querySelector('#' + this.id + '0'));
		else if (e.target.nodeName != 'DIV') clearTip('#potentials h4');
	});
});

document.querySelectorAll('#heroism, #voodoo, #white_magic, #black_magic').forEach(function(o) {
	o.addEventListener('mouseleave', function() {
		clearTip('#potentials h4');
	});
});

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Pools & Buffs Processing */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

////////////////////////////////////////////////////////////////////////////////
// * Inputs Functions
////////////////////////////////////////////////////////////////////////////////

function toggleInputs(k, n) { // k = key string, n = integer
	let l = Array.from(document.querySelectorAll('#' + k + ' input'));
	let b = false, m = getUsedPoints('hp'), o;
	for (k in l) {
		o = l[k];
		if (o.classList.contains('unusable')) continue;
		if (!o.classList.contains('spent')) o.removeAttribute('disabled');
		if (o.checked) {
			b = true;
			if (o.name == 'voodoo') n += parseInt(o.value) + m;
			else n += parseInt(o.value);
		} else if (b && parseInt(o.value) > (n)) {
			o.setAttribute('disabled', 'disabled');
		}
	}
}
function toggleInputsArray(a, n) {for (i in a) toggleInputs(a[i], n);} // a = id list, n = integer
function togglePools(n) {toggleInputsArray(cfg.pools, n);} // n = integer (alias)
function toggleBuffs() {
	let n = (getUsedPoints('bp') + getUsedPoints('mp')) - getBuffsAllotedPoints();
	toggleInputsArray(cfg.buffs, n);
}

////////////////////////////////////////////////////////////////////////////////
// * Pools Functions
////////////////////////////////////////////////////////////////////////////////

function calcUsedPoints(k) { // k = key string ; returns integer
	let n = 0;
	document.querySelectorAll('#' + k + ' input').forEach(function(o) {
		if (o.checked) n = parseInt(o.value);
	}); return n;
}

function getUsedPoints(k) { // k = key string (leave empty for all) ; returns integer
	if (typeof k === 'undefined') { // loop
		let a = cfg.pools, n = 0;
		for (k in a) n += parseInt(document.getElementById(a[k] + '_used').value);
		return n;
	} else { // key only
		return parseInt(document.getElementById(k + '_used').value);
	}
}

function resetPools() {
	let a = cfg.pools, n, k;
	for (i in a) {
		k = a[i];
		document.querySelectorAll('#' + k + ' input').forEach(function(o) {o.removeAttribute('checked');});
		document.getElementById(k + '0').setAttribute('checked', 'checked');
		document.getElementById(k + '0').checked = true;
		n = k != 'bp' ? document.getElementById(k).dataset.spent : 0;
		document.getElementById(k + '_used').value = n;
	}
}

////////////////////////////////////////////////////////////////////////////////
// * Buffs Functions
////////////////////////////////////////////////////////////////////////////////

function getBuffsAllotedPoints(b) { // b = include voodoo flag ; returns integer
	let n = 0, m = getUsedPoints('hp');
	document.querySelectorAll('#energies input, #potentials input').forEach(function(o) {
		if (o.checked) {
			if (!b && o.name == 'voodoo' && m > 0) n += Math.max(0, parseInt(o.value) - m);
			else n += parseInt(o.value);
		}
	});
	return n;
}
function resetBuffs() {
	let a = cfg.buffs;
	for (i in a) document.getElementById(a[i] + '0').checked = true;
}
function enableBuffs(n) { // n = integer
	let m = 0;
	document.querySelectorAll('#energies input, #potentials input').forEach(function(o) {
		m = n;
		if (o.name == 'voodoo') m += getUsedPoints('hp');
		if (parseInt(o.value) <= m) o.removeAttribute('disabled');
		else o.setAttribute('disabled', 'disabled');
	});
}

////////////////////////////////////////////////////////////////////////////////
// * Pools Events
////////////////////////////////////////////////////////////////////////////////

document.querySelectorAll('#pools input').forEach(function(o) {
	o.addEventListener('change', function() {
		let k = this.id.substr(0, 2);
		let n = m = parseInt(this.value);
		switch(k) {
			case 'bp' : // active for roll only
				document.getElementById('bp_used').value = n;
				n += getUsedPoints('mp') + getUsedPoints('hp');
				m = n;
				break;
			case 'mp' : // active until deactivated
				document.getElementById('mp_used').value = n;
				n += getUsedPoints('bp') + getUsedPoints('hp');
				m = n;
				break;
			case 'hp' : // active until deactivated for voodoo only
				document.getElementById('hp_used').value = n;
				m = getUsedPoints('bp') + getUsedPoints('mp');
				n += m;
				break;
		}
		togglePools(cfg.pools_max - n);
		toggleBuffs();
		updateCounters(n);
	});
});

////////////////////////////////////////////////////////////////////////////////
// * Buffs Events
////////////////////////////////////////////////////////////////////////////////

document.querySelectorAll('#energies input, #potentials input').forEach(function(o) {
	o.addEventListener('change', function() {
		toggleBuffs();
		updateCounters(getUsedPoints());
	});
});

////////////////////////////////////////////////////////////////////////////////
// * Points Functions
////////////////////////////////////////////////////////////////////////////////

function updateSpentPoints(k, n) { // k = key index, n = number
	document.getElementById(k).dataset.spent = n;
	callMacro('jobj=pools;' + k + '_spent=' + n);
}

function checkSpentPoints() {
	var m = 0;
	function reusePoints(k) { // k = key index
		let n = parseInt(document.getElementById(k).dataset.spent), i = 0, q;
		if (n != 0) {
			for (i; i <= n; i++) {
				q = document.getElementById(k + i);
				q.setAttribute('disabled', 'disabled');
				q.classList.add('spent');
				if (n == i) {
					q.checked = true;
					q.setAttribute('checked', 'checked');
				}
			}
			document.getElementById(k + '_used').value = n;
			m += n;
		}
	}
	reusePoints('mp');
	reusePoints('hp');
	togglePools(cfg.pools_max - m);
	toggleBuffs();
}

function toggleCounters() {
	document.querySelectorAll('.counter').forEach(function(o) {
		o.style.display = cfg.counters ? 'block' : 'none';
	});
}

function updateCounters(n, m) { // n, m = number
	if (!cfg.counters) return;
	if (typeof n === 'undefined') n = 0;
	if (typeof m === 'undefined') m = 0;
	let p = document.getElementById('usable_points');
	let q = document.getElementById('alloted_points');
	p.querySelector('code:first-of-type').innerHTML = (cfg.pools_max - n);
	p.querySelector('code:last-of-type').innerHTML = cfg.pools_max;
	q.querySelector('code:first-of-type').innerHTML = getBuffsAllotedPoints(true);
	q.querySelector('code:last-of-type').innerHTML = n;
}

function resetPoints() {
	resetPools();
	resetBuffs();
	checkSpentPoints();
	updateCounters(getUsedPoints());
}

function flushPoints() {
	updateSpentPoints('mp', 0);
	updateSpentPoints('hp', 0);
	document.querySelectorAll('.spent').forEach(function(o) {o.classList.remove('spent')});
	resetPoints(true);
}

////////////////////////////////////////////////////////////////////////////////
// * Points Events
////////////////////////////////////////////////////////////////////////////////

document.getElementById('flush').addEventListener('click', flushPoints);

(function checkPoints() {
	document.querySelectorAll('.diceroller [data-max]').forEach(function(o) {
		let i = o.parentElement.id == 'pools' ? cfg.pools_max : cfg.buffs_max;
		let m = o.dataset.max == '0' ? -1 : Math.min(parseInt(o.dataset.max), cfg.pools_max);
		let k = o.id, p;
		for (i; i > m; i--) {
			p = o.querySelector('#' + k + i);
			p.setAttribute('disabled', 'disabled');
			p.classList.add('unusable');
		}
	});
}())

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Roll Processing */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

////////////////////////////////////////////////////////////////////////////////
// * Roll Functions
////////////////////////////////////////////////////////////////////////////////

function getRoll() { // returns JSON

	let r = {};

	// * Consume points
	let bp_loss = getVal('#bp_used');
	let mp_loss = Math.max(0, getVal('#mp_used') - getData('#mp', 'spent'));
	let hp_loss = Math.max(0, getVal('#hp_used') - getData('#hp', 'spent'));

	// * Register roll callback
	r.callback = function() {
		if (bp_loss > 0) {
			callMacro('jobj=pools;bp=' + (Math.max(0, (getData('#bp', 'max') - bp_loss))));
		}
		if (mp_loss > 0) {
			callMacro('jobj=pools;mp=' + (Math.max(0, (getData('#mp', 'max') - mp_loss))));
			callMacro('jobj=pools;mp_spent=' + mp_loss);
		}
		if (hp_loss > 0) {
			callMacro('jobj=pools;hp=' + (Math.max(0, (getData('#hp', 'max') - hp_loss))));
			callMacro('jobj=pools;hp_spent=' + hp_loss);
		}
		callMacro('true', 'checkPools'); // check and update token pools without refreshing sheet (back-end)
	};

	// * Register Combination or Global Value
	if (isPc()) { // pc
		let combination = document.querySelector('[name=combination]:checked').id.split('_');
		let component = document.getElementById(combination[0]);
		let mean = document.getElementById(combination[1]);
		r.combination = {};
		r.combination.component = [component.id, parseInt(component.value)];
		r.combination.mean = [mean.id, parseInt(mean.value)];
	} else { // npc
		r.global_value = getVal('#global_value');
	}

	// * Register Target
	r.target = {};
	let target = document.querySelector(`[name='target']:checked`);
	if (target !== null) r.target[target.id] = parseInt(target.value);

	// * Register Difficulty (incl. Ability)
	r.difficulty = getVal('[name=difficulty]:checked');
	if (r.difficulty < 0
	 && document.querySelector('#abilities select').value != 0) { // one grade up (i.e. easier)
		r.ability = Math.abs(r.difficulty) + graduateDifficulty(1, r.difficulty);
	}

	// * Register Skill
	let skill = document.querySelector('#skills select');
	let opt = skill.options[skill.options.selectedIndex];
	if (skill.value == 'undefined' || skill.value == '') r.skill = [null, 0];
	else r.skill = [opt.dataset.key, parseInt(opt.value)];

	// * Register Modifier
	r.modifier = getVal('#modifier');

	// * Register Energies
	r.energies = {
		power: getVal('[name=power]:checked'),
		speed: getVal('[name=speed]:checked'),
		accuracy: getVal('[name=accuracy]:checked')
	};

	// * Register Potentials
	r.potentials = {
		heroism: getVal('[name=heroism]:checked'),
		voodoo: getVal('[name=voodoo]:checked'),
		white_magic: getVal('[name=white_magic]:checked'),
		black_magic: getVal('[name=black_magic]:checked')
	};

	// * Register Dice Roll
	r.roll = [roll(), roll()];

	// * Return Result
	return r; // DEBUG

}

////////////////////////////////////////////////////////////////////////////////
// * Roll Events
////////////////////////////////////////////////////////////////////////////////

document.getElementById('form').addEventListener('reset', function(e) {
	if (isPc()) checkRequirements();
	hideAbilities();
	resetPoints();
	deactivateCombination();
	clearTimeout(gui.range.timer);
	gui.range.timer = setTimeout(function() {
		updateRange(document.getElementById('modifier'));
	}, cfg.range.delay);
});

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Roll Output */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

document.getElementById('form').addEventListener('submit', function(e) {
	e.preventDefault();
	document.getElementById('reset').setAttribute('disabled', 'disabled');
	document.getElementById('roll').setAttribute('disabled', 'disabled');
	// ---------------------------------------------------------------------------
	// ** Dev
	// ---------------------------------------------------------------------------
	// popup = window.open('', null, 'height=200,width=400,status=no,toolbar=no,menubar=no,location=no');
	// popup.document.write(getResult(getRoll()));
	// console.log(getRoll()); // DEBUG
	// ---------------------------------------------------------------------------
	// ** MapTool
	// ---------------------------------------------------------------------------
	let r = getRoll();
	callMacro(getResult(r), 'printRollResult', 'Rolls', 'all');
	if (typeof r.callback === 'function') setTimeout(r.callback, cfg.callback.delay); // WARNING -- no clear
	// ---------------------------------------------------------------------------
	refreshOverlay('DiceRoller'); // anyway, refresh dice roller overlay (time differed)
});

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Window Events */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

window.addEventListener('load', function() {
	refreshOverlay('ToolBar', 0); // anyway, refresh toolbar overlay (instant call)
	checkRequirements();
	checkPane();
	toggleCounters();
	resetPoints();
});
"]
