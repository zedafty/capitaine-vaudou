[r: "
/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                     CAPITAINE VAUDOU SHEET JAVASCRIPT                      */
/*                                                                            */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Configuration */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

cfg = Object.assign({
	win : {
		delay : 300 // Time in milliseconds to wait before revealing the window content -- Default : 300
	},
	tooltip : {
		pinch : 25 // Time in milliseconds left out before a tooltip is considered popped -- Default : 25
	}
}, cfg);

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Languages */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

lng = Object.assign({
	'lock_input' : 'Verrouiller les champs de saisie',
	'unlock_input' : 'D\\u00e9verrouiller les champs de saisie',
	'show_story' : 'Voir l\\u2019historique',
	'hide_story' : 'Masquer l\\u2019historique',
	'degroup' : 'D\\u00e9grouper',
	'regroup' : 'Regrouper'
}, lng);

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Graphical User Interface */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

gui = Object.assign({
	tooltip : {
		active: false, // Internal
		target: null // Internal
	},
	drag : {
		object : null, // Internal
		index : null // Internal
	}
}, gui);

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Token Properties Functions */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function checkInputValue(o) { // o = HTML element
	let v = o.value;
	if (o.getAttribute('type') == 'number') { // force invalid number to either minimal or maximal value
		if (o.hasAttribute('data-nil') && o.value.length == 0) v = 'nil'; // empty value to nil
		else if(o.hasAttribute('data-void') && o.value.length == 0) v = ''; // empty value to void
		else {
			v = o.value.length == 0 ? 0 : parseInt(o.value); // empty value to zero
			if (o.getAttribute('max')) {
				let max = parseInt(o.getAttribute('max'));
				if (v > max) v = max;
			}
			if (o.getAttribute('min')) {
				let min = parseInt(o.getAttribute('min'));
				if (v < min) v = min;
			}
		}
		o.setAttribute('value', v);
	} o.value = v;
}

function updateTokenProperty(o, p) { // o = HTML element, p = Token Propery Name
	checkInputValue(o);
	let k = o.id;
	let v = encodeURIComponent(replaceIllegalChars(o.value));
	if (o.classList.contains('error')) o.classList.remove('error'); // clear error
	if (!o.checkValidity()) { // check input validity
		o.classList.add('error');
	} else { // proceed with updating
		if (k.substr(0, 8) === 'ability') { // JSON Array
			callTimedMacro('jarr=Abilities;jidx=' + parseInt(k.substr(8, 1) -1) + ';' + k.substr(10) + '=' + v);
		} else { // JSON Object
			callTimedMacro('jobj=' + p + ';' + k + '=' + v);
		}
		refreshOverlay('DiceRoller'); // anyway, refresh dice roller overlay (time differed)
	}
}

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Hidden Elements Functions */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function toggleHiddenElements(b) { // b = hidden flag
	document.querySelectorAll('[data-hide]').forEach(function(o) {
		if (!o.dataset.hidden) b ? o.classList.add('hidden') : o.classList.remove('hidden');
	});
}

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Buttons Functions */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function checkLockedInputs() {
	let i = document.querySelector('#lock_input + span i');
	let o = document.getElementById('lock_input');
	let b = o.checked;
	i.classList.remove(b ? 'lock' : 'unlock');
	i.classList.add(b ? 'unlock' : 'lock');
	o.title = (b ? lng.unlock_input : lng.lock_input);
	document.querySelectorAll('[data-lock] input').forEach(function(e) {
		b ? e.setAttribute('readonly', 'readonly') : e.removeAttribute('readonly');
	});
	toggleHiddenElements(b);
	if (typeof toggleEmptySkills === 'function') toggleEmptySkills(b);
}

function toggleStory(b) { // b = checked flag
	let i = document.querySelector('#toggle_story + span i');
	let o = document.getElementById('toggle_story');
	let q = document.querySelector('.storyline');
	if (b === undefined) b = o.checked;
	if (b) {
		i.classList.remove('story');
		i.classList.add('story-furl');
		q.classList.remove('hidden');
		o.title = (lng.hide_story);
		o.checked = true;
	} else {
		i.classList.remove('story-furl');
		i.classList.add('story');
		q.classList.add('hidden');
		o.title = (lng.show_story);
		o.checked = false;
	}
}

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Tooltips Functions */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function showTooltip(q) { // q = HTML element
	if (q == gui.tooltip.target) {
		hideTooltip();
		return;
	}
	let o = document.getElementById('tooltip'), r1, r2;
	o.style.display = 'inline-block';
	o.innerHTML = q.dataset.tooltip;
	r1 = q.getBoundingClientRect();
	r2 = o.getBoundingClientRect();
	o.style.left = (r1.right + 8) + 'px';
	o.style.top = (r1.top - r2.height + window.scrollY + 4) + 'px';
	setTimeout(function() {
		gui.tooltip.target = q;
		gui.tooltip.active = true;
	}, cfg.tooltip.pinch);
}

function hideTooltip() {
	let o = document.getElementById('tooltip');
	o.style.display = 'none';
	gui.tooltip.target = null;
	gui.tooltip.active = false;
}

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Document Events */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

// * Lock Input
document.getElementById('lock_input').addEventListener('click', function() {
	checkLockedInputs();
	callMacro('LockInput=' + (this.checked ? '1' : '0'));
});

// * Toggle Story
document.getElementById('toggle_story').addEventListener('click', function() {
	toggleStory();
	callMacro('StoryToggle=' + (this.checked ? '1' : '0'));
});

// * Update Story
document.getElementById('story').addEventListener('change', function() {
	callMacro(this.value, 'setNote');
});

// * Sections
document.querySelectorAll('[id^=section]').forEach(function(o) {
	o.addEventListener('click', function() {
		callMacro('SheetSection=' + o.id.substr(-1));
	});
});

// * Tooltips
document.querySelectorAll('[data-tooltip]').forEach(function(o) {
	o.addEventListener('click', function() {
		showTooltip(o);
	})
});

// * Click
document.addEventListener('click', function(e) {
	if (gui.tooltip.active && !e.target.hasAttribute('data-tooltip')) hideTooltip();
});

// * Groups
document.querySelectorAll('[data-group-ctrl]').forEach(function(o) {
	o.addEventListener('click', function() {
		let n = o.dataset.groupCtrl;
		let l = document.querySelectorAll(`[data-group='`+ n +`']`);
		let q = o.querySelector('i');
		let b = o.dataset.grouped == 'true';
		if (b) {
			l.forEach(function(e) {e.classList.remove('hidden');});
			o.dataset.grouped = 'false';
			o.title = lng.regroup;
			q.classList.remove('degroup');
			q.classList.add('regroup');
		} else {
			l.forEach(function(e) {e.classList.add('hidden');});
			o.dataset.grouped = 'true';
			o.title = lng.degroup;
			q.classList.remove('regroup');
			q.classList.add('degroup');
		}
		callMacro('jobj=GroupToggle;' + (n - 1) + '=' + (b ? '1' : '0'));
	});
});

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Drag and Drop Elements */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function getIndexOf(o) { // o = HTML element
	let q = o.parentElement, l = q.children, i;
	for (i = 0; i < l.length; i++) if (l[i] == o) return i;
}

function setDraggableStyle(o) { // o = HTML element
	o.classList.add('dropable');
}

function resetDraggableStyle() {
	document.querySelectorAll('[draggable]').forEach(function(o) {
		o.classList.remove('dropable');
	});
}

function getDraggableParent(o) {
	let i, r;
	for (i = 0; i < 4; i++) { // parse up to four nodes
		if (i > 0) o = o.parentElement;
		if (o == null) break;
		if (o.tagName === undefined) continue;
		if (o.hasAttribute('draggable')) return o;
	} return r;
}

document.querySelectorAll(`tr[draggable='true']`).forEach(function(o) {
	o.addEventListener('dragstart', function() {
		gui.drag.object = o;
		gui.drag.index = getIndexOf(o);
	});
	o.addEventListener('dragover', function(e) {
		e.preventDefault(); // allow drop
	});
});

document.addEventListener('dragenter', function(e) {
	resetDraggableStyle();
	let o = getDraggableParent(e.target);
	if (o !== undefined) setDraggableStyle(o);
});

document.addEventListener('drop', function(e) {
	e.preventDefault(); // prevent default action (open as link for some elements)
	resetDraggableStyle();
	let o = getDraggableParent(e.target);
	if (o !== undefined) {
		let i = gui.drag.index;
		let j = getIndexOf(o);
		if (i != j) {
			o.insertAdjacentElement('beforebegin', gui.drag.object);
			callMacro('index=' + i + ';before=' + j, 'moveItem', 'Dialogs');
			// console.log('insert object ' + i  + ' before ' + j); // DEBUG
		}
	}
	gui.drag.object = null;
	gui.drag.index = null;
});

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Window Events */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

window.addEventListener('resize', function() {
	hideTooltip();
});

window.addEventListener('load', function() {
	refreshOverlay('ToolBar', 0); // anyway, refresh toolbar overlay (instant call)
	checkLockedInputs();
	toggleStory();
	setTimeout(function() {
		document.querySelector('.wrap').style.opacity = '1';
	}, cfg.win.delay);
});
"]
