//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react@19.2.4/node_modules/react/cjs/react.development.js
/**
* @license React
* react.development.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_development = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		function defineDeprecationWarning(methodName, info) {
			Object.defineProperty(Component.prototype, methodName, { get: function() {
				console.warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
			} });
		}
		function getIteratorFn(maybeIterable) {
			if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
			maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
			return "function" === typeof maybeIterable ? maybeIterable : null;
		}
		function warnNoop(publicInstance, callerName) {
			publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
			var warningKey = publicInstance + "." + callerName;
			didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, publicInstance), didWarnStateUpdateForUnmountedComponent[warningKey] = !0);
		}
		function Component(props, context, updater) {
			this.props = props;
			this.context = context;
			this.refs = emptyObject;
			this.updater = updater || ReactNoopUpdateQueue;
		}
		function ComponentDummy() {}
		function PureComponent(props, context, updater) {
			this.props = props;
			this.context = context;
			this.refs = emptyObject;
			this.updater = updater || ReactNoopUpdateQueue;
		}
		function noop() {}
		function testStringCoercion(value) {
			return "" + value;
		}
		function checkKeyStringCoercion(value) {
			try {
				testStringCoercion(value);
				var JSCompiler_inline_result = !1;
			} catch (e) {
				JSCompiler_inline_result = !0;
			}
			if (JSCompiler_inline_result) {
				JSCompiler_inline_result = console;
				var JSCompiler_temp_const = JSCompiler_inline_result.error;
				var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
				JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
				return testStringCoercion(value);
			}
		}
		function getComponentNameFromType(type) {
			if (null == type) return null;
			if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
			if ("string" === typeof type) return type;
			switch (type) {
				case REACT_FRAGMENT_TYPE: return "Fragment";
				case REACT_PROFILER_TYPE: return "Profiler";
				case REACT_STRICT_MODE_TYPE: return "StrictMode";
				case REACT_SUSPENSE_TYPE: return "Suspense";
				case REACT_SUSPENSE_LIST_TYPE: return "SuspenseList";
				case REACT_ACTIVITY_TYPE: return "Activity";
			}
			if ("object" === typeof type) switch ("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof) {
				case REACT_PORTAL_TYPE: return "Portal";
				case REACT_CONTEXT_TYPE: return type.displayName || "Context";
				case REACT_CONSUMER_TYPE: return (type._context.displayName || "Context") + ".Consumer";
				case REACT_FORWARD_REF_TYPE:
					var innerType = type.render;
					type = type.displayName;
					type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
					return type;
				case REACT_MEMO_TYPE: return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
				case REACT_LAZY_TYPE:
					innerType = type._payload;
					type = type._init;
					try {
						return getComponentNameFromType(type(innerType));
					} catch (x) {}
			}
			return null;
		}
		function getTaskName(type) {
			if (type === REACT_FRAGMENT_TYPE) return "<>";
			if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
			try {
				var name = getComponentNameFromType(type);
				return name ? "<" + name + ">" : "<...>";
			} catch (x) {
				return "<...>";
			}
		}
		function getOwner() {
			var dispatcher = ReactSharedInternals.A;
			return null === dispatcher ? null : dispatcher.getOwner();
		}
		function UnknownOwner() {
			return Error("react-stack-top-frame");
		}
		function hasValidKey(config) {
			if (hasOwnProperty.call(config, "key")) {
				var getter = Object.getOwnPropertyDescriptor(config, "key").get;
				if (getter && getter.isReactWarning) return !1;
			}
			return void 0 !== config.key;
		}
		function defineKeyPropWarningGetter(props, displayName) {
			function warnAboutAccessingKey() {
				specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
			}
			warnAboutAccessingKey.isReactWarning = !0;
			Object.defineProperty(props, "key", {
				get: warnAboutAccessingKey,
				configurable: !0
			});
		}
		function elementRefGetterWithDeprecationWarning() {
			var componentName = getComponentNameFromType(this.type);
			didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
			componentName = this.props.ref;
			return void 0 !== componentName ? componentName : null;
		}
		function ReactElement(type, key, props, owner, debugStack, debugTask) {
			var refProp = props.ref;
			type = {
				$$typeof: REACT_ELEMENT_TYPE,
				type,
				key,
				props,
				_owner: owner
			};
			null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
				enumerable: !1,
				get: elementRefGetterWithDeprecationWarning
			}) : Object.defineProperty(type, "ref", {
				enumerable: !1,
				value: null
			});
			type._store = {};
			Object.defineProperty(type._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			});
			Object.defineProperty(type, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			});
			Object.defineProperty(type, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: debugStack
			});
			Object.defineProperty(type, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: debugTask
			});
			Object.freeze && (Object.freeze(type.props), Object.freeze(type));
			return type;
		}
		function cloneAndReplaceKey(oldElement, newKey) {
			newKey = ReactElement(oldElement.type, newKey, oldElement.props, oldElement._owner, oldElement._debugStack, oldElement._debugTask);
			oldElement._store && (newKey._store.validated = oldElement._store.validated);
			return newKey;
		}
		function validateChildKeys(node) {
			isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
		}
		function isValidElement(object) {
			return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
		}
		function escape(key) {
			var escaperLookup = {
				"=": "=0",
				":": "=2"
			};
			return "$" + key.replace(/[=:]/g, function(match) {
				return escaperLookup[match];
			});
		}
		function getElementKey(element, index) {
			return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
		}
		function resolveThenable(thenable) {
			switch (thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected": throw thenable.reason;
				default: switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
					"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
				}, function(error) {
					"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
				})), thenable.status) {
					case "fulfilled": return thenable.value;
					case "rejected": throw thenable.reason;
				}
			}
			throw thenable;
		}
		function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
			var type = typeof children;
			if ("undefined" === type || "boolean" === type) children = null;
			var invokeCallback = !1;
			if (null === children) invokeCallback = !0;
			else switch (type) {
				case "bigint":
				case "string":
				case "number":
					invokeCallback = !0;
					break;
				case "object": switch (children.$$typeof) {
					case REACT_ELEMENT_TYPE:
					case REACT_PORTAL_TYPE:
						invokeCallback = !0;
						break;
					case REACT_LAZY_TYPE: return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
				}
			}
			if (invokeCallback) {
				invokeCallback = children;
				callback = callback(invokeCallback);
				var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
				isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
					return c;
				})) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + childKey), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
				return 1;
			}
			invokeCallback = 0;
			childKey = "" === nameSoFar ? "." : nameSoFar + ":";
			if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
			else if (i = getIteratorFn(children), "function" === typeof i) for (i === children.entries && (didWarnAboutMaps || console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), didWarnAboutMaps = !0), children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
			else if ("object" === type) {
				if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
				array = String(children);
				throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
			}
			return invokeCallback;
		}
		function mapChildren(children, func, context) {
			if (null == children) return children;
			var result = [], count = 0;
			mapIntoArray(children, result, "", "", function(child) {
				return func.call(context, child, count++);
			});
			return result;
		}
		function lazyInitializer(payload) {
			if (-1 === payload._status) {
				var ioInfo = payload._ioInfo;
				null != ioInfo && (ioInfo.start = ioInfo.end = performance.now());
				ioInfo = payload._result;
				var thenable = ioInfo();
				thenable.then(function(moduleObject) {
					if (0 === payload._status || -1 === payload._status) {
						payload._status = 1;
						payload._result = moduleObject;
						var _ioInfo = payload._ioInfo;
						null != _ioInfo && (_ioInfo.end = performance.now());
						void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
					}
				}, function(error) {
					if (0 === payload._status || -1 === payload._status) {
						payload._status = 2;
						payload._result = error;
						var _ioInfo2 = payload._ioInfo;
						null != _ioInfo2 && (_ioInfo2.end = performance.now());
						void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
					}
				});
				ioInfo = payload._ioInfo;
				if (null != ioInfo) {
					ioInfo.value = thenable;
					var displayName = thenable.displayName;
					"string" === typeof displayName && (ioInfo.name = displayName);
				}
				-1 === payload._status && (payload._status = 0, payload._result = thenable);
			}
			if (1 === payload._status) return ioInfo = payload._result, void 0 === ioInfo && console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", ioInfo), "default" in ioInfo || console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", ioInfo), ioInfo.default;
			throw payload._result;
		}
		function resolveDispatcher() {
			var dispatcher = ReactSharedInternals.H;
			null === dispatcher && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
			return dispatcher;
		}
		function releaseAsyncTransition() {
			ReactSharedInternals.asyncTransitions--;
		}
		function enqueueTask(task) {
			if (null === enqueueTaskImpl) try {
				var requireString = ("require" + Math.random()).slice(0, 7);
				enqueueTaskImpl = (module && module[requireString]).call(module, "timers").setImmediate;
			} catch (_err) {
				enqueueTaskImpl = function(callback) {
					!1 === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = !0, "undefined" === typeof MessageChannel && console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
					var channel = new MessageChannel();
					channel.port1.onmessage = callback;
					channel.port2.postMessage(void 0);
				};
			}
			return enqueueTaskImpl(task);
		}
		function aggregateErrors(errors) {
			return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
		}
		function popActScope(prevActQueue, prevActScopeDepth) {
			prevActScopeDepth !== actScopeDepth - 1 && console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
			actScopeDepth = prevActScopeDepth;
		}
		function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
			var queue = ReactSharedInternals.actQueue;
			if (null !== queue) if (0 !== queue.length) try {
				flushActQueue(queue);
				enqueueTask(function() {
					return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
				});
				return;
			} catch (error) {
				ReactSharedInternals.thrownErrors.push(error);
			}
			else ReactSharedInternals.actQueue = null;
			0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
		}
		function flushActQueue(queue) {
			if (!isFlushing) {
				isFlushing = !0;
				var i = 0;
				try {
					for (; i < queue.length; i++) {
						var callback = queue[i];
						do {
							ReactSharedInternals.didUsePromise = !1;
							var continuation = callback(!1);
							if (null !== continuation) {
								if (ReactSharedInternals.didUsePromise) {
									queue[i] = callback;
									queue.splice(0, i);
									return;
								}
								callback = continuation;
							} else break;
						} while (1);
					}
					queue.length = 0;
				} catch (error) {
					queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
				} finally {
					isFlushing = !1;
				}
			}
		}
		"undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
			isMounted: function() {
				return !1;
			},
			enqueueForceUpdate: function(publicInstance) {
				warnNoop(publicInstance, "forceUpdate");
			},
			enqueueReplaceState: function(publicInstance) {
				warnNoop(publicInstance, "replaceState");
			},
			enqueueSetState: function(publicInstance) {
				warnNoop(publicInstance, "setState");
			}
		}, assign = Object.assign, emptyObject = {};
		Object.freeze(emptyObject);
		Component.prototype.isReactComponent = {};
		Component.prototype.setState = function(partialState, callback) {
			if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
			this.updater.enqueueSetState(this, partialState, callback, "setState");
		};
		Component.prototype.forceUpdate = function(callback) {
			this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
		};
		var deprecatedAPIs = {
			isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
			replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
		};
		for (fnName in deprecatedAPIs) deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
		ComponentDummy.prototype = Component.prototype;
		deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
		deprecatedAPIs.constructor = PureComponent;
		assign(deprecatedAPIs, Component.prototype);
		deprecatedAPIs.isPureReactComponent = !0;
		var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = {
			H: null,
			A: null,
			T: null,
			S: null,
			actQueue: null,
			asyncTransitions: 0,
			isBatchingLegacy: !1,
			didScheduleLegacyUpdate: !1,
			didUsePromise: !1,
			thrownErrors: [],
			getCurrentStack: null,
			recentlyCreatedOwnerStacks: 0
		}, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
			return null;
		};
		deprecatedAPIs = { react_stack_bottom_frame: function(callStackForError) {
			return callStackForError();
		} };
		var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
		var didWarnAboutElementRef = {};
		var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(deprecatedAPIs, UnknownOwner)();
		var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
		var didWarnAboutMaps = !1, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
			if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
				var event = new window.ErrorEvent("error", {
					bubbles: !0,
					cancelable: !0,
					message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
					error
				});
				if (!window.dispatchEvent(event)) return;
			} else if ("object" === typeof process && "function" === typeof process.emit) {
				process.emit("uncaughtException", error);
				return;
			}
			console.error(error);
		}, didWarnAboutMessageChannel = !1, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = !1, isFlushing = !1, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
			queueMicrotask(function() {
				return queueMicrotask(callback);
			});
		} : enqueueTask;
		deprecatedAPIs = Object.freeze({
			__proto__: null,
			c: function(size) {
				return resolveDispatcher().useMemoCache(size);
			}
		});
		var fnName = {
			map: mapChildren,
			forEach: function(children, forEachFunc, forEachContext) {
				mapChildren(children, function() {
					forEachFunc.apply(this, arguments);
				}, forEachContext);
			},
			count: function(children) {
				var n = 0;
				mapChildren(children, function() {
					n++;
				});
				return n;
			},
			toArray: function(children) {
				return mapChildren(children, function(child) {
					return child;
				}) || [];
			},
			only: function(children) {
				if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
				return children;
			}
		};
		exports.Activity = REACT_ACTIVITY_TYPE;
		exports.Children = fnName;
		exports.Component = Component;
		exports.Fragment = REACT_FRAGMENT_TYPE;
		exports.Profiler = REACT_PROFILER_TYPE;
		exports.PureComponent = PureComponent;
		exports.StrictMode = REACT_STRICT_MODE_TYPE;
		exports.Suspense = REACT_SUSPENSE_TYPE;
		exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
		exports.__COMPILER_RUNTIME = deprecatedAPIs;
		exports.act = function(callback) {
			var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
			actScopeDepth++;
			var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = !1;
			try {
				var result = callback();
			} catch (error) {
				ReactSharedInternals.thrownErrors.push(error);
			}
			if (0 < ReactSharedInternals.thrownErrors.length) throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
			if (null !== result && "object" === typeof result && "function" === typeof result.then) {
				var thenable = result;
				queueSeveralMicrotasks(function() {
					didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = !0, console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
				});
				return { then: function(resolve, reject) {
					didAwaitActCall = !0;
					thenable.then(function(returnValue) {
						popActScope(prevActQueue, prevActScopeDepth);
						if (0 === prevActScopeDepth) {
							try {
								flushActQueue(queue), enqueueTask(function() {
									return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
								});
							} catch (error$0) {
								ReactSharedInternals.thrownErrors.push(error$0);
							}
							if (0 < ReactSharedInternals.thrownErrors.length) {
								var _thrownError = aggregateErrors(ReactSharedInternals.thrownErrors);
								ReactSharedInternals.thrownErrors.length = 0;
								reject(_thrownError);
							}
						} else resolve(returnValue);
					}, function(error) {
						popActScope(prevActQueue, prevActScopeDepth);
						0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
					});
				} };
			}
			var returnValue$jscomp$0 = result;
			popActScope(prevActQueue, prevActScopeDepth);
			0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
				didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = !0, console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"));
			}), ReactSharedInternals.actQueue = null);
			if (0 < ReactSharedInternals.thrownErrors.length) throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
			return { then: function(resolve, reject) {
				didAwaitActCall = !0;
				0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
					return recursivelyFlushAsyncActWork(returnValue$jscomp$0, resolve, reject);
				})) : resolve(returnValue$jscomp$0);
			} };
		};
		exports.cache = function(fn) {
			return function() {
				return fn.apply(null, arguments);
			};
		};
		exports.cacheSignal = function() {
			return null;
		};
		exports.captureOwnerStack = function() {
			var getCurrentStack = ReactSharedInternals.getCurrentStack;
			return null === getCurrentStack ? null : getCurrentStack();
		};
		exports.cloneElement = function(element, config, children) {
			if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
			var props = assign({}, element.props), key = element.key, owner = element._owner;
			if (null != config) {
				var JSCompiler_inline_result;
				a: {
					if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(config, "ref").get) && JSCompiler_inline_result.isReactWarning) {
						JSCompiler_inline_result = !1;
						break a;
					}
					JSCompiler_inline_result = void 0 !== config.ref;
				}
				JSCompiler_inline_result && (owner = getOwner());
				hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
				for (propName in config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
			}
			var propName = arguments.length - 2;
			if (1 === propName) props.children = children;
			else if (1 < propName) {
				JSCompiler_inline_result = Array(propName);
				for (var i = 0; i < propName; i++) JSCompiler_inline_result[i] = arguments[i + 2];
				props.children = JSCompiler_inline_result;
			}
			props = ReactElement(element.type, key, props, owner, element._debugStack, element._debugTask);
			for (key = 2; key < arguments.length; key++) validateChildKeys(arguments[key]);
			return props;
		};
		exports.createContext = function(defaultValue) {
			defaultValue = {
				$$typeof: REACT_CONTEXT_TYPE,
				_currentValue: defaultValue,
				_currentValue2: defaultValue,
				_threadCount: 0,
				Provider: null,
				Consumer: null
			};
			defaultValue.Provider = defaultValue;
			defaultValue.Consumer = {
				$$typeof: REACT_CONSUMER_TYPE,
				_context: defaultValue
			};
			defaultValue._currentRenderer = null;
			defaultValue._currentRenderer2 = null;
			return defaultValue;
		};
		exports.createElement = function(type, config, children) {
			for (var i = 2; i < arguments.length; i++) validateChildKeys(arguments[i]);
			i = {};
			var key = null;
			if (null != config) for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = !0, console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
			var childrenLength = arguments.length - 2;
			if (1 === childrenLength) i.children = children;
			else if (1 < childrenLength) {
				for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++) childArray[_i] = arguments[_i + 2];
				Object.freeze && Object.freeze(childArray);
				i.children = childArray;
			}
			if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === i[propName] && (i[propName] = childrenLength[propName]);
			key && defineKeyPropWarningGetter(i, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
			var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
			return ReactElement(type, key, i, getOwner(), propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack, propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
		};
		exports.createRef = function() {
			var refObject = { current: null };
			Object.seal(refObject);
			return refObject;
		};
		exports.forwardRef = function(render) {
			null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : "function" !== typeof render ? console.error("forwardRef requires a render function but was given %s.", null === render ? "null" : typeof render) : 0 !== render.length && 2 !== render.length && console.error("forwardRef render functions accept exactly two parameters: props and ref. %s", 1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
			null != render && null != render.defaultProps && console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");
			var elementType = {
				$$typeof: REACT_FORWARD_REF_TYPE,
				render
			}, ownName;
			Object.defineProperty(elementType, "displayName", {
				enumerable: !1,
				configurable: !0,
				get: function() {
					return ownName;
				},
				set: function(name) {
					ownName = name;
					render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
				}
			});
			return elementType;
		};
		exports.isValidElement = isValidElement;
		exports.lazy = function(ctor) {
			ctor = {
				_status: -1,
				_result: ctor
			};
			var lazyType = {
				$$typeof: REACT_LAZY_TYPE,
				_payload: ctor,
				_init: lazyInitializer
			}, ioInfo = {
				name: "lazy",
				start: -1,
				end: -1,
				value: null,
				owner: null,
				debugStack: Error("react-stack-top-frame"),
				debugTask: console.createTask ? console.createTask("lazy()") : null
			};
			ctor._ioInfo = ioInfo;
			lazyType._debugInfo = [{ awaited: ioInfo }];
			return lazyType;
		};
		exports.memo = function(type, compare) {
			type ?? console.error("memo: The first argument must be a component. Instead received: %s", null === type ? "null" : typeof type);
			compare = {
				$$typeof: REACT_MEMO_TYPE,
				type,
				compare: void 0 === compare ? null : compare
			};
			var ownName;
			Object.defineProperty(compare, "displayName", {
				enumerable: !1,
				configurable: !0,
				get: function() {
					return ownName;
				},
				set: function(name) {
					ownName = name;
					type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
				}
			});
			return compare;
		};
		exports.startTransition = function(scope) {
			var prevTransition = ReactSharedInternals.T, currentTransition = {};
			currentTransition._updatedFibers = /* @__PURE__ */ new Set();
			ReactSharedInternals.T = currentTransition;
			try {
				var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
				null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
				"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && (ReactSharedInternals.asyncTransitions++, returnValue.then(releaseAsyncTransition, releaseAsyncTransition), returnValue.then(noop, reportGlobalError));
			} catch (error) {
				reportGlobalError(error);
			} finally {
				null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")), null !== prevTransition && null !== currentTransition.types && (null !== prevTransition.types && prevTransition.types !== currentTransition.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
			}
		};
		exports.unstable_useCacheRefresh = function() {
			return resolveDispatcher().useCacheRefresh();
		};
		exports.use = function(usable) {
			return resolveDispatcher().use(usable);
		};
		exports.useActionState = function(action, initialState, permalink) {
			return resolveDispatcher().useActionState(action, initialState, permalink);
		};
		exports.useCallback = function(callback, deps) {
			return resolveDispatcher().useCallback(callback, deps);
		};
		exports.useContext = function(Context) {
			var dispatcher = resolveDispatcher();
			Context.$$typeof === REACT_CONSUMER_TYPE && console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?");
			return dispatcher.useContext(Context);
		};
		exports.useDebugValue = function(value, formatterFn) {
			return resolveDispatcher().useDebugValue(value, formatterFn);
		};
		exports.useDeferredValue = function(value, initialValue) {
			return resolveDispatcher().useDeferredValue(value, initialValue);
		};
		exports.useEffect = function(create, deps) {
			create ?? console.warn("React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?");
			return resolveDispatcher().useEffect(create, deps);
		};
		exports.useEffectEvent = function(callback) {
			return resolveDispatcher().useEffectEvent(callback);
		};
		exports.useId = function() {
			return resolveDispatcher().useId();
		};
		exports.useImperativeHandle = function(ref, create, deps) {
			return resolveDispatcher().useImperativeHandle(ref, create, deps);
		};
		exports.useInsertionEffect = function(create, deps) {
			create ?? console.warn("React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?");
			return resolveDispatcher().useInsertionEffect(create, deps);
		};
		exports.useLayoutEffect = function(create, deps) {
			create ?? console.warn("React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?");
			return resolveDispatcher().useLayoutEffect(create, deps);
		};
		exports.useMemo = function(create, deps) {
			return resolveDispatcher().useMemo(create, deps);
		};
		exports.useOptimistic = function(passthrough, reducer) {
			return resolveDispatcher().useOptimistic(passthrough, reducer);
		};
		exports.useReducer = function(reducer, initialArg, init) {
			return resolveDispatcher().useReducer(reducer, initialArg, init);
		};
		exports.useRef = function(initialValue) {
			return resolveDispatcher().useRef(initialValue);
		};
		exports.useState = function(initialState) {
			return resolveDispatcher().useState(initialState);
		};
		exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
			return resolveDispatcher().useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
		};
		exports.useTransition = function() {
			return resolveDispatcher().useTransition();
		};
		exports.version = "19.2.4";
		"undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
}));
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react@19.2.4/node_modules/react/index.js
var require_react = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_development();
}));
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react-dom@19.2.4_react@19.2.4/node_modules/react-dom/cjs/react-dom.development.js
/**
* @license React
* react-dom.development.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_dom_development = /* @__PURE__ */ __commonJSMin(((exports) => {
	(function() {
		function noop() {}
		function testStringCoercion(value) {
			return "" + value;
		}
		function createPortal$1(children, containerInfo, implementation) {
			var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
			try {
				testStringCoercion(key);
				var JSCompiler_inline_result = !1;
			} catch (e) {
				JSCompiler_inline_result = !0;
			}
			JSCompiler_inline_result && (console.error("The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", "function" === typeof Symbol && Symbol.toStringTag && key[Symbol.toStringTag] || key.constructor.name || "Object"), testStringCoercion(key));
			return {
				$$typeof: REACT_PORTAL_TYPE,
				key: null == key ? null : "" + key,
				children,
				containerInfo,
				implementation
			};
		}
		function getCrossOriginStringAs(as, input) {
			if ("font" === as) return "";
			if ("string" === typeof input) return "use-credentials" === input ? input : "";
		}
		function getValueDescriptorExpectingObjectForWarning(thing) {
			return null === thing ? "`null`" : void 0 === thing ? "`undefined`" : "" === thing ? "an empty string" : "something with type \"" + typeof thing + "\"";
		}
		function getValueDescriptorExpectingEnumForWarning(thing) {
			return null === thing ? "`null`" : void 0 === thing ? "`undefined`" : "" === thing ? "an empty string" : "string" === typeof thing ? JSON.stringify(thing) : "number" === typeof thing ? "`" + thing + "`" : "something with type \"" + typeof thing + "\"";
		}
		function resolveDispatcher() {
			var dispatcher = ReactSharedInternals.H;
			null === dispatcher && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
			return dispatcher;
		}
		"undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var React = require_react(), Internals = {
			d: {
				f: noop,
				r: function() {
					throw Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.");
				},
				D: noop,
				C: noop,
				L: noop,
				m: noop,
				X: noop,
				S: noop,
				M: noop
			},
			p: 0,
			findDOMNode: null
		}, REACT_PORTAL_TYPE = Symbol.for("react.portal"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		"function" === typeof Map && null != Map.prototype && "function" === typeof Map.prototype.forEach && "function" === typeof Set && null != Set.prototype && "function" === typeof Set.prototype.clear && "function" === typeof Set.prototype.forEach || console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
		exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
		exports.createPortal = function(children, container) {
			var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
			if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType) throw Error("Target container is not a DOM element.");
			return createPortal$1(children, container, null, key);
		};
		exports.flushSync = function(fn) {
			var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
			try {
				if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
			} finally {
				ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f() && console.error("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.");
			}
		};
		exports.preconnect = function(href, options) {
			"string" === typeof href && href ? null != options && "object" !== typeof options ? console.error("ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.", getValueDescriptorExpectingEnumForWarning(options)) : null != options && "string" !== typeof options.crossOrigin && console.error("ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.", getValueDescriptorExpectingObjectForWarning(options.crossOrigin)) : console.error("ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
			"string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
		};
		exports.prefetchDNS = function(href) {
			if ("string" !== typeof href || !href) console.error("ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
			else if (1 < arguments.length) {
				var options = arguments[1];
				"object" === typeof options && options.hasOwnProperty("crossOrigin") ? console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", getValueDescriptorExpectingEnumForWarning(options)) : console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", getValueDescriptorExpectingEnumForWarning(options));
			}
			"string" === typeof href && Internals.d.D(href);
		};
		exports.preinit = function(href, options) {
			"string" === typeof href && href ? null == options || "object" !== typeof options ? console.error("ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.", getValueDescriptorExpectingEnumForWarning(options)) : "style" !== options.as && "script" !== options.as && console.error("ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are \"style\" and \"script\".", getValueDescriptorExpectingEnumForWarning(options.as)) : console.error("ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
			if ("string" === typeof href && options && "string" === typeof options.as) {
				var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
				"style" === as ? Internals.d.S(href, "string" === typeof options.precedence ? options.precedence : void 0, {
					crossOrigin,
					integrity,
					fetchPriority
				}) : "script" === as && Internals.d.X(href, {
					crossOrigin,
					integrity,
					fetchPriority,
					nonce: "string" === typeof options.nonce ? options.nonce : void 0
				});
			}
		};
		exports.preinitModule = function(href, options) {
			var encountered = "";
			"string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
			void 0 !== options && "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : options && "as" in options && "script" !== options.as && (encountered += " The `as` option encountered was " + getValueDescriptorExpectingEnumForWarning(options.as) + ".");
			if (encountered) console.error("ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s", encountered);
			else switch (encountered = options && "string" === typeof options.as ? options.as : "script", encountered) {
				case "script": break;
				default: encountered = getValueDescriptorExpectingEnumForWarning(encountered), console.error("ReactDOM.preinitModule(): Currently the only supported \"as\" type for this function is \"script\" but received \"%s\" instead. This warning was generated for `href` \"%s\". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)", encountered, href);
			}
			if ("string" === typeof href) if ("object" === typeof options && null !== options) {
				if (null == options.as || "script" === options.as) encountered = getCrossOriginStringAs(options.as, options.crossOrigin), Internals.d.M(href, {
					crossOrigin: encountered,
					integrity: "string" === typeof options.integrity ? options.integrity : void 0,
					nonce: "string" === typeof options.nonce ? options.nonce : void 0
				});
			} else options ?? Internals.d.M(href);
		};
		exports.preload = function(href, options) {
			var encountered = "";
			"string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
			null == options || "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : "string" === typeof options.as && options.as || (encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".");
			encountered && console.error("ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel=\"preload\" as=\"...\" />` tag.%s", encountered);
			if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
				encountered = options.as;
				var crossOrigin = getCrossOriginStringAs(encountered, options.crossOrigin);
				Internals.d.L(href, encountered, {
					crossOrigin,
					integrity: "string" === typeof options.integrity ? options.integrity : void 0,
					nonce: "string" === typeof options.nonce ? options.nonce : void 0,
					type: "string" === typeof options.type ? options.type : void 0,
					fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
					referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
					imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
					imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
					media: "string" === typeof options.media ? options.media : void 0
				});
			}
		};
		exports.preloadModule = function(href, options) {
			var encountered = "";
			"string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
			void 0 !== options && "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : options && "as" in options && "string" !== typeof options.as && (encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".");
			encountered && console.error("ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel=\"modulepreload\" as=\"...\" />` tag.%s", encountered);
			"string" === typeof href && (options ? (encountered = getCrossOriginStringAs(options.as, options.crossOrigin), Internals.d.m(href, {
				as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
				crossOrigin: encountered,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0
			})) : Internals.d.m(href));
		};
		exports.requestFormReset = function(form) {
			Internals.d.r(form);
		};
		exports.unstable_batchedUpdates = function(fn, a) {
			return fn(a);
		};
		exports.useFormState = function(action, initialState, permalink) {
			return resolveDispatcher().useFormState(action, initialState, permalink);
		};
		exports.useFormStatus = function() {
			return resolveDispatcher().useHostTransitionStatus();
		};
		exports.version = "19.2.4";
		"undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
}));
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react-dom@19.2.4_react@19.2.4/node_modules/react-dom/index.js
var require_react_dom = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_dom_development();
}));
//#endregion
//#region \0vite/preload-helper.js
var scriptRel = "modulepreload";
var assetsURL = function(dep) {
	return "/" + dep;
};
var seen = {};
var __vitePreload = function preload(baseModule, deps, importerUrl) {
	let promise = Promise.resolve();
	if (deps && deps.length > 0) {
		const links = document.getElementsByTagName("link");
		const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
		const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
		function allSettled(promises) {
			return Promise.all(promises.map((p) => Promise.resolve(p).then((value) => ({
				status: "fulfilled",
				value
			}), (reason) => ({
				status: "rejected",
				reason
			}))));
		}
		promise = allSettled(deps.map((dep) => {
			dep = assetsURL(dep, importerUrl);
			if (dep in seen) return;
			seen[dep] = true;
			const isCss = dep.endsWith(".css");
			const cssSelector = isCss ? "[rel=\"stylesheet\"]" : "";
			if (!!importerUrl) for (let i = links.length - 1; i >= 0; i--) {
				const link = links[i];
				if (link.href === dep && (!isCss || link.rel === "stylesheet")) return;
			}
			else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
			const link = document.createElement("link");
			link.rel = isCss ? "stylesheet" : scriptRel;
			if (!isCss) link.as = "script";
			link.crossOrigin = "";
			link.href = dep;
			if (cspNonce) link.setAttribute("nonce", cspNonce);
			document.head.appendChild(link);
			if (isCss) return new Promise((res, rej) => {
				link.addEventListener("load", res);
				link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
			});
		}));
	}
	function handlePreloadError(err) {
		const e = new Event("vite:preloadError", { cancelable: true });
		e.payload = err;
		window.dispatchEvent(e);
		if (!e.defaultPrevented) throw err;
	}
	return promise.then((res) => {
		for (const item of res || []) {
			if (item.status !== "rejected") continue;
			handlePreloadError(item.reason);
		}
		return baseModule().catch(handlePreloadError);
	});
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react-router@7.13.1_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var PopStateEventType = "popstate";
function isLocation(obj) {
	return typeof obj === "object" && obj != null && "pathname" in obj && "search" in obj && "hash" in obj && "state" in obj && "key" in obj;
}
function createBrowserHistory(options = {}) {
	function createBrowserLocation(window2, globalHistory) {
		let maskedLocation = globalHistory.state?.masked;
		let { pathname, search, hash } = maskedLocation || window2.location;
		return createLocation("", {
			pathname,
			search,
			hash
		}, globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default", maskedLocation ? {
			pathname: window2.location.pathname,
			search: window2.location.search,
			hash: window2.location.hash
		} : void 0);
	}
	function createBrowserHref(window2, to) {
		return typeof to === "string" ? to : createPath(to);
	}
	return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
function invariant(value, message) {
	if (value === false || value === null || typeof value === "undefined") throw new Error(message);
}
function warning(cond, message) {
	if (!cond) {
		if (typeof console !== "undefined") console.warn(message);
		try {
			throw new Error(message);
		} catch (e) {}
	}
}
function createKey() {
	return Math.random().toString(36).substring(2, 10);
}
function getHistoryState(location, index) {
	return {
		usr: location.state,
		key: location.key,
		idx: index,
		masked: location.unstable_mask ? {
			pathname: location.pathname,
			search: location.search,
			hash: location.hash
		} : void 0
	};
}
function createLocation(current, to, state = null, key, unstable_mask) {
	return {
		pathname: typeof current === "string" ? current : current.pathname,
		search: "",
		hash: "",
		...typeof to === "string" ? parsePath(to) : to,
		state,
		key: to && to.key || key || createKey(),
		unstable_mask
	};
}
function createPath({ pathname = "/", search = "", hash = "" }) {
	if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
	if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
	return pathname;
}
function parsePath(path) {
	let parsedPath = {};
	if (path) {
		let hashIndex = path.indexOf("#");
		if (hashIndex >= 0) {
			parsedPath.hash = path.substring(hashIndex);
			path = path.substring(0, hashIndex);
		}
		let searchIndex = path.indexOf("?");
		if (searchIndex >= 0) {
			parsedPath.search = path.substring(searchIndex);
			path = path.substring(0, searchIndex);
		}
		if (path) parsedPath.pathname = path;
	}
	return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref2, validateLocation, options = {}) {
	let { window: window2 = document.defaultView, v5Compat = false } = options;
	let globalHistory = window2.history;
	let action = "POP";
	let listener = null;
	let index = getIndex();
	if (index == null) {
		index = 0;
		globalHistory.replaceState({
			...globalHistory.state,
			idx: index
		}, "");
	}
	function getIndex() {
		return (globalHistory.state || { idx: null }).idx;
	}
	function handlePop() {
		action = "POP";
		let nextIndex = getIndex();
		let delta = nextIndex == null ? null : nextIndex - index;
		index = nextIndex;
		if (listener) listener({
			action,
			location: history.location,
			delta
		});
	}
	function push(to, state) {
		action = "PUSH";
		let location = isLocation(to) ? to : createLocation(history.location, to, state);
		if (validateLocation) validateLocation(location, to);
		index = getIndex() + 1;
		let historyState = getHistoryState(location, index);
		let url = history.createHref(location.unstable_mask || location);
		try {
			globalHistory.pushState(historyState, "", url);
		} catch (error) {
			if (error instanceof DOMException && error.name === "DataCloneError") throw error;
			window2.location.assign(url);
		}
		if (v5Compat && listener) listener({
			action,
			location: history.location,
			delta: 1
		});
	}
	function replace2(to, state) {
		action = "REPLACE";
		let location = isLocation(to) ? to : createLocation(history.location, to, state);
		if (validateLocation) validateLocation(location, to);
		index = getIndex();
		let historyState = getHistoryState(location, index);
		let url = history.createHref(location.unstable_mask || location);
		globalHistory.replaceState(historyState, "", url);
		if (v5Compat && listener) listener({
			action,
			location: history.location,
			delta: 0
		});
	}
	function createURL(to) {
		return createBrowserURLImpl(to);
	}
	let history = {
		get action() {
			return action;
		},
		get location() {
			return getLocation(window2, globalHistory);
		},
		listen(fn) {
			if (listener) throw new Error("A history only accepts one active listener");
			window2.addEventListener(PopStateEventType, handlePop);
			listener = fn;
			return () => {
				window2.removeEventListener(PopStateEventType, handlePop);
				listener = null;
			};
		},
		createHref(to) {
			return createHref2(window2, to);
		},
		createURL,
		encodeLocation(to) {
			let url = createURL(to);
			return {
				pathname: url.pathname,
				search: url.search,
				hash: url.hash
			};
		},
		push,
		replace: replace2,
		go(n) {
			return globalHistory.go(n);
		}
	};
	return history;
}
function createBrowserURLImpl(to, isAbsolute = false) {
	let base = "http://localhost";
	if (typeof window !== "undefined") base = window.location.origin !== "null" ? window.location.origin : window.location.href;
	invariant(base, "No window.location.(origin|href) available to create URL");
	let href = typeof to === "string" ? to : createPath(to);
	href = href.replace(/ $/, "%20");
	if (!isAbsolute && href.startsWith("//")) href = base + href;
	return new URL(href, base);
}
function matchRoutes(routes, locationArg, basename = "/") {
	return matchRoutesImpl(routes, locationArg, basename, false);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
	let pathname = stripBasename((typeof locationArg === "string" ? parsePath(locationArg) : locationArg).pathname || "/", basename);
	if (pathname == null) return null;
	let branches = flattenRoutes(routes);
	rankRouteBranches(branches);
	let matches = null;
	for (let i = 0; matches == null && i < branches.length; ++i) {
		let decoded = decodePath(pathname);
		matches = matchRouteBranch(branches[i], decoded, allowPartial);
	}
	return matches;
}
function convertRouteMatchToUiMatch(match, loaderData) {
	let { route, pathname, params } = match;
	return {
		id: route.id,
		pathname,
		params,
		data: loaderData[route.id],
		loaderData: loaderData[route.id],
		handle: route.handle
	};
}
function flattenRoutes(routes, branches = [], parentsMeta = [], parentPath = "", _hasParentOptionalSegments = false) {
	let flattenRoute = (route, index, hasParentOptionalSegments = _hasParentOptionalSegments, relativePath) => {
		let meta = {
			relativePath: relativePath === void 0 ? route.path || "" : relativePath,
			caseSensitive: route.caseSensitive === true,
			childrenIndex: index,
			route
		};
		if (meta.relativePath.startsWith("/")) {
			if (!meta.relativePath.startsWith(parentPath) && hasParentOptionalSegments) return;
			invariant(meta.relativePath.startsWith(parentPath), `Absolute route path "${meta.relativePath}" nested under path "${parentPath}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`);
			meta.relativePath = meta.relativePath.slice(parentPath.length);
		}
		let path = joinPaths([parentPath, meta.relativePath]);
		let routesMeta = parentsMeta.concat(meta);
		if (route.children && route.children.length > 0) {
			invariant(route.index !== true, `Index routes must not have child routes. Please remove all child routes from route path "${path}".`);
			flattenRoutes(route.children, branches, routesMeta, path, hasParentOptionalSegments);
		}
		if (route.path == null && !route.index) return;
		branches.push({
			path,
			score: computeScore(path, route.index),
			routesMeta
		});
	};
	routes.forEach((route, index) => {
		if (route.path === "" || !route.path?.includes("?")) flattenRoute(route, index);
		else for (let exploded of explodeOptionalSegments(route.path)) flattenRoute(route, index, true, exploded);
	});
	return branches;
}
function explodeOptionalSegments(path) {
	let segments = path.split("/");
	if (segments.length === 0) return [];
	let [first, ...rest] = segments;
	let isOptional = first.endsWith("?");
	let required = first.replace(/\?$/, "");
	if (rest.length === 0) return isOptional ? [required, ""] : [required];
	let restExploded = explodeOptionalSegments(rest.join("/"));
	let result = [];
	result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
	if (isOptional) result.push(...restExploded);
	return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
	branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta) => meta.childrenIndex), b.routesMeta.map((meta) => meta.childrenIndex)));
}
var paramRe = /^:[\w-]+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;
var isSplat = (s) => s === "*";
function computeScore(path, index) {
	let segments = path.split("/");
	let initialScore = segments.length;
	if (segments.some(isSplat)) initialScore += splatPenalty;
	if (index) initialScore += indexRouteValue;
	return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b) {
	return a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]) ? a[a.length - 1] - b[b.length - 1] : 0;
}
function matchRouteBranch(branch, pathname, allowPartial = false) {
	let { routesMeta } = branch;
	let matchedParams = {};
	let matchedPathname = "/";
	let matches = [];
	for (let i = 0; i < routesMeta.length; ++i) {
		let meta = routesMeta[i];
		let end = i === routesMeta.length - 1;
		let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
		let match = matchPath({
			path: meta.relativePath,
			caseSensitive: meta.caseSensitive,
			end
		}, remainingPathname);
		let route = meta.route;
		if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) match = matchPath({
			path: meta.relativePath,
			caseSensitive: meta.caseSensitive,
			end: false
		}, remainingPathname);
		if (!match) return null;
		Object.assign(matchedParams, match.params);
		matches.push({
			params: matchedParams,
			pathname: joinPaths([matchedPathname, match.pathname]),
			pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
			route
		});
		if (match.pathnameBase !== "/") matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
	}
	return matches;
}
function matchPath(pattern, pathname) {
	if (typeof pattern === "string") pattern = {
		path: pattern,
		caseSensitive: false,
		end: true
	};
	let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
	let match = pathname.match(matcher);
	if (!match) return null;
	let matchedPathname = match[0];
	let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
	let captureGroups = match.slice(1);
	return {
		params: compiledParams.reduce((memo2, { paramName, isOptional }, index) => {
			if (paramName === "*") {
				let splatValue = captureGroups[index] || "";
				pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
			}
			const value = captureGroups[index];
			if (isOptional && !value) memo2[paramName] = void 0;
			else memo2[paramName] = (value || "").replace(/%2F/g, "/");
			return memo2;
		}, {}),
		pathname: matchedPathname,
		pathnameBase,
		pattern
	};
}
function compilePath(path, caseSensitive = false, end = true) {
	warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`);
	let params = [];
	let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (match, paramName, isOptional, index, str) => {
		params.push({
			paramName,
			isOptional: isOptional != null
		});
		if (isOptional) {
			let nextChar = str.charAt(index + match.length);
			if (nextChar && nextChar !== "/") return "/([^\\/]*)";
			return "(?:/([^\\/]*))?";
		}
		return "/([^\\/]+)";
	}).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
	if (path.endsWith("*")) {
		params.push({ paramName: "*" });
		regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
	} else if (end) regexpSource += "\\/*$";
	else if (path !== "" && path !== "/") regexpSource += "(?:(?=\\/|$))";
	return [new RegExp(regexpSource, caseSensitive ? void 0 : "i"), params];
}
function decodePath(value) {
	try {
		return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
	} catch (error) {
		warning(false, `The URL path "${value}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${error}).`);
		return value;
	}
}
function stripBasename(pathname, basename) {
	if (basename === "/") return pathname;
	if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) return null;
	let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
	let nextChar = pathname.charAt(startIndex);
	if (nextChar && nextChar !== "/") return null;
	return pathname.slice(startIndex) || "/";
}
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function resolvePath(to, fromPathname = "/") {
	let { pathname: toPathname, search = "", hash = "" } = typeof to === "string" ? parsePath(to) : to;
	let pathname;
	if (toPathname) {
		toPathname = toPathname.replace(/\/\/+/g, "/");
		if (toPathname.startsWith("/")) pathname = resolvePathname(toPathname.substring(1), "/");
		else pathname = resolvePathname(toPathname, fromPathname);
	} else pathname = fromPathname;
	return {
		pathname,
		search: normalizeSearch(search),
		hash: normalizeHash(hash)
	};
}
function resolvePathname(relativePath, fromPathname) {
	let segments = fromPathname.replace(/\/+$/, "").split("/");
	relativePath.split("/").forEach((segment) => {
		if (segment === "..") {
			if (segments.length > 1) segments.pop();
		} else if (segment !== ".") segments.push(segment);
	});
	return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
	return `Cannot include a '${char}' character in a manually specified \`to.${field}\` field [${JSON.stringify(path)}].  Please separate it out to the \`to.${dest}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function getPathContributingMatches(matches) {
	return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
function getResolveToMatches(matches) {
	let pathMatches = getPathContributingMatches(matches);
	return pathMatches.map((match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase);
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative = false) {
	let to;
	if (typeof toArg === "string") to = parsePath(toArg);
	else {
		to = { ...toArg };
		invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
		invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
		invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
	}
	let isEmptyPath = toArg === "" || to.pathname === "";
	let toPathname = isEmptyPath ? "/" : to.pathname;
	let from;
	if (toPathname == null) from = locationPathname;
	else {
		let routePathnameIndex = routePathnames.length - 1;
		if (!isPathRelative && toPathname.startsWith("..")) {
			let toSegments = toPathname.split("/");
			while (toSegments[0] === "..") {
				toSegments.shift();
				routePathnameIndex -= 1;
			}
			to.pathname = toSegments.join("/");
		}
		from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
	}
	let path = resolvePath(to, from);
	let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
	let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
	if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) path.pathname += "/";
	return path;
}
var joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
var normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
var ErrorResponseImpl = class {
	constructor(status, statusText, data2, internal = false) {
		this.status = status;
		this.statusText = statusText || "";
		this.internal = internal;
		if (data2 instanceof Error) {
			this.data = data2.toString();
			this.error = data2;
		} else this.data = data2;
	}
};
function isRouteErrorResponse(error) {
	return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
function getRoutePattern(matches) {
	return matches.map((m) => m.route.path).filter(Boolean).join("/").replace(/\/\/*/g, "/") || "/";
}
var isBrowser$1 = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
function parseToInfo(_to, basename) {
	let to = _to;
	if (typeof to !== "string" || !ABSOLUTE_URL_REGEX.test(to)) return {
		absoluteURL: void 0,
		isExternal: false,
		to
	};
	let absoluteURL = to;
	let isExternal = false;
	if (isBrowser$1) try {
		let currentUrl = new URL(window.location.href);
		let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
		let path = stripBasename(targetUrl.pathname, basename);
		if (targetUrl.origin === currentUrl.origin && path != null) to = path + targetUrl.search + targetUrl.hash;
		else isExternal = true;
	} catch (e) {
		warning(false, `<Link to="${to}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`);
	}
	return {
		absoluteURL,
		isExternal,
		to
	};
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var DataRouterContext = import_react.createContext(null);
DataRouterContext.displayName = "DataRouter";
var DataRouterStateContext = import_react.createContext(null);
DataRouterStateContext.displayName = "DataRouterState";
var RSCRouterContext = import_react.createContext(false);
var ViewTransitionContext = import_react.createContext({ isTransitioning: false });
ViewTransitionContext.displayName = "ViewTransition";
var FetchersContext = import_react.createContext(/* @__PURE__ */ new Map());
FetchersContext.displayName = "Fetchers";
var AwaitContext = import_react.createContext(null);
AwaitContext.displayName = "Await";
var NavigationContext = import_react.createContext(null);
NavigationContext.displayName = "Navigation";
var LocationContext = import_react.createContext(null);
LocationContext.displayName = "Location";
var RouteContext = import_react.createContext({
	outlet: null,
	matches: [],
	isDataRoute: false
});
RouteContext.displayName = "Route";
var RouteErrorContext = import_react.createContext(null);
RouteErrorContext.displayName = "RouteError";
var ERROR_DIGEST_BASE = "REACT_ROUTER_ERROR";
var ERROR_DIGEST_REDIRECT = "REDIRECT";
var ERROR_DIGEST_ROUTE_ERROR_RESPONSE = "ROUTE_ERROR_RESPONSE";
function decodeRedirectErrorDigest(digest) {
	if (digest.startsWith(`${ERROR_DIGEST_BASE}:${ERROR_DIGEST_REDIRECT}:{`)) try {
		let parsed = JSON.parse(digest.slice(28));
		if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string" && typeof parsed.location === "string" && typeof parsed.reloadDocument === "boolean" && typeof parsed.replace === "boolean") return parsed;
	} catch {}
}
function decodeRouteErrorResponseDigest(digest) {
	if (digest.startsWith(`${ERROR_DIGEST_BASE}:${ERROR_DIGEST_ROUTE_ERROR_RESPONSE}:{`)) try {
		let parsed = JSON.parse(digest.slice(40));
		if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string") return new ErrorResponseImpl(parsed.status, parsed.statusText, parsed.data);
	} catch {}
}
function useHref(to, { relative } = {}) {
	invariant(useInRouterContext(), `useHref() may be used only in the context of a <Router> component.`);
	let { basename, navigator } = import_react.useContext(NavigationContext);
	let { hash, pathname, search } = useResolvedPath(to, { relative });
	let joinedPathname = pathname;
	if (basename !== "/") joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
	return navigator.createHref({
		pathname: joinedPathname,
		search,
		hash
	});
}
function useInRouterContext() {
	return import_react.useContext(LocationContext) != null;
}
function useLocation() {
	invariant(useInRouterContext(), `useLocation() may be used only in the context of a <Router> component.`);
	return import_react.useContext(LocationContext).location;
}
var navigateEffectWarning = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function useIsomorphicLayoutEffect$1(cb) {
	if (!import_react.useContext(NavigationContext).static) import_react.useLayoutEffect(cb);
}
function useNavigate() {
	let { isDataRoute } = import_react.useContext(RouteContext);
	return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
	invariant(useInRouterContext(), `useNavigate() may be used only in the context of a <Router> component.`);
	let dataRouterContext = import_react.useContext(DataRouterContext);
	let { basename, navigator } = import_react.useContext(NavigationContext);
	let { matches } = import_react.useContext(RouteContext);
	let { pathname: locationPathname } = useLocation();
	let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
	let activeRef = import_react.useRef(false);
	useIsomorphicLayoutEffect$1(() => {
		activeRef.current = true;
	});
	return import_react.useCallback((to, options = {}) => {
		warning(activeRef.current, navigateEffectWarning);
		if (!activeRef.current) return;
		if (typeof to === "number") {
			navigator.go(to);
			return;
		}
		let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
		if (dataRouterContext == null && basename !== "/") path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
		(!!options.replace ? navigator.replace : navigator.push)(path, options.state, options);
	}, [
		basename,
		navigator,
		routePathnamesJson,
		locationPathname,
		dataRouterContext
	]);
}
var OutletContext = import_react.createContext(null);
function useOutlet(context) {
	let outlet = import_react.useContext(RouteContext).outlet;
	return import_react.useMemo(() => outlet && /* @__PURE__ */ import_react.createElement(OutletContext.Provider, { value: context }, outlet), [outlet, context]);
}
function useResolvedPath(to, { relative } = {}) {
	let { matches } = import_react.useContext(RouteContext);
	let { pathname: locationPathname } = useLocation();
	let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
	return import_react.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [
		to,
		routePathnamesJson,
		locationPathname,
		relative
	]);
}
function useRoutes(routes, locationArg) {
	return useRoutesImpl(routes, locationArg);
}
function useRoutesImpl(routes, locationArg, dataRouterOpts) {
	invariant(useInRouterContext(), `useRoutes() may be used only in the context of a <Router> component.`);
	let { navigator } = import_react.useContext(NavigationContext);
	let { matches: parentMatches } = import_react.useContext(RouteContext);
	let routeMatch = parentMatches[parentMatches.length - 1];
	let parentParams = routeMatch ? routeMatch.params : {};
	let parentPathname = routeMatch ? routeMatch.pathname : "/";
	let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
	let parentRoute = routeMatch && routeMatch.route;
	{
		let parentPath = parentRoute && parentRoute.path || "";
		warningOnce(parentPathname, !parentRoute || parentPath.endsWith("*") || parentPath.endsWith("*?"), `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${parentPathname}" (under <Route path="${parentPath}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${parentPath}"> to <Route path="${parentPath === "/" ? "*" : `${parentPath}/*`}">.`);
	}
	let locationFromContext = useLocation();
	let location;
	if (locationArg) {
		let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
		invariant(parentPathnameBase === "/" || parsedLocationArg.pathname?.startsWith(parentPathnameBase), `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${parentPathnameBase}" but pathname "${parsedLocationArg.pathname}" was given in the \`location\` prop.`);
		location = parsedLocationArg;
	} else location = locationFromContext;
	let pathname = location.pathname || "/";
	let remainingPathname = pathname;
	if (parentPathnameBase !== "/") {
		let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
		remainingPathname = "/" + pathname.replace(/^\//, "").split("/").slice(parentSegments.length).join("/");
	}
	let matches = matchRoutes(routes, { pathname: remainingPathname });
	warning(parentRoute || matches != null, `No routes matched location "${location.pathname}${location.search}${location.hash}" `);
	warning(matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0 || matches[matches.length - 1].route.lazy !== void 0, `Matched leaf route at location "${location.pathname}${location.search}${location.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);
	let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
		params: Object.assign({}, parentParams, match.params),
		pathname: joinPaths([parentPathnameBase, navigator.encodeLocation ? navigator.encodeLocation(match.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")).pathname : match.pathname]),
		pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([parentPathnameBase, navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase.replace(/\?/g, "%3F").replace(/#/g, "%23")).pathname : match.pathnameBase])
	})), parentMatches, dataRouterOpts);
	if (locationArg && renderedMatches) return /* @__PURE__ */ import_react.createElement(LocationContext.Provider, { value: {
		location: {
			pathname: "/",
			search: "",
			hash: "",
			state: null,
			key: "default",
			unstable_mask: void 0,
			...location
		},
		navigationType: "POP"
	} }, renderedMatches);
	return renderedMatches;
}
function DefaultErrorComponent() {
	let error = useRouteError();
	let message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error instanceof Error ? error.message : JSON.stringify(error);
	let stack = error instanceof Error ? error.stack : null;
	let lightgrey = "rgba(200,200,200, 0.5)";
	let preStyles = {
		padding: "0.5rem",
		backgroundColor: lightgrey
	};
	let codeStyles = {
		padding: "2px 4px",
		backgroundColor: lightgrey
	};
	let devInfo = null;
	console.error("Error handled by React Router default ErrorBoundary:", error);
	devInfo = /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ import_react.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ import_react.createElement("code", { style: codeStyles }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ import_react.createElement("code", { style: codeStyles }, "errorElement"), " prop on your route."));
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ import_react.createElement("h3", { style: { fontStyle: "italic" } }, message), stack ? /* @__PURE__ */ import_react.createElement("pre", { style: preStyles }, stack) : null, devInfo);
}
var defaultErrorElement = /* @__PURE__ */ import_react.createElement(DefaultErrorComponent, null);
var RenderErrorBoundary = class extends import_react.Component {
	constructor(props) {
		super(props);
		this.state = {
			location: props.location,
			revalidation: props.revalidation,
			error: props.error
		};
	}
	static getDerivedStateFromError(error) {
		return { error };
	}
	static getDerivedStateFromProps(props, state) {
		if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") return {
			error: props.error,
			location: props.location,
			revalidation: props.revalidation
		};
		return {
			error: props.error !== void 0 ? props.error : state.error,
			location: state.location,
			revalidation: props.revalidation || state.revalidation
		};
	}
	componentDidCatch(error, errorInfo) {
		if (this.props.onError) this.props.onError(error, errorInfo);
		else console.error("React Router caught the following error during render", error);
	}
	render() {
		let error = this.state.error;
		if (this.context && typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
			const decoded = decodeRouteErrorResponseDigest(error.digest);
			if (decoded) error = decoded;
		}
		let result = error !== void 0 ? /* @__PURE__ */ import_react.createElement(RouteContext.Provider, { value: this.props.routeContext }, /* @__PURE__ */ import_react.createElement(RouteErrorContext.Provider, {
			value: error,
			children: this.props.component
		})) : this.props.children;
		if (this.context) return /* @__PURE__ */ import_react.createElement(RSCErrorHandler, { error }, result);
		return result;
	}
};
RenderErrorBoundary.contextType = RSCRouterContext;
var errorRedirectHandledMap = /* @__PURE__ */ new WeakMap();
function RSCErrorHandler({ children, error }) {
	let { basename } = import_react.useContext(NavigationContext);
	if (typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
		let redirect2 = decodeRedirectErrorDigest(error.digest);
		if (redirect2) {
			let existingRedirect = errorRedirectHandledMap.get(error);
			if (existingRedirect) throw existingRedirect;
			let parsed = parseToInfo(redirect2.location, basename);
			if (isBrowser$1 && !errorRedirectHandledMap.get(error)) if (parsed.isExternal || redirect2.reloadDocument) window.location.href = parsed.absoluteURL || parsed.to;
			else {
				const redirectPromise = Promise.resolve().then(() => window.__reactRouterDataRouter.navigate(parsed.to, { replace: redirect2.replace }));
				errorRedirectHandledMap.set(error, redirectPromise);
				throw redirectPromise;
			}
			return /* @__PURE__ */ import_react.createElement("meta", {
				httpEquiv: "refresh",
				content: `0;url=${parsed.absoluteURL || parsed.to}`
			});
		}
	}
	return children;
}
function RenderedRoute({ routeContext, match, children }) {
	let dataRouterContext = import_react.useContext(DataRouterContext);
	if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
	return /* @__PURE__ */ import_react.createElement(RouteContext.Provider, { value: routeContext }, children);
}
function _renderMatches(matches, parentMatches = [], dataRouterOpts) {
	let dataRouterState = dataRouterOpts?.state;
	if (matches == null) {
		if (!dataRouterState) return null;
		if (dataRouterState.errors) matches = dataRouterState.matches;
		else if (parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) matches = dataRouterState.matches;
		else return null;
	}
	let renderedMatches = matches;
	let errors = dataRouterState?.errors;
	if (errors != null) {
		let errorIndex = renderedMatches.findIndex((m) => m.route.id && errors?.[m.route.id] !== void 0);
		invariant(errorIndex >= 0, `Could not find a matching route for errors on route IDs: ${Object.keys(errors).join(",")}`);
		renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
	}
	let renderFallback = false;
	let fallbackIndex = -1;
	if (dataRouterOpts && dataRouterState) {
		renderFallback = dataRouterState.renderFallback;
		for (let i = 0; i < renderedMatches.length; i++) {
			let match = renderedMatches[i];
			if (match.route.HydrateFallback || match.route.hydrateFallbackElement) fallbackIndex = i;
			if (match.route.id) {
				let { loaderData, errors: errors2 } = dataRouterState;
				let needsToRunLoader = match.route.loader && !loaderData.hasOwnProperty(match.route.id) && (!errors2 || errors2[match.route.id] === void 0);
				if (match.route.lazy || needsToRunLoader) {
					if (dataRouterOpts.isStatic) renderFallback = true;
					if (fallbackIndex >= 0) renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
					else renderedMatches = [renderedMatches[0]];
					break;
				}
			}
		}
	}
	let onErrorHandler = dataRouterOpts?.onError;
	let onError = dataRouterState && onErrorHandler ? (error, errorInfo) => {
		onErrorHandler(error, {
			location: dataRouterState.location,
			params: dataRouterState.matches?.[0]?.params ?? {},
			unstable_pattern: getRoutePattern(dataRouterState.matches),
			errorInfo
		});
	} : void 0;
	return renderedMatches.reduceRight((outlet, match, index) => {
		let error;
		let shouldRenderHydrateFallback = false;
		let errorElement = null;
		let hydrateFallbackElement = null;
		if (dataRouterState) {
			error = errors && match.route.id ? errors[match.route.id] : void 0;
			errorElement = match.route.errorElement || defaultErrorElement;
			if (renderFallback) {
				if (fallbackIndex < 0 && index === 0) {
					warningOnce("route-fallback", false, "No `HydrateFallback` element provided to render during initial hydration");
					shouldRenderHydrateFallback = true;
					hydrateFallbackElement = null;
				} else if (fallbackIndex === index) {
					shouldRenderHydrateFallback = true;
					hydrateFallbackElement = match.route.hydrateFallbackElement || null;
				}
			}
		}
		let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
		let getChildren = () => {
			let children;
			if (error) children = errorElement;
			else if (shouldRenderHydrateFallback) children = hydrateFallbackElement;
			else if (match.route.Component) children = /* @__PURE__ */ import_react.createElement(match.route.Component, null);
			else if (match.route.element) children = match.route.element;
			else children = outlet;
			return /* @__PURE__ */ import_react.createElement(RenderedRoute, {
				match,
				routeContext: {
					outlet,
					matches: matches2,
					isDataRoute: dataRouterState != null
				},
				children
			});
		};
		return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ import_react.createElement(RenderErrorBoundary, {
			location: dataRouterState.location,
			revalidation: dataRouterState.revalidation,
			component: errorElement,
			error,
			children: getChildren(),
			routeContext: {
				outlet: null,
				matches: matches2,
				isDataRoute: true
			},
			onError
		}) : getChildren();
	}, null);
}
function getDataRouterConsoleError(hookName) {
	return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext(hookName) {
	let ctx = import_react.useContext(DataRouterContext);
	invariant(ctx, getDataRouterConsoleError(hookName));
	return ctx;
}
function useDataRouterState(hookName) {
	let state = import_react.useContext(DataRouterStateContext);
	invariant(state, getDataRouterConsoleError(hookName));
	return state;
}
function useRouteContext(hookName) {
	let route = import_react.useContext(RouteContext);
	invariant(route, getDataRouterConsoleError(hookName));
	return route;
}
function useCurrentRouteId(hookName) {
	let route = useRouteContext(hookName);
	let thisRoute = route.matches[route.matches.length - 1];
	invariant(thisRoute.route.id, `${hookName} can only be used on routes that contain a unique "id"`);
	return thisRoute.route.id;
}
function useRouteId() {
	return useCurrentRouteId("useRouteId");
}
function useNavigation() {
	return useDataRouterState("useNavigation").navigation;
}
function useMatches() {
	let { matches, loaderData } = useDataRouterState("useMatches");
	return import_react.useMemo(() => matches.map((m) => convertRouteMatchToUiMatch(m, loaderData)), [matches, loaderData]);
}
function useRouteError() {
	let error = import_react.useContext(RouteErrorContext);
	let state = useDataRouterState("useRouteError");
	let routeId = useCurrentRouteId("useRouteError");
	if (error !== void 0) return error;
	return state.errors?.[routeId];
}
function useNavigateStable() {
	let { router } = useDataRouterContext("useNavigate");
	let id = useCurrentRouteId("useNavigate");
	let activeRef = import_react.useRef(false);
	useIsomorphicLayoutEffect$1(() => {
		activeRef.current = true;
	});
	return import_react.useCallback(async (to, options = {}) => {
		warning(activeRef.current, navigateEffectWarning);
		if (!activeRef.current) return;
		if (typeof to === "number") await router.navigate(to);
		else await router.navigate(to, {
			fromRouteId: id,
			...options
		});
	}, [router, id]);
}
var alreadyWarned = {};
function warningOnce(key, cond, message) {
	if (!cond && !alreadyWarned[key]) {
		alreadyWarned[key] = true;
		warning(false, message);
	}
}
import_react.useOptimistic;
import_react.memo(DataRoutes);
function DataRoutes({ routes, future, state, isStatic, onError }) {
	return useRoutesImpl(routes, void 0, {
		state,
		isStatic,
		onError,
		future
	});
}
function Navigate({ to, replace: replace2, state, relative }) {
	invariant(useInRouterContext(), `<Navigate> may be used only in the context of a <Router> component.`);
	let { static: isStatic } = import_react.useContext(NavigationContext);
	warning(!isStatic, `<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`);
	let { matches } = import_react.useContext(RouteContext);
	let { pathname: locationPathname } = useLocation();
	let navigate = useNavigate();
	let path = resolveTo(to, getResolveToMatches(matches), locationPathname, relative === "path");
	let jsonPath = JSON.stringify(path);
	import_react.useEffect(() => {
		navigate(JSON.parse(jsonPath), {
			replace: replace2,
			state,
			relative
		});
	}, [
		navigate,
		jsonPath,
		relative,
		replace2,
		state
	]);
	return null;
}
function Outlet(props) {
	return useOutlet(props.context);
}
function Route(props) {
	invariant(false, `A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`);
}
function Router({ basename: basenameProp = "/", children = null, location: locationProp, navigationType = "POP", navigator, static: staticProp = false, unstable_useTransitions }) {
	invariant(!useInRouterContext(), `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);
	let basename = basenameProp.replace(/^\/*/, "/");
	let navigationContext = import_react.useMemo(() => ({
		basename,
		navigator,
		static: staticProp,
		unstable_useTransitions,
		future: {}
	}), [
		basename,
		navigator,
		staticProp,
		unstable_useTransitions
	]);
	if (typeof locationProp === "string") locationProp = parsePath(locationProp);
	let { pathname = "/", search = "", hash = "", state = null, key = "default", unstable_mask } = locationProp;
	let locationContext = import_react.useMemo(() => {
		let trailingPathname = stripBasename(pathname, basename);
		if (trailingPathname == null) return null;
		return {
			location: {
				pathname: trailingPathname,
				search,
				hash,
				state,
				key,
				unstable_mask
			},
			navigationType
		};
	}, [
		basename,
		pathname,
		search,
		hash,
		state,
		key,
		navigationType,
		unstable_mask
	]);
	warning(locationContext != null, `<Router basename="${basename}"> is not able to match the URL "${pathname}${search}${hash}" because it does not start with the basename, so the <Router> won't render anything.`);
	if (locationContext == null) return null;
	return /* @__PURE__ */ import_react.createElement(NavigationContext.Provider, { value: navigationContext }, /* @__PURE__ */ import_react.createElement(LocationContext.Provider, {
		children,
		value: locationContext
	}));
}
function Routes({ children, location }) {
	return useRoutes(createRoutesFromChildren(children), location);
}
function createRoutesFromChildren(children, parentPath = []) {
	let routes = [];
	import_react.Children.forEach(children, (element, index) => {
		if (!import_react.isValidElement(element)) return;
		let treePath = [...parentPath, index];
		if (element.type === import_react.Fragment) {
			routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath));
			return;
		}
		invariant(element.type === Route, `[${typeof element.type === "string" ? element.type : element.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`);
		invariant(!element.props.index || !element.props.children, "An index route cannot have child routes.");
		let route = {
			id: element.props.id || treePath.join("-"),
			caseSensitive: element.props.caseSensitive,
			element: element.props.element,
			Component: element.props.Component,
			index: element.props.index,
			path: element.props.path,
			middleware: element.props.middleware,
			loader: element.props.loader,
			action: element.props.action,
			hydrateFallbackElement: element.props.hydrateFallbackElement,
			HydrateFallback: element.props.HydrateFallback,
			errorElement: element.props.errorElement,
			ErrorBoundary: element.props.ErrorBoundary,
			hasErrorBoundary: element.props.hasErrorBoundary === true || element.props.ErrorBoundary != null || element.props.errorElement != null,
			shouldRevalidate: element.props.shouldRevalidate,
			handle: element.props.handle,
			lazy: element.props.lazy
		};
		if (element.props.children) route.children = createRoutesFromChildren(element.props.children, treePath);
		routes.push(route);
	});
	return routes;
}
var defaultMethod = "get";
var defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
	return typeof HTMLElement !== "undefined" && object instanceof HTMLElement;
}
function isButtonElement(object) {
	return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
	return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
	return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
	return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
	return event.button === 0 && (!target || target === "_self") && !isModifiedEvent(event);
}
var _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
	if (_formDataSupportsSubmitter === null) try {
		new FormData(document.createElement("form"), 0);
		_formDataSupportsSubmitter = false;
	} catch (e) {
		_formDataSupportsSubmitter = true;
	}
	return _formDataSupportsSubmitter;
}
var supportedFormEncTypes = /* @__PURE__ */ new Set([
	"application/x-www-form-urlencoded",
	"multipart/form-data",
	"text/plain"
]);
function getFormEncType(encType) {
	if (encType != null && !supportedFormEncTypes.has(encType)) {
		warning(false, `"${encType}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${defaultEncType}"`);
		return null;
	}
	return encType;
}
function getFormSubmissionInfo(target, basename) {
	let method;
	let action;
	let encType;
	let formData;
	let body;
	if (isFormElement(target)) {
		let attr = target.getAttribute("action");
		action = attr ? stripBasename(attr, basename) : null;
		method = target.getAttribute("method") || defaultMethod;
		encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
		formData = new FormData(target);
	} else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
		let form = target.form;
		if (form == null) throw new Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);
		let attr = target.getAttribute("formaction") || form.getAttribute("action");
		action = attr ? stripBasename(attr, basename) : null;
		method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
		encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
		formData = new FormData(form, target);
		if (!isFormDataSubmitterSupported()) {
			let { name, type, value } = target;
			if (type === "image") {
				let prefix = name ? `${name}.` : "";
				formData.append(`${prefix}x`, "0");
				formData.append(`${prefix}y`, "0");
			} else if (name) formData.append(name, value);
		}
	} else if (isHtmlElement(target)) throw new Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);
	else {
		method = defaultMethod;
		action = null;
		encType = defaultEncType;
		body = target;
	}
	if (formData && encType === "text/plain") {
		body = formData;
		formData = void 0;
	}
	return {
		action,
		method: method.toLowerCase(),
		encType,
		formData,
		body
	};
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var ESCAPE_LOOKUP = {
	"&": "\\u0026",
	">": "\\u003e",
	"<": "\\u003c",
	"\u2028": "\\u2028",
	"\u2029": "\\u2029"
};
var ESCAPE_REGEX = /[&><\u2028\u2029]/g;
function escapeHtml(html) {
	return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}
function invariant2(value, message) {
	if (value === false || value === null || typeof value === "undefined") throw new Error(message);
}
function singleFetchUrl(reqUrl, basename, trailingSlashAware, extension) {
	let url = typeof reqUrl === "string" ? new URL(reqUrl, typeof window === "undefined" ? "server://singlefetch/" : window.location.origin) : reqUrl;
	if (trailingSlashAware) if (url.pathname.endsWith("/")) url.pathname = `${url.pathname}_.${extension}`;
	else url.pathname = `${url.pathname}.${extension}`;
	else if (url.pathname === "/") url.pathname = `_root.${extension}`;
	else if (basename && stripBasename(url.pathname, basename) === "/") url.pathname = `${basename.replace(/\/$/, "")}/_root.${extension}`;
	else url.pathname = `${url.pathname.replace(/\/$/, "")}.${extension}`;
	return url;
}
async function loadRouteModule(route, routeModulesCache) {
	if (route.id in routeModulesCache) return routeModulesCache[route.id];
	try {
		let routeModule = await __vitePreload(() => import(
			/* @vite-ignore */
			/* webpackIgnore: true */
			route.module
), []);
		routeModulesCache[route.id] = routeModule;
		return routeModule;
	} catch (error) {
		console.error(`Error loading route module \`${route.module}\`, reloading page...`);
		console.error(error);
		if (window.__reactRouterContext && window.__reactRouterContext.isSpaMode && void 0);
		window.location.reload();
		return new Promise(() => {});
	}
}
function isPageLinkDescriptor(object) {
	return object != null && typeof object.page === "string";
}
function isHtmlLinkDescriptor(object) {
	if (object == null) return false;
	if (object.href == null) return object.rel === "preload" && typeof object.imageSrcSet === "string" && typeof object.imageSizes === "string";
	return typeof object.rel === "string" && typeof object.href === "string";
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
	return dedupeLinkDescriptors((await Promise.all(matches.map(async (match) => {
		let route = manifest.routes[match.route.id];
		if (route) {
			let mod = await loadRouteModule(route, routeModules);
			return mod.links ? mod.links() : [];
		}
		return [];
	}))).flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map((link) => link.rel === "stylesheet" ? {
		...link,
		rel: "prefetch",
		as: "style"
	} : {
		...link,
		rel: "prefetch"
	}));
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode) {
	let isNew = (match, index) => {
		if (!currentMatches[index]) return true;
		return match.route.id !== currentMatches[index].route.id;
	};
	let matchPathChanged = (match, index) => {
		return currentMatches[index].pathname !== match.pathname || currentMatches[index].route.path?.endsWith("*") && currentMatches[index].params["*"] !== match.params["*"];
	};
	if (mode === "assets") return nextMatches.filter((match, index) => isNew(match, index) || matchPathChanged(match, index));
	if (mode === "data") return nextMatches.filter((match, index) => {
		let manifestRoute = manifest.routes[match.route.id];
		if (!manifestRoute || !manifestRoute.hasLoader) return false;
		if (isNew(match, index) || matchPathChanged(match, index)) return true;
		if (match.route.shouldRevalidate) {
			let routeChoice = match.route.shouldRevalidate({
				currentUrl: new URL(location.pathname + location.search + location.hash, window.origin),
				currentParams: currentMatches[0]?.params || {},
				nextUrl: new URL(page, window.origin),
				nextParams: match.params,
				defaultShouldRevalidate: true
			});
			if (typeof routeChoice === "boolean") return routeChoice;
		}
		return true;
	});
	return [];
}
function getModuleLinkHrefs(matches, manifest, { includeHydrateFallback } = {}) {
	return dedupeHrefs(matches.map((match) => {
		let route = manifest.routes[match.route.id];
		if (!route) return [];
		let hrefs = [route.module];
		if (route.clientActionModule) hrefs = hrefs.concat(route.clientActionModule);
		if (route.clientLoaderModule) hrefs = hrefs.concat(route.clientLoaderModule);
		if (includeHydrateFallback && route.hydrateFallbackModule) hrefs = hrefs.concat(route.hydrateFallbackModule);
		if (route.imports) hrefs = hrefs.concat(route.imports);
		return hrefs;
	}).flat(1));
}
function dedupeHrefs(hrefs) {
	return [...new Set(hrefs)];
}
function sortKeys(obj) {
	let sorted = {};
	let keys = Object.keys(obj).sort();
	for (let key of keys) sorted[key] = obj[key];
	return sorted;
}
function dedupeLinkDescriptors(descriptors, preloads) {
	let set = /* @__PURE__ */ new Set();
	let preloadsSet = new Set(preloads);
	return descriptors.reduce((deduped, descriptor) => {
		if (preloads && !isPageLinkDescriptor(descriptor) && descriptor.as === "script" && descriptor.href && preloadsSet.has(descriptor.href)) return deduped;
		let key = JSON.stringify(sortKeys(descriptor));
		if (!set.has(key)) {
			set.add(key);
			deduped.push({
				key,
				link: descriptor
			});
		}
		return deduped;
	}, []);
}
function useDataRouterContext2() {
	let context = import_react.useContext(DataRouterContext);
	invariant2(context, "You must render this element inside a <DataRouterContext.Provider> element");
	return context;
}
function useDataRouterStateContext() {
	let context = import_react.useContext(DataRouterStateContext);
	invariant2(context, "You must render this element inside a <DataRouterStateContext.Provider> element");
	return context;
}
var FrameworkContext = import_react.createContext(void 0);
FrameworkContext.displayName = "FrameworkContext";
function useFrameworkContext() {
	let context = import_react.useContext(FrameworkContext);
	invariant2(context, "You must render this element inside a <HydratedRouter> element");
	return context;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
	let frameworkContext = import_react.useContext(FrameworkContext);
	let [maybePrefetch, setMaybePrefetch] = import_react.useState(false);
	let [shouldPrefetch, setShouldPrefetch] = import_react.useState(false);
	let { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } = theirElementProps;
	let ref = import_react.useRef(null);
	import_react.useEffect(() => {
		if (prefetch === "render") setShouldPrefetch(true);
		if (prefetch === "viewport") {
			let callback = (entries) => {
				entries.forEach((entry) => {
					setShouldPrefetch(entry.isIntersecting);
				});
			};
			let observer = new IntersectionObserver(callback, { threshold: .5 });
			if (ref.current) observer.observe(ref.current);
			return () => {
				observer.disconnect();
			};
		}
	}, [prefetch]);
	import_react.useEffect(() => {
		if (maybePrefetch) {
			let id = setTimeout(() => {
				setShouldPrefetch(true);
			}, 100);
			return () => {
				clearTimeout(id);
			};
		}
	}, [maybePrefetch]);
	let setIntent = () => {
		setMaybePrefetch(true);
	};
	let cancelIntent = () => {
		setMaybePrefetch(false);
		setShouldPrefetch(false);
	};
	if (!frameworkContext) return [
		false,
		ref,
		{}
	];
	if (prefetch !== "intent") return [
		shouldPrefetch,
		ref,
		{}
	];
	return [
		shouldPrefetch,
		ref,
		{
			onFocus: composeEventHandlers$1(onFocus, setIntent),
			onBlur: composeEventHandlers$1(onBlur, cancelIntent),
			onMouseEnter: composeEventHandlers$1(onMouseEnter, setIntent),
			onMouseLeave: composeEventHandlers$1(onMouseLeave, cancelIntent),
			onTouchStart: composeEventHandlers$1(onTouchStart, setIntent)
		}
	];
}
function composeEventHandlers$1(theirHandler, ourHandler) {
	return (event) => {
		theirHandler && theirHandler(event);
		if (!event.defaultPrevented) ourHandler(event);
	};
}
function PrefetchPageLinks({ page, ...linkProps }) {
	let { router } = useDataRouterContext2();
	let matches = import_react.useMemo(() => matchRoutes(router.routes, page, router.basename), [
		router.routes,
		page,
		router.basename
	]);
	if (!matches) return null;
	return /* @__PURE__ */ import_react.createElement(PrefetchPageLinksImpl, {
		page,
		matches,
		...linkProps
	});
}
function useKeyedPrefetchLinks(matches) {
	let { manifest, routeModules } = useFrameworkContext();
	let [keyedPrefetchLinks, setKeyedPrefetchLinks] = import_react.useState([]);
	import_react.useEffect(() => {
		let interrupted = false;
		getKeyedPrefetchLinks(matches, manifest, routeModules).then((links) => {
			if (!interrupted) setKeyedPrefetchLinks(links);
		});
		return () => {
			interrupted = true;
		};
	}, [
		matches,
		manifest,
		routeModules
	]);
	return keyedPrefetchLinks;
}
function PrefetchPageLinksImpl({ page, matches: nextMatches, ...linkProps }) {
	let location = useLocation();
	let { future, manifest, routeModules } = useFrameworkContext();
	let { basename } = useDataRouterContext2();
	let { loaderData, matches } = useDataRouterStateContext();
	let newMatchesForData = import_react.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, "data"), [
		page,
		nextMatches,
		matches,
		manifest,
		location
	]);
	let newMatchesForAssets = import_react.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, "assets"), [
		page,
		nextMatches,
		matches,
		manifest,
		location
	]);
	let dataHrefs = import_react.useMemo(() => {
		if (page === location.pathname + location.search + location.hash) return [];
		let routesParams = /* @__PURE__ */ new Set();
		let foundOptOutRoute = false;
		nextMatches.forEach((m) => {
			let manifestRoute = manifest.routes[m.route.id];
			if (!manifestRoute || !manifestRoute.hasLoader) return;
			if (!newMatchesForData.some((m2) => m2.route.id === m.route.id) && m.route.id in loaderData && routeModules[m.route.id]?.shouldRevalidate) foundOptOutRoute = true;
			else if (manifestRoute.hasClientLoader) foundOptOutRoute = true;
			else routesParams.add(m.route.id);
		});
		if (routesParams.size === 0) return [];
		let url = singleFetchUrl(page, basename, future.unstable_trailingSlashAwareDataRequests, "data");
		if (foundOptOutRoute && routesParams.size > 0) url.searchParams.set("_routes", nextMatches.filter((m) => routesParams.has(m.route.id)).map((m) => m.route.id).join(","));
		return [url.pathname + url.search];
	}, [
		basename,
		future.unstable_trailingSlashAwareDataRequests,
		loaderData,
		location,
		manifest,
		newMatchesForData,
		nextMatches,
		page,
		routeModules
	]);
	let moduleHrefs = import_react.useMemo(() => getModuleLinkHrefs(newMatchesForAssets, manifest), [newMatchesForAssets, manifest]);
	let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ import_react.createElement("link", {
		key: href,
		rel: "prefetch",
		as: "fetch",
		href,
		...linkProps
	})), moduleHrefs.map((href) => /* @__PURE__ */ import_react.createElement("link", {
		key: href,
		rel: "modulepreload",
		href,
		...linkProps
	})), keyedPrefetchLinks.map(({ key, link }) => /* @__PURE__ */ import_react.createElement("link", {
		key,
		nonce: linkProps.nonce,
		...link,
		crossOrigin: link.crossOrigin ?? linkProps.crossOrigin
	})));
}
function mergeRefs(...refs) {
	return (value) => {
		refs.forEach((ref) => {
			if (typeof ref === "function") ref(value);
			else if (ref != null) ref.current = value;
		});
	};
}
var isBrowser2 = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
try {
	if (isBrowser2) window.__reactRouterVersion = "7.13.1";
} catch (e) {}
function BrowserRouter({ basename, children, unstable_useTransitions, window: window2 }) {
	let historyRef = import_react.useRef();
	if (historyRef.current == null) historyRef.current = createBrowserHistory({
		window: window2,
		v5Compat: true
	});
	let history = historyRef.current;
	let [state, setStateImpl] = import_react.useState({
		action: history.action,
		location: history.location
	});
	let setState = import_react.useCallback((newState) => {
		if (unstable_useTransitions === false) setStateImpl(newState);
		else import_react.startTransition(() => setStateImpl(newState));
	}, [unstable_useTransitions]);
	import_react.useLayoutEffect(() => history.listen(setState), [history, setState]);
	return /* @__PURE__ */ import_react.createElement(Router, {
		basename,
		children,
		location: state.location,
		navigationType: state.action,
		navigator: history,
		unstable_useTransitions
	});
}
function HistoryRouter({ basename, children, history, unstable_useTransitions }) {
	let [state, setStateImpl] = import_react.useState({
		action: history.action,
		location: history.location
	});
	let setState = import_react.useCallback((newState) => {
		if (unstable_useTransitions === false) setStateImpl(newState);
		else import_react.startTransition(() => setStateImpl(newState));
	}, [unstable_useTransitions]);
	import_react.useLayoutEffect(() => history.listen(setState), [history, setState]);
	return /* @__PURE__ */ import_react.createElement(Router, {
		basename,
		children,
		location: state.location,
		navigationType: state.action,
		navigator: history,
		unstable_useTransitions
	});
}
HistoryRouter.displayName = "unstable_HistoryRouter";
var ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var Link = import_react.forwardRef(function LinkWithRef({ onClick, discover = "render", prefetch = "none", relative, reloadDocument, replace: replace2, unstable_mask, state, target, to, preventScrollReset, viewTransition, unstable_defaultShouldRevalidate, ...rest }, forwardedRef) {
	let { basename, navigator, unstable_useTransitions } = import_react.useContext(NavigationContext);
	let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX2.test(to);
	let parsed = parseToInfo(to, basename);
	to = parsed.to;
	let href = useHref(to, { relative });
	let location = useLocation();
	let maskedHref = null;
	if (unstable_mask) {
		let resolved = resolveTo(unstable_mask, [], location.unstable_mask ? location.unstable_mask.pathname : "/", true);
		if (basename !== "/") resolved.pathname = resolved.pathname === "/" ? basename : joinPaths([basename, resolved.pathname]);
		maskedHref = navigator.createHref(resolved);
	}
	let [shouldPrefetch, prefetchRef, prefetchHandlers] = usePrefetchBehavior(prefetch, rest);
	let internalOnClick = useLinkClickHandler(to, {
		replace: replace2,
		unstable_mask,
		state,
		target,
		preventScrollReset,
		relative,
		viewTransition,
		unstable_defaultShouldRevalidate,
		unstable_useTransitions
	});
	function handleClick(event) {
		if (onClick) onClick(event);
		if (!event.defaultPrevented) internalOnClick(event);
	}
	let isSpaLink = !(parsed.isExternal || reloadDocument);
	let link = /* @__PURE__ */ import_react.createElement("a", {
		...rest,
		...prefetchHandlers,
		href: (isSpaLink ? maskedHref : void 0) || parsed.absoluteURL || href,
		onClick: isSpaLink ? handleClick : onClick,
		ref: mergeRefs(forwardedRef, prefetchRef),
		target,
		"data-discover": !isAbsolute && discover === "render" ? "true" : void 0
	});
	return shouldPrefetch && !isAbsolute ? /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, link, /* @__PURE__ */ import_react.createElement(PrefetchPageLinks, { page: href })) : link;
});
Link.displayName = "Link";
var NavLink = import_react.forwardRef(function NavLinkWithRef({ "aria-current": ariaCurrentProp = "page", caseSensitive = false, className: classNameProp = "", end = false, style: styleProp, to, viewTransition, children, ...rest }, ref) {
	let path = useResolvedPath(to, { relative: rest.relative });
	let location = useLocation();
	let routerState = import_react.useContext(DataRouterStateContext);
	let { navigator, basename } = import_react.useContext(NavigationContext);
	let isTransitioning = routerState != null && useViewTransitionState(path) && viewTransition === true;
	let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
	let locationPathname = location.pathname;
	let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
	if (!caseSensitive) {
		locationPathname = locationPathname.toLowerCase();
		nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
		toPathname = toPathname.toLowerCase();
	}
	if (nextLocationPathname && basename) nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
	const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
	let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
	let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
	let renderProps = {
		isActive,
		isPending,
		isTransitioning
	};
	let ariaCurrent = isActive ? ariaCurrentProp : void 0;
	let className;
	if (typeof classNameProp === "function") className = classNameProp(renderProps);
	else className = [
		classNameProp,
		isActive ? "active" : null,
		isPending ? "pending" : null,
		isTransitioning ? "transitioning" : null
	].filter(Boolean).join(" ");
	let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
	return /* @__PURE__ */ import_react.createElement(Link, {
		...rest,
		"aria-current": ariaCurrent,
		className,
		ref,
		style,
		to,
		viewTransition
	}, typeof children === "function" ? children(renderProps) : children);
});
NavLink.displayName = "NavLink";
var Form = import_react.forwardRef(({ discover = "render", fetcherKey, navigate, reloadDocument, replace: replace2, state, method = defaultMethod, action, onSubmit, relative, preventScrollReset, viewTransition, unstable_defaultShouldRevalidate, ...props }, forwardedRef) => {
	let { unstable_useTransitions } = import_react.useContext(NavigationContext);
	let submit = useSubmit();
	let formAction = useFormAction(action, { relative });
	let formMethod = method.toLowerCase() === "get" ? "get" : "post";
	let isAbsolute = typeof action === "string" && ABSOLUTE_URL_REGEX2.test(action);
	let submitHandler = (event) => {
		onSubmit && onSubmit(event);
		if (event.defaultPrevented) return;
		event.preventDefault();
		let submitter = event.nativeEvent.submitter;
		let submitMethod = submitter?.getAttribute("formmethod") || method;
		let doSubmit = () => submit(submitter || event.currentTarget, {
			fetcherKey,
			method: submitMethod,
			navigate,
			replace: replace2,
			state,
			relative,
			preventScrollReset,
			viewTransition,
			unstable_defaultShouldRevalidate
		});
		if (unstable_useTransitions && navigate !== false) import_react.startTransition(() => doSubmit());
		else doSubmit();
	};
	return /* @__PURE__ */ import_react.createElement("form", {
		ref: forwardedRef,
		method: formMethod,
		action: formAction,
		onSubmit: reloadDocument ? onSubmit : submitHandler,
		...props,
		"data-discover": !isAbsolute && discover === "render" ? "true" : void 0
	});
});
Form.displayName = "Form";
function ScrollRestoration({ getKey, storageKey, ...props }) {
	let remixContext = import_react.useContext(FrameworkContext);
	let { basename } = import_react.useContext(NavigationContext);
	let location = useLocation();
	let matches = useMatches();
	useScrollRestoration({
		getKey,
		storageKey
	});
	let ssrKey = import_react.useMemo(() => {
		if (!remixContext || !getKey) return null;
		let userKey = getScrollRestorationKey(location, matches, basename, getKey);
		return userKey !== location.key ? userKey : null;
	}, []);
	if (!remixContext || remixContext.isSpaMode) return null;
	let restoreScroll = ((storageKey2, restoreKey) => {
		if (!window.history.state || !window.history.state.key) {
			let key = Math.random().toString(32).slice(2);
			window.history.replaceState({ key }, "");
		}
		try {
			let storedY = JSON.parse(sessionStorage.getItem(storageKey2) || "{}")[restoreKey || window.history.state.key];
			if (typeof storedY === "number") window.scrollTo(0, storedY);
		} catch (error) {
			console.error(error);
			sessionStorage.removeItem(storageKey2);
		}
	}).toString();
	return /* @__PURE__ */ import_react.createElement("script", {
		...props,
		suppressHydrationWarning: true,
		dangerouslySetInnerHTML: { __html: `(${restoreScroll})(${escapeHtml(JSON.stringify(storageKey || SCROLL_RESTORATION_STORAGE_KEY))}, ${escapeHtml(JSON.stringify(ssrKey))})` }
	});
}
ScrollRestoration.displayName = "ScrollRestoration";
function getDataRouterConsoleError2(hookName) {
	return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext3(hookName) {
	let ctx = import_react.useContext(DataRouterContext);
	invariant(ctx, getDataRouterConsoleError2(hookName));
	return ctx;
}
function useDataRouterState2(hookName) {
	let state = import_react.useContext(DataRouterStateContext);
	invariant(state, getDataRouterConsoleError2(hookName));
	return state;
}
function useLinkClickHandler(to, { target, replace: replaceProp, unstable_mask, state, preventScrollReset, relative, viewTransition, unstable_defaultShouldRevalidate, unstable_useTransitions } = {}) {
	let navigate = useNavigate();
	let location = useLocation();
	let path = useResolvedPath(to, { relative });
	return import_react.useCallback((event) => {
		if (shouldProcessLinkClick(event, target)) {
			event.preventDefault();
			let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
			let doNavigate = () => navigate(to, {
				replace: replace2,
				unstable_mask,
				state,
				preventScrollReset,
				relative,
				viewTransition,
				unstable_defaultShouldRevalidate
			});
			if (unstable_useTransitions) import_react.startTransition(() => doNavigate());
			else doNavigate();
		}
	}, [
		location,
		navigate,
		path,
		replaceProp,
		unstable_mask,
		state,
		target,
		to,
		preventScrollReset,
		relative,
		viewTransition,
		unstable_defaultShouldRevalidate,
		unstable_useTransitions
	]);
}
var fetcherId = 0;
var getUniqueFetcherId = () => `__${String(++fetcherId)}__`;
function useSubmit() {
	let { router } = useDataRouterContext3("useSubmit");
	let { basename } = import_react.useContext(NavigationContext);
	let currentRouteId = useRouteId();
	let routerFetch = router.fetch;
	let routerNavigate = router.navigate;
	return import_react.useCallback(async (target, options = {}) => {
		let { action, method, encType, formData, body } = getFormSubmissionInfo(target, basename);
		if (options.navigate === false) await routerFetch(options.fetcherKey || getUniqueFetcherId(), currentRouteId, options.action || action, {
			unstable_defaultShouldRevalidate: options.unstable_defaultShouldRevalidate,
			preventScrollReset: options.preventScrollReset,
			formData,
			body,
			formMethod: options.method || method,
			formEncType: options.encType || encType,
			flushSync: options.flushSync
		});
		else await routerNavigate(options.action || action, {
			unstable_defaultShouldRevalidate: options.unstable_defaultShouldRevalidate,
			preventScrollReset: options.preventScrollReset,
			formData,
			body,
			formMethod: options.method || method,
			formEncType: options.encType || encType,
			replace: options.replace,
			state: options.state,
			fromRouteId: currentRouteId,
			flushSync: options.flushSync,
			viewTransition: options.viewTransition
		});
	}, [
		routerFetch,
		routerNavigate,
		basename,
		currentRouteId
	]);
}
function useFormAction(action, { relative } = {}) {
	let { basename } = import_react.useContext(NavigationContext);
	let routeContext = import_react.useContext(RouteContext);
	invariant(routeContext, "useFormAction must be used inside a RouteContext");
	let [match] = routeContext.matches.slice(-1);
	let path = { ...useResolvedPath(action ? action : ".", { relative }) };
	let location = useLocation();
	if (action == null) {
		path.search = location.search;
		let params = new URLSearchParams(path.search);
		let indexValues = params.getAll("index");
		if (indexValues.some((v) => v === "")) {
			params.delete("index");
			indexValues.filter((v) => v).forEach((v) => params.append("index", v));
			let qs = params.toString();
			path.search = qs ? `?${qs}` : "";
		}
	}
	if ((!action || action === ".") && match.route.index) path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
	if (basename !== "/") path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
	return createPath(path);
}
var SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
var savedScrollPositions = {};
function getScrollRestorationKey(location, matches, basename, getKey) {
	let key = null;
	if (getKey) if (basename !== "/") key = getKey({
		...location,
		pathname: stripBasename(location.pathname, basename) || location.pathname
	}, matches);
	else key = getKey(location, matches);
	if (key == null) key = location.key;
	return key;
}
function useScrollRestoration({ getKey, storageKey } = {}) {
	let { router } = useDataRouterContext3("useScrollRestoration");
	let { restoreScrollPosition, preventScrollReset } = useDataRouterState2("useScrollRestoration");
	let { basename } = import_react.useContext(NavigationContext);
	let location = useLocation();
	let matches = useMatches();
	let navigation = useNavigation();
	import_react.useEffect(() => {
		window.history.scrollRestoration = "manual";
		return () => {
			window.history.scrollRestoration = "auto";
		};
	}, []);
	usePageHide(import_react.useCallback(() => {
		if (navigation.state === "idle") {
			let key = getScrollRestorationKey(location, matches, basename, getKey);
			savedScrollPositions[key] = window.scrollY;
		}
		try {
			sessionStorage.setItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY, JSON.stringify(savedScrollPositions));
		} catch (error) {
			warning(false, `Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${error}).`);
		}
		window.history.scrollRestoration = "auto";
	}, [
		navigation.state,
		getKey,
		basename,
		location,
		matches,
		storageKey
	]));
	if (typeof document !== "undefined") {
		import_react.useLayoutEffect(() => {
			try {
				let sessionPositions = sessionStorage.getItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY);
				if (sessionPositions) savedScrollPositions = JSON.parse(sessionPositions);
			} catch (e) {}
		}, [storageKey]);
		import_react.useLayoutEffect(() => {
			let disableScrollRestoration = router?.enableScrollRestoration(savedScrollPositions, () => window.scrollY, getKey ? (location2, matches2) => getScrollRestorationKey(location2, matches2, basename, getKey) : void 0);
			return () => disableScrollRestoration && disableScrollRestoration();
		}, [
			router,
			basename,
			getKey
		]);
		import_react.useLayoutEffect(() => {
			if (restoreScrollPosition === false) return;
			if (typeof restoreScrollPosition === "number") {
				window.scrollTo(0, restoreScrollPosition);
				return;
			}
			try {
				if (location.hash) {
					let el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
					if (el) {
						el.scrollIntoView();
						return;
					}
				}
			} catch {
				warning(false, `"${location.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`);
			}
			if (preventScrollReset === true) return;
			window.scrollTo(0, 0);
		}, [
			location,
			restoreScrollPosition,
			preventScrollReset
		]);
	}
}
function usePageHide(callback, options) {
	let { capture } = options || {};
	import_react.useEffect(() => {
		let opts = capture != null ? { capture } : void 0;
		window.addEventListener("pagehide", callback, opts);
		return () => {
			window.removeEventListener("pagehide", callback, opts);
		};
	}, [callback, capture]);
}
function useViewTransitionState(to, { relative } = {}) {
	let vtContext = import_react.useContext(ViewTransitionContext);
	invariant(vtContext != null, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
	let { basename } = useDataRouterContext3("useViewTransitionState");
	let path = useResolvedPath(to, { relative });
	if (!vtContext.isTransitioning) return false;
	let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
	let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
	return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}
typeof window !== "undefined" && window.document && window.document.createElement;
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
	return function handleEvent(event) {
		originalEventHandler?.(event);
		if (checkForDefaultPrevented === false || !event.defaultPrevented) return ourEventHandler?.(event);
	};
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-compose-refs@1.1.2_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function setRef(ref, value) {
	if (typeof ref === "function") return ref(value);
	else if (ref !== null && ref !== void 0) ref.current = value;
}
function composeRefs(...refs) {
	return (node) => {
		let hasCleanup = false;
		const cleanups = refs.map((ref) => {
			const cleanup = setRef(ref, node);
			if (!hasCleanup && typeof cleanup == "function") hasCleanup = true;
			return cleanup;
		});
		if (hasCleanup) return () => {
			for (let i = 0; i < cleanups.length; i++) {
				const cleanup = cleanups[i];
				if (typeof cleanup == "function") cleanup();
				else setRef(refs[i], null);
			}
		};
	};
}
function useComposedRefs(...refs) {
	return import_react.useCallback(composeRefs(...refs), refs);
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react@19.2.4/node_modules/react/cjs/react-jsx-runtime.development.js
/**
* @license React
* react-jsx-runtime.development.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_development = /* @__PURE__ */ __commonJSMin(((exports) => {
	(function() {
		function getComponentNameFromType(type) {
			if (null == type) return null;
			if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
			if ("string" === typeof type) return type;
			switch (type) {
				case REACT_FRAGMENT_TYPE: return "Fragment";
				case REACT_PROFILER_TYPE: return "Profiler";
				case REACT_STRICT_MODE_TYPE: return "StrictMode";
				case REACT_SUSPENSE_TYPE: return "Suspense";
				case REACT_SUSPENSE_LIST_TYPE: return "SuspenseList";
				case REACT_ACTIVITY_TYPE: return "Activity";
			}
			if ("object" === typeof type) switch ("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof) {
				case REACT_PORTAL_TYPE: return "Portal";
				case REACT_CONTEXT_TYPE: return type.displayName || "Context";
				case REACT_CONSUMER_TYPE: return (type._context.displayName || "Context") + ".Consumer";
				case REACT_FORWARD_REF_TYPE:
					var innerType = type.render;
					type = type.displayName;
					type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
					return type;
				case REACT_MEMO_TYPE: return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
				case REACT_LAZY_TYPE:
					innerType = type._payload;
					type = type._init;
					try {
						return getComponentNameFromType(type(innerType));
					} catch (x) {}
			}
			return null;
		}
		function testStringCoercion(value) {
			return "" + value;
		}
		function checkKeyStringCoercion(value) {
			try {
				testStringCoercion(value);
				var JSCompiler_inline_result = !1;
			} catch (e) {
				JSCompiler_inline_result = !0;
			}
			if (JSCompiler_inline_result) {
				JSCompiler_inline_result = console;
				var JSCompiler_temp_const = JSCompiler_inline_result.error;
				var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
				JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
				return testStringCoercion(value);
			}
		}
		function getTaskName(type) {
			if (type === REACT_FRAGMENT_TYPE) return "<>";
			if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
			try {
				var name = getComponentNameFromType(type);
				return name ? "<" + name + ">" : "<...>";
			} catch (x) {
				return "<...>";
			}
		}
		function getOwner() {
			var dispatcher = ReactSharedInternals.A;
			return null === dispatcher ? null : dispatcher.getOwner();
		}
		function UnknownOwner() {
			return Error("react-stack-top-frame");
		}
		function hasValidKey(config) {
			if (hasOwnProperty.call(config, "key")) {
				var getter = Object.getOwnPropertyDescriptor(config, "key").get;
				if (getter && getter.isReactWarning) return !1;
			}
			return void 0 !== config.key;
		}
		function defineKeyPropWarningGetter(props, displayName) {
			function warnAboutAccessingKey() {
				specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
			}
			warnAboutAccessingKey.isReactWarning = !0;
			Object.defineProperty(props, "key", {
				get: warnAboutAccessingKey,
				configurable: !0
			});
		}
		function elementRefGetterWithDeprecationWarning() {
			var componentName = getComponentNameFromType(this.type);
			didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
			componentName = this.props.ref;
			return void 0 !== componentName ? componentName : null;
		}
		function ReactElement(type, key, props, owner, debugStack, debugTask) {
			var refProp = props.ref;
			type = {
				$$typeof: REACT_ELEMENT_TYPE,
				type,
				key,
				props,
				_owner: owner
			};
			null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
				enumerable: !1,
				get: elementRefGetterWithDeprecationWarning
			}) : Object.defineProperty(type, "ref", {
				enumerable: !1,
				value: null
			});
			type._store = {};
			Object.defineProperty(type._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			});
			Object.defineProperty(type, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			});
			Object.defineProperty(type, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: debugStack
			});
			Object.defineProperty(type, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: debugTask
			});
			Object.freeze && (Object.freeze(type.props), Object.freeze(type));
			return type;
		}
		function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
			var children = config.children;
			if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
				for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++) validateChildKeys(children[isStaticChildren]);
				Object.freeze && Object.freeze(children);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else validateChildKeys(children);
			if (hasOwnProperty.call(config, "key")) {
				children = getComponentNameFromType(type);
				var keys = Object.keys(config).filter(function(k) {
					return "key" !== k;
				});
				isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
				didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
			}
			children = null;
			void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
			hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
			if ("key" in config) {
				maybeKey = {};
				for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
			} else maybeKey = config;
			children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
			return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
		}
		function validateChildKeys(node) {
			isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
		}
		function isValidElement(object) {
			return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
		}
		var React = require_react(), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
			return null;
		};
		React = { react_stack_bottom_frame: function(callStackForError) {
			return callStackForError();
		} };
		var specialPropKeyWarningShown;
		var didWarnAboutElementRef = {};
		var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
		var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
		var didWarnAboutKeySpread = {};
		exports.Fragment = REACT_FRAGMENT_TYPE;
		exports.jsx = function(type, config, maybeKey) {
			var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
			return jsxDEVImpl(type, config, maybeKey, !1, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
		};
		exports.jsxs = function(type, config, maybeKey) {
			var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
			return jsxDEVImpl(type, config, maybeKey, !0, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
		};
	})();
}));
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react@19.2.4/node_modules/react/jsx-runtime.js
var require_jsx_runtime = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_jsx_runtime_development();
}));
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-context@1.1.2_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-context/dist/index.mjs
var import_jsx_runtime = require_jsx_runtime();
function createContext2(rootComponentName, defaultContext) {
	const Context = import_react.createContext(defaultContext);
	const Provider = (props) => {
		const { children, ...context } = props;
		const value = import_react.useMemo(() => context, Object.values(context));
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, {
			value,
			children
		});
	};
	Provider.displayName = rootComponentName + "Provider";
	function useContext2(consumerName) {
		const context = import_react.useContext(Context);
		if (context) return context;
		if (defaultContext !== void 0) return defaultContext;
		throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
	}
	return [Provider, useContext2];
}
function createContextScope$1(scopeName, createContextScopeDeps = []) {
	let defaultContexts = [];
	function createContext3(rootComponentName, defaultContext) {
		const BaseContext = import_react.createContext(defaultContext);
		const index = defaultContexts.length;
		defaultContexts = [...defaultContexts, defaultContext];
		const Provider = (props) => {
			const { scope, children, ...context } = props;
			const Context = scope?.[scopeName]?.[index] || BaseContext;
			const value = import_react.useMemo(() => context, Object.values(context));
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, {
				value,
				children
			});
		};
		Provider.displayName = rootComponentName + "Provider";
		function useContext2(consumerName, scope) {
			const Context = scope?.[scopeName]?.[index] || BaseContext;
			const context = import_react.useContext(Context);
			if (context) return context;
			if (defaultContext !== void 0) return defaultContext;
			throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
		}
		return [Provider, useContext2];
	}
	const createScope = () => {
		const scopeContexts = defaultContexts.map((defaultContext) => {
			return import_react.createContext(defaultContext);
		});
		return function useScope(scope) {
			const contexts = scope?.[scopeName] || scopeContexts;
			return import_react.useMemo(() => ({ [`__scope${scopeName}`]: {
				...scope,
				[scopeName]: contexts
			} }), [scope, contexts]);
		};
	};
	createScope.scopeName = scopeName;
	return [createContext3, composeContextScopes$1(createScope, ...createContextScopeDeps)];
}
function composeContextScopes$1(...scopes) {
	const baseScope = scopes[0];
	if (scopes.length === 1) return baseScope;
	const createScope = () => {
		const scopeHooks = scopes.map((createScope2) => ({
			useScope: createScope2(),
			scopeName: createScope2.scopeName
		}));
		return function useComposedScopes(overrideScopes) {
			const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
				const currentScope = useScope(overrideScopes)[`__scope${scopeName}`];
				return {
					...nextScopes2,
					...currentScope
				};
			}, {});
			return import_react.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
		};
	};
	createScope.scopeName = baseScope.scopeName;
	return createScope;
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-slot@1.2.3_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-slot/dist/index.mjs
/* @__NO_SIDE_EFFECTS__ */
function createSlot$1(ownerName) {
	const SlotClone = /* @__PURE__ */ createSlotClone$1(ownerName);
	const Slot2 = import_react.forwardRef((props, forwardedRef) => {
		const { children, ...slotProps } = props;
		const childrenArray = import_react.Children.toArray(children);
		const slottable = childrenArray.find(isSlottable$1);
		if (slottable) {
			const newElement = slottable.props.children;
			const newChildren = childrenArray.map((child) => {
				if (child === slottable) {
					if (import_react.Children.count(newElement) > 1) return import_react.Children.only(null);
					return import_react.isValidElement(newElement) ? newElement.props.children : null;
				} else return child;
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotClone, {
				...slotProps,
				ref: forwardedRef,
				children: import_react.isValidElement(newElement) ? import_react.cloneElement(newElement, void 0, newChildren) : null
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotClone, {
			...slotProps,
			ref: forwardedRef,
			children
		});
	});
	Slot2.displayName = `${ownerName}.Slot`;
	return Slot2;
}
/* @__NO_SIDE_EFFECTS__ */
function createSlotClone$1(ownerName) {
	const SlotClone = import_react.forwardRef((props, forwardedRef) => {
		const { children, ...slotProps } = props;
		if (import_react.isValidElement(children)) {
			const childrenRef = getElementRef$2(children);
			const props2 = mergeProps$1(slotProps, children.props);
			if (children.type !== import_react.Fragment) props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
			return import_react.cloneElement(children, props2);
		}
		return import_react.Children.count(children) > 1 ? import_react.Children.only(null) : null;
	});
	SlotClone.displayName = `${ownerName}.SlotClone`;
	return SlotClone;
}
var SLOTTABLE_IDENTIFIER$1 = Symbol("radix.slottable");
/* @__NO_SIDE_EFFECTS__ */
function createSlottable(ownerName) {
	const Slottable2 = ({ children }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	};
	Slottable2.displayName = `${ownerName}.Slottable`;
	Slottable2.__radixId = SLOTTABLE_IDENTIFIER$1;
	return Slottable2;
}
function isSlottable$1(child) {
	return import_react.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER$1;
}
function mergeProps$1(slotProps, childProps) {
	const overrideProps = { ...childProps };
	for (const propName in childProps) {
		const slotPropValue = slotProps[propName];
		const childPropValue = childProps[propName];
		if (/^on[A-Z]/.test(propName)) {
			if (slotPropValue && childPropValue) overrideProps[propName] = (...args) => {
				const result = childPropValue(...args);
				slotPropValue(...args);
				return result;
			};
			else if (slotPropValue) overrideProps[propName] = slotPropValue;
		} else if (propName === "style") overrideProps[propName] = {
			...slotPropValue,
			...childPropValue
		};
		else if (propName === "className") overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
	}
	return {
		...slotProps,
		...overrideProps
	};
}
function getElementRef$2(element) {
	let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
	let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.ref;
	getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
	mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.props.ref;
	return element.props.ref || element.ref;
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-collection@1.1.7_@types+react-dom@19.2.3_@types+react@19.2.14__@types+r_161926fa2509d0b7370b60b8bb4eb8b0/node_modules/@radix-ui/react-collection/dist/index.mjs
function createCollection(name) {
	const PROVIDER_NAME = name + "CollectionProvider";
	const [createCollectionContext, createCollectionScope] = createContextScope$1(PROVIDER_NAME);
	const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(PROVIDER_NAME, {
		collectionRef: { current: null },
		itemMap: /* @__PURE__ */ new Map()
	});
	const CollectionProvider = (props) => {
		const { scope, children } = props;
		const ref = import_react.useRef(null);
		const itemMap = import_react.useRef(/* @__PURE__ */ new Map()).current;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionProviderImpl, {
			scope,
			itemMap,
			collectionRef: ref,
			children
		});
	};
	CollectionProvider.displayName = PROVIDER_NAME;
	const COLLECTION_SLOT_NAME = name + "CollectionSlot";
	const CollectionSlotImpl = /* @__PURE__ */ createSlot$1(COLLECTION_SLOT_NAME);
	const CollectionSlot = import_react.forwardRef((props, forwardedRef) => {
		const { scope, children } = props;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionSlotImpl, {
			ref: useComposedRefs(forwardedRef, useCollectionContext(COLLECTION_SLOT_NAME, scope).collectionRef),
			children
		});
	});
	CollectionSlot.displayName = COLLECTION_SLOT_NAME;
	const ITEM_SLOT_NAME = name + "CollectionItemSlot";
	const ITEM_DATA_ATTR = "data-radix-collection-item";
	const CollectionItemSlotImpl = /* @__PURE__ */ createSlot$1(ITEM_SLOT_NAME);
	const CollectionItemSlot = import_react.forwardRef((props, forwardedRef) => {
		const { scope, children, ...itemData } = props;
		const ref = import_react.useRef(null);
		const composedRefs = useComposedRefs(forwardedRef, ref);
		const context = useCollectionContext(ITEM_SLOT_NAME, scope);
		import_react.useEffect(() => {
			context.itemMap.set(ref, {
				ref,
				...itemData
			});
			return () => void context.itemMap.delete(ref);
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionItemSlotImpl, {
			[ITEM_DATA_ATTR]: "",
			ref: composedRefs,
			children
		});
	});
	CollectionItemSlot.displayName = ITEM_SLOT_NAME;
	function useCollection(scope) {
		const context = useCollectionContext(name + "CollectionConsumer", scope);
		return import_react.useCallback(() => {
			const collectionNode = context.collectionRef.current;
			if (!collectionNode) return [];
			const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
			return Array.from(context.itemMap.values()).sort((a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current));
		}, [context.collectionRef, context.itemMap]);
	}
	return [
		{
			Provider: CollectionProvider,
			Slot: CollectionSlot,
			ItemSlot: CollectionItemSlot
		},
		useCollection,
		createCollectionScope
	];
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-primitive@2.1.3_@types+react-dom@19.2.3_@types+react@19.2.14__@types+re_1181ea5061ec9212248424669240e4ec/node_modules/@radix-ui/react-primitive/dist/index.mjs
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
var Primitive$1 = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((primitive, node) => {
	const Slot = /* @__PURE__ */ createSlot$1(`Primitive.${node}`);
	const Node = import_react.forwardRef((props, forwardedRef) => {
		const { asChild, ...primitiveProps } = props;
		const Comp = asChild ? Slot : node;
		if (typeof window !== "undefined") window[Symbol.for("radix-ui")] = true;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, {
			...primitiveProps,
			ref: forwardedRef
		});
	});
	Node.displayName = `Primitive.${node}`;
	return {
		...primitive,
		[node]: Node
	};
}, {});
function dispatchDiscreteCustomEvent(target, event) {
	if (target) import_react_dom.flushSync(() => target.dispatchEvent(event));
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-use-callback-ref@1.1.1_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function useCallbackRef$1(callback) {
	const callbackRef = import_react.useRef(callback);
	import_react.useEffect(() => {
		callbackRef.current = callback;
	});
	return import_react.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-use-escape-keydown@1.1.1_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs
function useEscapeKeydown(onEscapeKeyDownProp, ownerDocument = globalThis?.document) {
	const onEscapeKeyDown = useCallbackRef$1(onEscapeKeyDownProp);
	import_react.useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") onEscapeKeyDown(event);
		};
		ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
		return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
	}, [onEscapeKeyDown, ownerDocument]);
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-dismissable-layer@1.1.11_@types+react-dom@19.2.3_@types+react@19.2.14___3d3960154a4c07d09bb90cb341135fc5/node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var DISMISSABLE_LAYER_NAME = "DismissableLayer";
var CONTEXT_UPDATE = "dismissableLayer.update";
var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
var originalBodyPointerEvents;
var DismissableLayerContext = import_react.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set()
});
var DismissableLayer = import_react.forwardRef((props, forwardedRef) => {
	const { disableOutsidePointerEvents = false, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, onDismiss, ...layerProps } = props;
	const context = import_react.useContext(DismissableLayerContext);
	const [node, setNode] = import_react.useState(null);
	const ownerDocument = node?.ownerDocument ?? globalThis?.document;
	const [, force] = import_react.useState({});
	const composedRefs = useComposedRefs(forwardedRef, (node2) => setNode(node2));
	const layers = Array.from(context.layers);
	const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
	const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
	const index = node ? layers.indexOf(node) : -1;
	const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
	const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex;
	const pointerDownOutside = usePointerDownOutside((event) => {
		const target = event.target;
		const isPointerDownOnBranch = [...context.branches].some((branch) => branch.contains(target));
		if (!isPointerEventsEnabled || isPointerDownOnBranch) return;
		onPointerDownOutside?.(event);
		onInteractOutside?.(event);
		if (!event.defaultPrevented) onDismiss?.();
	}, ownerDocument);
	const focusOutside = useFocusOutside((event) => {
		const target = event.target;
		if ([...context.branches].some((branch) => branch.contains(target))) return;
		onFocusOutside?.(event);
		onInteractOutside?.(event);
		if (!event.defaultPrevented) onDismiss?.();
	}, ownerDocument);
	useEscapeKeydown((event) => {
		if (!(index === context.layers.size - 1)) return;
		onEscapeKeyDown?.(event);
		if (!event.defaultPrevented && onDismiss) {
			event.preventDefault();
			onDismiss();
		}
	}, ownerDocument);
	import_react.useEffect(() => {
		if (!node) return;
		if (disableOutsidePointerEvents) {
			if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
				originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
				ownerDocument.body.style.pointerEvents = "none";
			}
			context.layersWithOutsidePointerEventsDisabled.add(node);
		}
		context.layers.add(node);
		dispatchUpdate();
		return () => {
			if (disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1) ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
		};
	}, [
		node,
		ownerDocument,
		disableOutsidePointerEvents,
		context
	]);
	import_react.useEffect(() => {
		return () => {
			if (!node) return;
			context.layers.delete(node);
			context.layersWithOutsidePointerEventsDisabled.delete(node);
			dispatchUpdate();
		};
	}, [node, context]);
	import_react.useEffect(() => {
		const handleUpdate = () => force({});
		document.addEventListener(CONTEXT_UPDATE, handleUpdate);
		return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.div, {
		...layerProps,
		ref: composedRefs,
		style: {
			pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
			...props.style
		},
		onFocusCapture: composeEventHandlers(props.onFocusCapture, focusOutside.onFocusCapture),
		onBlurCapture: composeEventHandlers(props.onBlurCapture, focusOutside.onBlurCapture),
		onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, pointerDownOutside.onPointerDownCapture)
	});
});
DismissableLayer.displayName = DISMISSABLE_LAYER_NAME;
var BRANCH_NAME = "DismissableLayerBranch";
var DismissableLayerBranch = import_react.forwardRef((props, forwardedRef) => {
	const context = import_react.useContext(DismissableLayerContext);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	import_react.useEffect(() => {
		const node = ref.current;
		if (node) {
			context.branches.add(node);
			return () => {
				context.branches.delete(node);
			};
		}
	}, [context.branches]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.div, {
		...props,
		ref: composedRefs
	});
});
DismissableLayerBranch.displayName = BRANCH_NAME;
function usePointerDownOutside(onPointerDownOutside, ownerDocument = globalThis?.document) {
	const handlePointerDownOutside = useCallbackRef$1(onPointerDownOutside);
	const isPointerInsideReactTreeRef = import_react.useRef(false);
	const handleClickRef = import_react.useRef(() => {});
	import_react.useEffect(() => {
		const handlePointerDown = (event) => {
			if (event.target && !isPointerInsideReactTreeRef.current) {
				let handleAndDispatchPointerDownOutsideEvent2 = function() {
					handleAndDispatchCustomEvent(POINTER_DOWN_OUTSIDE, handlePointerDownOutside, eventDetail, { discrete: true });
				};
				const eventDetail = { originalEvent: event };
				if (event.pointerType === "touch") {
					ownerDocument.removeEventListener("click", handleClickRef.current);
					handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
					ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
				} else handleAndDispatchPointerDownOutsideEvent2();
			} else ownerDocument.removeEventListener("click", handleClickRef.current);
			isPointerInsideReactTreeRef.current = false;
		};
		const timerId = window.setTimeout(() => {
			ownerDocument.addEventListener("pointerdown", handlePointerDown);
		}, 0);
		return () => {
			window.clearTimeout(timerId);
			ownerDocument.removeEventListener("pointerdown", handlePointerDown);
			ownerDocument.removeEventListener("click", handleClickRef.current);
		};
	}, [ownerDocument, handlePointerDownOutside]);
	return { onPointerDownCapture: () => isPointerInsideReactTreeRef.current = true };
}
function useFocusOutside(onFocusOutside, ownerDocument = globalThis?.document) {
	const handleFocusOutside = useCallbackRef$1(onFocusOutside);
	const isFocusInsideReactTreeRef = import_react.useRef(false);
	import_react.useEffect(() => {
		const handleFocus = (event) => {
			if (event.target && !isFocusInsideReactTreeRef.current) handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, { originalEvent: event }, { discrete: false });
		};
		ownerDocument.addEventListener("focusin", handleFocus);
		return () => ownerDocument.removeEventListener("focusin", handleFocus);
	}, [ownerDocument, handleFocusOutside]);
	return {
		onFocusCapture: () => isFocusInsideReactTreeRef.current = true,
		onBlurCapture: () => isFocusInsideReactTreeRef.current = false
	};
}
function dispatchUpdate() {
	const event = new CustomEvent(CONTEXT_UPDATE);
	document.dispatchEvent(event);
}
function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
	const target = detail.originalEvent.target;
	const event = new CustomEvent(name, {
		bubbles: false,
		cancelable: true,
		detail
	});
	if (handler) target.addEventListener(name, handler, { once: true });
	if (discrete) dispatchDiscreteCustomEvent(target, event);
	else target.dispatchEvent(event);
}
var Root$6 = DismissableLayer;
var Branch = DismissableLayerBranch;
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-use-layout-effect@1.1.1_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var useLayoutEffect2 = globalThis?.document ? import_react.useLayoutEffect : () => {};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-portal@1.1.9_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react_7668895bec2444446faa4e0f4eb5244b/node_modules/@radix-ui/react-portal/dist/index.mjs
var PORTAL_NAME$4 = "Portal";
var Portal$2 = import_react.forwardRef((props, forwardedRef) => {
	const { container: containerProp, ...portalProps } = props;
	const [mounted, setMounted] = import_react.useState(false);
	useLayoutEffect2(() => setMounted(true), []);
	const container = containerProp || mounted && globalThis?.document?.body;
	return container ? import_react_dom.createPortal(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.div, {
		...portalProps,
		ref: forwardedRef
	}), container) : null;
});
Portal$2.displayName = PORTAL_NAME$4;
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-presence@1.1.5_@types+react-dom@19.2.3_@types+react@19.2.14__@types+rea_c01c26c80b5ab5e3ecefbda6eca51ad1/node_modules/@radix-ui/react-presence/dist/index.mjs
function useStateMachine(initialState, machine) {
	return import_react.useReducer((state, event) => {
		return machine[state][event] ?? state;
	}, initialState);
}
var Presence = (props) => {
	const { present, children } = props;
	const presence = usePresence(present);
	const child = typeof children === "function" ? children({ present: presence.isPresent }) : import_react.Children.only(children);
	const ref = useComposedRefs(presence.ref, getElementRef$1(child));
	return typeof children === "function" || presence.isPresent ? import_react.cloneElement(child, { ref }) : null;
};
Presence.displayName = "Presence";
function usePresence(present) {
	const [node, setNode] = import_react.useState();
	const stylesRef = import_react.useRef(null);
	const prevPresentRef = import_react.useRef(present);
	const prevAnimationNameRef = import_react.useRef("none");
	const [state, send] = useStateMachine(present ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	import_react.useEffect(() => {
		const currentAnimationName = getAnimationName(stylesRef.current);
		prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
	}, [state]);
	useLayoutEffect2(() => {
		const styles = stylesRef.current;
		const wasPresent = prevPresentRef.current;
		if (wasPresent !== present) {
			const prevAnimationName = prevAnimationNameRef.current;
			const currentAnimationName = getAnimationName(styles);
			if (present) send("MOUNT");
			else if (currentAnimationName === "none" || styles?.display === "none") send("UNMOUNT");
			else if (wasPresent && prevAnimationName !== currentAnimationName) send("ANIMATION_OUT");
			else send("UNMOUNT");
			prevPresentRef.current = present;
		}
	}, [present, send]);
	useLayoutEffect2(() => {
		if (node) {
			let timeoutId;
			const ownerWindow = node.ownerDocument.defaultView ?? window;
			const handleAnimationEnd = (event) => {
				const isCurrentAnimation = getAnimationName(stylesRef.current).includes(CSS.escape(event.animationName));
				if (event.target === node && isCurrentAnimation) {
					send("ANIMATION_END");
					if (!prevPresentRef.current) {
						const currentFillMode = node.style.animationFillMode;
						node.style.animationFillMode = "forwards";
						timeoutId = ownerWindow.setTimeout(() => {
							if (node.style.animationFillMode === "forwards") node.style.animationFillMode = currentFillMode;
						});
					}
				}
			};
			const handleAnimationStart = (event) => {
				if (event.target === node) prevAnimationNameRef.current = getAnimationName(stylesRef.current);
			};
			node.addEventListener("animationstart", handleAnimationStart);
			node.addEventListener("animationcancel", handleAnimationEnd);
			node.addEventListener("animationend", handleAnimationEnd);
			return () => {
				ownerWindow.clearTimeout(timeoutId);
				node.removeEventListener("animationstart", handleAnimationStart);
				node.removeEventListener("animationcancel", handleAnimationEnd);
				node.removeEventListener("animationend", handleAnimationEnd);
			};
		} else send("ANIMATION_END");
	}, [node, send]);
	return {
		isPresent: ["mounted", "unmountSuspended"].includes(state),
		ref: import_react.useCallback((node2) => {
			stylesRef.current = node2 ? getComputedStyle(node2) : null;
			setNode(node2);
		}, [])
	};
}
function getAnimationName(styles) {
	return styles?.animationName || "none";
}
function getElementRef$1(element) {
	let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
	let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.ref;
	getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
	mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.props.ref;
	return element.props.ref || element.ref;
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-use-controllable-state@1.2.2_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var useInsertionEffect = import_react[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
function useControllableState({ prop, defaultProp, onChange = () => {}, caller }) {
	const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
		defaultProp,
		onChange
	});
	const isControlled = prop !== void 0;
	const value = isControlled ? prop : uncontrolledProp;
	{
		const isControlledRef = import_react.useRef(prop !== void 0);
		import_react.useEffect(() => {
			const wasControlled = isControlledRef.current;
			if (wasControlled !== isControlled) {
				const from = wasControlled ? "controlled" : "uncontrolled";
				const to = isControlled ? "controlled" : "uncontrolled";
				console.warn(`${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`);
			}
			isControlledRef.current = isControlled;
		}, [isControlled, caller]);
	}
	return [value, import_react.useCallback((nextValue) => {
		if (isControlled) {
			const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
			if (value2 !== prop) onChangeRef.current?.(value2);
		} else setUncontrolledProp(nextValue);
	}, [
		isControlled,
		prop,
		setUncontrolledProp,
		onChangeRef
	])];
}
function useUncontrolledState({ defaultProp, onChange }) {
	const [value, setValue] = import_react.useState(defaultProp);
	const prevValueRef = import_react.useRef(value);
	const onChangeRef = import_react.useRef(onChange);
	useInsertionEffect(() => {
		onChangeRef.current = onChange;
	}, [onChange]);
	import_react.useEffect(() => {
		if (prevValueRef.current !== value) {
			onChangeRef.current?.(value);
			prevValueRef.current = value;
		}
	}, [value, prevValueRef]);
	return [
		value,
		setValue,
		onChangeRef
	];
}
function isFunction(value) {
	return typeof value === "function";
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-visually-hidden@1.2.3_@types+react-dom@19.2.3_@types+react@19.2.14__@ty_fa89646d7248b32d1762bf88948f6339/node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
var VISUALLY_HIDDEN_STYLES = Object.freeze({
	position: "absolute",
	border: 0,
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	wordWrap: "normal"
});
var NAME$2 = "VisuallyHidden";
var VisuallyHidden = import_react.forwardRef((props, forwardedRef) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.span, {
		...props,
		ref: forwardedRef,
		style: {
			...VISUALLY_HIDDEN_STYLES,
			...props.style
		}
	});
});
VisuallyHidden.displayName = NAME$2;
var Root$5 = VisuallyHidden;
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function r(e) {
	var t, f, n = "";
	if ("string" == typeof e || "number" == typeof e) n += e;
	else if ("object" == typeof e) if (Array.isArray(e)) {
		var o = e.length;
		for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
	} else for (f in e) e[f] && (n && (n += " "), n += f);
	return n;
}
function clsx() {
	for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
	return n;
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/class-variance-authority@0.7.1/node_modules/class-variance-authority/dist/index.mjs
/**
* Copyright 2022 Joe Bell. All rights reserved.
*
* This file is licensed to you under the Apache License, Version 2.0
* (the "License"); you may not use this file except in compliance with the
* License. You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
* WARRANTIES OR REPRESENTATIONS OF ANY KIND, either express or implied. See the
* License for the specific language governing permissions and limitations under
* the License.
*/ var falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
var cx = clsx;
var cva = (base, config) => (props) => {
	var _config_compoundVariants;
	if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
	const { variants, defaultVariants } = config;
	const getVariantClassNames = Object.keys(variants).map((variant) => {
		const variantProp = props === null || props === void 0 ? void 0 : props[variant];
		const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
		if (variantProp === null) return null;
		const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
		return variants[variant][variantKey];
	});
	const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
		let [key, value] = param;
		if (value === void 0) return acc;
		acc[key] = value;
		return acc;
	}, {});
	return cx(base, getVariantClassNames, config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
		let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
		return Object.entries(compoundVariantOptions).every((param) => {
			let [key, value] = param;
			return Array.isArray(value) ? value.includes({
				...defaultVariants,
				...propsWithoutUndefined
			}[key]) : {
				...defaultVariants,
				...propsWithoutUndefined
			}[key] === value;
		}) ? [
			...acc,
			cvClass,
			cvClassName
		] : acc;
	}, []), props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/lucide-react@0.577.0_react@19.2.4/node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.js
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/lucide-react@0.577.0_react@19.2.4/node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.js
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/lucide-react@0.577.0_react@19.2.4/node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.js
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/lucide-react@0.577.0_react@19.2.4/node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.js
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toPascalCase = (string) => {
	const camelCase = toCamelCase(string);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/lucide-react@0.577.0_react@19.2.4/node_modules/lucide-react/dist/esm/defaultAttributes.js
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/lucide-react@0.577.0_react@19.2.4/node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.js
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
	return false;
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/lucide-react@0.577.0_react@19.2.4/node_modules/lucide-react/dist/esm/Icon.js
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Icon = (0, import_react.forwardRef)(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => (0, import_react.createElement)("svg", {
	ref,
	...defaultAttributes,
	width: size,
	height: size,
	stroke: color,
	strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
	className: mergeClasses("lucide", className),
	...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
	...rest
}, [...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)), ...Array.isArray(children) ? children : [children]]));
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/lucide-react@0.577.0_react@19.2.4/node_modules/lucide-react/dist/esm/createLucideIcon.js
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var createLucideIcon = (iconName, iconNode) => {
	const Component = (0, import_react.forwardRef)(({ className, ...props }, ref) => (0, import_react.createElement)(Icon, {
		ref,
		iconNode,
		className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
		...props
	}));
	Component.displayName = toPascalCase(iconName);
	return Component;
};
var Check = createLucideIcon("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]);
var ChevronRight = createLucideIcon("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]);
var Circle = createLucideIcon("circle", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}]]);
var LogOut = createLucideIcon("log-out", [
	["path", {
		d: "m16 17 5-5-5-5",
		key: "1bji2h"
	}],
	["path", {
		d: "M21 12H9",
		key: "dn1m92"
	}],
	["path", {
		d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
		key: "1uf3rs"
	}]
]);
var PanelLeft = createLucideIcon("panel-left", [["rect", {
	width: "18",
	height: "18",
	x: "3",
	y: "3",
	rx: "2",
	key: "afitv7"
}], ["path", {
	d: "M9 3v18",
	key: "fh3hqa"
}]]);
var Sparkles = createLucideIcon("sparkles", [
	["path", {
		d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
		key: "1s2grr"
	}],
	["path", {
		d: "M20 2v4",
		key: "1rf3ol"
	}],
	["path", {
		d: "M22 4h-4",
		key: "gwowj6"
	}],
	["circle", {
		cx: "4",
		cy: "20",
		r: "2",
		key: "6kqj1y"
	}]
]);
var User = createLucideIcon("user", [["path", {
	d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
	key: "975kel"
}], ["circle", {
	cx: "12",
	cy: "7",
	r: "4",
	key: "17ys0d"
}]]);
var X = createLucideIcon("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]);
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/tailwind-merge@2.6.1/node_modules/tailwind-merge/dist/bundle-mjs.mjs
var CLASS_PART_SEPARATOR = "-";
var createClassGroupUtils = (config) => {
	const classMap = createClassMap(config);
	const { conflictingClassGroups, conflictingClassGroupModifiers } = config;
	const getClassGroupId = (className) => {
		const classParts = className.split(CLASS_PART_SEPARATOR);
		if (classParts[0] === "" && classParts.length !== 1) classParts.shift();
		return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
	};
	const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
		const conflicts = conflictingClassGroups[classGroupId] || [];
		if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
		return conflicts;
	};
	return {
		getClassGroupId,
		getConflictingClassGroupIds
	};
};
var getGroupRecursive = (classParts, classPartObject) => {
	if (classParts.length === 0) return classPartObject.classGroupId;
	const currentClassPart = classParts[0];
	const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
	const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
	if (classGroupFromNextClassPart) return classGroupFromNextClassPart;
	if (classPartObject.validators.length === 0) return;
	const classRest = classParts.join(CLASS_PART_SEPARATOR);
	return classPartObject.validators.find(({ validator }) => validator(classRest))?.classGroupId;
};
var arbitraryPropertyRegex = /^\[(.+)\]$/;
var getGroupIdForArbitraryProperty = (className) => {
	if (arbitraryPropertyRegex.test(className)) {
		const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
		const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(":"));
		if (property) return "arbitrary.." + property;
	}
};
/**
* Exported for testing only
*/
var createClassMap = (config) => {
	const { theme, prefix } = config;
	const classMap = {
		nextPart: /* @__PURE__ */ new Map(),
		validators: []
	};
	getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix).forEach(([classGroupId, classGroup]) => {
		processClassesRecursively(classGroup, classMap, classGroupId, theme);
	});
	return classMap;
};
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
	classGroup.forEach((classDefinition) => {
		if (typeof classDefinition === "string") {
			const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
			classPartObjectToEdit.classGroupId = classGroupId;
			return;
		}
		if (typeof classDefinition === "function") {
			if (isThemeGetter(classDefinition)) {
				processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
				return;
			}
			classPartObject.validators.push({
				validator: classDefinition,
				classGroupId
			});
			return;
		}
		Object.entries(classDefinition).forEach(([key, classGroup]) => {
			processClassesRecursively(classGroup, getPart(classPartObject, key), classGroupId, theme);
		});
	});
};
var getPart = (classPartObject, path) => {
	let currentClassPartObject = classPartObject;
	path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
		if (!currentClassPartObject.nextPart.has(pathPart)) currentClassPartObject.nextPart.set(pathPart, {
			nextPart: /* @__PURE__ */ new Map(),
			validators: []
		});
		currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
	});
	return currentClassPartObject;
};
var isThemeGetter = (func) => func.isThemeGetter;
var getPrefixedClassGroupEntries = (classGroupEntries, prefix) => {
	if (!prefix) return classGroupEntries;
	return classGroupEntries.map(([classGroupId, classGroup]) => {
		return [classGroupId, classGroup.map((classDefinition) => {
			if (typeof classDefinition === "string") return prefix + classDefinition;
			if (typeof classDefinition === "object") return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]));
			return classDefinition;
		})];
	});
};
var createLruCache = (maxCacheSize) => {
	if (maxCacheSize < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let cacheSize = 0;
	let cache = /* @__PURE__ */ new Map();
	let previousCache = /* @__PURE__ */ new Map();
	const update = (key, value) => {
		cache.set(key, value);
		cacheSize++;
		if (cacheSize > maxCacheSize) {
			cacheSize = 0;
			previousCache = cache;
			cache = /* @__PURE__ */ new Map();
		}
	};
	return {
		get(key) {
			let value = cache.get(key);
			if (value !== void 0) return value;
			if ((value = previousCache.get(key)) !== void 0) {
				update(key, value);
				return value;
			}
		},
		set(key, value) {
			if (cache.has(key)) cache.set(key, value);
			else update(key, value);
		}
	};
};
var IMPORTANT_MODIFIER = "!";
var createParseClassName = (config) => {
	const { separator, experimentalParseClassName } = config;
	const isSeparatorSingleCharacter = separator.length === 1;
	const firstSeparatorCharacter = separator[0];
	const separatorLength = separator.length;
	const parseClassName = (className) => {
		const modifiers = [];
		let bracketDepth = 0;
		let modifierStart = 0;
		let postfixModifierPosition;
		for (let index = 0; index < className.length; index++) {
			let currentCharacter = className[index];
			if (bracketDepth === 0) {
				if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
					modifiers.push(className.slice(modifierStart, index));
					modifierStart = index + separatorLength;
					continue;
				}
				if (currentCharacter === "/") {
					postfixModifierPosition = index;
					continue;
				}
			}
			if (currentCharacter === "[") bracketDepth++;
			else if (currentCharacter === "]") bracketDepth--;
		}
		const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
		const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
		return {
			modifiers,
			hasImportantModifier,
			baseClassName: hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier,
			maybePostfixModifierPosition: postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0
		};
	};
	if (experimentalParseClassName) return (className) => experimentalParseClassName({
		className,
		parseClassName
	});
	return parseClassName;
};
/**
* Sorts modifiers according to following schema:
* - Predefined modifiers are sorted alphabetically
* - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
*/
var sortModifiers = (modifiers) => {
	if (modifiers.length <= 1) return modifiers;
	const sortedModifiers = [];
	let unsortedModifiers = [];
	modifiers.forEach((modifier) => {
		if (modifier[0] === "[") {
			sortedModifiers.push(...unsortedModifiers.sort(), modifier);
			unsortedModifiers = [];
		} else unsortedModifiers.push(modifier);
	});
	sortedModifiers.push(...unsortedModifiers.sort());
	return sortedModifiers;
};
var createConfigUtils = (config) => ({
	cache: createLruCache(config.cacheSize),
	parseClassName: createParseClassName(config),
	...createClassGroupUtils(config)
});
var SPLIT_CLASSES_REGEX = /\s+/;
var mergeClassList = (classList, configUtils) => {
	const { parseClassName, getClassGroupId, getConflictingClassGroupIds } = configUtils;
	/**
	* Set of classGroupIds in following format:
	* `{importantModifier}{variantModifiers}{classGroupId}`
	* @example 'float'
	* @example 'hover:focus:bg-color'
	* @example 'md:!pr'
	*/
	const classGroupsInConflict = [];
	const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
	let result = "";
	for (let index = classNames.length - 1; index >= 0; index -= 1) {
		const originalClassName = classNames[index];
		const { modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition } = parseClassName(originalClassName);
		let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
		let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
		if (!classGroupId) {
			if (!hasPostfixModifier) {
				result = originalClassName + (result.length > 0 ? " " + result : result);
				continue;
			}
			classGroupId = getClassGroupId(baseClassName);
			if (!classGroupId) {
				result = originalClassName + (result.length > 0 ? " " + result : result);
				continue;
			}
			hasPostfixModifier = false;
		}
		const variantModifier = sortModifiers(modifiers).join(":");
		const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
		const classId = modifierId + classGroupId;
		if (classGroupsInConflict.includes(classId)) continue;
		classGroupsInConflict.push(classId);
		const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
		for (let i = 0; i < conflictGroups.length; ++i) {
			const group = conflictGroups[i];
			classGroupsInConflict.push(modifierId + group);
		}
		result = originalClassName + (result.length > 0 ? " " + result : result);
	}
	return result;
};
/**
* The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
*
* Specifically:
* - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
* - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
*
* Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
*/
function twJoin() {
	let index = 0;
	let argument;
	let resolvedValue;
	let string = "";
	while (index < arguments.length) if (argument = arguments[index++]) {
		if (resolvedValue = toValue(argument)) {
			string && (string += " ");
			string += resolvedValue;
		}
	}
	return string;
}
var toValue = (mix) => {
	if (typeof mix === "string") return mix;
	let resolvedValue;
	let string = "";
	for (let k = 0; k < mix.length; k++) if (mix[k]) {
		if (resolvedValue = toValue(mix[k])) {
			string && (string += " ");
			string += resolvedValue;
		}
	}
	return string;
};
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
	let configUtils;
	let cacheGet;
	let cacheSet;
	let functionToCall = initTailwindMerge;
	function initTailwindMerge(classList) {
		configUtils = createConfigUtils(createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst()));
		cacheGet = configUtils.cache.get;
		cacheSet = configUtils.cache.set;
		functionToCall = tailwindMerge;
		return tailwindMerge(classList);
	}
	function tailwindMerge(classList) {
		const cachedResult = cacheGet(classList);
		if (cachedResult) return cachedResult;
		const result = mergeClassList(classList, configUtils);
		cacheSet(classList, result);
		return result;
	}
	return function callTailwindMerge() {
		return functionToCall(twJoin.apply(null, arguments));
	};
}
var fromTheme = (key) => {
	const themeGetter = (theme) => theme[key] || [];
	themeGetter.isThemeGetter = true;
	return themeGetter;
};
var arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
var fractionRegex = /^\d+\/\d+$/;
var stringLengths = /* @__PURE__ */ new Set([
	"px",
	"full",
	"screen"
]);
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var isLength = (value) => isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
var isArbitraryLength = (value) => getIsArbitraryValue(value, "length", isLengthOnly);
var isNumber = (value) => Boolean(value) && !Number.isNaN(Number(value));
var isArbitraryNumber = (value) => getIsArbitraryValue(value, "number", isNumber);
var isInteger = (value) => Boolean(value) && Number.isInteger(Number(value));
var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
var isTshirtSize = (value) => tshirtUnitRegex.test(value);
var sizeLabels = /* @__PURE__ */ new Set([
	"length",
	"size",
	"percentage"
]);
var isArbitrarySize = (value) => getIsArbitraryValue(value, sizeLabels, isNever);
var isArbitraryPosition = (value) => getIsArbitraryValue(value, "position", isNever);
var imageLabels = /* @__PURE__ */ new Set(["image", "url"]);
var isArbitraryImage = (value) => getIsArbitraryValue(value, imageLabels, isImage);
var isArbitraryShadow = (value) => getIsArbitraryValue(value, "", isShadow);
var isAny = () => true;
var getIsArbitraryValue = (value, label, testValue) => {
	const result = arbitraryValueRegex.exec(value);
	if (result) {
		if (result[1]) return typeof label === "string" ? result[1] === label : label.has(result[1]);
		return testValue(result[2]);
	}
	return false;
};
var isLengthOnly = (value) => lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
var isNever = () => false;
var isShadow = (value) => shadowRegex.test(value);
var isImage = (value) => imageRegex.test(value);
var getDefaultConfig = () => {
	const colors = fromTheme("colors");
	const spacing = fromTheme("spacing");
	const blur = fromTheme("blur");
	const brightness = fromTheme("brightness");
	const borderColor = fromTheme("borderColor");
	const borderRadius = fromTheme("borderRadius");
	const borderSpacing = fromTheme("borderSpacing");
	const borderWidth = fromTheme("borderWidth");
	const contrast = fromTheme("contrast");
	const grayscale = fromTheme("grayscale");
	const hueRotate = fromTheme("hueRotate");
	const invert = fromTheme("invert");
	const gap = fromTheme("gap");
	const gradientColorStops = fromTheme("gradientColorStops");
	const gradientColorStopPositions = fromTheme("gradientColorStopPositions");
	const inset = fromTheme("inset");
	const margin = fromTheme("margin");
	const opacity = fromTheme("opacity");
	const padding = fromTheme("padding");
	const saturate = fromTheme("saturate");
	const scale = fromTheme("scale");
	const sepia = fromTheme("sepia");
	const skew = fromTheme("skew");
	const space = fromTheme("space");
	const translate = fromTheme("translate");
	const getOverscroll = () => [
		"auto",
		"contain",
		"none"
	];
	const getOverflow = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	];
	const getSpacingWithAutoAndArbitrary = () => [
		"auto",
		isArbitraryValue,
		spacing
	];
	const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
	const getLengthWithEmptyAndArbitrary = () => [
		"",
		isLength,
		isArbitraryLength
	];
	const getNumberWithAutoAndArbitrary = () => [
		"auto",
		isNumber,
		isArbitraryValue
	];
	const getPositions = () => [
		"bottom",
		"center",
		"left",
		"left-bottom",
		"left-top",
		"right",
		"right-bottom",
		"right-top",
		"top"
	];
	const getLineStyles = () => [
		"solid",
		"dashed",
		"dotted",
		"double",
		"none"
	];
	const getBlendModes = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	];
	const getAlign = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch"
	];
	const getZeroAndEmpty = () => [
		"",
		"0",
		isArbitraryValue
	];
	const getBreaks = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	];
	const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
	return {
		cacheSize: 500,
		separator: ":",
		theme: {
			colors: [isAny],
			spacing: [isLength, isArbitraryLength],
			blur: [
				"none",
				"",
				isTshirtSize,
				isArbitraryValue
			],
			brightness: getNumberAndArbitrary(),
			borderColor: [colors],
			borderRadius: [
				"none",
				"",
				"full",
				isTshirtSize,
				isArbitraryValue
			],
			borderSpacing: getSpacingWithArbitrary(),
			borderWidth: getLengthWithEmptyAndArbitrary(),
			contrast: getNumberAndArbitrary(),
			grayscale: getZeroAndEmpty(),
			hueRotate: getNumberAndArbitrary(),
			invert: getZeroAndEmpty(),
			gap: getSpacingWithArbitrary(),
			gradientColorStops: [colors],
			gradientColorStopPositions: [isPercent, isArbitraryLength],
			inset: getSpacingWithAutoAndArbitrary(),
			margin: getSpacingWithAutoAndArbitrary(),
			opacity: getNumberAndArbitrary(),
			padding: getSpacingWithArbitrary(),
			saturate: getNumberAndArbitrary(),
			scale: getNumberAndArbitrary(),
			sepia: getZeroAndEmpty(),
			skew: getNumberAndArbitrary(),
			space: getSpacingWithArbitrary(),
			translate: getSpacingWithArbitrary()
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				"video",
				isArbitraryValue
			] }],
			container: ["container"],
			columns: [{ columns: [isTshirtSize] }],
			"break-after": [{ "break-after": getBreaks() }],
			"break-before": [{ "break-before": getBreaks() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: [...getPositions(), isArbitraryValue] }],
			overflow: [{ overflow: getOverflow() }],
			"overflow-x": [{ "overflow-x": getOverflow() }],
			"overflow-y": [{ "overflow-y": getOverflow() }],
			overscroll: [{ overscroll: getOverscroll() }],
			"overscroll-x": [{ "overscroll-x": getOverscroll() }],
			"overscroll-y": [{ "overscroll-y": getOverscroll() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: [inset] }],
			"inset-x": [{ "inset-x": [inset] }],
			"inset-y": [{ "inset-y": [inset] }],
			start: [{ start: [inset] }],
			end: [{ end: [inset] }],
			top: [{ top: [inset] }],
			right: [{ right: [inset] }],
			bottom: [{ bottom: [inset] }],
			left: [{ left: [inset] }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				"auto",
				isInteger,
				isArbitraryValue
			] }],
			basis: [{ basis: getSpacingWithAutoAndArbitrary() }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"wrap",
				"wrap-reverse",
				"nowrap"
			] }],
			flex: [{ flex: [
				"1",
				"auto",
				"initial",
				"none",
				isArbitraryValue
			] }],
			grow: [{ grow: getZeroAndEmpty() }],
			shrink: [{ shrink: getZeroAndEmpty() }],
			order: [{ order: [
				"first",
				"last",
				"none",
				isInteger,
				isArbitraryValue
			] }],
			"grid-cols": [{ "grid-cols": [isAny] }],
			"col-start-end": [{ col: [
				"auto",
				{ span: [
					"full",
					isInteger,
					isArbitraryValue
				] },
				isArbitraryValue
			] }],
			"col-start": [{ "col-start": getNumberWithAutoAndArbitrary() }],
			"col-end": [{ "col-end": getNumberWithAutoAndArbitrary() }],
			"grid-rows": [{ "grid-rows": [isAny] }],
			"row-start-end": [{ row: [
				"auto",
				{ span: [isInteger, isArbitraryValue] },
				isArbitraryValue
			] }],
			"row-start": [{ "row-start": getNumberWithAutoAndArbitrary() }],
			"row-end": [{ "row-end": getNumberWithAutoAndArbitrary() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": [
				"auto",
				"min",
				"max",
				"fr",
				isArbitraryValue
			] }],
			"auto-rows": [{ "auto-rows": [
				"auto",
				"min",
				"max",
				"fr",
				isArbitraryValue
			] }],
			gap: [{ gap: [gap] }],
			"gap-x": [{ "gap-x": [gap] }],
			"gap-y": [{ "gap-y": [gap] }],
			"justify-content": [{ justify: ["normal", ...getAlign()] }],
			"justify-items": [{ "justify-items": [
				"start",
				"end",
				"center",
				"stretch"
			] }],
			"justify-self": [{ "justify-self": [
				"auto",
				"start",
				"end",
				"center",
				"stretch"
			] }],
			"align-content": [{ content: [
				"normal",
				...getAlign(),
				"baseline"
			] }],
			"align-items": [{ items: [
				"start",
				"end",
				"center",
				"baseline",
				"stretch"
			] }],
			"align-self": [{ self: [
				"auto",
				"start",
				"end",
				"center",
				"stretch",
				"baseline"
			] }],
			"place-content": [{ "place-content": [...getAlign(), "baseline"] }],
			"place-items": [{ "place-items": [
				"start",
				"end",
				"center",
				"baseline",
				"stretch"
			] }],
			"place-self": [{ "place-self": [
				"auto",
				"start",
				"end",
				"center",
				"stretch"
			] }],
			p: [{ p: [padding] }],
			px: [{ px: [padding] }],
			py: [{ py: [padding] }],
			ps: [{ ps: [padding] }],
			pe: [{ pe: [padding] }],
			pt: [{ pt: [padding] }],
			pr: [{ pr: [padding] }],
			pb: [{ pb: [padding] }],
			pl: [{ pl: [padding] }],
			m: [{ m: [margin] }],
			mx: [{ mx: [margin] }],
			my: [{ my: [margin] }],
			ms: [{ ms: [margin] }],
			me: [{ me: [margin] }],
			mt: [{ mt: [margin] }],
			mr: [{ mr: [margin] }],
			mb: [{ mb: [margin] }],
			ml: [{ ml: [margin] }],
			"space-x": [{ "space-x": [space] }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": [space] }],
			"space-y-reverse": ["space-y-reverse"],
			w: [{ w: [
				"auto",
				"min",
				"max",
				"fit",
				"svw",
				"lvw",
				"dvw",
				isArbitraryValue,
				spacing
			] }],
			"min-w": [{ "min-w": [
				isArbitraryValue,
				spacing,
				"min",
				"max",
				"fit"
			] }],
			"max-w": [{ "max-w": [
				isArbitraryValue,
				spacing,
				"none",
				"full",
				"min",
				"max",
				"fit",
				"prose",
				{ screen: [isTshirtSize] },
				isTshirtSize
			] }],
			h: [{ h: [
				isArbitraryValue,
				spacing,
				"auto",
				"min",
				"max",
				"fit",
				"svh",
				"lvh",
				"dvh"
			] }],
			"min-h": [{ "min-h": [
				isArbitraryValue,
				spacing,
				"min",
				"max",
				"fit",
				"svh",
				"lvh",
				"dvh"
			] }],
			"max-h": [{ "max-h": [
				isArbitraryValue,
				spacing,
				"min",
				"max",
				"fit",
				"svh",
				"lvh",
				"dvh"
			] }],
			size: [{ size: [
				isArbitraryValue,
				spacing,
				"auto",
				"min",
				"max",
				"fit"
			] }],
			"font-size": [{ text: [
				"base",
				isTshirtSize,
				isArbitraryLength
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black",
				isArbitraryNumber
			] }],
			"font-family": [{ font: [isAny] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest",
				isArbitraryValue
			] }],
			"line-clamp": [{ "line-clamp": [
				"none",
				isNumber,
				isArbitraryNumber
			] }],
			leading: [{ leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose",
				isLength,
				isArbitraryValue
			] }],
			"list-image": [{ "list-image": ["none", isArbitraryValue] }],
			"list-style-type": [{ list: [
				"none",
				"disc",
				"decimal",
				isArbitraryValue
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"placeholder-color": [{ placeholder: [colors] }],
			"placeholder-opacity": [{ "placeholder-opacity": [opacity] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"text-color": [{ text: [colors] }],
			"text-opacity": [{ "text-opacity": [opacity] }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...getLineStyles(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				"auto",
				"from-font",
				isLength,
				isArbitraryLength
			] }],
			"underline-offset": [{ "underline-offset": [
				"auto",
				isLength,
				isArbitraryValue
			] }],
			"text-decoration-color": [{ decoration: [colors] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: getSpacingWithArbitrary() }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				isArbitraryValue
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: ["none", isArbitraryValue] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-opacity": [{ "bg-opacity": [opacity] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: [...getPositions(), isArbitraryPosition] }],
			"bg-repeat": [{ bg: ["no-repeat", { repeat: [
				"",
				"x",
				"y",
				"round",
				"space"
			] }] }],
			"bg-size": [{ bg: [
				"auto",
				"cover",
				"contain",
				isArbitrarySize
			] }],
			"bg-image": [{ bg: [
				"none",
				{ "gradient-to": [
					"t",
					"tr",
					"r",
					"br",
					"b",
					"bl",
					"l",
					"tl"
				] },
				isArbitraryImage
			] }],
			"bg-color": [{ bg: [colors] }],
			"gradient-from-pos": [{ from: [gradientColorStopPositions] }],
			"gradient-via-pos": [{ via: [gradientColorStopPositions] }],
			"gradient-to-pos": [{ to: [gradientColorStopPositions] }],
			"gradient-from": [{ from: [gradientColorStops] }],
			"gradient-via": [{ via: [gradientColorStops] }],
			"gradient-to": [{ to: [gradientColorStops] }],
			rounded: [{ rounded: [borderRadius] }],
			"rounded-s": [{ "rounded-s": [borderRadius] }],
			"rounded-e": [{ "rounded-e": [borderRadius] }],
			"rounded-t": [{ "rounded-t": [borderRadius] }],
			"rounded-r": [{ "rounded-r": [borderRadius] }],
			"rounded-b": [{ "rounded-b": [borderRadius] }],
			"rounded-l": [{ "rounded-l": [borderRadius] }],
			"rounded-ss": [{ "rounded-ss": [borderRadius] }],
			"rounded-se": [{ "rounded-se": [borderRadius] }],
			"rounded-ee": [{ "rounded-ee": [borderRadius] }],
			"rounded-es": [{ "rounded-es": [borderRadius] }],
			"rounded-tl": [{ "rounded-tl": [borderRadius] }],
			"rounded-tr": [{ "rounded-tr": [borderRadius] }],
			"rounded-br": [{ "rounded-br": [borderRadius] }],
			"rounded-bl": [{ "rounded-bl": [borderRadius] }],
			"border-w": [{ border: [borderWidth] }],
			"border-w-x": [{ "border-x": [borderWidth] }],
			"border-w-y": [{ "border-y": [borderWidth] }],
			"border-w-s": [{ "border-s": [borderWidth] }],
			"border-w-e": [{ "border-e": [borderWidth] }],
			"border-w-t": [{ "border-t": [borderWidth] }],
			"border-w-r": [{ "border-r": [borderWidth] }],
			"border-w-b": [{ "border-b": [borderWidth] }],
			"border-w-l": [{ "border-l": [borderWidth] }],
			"border-opacity": [{ "border-opacity": [opacity] }],
			"border-style": [{ border: [...getLineStyles(), "hidden"] }],
			"divide-x": [{ "divide-x": [borderWidth] }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": [borderWidth] }],
			"divide-y-reverse": ["divide-y-reverse"],
			"divide-opacity": [{ "divide-opacity": [opacity] }],
			"divide-style": [{ divide: getLineStyles() }],
			"border-color": [{ border: [borderColor] }],
			"border-color-x": [{ "border-x": [borderColor] }],
			"border-color-y": [{ "border-y": [borderColor] }],
			"border-color-s": [{ "border-s": [borderColor] }],
			"border-color-e": [{ "border-e": [borderColor] }],
			"border-color-t": [{ "border-t": [borderColor] }],
			"border-color-r": [{ "border-r": [borderColor] }],
			"border-color-b": [{ "border-b": [borderColor] }],
			"border-color-l": [{ "border-l": [borderColor] }],
			"divide-color": [{ divide: [borderColor] }],
			"outline-style": [{ outline: ["", ...getLineStyles()] }],
			"outline-offset": [{ "outline-offset": [isLength, isArbitraryValue] }],
			"outline-w": [{ outline: [isLength, isArbitraryLength] }],
			"outline-color": [{ outline: [colors] }],
			"ring-w": [{ ring: getLengthWithEmptyAndArbitrary() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: [colors] }],
			"ring-opacity": [{ "ring-opacity": [opacity] }],
			"ring-offset-w": [{ "ring-offset": [isLength, isArbitraryLength] }],
			"ring-offset-color": [{ "ring-offset": [colors] }],
			shadow: [{ shadow: [
				"",
				"inner",
				"none",
				isTshirtSize,
				isArbitraryShadow
			] }],
			"shadow-color": [{ shadow: [isAny] }],
			opacity: [{ opacity: [opacity] }],
			"mix-blend": [{ "mix-blend": [
				...getBlendModes(),
				"plus-lighter",
				"plus-darker"
			] }],
			"bg-blend": [{ "bg-blend": getBlendModes() }],
			filter: [{ filter: ["", "none"] }],
			blur: [{ blur: [blur] }],
			brightness: [{ brightness: [brightness] }],
			contrast: [{ contrast: [contrast] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				isTshirtSize,
				isArbitraryValue
			] }],
			grayscale: [{ grayscale: [grayscale] }],
			"hue-rotate": [{ "hue-rotate": [hueRotate] }],
			invert: [{ invert: [invert] }],
			saturate: [{ saturate: [saturate] }],
			sepia: [{ sepia: [sepia] }],
			"backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
			"backdrop-blur": [{ "backdrop-blur": [blur] }],
			"backdrop-brightness": [{ "backdrop-brightness": [brightness] }],
			"backdrop-contrast": [{ "backdrop-contrast": [contrast] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [grayscale] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [hueRotate] }],
			"backdrop-invert": [{ "backdrop-invert": [invert] }],
			"backdrop-opacity": [{ "backdrop-opacity": [opacity] }],
			"backdrop-saturate": [{ "backdrop-saturate": [saturate] }],
			"backdrop-sepia": [{ "backdrop-sepia": [sepia] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": [borderSpacing] }],
			"border-spacing-x": [{ "border-spacing-x": [borderSpacing] }],
			"border-spacing-y": [{ "border-spacing-y": [borderSpacing] }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"none",
				"all",
				"",
				"colors",
				"opacity",
				"shadow",
				"transform",
				isArbitraryValue
			] }],
			duration: [{ duration: getNumberAndArbitrary() }],
			ease: [{ ease: [
				"linear",
				"in",
				"out",
				"in-out",
				isArbitraryValue
			] }],
			delay: [{ delay: getNumberAndArbitrary() }],
			animate: [{ animate: [
				"none",
				"spin",
				"ping",
				"pulse",
				"bounce",
				isArbitraryValue
			] }],
			transform: [{ transform: [
				"",
				"gpu",
				"none"
			] }],
			scale: [{ scale: [scale] }],
			"scale-x": [{ "scale-x": [scale] }],
			"scale-y": [{ "scale-y": [scale] }],
			rotate: [{ rotate: [isInteger, isArbitraryValue] }],
			"translate-x": [{ "translate-x": [translate] }],
			"translate-y": [{ "translate-y": [translate] }],
			"skew-x": [{ "skew-x": [skew] }],
			"skew-y": [{ "skew-y": [skew] }],
			"transform-origin": [{ origin: [
				"center",
				"top",
				"top-right",
				"right",
				"bottom-right",
				"bottom",
				"bottom-left",
				"left",
				"top-left",
				isArbitraryValue
			] }],
			accent: [{ accent: ["auto", colors] }],
			appearance: [{ appearance: ["none", "auto"] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				isArbitraryValue
			] }],
			"caret-color": [{ caret: [colors] }],
			"pointer-events": [{ "pointer-events": ["none", "auto"] }],
			resize: [{ resize: [
				"none",
				"y",
				"x",
				""
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scroll-m": [{ "scroll-m": getSpacingWithArbitrary() }],
			"scroll-mx": [{ "scroll-mx": getSpacingWithArbitrary() }],
			"scroll-my": [{ "scroll-my": getSpacingWithArbitrary() }],
			"scroll-ms": [{ "scroll-ms": getSpacingWithArbitrary() }],
			"scroll-me": [{ "scroll-me": getSpacingWithArbitrary() }],
			"scroll-mt": [{ "scroll-mt": getSpacingWithArbitrary() }],
			"scroll-mr": [{ "scroll-mr": getSpacingWithArbitrary() }],
			"scroll-mb": [{ "scroll-mb": getSpacingWithArbitrary() }],
			"scroll-ml": [{ "scroll-ml": getSpacingWithArbitrary() }],
			"scroll-p": [{ "scroll-p": getSpacingWithArbitrary() }],
			"scroll-px": [{ "scroll-px": getSpacingWithArbitrary() }],
			"scroll-py": [{ "scroll-py": getSpacingWithArbitrary() }],
			"scroll-ps": [{ "scroll-ps": getSpacingWithArbitrary() }],
			"scroll-pe": [{ "scroll-pe": getSpacingWithArbitrary() }],
			"scroll-pt": [{ "scroll-pt": getSpacingWithArbitrary() }],
			"scroll-pr": [{ "scroll-pr": getSpacingWithArbitrary() }],
			"scroll-pb": [{ "scroll-pb": getSpacingWithArbitrary() }],
			"scroll-pl": [{ "scroll-pl": getSpacingWithArbitrary() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				isArbitraryValue
			] }],
			fill: [{ fill: [colors, "none"] }],
			"stroke-w": [{ stroke: [
				isLength,
				isArbitraryLength,
				isArbitraryNumber
			] }],
			stroke: [{ stroke: [colors, "none"] }],
			sr: ["sr-only", "not-sr-only"],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-s",
				"border-w-e",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-s",
				"border-color-e",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] }
	};
};
var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
//#endregion
//#region src/lib/utils.ts
/**
* Merges multiple class names into a single string
* @param inputs - Array of class names
* @returns Merged class names
*/
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-id@1.1.1_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-id/dist/index.mjs
var useReactId = import_react[" useId ".trim().toString()] || (() => void 0);
var count$1 = 0;
function useId(deterministicId) {
	const [id, setId] = import_react.useState(useReactId());
	useLayoutEffect2(() => {
		if (!deterministicId) setId((reactId) => reactId ?? String(count$1++));
	}, [deterministicId]);
	return deterministicId || (id ? `radix-${id}` : "");
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
/**
* Custom positioning reference element.
* @see https://floating-ui.com/docs/virtual-elements
*/
var sides = [
	"top",
	"right",
	"bottom",
	"left"
];
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
	x: v,
	y: v
});
var oppositeSideMap = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function clamp(start, value, end) {
	return max(start, min(value, end));
}
function evaluate(value, param) {
	return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
	return placement.split("-")[0];
}
function getAlignment(placement) {
	return placement.split("-")[1];
}
function getOppositeAxis(axis) {
	return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
	return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
	const firstChar = placement[0];
	return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
	return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
	if (rtl === void 0) rtl = false;
	const alignment = getAlignment(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const length = getAxisLength(alignmentAxis);
	let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
	if (rects.reference[length] > rects.floating[length]) mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
	return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
	const oppositePlacement = getOppositePlacement(placement);
	return [
		getOppositeAlignmentPlacement(placement),
		oppositePlacement,
		getOppositeAlignmentPlacement(oppositePlacement)
	];
}
function getOppositeAlignmentPlacement(placement) {
	return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
	switch (side) {
		case "top":
		case "bottom":
			if (rtl) return isStart ? rlPlacement : lrPlacement;
			return isStart ? lrPlacement : rlPlacement;
		case "left":
		case "right": return isStart ? tbPlacement : btPlacement;
		default: return [];
	}
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
	const alignment = getAlignment(placement);
	let list = getSideList(getSide(placement), direction === "start", rtl);
	if (alignment) {
		list = list.map((side) => side + "-" + alignment);
		if (flipAlignment) list = list.concat(list.map(getOppositeAlignmentPlacement));
	}
	return list;
}
function getOppositePlacement(placement) {
	const side = getSide(placement);
	return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...padding
	};
}
function getPaddingObject(padding) {
	return typeof padding !== "number" ? expandPaddingObject(padding) : {
		top: padding,
		right: padding,
		bottom: padding,
		left: padding
	};
}
function rectToClientRect(rect) {
	const { x, y, width, height } = rect;
	return {
		width,
		height,
		top: y,
		left: x,
		right: x + width,
		bottom: y + height,
		x,
		y
	};
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@floating-ui+core@1.7.5/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
	let { reference, floating } = _ref;
	const sideAxis = getSideAxis(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const alignLength = getAxisLength(alignmentAxis);
	const side = getSide(placement);
	const isVertical = sideAxis === "y";
	const commonX = reference.x + reference.width / 2 - floating.width / 2;
	const commonY = reference.y + reference.height / 2 - floating.height / 2;
	const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
	let coords;
	switch (side) {
		case "top":
			coords = {
				x: commonX,
				y: reference.y - floating.height
			};
			break;
		case "bottom":
			coords = {
				x: commonX,
				y: reference.y + reference.height
			};
			break;
		case "right":
			coords = {
				x: reference.x + reference.width,
				y: commonY
			};
			break;
		case "left":
			coords = {
				x: reference.x - floating.width,
				y: commonY
			};
			break;
		default: coords = {
			x: reference.x,
			y: reference.y
		};
	}
	switch (getAlignment(placement)) {
		case "start":
			coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
			break;
		case "end":
			coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
			break;
	}
	return coords;
}
/**
* Resolves with an object of overflow side offsets that determine how much the
* element is overflowing a given clipping boundary on each side.
* - positive = overflowing the boundary by that number of pixels
* - negative = how many pixels left before it will overflow
* - 0 = lies flush with the boundary
* @see https://floating-ui.com/docs/detectOverflow
*/
async function detectOverflow(state, options) {
	var _await$platform$isEle;
	if (options === void 0) options = {};
	const { x, y, platform, rects, elements, strategy } = state;
	const { boundary = "clippingAncestors", rootBoundary = "viewport", elementContext = "floating", altBoundary = false, padding = 0 } = evaluate(options, state);
	const paddingObject = getPaddingObject(padding);
	const element = elements[altBoundary ? elementContext === "floating" ? "reference" : "floating" : elementContext];
	const clippingClientRect = rectToClientRect(await platform.getClippingRect({
		element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating)),
		boundary,
		rootBoundary,
		strategy
	}));
	const rect = elementContext === "floating" ? {
		x,
		y,
		width: rects.floating.width,
		height: rects.floating.height
	} : rects.reference;
	const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
	const offsetScale = await (platform.isElement == null ? void 0 : platform.isElement(offsetParent)) ? await (platform.getScale == null ? void 0 : platform.getScale(offsetParent)) || {
		x: 1,
		y: 1
	} : {
		x: 1,
		y: 1
	};
	const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements,
		rect,
		offsetParent,
		strategy
	}) : rect);
	return {
		top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
		bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
		left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
		right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
	};
}
var MAX_RESET_COUNT = 50;
/**
* Computes the `x` and `y` coordinates that will place the floating element
* next to a given reference element.
*
* This export does not have any `platform` interface logic. You will need to
* write one for the platform you are using Floating UI with.
*/
var computePosition$1 = async (reference, floating, config) => {
	const { placement = "bottom", strategy = "absolute", middleware = [], platform } = config;
	const platformWithDetectOverflow = platform.detectOverflow ? platform : {
		...platform,
		detectOverflow
	};
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
	let rects = await platform.getElementRects({
		reference,
		floating,
		strategy
	});
	let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
	let statefulPlacement = placement;
	let resetCount = 0;
	const middlewareData = {};
	for (let i = 0; i < middleware.length; i++) {
		const currentMiddleware = middleware[i];
		if (!currentMiddleware) continue;
		const { name, fn } = currentMiddleware;
		const { x: nextX, y: nextY, data, reset } = await fn({
			x,
			y,
			initialPlacement: placement,
			placement: statefulPlacement,
			strategy,
			middlewareData,
			rects,
			platform: platformWithDetectOverflow,
			elements: {
				reference,
				floating
			}
		});
		x = nextX != null ? nextX : x;
		y = nextY != null ? nextY : y;
		middlewareData[name] = {
			...middlewareData[name],
			...data
		};
		if (reset && resetCount < MAX_RESET_COUNT) {
			resetCount++;
			if (typeof reset === "object") {
				if (reset.placement) statefulPlacement = reset.placement;
				if (reset.rects) rects = reset.rects === true ? await platform.getElementRects({
					reference,
					floating,
					strategy
				}) : reset.rects;
				({x, y} = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
			}
			i = -1;
		}
	}
	return {
		x,
		y,
		placement: statefulPlacement,
		strategy,
		middlewareData
	};
};
/**
* Provides data to position an inner element of the floating element so that it
* appears centered to the reference element.
* @see https://floating-ui.com/docs/arrow
*/
var arrow$3 = (options) => ({
	name: "arrow",
	options,
	async fn(state) {
		const { x, y, placement, rects, platform, elements, middlewareData } = state;
		const { element, padding = 0 } = evaluate(options, state) || {};
		if (element == null) return {};
		const paddingObject = getPaddingObject(padding);
		const coords = {
			x,
			y
		};
		const axis = getAlignmentAxis(placement);
		const length = getAxisLength(axis);
		const arrowDimensions = await platform.getDimensions(element);
		const isYAxis = axis === "y";
		const minProp = isYAxis ? "top" : "left";
		const maxProp = isYAxis ? "bottom" : "right";
		const clientProp = isYAxis ? "clientHeight" : "clientWidth";
		const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
		const startDiff = coords[axis] - rects.reference[axis];
		const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
		let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
		if (!clientSize || !await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent))) clientSize = elements.floating[clientProp] || rects.floating[length];
		const centerToReference = endDiff / 2 - startDiff / 2;
		const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
		const minPadding = min(paddingObject[minProp], largestPossiblePadding);
		const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
		const min$1 = minPadding;
		const max = clientSize - arrowDimensions[length] - maxPadding;
		const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
		const offset = clamp(min$1, center, max);
		const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
		const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
		return {
			[axis]: coords[axis] + alignmentOffset,
			data: {
				[axis]: offset,
				centerOffset: center - offset - alignmentOffset,
				...shouldAddOffset && { alignmentOffset }
			},
			reset: shouldAddOffset
		};
	}
});
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip$2 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "flip",
		options,
		async fn(state) {
			var _middlewareData$arrow, _middlewareData$flip;
			const { placement, middlewareData, rects, initialPlacement, platform, elements } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true, fallbackPlacements: specifiedFallbackPlacements, fallbackStrategy = "bestFit", fallbackAxisSideDirection = "none", flipAlignment = true, ...detectOverflowOptions } = evaluate(options, state);
			if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			const side = getSide(placement);
			const initialSideAxis = getSideAxis(initialPlacement);
			const isBasePlacement = getSide(initialPlacement) === initialPlacement;
			const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
			const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
			const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
			if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
			const placements = [initialPlacement, ...fallbackPlacements];
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const overflows = [];
			let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
			if (checkMainAxis) overflows.push(overflow[side]);
			if (checkCrossAxis) {
				const sides = getAlignmentSides(placement, rects, rtl);
				overflows.push(overflow[sides[0]], overflow[sides[1]]);
			}
			overflowsData = [...overflowsData, {
				placement,
				overflows
			}];
			if (!overflows.every((side) => side <= 0)) {
				var _middlewareData$flip2, _overflowsData$filter;
				const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
				const nextPlacement = placements[nextIndex];
				if (nextPlacement) {
					if (!(checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false) || overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) return {
						data: {
							index: nextIndex,
							overflows: overflowsData
						},
						reset: { placement: nextPlacement }
					};
				}
				let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
				if (!resetPlacement) switch (fallbackStrategy) {
					case "bestFit": {
						var _overflowsData$filter2;
						const placement = (_overflowsData$filter2 = overflowsData.filter((d) => {
							if (hasFallbackAxisSideDirection) {
								const currentSideAxis = getSideAxis(d.placement);
								return currentSideAxis === initialSideAxis || currentSideAxis === "y";
							}
							return true;
						}).map((d) => [d.placement, d.overflows.filter((overflow) => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
						if (placement) resetPlacement = placement;
						break;
					}
					case "initialPlacement":
						resetPlacement = initialPlacement;
						break;
				}
				if (placement !== resetPlacement) return { reset: { placement: resetPlacement } };
			}
			return {};
		}
	};
};
function getSideOffsets(overflow, rect) {
	return {
		top: overflow.top - rect.height,
		right: overflow.right - rect.width,
		bottom: overflow.bottom - rect.height,
		left: overflow.left - rect.width
	};
}
function isAnySideFullyClipped(overflow) {
	return sides.some((side) => overflow[side] >= 0);
}
/**
* Provides data to hide the floating element in applicable situations, such as
* when it is not in the same clipping context as the reference element.
* @see https://floating-ui.com/docs/hide
*/
var hide$2 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "hide",
		options,
		async fn(state) {
			const { rects, platform } = state;
			const { strategy = "referenceHidden", ...detectOverflowOptions } = evaluate(options, state);
			switch (strategy) {
				case "referenceHidden": {
					const offsets = getSideOffsets(await platform.detectOverflow(state, {
						...detectOverflowOptions,
						elementContext: "reference"
					}), rects.reference);
					return { data: {
						referenceHiddenOffsets: offsets,
						referenceHidden: isAnySideFullyClipped(offsets)
					} };
				}
				case "escaped": {
					const offsets = getSideOffsets(await platform.detectOverflow(state, {
						...detectOverflowOptions,
						altBoundary: true
					}), rects.floating);
					return { data: {
						escapedOffsets: offsets,
						escaped: isAnySideFullyClipped(offsets)
					} };
				}
				default: return {};
			}
		}
	};
};
var originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
	const { placement, platform, elements } = state;
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
	const side = getSide(placement);
	const alignment = getAlignment(placement);
	const isVertical = getSideAxis(placement) === "y";
	const mainAxisMulti = originSides.has(side) ? -1 : 1;
	const crossAxisMulti = rtl && isVertical ? -1 : 1;
	const rawValue = evaluate(options, state);
	let { mainAxis, crossAxis, alignmentAxis } = typeof rawValue === "number" ? {
		mainAxis: rawValue,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: rawValue.mainAxis || 0,
		crossAxis: rawValue.crossAxis || 0,
		alignmentAxis: rawValue.alignmentAxis
	};
	if (alignment && typeof alignmentAxis === "number") crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
	return isVertical ? {
		x: crossAxis * crossAxisMulti,
		y: mainAxis * mainAxisMulti
	} : {
		x: mainAxis * mainAxisMulti,
		y: crossAxis * crossAxisMulti
	};
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset$2 = function(options) {
	if (options === void 0) options = 0;
	return {
		name: "offset",
		options,
		async fn(state) {
			var _middlewareData$offse, _middlewareData$arrow;
			const { x, y, placement, middlewareData } = state;
			const diffCoords = await convertValueToCoords(state, options);
			if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			return {
				x: x + diffCoords.x,
				y: y + diffCoords.y,
				data: {
					...diffCoords,
					placement
				}
			};
		}
	};
};
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift$2 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "shift",
		options,
		async fn(state) {
			const { x, y, placement, platform } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = false, limiter = { fn: (_ref) => {
				let { x, y } = _ref;
				return {
					x,
					y
				};
			} }, ...detectOverflowOptions } = evaluate(options, state);
			const coords = {
				x,
				y
			};
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const crossAxis = getSideAxis(getSide(placement));
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			if (checkMainAxis) {
				const minSide = mainAxis === "y" ? "top" : "left";
				const maxSide = mainAxis === "y" ? "bottom" : "right";
				const min = mainAxisCoord + overflow[minSide];
				const max = mainAxisCoord - overflow[maxSide];
				mainAxisCoord = clamp(min, mainAxisCoord, max);
			}
			if (checkCrossAxis) {
				const minSide = crossAxis === "y" ? "top" : "left";
				const maxSide = crossAxis === "y" ? "bottom" : "right";
				const min = crossAxisCoord + overflow[minSide];
				const max = crossAxisCoord - overflow[maxSide];
				crossAxisCoord = clamp(min, crossAxisCoord, max);
			}
			const limitedCoords = limiter.fn({
				...state,
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			});
			return {
				...limitedCoords,
				data: {
					x: limitedCoords.x - x,
					y: limitedCoords.y - y,
					enabled: {
						[mainAxis]: checkMainAxis,
						[crossAxis]: checkCrossAxis
					}
				}
			};
		}
	};
};
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
var limitShift$2 = function(options) {
	if (options === void 0) options = {};
	return {
		options,
		fn(state) {
			const { x, y, placement, rects, middlewareData } = state;
			const { offset = 0, mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true } = evaluate(options, state);
			const coords = {
				x,
				y
			};
			const crossAxis = getSideAxis(placement);
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			const rawOffset = evaluate(offset, state);
			const computedOffset = typeof rawOffset === "number" ? {
				mainAxis: rawOffset,
				crossAxis: 0
			} : {
				mainAxis: 0,
				crossAxis: 0,
				...rawOffset
			};
			if (checkMainAxis) {
				const len = mainAxis === "y" ? "height" : "width";
				const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
				const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
				if (mainAxisCoord < limitMin) mainAxisCoord = limitMin;
				else if (mainAxisCoord > limitMax) mainAxisCoord = limitMax;
			}
			if (checkCrossAxis) {
				var _middlewareData$offse, _middlewareData$offse2;
				const len = mainAxis === "y" ? "width" : "height";
				const isOriginSide = originSides.has(getSide(placement));
				const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
				const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
				if (crossAxisCoord < limitMin) crossAxisCoord = limitMin;
				else if (crossAxisCoord > limitMax) crossAxisCoord = limitMax;
			}
			return {
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			};
		}
	};
};
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
var size$2 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "size",
		options,
		async fn(state) {
			var _state$middlewareData, _state$middlewareData2;
			const { placement, rects, platform, elements } = state;
			const { apply = () => {}, ...detectOverflowOptions } = evaluate(options, state);
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const side = getSide(placement);
			const alignment = getAlignment(placement);
			const isYAxis = getSideAxis(placement) === "y";
			const { width, height } = rects.floating;
			let heightSide;
			let widthSide;
			if (side === "top" || side === "bottom") {
				heightSide = side;
				widthSide = alignment === (await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
			} else {
				widthSide = side;
				heightSide = alignment === "end" ? "top" : "bottom";
			}
			const maximumClippingHeight = height - overflow.top - overflow.bottom;
			const maximumClippingWidth = width - overflow.left - overflow.right;
			const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
			const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
			const noShift = !state.middlewareData.shift;
			let availableHeight = overflowAvailableHeight;
			let availableWidth = overflowAvailableWidth;
			if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) availableWidth = maximumClippingWidth;
			if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) availableHeight = maximumClippingHeight;
			if (noShift && !alignment) {
				const xMin = max(overflow.left, 0);
				const xMax = max(overflow.right, 0);
				const yMin = max(overflow.top, 0);
				const yMax = max(overflow.bottom, 0);
				if (isYAxis) availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
				else availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
			}
			await apply({
				...state,
				availableWidth,
				availableHeight
			});
			const nextDimensions = await platform.getDimensions(elements.floating);
			if (width !== nextDimensions.width || height !== nextDimensions.height) return { reset: { rects: true } };
			return {};
		}
	};
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
	return typeof window !== "undefined";
}
function getNodeName(node) {
	if (isNode(node)) return (node.nodeName || "").toLowerCase();
	return "#document";
}
function getWindow(node) {
	var _node$ownerDocument;
	return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
	var _ref;
	return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
	if (!hasWindow()) return false;
	return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
	if (!hasWindow()) return false;
	return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
	if (!hasWindow()) return false;
	return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
	if (!hasWindow() || typeof ShadowRoot === "undefined") return false;
	return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
	const { overflow, overflowX, overflowY, display } = getComputedStyle$1(element);
	return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
	return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
	try {
		if (element.matches(":popover-open")) return true;
	} catch (_e) {}
	try {
		return element.matches(":modal");
	} catch (_e) {
		return false;
	}
}
var willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
var containRe = /paint|layout|strict|content/;
var isNotNone = (value) => !!value && value !== "none";
var isWebKitValue;
function isContainingBlock(elementOrCss) {
	const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
	return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
	let currentNode = getParentNode(element);
	while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
		if (isContainingBlock(currentNode)) return currentNode;
		else if (isTopLayer(currentNode)) return null;
		currentNode = getParentNode(currentNode);
	}
	return null;
}
function isWebKit() {
	if (isWebKitValue == null) isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
	return isWebKitValue;
}
function isLastTraversableNode(node) {
	return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle$1(element) {
	return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
	if (isElement(element)) return {
		scrollLeft: element.scrollLeft,
		scrollTop: element.scrollTop
	};
	return {
		scrollLeft: element.scrollX,
		scrollTop: element.scrollY
	};
}
function getParentNode(node) {
	if (getNodeName(node) === "html") return node;
	const result = node.assignedSlot || node.parentNode || isShadowRoot(node) && node.host || getDocumentElement(node);
	return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
	const parentNode = getParentNode(node);
	if (isLastTraversableNode(parentNode)) return node.ownerDocument ? node.ownerDocument.body : node.body;
	if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) return parentNode;
	return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
	var _node$ownerDocument2;
	if (list === void 0) list = [];
	if (traverseIframes === void 0) traverseIframes = true;
	const scrollableAncestor = getNearestOverflowAncestor(node);
	const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
	const win = getWindow(scrollableAncestor);
	if (isBody) {
		const frameElement = getFrameElement(win);
		return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
	} else return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
	return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@floating-ui+dom@1.7.6/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
	const css = getComputedStyle$1(element);
	let width = parseFloat(css.width) || 0;
	let height = parseFloat(css.height) || 0;
	const hasOffset = isHTMLElement(element);
	const offsetWidth = hasOffset ? element.offsetWidth : width;
	const offsetHeight = hasOffset ? element.offsetHeight : height;
	const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
	if (shouldFallback) {
		width = offsetWidth;
		height = offsetHeight;
	}
	return {
		width,
		height,
		$: shouldFallback
	};
}
function unwrapElement(element) {
	return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
	const domElement = unwrapElement(element);
	if (!isHTMLElement(domElement)) return createCoords(1);
	const rect = domElement.getBoundingClientRect();
	const { width, height, $ } = getCssDimensions(domElement);
	let x = ($ ? round(rect.width) : rect.width) / width;
	let y = ($ ? round(rect.height) : rect.height) / height;
	if (!x || !Number.isFinite(x)) x = 1;
	if (!y || !Number.isFinite(y)) y = 1;
	return {
		x,
		y
	};
}
var noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
	const win = getWindow(element);
	if (!isWebKit() || !win.visualViewport) return noOffsets;
	return {
		x: win.visualViewport.offsetLeft,
		y: win.visualViewport.offsetTop
	};
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
	if (isFixed === void 0) isFixed = false;
	if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) return false;
	return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
	if (includeScale === void 0) includeScale = false;
	if (isFixedStrategy === void 0) isFixedStrategy = false;
	const clientRect = element.getBoundingClientRect();
	const domElement = unwrapElement(element);
	let scale = createCoords(1);
	if (includeScale) if (offsetParent) {
		if (isElement(offsetParent)) scale = getScale(offsetParent);
	} else scale = getScale(element);
	const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
	let x = (clientRect.left + visualOffsets.x) / scale.x;
	let y = (clientRect.top + visualOffsets.y) / scale.y;
	let width = clientRect.width / scale.x;
	let height = clientRect.height / scale.y;
	if (domElement) {
		const win = getWindow(domElement);
		const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
		let currentWin = win;
		let currentIFrame = getFrameElement(currentWin);
		while (currentIFrame && offsetParent && offsetWin !== currentWin) {
			const iframeScale = getScale(currentIFrame);
			const iframeRect = currentIFrame.getBoundingClientRect();
			const css = getComputedStyle$1(currentIFrame);
			const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
			const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
			x *= iframeScale.x;
			y *= iframeScale.y;
			width *= iframeScale.x;
			height *= iframeScale.y;
			x += left;
			y += top;
			currentWin = getWindow(currentIFrame);
			currentIFrame = getFrameElement(currentWin);
		}
	}
	return rectToClientRect({
		width,
		height,
		x,
		y
	});
}
function getWindowScrollBarX(element, rect) {
	const leftScroll = getNodeScroll(element).scrollLeft;
	if (!rect) return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
	return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
	const htmlRect = documentElement.getBoundingClientRect();
	return {
		x: htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect),
		y: htmlRect.top + scroll.scrollTop
	};
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
	let { elements, rect, offsetParent, strategy } = _ref;
	const isFixed = strategy === "fixed";
	const documentElement = getDocumentElement(offsetParent);
	const topLayer = elements ? isTopLayer(elements.floating) : false;
	if (offsetParent === documentElement || topLayer && isFixed) return rect;
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	let scale = createCoords(1);
	const offsets = createCoords(0);
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent);
			scale = getScale(offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		}
	}
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		width: rect.width * scale.x,
		height: rect.height * scale.y,
		x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
		y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
	};
}
function getClientRects(element) {
	return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
	const html = getDocumentElement(element);
	const scroll = getNodeScroll(element);
	const body = element.ownerDocument.body;
	const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
	const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
	let x = -scroll.scrollLeft + getWindowScrollBarX(element);
	const y = -scroll.scrollTop;
	if (getComputedStyle$1(body).direction === "rtl") x += max(html.clientWidth, body.clientWidth) - width;
	return {
		width,
		height,
		x,
		y
	};
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
	const win = getWindow(element);
	const html = getDocumentElement(element);
	const visualViewport = win.visualViewport;
	let width = html.clientWidth;
	let height = html.clientHeight;
	let x = 0;
	let y = 0;
	if (visualViewport) {
		width = visualViewport.width;
		height = visualViewport.height;
		const visualViewportBased = isWebKit();
		if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
			x = visualViewport.offsetLeft;
			y = visualViewport.offsetTop;
		}
	}
	const windowScrollbarX = getWindowScrollBarX(html);
	if (windowScrollbarX <= 0) {
		const doc = html.ownerDocument;
		const body = doc.body;
		const bodyStyles = getComputedStyle(body);
		const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
		const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
		if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) width -= clippingStableScrollbarWidth;
	} else if (windowScrollbarX <= SCROLLBAR_MAX) width += windowScrollbarX;
	return {
		width,
		height,
		x,
		y
	};
}
function getInnerBoundingClientRect(element, strategy) {
	const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
	const top = clientRect.top + element.clientTop;
	const left = clientRect.left + element.clientLeft;
	const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
	return {
		width: element.clientWidth * scale.x,
		height: element.clientHeight * scale.y,
		x: left * scale.x,
		y: top * scale.y
	};
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
	let rect;
	if (clippingAncestor === "viewport") rect = getViewportRect(element, strategy);
	else if (clippingAncestor === "document") rect = getDocumentRect(getDocumentElement(element));
	else if (isElement(clippingAncestor)) rect = getInnerBoundingClientRect(clippingAncestor, strategy);
	else {
		const visualOffsets = getVisualOffsets(element);
		rect = {
			x: clippingAncestor.x - visualOffsets.x,
			y: clippingAncestor.y - visualOffsets.y,
			width: clippingAncestor.width,
			height: clippingAncestor.height
		};
	}
	return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
	const parentNode = getParentNode(element);
	if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) return false;
	return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
	const cachedResult = cache.get(element);
	if (cachedResult) return cachedResult;
	let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
	let currentContainingBlockComputedStyle = null;
	const elementIsFixed = getComputedStyle$1(element).position === "fixed";
	let currentNode = elementIsFixed ? getParentNode(element) : element;
	while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
		const computedStyle = getComputedStyle$1(currentNode);
		const currentNodeIsContaining = isContainingBlock(currentNode);
		if (!currentNodeIsContaining && computedStyle.position === "fixed") currentContainingBlockComputedStyle = null;
		if (elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === "absolute" || currentContainingBlockComputedStyle.position === "fixed") || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode)) result = result.filter((ancestor) => ancestor !== currentNode);
		else currentContainingBlockComputedStyle = computedStyle;
		currentNode = getParentNode(currentNode);
	}
	cache.set(element, result);
	return result;
}
function getClippingRect(_ref) {
	let { element, boundary, rootBoundary, strategy } = _ref;
	const clippingAncestors = [...boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary), rootBoundary];
	const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
	let top = firstRect.top;
	let right = firstRect.right;
	let bottom = firstRect.bottom;
	let left = firstRect.left;
	for (let i = 1; i < clippingAncestors.length; i++) {
		const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
		top = max(rect.top, top);
		right = min(rect.right, right);
		bottom = min(rect.bottom, bottom);
		left = max(rect.left, left);
	}
	return {
		width: right - left,
		height: bottom - top,
		x: left,
		y: top
	};
}
function getDimensions(element) {
	const { width, height } = getCssDimensions(element);
	return {
		width,
		height
	};
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	const documentElement = getDocumentElement(offsetParent);
	const isFixed = strategy === "fixed";
	const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	const offsets = createCoords(0);
	function setLeftRTLScrollbarOffset() {
		offsets.x = getWindowScrollBarX(documentElement);
	}
	if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		} else if (documentElement) setLeftRTLScrollbarOffset();
	}
	if (isFixed && !isOffsetParentAnElement && documentElement) setLeftRTLScrollbarOffset();
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		x: rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x,
		y: rect.top + scroll.scrollTop - offsets.y - htmlOffset.y,
		width: rect.width,
		height: rect.height
	};
}
function isStaticPositioned(element) {
	return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
	if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") return null;
	if (polyfill) return polyfill(element);
	let rawOffsetParent = element.offsetParent;
	if (getDocumentElement(element) === rawOffsetParent) rawOffsetParent = rawOffsetParent.ownerDocument.body;
	return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
	const win = getWindow(element);
	if (isTopLayer(element)) return win;
	if (!isHTMLElement(element)) {
		let svgOffsetParent = getParentNode(element);
		while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
			if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) return svgOffsetParent;
			svgOffsetParent = getParentNode(svgOffsetParent);
		}
		return win;
	}
	let offsetParent = getTrueOffsetParent(element, polyfill);
	while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) offsetParent = getTrueOffsetParent(offsetParent, polyfill);
	if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) return win;
	return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
	const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
	const getDimensionsFn = this.getDimensions;
	const floatingDimensions = await getDimensionsFn(data.floating);
	return {
		reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
		floating: {
			x: 0,
			y: 0,
			width: floatingDimensions.width,
			height: floatingDimensions.height
		}
	};
};
function isRTL(element) {
	return getComputedStyle$1(element).direction === "rtl";
}
var platform = {
	convertOffsetParentRelativeRectToViewportRelativeRect,
	getDocumentElement,
	getClippingRect,
	getOffsetParent,
	getElementRects,
	getClientRects,
	getDimensions,
	getScale,
	isElement,
	isRTL
};
function rectsAreEqual(a, b) {
	return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
	let io = null;
	let timeoutId;
	const root = getDocumentElement(element);
	function cleanup() {
		var _io;
		clearTimeout(timeoutId);
		(_io = io) == null || _io.disconnect();
		io = null;
	}
	function refresh(skip, threshold) {
		if (skip === void 0) skip = false;
		if (threshold === void 0) threshold = 1;
		cleanup();
		const elementRectForRootMargin = element.getBoundingClientRect();
		const { left, top, width, height } = elementRectForRootMargin;
		if (!skip) onMove();
		if (!width || !height) return;
		const insetTop = floor(top);
		const insetRight = floor(root.clientWidth - (left + width));
		const insetBottom = floor(root.clientHeight - (top + height));
		const insetLeft = floor(left);
		const options = {
			rootMargin: -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px",
			threshold: max(0, min(1, threshold)) || 1
		};
		let isFirstUpdate = true;
		function handleObserve(entries) {
			const ratio = entries[0].intersectionRatio;
			if (ratio !== threshold) {
				if (!isFirstUpdate) return refresh();
				if (!ratio) timeoutId = setTimeout(() => {
					refresh(false, 1e-7);
				}, 1e3);
				else refresh(false, ratio);
			}
			if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) refresh();
			isFirstUpdate = false;
		}
		try {
			io = new IntersectionObserver(handleObserve, {
				...options,
				root: root.ownerDocument
			});
		} catch (_e) {
			io = new IntersectionObserver(handleObserve, options);
		}
		io.observe(element);
	}
	refresh(true);
	return cleanup;
}
/**
* Automatically updates the position of the floating element when necessary.
* Should only be called when the floating element is mounted on the DOM or
* visible on the screen.
* @returns cleanup function that should be invoked when the floating element is
* removed from the DOM or hidden from the screen.
* @see https://floating-ui.com/docs/autoUpdate
*/
function autoUpdate(reference, floating, update, options) {
	if (options === void 0) options = {};
	const { ancestorScroll = true, ancestorResize = true, elementResize = typeof ResizeObserver === "function", layoutShift = typeof IntersectionObserver === "function", animationFrame = false } = options;
	const referenceEl = unwrapElement(reference);
	const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
	ancestors.forEach((ancestor) => {
		ancestorScroll && ancestor.addEventListener("scroll", update, { passive: true });
		ancestorResize && ancestor.addEventListener("resize", update);
	});
	const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
	let reobserveFrame = -1;
	let resizeObserver = null;
	if (elementResize) {
		resizeObserver = new ResizeObserver((_ref) => {
			let [firstEntry] = _ref;
			if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
				resizeObserver.unobserve(floating);
				cancelAnimationFrame(reobserveFrame);
				reobserveFrame = requestAnimationFrame(() => {
					var _resizeObserver;
					(_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
				});
			}
			update();
		});
		if (referenceEl && !animationFrame) resizeObserver.observe(referenceEl);
		if (floating) resizeObserver.observe(floating);
	}
	let frameId;
	let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
	if (animationFrame) frameLoop();
	function frameLoop() {
		const nextRefRect = getBoundingClientRect(reference);
		if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) update();
		prevRefRect = nextRefRect;
		frameId = requestAnimationFrame(frameLoop);
	}
	update();
	return () => {
		var _resizeObserver2;
		ancestors.forEach((ancestor) => {
			ancestorScroll && ancestor.removeEventListener("scroll", update);
			ancestorResize && ancestor.removeEventListener("resize", update);
		});
		cleanupIo?.();
		(_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
		resizeObserver = null;
		if (animationFrame) cancelAnimationFrame(frameId);
	};
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset$1 = offset$2;
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift$1 = shift$2;
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip$1 = flip$2;
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
var size$1 = size$2;
/**
* Provides data to hide the floating element in applicable situations, such as
* when it is not in the same clipping context as the reference element.
* @see https://floating-ui.com/docs/hide
*/
var hide$1 = hide$2;
/**
* Provides data to position an inner element of the floating element so that it
* appears centered to the reference element.
* @see https://floating-ui.com/docs/arrow
*/
var arrow$2 = arrow$3;
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
var limitShift$1 = limitShift$2;
/**
* Computes the `x` and `y` coordinates that will place the floating element
* next to a given reference element.
*/
var computePosition = (reference, floating, options) => {
	const cache = /* @__PURE__ */ new Map();
	const mergedOptions = {
		platform,
		...options
	};
	const platformWithCache = {
		...mergedOptions.platform,
		_c: cache
	};
	return computePosition$1(reference, floating, {
		...mergedOptions,
		platform: platformWithCache
	});
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@floating-ui+react-dom@2.1.8_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
var index = typeof document !== "undefined" ? import_react.useLayoutEffect : function noop() {};
function deepEqual(a, b) {
	if (a === b) return true;
	if (typeof a !== typeof b) return false;
	if (typeof a === "function" && a.toString() === b.toString()) return true;
	let length;
	let i;
	let keys;
	if (a && b && typeof a === "object") {
		if (Array.isArray(a)) {
			length = a.length;
			if (length !== b.length) return false;
			for (i = length; i-- !== 0;) if (!deepEqual(a[i], b[i])) return false;
			return true;
		}
		keys = Object.keys(a);
		length = keys.length;
		if (length !== Object.keys(b).length) return false;
		for (i = length; i-- !== 0;) if (!{}.hasOwnProperty.call(b, keys[i])) return false;
		for (i = length; i-- !== 0;) {
			const key = keys[i];
			if (key === "_owner" && a.$$typeof) continue;
			if (!deepEqual(a[key], b[key])) return false;
		}
		return true;
	}
	return a !== a && b !== b;
}
function getDPR(element) {
	if (typeof window === "undefined") return 1;
	return (element.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function roundByDPR(element, value) {
	const dpr = getDPR(element);
	return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
	const ref = import_react.useRef(value);
	index(() => {
		ref.current = value;
	});
	return ref;
}
/**
* Provides data to position a floating element.
* @see https://floating-ui.com/docs/useFloating
*/
function useFloating(options) {
	if (options === void 0) options = {};
	const { placement = "bottom", strategy = "absolute", middleware = [], platform, elements: { reference: externalReference, floating: externalFloating } = {}, transform = true, whileElementsMounted, open } = options;
	const [data, setData] = import_react.useState({
		x: 0,
		y: 0,
		strategy,
		placement,
		middlewareData: {},
		isPositioned: false
	});
	const [latestMiddleware, setLatestMiddleware] = import_react.useState(middleware);
	if (!deepEqual(latestMiddleware, middleware)) setLatestMiddleware(middleware);
	const [_reference, _setReference] = import_react.useState(null);
	const [_floating, _setFloating] = import_react.useState(null);
	const setReference = import_react.useCallback((node) => {
		if (node !== referenceRef.current) {
			referenceRef.current = node;
			_setReference(node);
		}
	}, []);
	const setFloating = import_react.useCallback((node) => {
		if (node !== floatingRef.current) {
			floatingRef.current = node;
			_setFloating(node);
		}
	}, []);
	const referenceEl = externalReference || _reference;
	const floatingEl = externalFloating || _floating;
	const referenceRef = import_react.useRef(null);
	const floatingRef = import_react.useRef(null);
	const dataRef = import_react.useRef(data);
	const hasWhileElementsMounted = whileElementsMounted != null;
	const whileElementsMountedRef = useLatestRef(whileElementsMounted);
	const platformRef = useLatestRef(platform);
	const openRef = useLatestRef(open);
	const update = import_react.useCallback(() => {
		if (!referenceRef.current || !floatingRef.current) return;
		const config = {
			placement,
			strategy,
			middleware: latestMiddleware
		};
		if (platformRef.current) config.platform = platformRef.current;
		computePosition(referenceRef.current, floatingRef.current, config).then((data) => {
			const fullData = {
				...data,
				isPositioned: openRef.current !== false
			};
			if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
				dataRef.current = fullData;
				import_react_dom.flushSync(() => {
					setData(fullData);
				});
			}
		});
	}, [
		latestMiddleware,
		placement,
		strategy,
		platformRef,
		openRef
	]);
	index(() => {
		if (open === false && dataRef.current.isPositioned) {
			dataRef.current.isPositioned = false;
			setData((data) => ({
				...data,
				isPositioned: false
			}));
		}
	}, [open]);
	const isMountedRef = import_react.useRef(false);
	index(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	}, []);
	index(() => {
		if (referenceEl) referenceRef.current = referenceEl;
		if (floatingEl) floatingRef.current = floatingEl;
		if (referenceEl && floatingEl) {
			if (whileElementsMountedRef.current) return whileElementsMountedRef.current(referenceEl, floatingEl, update);
			update();
		}
	}, [
		referenceEl,
		floatingEl,
		update,
		whileElementsMountedRef,
		hasWhileElementsMounted
	]);
	const refs = import_react.useMemo(() => ({
		reference: referenceRef,
		floating: floatingRef,
		setReference,
		setFloating
	}), [setReference, setFloating]);
	const elements = import_react.useMemo(() => ({
		reference: referenceEl,
		floating: floatingEl
	}), [referenceEl, floatingEl]);
	const floatingStyles = import_react.useMemo(() => {
		const initialStyles = {
			position: strategy,
			left: 0,
			top: 0
		};
		if (!elements.floating) return initialStyles;
		const x = roundByDPR(elements.floating, data.x);
		const y = roundByDPR(elements.floating, data.y);
		if (transform) return {
			...initialStyles,
			transform: "translate(" + x + "px, " + y + "px)",
			...getDPR(elements.floating) >= 1.5 && { willChange: "transform" }
		};
		return {
			position: strategy,
			left: x,
			top: y
		};
	}, [
		strategy,
		transform,
		elements.floating,
		data.x,
		data.y
	]);
	return import_react.useMemo(() => ({
		...data,
		update,
		refs,
		elements,
		floatingStyles
	}), [
		data,
		update,
		refs,
		elements,
		floatingStyles
	]);
}
/**
* Provides data to position an inner element of the floating element so that it
* appears centered to the reference element.
* This wraps the core `arrow` middleware to allow React refs as the element.
* @see https://floating-ui.com/docs/arrow
*/
var arrow$1 = (options) => {
	function isRef(value) {
		return {}.hasOwnProperty.call(value, "current");
	}
	return {
		name: "arrow",
		options,
		fn(state) {
			const { element, padding } = typeof options === "function" ? options(state) : options;
			if (element && isRef(element)) {
				if (element.current != null) return arrow$2({
					element: element.current,
					padding
				}).fn(state);
				return {};
			}
			if (element) return arrow$2({
				element,
				padding
			}).fn(state);
			return {};
		}
	};
};
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset = (options, deps) => {
	const result = offset$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift = (options, deps) => {
	const result = shift$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
var limitShift = (options, deps) => {
	return {
		fn: limitShift$1(options).fn,
		options: [options, deps]
	};
};
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip = (options, deps) => {
	const result = flip$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
var size = (options, deps) => {
	const result = size$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
/**
* Provides data to hide the floating element in applicable situations, such as
* when it is not in the same clipping context as the reference element.
* @see https://floating-ui.com/docs/hide
*/
var hide = (options, deps) => {
	const result = hide$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
/**
* Provides data to position an inner element of the floating element so that it
* appears centered to the reference element.
* This wraps the core `arrow` middleware to allow React refs as the element.
* @see https://floating-ui.com/docs/arrow
*/
var arrow = (options, deps) => {
	const result = arrow$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-arrow@1.1.7_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react@_e05f2c19a58a99fddf374207b5e3778c/node_modules/@radix-ui/react-arrow/dist/index.mjs
var NAME$1 = "Arrow";
var Arrow$1 = import_react.forwardRef((props, forwardedRef) => {
	const { children, width = 10, height = 5, ...arrowProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.svg, {
		...arrowProps,
		ref: forwardedRef,
		width,
		height,
		viewBox: "0 0 30 10",
		preserveAspectRatio: "none",
		children: props.asChild ? children : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "0,0 30,0 15,10" })
	});
});
Arrow$1.displayName = NAME$1;
var Root$4 = Arrow$1;
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-use-size@1.1.1_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-use-size/dist/index.mjs
function useSize(element) {
	const [size, setSize] = import_react.useState(void 0);
	useLayoutEffect2(() => {
		if (element) {
			setSize({
				width: element.offsetWidth,
				height: element.offsetHeight
			});
			const resizeObserver = new ResizeObserver((entries) => {
				if (!Array.isArray(entries)) return;
				if (!entries.length) return;
				const entry = entries[0];
				let width;
				let height;
				if ("borderBoxSize" in entry) {
					const borderSizeEntry = entry["borderBoxSize"];
					const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
					width = borderSize["inlineSize"];
					height = borderSize["blockSize"];
				} else {
					width = element.offsetWidth;
					height = element.offsetHeight;
				}
				setSize({
					width,
					height
				});
			});
			resizeObserver.observe(element, { box: "border-box" });
			return () => resizeObserver.unobserve(element);
		} else setSize(void 0);
	}, [element]);
	return size;
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-popper@1.2.8_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react_13e0521d8aea7ebfbfb8bee1fb615c05/node_modules/@radix-ui/react-popper/dist/index.mjs
var POPPER_NAME = "Popper";
var [createPopperContext, createPopperScope] = createContextScope$1(POPPER_NAME);
var [PopperProvider, usePopperContext] = createPopperContext(POPPER_NAME);
var Popper = (props) => {
	const { __scopePopper, children } = props;
	const [anchor, setAnchor] = import_react.useState(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopperProvider, {
		scope: __scopePopper,
		anchor,
		onAnchorChange: setAnchor,
		children
	});
};
Popper.displayName = POPPER_NAME;
var ANCHOR_NAME$1 = "PopperAnchor";
var PopperAnchor = import_react.forwardRef((props, forwardedRef) => {
	const { __scopePopper, virtualRef, ...anchorProps } = props;
	const context = usePopperContext(ANCHOR_NAME$1, __scopePopper);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const anchorRef = import_react.useRef(null);
	import_react.useEffect(() => {
		const previousAnchor = anchorRef.current;
		anchorRef.current = virtualRef?.current || ref.current;
		if (previousAnchor !== anchorRef.current) context.onAnchorChange(anchorRef.current);
	});
	return virtualRef ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.div, {
		...anchorProps,
		ref: composedRefs
	});
});
PopperAnchor.displayName = ANCHOR_NAME$1;
var CONTENT_NAME$4 = "PopperContent";
var [PopperContentProvider, useContentContext] = createPopperContext(CONTENT_NAME$4);
var PopperContent = import_react.forwardRef((props, forwardedRef) => {
	const { __scopePopper, side = "bottom", sideOffset = 0, align = "center", alignOffset = 0, arrowPadding = 0, avoidCollisions = true, collisionBoundary = [], collisionPadding: collisionPaddingProp = 0, sticky = "partial", hideWhenDetached = false, updatePositionStrategy = "optimized", onPlaced, ...contentProps } = props;
	const context = usePopperContext(CONTENT_NAME$4, __scopePopper);
	const [content, setContent] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
	const [arrow$4, setArrow] = import_react.useState(null);
	const arrowSize = useSize(arrow$4);
	const arrowWidth = arrowSize?.width ?? 0;
	const arrowHeight = arrowSize?.height ?? 0;
	const desiredPlacement = side + (align !== "center" ? "-" + align : "");
	const collisionPadding = typeof collisionPaddingProp === "number" ? collisionPaddingProp : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...collisionPaddingProp
	};
	const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
	const hasExplicitBoundaries = boundary.length > 0;
	const detectOverflowOptions = {
		padding: collisionPadding,
		boundary: boundary.filter(isNotNull),
		altBoundary: hasExplicitBoundaries
	};
	const { refs, floatingStyles, placement, isPositioned, middlewareData } = useFloating({
		strategy: "fixed",
		placement: desiredPlacement,
		whileElementsMounted: (...args) => {
			return autoUpdate(...args, { animationFrame: updatePositionStrategy === "always" });
		},
		elements: { reference: context.anchor },
		middleware: [
			offset({
				mainAxis: sideOffset + arrowHeight,
				alignmentAxis: alignOffset
			}),
			avoidCollisions && shift({
				mainAxis: true,
				crossAxis: false,
				limiter: sticky === "partial" ? limitShift() : void 0,
				...detectOverflowOptions
			}),
			avoidCollisions && flip({ ...detectOverflowOptions }),
			size({
				...detectOverflowOptions,
				apply: ({ elements, rects, availableWidth, availableHeight }) => {
					const { width: anchorWidth, height: anchorHeight } = rects.reference;
					const contentStyle = elements.floating.style;
					contentStyle.setProperty("--radix-popper-available-width", `${availableWidth}px`);
					contentStyle.setProperty("--radix-popper-available-height", `${availableHeight}px`);
					contentStyle.setProperty("--radix-popper-anchor-width", `${anchorWidth}px`);
					contentStyle.setProperty("--radix-popper-anchor-height", `${anchorHeight}px`);
				}
			}),
			arrow$4 && arrow({
				element: arrow$4,
				padding: arrowPadding
			}),
			transformOrigin({
				arrowWidth,
				arrowHeight
			}),
			hideWhenDetached && hide({
				strategy: "referenceHidden",
				...detectOverflowOptions
			})
		]
	});
	const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
	const handlePlaced = useCallbackRef$1(onPlaced);
	useLayoutEffect2(() => {
		if (isPositioned) handlePlaced?.();
	}, [isPositioned, handlePlaced]);
	const arrowX = middlewareData.arrow?.x;
	const arrowY = middlewareData.arrow?.y;
	const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
	const [contentZIndex, setContentZIndex] = import_react.useState();
	useLayoutEffect2(() => {
		if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
	}, [content]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: refs.setFloating,
		"data-radix-popper-content-wrapper": "",
		style: {
			...floatingStyles,
			transform: isPositioned ? floatingStyles.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: contentZIndex,
			["--radix-popper-transform-origin"]: [middlewareData.transformOrigin?.x, middlewareData.transformOrigin?.y].join(" "),
			...middlewareData.hide?.referenceHidden && {
				visibility: "hidden",
				pointerEvents: "none"
			}
		},
		dir: props.dir,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopperContentProvider, {
			scope: __scopePopper,
			placedSide,
			onArrowChange: setArrow,
			arrowX,
			arrowY,
			shouldHideArrow: cannotCenterArrow,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.div, {
				"data-side": placedSide,
				"data-align": placedAlign,
				...contentProps,
				ref: composedRefs,
				style: {
					...contentProps.style,
					animation: !isPositioned ? "none" : void 0
				}
			})
		})
	});
});
PopperContent.displayName = CONTENT_NAME$4;
var ARROW_NAME$3 = "PopperArrow";
var OPPOSITE_SIDE = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
};
var PopperArrow = import_react.forwardRef(function PopperArrow2(props, forwardedRef) {
	const { __scopePopper, ...arrowProps } = props;
	const contentContext = useContentContext(ARROW_NAME$3, __scopePopper);
	const baseSide = OPPOSITE_SIDE[contentContext.placedSide];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref: contentContext.onArrowChange,
		style: {
			position: "absolute",
			left: contentContext.arrowX,
			top: contentContext.arrowY,
			[baseSide]: 0,
			transformOrigin: {
				top: "",
				right: "0 0",
				bottom: "center 0",
				left: "100% 0"
			}[contentContext.placedSide],
			transform: {
				top: "translateY(100%)",
				right: "translateY(50%) rotate(90deg) translateX(-50%)",
				bottom: `rotate(180deg)`,
				left: "translateY(50%) rotate(-90deg) translateX(50%)"
			}[contentContext.placedSide],
			visibility: contentContext.shouldHideArrow ? "hidden" : void 0
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$4, {
			...arrowProps,
			ref: forwardedRef,
			style: {
				...arrowProps.style,
				display: "block"
			}
		})
	});
});
PopperArrow.displayName = ARROW_NAME$3;
function isNotNull(value) {
	return value !== null;
}
var transformOrigin = (options) => ({
	name: "transformOrigin",
	options,
	fn(data) {
		const { placement, rects, middlewareData } = data;
		const isArrowHidden = middlewareData.arrow?.centerOffset !== 0;
		const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
		const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
		const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
		const noArrowAlign = {
			start: "0%",
			center: "50%",
			end: "100%"
		}[placedAlign];
		const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
		const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
		let x = "";
		let y = "";
		if (placedSide === "bottom") {
			x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
			y = `${-arrowHeight}px`;
		} else if (placedSide === "top") {
			x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
			y = `${rects.floating.height + arrowHeight}px`;
		} else if (placedSide === "right") {
			x = `${-arrowHeight}px`;
			y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
		} else if (placedSide === "left") {
			x = `${rects.floating.width + arrowHeight}px`;
			y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
		}
		return { data: {
			x,
			y
		} };
	}
});
function getSideAndAlignFromPlacement(placement) {
	const [side, align = "center"] = placement.split("-");
	return [side, align];
}
var Root2$1 = Popper;
var Anchor = PopperAnchor;
var Content$1 = PopperContent;
var Arrow = PopperArrow;
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-tooltip@1.2.8_@types+react-dom@19.2.3_@types+react@19.2.14__@types+reac_9074d9fb06315b089b2bee17c4c65951/node_modules/@radix-ui/react-tooltip/dist/index.mjs
var [createTooltipContext, createTooltipScope] = createContextScope$1("Tooltip", [createPopperScope]);
var usePopperScope$1 = createPopperScope();
var PROVIDER_NAME = "TooltipProvider";
var DEFAULT_DELAY_DURATION = 700;
var TOOLTIP_OPEN = "tooltip.open";
var [TooltipProviderContextProvider, useTooltipProviderContext] = createTooltipContext(PROVIDER_NAME);
var TooltipProvider$1 = (props) => {
	const { __scopeTooltip, delayDuration = DEFAULT_DELAY_DURATION, skipDelayDuration = 300, disableHoverableContent = false, children } = props;
	const isOpenDelayedRef = import_react.useRef(true);
	const isPointerInTransitRef = import_react.useRef(false);
	const skipDelayTimerRef = import_react.useRef(0);
	import_react.useEffect(() => {
		const skipDelayTimer = skipDelayTimerRef.current;
		return () => window.clearTimeout(skipDelayTimer);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProviderContextProvider, {
		scope: __scopeTooltip,
		isOpenDelayedRef,
		delayDuration,
		onOpen: import_react.useCallback(() => {
			window.clearTimeout(skipDelayTimerRef.current);
			isOpenDelayedRef.current = false;
		}, []),
		onClose: import_react.useCallback(() => {
			window.clearTimeout(skipDelayTimerRef.current);
			skipDelayTimerRef.current = window.setTimeout(() => isOpenDelayedRef.current = true, skipDelayDuration);
		}, [skipDelayDuration]),
		isPointerInTransitRef,
		onPointerInTransitChange: import_react.useCallback((inTransit) => {
			isPointerInTransitRef.current = inTransit;
		}, []),
		disableHoverableContent,
		children
	});
};
TooltipProvider$1.displayName = PROVIDER_NAME;
var TOOLTIP_NAME = "Tooltip";
var [TooltipContextProvider, useTooltipContext] = createTooltipContext(TOOLTIP_NAME);
var Tooltip$1 = (props) => {
	const { __scopeTooltip, children, open: openProp, defaultOpen, onOpenChange, disableHoverableContent: disableHoverableContentProp, delayDuration: delayDurationProp } = props;
	const providerContext = useTooltipProviderContext(TOOLTIP_NAME, props.__scopeTooltip);
	const popperScope = usePopperScope$1(__scopeTooltip);
	const [trigger, setTrigger] = import_react.useState(null);
	const contentId = useId();
	const openTimerRef = import_react.useRef(0);
	const disableHoverableContent = disableHoverableContentProp ?? providerContext.disableHoverableContent;
	const delayDuration = delayDurationProp ?? providerContext.delayDuration;
	const wasOpenDelayedRef = import_react.useRef(false);
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen ?? false,
		onChange: (open2) => {
			if (open2) {
				providerContext.onOpen();
				document.dispatchEvent(new CustomEvent(TOOLTIP_OPEN));
			} else providerContext.onClose();
			onOpenChange?.(open2);
		},
		caller: TOOLTIP_NAME
	});
	const stateAttribute = import_react.useMemo(() => {
		return open ? wasOpenDelayedRef.current ? "delayed-open" : "instant-open" : "closed";
	}, [open]);
	const handleOpen = import_react.useCallback(() => {
		window.clearTimeout(openTimerRef.current);
		openTimerRef.current = 0;
		wasOpenDelayedRef.current = false;
		setOpen(true);
	}, [setOpen]);
	const handleClose = import_react.useCallback(() => {
		window.clearTimeout(openTimerRef.current);
		openTimerRef.current = 0;
		setOpen(false);
	}, [setOpen]);
	const handleDelayedOpen = import_react.useCallback(() => {
		window.clearTimeout(openTimerRef.current);
		openTimerRef.current = window.setTimeout(() => {
			wasOpenDelayedRef.current = true;
			setOpen(true);
			openTimerRef.current = 0;
		}, delayDuration);
	}, [delayDuration, setOpen]);
	import_react.useEffect(() => {
		return () => {
			if (openTimerRef.current) {
				window.clearTimeout(openTimerRef.current);
				openTimerRef.current = 0;
			}
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2$1, {
		...popperScope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContextProvider, {
			scope: __scopeTooltip,
			contentId,
			open,
			stateAttribute,
			trigger,
			onTriggerChange: setTrigger,
			onTriggerEnter: import_react.useCallback(() => {
				if (providerContext.isOpenDelayedRef.current) handleDelayedOpen();
				else handleOpen();
			}, [
				providerContext.isOpenDelayedRef,
				handleDelayedOpen,
				handleOpen
			]),
			onTriggerLeave: import_react.useCallback(() => {
				if (disableHoverableContent) handleClose();
				else {
					window.clearTimeout(openTimerRef.current);
					openTimerRef.current = 0;
				}
			}, [handleClose, disableHoverableContent]),
			onOpen: handleOpen,
			onClose: handleClose,
			disableHoverableContent,
			children
		})
	});
};
Tooltip$1.displayName = TOOLTIP_NAME;
var TRIGGER_NAME$2 = "TooltipTrigger";
var TooltipTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTooltip, ...triggerProps } = props;
	const context = useTooltipContext(TRIGGER_NAME$2, __scopeTooltip);
	const providerContext = useTooltipProviderContext(TRIGGER_NAME$2, __scopeTooltip);
	const popperScope = usePopperScope$1(__scopeTooltip);
	const composedRefs = useComposedRefs(forwardedRef, import_react.useRef(null), context.onTriggerChange);
	const isPointerDownRef = import_react.useRef(false);
	const hasPointerMoveOpenedRef = import_react.useRef(false);
	const handlePointerUp = import_react.useCallback(() => isPointerDownRef.current = false, []);
	import_react.useEffect(() => {
		return () => document.removeEventListener("pointerup", handlePointerUp);
	}, [handlePointerUp]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, {
		asChild: true,
		...popperScope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.button, {
			"aria-describedby": context.open ? context.contentId : void 0,
			"data-state": context.stateAttribute,
			...triggerProps,
			ref: composedRefs,
			onPointerMove: composeEventHandlers(props.onPointerMove, (event) => {
				if (event.pointerType === "touch") return;
				if (!hasPointerMoveOpenedRef.current && !providerContext.isPointerInTransitRef.current) {
					context.onTriggerEnter();
					hasPointerMoveOpenedRef.current = true;
				}
			}),
			onPointerLeave: composeEventHandlers(props.onPointerLeave, () => {
				context.onTriggerLeave();
				hasPointerMoveOpenedRef.current = false;
			}),
			onPointerDown: composeEventHandlers(props.onPointerDown, () => {
				if (context.open) context.onClose();
				isPointerDownRef.current = true;
				document.addEventListener("pointerup", handlePointerUp, { once: true });
			}),
			onFocus: composeEventHandlers(props.onFocus, () => {
				if (!isPointerDownRef.current) context.onOpen();
			}),
			onBlur: composeEventHandlers(props.onBlur, context.onClose),
			onClick: composeEventHandlers(props.onClick, context.onClose)
		})
	});
});
TooltipTrigger$1.displayName = TRIGGER_NAME$2;
var PORTAL_NAME$3 = "TooltipPortal";
var [PortalProvider$2, usePortalContext$2] = createTooltipContext(PORTAL_NAME$3, { forceMount: void 0 });
var TooltipPortal = (props) => {
	const { __scopeTooltip, forceMount, children, container } = props;
	const context = useTooltipContext(PORTAL_NAME$3, __scopeTooltip);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalProvider$2, {
		scope: __scopeTooltip,
		forceMount,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
			present: forceMount || context.open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal$2, {
				asChild: true,
				container,
				children
			})
		})
	});
};
TooltipPortal.displayName = PORTAL_NAME$3;
var CONTENT_NAME$3 = "TooltipContent";
var TooltipContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const portalContext = usePortalContext$2(CONTENT_NAME$3, props.__scopeTooltip);
	const { forceMount = portalContext.forceMount, side = "top", ...contentProps } = props;
	const context = useTooltipContext(CONTENT_NAME$3, props.__scopeTooltip);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.open,
		children: context.disableHoverableContent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContentImpl, {
			side,
			...contentProps,
			ref: forwardedRef
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContentHoverable, {
			side,
			...contentProps,
			ref: forwardedRef
		})
	});
});
var TooltipContentHoverable = import_react.forwardRef((props, forwardedRef) => {
	const context = useTooltipContext(CONTENT_NAME$3, props.__scopeTooltip);
	const providerContext = useTooltipProviderContext(CONTENT_NAME$3, props.__scopeTooltip);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const [pointerGraceArea, setPointerGraceArea] = import_react.useState(null);
	const { trigger, onClose } = context;
	const content = ref.current;
	const { onPointerInTransitChange } = providerContext;
	const handleRemoveGraceArea = import_react.useCallback(() => {
		setPointerGraceArea(null);
		onPointerInTransitChange(false);
	}, [onPointerInTransitChange]);
	const handleCreateGraceArea = import_react.useCallback((event, hoverTarget) => {
		const currentTarget = event.currentTarget;
		const exitPoint = {
			x: event.clientX,
			y: event.clientY
		};
		const paddedExitPoints = getPaddedExitPoints(exitPoint, getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect()));
		const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
		setPointerGraceArea(getHull([...paddedExitPoints, ...hoverTargetPoints]));
		onPointerInTransitChange(true);
	}, [onPointerInTransitChange]);
	import_react.useEffect(() => {
		return () => handleRemoveGraceArea();
	}, [handleRemoveGraceArea]);
	import_react.useEffect(() => {
		if (trigger && content) {
			const handleTriggerLeave = (event) => handleCreateGraceArea(event, content);
			const handleContentLeave = (event) => handleCreateGraceArea(event, trigger);
			trigger.addEventListener("pointerleave", handleTriggerLeave);
			content.addEventListener("pointerleave", handleContentLeave);
			return () => {
				trigger.removeEventListener("pointerleave", handleTriggerLeave);
				content.removeEventListener("pointerleave", handleContentLeave);
			};
		}
	}, [
		trigger,
		content,
		handleCreateGraceArea,
		handleRemoveGraceArea
	]);
	import_react.useEffect(() => {
		if (pointerGraceArea) {
			const handleTrackPointerGrace = (event) => {
				const target = event.target;
				const pointerPosition = {
					x: event.clientX,
					y: event.clientY
				};
				const hasEnteredTarget = trigger?.contains(target) || content?.contains(target);
				const isPointerOutsideGraceArea = !isPointInPolygon$1(pointerPosition, pointerGraceArea);
				if (hasEnteredTarget) handleRemoveGraceArea();
				else if (isPointerOutsideGraceArea) {
					handleRemoveGraceArea();
					onClose();
				}
			};
			document.addEventListener("pointermove", handleTrackPointerGrace);
			return () => document.removeEventListener("pointermove", handleTrackPointerGrace);
		}
	}, [
		trigger,
		content,
		pointerGraceArea,
		onClose,
		handleRemoveGraceArea
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContentImpl, {
		...props,
		ref: composedRefs
	});
});
var [VisuallyHiddenContentContextProvider, useVisuallyHiddenContentContext] = createTooltipContext(TOOLTIP_NAME, { isInside: false });
var Slottable = /* @__PURE__ */ createSlottable("TooltipContent");
var TooltipContentImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTooltip, children, "aria-label": ariaLabel, onEscapeKeyDown, onPointerDownOutside, ...contentProps } = props;
	const context = useTooltipContext(CONTENT_NAME$3, __scopeTooltip);
	const popperScope = usePopperScope$1(__scopeTooltip);
	const { onClose } = context;
	import_react.useEffect(() => {
		document.addEventListener(TOOLTIP_OPEN, onClose);
		return () => document.removeEventListener(TOOLTIP_OPEN, onClose);
	}, [onClose]);
	import_react.useEffect(() => {
		if (context.trigger) {
			const handleScroll = (event) => {
				if (event.target?.contains(context.trigger)) onClose();
			};
			window.addEventListener("scroll", handleScroll, { capture: true });
			return () => window.removeEventListener("scroll", handleScroll, { capture: true });
		}
	}, [context.trigger, onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DismissableLayer, {
		asChild: true,
		disableOutsidePointerEvents: false,
		onEscapeKeyDown,
		onPointerDownOutside,
		onFocusOutside: (event) => event.preventDefault(),
		onDismiss: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content$1, {
			"data-state": context.stateAttribute,
			...popperScope,
			...contentProps,
			ref: forwardedRef,
			style: {
				...contentProps.style,
				"--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
				"--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
				"--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
				"--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
				"--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slottable, { children }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisuallyHiddenContentContextProvider, {
				scope: __scopeTooltip,
				isInside: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$5, {
					id: context.contentId,
					role: "tooltip",
					children: ariaLabel || children
				})
			})]
		})
	});
});
TooltipContent$1.displayName = CONTENT_NAME$3;
var ARROW_NAME$2 = "TooltipArrow";
var TooltipArrow = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTooltip, ...arrowProps } = props;
	const popperScope = usePopperScope$1(__scopeTooltip);
	return useVisuallyHiddenContentContext(ARROW_NAME$2, __scopeTooltip).isInside ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, {
		...popperScope,
		...arrowProps,
		ref: forwardedRef
	});
});
TooltipArrow.displayName = ARROW_NAME$2;
function getExitSideFromRect(point, rect) {
	const top = Math.abs(rect.top - point.y);
	const bottom = Math.abs(rect.bottom - point.y);
	const right = Math.abs(rect.right - point.x);
	const left = Math.abs(rect.left - point.x);
	switch (Math.min(top, bottom, right, left)) {
		case left: return "left";
		case right: return "right";
		case top: return "top";
		case bottom: return "bottom";
		default: throw new Error("unreachable");
	}
}
function getPaddedExitPoints(exitPoint, exitSide, padding = 5) {
	const paddedExitPoints = [];
	switch (exitSide) {
		case "top":
			paddedExitPoints.push({
				x: exitPoint.x - padding,
				y: exitPoint.y + padding
			}, {
				x: exitPoint.x + padding,
				y: exitPoint.y + padding
			});
			break;
		case "bottom":
			paddedExitPoints.push({
				x: exitPoint.x - padding,
				y: exitPoint.y - padding
			}, {
				x: exitPoint.x + padding,
				y: exitPoint.y - padding
			});
			break;
		case "left":
			paddedExitPoints.push({
				x: exitPoint.x + padding,
				y: exitPoint.y - padding
			}, {
				x: exitPoint.x + padding,
				y: exitPoint.y + padding
			});
			break;
		case "right":
			paddedExitPoints.push({
				x: exitPoint.x - padding,
				y: exitPoint.y - padding
			}, {
				x: exitPoint.x - padding,
				y: exitPoint.y + padding
			});
			break;
	}
	return paddedExitPoints;
}
function getPointsFromRect(rect) {
	const { top, right, bottom, left } = rect;
	return [
		{
			x: left,
			y: top
		},
		{
			x: right,
			y: top
		},
		{
			x: right,
			y: bottom
		},
		{
			x: left,
			y: bottom
		}
	];
}
function isPointInPolygon$1(point, polygon) {
	const { x, y } = point;
	let inside = false;
	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		const ii = polygon[i];
		const jj = polygon[j];
		const xi = ii.x;
		const yi = ii.y;
		const xj = jj.x;
		const yj = jj.y;
		if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
	}
	return inside;
}
function getHull(points) {
	const newPoints = points.slice();
	newPoints.sort((a, b) => {
		if (a.x < b.x) return -1;
		else if (a.x > b.x) return 1;
		else if (a.y < b.y) return -1;
		else if (a.y > b.y) return 1;
		else return 0;
	});
	return getHullPresorted(newPoints);
}
function getHullPresorted(points) {
	if (points.length <= 1) return points.slice();
	const upperHull = [];
	for (let i = 0; i < points.length; i++) {
		const p = points[i];
		while (upperHull.length >= 2) {
			const q = upperHull[upperHull.length - 1];
			const r = upperHull[upperHull.length - 2];
			if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) upperHull.pop();
			else break;
		}
		upperHull.push(p);
	}
	upperHull.pop();
	const lowerHull = [];
	for (let i = points.length - 1; i >= 0; i--) {
		const p = points[i];
		while (lowerHull.length >= 2) {
			const q = lowerHull[lowerHull.length - 1];
			const r = lowerHull[lowerHull.length - 2];
			if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) lowerHull.pop();
			else break;
		}
		lowerHull.push(p);
	}
	lowerHull.pop();
	if (upperHull.length === 1 && lowerHull.length === 1 && upperHull[0].x === lowerHull[0].x && upperHull[0].y === lowerHull[0].y) return upperHull;
	else return upperHull.concat(lowerHull);
}
var Provider = TooltipProvider$1;
var Root3$1 = Tooltip$1;
var Trigger$2 = TooltipTrigger$1;
var Content2$2 = TooltipContent$1;
//#endregion
//#region src/components/ui/tooltip.tsx
var TooltipProvider = Provider;
var Tooltip = Root3$1;
var TooltipTrigger = Trigger$2;
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$2, {
	"data-uid": "src/components/ui/tooltip.tsx:17:3",
	"data-prohibitions": "[editContent]",
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]", className),
	...props
}));
TooltipContent.displayName = Content2$2.displayName;
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/tslib@2.8.1/node_modules/tslib/tslib.es6.mjs
var __assign = function() {
	__assign = Object.assign || function __assign(t) {
		for (var s, i = 1, n = arguments.length; i < n; i++) {
			s = arguments[i];
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
		}
		return t;
	};
	return __assign.apply(this, arguments);
};
function __rest(s, e) {
	var t = {};
	for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	if (s != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
	}
	return t;
}
function __awaiter(thisArg, _arguments, P, generator) {
	function adopt(value) {
		return value instanceof P ? value : new P(function(resolve) {
			resolve(value);
		});
	}
	return new (P || (P = Promise))(function(resolve, reject) {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}
		function step(result) {
			result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
		}
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
}
function __spreadArray(to, from, pack) {
	if (pack || arguments.length === 2) {
		for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
			if (!ar) ar = Array.prototype.slice.call(from, 0, i);
			ar[i] = from[i];
		}
	}
	return to.concat(ar || Array.prototype.slice.call(from));
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+functions-js@2.99.2/node_modules/@supabase/functions-js/dist/module/helper.js
var resolveFetch$3 = (customFetch) => {
	if (customFetch) return (...args) => customFetch(...args);
	return (...args) => fetch(...args);
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+functions-js@2.99.2/node_modules/@supabase/functions-js/dist/module/types.js
/**
* Base error for Supabase Edge Function invocations.
*
* @example
* ```ts
* import { FunctionsError } from '@supabase/functions-js'
*
* throw new FunctionsError('Unexpected error invoking function', 'FunctionsError', {
*   requestId: 'abc123',
* })
* ```
*/
var FunctionsError = class extends Error {
	constructor(message, name = "FunctionsError", context) {
		super(message);
		this.name = name;
		this.context = context;
	}
};
/**
* Error thrown when the network request to an Edge Function fails.
*
* @example
* ```ts
* import { FunctionsFetchError } from '@supabase/functions-js'
*
* throw new FunctionsFetchError({ requestId: 'abc123' })
* ```
*/
var FunctionsFetchError = class extends FunctionsError {
	constructor(context) {
		super("Failed to send a request to the Edge Function", "FunctionsFetchError", context);
	}
};
/**
* Error thrown when the Supabase relay cannot reach the Edge Function.
*
* @example
* ```ts
* import { FunctionsRelayError } from '@supabase/functions-js'
*
* throw new FunctionsRelayError({ region: 'us-east-1' })
* ```
*/
var FunctionsRelayError = class extends FunctionsError {
	constructor(context) {
		super("Relay Error invoking the Edge Function", "FunctionsRelayError", context);
	}
};
/**
* Error thrown when the Edge Function returns a non-2xx status code.
*
* @example
* ```ts
* import { FunctionsHttpError } from '@supabase/functions-js'
*
* throw new FunctionsHttpError({ status: 500 })
* ```
*/
var FunctionsHttpError = class extends FunctionsError {
	constructor(context) {
		super("Edge Function returned a non-2xx status code", "FunctionsHttpError", context);
	}
};
var FunctionRegion;
(function(FunctionRegion) {
	FunctionRegion["Any"] = "any";
	FunctionRegion["ApNortheast1"] = "ap-northeast-1";
	FunctionRegion["ApNortheast2"] = "ap-northeast-2";
	FunctionRegion["ApSouth1"] = "ap-south-1";
	FunctionRegion["ApSoutheast1"] = "ap-southeast-1";
	FunctionRegion["ApSoutheast2"] = "ap-southeast-2";
	FunctionRegion["CaCentral1"] = "ca-central-1";
	FunctionRegion["EuCentral1"] = "eu-central-1";
	FunctionRegion["EuWest1"] = "eu-west-1";
	FunctionRegion["EuWest2"] = "eu-west-2";
	FunctionRegion["EuWest3"] = "eu-west-3";
	FunctionRegion["SaEast1"] = "sa-east-1";
	FunctionRegion["UsEast1"] = "us-east-1";
	FunctionRegion["UsWest1"] = "us-west-1";
	FunctionRegion["UsWest2"] = "us-west-2";
})(FunctionRegion || (FunctionRegion = {}));
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+functions-js@2.99.2/node_modules/@supabase/functions-js/dist/module/FunctionsClient.js
/**
* Client for invoking Supabase Edge Functions.
*/
var FunctionsClient = class {
	/**
	* Creates a new Functions client bound to an Edge Functions URL.
	*
	* @example
	* ```ts
	* import { FunctionsClient, FunctionRegion } from '@supabase/functions-js'
	*
	* const functions = new FunctionsClient('https://xyzcompany.supabase.co/functions/v1', {
	*   headers: { apikey: 'public-anon-key' },
	*   region: FunctionRegion.UsEast1,
	* })
	* ```
	*/
	constructor(url, { headers = {}, customFetch, region = FunctionRegion.Any } = {}) {
		this.url = url;
		this.headers = headers;
		this.region = region;
		this.fetch = resolveFetch$3(customFetch);
	}
	/**
	* Updates the authorization header
	* @param token - the new jwt token sent in the authorisation header
	* @example
	* ```ts
	* functions.setAuth(session.access_token)
	* ```
	*/
	setAuth(token) {
		this.headers.Authorization = `Bearer ${token}`;
	}
	/**
	* Invokes a function
	* @param functionName - The name of the Function to invoke.
	* @param options - Options for invoking the Function.
	* @example
	* ```ts
	* const { data, error } = await functions.invoke('hello-world', {
	*   body: { name: 'Ada' },
	* })
	* ```
	*/
	invoke(functionName_1) {
		return __awaiter(this, arguments, void 0, function* (functionName, options = {}) {
			var _a;
			let timeoutId;
			let timeoutController;
			try {
				const { headers, method, body: functionArgs, signal, timeout } = options;
				let _headers = {};
				let { region } = options;
				if (!region) region = this.region;
				const url = new URL(`${this.url}/${functionName}`);
				if (region && region !== "any") {
					_headers["x-region"] = region;
					url.searchParams.set("forceFunctionRegion", region);
				}
				let body;
				if (functionArgs && (headers && !Object.prototype.hasOwnProperty.call(headers, "Content-Type") || !headers)) if (typeof Blob !== "undefined" && functionArgs instanceof Blob || functionArgs instanceof ArrayBuffer) {
					_headers["Content-Type"] = "application/octet-stream";
					body = functionArgs;
				} else if (typeof functionArgs === "string") {
					_headers["Content-Type"] = "text/plain";
					body = functionArgs;
				} else if (typeof FormData !== "undefined" && functionArgs instanceof FormData) body = functionArgs;
				else {
					_headers["Content-Type"] = "application/json";
					body = JSON.stringify(functionArgs);
				}
				else if (functionArgs && typeof functionArgs !== "string" && !(typeof Blob !== "undefined" && functionArgs instanceof Blob) && !(functionArgs instanceof ArrayBuffer) && !(typeof FormData !== "undefined" && functionArgs instanceof FormData)) body = JSON.stringify(functionArgs);
				else body = functionArgs;
				let effectiveSignal = signal;
				if (timeout) {
					timeoutController = new AbortController();
					timeoutId = setTimeout(() => timeoutController.abort(), timeout);
					if (signal) {
						effectiveSignal = timeoutController.signal;
						signal.addEventListener("abort", () => timeoutController.abort());
					} else effectiveSignal = timeoutController.signal;
				}
				const response = yield this.fetch(url.toString(), {
					method: method || "POST",
					headers: Object.assign(Object.assign(Object.assign({}, _headers), this.headers), headers),
					body,
					signal: effectiveSignal
				}).catch((fetchError) => {
					throw new FunctionsFetchError(fetchError);
				});
				const isRelayError = response.headers.get("x-relay-error");
				if (isRelayError && isRelayError === "true") throw new FunctionsRelayError(response);
				if (!response.ok) throw new FunctionsHttpError(response);
				let responseType = ((_a = response.headers.get("Content-Type")) !== null && _a !== void 0 ? _a : "text/plain").split(";")[0].trim();
				let data;
				if (responseType === "application/json") data = yield response.json();
				else if (responseType === "application/octet-stream" || responseType === "application/pdf") data = yield response.blob();
				else if (responseType === "text/event-stream") data = response;
				else if (responseType === "multipart/form-data") data = yield response.formData();
				else data = yield response.text();
				return {
					data,
					error: null,
					response
				};
			} catch (error) {
				return {
					data: null,
					error,
					response: error instanceof FunctionsHttpError || error instanceof FunctionsRelayError ? error.context : void 0
				};
			} finally {
				if (timeoutId) clearTimeout(timeoutId);
			}
		});
	}
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+postgrest-js@2.99.2/node_modules/@supabase/postgrest-js/dist/index.mjs
/**
* Error format
*
* {@link https://postgrest.org/en/stable/api.html?highlight=options#errors-and-http-status-codes}
*/
var PostgrestError = class extends Error {
	/**
	* @example
	* ```ts
	* import PostgrestError from '@supabase/postgrest-js'
	*
	* throw new PostgrestError({
	*   message: 'Row level security prevented the request',
	*   details: 'RLS denied the insert',
	*   hint: 'Check your policies',
	*   code: 'PGRST301',
	* })
	* ```
	*/
	constructor(context) {
		super(context.message);
		this.name = "PostgrestError";
		this.details = context.details;
		this.hint = context.hint;
		this.code = context.code;
	}
};
var PostgrestBuilder = class {
	/**
	* Creates a builder configured for a specific PostgREST request.
	*
	* @example
	* ```ts
	* import PostgrestQueryBuilder from '@supabase/postgrest-js'
	*
	* const builder = new PostgrestQueryBuilder(
	*   new URL('https://xyzcompany.supabase.co/rest/v1/users'),
	*   { headers: new Headers({ apikey: 'public-anon-key' }) }
	* )
	* ```
	*/
	constructor(builder) {
		var _builder$shouldThrowO, _builder$isMaybeSingl, _builder$urlLengthLim;
		this.shouldThrowOnError = false;
		this.method = builder.method;
		this.url = builder.url;
		this.headers = new Headers(builder.headers);
		this.schema = builder.schema;
		this.body = builder.body;
		this.shouldThrowOnError = (_builder$shouldThrowO = builder.shouldThrowOnError) !== null && _builder$shouldThrowO !== void 0 ? _builder$shouldThrowO : false;
		this.signal = builder.signal;
		this.isMaybeSingle = (_builder$isMaybeSingl = builder.isMaybeSingle) !== null && _builder$isMaybeSingl !== void 0 ? _builder$isMaybeSingl : false;
		this.urlLengthLimit = (_builder$urlLengthLim = builder.urlLengthLimit) !== null && _builder$urlLengthLim !== void 0 ? _builder$urlLengthLim : 8e3;
		if (builder.fetch) this.fetch = builder.fetch;
		else this.fetch = fetch;
	}
	/**
	* If there's an error with the query, throwOnError will reject the promise by
	* throwing the error instead of returning it as part of a successful response.
	*
	* {@link https://github.com/supabase/supabase-js/issues/92}
	*/
	throwOnError() {
		this.shouldThrowOnError = true;
		return this;
	}
	/**
	* Set an HTTP header for the request.
	*/
	setHeader(name, value) {
		this.headers = new Headers(this.headers);
		this.headers.set(name, value);
		return this;
	}
	then(onfulfilled, onrejected) {
		var _this = this;
		if (this.schema === void 0) {} else if (["GET", "HEAD"].includes(this.method)) this.headers.set("Accept-Profile", this.schema);
		else this.headers.set("Content-Profile", this.schema);
		if (this.method !== "GET" && this.method !== "HEAD") this.headers.set("Content-Type", "application/json");
		const _fetch = this.fetch;
		let res = _fetch(this.url.toString(), {
			method: this.method,
			headers: this.headers,
			body: JSON.stringify(this.body),
			signal: this.signal
		}).then(async (res$1) => {
			let error = null;
			let data = null;
			let count = null;
			let status = res$1.status;
			let statusText = res$1.statusText;
			if (res$1.ok) {
				var _this$headers$get2, _res$headers$get;
				if (_this.method !== "HEAD") {
					var _this$headers$get;
					const body = await res$1.text();
					if (body === "") {} else if (_this.headers.get("Accept") === "text/csv") data = body;
					else if (_this.headers.get("Accept") && ((_this$headers$get = _this.headers.get("Accept")) === null || _this$headers$get === void 0 ? void 0 : _this$headers$get.includes("application/vnd.pgrst.plan+text"))) data = body;
					else data = JSON.parse(body);
				}
				const countHeader = (_this$headers$get2 = _this.headers.get("Prefer")) === null || _this$headers$get2 === void 0 ? void 0 : _this$headers$get2.match(/count=(exact|planned|estimated)/);
				const contentRange = (_res$headers$get = res$1.headers.get("content-range")) === null || _res$headers$get === void 0 ? void 0 : _res$headers$get.split("/");
				if (countHeader && contentRange && contentRange.length > 1) count = parseInt(contentRange[1]);
				if (_this.isMaybeSingle && _this.method === "GET" && Array.isArray(data)) if (data.length > 1) {
					error = {
						code: "PGRST116",
						details: `Results contain ${data.length} rows, application/vnd.pgrst.object+json requires 1 row`,
						hint: null,
						message: "JSON object requested, multiple (or no) rows returned"
					};
					data = null;
					count = null;
					status = 406;
					statusText = "Not Acceptable";
				} else if (data.length === 1) data = data[0];
				else data = null;
			} else {
				var _error$details;
				const body = await res$1.text();
				try {
					error = JSON.parse(body);
					if (Array.isArray(error) && res$1.status === 404) {
						data = [];
						error = null;
						status = 200;
						statusText = "OK";
					}
				} catch (_unused) {
					if (res$1.status === 404 && body === "") {
						status = 204;
						statusText = "No Content";
					} else error = { message: body };
				}
				if (error && _this.isMaybeSingle && (error === null || error === void 0 || (_error$details = error.details) === null || _error$details === void 0 ? void 0 : _error$details.includes("0 rows"))) {
					error = null;
					status = 200;
					statusText = "OK";
				}
				if (error && _this.shouldThrowOnError) throw new PostgrestError(error);
			}
			return {
				error,
				data,
				count,
				status,
				statusText
			};
		});
		if (!this.shouldThrowOnError) res = res.catch((fetchError) => {
			var _fetchError$name2;
			let errorDetails = "";
			let hint = "";
			let code = "";
			const cause = fetchError === null || fetchError === void 0 ? void 0 : fetchError.cause;
			if (cause) {
				var _cause$message, _cause$code, _fetchError$name, _cause$name;
				const causeMessage = (_cause$message = cause === null || cause === void 0 ? void 0 : cause.message) !== null && _cause$message !== void 0 ? _cause$message : "";
				const causeCode = (_cause$code = cause === null || cause === void 0 ? void 0 : cause.code) !== null && _cause$code !== void 0 ? _cause$code : "";
				errorDetails = `${(_fetchError$name = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _fetchError$name !== void 0 ? _fetchError$name : "FetchError"}: ${fetchError === null || fetchError === void 0 ? void 0 : fetchError.message}`;
				errorDetails += `\n\nCaused by: ${(_cause$name = cause === null || cause === void 0 ? void 0 : cause.name) !== null && _cause$name !== void 0 ? _cause$name : "Error"}: ${causeMessage}`;
				if (causeCode) errorDetails += ` (${causeCode})`;
				if (cause === null || cause === void 0 ? void 0 : cause.stack) errorDetails += `\n${cause.stack}`;
			} else {
				var _fetchError$stack;
				errorDetails = (_fetchError$stack = fetchError === null || fetchError === void 0 ? void 0 : fetchError.stack) !== null && _fetchError$stack !== void 0 ? _fetchError$stack : "";
			}
			const urlLength = this.url.toString().length;
			if ((fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) === "AbortError" || (fetchError === null || fetchError === void 0 ? void 0 : fetchError.code) === "ABORT_ERR") {
				code = "";
				hint = "Request was aborted (timeout or manual cancellation)";
				if (urlLength > this.urlLengthLimit) hint += `. Note: Your request URL is ${urlLength} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`;
			} else if ((cause === null || cause === void 0 ? void 0 : cause.name) === "HeadersOverflowError" || (cause === null || cause === void 0 ? void 0 : cause.code) === "UND_ERR_HEADERS_OVERFLOW") {
				code = "";
				hint = "HTTP headers exceeded server limits (typically 16KB)";
				if (urlLength > this.urlLengthLimit) hint += `. Your request URL is ${urlLength} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`;
			}
			return {
				error: {
					message: `${(_fetchError$name2 = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _fetchError$name2 !== void 0 ? _fetchError$name2 : "FetchError"}: ${fetchError === null || fetchError === void 0 ? void 0 : fetchError.message}`,
					details: errorDetails,
					hint,
					code
				},
				data: null,
				count: null,
				status: 0,
				statusText: ""
			};
		});
		return res.then(onfulfilled, onrejected);
	}
	/**
	* Override the type of the returned `data`.
	*
	* @typeParam NewResult - The new result type to override with
	* @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
	*/
	returns() {
		/* istanbul ignore next */
		return this;
	}
	/**
	* Override the type of the returned `data` field in the response.
	*
	* @typeParam NewResult - The new type to cast the response data to
	* @typeParam Options - Optional type configuration (defaults to { merge: true })
	* @typeParam Options.merge - When true, merges the new type with existing return type. When false, replaces the existing types entirely (defaults to true)
	* @example
	* ```typescript
	* // Merge with existing types (default behavior)
	* const query = supabase
	*   .from('users')
	*   .select()
	*   .overrideTypes<{ custom_field: string }>()
	*
	* // Replace existing types completely
	* const replaceQuery = supabase
	*   .from('users')
	*   .select()
	*   .overrideTypes<{ id: number; name: string }, { merge: false }>()
	* ```
	* @returns A PostgrestBuilder instance with the new type
	*/
	overrideTypes() {
		return this;
	}
};
var PostgrestTransformBuilder = class extends PostgrestBuilder {
	/**
	* Perform a SELECT on the query result.
	*
	* By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
	* return modified rows. By calling this method, modified rows are returned in
	* `data`.
	*
	* @param columns - The columns to retrieve, separated by commas
	*/
	select(columns) {
		let quoted = false;
		const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c) => {
			if (/\s/.test(c) && !quoted) return "";
			if (c === "\"") quoted = !quoted;
			return c;
		}).join("");
		this.url.searchParams.set("select", cleanedColumns);
		this.headers.append("Prefer", "return=representation");
		return this;
	}
	/**
	* Order the query result by `column`.
	*
	* You can call this method multiple times to order by multiple columns.
	*
	* You can order referenced tables, but it only affects the ordering of the
	* parent table if you use `!inner` in the query.
	*
	* @param column - The column to order by
	* @param options - Named parameters
	* @param options.ascending - If `true`, the result will be in ascending order
	* @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
	* `null`s appear last.
	* @param options.referencedTable - Set this to order a referenced table by
	* its columns
	* @param options.foreignTable - Deprecated, use `options.referencedTable`
	* instead
	*/
	order(column, { ascending = true, nullsFirst, foreignTable, referencedTable = foreignTable } = {}) {
		const key = referencedTable ? `${referencedTable}.order` : "order";
		const existingOrder = this.url.searchParams.get(key);
		this.url.searchParams.set(key, `${existingOrder ? `${existingOrder},` : ""}${column}.${ascending ? "asc" : "desc"}${nullsFirst === void 0 ? "" : nullsFirst ? ".nullsfirst" : ".nullslast"}`);
		return this;
	}
	/**
	* Limit the query result by `count`.
	*
	* @param count - The maximum number of rows to return
	* @param options - Named parameters
	* @param options.referencedTable - Set this to limit rows of referenced
	* tables instead of the parent table
	* @param options.foreignTable - Deprecated, use `options.referencedTable`
	* instead
	*/
	limit(count, { foreignTable, referencedTable = foreignTable } = {}) {
		const key = typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
		this.url.searchParams.set(key, `${count}`);
		return this;
	}
	/**
	* Limit the query result by starting at an offset `from` and ending at the offset `to`.
	* Only records within this range are returned.
	* This respects the query order and if there is no order clause the range could behave unexpectedly.
	* The `from` and `to` values are 0-based and inclusive: `range(1, 3)` will include the second, third
	* and fourth rows of the query.
	*
	* @param from - The starting index from which to limit the result
	* @param to - The last index to which to limit the result
	* @param options - Named parameters
	* @param options.referencedTable - Set this to limit rows of referenced
	* tables instead of the parent table
	* @param options.foreignTable - Deprecated, use `options.referencedTable`
	* instead
	*/
	range(from, to, { foreignTable, referencedTable = foreignTable } = {}) {
		const keyOffset = typeof referencedTable === "undefined" ? "offset" : `${referencedTable}.offset`;
		const keyLimit = typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
		this.url.searchParams.set(keyOffset, `${from}`);
		this.url.searchParams.set(keyLimit, `${to - from + 1}`);
		return this;
	}
	/**
	* Set the AbortSignal for the fetch request.
	*
	* @param signal - The AbortSignal to use for the fetch request
	*/
	abortSignal(signal) {
		this.signal = signal;
		return this;
	}
	/**
	* Return `data` as a single object instead of an array of objects.
	*
	* Query result must be one row (e.g. using `.limit(1)`), otherwise this
	* returns an error.
	*/
	single() {
		this.headers.set("Accept", "application/vnd.pgrst.object+json");
		return this;
	}
	/**
	* Return `data` as a single object instead of an array of objects.
	*
	* Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
	* this returns an error.
	*/
	maybeSingle() {
		if (this.method === "GET") this.headers.set("Accept", "application/json");
		else this.headers.set("Accept", "application/vnd.pgrst.object+json");
		this.isMaybeSingle = true;
		return this;
	}
	/**
	* Return `data` as a string in CSV format.
	*/
	csv() {
		this.headers.set("Accept", "text/csv");
		return this;
	}
	/**
	* Return `data` as an object in [GeoJSON](https://geojson.org) format.
	*/
	geojson() {
		this.headers.set("Accept", "application/geo+json");
		return this;
	}
	/**
	* Return `data` as the EXPLAIN plan for the query.
	*
	* You need to enable the
	* [db_plan_enabled](https://supabase.com/docs/guides/database/debugging-performance#enabling-explain)
	* setting before using this method.
	*
	* @param options - Named parameters
	*
	* @param options.analyze - If `true`, the query will be executed and the
	* actual run time will be returned
	*
	* @param options.verbose - If `true`, the query identifier will be returned
	* and `data` will include the output columns of the query
	*
	* @param options.settings - If `true`, include information on configuration
	* parameters that affect query planning
	*
	* @param options.buffers - If `true`, include information on buffer usage
	*
	* @param options.wal - If `true`, include information on WAL record generation
	*
	* @param options.format - The format of the output, can be `"text"` (default)
	* or `"json"`
	*/
	explain({ analyze = false, verbose = false, settings = false, buffers = false, wal = false, format = "text" } = {}) {
		var _this$headers$get;
		const options = [
			analyze ? "analyze" : null,
			verbose ? "verbose" : null,
			settings ? "settings" : null,
			buffers ? "buffers" : null,
			wal ? "wal" : null
		].filter(Boolean).join("|");
		const forMediatype = (_this$headers$get = this.headers.get("Accept")) !== null && _this$headers$get !== void 0 ? _this$headers$get : "application/json";
		this.headers.set("Accept", `application/vnd.pgrst.plan+${format}; for="${forMediatype}"; options=${options};`);
		if (format === "json") return this;
		else return this;
	}
	/**
	* Rollback the query.
	*
	* `data` will still be returned, but the query is not committed.
	*/
	rollback() {
		this.headers.append("Prefer", "tx=rollback");
		return this;
	}
	/**
	* Override the type of the returned `data`.
	*
	* @typeParam NewResult - The new result type to override with
	* @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
	*/
	returns() {
		return this;
	}
	/**
	* Set the maximum number of rows that can be affected by the query.
	* Only available in PostgREST v13+ and only works with PATCH and DELETE methods.
	*
	* @param value - The maximum number of rows that can be affected
	*/
	maxAffected(value) {
		this.headers.append("Prefer", "handling=strict");
		this.headers.append("Prefer", `max-affected=${value}`);
		return this;
	}
};
var PostgrestReservedCharsRegexp = /* @__PURE__ */ new RegExp("[,()]");
var PostgrestFilterBuilder = class extends PostgrestTransformBuilder {
	/**
	* Match only rows where `column` is equal to `value`.
	*
	* To check if the value of `column` is NULL, you should use `.is()` instead.
	*
	* @param column - The column to filter on
	* @param value - The value to filter with
	*/
	eq(column, value) {
		this.url.searchParams.append(column, `eq.${value}`);
		return this;
	}
	/**
	* Match only rows where `column` is not equal to `value`.
	*
	* @param column - The column to filter on
	* @param value - The value to filter with
	*/
	neq(column, value) {
		this.url.searchParams.append(column, `neq.${value}`);
		return this;
	}
	/**
	* Match only rows where `column` is greater than `value`.
	*
	* @param column - The column to filter on
	* @param value - The value to filter with
	*/
	gt(column, value) {
		this.url.searchParams.append(column, `gt.${value}`);
		return this;
	}
	/**
	* Match only rows where `column` is greater than or equal to `value`.
	*
	* @param column - The column to filter on
	* @param value - The value to filter with
	*/
	gte(column, value) {
		this.url.searchParams.append(column, `gte.${value}`);
		return this;
	}
	/**
	* Match only rows where `column` is less than `value`.
	*
	* @param column - The column to filter on
	* @param value - The value to filter with
	*/
	lt(column, value) {
		this.url.searchParams.append(column, `lt.${value}`);
		return this;
	}
	/**
	* Match only rows where `column` is less than or equal to `value`.
	*
	* @param column - The column to filter on
	* @param value - The value to filter with
	*/
	lte(column, value) {
		this.url.searchParams.append(column, `lte.${value}`);
		return this;
	}
	/**
	* Match only rows where `column` matches `pattern` case-sensitively.
	*
	* @param column - The column to filter on
	* @param pattern - The pattern to match with
	*/
	like(column, pattern) {
		this.url.searchParams.append(column, `like.${pattern}`);
		return this;
	}
	/**
	* Match only rows where `column` matches all of `patterns` case-sensitively.
	*
	* @param column - The column to filter on
	* @param patterns - The patterns to match with
	*/
	likeAllOf(column, patterns) {
		this.url.searchParams.append(column, `like(all).{${patterns.join(",")}}`);
		return this;
	}
	/**
	* Match only rows where `column` matches any of `patterns` case-sensitively.
	*
	* @param column - The column to filter on
	* @param patterns - The patterns to match with
	*/
	likeAnyOf(column, patterns) {
		this.url.searchParams.append(column, `like(any).{${patterns.join(",")}}`);
		return this;
	}
	/**
	* Match only rows where `column` matches `pattern` case-insensitively.
	*
	* @param column - The column to filter on
	* @param pattern - The pattern to match with
	*/
	ilike(column, pattern) {
		this.url.searchParams.append(column, `ilike.${pattern}`);
		return this;
	}
	/**
	* Match only rows where `column` matches all of `patterns` case-insensitively.
	*
	* @param column - The column to filter on
	* @param patterns - The patterns to match with
	*/
	ilikeAllOf(column, patterns) {
		this.url.searchParams.append(column, `ilike(all).{${patterns.join(",")}}`);
		return this;
	}
	/**
	* Match only rows where `column` matches any of `patterns` case-insensitively.
	*
	* @param column - The column to filter on
	* @param patterns - The patterns to match with
	*/
	ilikeAnyOf(column, patterns) {
		this.url.searchParams.append(column, `ilike(any).{${patterns.join(",")}}`);
		return this;
	}
	/**
	* Match only rows where `column` matches the PostgreSQL regex `pattern`
	* case-sensitively (using the `~` operator).
	*
	* @param column - The column to filter on
	* @param pattern - The PostgreSQL regular expression pattern to match with
	*/
	regexMatch(column, pattern) {
		this.url.searchParams.append(column, `match.${pattern}`);
		return this;
	}
	/**
	* Match only rows where `column` matches the PostgreSQL regex `pattern`
	* case-insensitively (using the `~*` operator).
	*
	* @param column - The column to filter on
	* @param pattern - The PostgreSQL regular expression pattern to match with
	*/
	regexIMatch(column, pattern) {
		this.url.searchParams.append(column, `imatch.${pattern}`);
		return this;
	}
	/**
	* Match only rows where `column` IS `value`.
	*
	* For non-boolean columns, this is only relevant for checking if the value of
	* `column` is NULL by setting `value` to `null`.
	*
	* For boolean columns, you can also set `value` to `true` or `false` and it
	* will behave the same way as `.eq()`.
	*
	* @param column - The column to filter on
	* @param value - The value to filter with
	*/
	is(column, value) {
		this.url.searchParams.append(column, `is.${value}`);
		return this;
	}
	/**
	* Match only rows where `column` IS DISTINCT FROM `value`.
	*
	* Unlike `.neq()`, this treats `NULL` as a comparable value. Two `NULL` values
	* are considered equal (not distinct), and comparing `NULL` with any non-NULL
	* value returns true (distinct).
	*
	* @param column - The column to filter on
	* @param value - The value to filter with
	*/
	isDistinct(column, value) {
		this.url.searchParams.append(column, `isdistinct.${value}`);
		return this;
	}
	/**
	* Match only rows where `column` is included in the `values` array.
	*
	* @param column - The column to filter on
	* @param values - The values array to filter with
	*/
	in(column, values) {
		const cleanedValues = Array.from(new Set(values)).map((s) => {
			if (typeof s === "string" && PostgrestReservedCharsRegexp.test(s)) return `"${s}"`;
			else return `${s}`;
		}).join(",");
		this.url.searchParams.append(column, `in.(${cleanedValues})`);
		return this;
	}
	/**
	* Match only rows where `column` is NOT included in the `values` array.
	*
	* @param column - The column to filter on
	* @param values - The values array to filter with
	*/
	notIn(column, values) {
		const cleanedValues = Array.from(new Set(values)).map((s) => {
			if (typeof s === "string" && PostgrestReservedCharsRegexp.test(s)) return `"${s}"`;
			else return `${s}`;
		}).join(",");
		this.url.searchParams.append(column, `not.in.(${cleanedValues})`);
		return this;
	}
	/**
	* Only relevant for jsonb, array, and range columns. Match only rows where
	* `column` contains every element appearing in `value`.
	*
	* @param column - The jsonb, array, or range column to filter on
	* @param value - The jsonb, array, or range value to filter with
	*/
	contains(column, value) {
		if (typeof value === "string") this.url.searchParams.append(column, `cs.${value}`);
		else if (Array.isArray(value)) this.url.searchParams.append(column, `cs.{${value.join(",")}}`);
		else this.url.searchParams.append(column, `cs.${JSON.stringify(value)}`);
		return this;
	}
	/**
	* Only relevant for jsonb, array, and range columns. Match only rows where
	* every element appearing in `column` is contained by `value`.
	*
	* @param column - The jsonb, array, or range column to filter on
	* @param value - The jsonb, array, or range value to filter with
	*/
	containedBy(column, value) {
		if (typeof value === "string") this.url.searchParams.append(column, `cd.${value}`);
		else if (Array.isArray(value)) this.url.searchParams.append(column, `cd.{${value.join(",")}}`);
		else this.url.searchParams.append(column, `cd.${JSON.stringify(value)}`);
		return this;
	}
	/**
	* Only relevant for range columns. Match only rows where every element in
	* `column` is greater than any element in `range`.
	*
	* @param column - The range column to filter on
	* @param range - The range to filter with
	*/
	rangeGt(column, range) {
		this.url.searchParams.append(column, `sr.${range}`);
		return this;
	}
	/**
	* Only relevant for range columns. Match only rows where every element in
	* `column` is either contained in `range` or greater than any element in
	* `range`.
	*
	* @param column - The range column to filter on
	* @param range - The range to filter with
	*/
	rangeGte(column, range) {
		this.url.searchParams.append(column, `nxl.${range}`);
		return this;
	}
	/**
	* Only relevant for range columns. Match only rows where every element in
	* `column` is less than any element in `range`.
	*
	* @param column - The range column to filter on
	* @param range - The range to filter with
	*/
	rangeLt(column, range) {
		this.url.searchParams.append(column, `sl.${range}`);
		return this;
	}
	/**
	* Only relevant for range columns. Match only rows where every element in
	* `column` is either contained in `range` or less than any element in
	* `range`.
	*
	* @param column - The range column to filter on
	* @param range - The range to filter with
	*/
	rangeLte(column, range) {
		this.url.searchParams.append(column, `nxr.${range}`);
		return this;
	}
	/**
	* Only relevant for range columns. Match only rows where `column` is
	* mutually exclusive to `range` and there can be no element between the two
	* ranges.
	*
	* @param column - The range column to filter on
	* @param range - The range to filter with
	*/
	rangeAdjacent(column, range) {
		this.url.searchParams.append(column, `adj.${range}`);
		return this;
	}
	/**
	* Only relevant for array and range columns. Match only rows where
	* `column` and `value` have an element in common.
	*
	* @param column - The array or range column to filter on
	* @param value - The array or range value to filter with
	*/
	overlaps(column, value) {
		if (typeof value === "string") this.url.searchParams.append(column, `ov.${value}`);
		else this.url.searchParams.append(column, `ov.{${value.join(",")}}`);
		return this;
	}
	/**
	* Only relevant for text and tsvector columns. Match only rows where
	* `column` matches the query string in `query`.
	*
	* @param column - The text or tsvector column to filter on
	* @param query - The query text to match with
	* @param options - Named parameters
	* @param options.config - The text search configuration to use
	* @param options.type - Change how the `query` text is interpreted
	*/
	textSearch(column, query, { config, type } = {}) {
		let typePart = "";
		if (type === "plain") typePart = "pl";
		else if (type === "phrase") typePart = "ph";
		else if (type === "websearch") typePart = "w";
		const configPart = config === void 0 ? "" : `(${config})`;
		this.url.searchParams.append(column, `${typePart}fts${configPart}.${query}`);
		return this;
	}
	/**
	* Match only rows where each column in `query` keys is equal to its
	* associated value. Shorthand for multiple `.eq()`s.
	*
	* @param query - The object to filter with, with column names as keys mapped
	* to their filter values
	*/
	match(query) {
		Object.entries(query).forEach(([column, value]) => {
			this.url.searchParams.append(column, `eq.${value}`);
		});
		return this;
	}
	/**
	* Match only rows which doesn't satisfy the filter.
	*
	* Unlike most filters, `opearator` and `value` are used as-is and need to
	* follow [PostgREST
	* syntax](https://postgrest.org/en/stable/api.html#operators). You also need
	* to make sure they are properly sanitized.
	*
	* @param column - The column to filter on
	* @param operator - The operator to be negated to filter with, following
	* PostgREST syntax
	* @param value - The value to filter with, following PostgREST syntax
	*/
	not(column, operator, value) {
		this.url.searchParams.append(column, `not.${operator}.${value}`);
		return this;
	}
	/**
	* Match only rows which satisfy at least one of the filters.
	*
	* Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
	* syntax](https://postgrest.org/en/stable/api.html#operators). You also need
	* to make sure it's properly sanitized.
	*
	* It's currently not possible to do an `.or()` filter across multiple tables.
	*
	* @param filters - The filters to use, following PostgREST syntax
	* @param options - Named parameters
	* @param options.referencedTable - Set this to filter on referenced tables
	* instead of the parent table
	* @param options.foreignTable - Deprecated, use `referencedTable` instead
	*/
	or(filters, { foreignTable, referencedTable = foreignTable } = {}) {
		const key = referencedTable ? `${referencedTable}.or` : "or";
		this.url.searchParams.append(key, `(${filters})`);
		return this;
	}
	/**
	* Match only rows which satisfy the filter. This is an escape hatch - you
	* should use the specific filter methods wherever possible.
	*
	* Unlike most filters, `opearator` and `value` are used as-is and need to
	* follow [PostgREST
	* syntax](https://postgrest.org/en/stable/api.html#operators). You also need
	* to make sure they are properly sanitized.
	*
	* @param column - The column to filter on
	* @param operator - The operator to filter with, following PostgREST syntax
	* @param value - The value to filter with, following PostgREST syntax
	*/
	filter(column, operator, value) {
		this.url.searchParams.append(column, `${operator}.${value}`);
		return this;
	}
};
var PostgrestQueryBuilder = class {
	/**
	* Creates a query builder scoped to a Postgres table or view.
	*
	* @example
	* ```ts
	* import PostgrestQueryBuilder from '@supabase/postgrest-js'
	*
	* const query = new PostgrestQueryBuilder(
	*   new URL('https://xyzcompany.supabase.co/rest/v1/users'),
	*   { headers: { apikey: 'public-anon-key' } }
	* )
	* ```
	*/
	constructor(url, { headers = {}, schema, fetch: fetch$1, urlLengthLimit = 8e3 }) {
		this.url = url;
		this.headers = new Headers(headers);
		this.schema = schema;
		this.fetch = fetch$1;
		this.urlLengthLimit = urlLengthLimit;
	}
	/**
	* Clone URL and headers to prevent shared state between operations.
	*/
	cloneRequestState() {
		return {
			url: new URL(this.url.toString()),
			headers: new Headers(this.headers)
		};
	}
	/**
	* Perform a SELECT query on the table or view.
	*
	* @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
	*
	* @param options - Named parameters
	*
	* @param options.head - When set to `true`, `data` will not be returned.
	* Useful if you only need the count.
	*
	* @param options.count - Count algorithm to use to count rows in the table or view.
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*
	* @remarks
	* When using `count` with `.range()` or `.limit()`, the returned `count` is the total number of rows
	* that match your filters, not the number of rows in the current page. Use this to build pagination UI.
	
	* - By default, Supabase projects return a maximum of 1,000 rows. This setting can be changed in your project's [API settings](/dashboard/project/_/settings/api). It's recommended that you keep it low to limit the payload size of accidental or malicious requests. You can use `range()` queries to paginate through your data.
	* - `select()` can be combined with [Filters](/docs/reference/javascript/using-filters)
	* - `select()` can be combined with [Modifiers](/docs/reference/javascript/using-modifiers)
	* - `apikey` is a reserved keyword if you're using the [Supabase Platform](/docs/guides/platform) and [should be avoided as a column name](https://github.com/supabase/supabase/issues/5465). *
	* @category Database
	*
	* @example Getting your data
	* ```js
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select()
	* ```
	*
	* @exampleSql Getting your data
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Harry'),
	*   (2, 'Frodo'),
	*   (3, 'Katniss');
	* ```
	*
	* @exampleResponse Getting your data
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "Harry"
	*     },
	*     {
	*       "id": 2,
	*       "name": "Frodo"
	*     },
	*     {
	*       "id": 3,
	*       "name": "Katniss"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @example Selecting specific columns
	* ```js
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select('name')
	* ```
	*
	* @exampleSql Selecting specific columns
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Frodo'),
	*   (2, 'Harry'),
	*   (3, 'Katniss');
	* ```
	*
	* @exampleResponse Selecting specific columns
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "Frodo"
	*     },
	*     {
	*       "name": "Harry"
	*     },
	*     {
	*       "name": "Katniss"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Query referenced tables
	* If your database has foreign key relationships, you can query related tables too.
	*
	* @example Query referenced tables
	* ```js
	* const { data, error } = await supabase
	*   .from('orchestral_sections')
	*   .select(`
	*     name,
	*     instruments (
	*       name
	*     )
	*   `)
	* ```
	*
	* @exampleSql Query referenced tables
	* ```sql
	* create table
	*   orchestral_sections (id int8 primary key, name text);
	* create table
	*   instruments (
	*     id int8 primary key,
	*     section_id int8 not null references orchestral_sections,
	*     name text
	*   );
	*
	* insert into
	*   orchestral_sections (id, name)
	* values
	*   (1, 'strings'),
	*   (2, 'woodwinds');
	* insert into
	*   instruments (id, section_id, name)
	* values
	*   (1, 2, 'flute'),
	*   (2, 1, 'violin');
	* ```
	*
	* @exampleResponse Query referenced tables
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "strings",
	*       "instruments": [
	*         {
	*           "name": "violin"
	*         }
	*       ]
	*     },
	*     {
	*       "name": "woodwinds",
	*       "instruments": [
	*         {
	*           "name": "flute"
	*         }
	*       ]
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Query referenced tables with spaces in their names
	* If your table name contains spaces, you must use double quotes in the `select` statement to reference the table.
	*
	* @example Query referenced tables with spaces in their names
	* ```js
	* const { data, error } = await supabase
	*   .from('orchestral sections')
	*   .select(`
	*     name,
	*     "musical instruments" (
	*       name
	*     )
	*   `)
	* ```
	*
	* @exampleSql Query referenced tables with spaces in their names
	* ```sql
	* create table
	*   "orchestral sections" (id int8 primary key, name text);
	* create table
	*   "musical instruments" (
	*     id int8 primary key,
	*     section_id int8 not null references "orchestral sections",
	*     name text
	*   );
	*
	* insert into
	*   "orchestral sections" (id, name)
	* values
	*   (1, 'strings'),
	*   (2, 'woodwinds');
	* insert into
	*   "musical instruments" (id, section_id, name)
	* values
	*   (1, 2, 'flute'),
	*   (2, 1, 'violin');
	* ```
	*
	* @exampleResponse Query referenced tables with spaces in their names
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "strings",
	*       "musical instruments": [
	*         {
	*           "name": "violin"
	*         }
	*       ]
	*     },
	*     {
	*       "name": "woodwinds",
	*       "musical instruments": [
	*         {
	*           "name": "flute"
	*         }
	*       ]
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Query referenced tables through a join table
	* If you're in a situation where your tables are **NOT** directly
	* related, but instead are joined by a _join table_, you can still use
	* the `select()` method to query the related data. The join table needs
	* to have the foreign keys as part of its composite primary key.
	*
	* @example Query referenced tables through a join table
	* ```ts
	* const { data, error } = await supabase
	*   .from('users')
	*   .select(`
	*     name,
	*     teams (
	*       name
	*     )
	*   `)
	*   
	* ```
	*
	* @exampleSql Query referenced tables through a join table
	* ```sql
	* create table
	*   users (
	*     id int8 primary key,
	*     name text
	*   );
	* create table
	*   teams (
	*     id int8 primary key,
	*     name text
	*   );
	* -- join table
	* create table
	*   users_teams (
	*     user_id int8 not null references users,
	*     team_id int8 not null references teams,
	*     -- both foreign keys must be part of a composite primary key
	*     primary key (user_id, team_id)
	*   );
	*
	* insert into
	*   users (id, name)
	* values
	*   (1, 'Kiran'),
	*   (2, 'Evan');
	* insert into
	*   teams (id, name)
	* values
	*   (1, 'Green'),
	*   (2, 'Blue');
	* insert into
	*   users_teams (user_id, team_id)
	* values
	*   (1, 1),
	*   (1, 2),
	*   (2, 2);
	* ```
	*
	* @exampleResponse Query referenced tables through a join table
	* ```json
	*   {
	*     "data": [
	*       {
	*         "name": "Kiran",
	*         "teams": [
	*           {
	*             "name": "Green"
	*           },
	*           {
	*             "name": "Blue"
	*           }
	*         ]
	*       },
	*       {
	*         "name": "Evan",
	*         "teams": [
	*           {
	*             "name": "Blue"
	*           }
	*         ]
	*       }
	*     ],
	*     "status": 200,
	*     "statusText": "OK"
	*   }
	*   
	* ```
	*
	* @exampleDescription Query the same referenced table multiple times
	* If you need to query the same referenced table twice, use the name of the
	* joined column to identify which join to use. You can also give each
	* column an alias.
	*
	* @example Query the same referenced table multiple times
	* ```ts
	* const { data, error } = await supabase
	*   .from('messages')
	*   .select(`
	*     content,
	*     from:sender_id(name),
	*     to:receiver_id(name)
	*   `)
	*
	* // To infer types, use the name of the table (in this case `users`) and
	* // the name of the foreign key constraint.
	* const { data, error } = await supabase
	*   .from('messages')
	*   .select(`
	*     content,
	*     from:users!messages_sender_id_fkey(name),
	*     to:users!messages_receiver_id_fkey(name)
	*   `)
	* ```
	*
	* @exampleSql Query the same referenced table multiple times
	* ```sql
	*  create table
	*  users (id int8 primary key, name text);
	*
	*  create table
	*    messages (
	*      sender_id int8 not null references users,
	*      receiver_id int8 not null references users,
	*      content text
	*    );
	*
	*  insert into
	*    users (id, name)
	*  values
	*    (1, 'Kiran'),
	*    (2, 'Evan');
	*
	*  insert into
	*    messages (sender_id, receiver_id, content)
	*  values
	*    (1, 2, '👋');
	*  ```
	* ```
	*
	* @exampleResponse Query the same referenced table multiple times
	* ```json
	* {
	*   "data": [
	*     {
	*       "content": "👋",
	*       "from": {
	*         "name": "Kiran"
	*       },
	*       "to": {
	*         "name": "Evan"
	*       }
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Query nested foreign tables through a join table
	* You can use the result of a joined table to gather data in
	* another foreign table. With multiple references to the same foreign
	* table you must specify the column on which to conduct the join.
	*
	* @example Query nested foreign tables through a join table
	* ```ts
	*   const { data, error } = await supabase
	*     .from('games')
	*     .select(`
	*       game_id:id,
	*       away_team:teams!games_away_team_fkey (
	*         users (
	*           id,
	*           name
	*         )
	*       )
	*     `)
	*   
	* ```
	*
	* @exampleSql Query nested foreign tables through a join table
	* ```sql
	* ```sql
	* create table
	*   users (
	*     id int8 primary key,
	*     name text
	*   );
	* create table
	*   teams (
	*     id int8 primary key,
	*     name text
	*   );
	* -- join table
	* create table
	*   users_teams (
	*     user_id int8 not null references users,
	*     team_id int8 not null references teams,
	*
	*     primary key (user_id, team_id)
	*   );
	* create table
	*   games (
	*     id int8 primary key,
	*     home_team int8 not null references teams,
	*     away_team int8 not null references teams,
	*     name text
	*   );
	*
	* insert into users (id, name)
	* values
	*   (1, 'Kiran'),
	*   (2, 'Evan');
	* insert into
	*   teams (id, name)
	* values
	*   (1, 'Green'),
	*   (2, 'Blue');
	* insert into
	*   users_teams (user_id, team_id)
	* values
	*   (1, 1),
	*   (1, 2),
	*   (2, 2);
	* insert into
	*   games (id, home_team, away_team, name)
	* values
	*   (1, 1, 2, 'Green vs Blue'),
	*   (2, 2, 1, 'Blue vs Green');
	* ```
	*
	* @exampleResponse Query nested foreign tables through a join table
	* ```json
	*   {
	*     "data": [
	*       {
	*         "game_id": 1,
	*         "away_team": {
	*           "users": [
	*             {
	*               "id": 1,
	*               "name": "Kiran"
	*             },
	*             {
	*               "id": 2,
	*               "name": "Evan"
	*             }
	*           ]
	*         }
	*       },
	*       {
	*         "game_id": 2,
	*         "away_team": {
	*           "users": [
	*             {
	*               "id": 1,
	*               "name": "Kiran"
	*             }
	*           ]
	*         }
	*       }
	*     ],
	*     "status": 200,
	*     "statusText": "OK"
	*   }
	*   
	* ```
	*
	* @exampleDescription Filtering through referenced tables
	* If the filter on a referenced table's column is not satisfied, the referenced
	* table returns `[]` or `null` but the parent table is not filtered out.
	* If you want to filter out the parent table rows, use the `!inner` hint
	*
	* @example Filtering through referenced tables
	* ```ts
	* const { data, error } = await supabase
	*   .from('instruments')
	*   .select('name, orchestral_sections(*)')
	*   .eq('orchestral_sections.name', 'percussion')
	* ```
	*
	* @exampleSql Filtering through referenced tables
	* ```sql
	* create table
	*   orchestral_sections (id int8 primary key, name text);
	* create table
	*   instruments (
	*     id int8 primary key,
	*     section_id int8 not null references orchestral_sections,
	*     name text
	*   );
	*
	* insert into
	*   orchestral_sections (id, name)
	* values
	*   (1, 'strings'),
	*   (2, 'woodwinds');
	* insert into
	*   instruments (id, section_id, name)
	* values
	*   (1, 2, 'flute'),
	*   (2, 1, 'violin');
	* ```
	*
	* @exampleResponse Filtering through referenced tables
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "flute",
	*       "orchestral_sections": null
	*     },
	*     {
	*       "name": "violin",
	*       "orchestral_sections": null
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Querying referenced table with count
	* You can get the number of rows in a related table by using the
	* **count** property.
	*
	* @example Querying referenced table with count
	* ```ts
	* const { data, error } = await supabase
	*   .from('orchestral_sections')
	*   .select(`*, instruments(count)`)
	* ```
	*
	* @exampleSql Querying referenced table with count
	* ```sql
	* create table orchestral_sections (
	*   "id" "uuid" primary key default "extensions"."uuid_generate_v4"() not null,
	*   "name" text
	* );
	*
	* create table characters (
	*   "id" "uuid" primary key default "extensions"."uuid_generate_v4"() not null,
	*   "name" text,
	*   "section_id" "uuid" references public.orchestral_sections on delete cascade
	* );
	*
	* with section as (
	*   insert into orchestral_sections (name)
	*   values ('strings') returning id
	* )
	* insert into instruments (name, section_id) values
	* ('violin', (select id from section)),
	* ('viola', (select id from section)),
	* ('cello', (select id from section)),
	* ('double bass', (select id from section));
	* ```
	*
	* @exampleResponse Querying referenced table with count
	* ```json
	* [
	*   {
	*     "id": "693694e7-d993-4360-a6d7-6294e325d9b6",
	*     "name": "strings",
	*     "instruments": [
	*       {
	*         "count": 4
	*       }
	*     ]
	*   }
	* ]
	* ```
	*
	* @exampleDescription Querying with count option
	* You can get the number of rows by using the
	* [count](/docs/reference/javascript/select#parameters) option.
	*
	* @example Querying with count option
	* ```ts
	* const { count, error } = await supabase
	*   .from('characters')
	*   .select('*', { count: 'exact', head: true })
	* ```
	*
	* @exampleSql Querying with count option
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse Querying with count option
	* ```json
	* {
	*   "count": 3,
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Querying JSON data
	* You can select and filter data inside of
	* [JSON](/docs/guides/database/json) columns. Postgres offers some
	* [operators](/docs/guides/database/json#query-the-jsonb-data) for
	* querying JSON data.
	*
	* @example Querying JSON data
	* ```ts
	* const { data, error } = await supabase
	*   .from('users')
	*   .select(`
	*     id, name,
	*     address->city
	*   `)
	* ```
	*
	* @exampleSql Querying JSON data
	* ```sql
	* create table
	*   users (
	*     id int8 primary key,
	*     name text,
	*     address jsonb
	*   );
	*
	* insert into
	*   users (id, name, address)
	* values
	*   (1, 'Frodo', '{"city":"Hobbiton"}');
	* ```
	*
	* @exampleResponse Querying JSON data
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "Frodo",
	*       "city": "Hobbiton"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Querying referenced table with inner join
	* If you don't want to return the referenced table contents, you can leave the parenthesis empty.
	* Like `.select('name, orchestral_sections!inner()')`.
	*
	* @example Querying referenced table with inner join
	* ```ts
	* const { data, error } = await supabase
	*   .from('instruments')
	*   .select('name, orchestral_sections!inner(name)')
	*   .eq('orchestral_sections.name', 'woodwinds')
	*   .limit(1)
	* ```
	*
	* @exampleSql Querying referenced table with inner join
	* ```sql
	* create table orchestral_sections (
	*   "id" "uuid" primary key default "extensions"."uuid_generate_v4"() not null,
	*   "name" text
	* );
	*
	* create table instruments (
	*   "id" "uuid" primary key default "extensions"."uuid_generate_v4"() not null,
	*   "name" text,
	*   "section_id" "uuid" references public.orchestral_sections on delete cascade
	* );
	*
	* with section as (
	*   insert into orchestral_sections (name)
	*   values ('woodwinds') returning id
	* )
	* insert into instruments (name, section_id) values
	* ('flute', (select id from section)),
	* ('clarinet', (select id from section)),
	* ('bassoon', (select id from section)),
	* ('piccolo', (select id from section));
	* ```
	*
	* @exampleResponse Querying referenced table with inner join
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "flute",
	*       "orchestral_sections": {"name": "woodwinds"}
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Switching schemas per query
	* In addition to setting the schema during initialization, you can also switch schemas on a per-query basis.
	* Make sure you've set up your [database privileges and API settings](/docs/guides/api/using-custom-schemas).
	*
	* @example Switching schemas per query
	* ```ts
	* const { data, error } = await supabase
	*   .schema('myschema')
	*   .from('mytable')
	*   .select()
	* ```
	*
	* @exampleSql Switching schemas per query
	* ```sql
	* create schema myschema;
	*
	* create table myschema.mytable (
	*   id uuid primary key default gen_random_uuid(),
	*   data text
	* );
	*
	* insert into myschema.mytable (data) values ('mydata');
	* ```
	*
	* @exampleResponse Switching schemas per query
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": "4162e008-27b0-4c0f-82dc-ccaeee9a624d",
	*       "data": "mydata"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/
	select(columns, options) {
		const { head = false, count } = options !== null && options !== void 0 ? options : {};
		const method = head ? "HEAD" : "GET";
		let quoted = false;
		const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c) => {
			if (/\s/.test(c) && !quoted) return "";
			if (c === "\"") quoted = !quoted;
			return c;
		}).join("");
		const { url, headers } = this.cloneRequestState();
		url.searchParams.set("select", cleanedColumns);
		if (count) headers.append("Prefer", `count=${count}`);
		return new PostgrestFilterBuilder({
			method,
			url,
			headers,
			schema: this.schema,
			fetch: this.fetch,
			urlLengthLimit: this.urlLengthLimit
		});
	}
	/**
	* Perform an INSERT into the table or view.
	*
	* By default, inserted rows are not returned. To return it, chain the call
	* with `.select()`.
	*
	* @param values - The values to insert. Pass an object to insert a single row
	* or an array to insert multiple rows.
	*
	* @param options - Named parameters
	*
	* @param options.count - Count algorithm to use to count inserted rows.
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*
	* @param options.defaultToNull - Make missing fields default to `null`.
	* Otherwise, use the default value for the column. Only applies for bulk
	* inserts.
	*
	* @category Database
	*
	* @example Create a record
	* ```ts
	* const { error } = await supabase
	*   .from('countries')
	*   .insert({ id: 1, name: 'Mordor' })
	* ```
	*
	* @exampleSql Create a record
	* ```sql
	* create table
	*   countries (id int8 primary key, name text);
	* ```
	*
	* @exampleResponse Create a record
	* ```json
	* {
	*   "status": 201,
	*   "statusText": "Created"
	* }
	* ```
	*
	* @example Create a record and return it
	* ```ts
	* const { data, error } = await supabase
	*   .from('countries')
	*   .insert({ id: 1, name: 'Mordor' })
	*   .select()
	* ```
	*
	* @exampleSql Create a record and return it
	* ```sql
	* create table
	*   countries (id int8 primary key, name text);
	* ```
	*
	* @exampleResponse Create a record and return it
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "Mordor"
	*     }
	*   ],
	*   "status": 201,
	*   "statusText": "Created"
	* }
	* ```
	*
	* @exampleDescription Bulk create
	* A bulk create operation is handled in a single transaction.
	* If any of the inserts fail, none of the rows are inserted.
	*
	* @example Bulk create
	* ```ts
	* const { error } = await supabase
	*   .from('countries')
	*   .insert([
	*     { id: 1, name: 'Mordor' },
	*     { id: 1, name: 'The Shire' },
	*   ])
	* ```
	*
	* @exampleSql Bulk create
	* ```sql
	* create table
	*   countries (id int8 primary key, name text);
	* ```
	*
	* @exampleResponse Bulk create
	* ```json
	* {
	*   "error": {
	*     "code": "23505",
	*     "details": "Key (id)=(1) already exists.",
	*     "hint": null,
	*     "message": "duplicate key value violates unique constraint \"countries_pkey\""
	*   },
	*   "status": 409,
	*   "statusText": "Conflict"
	* }
	* ```
	*/
	insert(values, { count, defaultToNull = true } = {}) {
		var _this$fetch;
		const method = "POST";
		const { url, headers } = this.cloneRequestState();
		if (count) headers.append("Prefer", `count=${count}`);
		if (!defaultToNull) headers.append("Prefer", `missing=default`);
		if (Array.isArray(values)) {
			const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
			if (columns.length > 0) {
				const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
				url.searchParams.set("columns", uniqueColumns.join(","));
			}
		}
		return new PostgrestFilterBuilder({
			method,
			url,
			headers,
			schema: this.schema,
			body: values,
			fetch: (_this$fetch = this.fetch) !== null && _this$fetch !== void 0 ? _this$fetch : fetch,
			urlLengthLimit: this.urlLengthLimit
		});
	}
	/**
	* Perform an UPSERT on the table or view. Depending on the column(s) passed
	* to `onConflict`, `.upsert()` allows you to perform the equivalent of
	* `.insert()` if a row with the corresponding `onConflict` columns doesn't
	* exist, or if it does exist, perform an alternative action depending on
	* `ignoreDuplicates`.
	*
	* By default, upserted rows are not returned. To return it, chain the call
	* with `.select()`.
	*
	* @param values - The values to upsert with. Pass an object to upsert a
	* single row or an array to upsert multiple rows.
	*
	* @param options - Named parameters
	*
	* @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
	* duplicate rows are determined. Two rows are duplicates if all the
	* `onConflict` columns are equal.
	*
	* @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
	* `false`, duplicate rows are merged with existing rows.
	*
	* @param options.count - Count algorithm to use to count upserted rows.
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*
	* @param options.defaultToNull - Make missing fields default to `null`.
	* Otherwise, use the default value for the column. This only applies when
	* inserting new rows, not when merging with existing rows under
	* `ignoreDuplicates: false`. This also only applies when doing bulk upserts.
	*
	* @example Upsert a single row using a unique key
	* ```ts
	* // Upserting a single row, overwriting based on the 'username' unique column
	* const { data, error } = await supabase
	*   .from('users')
	*   .upsert({ username: 'supabot' }, { onConflict: 'username' })
	*
	* // Example response:
	* // {
	* //   data: [
	* //     { id: 4, message: 'bar', username: 'supabot' }
	* //   ],
	* //   error: null
	* // }
	* ```
	*
	* @example Upsert with conflict resolution and exact row counting
	* ```ts
	* // Upserting and returning exact count
	* const { data, error, count } = await supabase
	*   .from('users')
	*   .upsert(
	*     {
	*       id: 3,
	*       message: 'foo',
	*       username: 'supabot'
	*     },
	*     {
	*       onConflict: 'username',
	*       count: 'exact'
	*     }
	*   )
	*
	* // Example response:
	* // {
	* //   data: [
	* //     {
	* //       id: 42,
	* //       handle: "saoirse",
	* //       display_name: "Saoirse"
	* //     }
	* //   ],
	* //   count: 1,
	* //   error: null
	* // }
	* ```
	*
	* @category Database
	*
	* @remarks
	* - Primary keys must be included in `values` to use upsert.
	*
	* @example Upsert your data
	* ```ts
	* const { data, error } = await supabase
	*   .from('instruments')
	*   .upsert({ id: 1, name: 'piano' })
	*   .select()
	* ```
	*
	* @exampleSql Upsert your data
	* ```sql
	* create table
	*   instruments (id int8 primary key, name text);
	*
	* insert into
	*   instruments (id, name)
	* values
	*   (1, 'harpsichord');
	* ```
	*
	* @exampleResponse Upsert your data
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "piano"
	*     }
	*   ],
	*   "status": 201,
	*   "statusText": "Created"
	* }
	* ```
	*
	* @example Bulk Upsert your data
	* ```ts
	* const { data, error } = await supabase
	*   .from('instruments')
	*   .upsert([
	*     { id: 1, name: 'piano' },
	*     { id: 2, name: 'harp' },
	*   ])
	*   .select()
	* ```
	*
	* @exampleSql Bulk Upsert your data
	* ```sql
	* create table
	*   instruments (id int8 primary key, name text);
	*
	* insert into
	*   instruments (id, name)
	* values
	*   (1, 'harpsichord');
	* ```
	*
	* @exampleResponse Bulk Upsert your data
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "piano"
	*     },
	*     {
	*       "id": 2,
	*       "name": "harp"
	*     }
	*   ],
	*   "status": 201,
	*   "statusText": "Created"
	* }
	* ```
	*
	* @exampleDescription Upserting into tables with constraints
	* In the following query, `upsert()` implicitly uses the `id`
	* (primary key) column to determine conflicts. If there is no existing
	* row with the same `id`, `upsert()` inserts a new row, which
	* will fail in this case as there is already a row with `handle` `"saoirse"`.
	* Using the `onConflict` option, you can instruct `upsert()` to use
	* another column with a unique constraint to determine conflicts.
	*
	* @example Upserting into tables with constraints
	* ```ts
	* const { data, error } = await supabase
	*   .from('users')
	*   .upsert({ id: 42, handle: 'saoirse', display_name: 'Saoirse' })
	*   .select()
	* ```
	*
	* @exampleSql Upserting into tables with constraints
	* ```sql
	* create table
	*   users (
	*     id int8 generated by default as identity primary key,
	*     handle text not null unique,
	*     display_name text
	*   );
	*
	* insert into
	*   users (id, handle, display_name)
	* values
	*   (1, 'saoirse', null);
	* ```
	*
	* @exampleResponse Upserting into tables with constraints
	* ```json
	* {
	*   "error": {
	*     "code": "23505",
	*     "details": "Key (handle)=(saoirse) already exists.",
	*     "hint": null,
	*     "message": "duplicate key value violates unique constraint \"users_handle_key\""
	*   },
	*   "status": 409,
	*   "statusText": "Conflict"
	* }
	* ```
	*/
	upsert(values, { onConflict, ignoreDuplicates = false, count, defaultToNull = true } = {}) {
		var _this$fetch2;
		const method = "POST";
		const { url, headers } = this.cloneRequestState();
		headers.append("Prefer", `resolution=${ignoreDuplicates ? "ignore" : "merge"}-duplicates`);
		if (onConflict !== void 0) url.searchParams.set("on_conflict", onConflict);
		if (count) headers.append("Prefer", `count=${count}`);
		if (!defaultToNull) headers.append("Prefer", "missing=default");
		if (Array.isArray(values)) {
			const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
			if (columns.length > 0) {
				const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
				url.searchParams.set("columns", uniqueColumns.join(","));
			}
		}
		return new PostgrestFilterBuilder({
			method,
			url,
			headers,
			schema: this.schema,
			body: values,
			fetch: (_this$fetch2 = this.fetch) !== null && _this$fetch2 !== void 0 ? _this$fetch2 : fetch,
			urlLengthLimit: this.urlLengthLimit
		});
	}
	/**
	* Perform an UPDATE on the table or view.
	*
	* By default, updated rows are not returned. To return it, chain the call
	* with `.select()` after filters.
	*
	* @param values - The values to update with
	*
	* @param options - Named parameters
	*
	* @param options.count - Count algorithm to use to count updated rows.
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*
	* @category Database
	*
	* @remarks
	* - `update()` should always be combined with [Filters](/docs/reference/javascript/using-filters) to target the item(s) you wish to update.
	*
	* @example Updating your data
	* ```ts
	* const { error } = await supabase
	*   .from('instruments')
	*   .update({ name: 'piano' })
	*   .eq('id', 1)
	* ```
	*
	* @exampleSql Updating your data
	* ```sql
	* create table
	*   instruments (id int8 primary key, name text);
	*
	* insert into
	*   instruments (id, name)
	* values
	*   (1, 'harpsichord');
	* ```
	*
	* @exampleResponse Updating your data
	* ```json
	* {
	*   "status": 204,
	*   "statusText": "No Content"
	* }
	* ```
	*
	* @example Update a record and return it
	* ```ts
	* const { data, error } = await supabase
	*   .from('instruments')
	*   .update({ name: 'piano' })
	*   .eq('id', 1)
	*   .select()
	* ```
	*
	* @exampleSql Update a record and return it
	* ```sql
	* create table
	*   instruments (id int8 primary key, name text);
	*
	* insert into
	*   instruments (id, name)
	* values
	*   (1, 'harpsichord');
	* ```
	*
	* @exampleResponse Update a record and return it
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "piano"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Updating JSON data
	* Postgres offers some
	* [operators](/docs/guides/database/json#query-the-jsonb-data) for
	* working with JSON data. Currently, it is only possible to update the entire JSON document.
	*
	* @example Updating JSON data
	* ```ts
	* const { data, error } = await supabase
	*   .from('users')
	*   .update({
	*     address: {
	*       street: 'Melrose Place',
	*       postcode: 90210
	*     }
	*   })
	*   .eq('address->postcode', 90210)
	*   .select()
	* ```
	*
	* @exampleSql Updating JSON data
	* ```sql
	* create table
	*   users (
	*     id int8 primary key,
	*     name text,
	*     address jsonb
	*   );
	*
	* insert into
	*   users (id, name, address)
	* values
	*   (1, 'Michael', '{ "postcode": 90210 }');
	* ```
	*
	* @exampleResponse Updating JSON data
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "Michael",
	*       "address": {
	*         "street": "Melrose Place",
	*         "postcode": 90210
	*       }
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/
	update(values, { count } = {}) {
		var _this$fetch3;
		const method = "PATCH";
		const { url, headers } = this.cloneRequestState();
		if (count) headers.append("Prefer", `count=${count}`);
		return new PostgrestFilterBuilder({
			method,
			url,
			headers,
			schema: this.schema,
			body: values,
			fetch: (_this$fetch3 = this.fetch) !== null && _this$fetch3 !== void 0 ? _this$fetch3 : fetch,
			urlLengthLimit: this.urlLengthLimit
		});
	}
	/**
	* Perform a DELETE on the table or view.
	*
	* By default, deleted rows are not returned. To return it, chain the call
	* with `.select()` after filters.
	*
	* @param options - Named parameters
	*
	* @param options.count - Count algorithm to use to count deleted rows.
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*/
	delete({ count } = {}) {
		var _this$fetch4;
		const method = "DELETE";
		const { url, headers } = this.cloneRequestState();
		if (count) headers.append("Prefer", `count=${count}`);
		return new PostgrestFilterBuilder({
			method,
			url,
			headers,
			schema: this.schema,
			fetch: (_this$fetch4 = this.fetch) !== null && _this$fetch4 !== void 0 ? _this$fetch4 : fetch,
			urlLengthLimit: this.urlLengthLimit
		});
	}
};
function _typeof$2(o) {
	"@babel/helpers - typeof";
	return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$2(o);
}
function toPrimitive$2(t, r) {
	if ("object" != _typeof$2(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$2(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function toPropertyKey$2(t) {
	var i = toPrimitive$2(t, "string");
	return "symbol" == _typeof$2(i) ? i : i + "";
}
function _defineProperty$2(e, r, t) {
	return (r = toPropertyKey$2(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function ownKeys$2(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2$2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$2(Object(t), !0).forEach(function(r$1) {
			_defineProperty$2(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
/**
* PostgREST client.
*
* @typeParam Database - Types for the schema from the [type
* generator](https://supabase.com/docs/reference/javascript/next/typescript-support)
*
* @typeParam SchemaName - Postgres schema to switch to. Must be a string
* literal, the same one passed to the constructor. If the schema is not
* `"public"`, this must be supplied manually.
*/
var PostgrestClient = class PostgrestClient {
	/**
	* Creates a PostgREST client.
	*
	* @param url - URL of the PostgREST endpoint
	* @param options - Named parameters
	* @param options.headers - Custom headers
	* @param options.schema - Postgres schema to switch to
	* @param options.fetch - Custom fetch
	* @param options.timeout - Optional timeout in milliseconds for all requests. When set, requests will automatically abort after this duration to prevent indefinite hangs.
	* @param options.urlLengthLimit - Maximum URL length in characters before warnings/errors are triggered. Defaults to 8000.
	* @example
	* ```ts
	* import PostgrestClient from '@supabase/postgrest-js'
	*
	* const postgrest = new PostgrestClient('https://xyzcompany.supabase.co/rest/v1', {
	*   headers: { apikey: 'public-anon-key' },
	*   schema: 'public',
	*   timeout: 30000, // 30 second timeout
	* })
	* ```
	*/
	constructor(url, { headers = {}, schema, fetch: fetch$1, timeout, urlLengthLimit = 8e3 } = {}) {
		this.url = url;
		this.headers = new Headers(headers);
		this.schemaName = schema;
		this.urlLengthLimit = urlLengthLimit;
		const originalFetch = fetch$1 !== null && fetch$1 !== void 0 ? fetch$1 : globalThis.fetch;
		if (timeout !== void 0 && timeout > 0) this.fetch = (input, init) => {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), timeout);
			const existingSignal = init === null || init === void 0 ? void 0 : init.signal;
			if (existingSignal) {
				if (existingSignal.aborted) {
					clearTimeout(timeoutId);
					return originalFetch(input, init);
				}
				const abortHandler = () => {
					clearTimeout(timeoutId);
					controller.abort();
				};
				existingSignal.addEventListener("abort", abortHandler, { once: true });
				return originalFetch(input, _objectSpread2$2(_objectSpread2$2({}, init), {}, { signal: controller.signal })).finally(() => {
					clearTimeout(timeoutId);
					existingSignal.removeEventListener("abort", abortHandler);
				});
			}
			return originalFetch(input, _objectSpread2$2(_objectSpread2$2({}, init), {}, { signal: controller.signal })).finally(() => clearTimeout(timeoutId));
		};
		else this.fetch = originalFetch;
	}
	/**
	* Perform a query on a table or a view.
	*
	* @param relation - The table or view name to query
	*/
	from(relation) {
		if (!relation || typeof relation !== "string" || relation.trim() === "") throw new Error("Invalid relation name: relation must be a non-empty string.");
		return new PostgrestQueryBuilder(new URL(`${this.url}/${relation}`), {
			headers: new Headers(this.headers),
			schema: this.schemaName,
			fetch: this.fetch,
			urlLengthLimit: this.urlLengthLimit
		});
	}
	/**
	* Select a schema to query or perform an function (rpc) call.
	*
	* The schema needs to be on the list of exposed schemas inside Supabase.
	*
	* @param schema - The schema to query
	*/
	schema(schema) {
		return new PostgrestClient(this.url, {
			headers: this.headers,
			schema,
			fetch: this.fetch,
			urlLengthLimit: this.urlLengthLimit
		});
	}
	/**
	* Perform a function call.
	*
	* @param fn - The function name to call
	* @param args - The arguments to pass to the function call
	* @param options - Named parameters
	* @param options.head - When set to `true`, `data` will not be returned.
	* Useful if you only need the count.
	* @param options.get - When set to `true`, the function will be called with
	* read-only access mode.
	* @param options.count - Count algorithm to use to count rows returned by the
	* function. Only applicable for [set-returning
	* functions](https://www.postgresql.org/docs/current/functions-srf.html).
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*
	* @example
	* ```ts
	* // For cross-schema functions where type inference fails, use overrideTypes:
	* const { data } = await supabase
	*   .schema('schema_b')
	*   .rpc('function_a', {})
	*   .overrideTypes<{ id: string; user_id: string }[]>()
	* ```
	*/
	rpc(fn, args = {}, { head = false, get = false, count } = {}) {
		var _this$fetch;
		let method;
		const url = new URL(`${this.url}/rpc/${fn}`);
		let body;
		const _isObject = (v) => v !== null && typeof v === "object" && (!Array.isArray(v) || v.some(_isObject));
		const _hasObjectArg = head && Object.values(args).some(_isObject);
		if (_hasObjectArg) {
			method = "POST";
			body = args;
		} else if (head || get) {
			method = head ? "HEAD" : "GET";
			Object.entries(args).filter(([_, value]) => value !== void 0).map(([name, value]) => [name, Array.isArray(value) ? `{${value.join(",")}}` : `${value}`]).forEach(([name, value]) => {
				url.searchParams.append(name, value);
			});
		} else {
			method = "POST";
			body = args;
		}
		const headers = new Headers(this.headers);
		if (_hasObjectArg) headers.set("Prefer", count ? `count=${count},return=minimal` : "return=minimal");
		else if (count) headers.set("Prefer", `count=${count}`);
		return new PostgrestFilterBuilder({
			method,
			url,
			headers,
			schema: this.schemaName,
			body,
			fetch: (_this$fetch = this.fetch) !== null && _this$fetch !== void 0 ? _this$fetch : fetch,
			urlLengthLimit: this.urlLengthLimit
		});
	}
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+realtime-js@2.99.2/node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
/**
* Utilities for creating WebSocket instances across runtimes.
*/
var WebSocketFactory = class {
	/**
	* Static-only utility – prevent instantiation.
	*/
	constructor() {}
	static detectEnvironment() {
		var _a;
		if (typeof WebSocket !== "undefined") return {
			type: "native",
			constructor: WebSocket
		};
		if (typeof globalThis !== "undefined" && typeof globalThis.WebSocket !== "undefined") return {
			type: "native",
			constructor: globalThis.WebSocket
		};
		if (typeof global !== "undefined" && typeof global.WebSocket !== "undefined") return {
			type: "native",
			constructor: global.WebSocket
		};
		if (typeof globalThis !== "undefined" && typeof globalThis.WebSocketPair !== "undefined" && typeof globalThis.WebSocket === "undefined") return {
			type: "cloudflare",
			error: "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",
			workaround: "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."
		};
		if (typeof globalThis !== "undefined" && globalThis.EdgeRuntime || typeof navigator !== "undefined" && ((_a = navigator.userAgent) === null || _a === void 0 ? void 0 : _a.includes("Vercel-Edge"))) return {
			type: "unsupported",
			error: "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",
			workaround: "Use serverless functions or a different deployment target for WebSocket functionality."
		};
		const _process = globalThis["process"];
		if (_process) {
			const processVersions = _process["versions"];
			if (processVersions && processVersions["node"]) {
				const versionString = processVersions["node"];
				const nodeVersion = parseInt(versionString.replace(/^v/, "").split(".")[0]);
				if (nodeVersion >= 22) {
					if (typeof globalThis.WebSocket !== "undefined") return {
						type: "native",
						constructor: globalThis.WebSocket
					};
					return {
						type: "unsupported",
						error: `Node.js ${nodeVersion} detected but native WebSocket not found.`,
						workaround: "Provide a WebSocket implementation via the transport option."
					};
				}
				return {
					type: "unsupported",
					error: `Node.js ${nodeVersion} detected without native WebSocket support.`,
					workaround: "For Node.js < 22, install \"ws\" package and provide it via the transport option:\nimport ws from \"ws\"\nnew RealtimeClient(url, { transport: ws })"
				};
			}
		}
		return {
			type: "unsupported",
			error: "Unknown JavaScript runtime without WebSocket support.",
			workaround: "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."
		};
	}
	/**
	* Returns the best available WebSocket constructor for the current runtime.
	*
	* @example
	* ```ts
	* const WS = WebSocketFactory.getWebSocketConstructor()
	* const socket = new WS('wss://realtime.supabase.co/socket')
	* ```
	*/
	static getWebSocketConstructor() {
		const env = this.detectEnvironment();
		if (env.constructor) return env.constructor;
		let errorMessage = env.error || "WebSocket not supported in this environment.";
		if (env.workaround) errorMessage += `\n\nSuggested solution: ${env.workaround}`;
		throw new Error(errorMessage);
	}
	/**
	* Creates a WebSocket using the detected constructor.
	*
	* @example
	* ```ts
	* const socket = WebSocketFactory.createWebSocket('wss://realtime.supabase.co/socket')
	* ```
	*/
	static createWebSocket(url, protocols) {
		return new (this.getWebSocketConstructor())(url, protocols);
	}
	/**
	* Detects whether the runtime can establish WebSocket connections.
	*
	* @example
	* ```ts
	* if (!WebSocketFactory.isWebSocketSupported()) {
	*   console.warn('Falling back to long polling')
	* }
	* ```
	*/
	static isWebSocketSupported() {
		try {
			const env = this.detectEnvironment();
			return env.type === "native" || env.type === "ws";
		} catch (_a) {
			return false;
		}
	}
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+realtime-js@2.99.2/node_modules/@supabase/realtime-js/dist/module/lib/constants.js
var DEFAULT_VERSION = `realtime-js/2.99.2`;
var VSN_1_0_0 = "1.0.0";
var VSN_2_0_0 = "2.0.0";
var DEFAULT_VSN = VSN_2_0_0;
var DEFAULT_TIMEOUT = 1e4;
var SOCKET_STATES;
(function(SOCKET_STATES) {
	SOCKET_STATES[SOCKET_STATES["connecting"] = 0] = "connecting";
	SOCKET_STATES[SOCKET_STATES["open"] = 1] = "open";
	SOCKET_STATES[SOCKET_STATES["closing"] = 2] = "closing";
	SOCKET_STATES[SOCKET_STATES["closed"] = 3] = "closed";
})(SOCKET_STATES || (SOCKET_STATES = {}));
var CHANNEL_STATES;
(function(CHANNEL_STATES) {
	CHANNEL_STATES["closed"] = "closed";
	CHANNEL_STATES["errored"] = "errored";
	CHANNEL_STATES["joined"] = "joined";
	CHANNEL_STATES["joining"] = "joining";
	CHANNEL_STATES["leaving"] = "leaving";
})(CHANNEL_STATES || (CHANNEL_STATES = {}));
var CHANNEL_EVENTS;
(function(CHANNEL_EVENTS) {
	CHANNEL_EVENTS["close"] = "phx_close";
	CHANNEL_EVENTS["error"] = "phx_error";
	CHANNEL_EVENTS["join"] = "phx_join";
	CHANNEL_EVENTS["reply"] = "phx_reply";
	CHANNEL_EVENTS["leave"] = "phx_leave";
	CHANNEL_EVENTS["access_token"] = "access_token";
})(CHANNEL_EVENTS || (CHANNEL_EVENTS = {}));
var TRANSPORTS;
(function(TRANSPORTS) {
	TRANSPORTS["websocket"] = "websocket";
})(TRANSPORTS || (TRANSPORTS = {}));
var CONNECTION_STATE;
(function(CONNECTION_STATE) {
	CONNECTION_STATE["Connecting"] = "connecting";
	CONNECTION_STATE["Open"] = "open";
	CONNECTION_STATE["Closing"] = "closing";
	CONNECTION_STATE["Closed"] = "closed";
})(CONNECTION_STATE || (CONNECTION_STATE = {}));
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+realtime-js@2.99.2/node_modules/@supabase/realtime-js/dist/module/lib/serializer.js
var Serializer = class {
	constructor(allowedMetadataKeys) {
		this.HEADER_LENGTH = 1;
		this.USER_BROADCAST_PUSH_META_LENGTH = 6;
		this.KINDS = {
			userBroadcastPush: 3,
			userBroadcast: 4
		};
		this.BINARY_ENCODING = 0;
		this.JSON_ENCODING = 1;
		this.BROADCAST_EVENT = "broadcast";
		this.allowedMetadataKeys = [];
		this.allowedMetadataKeys = allowedMetadataKeys !== null && allowedMetadataKeys !== void 0 ? allowedMetadataKeys : [];
	}
	encode(msg, callback) {
		if (msg.event === this.BROADCAST_EVENT && !(msg.payload instanceof ArrayBuffer) && typeof msg.payload.event === "string") return callback(this._binaryEncodeUserBroadcastPush(msg));
		let payload = [
			msg.join_ref,
			msg.ref,
			msg.topic,
			msg.event,
			msg.payload
		];
		return callback(JSON.stringify(payload));
	}
	_binaryEncodeUserBroadcastPush(message) {
		var _a;
		if (this._isArrayBuffer((_a = message.payload) === null || _a === void 0 ? void 0 : _a.payload)) return this._encodeBinaryUserBroadcastPush(message);
		else return this._encodeJsonUserBroadcastPush(message);
	}
	_encodeBinaryUserBroadcastPush(message) {
		var _a, _b;
		const userPayload = (_b = (_a = message.payload) === null || _a === void 0 ? void 0 : _a.payload) !== null && _b !== void 0 ? _b : /* @__PURE__ */ new ArrayBuffer(0);
		return this._encodeUserBroadcastPush(message, this.BINARY_ENCODING, userPayload);
	}
	_encodeJsonUserBroadcastPush(message) {
		var _a, _b;
		const userPayload = (_b = (_a = message.payload) === null || _a === void 0 ? void 0 : _a.payload) !== null && _b !== void 0 ? _b : {};
		const encodedUserPayload = new TextEncoder().encode(JSON.stringify(userPayload)).buffer;
		return this._encodeUserBroadcastPush(message, this.JSON_ENCODING, encodedUserPayload);
	}
	_encodeUserBroadcastPush(message, encodingType, encodedPayload) {
		var _a, _b;
		const topic = message.topic;
		const ref = (_a = message.ref) !== null && _a !== void 0 ? _a : "";
		const joinRef = (_b = message.join_ref) !== null && _b !== void 0 ? _b : "";
		const userEvent = message.payload.event;
		const rest = this.allowedMetadataKeys ? this._pick(message.payload, this.allowedMetadataKeys) : {};
		const metadata = Object.keys(rest).length === 0 ? "" : JSON.stringify(rest);
		if (joinRef.length > 255) throw new Error(`joinRef length ${joinRef.length} exceeds maximum of 255`);
		if (ref.length > 255) throw new Error(`ref length ${ref.length} exceeds maximum of 255`);
		if (topic.length > 255) throw new Error(`topic length ${topic.length} exceeds maximum of 255`);
		if (userEvent.length > 255) throw new Error(`userEvent length ${userEvent.length} exceeds maximum of 255`);
		if (metadata.length > 255) throw new Error(`metadata length ${metadata.length} exceeds maximum of 255`);
		const metaLength = this.USER_BROADCAST_PUSH_META_LENGTH + joinRef.length + ref.length + topic.length + userEvent.length + metadata.length;
		const header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
		let view = new DataView(header);
		let offset = 0;
		view.setUint8(offset++, this.KINDS.userBroadcastPush);
		view.setUint8(offset++, joinRef.length);
		view.setUint8(offset++, ref.length);
		view.setUint8(offset++, topic.length);
		view.setUint8(offset++, userEvent.length);
		view.setUint8(offset++, metadata.length);
		view.setUint8(offset++, encodingType);
		Array.from(joinRef, (char) => view.setUint8(offset++, char.charCodeAt(0)));
		Array.from(ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
		Array.from(topic, (char) => view.setUint8(offset++, char.charCodeAt(0)));
		Array.from(userEvent, (char) => view.setUint8(offset++, char.charCodeAt(0)));
		Array.from(metadata, (char) => view.setUint8(offset++, char.charCodeAt(0)));
		var combined = new Uint8Array(header.byteLength + encodedPayload.byteLength);
		combined.set(new Uint8Array(header), 0);
		combined.set(new Uint8Array(encodedPayload), header.byteLength);
		return combined.buffer;
	}
	decode(rawPayload, callback) {
		if (this._isArrayBuffer(rawPayload)) return callback(this._binaryDecode(rawPayload));
		if (typeof rawPayload === "string") {
			const [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
			return callback({
				join_ref,
				ref,
				topic,
				event,
				payload
			});
		}
		return callback({});
	}
	_binaryDecode(buffer) {
		const view = new DataView(buffer);
		const kind = view.getUint8(0);
		const decoder = new TextDecoder();
		switch (kind) {
			case this.KINDS.userBroadcast: return this._decodeUserBroadcast(buffer, view, decoder);
		}
	}
	_decodeUserBroadcast(buffer, view, decoder) {
		const topicSize = view.getUint8(1);
		const userEventSize = view.getUint8(2);
		const metadataSize = view.getUint8(3);
		const payloadEncoding = view.getUint8(4);
		let offset = this.HEADER_LENGTH + 4;
		const topic = decoder.decode(buffer.slice(offset, offset + topicSize));
		offset = offset + topicSize;
		const userEvent = decoder.decode(buffer.slice(offset, offset + userEventSize));
		offset = offset + userEventSize;
		const metadata = decoder.decode(buffer.slice(offset, offset + metadataSize));
		offset = offset + metadataSize;
		const payload = buffer.slice(offset, buffer.byteLength);
		const parsedPayload = payloadEncoding === this.JSON_ENCODING ? JSON.parse(decoder.decode(payload)) : payload;
		const data = {
			type: this.BROADCAST_EVENT,
			event: userEvent,
			payload: parsedPayload
		};
		if (metadataSize > 0) data["meta"] = JSON.parse(metadata);
		return {
			join_ref: null,
			ref: null,
			topic,
			event: this.BROADCAST_EVENT,
			payload: data
		};
	}
	_isArrayBuffer(buffer) {
		var _a;
		return buffer instanceof ArrayBuffer || ((_a = buffer === null || buffer === void 0 ? void 0 : buffer.constructor) === null || _a === void 0 ? void 0 : _a.name) === "ArrayBuffer";
	}
	_pick(obj, keys) {
		if (!obj || typeof obj !== "object") return {};
		return Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key)));
	}
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+realtime-js@2.99.2/node_modules/@supabase/realtime-js/dist/module/lib/timer.js
/**
* Creates a timer that accepts a `timerCalc` function to perform calculated timeout retries, such as exponential backoff.
*
* @example
*    let reconnectTimer = new Timer(() => this.connect(), function(tries){
*      return [1000, 5000, 10000][tries - 1] || 10000
*    })
*    reconnectTimer.scheduleTimeout() // fires after 1000
*    reconnectTimer.scheduleTimeout() // fires after 5000
*    reconnectTimer.reset()
*    reconnectTimer.scheduleTimeout() // fires after 1000
*/
var Timer = class {
	constructor(callback, timerCalc) {
		this.callback = callback;
		this.timerCalc = timerCalc;
		this.timer = void 0;
		this.tries = 0;
		this.callback = callback;
		this.timerCalc = timerCalc;
	}
	reset() {
		this.tries = 0;
		clearTimeout(this.timer);
		this.timer = void 0;
	}
	scheduleTimeout() {
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			this.tries = this.tries + 1;
			this.callback();
		}, this.timerCalc(this.tries + 1));
	}
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+realtime-js@2.99.2/node_modules/@supabase/realtime-js/dist/module/lib/transformers.js
/**
* Helpers to convert the change Payload into native JS types.
*/
var PostgresTypes;
(function(PostgresTypes) {
	PostgresTypes["abstime"] = "abstime";
	PostgresTypes["bool"] = "bool";
	PostgresTypes["date"] = "date";
	PostgresTypes["daterange"] = "daterange";
	PostgresTypes["float4"] = "float4";
	PostgresTypes["float8"] = "float8";
	PostgresTypes["int2"] = "int2";
	PostgresTypes["int4"] = "int4";
	PostgresTypes["int4range"] = "int4range";
	PostgresTypes["int8"] = "int8";
	PostgresTypes["int8range"] = "int8range";
	PostgresTypes["json"] = "json";
	PostgresTypes["jsonb"] = "jsonb";
	PostgresTypes["money"] = "money";
	PostgresTypes["numeric"] = "numeric";
	PostgresTypes["oid"] = "oid";
	PostgresTypes["reltime"] = "reltime";
	PostgresTypes["text"] = "text";
	PostgresTypes["time"] = "time";
	PostgresTypes["timestamp"] = "timestamp";
	PostgresTypes["timestamptz"] = "timestamptz";
	PostgresTypes["timetz"] = "timetz";
	PostgresTypes["tsrange"] = "tsrange";
	PostgresTypes["tstzrange"] = "tstzrange";
})(PostgresTypes || (PostgresTypes = {}));
/**
* Takes an array of columns and an object of string values then converts each string value
* to its mapped type.
*
* @param {{name: String, type: String}[]} columns
* @param {Object} record
* @param {Object} options The map of various options that can be applied to the mapper
* @param {Array} options.skipTypes The array of types that should not be converted
*
* @example convertChangeData([{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age:'33'}, {})
* //=>{ first_name: 'Paul', age: 33 }
*/
var convertChangeData = (columns, record, options = {}) => {
	var _a;
	const skipTypes = (_a = options.skipTypes) !== null && _a !== void 0 ? _a : [];
	if (!record) return {};
	return Object.keys(record).reduce((acc, rec_key) => {
		acc[rec_key] = convertColumn(rec_key, columns, record, skipTypes);
		return acc;
	}, {});
};
/**
* Converts the value of an individual column.
*
* @param {String} columnName The column that you want to convert
* @param {{name: String, type: String}[]} columns All of the columns
* @param {Object} record The map of string values
* @param {Array} skipTypes An array of types that should not be converted
* @return {object} Useless information
*
* @example convertColumn('age', [{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age: '33'}, [])
* //=> 33
* @example convertColumn('age', [{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age: '33'}, ['int4'])
* //=> "33"
*/
var convertColumn = (columnName, columns, record, skipTypes) => {
	const column = columns.find((x) => x.name === columnName);
	const colType = column === null || column === void 0 ? void 0 : column.type;
	const value = record[columnName];
	if (colType && !skipTypes.includes(colType)) return convertCell(colType, value);
	return noop$1(value);
};
/**
* If the value of the cell is `null`, returns null.
* Otherwise converts the string value to the correct type.
* @param {String} type A postgres column type
* @param {String} value The cell value
*
* @example convertCell('bool', 't')
* //=> true
* @example convertCell('int8', '10')
* //=> 10
* @example convertCell('_int4', '{1,2,3,4}')
* //=> [1,2,3,4]
*/
var convertCell = (type, value) => {
	if (type.charAt(0) === "_") return toArray(value, type.slice(1, type.length));
	switch (type) {
		case PostgresTypes.bool: return toBoolean(value);
		case PostgresTypes.float4:
		case PostgresTypes.float8:
		case PostgresTypes.int2:
		case PostgresTypes.int4:
		case PostgresTypes.int8:
		case PostgresTypes.numeric:
		case PostgresTypes.oid: return toNumber(value);
		case PostgresTypes.json:
		case PostgresTypes.jsonb: return toJson(value);
		case PostgresTypes.timestamp: return toTimestampString(value);
		case PostgresTypes.abstime:
		case PostgresTypes.date:
		case PostgresTypes.daterange:
		case PostgresTypes.int4range:
		case PostgresTypes.int8range:
		case PostgresTypes.money:
		case PostgresTypes.reltime:
		case PostgresTypes.text:
		case PostgresTypes.time:
		case PostgresTypes.timestamptz:
		case PostgresTypes.timetz:
		case PostgresTypes.tsrange:
		case PostgresTypes.tstzrange: return noop$1(value);
		default: return noop$1(value);
	}
};
var noop$1 = (value) => {
	return value;
};
var toBoolean = (value) => {
	switch (value) {
		case "t": return true;
		case "f": return false;
		default: return value;
	}
};
var toNumber = (value) => {
	if (typeof value === "string") {
		const parsedValue = parseFloat(value);
		if (!Number.isNaN(parsedValue)) return parsedValue;
	}
	return value;
};
var toJson = (value) => {
	if (typeof value === "string") try {
		return JSON.parse(value);
	} catch (_a) {
		return value;
	}
	return value;
};
/**
* Converts a Postgres Array into a native JS array
*
* @example toArray('{}', 'int4')
* //=> []
* @example toArray('{"[2021-01-01,2021-12-31)","(2021-01-01,2021-12-32]"}', 'daterange')
* //=> ['[2021-01-01,2021-12-31)', '(2021-01-01,2021-12-32]']
* @example toArray([1,2,3,4], 'int4')
* //=> [1,2,3,4]
*/
var toArray = (value, type) => {
	if (typeof value !== "string") return value;
	const lastIdx = value.length - 1;
	const closeBrace = value[lastIdx];
	if (value[0] === "{" && closeBrace === "}") {
		let arr;
		const valTrim = value.slice(1, lastIdx);
		try {
			arr = JSON.parse("[" + valTrim + "]");
		} catch (_) {
			arr = valTrim ? valTrim.split(",") : [];
		}
		return arr.map((val) => convertCell(type, val));
	}
	return value;
};
/**
* Fixes timestamp to be ISO-8601. Swaps the space between the date and time for a 'T'
* See https://github.com/supabase/supabase/issues/18
*
* @example toTimestampString('2019-09-10 00:00:00')
* //=> '2019-09-10T00:00:00'
*/
var toTimestampString = (value) => {
	if (typeof value === "string") return value.replace(" ", "T");
	return value;
};
var httpEndpointURL = (socketUrl) => {
	const wsUrl = new URL(socketUrl);
	wsUrl.protocol = wsUrl.protocol.replace(/^ws/i, "http");
	wsUrl.pathname = wsUrl.pathname.replace(/\/+$/, "").replace(/\/socket\/websocket$/i, "").replace(/\/socket$/i, "").replace(/\/websocket$/i, "");
	if (wsUrl.pathname === "" || wsUrl.pathname === "/") wsUrl.pathname = "/api/broadcast";
	else wsUrl.pathname = wsUrl.pathname + "/api/broadcast";
	return wsUrl.href;
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+realtime-js@2.99.2/node_modules/@supabase/realtime-js/dist/module/lib/push.js
var Push = class {
	/**
	* Initializes the Push
	*
	* @param channel The Channel
	* @param event The event, for example `"phx_join"`
	* @param payload The payload, for example `{user_id: 123}`
	* @param timeout The push timeout in milliseconds
	*/
	constructor(channel, event, payload = {}, timeout = DEFAULT_TIMEOUT) {
		this.channel = channel;
		this.event = event;
		this.payload = payload;
		this.timeout = timeout;
		this.sent = false;
		this.timeoutTimer = void 0;
		this.ref = "";
		this.receivedResp = null;
		this.recHooks = [];
		this.refEvent = null;
	}
	resend(timeout) {
		this.timeout = timeout;
		this._cancelRefEvent();
		this.ref = "";
		this.refEvent = null;
		this.receivedResp = null;
		this.sent = false;
		this.send();
	}
	send() {
		if (this._hasReceived("timeout")) return;
		this.startTimeout();
		this.sent = true;
		this.channel.socket.push({
			topic: this.channel.topic,
			event: this.event,
			payload: this.payload,
			ref: this.ref,
			join_ref: this.channel._joinRef()
		});
	}
	updatePayload(payload) {
		this.payload = Object.assign(Object.assign({}, this.payload), payload);
	}
	receive(status, callback) {
		var _a;
		if (this._hasReceived(status)) callback((_a = this.receivedResp) === null || _a === void 0 ? void 0 : _a.response);
		this.recHooks.push({
			status,
			callback
		});
		return this;
	}
	startTimeout() {
		if (this.timeoutTimer) return;
		this.ref = this.channel.socket._makeRef();
		this.refEvent = this.channel._replyEventName(this.ref);
		const callback = (payload) => {
			this._cancelRefEvent();
			this._cancelTimeout();
			this.receivedResp = payload;
			this._matchReceive(payload);
		};
		this.channel._on(this.refEvent, {}, callback);
		this.timeoutTimer = setTimeout(() => {
			this.trigger("timeout", {});
		}, this.timeout);
	}
	trigger(status, response) {
		if (this.refEvent) this.channel._trigger(this.refEvent, {
			status,
			response
		});
	}
	destroy() {
		this._cancelRefEvent();
		this._cancelTimeout();
	}
	_cancelRefEvent() {
		if (!this.refEvent) return;
		this.channel._off(this.refEvent, {});
	}
	_cancelTimeout() {
		clearTimeout(this.timeoutTimer);
		this.timeoutTimer = void 0;
	}
	_matchReceive({ status, response }) {
		this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
	}
	_hasReceived(status) {
		return this.receivedResp && this.receivedResp.status === status;
	}
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+realtime-js@2.99.2/node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js
var REALTIME_PRESENCE_LISTEN_EVENTS;
(function(REALTIME_PRESENCE_LISTEN_EVENTS) {
	REALTIME_PRESENCE_LISTEN_EVENTS["SYNC"] = "sync";
	REALTIME_PRESENCE_LISTEN_EVENTS["JOIN"] = "join";
	REALTIME_PRESENCE_LISTEN_EVENTS["LEAVE"] = "leave";
})(REALTIME_PRESENCE_LISTEN_EVENTS || (REALTIME_PRESENCE_LISTEN_EVENTS = {}));
var RealtimePresence = class RealtimePresence {
	/**
	* Creates a Presence helper that keeps the local presence state in sync with the server.
	*
	* @param channel - The realtime channel to bind to.
	* @param opts - Optional custom event names, e.g. `{ events: { state: 'state', diff: 'diff' } }`.
	*
	* @example
	* ```ts
	* const presence = new RealtimePresence(channel)
	*
	* channel.on('presence', ({ event, key }) => {
	*   console.log(`Presence ${event} on ${key}`)
	* })
	* ```
	*/
	constructor(channel, opts) {
		this.channel = channel;
		this.state = {};
		this.pendingDiffs = [];
		this.joinRef = null;
		this.enabled = false;
		this.caller = {
			onJoin: () => {},
			onLeave: () => {},
			onSync: () => {}
		};
		const events = (opts === null || opts === void 0 ? void 0 : opts.events) || {
			state: "presence_state",
			diff: "presence_diff"
		};
		this.channel._on(events.state, {}, (newState) => {
			const { onJoin, onLeave, onSync } = this.caller;
			this.joinRef = this.channel._joinRef();
			this.state = RealtimePresence.syncState(this.state, newState, onJoin, onLeave);
			this.pendingDiffs.forEach((diff) => {
				this.state = RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
			});
			this.pendingDiffs = [];
			onSync();
		});
		this.channel._on(events.diff, {}, (diff) => {
			const { onJoin, onLeave, onSync } = this.caller;
			if (this.inPendingSyncState()) this.pendingDiffs.push(diff);
			else {
				this.state = RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
				onSync();
			}
		});
		this.onJoin((key, currentPresences, newPresences) => {
			this.channel._trigger("presence", {
				event: "join",
				key,
				currentPresences,
				newPresences
			});
		});
		this.onLeave((key, currentPresences, leftPresences) => {
			this.channel._trigger("presence", {
				event: "leave",
				key,
				currentPresences,
				leftPresences
			});
		});
		this.onSync(() => {
			this.channel._trigger("presence", { event: "sync" });
		});
	}
	/**
	* Used to sync the list of presences on the server with the
	* client's state.
	*
	* An optional `onJoin` and `onLeave` callback can be provided to
	* react to changes in the client's local presences across
	* disconnects and reconnects with the server.
	*
	* @internal
	*/
	static syncState(currentState, newState, onJoin, onLeave) {
		const state = this.cloneDeep(currentState);
		const transformedState = this.transformState(newState);
		const joins = {};
		const leaves = {};
		this.map(state, (key, presences) => {
			if (!transformedState[key]) leaves[key] = presences;
		});
		this.map(transformedState, (key, newPresences) => {
			const currentPresences = state[key];
			if (currentPresences) {
				const newPresenceRefs = newPresences.map((m) => m.presence_ref);
				const curPresenceRefs = currentPresences.map((m) => m.presence_ref);
				const joinedPresences = newPresences.filter((m) => curPresenceRefs.indexOf(m.presence_ref) < 0);
				const leftPresences = currentPresences.filter((m) => newPresenceRefs.indexOf(m.presence_ref) < 0);
				if (joinedPresences.length > 0) joins[key] = joinedPresences;
				if (leftPresences.length > 0) leaves[key] = leftPresences;
			} else joins[key] = newPresences;
		});
		return this.syncDiff(state, {
			joins,
			leaves
		}, onJoin, onLeave);
	}
	/**
	* Used to sync a diff of presence join and leave events from the
	* server, as they happen.
	*
	* Like `syncState`, `syncDiff` accepts optional `onJoin` and
	* `onLeave` callbacks to react to a user joining or leaving from a
	* device.
	*
	* @internal
	*/
	static syncDiff(state, diff, onJoin, onLeave) {
		const { joins, leaves } = {
			joins: this.transformState(diff.joins),
			leaves: this.transformState(diff.leaves)
		};
		if (!onJoin) onJoin = () => {};
		if (!onLeave) onLeave = () => {};
		this.map(joins, (key, newPresences) => {
			var _a;
			const currentPresences = (_a = state[key]) !== null && _a !== void 0 ? _a : [];
			state[key] = this.cloneDeep(newPresences);
			if (currentPresences.length > 0) {
				const joinedPresenceRefs = state[key].map((m) => m.presence_ref);
				const curPresences = currentPresences.filter((m) => joinedPresenceRefs.indexOf(m.presence_ref) < 0);
				state[key].unshift(...curPresences);
			}
			onJoin(key, currentPresences, newPresences);
		});
		this.map(leaves, (key, leftPresences) => {
			let currentPresences = state[key];
			if (!currentPresences) return;
			const presenceRefsToRemove = leftPresences.map((m) => m.presence_ref);
			currentPresences = currentPresences.filter((m) => presenceRefsToRemove.indexOf(m.presence_ref) < 0);
			state[key] = currentPresences;
			onLeave(key, currentPresences, leftPresences);
			if (currentPresences.length === 0) delete state[key];
		});
		return state;
	}
	/** @internal */
	static map(obj, func) {
		return Object.getOwnPropertyNames(obj).map((key) => func(key, obj[key]));
	}
	/**
	* Remove 'metas' key
	* Change 'phx_ref' to 'presence_ref'
	* Remove 'phx_ref' and 'phx_ref_prev'
	*
	* @example
	* // returns {
	*  abc123: [
	*    { presence_ref: '2', user_id: 1 },
	*    { presence_ref: '3', user_id: 2 }
	*  ]
	* }
	* RealtimePresence.transformState({
	*  abc123: {
	*    metas: [
	*      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
	*      { phx_ref: '3', user_id: 2 }
	*    ]
	*  }
	* })
	*
	* @internal
	*/
	static transformState(state) {
		state = this.cloneDeep(state);
		return Object.getOwnPropertyNames(state).reduce((newState, key) => {
			const presences = state[key];
			if ("metas" in presences) newState[key] = presences.metas.map((presence) => {
				presence["presence_ref"] = presence["phx_ref"];
				delete presence["phx_ref"];
				delete presence["phx_ref_prev"];
				return presence;
			});
			else newState[key] = presences;
			return newState;
		}, {});
	}
	/** @internal */
	static cloneDeep(obj) {
		return JSON.parse(JSON.stringify(obj));
	}
	/** @internal */
	onJoin(callback) {
		this.caller.onJoin = callback;
	}
	/** @internal */
	onLeave(callback) {
		this.caller.onLeave = callback;
	}
	/** @internal */
	onSync(callback) {
		this.caller.onSync = callback;
	}
	/** @internal */
	inPendingSyncState() {
		return !this.joinRef || this.joinRef !== this.channel._joinRef();
	}
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+realtime-js@2.99.2/node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js
var REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
(function(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT) {
	REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["ALL"] = "*";
	REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["INSERT"] = "INSERT";
	REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["UPDATE"] = "UPDATE";
	REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["DELETE"] = "DELETE";
})(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
var REALTIME_LISTEN_TYPES;
(function(REALTIME_LISTEN_TYPES) {
	REALTIME_LISTEN_TYPES["BROADCAST"] = "broadcast";
	REALTIME_LISTEN_TYPES["PRESENCE"] = "presence";
	REALTIME_LISTEN_TYPES["POSTGRES_CHANGES"] = "postgres_changes";
	REALTIME_LISTEN_TYPES["SYSTEM"] = "system";
})(REALTIME_LISTEN_TYPES || (REALTIME_LISTEN_TYPES = {}));
var REALTIME_SUBSCRIBE_STATES;
(function(REALTIME_SUBSCRIBE_STATES) {
	REALTIME_SUBSCRIBE_STATES["SUBSCRIBED"] = "SUBSCRIBED";
	REALTIME_SUBSCRIBE_STATES["TIMED_OUT"] = "TIMED_OUT";
	REALTIME_SUBSCRIBE_STATES["CLOSED"] = "CLOSED";
	REALTIME_SUBSCRIBE_STATES["CHANNEL_ERROR"] = "CHANNEL_ERROR";
})(REALTIME_SUBSCRIBE_STATES || (REALTIME_SUBSCRIBE_STATES = {}));
/** A channel is the basic building block of Realtime
* and narrows the scope of data flow to subscribed clients.
* You can think of a channel as a chatroom where participants are able to see who's online
* and send and receive messages.
*/
var RealtimeChannel = class RealtimeChannel {
	/**
	* Creates a channel that can broadcast messages, sync presence, and listen to Postgres changes.
	*
	* The topic determines which realtime stream you are subscribing to. Config options let you
	* enable acknowledgement for broadcasts, presence tracking, or private channels.
	*
	* @example
	* ```ts
	* import RealtimeClient from '@supabase/realtime-js'
	*
	* const client = new RealtimeClient('https://xyzcompany.supabase.co/realtime/v1', {
	*   params: { apikey: 'public-anon-key' },
	* })
	* const channel = new RealtimeChannel('realtime:public:messages', { config: {} }, client)
	* ```
	*/
	constructor(topic, params = { config: {} }, socket) {
		var _a, _b;
		this.topic = topic;
		this.params = params;
		this.socket = socket;
		this.bindings = {};
		this.state = CHANNEL_STATES.closed;
		this.joinedOnce = false;
		this.pushBuffer = [];
		this.subTopic = topic.replace(/^realtime:/i, "");
		this.params.config = Object.assign({
			broadcast: {
				ack: false,
				self: false
			},
			presence: {
				key: "",
				enabled: false
			},
			private: false
		}, params.config);
		this.timeout = this.socket.timeout;
		this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
		this.rejoinTimer = new Timer(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs);
		this.joinPush.receive("ok", () => {
			this.state = CHANNEL_STATES.joined;
			this.rejoinTimer.reset();
			this.pushBuffer.forEach((pushEvent) => pushEvent.send());
			this.pushBuffer = [];
		});
		this._onClose(() => {
			this.rejoinTimer.reset();
			this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`);
			this.state = CHANNEL_STATES.closed;
			this.socket._remove(this);
		});
		this._onError((reason) => {
			if (this._isLeaving() || this._isClosed()) return;
			this.socket.log("channel", `error ${this.topic}`, reason);
			this.state = CHANNEL_STATES.errored;
			this.rejoinTimer.scheduleTimeout();
		});
		this.joinPush.receive("timeout", () => {
			if (!this._isJoining()) return;
			this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
			this.state = CHANNEL_STATES.errored;
			this.rejoinTimer.scheduleTimeout();
		});
		this.joinPush.receive("error", (reason) => {
			if (this._isLeaving() || this._isClosed()) return;
			this.socket.log("channel", `error ${this.topic}`, reason);
			this.state = CHANNEL_STATES.errored;
			this.rejoinTimer.scheduleTimeout();
		});
		this._on(CHANNEL_EVENTS.reply, {}, (payload, ref) => {
			this._trigger(this._replyEventName(ref), payload);
		});
		this.presence = new RealtimePresence(this);
		this.broadcastEndpointURL = httpEndpointURL(this.socket.endPoint);
		this.private = this.params.config.private || false;
		if (!this.private && ((_b = (_a = this.params.config) === null || _a === void 0 ? void 0 : _a.broadcast) === null || _b === void 0 ? void 0 : _b.replay)) throw `tried to use replay on public channel '${this.topic}'. It must be a private channel.`;
	}
	/** Subscribe registers your client with the server */
	subscribe(callback, timeout = this.timeout) {
		var _a, _b, _c;
		if (!this.socket.isConnected()) this.socket.connect();
		if (this.state == CHANNEL_STATES.closed) {
			const { config: { broadcast, presence, private: isPrivate } } = this.params;
			const postgres_changes = (_b = (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.map((r) => r.filter)) !== null && _b !== void 0 ? _b : [];
			const presence_enabled = !!this.bindings[REALTIME_LISTEN_TYPES.PRESENCE] && this.bindings[REALTIME_LISTEN_TYPES.PRESENCE].length > 0 || ((_c = this.params.config.presence) === null || _c === void 0 ? void 0 : _c.enabled) === true;
			const accessTokenPayload = {};
			const config = {
				broadcast,
				presence: Object.assign(Object.assign({}, presence), { enabled: presence_enabled }),
				postgres_changes,
				private: isPrivate
			};
			if (this.socket.accessTokenValue) accessTokenPayload.access_token = this.socket.accessTokenValue;
			this._onError((e) => callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, e));
			this._onClose(() => callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CLOSED));
			this.updateJoinPayload(Object.assign({ config }, accessTokenPayload));
			this.joinedOnce = true;
			this._rejoin(timeout);
			this.joinPush.receive("ok", async ({ postgres_changes }) => {
				var _a;
				if (!this.socket._isManualToken()) this.socket.setAuth();
				if (postgres_changes === void 0) {
					callback === null || callback === void 0 || callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
					return;
				} else {
					const clientPostgresBindings = this.bindings.postgres_changes;
					const bindingsLen = (_a = clientPostgresBindings === null || clientPostgresBindings === void 0 ? void 0 : clientPostgresBindings.length) !== null && _a !== void 0 ? _a : 0;
					const newPostgresBindings = [];
					for (let i = 0; i < bindingsLen; i++) {
						const clientPostgresBinding = clientPostgresBindings[i];
						const { filter: { event, schema, table, filter } } = clientPostgresBinding;
						const serverPostgresFilter = postgres_changes && postgres_changes[i];
						if (serverPostgresFilter && serverPostgresFilter.event === event && RealtimeChannel.isFilterValueEqual(serverPostgresFilter.schema, schema) && RealtimeChannel.isFilterValueEqual(serverPostgresFilter.table, table) && RealtimeChannel.isFilterValueEqual(serverPostgresFilter.filter, filter)) newPostgresBindings.push(Object.assign(Object.assign({}, clientPostgresBinding), { id: serverPostgresFilter.id }));
						else {
							this.unsubscribe();
							this.state = CHANNEL_STATES.errored;
							callback === null || callback === void 0 || callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, /* @__PURE__ */ new Error("mismatch between server and client bindings for postgres changes"));
							return;
						}
					}
					this.bindings.postgres_changes = newPostgresBindings;
					callback && callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
					return;
				}
			}).receive("error", (error) => {
				this.state = CHANNEL_STATES.errored;
				callback === null || callback === void 0 || callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error(JSON.stringify(Object.values(error).join(", ") || "error")));
			}).receive("timeout", () => {
				callback === null || callback === void 0 || callback(REALTIME_SUBSCRIBE_STATES.TIMED_OUT);
			});
		}
		return this;
	}
	/**
	* Returns the current presence state for this channel.
	*
	* The shape is a map keyed by presence key (for example a user id) where each entry contains the
	* tracked metadata for that user.
	*/
	presenceState() {
		return this.presence.state;
	}
	/**
	* Sends the supplied payload to the presence tracker so other subscribers can see that this
	* client is online. Use `untrack` to stop broadcasting presence for the same key.
	*/
	async track(payload, opts = {}) {
		return await this.send({
			type: "presence",
			event: "track",
			payload
		}, opts.timeout || this.timeout);
	}
	/**
	* Removes the current presence state for this client.
	*/
	async untrack(opts = {}) {
		return await this.send({
			type: "presence",
			event: "untrack"
		}, opts);
	}
	on(type, filter, callback) {
		if (this.state === CHANNEL_STATES.joined && type === REALTIME_LISTEN_TYPES.PRESENCE) {
			this.socket.log("channel", `resubscribe to ${this.topic} due to change in presence callbacks on joined channel`);
			this.unsubscribe().then(async () => await this.subscribe());
		}
		return this._on(type, filter, callback);
	}
	/**
	* Sends a broadcast message explicitly via REST API.
	*
	* This method always uses the REST API endpoint regardless of WebSocket connection state.
	* Useful when you want to guarantee REST delivery or when gradually migrating from implicit REST fallback.
	*
	* @param event The name of the broadcast event
	* @param payload Payload to be sent (required)
	* @param opts Options including timeout
	* @returns Promise resolving to object with success status, and error details if failed
	*/
	async httpSend(event, payload, opts = {}) {
		var _a;
		if (payload === void 0 || payload === null) return Promise.reject("Payload is required for httpSend()");
		const headers = {
			apikey: this.socket.apiKey ? this.socket.apiKey : "",
			"Content-Type": "application/json"
		};
		if (this.socket.accessTokenValue) headers["Authorization"] = `Bearer ${this.socket.accessTokenValue}`;
		const options = {
			method: "POST",
			headers,
			body: JSON.stringify({ messages: [{
				topic: this.subTopic,
				event,
				payload,
				private: this.private
			}] })
		};
		const response = await this._fetchWithTimeout(this.broadcastEndpointURL, options, (_a = opts.timeout) !== null && _a !== void 0 ? _a : this.timeout);
		if (response.status === 202) return { success: true };
		let errorMessage = response.statusText;
		try {
			const errorBody = await response.json();
			errorMessage = errorBody.error || errorBody.message || errorMessage;
		} catch (_b) {}
		return Promise.reject(new Error(errorMessage));
	}
	/**
	* Sends a message into the channel.
	*
	* @param args Arguments to send to channel
	* @param args.type The type of event to send
	* @param args.event The name of the event being sent
	* @param args.payload Payload to be sent
	* @param opts Options to be used during the send process
	*/
	async send(args, opts = {}) {
		var _a, _b;
		if (!this._canPush() && args.type === "broadcast") {
			console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");
			const { event, payload: endpoint_payload } = args;
			const headers = {
				apikey: this.socket.apiKey ? this.socket.apiKey : "",
				"Content-Type": "application/json"
			};
			if (this.socket.accessTokenValue) headers["Authorization"] = `Bearer ${this.socket.accessTokenValue}`;
			const options = {
				method: "POST",
				headers,
				body: JSON.stringify({ messages: [{
					topic: this.subTopic,
					event,
					payload: endpoint_payload,
					private: this.private
				}] })
			};
			try {
				const response = await this._fetchWithTimeout(this.broadcastEndpointURL, options, (_a = opts.timeout) !== null && _a !== void 0 ? _a : this.timeout);
				await ((_b = response.body) === null || _b === void 0 ? void 0 : _b.cancel());
				return response.ok ? "ok" : "error";
			} catch (error) {
				if (error.name === "AbortError") return "timed out";
				else return "error";
			}
		} else return new Promise((resolve) => {
			var _a, _b, _c;
			const push = this._push(args.type, args, opts.timeout || this.timeout);
			if (args.type === "broadcast" && !((_c = (_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.broadcast) === null || _c === void 0 ? void 0 : _c.ack)) resolve("ok");
			push.receive("ok", () => resolve("ok"));
			push.receive("error", () => resolve("error"));
			push.receive("timeout", () => resolve("timed out"));
		});
	}
	/**
	* Updates the payload that will be sent the next time the channel joins (reconnects).
	* Useful for rotating access tokens or updating config without re-creating the channel.
	*/
	updateJoinPayload(payload) {
		this.joinPush.updatePayload(payload);
	}
	/**
	* Leaves the channel.
	*
	* Unsubscribes from server events, and instructs channel to terminate on server.
	* Triggers onClose() hooks.
	*
	* To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
	* channel.unsubscribe().receive("ok", () => alert("left!") )
	*/
	unsubscribe(timeout = this.timeout) {
		this.state = CHANNEL_STATES.leaving;
		const onClose = () => {
			this.socket.log("channel", `leave ${this.topic}`);
			this._trigger(CHANNEL_EVENTS.close, "leave", this._joinRef());
		};
		this.joinPush.destroy();
		let leavePush = null;
		return new Promise((resolve) => {
			leavePush = new Push(this, CHANNEL_EVENTS.leave, {}, timeout);
			leavePush.receive("ok", () => {
				onClose();
				resolve("ok");
			}).receive("timeout", () => {
				onClose();
				resolve("timed out");
			}).receive("error", () => {
				resolve("error");
			});
			leavePush.send();
			if (!this._canPush()) leavePush.trigger("ok", {});
		}).finally(() => {
			leavePush === null || leavePush === void 0 || leavePush.destroy();
		});
	}
	/**
	* Teardown the channel.
	*
	* Destroys and stops related timers.
	*/
	teardown() {
		this.pushBuffer.forEach((push) => push.destroy());
		this.pushBuffer = [];
		this.rejoinTimer.reset();
		this.joinPush.destroy();
		this.state = CHANNEL_STATES.closed;
		this.bindings = {};
	}
	/** @internal */
	async _fetchWithTimeout(url, options, timeout) {
		const controller = new AbortController();
		const id = setTimeout(() => controller.abort(), timeout);
		const response = await this.socket.fetch(url, Object.assign(Object.assign({}, options), { signal: controller.signal }));
		clearTimeout(id);
		return response;
	}
	/** @internal */
	_push(event, payload, timeout = this.timeout) {
		if (!this.joinedOnce) throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
		let pushEvent = new Push(this, event, payload, timeout);
		if (this._canPush()) pushEvent.send();
		else this._addToPushBuffer(pushEvent);
		return pushEvent;
	}
	/** @internal */
	_addToPushBuffer(pushEvent) {
		pushEvent.startTimeout();
		this.pushBuffer.push(pushEvent);
		if (this.pushBuffer.length > 100) {
			const removedPush = this.pushBuffer.shift();
			if (removedPush) {
				removedPush.destroy();
				this.socket.log("channel", `discarded push due to buffer overflow: ${removedPush.event}`, removedPush.payload);
			}
		}
	}
	/**
	* Overridable message hook
	*
	* Receives all events for specialized message handling before dispatching to the channel callbacks.
	* Must return the payload, modified or unmodified.
	*
	* @internal
	*/
	_onMessage(_event, payload, _ref) {
		return payload;
	}
	/** @internal */
	_isMember(topic) {
		return this.topic === topic;
	}
	/** @internal */
	_joinRef() {
		return this.joinPush.ref;
	}
	/** @internal */
	_trigger(type, payload, ref) {
		var _a, _b;
		const typeLower = type.toLocaleLowerCase();
		const { close, error, leave, join } = CHANNEL_EVENTS;
		if (ref && [
			close,
			error,
			leave,
			join
		].indexOf(typeLower) >= 0 && ref !== this._joinRef()) return;
		let handledPayload = this._onMessage(typeLower, payload, ref);
		if (payload && !handledPayload) throw "channel onMessage callbacks must return the payload, modified or unmodified";
		if ([
			"insert",
			"update",
			"delete"
		].includes(typeLower)) (_a = this.bindings.postgres_changes) === null || _a === void 0 || _a.filter((bind) => {
			var _a, _b, _c;
			return ((_a = bind.filter) === null || _a === void 0 ? void 0 : _a.event) === "*" || ((_c = (_b = bind.filter) === null || _b === void 0 ? void 0 : _b.event) === null || _c === void 0 ? void 0 : _c.toLocaleLowerCase()) === typeLower;
		}).map((bind) => bind.callback(handledPayload, ref));
		else (_b = this.bindings[typeLower]) === null || _b === void 0 || _b.filter((bind) => {
			var _a, _b, _c, _d, _e, _f;
			if ([
				"broadcast",
				"presence",
				"postgres_changes"
			].includes(typeLower)) if ("id" in bind) {
				const bindId = bind.id;
				const bindEvent = (_a = bind.filter) === null || _a === void 0 ? void 0 : _a.event;
				return bindId && ((_b = payload.ids) === null || _b === void 0 ? void 0 : _b.includes(bindId)) && (bindEvent === "*" || (bindEvent === null || bindEvent === void 0 ? void 0 : bindEvent.toLocaleLowerCase()) === ((_c = payload.data) === null || _c === void 0 ? void 0 : _c.type.toLocaleLowerCase()));
			} else {
				const bindEvent = (_e = (_d = bind === null || bind === void 0 ? void 0 : bind.filter) === null || _d === void 0 ? void 0 : _d.event) === null || _e === void 0 ? void 0 : _e.toLocaleLowerCase();
				return bindEvent === "*" || bindEvent === ((_f = payload === null || payload === void 0 ? void 0 : payload.event) === null || _f === void 0 ? void 0 : _f.toLocaleLowerCase());
			}
			else return bind.type.toLocaleLowerCase() === typeLower;
		}).map((bind) => {
			if (typeof handledPayload === "object" && "ids" in handledPayload) {
				const postgresChanges = handledPayload.data;
				const { schema, table, commit_timestamp, type, errors } = postgresChanges;
				const enrichedPayload = {
					schema,
					table,
					commit_timestamp,
					eventType: type,
					new: {},
					old: {},
					errors
				};
				handledPayload = Object.assign(Object.assign({}, enrichedPayload), this._getPayloadRecords(postgresChanges));
			}
			bind.callback(handledPayload, ref);
		});
	}
	/** @internal */
	_isClosed() {
		return this.state === CHANNEL_STATES.closed;
	}
	/** @internal */
	_isJoined() {
		return this.state === CHANNEL_STATES.joined;
	}
	/** @internal */
	_isJoining() {
		return this.state === CHANNEL_STATES.joining;
	}
	/** @internal */
	_isLeaving() {
		return this.state === CHANNEL_STATES.leaving;
	}
	/** @internal */
	_replyEventName(ref) {
		return `chan_reply_${ref}`;
	}
	/** @internal */
	_on(type, filter, callback) {
		const typeLower = type.toLocaleLowerCase();
		const binding = {
			type: typeLower,
			filter,
			callback
		};
		if (this.bindings[typeLower]) this.bindings[typeLower].push(binding);
		else this.bindings[typeLower] = [binding];
		return this;
	}
	/** @internal */
	_off(type, filter) {
		const typeLower = type.toLocaleLowerCase();
		if (this.bindings[typeLower]) this.bindings[typeLower] = this.bindings[typeLower].filter((bind) => {
			var _a;
			return !(((_a = bind.type) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === typeLower && RealtimeChannel.isEqual(bind.filter, filter));
		});
		return this;
	}
	/** @internal */
	static isEqual(obj1, obj2) {
		if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
		for (const k in obj1) if (obj1[k] !== obj2[k]) return false;
		return true;
	}
	/**
	* Compares two optional filter values for equality.
	* Treats undefined, null, and empty string as equivalent empty values.
	* @internal
	*/
	static isFilterValueEqual(serverValue, clientValue) {
		return (serverValue !== null && serverValue !== void 0 ? serverValue : void 0) === (clientValue !== null && clientValue !== void 0 ? clientValue : void 0);
	}
	/** @internal */
	_rejoinUntilConnected() {
		this.rejoinTimer.scheduleTimeout();
		if (this.socket.isConnected()) this._rejoin();
	}
	/**
	* Registers a callback that will be executed when the channel closes.
	*
	* @internal
	*/
	_onClose(callback) {
		this._on(CHANNEL_EVENTS.close, {}, callback);
	}
	/**
	* Registers a callback that will be executed when the channel encounteres an error.
	*
	* @internal
	*/
	_onError(callback) {
		this._on(CHANNEL_EVENTS.error, {}, (reason) => callback(reason));
	}
	/**
	* Returns `true` if the socket is connected and the channel has been joined.
	*
	* @internal
	*/
	_canPush() {
		return this.socket.isConnected() && this._isJoined();
	}
	/** @internal */
	_rejoin(timeout = this.timeout) {
		if (this._isLeaving()) return;
		this.socket._leaveOpenTopic(this.topic);
		this.state = CHANNEL_STATES.joining;
		this.joinPush.resend(timeout);
	}
	/** @internal */
	_getPayloadRecords(payload) {
		const records = {
			new: {},
			old: {}
		};
		if (payload.type === "INSERT" || payload.type === "UPDATE") records.new = convertChangeData(payload.columns, payload.record);
		if (payload.type === "UPDATE" || payload.type === "DELETE") records.old = convertChangeData(payload.columns, payload.old_record);
		return records;
	}
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+realtime-js@2.99.2/node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js
var noop = () => {};
var CONNECTION_TIMEOUTS = {
	HEARTBEAT_INTERVAL: 25e3,
	RECONNECT_DELAY: 10,
	HEARTBEAT_TIMEOUT_FALLBACK: 100
};
var RECONNECT_INTERVALS = [
	1e3,
	2e3,
	5e3,
	1e4
];
var DEFAULT_RECONNECT_FALLBACK = 1e4;
var WORKER_SCRIPT = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
var RealtimeClient = class {
	/**
	* Initializes the Socket.
	*
	* @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
	* @param httpEndpoint The string HTTP endpoint, ie, "https://example.com", "/" (inherited host & protocol)
	* @param options.transport The Websocket Transport, for example WebSocket. This can be a custom implementation
	* @param options.timeout The default timeout in milliseconds to trigger push timeouts.
	* @param options.params The optional params to pass when connecting.
	* @param options.headers Deprecated: headers cannot be set on websocket connections and this option will be removed in the future.
	* @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
	* @param options.heartbeatCallback The optional function to handle heartbeat status and latency.
	* @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
	* @param options.logLevel Sets the log level for Realtime
	* @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
	* @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
	* @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
	* @param options.worker Use Web Worker to set a side flow. Defaults to false.
	* @param options.workerUrl The URL of the worker script. Defaults to https://realtime.supabase.com/worker.js that includes a heartbeat event call to keep the connection alive.
	* @param options.vsn The protocol version to use when connecting. Supported versions are "1.0.0" and "2.0.0". Defaults to "2.0.0".
	* @example
	* ```ts
	* import RealtimeClient from '@supabase/realtime-js'
	*
	* const client = new RealtimeClient('https://xyzcompany.supabase.co/realtime/v1', {
	*   params: { apikey: 'public-anon-key' },
	* })
	* client.connect()
	* ```
	*/
	constructor(endPoint, options) {
		var _a;
		this.accessTokenValue = null;
		this.apiKey = null;
		this._manuallySetToken = false;
		this.channels = new Array();
		this.endPoint = "";
		this.httpEndpoint = "";
		/** @deprecated headers cannot be set on websocket connections */
		this.headers = {};
		this.params = {};
		this.timeout = DEFAULT_TIMEOUT;
		this.transport = null;
		this.heartbeatIntervalMs = CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL;
		this.heartbeatTimer = void 0;
		this.pendingHeartbeatRef = null;
		this.heartbeatCallback = noop;
		this.ref = 0;
		this.reconnectTimer = null;
		this.vsn = DEFAULT_VSN;
		this.logger = noop;
		this.conn = null;
		this.sendBuffer = [];
		this.serializer = new Serializer();
		this.stateChangeCallbacks = {
			open: [],
			close: [],
			error: [],
			message: []
		};
		this.accessToken = null;
		this._connectionState = "disconnected";
		this._wasManualDisconnect = false;
		this._authPromise = null;
		this._heartbeatSentAt = null;
		/**
		* Use either custom fetch, if provided, or default fetch to make HTTP requests
		*
		* @internal
		*/
		this._resolveFetch = (customFetch) => {
			if (customFetch) return (...args) => customFetch(...args);
			return (...args) => fetch(...args);
		};
		if (!((_a = options === null || options === void 0 ? void 0 : options.params) === null || _a === void 0 ? void 0 : _a.apikey)) throw new Error("API key is required to connect to Realtime");
		this.apiKey = options.params.apikey;
		this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
		this.httpEndpoint = httpEndpointURL(endPoint);
		this._initializeOptions(options);
		this._setupReconnectionTimer();
		this.fetch = this._resolveFetch(options === null || options === void 0 ? void 0 : options.fetch);
	}
	/**
	* Connects the socket, unless already connected.
	*/
	connect() {
		if (this.isConnecting() || this.isDisconnecting() || this.conn !== null && this.isConnected()) return;
		this._setConnectionState("connecting");
		if (this.accessToken && !this._authPromise) this._setAuthSafely("connect");
		if (this.transport) this.conn = new this.transport(this.endpointURL());
		else try {
			this.conn = WebSocketFactory.createWebSocket(this.endpointURL());
		} catch (error) {
			this._setConnectionState("disconnected");
			const errorMessage = error.message;
			if (errorMessage.includes("Node.js")) throw new Error(`${errorMessage}\n\nTo use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`);
			throw new Error(`WebSocket not available: ${errorMessage}`);
		}
		this._setupConnectionHandlers();
	}
	/**
	* Returns the URL of the websocket.
	* @returns string The URL of the websocket.
	*/
	endpointURL() {
		return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: this.vsn }));
	}
	/**
	* Disconnects the socket.
	*
	* @param code A numeric status code to send on disconnect.
	* @param reason A custom reason for the disconnect.
	*/
	disconnect(code, reason) {
		if (this.isDisconnecting()) return;
		this._setConnectionState("disconnecting", true);
		if (this.conn) {
			const fallbackTimer = setTimeout(() => {
				this._setConnectionState("disconnected");
			}, 100);
			this.conn.onclose = () => {
				clearTimeout(fallbackTimer);
				this._setConnectionState("disconnected");
			};
			if (typeof this.conn.close === "function") if (code) this.conn.close(code, reason !== null && reason !== void 0 ? reason : "");
			else this.conn.close();
			this._teardownConnection();
		} else this._setConnectionState("disconnected");
	}
	/**
	* Returns all created channels
	*/
	getChannels() {
		return this.channels;
	}
	/**
	* Unsubscribes and removes a single channel
	* @param channel A RealtimeChannel instance
	*/
	async removeChannel(channel) {
		const status = await channel.unsubscribe();
		if (this.channels.length === 0) this.disconnect();
		return status;
	}
	/**
	* Unsubscribes and removes all channels
	*/
	async removeAllChannels() {
		const values_1 = await Promise.all(this.channels.map((channel) => channel.unsubscribe()));
		this.channels = [];
		this.disconnect();
		return values_1;
	}
	/**
	* Logs the message.
	*
	* For customized logging, `this.logger` can be overridden.
	*/
	log(kind, msg, data) {
		this.logger(kind, msg, data);
	}
	/**
	* Returns the current state of the socket.
	*/
	connectionState() {
		switch (this.conn && this.conn.readyState) {
			case SOCKET_STATES.connecting: return CONNECTION_STATE.Connecting;
			case SOCKET_STATES.open: return CONNECTION_STATE.Open;
			case SOCKET_STATES.closing: return CONNECTION_STATE.Closing;
			default: return CONNECTION_STATE.Closed;
		}
	}
	/**
	* Returns `true` is the connection is open.
	*/
	isConnected() {
		return this.connectionState() === CONNECTION_STATE.Open;
	}
	/**
	* Returns `true` if the connection is currently connecting.
	*/
	isConnecting() {
		return this._connectionState === "connecting";
	}
	/**
	* Returns `true` if the connection is currently disconnecting.
	*/
	isDisconnecting() {
		return this._connectionState === "disconnecting";
	}
	/**
	* Creates (or reuses) a {@link RealtimeChannel} for the provided topic.
	*
	* Topics are automatically prefixed with `realtime:` to match the Realtime service.
	* If a channel with the same topic already exists it will be returned instead of creating
	* a duplicate connection.
	*/
	channel(topic, params = { config: {} }) {
		const realtimeTopic = `realtime:${topic}`;
		const exists = this.getChannels().find((c) => c.topic === realtimeTopic);
		if (!exists) {
			const chan = new RealtimeChannel(`realtime:${topic}`, params, this);
			this.channels.push(chan);
			return chan;
		} else return exists;
	}
	/**
	* Push out a message if the socket is connected.
	*
	* If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
	*/
	push(data) {
		const { topic, event, payload, ref } = data;
		const callback = () => {
			this.encode(data, (result) => {
				var _a;
				(_a = this.conn) === null || _a === void 0 || _a.send(result);
			});
		};
		this.log("push", `${topic} ${event} (${ref})`, payload);
		if (this.isConnected()) callback();
		else this.sendBuffer.push(callback);
	}
	/**
	* Sets the JWT access token used for channel subscription authorization and Realtime RLS.
	*
	* If param is null it will use the `accessToken` callback function or the token set on the client.
	*
	* On callback used, it will set the value of the token internal to the client.
	*
	* When a token is explicitly provided, it will be preserved across channel operations
	* (including removeChannel and resubscribe). The `accessToken` callback will not be
	* invoked until `setAuth()` is called without arguments.
	*
	* @param token A JWT string to override the token set on the client.
	*
	* @example
	* // Use a manual token (preserved across resubscribes, ignores accessToken callback)
	* client.realtime.setAuth('my-custom-jwt')
	*
	* // Switch back to using the accessToken callback
	* client.realtime.setAuth()
	*/
	async setAuth(token = null) {
		this._authPromise = this._performAuth(token);
		try {
			await this._authPromise;
		} finally {
			this._authPromise = null;
		}
	}
	/**
	* Returns true if the current access token was explicitly set via setAuth(token),
	* false if it was obtained via the accessToken callback.
	* @internal
	*/
	_isManualToken() {
		return this._manuallySetToken;
	}
	/**
	* Sends a heartbeat message if the socket is connected.
	*/
	async sendHeartbeat() {
		var _a;
		if (!this.isConnected()) {
			try {
				this.heartbeatCallback("disconnected");
			} catch (e) {
				this.log("error", "error in heartbeat callback", e);
			}
			return;
		}
		if (this.pendingHeartbeatRef) {
			this.pendingHeartbeatRef = null;
			this._heartbeatSentAt = null;
			this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
			try {
				this.heartbeatCallback("timeout");
			} catch (e) {
				this.log("error", "error in heartbeat callback", e);
			}
			this._wasManualDisconnect = false;
			(_a = this.conn) === null || _a === void 0 || _a.close(1e3, "heartbeat timeout");
			setTimeout(() => {
				var _a;
				if (!this.isConnected()) (_a = this.reconnectTimer) === null || _a === void 0 || _a.scheduleTimeout();
			}, CONNECTION_TIMEOUTS.HEARTBEAT_TIMEOUT_FALLBACK);
			return;
		}
		this._heartbeatSentAt = Date.now();
		this.pendingHeartbeatRef = this._makeRef();
		this.push({
			topic: "phoenix",
			event: "heartbeat",
			payload: {},
			ref: this.pendingHeartbeatRef
		});
		try {
			this.heartbeatCallback("sent");
		} catch (e) {
			this.log("error", "error in heartbeat callback", e);
		}
		this._setAuthSafely("heartbeat");
	}
	/**
	* Sets a callback that receives lifecycle events for internal heartbeat messages.
	* Useful for instrumenting connection health (e.g. sent/ok/timeout/disconnected).
	*/
	onHeartbeat(callback) {
		this.heartbeatCallback = callback;
	}
	/**
	* Flushes send buffer
	*/
	flushSendBuffer() {
		if (this.isConnected() && this.sendBuffer.length > 0) {
			this.sendBuffer.forEach((callback) => callback());
			this.sendBuffer = [];
		}
	}
	/**
	* Return the next message ref, accounting for overflows
	*
	* @internal
	*/
	_makeRef() {
		let newRef = this.ref + 1;
		if (newRef === this.ref) this.ref = 0;
		else this.ref = newRef;
		return this.ref.toString();
	}
	/**
	* Unsubscribe from channels with the specified topic.
	*
	* @internal
	*/
	_leaveOpenTopic(topic) {
		let dupChannel = this.channels.find((c) => c.topic === topic && (c._isJoined() || c._isJoining()));
		if (dupChannel) {
			this.log("transport", `leaving duplicate topic "${topic}"`);
			dupChannel.unsubscribe();
		}
	}
	/**
	* Removes a subscription from the socket.
	*
	* @param channel An open subscription.
	*
	* @internal
	*/
	_remove(channel) {
		this.channels = this.channels.filter((c) => c.topic !== channel.topic);
	}
	/** @internal */
	_onConnMessage(rawMessage) {
		this.decode(rawMessage.data, (msg) => {
			if (msg.topic === "phoenix" && msg.event === "phx_reply" && msg.ref && msg.ref === this.pendingHeartbeatRef) {
				const latency = this._heartbeatSentAt ? Date.now() - this._heartbeatSentAt : void 0;
				try {
					this.heartbeatCallback(msg.payload.status === "ok" ? "ok" : "error", latency);
				} catch (e) {
					this.log("error", "error in heartbeat callback", e);
				}
				this._heartbeatSentAt = null;
				this.pendingHeartbeatRef = null;
			}
			const { topic, event, payload, ref } = msg;
			const refString = ref ? `(${ref})` : "";
			const status = payload.status || "";
			this.log("receive", `${status} ${topic} ${event} ${refString}`.trim(), payload);
			this.channels.filter((channel) => channel._isMember(topic)).forEach((channel) => channel._trigger(event, payload, ref));
			this._triggerStateCallbacks("message", msg);
		});
	}
	/**
	* Clear specific timer
	* @internal
	*/
	_clearTimer(timer) {
		var _a;
		if (timer === "heartbeat" && this.heartbeatTimer) {
			clearInterval(this.heartbeatTimer);
			this.heartbeatTimer = void 0;
		} else if (timer === "reconnect") (_a = this.reconnectTimer) === null || _a === void 0 || _a.reset();
	}
	/**
	* Clear all timers
	* @internal
	*/
	_clearAllTimers() {
		this._clearTimer("heartbeat");
		this._clearTimer("reconnect");
	}
	/**
	* Setup connection handlers for WebSocket events
	* @internal
	*/
	_setupConnectionHandlers() {
		if (!this.conn) return;
		if ("binaryType" in this.conn) this.conn.binaryType = "arraybuffer";
		this.conn.onopen = () => this._onConnOpen();
		this.conn.onerror = (error) => this._onConnError(error);
		this.conn.onmessage = (event) => this._onConnMessage(event);
		this.conn.onclose = (event) => this._onConnClose(event);
		if (this.conn.readyState === SOCKET_STATES.open) this._onConnOpen();
	}
	/**
	* Teardown connection and cleanup resources
	* @internal
	*/
	_teardownConnection() {
		if (this.conn) {
			if (this.conn.readyState === SOCKET_STATES.open || this.conn.readyState === SOCKET_STATES.connecting) try {
				this.conn.close();
			} catch (e) {
				this.log("error", "Error closing connection", e);
			}
			this.conn.onopen = null;
			this.conn.onerror = null;
			this.conn.onmessage = null;
			this.conn.onclose = null;
			this.conn = null;
		}
		this._clearAllTimers();
		this._terminateWorker();
		this.channels.forEach((channel) => channel.teardown());
	}
	/** @internal */
	_onConnOpen() {
		this._setConnectionState("connected");
		this.log("transport", `connected to ${this.endpointURL()}`);
		(this._authPromise || (this.accessToken && !this.accessTokenValue ? this.setAuth() : Promise.resolve())).then(() => {
			if (this.accessTokenValue) {
				this.channels.forEach((channel) => {
					channel.updateJoinPayload({ access_token: this.accessTokenValue });
				});
				this.sendBuffer = [];
				this.channels.forEach((channel) => {
					if (channel._isJoining()) {
						channel.joinPush.sent = false;
						channel.joinPush.send();
					}
				});
			}
			this.flushSendBuffer();
		}).catch((e) => {
			this.log("error", "error waiting for auth on connect", e);
			this.flushSendBuffer();
		});
		this._clearTimer("reconnect");
		if (!this.worker) this._startHeartbeat();
		else if (!this.workerRef) this._startWorkerHeartbeat();
		this._triggerStateCallbacks("open");
	}
	/** @internal */
	_startHeartbeat() {
		this.heartbeatTimer && clearInterval(this.heartbeatTimer);
		this.heartbeatTimer = setInterval(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
	}
	/** @internal */
	_startWorkerHeartbeat() {
		if (this.workerUrl) this.log("worker", `starting worker for from ${this.workerUrl}`);
		else this.log("worker", `starting default worker`);
		const objectUrl = this._workerObjectUrl(this.workerUrl);
		this.workerRef = new Worker(objectUrl);
		this.workerRef.onerror = (error) => {
			this.log("worker", "worker error", error.message);
			this._terminateWorker();
		};
		this.workerRef.onmessage = (event) => {
			if (event.data.event === "keepAlive") this.sendHeartbeat();
		};
		this.workerRef.postMessage({
			event: "start",
			interval: this.heartbeatIntervalMs
		});
	}
	/**
	* Terminate the Web Worker and clear the reference
	* @internal
	*/
	_terminateWorker() {
		if (this.workerRef) {
			this.log("worker", "terminating worker");
			this.workerRef.terminate();
			this.workerRef = void 0;
		}
	}
	/** @internal */
	_onConnClose(event) {
		var _a;
		this._setConnectionState("disconnected");
		this.log("transport", "close", event);
		this._triggerChanError();
		this._clearTimer("heartbeat");
		if (!this._wasManualDisconnect) (_a = this.reconnectTimer) === null || _a === void 0 || _a.scheduleTimeout();
		this._triggerStateCallbacks("close", event);
	}
	/** @internal */
	_onConnError(error) {
		this._setConnectionState("disconnected");
		this.log("transport", `${error}`);
		this._triggerChanError();
		this._triggerStateCallbacks("error", error);
		try {
			this.heartbeatCallback("error");
		} catch (e) {
			this.log("error", "error in heartbeat callback", e);
		}
	}
	/** @internal */
	_triggerChanError() {
		this.channels.forEach((channel) => channel._trigger(CHANNEL_EVENTS.error));
	}
	/** @internal */
	_appendParams(url, params) {
		if (Object.keys(params).length === 0) return url;
		return `${url}${url.match(/\?/) ? "&" : "?"}${new URLSearchParams(params)}`;
	}
	_workerObjectUrl(url) {
		let result_url;
		if (url) result_url = url;
		else {
			const blob = new Blob([WORKER_SCRIPT], { type: "application/javascript" });
			result_url = URL.createObjectURL(blob);
		}
		return result_url;
	}
	/**
	* Set connection state with proper state management
	* @internal
	*/
	_setConnectionState(state, manual = false) {
		this._connectionState = state;
		if (state === "connecting") this._wasManualDisconnect = false;
		else if (state === "disconnecting") this._wasManualDisconnect = manual;
	}
	/**
	* Perform the actual auth operation
	* @internal
	*/
	async _performAuth(token = null) {
		let tokenToSend;
		let isManualToken = false;
		if (token) {
			tokenToSend = token;
			isManualToken = true;
		} else if (this.accessToken) try {
			tokenToSend = await this.accessToken();
		} catch (e) {
			this.log("error", "Error fetching access token from callback", e);
			tokenToSend = this.accessTokenValue;
		}
		else tokenToSend = this.accessTokenValue;
		if (isManualToken) this._manuallySetToken = true;
		else if (this.accessToken) this._manuallySetToken = false;
		if (this.accessTokenValue != tokenToSend) {
			this.accessTokenValue = tokenToSend;
			this.channels.forEach((channel) => {
				const payload = {
					access_token: tokenToSend,
					version: DEFAULT_VERSION
				};
				tokenToSend && channel.updateJoinPayload(payload);
				if (channel.joinedOnce && channel._isJoined()) channel._push(CHANNEL_EVENTS.access_token, { access_token: tokenToSend });
			});
		}
	}
	/**
	* Wait for any in-flight auth operations to complete
	* @internal
	*/
	async _waitForAuthIfNeeded() {
		if (this._authPromise) await this._authPromise;
	}
	/**
	* Safely call setAuth with standardized error handling
	* @internal
	*/
	_setAuthSafely(context = "general") {
		if (!this._isManualToken()) this.setAuth().catch((e) => {
			this.log("error", `Error setting auth in ${context}`, e);
		});
	}
	/**
	* Trigger state change callbacks with proper error handling
	* @internal
	*/
	_triggerStateCallbacks(event, data) {
		try {
			this.stateChangeCallbacks[event].forEach((callback) => {
				try {
					callback(data);
				} catch (e) {
					this.log("error", `error in ${event} callback`, e);
				}
			});
		} catch (e) {
			this.log("error", `error triggering ${event} callbacks`, e);
		}
	}
	/**
	* Setup reconnection timer with proper configuration
	* @internal
	*/
	_setupReconnectionTimer() {
		this.reconnectTimer = new Timer(async () => {
			setTimeout(async () => {
				await this._waitForAuthIfNeeded();
				if (!this.isConnected()) this.connect();
			}, CONNECTION_TIMEOUTS.RECONNECT_DELAY);
		}, this.reconnectAfterMs);
	}
	/**
	* Initialize client options with defaults
	* @internal
	*/
	_initializeOptions(options) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
		this.transport = (_a = options === null || options === void 0 ? void 0 : options.transport) !== null && _a !== void 0 ? _a : null;
		this.timeout = (_b = options === null || options === void 0 ? void 0 : options.timeout) !== null && _b !== void 0 ? _b : DEFAULT_TIMEOUT;
		this.heartbeatIntervalMs = (_c = options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs) !== null && _c !== void 0 ? _c : CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL;
		this.worker = (_d = options === null || options === void 0 ? void 0 : options.worker) !== null && _d !== void 0 ? _d : false;
		this.accessToken = (_e = options === null || options === void 0 ? void 0 : options.accessToken) !== null && _e !== void 0 ? _e : null;
		this.heartbeatCallback = (_f = options === null || options === void 0 ? void 0 : options.heartbeatCallback) !== null && _f !== void 0 ? _f : noop;
		this.vsn = (_g = options === null || options === void 0 ? void 0 : options.vsn) !== null && _g !== void 0 ? _g : DEFAULT_VSN;
		if (options === null || options === void 0 ? void 0 : options.params) this.params = options.params;
		if (options === null || options === void 0 ? void 0 : options.logger) this.logger = options.logger;
		if ((options === null || options === void 0 ? void 0 : options.logLevel) || (options === null || options === void 0 ? void 0 : options.log_level)) {
			this.logLevel = options.logLevel || options.log_level;
			this.params = Object.assign(Object.assign({}, this.params), { log_level: this.logLevel });
		}
		this.reconnectAfterMs = (_h = options === null || options === void 0 ? void 0 : options.reconnectAfterMs) !== null && _h !== void 0 ? _h : ((tries) => {
			return RECONNECT_INTERVALS[tries - 1] || DEFAULT_RECONNECT_FALLBACK;
		});
		switch (this.vsn) {
			case VSN_1_0_0:
				this.encode = (_j = options === null || options === void 0 ? void 0 : options.encode) !== null && _j !== void 0 ? _j : ((payload, callback) => {
					return callback(JSON.stringify(payload));
				});
				this.decode = (_k = options === null || options === void 0 ? void 0 : options.decode) !== null && _k !== void 0 ? _k : ((payload, callback) => {
					return callback(JSON.parse(payload));
				});
				break;
			case VSN_2_0_0:
				this.encode = (_l = options === null || options === void 0 ? void 0 : options.encode) !== null && _l !== void 0 ? _l : this.serializer.encode.bind(this.serializer);
				this.decode = (_m = options === null || options === void 0 ? void 0 : options.decode) !== null && _m !== void 0 ? _m : this.serializer.decode.bind(this.serializer);
				break;
			default: throw new Error(`Unsupported serializer version: ${this.vsn}`);
		}
		if (this.worker) {
			if (typeof window !== "undefined" && !window.Worker) throw new Error("Web Worker is not supported");
			this.workerUrl = options === null || options === void 0 ? void 0 : options.workerUrl;
		}
	}
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/iceberg-js@0.8.1/node_modules/iceberg-js/dist/index.mjs
var IcebergError = class extends Error {
	constructor(message, opts) {
		super(message);
		this.name = "IcebergError";
		this.status = opts.status;
		this.icebergType = opts.icebergType;
		this.icebergCode = opts.icebergCode;
		this.details = opts.details;
		this.isCommitStateUnknown = opts.icebergType === "CommitStateUnknownException" || [
			500,
			502,
			504
		].includes(opts.status) && opts.icebergType?.includes("CommitState") === true;
	}
	/**
	* Returns true if the error is a 404 Not Found error.
	*/
	isNotFound() {
		return this.status === 404;
	}
	/**
	* Returns true if the error is a 409 Conflict error.
	*/
	isConflict() {
		return this.status === 409;
	}
	/**
	* Returns true if the error is a 419 Authentication Timeout error.
	*/
	isAuthenticationTimeout() {
		return this.status === 419;
	}
};
function buildUrl(baseUrl, path, query) {
	const url = new URL(path, baseUrl);
	if (query) {
		for (const [key, value] of Object.entries(query)) if (value !== void 0) url.searchParams.set(key, value);
	}
	return url.toString();
}
async function buildAuthHeaders(auth) {
	if (!auth || auth.type === "none") return {};
	if (auth.type === "bearer") return { Authorization: `Bearer ${auth.token}` };
	if (auth.type === "header") return { [auth.name]: auth.value };
	if (auth.type === "custom") return await auth.getHeaders();
	return {};
}
function createFetchClient(options) {
	const fetchFn = options.fetchImpl ?? globalThis.fetch;
	return { async request({ method, path, query, body, headers }) {
		const url = buildUrl(options.baseUrl, path, query);
		const authHeaders = await buildAuthHeaders(options.auth);
		const res = await fetchFn(url, {
			method,
			headers: {
				...body ? { "Content-Type": "application/json" } : {},
				...authHeaders,
				...headers
			},
			body: body ? JSON.stringify(body) : void 0
		});
		const text = await res.text();
		const isJson = (res.headers.get("content-type") || "").includes("application/json");
		const data = isJson && text ? JSON.parse(text) : text;
		if (!res.ok) {
			const errBody = isJson ? data : void 0;
			const errorDetail = errBody?.error;
			throw new IcebergError(errorDetail?.message ?? `Request failed with status ${res.status}`, {
				status: res.status,
				icebergType: errorDetail?.type,
				icebergCode: errorDetail?.code,
				details: errBody
			});
		}
		return {
			status: res.status,
			headers: res.headers,
			data
		};
	} };
}
function namespaceToPath(namespace) {
	return namespace.join("");
}
var NamespaceOperations = class {
	constructor(client, prefix = "") {
		this.client = client;
		this.prefix = prefix;
	}
	async listNamespaces(parent) {
		const query = parent ? { parent: namespaceToPath(parent.namespace) } : void 0;
		return (await this.client.request({
			method: "GET",
			path: `${this.prefix}/namespaces`,
			query
		})).data.namespaces.map((ns) => ({ namespace: ns }));
	}
	async createNamespace(id, metadata) {
		const request = {
			namespace: id.namespace,
			properties: metadata?.properties
		};
		return (await this.client.request({
			method: "POST",
			path: `${this.prefix}/namespaces`,
			body: request
		})).data;
	}
	async dropNamespace(id) {
		await this.client.request({
			method: "DELETE",
			path: `${this.prefix}/namespaces/${namespaceToPath(id.namespace)}`
		});
	}
	async loadNamespaceMetadata(id) {
		return { properties: (await this.client.request({
			method: "GET",
			path: `${this.prefix}/namespaces/${namespaceToPath(id.namespace)}`
		})).data.properties };
	}
	async namespaceExists(id) {
		try {
			await this.client.request({
				method: "HEAD",
				path: `${this.prefix}/namespaces/${namespaceToPath(id.namespace)}`
			});
			return true;
		} catch (error) {
			if (error instanceof IcebergError && error.status === 404) return false;
			throw error;
		}
	}
	async createNamespaceIfNotExists(id, metadata) {
		try {
			return await this.createNamespace(id, metadata);
		} catch (error) {
			if (error instanceof IcebergError && error.status === 409) return;
			throw error;
		}
	}
};
function namespaceToPath2(namespace) {
	return namespace.join("");
}
var TableOperations = class {
	constructor(client, prefix = "", accessDelegation) {
		this.client = client;
		this.prefix = prefix;
		this.accessDelegation = accessDelegation;
	}
	async listTables(namespace) {
		return (await this.client.request({
			method: "GET",
			path: `${this.prefix}/namespaces/${namespaceToPath2(namespace.namespace)}/tables`
		})).data.identifiers;
	}
	async createTable(namespace, request) {
		const headers = {};
		if (this.accessDelegation) headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
		return (await this.client.request({
			method: "POST",
			path: `${this.prefix}/namespaces/${namespaceToPath2(namespace.namespace)}/tables`,
			body: request,
			headers
		})).data.metadata;
	}
	async updateTable(id, request) {
		const response = await this.client.request({
			method: "POST",
			path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
			body: request
		});
		return {
			"metadata-location": response.data["metadata-location"],
			metadata: response.data.metadata
		};
	}
	async dropTable(id, options) {
		await this.client.request({
			method: "DELETE",
			path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
			query: { purgeRequested: String(options?.purge ?? false) }
		});
	}
	async loadTable(id) {
		const headers = {};
		if (this.accessDelegation) headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
		return (await this.client.request({
			method: "GET",
			path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
			headers
		})).data.metadata;
	}
	async tableExists(id) {
		const headers = {};
		if (this.accessDelegation) headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
		try {
			await this.client.request({
				method: "HEAD",
				path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
				headers
			});
			return true;
		} catch (error) {
			if (error instanceof IcebergError && error.status === 404) return false;
			throw error;
		}
	}
	async createTableIfNotExists(namespace, request) {
		try {
			return await this.createTable(namespace, request);
		} catch (error) {
			if (error instanceof IcebergError && error.status === 409) return await this.loadTable({
				namespace: namespace.namespace,
				name: request.name
			});
			throw error;
		}
	}
};
var IcebergRestCatalog = class {
	/**
	* Creates a new Iceberg REST Catalog client.
	*
	* @param options - Configuration options for the catalog client
	*/
	constructor(options) {
		let prefix = "v1";
		if (options.catalogName) prefix += `/${options.catalogName}`;
		this.client = createFetchClient({
			baseUrl: options.baseUrl.endsWith("/") ? options.baseUrl : `${options.baseUrl}/`,
			auth: options.auth,
			fetchImpl: options.fetch
		});
		this.accessDelegation = options.accessDelegation?.join(",");
		this.namespaceOps = new NamespaceOperations(this.client, prefix);
		this.tableOps = new TableOperations(this.client, prefix, this.accessDelegation);
	}
	/**
	* Lists all namespaces in the catalog.
	*
	* @param parent - Optional parent namespace to list children under
	* @returns Array of namespace identifiers
	*
	* @example
	* ```typescript
	* // List all top-level namespaces
	* const namespaces = await catalog.listNamespaces();
	*
	* // List namespaces under a parent
	* const children = await catalog.listNamespaces({ namespace: ['analytics'] });
	* ```
	*/
	async listNamespaces(parent) {
		return this.namespaceOps.listNamespaces(parent);
	}
	/**
	* Creates a new namespace in the catalog.
	*
	* @param id - Namespace identifier to create
	* @param metadata - Optional metadata properties for the namespace
	* @returns Response containing the created namespace and its properties
	*
	* @example
	* ```typescript
	* const response = await catalog.createNamespace(
	*   { namespace: ['analytics'] },
	*   { properties: { owner: 'data-team' } }
	* );
	* console.log(response.namespace); // ['analytics']
	* console.log(response.properties); // { owner: 'data-team', ... }
	* ```
	*/
	async createNamespace(id, metadata) {
		return this.namespaceOps.createNamespace(id, metadata);
	}
	/**
	* Drops a namespace from the catalog.
	*
	* The namespace must be empty (contain no tables) before it can be dropped.
	*
	* @param id - Namespace identifier to drop
	*
	* @example
	* ```typescript
	* await catalog.dropNamespace({ namespace: ['analytics'] });
	* ```
	*/
	async dropNamespace(id) {
		await this.namespaceOps.dropNamespace(id);
	}
	/**
	* Loads metadata for a namespace.
	*
	* @param id - Namespace identifier to load
	* @returns Namespace metadata including properties
	*
	* @example
	* ```typescript
	* const metadata = await catalog.loadNamespaceMetadata({ namespace: ['analytics'] });
	* console.log(metadata.properties);
	* ```
	*/
	async loadNamespaceMetadata(id) {
		return this.namespaceOps.loadNamespaceMetadata(id);
	}
	/**
	* Lists all tables in a namespace.
	*
	* @param namespace - Namespace identifier to list tables from
	* @returns Array of table identifiers
	*
	* @example
	* ```typescript
	* const tables = await catalog.listTables({ namespace: ['analytics'] });
	* console.log(tables); // [{ namespace: ['analytics'], name: 'events' }, ...]
	* ```
	*/
	async listTables(namespace) {
		return this.tableOps.listTables(namespace);
	}
	/**
	* Creates a new table in the catalog.
	*
	* @param namespace - Namespace to create the table in
	* @param request - Table creation request including name, schema, partition spec, etc.
	* @returns Table metadata for the created table
	*
	* @example
	* ```typescript
	* const metadata = await catalog.createTable(
	*   { namespace: ['analytics'] },
	*   {
	*     name: 'events',
	*     schema: {
	*       type: 'struct',
	*       fields: [
	*         { id: 1, name: 'id', type: 'long', required: true },
	*         { id: 2, name: 'timestamp', type: 'timestamp', required: true }
	*       ],
	*       'schema-id': 0
	*     },
	*     'partition-spec': {
	*       'spec-id': 0,
	*       fields: [
	*         { source_id: 2, field_id: 1000, name: 'ts_day', transform: 'day' }
	*       ]
	*     }
	*   }
	* );
	* ```
	*/
	async createTable(namespace, request) {
		return this.tableOps.createTable(namespace, request);
	}
	/**
	* Updates an existing table's metadata.
	*
	* Can update the schema, partition spec, or properties of a table.
	*
	* @param id - Table identifier to update
	* @param request - Update request with fields to modify
	* @returns Response containing the metadata location and updated table metadata
	*
	* @example
	* ```typescript
	* const response = await catalog.updateTable(
	*   { namespace: ['analytics'], name: 'events' },
	*   {
	*     properties: { 'read.split.target-size': '134217728' }
	*   }
	* );
	* console.log(response['metadata-location']); // s3://...
	* console.log(response.metadata); // TableMetadata object
	* ```
	*/
	async updateTable(id, request) {
		return this.tableOps.updateTable(id, request);
	}
	/**
	* Drops a table from the catalog.
	*
	* @param id - Table identifier to drop
	*
	* @example
	* ```typescript
	* await catalog.dropTable({ namespace: ['analytics'], name: 'events' });
	* ```
	*/
	async dropTable(id, options) {
		await this.tableOps.dropTable(id, options);
	}
	/**
	* Loads metadata for a table.
	*
	* @param id - Table identifier to load
	* @returns Table metadata including schema, partition spec, location, etc.
	*
	* @example
	* ```typescript
	* const metadata = await catalog.loadTable({ namespace: ['analytics'], name: 'events' });
	* console.log(metadata.schema);
	* console.log(metadata.location);
	* ```
	*/
	async loadTable(id) {
		return this.tableOps.loadTable(id);
	}
	/**
	* Checks if a namespace exists in the catalog.
	*
	* @param id - Namespace identifier to check
	* @returns True if the namespace exists, false otherwise
	*
	* @example
	* ```typescript
	* const exists = await catalog.namespaceExists({ namespace: ['analytics'] });
	* console.log(exists); // true or false
	* ```
	*/
	async namespaceExists(id) {
		return this.namespaceOps.namespaceExists(id);
	}
	/**
	* Checks if a table exists in the catalog.
	*
	* @param id - Table identifier to check
	* @returns True if the table exists, false otherwise
	*
	* @example
	* ```typescript
	* const exists = await catalog.tableExists({ namespace: ['analytics'], name: 'events' });
	* console.log(exists); // true or false
	* ```
	*/
	async tableExists(id) {
		return this.tableOps.tableExists(id);
	}
	/**
	* Creates a namespace if it does not exist.
	*
	* If the namespace already exists, returns void. If created, returns the response.
	*
	* @param id - Namespace identifier to create
	* @param metadata - Optional metadata properties for the namespace
	* @returns Response containing the created namespace and its properties, or void if it already exists
	*
	* @example
	* ```typescript
	* const response = await catalog.createNamespaceIfNotExists(
	*   { namespace: ['analytics'] },
	*   { properties: { owner: 'data-team' } }
	* );
	* if (response) {
	*   console.log('Created:', response.namespace);
	* } else {
	*   console.log('Already exists');
	* }
	* ```
	*/
	async createNamespaceIfNotExists(id, metadata) {
		return this.namespaceOps.createNamespaceIfNotExists(id, metadata);
	}
	/**
	* Creates a table if it does not exist.
	*
	* If the table already exists, returns its metadata instead.
	*
	* @param namespace - Namespace to create the table in
	* @param request - Table creation request including name, schema, partition spec, etc.
	* @returns Table metadata for the created or existing table
	*
	* @example
	* ```typescript
	* const metadata = await catalog.createTableIfNotExists(
	*   { namespace: ['analytics'] },
	*   {
	*     name: 'events',
	*     schema: {
	*       type: 'struct',
	*       fields: [
	*         { id: 1, name: 'id', type: 'long', required: true },
	*         { id: 2, name: 'timestamp', type: 'timestamp', required: true }
	*       ],
	*       'schema-id': 0
	*     }
	*   }
	* );
	* ```
	*/
	async createTableIfNotExists(namespace, request) {
		return this.tableOps.createTableIfNotExists(namespace, request);
	}
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+storage-js@2.99.2/node_modules/@supabase/storage-js/dist/index.mjs
/**
* Base error class for all Storage errors
* Supports both 'storage' and 'vectors' namespaces
*/
var StorageError = class extends Error {
	constructor(message, namespace = "storage", status, statusCode) {
		super(message);
		this.__isStorageError = true;
		this.namespace = namespace;
		this.name = namespace === "vectors" ? "StorageVectorsError" : "StorageError";
		this.status = status;
		this.statusCode = statusCode;
	}
};
/**
* Type guard to check if an error is a StorageError
* @param error - The error to check
* @returns True if the error is a StorageError
*/
function isStorageError(error) {
	return typeof error === "object" && error !== null && "__isStorageError" in error;
}
/**
* API error returned from Storage service
* Includes HTTP status code and service-specific error code
*/
var StorageApiError = class extends StorageError {
	constructor(message, status, statusCode, namespace = "storage") {
		super(message, namespace, status, statusCode);
		this.name = namespace === "vectors" ? "StorageVectorsApiError" : "StorageApiError";
		this.status = status;
		this.statusCode = statusCode;
	}
	toJSON() {
		return {
			name: this.name,
			message: this.message,
			status: this.status,
			statusCode: this.statusCode
		};
	}
};
/**
* Unknown error that doesn't match expected error patterns
* Wraps the original error for debugging
*/
var StorageUnknownError = class extends StorageError {
	constructor(message, originalError, namespace = "storage") {
		super(message, namespace);
		this.name = namespace === "vectors" ? "StorageVectorsUnknownError" : "StorageUnknownError";
		this.originalError = originalError;
	}
};
/**
* Resolves the fetch implementation to use
* Uses custom fetch if provided, otherwise uses native fetch
*
* @param customFetch - Optional custom fetch implementation
* @returns Resolved fetch function
*/
var resolveFetch$2 = (customFetch) => {
	if (customFetch) return (...args) => customFetch(...args);
	return (...args) => fetch(...args);
};
/**
* Determine if input is a plain object
* An object is plain if it's created by either {}, new Object(), or Object.create(null)
*
* @param value - Value to check
* @returns True if value is a plain object
* @source https://github.com/sindresorhus/is-plain-obj
*/
var isPlainObject = (value) => {
	if (typeof value !== "object" || value === null) return false;
	const prototype = Object.getPrototypeOf(value);
	return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
};
/**
* Recursively converts object keys from snake_case to camelCase
* Used for normalizing API responses
*
* @param item - Object to convert
* @returns Converted object with camelCase keys
*/
var recursiveToCamel = (item) => {
	if (Array.isArray(item)) return item.map((el) => recursiveToCamel(el));
	else if (typeof item === "function" || item !== Object(item)) return item;
	const result = {};
	Object.entries(item).forEach(([key, value]) => {
		const newKey = key.replace(/([-_][a-z])/gi, (c) => c.toUpperCase().replace(/[-_]/g, ""));
		result[newKey] = recursiveToCamel(value);
	});
	return result;
};
/**
* Validates if a given bucket name is valid according to Supabase Storage API rules
* Mirrors backend validation from: storage/src/storage/limits.ts:isValidBucketName()
*
* Rules:
* - Length: 1-100 characters
* - Allowed characters: alphanumeric (a-z, A-Z, 0-9), underscore (_), and safe special characters
* - Safe special characters: ! - . * ' ( ) space & $ @ = ; : + , ?
* - Forbidden: path separators (/, \), path traversal (..), leading/trailing whitespace
*
* AWS S3 Reference: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html
*
* @param bucketName - The bucket name to validate
* @returns true if valid, false otherwise
*/
var isValidBucketName = (bucketName) => {
	if (!bucketName || typeof bucketName !== "string") return false;
	if (bucketName.length === 0 || bucketName.length > 100) return false;
	if (bucketName.trim() !== bucketName) return false;
	if (bucketName.includes("/") || bucketName.includes("\\")) return false;
	return /^[\w!.\*'() &$@=;:+,?-]+$/.test(bucketName);
};
function _typeof$1(o) {
	"@babel/helpers - typeof";
	return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$1(o);
}
function toPrimitive$1(t, r) {
	if ("object" != _typeof$1(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$1(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function toPropertyKey$1(t) {
	var i = toPrimitive$1(t, "string");
	return "symbol" == _typeof$1(i) ? i : i + "";
}
function _defineProperty$1(e, r, t) {
	return (r = toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function ownKeys$1(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2$1(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$1(Object(t), !0).forEach(function(r$1) {
			_defineProperty$1(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
/**
* Extracts error message from various error response formats
* @param err - Error object from API
* @returns Human-readable error message
*/
var _getErrorMessage$1 = (err) => {
	var _err$error;
	return err.msg || err.message || err.error_description || (typeof err.error === "string" ? err.error : (_err$error = err.error) === null || _err$error === void 0 ? void 0 : _err$error.message) || JSON.stringify(err);
};
/**
* Handles fetch errors and converts them to Storage error types
* @param error - The error caught from fetch
* @param reject - Promise rejection function
* @param options - Fetch options that may affect error handling
* @param namespace - Error namespace ('storage' or 'vectors')
*/
var handleError$1 = async (error, reject, options, namespace) => {
	if (error && typeof error === "object" && "status" in error && "ok" in error && typeof error.status === "number") {
		const responseError = error;
		const status = responseError.status || 500;
		if (typeof responseError.json === "function") responseError.json().then((err) => {
			const statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || (err === null || err === void 0 ? void 0 : err.code) || status + "";
			reject(new StorageApiError(_getErrorMessage$1(err), status, statusCode, namespace));
		}).catch(() => {
			if (namespace === "vectors") {
				const statusCode = status + "";
				reject(new StorageApiError(responseError.statusText || `HTTP ${status} error`, status, statusCode, namespace));
			} else {
				const statusCode = status + "";
				reject(new StorageApiError(responseError.statusText || `HTTP ${status} error`, status, statusCode, namespace));
			}
		});
		else {
			const statusCode = status + "";
			reject(new StorageApiError(responseError.statusText || `HTTP ${status} error`, status, statusCode, namespace));
		}
	} else reject(new StorageUnknownError(_getErrorMessage$1(error), error, namespace));
};
/**
* Builds request parameters for fetch calls
* @param method - HTTP method
* @param options - Custom fetch options
* @param parameters - Additional fetch parameters like AbortSignal
* @param body - Request body (will be JSON stringified if plain object)
* @returns Complete fetch request parameters
*/
var _getRequestParams$1 = (method, options, parameters, body) => {
	const params = {
		method,
		headers: (options === null || options === void 0 ? void 0 : options.headers) || {}
	};
	if (method === "GET" || method === "HEAD" || !body) return _objectSpread2$1(_objectSpread2$1({}, params), parameters);
	if (isPlainObject(body)) {
		params.headers = _objectSpread2$1({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers);
		params.body = JSON.stringify(body);
	} else params.body = body;
	if (options === null || options === void 0 ? void 0 : options.duplex) params.duplex = options.duplex;
	return _objectSpread2$1(_objectSpread2$1({}, params), parameters);
};
/**
* Internal request handler that wraps fetch with error handling
* @param fetcher - Fetch function to use
* @param method - HTTP method
* @param url - Request URL
* @param options - Custom fetch options
* @param parameters - Additional fetch parameters
* @param body - Request body
* @param namespace - Error namespace ('storage' or 'vectors')
* @returns Promise with parsed response or error
*/
async function _handleRequest$1(fetcher, method, url, options, parameters, body, namespace) {
	return new Promise((resolve, reject) => {
		fetcher(url, _getRequestParams$1(method, options, parameters, body)).then((result) => {
			if (!result.ok) throw result;
			if (options === null || options === void 0 ? void 0 : options.noResolveJson) return result;
			if (namespace === "vectors") {
				const contentType = result.headers.get("content-type");
				if (result.headers.get("content-length") === "0" || result.status === 204) return {};
				if (!contentType || !contentType.includes("application/json")) return {};
			}
			return result.json();
		}).then((data) => resolve(data)).catch((error) => handleError$1(error, reject, options, namespace));
	});
}
/**
* Creates a fetch API with the specified namespace
* @param namespace - Error namespace ('storage' or 'vectors')
* @returns Object with HTTP method functions
*/
function createFetchApi(namespace = "storage") {
	return {
		get: async (fetcher, url, options, parameters) => {
			return _handleRequest$1(fetcher, "GET", url, options, parameters, void 0, namespace);
		},
		post: async (fetcher, url, body, options, parameters) => {
			return _handleRequest$1(fetcher, "POST", url, options, parameters, body, namespace);
		},
		put: async (fetcher, url, body, options, parameters) => {
			return _handleRequest$1(fetcher, "PUT", url, options, parameters, body, namespace);
		},
		head: async (fetcher, url, options, parameters) => {
			return _handleRequest$1(fetcher, "HEAD", url, _objectSpread2$1(_objectSpread2$1({}, options), {}, { noResolveJson: true }), parameters, void 0, namespace);
		},
		remove: async (fetcher, url, body, options, parameters) => {
			return _handleRequest$1(fetcher, "DELETE", url, options, parameters, body, namespace);
		}
	};
}
var { get, post, put, head, remove } = createFetchApi("storage");
var vectorsApi = createFetchApi("vectors");
/**
* @ignore
* Base API client class for all Storage API classes
* Provides common infrastructure for error handling and configuration
*
* @typeParam TError - The error type (StorageError or subclass)
*/
var BaseApiClient = class {
	/**
	* Creates a new BaseApiClient instance
	* @param url - Base URL for API requests
	* @param headers - Default headers for API requests
	* @param fetch - Optional custom fetch implementation
	* @param namespace - Error namespace ('storage' or 'vectors')
	*/
	constructor(url, headers = {}, fetch$1, namespace = "storage") {
		this.shouldThrowOnError = false;
		this.url = url;
		this.headers = headers;
		this.fetch = resolveFetch$2(fetch$1);
		this.namespace = namespace;
	}
	/**
	* Enable throwing errors instead of returning them.
	* When enabled, errors are thrown instead of returned in { data, error } format.
	*
	* @returns this - For method chaining
	*/
	throwOnError() {
		this.shouldThrowOnError = true;
		return this;
	}
	/**
	* Set an HTTP header for the request.
	* Creates a shallow copy of headers to avoid mutating shared state.
	*
	* @param name - Header name
	* @param value - Header value
	* @returns this - For method chaining
	*/
	setHeader(name, value) {
		this.headers = _objectSpread2$1(_objectSpread2$1({}, this.headers), {}, { [name]: value });
		return this;
	}
	/**
	* Handles API operation with standardized error handling
	* Eliminates repetitive try-catch blocks across all API methods
	*
	* This wrapper:
	* 1. Executes the operation
	* 2. Returns { data, error: null } on success
	* 3. Returns { data: null, error } on failure (if shouldThrowOnError is false)
	* 4. Throws error on failure (if shouldThrowOnError is true)
	*
	* @typeParam T - The expected data type from the operation
	* @param operation - Async function that performs the API call
	* @returns Promise with { data, error } tuple
	*
	* @example
	* ```typescript
	* async listBuckets() {
	*   return this.handleOperation(async () => {
	*     return await get(this.fetch, `${this.url}/bucket`, {
	*       headers: this.headers,
	*     })
	*   })
	* }
	* ```
	*/
	async handleOperation(operation) {
		var _this = this;
		try {
			return {
				data: await operation(),
				error: null
			};
		} catch (error) {
			if (_this.shouldThrowOnError) throw error;
			if (isStorageError(error)) return {
				data: null,
				error
			};
			throw error;
		}
	}
};
var StreamDownloadBuilder = class {
	constructor(downloadFn, shouldThrowOnError) {
		this.downloadFn = downloadFn;
		this.shouldThrowOnError = shouldThrowOnError;
	}
	then(onfulfilled, onrejected) {
		return this.execute().then(onfulfilled, onrejected);
	}
	async execute() {
		var _this = this;
		try {
			return {
				data: (await _this.downloadFn()).body,
				error: null
			};
		} catch (error) {
			if (_this.shouldThrowOnError) throw error;
			if (isStorageError(error)) return {
				data: null,
				error
			};
			throw error;
		}
	}
};
var _Symbol$toStringTag = Symbol.toStringTag;
var BlobDownloadBuilder = class {
	constructor(downloadFn, shouldThrowOnError) {
		this.downloadFn = downloadFn;
		this.shouldThrowOnError = shouldThrowOnError;
		this[_Symbol$toStringTag] = "BlobDownloadBuilder";
		this.promise = null;
	}
	asStream() {
		return new StreamDownloadBuilder(this.downloadFn, this.shouldThrowOnError);
	}
	then(onfulfilled, onrejected) {
		return this.getPromise().then(onfulfilled, onrejected);
	}
	catch(onrejected) {
		return this.getPromise().catch(onrejected);
	}
	finally(onfinally) {
		return this.getPromise().finally(onfinally);
	}
	getPromise() {
		if (!this.promise) this.promise = this.execute();
		return this.promise;
	}
	async execute() {
		var _this = this;
		try {
			return {
				data: await (await _this.downloadFn()).blob(),
				error: null
			};
		} catch (error) {
			if (_this.shouldThrowOnError) throw error;
			if (isStorageError(error)) return {
				data: null,
				error
			};
			throw error;
		}
	}
};
var DEFAULT_SEARCH_OPTIONS = {
	limit: 100,
	offset: 0,
	sortBy: {
		column: "name",
		order: "asc"
	}
};
var DEFAULT_FILE_OPTIONS = {
	cacheControl: "3600",
	contentType: "text/plain;charset=UTF-8",
	upsert: false
};
var StorageFileApi = class extends BaseApiClient {
	constructor(url, headers = {}, bucketId, fetch$1) {
		super(url, headers, fetch$1, "storage");
		this.bucketId = bucketId;
	}
	/**
	* Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
	*
	* @param method HTTP method.
	* @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
	* @param fileBody The body of the file to be stored in the bucket.
	*/
	async uploadOrUpdate(method, path, fileBody, fileOptions) {
		var _this = this;
		return _this.handleOperation(async () => {
			let body;
			const options = _objectSpread2$1(_objectSpread2$1({}, DEFAULT_FILE_OPTIONS), fileOptions);
			let headers = _objectSpread2$1(_objectSpread2$1({}, _this.headers), method === "POST" && { "x-upsert": String(options.upsert) });
			const metadata = options.metadata;
			if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
				body = new FormData();
				body.append("cacheControl", options.cacheControl);
				if (metadata) body.append("metadata", _this.encodeMetadata(metadata));
				body.append("", fileBody);
			} else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
				body = fileBody;
				if (!body.has("cacheControl")) body.append("cacheControl", options.cacheControl);
				if (metadata && !body.has("metadata")) body.append("metadata", _this.encodeMetadata(metadata));
			} else {
				body = fileBody;
				headers["cache-control"] = `max-age=${options.cacheControl}`;
				headers["content-type"] = options.contentType;
				if (metadata) headers["x-metadata"] = _this.toBase64(_this.encodeMetadata(metadata));
				if ((typeof ReadableStream !== "undefined" && body instanceof ReadableStream || body && typeof body === "object" && "pipe" in body && typeof body.pipe === "function") && !options.duplex) options.duplex = "half";
			}
			if (fileOptions === null || fileOptions === void 0 ? void 0 : fileOptions.headers) headers = _objectSpread2$1(_objectSpread2$1({}, headers), fileOptions.headers);
			const cleanPath = _this._removeEmptyFolders(path);
			const _path = _this._getFinalPath(cleanPath);
			const data = await (method == "PUT" ? put : post)(_this.fetch, `${_this.url}/object/${_path}`, body, _objectSpread2$1({ headers }, (options === null || options === void 0 ? void 0 : options.duplex) ? { duplex: options.duplex } : {}));
			return {
				path: cleanPath,
				id: data.Id,
				fullPath: data.Key
			};
		});
	}
	/**
	* Uploads a file to an existing bucket.
	*
	* @category File Buckets
	* @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
	* @param fileBody The body of the file to be stored in the bucket.
	* @param fileOptions Optional file upload options including cacheControl, contentType, upsert, and metadata.
	* @returns Promise with response containing file path, id, and fullPath or error
	*
	* @example Upload file
	* ```js
	* const avatarFile = event.target.files[0]
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .upload('public/avatar1.png', avatarFile, {
	*     cacheControl: '3600',
	*     upsert: false
	*   })
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "path": "public/avatar1.png",
	*     "fullPath": "avatars/public/avatar1.png"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @example Upload file using `ArrayBuffer` from base64 file data
	* ```js
	* import { decode } from 'base64-arraybuffer'
	*
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .upload('public/avatar1.png', decode('base64FileData'), {
	*     contentType: 'image/png'
	*   })
	* ```
	*/
	async upload(path, fileBody, fileOptions) {
		return this.uploadOrUpdate("POST", path, fileBody, fileOptions);
	}
	/**
	* Upload a file with a token generated from `createSignedUploadUrl`.
	*
	* @category File Buckets
	* @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
	* @param token The token generated from `createSignedUploadUrl`
	* @param fileBody The body of the file to be stored in the bucket.
	* @param fileOptions HTTP headers (cacheControl, contentType, etc.).
	* **Note:** The `upsert` option has no effect here. To enable upsert behavior,
	* pass `{ upsert: true }` when calling `createSignedUploadUrl()` instead.
	* @returns Promise with response containing file path and fullPath or error
	*
	* @example Upload to a signed URL
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .uploadToSignedUrl('folder/cat.jpg', 'token-from-createSignedUploadUrl', file)
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "path": "folder/cat.jpg",
	*     "fullPath": "avatars/folder/cat.jpg"
	*   },
	*   "error": null
	* }
	* ```
	*/
	async uploadToSignedUrl(path, token, fileBody, fileOptions) {
		var _this3 = this;
		const cleanPath = _this3._removeEmptyFolders(path);
		const _path = _this3._getFinalPath(cleanPath);
		const url = new URL(_this3.url + `/object/upload/sign/${_path}`);
		url.searchParams.set("token", token);
		return _this3.handleOperation(async () => {
			let body;
			const options = _objectSpread2$1({ upsert: DEFAULT_FILE_OPTIONS.upsert }, fileOptions);
			const headers = _objectSpread2$1(_objectSpread2$1({}, _this3.headers), { "x-upsert": String(options.upsert) });
			if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
				body = new FormData();
				body.append("cacheControl", options.cacheControl);
				body.append("", fileBody);
			} else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
				body = fileBody;
				body.append("cacheControl", options.cacheControl);
			} else {
				body = fileBody;
				headers["cache-control"] = `max-age=${options.cacheControl}`;
				headers["content-type"] = options.contentType;
			}
			return {
				path: cleanPath,
				fullPath: (await put(_this3.fetch, url.toString(), body, { headers })).Key
			};
		});
	}
	/**
	* Creates a signed upload URL.
	* Signed upload URLs can be used to upload files to the bucket without further authentication.
	* They are valid for 2 hours.
	*
	* @category File Buckets
	* @param path The file path, including the current file name. For example `folder/image.png`.
	* @param options.upsert If set to true, allows the file to be overwritten if it already exists.
	* @returns Promise with response containing signed upload URL, token, and path or error
	*
	* @example Create Signed Upload URL
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .createSignedUploadUrl('folder/cat.jpg')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "signedUrl": "https://example.supabase.co/storage/v1/object/upload/sign/avatars/folder/cat.jpg?token=<TOKEN>",
	*     "path": "folder/cat.jpg",
	*     "token": "<TOKEN>"
	*   },
	*   "error": null
	* }
	* ```
	*/
	async createSignedUploadUrl(path, options) {
		var _this4 = this;
		return _this4.handleOperation(async () => {
			let _path = _this4._getFinalPath(path);
			const headers = _objectSpread2$1({}, _this4.headers);
			if (options === null || options === void 0 ? void 0 : options.upsert) headers["x-upsert"] = "true";
			const data = await post(_this4.fetch, `${_this4.url}/object/upload/sign/${_path}`, {}, { headers });
			const url = new URL(_this4.url + data.url);
			const token = url.searchParams.get("token");
			if (!token) throw new StorageError("No token returned by API");
			return {
				signedUrl: url.toString(),
				path,
				token
			};
		});
	}
	/**
	* Replaces an existing file at the specified path with a new one.
	*
	* @category File Buckets
	* @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
	* @param fileBody The body of the file to be stored in the bucket.
	* @param fileOptions Optional file upload options including cacheControl, contentType, upsert, and metadata.
	* @returns Promise with response containing file path, id, and fullPath or error
	*
	* @example Update file
	* ```js
	* const avatarFile = event.target.files[0]
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .update('public/avatar1.png', avatarFile, {
	*     cacheControl: '3600',
	*     upsert: true
	*   })
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "path": "public/avatar1.png",
	*     "fullPath": "avatars/public/avatar1.png"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @example Update file using `ArrayBuffer` from base64 file data
	* ```js
	* import {decode} from 'base64-arraybuffer'
	*
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .update('public/avatar1.png', decode('base64FileData'), {
	*     contentType: 'image/png'
	*   })
	* ```
	*/
	async update(path, fileBody, fileOptions) {
		return this.uploadOrUpdate("PUT", path, fileBody, fileOptions);
	}
	/**
	* Moves an existing file to a new path in the same bucket.
	*
	* @category File Buckets
	* @param fromPath The original file path, including the current file name. For example `folder/image.png`.
	* @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
	* @param options The destination options.
	* @returns Promise with response containing success message or error
	*
	* @example Move file
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .move('public/avatar1.png', 'private/avatar2.png')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "message": "Successfully moved"
	*   },
	*   "error": null
	* }
	* ```
	*/
	async move(fromPath, toPath, options) {
		var _this6 = this;
		return _this6.handleOperation(async () => {
			return await post(_this6.fetch, `${_this6.url}/object/move`, {
				bucketId: _this6.bucketId,
				sourceKey: fromPath,
				destinationKey: toPath,
				destinationBucket: options === null || options === void 0 ? void 0 : options.destinationBucket
			}, { headers: _this6.headers });
		});
	}
	/**
	* Copies an existing file to a new path in the same bucket.
	*
	* @category File Buckets
	* @param fromPath The original file path, including the current file name. For example `folder/image.png`.
	* @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
	* @param options The destination options.
	* @returns Promise with response containing copied file path or error
	*
	* @example Copy file
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .copy('public/avatar1.png', 'private/avatar2.png')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "path": "avatars/private/avatar2.png"
	*   },
	*   "error": null
	* }
	* ```
	*/
	async copy(fromPath, toPath, options) {
		var _this7 = this;
		return _this7.handleOperation(async () => {
			return { path: (await post(_this7.fetch, `${_this7.url}/object/copy`, {
				bucketId: _this7.bucketId,
				sourceKey: fromPath,
				destinationKey: toPath,
				destinationBucket: options === null || options === void 0 ? void 0 : options.destinationBucket
			}, { headers: _this7.headers })).Key };
		});
	}
	/**
	* Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
	*
	* @category File Buckets
	* @param path The file path, including the current file name. For example `folder/image.png`.
	* @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
	* @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
	* @param options.transform Transform the asset before serving it to the client.
	* @returns Promise with response containing signed URL or error
	*
	* @example Create Signed URL
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .createSignedUrl('folder/avatar1.png', 60)
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "signedUrl": "https://example.supabase.co/storage/v1/object/sign/avatars/folder/avatar1.png?token=<TOKEN>"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @example Create a signed URL for an asset with transformations
	* ```js
	* const { data } = await supabase
	*   .storage
	*   .from('avatars')
	*   .createSignedUrl('folder/avatar1.png', 60, {
	*     transform: {
	*       width: 100,
	*       height: 100,
	*     }
	*   })
	* ```
	*
	* @example Create a signed URL which triggers the download of the asset
	* ```js
	* const { data } = await supabase
	*   .storage
	*   .from('avatars')
	*   .createSignedUrl('folder/avatar1.png', 60, {
	*     download: true,
	*   })
	* ```
	*/
	async createSignedUrl(path, expiresIn, options) {
		var _this8 = this;
		return _this8.handleOperation(async () => {
			let _path = _this8._getFinalPath(path);
			const hasTransform = typeof (options === null || options === void 0 ? void 0 : options.transform) === "object" && options.transform !== null && Object.keys(options.transform).length > 0;
			let data = await post(_this8.fetch, `${_this8.url}/object/sign/${_path}`, _objectSpread2$1({ expiresIn }, hasTransform ? { transform: options.transform } : {}), { headers: _this8.headers });
			const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `&download=${options.download === true ? "" : options.download}` : "";
			const returnedPath = hasTransform && data.signedURL.includes("/object/sign/") ? data.signedURL.replace("/object/sign/", "/render/image/sign/") : data.signedURL;
			return { signedUrl: encodeURI(`${_this8.url}${returnedPath}${downloadQueryParam}`) };
		});
	}
	/**
	* Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
	*
	* @category File Buckets
	* @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
	* @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
	* @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
	* @returns Promise with response containing array of objects with signedUrl, path, and error or error
	*
	* @example Create Signed URLs
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .createSignedUrls(['folder/avatar1.png', 'folder/avatar2.png'], 60)
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": [
	*     {
	*       "error": null,
	*       "path": "folder/avatar1.png",
	*       "signedURL": "/object/sign/avatars/folder/avatar1.png?token=<TOKEN>",
	*       "signedUrl": "https://example.supabase.co/storage/v1/object/sign/avatars/folder/avatar1.png?token=<TOKEN>"
	*     },
	*     {
	*       "error": null,
	*       "path": "folder/avatar2.png",
	*       "signedURL": "/object/sign/avatars/folder/avatar2.png?token=<TOKEN>",
	*       "signedUrl": "https://example.supabase.co/storage/v1/object/sign/avatars/folder/avatar2.png?token=<TOKEN>"
	*     }
	*   ],
	*   "error": null
	* }
	* ```
	*/
	async createSignedUrls(paths, expiresIn, options) {
		var _this9 = this;
		return _this9.handleOperation(async () => {
			const data = await post(_this9.fetch, `${_this9.url}/object/sign/${_this9.bucketId}`, {
				expiresIn,
				paths
			}, { headers: _this9.headers });
			const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `&download=${options.download === true ? "" : options.download}` : "";
			return data.map((datum) => _objectSpread2$1(_objectSpread2$1({}, datum), {}, { signedUrl: datum.signedURL ? encodeURI(`${_this9.url}${datum.signedURL}${downloadQueryParam}`) : null }));
		});
	}
	/**
	* Downloads a file from a private bucket. For public buckets, make a request to the URL returned from `getPublicUrl` instead.
	*
	* @category File Buckets
	* @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
	* @param options.transform Transform the asset before serving it to the client.
	* @param parameters Additional fetch parameters like signal for cancellation. Supports standard fetch options including cache control.
	* @returns BlobDownloadBuilder instance for downloading the file
	*
	* @example Download file
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .download('folder/avatar1.png')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": <BLOB>,
	*   "error": null
	* }
	* ```
	*
	* @example Download file with transformations
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .download('folder/avatar1.png', {
	*     transform: {
	*       width: 100,
	*       height: 100,
	*       quality: 80
	*     }
	*   })
	* ```
	*
	* @example Download with cache control (useful in Edge Functions)
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .download('folder/avatar1.png', {}, { cache: 'no-store' })
	* ```
	*
	* @example Download with abort signal
	* ```js
	* const controller = new AbortController()
	* setTimeout(() => controller.abort(), 5000)
	*
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .download('folder/avatar1.png', {}, { signal: controller.signal })
	* ```
	*/
	download(path, options, parameters) {
		const renderPath = typeof (options === null || options === void 0 ? void 0 : options.transform) !== "undefined" ? "render/image/authenticated" : "object";
		const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
		const queryString = transformationQuery ? `?${transformationQuery}` : "";
		const _path = this._getFinalPath(path);
		const downloadFn = () => get(this.fetch, `${this.url}/${renderPath}/${_path}${queryString}`, {
			headers: this.headers,
			noResolveJson: true
		}, parameters);
		return new BlobDownloadBuilder(downloadFn, this.shouldThrowOnError);
	}
	/**
	* Retrieves the details of an existing file.
	*
	* Returns detailed file metadata including size, content type, and timestamps.
	* Note: The API returns `last_modified` field, not `updated_at`.
	*
	* @category File Buckets
	* @param path The file path, including the file name. For example `folder/image.png`.
	* @returns Promise with response containing file metadata or error
	*
	* @example Get file info
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .info('folder/avatar1.png')
	*
	* if (data) {
	*   console.log('Last modified:', data.lastModified)
	*   console.log('Size:', data.size)
	* }
	* ```
	*/
	async info(path) {
		var _this10 = this;
		const _path = _this10._getFinalPath(path);
		return _this10.handleOperation(async () => {
			return recursiveToCamel(await get(_this10.fetch, `${_this10.url}/object/info/${_path}`, { headers: _this10.headers }));
		});
	}
	/**
	* Checks the existence of a file.
	*
	* @category File Buckets
	* @param path The file path, including the file name. For example `folder/image.png`.
	* @returns Promise with response containing boolean indicating file existence or error
	*
	* @example Check file existence
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .exists('folder/avatar1.png')
	* ```
	*/
	async exists(path) {
		var _this11 = this;
		const _path = _this11._getFinalPath(path);
		try {
			await head(_this11.fetch, `${_this11.url}/object/${_path}`, { headers: _this11.headers });
			return {
				data: true,
				error: null
			};
		} catch (error) {
			if (_this11.shouldThrowOnError) throw error;
			if (isStorageError(error)) {
				var _error$originalError;
				const status = error instanceof StorageApiError ? error.status : error instanceof StorageUnknownError ? (_error$originalError = error.originalError) === null || _error$originalError === void 0 ? void 0 : _error$originalError.status : void 0;
				if (status !== void 0 && [400, 404].includes(status)) return {
					data: false,
					error
				};
			}
			throw error;
		}
	}
	/**
	* A simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.
	* This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
	*
	* @category File Buckets
	* @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
	* @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
	* @param options.transform Transform the asset before serving it to the client.
	* @returns Object with public URL
	*
	* @example Returns the URL for an asset in a public bucket
	* ```js
	* const { data } = supabase
	*   .storage
	*   .from('public-bucket')
	*   .getPublicUrl('folder/avatar1.png')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "publicUrl": "https://example.supabase.co/storage/v1/object/public/public-bucket/folder/avatar1.png"
	*   }
	* }
	* ```
	*
	* @example Returns the URL for an asset in a public bucket with transformations
	* ```js
	* const { data } = supabase
	*   .storage
	*   .from('public-bucket')
	*   .getPublicUrl('folder/avatar1.png', {
	*     transform: {
	*       width: 100,
	*       height: 100,
	*     }
	*   })
	* ```
	*
	* @example Returns the URL which triggers the download of an asset in a public bucket
	* ```js
	* const { data } = supabase
	*   .storage
	*   .from('public-bucket')
	*   .getPublicUrl('folder/avatar1.png', {
	*     download: true,
	*   })
	* ```
	*/
	getPublicUrl(path, options) {
		const _path = this._getFinalPath(path);
		const _queryString = [];
		const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `download=${options.download === true ? "" : options.download}` : "";
		if (downloadQueryParam !== "") _queryString.push(downloadQueryParam);
		const renderPath = typeof (options === null || options === void 0 ? void 0 : options.transform) !== "undefined" ? "render/image" : "object";
		const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
		if (transformationQuery !== "") _queryString.push(transformationQuery);
		let queryString = _queryString.join("&");
		if (queryString !== "") queryString = `?${queryString}`;
		return { data: { publicUrl: encodeURI(`${this.url}/${renderPath}/public/${_path}${queryString}`) } };
	}
	/**
	* Deletes files within the same bucket
	*
	* Returns an array of FileObject entries for the deleted files. Note that deprecated
	* fields like `bucket_id` may or may not be present in the response - do not rely on them.
	*
	* @category File Buckets
	* @param paths An array of files to delete, including the path and file name. For example [`'folder/image.png'`].
	* @returns Promise with response containing array of deleted file objects or error
	*
	* @example Delete file
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .remove(['folder/avatar1.png'])
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": [],
	*   "error": null
	* }
	* ```
	*/
	async remove(paths) {
		var _this12 = this;
		return _this12.handleOperation(async () => {
			return await remove(_this12.fetch, `${_this12.url}/object/${_this12.bucketId}`, { prefixes: paths }, { headers: _this12.headers });
		});
	}
	/**
	* Get file metadata
	* @param id the file id to retrieve metadata
	*/
	/**
	* Update file metadata
	* @param id the file id to update metadata
	* @param meta the new file metadata
	*/
	/**
	* Lists all the files and folders within a path of the bucket.
	*
	* **Important:** For folder entries, fields like `id`, `updated_at`, `created_at`,
	* `last_accessed_at`, and `metadata` will be `null`. Only files have these fields populated.
	* Additionally, deprecated fields like `bucket_id`, `owner`, and `buckets` are NOT returned
	* by this method.
	*
	* @category File Buckets
	* @param path The folder path.
	* @param options Search options including limit (defaults to 100), offset, sortBy, and search
	* @param parameters Optional fetch parameters including signal for cancellation
	* @returns Promise with response containing array of files/folders or error
	*
	* @example List files in a bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .list('folder', {
	*     limit: 100,
	*     offset: 0,
	*     sortBy: { column: 'name', order: 'asc' },
	*   })
	*
	* // Handle files vs folders
	* data?.forEach(item => {
	*   if (item.id !== null) {
	*     // It's a file
	*     console.log('File:', item.name, 'Size:', item.metadata?.size)
	*   } else {
	*     // It's a folder
	*     console.log('Folder:', item.name)
	*   }
	* })
	* ```
	*
	* Response (file entry):
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "avatar1.png",
	*       "id": "e668cf7f-821b-4a2f-9dce-7dfa5dd1cfd2",
	*       "updated_at": "2024-05-22T23:06:05.580Z",
	*       "created_at": "2024-05-22T23:04:34.443Z",
	*       "last_accessed_at": "2024-05-22T23:04:34.443Z",
	*       "metadata": {
	*         "eTag": "\"c5e8c553235d9af30ef4f6e280790b92\"",
	*         "size": 32175,
	*         "mimetype": "image/png",
	*         "cacheControl": "max-age=3600",
	*         "lastModified": "2024-05-22T23:06:05.574Z",
	*         "contentLength": 32175,
	*         "httpStatusCode": 200
	*       }
	*     }
	*   ],
	*   "error": null
	* }
	* ```
	*
	* @example Search files in a bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .list('folder', {
	*     limit: 100,
	*     offset: 0,
	*     sortBy: { column: 'name', order: 'asc' },
	*     search: 'jon'
	*   })
	* ```
	*/
	async list(path, options, parameters) {
		var _this13 = this;
		return _this13.handleOperation(async () => {
			const body = _objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, DEFAULT_SEARCH_OPTIONS), options), {}, { prefix: path || "" });
			return await post(_this13.fetch, `${_this13.url}/object/list/${_this13.bucketId}`, body, { headers: _this13.headers }, parameters);
		});
	}
	/**
	* Lists all the files and folders within a bucket using the V2 API with pagination support.
	*
	* **Important:** Folder entries in the `folders` array only contain `name` and optionally `key` —
	* they have no `id`, timestamps, or `metadata` fields. Full file metadata is only available
	* on entries in the `objects` array.
	*
	* @experimental this method signature might change in the future
	*
	* @category File Buckets
	* @param options Search options including prefix, cursor for pagination, limit, with_delimiter
	* @param parameters Optional fetch parameters including signal for cancellation
	* @returns Promise with response containing folders/objects arrays with pagination info or error
	*
	* @example List files with pagination
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .listV2({
	*     prefix: 'folder/',
	*     limit: 100,
	*   })
	*
	* // Handle pagination
	* if (data?.hasNext) {
	*   const nextPage = await supabase
	*     .storage
	*     .from('avatars')
	*     .listV2({
	*       prefix: 'folder/',
	*       cursor: data.nextCursor,
	*     })
	* }
	*
	* // Handle files vs folders
	* data?.objects.forEach(file => {
	*   if (file.id !== null) {
	*     console.log('File:', file.name, 'Size:', file.metadata?.size)
	*   }
	* })
	* data?.folders.forEach(folder => {
	*   console.log('Folder:', folder.name)
	* })
	* ```
	*/
	async listV2(options, parameters) {
		var _this14 = this;
		return _this14.handleOperation(async () => {
			const body = _objectSpread2$1({}, options);
			return await post(_this14.fetch, `${_this14.url}/object/list-v2/${_this14.bucketId}`, body, { headers: _this14.headers }, parameters);
		});
	}
	encodeMetadata(metadata) {
		return JSON.stringify(metadata);
	}
	toBase64(data) {
		if (typeof Buffer !== "undefined") return Buffer.from(data).toString("base64");
		return btoa(data);
	}
	_getFinalPath(path) {
		return `${this.bucketId}/${path.replace(/^\/+/, "")}`;
	}
	_removeEmptyFolders(path) {
		return path.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
	}
	transformOptsToQueryString(transform) {
		const params = [];
		if (transform.width) params.push(`width=${transform.width}`);
		if (transform.height) params.push(`height=${transform.height}`);
		if (transform.resize) params.push(`resize=${transform.resize}`);
		if (transform.format) params.push(`format=${transform.format}`);
		if (transform.quality) params.push(`quality=${transform.quality}`);
		return params.join("&");
	}
};
var version$2 = "2.99.2";
var DEFAULT_HEADERS$1 = { "X-Client-Info": `storage-js/${version$2}` };
var StorageBucketApi = class extends BaseApiClient {
	constructor(url, headers = {}, fetch$1, opts) {
		const baseUrl = new URL(url);
		if (opts === null || opts === void 0 ? void 0 : opts.useNewHostname) {
			if (/supabase\.(co|in|red)$/.test(baseUrl.hostname) && !baseUrl.hostname.includes("storage.supabase.")) baseUrl.hostname = baseUrl.hostname.replace("supabase.", "storage.supabase.");
		}
		const finalUrl = baseUrl.href.replace(/\/$/, "");
		const finalHeaders = _objectSpread2$1(_objectSpread2$1({}, DEFAULT_HEADERS$1), headers);
		super(finalUrl, finalHeaders, fetch$1, "storage");
	}
	/**
	* Retrieves the details of all Storage buckets within an existing project.
	*
	* @category File Buckets
	* @param options Query parameters for listing buckets
	* @param options.limit Maximum number of buckets to return
	* @param options.offset Number of buckets to skip
	* @param options.sortColumn Column to sort by ('id', 'name', 'created_at', 'updated_at')
	* @param options.sortOrder Sort order ('asc' or 'desc')
	* @param options.search Search term to filter bucket names
	* @returns Promise with response containing array of buckets or error
	*
	* @example List buckets
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .listBuckets()
	* ```
	*
	* @example List buckets with options
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .listBuckets({
	*     limit: 10,
	*     offset: 0,
	*     sortColumn: 'created_at',
	*     sortOrder: 'desc',
	*     search: 'prod'
	*   })
	* ```
	*/
	async listBuckets(options) {
		var _this = this;
		return _this.handleOperation(async () => {
			const queryString = _this.listBucketOptionsToQueryString(options);
			return await get(_this.fetch, `${_this.url}/bucket${queryString}`, { headers: _this.headers });
		});
	}
	/**
	* Retrieves the details of an existing Storage bucket.
	*
	* @category File Buckets
	* @param id The unique identifier of the bucket you would like to retrieve.
	* @returns Promise with response containing bucket details or error
	*
	* @example Get bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .getBucket('avatars')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "id": "avatars",
	*     "name": "avatars",
	*     "owner": "",
	*     "public": false,
	*     "file_size_limit": 1024,
	*     "allowed_mime_types": [
	*       "image/png"
	*     ],
	*     "created_at": "2024-05-22T22:26:05.100Z",
	*     "updated_at": "2024-05-22T22:26:05.100Z"
	*   },
	*   "error": null
	* }
	* ```
	*/
	async getBucket(id) {
		var _this2 = this;
		return _this2.handleOperation(async () => {
			return await get(_this2.fetch, `${_this2.url}/bucket/${id}`, { headers: _this2.headers });
		});
	}
	/**
	* Creates a new Storage bucket
	*
	* @category File Buckets
	* @param id A unique identifier for the bucket you are creating.
	* @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
	* @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
	* The global file size limit takes precedence over this value.
	* The default value is null, which doesn't set a per bucket file size limit.
	* @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
	* The default value is null, which allows files with all mime types to be uploaded.
	* Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
	* @param options.type (private-beta) specifies the bucket type. see `BucketType` for more details.
	*   - default bucket type is `STANDARD`
	* @returns Promise with response containing newly created bucket name or error
	*
	* @example Create bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .createBucket('avatars', {
	*     public: false,
	*     allowedMimeTypes: ['image/png'],
	*     fileSizeLimit: 1024
	*   })
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "name": "avatars"
	*   },
	*   "error": null
	* }
	* ```
	*/
	async createBucket(id, options = { public: false }) {
		var _this3 = this;
		return _this3.handleOperation(async () => {
			return await post(_this3.fetch, `${_this3.url}/bucket`, {
				id,
				name: id,
				type: options.type,
				public: options.public,
				file_size_limit: options.fileSizeLimit,
				allowed_mime_types: options.allowedMimeTypes
			}, { headers: _this3.headers });
		});
	}
	/**
	* Updates a Storage bucket
	*
	* @category File Buckets
	* @param id A unique identifier for the bucket you are updating.
	* @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
	* @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
	* The global file size limit takes precedence over this value.
	* The default value is null, which doesn't set a per bucket file size limit.
	* @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
	* The default value is null, which allows files with all mime types to be uploaded.
	* Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
	* @returns Promise with response containing success message or error
	*
	* @example Update bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .updateBucket('avatars', {
	*     public: false,
	*     allowedMimeTypes: ['image/png'],
	*     fileSizeLimit: 1024
	*   })
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "message": "Successfully updated"
	*   },
	*   "error": null
	* }
	* ```
	*/
	async updateBucket(id, options) {
		var _this4 = this;
		return _this4.handleOperation(async () => {
			return await put(_this4.fetch, `${_this4.url}/bucket/${id}`, {
				id,
				name: id,
				public: options.public,
				file_size_limit: options.fileSizeLimit,
				allowed_mime_types: options.allowedMimeTypes
			}, { headers: _this4.headers });
		});
	}
	/**
	* Removes all objects inside a single bucket.
	*
	* @category File Buckets
	* @param id The unique identifier of the bucket you would like to empty.
	* @returns Promise with success message or error
	*
	* @example Empty bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .emptyBucket('avatars')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "message": "Successfully emptied"
	*   },
	*   "error": null
	* }
	* ```
	*/
	async emptyBucket(id) {
		var _this5 = this;
		return _this5.handleOperation(async () => {
			return await post(_this5.fetch, `${_this5.url}/bucket/${id}/empty`, {}, { headers: _this5.headers });
		});
	}
	/**
	* Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
	* You must first `empty()` the bucket.
	*
	* @category File Buckets
	* @param id The unique identifier of the bucket you would like to delete.
	* @returns Promise with success message or error
	*
	* @example Delete bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .deleteBucket('avatars')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "message": "Successfully deleted"
	*   },
	*   "error": null
	* }
	* ```
	*/
	async deleteBucket(id) {
		var _this6 = this;
		return _this6.handleOperation(async () => {
			return await remove(_this6.fetch, `${_this6.url}/bucket/${id}`, {}, { headers: _this6.headers });
		});
	}
	listBucketOptionsToQueryString(options) {
		const params = {};
		if (options) {
			if ("limit" in options) params.limit = String(options.limit);
			if ("offset" in options) params.offset = String(options.offset);
			if (options.search) params.search = options.search;
			if (options.sortColumn) params.sortColumn = options.sortColumn;
			if (options.sortOrder) params.sortOrder = options.sortOrder;
		}
		return Object.keys(params).length > 0 ? "?" + new URLSearchParams(params).toString() : "";
	}
};
/**
* Client class for managing Analytics Buckets using Iceberg tables
* Provides methods for creating, listing, and deleting analytics buckets
*/
var StorageAnalyticsClient = class extends BaseApiClient {
	/**
	* @alpha
	*
	* Creates a new StorageAnalyticsClient instance
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Analytics Buckets
	* @param url - The base URL for the storage API
	* @param headers - HTTP headers to include in requests
	* @param fetch - Optional custom fetch implementation
	*
	* @example
	* ```typescript
	* const client = new StorageAnalyticsClient(url, headers)
	* ```
	*/
	constructor(url, headers = {}, fetch$1) {
		const finalUrl = url.replace(/\/$/, "");
		const finalHeaders = _objectSpread2$1(_objectSpread2$1({}, DEFAULT_HEADERS$1), headers);
		super(finalUrl, finalHeaders, fetch$1, "storage");
	}
	/**
	* @alpha
	*
	* Creates a new analytics bucket using Iceberg tables
	* Analytics buckets are optimized for analytical queries and data processing
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Analytics Buckets
	* @param name A unique name for the bucket you are creating
	* @returns Promise with response containing newly created analytics bucket or error
	*
	* @example Create analytics bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .analytics
	*   .createBucket('analytics-data')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "name": "analytics-data",
	*     "type": "ANALYTICS",
	*     "format": "iceberg",
	*     "created_at": "2024-05-22T22:26:05.100Z",
	*     "updated_at": "2024-05-22T22:26:05.100Z"
	*   },
	*   "error": null
	* }
	* ```
	*/
	async createBucket(name) {
		var _this = this;
		return _this.handleOperation(async () => {
			return await post(_this.fetch, `${_this.url}/bucket`, { name }, { headers: _this.headers });
		});
	}
	/**
	* @alpha
	*
	* Retrieves the details of all Analytics Storage buckets within an existing project
	* Only returns buckets of type 'ANALYTICS'
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Analytics Buckets
	* @param options Query parameters for listing buckets
	* @param options.limit Maximum number of buckets to return
	* @param options.offset Number of buckets to skip
	* @param options.sortColumn Column to sort by ('name', 'created_at', 'updated_at')
	* @param options.sortOrder Sort order ('asc' or 'desc')
	* @param options.search Search term to filter bucket names
	* @returns Promise with response containing array of analytics buckets or error
	*
	* @example List analytics buckets
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .analytics
	*   .listBuckets({
	*     limit: 10,
	*     offset: 0,
	*     sortColumn: 'created_at',
	*     sortOrder: 'desc'
	*   })
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "analytics-data",
	*       "type": "ANALYTICS",
	*       "format": "iceberg",
	*       "created_at": "2024-05-22T22:26:05.100Z",
	*       "updated_at": "2024-05-22T22:26:05.100Z"
	*     }
	*   ],
	*   "error": null
	* }
	* ```
	*/
	async listBuckets(options) {
		var _this2 = this;
		return _this2.handleOperation(async () => {
			const queryParams = new URLSearchParams();
			if ((options === null || options === void 0 ? void 0 : options.limit) !== void 0) queryParams.set("limit", options.limit.toString());
			if ((options === null || options === void 0 ? void 0 : options.offset) !== void 0) queryParams.set("offset", options.offset.toString());
			if (options === null || options === void 0 ? void 0 : options.sortColumn) queryParams.set("sortColumn", options.sortColumn);
			if (options === null || options === void 0 ? void 0 : options.sortOrder) queryParams.set("sortOrder", options.sortOrder);
			if (options === null || options === void 0 ? void 0 : options.search) queryParams.set("search", options.search);
			const queryString = queryParams.toString();
			const url = queryString ? `${_this2.url}/bucket?${queryString}` : `${_this2.url}/bucket`;
			return await get(_this2.fetch, url, { headers: _this2.headers });
		});
	}
	/**
	* @alpha
	*
	* Deletes an existing analytics bucket
	* A bucket can't be deleted with existing objects inside it
	* You must first empty the bucket before deletion
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Analytics Buckets
	* @param bucketName The unique identifier of the bucket you would like to delete
	* @returns Promise with response containing success message or error
	*
	* @example Delete analytics bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .analytics
	*   .deleteBucket('analytics-data')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "message": "Successfully deleted"
	*   },
	*   "error": null
	* }
	* ```
	*/
	async deleteBucket(bucketName) {
		var _this3 = this;
		return _this3.handleOperation(async () => {
			return await remove(_this3.fetch, `${_this3.url}/bucket/${bucketName}`, {}, { headers: _this3.headers });
		});
	}
	/**
	* @alpha
	*
	* Get an Iceberg REST Catalog client configured for a specific analytics bucket
	* Use this to perform advanced table and namespace operations within the bucket
	* The returned client provides full access to the Apache Iceberg REST Catalog API
	* with the Supabase `{ data, error }` pattern for consistent error handling on all operations.
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Analytics Buckets
	* @param bucketName - The name of the analytics bucket (warehouse) to connect to
	* @returns The wrapped Iceberg catalog client
	* @throws {StorageError} If the bucket name is invalid
	*
	* @example Get catalog and create table
	* ```js
	* // First, create an analytics bucket
	* const { data: bucket, error: bucketError } = await supabase
	*   .storage
	*   .analytics
	*   .createBucket('analytics-data')
	*
	* // Get the Iceberg catalog for that bucket
	* const catalog = supabase.storage.analytics.from('analytics-data')
	*
	* // Create a namespace
	* const { error: nsError } = await catalog.createNamespace({ namespace: ['default'] })
	*
	* // Create a table with schema
	* const { data: tableMetadata, error: tableError } = await catalog.createTable(
	*   { namespace: ['default'] },
	*   {
	*     name: 'events',
	*     schema: {
	*       type: 'struct',
	*       fields: [
	*         { id: 1, name: 'id', type: 'long', required: true },
	*         { id: 2, name: 'timestamp', type: 'timestamp', required: true },
	*         { id: 3, name: 'user_id', type: 'string', required: false }
	*       ],
	*       'schema-id': 0,
	*       'identifier-field-ids': [1]
	*     },
	*     'partition-spec': {
	*       'spec-id': 0,
	*       fields: []
	*     },
	*     'write-order': {
	*       'order-id': 0,
	*       fields: []
	*     },
	*     properties: {
	*       'write.format.default': 'parquet'
	*     }
	*   }
	* )
	* ```
	*
	* @example List tables in namespace
	* ```js
	* const catalog = supabase.storage.analytics.from('analytics-data')
	*
	* // List all tables in the default namespace
	* const { data: tables, error: listError } = await catalog.listTables({ namespace: ['default'] })
	* if (listError) {
	*   if (listError.isNotFound()) {
	*     console.log('Namespace not found')
	*   }
	*   return
	* }
	* console.log(tables) // [{ namespace: ['default'], name: 'events' }]
	* ```
	*
	* @example Working with namespaces
	* ```js
	* const catalog = supabase.storage.analytics.from('analytics-data')
	*
	* // List all namespaces
	* const { data: namespaces } = await catalog.listNamespaces()
	*
	* // Create namespace with properties
	* await catalog.createNamespace(
	*   { namespace: ['production'] },
	*   { properties: { owner: 'data-team', env: 'prod' } }
	* )
	* ```
	*
	* @example Cleanup operations
	* ```js
	* const catalog = supabase.storage.analytics.from('analytics-data')
	*
	* // Drop table with purge option (removes all data)
	* const { error: dropError } = await catalog.dropTable(
	*   { namespace: ['default'], name: 'events' },
	*   { purge: true }
	* )
	*
	* if (dropError?.isNotFound()) {
	*   console.log('Table does not exist')
	* }
	*
	* // Drop namespace (must be empty)
	* await catalog.dropNamespace({ namespace: ['default'] })
	* ```
	*
	* @remarks
	* This method provides a bridge between Supabase's bucket management and the standard
	* Apache Iceberg REST Catalog API. The bucket name maps to the Iceberg warehouse parameter.
	* All authentication and configuration is handled automatically using your Supabase credentials.
	*
	* **Error Handling**: Invalid bucket names throw immediately. All catalog
	* operations return `{ data, error }` where errors are `IcebergError` instances from iceberg-js.
	* Use helper methods like `error.isNotFound()` or check `error.status` for specific error handling.
	* Use `.throwOnError()` on the analytics client if you prefer exceptions for catalog operations.
	*
	* **Cleanup Operations**: When using `dropTable`, the `purge: true` option permanently
	* deletes all table data. Without it, the table is marked as deleted but data remains.
	*
	* **Library Dependency**: The returned catalog wraps `IcebergRestCatalog` from iceberg-js.
	* For complete API documentation and advanced usage, refer to the
	* [iceberg-js documentation](https://supabase.github.io/iceberg-js/).
	*/
	from(bucketName) {
		var _this4 = this;
		if (!isValidBucketName(bucketName)) throw new StorageError("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");
		const catalog = new IcebergRestCatalog({
			baseUrl: this.url,
			catalogName: bucketName,
			auth: {
				type: "custom",
				getHeaders: async () => _this4.headers
			},
			fetch: this.fetch
		});
		const shouldThrowOnError = this.shouldThrowOnError;
		return new Proxy(catalog, { get(target, prop) {
			const value = target[prop];
			if (typeof value !== "function") return value;
			return async (...args) => {
				try {
					return {
						data: await value.apply(target, args),
						error: null
					};
				} catch (error) {
					if (shouldThrowOnError) throw error;
					return {
						data: null,
						error
					};
				}
			};
		} });
	}
};
/**
* @hidden
* Base implementation for vector index operations.
* Use {@link VectorBucketScope} via `supabase.storage.vectors.from('bucket')` instead.
*/
var VectorIndexApi = class extends BaseApiClient {
	/** Creates a new VectorIndexApi instance */
	constructor(url, headers = {}, fetch$1) {
		const finalUrl = url.replace(/\/$/, "");
		const finalHeaders = _objectSpread2$1(_objectSpread2$1({}, DEFAULT_HEADERS$1), {}, { "Content-Type": "application/json" }, headers);
		super(finalUrl, finalHeaders, fetch$1, "vectors");
	}
	/** Creates a new vector index within a bucket */
	async createIndex(options) {
		var _this = this;
		return _this.handleOperation(async () => {
			return await vectorsApi.post(_this.fetch, `${_this.url}/CreateIndex`, options, { headers: _this.headers }) || {};
		});
	}
	/** Retrieves metadata for a specific vector index */
	async getIndex(vectorBucketName, indexName) {
		var _this2 = this;
		return _this2.handleOperation(async () => {
			return await vectorsApi.post(_this2.fetch, `${_this2.url}/GetIndex`, {
				vectorBucketName,
				indexName
			}, { headers: _this2.headers });
		});
	}
	/** Lists vector indexes within a bucket with optional filtering and pagination */
	async listIndexes(options) {
		var _this3 = this;
		return _this3.handleOperation(async () => {
			return await vectorsApi.post(_this3.fetch, `${_this3.url}/ListIndexes`, options, { headers: _this3.headers });
		});
	}
	/** Deletes a vector index and all its data */
	async deleteIndex(vectorBucketName, indexName) {
		var _this4 = this;
		return _this4.handleOperation(async () => {
			return await vectorsApi.post(_this4.fetch, `${_this4.url}/DeleteIndex`, {
				vectorBucketName,
				indexName
			}, { headers: _this4.headers }) || {};
		});
	}
};
/**
* @hidden
* Base implementation for vector data operations.
* Use {@link VectorIndexScope} via `supabase.storage.vectors.from('bucket').index('idx')` instead.
*/
var VectorDataApi = class extends BaseApiClient {
	/** Creates a new VectorDataApi instance */
	constructor(url, headers = {}, fetch$1) {
		const finalUrl = url.replace(/\/$/, "");
		const finalHeaders = _objectSpread2$1(_objectSpread2$1({}, DEFAULT_HEADERS$1), {}, { "Content-Type": "application/json" }, headers);
		super(finalUrl, finalHeaders, fetch$1, "vectors");
	}
	/** Inserts or updates vectors in batch (1-500 per request) */
	async putVectors(options) {
		var _this = this;
		if (options.vectors.length < 1 || options.vectors.length > 500) throw new Error("Vector batch size must be between 1 and 500 items");
		return _this.handleOperation(async () => {
			return await vectorsApi.post(_this.fetch, `${_this.url}/PutVectors`, options, { headers: _this.headers }) || {};
		});
	}
	/** Retrieves vectors by their keys in batch */
	async getVectors(options) {
		var _this2 = this;
		return _this2.handleOperation(async () => {
			return await vectorsApi.post(_this2.fetch, `${_this2.url}/GetVectors`, options, { headers: _this2.headers });
		});
	}
	/** Lists vectors in an index with pagination */
	async listVectors(options) {
		var _this3 = this;
		if (options.segmentCount !== void 0) {
			if (options.segmentCount < 1 || options.segmentCount > 16) throw new Error("segmentCount must be between 1 and 16");
			if (options.segmentIndex !== void 0) {
				if (options.segmentIndex < 0 || options.segmentIndex >= options.segmentCount) throw new Error(`segmentIndex must be between 0 and ${options.segmentCount - 1}`);
			}
		}
		return _this3.handleOperation(async () => {
			return await vectorsApi.post(_this3.fetch, `${_this3.url}/ListVectors`, options, { headers: _this3.headers });
		});
	}
	/** Queries for similar vectors using approximate nearest neighbor search */
	async queryVectors(options) {
		var _this4 = this;
		return _this4.handleOperation(async () => {
			return await vectorsApi.post(_this4.fetch, `${_this4.url}/QueryVectors`, options, { headers: _this4.headers });
		});
	}
	/** Deletes vectors by their keys in batch (1-500 per request) */
	async deleteVectors(options) {
		var _this5 = this;
		if (options.keys.length < 1 || options.keys.length > 500) throw new Error("Keys batch size must be between 1 and 500 items");
		return _this5.handleOperation(async () => {
			return await vectorsApi.post(_this5.fetch, `${_this5.url}/DeleteVectors`, options, { headers: _this5.headers }) || {};
		});
	}
};
/**
* @hidden
* Base implementation for vector bucket operations.
* Use {@link StorageVectorsClient} via `supabase.storage.vectors` instead.
*/
var VectorBucketApi = class extends BaseApiClient {
	/** Creates a new VectorBucketApi instance */
	constructor(url, headers = {}, fetch$1) {
		const finalUrl = url.replace(/\/$/, "");
		const finalHeaders = _objectSpread2$1(_objectSpread2$1({}, DEFAULT_HEADERS$1), {}, { "Content-Type": "application/json" }, headers);
		super(finalUrl, finalHeaders, fetch$1, "vectors");
	}
	/** Creates a new vector bucket */
	async createBucket(vectorBucketName) {
		var _this = this;
		return _this.handleOperation(async () => {
			return await vectorsApi.post(_this.fetch, `${_this.url}/CreateVectorBucket`, { vectorBucketName }, { headers: _this.headers }) || {};
		});
	}
	/** Retrieves metadata for a specific vector bucket */
	async getBucket(vectorBucketName) {
		var _this2 = this;
		return _this2.handleOperation(async () => {
			return await vectorsApi.post(_this2.fetch, `${_this2.url}/GetVectorBucket`, { vectorBucketName }, { headers: _this2.headers });
		});
	}
	/** Lists vector buckets with optional filtering and pagination */
	async listBuckets(options = {}) {
		var _this3 = this;
		return _this3.handleOperation(async () => {
			return await vectorsApi.post(_this3.fetch, `${_this3.url}/ListVectorBuckets`, options, { headers: _this3.headers });
		});
	}
	/** Deletes a vector bucket (must be empty first) */
	async deleteBucket(vectorBucketName) {
		var _this4 = this;
		return _this4.handleOperation(async () => {
			return await vectorsApi.post(_this4.fetch, `${_this4.url}/DeleteVectorBucket`, { vectorBucketName }, { headers: _this4.headers }) || {};
		});
	}
};
/**
*
* @alpha
*
* Main client for interacting with S3 Vectors API
* Provides access to bucket, index, and vector data operations
*
* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
*
* **Usage Patterns:**
*
* ```typescript
* const { data, error } = await supabase
*  .storage
*  .vectors
*  .createBucket('embeddings-prod')
*
* // Access index operations via buckets
* const bucket = supabase.storage.vectors.from('embeddings-prod')
* await bucket.createIndex({
*   indexName: 'documents',
*   dataType: 'float32',
*   dimension: 1536,
*   distanceMetric: 'cosine'
* })
*
* // Access vector operations via index
* const index = bucket.index('documents')
* await index.putVectors({
*   vectors: [
*     { key: 'doc-1', data: { float32: [...] }, metadata: { title: 'Intro' } }
*   ]
* })
*
* // Query similar vectors
* const { data } = await index.queryVectors({
*   queryVector: { float32: [...] },
*   topK: 5,
*   returnDistance: true
* })
* ```
*/
var StorageVectorsClient = class extends VectorBucketApi {
	/**
	* @alpha
	*
	* Creates a StorageVectorsClient that can manage buckets, indexes, and vectors.
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Vector Buckets
	* @param url - Base URL of the Storage Vectors REST API.
	* @param options.headers - Optional headers (for example `Authorization`) applied to every request.
	* @param options.fetch - Optional custom `fetch` implementation for non-browser runtimes.
	*
	* @example
	* ```typescript
	* const client = new StorageVectorsClient(url, options)
	* ```
	*/
	constructor(url, options = {}) {
		super(url, options.headers || {}, options.fetch);
	}
	/**
	*
	* @alpha
	*
	* Access operations for a specific vector bucket
	* Returns a scoped client for index and vector operations within the bucket
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Vector Buckets
	* @param vectorBucketName - Name of the vector bucket
	* @returns Bucket-scoped client with index and vector operations
	*
	* @example
	* ```typescript
	* const bucket = supabase.storage.vectors.from('embeddings-prod')
	* ```
	*/
	from(vectorBucketName) {
		return new VectorBucketScope(this.url, this.headers, vectorBucketName, this.fetch);
	}
	/**
	*
	* @alpha
	*
	* Creates a new vector bucket
	* Vector buckets are containers for vector indexes and their data
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Vector Buckets
	* @param vectorBucketName - Unique name for the vector bucket
	* @returns Promise with empty response on success or error
	*
	* @example
	* ```typescript
	* const { data, error } = await supabase
	*   .storage
	*   .vectors
	*   .createBucket('embeddings-prod')
	* ```
	*/
	async createBucket(vectorBucketName) {
		var _superprop_getCreateBucket = () => super.createBucket, _this = this;
		return _superprop_getCreateBucket().call(_this, vectorBucketName);
	}
	/**
	*
	* @alpha
	*
	* Retrieves metadata for a specific vector bucket
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Vector Buckets
	* @param vectorBucketName - Name of the vector bucket
	* @returns Promise with bucket metadata or error
	*
	* @example
	* ```typescript
	* const { data, error } = await supabase
	*   .storage
	*   .vectors
	*   .getBucket('embeddings-prod')
	*
	* console.log('Bucket created:', data?.vectorBucket.creationTime)
	* ```
	*/
	async getBucket(vectorBucketName) {
		var _superprop_getGetBucket = () => super.getBucket, _this2 = this;
		return _superprop_getGetBucket().call(_this2, vectorBucketName);
	}
	/**
	*
	* @alpha
	*
	* Lists all vector buckets with optional filtering and pagination
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Vector Buckets
	* @param options - Optional filters (prefix, maxResults, nextToken)
	* @returns Promise with list of buckets or error
	*
	* @example
	* ```typescript
	* const { data, error } = await supabase
	*   .storage
	*   .vectors
	*   .listBuckets({ prefix: 'embeddings-' })
	*
	* data?.vectorBuckets.forEach(bucket => {
	*   console.log(bucket.vectorBucketName)
	* })
	* ```
	*/
	async listBuckets(options = {}) {
		var _superprop_getListBuckets = () => super.listBuckets, _this3 = this;
		return _superprop_getListBuckets().call(_this3, options);
	}
	/**
	*
	* @alpha
	*
	* Deletes a vector bucket (bucket must be empty)
	* All indexes must be deleted before deleting the bucket
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Vector Buckets
	* @param vectorBucketName - Name of the vector bucket to delete
	* @returns Promise with empty response on success or error
	*
	* @example
	* ```typescript
	* const { data, error } = await supabase
	*   .storage
	*   .vectors
	*   .deleteBucket('embeddings-old')
	* ```
	*/
	async deleteBucket(vectorBucketName) {
		var _superprop_getDeleteBucket = () => super.deleteBucket, _this4 = this;
		return _superprop_getDeleteBucket().call(_this4, vectorBucketName);
	}
};
/**
*
* @alpha
*
* Scoped client for operations within a specific vector bucket
* Provides index management and access to vector operations
*
* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
*/
var VectorBucketScope = class extends VectorIndexApi {
	/**
	* @alpha
	*
	* Creates a helper that automatically scopes all index operations to the provided bucket.
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Vector Buckets
	* @example
	* ```typescript
	* const bucket = supabase.storage.vectors.from('embeddings-prod')
	* ```
	*/
	constructor(url, headers, vectorBucketName, fetch$1) {
		super(url, headers, fetch$1);
		this.vectorBucketName = vectorBucketName;
	}
	/**
	*
	* @alpha
	*
	* Creates a new vector index in this bucket
	* Convenience method that automatically includes the bucket name
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Vector Buckets
	* @param options - Index configuration (vectorBucketName is automatically set)
	* @returns Promise with empty response on success or error
	*
	* @example
	* ```typescript
	* const bucket = supabase.storage.vectors.from('embeddings-prod')
	* await bucket.createIndex({
	*   indexName: 'documents-openai',
	*   dataType: 'float32',
	*   dimension: 1536,
	*   distanceMetric: 'cosine',
	*   metadataConfiguration: {
	*     nonFilterableMetadataKeys: ['raw_text']
	*   }
	* })
	* ```
	*/
	async createIndex(options) {
		var _superprop_getCreateIndex = () => super.createIndex, _this5 = this;
		return _superprop_getCreateIndex().call(_this5, _objectSpread2$1(_objectSpread2$1({}, options), {}, { vectorBucketName: _this5.vectorBucketName }));
	}
	/**
	*
	* @alpha
	*
	* Lists indexes in this bucket
	* Convenience method that automatically includes the bucket name
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Vector Buckets
	* @param options - Listing options (vectorBucketName is automatically set)
	* @returns Promise with response containing indexes array and pagination token or error
	*
	* @example
	* ```typescript
	* const bucket = supabase.storage.vectors.from('embeddings-prod')
	* const { data } = await bucket.listIndexes({ prefix: 'documents-' })
	* ```
	*/
	async listIndexes(options = {}) {
		var _superprop_getListIndexes = () => super.listIndexes, _this6 = this;
		return _superprop_getListIndexes().call(_this6, _objectSpread2$1(_objectSpread2$1({}, options), {}, { vectorBucketName: _this6.vectorBucketName }));
	}
	/**
	*
	* @alpha
	*
	* Retrieves metadata for a specific index in this bucket
	* Convenience method that automatically includes the bucket name
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Vector Buckets
	* @param indexName - Name of the index to retrieve
	* @returns Promise with index metadata or error
	*
	* @example
	* ```typescript
	* const bucket = supabase.storage.vectors.from('embeddings-prod')
	* const { data } = await bucket.getIndex('documents-openai')
	* console.log('Dimension:', data?.index.dimension)
	* ```
	*/
	async getIndex(indexName) {
		var _superprop_getGetIndex = () => super.getIndex, _this7 = this;
		return _superprop_getGetIndex().call(_this7, _this7.vectorBucketName, indexName);
	}
	/**
	*
	* @alpha
	*
	* Deletes an index from this bucket
	* Convenience method that automatically includes the bucket name
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Vector Buckets
	* @param indexName - Name of the index to delete
	* @returns Promise with empty response on success or error
	*
	* @example
	* ```typescript
	* const bucket = supabase.storage.vectors.from('embeddings-prod')
	* await bucket.deleteIndex('old-index')
	* ```
	*/
	async deleteIndex(indexName) {
		var _superprop_getDeleteIndex = () => super.deleteIndex, _this8 = this;
		return _superprop_getDeleteIndex().call(_this8, _this8.vectorBucketName, indexName);
	}
	/**
	*
	* @alpha
	*
	* Access operations for a specific index within this bucket
	* Returns a scoped client for vector data operations
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Vector Buckets
	* @param indexName - Name of the index
	* @returns Index-scoped client with vector data operations
	*
	* @example
	* ```typescript
	* const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
	*
	* // Insert vectors
	* await index.putVectors({
	*   vectors: [
	*     { key: 'doc-1', data: { float32: [...] }, metadata: { title: 'Intro' } }
	*   ]
	* })
	*
	* // Query similar vectors
	* const { data } = await index.queryVectors({
	*   queryVector: { float32: [...] },
	*   topK: 5
	* })
	* ```
	*/
	index(indexName) {
		return new VectorIndexScope(this.url, this.headers, this.vectorBucketName, indexName, this.fetch);
	}
};
/**
*
* @alpha
*
* Scoped client for operations within a specific vector index
* Provides vector data operations (put, get, list, query, delete)
*
* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
*/
var VectorIndexScope = class extends VectorDataApi {
	/**
	*
	* @alpha
	*
	* Creates a helper that automatically scopes all vector operations to the provided bucket/index names.
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Vector Buckets
	* @example
	* ```typescript
	* const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
	* ```
	*/
	constructor(url, headers, vectorBucketName, indexName, fetch$1) {
		super(url, headers, fetch$1);
		this.vectorBucketName = vectorBucketName;
		this.indexName = indexName;
	}
	/**
	*
	* @alpha
	*
	* Inserts or updates vectors in this index
	* Convenience method that automatically includes bucket and index names
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Vector Buckets
	* @param options - Vector insertion options (bucket and index names automatically set)
	* @returns Promise with empty response on success or error
	*
	* @example
	* ```typescript
	* const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
	* await index.putVectors({
	*   vectors: [
	*     {
	*       key: 'doc-1',
	*       data: { float32: [0.1, 0.2, ...] },
	*       metadata: { title: 'Introduction', page: 1 }
	*     }
	*   ]
	* })
	* ```
	*/
	async putVectors(options) {
		var _superprop_getPutVectors = () => super.putVectors, _this9 = this;
		return _superprop_getPutVectors().call(_this9, _objectSpread2$1(_objectSpread2$1({}, options), {}, {
			vectorBucketName: _this9.vectorBucketName,
			indexName: _this9.indexName
		}));
	}
	/**
	*
	* @alpha
	*
	* Retrieves vectors by keys from this index
	* Convenience method that automatically includes bucket and index names
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Vector Buckets
	* @param options - Vector retrieval options (bucket and index names automatically set)
	* @returns Promise with response containing vectors array or error
	*
	* @example
	* ```typescript
	* const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
	* const { data } = await index.getVectors({
	*   keys: ['doc-1', 'doc-2'],
	*   returnMetadata: true
	* })
	* ```
	*/
	async getVectors(options) {
		var _superprop_getGetVectors = () => super.getVectors, _this10 = this;
		return _superprop_getGetVectors().call(_this10, _objectSpread2$1(_objectSpread2$1({}, options), {}, {
			vectorBucketName: _this10.vectorBucketName,
			indexName: _this10.indexName
		}));
	}
	/**
	*
	* @alpha
	*
	* Lists vectors in this index with pagination
	* Convenience method that automatically includes bucket and index names
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Vector Buckets
	* @param options - Listing options (bucket and index names automatically set)
	* @returns Promise with response containing vectors array and pagination token or error
	*
	* @example
	* ```typescript
	* const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
	* const { data } = await index.listVectors({
	*   maxResults: 500,
	*   returnMetadata: true
	* })
	* ```
	*/
	async listVectors(options = {}) {
		var _superprop_getListVectors = () => super.listVectors, _this11 = this;
		return _superprop_getListVectors().call(_this11, _objectSpread2$1(_objectSpread2$1({}, options), {}, {
			vectorBucketName: _this11.vectorBucketName,
			indexName: _this11.indexName
		}));
	}
	/**
	*
	* @alpha
	*
	* Queries for similar vectors in this index
	* Convenience method that automatically includes bucket and index names
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Vector Buckets
	* @param options - Query options (bucket and index names automatically set)
	* @returns Promise with response containing matches array of similar vectors ordered by distance or error
	*
	* @example
	* ```typescript
	* const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
	* const { data } = await index.queryVectors({
	*   queryVector: { float32: [0.1, 0.2, ...] },
	*   topK: 5,
	*   filter: { category: 'technical' },
	*   returnDistance: true,
	*   returnMetadata: true
	* })
	* ```
	*/
	async queryVectors(options) {
		var _superprop_getQueryVectors = () => super.queryVectors, _this12 = this;
		return _superprop_getQueryVectors().call(_this12, _objectSpread2$1(_objectSpread2$1({}, options), {}, {
			vectorBucketName: _this12.vectorBucketName,
			indexName: _this12.indexName
		}));
	}
	/**
	*
	* @alpha
	*
	* Deletes vectors by keys from this index
	* Convenience method that automatically includes bucket and index names
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Vector Buckets
	* @param options - Deletion options (bucket and index names automatically set)
	* @returns Promise with empty response on success or error
	*
	* @example
	* ```typescript
	* const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
	* await index.deleteVectors({
	*   keys: ['doc-1', 'doc-2', 'doc-3']
	* })
	* ```
	*/
	async deleteVectors(options) {
		var _superprop_getDeleteVectors = () => super.deleteVectors, _this13 = this;
		return _superprop_getDeleteVectors().call(_this13, _objectSpread2$1(_objectSpread2$1({}, options), {}, {
			vectorBucketName: _this13.vectorBucketName,
			indexName: _this13.indexName
		}));
	}
};
var StorageClient = class extends StorageBucketApi {
	/**
	* Creates a client for Storage buckets, files, analytics, and vectors.
	*
	* @category File Buckets
	* @example
	* ```ts
	* import { StorageClient } from '@supabase/storage-js'
	*
	* const storage = new StorageClient('https://xyzcompany.supabase.co/storage/v1', {
	*   apikey: 'public-anon-key',
	* })
	* const avatars = storage.from('avatars')
	* ```
	*/
	constructor(url, headers = {}, fetch$1, opts) {
		super(url, headers, fetch$1, opts);
	}
	/**
	* Perform file operation in a bucket.
	*
	* @category File Buckets
	* @param id The bucket id to operate on.
	*
	* @example
	* ```typescript
	* const avatars = supabase.storage.from('avatars')
	* ```
	*/
	from(id) {
		return new StorageFileApi(this.url, this.headers, id, this.fetch);
	}
	/**
	*
	* @alpha
	*
	* Access vector storage operations.
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Vector Buckets
	* @returns A StorageVectorsClient instance configured with the current storage settings.
	*/
	get vectors() {
		return new StorageVectorsClient(this.url + "/vector", {
			headers: this.headers,
			fetch: this.fetch
		});
	}
	/**
	*
	* @alpha
	*
	* Access analytics storage operations using Iceberg tables.
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Analytics Buckets
	* @returns A StorageAnalyticsClient instance configured with the current storage settings.
	*/
	get analytics() {
		return new StorageAnalyticsClient(this.url + "/iceberg", this.headers, this.fetch);
	}
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+auth-js@2.99.2/node_modules/@supabase/auth-js/dist/module/lib/version.js
var version$1 = "2.99.2";
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+auth-js@2.99.2/node_modules/@supabase/auth-js/dist/module/lib/constants.js
/** Current session will be checked for refresh at this interval. */
var AUTO_REFRESH_TICK_DURATION_MS = 30 * 1e3;
var EXPIRY_MARGIN_MS = 3 * AUTO_REFRESH_TICK_DURATION_MS;
var GOTRUE_URL = "http://localhost:9999";
var STORAGE_KEY = "supabase.auth.token";
var DEFAULT_HEADERS = { "X-Client-Info": `gotrue-js/${version$1}` };
var API_VERSION_HEADER_NAME = "X-Supabase-Api-Version";
var API_VERSIONS = { "2024-01-01": {
	timestamp: Date.parse("2024-01-01T00:00:00.0Z"),
	name: "2024-01-01"
} };
var BASE64URL_REGEX = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i;
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+auth-js@2.99.2/node_modules/@supabase/auth-js/dist/module/lib/errors.js
/**
* Base error thrown by Supabase Auth helpers.
*
* @example
* ```ts
* import { AuthError } from '@supabase/auth-js'
*
* throw new AuthError('Unexpected auth error', 500, 'unexpected')
* ```
*/
var AuthError = class extends Error {
	constructor(message, status, code) {
		super(message);
		this.__isAuthError = true;
		this.name = "AuthError";
		this.status = status;
		this.code = code;
	}
};
function isAuthError(error) {
	return typeof error === "object" && error !== null && "__isAuthError" in error;
}
/**
* Error returned directly from the GoTrue REST API.
*
* @example
* ```ts
* import { AuthApiError } from '@supabase/auth-js'
*
* throw new AuthApiError('Invalid credentials', 400, 'invalid_credentials')
* ```
*/
var AuthApiError = class extends AuthError {
	constructor(message, status, code) {
		super(message, status, code);
		this.name = "AuthApiError";
		this.status = status;
		this.code = code;
	}
};
function isAuthApiError(error) {
	return isAuthError(error) && error.name === "AuthApiError";
}
/**
* Wraps non-standard errors so callers can inspect the root cause.
*
* @example
* ```ts
* import { AuthUnknownError } from '@supabase/auth-js'
*
* try {
*   await someAuthCall()
* } catch (err) {
*   throw new AuthUnknownError('Auth failed', err)
* }
* ```
*/
var AuthUnknownError = class extends AuthError {
	constructor(message, originalError) {
		super(message);
		this.name = "AuthUnknownError";
		this.originalError = originalError;
	}
};
/**
* Flexible error class used to create named auth errors at runtime.
*
* @example
* ```ts
* import { CustomAuthError } from '@supabase/auth-js'
*
* throw new CustomAuthError('My custom auth error', 'MyAuthError', 400, 'custom_code')
* ```
*/
var CustomAuthError = class extends AuthError {
	constructor(message, name, status, code) {
		super(message, status, code);
		this.name = name;
		this.status = status;
	}
};
/**
* Error thrown when an operation requires a session but none is present.
*
* @example
* ```ts
* import { AuthSessionMissingError } from '@supabase/auth-js'
*
* throw new AuthSessionMissingError()
* ```
*/
var AuthSessionMissingError = class extends CustomAuthError {
	constructor() {
		super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
	}
};
function isAuthSessionMissingError(error) {
	return isAuthError(error) && error.name === "AuthSessionMissingError";
}
/**
* Error thrown when the token response is malformed.
*
* @example
* ```ts
* import { AuthInvalidTokenResponseError } from '@supabase/auth-js'
*
* throw new AuthInvalidTokenResponseError()
* ```
*/
var AuthInvalidTokenResponseError = class extends CustomAuthError {
	constructor() {
		super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0);
	}
};
/**
* Error thrown when email/password credentials are invalid.
*
* @example
* ```ts
* import { AuthInvalidCredentialsError } from '@supabase/auth-js'
*
* throw new AuthInvalidCredentialsError('Email or password is incorrect')
* ```
*/
var AuthInvalidCredentialsError = class extends CustomAuthError {
	constructor(message) {
		super(message, "AuthInvalidCredentialsError", 400, void 0);
	}
};
/**
* Error thrown when implicit grant redirects contain an error.
*
* @example
* ```ts
* import { AuthImplicitGrantRedirectError } from '@supabase/auth-js'
*
* throw new AuthImplicitGrantRedirectError('OAuth redirect failed', {
*   error: 'access_denied',
*   code: 'oauth_error',
* })
* ```
*/
var AuthImplicitGrantRedirectError = class extends CustomAuthError {
	constructor(message, details = null) {
		super(message, "AuthImplicitGrantRedirectError", 500, void 0);
		this.details = null;
		this.details = details;
	}
	toJSON() {
		return {
			name: this.name,
			message: this.message,
			status: this.status,
			details: this.details
		};
	}
};
function isAuthImplicitGrantRedirectError(error) {
	return isAuthError(error) && error.name === "AuthImplicitGrantRedirectError";
}
/**
* Error thrown during PKCE code exchanges.
*
* @example
* ```ts
* import { AuthPKCEGrantCodeExchangeError } from '@supabase/auth-js'
*
* throw new AuthPKCEGrantCodeExchangeError('PKCE exchange failed')
* ```
*/
var AuthPKCEGrantCodeExchangeError = class extends CustomAuthError {
	constructor(message, details = null) {
		super(message, "AuthPKCEGrantCodeExchangeError", 500, void 0);
		this.details = null;
		this.details = details;
	}
	toJSON() {
		return {
			name: this.name,
			message: this.message,
			status: this.status,
			details: this.details
		};
	}
};
/**
* Error thrown when the PKCE code verifier is not found in storage.
* This typically happens when the auth flow was initiated in a different
* browser, device, or the storage was cleared.
*
* @example
* ```ts
* import { AuthPKCECodeVerifierMissingError } from '@supabase/auth-js'
*
* throw new AuthPKCECodeVerifierMissingError()
* ```
*/
var AuthPKCECodeVerifierMissingError = class extends CustomAuthError {
	constructor() {
		super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.", "AuthPKCECodeVerifierMissingError", 400, "pkce_code_verifier_not_found");
	}
};
/**
* Error thrown when a transient fetch issue occurs.
*
* @example
* ```ts
* import { AuthRetryableFetchError } from '@supabase/auth-js'
*
* throw new AuthRetryableFetchError('Service temporarily unavailable', 503)
* ```
*/
var AuthRetryableFetchError = class extends CustomAuthError {
	constructor(message, status) {
		super(message, "AuthRetryableFetchError", status, void 0);
	}
};
function isAuthRetryableFetchError(error) {
	return isAuthError(error) && error.name === "AuthRetryableFetchError";
}
/**
* This error is thrown on certain methods when the password used is deemed
* weak. Inspect the reasons to identify what password strength rules are
* inadequate.
*/
/**
* Error thrown when a supplied password is considered weak.
*
* @example
* ```ts
* import { AuthWeakPasswordError } from '@supabase/auth-js'
*
* throw new AuthWeakPasswordError('Password too short', 400, ['min_length'])
* ```
*/
var AuthWeakPasswordError = class extends CustomAuthError {
	constructor(message, status, reasons) {
		super(message, "AuthWeakPasswordError", status, "weak_password");
		this.reasons = reasons;
	}
};
/**
* Error thrown when a JWT cannot be verified or parsed.
*
* @example
* ```ts
* import { AuthInvalidJwtError } from '@supabase/auth-js'
*
* throw new AuthInvalidJwtError('Token signature is invalid')
* ```
*/
var AuthInvalidJwtError = class extends CustomAuthError {
	constructor(message) {
		super(message, "AuthInvalidJwtError", 400, "invalid_jwt");
	}
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+auth-js@2.99.2/node_modules/@supabase/auth-js/dist/module/lib/base64url.js
/**
* Avoid modifying this file. It's part of
* https://github.com/supabase-community/base64url-js.  Submit all fixes on
* that repo!
*/
/**
* An array of characters that encode 6 bits into a Base64-URL alphabet
* character.
*/
var TO_BASE64URL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split("");
/**
* An array of characters that can appear in a Base64-URL encoded string but
* should be ignored.
*/
var IGNORE_BASE64URL = " 	\n\r=".split("");
/**
* An array of 128 numbers that map a Base64-URL character to 6 bits, or if -2
* used to skip the character, or if -1 used to error out.
*/
var FROM_BASE64URL = (() => {
	const charMap = new Array(128);
	for (let i = 0; i < charMap.length; i += 1) charMap[i] = -1;
	for (let i = 0; i < IGNORE_BASE64URL.length; i += 1) charMap[IGNORE_BASE64URL[i].charCodeAt(0)] = -2;
	for (let i = 0; i < TO_BASE64URL.length; i += 1) charMap[TO_BASE64URL[i].charCodeAt(0)] = i;
	return charMap;
})();
/**
* Converts a byte to a Base64-URL string.
*
* @param byte The byte to convert, or null to flush at the end of the byte sequence.
* @param state The Base64 conversion state. Pass an initial value of `{ queue: 0, queuedBits: 0 }`.
* @param emit A function called with the next Base64 character when ready.
*/
function byteToBase64URL(byte, state, emit) {
	if (byte !== null) {
		state.queue = state.queue << 8 | byte;
		state.queuedBits += 8;
		while (state.queuedBits >= 6) {
			emit(TO_BASE64URL[state.queue >> state.queuedBits - 6 & 63]);
			state.queuedBits -= 6;
		}
	} else if (state.queuedBits > 0) {
		state.queue = state.queue << 6 - state.queuedBits;
		state.queuedBits = 6;
		while (state.queuedBits >= 6) {
			emit(TO_BASE64URL[state.queue >> state.queuedBits - 6 & 63]);
			state.queuedBits -= 6;
		}
	}
}
/**
* Converts a String char code (extracted using `string.charCodeAt(position)`) to a sequence of Base64-URL characters.
*
* @param charCode The char code of the JavaScript string.
* @param state The Base64 state. Pass an initial value of `{ queue: 0, queuedBits: 0 }`.
* @param emit A function called with the next byte.
*/
function byteFromBase64URL(charCode, state, emit) {
	const bits = FROM_BASE64URL[charCode];
	if (bits > -1) {
		state.queue = state.queue << 6 | bits;
		state.queuedBits += 6;
		while (state.queuedBits >= 8) {
			emit(state.queue >> state.queuedBits - 8 & 255);
			state.queuedBits -= 8;
		}
	} else if (bits === -2) return;
	else throw new Error(`Invalid Base64-URL character "${String.fromCharCode(charCode)}"`);
}
/**
* Converts a Base64-URL encoded string into a JavaScript string. It is assumed
* that the underlying string has been encoded as UTF-8.
*
* @param str The Base64-URL encoded string.
*/
function stringFromBase64URL(str) {
	const conv = [];
	const utf8Emit = (codepoint) => {
		conv.push(String.fromCodePoint(codepoint));
	};
	const utf8State = {
		utf8seq: 0,
		codepoint: 0
	};
	const b64State = {
		queue: 0,
		queuedBits: 0
	};
	const byteEmit = (byte) => {
		stringFromUTF8(byte, utf8State, utf8Emit);
	};
	for (let i = 0; i < str.length; i += 1) byteFromBase64URL(str.charCodeAt(i), b64State, byteEmit);
	return conv.join("");
}
/**
* Converts a Unicode codepoint to a multi-byte UTF-8 sequence.
*
* @param codepoint The Unicode codepoint.
* @param emit      Function which will be called for each UTF-8 byte that represents the codepoint.
*/
function codepointToUTF8(codepoint, emit) {
	if (codepoint <= 127) {
		emit(codepoint);
		return;
	} else if (codepoint <= 2047) {
		emit(192 | codepoint >> 6);
		emit(128 | codepoint & 63);
		return;
	} else if (codepoint <= 65535) {
		emit(224 | codepoint >> 12);
		emit(128 | codepoint >> 6 & 63);
		emit(128 | codepoint & 63);
		return;
	} else if (codepoint <= 1114111) {
		emit(240 | codepoint >> 18);
		emit(128 | codepoint >> 12 & 63);
		emit(128 | codepoint >> 6 & 63);
		emit(128 | codepoint & 63);
		return;
	}
	throw new Error(`Unrecognized Unicode codepoint: ${codepoint.toString(16)}`);
}
/**
* Converts a JavaScript string to a sequence of UTF-8 bytes.
*
* @param str  The string to convert to UTF-8.
* @param emit Function which will be called for each UTF-8 byte of the string.
*/
function stringToUTF8(str, emit) {
	for (let i = 0; i < str.length; i += 1) {
		let codepoint = str.charCodeAt(i);
		if (codepoint > 55295 && codepoint <= 56319) {
			const highSurrogate = (codepoint - 55296) * 1024 & 65535;
			codepoint = (str.charCodeAt(i + 1) - 56320 & 65535 | highSurrogate) + 65536;
			i += 1;
		}
		codepointToUTF8(codepoint, emit);
	}
}
/**
* Converts a UTF-8 byte to a Unicode codepoint.
*
* @param byte  The UTF-8 byte next in the sequence.
* @param state The shared state between consecutive UTF-8 bytes in the
*              sequence, an object with the shape `{ utf8seq: 0, codepoint: 0 }`.
* @param emit  Function which will be called for each codepoint.
*/
function stringFromUTF8(byte, state, emit) {
	if (state.utf8seq === 0) {
		if (byte <= 127) {
			emit(byte);
			return;
		}
		for (let leadingBit = 1; leadingBit < 6; leadingBit += 1) if ((byte >> 7 - leadingBit & 1) === 0) {
			state.utf8seq = leadingBit;
			break;
		}
		if (state.utf8seq === 2) state.codepoint = byte & 31;
		else if (state.utf8seq === 3) state.codepoint = byte & 15;
		else if (state.utf8seq === 4) state.codepoint = byte & 7;
		else throw new Error("Invalid UTF-8 sequence");
		state.utf8seq -= 1;
	} else if (state.utf8seq > 0) {
		if (byte <= 127) throw new Error("Invalid UTF-8 sequence");
		state.codepoint = state.codepoint << 6 | byte & 63;
		state.utf8seq -= 1;
		if (state.utf8seq === 0) emit(state.codepoint);
	}
}
/**
* Helper functions to convert different types of strings to Uint8Array
*/
function base64UrlToUint8Array(str) {
	const result = [];
	const state = {
		queue: 0,
		queuedBits: 0
	};
	const onByte = (byte) => {
		result.push(byte);
	};
	for (let i = 0; i < str.length; i += 1) byteFromBase64URL(str.charCodeAt(i), state, onByte);
	return new Uint8Array(result);
}
function stringToUint8Array(str) {
	const result = [];
	stringToUTF8(str, (byte) => result.push(byte));
	return new Uint8Array(result);
}
function bytesToBase64URL(bytes) {
	const result = [];
	const state = {
		queue: 0,
		queuedBits: 0
	};
	const onChar = (char) => {
		result.push(char);
	};
	bytes.forEach((byte) => byteToBase64URL(byte, state, onChar));
	byteToBase64URL(null, state, onChar);
	return result.join("");
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+auth-js@2.99.2/node_modules/@supabase/auth-js/dist/module/lib/helpers.js
function expiresAt(expiresIn) {
	return Math.round(Date.now() / 1e3) + expiresIn;
}
/**
* Generates a unique identifier for internal callback subscriptions.
*
* This function uses JavaScript Symbols to create guaranteed-unique identifiers
* for auth state change callbacks. Symbols are ideal for this use case because:
* - They are guaranteed unique by the JavaScript runtime
* - They work in all environments (browser, SSR, Node.js)
* - They avoid issues with Next.js 16 deterministic rendering requirements
* - They are perfect for internal, non-serializable identifiers
*
* Note: This function is only used for internal subscription management,
* not for security-critical operations like session tokens.
*/
function generateCallbackId() {
	return Symbol("auth-callback");
}
var isBrowser = () => typeof window !== "undefined" && typeof document !== "undefined";
var localStorageWriteTests = {
	tested: false,
	writable: false
};
/**
* Checks whether localStorage is supported on this browser.
*/
var supportsLocalStorage = () => {
	if (!isBrowser()) return false;
	try {
		if (typeof globalThis.localStorage !== "object") return false;
	} catch (e) {
		return false;
	}
	if (localStorageWriteTests.tested) return localStorageWriteTests.writable;
	const randomKey = `lswt-${Math.random()}${Math.random()}`;
	try {
		globalThis.localStorage.setItem(randomKey, randomKey);
		globalThis.localStorage.removeItem(randomKey);
		localStorageWriteTests.tested = true;
		localStorageWriteTests.writable = true;
	} catch (e) {
		localStorageWriteTests.tested = true;
		localStorageWriteTests.writable = false;
	}
	return localStorageWriteTests.writable;
};
/**
* Extracts parameters encoded in the URL both in the query and fragment.
*/
function parseParametersFromURL(href) {
	const result = {};
	const url = new URL(href);
	if (url.hash && url.hash[0] === "#") try {
		new URLSearchParams(url.hash.substring(1)).forEach((value, key) => {
			result[key] = value;
		});
	} catch (e) {}
	url.searchParams.forEach((value, key) => {
		result[key] = value;
	});
	return result;
}
var resolveFetch$1 = (customFetch) => {
	if (customFetch) return (...args) => customFetch(...args);
	return (...args) => fetch(...args);
};
var looksLikeFetchResponse = (maybeResponse) => {
	return typeof maybeResponse === "object" && maybeResponse !== null && "status" in maybeResponse && "ok" in maybeResponse && "json" in maybeResponse && typeof maybeResponse.json === "function";
};
var setItemAsync = async (storage, key, data) => {
	await storage.setItem(key, JSON.stringify(data));
};
var getItemAsync = async (storage, key) => {
	const value = await storage.getItem(key);
	if (!value) return null;
	try {
		return JSON.parse(value);
	} catch (_a) {
		return value;
	}
};
var removeItemAsync = async (storage, key) => {
	await storage.removeItem(key);
};
/**
* A deferred represents some asynchronous work that is not yet finished, which
* may or may not culminate in a value.
* Taken from: https://github.com/mike-north/types/blob/master/src/async.ts
*/
var Deferred = class Deferred {
	constructor() {
		this.promise = new Deferred.promiseConstructor((res, rej) => {
			this.resolve = res;
			this.reject = rej;
		});
	}
};
Deferred.promiseConstructor = Promise;
function decodeJWT(token) {
	const parts = token.split(".");
	if (parts.length !== 3) throw new AuthInvalidJwtError("Invalid JWT structure");
	for (let i = 0; i < parts.length; i++) if (!BASE64URL_REGEX.test(parts[i])) throw new AuthInvalidJwtError("JWT not in base64url format");
	return {
		header: JSON.parse(stringFromBase64URL(parts[0])),
		payload: JSON.parse(stringFromBase64URL(parts[1])),
		signature: base64UrlToUint8Array(parts[2]),
		raw: {
			header: parts[0],
			payload: parts[1]
		}
	};
}
/**
* Creates a promise that resolves to null after some time.
*/
async function sleep(time) {
	return await new Promise((accept) => {
		setTimeout(() => accept(null), time);
	});
}
/**
* Converts the provided async function into a retryable function. Each result
* or thrown error is sent to the isRetryable function which should return true
* if the function should run again.
*/
function retryable(fn, isRetryable) {
	return new Promise((accept, reject) => {
		(async () => {
			for (let attempt = 0; attempt < Infinity; attempt++) try {
				const result = await fn(attempt);
				if (!isRetryable(attempt, null, result)) {
					accept(result);
					return;
				}
			} catch (e) {
				if (!isRetryable(attempt, e)) {
					reject(e);
					return;
				}
			}
		})();
	});
}
function dec2hex(dec) {
	return ("0" + dec.toString(16)).substr(-2);
}
function generatePKCEVerifier() {
	const verifierLength = 56;
	const array = new Uint32Array(verifierLength);
	if (typeof crypto === "undefined") {
		const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
		const charSetLen = 66;
		let verifier = "";
		for (let i = 0; i < verifierLength; i++) verifier += charSet.charAt(Math.floor(Math.random() * charSetLen));
		return verifier;
	}
	crypto.getRandomValues(array);
	return Array.from(array, dec2hex).join("");
}
async function sha256(randomString) {
	const encodedData = new TextEncoder().encode(randomString);
	const hash = await crypto.subtle.digest("SHA-256", encodedData);
	const bytes = new Uint8Array(hash);
	return Array.from(bytes).map((c) => String.fromCharCode(c)).join("");
}
async function generatePKCEChallenge(verifier) {
	if (!(typeof crypto !== "undefined" && typeof crypto.subtle !== "undefined" && typeof TextEncoder !== "undefined")) {
		console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.");
		return verifier;
	}
	const hashed = await sha256(verifier);
	return btoa(hashed).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function getCodeChallengeAndMethod(storage, storageKey, isPasswordRecovery = false) {
	const codeVerifier = generatePKCEVerifier();
	let storedCodeVerifier = codeVerifier;
	if (isPasswordRecovery) storedCodeVerifier += "/PASSWORD_RECOVERY";
	await setItemAsync(storage, `${storageKey}-code-verifier`, storedCodeVerifier);
	const codeChallenge = await generatePKCEChallenge(codeVerifier);
	return [codeChallenge, codeVerifier === codeChallenge ? "plain" : "s256"];
}
/** Parses the API version which is 2YYY-MM-DD. */
var API_VERSION_REGEX = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
function parseResponseAPIVersion(response) {
	const apiVersion = response.headers.get(API_VERSION_HEADER_NAME);
	if (!apiVersion) return null;
	if (!apiVersion.match(API_VERSION_REGEX)) return null;
	try {
		return /* @__PURE__ */ new Date(`${apiVersion}T00:00:00.0Z`);
	} catch (e) {
		return null;
	}
}
function validateExp(exp) {
	if (!exp) throw new Error("Missing exp claim");
	if (exp <= Math.floor(Date.now() / 1e3)) throw new Error("JWT has expired");
}
function getAlgorithm(alg) {
	switch (alg) {
		case "RS256": return {
			name: "RSASSA-PKCS1-v1_5",
			hash: { name: "SHA-256" }
		};
		case "ES256": return {
			name: "ECDSA",
			namedCurve: "P-256",
			hash: { name: "SHA-256" }
		};
		default: throw new Error("Invalid alg claim");
	}
}
var UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
function validateUUID(str) {
	if (!UUID_REGEX.test(str)) throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not");
}
function userNotAvailableProxy() {
	return new Proxy({}, {
		get: (target, prop) => {
			if (prop === "__isUserNotAvailableProxy") return true;
			if (typeof prop === "symbol") {
				const sProp = prop.toString();
				if (sProp === "Symbol(Symbol.toPrimitive)" || sProp === "Symbol(Symbol.toStringTag)" || sProp === "Symbol(util.inspect.custom)") return;
			}
			throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${prop}" property of the session object is not supported. Please use getUser() instead.`);
		},
		set: (_target, prop) => {
			throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${prop}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
		},
		deleteProperty: (_target, prop) => {
			throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${prop}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
		}
	});
}
/**
* Creates a proxy around a user object that warns when properties are accessed on the server.
* This is used to alert developers that using user data from getSession() on the server is insecure.
*
* @param user The actual user object to wrap
* @param suppressWarningRef An object with a 'value' property that controls warning suppression
* @returns A proxied user object that warns on property access
*/
function insecureUserWarningProxy(user, suppressWarningRef) {
	return new Proxy(user, { get: (target, prop, receiver) => {
		if (prop === "__isInsecureUserWarningProxy") return true;
		if (typeof prop === "symbol") {
			const sProp = prop.toString();
			if (sProp === "Symbol(Symbol.toPrimitive)" || sProp === "Symbol(Symbol.toStringTag)" || sProp === "Symbol(util.inspect.custom)" || sProp === "Symbol(nodejs.util.inspect.custom)") return Reflect.get(target, prop, receiver);
		}
		if (!suppressWarningRef.value && typeof prop === "string") {
			console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.");
			suppressWarningRef.value = true;
		}
		return Reflect.get(target, prop, receiver);
	} });
}
/**
* Deep clones a JSON-serializable object using JSON.parse(JSON.stringify(obj)).
* Note: Only works for JSON-safe data.
*/
function deepClone(obj) {
	return JSON.parse(JSON.stringify(obj));
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+auth-js@2.99.2/node_modules/@supabase/auth-js/dist/module/lib/fetch.js
var _getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
var NETWORK_ERROR_CODES = [
	502,
	503,
	504
];
async function handleError(error) {
	var _a;
	if (!looksLikeFetchResponse(error)) throw new AuthRetryableFetchError(_getErrorMessage(error), 0);
	if (NETWORK_ERROR_CODES.includes(error.status)) throw new AuthRetryableFetchError(_getErrorMessage(error), error.status);
	let data;
	try {
		data = await error.json();
	} catch (e) {
		throw new AuthUnknownError(_getErrorMessage(e), e);
	}
	let errorCode = void 0;
	const responseAPIVersion = parseResponseAPIVersion(error);
	if (responseAPIVersion && responseAPIVersion.getTime() >= API_VERSIONS["2024-01-01"].timestamp && typeof data === "object" && data && typeof data.code === "string") errorCode = data.code;
	else if (typeof data === "object" && data && typeof data.error_code === "string") errorCode = data.error_code;
	if (!errorCode) {
		if (typeof data === "object" && data && typeof data.weak_password === "object" && data.weak_password && Array.isArray(data.weak_password.reasons) && data.weak_password.reasons.length && data.weak_password.reasons.reduce((a, i) => a && typeof i === "string", true)) throw new AuthWeakPasswordError(_getErrorMessage(data), error.status, data.weak_password.reasons);
	} else if (errorCode === "weak_password") throw new AuthWeakPasswordError(_getErrorMessage(data), error.status, ((_a = data.weak_password) === null || _a === void 0 ? void 0 : _a.reasons) || []);
	else if (errorCode === "session_not_found") throw new AuthSessionMissingError();
	throw new AuthApiError(_getErrorMessage(data), error.status || 500, errorCode);
}
var _getRequestParams = (method, options, parameters, body) => {
	const params = {
		method,
		headers: (options === null || options === void 0 ? void 0 : options.headers) || {}
	};
	if (method === "GET") return params;
	params.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, options === null || options === void 0 ? void 0 : options.headers);
	params.body = JSON.stringify(body);
	return Object.assign(Object.assign({}, params), parameters);
};
async function _request(fetcher, method, url, options) {
	var _a;
	const headers = Object.assign({}, options === null || options === void 0 ? void 0 : options.headers);
	if (!headers["X-Supabase-Api-Version"]) headers[API_VERSION_HEADER_NAME] = API_VERSIONS["2024-01-01"].name;
	if (options === null || options === void 0 ? void 0 : options.jwt) headers["Authorization"] = `Bearer ${options.jwt}`;
	const qs = (_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {};
	if (options === null || options === void 0 ? void 0 : options.redirectTo) qs["redirect_to"] = options.redirectTo;
	const data = await _handleRequest(fetcher, method, url + (Object.keys(qs).length ? "?" + new URLSearchParams(qs).toString() : ""), {
		headers,
		noResolveJson: options === null || options === void 0 ? void 0 : options.noResolveJson
	}, {}, options === null || options === void 0 ? void 0 : options.body);
	return (options === null || options === void 0 ? void 0 : options.xform) ? options === null || options === void 0 ? void 0 : options.xform(data) : {
		data: Object.assign({}, data),
		error: null
	};
}
async function _handleRequest(fetcher, method, url, options, parameters, body) {
	const requestParams = _getRequestParams(method, options, parameters, body);
	let result;
	try {
		result = await fetcher(url, Object.assign({}, requestParams));
	} catch (e) {
		console.error(e);
		throw new AuthRetryableFetchError(_getErrorMessage(e), 0);
	}
	if (!result.ok) await handleError(result);
	if (options === null || options === void 0 ? void 0 : options.noResolveJson) return result;
	try {
		return await result.json();
	} catch (e) {
		await handleError(e);
	}
}
function _sessionResponse(data) {
	var _a;
	let session = null;
	if (hasSession(data)) {
		session = Object.assign({}, data);
		if (!data.expires_at) session.expires_at = expiresAt(data.expires_in);
	}
	const user = (_a = data.user) !== null && _a !== void 0 ? _a : data;
	return {
		data: {
			session,
			user
		},
		error: null
	};
}
function _sessionResponsePassword(data) {
	const response = _sessionResponse(data);
	if (!response.error && data.weak_password && typeof data.weak_password === "object" && Array.isArray(data.weak_password.reasons) && data.weak_password.reasons.length && data.weak_password.message && typeof data.weak_password.message === "string" && data.weak_password.reasons.reduce((a, i) => a && typeof i === "string", true)) response.data.weak_password = data.weak_password;
	return response;
}
function _userResponse(data) {
	var _a;
	return {
		data: { user: (_a = data.user) !== null && _a !== void 0 ? _a : data },
		error: null
	};
}
function _ssoResponse(data) {
	return {
		data,
		error: null
	};
}
function _generateLinkResponse(data) {
	const { action_link, email_otp, hashed_token, redirect_to, verification_type } = data, rest = __rest(data, [
		"action_link",
		"email_otp",
		"hashed_token",
		"redirect_to",
		"verification_type"
	]);
	return {
		data: {
			properties: {
				action_link,
				email_otp,
				hashed_token,
				redirect_to,
				verification_type
			},
			user: Object.assign({}, rest)
		},
		error: null
	};
}
function _noResolveJsonResponse(data) {
	return data;
}
/**
* hasSession checks if the response object contains a valid session
* @param data A response object
* @returns true if a session is in the response
*/
function hasSession(data) {
	return data.access_token && data.refresh_token && data.expires_in;
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+auth-js@2.99.2/node_modules/@supabase/auth-js/dist/module/lib/types.js
var SIGN_OUT_SCOPES = [
	"global",
	"local",
	"others"
];
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+auth-js@2.99.2/node_modules/@supabase/auth-js/dist/module/GoTrueAdminApi.js
var GoTrueAdminApi = class {
	/**
	* Creates an admin API client that can be used to manage users and OAuth clients.
	*
	* @example
	* ```ts
	* import { GoTrueAdminApi } from '@supabase/auth-js'
	*
	* const admin = new GoTrueAdminApi({
	*   url: 'https://xyzcompany.supabase.co/auth/v1',
	*   headers: { Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}` },
	* })
	* ```
	*/
	constructor({ url = "", headers = {}, fetch }) {
		this.url = url;
		this.headers = headers;
		this.fetch = resolveFetch$1(fetch);
		this.mfa = {
			listFactors: this._listFactors.bind(this),
			deleteFactor: this._deleteFactor.bind(this)
		};
		this.oauth = {
			listClients: this._listOAuthClients.bind(this),
			createClient: this._createOAuthClient.bind(this),
			getClient: this._getOAuthClient.bind(this),
			updateClient: this._updateOAuthClient.bind(this),
			deleteClient: this._deleteOAuthClient.bind(this),
			regenerateClientSecret: this._regenerateOAuthClientSecret.bind(this)
		};
		this.customProviders = {
			listProviders: this._listCustomProviders.bind(this),
			createProvider: this._createCustomProvider.bind(this),
			getProvider: this._getCustomProvider.bind(this),
			updateProvider: this._updateCustomProvider.bind(this),
			deleteProvider: this._deleteCustomProvider.bind(this)
		};
	}
	/**
	* Removes a logged-in session.
	* @param jwt A valid, logged-in JWT.
	* @param scope The logout sope.
	*/
	async signOut(jwt, scope = SIGN_OUT_SCOPES[0]) {
		if (SIGN_OUT_SCOPES.indexOf(scope) < 0) throw new Error(`@supabase/auth-js: Parameter scope must be one of ${SIGN_OUT_SCOPES.join(", ")}`);
		try {
			await _request(this.fetch, "POST", `${this.url}/logout?scope=${scope}`, {
				headers: this.headers,
				jwt,
				noResolveJson: true
			});
			return {
				data: null,
				error: null
			};
		} catch (error) {
			if (isAuthError(error)) return {
				data: null,
				error
			};
			throw error;
		}
	}
	/**
	* Sends an invite link to an email address.
	* @param email The email address of the user.
	* @param options Additional options to be included when inviting.
	*/
	async inviteUserByEmail(email, options = {}) {
		try {
			return await _request(this.fetch, "POST", `${this.url}/invite`, {
				body: {
					email,
					data: options.data
				},
				headers: this.headers,
				redirectTo: options.redirectTo,
				xform: _userResponse
			});
		} catch (error) {
			if (isAuthError(error)) return {
				data: { user: null },
				error
			};
			throw error;
		}
	}
	/**
	* Generates email links and OTPs to be sent via a custom email provider.
	* @param email The user's email.
	* @param options.password User password. For signup only.
	* @param options.data Optional user metadata. For signup only.
	* @param options.redirectTo The redirect url which should be appended to the generated link
	*/
	async generateLink(params) {
		try {
			const { options } = params, rest = __rest(params, ["options"]);
			const body = Object.assign(Object.assign({}, rest), options);
			if ("newEmail" in rest) {
				body.new_email = rest === null || rest === void 0 ? void 0 : rest.newEmail;
				delete body["newEmail"];
			}
			return await _request(this.fetch, "POST", `${this.url}/admin/generate_link`, {
				body,
				headers: this.headers,
				xform: _generateLinkResponse,
				redirectTo: options === null || options === void 0 ? void 0 : options.redirectTo
			});
		} catch (error) {
			if (isAuthError(error)) return {
				data: {
					properties: null,
					user: null
				},
				error
			};
			throw error;
		}
	}
	/**
	* Creates a new user.
	* This function should only be called on a server. Never expose your `service_role` key in the browser.
	*/
	async createUser(attributes) {
		try {
			return await _request(this.fetch, "POST", `${this.url}/admin/users`, {
				body: attributes,
				headers: this.headers,
				xform: _userResponse
			});
		} catch (error) {
			if (isAuthError(error)) return {
				data: { user: null },
				error
			};
			throw error;
		}
	}
	/**
	* Get a list of users.
	*
	* This function should only be called on a server. Never expose your `service_role` key in the browser.
	* @param params An object which supports `page` and `perPage` as numbers, to alter the paginated results.
	*/
	async listUsers(params) {
		var _a, _b, _c, _d, _e, _f, _g;
		try {
			const pagination = {
				nextPage: null,
				lastPage: 0,
				total: 0
			};
			const response = await _request(this.fetch, "GET", `${this.url}/admin/users`, {
				headers: this.headers,
				noResolveJson: true,
				query: {
					page: (_b = (_a = params === null || params === void 0 ? void 0 : params.page) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "",
					per_page: (_d = (_c = params === null || params === void 0 ? void 0 : params.perPage) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""
				},
				xform: _noResolveJsonResponse
			});
			if (response.error) throw response.error;
			const users = await response.json();
			const total = (_e = response.headers.get("x-total-count")) !== null && _e !== void 0 ? _e : 0;
			const links = (_g = (_f = response.headers.get("link")) === null || _f === void 0 ? void 0 : _f.split(",")) !== null && _g !== void 0 ? _g : [];
			if (links.length > 0) {
				links.forEach((link) => {
					const page = parseInt(link.split(";")[0].split("=")[1].substring(0, 1));
					const rel = JSON.parse(link.split(";")[1].split("=")[1]);
					pagination[`${rel}Page`] = page;
				});
				pagination.total = parseInt(total);
			}
			return {
				data: Object.assign(Object.assign({}, users), pagination),
				error: null
			};
		} catch (error) {
			if (isAuthError(error)) return {
				data: { users: [] },
				error
			};
			throw error;
		}
	}
	/**
	* Get user by id.
	*
	* @param uid The user's unique identifier
	*
	* This function should only be called on a server. Never expose your `service_role` key in the browser.
	*/
	async getUserById(uid) {
		validateUUID(uid);
		try {
			return await _request(this.fetch, "GET", `${this.url}/admin/users/${uid}`, {
				headers: this.headers,
				xform: _userResponse
			});
		} catch (error) {
			if (isAuthError(error)) return {
				data: { user: null },
				error
			};
			throw error;
		}
	}
	/**
	* Updates the user data. Changes are applied directly without confirmation flows.
	*
	* @param uid The user's unique identifier
	* @param attributes The data you want to update.
	*
	* This function should only be called on a server. Never expose your `service_role` key in the browser.
	*
	* @remarks
	* **Important:** This is a server-side operation and does **not** trigger client-side
	* `onAuthStateChange` listeners. The admin API has no connection to client state.
	*
	* To sync changes to the client after calling this method:
	* 1. On the client, call `supabase.auth.refreshSession()` to fetch the updated user data
	* 2. This will trigger the `TOKEN_REFRESHED` event and notify all listeners
	*
	* @example
	* ```typescript
	* // Server-side (Edge Function)
	* const { data, error } = await supabase.auth.admin.updateUserById(
	*   userId,
	*   { user_metadata: { preferences: { theme: 'dark' } } }
	* )
	*
	* // Client-side (to sync the changes)
	* const { data, error } = await supabase.auth.refreshSession()
	* // onAuthStateChange listeners will now be notified with updated user
	* ```
	*
	* @see {@link GoTrueClient.refreshSession} for syncing admin changes to the client
	* @see {@link GoTrueClient.updateUser} for client-side user updates (triggers listeners automatically)
	*/
	async updateUserById(uid, attributes) {
		validateUUID(uid);
		try {
			return await _request(this.fetch, "PUT", `${this.url}/admin/users/${uid}`, {
				body: attributes,
				headers: this.headers,
				xform: _userResponse
			});
		} catch (error) {
			if (isAuthError(error)) return {
				data: { user: null },
				error
			};
			throw error;
		}
	}
	/**
	* Delete a user. Requires a `service_role` key.
	*
	* @param id The user id you want to remove.
	* @param shouldSoftDelete If true, then the user will be soft-deleted from the auth schema. Soft deletion allows user identification from the hashed user ID but is not reversible.
	* Defaults to false for backward compatibility.
	*
	* This function should only be called on a server. Never expose your `service_role` key in the browser.
	*/
	async deleteUser(id, shouldSoftDelete = false) {
		validateUUID(id);
		try {
			return await _request(this.fetch, "DELETE", `${this.url}/admin/users/${id}`, {
				headers: this.headers,
				body: { should_soft_delete: shouldSoftDelete },
				xform: _userResponse
			});
		} catch (error) {
			if (isAuthError(error)) return {
				data: { user: null },
				error
			};
			throw error;
		}
	}
	async _listFactors(params) {
		validateUUID(params.userId);
		try {
			const { data, error } = await _request(this.fetch, "GET", `${this.url}/admin/users/${params.userId}/factors`, {
				headers: this.headers,
				xform: (factors) => {
					return {
						data: { factors },
						error: null
					};
				}
			});
			return {
				data,
				error
			};
		} catch (error) {
			if (isAuthError(error)) return {
				data: null,
				error
			};
			throw error;
		}
	}
	async _deleteFactor(params) {
		validateUUID(params.userId);
		validateUUID(params.id);
		try {
			return {
				data: await _request(this.fetch, "DELETE", `${this.url}/admin/users/${params.userId}/factors/${params.id}`, { headers: this.headers }),
				error: null
			};
		} catch (error) {
			if (isAuthError(error)) return {
				data: null,
				error
			};
			throw error;
		}
	}
	/**
	* Lists all OAuth clients with optional pagination.
	* Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
	*
	* This function should only be called on a server. Never expose your `service_role` key in the browser.
	*/
	async _listOAuthClients(params) {
		var _a, _b, _c, _d, _e, _f, _g;
		try {
			const pagination = {
				nextPage: null,
				lastPage: 0,
				total: 0
			};
			const response = await _request(this.fetch, "GET", `${this.url}/admin/oauth/clients`, {
				headers: this.headers,
				noResolveJson: true,
				query: {
					page: (_b = (_a = params === null || params === void 0 ? void 0 : params.page) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "",
					per_page: (_d = (_c = params === null || params === void 0 ? void 0 : params.perPage) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""
				},
				xform: _noResolveJsonResponse
			});
			if (response.error) throw response.error;
			const clients = await response.json();
			const total = (_e = response.headers.get("x-total-count")) !== null && _e !== void 0 ? _e : 0;
			const links = (_g = (_f = response.headers.get("link")) === null || _f === void 0 ? void 0 : _f.split(",")) !== null && _g !== void 0 ? _g : [];
			if (links.length > 0) {
				links.forEach((link) => {
					const page = parseInt(link.split(";")[0].split("=")[1].substring(0, 1));
					const rel = JSON.parse(link.split(";")[1].split("=")[1]);
					pagination[`${rel}Page`] = page;
				});
				pagination.total = parseInt(total);
			}
			return {
				data: Object.assign(Object.assign({}, clients), pagination),
				error: null
			};
		} catch (error) {
			if (isAuthError(error)) return {
				data: { clients: [] },
				error
			};
			throw error;
		}
	}
	/**
	* Creates a new OAuth client.
	* Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
	*
	* This function should only be called on a server. Never expose your `service_role` key in the browser.
	*/
	async _createOAuthClient(params) {
		try {
			return await _request(this.fetch, "POST", `${this.url}/admin/oauth/clients`, {
				body: params,
				headers: this.headers,
				xform: (client) => {
					return {
						data: client,
						error: null
					};
				}
			});
		} catch (error) {
			if (isAuthError(error)) return {
				data: null,
				error
			};
			throw error;
		}
	}
	/**
	* Gets details of a specific OAuth client.
	* Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
	*
	* This function should only be called on a server. Never expose your `service_role` key in the browser.
	*/
	async _getOAuthClient(clientId) {
		try {
			return await _request(this.fetch, "GET", `${this.url}/admin/oauth/clients/${clientId}`, {
				headers: this.headers,
				xform: (client) => {
					return {
						data: client,
						error: null
					};
				}
			});
		} catch (error) {
			if (isAuthError(error)) return {
				data: null,
				error
			};
			throw error;
		}
	}
	/**
	* Updates an existing OAuth client.
	* Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
	*
	* This function should only be called on a server. Never expose your `service_role` key in the browser.
	*/
	async _updateOAuthClient(clientId, params) {
		try {
			return await _request(this.fetch, "PUT", `${this.url}/admin/oauth/clients/${clientId}`, {
				body: params,
				headers: this.headers,
				xform: (client) => {
					return {
						data: client,
						error: null
					};
				}
			});
		} catch (error) {
			if (isAuthError(error)) return {
				data: null,
				error
			};
			throw error;
		}
	}
	/**
	* Deletes an OAuth client.
	* Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
	*
	* This function should only be called on a server. Never expose your `service_role` key in the browser.
	*/
	async _deleteOAuthClient(clientId) {
		try {
			await _request(this.fetch, "DELETE", `${this.url}/admin/oauth/clients/${clientId}`, {
				headers: this.headers,
				noResolveJson: true
			});
			return {
				data: null,
				error: null
			};
		} catch (error) {
			if (isAuthError(error)) return {
				data: null,
				error
			};
			throw error;
		}
	}
	/**
	* Regenerates the secret for an OAuth client.
	* Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
	*
	* This function should only be called on a server. Never expose your `service_role` key in the browser.
	*/
	async _regenerateOAuthClientSecret(clientId) {
		try {
			return await _request(this.fetch, "POST", `${this.url}/admin/oauth/clients/${clientId}/regenerate_secret`, {
				headers: this.headers,
				xform: (client) => {
					return {
						data: client,
						error: null
					};
				}
			});
		} catch (error) {
			if (isAuthError(error)) return {
				data: null,
				error
			};
			throw error;
		}
	}
	/**
	* Lists all custom providers with optional type filter.
	*
	* This function should only be called on a server. Never expose your `service_role` key in the browser.
	*/
	async _listCustomProviders(params) {
		try {
			const query = {};
			if (params === null || params === void 0 ? void 0 : params.type) query.type = params.type;
			return await _request(this.fetch, "GET", `${this.url}/admin/custom-providers`, {
				headers: this.headers,
				query,
				xform: (data) => {
					var _a;
					return {
						data: { providers: (_a = data === null || data === void 0 ? void 0 : data.providers) !== null && _a !== void 0 ? _a : [] },
						error: null
					};
				}
			});
		} catch (error) {
			if (isAuthError(error)) return {
				data: { providers: [] },
				error
			};
			throw error;
		}
	}
	/**
	* Creates a new custom OIDC/OAuth provider.
	*
	* For OIDC providers, the server fetches and validates the OpenID Connect discovery document
	* from the issuer's well-known endpoint (or the provided `discovery_url`) at creation time.
	* This may return a validation error (`error_code: "validation_failed"`) if the discovery
	* document is unreachable, not valid JSON, missing required fields, or if the issuer
	* in the document does not match the expected issuer.
	*
	* This function should only be called on a server. Never expose your `service_role` key in the browser.
	*/
	async _createCustomProvider(params) {
		try {
			return await _request(this.fetch, "POST", `${this.url}/admin/custom-providers`, {
				body: params,
				headers: this.headers,
				xform: (provider) => {
					return {
						data: provider,
						error: null
					};
				}
			});
		} catch (error) {
			if (isAuthError(error)) return {
				data: null,
				error
			};
			throw error;
		}
	}
	/**
	* Gets details of a specific custom provider by identifier.
	*
	* This function should only be called on a server. Never expose your `service_role` key in the browser.
	*/
	async _getCustomProvider(identifier) {
		try {
			return await _request(this.fetch, "GET", `${this.url}/admin/custom-providers/${identifier}`, {
				headers: this.headers,
				xform: (provider) => {
					return {
						data: provider,
						error: null
					};
				}
			});
		} catch (error) {
			if (isAuthError(error)) return {
				data: null,
				error
			};
			throw error;
		}
	}
	/**
	* Updates an existing custom provider.
	*
	* When `issuer` or `discovery_url` is changed on an OIDC provider, the server re-fetches and
	* validates the discovery document before persisting. This may return a validation error
	* (`error_code: "validation_failed"`) if the discovery document is unreachable, invalid, or
	* the issuer does not match.
	*
	* This function should only be called on a server. Never expose your `service_role` key in the browser.
	*/
	async _updateCustomProvider(identifier, params) {
		try {
			return await _request(this.fetch, "PUT", `${this.url}/admin/custom-providers/${identifier}`, {
				body: params,
				headers: this.headers,
				xform: (provider) => {
					return {
						data: provider,
						error: null
					};
				}
			});
		} catch (error) {
			if (isAuthError(error)) return {
				data: null,
				error
			};
			throw error;
		}
	}
	/**
	* Deletes a custom provider.
	*
	* This function should only be called on a server. Never expose your `service_role` key in the browser.
	*/
	async _deleteCustomProvider(identifier) {
		try {
			await _request(this.fetch, "DELETE", `${this.url}/admin/custom-providers/${identifier}`, {
				headers: this.headers,
				noResolveJson: true
			});
			return {
				data: null,
				error: null
			};
		} catch (error) {
			if (isAuthError(error)) return {
				data: null,
				error
			};
			throw error;
		}
	}
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+auth-js@2.99.2/node_modules/@supabase/auth-js/dist/module/lib/local-storage.js
/**
* Returns a localStorage-like object that stores the key-value pairs in
* memory.
*/
function memoryLocalStorageAdapter(store = {}) {
	return {
		getItem: (key) => {
			return store[key] || null;
		},
		setItem: (key, value) => {
			store[key] = value;
		},
		removeItem: (key) => {
			delete store[key];
		}
	};
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+auth-js@2.99.2/node_modules/@supabase/auth-js/dist/module/lib/locks.js
/**
* @experimental
*/
var internals = { debug: !!(globalThis && supportsLocalStorage() && globalThis.localStorage && globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true") };
/**
* An error thrown when a lock cannot be acquired after some amount of time.
*
* Use the {@link #isAcquireTimeout} property instead of checking with `instanceof`.
*
* @example
* ```ts
* import { LockAcquireTimeoutError } from '@supabase/auth-js'
*
* class CustomLockError extends LockAcquireTimeoutError {
*   constructor() {
*     super('Lock timed out')
*   }
* }
* ```
*/
var LockAcquireTimeoutError = class extends Error {
	constructor(message) {
		super(message);
		this.isAcquireTimeout = true;
	}
};
/**
* Error thrown when the browser Navigator Lock API fails to acquire a lock.
*
* @example
* ```ts
* import { NavigatorLockAcquireTimeoutError } from '@supabase/auth-js'
*
* throw new NavigatorLockAcquireTimeoutError('Lock timed out')
* ```
*/
var NavigatorLockAcquireTimeoutError = class extends LockAcquireTimeoutError {};
/**
* Implements a global exclusive lock using the Navigator LockManager API. It
* is available on all browsers released after 2022-03-15 with Safari being the
* last one to release support. If the API is not available, this function will
* throw. Make sure you check availablility before configuring {@link
* GoTrueClient}.
*
* You can turn on debugging by setting the `supabase.gotrue-js.locks.debug`
* local storage item to `true`.
*
* Internals:
*
* Since the LockManager API does not preserve stack traces for the async
* function passed in the `request` method, a trick is used where acquiring the
* lock releases a previously started promise to run the operation in the `fn`
* function. The lock waits for that promise to finish (with or without error),
* while the function will finally wait for the result anyway.
*
* @param name Name of the lock to be acquired.
* @param acquireTimeout If negative, no timeout. If 0 an error is thrown if
*                       the lock can't be acquired without waiting. If positive, the lock acquire
*                       will time out after so many milliseconds. An error is
*                       a timeout if it has `isAcquireTimeout` set to true.
* @param fn The operation to run once the lock is acquired.
* @example
* ```ts
* await navigatorLock('sync-user', 1000, async () => {
*   await refreshSession()
* })
* ```
*/
async function navigatorLock(name, acquireTimeout, fn) {
	if (internals.debug) console.log("@supabase/gotrue-js: navigatorLock: acquire lock", name, acquireTimeout);
	const abortController = new globalThis.AbortController();
	if (acquireTimeout > 0) setTimeout(() => {
		abortController.abort();
		if (internals.debug) console.log("@supabase/gotrue-js: navigatorLock acquire timed out", name);
	}, acquireTimeout);
	await Promise.resolve();
	try {
		return await globalThis.navigator.locks.request(name, acquireTimeout === 0 ? {
			mode: "exclusive",
			ifAvailable: true
		} : {
			mode: "exclusive",
			signal: abortController.signal
		}, async (lock) => {
			if (lock) {
				if (internals.debug) console.log("@supabase/gotrue-js: navigatorLock: acquired", name, lock.name);
				try {
					return await fn();
				} finally {
					if (internals.debug) console.log("@supabase/gotrue-js: navigatorLock: released", name, lock.name);
				}
			} else if (acquireTimeout === 0) {
				if (internals.debug) console.log("@supabase/gotrue-js: navigatorLock: not immediately available", name);
				throw new NavigatorLockAcquireTimeoutError(`Acquiring an exclusive Navigator LockManager lock "${name}" immediately failed`);
			} else {
				if (internals.debug) try {
					const result = await globalThis.navigator.locks.query();
					console.log("@supabase/gotrue-js: Navigator LockManager state", JSON.stringify(result, null, "  "));
				} catch (e) {
					console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state", e);
				}
				console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request");
				return await fn();
			}
		});
	} catch (e) {
		if ((e === null || e === void 0 ? void 0 : e.name) === "AbortError" && acquireTimeout > 0) {
			if (internals.debug) console.log("@supabase/gotrue-js: navigatorLock: acquire timeout, recovering by stealing lock", name);
			console.warn(`@supabase/gotrue-js: Lock "${name}" was not released within ${acquireTimeout}ms. This may indicate an orphaned lock from a component unmount (e.g., React Strict Mode). Forcefully acquiring the lock to recover.`);
			return await Promise.resolve().then(() => globalThis.navigator.locks.request(name, {
				mode: "exclusive",
				steal: true
			}, async (lock) => {
				if (lock) {
					if (internals.debug) console.log("@supabase/gotrue-js: navigatorLock: recovered (stolen)", name, lock.name);
					try {
						return await fn();
					} finally {
						if (internals.debug) console.log("@supabase/gotrue-js: navigatorLock: released (stolen)", name, lock.name);
					}
				} else {
					console.warn("@supabase/gotrue-js: Navigator LockManager returned null lock even with steal: true");
					return await fn();
				}
			}));
		}
		throw e;
	}
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+auth-js@2.99.2/node_modules/@supabase/auth-js/dist/module/lib/polyfills.js
/**
* https://mathiasbynens.be/notes/globalthis
*/
function polyfillGlobalThis() {
	if (typeof globalThis === "object") return;
	try {
		Object.defineProperty(Object.prototype, "__magic__", {
			get: function() {
				return this;
			},
			configurable: true
		});
		__magic__.globalThis = __magic__;
		delete Object.prototype.__magic__;
	} catch (e) {
		if (typeof self !== "undefined") self.globalThis = self;
	}
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+auth-js@2.99.2/node_modules/@supabase/auth-js/dist/module/lib/web3/ethereum.js
function getAddress(address) {
	if (!/^0x[a-fA-F0-9]{40}$/.test(address)) throw new Error(`@supabase/auth-js: Address "${address}" is invalid.`);
	return address.toLowerCase();
}
function fromHex(hex) {
	return parseInt(hex, 16);
}
function toHex(value) {
	const bytes = new TextEncoder().encode(value);
	return "0x" + Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
/**
* Creates EIP-4361 formatted message.
*/
function createSiweMessage(parameters) {
	var _a;
	const { chainId, domain, expirationTime, issuedAt = /* @__PURE__ */ new Date(), nonce, notBefore, requestId, resources, scheme, uri, version } = parameters;
	if (!Number.isInteger(chainId)) throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${chainId}`);
	if (!domain) throw new Error(`@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.`);
	if (nonce && nonce.length < 8) throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${nonce}`);
	if (!uri) throw new Error(`@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.`);
	if (version !== "1") throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${version}`);
	if ((_a = parameters.statement) === null || _a === void 0 ? void 0 : _a.includes("\n")) throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${parameters.statement}`);
	const address = getAddress(parameters.address);
	const prefix = `${scheme ? `${scheme}://${domain}` : domain} wants you to sign in with your Ethereum account:\n${address}\n\n${parameters.statement ? `${parameters.statement}\n` : ""}`;
	let suffix = `URI: ${uri}\nVersion: ${version}\nChain ID: ${chainId}${nonce ? `\nNonce: ${nonce}` : ""}\nIssued At: ${issuedAt.toISOString()}`;
	if (expirationTime) suffix += `\nExpiration Time: ${expirationTime.toISOString()}`;
	if (notBefore) suffix += `\nNot Before: ${notBefore.toISOString()}`;
	if (requestId) suffix += `\nRequest ID: ${requestId}`;
	if (resources) {
		let content = "\nResources:";
		for (const resource of resources) {
			if (!resource || typeof resource !== "string") throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${resource}`);
			content += `\n- ${resource}`;
		}
		suffix += content;
	}
	return `${prefix}\n${suffix}`;
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+auth-js@2.99.2/node_modules/@supabase/auth-js/dist/module/lib/webauthn.errors.js
/**
* A custom Error used to return a more nuanced error detailing _why_ one of the eight documented
* errors in the spec was raised after calling `navigator.credentials.create()` or
* `navigator.credentials.get()`:
*
* - `AbortError`
* - `ConstraintError`
* - `InvalidStateError`
* - `NotAllowedError`
* - `NotSupportedError`
* - `SecurityError`
* - `TypeError`
* - `UnknownError`
*
* Error messages were determined through investigation of the spec to determine under which
* scenarios a given error would be raised.
*/
var WebAuthnError = class extends Error {
	constructor({ message, code, cause, name }) {
		var _a;
		super(message, { cause });
		this.__isWebAuthnError = true;
		this.name = (_a = name !== null && name !== void 0 ? name : cause instanceof Error ? cause.name : void 0) !== null && _a !== void 0 ? _a : "Unknown Error";
		this.code = code;
	}
};
/**
* Error class for unknown WebAuthn errors.
* Wraps unexpected errors that don't match known WebAuthn error conditions.
*/
var WebAuthnUnknownError = class extends WebAuthnError {
	constructor(message, originalError) {
		super({
			code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
			cause: originalError,
			message
		});
		this.name = "WebAuthnUnknownError";
		this.originalError = originalError;
	}
};
/**
* Attempt to intuit _why_ an error was raised after calling `navigator.credentials.create()`.
* Maps browser errors to specific WebAuthn error codes for better debugging.
* @param {Object} params - Error identification parameters
* @param {Error} params.error - The error thrown by the browser
* @param {CredentialCreationOptions} params.options - The options passed to credentials.create()
* @returns {WebAuthnError} A WebAuthnError with a specific error code
* @see {@link https://w3c.github.io/webauthn/#sctn-createCredential W3C WebAuthn Spec - Create Credential}
*/
function identifyRegistrationError({ error, options }) {
	var _a, _b, _c;
	const { publicKey } = options;
	if (!publicKey) throw Error("options was missing required publicKey property");
	if (error.name === "AbortError") {
		if (options.signal instanceof AbortSignal) return new WebAuthnError({
			message: "Registration ceremony was sent an abort signal",
			code: "ERROR_CEREMONY_ABORTED",
			cause: error
		});
	} else if (error.name === "ConstraintError") {
		if (((_a = publicKey.authenticatorSelection) === null || _a === void 0 ? void 0 : _a.requireResidentKey) === true) return new WebAuthnError({
			message: "Discoverable credentials were required but no available authenticator supported it",
			code: "ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",
			cause: error
		});
		else if (options.mediation === "conditional" && ((_b = publicKey.authenticatorSelection) === null || _b === void 0 ? void 0 : _b.userVerification) === "required") return new WebAuthnError({
			message: "User verification was required during automatic registration but it could not be performed",
			code: "ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",
			cause: error
		});
		else if (((_c = publicKey.authenticatorSelection) === null || _c === void 0 ? void 0 : _c.userVerification) === "required") return new WebAuthnError({
			message: "User verification was required but no available authenticator supported it",
			code: "ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",
			cause: error
		});
	} else if (error.name === "InvalidStateError") return new WebAuthnError({
		message: "The authenticator was previously registered",
		code: "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",
		cause: error
	});
	else if (error.name === "NotAllowedError")
 /**
	* Pass the error directly through. Platforms are overloading this error beyond what the spec
	* defines and we don't want to overwrite potentially useful error messages.
	*/
	return new WebAuthnError({
		message: error.message,
		code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
		cause: error
	});
	else if (error.name === "NotSupportedError") {
		if (publicKey.pubKeyCredParams.filter((param) => param.type === "public-key").length === 0) return new WebAuthnError({
			message: "No entry in pubKeyCredParams was of type \"public-key\"",
			code: "ERROR_MALFORMED_PUBKEYCREDPARAMS",
			cause: error
		});
		return new WebAuthnError({
			message: "No available authenticator supported any of the specified pubKeyCredParams algorithms",
			code: "ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",
			cause: error
		});
	} else if (error.name === "SecurityError") {
		const effectiveDomain = window.location.hostname;
		if (!isValidDomain(effectiveDomain)) return new WebAuthnError({
			message: `${window.location.hostname} is an invalid domain`,
			code: "ERROR_INVALID_DOMAIN",
			cause: error
		});
		else if (publicKey.rp.id !== effectiveDomain) return new WebAuthnError({
			message: `The RP ID "${publicKey.rp.id}" is invalid for this domain`,
			code: "ERROR_INVALID_RP_ID",
			cause: error
		});
	} else if (error.name === "TypeError") {
		if (publicKey.user.id.byteLength < 1 || publicKey.user.id.byteLength > 64) return new WebAuthnError({
			message: "User ID was not between 1 and 64 characters",
			code: "ERROR_INVALID_USER_ID_LENGTH",
			cause: error
		});
	} else if (error.name === "UnknownError") return new WebAuthnError({
		message: "The authenticator was unable to process the specified options, or could not create a new credential",
		code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
		cause: error
	});
	return new WebAuthnError({
		message: "a Non-Webauthn related error has occurred",
		code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
		cause: error
	});
}
/**
* Attempt to intuit _why_ an error was raised after calling `navigator.credentials.get()`.
* Maps browser errors to specific WebAuthn error codes for better debugging.
* @param {Object} params - Error identification parameters
* @param {Error} params.error - The error thrown by the browser
* @param {CredentialRequestOptions} params.options - The options passed to credentials.get()
* @returns {WebAuthnError} A WebAuthnError with a specific error code
* @see {@link https://w3c.github.io/webauthn/#sctn-getAssertion W3C WebAuthn Spec - Get Assertion}
*/
function identifyAuthenticationError({ error, options }) {
	const { publicKey } = options;
	if (!publicKey) throw Error("options was missing required publicKey property");
	if (error.name === "AbortError") {
		if (options.signal instanceof AbortSignal) return new WebAuthnError({
			message: "Authentication ceremony was sent an abort signal",
			code: "ERROR_CEREMONY_ABORTED",
			cause: error
		});
	} else if (error.name === "NotAllowedError")
 /**
	* Pass the error directly through. Platforms are overloading this error beyond what the spec
	* defines and we don't want to overwrite potentially useful error messages.
	*/
	return new WebAuthnError({
		message: error.message,
		code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
		cause: error
	});
	else if (error.name === "SecurityError") {
		const effectiveDomain = window.location.hostname;
		if (!isValidDomain(effectiveDomain)) return new WebAuthnError({
			message: `${window.location.hostname} is an invalid domain`,
			code: "ERROR_INVALID_DOMAIN",
			cause: error
		});
		else if (publicKey.rpId !== effectiveDomain) return new WebAuthnError({
			message: `The RP ID "${publicKey.rpId}" is invalid for this domain`,
			code: "ERROR_INVALID_RP_ID",
			cause: error
		});
	} else if (error.name === "UnknownError") return new WebAuthnError({
		message: "The authenticator was unable to process the specified options, or could not create a new assertion signature",
		code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
		cause: error
	});
	return new WebAuthnError({
		message: "a Non-Webauthn related error has occurred",
		code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
		cause: error
	});
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+auth-js@2.99.2/node_modules/@supabase/auth-js/dist/module/lib/webauthn.js
/**
* WebAuthn abort service to manage ceremony cancellation.
* Ensures only one WebAuthn ceremony is active at a time to prevent "operation already in progress" errors.
*
* @experimental This class is experimental and may change in future releases
* @see {@link https://w3c.github.io/webauthn/#sctn-automation-webdriver-capability W3C WebAuthn Spec - Aborting Ceremonies}
*/
var WebAuthnAbortService = class {
	/**
	* Create an abort signal for a new WebAuthn operation.
	* Automatically cancels any existing operation.
	*
	* @returns {AbortSignal} Signal to pass to navigator.credentials.create() or .get()
	* @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal MDN - AbortSignal}
	*/
	createNewAbortSignal() {
		if (this.controller) {
			const abortError = /* @__PURE__ */ new Error("Cancelling existing WebAuthn API call for new one");
			abortError.name = "AbortError";
			this.controller.abort(abortError);
		}
		const newController = new AbortController();
		this.controller = newController;
		return newController.signal;
	}
	/**
	* Manually cancel the current WebAuthn operation.
	* Useful for cleaning up when user cancels or navigates away.
	*
	* @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort MDN - AbortController.abort}
	*/
	cancelCeremony() {
		if (this.controller) {
			const abortError = /* @__PURE__ */ new Error("Manually cancelling existing WebAuthn API call");
			abortError.name = "AbortError";
			this.controller.abort(abortError);
			this.controller = void 0;
		}
	}
};
/**
* Singleton instance to ensure only one WebAuthn ceremony is active at a time.
* This prevents "operation already in progress" errors when retrying WebAuthn operations.
*
* @experimental This instance is experimental and may change in future releases
*/
var webAuthnAbortService = new WebAuthnAbortService();
/**
* Convert base64url encoded strings in WebAuthn credential creation options to ArrayBuffers
* as required by the WebAuthn browser API.
* Supports both native WebAuthn Level 3 parseCreationOptionsFromJSON and manual fallback.
*
* @param {ServerCredentialCreationOptions} options - JSON options from server with base64url encoded fields
* @returns {PublicKeyCredentialCreationOptionsFuture} Options ready for navigator.credentials.create()
* @see {@link https://w3c.github.io/webauthn/#sctn-parseCreationOptionsFromJSON W3C WebAuthn Spec - parseCreationOptionsFromJSON}
*/
function deserializeCredentialCreationOptions(options) {
	if (!options) throw new Error("Credential creation options are required");
	if (typeof PublicKeyCredential !== "undefined" && "parseCreationOptionsFromJSON" in PublicKeyCredential && typeof PublicKeyCredential.parseCreationOptionsFromJSON === "function") return PublicKeyCredential.parseCreationOptionsFromJSON(
		/** we assert the options here as typescript still doesn't know about future webauthn types */
		options
	);
	const { challenge: challengeStr, user: userOpts, excludeCredentials } = options, restOptions = __rest(options, [
		"challenge",
		"user",
		"excludeCredentials"
	]);
	const challenge = base64UrlToUint8Array(challengeStr).buffer;
	const user = Object.assign(Object.assign({}, userOpts), { id: base64UrlToUint8Array(userOpts.id).buffer });
	const result = Object.assign(Object.assign({}, restOptions), {
		challenge,
		user
	});
	if (excludeCredentials && excludeCredentials.length > 0) {
		result.excludeCredentials = new Array(excludeCredentials.length);
		for (let i = 0; i < excludeCredentials.length; i++) {
			const cred = excludeCredentials[i];
			result.excludeCredentials[i] = Object.assign(Object.assign({}, cred), {
				id: base64UrlToUint8Array(cred.id).buffer,
				type: cred.type || "public-key",
				transports: cred.transports
			});
		}
	}
	return result;
}
/**
* Convert base64url encoded strings in WebAuthn credential request options to ArrayBuffers
* as required by the WebAuthn browser API.
* Supports both native WebAuthn Level 3 parseRequestOptionsFromJSON and manual fallback.
*
* @param {ServerCredentialRequestOptions} options - JSON options from server with base64url encoded fields
* @returns {PublicKeyCredentialRequestOptionsFuture} Options ready for navigator.credentials.get()
* @see {@link https://w3c.github.io/webauthn/#sctn-parseRequestOptionsFromJSON W3C WebAuthn Spec - parseRequestOptionsFromJSON}
*/
function deserializeCredentialRequestOptions(options) {
	if (!options) throw new Error("Credential request options are required");
	if (typeof PublicKeyCredential !== "undefined" && "parseRequestOptionsFromJSON" in PublicKeyCredential && typeof PublicKeyCredential.parseRequestOptionsFromJSON === "function") return PublicKeyCredential.parseRequestOptionsFromJSON(options);
	const { challenge: challengeStr, allowCredentials } = options, restOptions = __rest(options, ["challenge", "allowCredentials"]);
	const challenge = base64UrlToUint8Array(challengeStr).buffer;
	const result = Object.assign(Object.assign({}, restOptions), { challenge });
	if (allowCredentials && allowCredentials.length > 0) {
		result.allowCredentials = new Array(allowCredentials.length);
		for (let i = 0; i < allowCredentials.length; i++) {
			const cred = allowCredentials[i];
			result.allowCredentials[i] = Object.assign(Object.assign({}, cred), {
				id: base64UrlToUint8Array(cred.id).buffer,
				type: cred.type || "public-key",
				transports: cred.transports
			});
		}
	}
	return result;
}
/**
* Convert a registration/enrollment credential response to server format.
* Serializes binary fields to base64url for JSON transmission.
* Supports both native WebAuthn Level 3 toJSON and manual fallback.
*
* @param {RegistrationCredential} credential - Credential from navigator.credentials.create()
* @returns {RegistrationResponseJSON} JSON-serializable credential for server
* @see {@link https://w3c.github.io/webauthn/#dom-publickeycredential-tojson W3C WebAuthn Spec - toJSON}
*/
function serializeCredentialCreationResponse(credential) {
	var _a;
	if ("toJSON" in credential && typeof credential.toJSON === "function") return credential.toJSON();
	const credentialWithAttachment = credential;
	return {
		id: credential.id,
		rawId: credential.id,
		response: {
			attestationObject: bytesToBase64URL(new Uint8Array(credential.response.attestationObject)),
			clientDataJSON: bytesToBase64URL(new Uint8Array(credential.response.clientDataJSON))
		},
		type: "public-key",
		clientExtensionResults: credential.getClientExtensionResults(),
		authenticatorAttachment: (_a = credentialWithAttachment.authenticatorAttachment) !== null && _a !== void 0 ? _a : void 0
	};
}
/**
* Convert an authentication/verification credential response to server format.
* Serializes binary fields to base64url for JSON transmission.
* Supports both native WebAuthn Level 3 toJSON and manual fallback.
*
* @param {AuthenticationCredential} credential - Credential from navigator.credentials.get()
* @returns {AuthenticationResponseJSON} JSON-serializable credential for server
* @see {@link https://w3c.github.io/webauthn/#dom-publickeycredential-tojson W3C WebAuthn Spec - toJSON}
*/
function serializeCredentialRequestResponse(credential) {
	var _a;
	if ("toJSON" in credential && typeof credential.toJSON === "function") return credential.toJSON();
	const credentialWithAttachment = credential;
	const clientExtensionResults = credential.getClientExtensionResults();
	const assertionResponse = credential.response;
	return {
		id: credential.id,
		rawId: credential.id,
		response: {
			authenticatorData: bytesToBase64URL(new Uint8Array(assertionResponse.authenticatorData)),
			clientDataJSON: bytesToBase64URL(new Uint8Array(assertionResponse.clientDataJSON)),
			signature: bytesToBase64URL(new Uint8Array(assertionResponse.signature)),
			userHandle: assertionResponse.userHandle ? bytesToBase64URL(new Uint8Array(assertionResponse.userHandle)) : void 0
		},
		type: "public-key",
		clientExtensionResults,
		authenticatorAttachment: (_a = credentialWithAttachment.authenticatorAttachment) !== null && _a !== void 0 ? _a : void 0
	};
}
/**
* A simple test to determine if a hostname is a properly-formatted domain name.
* Considers localhost valid for development environments.
*
* A "valid domain" is defined here: https://url.spec.whatwg.org/#valid-domain
*
* Regex sourced from here:
* https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch08s15.html
*
* @param {string} hostname - The hostname to validate
* @returns {boolean} True if valid domain or localhost
* @see {@link https://url.spec.whatwg.org/#valid-domain WHATWG URL Spec - Valid Domain}
*/
function isValidDomain(hostname) {
	return hostname === "localhost" || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(hostname);
}
/**
* Determine if the browser is capable of WebAuthn.
* Checks for necessary Web APIs: PublicKeyCredential and Credential Management.
*
* @returns {boolean} True if browser supports WebAuthn
* @see {@link https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredential#browser_compatibility MDN - PublicKeyCredential Browser Compatibility}
*/
function browserSupportsWebAuthn() {
	var _a, _b;
	return !!(isBrowser() && "PublicKeyCredential" in window && window.PublicKeyCredential && "credentials" in navigator && typeof ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.credentials) === null || _a === void 0 ? void 0 : _a.create) === "function" && typeof ((_b = navigator === null || navigator === void 0 ? void 0 : navigator.credentials) === null || _b === void 0 ? void 0 : _b.get) === "function");
}
/**
* Create a WebAuthn credential using the browser's credentials API.
* Wraps navigator.credentials.create() with error handling.
*
* @param {CredentialCreationOptions} options - Options including publicKey parameters
* @returns {Promise<RequestResult<RegistrationCredential, WebAuthnError>>} Created credential or error
* @see {@link https://w3c.github.io/webauthn/#sctn-createCredential W3C WebAuthn Spec - Create Credential}
* @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/create MDN - credentials.create}
*/
async function createCredential(options) {
	try {
		const response = await navigator.credentials.create(
			/** we assert the type here until typescript types are updated */
			options
		);
		if (!response) return {
			data: null,
			error: new WebAuthnUnknownError("Empty credential response", response)
		};
		if (!(response instanceof PublicKeyCredential)) return {
			data: null,
			error: new WebAuthnUnknownError("Browser returned unexpected credential type", response)
		};
		return {
			data: response,
			error: null
		};
	} catch (err) {
		return {
			data: null,
			error: identifyRegistrationError({
				error: err,
				options
			})
		};
	}
}
/**
* Get a WebAuthn credential using the browser's credentials API.
* Wraps navigator.credentials.get() with error handling.
*
* @param {CredentialRequestOptions} options - Options including publicKey parameters
* @returns {Promise<RequestResult<AuthenticationCredential, WebAuthnError>>} Retrieved credential or error
* @see {@link https://w3c.github.io/webauthn/#sctn-getAssertion W3C WebAuthn Spec - Get Assertion}
* @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/get MDN - credentials.get}
*/
async function getCredential(options) {
	try {
		const response = await navigator.credentials.get(
			/** we assert the type here until typescript types are updated */
			options
		);
		if (!response) return {
			data: null,
			error: new WebAuthnUnknownError("Empty credential response", response)
		};
		if (!(response instanceof PublicKeyCredential)) return {
			data: null,
			error: new WebAuthnUnknownError("Browser returned unexpected credential type", response)
		};
		return {
			data: response,
			error: null
		};
	} catch (err) {
		return {
			data: null,
			error: identifyAuthenticationError({
				error: err,
				options
			})
		};
	}
}
var DEFAULT_CREATION_OPTIONS = {
	hints: ["security-key"],
	authenticatorSelection: {
		authenticatorAttachment: "cross-platform",
		requireResidentKey: false,
		userVerification: "preferred",
		residentKey: "discouraged"
	},
	attestation: "direct"
};
var DEFAULT_REQUEST_OPTIONS = {
	userVerification: "preferred",
	hints: ["security-key"],
	attestation: "direct"
};
function deepMerge(...sources) {
	const isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
	const isArrayBufferLike = (val) => val instanceof ArrayBuffer || ArrayBuffer.isView(val);
	const result = {};
	for (const source of sources) {
		if (!source) continue;
		for (const key in source) {
			const value = source[key];
			if (value === void 0) continue;
			if (Array.isArray(value)) result[key] = value;
			else if (isArrayBufferLike(value)) result[key] = value;
			else if (isObject(value)) {
				const existing = result[key];
				if (isObject(existing)) result[key] = deepMerge(existing, value);
				else result[key] = deepMerge(value);
			} else result[key] = value;
		}
	}
	return result;
}
/**
* Merges WebAuthn credential creation options with overrides.
* Sets sensible defaults for authenticator selection and extensions.
*
* @param {PublicKeyCredentialCreationOptionsFuture} baseOptions - The base options from the server
* @param {PublicKeyCredentialCreationOptionsFuture} overrides - Optional overrides to apply
* @param {string} friendlyName - Optional friendly name for the credential
* @returns {PublicKeyCredentialCreationOptionsFuture} Merged credential creation options
* @see {@link https://w3c.github.io/webauthn/#dictdef-authenticatorselectioncriteria W3C WebAuthn Spec - AuthenticatorSelectionCriteria}
*/
function mergeCredentialCreationOptions(baseOptions, overrides) {
	return deepMerge(DEFAULT_CREATION_OPTIONS, baseOptions, overrides || {});
}
/**
* Merges WebAuthn credential request options with overrides.
* Sets sensible defaults for user verification and hints.
*
* @param {PublicKeyCredentialRequestOptionsFuture} baseOptions - The base options from the server
* @param {PublicKeyCredentialRequestOptionsFuture} overrides - Optional overrides to apply
* @returns {PublicKeyCredentialRequestOptionsFuture} Merged credential request options
* @see {@link https://w3c.github.io/webauthn/#dictdef-publickeycredentialrequestoptions W3C WebAuthn Spec - PublicKeyCredentialRequestOptions}
*/
function mergeCredentialRequestOptions(baseOptions, overrides) {
	return deepMerge(DEFAULT_REQUEST_OPTIONS, baseOptions, overrides || {});
}
/**
* WebAuthn API wrapper for Supabase Auth.
* Provides methods for enrolling, challenging, verifying, authenticating, and registering WebAuthn credentials.
*
* @experimental This API is experimental and may change in future releases
* @see {@link https://w3c.github.io/webauthn/ W3C WebAuthn Specification}
* @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API MDN - Web Authentication API}
*/
var WebAuthnApi = class {
	constructor(client) {
		this.client = client;
		this.enroll = this._enroll.bind(this);
		this.challenge = this._challenge.bind(this);
		this.verify = this._verify.bind(this);
		this.authenticate = this._authenticate.bind(this);
		this.register = this._register.bind(this);
	}
	/**
	* Enroll a new WebAuthn factor.
	* Creates an unverified WebAuthn factor that must be verified with a credential.
	*
	* @experimental This method is experimental and may change in future releases
	* @param {Omit<MFAEnrollWebauthnParams, 'factorType'>} params - Enrollment parameters (friendlyName required)
	* @returns {Promise<AuthMFAEnrollWebauthnResponse>} Enrolled factor details or error
	* @see {@link https://w3c.github.io/webauthn/#sctn-registering-a-new-credential W3C WebAuthn Spec - Registering a New Credential}
	*/
	async _enroll(params) {
		return this.client.mfa.enroll(Object.assign(Object.assign({}, params), { factorType: "webauthn" }));
	}
	/**
	* Challenge for WebAuthn credential creation or authentication.
	* Combines server challenge with browser credential operations.
	* Handles both registration (create) and authentication (request) flows.
	*
	* @experimental This method is experimental and may change in future releases
	* @param {MFAChallengeWebauthnParams & { friendlyName?: string; signal?: AbortSignal }} params - Challenge parameters including factorId
	* @param {Object} overrides - Allows you to override the parameters passed to navigator.credentials
	* @param {PublicKeyCredentialCreationOptionsFuture} overrides.create - Override options for credential creation
	* @param {PublicKeyCredentialRequestOptionsFuture} overrides.request - Override options for credential request
	* @returns {Promise<RequestResult>} Challenge response with credential or error
	* @see {@link https://w3c.github.io/webauthn/#sctn-credential-creation W3C WebAuthn Spec - Credential Creation}
	* @see {@link https://w3c.github.io/webauthn/#sctn-verifying-assertion W3C WebAuthn Spec - Verifying Assertion}
	*/
	async _challenge({ factorId, webauthn, friendlyName, signal }, overrides) {
		var _a;
		try {
			const { data: challengeResponse, error: challengeError } = await this.client.mfa.challenge({
				factorId,
				webauthn
			});
			if (!challengeResponse) return {
				data: null,
				error: challengeError
			};
			const abortSignal = signal !== null && signal !== void 0 ? signal : webAuthnAbortService.createNewAbortSignal();
			/** webauthn will fail if either of the name/displayname are blank */
			if (challengeResponse.webauthn.type === "create") {
				const { user } = challengeResponse.webauthn.credential_options.publicKey;
				if (!user.name) {
					const nameToUse = friendlyName;
					if (!nameToUse) {
						const userData = (await this.client.getUser()).data.user;
						const fallbackName = ((_a = userData === null || userData === void 0 ? void 0 : userData.user_metadata) === null || _a === void 0 ? void 0 : _a.name) || (userData === null || userData === void 0 ? void 0 : userData.email) || (userData === null || userData === void 0 ? void 0 : userData.id) || "User";
						user.name = `${user.id}:${fallbackName}`;
					} else user.name = `${user.id}:${nameToUse}`;
				}
				if (!user.displayName) user.displayName = user.name;
			}
			switch (challengeResponse.webauthn.type) {
				case "create": {
					const { data, error } = await createCredential({
						publicKey: mergeCredentialCreationOptions(challengeResponse.webauthn.credential_options.publicKey, overrides === null || overrides === void 0 ? void 0 : overrides.create),
						signal: abortSignal
					});
					if (data) return {
						data: {
							factorId,
							challengeId: challengeResponse.id,
							webauthn: {
								type: challengeResponse.webauthn.type,
								credential_response: data
							}
						},
						error: null
					};
					return {
						data: null,
						error
					};
				}
				case "request": {
					const options = mergeCredentialRequestOptions(challengeResponse.webauthn.credential_options.publicKey, overrides === null || overrides === void 0 ? void 0 : overrides.request);
					const { data, error } = await getCredential(Object.assign(Object.assign({}, challengeResponse.webauthn.credential_options), {
						publicKey: options,
						signal: abortSignal
					}));
					if (data) return {
						data: {
							factorId,
							challengeId: challengeResponse.id,
							webauthn: {
								type: challengeResponse.webauthn.type,
								credential_response: data
							}
						},
						error: null
					};
					return {
						data: null,
						error
					};
				}
			}
		} catch (error) {
			if (isAuthError(error)) return {
				data: null,
				error
			};
			return {
				data: null,
				error: new AuthUnknownError("Unexpected error in challenge", error)
			};
		}
	}
	/**
	* Verify a WebAuthn credential with the server.
	* Completes the WebAuthn ceremony by sending the credential to the server for verification.
	*
	* @experimental This method is experimental and may change in future releases
	* @param {Object} params - Verification parameters
	* @param {string} params.challengeId - ID of the challenge being verified
	* @param {string} params.factorId - ID of the WebAuthn factor
	* @param {MFAVerifyWebauthnParams<T>['webauthn']} params.webauthn - WebAuthn credential response
	* @returns {Promise<AuthMFAVerifyResponse>} Verification result with session or error
	* @see {@link https://w3c.github.io/webauthn/#sctn-verifying-assertion W3C WebAuthn Spec - Verifying an Authentication Assertion}
	* */
	async _verify({ challengeId, factorId, webauthn }) {
		return this.client.mfa.verify({
			factorId,
			challengeId,
			webauthn
		});
	}
	/**
	* Complete WebAuthn authentication flow.
	* Performs challenge and verification in a single operation for existing credentials.
	*
	* @experimental This method is experimental and may change in future releases
	* @param {Object} params - Authentication parameters
	* @param {string} params.factorId - ID of the WebAuthn factor to authenticate with
	* @param {Object} params.webauthn - WebAuthn configuration
	* @param {string} params.webauthn.rpId - Relying Party ID (defaults to current hostname)
	* @param {string[]} params.webauthn.rpOrigins - Allowed origins (defaults to current origin)
	* @param {AbortSignal} params.webauthn.signal - Optional abort signal
	* @param {PublicKeyCredentialRequestOptionsFuture} overrides - Override options for navigator.credentials.get
	* @returns {Promise<RequestResult<AuthMFAVerifyResponseData, WebAuthnError | AuthError>>} Authentication result
	* @see {@link https://w3c.github.io/webauthn/#sctn-authentication W3C WebAuthn Spec - Authentication Ceremony}
	* @see {@link https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredentialRequestOptions MDN - PublicKeyCredentialRequestOptions}
	*/
	async _authenticate({ factorId, webauthn: { rpId = typeof window !== "undefined" ? window.location.hostname : void 0, rpOrigins = typeof window !== "undefined" ? [window.location.origin] : void 0, signal } = {} }, overrides) {
		if (!rpId) return {
			data: null,
			error: new AuthError("rpId is required for WebAuthn authentication")
		};
		try {
			if (!browserSupportsWebAuthn()) return {
				data: null,
				error: new AuthUnknownError("Browser does not support WebAuthn", null)
			};
			const { data: challengeResponse, error: challengeError } = await this.challenge({
				factorId,
				webauthn: {
					rpId,
					rpOrigins
				},
				signal
			}, { request: overrides });
			if (!challengeResponse) return {
				data: null,
				error: challengeError
			};
			const { webauthn } = challengeResponse;
			return this._verify({
				factorId,
				challengeId: challengeResponse.challengeId,
				webauthn: {
					type: webauthn.type,
					rpId,
					rpOrigins,
					credential_response: webauthn.credential_response
				}
			});
		} catch (error) {
			if (isAuthError(error)) return {
				data: null,
				error
			};
			return {
				data: null,
				error: new AuthUnknownError("Unexpected error in authenticate", error)
			};
		}
	}
	/**
	* Complete WebAuthn registration flow.
	* Performs enrollment, challenge, and verification in a single operation for new credentials.
	*
	* @experimental This method is experimental and may change in future releases
	* @param {Object} params - Registration parameters
	* @param {string} params.friendlyName - User-friendly name for the credential
	* @param {string} params.rpId - Relying Party ID (defaults to current hostname)
	* @param {string[]} params.rpOrigins - Allowed origins (defaults to current origin)
	* @param {AbortSignal} params.signal - Optional abort signal
	* @param {PublicKeyCredentialCreationOptionsFuture} overrides - Override options for navigator.credentials.create
	* @returns {Promise<RequestResult<AuthMFAVerifyResponseData, WebAuthnError | AuthError>>} Registration result
	* @see {@link https://w3c.github.io/webauthn/#sctn-registering-a-new-credential W3C WebAuthn Spec - Registration Ceremony}
	* @see {@link https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredentialCreationOptions MDN - PublicKeyCredentialCreationOptions}
	*/
	async _register({ friendlyName, webauthn: { rpId = typeof window !== "undefined" ? window.location.hostname : void 0, rpOrigins = typeof window !== "undefined" ? [window.location.origin] : void 0, signal } = {} }, overrides) {
		if (!rpId) return {
			data: null,
			error: new AuthError("rpId is required for WebAuthn registration")
		};
		try {
			if (!browserSupportsWebAuthn()) return {
				data: null,
				error: new AuthUnknownError("Browser does not support WebAuthn", null)
			};
			const { data: factor, error: enrollError } = await this._enroll({ friendlyName });
			if (!factor) {
				await this.client.mfa.listFactors().then((factors) => {
					var _a;
					return (_a = factors.data) === null || _a === void 0 ? void 0 : _a.all.find((v) => v.factor_type === "webauthn" && v.friendly_name === friendlyName && v.status !== "unverified");
				}).then((factor) => factor ? this.client.mfa.unenroll({ factorId: factor === null || factor === void 0 ? void 0 : factor.id }) : void 0);
				return {
					data: null,
					error: enrollError
				};
			}
			const { data: challengeResponse, error: challengeError } = await this._challenge({
				factorId: factor.id,
				friendlyName: factor.friendly_name,
				webauthn: {
					rpId,
					rpOrigins
				},
				signal
			}, { create: overrides });
			if (!challengeResponse) return {
				data: null,
				error: challengeError
			};
			return this._verify({
				factorId: factor.id,
				challengeId: challengeResponse.challengeId,
				webauthn: {
					rpId,
					rpOrigins,
					type: challengeResponse.webauthn.type,
					credential_response: challengeResponse.webauthn.credential_response
				}
			});
		} catch (error) {
			if (isAuthError(error)) return {
				data: null,
				error
			};
			return {
				data: null,
				error: new AuthUnknownError("Unexpected error in register", error)
			};
		}
	}
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+auth-js@2.99.2/node_modules/@supabase/auth-js/dist/module/GoTrueClient.js
polyfillGlobalThis();
var DEFAULT_OPTIONS = {
	url: GOTRUE_URL,
	storageKey: STORAGE_KEY,
	autoRefreshToken: true,
	persistSession: true,
	detectSessionInUrl: true,
	headers: DEFAULT_HEADERS,
	flowType: "implicit",
	debug: false,
	hasCustomAuthorizationHeader: false,
	throwOnError: false,
	lockAcquireTimeout: 5e3,
	skipAutoInitialize: false
};
async function lockNoOp(name, acquireTimeout, fn) {
	return await fn();
}
/**
* Caches JWKS values for all clients created in the same environment. This is
* especially useful for shared-memory execution environments such as Vercel's
* Fluid Compute, AWS Lambda or Supabase's Edge Functions. Regardless of how
* many clients are created, if they share the same storage key they will use
* the same JWKS cache, significantly speeding up getClaims() with asymmetric
* JWTs.
*/
var GLOBAL_JWKS = {};
var GoTrueClient = class GoTrueClient {
	/**
	* The JWKS used for verifying asymmetric JWTs
	*/
	get jwks() {
		var _a, _b;
		return (_b = (_a = GLOBAL_JWKS[this.storageKey]) === null || _a === void 0 ? void 0 : _a.jwks) !== null && _b !== void 0 ? _b : { keys: [] };
	}
	set jwks(value) {
		GLOBAL_JWKS[this.storageKey] = Object.assign(Object.assign({}, GLOBAL_JWKS[this.storageKey]), { jwks: value });
	}
	get jwks_cached_at() {
		var _a, _b;
		return (_b = (_a = GLOBAL_JWKS[this.storageKey]) === null || _a === void 0 ? void 0 : _a.cachedAt) !== null && _b !== void 0 ? _b : Number.MIN_SAFE_INTEGER;
	}
	set jwks_cached_at(value) {
		GLOBAL_JWKS[this.storageKey] = Object.assign(Object.assign({}, GLOBAL_JWKS[this.storageKey]), { cachedAt: value });
	}
	/**
	* Create a new client for use in the browser.
	*
	* @example
	* ```ts
	* import { GoTrueClient } from '@supabase/auth-js'
	*
	* const auth = new GoTrueClient({
	*   url: 'https://xyzcompany.supabase.co/auth/v1',
	*   headers: { apikey: 'public-anon-key' },
	*   storageKey: 'supabase-auth',
	* })
	* ```
	*/
	constructor(options) {
		var _a, _b, _c;
		/**
		* @experimental
		*/
		this.userStorage = null;
		this.memoryStorage = null;
		this.stateChangeEmitters = /* @__PURE__ */ new Map();
		this.autoRefreshTicker = null;
		this.autoRefreshTickTimeout = null;
		this.visibilityChangedCallback = null;
		this.refreshingDeferred = null;
		/**
		* Keeps track of the async client initialization.
		* When null or not yet resolved the auth state is `unknown`
		* Once resolved the auth state is known and it's safe to call any further client methods.
		* Keep extra care to never reject or throw uncaught errors
		*/
		this.initializePromise = null;
		this.detectSessionInUrl = true;
		this.hasCustomAuthorizationHeader = false;
		this.suppressGetSessionWarning = false;
		this.lockAcquired = false;
		this.pendingInLock = [];
		/**
		* Used to broadcast state change events to other tabs listening.
		*/
		this.broadcastChannel = null;
		this.logger = console.log;
		const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
		this.storageKey = settings.storageKey;
		this.instanceID = (_a = GoTrueClient.nextInstanceID[this.storageKey]) !== null && _a !== void 0 ? _a : 0;
		GoTrueClient.nextInstanceID[this.storageKey] = this.instanceID + 1;
		this.logDebugMessages = !!settings.debug;
		if (typeof settings.debug === "function") this.logger = settings.debug;
		if (this.instanceID > 0 && isBrowser()) {
			const message = `${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;
			console.warn(message);
			if (this.logDebugMessages) console.trace(message);
		}
		this.persistSession = settings.persistSession;
		this.autoRefreshToken = settings.autoRefreshToken;
		this.admin = new GoTrueAdminApi({
			url: settings.url,
			headers: settings.headers,
			fetch: settings.fetch
		});
		this.url = settings.url;
		this.headers = settings.headers;
		this.fetch = resolveFetch$1(settings.fetch);
		this.lock = settings.lock || lockNoOp;
		this.detectSessionInUrl = settings.detectSessionInUrl;
		this.flowType = settings.flowType;
		this.hasCustomAuthorizationHeader = settings.hasCustomAuthorizationHeader;
		this.throwOnError = settings.throwOnError;
		this.lockAcquireTimeout = settings.lockAcquireTimeout;
		if (settings.lock) this.lock = settings.lock;
		else if (this.persistSession && isBrowser() && ((_b = globalThis === null || globalThis === void 0 ? void 0 : globalThis.navigator) === null || _b === void 0 ? void 0 : _b.locks)) this.lock = navigatorLock;
		else this.lock = lockNoOp;
		if (!this.jwks) {
			this.jwks = { keys: [] };
			this.jwks_cached_at = Number.MIN_SAFE_INTEGER;
		}
		this.mfa = {
			verify: this._verify.bind(this),
			enroll: this._enroll.bind(this),
			unenroll: this._unenroll.bind(this),
			challenge: this._challenge.bind(this),
			listFactors: this._listFactors.bind(this),
			challengeAndVerify: this._challengeAndVerify.bind(this),
			getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this),
			webauthn: new WebAuthnApi(this)
		};
		this.oauth = {
			getAuthorizationDetails: this._getAuthorizationDetails.bind(this),
			approveAuthorization: this._approveAuthorization.bind(this),
			denyAuthorization: this._denyAuthorization.bind(this),
			listGrants: this._listOAuthGrants.bind(this),
			revokeGrant: this._revokeOAuthGrant.bind(this)
		};
		if (this.persistSession) {
			if (settings.storage) this.storage = settings.storage;
			else if (supportsLocalStorage()) this.storage = globalThis.localStorage;
			else {
				this.memoryStorage = {};
				this.storage = memoryLocalStorageAdapter(this.memoryStorage);
			}
			if (settings.userStorage) this.userStorage = settings.userStorage;
		} else {
			this.memoryStorage = {};
			this.storage = memoryLocalStorageAdapter(this.memoryStorage);
		}
		if (isBrowser() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
			try {
				this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
			} catch (e) {
				console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", e);
			}
			(_c = this.broadcastChannel) === null || _c === void 0 || _c.addEventListener("message", async (event) => {
				this._debug("received broadcast notification from other tab or client", event);
				try {
					await this._notifyAllSubscribers(event.data.event, event.data.session, false);
				} catch (error) {
					this._debug("#broadcastChannel", "error", error);
				}
			});
		}
		if (!settings.skipAutoInitialize) this.initialize().catch((error) => {
			this._debug("#initialize()", "error", error);
		});
	}
	/**
	* Returns whether error throwing mode is enabled for this client.
	*/
	isThrowOnErrorEnabled() {
		return this.throwOnError;
	}
	/**
	* Centralizes return handling with optional error throwing. When `throwOnError` is enabled
	* and the provided result contains a non-nullish error, the error is thrown instead of
	* being returned. This ensures consistent behavior across all public API methods.
	*/
	_returnResult(result) {
		if (this.throwOnError && result && result.error) throw result.error;
		return result;
	}
	_logPrefix() {
		return `GoTrueClient@${this.storageKey}:${this.instanceID} (${version$1}) ${(/* @__PURE__ */ new Date()).toISOString()}`;
	}
	_debug(...args) {
		if (this.logDebugMessages) this.logger(this._logPrefix(), ...args);
		return this;
	}
	/**
	* Initializes the client session either from the url or from storage.
	* This method is automatically called when instantiating the client, but should also be called
	* manually when checking for an error from an auth redirect (oauth, magiclink, password recovery, etc).
	*/
	async initialize() {
		if (this.initializePromise) return await this.initializePromise;
		this.initializePromise = (async () => {
			return await this._acquireLock(this.lockAcquireTimeout, async () => {
				return await this._initialize();
			});
		})();
		return await this.initializePromise;
	}
	/**
	* IMPORTANT:
	* 1. Never throw in this method, as it is called from the constructor
	* 2. Never return a session from this method as it would be cached over
	*    the whole lifetime of the client
	*/
	async _initialize() {
		var _a;
		try {
			let params = {};
			let callbackUrlType = "none";
			if (isBrowser()) {
				params = parseParametersFromURL(window.location.href);
				if (this._isImplicitGrantCallback(params)) callbackUrlType = "implicit";
				else if (await this._isPKCECallback(params)) callbackUrlType = "pkce";
			}
			/**
			* Attempt to get the session from the URL only if these conditions are fulfilled
			*
			* Note: If the URL isn't one of the callback url types (implicit or pkce),
			* then there could be an existing session so we don't want to prematurely remove it
			*/
			if (isBrowser() && this.detectSessionInUrl && callbackUrlType !== "none") {
				const { data, error } = await this._getSessionFromURL(params, callbackUrlType);
				if (error) {
					this._debug("#_initialize()", "error detecting session from URL", error);
					if (isAuthImplicitGrantRedirectError(error)) {
						const errorCode = (_a = error.details) === null || _a === void 0 ? void 0 : _a.code;
						if (errorCode === "identity_already_exists" || errorCode === "identity_not_found" || errorCode === "single_identity_not_deletable") return { error };
					}
					return { error };
				}
				const { session, redirectType } = data;
				this._debug("#_initialize()", "detected session in URL", session, "redirect type", redirectType);
				await this._saveSession(session);
				setTimeout(async () => {
					if (redirectType === "recovery") await this._notifyAllSubscribers("PASSWORD_RECOVERY", session);
					else await this._notifyAllSubscribers("SIGNED_IN", session);
				}, 0);
				return { error: null };
			}
			await this._recoverAndRefresh();
			return { error: null };
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({ error });
			return this._returnResult({ error: new AuthUnknownError("Unexpected error during initialization", error) });
		} finally {
			await this._handleVisibilityChange();
			this._debug("#_initialize()", "end");
		}
	}
	/**
	* Creates a new anonymous user.
	*
	* @returns A session where the is_anonymous claim in the access token JWT set to true
	*/
	async signInAnonymously(credentials) {
		var _a, _b, _c;
		try {
			const { data, error } = await _request(this.fetch, "POST", `${this.url}/signup`, {
				headers: this.headers,
				body: {
					data: (_b = (_a = credentials === null || credentials === void 0 ? void 0 : credentials.options) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : {},
					gotrue_meta_security: { captcha_token: (_c = credentials === null || credentials === void 0 ? void 0 : credentials.options) === null || _c === void 0 ? void 0 : _c.captchaToken }
				},
				xform: _sessionResponse
			});
			if (error || !data) return this._returnResult({
				data: {
					user: null,
					session: null
				},
				error
			});
			const session = data.session;
			const user = data.user;
			if (data.session) {
				await this._saveSession(data.session);
				await this._notifyAllSubscribers("SIGNED_IN", session);
			}
			return this._returnResult({
				data: {
					user,
					session
				},
				error: null
			});
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: {
					user: null,
					session: null
				},
				error
			});
			throw error;
		}
	}
	/**
	* Creates a new user.
	*
	* Be aware that if a user account exists in the system you may get back an
	* error message that attempts to hide this information from the user.
	* This method has support for PKCE via email signups. The PKCE flow cannot be used when autoconfirm is enabled.
	*
	* @returns A logged-in session if the server has "autoconfirm" ON
	* @returns A user if the server has "autoconfirm" OFF
	*
	* @category Auth
	*
	* @remarks
	* - By default, the user needs to verify their email address before logging in. To turn this off, disable **Confirm email** in [your project](/dashboard/project/_/auth/providers).
	* - **Confirm email** determines if users need to confirm their email address after signing up.
	*   - If **Confirm email** is enabled, a `user` is returned but `session` is null.
	*   - If **Confirm email** is disabled, both a `user` and a `session` are returned.
	* - When the user confirms their email address, they are redirected to the [`SITE_URL`](/docs/guides/auth/redirect-urls#use-wildcards-in-redirect-urls) by default. You can modify your `SITE_URL` or add additional redirect URLs in [your project](/dashboard/project/_/auth/url-configuration).
	* - If signUp() is called for an existing confirmed user:
	*   - When both **Confirm email** and **Confirm phone** (even when phone provider is disabled) are enabled in [your project](/dashboard/project/_/auth/providers), an obfuscated/fake user object is returned.
	*   - When either **Confirm email** or **Confirm phone** (even when phone provider is disabled) is disabled, the error message, `User already registered` is returned.
	* - To fetch the currently logged-in user, refer to [`getUser()`](/docs/reference/javascript/auth-getuser).
	*
	* @example Sign up with an email and password
	* ```js
	* const { data, error } = await supabase.auth.signUp({
	*   email: 'example@email.com',
	*   password: 'example-password',
	* })
	* ```
	*
	* @exampleResponse Sign up with an email and password
	* ```json
	* // Some fields may be null if "confirm email" is enabled.
	* {
	*   "data": {
	*     "user": {
	*       "id": "11111111-1111-1111-1111-111111111111",
	*       "aud": "authenticated",
	*       "role": "authenticated",
	*       "email": "example@email.com",
	*       "email_confirmed_at": "2024-01-01T00:00:00Z",
	*       "phone": "",
	*       "last_sign_in_at": "2024-01-01T00:00:00Z",
	*       "app_metadata": {
	*         "provider": "email",
	*         "providers": [
	*           "email"
	*         ]
	*       },
	*       "user_metadata": {},
	*       "identities": [
	*         {
	*           "identity_id": "22222222-2222-2222-2222-222222222222",
	*           "id": "11111111-1111-1111-1111-111111111111",
	*           "user_id": "11111111-1111-1111-1111-111111111111",
	*           "identity_data": {
	*             "email": "example@email.com",
	*             "email_verified": false,
	*             "phone_verified": false,
	*             "sub": "11111111-1111-1111-1111-111111111111"
	*           },
	*           "provider": "email",
	*           "last_sign_in_at": "2024-01-01T00:00:00Z",
	*           "created_at": "2024-01-01T00:00:00Z",
	*           "updated_at": "2024-01-01T00:00:00Z",
	*           "email": "example@email.com"
	*         }
	*       ],
	*       "created_at": "2024-01-01T00:00:00Z",
	*       "updated_at": "2024-01-01T00:00:00Z"
	*     },
	*     "session": {
	*       "access_token": "<ACCESS_TOKEN>",
	*       "token_type": "bearer",
	*       "expires_in": 3600,
	*       "expires_at": 1700000000,
	*       "refresh_token": "<REFRESH_TOKEN>",
	*       "user": {
	*         "id": "11111111-1111-1111-1111-111111111111",
	*         "aud": "authenticated",
	*         "role": "authenticated",
	*         "email": "example@email.com",
	*         "email_confirmed_at": "2024-01-01T00:00:00Z",
	*         "phone": "",
	*         "last_sign_in_at": "2024-01-01T00:00:00Z",
	*         "app_metadata": {
	*           "provider": "email",
	*           "providers": [
	*             "email"
	*           ]
	*         },
	*         "user_metadata": {},
	*         "identities": [
	*           {
	*             "identity_id": "22222222-2222-2222-2222-222222222222",
	*             "id": "11111111-1111-1111-1111-111111111111",
	*             "user_id": "11111111-1111-1111-1111-111111111111",
	*             "identity_data": {
	*               "email": "example@email.com",
	*               "email_verified": false,
	*               "phone_verified": false,
	*               "sub": "11111111-1111-1111-1111-111111111111"
	*             },
	*             "provider": "email",
	*             "last_sign_in_at": "2024-01-01T00:00:00Z",
	*             "created_at": "2024-01-01T00:00:00Z",
	*             "updated_at": "2024-01-01T00:00:00Z",
	*             "email": "example@email.com"
	*           }
	*         ],
	*         "created_at": "2024-01-01T00:00:00Z",
	*         "updated_at": "2024-01-01T00:00:00Z"
	*       }
	*     }
	*   },
	*   "error": null
	* }
	* ```
	*
	* @example Sign up with a phone number and password (SMS)
	* ```js
	* const { data, error } = await supabase.auth.signUp({
	*   phone: '123456789',
	*   password: 'example-password',
	*   options: {
	*     channel: 'sms'
	*   }
	* })
	* ```
	*
	* @exampleDescription Sign up with a phone number and password (whatsapp)
	* The user will be sent a WhatsApp message which contains a OTP. By default, a given user can only request a OTP once every 60 seconds. Note that a user will need to have a valid WhatsApp account that is linked to Twilio in order to use this feature.
	*
	* @example Sign up with a phone number and password (whatsapp)
	* ```js
	* const { data, error } = await supabase.auth.signUp({
	*   phone: '123456789',
	*   password: 'example-password',
	*   options: {
	*     channel: 'whatsapp'
	*   }
	* })
	* ```
	*
	* @example Sign up with additional user metadata
	* ```js
	* const { data, error } = await supabase.auth.signUp(
	*   {
	*     email: 'example@email.com',
	*     password: 'example-password',
	*     options: {
	*       data: {
	*         first_name: 'John',
	*         age: 27,
	*       }
	*     }
	*   }
	* )
	* ```
	*
	* @exampleDescription Sign up with a redirect URL
	* - See [redirect URLs and wildcards](/docs/guides/auth/redirect-urls#use-wildcards-in-redirect-urls) to add additional redirect URLs to your project.
	*
	* @example Sign up with a redirect URL
	* ```js
	* const { data, error } = await supabase.auth.signUp(
	*   {
	*     email: 'example@email.com',
	*     password: 'example-password',
	*     options: {
	*       emailRedirectTo: 'https://example.com/welcome'
	*     }
	*   }
	* )
	* ```
	*/
	async signUp(credentials) {
		var _a, _b, _c;
		try {
			let res;
			if ("email" in credentials) {
				const { email, password, options } = credentials;
				let codeChallenge = null;
				let codeChallengeMethod = null;
				if (this.flowType === "pkce") [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
				res = await _request(this.fetch, "POST", `${this.url}/signup`, {
					headers: this.headers,
					redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
					body: {
						email,
						password,
						data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
						gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
						code_challenge: codeChallenge,
						code_challenge_method: codeChallengeMethod
					},
					xform: _sessionResponse
				});
			} else if ("phone" in credentials) {
				const { phone, password, options } = credentials;
				res = await _request(this.fetch, "POST", `${this.url}/signup`, {
					headers: this.headers,
					body: {
						phone,
						password,
						data: (_b = options === null || options === void 0 ? void 0 : options.data) !== null && _b !== void 0 ? _b : {},
						channel: (_c = options === null || options === void 0 ? void 0 : options.channel) !== null && _c !== void 0 ? _c : "sms",
						gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
					},
					xform: _sessionResponse
				});
			} else throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
			const { data, error } = res;
			if (error || !data) {
				await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
				return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
			}
			const session = data.session;
			const user = data.user;
			if (data.session) {
				await this._saveSession(data.session);
				await this._notifyAllSubscribers("SIGNED_IN", session);
			}
			return this._returnResult({
				data: {
					user,
					session
				},
				error: null
			});
		} catch (error) {
			await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
			if (isAuthError(error)) return this._returnResult({
				data: {
					user: null,
					session: null
				},
				error
			});
			throw error;
		}
	}
	/**
	* Log in an existing user with an email and password or phone and password.
	*
	* Be aware that you may get back an error message that will not distinguish
	* between the cases where the account does not exist or that the
	* email/phone and password combination is wrong or that the account can only
	* be accessed via social login.
	*/
	async signInWithPassword(credentials) {
		try {
			let res;
			if ("email" in credentials) {
				const { email, password, options } = credentials;
				res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
					headers: this.headers,
					body: {
						email,
						password,
						gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
					},
					xform: _sessionResponsePassword
				});
			} else if ("phone" in credentials) {
				const { phone, password, options } = credentials;
				res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
					headers: this.headers,
					body: {
						phone,
						password,
						gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
					},
					xform: _sessionResponsePassword
				});
			} else throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
			const { data, error } = res;
			if (error) return this._returnResult({
				data: {
					user: null,
					session: null
				},
				error
			});
			else if (!data || !data.session || !data.user) {
				const invalidTokenError = new AuthInvalidTokenResponseError();
				return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error: invalidTokenError
				});
			}
			if (data.session) {
				await this._saveSession(data.session);
				await this._notifyAllSubscribers("SIGNED_IN", data.session);
			}
			return this._returnResult({
				data: Object.assign({
					user: data.user,
					session: data.session
				}, data.weak_password ? { weakPassword: data.weak_password } : null),
				error
			});
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: {
					user: null,
					session: null
				},
				error
			});
			throw error;
		}
	}
	/**
	* Log in an existing user via a third-party provider.
	* This method supports the PKCE flow.
	*/
	async signInWithOAuth(credentials) {
		var _a, _b, _c, _d;
		return await this._handleProviderSignIn(credentials.provider, {
			redirectTo: (_a = credentials.options) === null || _a === void 0 ? void 0 : _a.redirectTo,
			scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
			queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
			skipBrowserRedirect: (_d = credentials.options) === null || _d === void 0 ? void 0 : _d.skipBrowserRedirect
		});
	}
	/**
	* Log in an existing user by exchanging an Auth Code issued during the PKCE flow.
	*/
	async exchangeCodeForSession(authCode) {
		await this.initializePromise;
		return this._acquireLock(this.lockAcquireTimeout, async () => {
			return this._exchangeCodeForSession(authCode);
		});
	}
	/**
	* Signs in a user by verifying a message signed by the user's private key.
	* Supports Ethereum (via Sign-In-With-Ethereum) & Solana (Sign-In-With-Solana) standards,
	* both of which derive from the EIP-4361 standard
	* With slight variation on Solana's side.
	* @reference https://eips.ethereum.org/EIPS/eip-4361
	*/
	async signInWithWeb3(credentials) {
		const { chain } = credentials;
		switch (chain) {
			case "ethereum": return await this.signInWithEthereum(credentials);
			case "solana": return await this.signInWithSolana(credentials);
			default: throw new Error(`@supabase/auth-js: Unsupported chain "${chain}"`);
		}
	}
	async signInWithEthereum(credentials) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
		let message;
		let signature;
		if ("message" in credentials) {
			message = credentials.message;
			signature = credentials.signature;
		} else {
			const { chain, wallet, statement, options } = credentials;
			let resolvedWallet;
			if (!isBrowser()) {
				if (typeof wallet !== "object" || !(options === null || options === void 0 ? void 0 : options.url)) throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
				resolvedWallet = wallet;
			} else if (typeof wallet === "object") resolvedWallet = wallet;
			else {
				const windowAny = window;
				if ("ethereum" in windowAny && typeof windowAny.ethereum === "object" && "request" in windowAny.ethereum && typeof windowAny.ethereum.request === "function") resolvedWallet = windowAny.ethereum;
				else throw new Error(`@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.`);
			}
			const url = new URL((_a = options === null || options === void 0 ? void 0 : options.url) !== null && _a !== void 0 ? _a : window.location.href);
			const accounts = await resolvedWallet.request({ method: "eth_requestAccounts" }).then((accs) => accs).catch(() => {
				throw new Error(`@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid`);
			});
			if (!accounts || accounts.length === 0) throw new Error(`@supabase/auth-js: No accounts available. Please ensure the wallet is connected.`);
			const address = getAddress(accounts[0]);
			let chainId = (_b = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _b === void 0 ? void 0 : _b.chainId;
			if (!chainId) chainId = fromHex(await resolvedWallet.request({ method: "eth_chainId" }));
			message = createSiweMessage({
				domain: url.host,
				address,
				statement,
				uri: url.href,
				version: "1",
				chainId,
				nonce: (_c = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _c === void 0 ? void 0 : _c.nonce,
				issuedAt: (_e = (_d = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _d === void 0 ? void 0 : _d.issuedAt) !== null && _e !== void 0 ? _e : /* @__PURE__ */ new Date(),
				expirationTime: (_f = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _f === void 0 ? void 0 : _f.expirationTime,
				notBefore: (_g = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _g === void 0 ? void 0 : _g.notBefore,
				requestId: (_h = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _h === void 0 ? void 0 : _h.requestId,
				resources: (_j = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _j === void 0 ? void 0 : _j.resources
			});
			signature = await resolvedWallet.request({
				method: "personal_sign",
				params: [toHex(message), address]
			});
		}
		try {
			const { data, error } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
				headers: this.headers,
				body: Object.assign({
					chain: "ethereum",
					message,
					signature
				}, ((_k = credentials.options) === null || _k === void 0 ? void 0 : _k.captchaToken) ? { gotrue_meta_security: { captcha_token: (_l = credentials.options) === null || _l === void 0 ? void 0 : _l.captchaToken } } : null),
				xform: _sessionResponse
			});
			if (error) throw error;
			if (!data || !data.session || !data.user) {
				const invalidTokenError = new AuthInvalidTokenResponseError();
				return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error: invalidTokenError
				});
			}
			if (data.session) {
				await this._saveSession(data.session);
				await this._notifyAllSubscribers("SIGNED_IN", data.session);
			}
			return this._returnResult({
				data: Object.assign({}, data),
				error
			});
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: {
					user: null,
					session: null
				},
				error
			});
			throw error;
		}
	}
	async signInWithSolana(credentials) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
		let message;
		let signature;
		if ("message" in credentials) {
			message = credentials.message;
			signature = credentials.signature;
		} else {
			const { chain, wallet, statement, options } = credentials;
			let resolvedWallet;
			if (!isBrowser()) {
				if (typeof wallet !== "object" || !(options === null || options === void 0 ? void 0 : options.url)) throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
				resolvedWallet = wallet;
			} else if (typeof wallet === "object") resolvedWallet = wallet;
			else {
				const windowAny = window;
				if ("solana" in windowAny && typeof windowAny.solana === "object" && ("signIn" in windowAny.solana && typeof windowAny.solana.signIn === "function" || "signMessage" in windowAny.solana && typeof windowAny.solana.signMessage === "function")) resolvedWallet = windowAny.solana;
				else throw new Error(`@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.`);
			}
			const url = new URL((_a = options === null || options === void 0 ? void 0 : options.url) !== null && _a !== void 0 ? _a : window.location.href);
			if ("signIn" in resolvedWallet && resolvedWallet.signIn) {
				const output = await resolvedWallet.signIn(Object.assign(Object.assign(Object.assign({ issuedAt: (/* @__PURE__ */ new Date()).toISOString() }, options === null || options === void 0 ? void 0 : options.signInWithSolana), {
					version: "1",
					domain: url.host,
					uri: url.href
				}), statement ? { statement } : null));
				let outputToProcess;
				if (Array.isArray(output) && output[0] && typeof output[0] === "object") outputToProcess = output[0];
				else if (output && typeof output === "object" && "signedMessage" in output && "signature" in output) outputToProcess = output;
				else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");
				if ("signedMessage" in outputToProcess && "signature" in outputToProcess && (typeof outputToProcess.signedMessage === "string" || outputToProcess.signedMessage instanceof Uint8Array) && outputToProcess.signature instanceof Uint8Array) {
					message = typeof outputToProcess.signedMessage === "string" ? outputToProcess.signedMessage : new TextDecoder().decode(outputToProcess.signedMessage);
					signature = outputToProcess.signature;
				} else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields");
			} else {
				if (!("signMessage" in resolvedWallet) || typeof resolvedWallet.signMessage !== "function" || !("publicKey" in resolvedWallet) || typeof resolvedWallet !== "object" || !resolvedWallet.publicKey || !("toBase58" in resolvedWallet.publicKey) || typeof resolvedWallet.publicKey.toBase58 !== "function") throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");
				message = [
					`${url.host} wants you to sign in with your Solana account:`,
					resolvedWallet.publicKey.toBase58(),
					...statement ? [
						"",
						statement,
						""
					] : [""],
					"Version: 1",
					`URI: ${url.href}`,
					`Issued At: ${(_c = (_b = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _b === void 0 ? void 0 : _b.issuedAt) !== null && _c !== void 0 ? _c : (/* @__PURE__ */ new Date()).toISOString()}`,
					...((_d = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _d === void 0 ? void 0 : _d.notBefore) ? [`Not Before: ${options.signInWithSolana.notBefore}`] : [],
					...((_e = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _e === void 0 ? void 0 : _e.expirationTime) ? [`Expiration Time: ${options.signInWithSolana.expirationTime}`] : [],
					...((_f = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _f === void 0 ? void 0 : _f.chainId) ? [`Chain ID: ${options.signInWithSolana.chainId}`] : [],
					...((_g = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _g === void 0 ? void 0 : _g.nonce) ? [`Nonce: ${options.signInWithSolana.nonce}`] : [],
					...((_h = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _h === void 0 ? void 0 : _h.requestId) ? [`Request ID: ${options.signInWithSolana.requestId}`] : [],
					...((_k = (_j = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _j === void 0 ? void 0 : _j.resources) === null || _k === void 0 ? void 0 : _k.length) ? ["Resources", ...options.signInWithSolana.resources.map((resource) => `- ${resource}`)] : []
				].join("\n");
				const maybeSignature = await resolvedWallet.signMessage(new TextEncoder().encode(message), "utf8");
				if (!maybeSignature || !(maybeSignature instanceof Uint8Array)) throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");
				signature = maybeSignature;
			}
		}
		try {
			const { data, error } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
				headers: this.headers,
				body: Object.assign({
					chain: "solana",
					message,
					signature: bytesToBase64URL(signature)
				}, ((_l = credentials.options) === null || _l === void 0 ? void 0 : _l.captchaToken) ? { gotrue_meta_security: { captcha_token: (_m = credentials.options) === null || _m === void 0 ? void 0 : _m.captchaToken } } : null),
				xform: _sessionResponse
			});
			if (error) throw error;
			if (!data || !data.session || !data.user) {
				const invalidTokenError = new AuthInvalidTokenResponseError();
				return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error: invalidTokenError
				});
			}
			if (data.session) {
				await this._saveSession(data.session);
				await this._notifyAllSubscribers("SIGNED_IN", data.session);
			}
			return this._returnResult({
				data: Object.assign({}, data),
				error
			});
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: {
					user: null,
					session: null
				},
				error
			});
			throw error;
		}
	}
	async _exchangeCodeForSession(authCode) {
		const storageItem = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
		const [codeVerifier, redirectType] = (storageItem !== null && storageItem !== void 0 ? storageItem : "").split("/");
		try {
			if (!codeVerifier && this.flowType === "pkce") throw new AuthPKCECodeVerifierMissingError();
			const { data, error } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, {
				headers: this.headers,
				body: {
					auth_code: authCode,
					code_verifier: codeVerifier
				},
				xform: _sessionResponse
			});
			await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
			if (error) throw error;
			if (!data || !data.session || !data.user) {
				const invalidTokenError = new AuthInvalidTokenResponseError();
				return this._returnResult({
					data: {
						user: null,
						session: null,
						redirectType: null
					},
					error: invalidTokenError
				});
			}
			if (data.session) {
				await this._saveSession(data.session);
				await this._notifyAllSubscribers("SIGNED_IN", data.session);
			}
			return this._returnResult({
				data: Object.assign(Object.assign({}, data), { redirectType: redirectType !== null && redirectType !== void 0 ? redirectType : null }),
				error
			});
		} catch (error) {
			await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
			if (isAuthError(error)) return this._returnResult({
				data: {
					user: null,
					session: null,
					redirectType: null
				},
				error
			});
			throw error;
		}
	}
	/**
	* Allows signing in with an OIDC ID token. The authentication provider used
	* should be enabled and configured.
	*/
	async signInWithIdToken(credentials) {
		try {
			const { options, provider, token, access_token, nonce } = credentials;
			const { data, error } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
				headers: this.headers,
				body: {
					provider,
					id_token: token,
					access_token,
					nonce,
					gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
				},
				xform: _sessionResponse
			});
			if (error) return this._returnResult({
				data: {
					user: null,
					session: null
				},
				error
			});
			else if (!data || !data.session || !data.user) {
				const invalidTokenError = new AuthInvalidTokenResponseError();
				return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error: invalidTokenError
				});
			}
			if (data.session) {
				await this._saveSession(data.session);
				await this._notifyAllSubscribers("SIGNED_IN", data.session);
			}
			return this._returnResult({
				data,
				error
			});
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: {
					user: null,
					session: null
				},
				error
			});
			throw error;
		}
	}
	/**
	* Log in a user using magiclink or a one-time password (OTP).
	*
	* If the `{{ .ConfirmationURL }}` variable is specified in the email template, a magiclink will be sent.
	* If the `{{ .Token }}` variable is specified in the email template, an OTP will be sent.
	* If you're using phone sign-ins, only an OTP will be sent. You won't be able to send a magiclink for phone sign-ins.
	*
	* Be aware that you may get back an error message that will not distinguish
	* between the cases where the account does not exist or, that the account
	* can only be accessed via social login.
	*
	* Do note that you will need to configure a Whatsapp sender on Twilio
	* if you are using phone sign in with the 'whatsapp' channel. The whatsapp
	* channel is not supported on other providers
	* at this time.
	* This method supports PKCE when an email is passed.
	*/
	async signInWithOtp(credentials) {
		var _a, _b, _c, _d, _e;
		try {
			if ("email" in credentials) {
				const { email, options } = credentials;
				let codeChallenge = null;
				let codeChallengeMethod = null;
				if (this.flowType === "pkce") [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
				const { error } = await _request(this.fetch, "POST", `${this.url}/otp`, {
					headers: this.headers,
					body: {
						email,
						data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
						create_user: (_b = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _b !== void 0 ? _b : true,
						gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
						code_challenge: codeChallenge,
						code_challenge_method: codeChallengeMethod
					},
					redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo
				});
				return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
			}
			if ("phone" in credentials) {
				const { phone, options } = credentials;
				const { data, error } = await _request(this.fetch, "POST", `${this.url}/otp`, {
					headers: this.headers,
					body: {
						phone,
						data: (_c = options === null || options === void 0 ? void 0 : options.data) !== null && _c !== void 0 ? _c : {},
						create_user: (_d = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _d !== void 0 ? _d : true,
						gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
						channel: (_e = options === null || options === void 0 ? void 0 : options.channel) !== null && _e !== void 0 ? _e : "sms"
					}
				});
				return this._returnResult({
					data: {
						user: null,
						session: null,
						messageId: data === null || data === void 0 ? void 0 : data.message_id
					},
					error
				});
			}
			throw new AuthInvalidCredentialsError("You must provide either an email or phone number.");
		} catch (error) {
			await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
			if (isAuthError(error)) return this._returnResult({
				data: {
					user: null,
					session: null
				},
				error
			});
			throw error;
		}
	}
	/**
	* Log in a user given a User supplied OTP or TokenHash received through mobile or email.
	*/
	async verifyOtp(params) {
		var _a, _b;
		try {
			let redirectTo = void 0;
			let captchaToken = void 0;
			if ("options" in params) {
				redirectTo = (_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo;
				captchaToken = (_b = params.options) === null || _b === void 0 ? void 0 : _b.captchaToken;
			}
			const { data, error } = await _request(this.fetch, "POST", `${this.url}/verify`, {
				headers: this.headers,
				body: Object.assign(Object.assign({}, params), { gotrue_meta_security: { captcha_token: captchaToken } }),
				redirectTo,
				xform: _sessionResponse
			});
			if (error) throw error;
			if (!data) throw /* @__PURE__ */ new Error("An error occurred on token verification.");
			const session = data.session;
			const user = data.user;
			if (session === null || session === void 0 ? void 0 : session.access_token) {
				await this._saveSession(session);
				await this._notifyAllSubscribers(params.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", session);
			}
			return this._returnResult({
				data: {
					user,
					session
				},
				error: null
			});
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: {
					user: null,
					session: null
				},
				error
			});
			throw error;
		}
	}
	/**
	* Attempts a single-sign on using an enterprise Identity Provider. A
	* successful SSO attempt will redirect the current page to the identity
	* provider authorization page. The redirect URL is implementation and SSO
	* protocol specific.
	*
	* You can use it by providing a SSO domain. Typically you can extract this
	* domain by asking users for their email address. If this domain is
	* registered on the Auth instance the redirect will use that organization's
	* currently active SSO Identity Provider for the login.
	*
	* If you have built an organization-specific login page, you can use the
	* organization's SSO Identity Provider UUID directly instead.
	*/
	async signInWithSSO(params) {
		var _a, _b, _c, _d, _e;
		try {
			let codeChallenge = null;
			let codeChallengeMethod = null;
			if (this.flowType === "pkce") [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
			const result = await _request(this.fetch, "POST", `${this.url}/sso`, {
				body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in params ? { provider_id: params.providerId } : null), "domain" in params ? { domain: params.domain } : null), { redirect_to: (_b = (_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo) !== null && _b !== void 0 ? _b : void 0 }), ((_c = params === null || params === void 0 ? void 0 : params.options) === null || _c === void 0 ? void 0 : _c.captchaToken) ? { gotrue_meta_security: { captcha_token: params.options.captchaToken } } : null), {
					skip_http_redirect: true,
					code_challenge: codeChallenge,
					code_challenge_method: codeChallengeMethod
				}),
				headers: this.headers,
				xform: _ssoResponse
			});
			if (((_d = result.data) === null || _d === void 0 ? void 0 : _d.url) && isBrowser() && !((_e = params.options) === null || _e === void 0 ? void 0 : _e.skipBrowserRedirect)) window.location.assign(result.data.url);
			return this._returnResult(result);
		} catch (error) {
			await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
			if (isAuthError(error)) return this._returnResult({
				data: null,
				error
			});
			throw error;
		}
	}
	/**
	* Sends a reauthentication OTP to the user's email or phone number.
	* Requires the user to be signed-in.
	*/
	async reauthenticate() {
		await this.initializePromise;
		return await this._acquireLock(this.lockAcquireTimeout, async () => {
			return await this._reauthenticate();
		});
	}
	async _reauthenticate() {
		try {
			return await this._useSession(async (result) => {
				const { data: { session }, error: sessionError } = result;
				if (sessionError) throw sessionError;
				if (!session) throw new AuthSessionMissingError();
				const { error } = await _request(this.fetch, "GET", `${this.url}/reauthenticate`, {
					headers: this.headers,
					jwt: session.access_token
				});
				return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
			});
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: {
					user: null,
					session: null
				},
				error
			});
			throw error;
		}
	}
	/**
	* Resends an existing signup confirmation email, email change email, SMS OTP or phone change OTP.
	*/
	async resend(credentials) {
		try {
			const endpoint = `${this.url}/resend`;
			if ("email" in credentials) {
				const { email, type, options } = credentials;
				const { error } = await _request(this.fetch, "POST", endpoint, {
					headers: this.headers,
					body: {
						email,
						type,
						gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
					},
					redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo
				});
				return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
			} else if ("phone" in credentials) {
				const { phone, type, options } = credentials;
				const { data, error } = await _request(this.fetch, "POST", endpoint, {
					headers: this.headers,
					body: {
						phone,
						type,
						gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
					}
				});
				return this._returnResult({
					data: {
						user: null,
						session: null,
						messageId: data === null || data === void 0 ? void 0 : data.message_id
					},
					error
				});
			}
			throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a type");
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: {
					user: null,
					session: null
				},
				error
			});
			throw error;
		}
	}
	/**
	* Returns the session, refreshing it if necessary.
	*
	* The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.
	*
	* **IMPORTANT:** This method loads values directly from the storage attached
	* to the client. If that storage is based on request cookies for example,
	* the values in it may not be authentic and therefore it's strongly advised
	* against using this method and its results in such circumstances. A warning
	* will be emitted if this is detected. Use {@link #getUser()} instead.
	*/
	async getSession() {
		await this.initializePromise;
		return await this._acquireLock(this.lockAcquireTimeout, async () => {
			return this._useSession(async (result) => {
				return result;
			});
		});
	}
	/**
	* Acquires a global lock based on the storage key.
	*/
	async _acquireLock(acquireTimeout, fn) {
		this._debug("#_acquireLock", "begin", acquireTimeout);
		try {
			if (this.lockAcquired) {
				const last = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve();
				const result = (async () => {
					await last;
					return await fn();
				})();
				this.pendingInLock.push((async () => {
					try {
						await result;
					} catch (e) {}
				})());
				return result;
			}
			return await this.lock(`lock:${this.storageKey}`, acquireTimeout, async () => {
				this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
				try {
					this.lockAcquired = true;
					const result = fn();
					this.pendingInLock.push((async () => {
						try {
							await result;
						} catch (e) {}
					})());
					await result;
					while (this.pendingInLock.length) {
						const waitOn = [...this.pendingInLock];
						await Promise.all(waitOn);
						this.pendingInLock.splice(0, waitOn.length);
					}
					return await result;
				} finally {
					this._debug("#_acquireLock", "lock released for storage key", this.storageKey);
					this.lockAcquired = false;
				}
			});
		} finally {
			this._debug("#_acquireLock", "end");
		}
	}
	/**
	* Use instead of {@link #getSession} inside the library. It is
	* semantically usually what you want, as getting a session involves some
	* processing afterwards that requires only one client operating on the
	* session at once across multiple tabs or processes.
	*/
	async _useSession(fn) {
		this._debug("#_useSession", "begin");
		try {
			return await fn(await this.__loadSession());
		} finally {
			this._debug("#_useSession", "end");
		}
	}
	/**
	* NEVER USE DIRECTLY!
	*
	* Always use {@link #_useSession}.
	*/
	async __loadSession() {
		this._debug("#__loadSession()", "begin");
		if (!this.lockAcquired) this._debug("#__loadSession()", "used outside of an acquired lock!", (/* @__PURE__ */ new Error()).stack);
		try {
			let currentSession = null;
			const maybeSession = await getItemAsync(this.storage, this.storageKey);
			this._debug("#getSession()", "session from storage", maybeSession);
			if (maybeSession !== null) if (this._isValidSession(maybeSession)) currentSession = maybeSession;
			else {
				this._debug("#getSession()", "session from storage is not valid");
				await this._removeSession();
			}
			if (!currentSession) return {
				data: { session: null },
				error: null
			};
			const hasExpired = currentSession.expires_at ? currentSession.expires_at * 1e3 - Date.now() < EXPIRY_MARGIN_MS : false;
			this._debug("#__loadSession()", `session has${hasExpired ? "" : " not"} expired`, "expires_at", currentSession.expires_at);
			if (!hasExpired) {
				if (this.userStorage) {
					const maybeUser = await getItemAsync(this.userStorage, this.storageKey + "-user");
					if (maybeUser === null || maybeUser === void 0 ? void 0 : maybeUser.user) currentSession.user = maybeUser.user;
					else currentSession.user = userNotAvailableProxy();
				}
				if (this.storage.isServer && currentSession.user && !currentSession.user.__isUserNotAvailableProxy) {
					const suppressWarningRef = { value: this.suppressGetSessionWarning };
					currentSession.user = insecureUserWarningProxy(currentSession.user, suppressWarningRef);
					if (suppressWarningRef.value) this.suppressGetSessionWarning = true;
				}
				return {
					data: { session: currentSession },
					error: null
				};
			}
			const { data: session, error } = await this._callRefreshToken(currentSession.refresh_token);
			if (error) return this._returnResult({
				data: { session: null },
				error
			});
			return this._returnResult({
				data: { session },
				error: null
			});
		} finally {
			this._debug("#__loadSession()", "end");
		}
	}
	/**
	* Gets the current user details if there is an existing session. This method
	* performs a network request to the Supabase Auth server, so the returned
	* value is authentic and can be used to base authorization rules on.
	*
	* @param jwt Takes in an optional access token JWT. If no JWT is provided, the JWT from the current session is used.
	*/
	async getUser(jwt) {
		if (jwt) return await this._getUser(jwt);
		await this.initializePromise;
		const result = await this._acquireLock(this.lockAcquireTimeout, async () => {
			return await this._getUser();
		});
		if (result.data.user) this.suppressGetSessionWarning = true;
		return result;
	}
	async _getUser(jwt) {
		try {
			if (jwt) return await _request(this.fetch, "GET", `${this.url}/user`, {
				headers: this.headers,
				jwt,
				xform: _userResponse
			});
			return await this._useSession(async (result) => {
				var _a, _b, _c;
				const { data, error } = result;
				if (error) throw error;
				if (!((_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) && !this.hasCustomAuthorizationHeader) return {
					data: { user: null },
					error: new AuthSessionMissingError()
				};
				return await _request(this.fetch, "GET", `${this.url}/user`, {
					headers: this.headers,
					jwt: (_c = (_b = data.session) === null || _b === void 0 ? void 0 : _b.access_token) !== null && _c !== void 0 ? _c : void 0,
					xform: _userResponse
				});
			});
		} catch (error) {
			if (isAuthError(error)) {
				if (isAuthSessionMissingError(error)) {
					await this._removeSession();
					await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
				}
				return this._returnResult({
					data: { user: null },
					error
				});
			}
			throw error;
		}
	}
	/**
	* Updates user data for a logged in user.
	*/
	async updateUser(attributes, options = {}) {
		await this.initializePromise;
		return await this._acquireLock(this.lockAcquireTimeout, async () => {
			return await this._updateUser(attributes, options);
		});
	}
	async _updateUser(attributes, options = {}) {
		try {
			return await this._useSession(async (result) => {
				const { data: sessionData, error: sessionError } = result;
				if (sessionError) throw sessionError;
				if (!sessionData.session) throw new AuthSessionMissingError();
				const session = sessionData.session;
				let codeChallenge = null;
				let codeChallengeMethod = null;
				if (this.flowType === "pkce" && attributes.email != null) [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
				const { data, error: userError } = await _request(this.fetch, "PUT", `${this.url}/user`, {
					headers: this.headers,
					redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
					body: Object.assign(Object.assign({}, attributes), {
						code_challenge: codeChallenge,
						code_challenge_method: codeChallengeMethod
					}),
					jwt: session.access_token,
					xform: _userResponse
				});
				if (userError) throw userError;
				session.user = data.user;
				await this._saveSession(session);
				await this._notifyAllSubscribers("USER_UPDATED", session);
				return this._returnResult({
					data: { user: session.user },
					error: null
				});
			});
		} catch (error) {
			await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
			if (isAuthError(error)) return this._returnResult({
				data: { user: null },
				error
			});
			throw error;
		}
	}
	/**
	* Sets the session data from the current session. If the current session is expired, setSession will take care of refreshing it to obtain a new session.
	* If the refresh token or access token in the current session is invalid, an error will be thrown.
	* @param currentSession The current session that minimally contains an access token and refresh token.
	*/
	async setSession(currentSession) {
		await this.initializePromise;
		return await this._acquireLock(this.lockAcquireTimeout, async () => {
			return await this._setSession(currentSession);
		});
	}
	async _setSession(currentSession) {
		try {
			if (!currentSession.access_token || !currentSession.refresh_token) throw new AuthSessionMissingError();
			const timeNow = Date.now() / 1e3;
			let expiresAt = timeNow;
			let hasExpired = true;
			let session = null;
			const { payload } = decodeJWT(currentSession.access_token);
			if (payload.exp) {
				expiresAt = payload.exp;
				hasExpired = expiresAt <= timeNow;
			}
			if (hasExpired) {
				const { data: refreshedSession, error } = await this._callRefreshToken(currentSession.refresh_token);
				if (error) return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
				if (!refreshedSession) return {
					data: {
						user: null,
						session: null
					},
					error: null
				};
				session = refreshedSession;
			} else {
				const { data, error } = await this._getUser(currentSession.access_token);
				if (error) return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
				session = {
					access_token: currentSession.access_token,
					refresh_token: currentSession.refresh_token,
					user: data.user,
					token_type: "bearer",
					expires_in: expiresAt - timeNow,
					expires_at: expiresAt
				};
				await this._saveSession(session);
				await this._notifyAllSubscribers("SIGNED_IN", session);
			}
			return this._returnResult({
				data: {
					user: session.user,
					session
				},
				error: null
			});
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: {
					session: null,
					user: null
				},
				error
			});
			throw error;
		}
	}
	/**
	* Returns a new session, regardless of expiry status.
	* Takes in an optional current session. If not passed in, then refreshSession() will attempt to retrieve it from getSession().
	* If the current session's refresh token is invalid, an error will be thrown.
	* @param currentSession The current session. If passed in, it must contain a refresh token.
	*/
	async refreshSession(currentSession) {
		await this.initializePromise;
		return await this._acquireLock(this.lockAcquireTimeout, async () => {
			return await this._refreshSession(currentSession);
		});
	}
	async _refreshSession(currentSession) {
		try {
			return await this._useSession(async (result) => {
				var _a;
				if (!currentSession) {
					const { data, error } = result;
					if (error) throw error;
					currentSession = (_a = data.session) !== null && _a !== void 0 ? _a : void 0;
				}
				if (!(currentSession === null || currentSession === void 0 ? void 0 : currentSession.refresh_token)) throw new AuthSessionMissingError();
				const { data: session, error } = await this._callRefreshToken(currentSession.refresh_token);
				if (error) return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
				if (!session) return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error: null
				});
				return this._returnResult({
					data: {
						user: session.user,
						session
					},
					error: null
				});
			});
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: {
					user: null,
					session: null
				},
				error
			});
			throw error;
		}
	}
	/**
	* Gets the session data from a URL string
	*/
	async _getSessionFromURL(params, callbackUrlType) {
		try {
			if (!isBrowser()) throw new AuthImplicitGrantRedirectError("No browser detected.");
			if (params.error || params.error_description || params.error_code) throw new AuthImplicitGrantRedirectError(params.error_description || "Error in URL with unspecified error_description", {
				error: params.error || "unspecified_error",
				code: params.error_code || "unspecified_code"
			});
			switch (callbackUrlType) {
				case "implicit":
					if (this.flowType === "pkce") throw new AuthPKCEGrantCodeExchangeError("Not a valid PKCE flow url.");
					break;
				case "pkce":
					if (this.flowType === "implicit") throw new AuthImplicitGrantRedirectError("Not a valid implicit grant flow url.");
					break;
				default:
			}
			if (callbackUrlType === "pkce") {
				this._debug("#_initialize()", "begin", "is PKCE flow", true);
				if (!params.code) throw new AuthPKCEGrantCodeExchangeError("No code detected.");
				const { data, error } = await this._exchangeCodeForSession(params.code);
				if (error) throw error;
				const url = new URL(window.location.href);
				url.searchParams.delete("code");
				window.history.replaceState(window.history.state, "", url.toString());
				return {
					data: {
						session: data.session,
						redirectType: null
					},
					error: null
				};
			}
			const { provider_token, provider_refresh_token, access_token, refresh_token, expires_in, expires_at, token_type } = params;
			if (!access_token || !expires_in || !refresh_token || !token_type) throw new AuthImplicitGrantRedirectError("No session defined in URL");
			const timeNow = Math.round(Date.now() / 1e3);
			const expiresIn = parseInt(expires_in);
			let expiresAt = timeNow + expiresIn;
			if (expires_at) expiresAt = parseInt(expires_at);
			const actuallyExpiresIn = expiresAt - timeNow;
			if (actuallyExpiresIn * 1e3 <= 3e4) console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${actuallyExpiresIn}s, should have been closer to ${expiresIn}s`);
			const issuedAt = expiresAt - expiresIn;
			if (timeNow - issuedAt >= 120) console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", issuedAt, expiresAt, timeNow);
			else if (timeNow - issuedAt < 0) console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew", issuedAt, expiresAt, timeNow);
			const { data, error } = await this._getUser(access_token);
			if (error) throw error;
			const session = {
				provider_token,
				provider_refresh_token,
				access_token,
				expires_in: expiresIn,
				expires_at: expiresAt,
				refresh_token,
				token_type,
				user: data.user
			};
			window.location.hash = "";
			this._debug("#_getSessionFromURL()", "clearing window.location.hash");
			return this._returnResult({
				data: {
					session,
					redirectType: params.type
				},
				error: null
			});
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: {
					session: null,
					redirectType: null
				},
				error
			});
			throw error;
		}
	}
	/**
	* Checks if the current URL contains parameters given by an implicit oauth grant flow (https://www.rfc-editor.org/rfc/rfc6749.html#section-4.2)
	*
	* If `detectSessionInUrl` is a function, it will be called with the URL and params to determine
	* if the URL should be processed as a Supabase auth callback. This allows users to exclude
	* URLs from other OAuth providers (e.g., Facebook Login) that also return access_token in the fragment.
	*/
	_isImplicitGrantCallback(params) {
		if (typeof this.detectSessionInUrl === "function") return this.detectSessionInUrl(new URL(window.location.href), params);
		return Boolean(params.access_token || params.error_description);
	}
	/**
	* Checks if the current URL and backing storage contain parameters given by a PKCE flow
	*/
	async _isPKCECallback(params) {
		const currentStorageContent = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
		return !!(params.code && currentStorageContent);
	}
	/**
	* Inside a browser context, `signOut()` will remove the logged in user from the browser session and log them out - removing all items from localstorage and then trigger a `"SIGNED_OUT"` event.
	*
	* For server-side management, you can revoke all refresh tokens for a user by passing a user's JWT through to `auth.api.signOut(JWT: string)`.
	* There is no way to revoke a user's access token jwt until it expires. It is recommended to set a shorter expiry on the jwt for this reason.
	*
	* If using `others` scope, no `SIGNED_OUT` event is fired!
	*/
	async signOut(options = { scope: "global" }) {
		await this.initializePromise;
		return await this._acquireLock(this.lockAcquireTimeout, async () => {
			return await this._signOut(options);
		});
	}
	async _signOut({ scope } = { scope: "global" }) {
		return await this._useSession(async (result) => {
			var _a;
			const { data, error: sessionError } = result;
			if (sessionError && !isAuthSessionMissingError(sessionError)) return this._returnResult({ error: sessionError });
			const accessToken = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token;
			if (accessToken) {
				const { error } = await this.admin.signOut(accessToken, scope);
				if (error) {
					if (!(isAuthApiError(error) && (error.status === 404 || error.status === 401 || error.status === 403) || isAuthSessionMissingError(error))) return this._returnResult({ error });
				}
			}
			if (scope !== "others") {
				await this._removeSession();
				await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
			}
			return this._returnResult({ error: null });
		});
	}
	onAuthStateChange(callback) {
		const id = generateCallbackId();
		const subscription = {
			id,
			callback,
			unsubscribe: () => {
				this._debug("#unsubscribe()", "state change callback with id removed", id);
				this.stateChangeEmitters.delete(id);
			}
		};
		this._debug("#onAuthStateChange()", "registered callback with id", id);
		this.stateChangeEmitters.set(id, subscription);
		(async () => {
			await this.initializePromise;
			await this._acquireLock(this.lockAcquireTimeout, async () => {
				this._emitInitialSession(id);
			});
		})();
		return { data: { subscription } };
	}
	async _emitInitialSession(id) {
		return await this._useSession(async (result) => {
			var _a, _b;
			try {
				const { data: { session }, error } = result;
				if (error) throw error;
				await ((_a = this.stateChangeEmitters.get(id)) === null || _a === void 0 ? void 0 : _a.callback("INITIAL_SESSION", session));
				this._debug("INITIAL_SESSION", "callback id", id, "session", session);
			} catch (err) {
				await ((_b = this.stateChangeEmitters.get(id)) === null || _b === void 0 ? void 0 : _b.callback("INITIAL_SESSION", null));
				this._debug("INITIAL_SESSION", "callback id", id, "error", err);
				console.error(err);
			}
		});
	}
	/**
	* Sends a password reset request to an email address. This method supports the PKCE flow.
	*
	* @param email The email address of the user.
	* @param options.redirectTo The URL to send the user to after they click the password reset link.
	* @param options.captchaToken Verification token received when the user completes the captcha on the site.
	*/
	async resetPasswordForEmail(email, options = {}) {
		let codeChallenge = null;
		let codeChallengeMethod = null;
		if (this.flowType === "pkce") [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey, true);
		try {
			return await _request(this.fetch, "POST", `${this.url}/recover`, {
				body: {
					email,
					code_challenge: codeChallenge,
					code_challenge_method: codeChallengeMethod,
					gotrue_meta_security: { captcha_token: options.captchaToken }
				},
				headers: this.headers,
				redirectTo: options.redirectTo
			});
		} catch (error) {
			await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
			if (isAuthError(error)) return this._returnResult({
				data: null,
				error
			});
			throw error;
		}
	}
	/**
	* Gets all the identities linked to a user.
	*/
	async getUserIdentities() {
		var _a;
		try {
			const { data, error } = await this.getUser();
			if (error) throw error;
			return this._returnResult({
				data: { identities: (_a = data.user.identities) !== null && _a !== void 0 ? _a : [] },
				error: null
			});
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: null,
				error
			});
			throw error;
		}
	}
	async linkIdentity(credentials) {
		if ("token" in credentials) return this.linkIdentityIdToken(credentials);
		return this.linkIdentityOAuth(credentials);
	}
	async linkIdentityOAuth(credentials) {
		var _a;
		try {
			const { data, error } = await this._useSession(async (result) => {
				var _a, _b, _c, _d, _e;
				const { data, error } = result;
				if (error) throw error;
				const url = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, credentials.provider, {
					redirectTo: (_a = credentials.options) === null || _a === void 0 ? void 0 : _a.redirectTo,
					scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
					queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
					skipBrowserRedirect: true
				});
				return await _request(this.fetch, "GET", url, {
					headers: this.headers,
					jwt: (_e = (_d = data.session) === null || _d === void 0 ? void 0 : _d.access_token) !== null && _e !== void 0 ? _e : void 0
				});
			});
			if (error) throw error;
			if (isBrowser() && !((_a = credentials.options) === null || _a === void 0 ? void 0 : _a.skipBrowserRedirect)) window.location.assign(data === null || data === void 0 ? void 0 : data.url);
			return this._returnResult({
				data: {
					provider: credentials.provider,
					url: data === null || data === void 0 ? void 0 : data.url
				},
				error: null
			});
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: {
					provider: credentials.provider,
					url: null
				},
				error
			});
			throw error;
		}
	}
	async linkIdentityIdToken(credentials) {
		return await this._useSession(async (result) => {
			var _a;
			try {
				const { error: sessionError, data: { session } } = result;
				if (sessionError) throw sessionError;
				const { options, provider, token, access_token, nonce } = credentials;
				const { data, error } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
					headers: this.headers,
					jwt: (_a = session === null || session === void 0 ? void 0 : session.access_token) !== null && _a !== void 0 ? _a : void 0,
					body: {
						provider,
						id_token: token,
						access_token,
						nonce,
						link_identity: true,
						gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
					},
					xform: _sessionResponse
				});
				if (error) return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
				else if (!data || !data.session || !data.user) return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error: new AuthInvalidTokenResponseError()
				});
				if (data.session) {
					await this._saveSession(data.session);
					await this._notifyAllSubscribers("USER_UPDATED", data.session);
				}
				return this._returnResult({
					data,
					error
				});
			} catch (error) {
				await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
				if (isAuthError(error)) return this._returnResult({
					data: {
						user: null,
						session: null
					},
					error
				});
				throw error;
			}
		});
	}
	/**
	* Unlinks an identity from a user by deleting it. The user will no longer be able to sign in with that identity once it's unlinked.
	*/
	async unlinkIdentity(identity) {
		try {
			return await this._useSession(async (result) => {
				var _a, _b;
				const { data, error } = result;
				if (error) throw error;
				return await _request(this.fetch, "DELETE", `${this.url}/user/identities/${identity.identity_id}`, {
					headers: this.headers,
					jwt: (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : void 0
				});
			});
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: null,
				error
			});
			throw error;
		}
	}
	/**
	* Generates a new JWT.
	* @param refreshToken A valid refresh token that was returned on login.
	*/
	async _refreshAccessToken(refreshToken) {
		const debugName = `#_refreshAccessToken(${refreshToken.substring(0, 5)}...)`;
		this._debug(debugName, "begin");
		try {
			const startedAt = Date.now();
			return await retryable(async (attempt) => {
				if (attempt > 0) await sleep(200 * Math.pow(2, attempt - 1));
				this._debug(debugName, "refreshing attempt", attempt);
				return await _request(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
					body: { refresh_token: refreshToken },
					headers: this.headers,
					xform: _sessionResponse
				});
			}, (attempt, error) => {
				const nextBackOffInterval = 200 * Math.pow(2, attempt);
				return error && isAuthRetryableFetchError(error) && Date.now() + nextBackOffInterval - startedAt < 3e4;
			});
		} catch (error) {
			this._debug(debugName, "error", error);
			if (isAuthError(error)) return this._returnResult({
				data: {
					session: null,
					user: null
				},
				error
			});
			throw error;
		} finally {
			this._debug(debugName, "end");
		}
	}
	_isValidSession(maybeSession) {
		return typeof maybeSession === "object" && maybeSession !== null && "access_token" in maybeSession && "refresh_token" in maybeSession && "expires_at" in maybeSession;
	}
	async _handleProviderSignIn(provider, options) {
		const url = await this._getUrlForProvider(`${this.url}/authorize`, provider, {
			redirectTo: options.redirectTo,
			scopes: options.scopes,
			queryParams: options.queryParams
		});
		this._debug("#_handleProviderSignIn()", "provider", provider, "options", options, "url", url);
		if (isBrowser() && !options.skipBrowserRedirect) window.location.assign(url);
		return {
			data: {
				provider,
				url
			},
			error: null
		};
	}
	/**
	* Recovers the session from LocalStorage and refreshes the token
	* Note: this method is async to accommodate for AsyncStorage e.g. in React native.
	*/
	async _recoverAndRefresh() {
		var _a, _b;
		const debugName = "#_recoverAndRefresh()";
		this._debug(debugName, "begin");
		try {
			const currentSession = await getItemAsync(this.storage, this.storageKey);
			if (currentSession && this.userStorage) {
				let maybeUser = await getItemAsync(this.userStorage, this.storageKey + "-user");
				if (!this.storage.isServer && Object.is(this.storage, this.userStorage) && !maybeUser) {
					maybeUser = { user: currentSession.user };
					await setItemAsync(this.userStorage, this.storageKey + "-user", maybeUser);
				}
				currentSession.user = (_a = maybeUser === null || maybeUser === void 0 ? void 0 : maybeUser.user) !== null && _a !== void 0 ? _a : userNotAvailableProxy();
			} else if (currentSession && !currentSession.user) {
				if (!currentSession.user) {
					const separateUser = await getItemAsync(this.storage, this.storageKey + "-user");
					if (separateUser && (separateUser === null || separateUser === void 0 ? void 0 : separateUser.user)) {
						currentSession.user = separateUser.user;
						await removeItemAsync(this.storage, this.storageKey + "-user");
						await setItemAsync(this.storage, this.storageKey, currentSession);
					} else currentSession.user = userNotAvailableProxy();
				}
			}
			this._debug(debugName, "session from storage", currentSession);
			if (!this._isValidSession(currentSession)) {
				this._debug(debugName, "session is not valid");
				if (currentSession !== null) await this._removeSession();
				return;
			}
			const expiresWithMargin = ((_b = currentSession.expires_at) !== null && _b !== void 0 ? _b : Infinity) * 1e3 - Date.now() < EXPIRY_MARGIN_MS;
			this._debug(debugName, `session has${expiresWithMargin ? "" : " not"} expired with margin of ${EXPIRY_MARGIN_MS}s`);
			if (expiresWithMargin) {
				if (this.autoRefreshToken && currentSession.refresh_token) {
					const { error } = await this._callRefreshToken(currentSession.refresh_token);
					if (error) {
						console.error(error);
						if (!isAuthRetryableFetchError(error)) {
							this._debug(debugName, "refresh failed with a non-retryable error, removing the session", error);
							await this._removeSession();
						}
					}
				}
			} else if (currentSession.user && currentSession.user.__isUserNotAvailableProxy === true) try {
				const { data, error: userError } = await this._getUser(currentSession.access_token);
				if (!userError && (data === null || data === void 0 ? void 0 : data.user)) {
					currentSession.user = data.user;
					await this._saveSession(currentSession);
					await this._notifyAllSubscribers("SIGNED_IN", currentSession);
				} else this._debug(debugName, "could not get user data, skipping SIGNED_IN notification");
			} catch (getUserError) {
				console.error("Error getting user data:", getUserError);
				this._debug(debugName, "error getting user data, skipping SIGNED_IN notification", getUserError);
			}
			else await this._notifyAllSubscribers("SIGNED_IN", currentSession);
		} catch (err) {
			this._debug(debugName, "error", err);
			console.error(err);
			return;
		} finally {
			this._debug(debugName, "end");
		}
	}
	async _callRefreshToken(refreshToken) {
		var _a, _b;
		if (!refreshToken) throw new AuthSessionMissingError();
		if (this.refreshingDeferred) return this.refreshingDeferred.promise;
		const debugName = `#_callRefreshToken(${refreshToken.substring(0, 5)}...)`;
		this._debug(debugName, "begin");
		try {
			this.refreshingDeferred = new Deferred();
			const { data, error } = await this._refreshAccessToken(refreshToken);
			if (error) throw error;
			if (!data.session) throw new AuthSessionMissingError();
			await this._saveSession(data.session);
			await this._notifyAllSubscribers("TOKEN_REFRESHED", data.session);
			const result = {
				data: data.session,
				error: null
			};
			this.refreshingDeferred.resolve(result);
			return result;
		} catch (error) {
			this._debug(debugName, "error", error);
			if (isAuthError(error)) {
				const result = {
					data: null,
					error
				};
				if (!isAuthRetryableFetchError(error)) await this._removeSession();
				(_a = this.refreshingDeferred) === null || _a === void 0 || _a.resolve(result);
				return result;
			}
			(_b = this.refreshingDeferred) === null || _b === void 0 || _b.reject(error);
			throw error;
		} finally {
			this.refreshingDeferred = null;
			this._debug(debugName, "end");
		}
	}
	async _notifyAllSubscribers(event, session, broadcast = true) {
		const debugName = `#_notifyAllSubscribers(${event})`;
		this._debug(debugName, "begin", session, `broadcast = ${broadcast}`);
		try {
			if (this.broadcastChannel && broadcast) this.broadcastChannel.postMessage({
				event,
				session
			});
			const errors = [];
			const promises = Array.from(this.stateChangeEmitters.values()).map(async (x) => {
				try {
					await x.callback(event, session);
				} catch (e) {
					errors.push(e);
				}
			});
			await Promise.all(promises);
			if (errors.length > 0) {
				for (let i = 0; i < errors.length; i += 1) console.error(errors[i]);
				throw errors[0];
			}
		} finally {
			this._debug(debugName, "end");
		}
	}
	/**
	* set currentSession and currentUser
	* process to _startAutoRefreshToken if possible
	*/
	async _saveSession(session) {
		this._debug("#_saveSession()", session);
		this.suppressGetSessionWarning = true;
		await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
		const sessionToProcess = Object.assign({}, session);
		const userIsProxy = sessionToProcess.user && sessionToProcess.user.__isUserNotAvailableProxy === true;
		if (this.userStorage) {
			if (!userIsProxy && sessionToProcess.user) await setItemAsync(this.userStorage, this.storageKey + "-user", { user: sessionToProcess.user });
			else if (userIsProxy) {}
			const mainSessionData = Object.assign({}, sessionToProcess);
			delete mainSessionData.user;
			const clonedMainSessionData = deepClone(mainSessionData);
			await setItemAsync(this.storage, this.storageKey, clonedMainSessionData);
		} else {
			const clonedSession = deepClone(sessionToProcess);
			await setItemAsync(this.storage, this.storageKey, clonedSession);
		}
	}
	async _removeSession() {
		this._debug("#_removeSession()");
		this.suppressGetSessionWarning = false;
		await removeItemAsync(this.storage, this.storageKey);
		await removeItemAsync(this.storage, this.storageKey + "-code-verifier");
		await removeItemAsync(this.storage, this.storageKey + "-user");
		if (this.userStorage) await removeItemAsync(this.userStorage, this.storageKey + "-user");
		await this._notifyAllSubscribers("SIGNED_OUT", null);
	}
	/**
	* Removes any registered visibilitychange callback.
	*
	* {@see #startAutoRefresh}
	* {@see #stopAutoRefresh}
	*/
	_removeVisibilityChangedCallback() {
		this._debug("#_removeVisibilityChangedCallback()");
		const callback = this.visibilityChangedCallback;
		this.visibilityChangedCallback = null;
		try {
			if (callback && isBrowser() && (window === null || window === void 0 ? void 0 : window.removeEventListener)) window.removeEventListener("visibilitychange", callback);
		} catch (e) {
			console.error("removing visibilitychange callback failed", e);
		}
	}
	/**
	* This is the private implementation of {@link #startAutoRefresh}. Use this
	* within the library.
	*/
	async _startAutoRefresh() {
		await this._stopAutoRefresh();
		this._debug("#_startAutoRefresh()");
		const ticker = setInterval(() => this._autoRefreshTokenTick(), AUTO_REFRESH_TICK_DURATION_MS);
		this.autoRefreshTicker = ticker;
		if (ticker && typeof ticker === "object" && typeof ticker.unref === "function") ticker.unref();
		else if (typeof Deno !== "undefined" && typeof Deno.unrefTimer === "function") Deno.unrefTimer(ticker);
		const timeout = setTimeout(async () => {
			await this.initializePromise;
			await this._autoRefreshTokenTick();
		}, 0);
		this.autoRefreshTickTimeout = timeout;
		if (timeout && typeof timeout === "object" && typeof timeout.unref === "function") timeout.unref();
		else if (typeof Deno !== "undefined" && typeof Deno.unrefTimer === "function") Deno.unrefTimer(timeout);
	}
	/**
	* This is the private implementation of {@link #stopAutoRefresh}. Use this
	* within the library.
	*/
	async _stopAutoRefresh() {
		this._debug("#_stopAutoRefresh()");
		const ticker = this.autoRefreshTicker;
		this.autoRefreshTicker = null;
		if (ticker) clearInterval(ticker);
		const timeout = this.autoRefreshTickTimeout;
		this.autoRefreshTickTimeout = null;
		if (timeout) clearTimeout(timeout);
	}
	/**
	* Starts an auto-refresh process in the background. The session is checked
	* every few seconds. Close to the time of expiration a process is started to
	* refresh the session. If refreshing fails it will be retried for as long as
	* necessary.
	*
	* If you set the {@link GoTrueClientOptions#autoRefreshToken} you don't need
	* to call this function, it will be called for you.
	*
	* On browsers the refresh process works only when the tab/window is in the
	* foreground to conserve resources as well as prevent race conditions and
	* flooding auth with requests. If you call this method any managed
	* visibility change callback will be removed and you must manage visibility
	* changes on your own.
	*
	* On non-browser platforms the refresh process works *continuously* in the
	* background, which may not be desirable. You should hook into your
	* platform's foreground indication mechanism and call these methods
	* appropriately to conserve resources.
	*
	* {@see #stopAutoRefresh}
	*/
	async startAutoRefresh() {
		this._removeVisibilityChangedCallback();
		await this._startAutoRefresh();
	}
	/**
	* Stops an active auto refresh process running in the background (if any).
	*
	* If you call this method any managed visibility change callback will be
	* removed and you must manage visibility changes on your own.
	*
	* See {@link #startAutoRefresh} for more details.
	*/
	async stopAutoRefresh() {
		this._removeVisibilityChangedCallback();
		await this._stopAutoRefresh();
	}
	/**
	* Runs the auto refresh token tick.
	*/
	async _autoRefreshTokenTick() {
		this._debug("#_autoRefreshTokenTick()", "begin");
		try {
			await this._acquireLock(0, async () => {
				try {
					const now = Date.now();
					try {
						return await this._useSession(async (result) => {
							const { data: { session } } = result;
							if (!session || !session.refresh_token || !session.expires_at) {
								this._debug("#_autoRefreshTokenTick()", "no session");
								return;
							}
							const expiresInTicks = Math.floor((session.expires_at * 1e3 - now) / AUTO_REFRESH_TICK_DURATION_MS);
							this._debug("#_autoRefreshTokenTick()", `access token expires in ${expiresInTicks} ticks, a tick lasts ${AUTO_REFRESH_TICK_DURATION_MS}ms, refresh threshold is 3 ticks`);
							if (expiresInTicks <= 3) await this._callRefreshToken(session.refresh_token);
						});
					} catch (e) {
						console.error("Auto refresh tick failed with error. This is likely a transient error.", e);
					}
				} finally {
					this._debug("#_autoRefreshTokenTick()", "end");
				}
			});
		} catch (e) {
			if (e.isAcquireTimeout || e instanceof LockAcquireTimeoutError) this._debug("auto refresh token tick lock not available");
			else throw e;
		}
	}
	/**
	* Registers callbacks on the browser / platform, which in-turn run
	* algorithms when the browser window/tab are in foreground. On non-browser
	* platforms it assumes always foreground.
	*/
	async _handleVisibilityChange() {
		this._debug("#_handleVisibilityChange()");
		if (!isBrowser() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
			if (this.autoRefreshToken) this.startAutoRefresh();
			return false;
		}
		try {
			this.visibilityChangedCallback = async () => {
				try {
					await this._onVisibilityChanged(false);
				} catch (error) {
					this._debug("#visibilityChangedCallback", "error", error);
				}
			};
			window === null || window === void 0 || window.addEventListener("visibilitychange", this.visibilityChangedCallback);
			await this._onVisibilityChanged(true);
		} catch (error) {
			console.error("_handleVisibilityChange", error);
		}
	}
	/**
	* Callback registered with `window.addEventListener('visibilitychange')`.
	*/
	async _onVisibilityChanged(calledFromInitialize) {
		const methodName = `#_onVisibilityChanged(${calledFromInitialize})`;
		this._debug(methodName, "visibilityState", document.visibilityState);
		if (document.visibilityState === "visible") {
			if (this.autoRefreshToken) this._startAutoRefresh();
			if (!calledFromInitialize) {
				await this.initializePromise;
				await this._acquireLock(this.lockAcquireTimeout, async () => {
					if (document.visibilityState !== "visible") {
						this._debug(methodName, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
						return;
					}
					await this._recoverAndRefresh();
				});
			}
		} else if (document.visibilityState === "hidden") {
			if (this.autoRefreshToken) this._stopAutoRefresh();
		}
	}
	/**
	* Generates the relevant login URL for a third-party provider.
	* @param options.redirectTo A URL or mobile address to send the user to after they are confirmed.
	* @param options.scopes A space-separated list of scopes granted to the OAuth application.
	* @param options.queryParams An object of key-value pairs containing query parameters granted to the OAuth application.
	*/
	async _getUrlForProvider(url, provider, options) {
		const urlParams = [`provider=${encodeURIComponent(provider)}`];
		if (options === null || options === void 0 ? void 0 : options.redirectTo) urlParams.push(`redirect_to=${encodeURIComponent(options.redirectTo)}`);
		if (options === null || options === void 0 ? void 0 : options.scopes) urlParams.push(`scopes=${encodeURIComponent(options.scopes)}`);
		if (this.flowType === "pkce") {
			const [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
			const flowParams = new URLSearchParams({
				code_challenge: `${encodeURIComponent(codeChallenge)}`,
				code_challenge_method: `${encodeURIComponent(codeChallengeMethod)}`
			});
			urlParams.push(flowParams.toString());
		}
		if (options === null || options === void 0 ? void 0 : options.queryParams) {
			const query = new URLSearchParams(options.queryParams);
			urlParams.push(query.toString());
		}
		if (options === null || options === void 0 ? void 0 : options.skipBrowserRedirect) urlParams.push(`skip_http_redirect=${options.skipBrowserRedirect}`);
		return `${url}?${urlParams.join("&")}`;
	}
	async _unenroll(params) {
		try {
			return await this._useSession(async (result) => {
				var _a;
				const { data: sessionData, error: sessionError } = result;
				if (sessionError) return this._returnResult({
					data: null,
					error: sessionError
				});
				return await _request(this.fetch, "DELETE", `${this.url}/factors/${params.factorId}`, {
					headers: this.headers,
					jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
				});
			});
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: null,
				error
			});
			throw error;
		}
	}
	async _enroll(params) {
		try {
			return await this._useSession(async (result) => {
				var _a, _b;
				const { data: sessionData, error: sessionError } = result;
				if (sessionError) return this._returnResult({
					data: null,
					error: sessionError
				});
				const body = Object.assign({
					friendly_name: params.friendlyName,
					factor_type: params.factorType
				}, params.factorType === "phone" ? { phone: params.phone } : params.factorType === "totp" ? { issuer: params.issuer } : {});
				const { data, error } = await _request(this.fetch, "POST", `${this.url}/factors`, {
					body,
					headers: this.headers,
					jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
				});
				if (error) return this._returnResult({
					data: null,
					error
				});
				if (params.factorType === "totp" && data.type === "totp" && ((_b = data === null || data === void 0 ? void 0 : data.totp) === null || _b === void 0 ? void 0 : _b.qr_code)) data.totp.qr_code = `data:image/svg+xml;utf-8,${data.totp.qr_code}`;
				return this._returnResult({
					data,
					error: null
				});
			});
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: null,
				error
			});
			throw error;
		}
	}
	async _verify(params) {
		return this._acquireLock(this.lockAcquireTimeout, async () => {
			try {
				return await this._useSession(async (result) => {
					var _a;
					const { data: sessionData, error: sessionError } = result;
					if (sessionError) return this._returnResult({
						data: null,
						error: sessionError
					});
					const body = Object.assign({ challenge_id: params.challengeId }, "webauthn" in params ? { webauthn: Object.assign(Object.assign({}, params.webauthn), { credential_response: params.webauthn.type === "create" ? serializeCredentialCreationResponse(params.webauthn.credential_response) : serializeCredentialRequestResponse(params.webauthn.credential_response) }) } : { code: params.code });
					const { data, error } = await _request(this.fetch, "POST", `${this.url}/factors/${params.factorId}/verify`, {
						body,
						headers: this.headers,
						jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
					});
					if (error) return this._returnResult({
						data: null,
						error
					});
					await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + data.expires_in }, data));
					await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", data);
					return this._returnResult({
						data,
						error
					});
				});
			} catch (error) {
				if (isAuthError(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		});
	}
	async _challenge(params) {
		return this._acquireLock(this.lockAcquireTimeout, async () => {
			try {
				return await this._useSession(async (result) => {
					var _a;
					const { data: sessionData, error: sessionError } = result;
					if (sessionError) return this._returnResult({
						data: null,
						error: sessionError
					});
					const response = await _request(this.fetch, "POST", `${this.url}/factors/${params.factorId}/challenge`, {
						body: params,
						headers: this.headers,
						jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
					});
					if (response.error) return response;
					const { data } = response;
					if (data.type !== "webauthn") return {
						data,
						error: null
					};
					switch (data.webauthn.type) {
						case "create": return {
							data: Object.assign(Object.assign({}, data), { webauthn: Object.assign(Object.assign({}, data.webauthn), { credential_options: Object.assign(Object.assign({}, data.webauthn.credential_options), { publicKey: deserializeCredentialCreationOptions(data.webauthn.credential_options.publicKey) }) }) }),
							error: null
						};
						case "request": return {
							data: Object.assign(Object.assign({}, data), { webauthn: Object.assign(Object.assign({}, data.webauthn), { credential_options: Object.assign(Object.assign({}, data.webauthn.credential_options), { publicKey: deserializeCredentialRequestOptions(data.webauthn.credential_options.publicKey) }) }) }),
							error: null
						};
					}
				});
			} catch (error) {
				if (isAuthError(error)) return this._returnResult({
					data: null,
					error
				});
				throw error;
			}
		});
	}
	/**
	* {@see GoTrueMFAApi#challengeAndVerify}
	*/
	async _challengeAndVerify(params) {
		const { data: challengeData, error: challengeError } = await this._challenge({ factorId: params.factorId });
		if (challengeError) return this._returnResult({
			data: null,
			error: challengeError
		});
		return await this._verify({
			factorId: params.factorId,
			challengeId: challengeData.id,
			code: params.code
		});
	}
	/**
	* {@see GoTrueMFAApi#listFactors}
	*/
	async _listFactors() {
		var _a;
		const { data: { user }, error: userError } = await this.getUser();
		if (userError) return {
			data: null,
			error: userError
		};
		const data = {
			all: [],
			phone: [],
			totp: [],
			webauthn: []
		};
		for (const factor of (_a = user === null || user === void 0 ? void 0 : user.factors) !== null && _a !== void 0 ? _a : []) {
			data.all.push(factor);
			if (factor.status === "verified") data[factor.factor_type].push(factor);
		}
		return {
			data,
			error: null
		};
	}
	/**
	* {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
	*/
	async _getAuthenticatorAssuranceLevel(jwt) {
		var _a, _b, _c, _d;
		if (jwt) try {
			const { payload } = decodeJWT(jwt);
			let currentLevel = null;
			if (payload.aal) currentLevel = payload.aal;
			let nextLevel = currentLevel;
			const { data: { user }, error: userError } = await this.getUser(jwt);
			if (userError) return this._returnResult({
				data: null,
				error: userError
			});
			if (((_b = (_a = user === null || user === void 0 ? void 0 : user.factors) === null || _a === void 0 ? void 0 : _a.filter((factor) => factor.status === "verified")) !== null && _b !== void 0 ? _b : []).length > 0) nextLevel = "aal2";
			const currentAuthenticationMethods = payload.amr || [];
			return {
				data: {
					currentLevel,
					nextLevel,
					currentAuthenticationMethods
				},
				error: null
			};
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: null,
				error
			});
			throw error;
		}
		const { data: { session }, error: sessionError } = await this.getSession();
		if (sessionError) return this._returnResult({
			data: null,
			error: sessionError
		});
		if (!session) return {
			data: {
				currentLevel: null,
				nextLevel: null,
				currentAuthenticationMethods: []
			},
			error: null
		};
		const { payload } = decodeJWT(session.access_token);
		let currentLevel = null;
		if (payload.aal) currentLevel = payload.aal;
		let nextLevel = currentLevel;
		if (((_d = (_c = session.user.factors) === null || _c === void 0 ? void 0 : _c.filter((factor) => factor.status === "verified")) !== null && _d !== void 0 ? _d : []).length > 0) nextLevel = "aal2";
		const currentAuthenticationMethods = payload.amr || [];
		return {
			data: {
				currentLevel,
				nextLevel,
				currentAuthenticationMethods
			},
			error: null
		};
	}
	/**
	* Retrieves details about an OAuth authorization request.
	* Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
	*
	* Returns authorization details including client info, scopes, and user information.
	* If the response includes only a redirect_url field, it means consent was already given - the caller
	* should handle the redirect manually if needed.
	*/
	async _getAuthorizationDetails(authorizationId) {
		try {
			return await this._useSession(async (result) => {
				const { data: { session }, error: sessionError } = result;
				if (sessionError) return this._returnResult({
					data: null,
					error: sessionError
				});
				if (!session) return this._returnResult({
					data: null,
					error: new AuthSessionMissingError()
				});
				return await _request(this.fetch, "GET", `${this.url}/oauth/authorizations/${authorizationId}`, {
					headers: this.headers,
					jwt: session.access_token,
					xform: (data) => ({
						data,
						error: null
					})
				});
			});
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: null,
				error
			});
			throw error;
		}
	}
	/**
	* Approves an OAuth authorization request.
	* Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
	*/
	async _approveAuthorization(authorizationId, options) {
		try {
			return await this._useSession(async (result) => {
				const { data: { session }, error: sessionError } = result;
				if (sessionError) return this._returnResult({
					data: null,
					error: sessionError
				});
				if (!session) return this._returnResult({
					data: null,
					error: new AuthSessionMissingError()
				});
				const response = await _request(this.fetch, "POST", `${this.url}/oauth/authorizations/${authorizationId}/consent`, {
					headers: this.headers,
					jwt: session.access_token,
					body: { action: "approve" },
					xform: (data) => ({
						data,
						error: null
					})
				});
				if (response.data && response.data.redirect_url) {
					if (isBrowser() && !(options === null || options === void 0 ? void 0 : options.skipBrowserRedirect)) window.location.assign(response.data.redirect_url);
				}
				return response;
			});
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: null,
				error
			});
			throw error;
		}
	}
	/**
	* Denies an OAuth authorization request.
	* Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
	*/
	async _denyAuthorization(authorizationId, options) {
		try {
			return await this._useSession(async (result) => {
				const { data: { session }, error: sessionError } = result;
				if (sessionError) return this._returnResult({
					data: null,
					error: sessionError
				});
				if (!session) return this._returnResult({
					data: null,
					error: new AuthSessionMissingError()
				});
				const response = await _request(this.fetch, "POST", `${this.url}/oauth/authorizations/${authorizationId}/consent`, {
					headers: this.headers,
					jwt: session.access_token,
					body: { action: "deny" },
					xform: (data) => ({
						data,
						error: null
					})
				});
				if (response.data && response.data.redirect_url) {
					if (isBrowser() && !(options === null || options === void 0 ? void 0 : options.skipBrowserRedirect)) window.location.assign(response.data.redirect_url);
				}
				return response;
			});
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: null,
				error
			});
			throw error;
		}
	}
	/**
	* Lists all OAuth grants that the authenticated user has authorized.
	* Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
	*/
	async _listOAuthGrants() {
		try {
			return await this._useSession(async (result) => {
				const { data: { session }, error: sessionError } = result;
				if (sessionError) return this._returnResult({
					data: null,
					error: sessionError
				});
				if (!session) return this._returnResult({
					data: null,
					error: new AuthSessionMissingError()
				});
				return await _request(this.fetch, "GET", `${this.url}/user/oauth/grants`, {
					headers: this.headers,
					jwt: session.access_token,
					xform: (data) => ({
						data,
						error: null
					})
				});
			});
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: null,
				error
			});
			throw error;
		}
	}
	/**
	* Revokes a user's OAuth grant for a specific client.
	* Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
	*/
	async _revokeOAuthGrant(options) {
		try {
			return await this._useSession(async (result) => {
				const { data: { session }, error: sessionError } = result;
				if (sessionError) return this._returnResult({
					data: null,
					error: sessionError
				});
				if (!session) return this._returnResult({
					data: null,
					error: new AuthSessionMissingError()
				});
				await _request(this.fetch, "DELETE", `${this.url}/user/oauth/grants`, {
					headers: this.headers,
					jwt: session.access_token,
					query: { client_id: options.clientId },
					noResolveJson: true
				});
				return {
					data: {},
					error: null
				};
			});
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: null,
				error
			});
			throw error;
		}
	}
	async fetchJwk(kid, jwks = { keys: [] }) {
		let jwk = jwks.keys.find((key) => key.kid === kid);
		if (jwk) return jwk;
		const now = Date.now();
		jwk = this.jwks.keys.find((key) => key.kid === kid);
		if (jwk && this.jwks_cached_at + 6e5 > now) return jwk;
		const { data, error } = await _request(this.fetch, "GET", `${this.url}/.well-known/jwks.json`, { headers: this.headers });
		if (error) throw error;
		if (!data.keys || data.keys.length === 0) return null;
		this.jwks = data;
		this.jwks_cached_at = now;
		jwk = data.keys.find((key) => key.kid === kid);
		if (!jwk) return null;
		return jwk;
	}
	/**
	* Extracts the JWT claims present in the access token by first verifying the
	* JWT against the server's JSON Web Key Set endpoint
	* `/.well-known/jwks.json` which is often cached, resulting in significantly
	* faster responses. Prefer this method over {@link #getUser} which always
	* sends a request to the Auth server for each JWT.
	*
	* If the project is not using an asymmetric JWT signing key (like ECC or
	* RSA) it always sends a request to the Auth server (similar to {@link
	* #getUser}) to verify the JWT.
	*
	* @param jwt An optional specific JWT you wish to verify, not the one you
	*            can obtain from {@link #getSession}.
	* @param options Various additional options that allow you to customize the
	*                behavior of this method.
	*/
	async getClaims(jwt, options = {}) {
		try {
			let token = jwt;
			if (!token) {
				const { data, error } = await this.getSession();
				if (error || !data.session) return this._returnResult({
					data: null,
					error
				});
				token = data.session.access_token;
			}
			const { header, payload, signature, raw: { header: rawHeader, payload: rawPayload } } = decodeJWT(token);
			if (!(options === null || options === void 0 ? void 0 : options.allowExpired)) validateExp(payload.exp);
			const signingKey = !header.alg || header.alg.startsWith("HS") || !header.kid || !("crypto" in globalThis && "subtle" in globalThis.crypto) ? null : await this.fetchJwk(header.kid, (options === null || options === void 0 ? void 0 : options.keys) ? { keys: options.keys } : options === null || options === void 0 ? void 0 : options.jwks);
			if (!signingKey) {
				const { error } = await this.getUser(token);
				if (error) throw error;
				return {
					data: {
						claims: payload,
						header,
						signature
					},
					error: null
				};
			}
			const algorithm = getAlgorithm(header.alg);
			const publicKey = await crypto.subtle.importKey("jwk", signingKey, algorithm, true, ["verify"]);
			if (!await crypto.subtle.verify(algorithm, publicKey, signature, stringToUint8Array(`${rawHeader}.${rawPayload}`))) throw new AuthInvalidJwtError("Invalid JWT signature");
			return {
				data: {
					claims: payload,
					header,
					signature
				},
				error: null
			};
		} catch (error) {
			if (isAuthError(error)) return this._returnResult({
				data: null,
				error
			});
			throw error;
		}
	}
};
GoTrueClient.nextInstanceID = {};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+auth-js@2.99.2/node_modules/@supabase/auth-js/dist/module/AuthClient.js
var AuthClient = GoTrueClient;
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@supabase+supabase-js@2.99.2/node_modules/@supabase/supabase-js/dist/index.mjs
var version = "2.99.2";
var JS_ENV = "";
if (typeof Deno !== "undefined") JS_ENV = "deno";
else if (typeof document !== "undefined") JS_ENV = "web";
else if (typeof navigator !== "undefined" && navigator.product === "ReactNative") JS_ENV = "react-native";
else JS_ENV = "node";
var DEFAULT_GLOBAL_OPTIONS = { headers: { "X-Client-Info": `supabase-js-${JS_ENV}/${version}` } };
var DEFAULT_DB_OPTIONS = { schema: "public" };
var DEFAULT_AUTH_OPTIONS = {
	autoRefreshToken: true,
	persistSession: true,
	detectSessionInUrl: true,
	flowType: "implicit"
};
var DEFAULT_REALTIME_OPTIONS = {};
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof(o);
}
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r$1) {
			_defineProperty(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
var resolveFetch = (customFetch) => {
	if (customFetch) return (...args) => customFetch(...args);
	return (...args) => fetch(...args);
};
var resolveHeadersConstructor = () => {
	return Headers;
};
var fetchWithAuth = (supabaseKey, getAccessToken, customFetch) => {
	const fetch$1 = resolveFetch(customFetch);
	const HeadersConstructor = resolveHeadersConstructor();
	return async (input, init) => {
		var _await$getAccessToken;
		const accessToken = (_await$getAccessToken = await getAccessToken()) !== null && _await$getAccessToken !== void 0 ? _await$getAccessToken : supabaseKey;
		let headers = new HeadersConstructor(init === null || init === void 0 ? void 0 : init.headers);
		if (!headers.has("apikey")) headers.set("apikey", supabaseKey);
		if (!headers.has("Authorization")) headers.set("Authorization", `Bearer ${accessToken}`);
		return fetch$1(input, _objectSpread2(_objectSpread2({}, init), {}, { headers }));
	};
};
function ensureTrailingSlash(url) {
	return url.endsWith("/") ? url : url + "/";
}
function applySettingDefaults(options, defaults) {
	var _DEFAULT_GLOBAL_OPTIO, _globalOptions$header;
	const { db: dbOptions, auth: authOptions, realtime: realtimeOptions, global: globalOptions } = options;
	const { db: DEFAULT_DB_OPTIONS$1, auth: DEFAULT_AUTH_OPTIONS$1, realtime: DEFAULT_REALTIME_OPTIONS$1, global: DEFAULT_GLOBAL_OPTIONS$1 } = defaults;
	const result = {
		db: _objectSpread2(_objectSpread2({}, DEFAULT_DB_OPTIONS$1), dbOptions),
		auth: _objectSpread2(_objectSpread2({}, DEFAULT_AUTH_OPTIONS$1), authOptions),
		realtime: _objectSpread2(_objectSpread2({}, DEFAULT_REALTIME_OPTIONS$1), realtimeOptions),
		storage: {},
		global: _objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULT_GLOBAL_OPTIONS$1), globalOptions), {}, { headers: _objectSpread2(_objectSpread2({}, (_DEFAULT_GLOBAL_OPTIO = DEFAULT_GLOBAL_OPTIONS$1 === null || DEFAULT_GLOBAL_OPTIONS$1 === void 0 ? void 0 : DEFAULT_GLOBAL_OPTIONS$1.headers) !== null && _DEFAULT_GLOBAL_OPTIO !== void 0 ? _DEFAULT_GLOBAL_OPTIO : {}), (_globalOptions$header = globalOptions === null || globalOptions === void 0 ? void 0 : globalOptions.headers) !== null && _globalOptions$header !== void 0 ? _globalOptions$header : {}) }),
		accessToken: async () => ""
	};
	if (options.accessToken) result.accessToken = options.accessToken;
	else delete result.accessToken;
	return result;
}
/**
* Validates a Supabase client URL
*
* @param {string} supabaseUrl - The Supabase client URL string.
* @returns {URL} - The validated base URL.
* @throws {Error}
*/
function validateSupabaseUrl(supabaseUrl) {
	const trimmedUrl = supabaseUrl === null || supabaseUrl === void 0 ? void 0 : supabaseUrl.trim();
	if (!trimmedUrl) throw new Error("supabaseUrl is required.");
	if (!trimmedUrl.match(/^https?:\/\//i)) throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
	try {
		return new URL(ensureTrailingSlash(trimmedUrl));
	} catch (_unused) {
		throw Error("Invalid supabaseUrl: Provided URL is malformed.");
	}
}
var SupabaseAuthClient = class extends AuthClient {
	constructor(options) {
		super(options);
	}
};
/**
* Supabase Client.
*
* An isomorphic Javascript client for interacting with Postgres.
*/
var SupabaseClient = class {
	/**
	* Create a new client for use in the browser.
	*
	* @category Initializing
	*
	* @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
	* @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
	* @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
	* @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
	* @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
	* @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
	* @param options.realtime Options passed along to realtime-js constructor.
	* @param options.storage Options passed along to the storage-js constructor.
	* @param options.global.fetch A custom fetch implementation.
	* @param options.global.headers Any additional headers to send with each network request.
	*
	* @example Creating a client
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* // Create a single supabase client for interacting with your database
	* const supabase = createClient('https://xyzcompany.supabase.co', 'publishable-or-anon-key')
	* ```
	*
	* @example With a custom domain
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* // Use a custom domain as the supabase URL
	* const supabase = createClient('https://my-custom-domain.com', 'publishable-or-anon-key')
	* ```
	*
	* @example With additional parameters
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* const options = {
	*   db: {
	*     schema: 'public',
	*   },
	*   auth: {
	*     autoRefreshToken: true,
	*     persistSession: true,
	*     detectSessionInUrl: true
	*   },
	*   global: {
	*     headers: { 'x-my-custom-header': 'my-app-name' },
	*   },
	* }
	* const supabase = createClient("https://xyzcompany.supabase.co", "publishable-or-anon-key", options)
	* ```
	*
	* @exampleDescription With custom schemas
	* By default the API server points to the `public` schema. You can enable other database schemas within the Dashboard.
	* Go to [Settings > API > Exposed schemas](/dashboard/project/_/settings/api) and add the schema which you want to expose to the API.
	*
	* Note: each client connection can only access a single schema, so the code above can access the `other_schema` schema but cannot access the `public` schema.
	*
	* @example With custom schemas
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'publishable-or-anon-key', {
	*   // Provide a custom schema. Defaults to "public".
	*   db: { schema: 'other_schema' }
	* })
	* ```
	*
	* @exampleDescription Custom fetch implementation
	* `supabase-js` uses the [`cross-fetch`](https://www.npmjs.com/package/cross-fetch) library to make HTTP requests,
	* but an alternative `fetch` implementation can be provided as an option.
	* This is most useful in environments where `cross-fetch` is not compatible (for instance Cloudflare Workers).
	*
	* @example Custom fetch implementation
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'publishable-or-anon-key', {
	*   global: { fetch: fetch.bind(globalThis) }
	* })
	* ```
	*
	* @exampleDescription React Native options with AsyncStorage
	* For React Native we recommend using `AsyncStorage` as the storage implementation for Supabase Auth.
	*
	* @example React Native options with AsyncStorage
	* ```js
	* import 'react-native-url-polyfill/auto'
	* import { createClient } from '@supabase/supabase-js'
	* import AsyncStorage from "@react-native-async-storage/async-storage";
	*
	* const supabase = createClient("https://xyzcompany.supabase.co", "publishable-or-anon-key", {
	*   auth: {
	*     storage: AsyncStorage,
	*     autoRefreshToken: true,
	*     persistSession: true,
	*     detectSessionInUrl: false,
	*   },
	* });
	* ```
	*
	* @exampleDescription React Native options with Expo SecureStore
	* If you wish to encrypt the user's session information, you can use `aes-js` and store the encryption key in Expo SecureStore.
	* The `aes-js` library, a reputable JavaScript-only implementation of the AES encryption algorithm in CTR mode.
	* A new 256-bit encryption key is generated using the `react-native-get-random-values` library.
	* This key is stored inside Expo's SecureStore, while the value is encrypted and placed inside AsyncStorage.
	*
	* Please make sure that:
	* - You keep the `expo-secure-store`, `aes-js` and `react-native-get-random-values` libraries up-to-date.
	* - Choose the correct [`SecureStoreOptions`](https://docs.expo.dev/versions/latest/sdk/securestore/#securestoreoptions) for your app's needs.
	*   E.g. [`SecureStore.WHEN_UNLOCKED`](https://docs.expo.dev/versions/latest/sdk/securestore/#securestorewhen_unlocked) regulates when the data can be accessed.
	* - Carefully consider optimizations or other modifications to the above example, as those can lead to introducing subtle security vulnerabilities.
	*
	* @example React Native options with Expo SecureStore
	* ```ts
	* import 'react-native-url-polyfill/auto'
	* import { createClient } from '@supabase/supabase-js'
	* import AsyncStorage from '@react-native-async-storage/async-storage';
	* import * as SecureStore from 'expo-secure-store';
	* import * as aesjs from 'aes-js';
	* import 'react-native-get-random-values';
	*
	* // As Expo's SecureStore does not support values larger than 2048
	* // bytes, an AES-256 key is generated and stored in SecureStore, while
	* // it is used to encrypt/decrypt values stored in AsyncStorage.
	* class LargeSecureStore {
	*   private async _encrypt(key: string, value: string) {
	*     const encryptionKey = crypto.getRandomValues(new Uint8Array(256 / 8));
	*
	*     const cipher = new aesjs.ModeOfOperation.ctr(encryptionKey, new aesjs.Counter(1));
	*     const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value));
	*
	*     await SecureStore.setItemAsync(key, aesjs.utils.hex.fromBytes(encryptionKey));
	*
	*     return aesjs.utils.hex.fromBytes(encryptedBytes);
	*   }
	*
	*   private async _decrypt(key: string, value: string) {
	*     const encryptionKeyHex = await SecureStore.getItemAsync(key);
	*     if (!encryptionKeyHex) {
	*       return encryptionKeyHex;
	*     }
	*
	*     const cipher = new aesjs.ModeOfOperation.ctr(aesjs.utils.hex.toBytes(encryptionKeyHex), new aesjs.Counter(1));
	*     const decryptedBytes = cipher.decrypt(aesjs.utils.hex.toBytes(value));
	*
	*     return aesjs.utils.utf8.fromBytes(decryptedBytes);
	*   }
	*
	*   async getItem(key: string) {
	*     const encrypted = await AsyncStorage.getItem(key);
	*     if (!encrypted) { return encrypted; }
	*
	*     return await this._decrypt(key, encrypted);
	*   }
	*
	*   async removeItem(key: string) {
	*     await AsyncStorage.removeItem(key);
	*     await SecureStore.deleteItemAsync(key);
	*   }
	*
	*   async setItem(key: string, value: string) {
	*     const encrypted = await this._encrypt(key, value);
	*
	*     await AsyncStorage.setItem(key, encrypted);
	*   }
	* }
	*
	* const supabase = createClient("https://xyzcompany.supabase.co", "publishable-or-anon-key", {
	*   auth: {
	*     storage: new LargeSecureStore(),
	*     autoRefreshToken: true,
	*     persistSession: true,
	*     detectSessionInUrl: false,
	*   },
	* });
	* ```
	*
	* @example With a database query
	* ```ts
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')
	*
	* const { data } = await supabase.from('profiles').select('*')
	* ```
	*/
	constructor(supabaseUrl, supabaseKey, options) {
		var _settings$auth$storag, _settings$global$head;
		this.supabaseUrl = supabaseUrl;
		this.supabaseKey = supabaseKey;
		const baseUrl = validateSupabaseUrl(supabaseUrl);
		if (!supabaseKey) throw new Error("supabaseKey is required.");
		this.realtimeUrl = new URL("realtime/v1", baseUrl);
		this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws");
		this.authUrl = new URL("auth/v1", baseUrl);
		this.storageUrl = new URL("storage/v1", baseUrl);
		this.functionsUrl = new URL("functions/v1", baseUrl);
		const defaultStorageKey = `sb-${baseUrl.hostname.split(".")[0]}-auth-token`;
		const DEFAULTS = {
			db: DEFAULT_DB_OPTIONS,
			realtime: DEFAULT_REALTIME_OPTIONS,
			auth: _objectSpread2(_objectSpread2({}, DEFAULT_AUTH_OPTIONS), {}, { storageKey: defaultStorageKey }),
			global: DEFAULT_GLOBAL_OPTIONS
		};
		const settings = applySettingDefaults(options !== null && options !== void 0 ? options : {}, DEFAULTS);
		this.storageKey = (_settings$auth$storag = settings.auth.storageKey) !== null && _settings$auth$storag !== void 0 ? _settings$auth$storag : "";
		this.headers = (_settings$global$head = settings.global.headers) !== null && _settings$global$head !== void 0 ? _settings$global$head : {};
		if (!settings.accessToken) {
			var _settings$auth;
			this.auth = this._initSupabaseAuthClient((_settings$auth = settings.auth) !== null && _settings$auth !== void 0 ? _settings$auth : {}, this.headers, settings.global.fetch);
		} else {
			this.accessToken = settings.accessToken;
			this.auth = new Proxy({}, { get: (_, prop) => {
				throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(prop)} is not possible`);
			} });
		}
		this.fetch = fetchWithAuth(supabaseKey, this._getAccessToken.bind(this), settings.global.fetch);
		this.realtime = this._initRealtimeClient(_objectSpread2({
			headers: this.headers,
			accessToken: this._getAccessToken.bind(this)
		}, settings.realtime));
		if (this.accessToken) Promise.resolve(this.accessToken()).then((token) => this.realtime.setAuth(token)).catch((e) => console.warn("Failed to set initial Realtime auth token:", e));
		this.rest = new PostgrestClient(new URL("rest/v1", baseUrl).href, {
			headers: this.headers,
			schema: settings.db.schema,
			fetch: this.fetch,
			timeout: settings.db.timeout,
			urlLengthLimit: settings.db.urlLengthLimit
		});
		this.storage = new StorageClient(this.storageUrl.href, this.headers, this.fetch, options === null || options === void 0 ? void 0 : options.storage);
		if (!settings.accessToken) this._listenForAuthEvents();
	}
	/**
	* Supabase Functions allows you to deploy and invoke edge functions.
	*/
	get functions() {
		return new FunctionsClient(this.functionsUrl.href, {
			headers: this.headers,
			customFetch: this.fetch
		});
	}
	/**
	* Perform a query on a table or a view.
	*
	* @param relation - The table or view name to query
	*/
	from(relation) {
		return this.rest.from(relation);
	}
	/**
	* Select a schema to query or perform an function (rpc) call.
	*
	* The schema needs to be on the list of exposed schemas inside Supabase.
	*
	* @param schema - The schema to query
	*/
	schema(schema) {
		return this.rest.schema(schema);
	}
	/**
	* Perform a function call.
	*
	* @param fn - The function name to call
	* @param args - The arguments to pass to the function call
	* @param options - Named parameters
	* @param options.head - When set to `true`, `data` will not be returned.
	* Useful if you only need the count.
	* @param options.get - When set to `true`, the function will be called with
	* read-only access mode.
	* @param options.count - Count algorithm to use to count rows returned by the
	* function. Only applicable for [set-returning
	* functions](https://www.postgresql.org/docs/current/functions-srf.html).
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*/
	rpc(fn, args = {}, options = {
		head: false,
		get: false,
		count: void 0
	}) {
		return this.rest.rpc(fn, args, options);
	}
	/**
	* Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
	*
	* @param {string} name - The name of the Realtime channel.
	* @param {Object} opts - The options to pass to the Realtime channel.
	*
	*/
	channel(name, opts = { config: {} }) {
		return this.realtime.channel(name, opts);
	}
	/**
	* Returns all Realtime channels.
	*/
	getChannels() {
		return this.realtime.getChannels();
	}
	/**
	* Unsubscribes and removes Realtime channel from Realtime client.
	*
	* @param {RealtimeChannel} channel - The name of the Realtime channel.
	*
	*/
	removeChannel(channel) {
		return this.realtime.removeChannel(channel);
	}
	/**
	* Unsubscribes and removes all Realtime channels from Realtime client.
	*/
	removeAllChannels() {
		return this.realtime.removeAllChannels();
	}
	async _getAccessToken() {
		var _this = this;
		var _data$session$access_, _data$session;
		if (_this.accessToken) return await _this.accessToken();
		const { data } = await _this.auth.getSession();
		return (_data$session$access_ = (_data$session = data.session) === null || _data$session === void 0 ? void 0 : _data$session.access_token) !== null && _data$session$access_ !== void 0 ? _data$session$access_ : _this.supabaseKey;
	}
	_initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, storage, userStorage, storageKey, flowType, lock, debug, throwOnError }, headers, fetch$1) {
		const authHeaders = {
			Authorization: `Bearer ${this.supabaseKey}`,
			apikey: `${this.supabaseKey}`
		};
		return new SupabaseAuthClient({
			url: this.authUrl.href,
			headers: _objectSpread2(_objectSpread2({}, authHeaders), headers),
			storageKey,
			autoRefreshToken,
			persistSession,
			detectSessionInUrl,
			storage,
			userStorage,
			flowType,
			lock,
			debug,
			throwOnError,
			fetch: fetch$1,
			hasCustomAuthorizationHeader: Object.keys(this.headers).some((key) => key.toLowerCase() === "authorization")
		});
	}
	_initRealtimeClient(options) {
		return new RealtimeClient(this.realtimeUrl.href, _objectSpread2(_objectSpread2({}, options), {}, { params: _objectSpread2(_objectSpread2({}, { apikey: this.supabaseKey }), options === null || options === void 0 ? void 0 : options.params) }));
	}
	_listenForAuthEvents() {
		return this.auth.onAuthStateChange((event, session) => {
			this._handleTokenChanged(event, "CLIENT", session === null || session === void 0 ? void 0 : session.access_token);
		});
	}
	_handleTokenChanged(event, source, token) {
		if ((event === "TOKEN_REFRESHED" || event === "SIGNED_IN") && this.changedAccessToken !== token) {
			this.changedAccessToken = token;
			this.realtime.setAuth(token);
		} else if (event === "SIGNED_OUT") {
			this.realtime.setAuth();
			if (source == "STORAGE") this.auth.signOut();
			this.changedAccessToken = void 0;
		}
	}
};
/**
* Creates a new Supabase Client.
*
* @example
* ```ts
* import { createClient } from '@supabase/supabase-js'
*
* const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')
* const { data, error } = await supabase.from('profiles').select('*')
* ```
*/
var createClient = (supabaseUrl, supabaseKey, options) => {
	return new SupabaseClient(supabaseUrl, supabaseKey, options);
};
function shouldShowDeprecationWarning() {
	if (typeof window !== "undefined") return false;
	const _process = globalThis["process"];
	if (!_process) return false;
	const processVersion = _process["version"];
	if (processVersion === void 0 || processVersion === null) return false;
	const versionMatch = processVersion.match(/^v(\d+)\./);
	if (!versionMatch) return false;
	return parseInt(versionMatch[1], 10) <= 18;
}
if (shouldShowDeprecationWarning()) console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");
var supabase = createClient("https://vpkdawwaahutldhtskkz.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwa2Rhd3dhYWh1dGxkaHRza2t6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2ODcwOTcsImV4cCI6MjA4OTI2MzA5N30.OeqUNJuCv_BfMY5VUhH6puV_JJn02LFOnHr_iW6ErDQ", { auth: {
	storage: localStorage,
	persistSession: true,
	autoRefreshToken: true
} });
//#endregion
//#region src/contexts/AuthContext.tsx
var AuthContext = (0, import_react.createContext)(null);
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [session, setSession] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [activeRole, setActiveRole] = (0, import_react.useState)(null);
	const [highestRole, setHighestRole] = (0, import_react.useState)(null);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});
		const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
			setSession(newSession);
		});
		return () => subscription.unsubscribe();
	}, []);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		if (session) {
			setIsLoading(true);
			supabase.from("profiles").select("name, role").eq("id", session.user.id).single().then(({ data, error }) => {
				if (mounted) {
					if (!error && data) {
						const dbRole = data.role || "client";
						let initialActiveRole = dbRole;
						const savedRole = localStorage.getItem("activeRole");
						if (savedRole) {
							if (dbRole === "admin" || dbRole === "professional" && savedRole !== "admin") initialActiveRole = savedRole;
						}
						setHighestRole(dbRole);
						setActiveRole(initialActiveRole);
						setUser({
							id: session.user.id,
							email: session.user.email || "",
							name: data.name || "Usuário",
							role: initialActiveRole
						});
					} else {
						setUser(null);
						setActiveRole(null);
						setHighestRole(null);
					}
					setIsLoading(false);
				}
			});
		} else {
			setUser(null);
			setActiveRole(null);
			setHighestRole(null);
			setIsLoading(false);
		}
		return () => {
			mounted = false;
		};
	}, [session]);
	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) console.error("Logout error:", error);
		else {
			setUser(null);
			setSession(null);
			setActiveRole(null);
			setHighestRole(null);
			localStorage.removeItem("activeRole");
		}
	};
	const switchRole = (newRole) => {
		if (!highestRole || !user) return;
		if (highestRole === "client" && newRole !== "client") return;
		if (highestRole === "professional" && newRole === "admin") return;
		localStorage.setItem("activeRole", newRole);
		setActiveRole(newRole);
		setUser({
			...user,
			role: newRole
		});
		navigate({
			admin: "/master",
			professional: "/professional",
			client: "/client"
		}[newRole]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		"data-uid": "src/contexts/AuthContext.tsx:135:5",
		"data-prohibitions": "[editContent]",
		value: {
			user,
			session,
			isLoading,
			activeRole,
			highestRole,
			logout,
			switchRole
		},
		children
	});
}
var useAuth = () => {
	const context = (0, import_react.useContext)(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-slot@1.2.4_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-slot/dist/index.mjs
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
var use = import_react[" use ".trim().toString()];
function isPromiseLike(value) {
	return typeof value === "object" && value !== null && "then" in value;
}
function isLazyComponent(element) {
	return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
/* @__NO_SIDE_EFFECTS__ */
function createSlot(ownerName) {
	const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
	const Slot2 = import_react.forwardRef((props, forwardedRef) => {
		let { children, ...slotProps } = props;
		if (isLazyComponent(children) && typeof use === "function") children = use(children._payload);
		const childrenArray = import_react.Children.toArray(children);
		const slottable = childrenArray.find(isSlottable);
		if (slottable) {
			const newElement = slottable.props.children;
			const newChildren = childrenArray.map((child) => {
				if (child === slottable) {
					if (import_react.Children.count(newElement) > 1) return import_react.Children.only(null);
					return import_react.isValidElement(newElement) ? newElement.props.children : null;
				} else return child;
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotClone, {
				...slotProps,
				ref: forwardedRef,
				children: import_react.isValidElement(newElement) ? import_react.cloneElement(newElement, void 0, newChildren) : null
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotClone, {
			...slotProps,
			ref: forwardedRef,
			children
		});
	});
	Slot2.displayName = `${ownerName}.Slot`;
	return Slot2;
}
var Slot$2 = /* @__PURE__ */ createSlot("Slot");
/* @__NO_SIDE_EFFECTS__ */
function createSlotClone(ownerName) {
	const SlotClone = import_react.forwardRef((props, forwardedRef) => {
		let { children, ...slotProps } = props;
		if (isLazyComponent(children) && typeof use === "function") children = use(children._payload);
		if (import_react.isValidElement(children)) {
			const childrenRef = getElementRef(children);
			const props2 = mergeProps(slotProps, children.props);
			if (children.type !== import_react.Fragment) props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
			return import_react.cloneElement(children, props2);
		}
		return import_react.Children.count(children) > 1 ? import_react.Children.only(null) : null;
	});
	SlotClone.displayName = `${ownerName}.SlotClone`;
	return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function isSlottable(child) {
	return import_react.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
	const overrideProps = { ...childProps };
	for (const propName in childProps) {
		const slotPropValue = slotProps[propName];
		const childPropValue = childProps[propName];
		if (/^on[A-Z]/.test(propName)) {
			if (slotPropValue && childPropValue) overrideProps[propName] = (...args) => {
				const result = childPropValue(...args);
				slotPropValue(...args);
				return result;
			};
			else if (slotPropValue) overrideProps[propName] = slotPropValue;
		} else if (propName === "style") overrideProps[propName] = {
			...slotPropValue,
			...childPropValue
		};
		else if (propName === "className") overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
	}
	return {
		...slotProps,
		...overrideProps
	};
}
function getElementRef(element) {
	let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
	let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.ref;
	getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
	mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.props.ref;
	return element.props.ref || element.ref;
}
//#endregion
//#region src/components/ui/button.tsx
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			outline: "border border-input bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
			link: "text-foreground underline-offset-4 hover:underline"
		},
		size: {
			default: "h-10 px-4 py-2",
			sm: "h-9 rounded-md px-3",
			lg: "h-11 rounded-md px-8",
			icon: "h-10 w-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot$2 : "button", {
		"data-uid": "src/components/ui/button.tsx:44:7",
		"data-prohibitions": "[editContent]",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
//#region src/components/ui/card.tsx
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/card.tsx:8:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("rounded-lg border bg-card text-card-foreground shadow-sm", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/card.tsx:19:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/card.tsx:26:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-2xl font-semibold leading-none tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/card.tsx:37:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/card.tsx:44:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("p-6 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/card.tsx:51:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
//#endregion
//#region src/components/ui/input.tsx
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		"data-uid": "src/components/ui/input.tsx:9:7",
		"data-prohibitions": "[editContent]",
		type,
		className: cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-primitive@2.1.4_@types+react-dom@19.2.3_@types+react@19.2.14__@types+re_0243fb2db8a1fb85ca77b8d9e5c2d650/node_modules/@radix-ui/react-primitive/dist/index.mjs
var Primitive = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((primitive, node) => {
	const Slot = /* @__PURE__ */ createSlot(`Primitive.${node}`);
	const Node = import_react.forwardRef((props, forwardedRef) => {
		const { asChild, ...primitiveProps } = props;
		const Comp = asChild ? Slot : node;
		if (typeof window !== "undefined") window[Symbol.for("radix-ui")] = true;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, {
			...primitiveProps,
			ref: forwardedRef
		});
	});
	Node.displayName = `Primitive.${node}`;
	return {
		...primitive,
		[node]: Node
	};
}, {});
//#endregion
//#region src/hooks/use-mobile.tsx
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
	const [isMobile, setIsMobile] = import_react.useState(void 0);
	import_react.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-separator@1.1.8_@types+react-dom@19.2.3_@types+react@19.2.14__@types+re_aa2d5d85a81bb702303f0548763b9797/node_modules/@radix-ui/react-separator/dist/index.mjs
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$2 = import_react.forwardRef((props, forwardedRef) => {
	const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
	const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
	const ariaOrientation = orientation === "vertical" ? orientation : void 0;
	const semanticProps = decorative ? { role: "none" } : {
		"aria-orientation": ariaOrientation,
		role: "separator"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		"data-orientation": orientation,
		...semanticProps,
		...domProps,
		ref: forwardedRef
	});
});
Separator$2.displayName = NAME;
function isValidOrientation(orientation) {
	return ORIENTATIONS.includes(orientation);
}
var Root$3 = Separator$2;
//#endregion
//#region src/components/ui/separator.tsx
var Separator$1 = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$3, {
	"data-uid": "src/components/ui/separator.tsx:11:3",
	"data-prohibitions": "[editContent]",
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}));
Separator$1.displayName = Root$3.displayName;
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-focus-scope@1.1.7_@types+react-dom@19.2.3_@types+react@19.2.14__@types+_f62f3af4ca2ba305a7aecf04c8534604/node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
var EVENT_OPTIONS$1 = {
	bubbles: false,
	cancelable: true
};
var FOCUS_SCOPE_NAME = "FocusScope";
var FocusScope = import_react.forwardRef((props, forwardedRef) => {
	const { loop = false, trapped = false, onMountAutoFocus: onMountAutoFocusProp, onUnmountAutoFocus: onUnmountAutoFocusProp, ...scopeProps } = props;
	const [container, setContainer] = import_react.useState(null);
	const onMountAutoFocus = useCallbackRef$1(onMountAutoFocusProp);
	const onUnmountAutoFocus = useCallbackRef$1(onUnmountAutoFocusProp);
	const lastFocusedElementRef = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setContainer(node));
	const focusScope = import_react.useRef({
		paused: false,
		pause() {
			this.paused = true;
		},
		resume() {
			this.paused = false;
		}
	}).current;
	import_react.useEffect(() => {
		if (trapped) {
			let handleFocusIn2 = function(event) {
				if (focusScope.paused || !container) return;
				const target = event.target;
				if (container.contains(target)) lastFocusedElementRef.current = target;
				else focus(lastFocusedElementRef.current, { select: true });
			}, handleFocusOut2 = function(event) {
				if (focusScope.paused || !container) return;
				const relatedTarget = event.relatedTarget;
				if (relatedTarget === null) return;
				if (!container.contains(relatedTarget)) focus(lastFocusedElementRef.current, { select: true });
			}, handleMutations2 = function(mutations) {
				if (document.activeElement !== document.body) return;
				for (const mutation of mutations) if (mutation.removedNodes.length > 0) focus(container);
			};
			document.addEventListener("focusin", handleFocusIn2);
			document.addEventListener("focusout", handleFocusOut2);
			const mutationObserver = new MutationObserver(handleMutations2);
			if (container) mutationObserver.observe(container, {
				childList: true,
				subtree: true
			});
			return () => {
				document.removeEventListener("focusin", handleFocusIn2);
				document.removeEventListener("focusout", handleFocusOut2);
				mutationObserver.disconnect();
			};
		}
	}, [
		trapped,
		container,
		focusScope.paused
	]);
	import_react.useEffect(() => {
		if (container) {
			focusScopesStack.add(focusScope);
			const previouslyFocusedElement = document.activeElement;
			if (!container.contains(previouslyFocusedElement)) {
				const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS$1);
				container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
				container.dispatchEvent(mountEvent);
				if (!mountEvent.defaultPrevented) {
					focusFirst$2(removeLinks(getTabbableCandidates(container)), { select: true });
					if (document.activeElement === previouslyFocusedElement) focus(container);
				}
			}
			return () => {
				container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
				setTimeout(() => {
					const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS$1);
					container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
					container.dispatchEvent(unmountEvent);
					if (!unmountEvent.defaultPrevented) focus(previouslyFocusedElement ?? document.body, { select: true });
					container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
					focusScopesStack.remove(focusScope);
				}, 0);
			};
		}
	}, [
		container,
		onMountAutoFocus,
		onUnmountAutoFocus,
		focusScope
	]);
	const handleKeyDown = import_react.useCallback((event) => {
		if (!loop && !trapped) return;
		if (focusScope.paused) return;
		const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
		const focusedElement = document.activeElement;
		if (isTabKey && focusedElement) {
			const container2 = event.currentTarget;
			const [first, last] = getTabbableEdges(container2);
			if (!(first && last)) {
				if (focusedElement === container2) event.preventDefault();
			} else if (!event.shiftKey && focusedElement === last) {
				event.preventDefault();
				if (loop) focus(first, { select: true });
			} else if (event.shiftKey && focusedElement === first) {
				event.preventDefault();
				if (loop) focus(last, { select: true });
			}
		}
	}, [
		loop,
		trapped,
		focusScope.paused
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.div, {
		tabIndex: -1,
		...scopeProps,
		ref: composedRefs,
		onKeyDown: handleKeyDown
	});
});
FocusScope.displayName = FOCUS_SCOPE_NAME;
function focusFirst$2(candidates, { select = false } = {}) {
	const previouslyFocusedElement = document.activeElement;
	for (const candidate of candidates) {
		focus(candidate, { select });
		if (document.activeElement !== previouslyFocusedElement) return;
	}
}
function getTabbableEdges(container) {
	const candidates = getTabbableCandidates(container);
	return [findVisible(candidates, container), findVisible(candidates.reverse(), container)];
}
function getTabbableCandidates(container) {
	const nodes = [];
	const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, { acceptNode: (node) => {
		const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
		if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
		return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	while (walker.nextNode()) nodes.push(walker.currentNode);
	return nodes;
}
function findVisible(elements, container) {
	for (const element of elements) if (!isHidden(element, { upTo: container })) return element;
}
function isHidden(node, { upTo }) {
	if (getComputedStyle(node).visibility === "hidden") return true;
	while (node) {
		if (upTo !== void 0 && node === upTo) return false;
		if (getComputedStyle(node).display === "none") return true;
		node = node.parentElement;
	}
	return false;
}
function isSelectableInput(element) {
	return element instanceof HTMLInputElement && "select" in element;
}
function focus(element, { select = false } = {}) {
	if (element && element.focus) {
		const previouslyFocusedElement = document.activeElement;
		element.focus({ preventScroll: true });
		if (element !== previouslyFocusedElement && isSelectableInput(element) && select) element.select();
	}
}
var focusScopesStack = createFocusScopesStack();
function createFocusScopesStack() {
	let stack = [];
	return {
		add(focusScope) {
			const activeFocusScope = stack[0];
			if (focusScope !== activeFocusScope) activeFocusScope?.pause();
			stack = arrayRemove(stack, focusScope);
			stack.unshift(focusScope);
		},
		remove(focusScope) {
			stack = arrayRemove(stack, focusScope);
			stack[0]?.resume();
		}
	};
}
function arrayRemove(array, item) {
	const updatedArray = [...array];
	const index = updatedArray.indexOf(item);
	if (index !== -1) updatedArray.splice(index, 1);
	return updatedArray;
}
function removeLinks(items) {
	return items.filter((item) => item.tagName !== "A");
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-focus-guards@1.1.3_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-focus-guards/dist/index.mjs
var count = 0;
function useFocusGuards() {
	import_react.useEffect(() => {
		const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
		document.body.insertAdjacentElement("afterbegin", edgeGuards[0] ?? createFocusGuard());
		document.body.insertAdjacentElement("beforeend", edgeGuards[1] ?? createFocusGuard());
		count++;
		return () => {
			if (count === 1) document.querySelectorAll("[data-radix-focus-guard]").forEach((node) => node.remove());
			count--;
		};
	}, []);
}
function createFocusGuard() {
	const element = document.createElement("span");
	element.setAttribute("data-radix-focus-guard", "");
	element.tabIndex = 0;
	element.style.outline = "none";
	element.style.opacity = "0";
	element.style.position = "fixed";
	element.style.pointerEvents = "none";
	return element;
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react-remove-scroll-bar@2.3.8_@types+react@19.2.14_react@19.2.4/node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var zeroRightClassName = "right-scroll-bar-position";
var fullWidthClassName = "width-before-scroll-bar";
var noScrollbarsClassName = "with-scroll-bars-hidden";
/**
* Name of a CSS variable containing the amount of "hidden" scrollbar
* ! might be undefined ! use will fallback!
*/
var removedBarSizeVariable = "--removed-body-scroll-bar-size";
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/use-callback-ref@1.3.3_@types+react@19.2.14_react@19.2.4/node_modules/use-callback-ref/dist/es2015/assignRef.js
/**
* Assigns a value for a given ref, no matter of the ref format
* @param {RefObject} ref - a callback function or ref object
* @param value - a new value
*
* @see https://github.com/theKashey/use-callback-ref#assignref
* @example
* const refObject = useRef();
* const refFn = (ref) => {....}
*
* assignRef(refObject, "refValue");
* assignRef(refFn, "refValue");
*/
function assignRef(ref, value) {
	if (typeof ref === "function") ref(value);
	else if (ref) ref.current = value;
	return ref;
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/use-callback-ref@1.3.3_@types+react@19.2.14_react@19.2.4/node_modules/use-callback-ref/dist/es2015/useRef.js
/**
* creates a MutableRef with ref change callback
* @param initialValue - initial ref value
* @param {Function} callback - a callback to run when value changes
*
* @example
* const ref = useCallbackRef(0, (newValue, oldValue) => console.log(oldValue, '->', newValue);
* ref.current = 1;
* // prints 0 -> 1
*
* @see https://reactjs.org/docs/hooks-reference.html#useref
* @see https://github.com/theKashey/use-callback-ref#usecallbackref---to-replace-reactuseref
* @returns {MutableRefObject}
*/
function useCallbackRef(initialValue, callback) {
	var ref = (0, import_react.useState)(function() {
		return {
			value: initialValue,
			callback,
			facade: {
				get current() {
					return ref.value;
				},
				set current(value) {
					var last = ref.value;
					if (last !== value) {
						ref.value = value;
						ref.callback(value, last);
					}
				}
			}
		};
	})[0];
	ref.callback = callback;
	return ref.facade;
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/use-callback-ref@1.3.3_@types+react@19.2.14_react@19.2.4/node_modules/use-callback-ref/dist/es2015/useMergeRef.js
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
var currentValues = /* @__PURE__ */ new WeakMap();
/**
* Merges two or more refs together providing a single interface to set their value
* @param {RefObject|Ref} refs
* @returns {MutableRefObject} - a new ref, which translates all changes to {refs}
*
* @see {@link mergeRefs} a version without buit-in memoization
* @see https://github.com/theKashey/use-callback-ref#usemergerefs
* @example
* const Component = React.forwardRef((props, ref) => {
*   const ownRef = useRef();
*   const domRef = useMergeRefs([ref, ownRef]); // 👈 merge together
*   return <div ref={domRef}>...</div>
* }
*/
function useMergeRefs(refs, defaultValue) {
	var callbackRef = useCallbackRef(defaultValue || null, function(newValue) {
		return refs.forEach(function(ref) {
			return assignRef(ref, newValue);
		});
	});
	useIsomorphicLayoutEffect(function() {
		var oldValue = currentValues.get(callbackRef);
		if (oldValue) {
			var prevRefs_1 = new Set(oldValue);
			var nextRefs_1 = new Set(refs);
			var current_1 = callbackRef.current;
			prevRefs_1.forEach(function(ref) {
				if (!nextRefs_1.has(ref)) assignRef(ref, null);
			});
			nextRefs_1.forEach(function(ref) {
				if (!prevRefs_1.has(ref)) assignRef(ref, current_1);
			});
		}
		currentValues.set(callbackRef, refs);
	}, [refs]);
	return callbackRef;
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/use-sidecar@1.1.3_@types+react@19.2.14_react@19.2.4/node_modules/use-sidecar/dist/es2015/medium.js
function ItoI(a) {
	return a;
}
function innerCreateMedium(defaults, middleware) {
	if (middleware === void 0) middleware = ItoI;
	var buffer = [];
	var assigned = false;
	return {
		read: function() {
			if (assigned) throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
			if (buffer.length) return buffer[buffer.length - 1];
			return defaults;
		},
		useMedium: function(data) {
			var item = middleware(data, assigned);
			buffer.push(item);
			return function() {
				buffer = buffer.filter(function(x) {
					return x !== item;
				});
			};
		},
		assignSyncMedium: function(cb) {
			assigned = true;
			while (buffer.length) {
				var cbs = buffer;
				buffer = [];
				cbs.forEach(cb);
			}
			buffer = {
				push: function(x) {
					return cb(x);
				},
				filter: function() {
					return buffer;
				}
			};
		},
		assignMedium: function(cb) {
			assigned = true;
			var pendingQueue = [];
			if (buffer.length) {
				var cbs = buffer;
				buffer = [];
				cbs.forEach(cb);
				pendingQueue = buffer;
			}
			var executeQueue = function() {
				var cbs = pendingQueue;
				pendingQueue = [];
				cbs.forEach(cb);
			};
			var cycle = function() {
				return Promise.resolve().then(executeQueue);
			};
			cycle();
			buffer = {
				push: function(x) {
					pendingQueue.push(x);
					cycle();
				},
				filter: function(filter) {
					pendingQueue = pendingQueue.filter(filter);
					return buffer;
				}
			};
		}
	};
}
function createSidecarMedium(options) {
	if (options === void 0) options = {};
	var medium = innerCreateMedium(null);
	medium.options = __assign({
		async: true,
		ssr: false
	}, options);
	return medium;
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/use-sidecar@1.1.3_@types+react@19.2.14_react@19.2.4/node_modules/use-sidecar/dist/es2015/exports.js
var SideCar = function(_a) {
	var sideCar = _a.sideCar, rest = __rest(_a, ["sideCar"]);
	if (!sideCar) throw new Error("Sidecar: please provide `sideCar` property to import the right car");
	var Target = sideCar.read();
	if (!Target) throw new Error("Sidecar medium not found");
	return import_react.createElement(Target, __assign({}, rest));
};
SideCar.isSideCarExport = true;
function exportSidecar(medium, exported) {
	medium.useMedium(exported);
	return SideCar;
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react-remove-scroll@2.7.2_@types+react@19.2.14_react@19.2.4/node_modules/react-remove-scroll/dist/es2015/medium.js
var effectCar = createSidecarMedium();
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react-remove-scroll@2.7.2_@types+react@19.2.14_react@19.2.4/node_modules/react-remove-scroll/dist/es2015/UI.js
var nothing = function() {};
/**
* Removes scrollbar from the page and contain the scroll within the Lock
*/
var RemoveScroll = import_react.forwardRef(function(props, parentRef) {
	var ref = import_react.useRef(null);
	var _a = import_react.useState({
		onScrollCapture: nothing,
		onWheelCapture: nothing,
		onTouchMoveCapture: nothing
	}), callbacks = _a[0], setCallbacks = _a[1];
	var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noRelative = props.noRelative, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? "div" : _b, gapMode = props.gapMode, rest = __rest(props, [
		"forwardProps",
		"children",
		"className",
		"removeScrollBar",
		"enabled",
		"shards",
		"sideCar",
		"noRelative",
		"noIsolation",
		"inert",
		"allowPinchZoom",
		"as",
		"gapMode"
	]);
	var SideCar = sideCar;
	var containerRef = useMergeRefs([ref, parentRef]);
	var containerProps = __assign(__assign({}, rest), callbacks);
	return import_react.createElement(import_react.Fragment, null, enabled && import_react.createElement(SideCar, {
		sideCar: effectCar,
		removeScrollBar,
		shards,
		noRelative,
		noIsolation,
		inert,
		setCallbacks,
		allowPinchZoom: !!allowPinchZoom,
		lockRef: ref,
		gapMode
	}), forwardProps ? import_react.cloneElement(import_react.Children.only(children), __assign(__assign({}, containerProps), { ref: containerRef })) : import_react.createElement(Container, __assign({}, containerProps, {
		className,
		ref: containerRef
	}), children));
});
RemoveScroll.defaultProps = {
	enabled: true,
	removeScrollBar: true,
	inert: false
};
RemoveScroll.classNames = {
	fullWidth: fullWidthClassName,
	zeroRight: zeroRightClassName
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/get-nonce@1.0.1/node_modules/get-nonce/dist/es2015/index.js
var currentNonce;
var getNonce = function() {
	if (currentNonce) return currentNonce;
	if (typeof __webpack_nonce__ !== "undefined") return __webpack_nonce__;
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react-style-singleton@2.2.3_@types+react@19.2.14_react@19.2.4/node_modules/react-style-singleton/dist/es2015/singleton.js
function makeStyleTag() {
	if (!document) return null;
	var tag = document.createElement("style");
	tag.type = "text/css";
	var nonce = getNonce();
	if (nonce) tag.setAttribute("nonce", nonce);
	return tag;
}
function injectStyles(tag, css) {
	if (tag.styleSheet) tag.styleSheet.cssText = css;
	else tag.appendChild(document.createTextNode(css));
}
function insertStyleTag(tag) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(tag);
}
var stylesheetSingleton = function() {
	var counter = 0;
	var stylesheet = null;
	return {
		add: function(style) {
			if (counter == 0) {
				if (stylesheet = makeStyleTag()) {
					injectStyles(stylesheet, style);
					insertStyleTag(stylesheet);
				}
			}
			counter++;
		},
		remove: function() {
			counter--;
			if (!counter && stylesheet) {
				stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
				stylesheet = null;
			}
		}
	};
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react-style-singleton@2.2.3_@types+react@19.2.14_react@19.2.4/node_modules/react-style-singleton/dist/es2015/hook.js
/**
* creates a hook to control style singleton
* @see {@link styleSingleton} for a safer component version
* @example
* ```tsx
* const useStyle = styleHookSingleton();
* ///
* useStyle('body { overflow: hidden}');
*/
var styleHookSingleton = function() {
	var sheet = stylesheetSingleton();
	return function(styles, isDynamic) {
		import_react.useEffect(function() {
			sheet.add(styles);
			return function() {
				sheet.remove();
			};
		}, [styles && isDynamic]);
	};
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react-style-singleton@2.2.3_@types+react@19.2.14_react@19.2.4/node_modules/react-style-singleton/dist/es2015/component.js
/**
* create a Component to add styles on demand
* - styles are added when first instance is mounted
* - styles are removed when the last instance is unmounted
* - changing styles in runtime does nothing unless dynamic is set. But with multiple components that can lead to the undefined behavior
*/
var styleSingleton = function() {
	var useStyle = styleHookSingleton();
	var Sheet = function(_a) {
		var styles = _a.styles, dynamic = _a.dynamic;
		useStyle(styles, dynamic);
		return null;
	};
	return Sheet;
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react-remove-scroll-bar@2.3.8_@types+react@19.2.14_react@19.2.4/node_modules/react-remove-scroll-bar/dist/es2015/utils.js
var zeroGap = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
};
var parse = function(x) {
	return parseInt(x || "", 10) || 0;
};
var getOffset = function(gapMode) {
	var cs = window.getComputedStyle(document.body);
	var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
	var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
	var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
	return [
		parse(left),
		parse(top),
		parse(right)
	];
};
var getGapWidth = function(gapMode) {
	if (gapMode === void 0) gapMode = "margin";
	if (typeof window === "undefined") return zeroGap;
	var offsets = getOffset(gapMode);
	var documentWidth = document.documentElement.clientWidth;
	var windowWidth = window.innerWidth;
	return {
		left: offsets[0],
		top: offsets[1],
		right: offsets[2],
		gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
	};
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react-remove-scroll-bar@2.3.8_@types+react@19.2.14_react@19.2.4/node_modules/react-remove-scroll-bar/dist/es2015/component.js
var Style = styleSingleton();
var lockAttribute = "data-scroll-locked";
var getStyles = function(_a, allowRelative, gapMode, important) {
	var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
	if (gapMode === void 0) gapMode = "margin";
	return "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
		allowRelative && "position: relative ".concat(important, ";"),
		gapMode === "margin" && "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
		gapMode === "padding" && "padding-right: ".concat(gap, "px ").concat(important, ";")
	].filter(Boolean).join(""), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(lockAttribute, "] {\n    ").concat(removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
};
var getCurrentUseCounter = function() {
	var counter = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(counter) ? counter : 0;
};
var useLockAttribute = function() {
	import_react.useEffect(function() {
		document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
		return function() {
			var newCounter = getCurrentUseCounter() - 1;
			if (newCounter <= 0) document.body.removeAttribute(lockAttribute);
			else document.body.setAttribute(lockAttribute, newCounter.toString());
		};
	}, []);
};
/**
* Removes page scrollbar and blocks page scroll when mounted
*/
var RemoveScrollBar = function(_a) {
	var noRelative = _a.noRelative, noImportant = _a.noImportant, _b = _a.gapMode, gapMode = _b === void 0 ? "margin" : _b;
	useLockAttribute();
	var gap = import_react.useMemo(function() {
		return getGapWidth(gapMode);
	}, [gapMode]);
	return import_react.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "") });
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react-remove-scroll@2.7.2_@types+react@19.2.14_react@19.2.4/node_modules/react-remove-scroll/dist/es2015/aggresiveCapture.js
var passiveSupported = false;
if (typeof window !== "undefined") try {
	var options = Object.defineProperty({}, "passive", { get: function() {
		passiveSupported = true;
		return true;
	} });
	window.addEventListener("test", options, options);
	window.removeEventListener("test", options, options);
} catch (err) {
	passiveSupported = false;
}
var nonPassive = passiveSupported ? { passive: false } : false;
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react-remove-scroll@2.7.2_@types+react@19.2.14_react@19.2.4/node_modules/react-remove-scroll/dist/es2015/handleScroll.js
var alwaysContainsScroll = function(node) {
	return node.tagName === "TEXTAREA";
};
var elementCanBeScrolled = function(node, overflow) {
	if (!(node instanceof Element)) return false;
	var styles = window.getComputedStyle(node);
	return styles[overflow] !== "hidden" && !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === "visible");
};
var elementCouldBeVScrolled = function(node) {
	return elementCanBeScrolled(node, "overflowY");
};
var elementCouldBeHScrolled = function(node) {
	return elementCanBeScrolled(node, "overflowX");
};
var locationCouldBeScrolled = function(axis, node) {
	var ownerDocument = node.ownerDocument;
	var current = node;
	do {
		if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) current = current.host;
		if (elementCouldBeScrolled(axis, current)) {
			var _a = getScrollVariables(axis, current);
			if (_a[1] > _a[2]) return true;
		}
		current = current.parentNode;
	} while (current && current !== ownerDocument.body);
	return false;
};
var getVScrollVariables = function(_a) {
	return [
		_a.scrollTop,
		_a.scrollHeight,
		_a.clientHeight
	];
};
var getHScrollVariables = function(_a) {
	return [
		_a.scrollLeft,
		_a.scrollWidth,
		_a.clientWidth
	];
};
var elementCouldBeScrolled = function(axis, node) {
	return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
};
var getScrollVariables = function(axis, node) {
	return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
};
var getDirectionFactor = function(axis, direction) {
	/**
	* If the element's direction is rtl (right-to-left), then scrollLeft is 0 when the scrollbar is at its rightmost position,
	* and then increasingly negative as you scroll towards the end of the content.
	* @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft
	*/
	return axis === "h" && direction === "rtl" ? -1 : 1;
};
var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
	var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
	var delta = directionFactor * sourceDelta;
	var target = event.target;
	var targetInLock = endTarget.contains(target);
	var shouldCancelScroll = false;
	var isDeltaPositive = delta > 0;
	var availableScroll = 0;
	var availableScrollTop = 0;
	do {
		if (!target) break;
		var _a = getScrollVariables(axis, target), position = _a[0];
		var elementScroll = _a[1] - _a[2] - directionFactor * position;
		if (position || elementScroll) {
			if (elementCouldBeScrolled(axis, target)) {
				availableScroll += elementScroll;
				availableScrollTop += position;
			}
		}
		var parent_1 = target.parentNode;
		target = parent_1 && parent_1.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? parent_1.host : parent_1;
	} while (!targetInLock && target !== document.body || targetInLock && (endTarget.contains(target) || endTarget === target));
	if (isDeltaPositive && (noOverscroll && Math.abs(availableScroll) < 1 || !noOverscroll && delta > availableScroll)) shouldCancelScroll = true;
	else if (!isDeltaPositive && (noOverscroll && Math.abs(availableScrollTop) < 1 || !noOverscroll && -delta > availableScrollTop)) shouldCancelScroll = true;
	return shouldCancelScroll;
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react-remove-scroll@2.7.2_@types+react@19.2.14_react@19.2.4/node_modules/react-remove-scroll/dist/es2015/SideEffect.js
var getTouchXY = function(event) {
	return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
};
var getDeltaXY = function(event) {
	return [event.deltaX, event.deltaY];
};
var extractRef = function(ref) {
	return ref && "current" in ref ? ref.current : ref;
};
var deltaCompare = function(x, y) {
	return x[0] === y[0] && x[1] === y[1];
};
var generateStyle = function(id) {
	return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n");
};
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
	var shouldPreventQueue = import_react.useRef([]);
	var touchStartRef = import_react.useRef([0, 0]);
	var activeAxis = import_react.useRef();
	var id = import_react.useState(idCounter++)[0];
	var Style = import_react.useState(styleSingleton)[0];
	var lastProps = import_react.useRef(props);
	import_react.useEffect(function() {
		lastProps.current = props;
	}, [props]);
	import_react.useEffect(function() {
		if (props.inert) {
			document.body.classList.add("block-interactivity-".concat(id));
			var allow_1 = __spreadArray([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
			allow_1.forEach(function(el) {
				return el.classList.add("allow-interactivity-".concat(id));
			});
			return function() {
				document.body.classList.remove("block-interactivity-".concat(id));
				allow_1.forEach(function(el) {
					return el.classList.remove("allow-interactivity-".concat(id));
				});
			};
		}
	}, [
		props.inert,
		props.lockRef.current,
		props.shards
	]);
	var shouldCancelEvent = import_react.useCallback(function(event, parent) {
		if ("touches" in event && event.touches.length === 2 || event.type === "wheel" && event.ctrlKey) return !lastProps.current.allowPinchZoom;
		var touch = getTouchXY(event);
		var touchStart = touchStartRef.current;
		var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
		var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
		var currentAxis;
		var target = event.target;
		var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
		if ("touches" in event && moveDirection === "h" && target.type === "range") return false;
		var selection = window.getSelection();
		var anchorNode = selection && selection.anchorNode;
		if (anchorNode ? anchorNode === target || anchorNode.contains(target) : false) return false;
		var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
		if (!canBeScrolledInMainDirection) return true;
		if (canBeScrolledInMainDirection) currentAxis = moveDirection;
		else {
			currentAxis = moveDirection === "v" ? "h" : "v";
			canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
		}
		if (!canBeScrolledInMainDirection) return false;
		if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) activeAxis.current = currentAxis;
		if (!currentAxis) return true;
		var cancelingAxis = activeAxis.current || currentAxis;
		return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY, true);
	}, []);
	var shouldPrevent = import_react.useCallback(function(_event) {
		var event = _event;
		if (!lockStack.length || lockStack[lockStack.length - 1] !== Style) return;
		var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
		var sourceEvent = shouldPreventQueue.current.filter(function(e) {
			return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta);
		})[0];
		if (sourceEvent && sourceEvent.should) {
			if (event.cancelable) event.preventDefault();
			return;
		}
		if (!sourceEvent) {
			var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
				return node.contains(event.target);
			});
			if (shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation) {
				if (event.cancelable) event.preventDefault();
			}
		}
	}, []);
	var shouldCancel = import_react.useCallback(function(name, delta, target, should) {
		var event = {
			name,
			delta,
			target,
			should,
			shadowParent: getOutermostShadowParent(target)
		};
		shouldPreventQueue.current.push(event);
		setTimeout(function() {
			shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e) {
				return e !== event;
			});
		}, 1);
	}, []);
	var scrollTouchStart = import_react.useCallback(function(event) {
		touchStartRef.current = getTouchXY(event);
		activeAxis.current = void 0;
	}, []);
	var scrollWheel = import_react.useCallback(function(event) {
		shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
	}, []);
	var scrollTouchMove = import_react.useCallback(function(event) {
		shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
	}, []);
	import_react.useEffect(function() {
		lockStack.push(Style);
		props.setCallbacks({
			onScrollCapture: scrollWheel,
			onWheelCapture: scrollWheel,
			onTouchMoveCapture: scrollTouchMove
		});
		document.addEventListener("wheel", shouldPrevent, nonPassive);
		document.addEventListener("touchmove", shouldPrevent, nonPassive);
		document.addEventListener("touchstart", scrollTouchStart, nonPassive);
		return function() {
			lockStack = lockStack.filter(function(inst) {
				return inst !== Style;
			});
			document.removeEventListener("wheel", shouldPrevent, nonPassive);
			document.removeEventListener("touchmove", shouldPrevent, nonPassive);
			document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
		};
	}, []);
	var removeScrollBar = props.removeScrollBar, inert = props.inert;
	return import_react.createElement(import_react.Fragment, null, inert ? import_react.createElement(Style, { styles: generateStyle(id) }) : null, removeScrollBar ? import_react.createElement(RemoveScrollBar, {
		noRelative: props.noRelative,
		gapMode: props.gapMode
	}) : null);
}
function getOutermostShadowParent(node) {
	var shadowParent = null;
	while (node !== null) {
		if (node instanceof ShadowRoot) {
			shadowParent = node.host;
			node = node.host;
		}
		node = node.parentNode;
	}
	return shadowParent;
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react-remove-scroll@2.7.2_@types+react@19.2.14_react@19.2.4/node_modules/react-remove-scroll/dist/es2015/sidecar.js
var sidecar_default = exportSidecar(effectCar, RemoveScrollSideCar);
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react-remove-scroll@2.7.2_@types+react@19.2.14_react@19.2.4/node_modules/react-remove-scroll/dist/es2015/Combination.js
var ReactRemoveScroll = import_react.forwardRef(function(props, ref) {
	return import_react.createElement(RemoveScroll, __assign({}, props, {
		ref,
		sideCar: sidecar_default
	}));
});
ReactRemoveScroll.classNames = RemoveScroll.classNames;
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/aria-hidden@1.2.6/node_modules/aria-hidden/dist/es2015/index.js
var getDefaultParent = function(originalTarget) {
	if (typeof document === "undefined") return null;
	return (Array.isArray(originalTarget) ? originalTarget[0] : originalTarget).ownerDocument.body;
};
var counterMap = /* @__PURE__ */ new WeakMap();
var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
var markerMap = {};
var lockCount = 0;
var unwrapHost = function(node) {
	return node && (node.host || unwrapHost(node.parentNode));
};
var correctTargets = function(parent, targets) {
	return targets.map(function(target) {
		if (parent.contains(target)) return target;
		var correctedTarget = unwrapHost(target);
		if (correctedTarget && parent.contains(correctedTarget)) return correctedTarget;
		console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
		return null;
	}).filter(function(x) {
		return Boolean(x);
	});
};
/**
* Marks everything except given node(or nodes) as aria-hidden
* @param {Element | Element[]} originalTarget - elements to keep on the page
* @param [parentNode] - top element, defaults to document.body
* @param {String} [markerName] - a special attribute to mark every node
* @param {String} [controlAttribute] - html Attribute to control
* @return {Undo} undo command
*/
var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
	var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
	if (!markerMap[markerName]) markerMap[markerName] = /* @__PURE__ */ new WeakMap();
	var markerCounter = markerMap[markerName];
	var hiddenNodes = [];
	var elementsToKeep = /* @__PURE__ */ new Set();
	var elementsToStop = new Set(targets);
	var keep = function(el) {
		if (!el || elementsToKeep.has(el)) return;
		elementsToKeep.add(el);
		keep(el.parentNode);
	};
	targets.forEach(keep);
	var deep = function(parent) {
		if (!parent || elementsToStop.has(parent)) return;
		Array.prototype.forEach.call(parent.children, function(node) {
			if (elementsToKeep.has(node)) deep(node);
			else try {
				var attr = node.getAttribute(controlAttribute);
				var alreadyHidden = attr !== null && attr !== "false";
				var counterValue = (counterMap.get(node) || 0) + 1;
				var markerValue = (markerCounter.get(node) || 0) + 1;
				counterMap.set(node, counterValue);
				markerCounter.set(node, markerValue);
				hiddenNodes.push(node);
				if (counterValue === 1 && alreadyHidden) uncontrolledNodes.set(node, true);
				if (markerValue === 1) node.setAttribute(markerName, "true");
				if (!alreadyHidden) node.setAttribute(controlAttribute, "true");
			} catch (e) {
				console.error("aria-hidden: cannot operate on ", node, e);
			}
		});
	};
	deep(parentNode);
	elementsToKeep.clear();
	lockCount++;
	return function() {
		hiddenNodes.forEach(function(node) {
			var counterValue = counterMap.get(node) - 1;
			var markerValue = markerCounter.get(node) - 1;
			counterMap.set(node, counterValue);
			markerCounter.set(node, markerValue);
			if (!counterValue) {
				if (!uncontrolledNodes.has(node)) node.removeAttribute(controlAttribute);
				uncontrolledNodes.delete(node);
			}
			if (!markerValue) node.removeAttribute(markerName);
		});
		lockCount--;
		if (!lockCount) {
			counterMap = /* @__PURE__ */ new WeakMap();
			counterMap = /* @__PURE__ */ new WeakMap();
			uncontrolledNodes = /* @__PURE__ */ new WeakMap();
			markerMap = {};
		}
	};
};
/**
* Marks everything except given node(or nodes) as aria-hidden
* @param {Element | Element[]} originalTarget - elements to keep on the page
* @param [parentNode] - top element, defaults to document.body
* @param {String} [markerName] - a special attribute to mark every node
* @return {Undo} undo command
*/
var hideOthers = function(originalTarget, parentNode, markerName) {
	if (markerName === void 0) markerName = "data-aria-hidden";
	var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
	var activeParentNode = parentNode || getDefaultParent(originalTarget);
	if (!activeParentNode) return function() {
		return null;
	};
	targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live], script")));
	return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
};
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-dialog@1.1.15_@types+react-dom@19.2.3_@types+react@19.2.14__@types+reac_779045218dc2799d336e7197abef9d38/node_modules/@radix-ui/react-dialog/dist/index.mjs
var DIALOG_NAME = "Dialog";
var [createDialogContext, createDialogScope] = createContextScope$1(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog = (props) => {
	const { __scopeDialog, children, open: openProp, defaultOpen, onOpenChange, modal = true } = props;
	const triggerRef = import_react.useRef(null);
	const contentRef = import_react.useRef(null);
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen ?? false,
		onChange: onOpenChange,
		caller: DIALOG_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogProvider, {
		scope: __scopeDialog,
		triggerRef,
		contentRef,
		contentId: useId(),
		titleId: useId(),
		descriptionId: useId(),
		open,
		onOpenChange: setOpen,
		onOpenToggle: import_react.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
		modal,
		children
	});
};
Dialog.displayName = DIALOG_NAME;
var TRIGGER_NAME$1 = "DialogTrigger";
var DialogTrigger = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDialog, ...triggerProps } = props;
	const context = useDialogContext(TRIGGER_NAME$1, __scopeDialog);
	const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": context.open,
		"aria-controls": context.contentId,
		"data-state": getState(context.open),
		...triggerProps,
		ref: composedTriggerRef,
		onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
	});
});
DialogTrigger.displayName = TRIGGER_NAME$1;
var PORTAL_NAME$2 = "DialogPortal";
var [PortalProvider$1, usePortalContext$1] = createDialogContext(PORTAL_NAME$2, { forceMount: void 0 });
var DialogPortal = (props) => {
	const { __scopeDialog, forceMount, children, container } = props;
	const context = useDialogContext(PORTAL_NAME$2, __scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalProvider$1, {
		scope: __scopeDialog,
		forceMount,
		children: import_react.Children.map(children, (child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
			present: forceMount || context.open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal$2, {
				asChild: true,
				container,
				children: child
			})
		}))
	});
};
DialogPortal.displayName = PORTAL_NAME$2;
var OVERLAY_NAME = "DialogOverlay";
var DialogOverlay = import_react.forwardRef((props, forwardedRef) => {
	const portalContext = usePortalContext$1(OVERLAY_NAME, props.__scopeDialog);
	const { forceMount = portalContext.forceMount, ...overlayProps } = props;
	const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
	return context.modal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.open,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlayImpl, {
			...overlayProps,
			ref: forwardedRef
		})
	}) : null;
});
DialogOverlay.displayName = OVERLAY_NAME;
var Slot$1 = /* @__PURE__ */ createSlot$1("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDialog, ...overlayProps } = props;
	const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReactRemoveScroll, {
		as: Slot$1,
		allowPinchZoom: true,
		shards: [context.contentRef],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.div, {
			"data-state": getState(context.open),
			...overlayProps,
			ref: forwardedRef,
			style: {
				pointerEvents: "auto",
				...overlayProps.style
			}
		})
	});
});
var CONTENT_NAME$2 = "DialogContent";
var DialogContent = import_react.forwardRef((props, forwardedRef) => {
	const portalContext = usePortalContext$1(CONTENT_NAME$2, props.__scopeDialog);
	const { forceMount = portalContext.forceMount, ...contentProps } = props;
	const context = useDialogContext(CONTENT_NAME$2, props.__scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.open,
		children: context.modal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentModal, {
			...contentProps,
			ref: forwardedRef
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentNonModal, {
			...contentProps,
			ref: forwardedRef
		})
	});
});
DialogContent.displayName = CONTENT_NAME$2;
var DialogContentModal = import_react.forwardRef((props, forwardedRef) => {
	const context = useDialogContext(CONTENT_NAME$2, props.__scopeDialog);
	const contentRef = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
	import_react.useEffect(() => {
		const content = contentRef.current;
		if (content) return hideOthers(content);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentImpl, {
		...props,
		ref: composedRefs,
		trapFocus: context.open,
		disableOutsidePointerEvents: true,
		onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
			event.preventDefault();
			context.triggerRef.current?.focus();
		}),
		onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
			const originalEvent = event.detail.originalEvent;
			const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
			if (originalEvent.button === 2 || ctrlLeftClick) event.preventDefault();
		}),
		onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => event.preventDefault())
	});
});
var DialogContentNonModal = import_react.forwardRef((props, forwardedRef) => {
	const context = useDialogContext(CONTENT_NAME$2, props.__scopeDialog);
	const hasInteractedOutsideRef = import_react.useRef(false);
	const hasPointerDownOutsideRef = import_react.useRef(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentImpl, {
		...props,
		ref: forwardedRef,
		trapFocus: false,
		disableOutsidePointerEvents: false,
		onCloseAutoFocus: (event) => {
			props.onCloseAutoFocus?.(event);
			if (!event.defaultPrevented) {
				if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
				event.preventDefault();
			}
			hasInteractedOutsideRef.current = false;
			hasPointerDownOutsideRef.current = false;
		},
		onInteractOutside: (event) => {
			props.onInteractOutside?.(event);
			if (!event.defaultPrevented) {
				hasInteractedOutsideRef.current = true;
				if (event.detail.originalEvent.type === "pointerdown") hasPointerDownOutsideRef.current = true;
			}
			const target = event.target;
			if (context.triggerRef.current?.contains(target)) event.preventDefault();
			if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) event.preventDefault();
		}
	});
});
var DialogContentImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
	const context = useDialogContext(CONTENT_NAME$2, __scopeDialog);
	const contentRef = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, contentRef);
	useFocusGuards();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusScope, {
		asChild: true,
		loop: true,
		trapped: trapFocus,
		onMountAutoFocus: onOpenAutoFocus,
		onUnmountAutoFocus: onCloseAutoFocus,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DismissableLayer, {
			role: "dialog",
			id: context.contentId,
			"aria-describedby": context.descriptionId,
			"aria-labelledby": context.titleId,
			"data-state": getState(context.open),
			...contentProps,
			ref: composedRefs,
			onDismiss: () => context.onOpenChange(false)
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleWarning, { titleId: context.titleId }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DescriptionWarning, {
		contentRef,
		descriptionId: context.descriptionId
	})] })] });
});
var TITLE_NAME = "DialogTitle";
var DialogTitle = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDialog, ...titleProps } = props;
	const context = useDialogContext(TITLE_NAME, __scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.h2, {
		id: context.titleId,
		...titleProps,
		ref: forwardedRef
	});
});
DialogTitle.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "DialogDescription";
var DialogDescription = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDialog, ...descriptionProps } = props;
	const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.p, {
		id: context.descriptionId,
		...descriptionProps,
		ref: forwardedRef
	});
});
DialogDescription.displayName = DESCRIPTION_NAME;
var CLOSE_NAME = "DialogClose";
var DialogClose = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDialog, ...closeProps } = props;
	const context = useDialogContext(CLOSE_NAME, __scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.button, {
		type: "button",
		...closeProps,
		ref: forwardedRef,
		onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
	});
});
DialogClose.displayName = CLOSE_NAME;
function getState(open) {
	return open ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning";
var [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
	contentName: CONTENT_NAME$2,
	titleName: TITLE_NAME,
	docsSlug: "dialog"
});
var TitleWarning = ({ titleId }) => {
	const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
	const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
	import_react.useEffect(() => {
		if (titleId) {
			if (!document.getElementById(titleId)) console.error(MESSAGE);
		}
	}, [MESSAGE, titleId]);
	return null;
};
var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
var DescriptionWarning = ({ contentRef, descriptionId }) => {
	const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${useWarningContext(DESCRIPTION_WARNING_NAME).contentName}}.`;
	import_react.useEffect(() => {
		const describedById = contentRef.current?.getAttribute("aria-describedby");
		if (descriptionId && describedById) {
			if (!document.getElementById(descriptionId)) console.warn(MESSAGE);
		}
	}, [
		MESSAGE,
		contentRef,
		descriptionId
	]);
	return null;
};
var Root$2 = Dialog;
var Trigger$1 = DialogTrigger;
var Portal$1 = DialogPortal;
var Overlay = DialogOverlay;
var Content = DialogContent;
var Title = DialogTitle;
var Description = DialogDescription;
var Close = DialogClose;
//#endregion
//#region src/components/ui/sheet.tsx
var Sheet = Root$2;
var SheetPortal = Portal$1;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
	"data-uid": "src/components/ui/sheet.tsx:21:3",
	"data-prohibitions": "[editContent]",
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = Overlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, {
	"data-uid": "src/components/ui/sheet.tsx:60:3",
	"data-prohibitions": "[editContent]",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {
		"data-uid": "src/components/ui/sheet.tsx:61:5",
		"data-prohibitions": "[editContent]"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
		"data-uid": "src/components/ui/sheet.tsx:62:5",
		"data-prohibitions": "[editContent]",
		ref,
		className: cn(sheetVariants({ side }), className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Close, {
			"data-uid": "src/components/ui/sheet.tsx:64:7",
			"data-prohibitions": "[]",
			className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
				"data-uid": "src/components/ui/sheet.tsx:65:9",
				"data-prohibitions": "[editContent]",
				className: "h-4 w-4"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-uid": "src/components/ui/sheet.tsx:66:9",
				"data-prohibitions": "[]",
				className: "sr-only",
				children: "Close"
			})]
		})]
	})]
}));
SheetContent.displayName = Content.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/sheet.tsx:74:3",
	"data-prohibitions": "[editContent]",
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/sheet.tsx:79:3",
	"data-prohibitions": "[editContent]",
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
	"data-uid": "src/components/ui/sheet.tsx:90:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = Title.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
	"data-uid": "src/components/ui/sheet.tsx:102:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = Description.displayName;
//#endregion
//#region src/components/ui/skeleton.tsx
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/ui/skeleton.tsx:5:10",
		"data-prohibitions": "[editContent]",
		className: cn("animate-pulse rounded-md bg-muted", className),
		...props
	});
}
//#endregion
//#region src/components/ui/sidebar.tsx
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var SIDEBAR_COOKIE_MAX_AGE = 3600 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = import_react.createContext(null);
function useSidebar() {
	const context = import_react.useContext(SidebarContext);
	if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
	return context;
}
var SidebarProvider = import_react.forwardRef(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = import_react.useState(false);
	const [_open, _setOpen] = import_react.useState(defaultOpen);
	const open = openProp ?? _open;
	const setOpen = import_react.useCallback((value) => {
		const openState = typeof value === "function" ? value(open) : value;
		if (setOpenProp) setOpenProp(openState);
		else _setOpen(openState);
		document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
	}, [setOpenProp, open]);
	const toggleSidebar = import_react.useCallback(() => {
		return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
	}, [
		isMobile,
		setOpen,
		setOpenMobile
	]);
	import_react.useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				toggleSidebar();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [toggleSidebar]);
	const state = open ? "expanded" : "collapsed";
	const contextValue = import_react.useMemo(() => ({
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	}), [
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContext.Provider, {
		"data-uid": "src/components/ui/sidebar.tsx:128:7",
		"data-prohibitions": "[editContent]",
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
			"data-uid": "src/components/ui/sidebar.tsx:129:9",
			"data-prohibitions": "[editContent]",
			delayDuration: 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/ui/sidebar.tsx:130:11",
				"data-prohibitions": "[editContent]",
				style: {
					"--sidebar-width": SIDEBAR_WIDTH,
					"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
					...style
				},
				className: cn("group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar", className),
				ref,
				...props,
				children
			})
		})
	});
});
SidebarProvider.displayName = "SidebarProvider";
var Sidebar = import_react.forwardRef(({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
	const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
	if (collapsible === "none") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/ui/sidebar.tsx:177:9",
		"data-prohibitions": "[editContent]",
		className: cn("flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground", className),
		ref,
		...props,
		children
	});
	if (isMobile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		"data-uid": "src/components/ui/sidebar.tsx:192:9",
		"data-prohibitions": "[editContent]",
		open: openMobile,
		onOpenChange: setOpenMobile,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			"data-uid": "src/components/ui/sidebar.tsx:193:11",
			"data-prohibitions": "[editContent]",
			"data-sidebar": "sidebar",
			"data-mobile": "true",
			className: "w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
			style: { "--sidebar-width": SIDEBAR_WIDTH_MOBILE },
			side,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
				"data-uid": "src/components/ui/sidebar.tsx:204:13",
				"data-prohibitions": "[]",
				className: "sr-only",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
					"data-uid": "src/components/ui/sidebar.tsx:205:15",
					"data-prohibitions": "[]",
					children: "Sidebar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
					"data-uid": "src/components/ui/sidebar.tsx:206:15",
					"data-prohibitions": "[]",
					children: "Displays the mobile sidebar."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/ui/sidebar.tsx:208:13",
				"data-prohibitions": "[editContent]",
				className: "flex h-full w-full flex-col",
				children
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/ui/sidebar.tsx:215:7",
		"data-prohibitions": "[editContent]",
		ref,
		className: "group peer hidden text-sidebar-foreground md:block",
		"data-state": state,
		"data-collapsible": state === "collapsed" ? collapsible : "",
		"data-variant": variant,
		"data-side": side,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/ui/sidebar.tsx:224:9",
			"data-prohibitions": "[editContent]",
			className: cn("relative w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/ui/sidebar.tsx:234:9",
			"data-prohibitions": "[editContent]",
			className: cn("fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex", side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]", variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l", className),
			...props,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/ui/sidebar.tsx:248:11",
				"data-prohibitions": "[editContent]",
				"data-sidebar": "sidebar",
				className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow",
				children
			})
		})]
	});
});
Sidebar.displayName = "Sidebar";
var SidebarTrigger = import_react.forwardRef(({ className, onClick, ...props }, ref) => {
	const { toggleSidebar } = useSidebar();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		"data-uid": "src/components/ui/sidebar.tsx:268:5",
		"data-prohibitions": "[editContent]",
		ref,
		"data-sidebar": "trigger",
		variant: "ghost",
		size: "icon",
		className: cn("h-7 w-7", className),
		onClick: (event) => {
			onClick?.(event);
			toggleSidebar();
		},
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			"data-uid": "src/components/ui/sidebar.tsx:280:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeft, {
				"data-uid": "src/components/ui/sidebar.tsx:281:9",
				"data-prohibitions": "[editContent]"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-uid": "src/components/ui/sidebar.tsx:282:9",
				"data-prohibitions": "[]",
				className: "sr-only",
				children: "Toggle Sidebar"
			})]
		})
	});
});
SidebarTrigger.displayName = "SidebarTrigger";
var SidebarRail = import_react.forwardRef(({ className, ...props }, ref) => {
	const { toggleSidebar } = useSidebar();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		"data-uid": "src/components/ui/sidebar.tsx:294:7",
		"data-prohibitions": "[editContent]",
		ref,
		"data-sidebar": "rail",
		"aria-label": "Toggle Sidebar",
		tabIndex: -1,
		onClick: toggleSidebar,
		title: "Toggle Sidebar",
		className: cn("absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex", "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize", "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar", "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2", className),
		...props
	});
});
SidebarRail.displayName = "SidebarRail";
var SidebarInset = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		"data-uid": "src/components/ui/sidebar.tsx:320:7",
		"data-prohibitions": "[editContent]",
		ref,
		className: cn("relative flex w-full flex-1 flex-col bg-background", "md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow", className),
		...props
	});
});
SidebarInset.displayName = "SidebarInset";
var SidebarInput = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		"data-uid": "src/components/ui/sidebar.tsx:339:5",
		"data-prohibitions": "[editContent]",
		ref,
		"data-sidebar": "input",
		className: cn("h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring", className),
		...props
	});
});
SidebarInput.displayName = "SidebarInput";
var SidebarHeader = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/ui/sidebar.tsx:355:7",
		"data-prohibitions": "[editContent]",
		ref,
		"data-sidebar": "header",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	});
});
SidebarHeader.displayName = "SidebarHeader";
var SidebarFooter = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/ui/sidebar.tsx:369:7",
		"data-prohibitions": "[editContent]",
		ref,
		"data-sidebar": "footer",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	});
});
SidebarFooter.displayName = "SidebarFooter";
var SidebarSeparator = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {
		"data-uid": "src/components/ui/sidebar.tsx:385:5",
		"data-prohibitions": "[editContent]",
		ref,
		"data-sidebar": "separator",
		className: cn("mx-2 w-auto bg-sidebar-border", className),
		...props
	});
});
SidebarSeparator.displayName = "SidebarSeparator";
var SidebarContent = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/ui/sidebar.tsx:398:7",
		"data-prohibitions": "[editContent]",
		ref,
		"data-sidebar": "content",
		className: cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className),
		...props
	});
});
SidebarContent.displayName = "SidebarContent";
var SidebarGroup = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/ui/sidebar.tsx:415:7",
		"data-prohibitions": "[editContent]",
		ref,
		"data-sidebar": "group",
		className: cn("relative flex w-full min-w-0 flex-col p-2", className),
		...props
	});
});
SidebarGroup.displayName = "SidebarGroup";
var SidebarGroupLabel = import_react.forwardRef(({ className, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot$2 : "div", {
		"data-uid": "src/components/ui/sidebar.tsx:433:5",
		"data-prohibitions": "[editContent]",
		ref,
		"data-sidebar": "group-label",
		className: cn("flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", className),
		...props
	});
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";
var SidebarGroupAction = import_react.forwardRef(({ className, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot$2 : "button", {
		"data-uid": "src/components/ui/sidebar.tsx:454:5",
		"data-prohibitions": "[editContent]",
		ref,
		"data-sidebar": "group-action",
		className: cn("absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "after:absolute after:-inset-2 after:md:hidden", "group-data-[collapsible=icon]:hidden", className),
		...props
	});
});
SidebarGroupAction.displayName = "SidebarGroupAction";
var SidebarGroupContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/sidebar.tsx:472:5",
	"data-prohibitions": "[editContent]",
	ref,
	"data-sidebar": "group-content",
	className: cn("w-full text-sm", className),
	...props
}));
SidebarGroupContent.displayName = "SidebarGroupContent";
var SidebarMenu = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
	"data-uid": "src/components/ui/sidebar.tsx:484:5",
	"data-prohibitions": "[editContent]",
	ref,
	"data-sidebar": "menu",
	className: cn("flex w-full min-w-0 flex-col gap-1", className),
	...props
}));
SidebarMenu.displayName = "SidebarMenu";
var SidebarMenuItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
	"data-uid": "src/components/ui/sidebar.tsx:496:5",
	"data-prohibitions": "[editContent]",
	ref,
	"data-sidebar": "menu-item",
	className: cn("group/menu-item relative", className),
	...props
}));
SidebarMenuItem.displayName = "SidebarMenuItem";
var sidebarMenuButtonVariants = cva("peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", {
	variants: {
		variant: {
			default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
			outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
		},
		size: {
			default: "h-8 text-sm",
			sm: "h-7 text-xs",
			lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var SidebarMenuButton = import_react.forwardRef(({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }, ref) => {
	const Comp = asChild ? Slot$2 : "button";
	const { isMobile, state } = useSidebar();
	const button = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, {
		"data-uid": "src/components/ui/sidebar.tsx:552:7",
		"data-prohibitions": "[editContent]",
		ref,
		"data-sidebar": "menu-button",
		"data-size": size,
		"data-active": isActive,
		className: cn(sidebarMenuButtonVariants({
			variant,
			size
		}), className),
		...props
	});
	if (!tooltip) return button;
	if (typeof tooltip === "string") tooltip = { children: tooltip };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
		"data-uid": "src/components/ui/sidebar.tsx:573:7",
		"data-prohibitions": "[editContent]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
			"data-uid": "src/components/ui/sidebar.tsx:574:9",
			"data-prohibitions": "[editContent]",
			asChild: true,
			children: button
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
			"data-uid": "src/components/ui/sidebar.tsx:575:9",
			"data-prohibitions": "[editContent]",
			side: "right",
			align: "center",
			hidden: state !== "collapsed" || isMobile,
			...tooltip
		})]
	});
});
SidebarMenuButton.displayName = "SidebarMenuButton";
var SidebarMenuAction = import_react.forwardRef(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot$2 : "button", {
		"data-uid": "src/components/ui/sidebar.tsx:597:5",
		"data-prohibitions": "[editContent]",
		ref,
		"data-sidebar": "menu-action",
		className: cn("absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0", "after:absolute after:-inset-2 after:md:hidden", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0", className),
		...props
	});
});
SidebarMenuAction.displayName = "SidebarMenuAction";
var SidebarMenuBadge = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/sidebar.tsx:620:5",
	"data-prohibitions": "[editContent]",
	ref,
	"data-sidebar": "menu-badge",
	className: cn("pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground", "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", className),
	...props
}));
SidebarMenuBadge.displayName = "SidebarMenuBadge";
var SidebarMenuSkeleton = import_react.forwardRef(({ className, showIcon = false, ...props }, ref) => {
	const width = import_react.useMemo(() => {
		return `${Math.floor(Math.random() * 40) + 50}%`;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/ui/sidebar.tsx:650:5",
		"data-prohibitions": "[editContent]",
		ref,
		"data-sidebar": "menu-skeleton",
		className: cn("flex h-8 items-center gap-2 rounded-md px-2", className),
		...props,
		children: [showIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/components/ui/sidebar.tsx:656:20",
			"data-prohibitions": "[editContent]",
			className: "size-4 rounded-md",
			"data-sidebar": "menu-skeleton-icon"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/components/ui/sidebar.tsx:657:7",
			"data-prohibitions": "[editContent]",
			className: "h-4 max-w-[--skeleton-width] flex-1",
			"data-sidebar": "menu-skeleton-text",
			style: { "--skeleton-width": width }
		})]
	});
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
var SidebarMenuSub = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
	"data-uid": "src/components/ui/sidebar.tsx:673:5",
	"data-prohibitions": "[editContent]",
	ref,
	"data-sidebar": "menu-sub",
	className: cn("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5", "group-data-[collapsible=icon]:hidden", className),
	...props
}));
SidebarMenuSub.displayName = "SidebarMenuSub";
var SidebarMenuSubItem = import_react.forwardRef(({ ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
	"data-uid": "src/components/ui/sidebar.tsx:688:26",
	"data-prohibitions": "[editContent]",
	ref,
	...props
}));
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
var SidebarMenuSubButton = import_react.forwardRef(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot$2 : "a", {
		"data-uid": "src/components/ui/sidebar.tsx:703:5",
		"data-prohibitions": "[editContent]",
		ref,
		"data-sidebar": "menu-sub-button",
		"data-size": size,
		"data-active": isActive,
		className: cn("flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground", "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground", size === "sm" && "text-xs", size === "md" && "text-sm", "group-data-[collapsible=icon]:hidden", className),
		...props
	});
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-direction@1.1.1_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-direction/dist/index.mjs
var DirectionContext = import_react.createContext(void 0);
function useDirection(localDir) {
	const globalDir = import_react.useContext(DirectionContext);
	return localDir || globalDir || "ltr";
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-roving-focus@1.1.11_@types+react-dom@19.2.3_@types+react@19.2.14__@type_4eeb29c998b846c35358e2f929e7490e/node_modules/@radix-ui/react-roving-focus/dist/index.mjs
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = {
	bubbles: false,
	cancelable: true
};
var GROUP_NAME$2 = "RovingFocusGroup";
var [Collection$1, useCollection$1, createCollectionScope$1] = createCollection(GROUP_NAME$2);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope$1(GROUP_NAME$2, [createCollectionScope$1]);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME$2);
var RovingFocusGroup = import_react.forwardRef((props, forwardedRef) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection$1.Provider, {
		scope: props.__scopeRovingFocusGroup,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection$1.Slot, {
			scope: props.__scopeRovingFocusGroup,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RovingFocusGroupImpl, {
				...props,
				ref: forwardedRef
			})
		})
	});
});
RovingFocusGroup.displayName = GROUP_NAME$2;
var RovingFocusGroupImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRovingFocusGroup, orientation, loop = false, dir, currentTabStopId: currentTabStopIdProp, defaultCurrentTabStopId, onCurrentTabStopIdChange, onEntryFocus, preventScrollOnEntryFocus = false, ...groupProps } = props;
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const direction = useDirection(dir);
	const [currentTabStopId, setCurrentTabStopId] = useControllableState({
		prop: currentTabStopIdProp,
		defaultProp: defaultCurrentTabStopId ?? null,
		onChange: onCurrentTabStopIdChange,
		caller: GROUP_NAME$2
	});
	const [isTabbingBackOut, setIsTabbingBackOut] = import_react.useState(false);
	const handleEntryFocus = useCallbackRef$1(onEntryFocus);
	const getItems = useCollection$1(__scopeRovingFocusGroup);
	const isClickFocusRef = import_react.useRef(false);
	const [focusableItemsCount, setFocusableItemsCount] = import_react.useState(0);
	import_react.useEffect(() => {
		const node = ref.current;
		if (node) {
			node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
			return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
		}
	}, [handleEntryFocus]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RovingFocusProvider, {
		scope: __scopeRovingFocusGroup,
		orientation,
		dir: direction,
		loop,
		currentTabStopId,
		onItemFocus: import_react.useCallback((tabStopId) => setCurrentTabStopId(tabStopId), [setCurrentTabStopId]),
		onItemShiftTab: import_react.useCallback(() => setIsTabbingBackOut(true), []),
		onFocusableItemAdd: import_react.useCallback(() => setFocusableItemsCount((prevCount) => prevCount + 1), []),
		onFocusableItemRemove: import_react.useCallback(() => setFocusableItemsCount((prevCount) => prevCount - 1), []),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.div, {
			tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
			"data-orientation": orientation,
			...groupProps,
			ref: composedRefs,
			style: {
				outline: "none",
				...props.style
			},
			onMouseDown: composeEventHandlers(props.onMouseDown, () => {
				isClickFocusRef.current = true;
			}),
			onFocus: composeEventHandlers(props.onFocus, (event) => {
				const isKeyboardFocus = !isClickFocusRef.current;
				if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
					const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
					event.currentTarget.dispatchEvent(entryFocusEvent);
					if (!entryFocusEvent.defaultPrevented) {
						const items = getItems().filter((item) => item.focusable);
						focusFirst$1([
							items.find((item) => item.active),
							items.find((item) => item.id === currentTabStopId),
							...items
						].filter(Boolean).map((item) => item.ref.current), preventScrollOnEntryFocus);
					}
				}
				isClickFocusRef.current = false;
			}),
			onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
		})
	});
});
var ITEM_NAME$2 = "RovingFocusGroupItem";
var RovingFocusGroupItem = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRovingFocusGroup, focusable = true, active = false, tabStopId, children, ...itemProps } = props;
	const autoId = useId();
	const id = tabStopId || autoId;
	const context = useRovingFocusContext(ITEM_NAME$2, __scopeRovingFocusGroup);
	const isCurrentTabStop = context.currentTabStopId === id;
	const getItems = useCollection$1(__scopeRovingFocusGroup);
	const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
	import_react.useEffect(() => {
		if (focusable) {
			onFocusableItemAdd();
			return () => onFocusableItemRemove();
		}
	}, [
		focusable,
		onFocusableItemAdd,
		onFocusableItemRemove
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection$1.ItemSlot, {
		scope: __scopeRovingFocusGroup,
		id,
		focusable,
		active,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.span, {
			tabIndex: isCurrentTabStop ? 0 : -1,
			"data-orientation": context.orientation,
			...itemProps,
			ref: forwardedRef,
			onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
				if (!focusable) event.preventDefault();
				else context.onItemFocus(id);
			}),
			onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				if (event.key === "Tab" && event.shiftKey) {
					context.onItemShiftTab();
					return;
				}
				if (event.target !== event.currentTarget) return;
				const focusIntent = getFocusIntent(event, context.orientation, context.dir);
				if (focusIntent !== void 0) {
					if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
					event.preventDefault();
					let candidateNodes = getItems().filter((item) => item.focusable).map((item) => item.ref.current);
					if (focusIntent === "last") candidateNodes.reverse();
					else if (focusIntent === "prev" || focusIntent === "next") {
						if (focusIntent === "prev") candidateNodes.reverse();
						const currentIndex = candidateNodes.indexOf(event.currentTarget);
						candidateNodes = context.loop ? wrapArray$1(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
					}
					setTimeout(() => focusFirst$1(candidateNodes));
				}
			}),
			children: typeof children === "function" ? children({
				isCurrentTabStop,
				hasTabStop: currentTabStopId != null
			}) : children
		})
	});
});
RovingFocusGroupItem.displayName = ITEM_NAME$2;
var MAP_KEY_TO_FOCUS_INTENT = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function getDirectionAwareKey(key, dir) {
	if (dir !== "rtl") return key;
	return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
	const key = getDirectionAwareKey(event.key, dir);
	if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
	if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
	return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst$1(candidates, preventScroll = false) {
	const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
	for (const candidate of candidates) {
		if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
		candidate.focus({ preventScroll });
		if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
	}
}
function wrapArray$1(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root$1 = RovingFocusGroup;
var Item = RovingFocusGroupItem;
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-menu@2.1.16_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react@_73ff7391b7be14d4dbff03af4dbac090/node_modules/@radix-ui/react-menu/dist/index.mjs
var SELECTION_KEYS = ["Enter", " "];
var FIRST_KEYS = [
	"ArrowDown",
	"PageUp",
	"Home"
];
var LAST_KEYS = [
	"ArrowUp",
	"PageDown",
	"End"
];
var FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
var SUB_OPEN_KEYS = {
	ltr: [...SELECTION_KEYS, "ArrowRight"],
	rtl: [...SELECTION_KEYS, "ArrowLeft"]
};
var SUB_CLOSE_KEYS = {
	ltr: ["ArrowLeft"],
	rtl: ["ArrowRight"]
};
var MENU_NAME = "Menu";
var [Collection, useCollection, createCollectionScope] = createCollection(MENU_NAME);
var [createMenuContext, createMenuScope] = createContextScope$1(MENU_NAME, [
	createCollectionScope,
	createPopperScope,
	createRovingFocusGroupScope
]);
var usePopperScope = createPopperScope();
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [MenuProvider, useMenuContext] = createMenuContext(MENU_NAME);
var [MenuRootProvider, useMenuRootContext] = createMenuContext(MENU_NAME);
var Menu = (props) => {
	const { __scopeMenu, open = false, children, dir, onOpenChange, modal = true } = props;
	const popperScope = usePopperScope(__scopeMenu);
	const [content, setContent] = import_react.useState(null);
	const isUsingKeyboardRef = import_react.useRef(false);
	const handleOpenChange = useCallbackRef$1(onOpenChange);
	const direction = useDirection(dir);
	import_react.useEffect(() => {
		const handleKeyDown = () => {
			isUsingKeyboardRef.current = true;
			document.addEventListener("pointerdown", handlePointer, {
				capture: true,
				once: true
			});
			document.addEventListener("pointermove", handlePointer, {
				capture: true,
				once: true
			});
		};
		const handlePointer = () => isUsingKeyboardRef.current = false;
		document.addEventListener("keydown", handleKeyDown, { capture: true });
		return () => {
			document.removeEventListener("keydown", handleKeyDown, { capture: true });
			document.removeEventListener("pointerdown", handlePointer, { capture: true });
			document.removeEventListener("pointermove", handlePointer, { capture: true });
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2$1, {
		...popperScope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuProvider, {
			scope: __scopeMenu,
			open,
			onOpenChange: handleOpenChange,
			content,
			onContentChange: setContent,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRootProvider, {
				scope: __scopeMenu,
				onClose: import_react.useCallback(() => handleOpenChange(false), [handleOpenChange]),
				isUsingKeyboardRef,
				dir: direction,
				modal,
				children
			})
		})
	});
};
Menu.displayName = MENU_NAME;
var ANCHOR_NAME = "MenuAnchor";
var MenuAnchor = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, ...anchorProps } = props;
	const popperScope = usePopperScope(__scopeMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, {
		...popperScope,
		...anchorProps,
		ref: forwardedRef
	});
});
MenuAnchor.displayName = ANCHOR_NAME;
var PORTAL_NAME$1 = "MenuPortal";
var [PortalProvider, usePortalContext] = createMenuContext(PORTAL_NAME$1, { forceMount: void 0 });
var MenuPortal = (props) => {
	const { __scopeMenu, forceMount, children, container } = props;
	const context = useMenuContext(PORTAL_NAME$1, __scopeMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalProvider, {
		scope: __scopeMenu,
		forceMount,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
			present: forceMount || context.open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal$2, {
				asChild: true,
				container,
				children
			})
		})
	});
};
MenuPortal.displayName = PORTAL_NAME$1;
var CONTENT_NAME$1 = "MenuContent";
var [MenuContentProvider, useMenuContentContext] = createMenuContext(CONTENT_NAME$1);
var MenuContent = import_react.forwardRef((props, forwardedRef) => {
	const portalContext = usePortalContext(CONTENT_NAME$1, props.__scopeMenu);
	const { forceMount = portalContext.forceMount, ...contentProps } = props;
	const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
	const rootContext = useMenuRootContext(CONTENT_NAME$1, props.__scopeMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, {
		scope: props.__scopeMenu,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
			present: forceMount || context.open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
				scope: props.__scopeMenu,
				children: rootContext.modal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRootContentModal, {
					...contentProps,
					ref: forwardedRef
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRootContentNonModal, {
					...contentProps,
					ref: forwardedRef
				})
			})
		})
	});
});
var MenuRootContentModal = import_react.forwardRef((props, forwardedRef) => {
	const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	import_react.useEffect(() => {
		const content = ref.current;
		if (content) return hideOthers(content);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuContentImpl, {
		...props,
		ref: composedRefs,
		trapFocus: context.open,
		disableOutsidePointerEvents: context.open,
		disableOutsideScroll: true,
		onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => event.preventDefault(), { checkForDefaultPrevented: false }),
		onDismiss: () => context.onOpenChange(false)
	});
});
var MenuRootContentNonModal = import_react.forwardRef((props, forwardedRef) => {
	const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuContentImpl, {
		...props,
		ref: forwardedRef,
		trapFocus: false,
		disableOutsidePointerEvents: false,
		disableOutsideScroll: false,
		onDismiss: () => context.onOpenChange(false)
	});
});
var Slot = /* @__PURE__ */ createSlot$1("MenuContent.ScrollLock");
var MenuContentImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, loop = false, trapFocus, onOpenAutoFocus, onCloseAutoFocus, disableOutsidePointerEvents, onEntryFocus, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, onDismiss, disableOutsideScroll, ...contentProps } = props;
	const context = useMenuContext(CONTENT_NAME$1, __scopeMenu);
	const rootContext = useMenuRootContext(CONTENT_NAME$1, __scopeMenu);
	const popperScope = usePopperScope(__scopeMenu);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
	const getItems = useCollection(__scopeMenu);
	const [currentItemId, setCurrentItemId] = import_react.useState(null);
	const contentRef = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, contentRef, context.onContentChange);
	const timerRef = import_react.useRef(0);
	const searchRef = import_react.useRef("");
	const pointerGraceTimerRef = import_react.useRef(0);
	const pointerGraceIntentRef = import_react.useRef(null);
	const pointerDirRef = import_react.useRef("right");
	const lastPointerXRef = import_react.useRef(0);
	const ScrollLockWrapper = disableOutsideScroll ? ReactRemoveScroll : import_react.Fragment;
	const scrollLockWrapperProps = disableOutsideScroll ? {
		as: Slot,
		allowPinchZoom: true
	} : void 0;
	const handleTypeaheadSearch = (key) => {
		const search = searchRef.current + key;
		const items = getItems().filter((item) => !item.disabled);
		const currentItem = document.activeElement;
		const currentMatch = items.find((item) => item.ref.current === currentItem)?.textValue;
		const nextMatch = getNextMatch(items.map((item) => item.textValue), search, currentMatch);
		const newItem = items.find((item) => item.textValue === nextMatch)?.ref.current;
		(function updateSearch(value) {
			searchRef.current = value;
			window.clearTimeout(timerRef.current);
			if (value !== "") timerRef.current = window.setTimeout(() => updateSearch(""), 1e3);
		})(search);
		if (newItem) setTimeout(() => newItem.focus());
	};
	import_react.useEffect(() => {
		return () => window.clearTimeout(timerRef.current);
	}, []);
	useFocusGuards();
	const isPointerMovingToSubmenu = import_react.useCallback((event) => {
		return pointerDirRef.current === pointerGraceIntentRef.current?.side && isPointerInGraceArea(event, pointerGraceIntentRef.current?.area);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuContentProvider, {
		scope: __scopeMenu,
		searchRef,
		onItemEnter: import_react.useCallback((event) => {
			if (isPointerMovingToSubmenu(event)) event.preventDefault();
		}, [isPointerMovingToSubmenu]),
		onItemLeave: import_react.useCallback((event) => {
			if (isPointerMovingToSubmenu(event)) return;
			contentRef.current?.focus();
			setCurrentItemId(null);
		}, [isPointerMovingToSubmenu]),
		onTriggerLeave: import_react.useCallback((event) => {
			if (isPointerMovingToSubmenu(event)) event.preventDefault();
		}, [isPointerMovingToSubmenu]),
		pointerGraceTimerRef,
		onPointerGraceIntentChange: import_react.useCallback((intent) => {
			pointerGraceIntentRef.current = intent;
		}, []),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollLockWrapper, {
			...scrollLockWrapperProps,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusScope, {
				asChild: true,
				trapped: trapFocus,
				onMountAutoFocus: composeEventHandlers(onOpenAutoFocus, (event) => {
					event.preventDefault();
					contentRef.current?.focus({ preventScroll: true });
				}),
				onUnmountAutoFocus: onCloseAutoFocus,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DismissableLayer, {
					asChild: true,
					disableOutsidePointerEvents,
					onEscapeKeyDown,
					onPointerDownOutside,
					onFocusOutside,
					onInteractOutside,
					onDismiss,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
						asChild: true,
						...rovingFocusGroupScope,
						dir: rootContext.dir,
						orientation: "vertical",
						loop,
						currentTabStopId: currentItemId,
						onCurrentTabStopIdChange: setCurrentItemId,
						onEntryFocus: composeEventHandlers(onEntryFocus, (event) => {
							if (!rootContext.isUsingKeyboardRef.current) event.preventDefault();
						}),
						preventScrollOnEntryFocus: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content$1, {
							role: "menu",
							"aria-orientation": "vertical",
							"data-state": getOpenState(context.open),
							"data-radix-menu-content": "",
							dir: rootContext.dir,
							...popperScope,
							...contentProps,
							ref: composedRefs,
							style: {
								outline: "none",
								...contentProps.style
							},
							onKeyDown: composeEventHandlers(contentProps.onKeyDown, (event) => {
								const isKeyDownInside = event.target.closest("[data-radix-menu-content]") === event.currentTarget;
								const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
								const isCharacterKey = event.key.length === 1;
								if (isKeyDownInside) {
									if (event.key === "Tab") event.preventDefault();
									if (!isModifierKey && isCharacterKey) handleTypeaheadSearch(event.key);
								}
								const content = contentRef.current;
								if (event.target !== content) return;
								if (!FIRST_LAST_KEYS.includes(event.key)) return;
								event.preventDefault();
								const candidateNodes = getItems().filter((item) => !item.disabled).map((item) => item.ref.current);
								if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
								focusFirst(candidateNodes);
							}),
							onBlur: composeEventHandlers(props.onBlur, (event) => {
								if (!event.currentTarget.contains(event.target)) {
									window.clearTimeout(timerRef.current);
									searchRef.current = "";
								}
							}),
							onPointerMove: composeEventHandlers(props.onPointerMove, whenMouse((event) => {
								const target = event.target;
								const pointerXHasChanged = lastPointerXRef.current !== event.clientX;
								if (event.currentTarget.contains(target) && pointerXHasChanged) {
									pointerDirRef.current = event.clientX > lastPointerXRef.current ? "right" : "left";
									lastPointerXRef.current = event.clientX;
								}
							}))
						})
					})
				})
			})
		})
	});
});
MenuContent.displayName = CONTENT_NAME$1;
var GROUP_NAME$1 = "MenuGroup";
var MenuGroup = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, ...groupProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.div, {
		role: "group",
		...groupProps,
		ref: forwardedRef
	});
});
MenuGroup.displayName = GROUP_NAME$1;
var LABEL_NAME$1 = "MenuLabel";
var MenuLabel = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, ...labelProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.div, {
		...labelProps,
		ref: forwardedRef
	});
});
MenuLabel.displayName = LABEL_NAME$1;
var ITEM_NAME$1 = "MenuItem";
var ITEM_SELECT = "menu.itemSelect";
var MenuItem = import_react.forwardRef((props, forwardedRef) => {
	const { disabled = false, onSelect, ...itemProps } = props;
	const ref = import_react.useRef(null);
	const rootContext = useMenuRootContext(ITEM_NAME$1, props.__scopeMenu);
	const contentContext = useMenuContentContext(ITEM_NAME$1, props.__scopeMenu);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const isPointerDownRef = import_react.useRef(false);
	const handleSelect = () => {
		const menuItem = ref.current;
		if (!disabled && menuItem) {
			const itemSelectEvent = new CustomEvent(ITEM_SELECT, {
				bubbles: true,
				cancelable: true
			});
			menuItem.addEventListener(ITEM_SELECT, (event) => onSelect?.(event), { once: true });
			dispatchDiscreteCustomEvent(menuItem, itemSelectEvent);
			if (itemSelectEvent.defaultPrevented) isPointerDownRef.current = false;
			else rootContext.onClose();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItemImpl, {
		...itemProps,
		ref: composedRefs,
		disabled,
		onClick: composeEventHandlers(props.onClick, handleSelect),
		onPointerDown: (event) => {
			props.onPointerDown?.(event);
			isPointerDownRef.current = true;
		},
		onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
			if (!isPointerDownRef.current) event.currentTarget?.click();
		}),
		onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
			const isTypingAhead = contentContext.searchRef.current !== "";
			if (disabled || isTypingAhead && event.key === " ") return;
			if (SELECTION_KEYS.includes(event.key)) {
				event.currentTarget.click();
				event.preventDefault();
			}
		})
	});
});
MenuItem.displayName = ITEM_NAME$1;
var MenuItemImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, disabled = false, textValue, ...itemProps } = props;
	const contentContext = useMenuContentContext(ITEM_NAME$1, __scopeMenu);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const [isFocused, setIsFocused] = import_react.useState(false);
	const [textContent, setTextContent] = import_react.useState("");
	import_react.useEffect(() => {
		const menuItem = ref.current;
		if (menuItem) setTextContent((menuItem.textContent ?? "").trim());
	}, [itemProps.children]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.ItemSlot, {
		scope: __scopeMenu,
		disabled,
		textValue: textValue ?? textContent,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
			asChild: true,
			...rovingFocusGroupScope,
			focusable: !disabled,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.div, {
				role: "menuitem",
				"data-highlighted": isFocused ? "" : void 0,
				"aria-disabled": disabled || void 0,
				"data-disabled": disabled ? "" : void 0,
				...itemProps,
				ref: composedRefs,
				onPointerMove: composeEventHandlers(props.onPointerMove, whenMouse((event) => {
					if (disabled) contentContext.onItemLeave(event);
					else {
						contentContext.onItemEnter(event);
						if (!event.defaultPrevented) event.currentTarget.focus({ preventScroll: true });
					}
				})),
				onPointerLeave: composeEventHandlers(props.onPointerLeave, whenMouse((event) => contentContext.onItemLeave(event))),
				onFocus: composeEventHandlers(props.onFocus, () => setIsFocused(true)),
				onBlur: composeEventHandlers(props.onBlur, () => setIsFocused(false))
			})
		})
	});
});
var CHECKBOX_ITEM_NAME$1 = "MenuCheckboxItem";
var MenuCheckboxItem = import_react.forwardRef((props, forwardedRef) => {
	const { checked = false, onCheckedChange, ...checkboxItemProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicatorProvider, {
		scope: props.__scopeMenu,
		checked,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
			role: "menuitemcheckbox",
			"aria-checked": isIndeterminate(checked) ? "mixed" : checked,
			...checkboxItemProps,
			ref: forwardedRef,
			"data-state": getCheckedState(checked),
			onSelect: composeEventHandlers(checkboxItemProps.onSelect, () => onCheckedChange?.(isIndeterminate(checked) ? true : !checked), { checkForDefaultPrevented: false })
		})
	});
});
MenuCheckboxItem.displayName = CHECKBOX_ITEM_NAME$1;
var RADIO_GROUP_NAME$1 = "MenuRadioGroup";
var [RadioGroupProvider, useRadioGroupContext] = createMenuContext(RADIO_GROUP_NAME$1, {
	value: void 0,
	onValueChange: () => {}
});
var MenuRadioGroup = import_react.forwardRef((props, forwardedRef) => {
	const { value, onValueChange, ...groupProps } = props;
	const handleValueChange = useCallbackRef$1(onValueChange);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupProvider, {
		scope: props.__scopeMenu,
		value,
		onValueChange: handleValueChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuGroup, {
			...groupProps,
			ref: forwardedRef
		})
	});
});
MenuRadioGroup.displayName = RADIO_GROUP_NAME$1;
var RADIO_ITEM_NAME$1 = "MenuRadioItem";
var MenuRadioItem = import_react.forwardRef((props, forwardedRef) => {
	const { value, ...radioItemProps } = props;
	const context = useRadioGroupContext(RADIO_ITEM_NAME$1, props.__scopeMenu);
	const checked = value === context.value;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicatorProvider, {
		scope: props.__scopeMenu,
		checked,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
			role: "menuitemradio",
			"aria-checked": checked,
			...radioItemProps,
			ref: forwardedRef,
			"data-state": getCheckedState(checked),
			onSelect: composeEventHandlers(radioItemProps.onSelect, () => context.onValueChange?.(value), { checkForDefaultPrevented: false })
		})
	});
});
MenuRadioItem.displayName = RADIO_ITEM_NAME$1;
var ITEM_INDICATOR_NAME = "MenuItemIndicator";
var [ItemIndicatorProvider, useItemIndicatorContext] = createMenuContext(ITEM_INDICATOR_NAME, { checked: false });
var MenuItemIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, forceMount, ...itemIndicatorProps } = props;
	const indicatorContext = useItemIndicatorContext(ITEM_INDICATOR_NAME, __scopeMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || isIndeterminate(indicatorContext.checked) || indicatorContext.checked === true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.span, {
			...itemIndicatorProps,
			ref: forwardedRef,
			"data-state": getCheckedState(indicatorContext.checked)
		})
	});
});
MenuItemIndicator.displayName = ITEM_INDICATOR_NAME;
var SEPARATOR_NAME$1 = "MenuSeparator";
var MenuSeparator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, ...separatorProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.div, {
		role: "separator",
		"aria-orientation": "horizontal",
		...separatorProps,
		ref: forwardedRef
	});
});
MenuSeparator.displayName = SEPARATOR_NAME$1;
var ARROW_NAME$1 = "MenuArrow";
var MenuArrow = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeMenu, ...arrowProps } = props;
	const popperScope = usePopperScope(__scopeMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, {
		...popperScope,
		...arrowProps,
		ref: forwardedRef
	});
});
MenuArrow.displayName = ARROW_NAME$1;
var SUB_NAME = "MenuSub";
var [MenuSubProvider, useMenuSubContext] = createMenuContext(SUB_NAME);
var MenuSub = (props) => {
	const { __scopeMenu, children, open = false, onOpenChange } = props;
	const parentMenuContext = useMenuContext(SUB_NAME, __scopeMenu);
	const popperScope = usePopperScope(__scopeMenu);
	const [trigger, setTrigger] = import_react.useState(null);
	const [content, setContent] = import_react.useState(null);
	const handleOpenChange = useCallbackRef$1(onOpenChange);
	import_react.useEffect(() => {
		if (parentMenuContext.open === false) handleOpenChange(false);
		return () => handleOpenChange(false);
	}, [parentMenuContext.open, handleOpenChange]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2$1, {
		...popperScope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuProvider, {
			scope: __scopeMenu,
			open,
			onOpenChange: handleOpenChange,
			content,
			onContentChange: setContent,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuSubProvider, {
				scope: __scopeMenu,
				contentId: useId(),
				triggerId: useId(),
				trigger,
				onTriggerChange: setTrigger,
				children
			})
		})
	});
};
MenuSub.displayName = SUB_NAME;
var SUB_TRIGGER_NAME$1 = "MenuSubTrigger";
var MenuSubTrigger = import_react.forwardRef((props, forwardedRef) => {
	const context = useMenuContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
	const rootContext = useMenuRootContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
	const subContext = useMenuSubContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
	const contentContext = useMenuContentContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
	const openTimerRef = import_react.useRef(null);
	const { pointerGraceTimerRef, onPointerGraceIntentChange } = contentContext;
	const scope = { __scopeMenu: props.__scopeMenu };
	const clearOpenTimer = import_react.useCallback(() => {
		if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
		openTimerRef.current = null;
	}, []);
	import_react.useEffect(() => clearOpenTimer, [clearOpenTimer]);
	import_react.useEffect(() => {
		const pointerGraceTimer = pointerGraceTimerRef.current;
		return () => {
			window.clearTimeout(pointerGraceTimer);
			onPointerGraceIntentChange(null);
		};
	}, [pointerGraceTimerRef, onPointerGraceIntentChange]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuAnchor, {
		asChild: true,
		...scope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItemImpl, {
			id: subContext.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": context.open,
			"aria-controls": subContext.contentId,
			"data-state": getOpenState(context.open),
			...props,
			ref: composeRefs(forwardedRef, subContext.onTriggerChange),
			onClick: (event) => {
				props.onClick?.(event);
				if (props.disabled || event.defaultPrevented) return;
				event.currentTarget.focus();
				if (!context.open) context.onOpenChange(true);
			},
			onPointerMove: composeEventHandlers(props.onPointerMove, whenMouse((event) => {
				contentContext.onItemEnter(event);
				if (event.defaultPrevented) return;
				if (!props.disabled && !context.open && !openTimerRef.current) {
					contentContext.onPointerGraceIntentChange(null);
					openTimerRef.current = window.setTimeout(() => {
						context.onOpenChange(true);
						clearOpenTimer();
					}, 100);
				}
			})),
			onPointerLeave: composeEventHandlers(props.onPointerLeave, whenMouse((event) => {
				clearOpenTimer();
				const contentRect = context.content?.getBoundingClientRect();
				if (contentRect) {
					const side = context.content?.dataset.side;
					const rightSide = side === "right";
					const bleed = rightSide ? -5 : 5;
					const contentNearEdge = contentRect[rightSide ? "left" : "right"];
					const contentFarEdge = contentRect[rightSide ? "right" : "left"];
					contentContext.onPointerGraceIntentChange({
						area: [
							{
								x: event.clientX + bleed,
								y: event.clientY
							},
							{
								x: contentNearEdge,
								y: contentRect.top
							},
							{
								x: contentFarEdge,
								y: contentRect.top
							},
							{
								x: contentFarEdge,
								y: contentRect.bottom
							},
							{
								x: contentNearEdge,
								y: contentRect.bottom
							}
						],
						side
					});
					window.clearTimeout(pointerGraceTimerRef.current);
					pointerGraceTimerRef.current = window.setTimeout(() => contentContext.onPointerGraceIntentChange(null), 300);
				} else {
					contentContext.onTriggerLeave(event);
					if (event.defaultPrevented) return;
					contentContext.onPointerGraceIntentChange(null);
				}
			})),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				const isTypingAhead = contentContext.searchRef.current !== "";
				if (props.disabled || isTypingAhead && event.key === " ") return;
				if (SUB_OPEN_KEYS[rootContext.dir].includes(event.key)) {
					context.onOpenChange(true);
					context.content?.focus();
					event.preventDefault();
				}
			})
		})
	});
});
MenuSubTrigger.displayName = SUB_TRIGGER_NAME$1;
var SUB_CONTENT_NAME$1 = "MenuSubContent";
var MenuSubContent = import_react.forwardRef((props, forwardedRef) => {
	const portalContext = usePortalContext(CONTENT_NAME$1, props.__scopeMenu);
	const { forceMount = portalContext.forceMount, ...subContentProps } = props;
	const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
	const rootContext = useMenuRootContext(CONTENT_NAME$1, props.__scopeMenu);
	const subContext = useMenuSubContext(SUB_CONTENT_NAME$1, props.__scopeMenu);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, {
		scope: props.__scopeMenu,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
			present: forceMount || context.open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
				scope: props.__scopeMenu,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuContentImpl, {
					id: subContext.contentId,
					"aria-labelledby": subContext.triggerId,
					...subContentProps,
					ref: composedRefs,
					align: "start",
					side: rootContext.dir === "rtl" ? "left" : "right",
					disableOutsidePointerEvents: false,
					disableOutsideScroll: false,
					trapFocus: false,
					onOpenAutoFocus: (event) => {
						if (rootContext.isUsingKeyboardRef.current) ref.current?.focus();
						event.preventDefault();
					},
					onCloseAutoFocus: (event) => event.preventDefault(),
					onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => {
						if (event.target !== subContext.trigger) context.onOpenChange(false);
					}),
					onEscapeKeyDown: composeEventHandlers(props.onEscapeKeyDown, (event) => {
						rootContext.onClose();
						event.preventDefault();
					}),
					onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
						const isKeyDownInside = event.currentTarget.contains(event.target);
						const isCloseKey = SUB_CLOSE_KEYS[rootContext.dir].includes(event.key);
						if (isKeyDownInside && isCloseKey) {
							context.onOpenChange(false);
							subContext.trigger?.focus();
							event.preventDefault();
						}
					})
				})
			})
		})
	});
});
MenuSubContent.displayName = SUB_CONTENT_NAME$1;
function getOpenState(open) {
	return open ? "open" : "closed";
}
function isIndeterminate(checked) {
	return checked === "indeterminate";
}
function getCheckedState(checked) {
	return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function focusFirst(candidates) {
	const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
	for (const candidate of candidates) {
		if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
		candidate.focus();
		if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
	}
}
function wrapArray(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
function getNextMatch(values, search, currentMatch) {
	const normalizedSearch = search.length > 1 && Array.from(search).every((char) => char === search[0]) ? search[0] : search;
	const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
	let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0));
	if (normalizedSearch.length === 1) wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
	const nextMatch = wrappedValues.find((value) => value.toLowerCase().startsWith(normalizedSearch.toLowerCase()));
	return nextMatch !== currentMatch ? nextMatch : void 0;
}
function isPointInPolygon(point, polygon) {
	const { x, y } = point;
	let inside = false;
	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		const ii = polygon[i];
		const jj = polygon[j];
		const xi = ii.x;
		const yi = ii.y;
		const xj = jj.x;
		const yj = jj.y;
		if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
	}
	return inside;
}
function isPointerInGraceArea(event, area) {
	if (!area) return false;
	return isPointInPolygon({
		x: event.clientX,
		y: event.clientY
	}, area);
}
function whenMouse(handler) {
	return (event) => event.pointerType === "mouse" ? handler(event) : void 0;
}
var Root3 = Menu;
var Anchor2 = MenuAnchor;
var Portal = MenuPortal;
var Content2$1 = MenuContent;
var Group = MenuGroup;
var Label = MenuLabel;
var Item2$1 = MenuItem;
var CheckboxItem = MenuCheckboxItem;
var RadioGroup = MenuRadioGroup;
var RadioItem = MenuRadioItem;
var ItemIndicator = MenuItemIndicator;
var Separator = MenuSeparator;
var Arrow2 = MenuArrow;
var SubTrigger = MenuSubTrigger;
var SubContent = MenuSubContent;
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-dropdown-menu@2.1.16_@types+react-dom@19.2.3_@types+react@19.2.14__@typ_73af8346b6b2e99f5d79f55f5dac0b34/node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs
var DROPDOWN_MENU_NAME = "DropdownMenu";
var [createDropdownMenuContext, createDropdownMenuScope] = createContextScope$1(DROPDOWN_MENU_NAME, [createMenuScope]);
var useMenuScope = createMenuScope();
var [DropdownMenuProvider, useDropdownMenuContext] = createDropdownMenuContext(DROPDOWN_MENU_NAME);
var DropdownMenu$1 = (props) => {
	const { __scopeDropdownMenu, children, dir, open: openProp, defaultOpen, onOpenChange, modal = true } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	const triggerRef = import_react.useRef(null);
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen ?? false,
		onChange: onOpenChange,
		caller: DROPDOWN_MENU_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuProvider, {
		scope: __scopeDropdownMenu,
		triggerId: useId(),
		triggerRef,
		contentId: useId(),
		open,
		onOpenChange: setOpen,
		onOpenToggle: import_react.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
		modal,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root3, {
			...menuScope,
			open,
			onOpenChange: setOpen,
			dir,
			modal,
			children
		})
	});
};
DropdownMenu$1.displayName = DROPDOWN_MENU_NAME;
var TRIGGER_NAME = "DropdownMenuTrigger";
var DropdownMenuTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, disabled = false, ...triggerProps } = props;
	const context = useDropdownMenuContext(TRIGGER_NAME, __scopeDropdownMenu);
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor2, {
		asChild: true,
		...menuScope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.button, {
			type: "button",
			id: context.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": context.open,
			"aria-controls": context.open ? context.contentId : void 0,
			"data-state": context.open ? "open" : "closed",
			"data-disabled": disabled ? "" : void 0,
			disabled,
			...triggerProps,
			ref: composeRefs(forwardedRef, context.triggerRef),
			onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
				if (!disabled && event.button === 0 && event.ctrlKey === false) {
					context.onOpenToggle();
					if (!context.open) event.preventDefault();
				}
			}),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				if (disabled) return;
				if (["Enter", " "].includes(event.key)) context.onOpenToggle();
				if (event.key === "ArrowDown") context.onOpenChange(true);
				if ([
					"Enter",
					" ",
					"ArrowDown"
				].includes(event.key)) event.preventDefault();
			})
		})
	});
});
DropdownMenuTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "DropdownMenuPortal";
var DropdownMenuPortal$1 = (props) => {
	const { __scopeDropdownMenu, ...portalProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
		...menuScope,
		...portalProps
	});
};
DropdownMenuPortal$1.displayName = PORTAL_NAME;
var CONTENT_NAME = "DropdownMenuContent";
var DropdownMenuContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...contentProps } = props;
	const context = useDropdownMenuContext(CONTENT_NAME, __scopeDropdownMenu);
	const menuScope = useMenuScope(__scopeDropdownMenu);
	const hasInteractedOutsideRef = import_react.useRef(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
		id: context.contentId,
		"aria-labelledby": context.triggerId,
		...menuScope,
		...contentProps,
		ref: forwardedRef,
		onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
			if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
			hasInteractedOutsideRef.current = false;
			event.preventDefault();
		}),
		onInteractOutside: composeEventHandlers(props.onInteractOutside, (event) => {
			const originalEvent = event.detail.originalEvent;
			const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
			const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
			if (!context.modal || isRightClick) hasInteractedOutsideRef.current = true;
		}),
		style: {
			...props.style,
			"--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
DropdownMenuContent$1.displayName = CONTENT_NAME;
var GROUP_NAME = "DropdownMenuGroup";
var DropdownMenuGroup$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...groupProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
		...menuScope,
		...groupProps,
		ref: forwardedRef
	});
});
DropdownMenuGroup$1.displayName = GROUP_NAME;
var LABEL_NAME = "DropdownMenuLabel";
var DropdownMenuLabel$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...labelProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		...menuScope,
		...labelProps,
		ref: forwardedRef
	});
});
DropdownMenuLabel$1.displayName = LABEL_NAME;
var ITEM_NAME = "DropdownMenuItem";
var DropdownMenuItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...itemProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2$1, {
		...menuScope,
		...itemProps,
		ref: forwardedRef
	});
});
DropdownMenuItem$1.displayName = ITEM_NAME;
var CHECKBOX_ITEM_NAME = "DropdownMenuCheckboxItem";
var DropdownMenuCheckboxItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...checkboxItemProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxItem, {
		...menuScope,
		...checkboxItemProps,
		ref: forwardedRef
	});
});
DropdownMenuCheckboxItem$1.displayName = CHECKBOX_ITEM_NAME;
var RADIO_GROUP_NAME = "DropdownMenuRadioGroup";
var DropdownMenuRadioGroup$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...radioGroupProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
		...menuScope,
		...radioGroupProps,
		ref: forwardedRef
	});
});
DropdownMenuRadioGroup$1.displayName = RADIO_GROUP_NAME;
var RADIO_ITEM_NAME = "DropdownMenuRadioItem";
var DropdownMenuRadioItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...radioItemProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioItem, {
		...menuScope,
		...radioItemProps,
		ref: forwardedRef
	});
});
DropdownMenuRadioItem$1.displayName = RADIO_ITEM_NAME;
var INDICATOR_NAME = "DropdownMenuItemIndicator";
var DropdownMenuItemIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...itemIndicatorProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator, {
		...menuScope,
		...itemIndicatorProps,
		ref: forwardedRef
	});
});
DropdownMenuItemIndicator.displayName = INDICATOR_NAME;
var SEPARATOR_NAME = "DropdownMenuSeparator";
var DropdownMenuSeparator$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...separatorProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
		...menuScope,
		...separatorProps,
		ref: forwardedRef
	});
});
DropdownMenuSeparator$1.displayName = SEPARATOR_NAME;
var ARROW_NAME = "DropdownMenuArrow";
var DropdownMenuArrow = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...arrowProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow2, {
		...menuScope,
		...arrowProps,
		ref: forwardedRef
	});
});
DropdownMenuArrow.displayName = ARROW_NAME;
var SUB_TRIGGER_NAME = "DropdownMenuSubTrigger";
var DropdownMenuSubTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...subTriggerProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTrigger, {
		...menuScope,
		...subTriggerProps,
		ref: forwardedRef
	});
});
DropdownMenuSubTrigger$1.displayName = SUB_TRIGGER_NAME;
var SUB_CONTENT_NAME = "DropdownMenuSubContent";
var DropdownMenuSubContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...subContentProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent, {
		...menuScope,
		...subContentProps,
		ref: forwardedRef,
		style: {
			...props.style,
			"--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
DropdownMenuSubContent$1.displayName = SUB_CONTENT_NAME;
var Root2 = DropdownMenu$1;
var Trigger = DropdownMenuTrigger$1;
var Portal2 = DropdownMenuPortal$1;
var Content2 = DropdownMenuContent$1;
var Label2 = DropdownMenuLabel$1;
var Item2 = DropdownMenuItem$1;
var CheckboxItem2 = DropdownMenuCheckboxItem$1;
var RadioItem2 = DropdownMenuRadioItem$1;
var ItemIndicator2 = DropdownMenuItemIndicator;
var Separator2 = DropdownMenuSeparator$1;
var SubTrigger2 = DropdownMenuSubTrigger$1;
var SubContent2 = DropdownMenuSubContent$1;
//#endregion
//#region src/components/ui/dropdown-menu.tsx
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	"data-uid": "src/components/ui/dropdown-menu.tsx:26:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
		"data-uid": "src/components/ui/dropdown-menu.tsx:36:5",
		"data-prohibitions": "[editContent]",
		className: "ml-auto"
	})]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	"data-uid": "src/components/ui/dropdown-menu.tsx:45:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, {
	"data-uid": "src/components/ui/dropdown-menu.tsx:60:3",
	"data-prohibitions": "[editContent]",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		"data-uid": "src/components/ui/dropdown-menu.tsx:61:5",
		"data-prohibitions": "[editContent]",
		ref,
		sideOffset,
		className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]", className),
		...props
	})
}));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	"data-uid": "src/components/ui/dropdown-menu.tsx:80:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	"data-uid": "src/components/ui/dropdown-menu.tsx:96:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	checked,
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/components/ui/dropdown-menu.tsx:105:5",
		"data-prohibitions": "[]",
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, {
			"data-uid": "src/components/ui/dropdown-menu.tsx:106:7",
			"data-prohibitions": "[]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				"data-uid": "src/components/ui/dropdown-menu.tsx:107:9",
				"data-prohibitions": "[editContent]",
				className: "h-4 w-4"
			})
		})
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	"data-uid": "src/components/ui/dropdown-menu.tsx:119:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/components/ui/dropdown-menu.tsx:127:5",
		"data-prohibitions": "[]",
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, {
			"data-uid": "src/components/ui/dropdown-menu.tsx:128:7",
			"data-prohibitions": "[]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, {
				"data-uid": "src/components/ui/dropdown-menu.tsx:129:9",
				"data-prohibitions": "[editContent]",
				className: "h-2 w-2 fill-current"
			})
		})
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	"data-uid": "src/components/ui/dropdown-menu.tsx:143:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	"data-uid": "src/components/ui/dropdown-menu.tsx:155:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/components/ui/dropdown-menu.tsx:164:10",
		"data-prohibitions": "[editContent]",
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-context@1.1.3_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-context/dist/index.mjs
function createContextScope(scopeName, createContextScopeDeps = []) {
	let defaultContexts = [];
	function createContext3(rootComponentName, defaultContext) {
		const BaseContext = import_react.createContext(defaultContext);
		BaseContext.displayName = rootComponentName + "Context";
		const index = defaultContexts.length;
		defaultContexts = [...defaultContexts, defaultContext];
		const Provider = (props) => {
			const { scope, children, ...context } = props;
			const Context = scope?.[scopeName]?.[index] || BaseContext;
			const value = import_react.useMemo(() => context, Object.values(context));
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, {
				value,
				children
			});
		};
		Provider.displayName = rootComponentName + "Provider";
		function useContext2(consumerName, scope) {
			const Context = scope?.[scopeName]?.[index] || BaseContext;
			const context = import_react.useContext(Context);
			if (context) return context;
			if (defaultContext !== void 0) return defaultContext;
			throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
		}
		return [Provider, useContext2];
	}
	const createScope = () => {
		const scopeContexts = defaultContexts.map((defaultContext) => {
			return import_react.createContext(defaultContext);
		});
		return function useScope(scope) {
			const contexts = scope?.[scopeName] || scopeContexts;
			return import_react.useMemo(() => ({ [`__scope${scopeName}`]: {
				...scope,
				[scopeName]: contexts
			} }), [scope, contexts]);
		};
	};
	createScope.scopeName = scopeName;
	return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
	const baseScope = scopes[0];
	if (scopes.length === 1) return baseScope;
	const createScope = () => {
		const scopeHooks = scopes.map((createScope2) => ({
			useScope: createScope2(),
			scopeName: createScope2.scopeName
		}));
		return function useComposedScopes(overrideScopes) {
			const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
				const currentScope = useScope(overrideScopes)[`__scope${scopeName}`];
				return {
					...nextScopes2,
					...currentScope
				};
			}, {});
			return import_react.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
		};
	};
	createScope.scopeName = baseScope.scopeName;
	return createScope;
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/use-sync-external-store@1.6.0_react@19.2.4/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
/**
* @license React
* use-sync-external-store-shim.development.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_use_sync_external_store_shim_development = /* @__PURE__ */ __commonJSMin(((exports) => {
	(function() {
		function is(x, y) {
			return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
		}
		function useSyncExternalStore$2(subscribe, getSnapshot) {
			didWarnOld18Alpha || void 0 === React.startTransition || (didWarnOld18Alpha = !0, console.error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
			var value = getSnapshot();
			if (!didWarnUncachedGetSnapshot) {
				var cachedValue = getSnapshot();
				objectIs(value, cachedValue) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), didWarnUncachedGetSnapshot = !0);
			}
			cachedValue = useState({ inst: {
				value,
				getSnapshot
			} });
			var inst = cachedValue[0].inst, forceUpdate = cachedValue[1];
			useLayoutEffect(function() {
				inst.value = value;
				inst.getSnapshot = getSnapshot;
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			}, [
				subscribe,
				value,
				getSnapshot
			]);
			useEffect(function() {
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
				return subscribe(function() {
					checkIfSnapshotChanged(inst) && forceUpdate({ inst });
				});
			}, [subscribe]);
			useDebugValue(value);
			return value;
		}
		function checkIfSnapshotChanged(inst) {
			var latestGetSnapshot = inst.getSnapshot;
			inst = inst.value;
			try {
				var nextValue = latestGetSnapshot();
				return !objectIs(inst, nextValue);
			} catch (error) {
				return !0;
			}
		}
		function useSyncExternalStore$1(subscribe, getSnapshot) {
			return getSnapshot();
		}
		"undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var React = require_react(), objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue, didWarnOld18Alpha = !1, didWarnUncachedGetSnapshot = !1, shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
		exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
		"undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
}));
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-use-is-hydrated@0.1.0_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-use-is-hydrated/dist/index.mjs
var import_shim = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_use_sync_external_store_shim_development();
})))();
function useIsHydrated() {
	return (0, import_shim.useSyncExternalStore)(subscribe, () => true, () => false);
}
function subscribe() {
	return () => {};
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-avatar@1.1.11_@types+react-dom@19.2.3_@types+react@19.2.14__@types+reac_5e99ccf265cbb36ef8e7150da8f5489e/node_modules/@radix-ui/react-avatar/dist/index.mjs
var AVATAR_NAME = "Avatar";
var [createAvatarContext, createAvatarScope] = createContextScope(AVATAR_NAME);
var [AvatarProvider, useAvatarContext] = createAvatarContext(AVATAR_NAME);
var Avatar$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAvatar, ...avatarProps } = props;
	const [imageLoadingStatus, setImageLoadingStatus] = import_react.useState("idle");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarProvider, {
		scope: __scopeAvatar,
		imageLoadingStatus,
		onImageLoadingStatusChange: setImageLoadingStatus,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
			...avatarProps,
			ref: forwardedRef
		})
	});
});
Avatar$1.displayName = AVATAR_NAME;
var IMAGE_NAME = "AvatarImage";
var AvatarImage$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAvatar, src, onLoadingStatusChange = () => {}, ...imageProps } = props;
	const context = useAvatarContext(IMAGE_NAME, __scopeAvatar);
	const imageLoadingStatus = useImageLoadingStatus(src, imageProps);
	const handleLoadingStatusChange = useCallbackRef$1((status) => {
		onLoadingStatusChange(status);
		context.onImageLoadingStatusChange(status);
	});
	useLayoutEffect2(() => {
		if (imageLoadingStatus !== "idle") handleLoadingStatusChange(imageLoadingStatus);
	}, [imageLoadingStatus, handleLoadingStatusChange]);
	return imageLoadingStatus === "loaded" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.img, {
		...imageProps,
		ref: forwardedRef,
		src
	}) : null;
});
AvatarImage$1.displayName = IMAGE_NAME;
var FALLBACK_NAME = "AvatarFallback";
var AvatarFallback$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAvatar, delayMs, ...fallbackProps } = props;
	const context = useAvatarContext(FALLBACK_NAME, __scopeAvatar);
	const [canRender, setCanRender] = import_react.useState(delayMs === void 0);
	import_react.useEffect(() => {
		if (delayMs !== void 0) {
			const timerId = window.setTimeout(() => setCanRender(true), delayMs);
			return () => window.clearTimeout(timerId);
		}
	}, [delayMs]);
	return canRender && context.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		...fallbackProps,
		ref: forwardedRef
	}) : null;
});
AvatarFallback$1.displayName = FALLBACK_NAME;
function resolveLoadingStatus(image, src) {
	if (!image) return "idle";
	if (!src) return "error";
	if (image.src !== src) image.src = src;
	return image.complete && image.naturalWidth > 0 ? "loaded" : "loading";
}
function useImageLoadingStatus(src, { referrerPolicy, crossOrigin }) {
	const isHydrated = useIsHydrated();
	const imageRef = import_react.useRef(null);
	const image = (() => {
		if (!isHydrated) return null;
		if (!imageRef.current) imageRef.current = new window.Image();
		return imageRef.current;
	})();
	const [loadingStatus, setLoadingStatus] = import_react.useState(() => resolveLoadingStatus(image, src));
	useLayoutEffect2(() => {
		setLoadingStatus(resolveLoadingStatus(image, src));
	}, [image, src]);
	useLayoutEffect2(() => {
		const updateStatus = (status) => () => {
			setLoadingStatus(status);
		};
		if (!image) return;
		const handleLoad = updateStatus("loaded");
		const handleError = updateStatus("error");
		image.addEventListener("load", handleLoad);
		image.addEventListener("error", handleError);
		if (referrerPolicy) image.referrerPolicy = referrerPolicy;
		if (typeof crossOrigin === "string") image.crossOrigin = crossOrigin;
		return () => {
			image.removeEventListener("load", handleLoad);
			image.removeEventListener("error", handleError);
		};
	}, [
		image,
		crossOrigin,
		referrerPolicy
	]);
	return loadingStatus;
}
var Root = Avatar$1;
var Image = AvatarImage$1;
var Fallback = AvatarFallback$1;
//#endregion
//#region src/components/ui/avatar.tsx
var Avatar = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	"data-uid": "src/components/ui/avatar.tsx:11:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
	...props
}));
Avatar.displayName = Root.displayName;
var AvatarImage = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
	"data-uid": "src/components/ui/avatar.tsx:23:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("aspect-square h-full w-full", className),
	...props
}));
AvatarImage.displayName = Image.displayName;
var AvatarFallback = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fallback, {
	"data-uid": "src/components/ui/avatar.tsx:35:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
	...props
}));
AvatarFallback.displayName = Fallback.displayName;
//#endregion
//#region src/components/shared/DashboardHeader.tsx
function DashboardHeader({ title, children }) {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const handleLogout = () => {
		logout();
		navigate("/login");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		"data-uid": "src/components/shared/DashboardHeader.tsx:32:5",
		"data-prohibitions": "[editContent]",
		className: "sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-background/95 px-4 md:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/shared/DashboardHeader.tsx:33:7",
			"data-prohibitions": "[editContent]",
			className: "flex items-center gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarTrigger, {
					"data-uid": "src/components/shared/DashboardHeader.tsx:34:9",
					"data-prohibitions": "[editContent]",
					className: "-ml-2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/components/shared/DashboardHeader.tsx:35:9",
					"data-prohibitions": "[editContent]",
					className: "text-lg font-semibold tracking-tight hidden md:block",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/shared/DashboardHeader.tsx:38:9",
					"data-prohibitions": "[]",
					className: "flex items-center gap-2 font-bold text-lg text-primary md:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
						"data-uid": "src/components/shared/DashboardHeader.tsx:39:11",
						"data-prohibitions": "[editContent]",
						className: "h-5 w-5"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/components/shared/DashboardHeader.tsx:40:11",
						"data-prohibitions": "[]",
						children: "Taoli"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/shared/DashboardHeader.tsx:44:7",
			"data-prohibitions": "[editContent]",
			className: "flex items-center gap-4",
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, {
				"data-uid": "src/components/shared/DashboardHeader.tsx:47:9",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					"data-uid": "src/components/shared/DashboardHeader.tsx:48:11",
					"data-prohibitions": "[editContent]",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/shared/DashboardHeader.tsx:49:13",
						"data-prohibitions": "[editContent]",
						variant: "ghost",
						size: "icon",
						className: "rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
							"data-uid": "src/components/shared/DashboardHeader.tsx:50:15",
							"data-prohibitions": "[editContent]",
							className: "h-8 w-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
								"data-uid": "src/components/shared/DashboardHeader.tsx:51:17",
								"data-prohibitions": "[editContent]",
								src: user?.avatarUrl,
								alt: user?.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
								"data-uid": "src/components/shared/DashboardHeader.tsx:52:17",
								"data-prohibitions": "[editContent]",
								children: user?.name?.substring(0, 2).toUpperCase()
							})]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					"data-uid": "src/components/shared/DashboardHeader.tsx:56:11",
					"data-prohibitions": "[editContent]",
					align: "end",
					className: "w-56",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
							"data-uid": "src/components/shared/DashboardHeader.tsx:57:13",
							"data-prohibitions": "[editContent]",
							className: "font-normal",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/shared/DashboardHeader.tsx:58:15",
								"data-prohibitions": "[editContent]",
								className: "flex flex-col space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/shared/DashboardHeader.tsx:59:17",
									"data-prohibitions": "[editContent]",
									className: "text-sm font-medium leading-none",
									children: user?.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/shared/DashboardHeader.tsx:60:17",
									"data-prohibitions": "[editContent]",
									className: "text-xs leading-none text-muted-foreground",
									children: user?.email
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {
							"data-uid": "src/components/shared/DashboardHeader.tsx:63:13",
							"data-prohibitions": "[editContent]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							"data-uid": "src/components/shared/DashboardHeader.tsx:64:13",
							"data-prohibitions": "[]",
							className: "cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
								"data-uid": "src/components/shared/DashboardHeader.tsx:65:15",
								"data-prohibitions": "[editContent]",
								className: "mr-2 h-4 w-4"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/shared/DashboardHeader.tsx:66:15",
								"data-prohibitions": "[]",
								children: "Configurações do Perfil"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {
							"data-uid": "src/components/shared/DashboardHeader.tsx:68:13",
							"data-prohibitions": "[editContent]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							"data-uid": "src/components/shared/DashboardHeader.tsx:69:13",
							"data-prohibitions": "[]",
							onClick: handleLogout,
							className: "text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
								"data-uid": "src/components/shared/DashboardHeader.tsx:73:15",
								"data-prohibitions": "[editContent]",
								className: "mr-2 h-4 w-4"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/shared/DashboardHeader.tsx:74:15",
								"data-prohibitions": "[]",
								children: "Sair"
							})]
						})
					]
				})]
			})]
		})]
	});
}
//#endregion
//#region src/components/shared/PageContent.tsx
function PageContent({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		"data-uid": "src/components/shared/PageContent.tsx:11:5",
		"data-prohibitions": "[editContent]",
		className: cn("flex flex-1 flex-col gap-4 p-4 pt-4 md:p-6 lg:p-8", className),
		children
	});
}
//#endregion
export { Arrow as $, Overlay as A, composeEventHandlers as At, Input as B, require_react_dom as Bt, SidebarMenuButton as C, Primitive$1 as Ct, Close as D, createContextScope$1 as Dt, Skeleton as E, createSlot$1 as Et, hideOthers as F, Route as Ft, CardHeader as G, CardContent as H, __commonJSMin as Ht, ReactRemoveScroll as I, Routes as It, AuthProvider as J, CardTitle as K, useFocusGuards as L, useLocation as Lt, Root$2 as M, Link as Mt, Title as N, Navigate as Nt, Content as O, require_jsx_runtime as Ot, Trigger$1 as P, Outlet as Pt, Anchor as Q, FocusScope as R, useNavigate as Rt, SidebarMenu as S, useCallbackRef$1 as St, SidebarProvider as T, createCollection as Tt, CardDescription as U, __exportAll as Ut, Card as V, require_react as Vt, CardFooter as W, __toESM as Wt, supabase as X, useAuth as Y, TooltipProvider as Z, Sidebar as _, Portal$2 as _t, AvatarImage as a, cn as at, SidebarHeader as b, DismissableLayer as bt, DropdownMenuContent as c, Sparkles as ct, DropdownMenuSeparator as d, cva as dt, Content$1 as et, DropdownMenuTrigger as f, clsx as ft, useDirection as g, Presence as gt, createRovingFocusGroupScope as h, useControllableState as ht, AvatarFallback as i, useId as it, Portal$1 as j, BrowserRouter as jt, Description as k, useComposedRefs as kt, DropdownMenuItem as l, Check as lt, Root$1 as m, VisuallyHidden as mt, DashboardHeader as n, createPopperScope as nt, createContextScope as o, X as ot, Item as p, VISUALLY_HIDDEN_STYLES as pt, Button as q, Avatar as r, useSize as rt, DropdownMenu as s, User as st, PageContent as t, Root2$1 as tt, DropdownMenuLabel as u, createLucideIcon as ut, SidebarContent as v, useLayoutEffect2 as vt, SidebarMenuItem as w, dispatchDiscreteCustomEvent as wt, SidebarInset as x, Root$6 as xt, SidebarFooter as y, Branch as yt, Primitive as z, __vitePreload as zt };

//# sourceMappingURL=PageContent-ChuXhdYa.js.map