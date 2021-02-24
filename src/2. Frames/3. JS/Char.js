[r: "
/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                   CAPITAINE VAUDOU CHARACTER JAVASCRIPT                    */
/*                                                                            */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Pools (front-end only) */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function checkPools() {
	let hp = document.getElementById('hp');
	let bp = document.getElementById('bp');
	let mp = document.getElementById('mp');
	let o = document.querySelector('.portrait').parentElement;
	bp.value == 0 ? o.classList.add('breathless') : o.classList.remove('breathless');
	mp.value == 0 ? o.classList.add('nervous-breakdown'): o.classList.remove('nervous-breakdown');
	if (hp.value == 0) {
		o.classList.add('dead');
		o.classList.remove('breathless');
		o.classList.remove('nervous-breakdown');
		o.classList.remove('unconscious');
	} else {
		o.classList.remove('dead');
	}
}

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Global Value Functions */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function updateGlobalValue(e) { // e = HTML element
	let min = parseInt(e.getAttribute('min'));
	let max = parseInt(e.getAttribute('max'));
	let v = Math.min(Math.max(e.value, min), max); // 2, 4, 6 , 8, 10
	let m = 6, n = 4; // max values
	if (v < 10) m = n = Math.floor(v / 2); // 1, 2, 3, 4, 5
	e.value = v;
	callTimedFunction(function() {
		callMacro('jobj=Components;body=' + m);
		callMacro('jobj=Components;heart=' + m);
		callMacro('jobj=Components;mind=' + m);
		callMacro('jobj=Means;perception=' + n);
		callMacro('jobj=Means;action=' + n);
		callMacro('jobj=Means;resistance=' + n);
		refreshOverlay('DiceRoller'); // anyway, refresh dice roller overlay (time differed)
	});
}

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Abilities (front-end only) */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

////////////////////////////////////////////////////////////////////////////////
// * Add Ability (front-end only)
////////////////////////////////////////////////////////////////////////////////

function addAbility(p) { // p = HTML element
	let o = document.querySelector('#abilities .block');
	let max = 5;
	let num = o.children.length - 1;
	if (num < max) {
		let e = document.createElement('INPUT');
		e.setAttribute('type', 'text');
		e.setAttribute('placeholder', 'Aptitude');
		e.setAttribute('maxlength', 24);
		attachAbilityEvent(e);
		o.insertBefore(e, p);
		callMacro('', 'addAbility'); // append new item in abilities array
		if (num + 1 == max) {
			p.classList.add('hidden');
			p.dataset.hidden = 'true';
		}
	}
}

////////////////////////////////////////////////////////////////////////////////
// * Edit Ability (front-end only)
////////////////////////////////////////////////////////////////////////////////

function updateAbility(e) { // e = HTML element
	if (document.getElementById('abilities').dataset.locked == 'true') return;
	let p = document.getElementById('add_ability');
	let v = encodeURIComponent(replaceIllegalChars(e.value.trim()));
	let i = -1, j = 0;
	document.querySelectorAll('#abilities input').forEach(function(o) {
		if (e == o) i = j;
		j++;
	});
	if (v.length == 0) { // delete ability
		e.remove();
		callMacro(i, 'deleteAbility'); // delete item at index
		if (p.dataset.hidden == 'true') {
			p.classList.remove('hidden');
			delete p.dataset.hidden;
		}
	} else { // edit ability
		callMacro('index=' + i + ';value=' + v, 'editAbility'); // edit item at index
	} refreshOverlay('DiceRoller'); // anyway, refresh dice roller overlay (time differed)
}

////////////////////////////////////////////////////////////////////////////////
// * Attach Ability Event
////////////////////////////////////////////////////////////////////////////////

function attachAbilityEvent(e) { // e = HTML element
	e.addEventListener('focus', function() {
		this.dataset.focus = 'true';
	});
	e.addEventListener('change', function() {
		delete this.dataset.focus;
		updateAbility(this);
	});
	e.addEventListener('blur', function() {
		if (this.dataset.focus == 'true') updateAbility(this);
	})
}

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Skills Functions */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function hideEmptySkills() {
	document.querySelectorAll('#skills table input').forEach(function(o) {
		if (o.id != 'cold_weapon' && o.id != 'cold_weapon_favored' && (o.value == '' || o.value == 'nil')) o.parentElement.parentElement.style.display = 'none';
	});
}

function showEmptySkills() {
	document.querySelectorAll('#skills table tr').forEach(function(o) {
		o.style.display = '';
	});
}

function toggleEmptySkills(b) { // b = hidden flag
	b ? hideEmptySkills() : showEmptySkills();
}

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Document Events */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

// * Purse
document.getElementById('purse_submit').addEventListener('click', function() {
	document.getElementById('purse').click();
});
document.getElementById('purse').addEventListener('click', function() {
	if (this.checked) document.getElementById('purse_amount').value = 0;
});

// * Pools
document.querySelectorAll('#pools input').forEach(function(o) {
	o.addEventListener('change', function() {
		let max = this.id.length == 6 ? this : null;
		let cur = this.id.length == 2 ? this : null;
		if (max) { // is maximum value
			updateTokenProperty(max, 'Pools');
			let n = max.value;
			let k = max.id.substr(0, 2);
			let q = document.getElementById(k);
			if (parseInt(q.value) > parseInt(n)) {
				q.value = n;
				cur = q;
			} q.max = n;
		}
		if (cur) { // is current value OR current value has changed
			updateTokenProperty(cur, 'Pools');
			callTimedFunction(function() {
				callMacro('false', 'checkPools'); // check and update token pools without refreshing sheet (back-end)
				checkPools(); // check and update displayed pools in sheet (front-end)
			});
		}
	});
});

// * Components
document.querySelectorAll('#components input').forEach(function(o) {
	o.addEventListener('change', function() {
		updateTokenProperty(this, 'Components');
	})
});

// * Means
document.querySelectorAll('#means input').forEach(function(o) {
	o.addEventListener('change', function() {
		updateTokenProperty(this, 'Means');
	})
});

// * Global Value
document.querySelector('#global_value input').addEventListener('change', function() {
	updateGlobalValue(this);
});

// * Targets
document.querySelectorAll('#targets input').forEach(function(o) {
	o.addEventListener('change', function() {
		updateTokenProperty(this, 'Targets');
	})
});

// * Energies
document.querySelectorAll('#energies input').forEach(function(o) {
	o.addEventListener('change', function() {
		updateTokenProperty(this, 'Energies');
	})
});

// * Potentials
document.querySelectorAll('#potentials input').forEach(function(o) {
	o.addEventListener('change', function() {
		updateTokenProperty(this, 'Potentials');
	})
});

// * Skills
document.querySelectorAll('#skills table input').forEach(function(o) {
	o.addEventListener('change', function() {
		updateTokenProperty(this, this.id == 'cold_weapon_favored' ? 'Char' : 'Skills');
	});
});

// * Abilities
document.getElementById('add_ability').addEventListener('click', function() {
	addAbility(this);
});
document.querySelectorAll('#abilities input').forEach(function(o) {
	attachAbilityEvent(o);
});

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Window Events */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

window.addEventListener('focus', function() {
	callMacro('', 'checkSheet', 'Scripts');
});
"]
