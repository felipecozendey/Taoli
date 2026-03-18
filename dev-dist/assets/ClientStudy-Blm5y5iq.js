import { B as Input, E as Skeleton, G as CardHeader, H as CardContent, Ht as __commonJSMin, K as CardTitle, Ot as require_jsx_runtime, U as CardDescription, V as Card, Vt as require_react, Wt as __toESM, X as supabase, Y as useAuth, at as cn, ft as clsx, n as DashboardHeader, q as Button, t as PageContent, ut as createLucideIcon } from "./PageContent-ChuXhdYa.js";
import { t as Flame } from "./flame-BemAQ3ur.js";
import { $ as Label$1, A as require__baseExtremum, B as getPercentValue, C as getMaxRadius, D as require_isEqual, E as getValueByDataKey, F as warn, G as require_isNil, H as isNumber, I as Layer, K as require_get, L as filterProps, M as Cell, N as Global, O as require__baseLt, P as require__baseIteratee, R as findAllByType, S as formatAxisMap, T as polarToCartesian, U as mathSign, V as interpolateNumber, W as uniqueId, _ as Dot, a as ChartContainer, at as Plus, b as LabelList, c as ChartTooltip, ct as FileText, d as generateCategoricalChart, dt as Brain, f as YAxis, g as Shape, h as Bar, i as TabsTrigger, it as Save, j as Text, k as require__baseGt, l as ChartTooltipContent, m as CartesianGrid, mt as useToast, n as TabsContent, o as ChartLegend, ot as LoaderCircle, p as XAxis, q as require_isFunction, r as TabsList, rt as Search, s as ChartLegendContent, st as LayoutDashboard, t as Tabs, tt as Target, u as BarChart, v as es6_default, w as getTickClassName, x as Label, y as Curve, z as adaptEventsOfChild } from "./index-D6A_oZdb.js";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CYXHoOM6.js";
var BrainCircuit = createLucideIcon("brain-circuit", [
	["path", {
		d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
		key: "l5xja"
	}],
	["path", {
		d: "M9 13a4.5 4.5 0 0 0 3-4",
		key: "10igwf"
	}],
	["path", {
		d: "M6.003 5.125A3 3 0 0 0 6.401 6.5",
		key: "105sqy"
	}],
	["path", {
		d: "M3.477 10.896a4 4 0 0 1 .585-.396",
		key: "ql3yin"
	}],
	["path", {
		d: "M6 18a4 4 0 0 1-1.967-.516",
		key: "2e4loj"
	}],
	["path", {
		d: "M12 13h4",
		key: "1ku699"
	}],
	["path", {
		d: "M12 18h6a2 2 0 0 1 2 2v1",
		key: "105ag5"
	}],
	["path", {
		d: "M12 8h8",
		key: "1lhi5i"
	}],
	["path", {
		d: "M16 8V5a2 2 0 0 1 2-2",
		key: "u6izg6"
	}],
	["circle", {
		cx: "16",
		cy: "13",
		r: ".5",
		key: "ry7gng"
	}],
	["circle", {
		cx: "18",
		cy: "3",
		r: ".5",
		key: "1aiba7"
	}],
	["circle", {
		cx: "20",
		cy: "21",
		r: ".5",
		key: "yhc1fs"
	}],
	["circle", {
		cx: "20",
		cy: "8",
		r: ".5",
		key: "1e43v0"
	}]
]);
var Database = createLucideIcon("database", [
	["ellipse", {
		cx: "12",
		cy: "5",
		rx: "9",
		ry: "3",
		key: "msslwz"
	}],
	["path", {
		d: "M3 5V19A9 3 0 0 0 21 19V5",
		key: "1wlel7"
	}],
	["path", {
		d: "M3 12A9 3 0 0 0 21 12",
		key: "mv7ke4"
	}]
]);
var Layers = createLucideIcon("layers", [
	["path", {
		d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
		key: "zw3jo"
	}],
	["path", {
		d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
		key: "1wduqc"
	}],
	["path", {
		d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
		key: "kqbvx6"
	}]
]);
var Network = createLucideIcon("network", [
	["rect", {
		x: "16",
		y: "16",
		width: "6",
		height: "6",
		rx: "1",
		key: "4q2zg0"
	}],
	["rect", {
		x: "2",
		y: "16",
		width: "6",
		height: "6",
		rx: "1",
		key: "8cvhb9"
	}],
	["rect", {
		x: "9",
		y: "2",
		width: "6",
		height: "6",
		rx: "1",
		key: "1egb70"
	}],
	["path", {
		d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3",
		key: "1jsf9p"
	}],
	["path", {
		d: "M12 12V8",
		key: "2874zd"
	}]
]);
var Play = createLucideIcon("play", [["path", {
	d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
	key: "10ikf1"
}]]);
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/recharts/es6/shape/Polygon.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var _excluded$1 = [
	"points",
	"className",
	"baseLinePoints",
	"connectNulls"
];
function _extends$3() {
	_extends$3 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$3.apply(this, arguments);
}
function _objectWithoutProperties$1(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$1(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function _toConsumableArray(arr) {
	return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
	if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
	if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
var isValidatePoint = function isValidatePoint(point) {
	return point && point.x === +point.x && point.y === +point.y;
};
var getParsedPoints = function getParsedPoints() {
	var points = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
	var segmentPoints = [[]];
	points.forEach(function(entry) {
		if (isValidatePoint(entry)) segmentPoints[segmentPoints.length - 1].push(entry);
		else if (segmentPoints[segmentPoints.length - 1].length > 0) segmentPoints.push([]);
	});
	if (isValidatePoint(points[0])) segmentPoints[segmentPoints.length - 1].push(points[0]);
	if (segmentPoints[segmentPoints.length - 1].length <= 0) segmentPoints = segmentPoints.slice(0, -1);
	return segmentPoints;
};
var getSinglePolygonPath = function getSinglePolygonPath(points, connectNulls) {
	var segmentPoints = getParsedPoints(points);
	if (connectNulls) segmentPoints = [segmentPoints.reduce(function(res, segPoints) {
		return [].concat(_toConsumableArray(res), _toConsumableArray(segPoints));
	}, [])];
	var polygonPath = segmentPoints.map(function(segPoints) {
		return segPoints.reduce(function(path, point, index) {
			return "".concat(path).concat(index === 0 ? "M" : "L").concat(point.x, ",").concat(point.y);
		}, "");
	}).join("");
	return segmentPoints.length === 1 ? "".concat(polygonPath, "Z") : polygonPath;
};
var getRanglePath = function getRanglePath(points, baseLinePoints, connectNulls) {
	var outerPath = getSinglePolygonPath(points, connectNulls);
	return "".concat(outerPath.slice(-1) === "Z" ? outerPath.slice(0, -1) : outerPath, "L").concat(getSinglePolygonPath(baseLinePoints.reverse(), connectNulls).slice(1));
};
var Polygon = function Polygon(props) {
	var points = props.points, className = props.className, baseLinePoints = props.baseLinePoints, connectNulls = props.connectNulls, others = _objectWithoutProperties$1(props, _excluded$1);
	if (!points || !points.length) return null;
	var layerClass = clsx("recharts-polygon", className);
	if (baseLinePoints && baseLinePoints.length) {
		var hasStroke = others.stroke && others.stroke !== "none";
		var rangePath = getRanglePath(points, baseLinePoints, connectNulls);
		return /* @__PURE__ */ import_react.createElement("g", { className: layerClass }, /* @__PURE__ */ import_react.createElement("path", _extends$3({}, filterProps(others, true), {
			fill: rangePath.slice(-1) === "Z" ? others.fill : "none",
			stroke: "none",
			d: rangePath
		})), hasStroke ? /* @__PURE__ */ import_react.createElement("path", _extends$3({}, filterProps(others, true), {
			fill: "none",
			d: getSinglePolygonPath(points, connectNulls)
		})) : null, hasStroke ? /* @__PURE__ */ import_react.createElement("path", _extends$3({}, filterProps(others, true), {
			fill: "none",
			d: getSinglePolygonPath(baseLinePoints, connectNulls)
		})) : null);
	}
	var singlePath = getSinglePolygonPath(points, connectNulls);
	return /* @__PURE__ */ import_react.createElement("path", _extends$3({}, filterProps(others, true), {
		fill: singlePath.slice(-1) === "Z" ? others.fill : "none",
		className: layerClass,
		d: singlePath
	}));
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/lodash@4.17.23/node_modules/lodash/maxBy.js
var require_maxBy = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseExtremum = require__baseExtremum(), baseGt = require__baseGt(), baseIteratee = require__baseIteratee();
	/**
	* This method is like `_.max` except that it accepts `iteratee` which is
	* invoked for each element in `array` to generate the criterion by which
	* the value is ranked. The iteratee is invoked with one argument: (value).
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Math
	* @param {Array} array The array to iterate over.
	* @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	* @returns {*} Returns the maximum value.
	* @example
	*
	* var objects = [{ 'n': 1 }, { 'n': 2 }];
	*
	* _.maxBy(objects, function(o) { return o.n; });
	* // => { 'n': 2 }
	*
	* // The `_.property` iteratee shorthand.
	* _.maxBy(objects, 'n');
	* // => { 'n': 2 }
	*/
	function maxBy(array, iteratee) {
		return array && array.length ? baseExtremum(array, baseIteratee(iteratee, 2), baseGt) : void 0;
	}
	module.exports = maxBy;
}));
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/lodash@4.17.23/node_modules/lodash/minBy.js
var require_minBy = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseExtremum = require__baseExtremum(), baseIteratee = require__baseIteratee(), baseLt = require__baseLt();
	/**
	* This method is like `_.min` except that it accepts `iteratee` which is
	* invoked for each element in `array` to generate the criterion by which
	* the value is ranked. The iteratee is invoked with one argument: (value).
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Math
	* @param {Array} array The array to iterate over.
	* @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	* @returns {*} Returns the minimum value.
	* @example
	*
	* var objects = [{ 'n': 1 }, { 'n': 2 }];
	*
	* _.minBy(objects, function(o) { return o.n; });
	* // => { 'n': 1 }
	*
	* // The `_.property` iteratee shorthand.
	* _.minBy(objects, 'n');
	* // => { 'n': 1 }
	*/
	function minBy(array, iteratee) {
		return array && array.length ? baseExtremum(array, baseIteratee(iteratee, 2), baseLt) : void 0;
	}
	module.exports = minBy;
}));
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/recharts/es6/polar/PolarRadiusAxis.js
/**
* @fileOverview The axis of polar coordinate system
*/
var import_maxBy = /* @__PURE__ */ __toESM(require_maxBy());
var import_minBy = /* @__PURE__ */ __toESM(require_minBy());
var import_isFunction = /* @__PURE__ */ __toESM(require_isFunction());
var _excluded = [
	"cx",
	"cy",
	"angle",
	"ticks",
	"axisLine"
], _excluded2 = [
	"ticks",
	"tick",
	"angle",
	"tickFormatter",
	"stroke"
];
function _typeof$2(o) {
	"@babel/helpers - typeof";
	return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$2(o);
}
function _extends$2() {
	_extends$2 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$2.apply(this, arguments);
}
function ownKeys$2(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$2(Object(t), !0).forEach(function(r) {
			_defineProperty$2(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _objectWithoutProperties(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
	if (source == null) return {};
	var target = {};
	for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function _classCallCheck$2(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$2(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$2(descriptor.key), descriptor);
	}
}
function _createClass$2(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$2(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper$2(t, o, e) {
	return o = _getPrototypeOf$2(o), _possibleConstructorReturn$2(t, _isNativeReflectConstruct$2() ? Reflect.construct(o, e || [], _getPrototypeOf$2(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$2(self, call) {
	if (call && (_typeof$2(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized$2(self);
}
function _assertThisInitialized$2(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct$2() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$2 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf$2(o) {
	_getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf$2(o);
}
function _inherits$2(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf$2(subClass, superClass);
}
function _setPrototypeOf$2(o, p) {
	_setPrototypeOf$2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf$2(o, p);
}
function _defineProperty$2(obj, key, value) {
	key = _toPropertyKey$2(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$2(t) {
	var i = _toPrimitive$2(t, "string");
	return "symbol" == _typeof$2(i) ? i : i + "";
}
function _toPrimitive$2(t, r) {
	if ("object" != _typeof$2(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$2(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var PolarRadiusAxis = /* @__PURE__ */ function(_PureComponent) {
	function PolarRadiusAxis() {
		_classCallCheck$2(this, PolarRadiusAxis);
		return _callSuper$2(this, PolarRadiusAxis, arguments);
	}
	_inherits$2(PolarRadiusAxis, _PureComponent);
	return _createClass$2(PolarRadiusAxis, [
		{
			key: "getTickValueCoord",
			value: function getTickValueCoord(_ref) {
				var coordinate = _ref.coordinate;
				var _this$props = this.props, angle = _this$props.angle, cx = _this$props.cx, cy = _this$props.cy;
				return polarToCartesian(cx, cy, coordinate, angle);
			}
		},
		{
			key: "getTickTextAnchor",
			value: function getTickTextAnchor() {
				var orientation = this.props.orientation;
				var textAnchor;
				switch (orientation) {
					case "left":
						textAnchor = "end";
						break;
					case "right":
						textAnchor = "start";
						break;
					default:
						textAnchor = "middle";
						break;
				}
				return textAnchor;
			}
		},
		{
			key: "getViewBox",
			value: function getViewBox() {
				var _this$props2 = this.props, cx = _this$props2.cx, cy = _this$props2.cy, angle = _this$props2.angle, ticks = _this$props2.ticks;
				var maxRadiusTick = (0, import_maxBy.default)(ticks, function(entry) {
					return entry.coordinate || 0;
				});
				return {
					cx,
					cy,
					startAngle: angle,
					endAngle: angle,
					innerRadius: (0, import_minBy.default)(ticks, function(entry) {
						return entry.coordinate || 0;
					}).coordinate || 0,
					outerRadius: maxRadiusTick.coordinate || 0
				};
			}
		},
		{
			key: "renderAxisLine",
			value: function renderAxisLine() {
				var _this$props3 = this.props, cx = _this$props3.cx, cy = _this$props3.cy, angle = _this$props3.angle, ticks = _this$props3.ticks, axisLine = _this$props3.axisLine, others = _objectWithoutProperties(_this$props3, _excluded);
				var extent = ticks.reduce(function(result, entry) {
					return [Math.min(result[0], entry.coordinate), Math.max(result[1], entry.coordinate)];
				}, [Infinity, -Infinity]);
				var point0 = polarToCartesian(cx, cy, extent[0], angle);
				var point1 = polarToCartesian(cx, cy, extent[1], angle);
				var props = _objectSpread$2(_objectSpread$2(_objectSpread$2({}, filterProps(others, false)), {}, { fill: "none" }, filterProps(axisLine, false)), {}, {
					x1: point0.x,
					y1: point0.y,
					x2: point1.x,
					y2: point1.y
				});
				return /* @__PURE__ */ import_react.createElement("line", _extends$2({ className: "recharts-polar-radius-axis-line" }, props));
			}
		},
		{
			key: "renderTicks",
			value: function renderTicks() {
				var _this = this;
				var _this$props4 = this.props, ticks = _this$props4.ticks, tick = _this$props4.tick, angle = _this$props4.angle, tickFormatter = _this$props4.tickFormatter, stroke = _this$props4.stroke, others = _objectWithoutProperties(_this$props4, _excluded2);
				var textAnchor = this.getTickTextAnchor();
				var axisProps = filterProps(others, false);
				var customTickProps = filterProps(tick, false);
				var items = ticks.map(function(entry, i) {
					var coord = _this.getTickValueCoord(entry);
					var tickProps = _objectSpread$2(_objectSpread$2(_objectSpread$2(_objectSpread$2({
						textAnchor,
						transform: "rotate(".concat(90 - angle, ", ").concat(coord.x, ", ").concat(coord.y, ")")
					}, axisProps), {}, {
						stroke: "none",
						fill: stroke
					}, customTickProps), {}, { index: i }, coord), {}, { payload: entry });
					return /* @__PURE__ */ import_react.createElement(Layer, _extends$2({
						className: clsx("recharts-polar-radius-axis-tick", getTickClassName(tick)),
						key: "tick-".concat(entry.coordinate)
					}, adaptEventsOfChild(_this.props, entry, i)), PolarRadiusAxis.renderTickItem(tick, tickProps, tickFormatter ? tickFormatter(entry.value, i) : entry.value));
				});
				return /* @__PURE__ */ import_react.createElement(Layer, { className: "recharts-polar-radius-axis-ticks" }, items);
			}
		},
		{
			key: "render",
			value: function render() {
				var _this$props5 = this.props, ticks = _this$props5.ticks, axisLine = _this$props5.axisLine, tick = _this$props5.tick;
				if (!ticks || !ticks.length) return null;
				return /* @__PURE__ */ import_react.createElement(Layer, { className: clsx("recharts-polar-radius-axis", this.props.className) }, axisLine && this.renderAxisLine(), tick && this.renderTicks(), Label.renderCallByParent(this.props, this.getViewBox()));
			}
		}
	], [{
		key: "renderTickItem",
		value: function renderTickItem(option, props, value) {
			var tickItem;
			if (/* @__PURE__ */ import_react.isValidElement(option)) tickItem = /* @__PURE__ */ import_react.cloneElement(option, props);
			else if ((0, import_isFunction.default)(option)) tickItem = option(props);
			else tickItem = /* @__PURE__ */ import_react.createElement(Text, _extends$2({}, props, { className: "recharts-polar-radius-axis-tick-value" }), value);
			return tickItem;
		}
	}]);
}(import_react.PureComponent);
_defineProperty$2(PolarRadiusAxis, "displayName", "PolarRadiusAxis");
_defineProperty$2(PolarRadiusAxis, "axisType", "radiusAxis");
_defineProperty$2(PolarRadiusAxis, "defaultProps", {
	type: "number",
	radiusAxisId: 0,
	cx: 0,
	cy: 0,
	angle: 0,
	orientation: "right",
	stroke: "#ccc",
	axisLine: true,
	tick: true,
	tickCount: 5,
	allowDataOverflow: false,
	scale: "auto",
	allowDuplicatedCategory: true
});
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/recharts/es6/polar/PolarAngleAxis.js
/**
* @fileOverview Axis of radial direction
*/
function _typeof$1(o) {
	"@babel/helpers - typeof";
	return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$1(o);
}
function _extends$1() {
	_extends$1 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$1.apply(this, arguments);
}
function ownKeys$1(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$1(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$1(Object(t), !0).forEach(function(r) {
			_defineProperty$1(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _classCallCheck$1(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$1(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey$1(descriptor.key), descriptor);
	}
}
function _createClass$1(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$1(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper$1(t, o, e) {
	return o = _getPrototypeOf$1(o), _possibleConstructorReturn$1(t, _isNativeReflectConstruct$1() ? Reflect.construct(o, e || [], _getPrototypeOf$1(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$1(self, call) {
	if (call && (_typeof$1(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized$1(self);
}
function _assertThisInitialized$1(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct$1() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$1 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf$1(o) {
	_getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf$1(o);
}
function _inherits$1(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf$1(subClass, superClass);
}
function _setPrototypeOf$1(o, p) {
	_setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf$1(o, p);
}
function _defineProperty$1(obj, key, value) {
	key = _toPropertyKey$1(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey$1(t) {
	var i = _toPrimitive$1(t, "string");
	return "symbol" == _typeof$1(i) ? i : i + "";
}
function _toPrimitive$1(t, r) {
	if ("object" != _typeof$1(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$1(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var RADIAN = Math.PI / 180;
var eps = 1e-5;
var PolarAngleAxis = /* @__PURE__ */ function(_PureComponent) {
	function PolarAngleAxis() {
		_classCallCheck$1(this, PolarAngleAxis);
		return _callSuper$1(this, PolarAngleAxis, arguments);
	}
	_inherits$1(PolarAngleAxis, _PureComponent);
	return _createClass$1(PolarAngleAxis, [
		{
			key: "getTickLineCoord",
			value: function getTickLineCoord(data) {
				var _this$props = this.props, cx = _this$props.cx, cy = _this$props.cy, radius = _this$props.radius, orientation = _this$props.orientation;
				var tickLineSize = _this$props.tickSize || 8;
				var p1 = polarToCartesian(cx, cy, radius, data.coordinate);
				var p2 = polarToCartesian(cx, cy, radius + (orientation === "inner" ? -1 : 1) * tickLineSize, data.coordinate);
				return {
					x1: p1.x,
					y1: p1.y,
					x2: p2.x,
					y2: p2.y
				};
			}
		},
		{
			key: "getTickTextAnchor",
			value: function getTickTextAnchor(data) {
				var orientation = this.props.orientation;
				var cos = Math.cos(-data.coordinate * RADIAN);
				var textAnchor;
				if (cos > eps) textAnchor = orientation === "outer" ? "start" : "end";
				else if (cos < -eps) textAnchor = orientation === "outer" ? "end" : "start";
				else textAnchor = "middle";
				return textAnchor;
			}
		},
		{
			key: "renderAxisLine",
			value: function renderAxisLine() {
				var _this$props2 = this.props, cx = _this$props2.cx, cy = _this$props2.cy, radius = _this$props2.radius, axisLine = _this$props2.axisLine, axisLineType = _this$props2.axisLineType;
				var props = _objectSpread$1(_objectSpread$1({}, filterProps(this.props, false)), {}, { fill: "none" }, filterProps(axisLine, false));
				if (axisLineType === "circle") return /* @__PURE__ */ import_react.createElement(Dot, _extends$1({ className: "recharts-polar-angle-axis-line" }, props, {
					cx,
					cy,
					r: radius
				}));
				var points = this.props.ticks.map(function(entry) {
					return polarToCartesian(cx, cy, radius, entry.coordinate);
				});
				return /* @__PURE__ */ import_react.createElement(Polygon, _extends$1({ className: "recharts-polar-angle-axis-line" }, props, { points }));
			}
		},
		{
			key: "renderTicks",
			value: function renderTicks() {
				var _this = this;
				var _this$props3 = this.props, ticks = _this$props3.ticks, tick = _this$props3.tick, tickLine = _this$props3.tickLine, tickFormatter = _this$props3.tickFormatter, stroke = _this$props3.stroke;
				var axisProps = filterProps(this.props, false);
				var customTickProps = filterProps(tick, false);
				var tickLineProps = _objectSpread$1(_objectSpread$1({}, axisProps), {}, { fill: "none" }, filterProps(tickLine, false));
				var items = ticks.map(function(entry, i) {
					var lineCoord = _this.getTickLineCoord(entry);
					var tickProps = _objectSpread$1(_objectSpread$1(_objectSpread$1({ textAnchor: _this.getTickTextAnchor(entry) }, axisProps), {}, {
						stroke: "none",
						fill: stroke
					}, customTickProps), {}, {
						index: i,
						payload: entry,
						x: lineCoord.x2,
						y: lineCoord.y2
					});
					return /* @__PURE__ */ import_react.createElement(Layer, _extends$1({
						className: clsx("recharts-polar-angle-axis-tick", getTickClassName(tick)),
						key: "tick-".concat(entry.coordinate)
					}, adaptEventsOfChild(_this.props, entry, i)), tickLine && /* @__PURE__ */ import_react.createElement("line", _extends$1({ className: "recharts-polar-angle-axis-tick-line" }, tickLineProps, lineCoord)), tick && PolarAngleAxis.renderTickItem(tick, tickProps, tickFormatter ? tickFormatter(entry.value, i) : entry.value));
				});
				return /* @__PURE__ */ import_react.createElement(Layer, { className: "recharts-polar-angle-axis-ticks" }, items);
			}
		},
		{
			key: "render",
			value: function render() {
				var _this$props4 = this.props, ticks = _this$props4.ticks, radius = _this$props4.radius, axisLine = _this$props4.axisLine;
				if (radius <= 0 || !ticks || !ticks.length) return null;
				return /* @__PURE__ */ import_react.createElement(Layer, { className: clsx("recharts-polar-angle-axis", this.props.className) }, axisLine && this.renderAxisLine(), this.renderTicks());
			}
		}
	], [{
		key: "renderTickItem",
		value: function renderTickItem(option, props, value) {
			var tickItem;
			if (/* @__PURE__ */ import_react.isValidElement(option)) tickItem = /* @__PURE__ */ import_react.cloneElement(option, props);
			else if ((0, import_isFunction.default)(option)) tickItem = option(props);
			else tickItem = /* @__PURE__ */ import_react.createElement(Text, _extends$1({}, props, { className: "recharts-polar-angle-axis-tick-value" }), value);
			return tickItem;
		}
	}]);
}(import_react.PureComponent);
_defineProperty$1(PolarAngleAxis, "displayName", "PolarAngleAxis");
_defineProperty$1(PolarAngleAxis, "axisType", "angleAxis");
_defineProperty$1(PolarAngleAxis, "defaultProps", {
	type: "category",
	angleAxisId: 0,
	scale: "auto",
	cx: 0,
	cy: 0,
	orientation: "outer",
	axisLine: true,
	tickLine: true,
	tickSize: 8,
	tick: true,
	hide: false,
	allowDuplicatedCategory: true
});
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/recharts/es6/polar/Pie.js
/**
* @fileOverview Render sectors of a pie
*/
var import_get = /* @__PURE__ */ __toESM(require_get());
var import_isEqual = /* @__PURE__ */ __toESM(require_isEqual());
var import_isNil = /* @__PURE__ */ __toESM(require_isNil());
var _Pie;
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
function _extends() {
	_extends = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
	}
}
function _createClass(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _callSuper(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
	if (call && (_typeof(call) === "object" || typeof call === "function")) return call;
	else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _isNativeReflectConstruct() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _getPrototypeOf(o) {
	_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
	_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf(o, p);
}
function _defineProperty(obj, key, value) {
	key = _toPropertyKey(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var Pie = /* @__PURE__ */ function(_PureComponent) {
	function Pie(props) {
		var _this;
		_classCallCheck(this, Pie);
		_this = _callSuper(this, Pie, [props]);
		_defineProperty(_this, "pieRef", null);
		_defineProperty(_this, "sectorRefs", []);
		_defineProperty(_this, "id", uniqueId("recharts-pie-"));
		_defineProperty(_this, "handleAnimationEnd", function() {
			var onAnimationEnd = _this.props.onAnimationEnd;
			_this.setState({ isAnimationFinished: true });
			if ((0, import_isFunction.default)(onAnimationEnd)) onAnimationEnd();
		});
		_defineProperty(_this, "handleAnimationStart", function() {
			var onAnimationStart = _this.props.onAnimationStart;
			_this.setState({ isAnimationFinished: false });
			if ((0, import_isFunction.default)(onAnimationStart)) onAnimationStart();
		});
		_this.state = {
			isAnimationFinished: !props.isAnimationActive,
			prevIsAnimationActive: props.isAnimationActive,
			prevAnimationId: props.animationId,
			sectorToFocus: 0
		};
		return _this;
	}
	_inherits(Pie, _PureComponent);
	return _createClass(Pie, [
		{
			key: "isActiveIndex",
			value: function isActiveIndex(i) {
				var activeIndex = this.props.activeIndex;
				if (Array.isArray(activeIndex)) return activeIndex.indexOf(i) !== -1;
				return i === activeIndex;
			}
		},
		{
			key: "hasActiveIndex",
			value: function hasActiveIndex() {
				var activeIndex = this.props.activeIndex;
				return Array.isArray(activeIndex) ? activeIndex.length !== 0 : activeIndex || activeIndex === 0;
			}
		},
		{
			key: "renderLabels",
			value: function renderLabels(sectors) {
				if (this.props.isAnimationActive && !this.state.isAnimationFinished) return null;
				var _this$props = this.props, label = _this$props.label, labelLine = _this$props.labelLine, dataKey = _this$props.dataKey, valueKey = _this$props.valueKey;
				var pieProps = filterProps(this.props, false);
				var customLabelProps = filterProps(label, false);
				var customLabelLineProps = filterProps(labelLine, false);
				var offsetRadius = label && label.offsetRadius || 20;
				var labels = sectors.map(function(entry, i) {
					var midAngle = (entry.startAngle + entry.endAngle) / 2;
					var endPoint = polarToCartesian(entry.cx, entry.cy, entry.outerRadius + offsetRadius, midAngle);
					var labelProps = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, pieProps), entry), {}, { stroke: "none" }, customLabelProps), {}, {
						index: i,
						textAnchor: Pie.getTextAnchor(endPoint.x, entry.cx)
					}, endPoint);
					var lineProps = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, pieProps), entry), {}, {
						fill: "none",
						stroke: entry.fill
					}, customLabelLineProps), {}, {
						index: i,
						points: [polarToCartesian(entry.cx, entry.cy, entry.outerRadius, midAngle), endPoint]
					});
					var realDataKey = dataKey;
					if ((0, import_isNil.default)(dataKey) && (0, import_isNil.default)(valueKey)) realDataKey = "value";
					else if ((0, import_isNil.default)(dataKey)) realDataKey = valueKey;
					return /* @__PURE__ */ import_react.createElement(Layer, { key: "label-".concat(entry.startAngle, "-").concat(entry.endAngle, "-").concat(entry.midAngle, "-").concat(i) }, labelLine && Pie.renderLabelLineItem(labelLine, lineProps, "line"), Pie.renderLabelItem(label, labelProps, getValueByDataKey(entry, realDataKey)));
				});
				return /* @__PURE__ */ import_react.createElement(Layer, { className: "recharts-pie-labels" }, labels);
			}
		},
		{
			key: "renderSectorsStatically",
			value: function renderSectorsStatically(sectors) {
				var _this2 = this;
				var _this$props2 = this.props, activeShape = _this$props2.activeShape, blendStroke = _this$props2.blendStroke, inactiveShapeProp = _this$props2.inactiveShape;
				return sectors.map(function(entry, i) {
					if ((entry === null || entry === void 0 ? void 0 : entry.startAngle) === 0 && (entry === null || entry === void 0 ? void 0 : entry.endAngle) === 0 && sectors.length !== 1) return null;
					var isActive = _this2.isActiveIndex(i);
					var inactiveShape = inactiveShapeProp && _this2.hasActiveIndex() ? inactiveShapeProp : null;
					var sectorOptions = isActive ? activeShape : inactiveShape;
					var sectorProps = _objectSpread(_objectSpread({}, entry), {}, {
						stroke: blendStroke ? entry.fill : entry.stroke,
						tabIndex: -1
					});
					return /* @__PURE__ */ import_react.createElement(Layer, _extends({
						ref: function ref(_ref) {
							if (_ref && !_this2.sectorRefs.includes(_ref)) _this2.sectorRefs.push(_ref);
						},
						tabIndex: -1,
						className: "recharts-pie-sector"
					}, adaptEventsOfChild(_this2.props, entry, i), { key: "sector-".concat(entry === null || entry === void 0 ? void 0 : entry.startAngle, "-").concat(entry === null || entry === void 0 ? void 0 : entry.endAngle, "-").concat(entry.midAngle, "-").concat(i) }), /* @__PURE__ */ import_react.createElement(Shape, _extends({
						option: sectorOptions,
						isActive,
						shapeType: "sector"
					}, sectorProps)));
				});
			}
		},
		{
			key: "renderSectorsWithAnimation",
			value: function renderSectorsWithAnimation() {
				var _this3 = this;
				var _this$props3 = this.props, sectors = _this$props3.sectors, isAnimationActive = _this$props3.isAnimationActive, animationBegin = _this$props3.animationBegin, animationDuration = _this$props3.animationDuration, animationEasing = _this$props3.animationEasing, animationId = _this$props3.animationId;
				var _this$state = this.state, prevSectors = _this$state.prevSectors, prevIsAnimationActive = _this$state.prevIsAnimationActive;
				return /* @__PURE__ */ import_react.createElement(es6_default, {
					begin: animationBegin,
					duration: animationDuration,
					isActive: isAnimationActive,
					easing: animationEasing,
					from: { t: 0 },
					to: { t: 1 },
					key: "pie-".concat(animationId, "-").concat(prevIsAnimationActive),
					onAnimationStart: this.handleAnimationStart,
					onAnimationEnd: this.handleAnimationEnd
				}, function(_ref2) {
					var t = _ref2.t;
					var stepData = [];
					var curAngle = (sectors && sectors[0]).startAngle;
					sectors.forEach(function(entry, index) {
						var prev = prevSectors && prevSectors[index];
						var paddingAngle = index > 0 ? (0, import_get.default)(entry, "paddingAngle", 0) : 0;
						if (prev) {
							var angleIp = interpolateNumber(prev.endAngle - prev.startAngle, entry.endAngle - entry.startAngle);
							var latest = _objectSpread(_objectSpread({}, entry), {}, {
								startAngle: curAngle + paddingAngle,
								endAngle: curAngle + angleIp(t) + paddingAngle
							});
							stepData.push(latest);
							curAngle = latest.endAngle;
						} else {
							var endAngle = entry.endAngle, startAngle = entry.startAngle;
							var deltaAngle = interpolateNumber(0, endAngle - startAngle)(t);
							var _latest = _objectSpread(_objectSpread({}, entry), {}, {
								startAngle: curAngle + paddingAngle,
								endAngle: curAngle + deltaAngle + paddingAngle
							});
							stepData.push(_latest);
							curAngle = _latest.endAngle;
						}
					});
					return /* @__PURE__ */ import_react.createElement(Layer, null, _this3.renderSectorsStatically(stepData));
				});
			}
		},
		{
			key: "attachKeyboardHandlers",
			value: function attachKeyboardHandlers(pieRef) {
				var _this4 = this;
				pieRef.onkeydown = function(e) {
					if (!e.altKey) switch (e.key) {
						case "ArrowLeft":
							var next = ++_this4.state.sectorToFocus % _this4.sectorRefs.length;
							_this4.sectorRefs[next].focus();
							_this4.setState({ sectorToFocus: next });
							break;
						case "ArrowRight":
							var _next = --_this4.state.sectorToFocus < 0 ? _this4.sectorRefs.length - 1 : _this4.state.sectorToFocus % _this4.sectorRefs.length;
							_this4.sectorRefs[_next].focus();
							_this4.setState({ sectorToFocus: _next });
							break;
						case "Escape":
							_this4.sectorRefs[_this4.state.sectorToFocus].blur();
							_this4.setState({ sectorToFocus: 0 });
							break;
						default:
					}
				};
			}
		},
		{
			key: "renderSectors",
			value: function renderSectors() {
				var _this$props4 = this.props, sectors = _this$props4.sectors, isAnimationActive = _this$props4.isAnimationActive;
				var prevSectors = this.state.prevSectors;
				if (isAnimationActive && sectors && sectors.length && (!prevSectors || !(0, import_isEqual.default)(prevSectors, sectors))) return this.renderSectorsWithAnimation();
				return this.renderSectorsStatically(sectors);
			}
		},
		{
			key: "componentDidMount",
			value: function componentDidMount() {
				if (this.pieRef) this.attachKeyboardHandlers(this.pieRef);
			}
		},
		{
			key: "render",
			value: function render() {
				var _this5 = this;
				var _this$props5 = this.props, hide = _this$props5.hide, sectors = _this$props5.sectors, className = _this$props5.className, label = _this$props5.label, cx = _this$props5.cx, cy = _this$props5.cy, innerRadius = _this$props5.innerRadius, outerRadius = _this$props5.outerRadius, isAnimationActive = _this$props5.isAnimationActive;
				var isAnimationFinished = this.state.isAnimationFinished;
				if (hide || !sectors || !sectors.length || !isNumber(cx) || !isNumber(cy) || !isNumber(innerRadius) || !isNumber(outerRadius)) return null;
				var layerClass = clsx("recharts-pie", className);
				return /* @__PURE__ */ import_react.createElement(Layer, {
					tabIndex: this.props.rootTabIndex,
					className: layerClass,
					ref: function ref(_ref3) {
						_this5.pieRef = _ref3;
					}
				}, this.renderSectors(), label && this.renderLabels(sectors), Label.renderCallByParent(this.props, null, false), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, sectors, false));
			}
		}
	], [
		{
			key: "getDerivedStateFromProps",
			value: function getDerivedStateFromProps(nextProps, prevState) {
				if (prevState.prevIsAnimationActive !== nextProps.isAnimationActive) return {
					prevIsAnimationActive: nextProps.isAnimationActive,
					prevAnimationId: nextProps.animationId,
					curSectors: nextProps.sectors,
					prevSectors: [],
					isAnimationFinished: true
				};
				if (nextProps.isAnimationActive && nextProps.animationId !== prevState.prevAnimationId) return {
					prevAnimationId: nextProps.animationId,
					curSectors: nextProps.sectors,
					prevSectors: prevState.curSectors,
					isAnimationFinished: true
				};
				if (nextProps.sectors !== prevState.curSectors) return {
					curSectors: nextProps.sectors,
					isAnimationFinished: true
				};
				return null;
			}
		},
		{
			key: "getTextAnchor",
			value: function getTextAnchor(x, cx) {
				if (x > cx) return "start";
				if (x < cx) return "end";
				return "middle";
			}
		},
		{
			key: "renderLabelLineItem",
			value: function renderLabelLineItem(option, props, key) {
				if (/* @__PURE__ */ import_react.isValidElement(option)) return /* @__PURE__ */ import_react.cloneElement(option, props);
				if ((0, import_isFunction.default)(option)) return option(props);
				var className = clsx("recharts-pie-label-line", typeof option !== "boolean" ? option.className : "");
				return /* @__PURE__ */ import_react.createElement(Curve, _extends({}, props, {
					key,
					type: "linear",
					className
				}));
			}
		},
		{
			key: "renderLabelItem",
			value: function renderLabelItem(option, props, value) {
				if (/* @__PURE__ */ import_react.isValidElement(option)) return /* @__PURE__ */ import_react.cloneElement(option, props);
				var label = value;
				if ((0, import_isFunction.default)(option)) {
					label = option(props);
					if (/* @__PURE__ */ import_react.isValidElement(label)) return label;
				}
				var className = clsx("recharts-pie-label-text", typeof option !== "boolean" && !(0, import_isFunction.default)(option) ? option.className : "");
				return /* @__PURE__ */ import_react.createElement(Text, _extends({}, props, {
					alignmentBaseline: "middle",
					className
				}), label);
			}
		}
	]);
}(import_react.PureComponent);
_Pie = Pie;
_defineProperty(Pie, "displayName", "Pie");
_defineProperty(Pie, "defaultProps", {
	stroke: "#fff",
	fill: "#808080",
	legendType: "rect",
	cx: "50%",
	cy: "50%",
	startAngle: 0,
	endAngle: 360,
	innerRadius: 0,
	outerRadius: "80%",
	paddingAngle: 0,
	labelLine: true,
	hide: false,
	minAngle: 0,
	isAnimationActive: !Global.isSsr,
	animationBegin: 400,
	animationDuration: 1500,
	animationEasing: "ease",
	nameKey: "name",
	blendStroke: false,
	rootTabIndex: 0
});
_defineProperty(Pie, "parseDeltaAngle", function(startAngle, endAngle) {
	return mathSign(endAngle - startAngle) * Math.min(Math.abs(endAngle - startAngle), 360);
});
_defineProperty(Pie, "getRealPieData", function(itemProps) {
	var data = itemProps.data, children = itemProps.children;
	var presentationProps = filterProps(itemProps, false);
	var cells = findAllByType(children, Cell);
	if (data && data.length) return data.map(function(entry, index) {
		return _objectSpread(_objectSpread(_objectSpread({ payload: entry }, presentationProps), entry), cells && cells[index] && cells[index].props);
	});
	if (cells && cells.length) return cells.map(function(cell) {
		return _objectSpread(_objectSpread({}, presentationProps), cell.props);
	});
	return [];
});
_defineProperty(Pie, "parseCoordinateOfPie", function(itemProps, offset) {
	var top = offset.top, left = offset.left, width = offset.width, height = offset.height;
	var maxPieRadius = getMaxRadius(width, height);
	return {
		cx: left + getPercentValue(itemProps.cx, width, width / 2),
		cy: top + getPercentValue(itemProps.cy, height, height / 2),
		innerRadius: getPercentValue(itemProps.innerRadius, maxPieRadius, 0),
		outerRadius: getPercentValue(itemProps.outerRadius, maxPieRadius, maxPieRadius * .8),
		maxRadius: itemProps.maxRadius || Math.sqrt(width * width + height * height) / 2
	};
});
_defineProperty(Pie, "getComposedData", function(_ref4) {
	var item = _ref4.item, offset = _ref4.offset;
	var itemProps = item.type.defaultProps !== void 0 ? _objectSpread(_objectSpread({}, item.type.defaultProps), item.props) : item.props;
	var pieData = _Pie.getRealPieData(itemProps);
	if (!pieData || !pieData.length) return null;
	var cornerRadius = itemProps.cornerRadius, startAngle = itemProps.startAngle, endAngle = itemProps.endAngle, paddingAngle = itemProps.paddingAngle, dataKey = itemProps.dataKey, nameKey = itemProps.nameKey, valueKey = itemProps.valueKey, tooltipType = itemProps.tooltipType;
	var minAngle = Math.abs(itemProps.minAngle);
	var coordinate = _Pie.parseCoordinateOfPie(itemProps, offset);
	var deltaAngle = _Pie.parseDeltaAngle(startAngle, endAngle);
	var absDeltaAngle = Math.abs(deltaAngle);
	var realDataKey = dataKey;
	if ((0, import_isNil.default)(dataKey) && (0, import_isNil.default)(valueKey)) {
		warn(false, "Use \"dataKey\" to specify the value of pie,\n      the props \"valueKey\" will be deprecated in 1.1.0");
		realDataKey = "value";
	} else if ((0, import_isNil.default)(dataKey)) {
		warn(false, "Use \"dataKey\" to specify the value of pie,\n      the props \"valueKey\" will be deprecated in 1.1.0");
		realDataKey = valueKey;
	}
	var notZeroItemCount = pieData.filter(function(entry) {
		return getValueByDataKey(entry, realDataKey, 0) !== 0;
	}).length;
	var totalPadingAngle = (absDeltaAngle >= 360 ? notZeroItemCount : notZeroItemCount - 1) * paddingAngle;
	var realTotalAngle = absDeltaAngle - notZeroItemCount * minAngle - totalPadingAngle;
	var sum = pieData.reduce(function(result, entry) {
		var val = getValueByDataKey(entry, realDataKey, 0);
		return result + (isNumber(val) ? val : 0);
	}, 0);
	var sectors;
	if (sum > 0) {
		var prev;
		sectors = pieData.map(function(entry, i) {
			var val = getValueByDataKey(entry, realDataKey, 0);
			var name = getValueByDataKey(entry, nameKey, i);
			var percent = (isNumber(val) ? val : 0) / sum;
			var tempStartAngle;
			if (i) tempStartAngle = prev.endAngle + mathSign(deltaAngle) * paddingAngle * (val !== 0 ? 1 : 0);
			else tempStartAngle = startAngle;
			var tempEndAngle = tempStartAngle + mathSign(deltaAngle) * ((val !== 0 ? minAngle : 0) + percent * realTotalAngle);
			var midAngle = (tempStartAngle + tempEndAngle) / 2;
			var middleRadius = (coordinate.innerRadius + coordinate.outerRadius) / 2;
			prev = _objectSpread(_objectSpread(_objectSpread({
				percent,
				cornerRadius,
				name,
				tooltipPayload: [{
					name,
					value: val,
					payload: entry,
					dataKey: realDataKey,
					type: tooltipType
				}],
				midAngle,
				middleRadius,
				tooltipPosition: polarToCartesian(coordinate.cx, coordinate.cy, middleRadius, midAngle)
			}, entry), coordinate), {}, {
				value: getValueByDataKey(entry, realDataKey),
				startAngle: tempStartAngle,
				endAngle: tempEndAngle,
				payload: entry,
				paddingAngle: mathSign(deltaAngle) * paddingAngle
			});
			return prev;
		});
	}
	return _objectSpread(_objectSpread({}, coordinate), {}, {
		sectors,
		data: pieData
	});
});
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/recharts@2.15.4_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/recharts/es6/chart/PieChart.js
/**
* @fileOverview Pie Chart
*/
var PieChart = generateCategoricalChart({
	chartName: "PieChart",
	GraphicalChild: Pie,
	validateTooltipEventTypes: ["item"],
	defaultTooltipEventType: "item",
	legendContent: "children",
	axisComponents: [{
		axisType: "angleAxis",
		AxisComp: PolarAngleAxis
	}, {
		axisType: "radiusAxis",
		AxisComp: PolarRadiusAxis
	}],
	formatAxisMap,
	defaultProps: {
		layout: "centric",
		startAngle: 0,
		endAngle: 360,
		cx: "50%",
		cy: "50%",
		innerRadius: 0,
		outerRadius: "80%"
	}
});
//#endregion
//#region src/components/ui/textarea.tsx
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		"data-uid": "src/components/ui/textarea.tsx:9:7",
		"data-prohibitions": "[editContent]",
		className: cn("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
//#endregion
//#region src/lib/srs.ts
/**
* Calculates the next review date and updated SRS parameters using the SM-2 algorithm.
* @param item Current SRS data of the flashcard
* @param grade Integer from 0 to 5 indicating the quality of the recall response
* 0 - Total blackout
* 1 - Incorrect response, but remembered the correct one upon seeing it
* 2 - Incorrect response, but it seemed easy to recall
* 3 - Correct response recalled with serious difficulty
* 4 - Correct response recalled after a hesitation
* 5 - Perfect response
*/
function calculateNextReview(item, grade) {
	let { interval, repetition, easeFactor } = item;
	grade = Math.max(0, Math.min(5, Math.round(grade)));
	if (grade >= 3) {
		if (repetition === 0) interval = 1;
		else if (repetition === 1) interval = 6;
		else interval = Math.round(interval * easeFactor);
		repetition += 1;
	} else {
		repetition = 0;
		interval = 1;
	}
	easeFactor = easeFactor + (.1 - (5 - grade) * (.08 + (5 - grade) * .02));
	if (easeFactor < 1.3) easeFactor = 1.3;
	const nextReviewDate = /* @__PURE__ */ new Date();
	nextReviewDate.setDate(nextReviewDate.getDate() + interval);
	return {
		interval,
		repetition,
		easeFactor,
		nextReviewDate
	};
}
//#endregion
//#region src/services/study.ts
var studyService = {
	async getDecks() {
		try {
			const { data: { user } } = await supabase.auth.getUser();
			if (!user) return {
				data: [],
				error: /* @__PURE__ */ new Error("Not authenticated")
			};
			const { data, error } = await supabase.from("study_decks").select("*").eq("user_id", user.id).order("updated_at", { ascending: false });
			if (error) throw error;
			return {
				data,
				error: null
			};
		} catch (error) {
			console.error("Error fetching study decks:", error);
			return {
				data: [],
				error
			};
		}
	},
	async createDeck(title, description) {
		try {
			const { data: { user } } = await supabase.auth.getUser();
			if (!user) return {
				data: null,
				error: /* @__PURE__ */ new Error("Not authenticated")
			};
			const deckData = {
				title,
				description: description || null,
				user_id: user.id
			};
			const { data, error } = await supabase.from("study_decks").insert([deckData]).select().single();
			if (error) throw error;
			return {
				data,
				error: null
			};
		} catch (error) {
			console.error("Error creating study deck:", error);
			return {
				data: null,
				error
			};
		}
	},
	async getDueFlashcards(deckId) {
		try {
			const { data: { user } } = await supabase.auth.getUser();
			if (!user) return {
				data: [],
				error: /* @__PURE__ */ new Error("Not authenticated")
			};
			const now = (/* @__PURE__ */ new Date()).toISOString();
			const { data, error } = await supabase.from("study_flashcards").select("*").eq("deck_id", deckId).or(`next_review_date.lte.${now},next_review_date.is.null`).order("next_review_date", { ascending: true });
			if (error) throw error;
			return {
				data,
				error: null
			};
		} catch (error) {
			console.error("Error fetching due flashcards:", error);
			return {
				data: [],
				error
			};
		}
	},
	async processCardReview(cardId, grade, currentData) {
		try {
			const { data: { user } } = await supabase.auth.getUser();
			if (!user) return {
				data: null,
				error: /* @__PURE__ */ new Error("Not authenticated")
			};
			const nextReview = calculateNextReview(currentData, grade);
			const { data, error } = await supabase.from("study_flashcards").update({
				interval: nextReview.interval,
				repetition: nextReview.repetition,
				ease_factor: nextReview.easeFactor,
				next_review_date: nextReview.nextReviewDate.toISOString()
			}).eq("id", cardId).select().single();
			if (error) throw error;
			return {
				data,
				error: null
			};
		} catch (error) {
			console.error("Error processing card review:", error);
			return {
				data: null,
				error
			};
		}
	},
	async getNotes() {
		try {
			const { data: { user } } = await supabase.auth.getUser();
			if (!user) return {
				data: [],
				error: /* @__PURE__ */ new Error("Not authenticated")
			};
			const { data, error } = await supabase.from("study_notes").select("*").eq("user_id", user.id).order("updated_at", { ascending: false });
			if (error) throw error;
			return {
				data,
				error: null
			};
		} catch (error) {
			console.error("Error fetching notes:", error);
			return {
				data: [],
				error
			};
		}
	},
	async saveNote(id, title, content) {
		try {
			const { data: { user } } = await supabase.auth.getUser();
			if (!user) return {
				data: null,
				error: /* @__PURE__ */ new Error("Not authenticated")
			};
			const noteData = {
				title,
				content,
				user_id: user.id,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			let result;
			if (id) result = await supabase.from("study_notes").update(noteData).eq("id", id).eq("user_id", user.id).select().single();
			else result = await supabase.from("study_notes").insert([noteData]).select().single();
			if (result.error) throw result.error;
			return {
				data: result.data,
				error: null
			};
		} catch (error) {
			console.error("Error saving note:", error);
			return {
				data: null,
				error
			};
		}
	}
};
//#endregion
//#region src/pages/client/components/SecondBrainPanel.tsx
function SecondBrainPanel() {
	const [notes, setNotes] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [activeNoteId, setActiveNoteId] = (0, import_react.useState)(null);
	const [editorTitle, setEditorTitle] = (0, import_react.useState)("");
	const [editorContent, setEditorContent] = (0, import_react.useState)("");
	const { toast } = useToast();
	const fetchNotes = async () => {
		setIsLoading(true);
		const { data, error } = await studyService.getNotes();
		if (error) toast({
			title: "Erro ao carregar notas",
			description: error.message,
			variant: "destructive"
		});
		else if (data) setNotes(data);
		setIsLoading(false);
	};
	(0, import_react.useEffect)(() => {
		fetchNotes();
	}, []);
	const handleSelectNote = (note) => {
		setActiveNoteId(note.id);
		setEditorTitle(note.title);
		setEditorContent(note.content);
	};
	const handleNewNote = () => {
		setActiveNoteId(null);
		setEditorTitle("");
		setEditorContent("");
	};
	const handleSaveNote = async () => {
		if (!editorTitle.trim()) {
			toast({
				title: "Título obrigatório",
				description: "Por favor, insira um título para a nota.",
				variant: "destructive"
			});
			return;
		}
		setIsSaving(true);
		const { data, error } = await studyService.saveNote(activeNoteId, editorTitle, editorContent);
		setIsSaving(false);
		if (error) toast({
			title: "Erro ao salvar nota",
			description: error.message,
			variant: "destructive"
		});
		else if (data) {
			toast({
				title: "Nota salva",
				description: "Sua nota foi salva com sucesso."
			});
			setActiveNoteId(data.id);
			fetchNotes();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:82:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col h-full bg-background relative z-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:83:7",
			"data-prohibitions": "[]",
			className: "flex items-center justify-between px-4 py-3 border-b bg-muted/20 shrink-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:84:9",
				"data-prohibitions": "[]",
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, {
					"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:85:11",
					"data-prohibitions": "[editContent]",
					className: "h-5 w-5 text-primary"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:86:11",
					"data-prohibitions": "[]",
					className: "font-semibold text-sm",
					children: "Segundo Cérebro"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:88:9",
				"data-prohibitions": "[]",
				variant: "outline",
				size: "sm",
				className: "h-8 gap-2 bg-background shadow-sm hover:bg-muted/50",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, {
						"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:93:11",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4 text-muted-foreground"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:94:11",
						"data-prohibitions": "[]",
						className: "hidden xl:inline",
						children: "Ver Grafo de Conhecimento"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:95:11",
						"data-prohibitions": "[]",
						className: "xl:hidden",
						children: "Grafo"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:99:7",
			"data-prohibitions": "[editContent]",
			className: "flex flex-1 min-h-0 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:101:9",
				"data-prohibitions": "[editContent]",
				className: "w-16 sm:w-56 lg:w-64 border-r bg-muted/5 flex flex-col shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:102:11",
					"data-prohibitions": "[]",
					className: "p-3 border-b flex flex-col gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:103:13",
							"data-prohibitions": "[]",
							className: "relative hidden sm:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:104:15",
								"data-prohibitions": "[editContent]",
								className: "absolute left-2 top-2 h-4 w-4 text-muted-foreground"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:105:15",
								"data-prohibitions": "[editContent]",
								className: "h-8 pl-8 text-xs bg-background",
								placeholder: "Buscar notas..."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:107:13",
							"data-prohibitions": "[]",
							className: "sm:hidden flex justify-center pb-2 border-b mb-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:108:15",
								"data-prohibitions": "[editContent]",
								className: "h-5 w-5 text-muted-foreground"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:111:13",
							"data-prohibitions": "[]",
							variant: "default",
							size: "sm",
							className: "h-8 w-full gap-2 text-xs",
							onClick: handleNewNote,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
								"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:117:15",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:118:15",
								"data-prohibitions": "[]",
								className: "hidden sm:inline",
								children: "Nova Nota"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:122:11",
					"data-prohibitions": "[editContent]",
					className: "flex-1 overflow-y-auto p-2 space-y-1",
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:125:17",
							"data-prohibitions": "[editContent]",
							className: "h-9 w-full rounded-md"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:126:17",
							"data-prohibitions": "[editContent]",
							className: "h-9 w-full rounded-md"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:127:17",
							"data-prohibitions": "[editContent]",
							className: "h-9 w-full rounded-md"
						})
					] }) : notes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:130:15",
						"data-prohibitions": "[]",
						className: "text-xs text-center text-muted-foreground py-4 hidden sm:block",
						children: "Nenhuma nota."
					}) : notes.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:135:17",
						"data-prohibitions": "[editContent]",
						onClick: () => handleSelectNote(note),
						className: cn("w-full flex items-center justify-center sm:justify-start gap-3 px-2 py-2 text-sm rounded-md transition-colors", activeNoteId === note.id ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-muted-foreground group"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
							"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:145:19",
							"data-prohibitions": "[editContent]",
							className: cn("h-4 w-4 shrink-0 transition-colors", activeNoteId !== note.id && "group-hover:text-foreground")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:151:19",
							"data-prohibitions": "[editContent]",
							className: "hidden sm:inline truncate text-left",
							children: note.title
						})]
					}, note.id))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:159:9",
				"data-prohibitions": "[editContent]",
				className: "flex-1 bg-background overflow-y-auto relative flex flex-col",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:160:11",
					"data-prohibitions": "[editContent]",
					className: "flex-1 p-4 lg:p-8 flex flex-col max-w-4xl mx-auto w-full gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:161:13",
						"data-prohibitions": "[editContent]",
						className: "flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:162:15",
							"data-prohibitions": "[editContent]",
							value: editorTitle,
							onChange: (e) => setEditorTitle(e.target.value),
							placeholder: "Título da nota...",
							className: "text-2xl lg:text-3xl font-bold border-none px-0 focus-visible:ring-0 h-auto bg-transparent"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:168:15",
							"data-prohibitions": "[editContent]",
							onClick: handleSaveNote,
							disabled: isSaving,
							size: "sm",
							className: "gap-2 shrink-0",
							children: [isSaving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:175:19",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 animate-spin"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
								"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:177:19",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:179:17",
								"data-prohibitions": "[]",
								className: "hidden sm:inline",
								children: "Guardar Nota"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						"data-uid": "src/pages/client/components/SecondBrainPanel.tsx:183:13",
						"data-prohibitions": "[editContent]",
						value: editorContent,
						onChange: (e) => setEditorContent(e.target.value),
						placeholder: "Comece a escrever sua nota aqui...",
						className: "flex-1 resize-none border-none px-0 focus-visible:ring-0 bg-transparent text-base lg:text-lg leading-relaxed text-muted-foreground focus:text-foreground transition-colors"
					})]
				})
			})]
		})]
	});
}
//#endregion
//#region src/pages/client/components/FlashcardsPanel.tsx
function FlashcardsPanel({ data }) {
	const { toast } = useToast();
	const [localDecks, setLocalDecks] = (0, import_react.useState)([]);
	const [isDialogOpen, setIsDialogOpen] = (0, import_react.useState)(false);
	const [newDeckTitle, setNewDeckTitle] = (0, import_react.useState)("");
	const [isCreating, setIsCreating] = (0, import_react.useState)(false);
	const { decks: initialDecks, loadingDecks, isReviewing, currentDeck, flashcards, loadingCards, currentIndex, showAnswer, setShowAnswer, startReview, handleGrade, endReview } = data;
	(0, import_react.useEffect)(() => {
		setLocalDecks(initialDecks);
	}, [initialDecks]);
	const refreshDecks = async () => {
		const { data: refreshedDecks } = await studyService.getDecks();
		if (refreshedDecks) setLocalDecks(refreshedDecks);
	};
	const handleCreateDeck = async () => {
		if (!newDeckTitle.trim()) {
			toast({
				title: "Título obrigatório",
				description: "Por favor, informe um título para o baralho.",
				variant: "destructive"
			});
			return;
		}
		setIsCreating(true);
		const { data: newDeck, error } = await studyService.createDeck(newDeckTitle.trim());
		setIsCreating(false);
		if (error || !newDeck) {
			toast({
				title: "Erro ao criar baralho",
				description: error?.message || "Você precisa estar logado ou ocorreu um erro.",
				variant: "destructive"
			});
			return;
		}
		toast({
			title: "Baralho criado!",
			description: "Seu novo baralho foi criado com sucesso."
		});
		setNewDeckTitle("");
		setIsDialogOpen(false);
		await refreshDecks();
	};
	if (isReviewing) {
		if (loadingCards) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:90:9",
			"data-prohibitions": "[]",
			className: "flex flex-col h-full bg-muted/10 p-6 space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:91:11",
				"data-prohibitions": "[editContent]",
				className: "h-8 w-1/3"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:92:11",
				"data-prohibitions": "[editContent]",
				className: "h-[300px] w-full"
			})]
		});
		if (flashcards.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:99:9",
			"data-prohibitions": "[]",
			className: "flex flex-col h-full items-center justify-center p-6 bg-muted/10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, {
					"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:100:11",
					"data-prohibitions": "[editContent]",
					className: "h-12 w-12 text-muted-foreground mb-4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:101:11",
					"data-prohibitions": "[]",
					className: "text-lg font-medium",
					children: "Você está em dia!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:102:11",
					"data-prohibitions": "[]",
					className: "text-muted-foreground mb-6 text-center",
					children: "Nenhum flashcard pendente."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:103:11",
					"data-prohibitions": "[]",
					onClick: endReview,
					children: "Voltar aos Baralhos"
				})
			]
		});
		const card = flashcards[currentIndex];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:111:7",
			"data-prohibitions": "[editContent]",
			className: "flex flex-col h-full bg-muted/10 animate-fade-in-up",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:112:9",
				"data-prohibitions": "[editContent]",
				className: "flex items-center justify-between px-4 py-3 border-b bg-background/50 backdrop-blur-sm shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:113:11",
					"data-prohibitions": "[editContent]",
					className: "font-semibold text-sm truncate pr-4",
					children: currentDeck?.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:114:11",
					"data-prohibitions": "[editContent]",
					className: "text-xs text-muted-foreground font-medium bg-muted px-2 py-1 rounded-md",
					children: [
						currentIndex + 1,
						" / ",
						flashcards.length
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:118:9",
				"data-prohibitions": "[editContent]",
				className: "flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:119:11",
					"data-prohibitions": "[editContent]",
					className: "w-full max-w-lg min-h-[350px] flex flex-col p-6 sm:p-8 shadow-md relative overflow-hidden bg-background/80 backdrop-blur-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:120:13",
						"data-prohibitions": "[editContent]",
						className: "flex-1 flex flex-col items-center justify-center text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:121:15",
							"data-prohibitions": "[editContent]",
							className: "text-xl sm:text-2xl font-medium leading-relaxed",
							children: card.front_content
						}), showAnswer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:126:19",
							"data-prohibitions": "[editContent]",
							className: "w-full h-px bg-border my-6 sm:my-8"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:127:19",
							"data-prohibitions": "[editContent]",
							className: "text-lg sm:text-xl text-muted-foreground animate-fade-in-up leading-relaxed",
							children: card.back_content
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:133:13",
						"data-prohibitions": "[editContent]",
						className: "mt-8 pt-4 w-full shrink-0",
						children: !showAnswer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:135:17",
							"data-prohibitions": "[]",
							onClick: () => setShowAnswer(true),
							className: "w-full h-12 text-base font-semibold",
							children: "Revelar Resposta"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:142:17",
							"data-prohibitions": "[]",
							className: "grid grid-cols-2 sm:grid-cols-4 gap-2 w-full animate-fade-in",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:143:19",
									"data-prohibitions": "[]",
									variant: "destructive",
									className: "h-12",
									onClick: () => handleGrade(1),
									children: "Errei"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:146:19",
									"data-prohibitions": "[]",
									className: "bg-orange-500 hover:bg-orange-600 text-white h-12",
									onClick: () => handleGrade(3),
									children: "Difícil"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:152:19",
									"data-prohibitions": "[]",
									className: "bg-green-500 hover:bg-green-600 text-white h-12",
									onClick: () => handleGrade(4),
									children: "Bom"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:158:19",
									"data-prohibitions": "[]",
									className: "bg-blue-500 hover:bg-blue-600 text-white h-12",
									onClick: () => handleGrade(5),
									children: "Fácil"
								})
							]
						})
					})]
				})
			})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:174:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col h-full bg-muted/10 relative z-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:175:7",
				"data-prohibitions": "[]",
				className: "flex items-center justify-between px-4 py-3 border-b bg-background/50 backdrop-blur-sm shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:176:9",
					"data-prohibitions": "[]",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, {
						"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:177:11",
						"data-prohibitions": "[editContent]",
						className: "h-5 w-5 text-amber-500"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:178:11",
						"data-prohibitions": "[]",
						className: "font-semibold text-sm",
						children: "Flashcards (SRS)"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:180:9",
					"data-prohibitions": "[]",
					size: "sm",
					variant: "outline",
					className: "gap-2",
					onClick: () => setIsDialogOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:181:11",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4"
					}), "Novo Baralho"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:185:7",
				"data-prohibitions": "[editContent]",
				className: "flex-1 overflow-y-auto p-4 lg:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:186:9",
					"data-prohibitions": "[]",
					className: "text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider",
					children: "Meus Baralhos Ativos"
				}), loadingDecks ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:191:11",
					"data-prohibitions": "[]",
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:192:13",
						"data-prohibitions": "[editContent]",
						className: "h-32 w-full rounded-xl"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:193:13",
						"data-prohibitions": "[editContent]",
						className: "h-32 w-full rounded-xl"
					})]
				}) : localDecks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:196:11",
					"data-prohibitions": "[]",
					className: "border-dashed bg-transparent shadow-none flex flex-col items-center justify-center p-8 text-center mt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:197:13",
							"data-prohibitions": "[]",
							className: "h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, {
								"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:198:15",
								"data-prohibitions": "[editContent]",
								className: "h-6 w-6 text-muted-foreground"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:200:13",
							"data-prohibitions": "[]",
							className: "text-lg font-medium mb-2",
							children: "Nenhum baralho encontrado"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:201:13",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground mb-6 max-w-xs",
							children: "Você ainda não possui baralhos. Crie um novo para começar a revisar."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:204:13",
							"data-prohibitions": "[]",
							variant: "outline",
							className: "gap-2",
							onClick: () => setIsDialogOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, {
								"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:205:15",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4"
							}), "Criar Novo Baralho"]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:210:11",
					"data-prohibitions": "[editContent]",
					className: "space-y-4",
					children: localDecks.map((deck) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:212:15",
						"data-prohibitions": "[editContent]",
						className: "bg-background/60 backdrop-blur-xl border-border/50 shadow-sm hover:shadow-md hover:bg-background/80 transition-all duration-300 relative overflow-hidden group",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:216:17",
								"data-prohibitions": "[]",
								className: "absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:217:17",
								"data-prohibitions": "[editContent]",
								className: "pb-4 relative z-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:218:19",
									"data-prohibitions": "[editContent]",
									className: "text-xl mb-1.5",
									children: deck.title
								}), deck.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
									"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:219:40",
									"data-prohibitions": "[editContent]",
									children: deck.description
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:221:17",
								"data-prohibitions": "[]",
								className: "relative z-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:222:19",
									"data-prohibitions": "[]",
									size: "lg",
									className: "w-full gap-2 rounded-xl h-12 font-medium text-base shadow-sm",
									onClick: () => startReview(deck),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
										"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:227:21",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-4 fill-current"
									}), "Estudar Agora"]
								})
							})
						]
					}, deck.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:237:7",
				"data-prohibitions": "[editContent]",
				open: isDialogOpen,
				onOpenChange: setIsDialogOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:238:9",
					"data-prohibitions": "[editContent]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
							"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:239:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:240:13",
								"data-prohibitions": "[]",
								children: "Criar Novo Baralho"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:242:11",
							"data-prohibitions": "[]",
							className: "py-4 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
								"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:243:13",
								"data-prohibitions": "[]",
								htmlFor: "deck-title",
								children: "Título do Baralho"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:244:13",
								"data-prohibitions": "[editContent]",
								id: "deck-title",
								placeholder: "Ex: Anatomia Básica",
								value: newDeckTitle,
								onChange: (e) => setNewDeckTitle(e.target.value),
								onKeyDown: (e) => e.key === "Enter" && handleCreateDeck()
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:252:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:253:13",
								"data-prohibitions": "[]",
								variant: "outline",
								onClick: () => setIsDialogOpen(false),
								disabled: isCreating,
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/client/components/FlashcardsPanel.tsx:256:13",
								"data-prohibitions": "[editContent]",
								onClick: handleCreateDeck,
								disabled: isCreating,
								children: isCreating ? "Criando..." : "Criar Baralho"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/pages/client/components/StudyDashboardPanel.tsx
var barData = [
	{
		day: "Seg",
		cards: 12
	},
	{
		day: "Ter",
		cards: 25
	},
	{
		day: "Qua",
		cards: 15
	},
	{
		day: "Qui",
		cards: 30
	},
	{
		day: "Sex",
		cards: 22
	},
	{
		day: "Sáb",
		cards: 10
	},
	{
		day: "Dom",
		cards: 45
	}
];
var pieData = [
	{
		category: "Fisiologia",
		value: 40,
		fill: "hsl(var(--primary))"
	},
	{
		category: "Anatomia",
		value: 30,
		fill: "hsl(var(--chart-2, 173 58% 39%))"
	},
	{
		category: "Leituras",
		value: 30,
		fill: "hsl(var(--chart-3, 197 37% 24%))"
	}
];
var barChartConfig = { cards: {
	label: "Revisões",
	color: "hsl(var(--primary))"
} };
var pieChartConfig = {
	Fisiologia: {
		label: "Fisiologia",
		color: "hsl(var(--primary))"
	},
	Anatomia: {
		label: "Anatomia",
		color: "hsl(var(--chart-2, 173 58% 39%))"
	},
	Leituras: {
		label: "Leituras",
		color: "hsl(var(--chart-3, 197 37% 24%))"
	}
};
function StudyDashboardPanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:53:5",
		"data-prohibitions": "[editContent]",
		className: "flex-1 overflow-y-auto p-4 md:p-6 space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:54:7",
			"data-prohibitions": "[]",
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:55:9",
					"data-prohibitions": "[]",
					className: "bg-background/60 backdrop-blur-xl border-border/50 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:56:11",
						"data-prohibitions": "[]",
						className: "flex flex-row items-center justify-between pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:57:13",
							"data-prohibitions": "[]",
							className: "text-sm font-medium text-muted-foreground",
							children: "Cartões para Revisar Hoje"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, {
							"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:60:13",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4 text-primary"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:62:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:63:13",
							"data-prohibitions": "[]",
							className: "text-2xl font-bold",
							children: "15"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:64:13",
							"data-prohibitions": "[]",
							className: "text-xs text-muted-foreground mt-1",
							children: "5 a mais que ontem"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:68:9",
					"data-prohibitions": "[]",
					className: "bg-background/60 backdrop-blur-xl border-border/50 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:69:11",
						"data-prohibitions": "[]",
						className: "flex flex-row items-center justify-between pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:70:13",
							"data-prohibitions": "[]",
							className: "text-sm font-medium text-muted-foreground",
							children: "Total de Notas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
							"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:73:13",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4 text-primary"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:75:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:76:13",
							"data-prohibitions": "[]",
							className: "text-2xl font-bold",
							children: "42"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:77:13",
							"data-prohibitions": "[]",
							className: "text-xs text-muted-foreground mt-1",
							children: "Segundo cérebro crescendo"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:81:9",
					"data-prohibitions": "[]",
					className: "bg-background/60 backdrop-blur-xl border-border/50 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:82:11",
						"data-prohibitions": "[]",
						className: "flex flex-row items-center justify-between pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:83:13",
							"data-prohibitions": "[]",
							className: "text-sm font-medium text-muted-foreground",
							children: "Taxa de Retenção"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {
							"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:86:13",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4 text-primary"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:88:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:89:13",
							"data-prohibitions": "[]",
							className: "text-2xl font-bold",
							children: "89%"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:90:13",
							"data-prohibitions": "[]",
							className: "text-xs text-muted-foreground mt-1",
							children: "Acima da média geral"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:94:9",
					"data-prohibitions": "[]",
					className: "bg-background/60 backdrop-blur-xl border-border/50 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:95:11",
						"data-prohibitions": "[]",
						className: "flex flex-row items-center justify-between pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:96:13",
							"data-prohibitions": "[]",
							className: "text-sm font-medium text-muted-foreground",
							children: "Ofensiva de Estudos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
							"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:99:13",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4 text-orange-500"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:101:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:102:13",
							"data-prohibitions": "[]",
							className: "text-2xl font-bold",
							children: "7 dias"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:103:13",
							"data-prohibitions": "[]",
							className: "text-xs text-muted-foreground mt-1",
							children: "Continue o bom trabalho!"
						})]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:108:7",
			"data-prohibitions": "[editContent]",
			className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:109:9",
				"data-prohibitions": "[]",
				className: "bg-background/60 backdrop-blur-xl border-border/50 shadow-sm flex flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:110:11",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:111:13",
						"data-prohibitions": "[]",
						className: "text-lg font-semibold",
						children: "Revisões nos últimos 7 dias"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:113:11",
					"data-prohibitions": "[]",
					className: "flex-1 pb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
						"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:114:13",
						"data-prohibitions": "[]",
						config: barChartConfig,
						className: "h-full min-h-[250px] w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:115:15",
							"data-prohibitions": "[]",
							accessibilityLayer: true,
							data: barData,
							margin: {
								top: 10,
								right: 10,
								left: -20,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:120:17",
									"data-prohibitions": "[editContent]",
									vertical: false,
									strokeDasharray: "3 3",
									className: "stroke-muted"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:121:17",
									"data-prohibitions": "[editContent]",
									dataKey: "day",
									tickLine: false,
									axisLine: false,
									tickMargin: 10,
									fontSize: 12
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:128:17",
									"data-prohibitions": "[editContent]",
									tickLine: false,
									axisLine: false,
									tickMargin: 10,
									fontSize: 12,
									tickFormatter: (value) => `${value}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
									"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:135:17",
									"data-prohibitions": "[editContent]",
									cursor: false,
									content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
										"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:135:55",
										"data-prohibitions": "[editContent]",
										indicator: "dashed"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:136:17",
									"data-prohibitions": "[editContent]",
									dataKey: "cards",
									fill: "var(--color-cards)",
									radius: [
										4,
										4,
										0,
										0
									]
								})
							]
						})
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:142:9",
				"data-prohibitions": "[editContent]",
				className: "bg-background/60 backdrop-blur-xl border-border/50 shadow-sm flex flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:143:11",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:144:13",
						"data-prohibitions": "[]",
						className: "text-lg font-semibold",
						children: "Distribuição do Segundo Cérebro"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:146:11",
					"data-prohibitions": "[editContent]",
					className: "flex-1 pb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
						"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:147:13",
						"data-prohibitions": "[editContent]",
						config: pieChartConfig,
						className: "h-full min-h-[250px] w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, {
							"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:148:15",
							"data-prohibitions": "[editContent]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
									"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:149:17",
									"data-prohibitions": "[editContent]",
									content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
										"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:149:40",
										"data-prohibitions": "[editContent]",
										hideLabel: true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:150:17",
									"data-prohibitions": "[editContent]",
									data: pieData,
									dataKey: "value",
									nameKey: "category",
									innerRadius: 60,
									outerRadius: 80,
									strokeWidth: 2,
									stroke: "hsl(var(--background))",
									paddingAngle: 5,
									children: pieData.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
										"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:161:21",
										"data-prohibitions": "[editContent]",
										fill: entry.fill
									}, `cell-${index}`))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, {
									"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:164:17",
									"data-prohibitions": "[editContent]",
									content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegendContent, {
										"data-uid": "src/pages/client/components/StudyDashboardPanel.tsx:165:28",
										"data-prohibitions": "[editContent]",
										nameKey: "category"
									}),
									className: "flex-wrap justify-center mt-4"
								})
							]
						})
					})
				})]
			})]
		})]
	});
}
//#endregion
//#region src/hooks/use-flashcards.ts
function useFlashcards() {
	const { user, isLoading } = useAuth();
	const [decks, setDecks] = (0, import_react.useState)([]);
	const [loadingDecks, setLoadingDecks] = (0, import_react.useState)(true);
	const [isReviewing, setIsReviewing] = (0, import_react.useState)(false);
	const [currentDeck, setCurrentDeck] = (0, import_react.useState)(null);
	const [flashcards, setFlashcards] = (0, import_react.useState)([]);
	const [loadingCards, setLoadingCards] = (0, import_react.useState)(false);
	const [currentIndex, setCurrentIndex] = (0, import_react.useState)(0);
	const [showAnswer, setShowAnswer] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isLoading) return;
		if (!user) {
			setLoadingDecks(false);
			return;
		}
		setLoadingDecks(true);
		studyService.getDecks().then(({ data }) => {
			setDecks(data || []);
			setLoadingDecks(false);
		});
	}, [user, isLoading]);
	const startReview = async (deck) => {
		if (!user) return;
		setLoadingCards(true);
		setIsReviewing(true);
		setCurrentDeck(deck);
		setCurrentIndex(0);
		setShowAnswer(false);
		const { data } = await studyService.getDueFlashcards(deck.id);
		setFlashcards(data || []);
		setLoadingCards(false);
	};
	const handleGrade = async (grade) => {
		if (!user || !flashcards.length) return;
		const card = flashcards[currentIndex];
		console.log(`processCardReview called for card ${card.id} with grade ${grade}`);
		await studyService.processCardReview(card.id, grade, {
			interval: card.interval,
			repetition: card.repetition,
			easeFactor: card.ease_factor
		});
		if (currentIndex < flashcards.length - 1) {
			setCurrentIndex((prev) => prev + 1);
			setShowAnswer(false);
		} else {
			setIsReviewing(false);
			setCurrentDeck(null);
		}
	};
	const endReview = () => {
		setIsReviewing(false);
		setCurrentDeck(null);
	};
	return {
		decks,
		loadingDecks,
		isReviewing,
		currentDeck,
		flashcards,
		loadingCards,
		currentIndex,
		showAnswer,
		setShowAnswer,
		startReview,
		handleGrade,
		endReview
	};
}
//#endregion
//#region src/pages/client/ClientStudy.tsx
function ClientStudy() {
	const flashcardsData = useFlashcards();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientStudy.tsx:14:5",
		"data-prohibitions": "[]",
		className: "flex flex-col min-h-screen lg:h-screen overflow-hidden bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientStudy.tsx:15:7",
			"data-prohibitions": "[]",
			title: "Central de Estudos & Foco",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/client/ClientStudy.tsx:16:9",
				"data-prohibitions": "[]",
				className: "hidden sm:flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-primary shadow-sm border border-primary/20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, {
					"data-uid": "src/pages/client/ClientStudy.tsx:17:11",
					"data-prohibitions": "[editContent]",
					className: "h-5 w-5"
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageContent, {
			"data-uid": "src/pages/client/ClientStudy.tsx:21:7",
			"data-prohibitions": "[]",
			className: "flex-1 overflow-hidden p-0 md:p-6 flex flex-col min-h-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				"data-uid": "src/pages/client/ClientStudy.tsx:22:9",
				"data-prohibitions": "[]",
				defaultValue: "dashboard",
				className: "flex flex-col flex-1 h-full w-full animate-fade-in-up",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/client/ClientStudy.tsx:26:11",
						"data-prohibitions": "[]",
						className: "px-4 py-3 shrink-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 md:bg-transparent md:p-0 md:mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							"data-uid": "src/pages/client/ClientStudy.tsx:27:13",
							"data-prohibitions": "[]",
							className: "grid w-full max-w-3xl mx-auto grid-cols-3 h-12 bg-muted/50 p-1 border rounded-xl shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									"data-uid": "src/pages/client/ClientStudy.tsx:28:15",
									"data-prohibitions": "[]",
									value: "dashboard",
									className: "text-xs sm:text-sm h-full rounded-lg font-medium gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, {
										"data-uid": "src/pages/client/ClientStudy.tsx:32:17",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-4 hidden sm:block"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/client/ClientStudy.tsx:33:17",
										"data-prohibitions": "[]",
										children: "Dashboard"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									"data-uid": "src/pages/client/ClientStudy.tsx:35:15",
									"data-prohibitions": "[]",
									value: "second-brain",
									className: "text-xs sm:text-sm h-full rounded-lg font-medium gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {
										"data-uid": "src/pages/client/ClientStudy.tsx:39:17",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-4 hidden sm:block"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/client/ClientStudy.tsx:40:17",
										"data-prohibitions": "[]",
										children: "Segundo Cérebro"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									"data-uid": "src/pages/client/ClientStudy.tsx:42:15",
									"data-prohibitions": "[]",
									value: "flashcards",
									className: "text-xs sm:text-sm h-full rounded-lg font-medium gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, {
										"data-uid": "src/pages/client/ClientStudy.tsx:46:17",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-4 hidden sm:block"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/client/ClientStudy.tsx:47:17",
										"data-prohibitions": "[]",
										children: "Flashcards"
									})]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/client/ClientStudy.tsx:52:11",
						"data-prohibitions": "[]",
						value: "dashboard",
						className: "flex-1 min-h-0 mt-0 data-[state=active]:flex flex-col outline-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyDashboardPanel, {
							"data-uid": "src/pages/client/ClientStudy.tsx:56:13",
							"data-prohibitions": "[editContent]"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/client/ClientStudy.tsx:59:11",
						"data-prohibitions": "[]",
						value: "second-brain",
						className: "flex-1 min-h-0 mt-0 data-[state=active]:flex flex-col outline-none md:pb-0 pb-4 px-4 md:px-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/client/ClientStudy.tsx:63:13",
							"data-prohibitions": "[]",
							className: "flex-1 rounded-xl border bg-background shadow-sm overflow-hidden flex flex-col",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecondBrainPanel, {
								"data-uid": "src/pages/client/ClientStudy.tsx:64:15",
								"data-prohibitions": "[editContent]"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/client/ClientStudy.tsx:68:11",
						"data-prohibitions": "[]",
						value: "flashcards",
						className: "flex-1 min-h-0 mt-0 data-[state=active]:flex flex-col outline-none md:pb-0 pb-4 px-4 md:px-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/client/ClientStudy.tsx:72:13",
							"data-prohibitions": "[]",
							className: "flex-1 rounded-xl border bg-background shadow-sm overflow-hidden flex flex-col",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlashcardsPanel, {
								"data-uid": "src/pages/client/ClientStudy.tsx:73:15",
								"data-prohibitions": "[editContent]",
								data: flashcardsData
							})
						})
					})
				]
			})
		})]
	});
}
//#endregion
export { ClientStudy as default };

//# sourceMappingURL=ClientStudy-Blm5y5iq.js.map