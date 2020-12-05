'use strict';

window.addEventListener('DOMContentLoaded', function () {
	var jsLoading = document.getElementById('js-loading');

	var addLoaded = function addLoaded() {
		return jsLoading.classList.add('-loaded');
	};

	addLoaded();
	setTimeout(addLoaded, 5000);
});
/**
 * what-input - A global utility for tracking the current input method (mouse, keyboard or touch).
 * @version v5.2.10
 * @link https://github.com/ten1seven/what-input
 * @license MIT
 */
!(function (e, t) {
	'object' == typeof exports && 'object' == typeof module
		? (module.exports = t())
		: 'function' == typeof define && define.amd
		? define('whatInput', [], t)
		: 'object' == typeof exports
		? (exports.whatInput = t())
		: (e.whatInput = t());
})(this, function () {
	return (
		(i = {}),
		(n.m = o = [
			function (e, t) {
				'use strict';
				e.exports = (function () {
					if ('undefined' == typeof document || 'undefined' == typeof window)
						return {
							ask: function () {
								return 'initial';
							},
							element: function () {
								return null;
							},
							ignoreKeys: function () {},
							specificKeys: function () {},
							registerOnChange: function () {},
							unRegisterOnChange: function () {}
						};
					var t = document.documentElement,
						n = null,
						s = 'initial',
						u = s,
						o = Date.now(),
						i = 'false',
						d = ['button', 'input', 'select', 'textarea'],
						r = [],
						c = [16, 17, 18, 91, 93],
						w = [],
						p = {
							keydown: 'keyboard',
							keyup: 'keyboard',
							mousedown: 'mouse',
							mousemove: 'mouse',
							MSPointerDown: 'pointer',
							MSPointerMove: 'pointer',
							pointerdown: 'pointer',
							pointermove: 'pointer',
							touchstart: 'touch',
							touchend: 'touch'
						},
						a = !1,
						f = { x: null, y: null },
						l = { 2: 'touch', 3: 'touch', 4: 'mouse' },
						m = !1;
					try {
						var e = Object.defineProperty({}, 'passive', {
							get: function () {
								m = !0;
							}
						});
						window.addEventListener('test', null, e);
					} catch (e) {}
					var h = function () {
							var e = !!m && { passive: !0 };
							document.addEventListener('DOMContentLoaded', v),
								window.PointerEvent
									? (window.addEventListener('pointerdown', y),
									  window.addEventListener('pointermove', E))
									: window.MSPointerEvent
									? (window.addEventListener('MSPointerDown', y),
									  window.addEventListener('MSPointerMove', E))
									: (window.addEventListener('mousedown', y),
									  window.addEventListener('mousemove', E),
									  'ontouchstart' in window &&
											(window.addEventListener('touchstart', y, e),
											window.addEventListener('touchend', y))),
								window.addEventListener(O(), E, e),
								window.addEventListener('keydown', y),
								window.addEventListener('keyup', y),
								window.addEventListener('focusin', L),
								window.addEventListener('focusout', b);
						},
						v = function () {
							if (
								(i = !(
									t.getAttribute('data-whatpersist') ||
									'false' === document.body.getAttribute('data-whatpersist')
								))
							)
								try {
									window.sessionStorage.getItem('what-input') &&
										(s = window.sessionStorage.getItem('what-input')),
										window.sessionStorage.getItem('what-intent') &&
											(u = window.sessionStorage.getItem('what-intent'));
								} catch (e) {}
							g('input'), g('intent');
						},
						y = function (e) {
							var t = e.which,
								n = p[e.type];
							'pointer' === n && (n = S(e));
							var o = !w.length && -1 === c.indexOf(t),
								i = w.length && -1 !== w.indexOf(t),
								r =
									('keyboard' === n && t && (o || i)) ||
									'mouse' === n ||
									'touch' === n;
							if (
								(M(n) && (r = !1),
								r && s !== n && (x('input', (s = n)), g('input')),
								r && u !== n)
							) {
								var a = document.activeElement;
								a &&
									a.nodeName &&
									(-1 === d.indexOf(a.nodeName.toLowerCase()) ||
										('button' === a.nodeName.toLowerCase() && !C(a, 'form'))) &&
									(x('intent', (u = n)), g('intent'));
							}
						},
						g = function (e) {
							t.setAttribute('data-what' + e, 'input' === e ? s : u), k(e);
						},
						E = function (e) {
							var t = p[e.type];
							'pointer' === t && (t = S(e)),
								A(e),
								((!a && !M(t)) ||
									(a && 'wheel' === e.type) ||
									'mousewheel' === e.type ||
									'DOMMouseScroll' === e.type) &&
									u !== t &&
									(x('intent', (u = t)), g('intent'));
						},
						L = function (e) {
							e.target.nodeName
								? ((n = e.target.nodeName.toLowerCase()),
								  t.setAttribute('data-whatelement', n),
								  e.target.classList &&
										e.target.classList.length &&
										t.setAttribute(
											'data-whatclasses',
											e.target.classList.toString().replace(' ', ',')
										))
								: b();
						},
						b = function () {
							(n = null),
								t.removeAttribute('data-whatelement'),
								t.removeAttribute('data-whatclasses');
						},
						x = function (e, t) {
							if (i)
								try {
									window.sessionStorage.setItem('what-' + e, t);
								} catch (e) {}
						},
						S = function (e) {
							return 'number' == typeof e.pointerType
								? l[e.pointerType]
								: 'pen' === e.pointerType
								? 'touch'
								: e.pointerType;
						},
						M = function (e) {
							var t = Date.now(),
								n = 'mouse' === e && 'touch' === s && t - o < 200;
							return (o = t), n;
						},
						O = function () {
							return 'onwheel' in document.createElement('div')
								? 'wheel'
								: void 0 !== document.onmousewheel
								? 'mousewheel'
								: 'DOMMouseScroll';
						},
						k = function (e) {
							for (var t = 0, n = r.length; t < n; t++)
								r[t].type === e && r[t].fn.call(void 0, 'input' === e ? s : u);
						},
						A = function (e) {
							f.x !== e.screenX || f.y !== e.screenY
								? ((a = !1), (f.x = e.screenX), (f.y = e.screenY))
								: (a = !0);
						},
						C = function (e, t) {
							var n = window.Element.prototype;
							if (
								(n.matches ||
									(n.matches = n.msMatchesSelector || n.webkitMatchesSelector),
								n.closest)
							)
								return e.closest(t);
							do {
								if (e.matches(t)) return e;
								e = e.parentElement || e.parentNode;
							} while (null !== e && 1 === e.nodeType);
							return null;
						};
					return (
						'addEventListener' in window &&
							Array.prototype.indexOf &&
							((p[O()] = 'mouse'), h()),
						{
							ask: function (e) {
								return 'intent' === e ? u : s;
							},
							element: function () {
								return n;
							},
							ignoreKeys: function (e) {
								c = e;
							},
							specificKeys: function (e) {
								w = e;
							},
							registerOnChange: function (e, t) {
								r.push({ fn: e, type: t || 'input' });
							},
							unRegisterOnChange: function (e) {
								var t = (function (e) {
									for (var t = 0, n = r.length; t < n; t++)
										if (r[t].fn === e) return t;
								})(e);
								(!t && 0 !== t) || r.splice(t, 1);
							},
							clearStorage: function () {
								window.sessionStorage.clear();
							}
						}
					);
				})();
			}
		]),
		(n.c = i),
		(n.p = ''),
		n(0)
	);
	function n(e) {
		if (i[e]) return i[e].exports;
		var t = (i[e] = { exports: {}, id: e, loaded: !1 });
		return o[e].call(t.exports, t, t.exports, n), (t.loaded = !0), t.exports;
	}
	var o, i;
});
