[r: "
/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/*                                                                            */
/*                    CAPITAINE VAUDOU TOOLBAR JAVASCRIPT                     */
/*                                                                            */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Configuration */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

var cfg = {
	'bubble' : {
		'delay' : 1500, // Time in milliseconds during which the bubbling icons will remain visible until hovered ; Default : 1500
		'pinch' : 150, // Time in milliseconds before the bubbling is hidden on mouse click ; Default : 150
		'x_adj' : -30, // Bubbling icon horizontal adjustement in pixels regarding of cursor ; Default : -32
		'y_adj' : -30 // Bubbling icon position adjustement in pixels regarding of cursor ; Default : -32
	},
	'weather' : {
		'reload' : true, // Force all connected players toolbar to be reloaded automatically ; Default : true
		'degree' : {
			'raz' : 20, // Reinitialization temperature degree (celsius) ; Default : 20
			'max' : 45, // Maximal temperature degree (celsius) ; Default : 45
			'min' : -10, // Minimal temperature degree (celsius) ; Default : -10
			'delay' : 150, // Time elasped between two update degree occurences ; Default : 150
			'speed' : {
				'slow' : 4, // Number of update degree occurences before speeding up to soft ; Default : 4
				'soft' : 8, // Number of update degree occurences before speeding up to soft ; Default : 8
				'fast' : 16 // Number of update degree occurences before speeding up to soft ; Default : 16
			}
		}
	}
};

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Languages */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

var lng = {
	// * Wind
	'east'         : 'Est',
	'south_east'   : 'Sud-Est',
	'south'        : 'Sud',
	'south_west'   : 'Sud-Ouest',
	'west'         : 'Ouest',
	'north_west'   : 'Nord-Ouest',
	'north'        : 'Nord',
	'north_east'   : 'Nord-Est',
	// * Sky
	'empty'        : '',
	'sunny'        : 'Ensoleill&eacute;',
	'veiled'       : 'Voil&eacute;',
	'cloudy'       : 'Nuageux',
	'fog'          : 'Brouillard',
	'drizzle'      : 'Bruine',
	'covered'      : 'Couvert',
	'rainy'        : 'Pluvieux',
	'stormy'       : 'Orageux'
};

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Graphical User Interface */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

var gui = {
	'timeout' : null,
	'bubbled' : false,
	'mouse' : {
		'up' : false
	},
	'weather' : {
		'degree' : {
			'delay' : 150,
			'down' : false,
			'interval' : null,
			'count' : 0
		},
		'wind' : {
			'down' : false
		}
	}
};

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Call Functions */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function callMacro(val, src, lib, out, target) {
	if (src === undefined) src = 'setProp';
	if (lib === undefined) lib = 'Scripts';
	let url = 'macro://' + src + '@Lib:' + lib + '/' + (out === undefined ? 'none' : out) + '/' + (target === undefined ? '' : target) + '?' + val;
	let o = document.getElementById('macrolink');
	// ---------------------------------------------------------------------
	// * MapTool
	// ---------------------------------------------------------------------
	o.href = url;
	o.click();
	// ---------------------------------------------------------------------
}

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Bubbling Functions */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function startBubblingTimeout(n) {
	if (typeof n !== 'number') n = cfg.bubble.delay;
	let o = document.getElementById('bubble');
	if (!gui.bubbled) {
		gui.bubbled = true;
		setTimeout(function() {
			o.style.display = '';
		}, cfg.bubble.pinch);
	}
	gui.timeout = setTimeout(function() {
		o.style.display = 'none';
	}, n);
}

function stopBubblingTimeout() {
	clearTimeout(gui.timeout);
}

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Bubbling Events */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function attachBubblingEvents() {
	document.getElementById('bubble').addEventListener('mouseenter', stopBubblingTimeout);
	document.getElementById('bubble').addEventListener('mouseleave', startBubblingTimeout);
	document.addEventListener('mouseup', function(e) {
		if (!gui.mouse.up) {
			let o = document.getElementById('bubble');
			o.style.left = (e.clientX - o.offsetWidth + cfg.bubble.x_adj) + 'px';
			o.style.top = (e.clientY - o.offsetHeight + cfg.bubble.y_adj) + 'px';
			o.style.opacity = '1';
			gui.mouse.up = true;
			startBubblingTimeout();
		}
	});
	document.addEventListener('mousedown', function() {
		startBubblingTimeout(cfg.bubble.pinch);
	});
}

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Weather Functions */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function udpateWeatherCaption(s, p) { // s = string, p = HTML element (optional)
	if (s === undefined) s = '';
	let o = document.querySelector('.weather > .caption')
	if (s == '') o.classList.add('hidden');
	else if (p !== undefined) {
		o.classList.remove('hidden');
		o.querySelector('span').innerHTML = s;
		o.style.top = p.offsetTop - o.offsetHeight;
		o.style.left = p.offsetLeft + Math.round(p.offsetWidth / 2) - Math.round(o.offsetWidth / 2);
	}
}

function getDegree() { // returns integer
	let o = document.querySelector('.weather .degree output');
	return parseInt(o.innerText);
}

function setDegree(i) { // i = integer
	let o = document.querySelector('.weather .degree output');
	o.innerText = i;
}

function updateDegree(d) { // d = direction (signed integer)
	let p = document.querySelector('.weather .degree');
	let o = p.querySelector('output');
	let n = cfg.weather.degree.delay;
	let b = true;
	o.innerText = Math.max(Math.min(parseInt(o.innerText) + 1 * d, cfg.weather.degree.max), cfg.weather.degree.min);
	if (gui.weather.degree.count == cfg.weather.degree.speed.slow) {
		p.classList.add('slow');
		n /= 2;
	} else if (gui.weather.degree.count == cfg.weather.degree.speed.soft) {
		p.classList.add('soft');
		n /= 4;
	} else if (gui.weather.degree.count == cfg.weather.degree.speed.fast) {
		p.classList.add('fast');
		n /= 10;
	} else {
		b = false;
	}
	gui.weather.degree.count++;
	if (b) {
		clearInterval(gui.weather.degree.interval);
		gui.weather.degree.interval = setInterval(function() {
			updateDegree(d);
		}, Math.round(n));
	}
}

function rotateWindArrow(r) { // r = radian angle
	let o = document.querySelector('.weather .wind .arrow');
	o.style.transform = 'rotate(' + (r + Math.PI / 2) + 'rad)';
}

function updateWindDirection(r) { // r = radian angle
	let o = document.querySelector('.weather .wind');
	let s = '';
	let n = Math.PI;
	if (r < 0) {
		if (r <= -n * 7/8) s = lng.west;
		else if (r <= -n * 5/8) s = lng.north_west;
		else if (r <= -n * 3/8) s = lng.north;
		else if (r <= -n * 1/8) s = lng.north_east;
		else s = lng.east;
	} else {
		if (r <= n * 1/8) s = lng.east;
		else if (r <= n * 3/8) s = lng.south_east;
		else if (r <= n * 5/8) s = lng.south;
		else if (r <= n * 7/8) s = lng.south_west;
		else if (r <= n) s = lng.west;
	} o.dataset.title = s;
}

function updateWindArrow(e) { // e = mouse event ; returns radian angle
	let p = document.querySelector('.weather .wind');
	let b = p.getBoundingClientRect();
	let x = e.clientX - Math.floor(b.x + (b.width / 2));
	let y = e.clientY - Math.floor(b.y + (b.height / 2));
	let r = Math.atan2(y, x);
	rotateWindArrow(r);
	updateWindDirection(r);
	udpateWeatherCaption(p.dataset.title, p);
	return r;
}

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Weather Events */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

function attachWeatherEvents() {
	document.querySelector('.weather .degree').addEventListener('contextmenu', function(e) {
		e.preventDefault(); // no context menu on right click
	});
	document.querySelector('.weather .degree').addEventListener('mousedown', function(e) {
		if (!gui.weather.degree.down) {
			gui.weather.degree.down = true;
			this.classList.add('active');
			let i = e.button == 0 ? 1 : -1; // positive if left click, negative otherwise
			if (e.shiftKey) setDegree(cfg.weather.degree[(i > 0 ? 'max' : 'min')]);
			else if (e.ctrlKey) setDegree(cfg.weather.degree.raz);
			else {
				updateDegree(i);
				gui.weather.degree.interval = setInterval(function() {
					updateDegree(i);
				}, gui.weather.degree.delay);
			}
		}
	});
	document.querySelector('.weather .wind').addEventListener('mousedown', function() {
		if (!gui.weather.wind.down) {
			gui.weather.wind.down = true;
			this.classList.add('active');
		}
	});
	document.addEventListener('mouseup', function(e) {
		if (gui.weather.degree.down) {
			gui.weather.degree.down = false;
			gui.weather.degree.count = 0;
			clearInterval(gui.weather.degree.interval);
			document.querySelector('.weather .degree').classList.remove('active', 'slow', 'soft', 'fast');
			callMacro('key=degree;val=' + getDegree(), 'setLibProp');
			if (cfg.weather.reload) callMacro('', 'reloadTool');
		}
		if (gui.weather.wind.down) {
			let r = updateWindArrow(e);
			gui.weather.wind.down = false;
			document.querySelector('.weather .wind').classList.remove('active');
			if (e.target.nodeType == 1 && !e.target.classList.contains('wind') && !e.target.classList.contains('arrow')) udpateWeatherCaption();
			callMacro('key=wind;val=' + r, 'setLibProp');
			if (cfg.weather.reload) callMacro('', 'reloadTool');
		}
	});
	document.addEventListener('mousemove', function(e) {
		if (gui.weather.degree.down) gui.weather.degree.x1 = e.clientX;
		if (gui.weather.wind.down) updateWindArrow(e);
	});
	document.querySelector('.weather .sky').addEventListener('click', function() {
		let o = document.querySelector('.weather .skyset');
		o.classList.contains('hidden') ? o.classList.remove('hidden') : o.classList.add('hidden');
	});
	document.addEventListener('mousedown', function(e) {
		let o = document.querySelector('.weather .skyset');
		if (!e.target.classList.contains('sky')) o.classList.add('hidden');
	});
	document.querySelectorAll('.weather .skyset li').forEach(function(o) {
		let q = document.querySelector('.weather .sky');
		o.addEventListener('mousedown', function() {
			q.innerHTML = o.innerHTML;
			if (o.dataset.sky !== undefined) q.dataset.title = lng[o.dataset.sky];
			callMacro('key=sky;val=' + o.dataset.sky, 'setLibProp');
			if (cfg.weather.reload) callMacro('', 'reloadTool');
		});
		o.addEventListener('mouseenter', function() {
			if (o.dataset.sky !== undefined) udpateWeatherCaption(lng[o.dataset.sky], o);
		});
	});
}

document.querySelectorAll('.weather .wind, .weather .sky').forEach(function(o) {
	o.addEventListener('mouseenter', function() {
		udpateWeatherCaption(o.dataset.title, o);
	});
});

document.querySelectorAll('.weather .wind, .weather .sky, .weather .skyset').forEach(function(o) {
	o.addEventListener('mouseleave', function() {
		udpateWeatherCaption();
	});
});

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Change Map Events */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

document.addEventListener('mousedown', function(e) {
	if (e.button == 0) { // left click
		callMacro('" + getCurrentMapName() + "', 'checkMap');
	}
});

/* ========================================================================== */
/* -------------------------------------------------------------------------- */
/* # Window Events */
/* -------------------------------------------------------------------------- */
/* ========================================================================== */

window.addEventListener('load', function() {
	let o = document.querySelector('.weather .wind');
	let p = document.querySelector('.weather .sky')
	// ---------------------------------------------------------------------------
	// * Dev
	// ---------------------------------------------------------------------------
	// let q = document.querySelector(`[data-sky='empty']`);
	// let r = -Math.PI * 4/8;
	// ---------------------------------------------------------------------------
	// * MapTool
	// ---------------------------------------------------------------------------
	let q = document.querySelector(`[data-sky='" + getLibProperty("sky", "Lib:Vars") + "']`);
	let r = parseFloat(" + getLibProperty("wind", "Lib:Vars") + ");
	if (r == '') r = -Math.PI * 4/8;
	// ---------------------------------------------------------------------------
	if (o.dataset.title === undefined) {
		rotateWindArrow(r);
		updateWindDirection(r);
	}
	if (p.dataset.title === undefined) {
		p.innerHTML = q.innerHTML;
		p.dataset.title = lng[q.dataset.sky];
	}
	if (document.getElementsByTagName('body')[0].classList.contains('gm')) { // gm only
		attachBubblingEvents();
		attachWeatherEvents();
	}
});
"]
