//#region \0rolldown/runtime.js
var __create = Object.create
var __defProp = Object.defineProperty
var __getOwnPropDesc = Object.getOwnPropertyDescriptor
var __getOwnPropNames = Object.getOwnPropertyNames
var __getProtoOf = Object.getPrototypeOf
var __hasOwnProp = Object.prototype.hasOwnProperty
var __commonJSMin = (cb, mod) => () => (
  mod || cb((mod = { exports: {} }).exports, mod), mod.exports
)
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function')
    for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
      key = keys[i]
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: ((k) => from[k]).bind(null, key),
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        })
    }
  return to
}
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, 'default', {
          value: mod,
          enumerable: true,
        })
      : target,
    mod,
  )
)
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
var require_react_development = /* @__PURE__ */ __commonJSMin((exports, module) => {
  ;(function () {
    function defineDeprecationWarning(methodName, info) {
      Object.defineProperty(Component.prototype, methodName, {
        get: function () {
          console.warn(
            '%s(...) is deprecated in plain JavaScript React classes. %s',
            info[0],
            info[1],
          )
        },
      })
    }
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || 'object' !== typeof maybeIterable) return null
      maybeIterable =
        (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
        maybeIterable['@@iterator']
      return 'function' === typeof maybeIterable ? maybeIterable : null
    }
    function warnNoop(publicInstance, callerName) {
      publicInstance =
        ((publicInstance = publicInstance.constructor) &&
          (publicInstance.displayName || publicInstance.name)) ||
        'ReactClass'
      var warningKey = publicInstance + '.' + callerName
      didWarnStateUpdateForUnmountedComponent[warningKey] ||
        (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          callerName,
          publicInstance,
        ),
        (didWarnStateUpdateForUnmountedComponent[warningKey] = !0))
    }
    function Component(props, context, updater) {
      this.props = props
      this.context = context
      this.refs = emptyObject
      this.updater = updater || ReactNoopUpdateQueue
    }
    function ComponentDummy() {}
    function PureComponent(props, context, updater) {
      this.props = props
      this.context = context
      this.refs = emptyObject
      this.updater = updater || ReactNoopUpdateQueue
    }
    function noop() {}
    function testStringCoercion(value) {
      return '' + value
    }
    function checkKeyStringCoercion(value) {
      try {
        testStringCoercion(value)
        var JSCompiler_inline_result = !1
      } catch (e) {
        JSCompiler_inline_result = !0
      }
      if (JSCompiler_inline_result) {
        JSCompiler_inline_result = console
        var JSCompiler_temp_const = JSCompiler_inline_result.error
        var JSCompiler_inline_result$jscomp$0 =
          ('function' === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag]) ||
          value.constructor.name ||
          'Object'
        JSCompiler_temp_const.call(
          JSCompiler_inline_result,
          'The provided key is an unsupported type %s. This value must be coerced to a string before using it here.',
          JSCompiler_inline_result$jscomp$0,
        )
        return testStringCoercion(value)
      }
    }
    function getComponentNameFromType(type) {
      if (null == type) return null
      if ('function' === typeof type)
        return type.$$typeof === REACT_CLIENT_REFERENCE
          ? null
          : type.displayName || type.name || null
      if ('string' === typeof type) return type
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return 'Fragment'
        case REACT_PROFILER_TYPE:
          return 'Profiler'
        case REACT_STRICT_MODE_TYPE:
          return 'StrictMode'
        case REACT_SUSPENSE_TYPE:
          return 'Suspense'
        case REACT_SUSPENSE_LIST_TYPE:
          return 'SuspenseList'
        case REACT_ACTIVITY_TYPE:
          return 'Activity'
      }
      if ('object' === typeof type)
        switch (
          ('number' === typeof type.tag &&
            console.error(
              'Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.',
            ),
          type.$$typeof)
        ) {
          case REACT_PORTAL_TYPE:
            return 'Portal'
          case REACT_CONTEXT_TYPE:
            return type.displayName || 'Context'
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || 'Context') + '.Consumer'
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render
            type = type.displayName
            type ||
              ((type = innerType.displayName || innerType.name || ''),
              (type = '' !== type ? 'ForwardRef(' + type + ')' : 'ForwardRef'))
            return type
          case REACT_MEMO_TYPE:
            return (
              (innerType = type.displayName || null),
              null !== innerType ? innerType : getComponentNameFromType(type.type) || 'Memo'
            )
          case REACT_LAZY_TYPE:
            innerType = type._payload
            type = type._init
            try {
              return getComponentNameFromType(type(innerType))
            } catch (x) {}
        }
      return null
    }
    function getTaskName(type) {
      if (type === REACT_FRAGMENT_TYPE) return '<>'
      if ('object' === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
        return '<...>'
      try {
        var name = getComponentNameFromType(type)
        return name ? '<' + name + '>' : '<...>'
      } catch (x) {
        return '<...>'
      }
    }
    function getOwner() {
      var dispatcher = ReactSharedInternals.A
      return null === dispatcher ? null : dispatcher.getOwner()
    }
    function UnknownOwner() {
      return Error('react-stack-top-frame')
    }
    function hasValidKey(config) {
      if (hasOwnProperty.call(config, 'key')) {
        var getter = Object.getOwnPropertyDescriptor(config, 'key').get
        if (getter && getter.isReactWarning) return !1
      }
      return void 0 !== config.key
    }
    function defineKeyPropWarningGetter(props, displayName) {
      function warnAboutAccessingKey() {
        specialPropKeyWarningShown ||
          ((specialPropKeyWarningShown = !0),
          console.error(
            '%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)',
            displayName,
          ))
      }
      warnAboutAccessingKey.isReactWarning = !0
      Object.defineProperty(props, 'key', {
        get: warnAboutAccessingKey,
        configurable: !0,
      })
    }
    function elementRefGetterWithDeprecationWarning() {
      var componentName = getComponentNameFromType(this.type)
      didWarnAboutElementRef[componentName] ||
        ((didWarnAboutElementRef[componentName] = !0),
        console.error(
          'Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.',
        ))
      componentName = this.props.ref
      return void 0 !== componentName ? componentName : null
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
      var refProp = props.ref
      type = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        props,
        _owner: owner,
      }
      null !== (void 0 !== refProp ? refProp : null)
        ? Object.defineProperty(type, 'ref', {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning,
          })
        : Object.defineProperty(type, 'ref', {
            enumerable: !1,
            value: null,
          })
      type._store = {}
      Object.defineProperty(type._store, 'validated', {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0,
      })
      Object.defineProperty(type, '_debugInfo', {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null,
      })
      Object.defineProperty(type, '_debugStack', {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: debugStack,
      })
      Object.defineProperty(type, '_debugTask', {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: debugTask,
      })
      Object.freeze && (Object.freeze(type.props), Object.freeze(type))
      return type
    }
    function cloneAndReplaceKey(oldElement, newKey) {
      newKey = ReactElement(
        oldElement.type,
        newKey,
        oldElement.props,
        oldElement._owner,
        oldElement._debugStack,
        oldElement._debugTask,
      )
      oldElement._store && (newKey._store.validated = oldElement._store.validated)
      return newKey
    }
    function validateChildKeys(node) {
      isValidElement(node)
        ? node._store && (node._store.validated = 1)
        : 'object' === typeof node &&
          null !== node &&
          node.$$typeof === REACT_LAZY_TYPE &&
          ('fulfilled' === node._payload.status
            ? isValidElement(node._payload.value) &&
              node._payload.value._store &&
              (node._payload.value._store.validated = 1)
            : node._store && (node._store.validated = 1))
    }
    function isValidElement(object) {
      return 'object' === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE
    }
    function escape(key) {
      var escaperLookup = {
        '=': '=0',
        ':': '=2',
      }
      return (
        '$' +
        key.replace(/[=:]/g, function (match) {
          return escaperLookup[match]
        })
      )
    }
    function getElementKey(element, index) {
      return 'object' === typeof element && null !== element && null != element.key
        ? (checkKeyStringCoercion(element.key), escape('' + element.key))
        : index.toString(36)
    }
    function resolveThenable(thenable) {
      switch (thenable.status) {
        case 'fulfilled':
          return thenable.value
        case 'rejected':
          throw thenable.reason
        default:
          switch (
            ('string' === typeof thenable.status
              ? thenable.then(noop, noop)
              : ((thenable.status = 'pending'),
                thenable.then(
                  function (fulfilledValue) {
                    'pending' === thenable.status &&
                      ((thenable.status = 'fulfilled'), (thenable.value = fulfilledValue))
                  },
                  function (error) {
                    'pending' === thenable.status &&
                      ((thenable.status = 'rejected'), (thenable.reason = error))
                  },
                )),
            thenable.status)
          ) {
            case 'fulfilled':
              return thenable.value
            case 'rejected':
              throw thenable.reason
          }
      }
      throw thenable
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
      var type = typeof children
      if ('undefined' === type || 'boolean' === type) children = null
      var invokeCallback = !1
      if (null === children) invokeCallback = !0
      else
        switch (type) {
          case 'bigint':
          case 'string':
          case 'number':
            invokeCallback = !0
            break
          case 'object':
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = !0
                break
              case REACT_LAZY_TYPE:
                return (
                  (invokeCallback = children._init),
                  mapIntoArray(
                    invokeCallback(children._payload),
                    array,
                    escapedPrefix,
                    nameSoFar,
                    callback,
                  )
                )
            }
        }
      if (invokeCallback) {
        invokeCallback = children
        callback = callback(invokeCallback)
        var childKey = '' === nameSoFar ? '.' + getElementKey(invokeCallback, 0) : nameSoFar
        isArrayImpl(callback)
          ? ((escapedPrefix = ''),
            null != childKey &&
              (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, '$&/') + '/'),
            mapIntoArray(callback, array, escapedPrefix, '', function (c) {
              return c
            }))
          : null != callback &&
            (isValidElement(callback) &&
              (null != callback.key &&
                ((invokeCallback && invokeCallback.key === callback.key) ||
                  checkKeyStringCoercion(callback.key)),
              (escapedPrefix = cloneAndReplaceKey(
                callback,
                escapedPrefix +
                  (null == callback.key || (invokeCallback && invokeCallback.key === callback.key)
                    ? ''
                    : ('' + callback.key).replace(userProvidedKeyEscapeRegex, '$&/') + '/') +
                  childKey,
              )),
              '' !== nameSoFar &&
                null != invokeCallback &&
                isValidElement(invokeCallback) &&
                null == invokeCallback.key &&
                invokeCallback._store &&
                !invokeCallback._store.validated &&
                (escapedPrefix._store.validated = 2),
              (callback = escapedPrefix)),
            array.push(callback))
        return 1
      }
      invokeCallback = 0
      childKey = '' === nameSoFar ? '.' : nameSoFar + ':'
      if (isArrayImpl(children))
        for (var i = 0; i < children.length; i++)
          ((nameSoFar = children[i]),
            (type = childKey + getElementKey(nameSoFar, i)),
            (invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback)))
      else if (((i = getIteratorFn(children)), 'function' === typeof i))
        for (
          i === children.entries &&
            (didWarnAboutMaps ||
              console.warn(
                'Using Maps as children is not supported. Use an array of keyed ReactElements instead.',
              ),
            (didWarnAboutMaps = !0)),
            children = i.call(children),
            i = 0;
          !(nameSoFar = children.next()).done;
        )
          ((nameSoFar = nameSoFar.value),
            (type = childKey + getElementKey(nameSoFar, i++)),
            (invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback)))
      else if ('object' === type) {
        if ('function' === typeof children.then)
          return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback)
        array = String(children)
        throw Error(
          'Objects are not valid as a React child (found: ' +
            ('[object Object]' === array
              ? 'object with keys {' + Object.keys(children).join(', ') + '}'
              : array) +
            '). If you meant to render a collection of children, use an array instead.',
        )
      }
      return invokeCallback
    }
    function mapChildren(children, func, context) {
      if (null == children) return children
      var result = [],
        count = 0
      mapIntoArray(children, result, '', '', function (child) {
        return func.call(context, child, count++)
      })
      return result
    }
    function lazyInitializer(payload) {
      if (-1 === payload._status) {
        var ioInfo = payload._ioInfo
        null != ioInfo && (ioInfo.start = ioInfo.end = performance.now())
        ioInfo = payload._result
        var thenable = ioInfo()
        thenable.then(
          function (moduleObject) {
            if (0 === payload._status || -1 === payload._status) {
              payload._status = 1
              payload._result = moduleObject
              var _ioInfo = payload._ioInfo
              null != _ioInfo && (_ioInfo.end = performance.now())
              void 0 === thenable.status &&
                ((thenable.status = 'fulfilled'), (thenable.value = moduleObject))
            }
          },
          function (error) {
            if (0 === payload._status || -1 === payload._status) {
              payload._status = 2
              payload._result = error
              var _ioInfo2 = payload._ioInfo
              null != _ioInfo2 && (_ioInfo2.end = performance.now())
              void 0 === thenable.status &&
                ((thenable.status = 'rejected'), (thenable.reason = error))
            }
          },
        )
        ioInfo = payload._ioInfo
        if (null != ioInfo) {
          ioInfo.value = thenable
          var displayName = thenable.displayName
          'string' === typeof displayName && (ioInfo.name = displayName)
        }
        ;-1 === payload._status && ((payload._status = 0), (payload._result = thenable))
      }
      if (1 === payload._status)
        return (
          (ioInfo = payload._result),
          void 0 === ioInfo &&
            console.error(
              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
              ioInfo,
            ),
          'default' in ioInfo ||
            console.error(
              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
              ioInfo,
            ),
          ioInfo.default
        )
      throw payload._result
    }
    function resolveDispatcher() {
      var dispatcher = ReactSharedInternals.H
      null === dispatcher &&
        console.error(
          'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.',
        )
      return dispatcher
    }
    function releaseAsyncTransition() {
      ReactSharedInternals.asyncTransitions--
    }
    function enqueueTask(task) {
      if (null === enqueueTaskImpl)
        try {
          var requireString = ('require' + Math.random()).slice(0, 7)
          enqueueTaskImpl = (module && module[requireString]).call(module, 'timers').setImmediate
        } catch (_err) {
          enqueueTaskImpl = function (callback) {
            !1 === didWarnAboutMessageChannel &&
              ((didWarnAboutMessageChannel = !0),
              'undefined' === typeof MessageChannel &&
                console.error(
                  'This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.',
                ))
            var channel = new MessageChannel()
            channel.port1.onmessage = callback
            channel.port2.postMessage(void 0)
          }
        }
      return enqueueTaskImpl(task)
    }
    function aggregateErrors(errors) {
      return 1 < errors.length && 'function' === typeof AggregateError
        ? new AggregateError(errors)
        : errors[0]
    }
    function popActScope(prevActQueue, prevActScopeDepth) {
      prevActScopeDepth !== actScopeDepth - 1 &&
        console.error(
          'You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ',
        )
      actScopeDepth = prevActScopeDepth
    }
    function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
      var queue = ReactSharedInternals.actQueue
      if (null !== queue)
        if (0 !== queue.length)
          try {
            flushActQueue(queue)
            enqueueTask(function () {
              return recursivelyFlushAsyncActWork(returnValue, resolve, reject)
            })
            return
          } catch (error) {
            ReactSharedInternals.thrownErrors.push(error)
          }
        else ReactSharedInternals.actQueue = null
      0 < ReactSharedInternals.thrownErrors.length
        ? ((queue = aggregateErrors(ReactSharedInternals.thrownErrors)),
          (ReactSharedInternals.thrownErrors.length = 0),
          reject(queue))
        : resolve(returnValue)
    }
    function flushActQueue(queue) {
      if (!isFlushing) {
        isFlushing = !0
        var i = 0
        try {
          for (; i < queue.length; i++) {
            var callback = queue[i]
            do {
              ReactSharedInternals.didUsePromise = !1
              var continuation = callback(!1)
              if (null !== continuation) {
                if (ReactSharedInternals.didUsePromise) {
                  queue[i] = callback
                  queue.splice(0, i)
                  return
                }
                callback = continuation
              } else break
            } while (1)
          }
          queue.length = 0
        } catch (error) {
          ;(queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error))
        } finally {
          isFlushing = !1
        }
      }
    }
    'undefined' !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      'function' === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error())
    var REACT_ELEMENT_TYPE = Symbol.for('react.transitional.element'),
      REACT_PORTAL_TYPE = Symbol.for('react.portal'),
      REACT_FRAGMENT_TYPE = Symbol.for('react.fragment'),
      REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode'),
      REACT_PROFILER_TYPE = Symbol.for('react.profiler'),
      REACT_CONSUMER_TYPE = Symbol.for('react.consumer'),
      REACT_CONTEXT_TYPE = Symbol.for('react.context'),
      REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref'),
      REACT_SUSPENSE_TYPE = Symbol.for('react.suspense'),
      REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list'),
      REACT_MEMO_TYPE = Symbol.for('react.memo'),
      REACT_LAZY_TYPE = Symbol.for('react.lazy'),
      REACT_ACTIVITY_TYPE = Symbol.for('react.activity'),
      MAYBE_ITERATOR_SYMBOL = Symbol.iterator,
      didWarnStateUpdateForUnmountedComponent = {},
      ReactNoopUpdateQueue = {
        isMounted: function () {
          return !1
        },
        enqueueForceUpdate: function (publicInstance) {
          warnNoop(publicInstance, 'forceUpdate')
        },
        enqueueReplaceState: function (publicInstance) {
          warnNoop(publicInstance, 'replaceState')
        },
        enqueueSetState: function (publicInstance) {
          warnNoop(publicInstance, 'setState')
        },
      },
      assign = Object.assign,
      emptyObject = {}
    Object.freeze(emptyObject)
    Component.prototype.isReactComponent = {}
    Component.prototype.setState = function (partialState, callback) {
      if (
        'object' !== typeof partialState &&
        'function' !== typeof partialState &&
        null != partialState
      )
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.',
        )
      this.updater.enqueueSetState(this, partialState, callback, 'setState')
    }
    Component.prototype.forceUpdate = function (callback) {
      this.updater.enqueueForceUpdate(this, callback, 'forceUpdate')
    }
    var deprecatedAPIs = {
      isMounted: [
        'isMounted',
        'Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks.',
      ],
      replaceState: [
        'replaceState',
        'Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236).',
      ],
    }
    for (fnName in deprecatedAPIs)
      deprecatedAPIs.hasOwnProperty(fnName) &&
        defineDeprecationWarning(fnName, deprecatedAPIs[fnName])
    ComponentDummy.prototype = Component.prototype
    deprecatedAPIs = PureComponent.prototype = new ComponentDummy()
    deprecatedAPIs.constructor = PureComponent
    assign(deprecatedAPIs, Component.prototype)
    deprecatedAPIs.isPureReactComponent = !0
    var isArrayImpl = Array.isArray,
      REACT_CLIENT_REFERENCE = Symbol.for('react.client.reference'),
      ReactSharedInternals = {
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
        recentlyCreatedOwnerStacks: 0,
      },
      hasOwnProperty = Object.prototype.hasOwnProperty,
      createTask = console.createTask
        ? console.createTask
        : function () {
            return null
          }
    deprecatedAPIs = {
      react_stack_bottom_frame: function (callStackForError) {
        return callStackForError()
      },
    }
    var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime
    var didWarnAboutElementRef = {}
    var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(
      deprecatedAPIs,
      UnknownOwner,
    )()
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner))
    var didWarnAboutMaps = !1,
      userProvidedKeyEscapeRegex = /\/+/g,
      reportGlobalError =
        'function' === typeof reportError
          ? reportError
          : function (error) {
              if ('object' === typeof window && 'function' === typeof window.ErrorEvent) {
                var event = new window.ErrorEvent('error', {
                  bubbles: !0,
                  cancelable: !0,
                  message:
                    'object' === typeof error && null !== error && 'string' === typeof error.message
                      ? String(error.message)
                      : String(error),
                  error,
                })
                if (!window.dispatchEvent(event)) return
              } else if ('object' === typeof process && 'function' === typeof process.emit) {
                process.emit('uncaughtException', error)
                return
              }
              console.error(error)
            },
      didWarnAboutMessageChannel = !1,
      enqueueTaskImpl = null,
      actScopeDepth = 0,
      didWarnNoAwaitAct = !1,
      isFlushing = !1,
      queueSeveralMicrotasks =
        'function' === typeof queueMicrotask
          ? function (callback) {
              queueMicrotask(function () {
                return queueMicrotask(callback)
              })
            }
          : enqueueTask
    deprecatedAPIs = Object.freeze({
      __proto__: null,
      c: function (size) {
        return resolveDispatcher().useMemoCache(size)
      },
    })
    var fnName = {
      map: mapChildren,
      forEach: function (children, forEachFunc, forEachContext) {
        mapChildren(
          children,
          function () {
            forEachFunc.apply(this, arguments)
          },
          forEachContext,
        )
      },
      count: function (children) {
        var n = 0
        mapChildren(children, function () {
          n++
        })
        return n
      },
      toArray: function (children) {
        return (
          mapChildren(children, function (child) {
            return child
          }) || []
        )
      },
      only: function (children) {
        if (!isValidElement(children))
          throw Error('React.Children.only expected to receive a single React element child.')
        return children
      },
    }
    exports.Activity = REACT_ACTIVITY_TYPE
    exports.Children = fnName
    exports.Component = Component
    exports.Fragment = REACT_FRAGMENT_TYPE
    exports.Profiler = REACT_PROFILER_TYPE
    exports.PureComponent = PureComponent
    exports.StrictMode = REACT_STRICT_MODE_TYPE
    exports.Suspense = REACT_SUSPENSE_TYPE
    exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals
    exports.__COMPILER_RUNTIME = deprecatedAPIs
    exports.act = function (callback) {
      var prevActQueue = ReactSharedInternals.actQueue,
        prevActScopeDepth = actScopeDepth
      actScopeDepth++
      var queue = (ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : []),
        didAwaitActCall = !1
      try {
        var result = callback()
      } catch (error) {
        ReactSharedInternals.thrownErrors.push(error)
      }
      if (0 < ReactSharedInternals.thrownErrors.length)
        throw (
          popActScope(prevActQueue, prevActScopeDepth),
          (callback = aggregateErrors(ReactSharedInternals.thrownErrors)),
          (ReactSharedInternals.thrownErrors.length = 0),
          callback
        )
      if (null !== result && 'object' === typeof result && 'function' === typeof result.then) {
        var thenable = result
        queueSeveralMicrotasks(function () {
          didAwaitActCall ||
            didWarnNoAwaitAct ||
            ((didWarnNoAwaitAct = !0),
            console.error(
              'You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);',
            ))
        })
        return {
          then: function (resolve, reject) {
            didAwaitActCall = !0
            thenable.then(
              function (returnValue) {
                popActScope(prevActQueue, prevActScopeDepth)
                if (0 === prevActScopeDepth) {
                  try {
                    ;(flushActQueue(queue),
                      enqueueTask(function () {
                        return recursivelyFlushAsyncActWork(returnValue, resolve, reject)
                      }))
                  } catch (error$0) {
                    ReactSharedInternals.thrownErrors.push(error$0)
                  }
                  if (0 < ReactSharedInternals.thrownErrors.length) {
                    var _thrownError = aggregateErrors(ReactSharedInternals.thrownErrors)
                    ReactSharedInternals.thrownErrors.length = 0
                    reject(_thrownError)
                  }
                } else resolve(returnValue)
              },
              function (error) {
                popActScope(prevActQueue, prevActScopeDepth)
                0 < ReactSharedInternals.thrownErrors.length
                  ? ((error = aggregateErrors(ReactSharedInternals.thrownErrors)),
                    (ReactSharedInternals.thrownErrors.length = 0),
                    reject(error))
                  : reject(error)
              },
            )
          },
        }
      }
      var returnValue$jscomp$0 = result
      popActScope(prevActQueue, prevActScopeDepth)
      0 === prevActScopeDepth &&
        (flushActQueue(queue),
        0 !== queue.length &&
          queueSeveralMicrotasks(function () {
            didAwaitActCall ||
              didWarnNoAwaitAct ||
              ((didWarnNoAwaitAct = !0),
              console.error(
                'A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)',
              ))
          }),
        (ReactSharedInternals.actQueue = null))
      if (0 < ReactSharedInternals.thrownErrors.length)
        throw (
          (callback = aggregateErrors(ReactSharedInternals.thrownErrors)),
          (ReactSharedInternals.thrownErrors.length = 0),
          callback
        )
      return {
        then: function (resolve, reject) {
          didAwaitActCall = !0
          0 === prevActScopeDepth
            ? ((ReactSharedInternals.actQueue = queue),
              enqueueTask(function () {
                return recursivelyFlushAsyncActWork(returnValue$jscomp$0, resolve, reject)
              }))
            : resolve(returnValue$jscomp$0)
        },
      }
    }
    exports.cache = function (fn) {
      return function () {
        return fn.apply(null, arguments)
      }
    }
    exports.cacheSignal = function () {
      return null
    }
    exports.captureOwnerStack = function () {
      var getCurrentStack = ReactSharedInternals.getCurrentStack
      return null === getCurrentStack ? null : getCurrentStack()
    }
    exports.cloneElement = function (element, config, children) {
      if (null === element || void 0 === element)
        throw Error('The argument must be a React element, but you passed ' + element + '.')
      var props = assign({}, element.props),
        key = element.key,
        owner = element._owner
      if (null != config) {
        var JSCompiler_inline_result
        a: {
          if (
            hasOwnProperty.call(config, 'ref') &&
            (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(config, 'ref').get) &&
            JSCompiler_inline_result.isReactWarning
          ) {
            JSCompiler_inline_result = !1
            break a
          }
          JSCompiler_inline_result = void 0 !== config.ref
        }
        JSCompiler_inline_result && (owner = getOwner())
        hasValidKey(config) && (checkKeyStringCoercion(config.key), (key = '' + config.key))
        for (propName in config)
          !hasOwnProperty.call(config, propName) ||
            'key' === propName ||
            '__self' === propName ||
            '__source' === propName ||
            ('ref' === propName && void 0 === config.ref) ||
            (props[propName] = config[propName])
      }
      var propName = arguments.length - 2
      if (1 === propName) props.children = children
      else if (1 < propName) {
        JSCompiler_inline_result = Array(propName)
        for (var i = 0; i < propName; i++) JSCompiler_inline_result[i] = arguments[i + 2]
        props.children = JSCompiler_inline_result
      }
      props = ReactElement(element.type, key, props, owner, element._debugStack, element._debugTask)
      for (key = 2; key < arguments.length; key++) validateChildKeys(arguments[key])
      return props
    }
    exports.createContext = function (defaultValue) {
      defaultValue = {
        $$typeof: REACT_CONTEXT_TYPE,
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
      }
      defaultValue.Provider = defaultValue
      defaultValue.Consumer = {
        $$typeof: REACT_CONSUMER_TYPE,
        _context: defaultValue,
      }
      defaultValue._currentRenderer = null
      defaultValue._currentRenderer2 = null
      return defaultValue
    }
    exports.createElement = function (type, config, children) {
      for (var i = 2; i < arguments.length; i++) validateChildKeys(arguments[i])
      i = {}
      var key = null
      if (null != config)
        for (propName in (didWarnAboutOldJSXRuntime ||
          !('__self' in config) ||
          'key' in config ||
          ((didWarnAboutOldJSXRuntime = !0),
          console.warn(
            'Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform',
          )),
        hasValidKey(config) && (checkKeyStringCoercion(config.key), (key = '' + config.key)),
        config))
          hasOwnProperty.call(config, propName) &&
            'key' !== propName &&
            '__self' !== propName &&
            '__source' !== propName &&
            (i[propName] = config[propName])
      var childrenLength = arguments.length - 2
      if (1 === childrenLength) i.children = children
      else if (1 < childrenLength) {
        for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)
          childArray[_i] = arguments[_i + 2]
        Object.freeze && Object.freeze(childArray)
        i.children = childArray
      }
      if (type && type.defaultProps)
        for (propName in ((childrenLength = type.defaultProps), childrenLength))
          void 0 === i[propName] && (i[propName] = childrenLength[propName])
      key &&
        defineKeyPropWarningGetter(
          i,
          'function' === typeof type ? type.displayName || type.name || 'Unknown' : type,
        )
      var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++
      return ReactElement(
        type,
        key,
        i,
        getOwner(),
        propName ? Error('react-stack-top-frame') : unknownOwnerDebugStack,
        propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask,
      )
    }
    exports.createRef = function () {
      var refObject = { current: null }
      Object.seal(refObject)
      return refObject
    }
    exports.forwardRef = function (render) {
      null != render && render.$$typeof === REACT_MEMO_TYPE
        ? console.error(
            'forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).',
          )
        : 'function' !== typeof render
          ? console.error(
              'forwardRef requires a render function but was given %s.',
              null === render ? 'null' : typeof render,
            )
          : 0 !== render.length &&
            2 !== render.length &&
            console.error(
              'forwardRef render functions accept exactly two parameters: props and ref. %s',
              1 === render.length
                ? 'Did you forget to use the ref parameter?'
                : 'Any additional parameter will be undefined.',
            )
      null != render &&
        null != render.defaultProps &&
        console.error(
          'forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?',
        )
      var elementType = {
          $$typeof: REACT_FORWARD_REF_TYPE,
          render,
        },
        ownName
      Object.defineProperty(elementType, 'displayName', {
        enumerable: !1,
        configurable: !0,
        get: function () {
          return ownName
        },
        set: function (name) {
          ownName = name
          render.name ||
            render.displayName ||
            (Object.defineProperty(render, 'name', { value: name }), (render.displayName = name))
        },
      })
      return elementType
    }
    exports.isValidElement = isValidElement
    exports.lazy = function (ctor) {
      ctor = {
        _status: -1,
        _result: ctor,
      }
      var lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _payload: ctor,
          _init: lazyInitializer,
        },
        ioInfo = {
          name: 'lazy',
          start: -1,
          end: -1,
          value: null,
          owner: null,
          debugStack: Error('react-stack-top-frame'),
          debugTask: console.createTask ? console.createTask('lazy()') : null,
        }
      ctor._ioInfo = ioInfo
      lazyType._debugInfo = [{ awaited: ioInfo }]
      return lazyType
    }
    exports.memo = function (type, compare) {
      type ??
        console.error(
          'memo: The first argument must be a component. Instead received: %s',
          null === type ? 'null' : typeof type,
        )
      compare = {
        $$typeof: REACT_MEMO_TYPE,
        type,
        compare: void 0 === compare ? null : compare,
      }
      var ownName
      Object.defineProperty(compare, 'displayName', {
        enumerable: !1,
        configurable: !0,
        get: function () {
          return ownName
        },
        set: function (name) {
          ownName = name
          type.name ||
            type.displayName ||
            (Object.defineProperty(type, 'name', { value: name }), (type.displayName = name))
        },
      })
      return compare
    }
    exports.startTransition = function (scope) {
      var prevTransition = ReactSharedInternals.T,
        currentTransition = {}
      currentTransition._updatedFibers = /* @__PURE__ */ new Set()
      ReactSharedInternals.T = currentTransition
      try {
        var returnValue = scope(),
          onStartTransitionFinish = ReactSharedInternals.S
        null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue)
        'object' === typeof returnValue &&
          null !== returnValue &&
          'function' === typeof returnValue.then &&
          (ReactSharedInternals.asyncTransitions++,
          returnValue.then(releaseAsyncTransition, releaseAsyncTransition),
          returnValue.then(noop, reportGlobalError))
      } catch (error) {
        reportGlobalError(error)
      } finally {
        ;(null === prevTransition &&
          currentTransition._updatedFibers &&
          ((scope = currentTransition._updatedFibers.size),
          currentTransition._updatedFibers.clear(),
          10 < scope &&
            console.warn(
              'Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.',
            )),
          null !== prevTransition &&
            null !== currentTransition.types &&
            (null !== prevTransition.types &&
              prevTransition.types !== currentTransition.types &&
              console.error(
                'We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React.',
              ),
            (prevTransition.types = currentTransition.types)),
          (ReactSharedInternals.T = prevTransition))
      }
    }
    exports.unstable_useCacheRefresh = function () {
      return resolveDispatcher().useCacheRefresh()
    }
    exports.use = function (usable) {
      return resolveDispatcher().use(usable)
    }
    exports.useActionState = function (action, initialState, permalink) {
      return resolveDispatcher().useActionState(action, initialState, permalink)
    }
    exports.useCallback = function (callback, deps) {
      return resolveDispatcher().useCallback(callback, deps)
    }
    exports.useContext = function (Context) {
      var dispatcher = resolveDispatcher()
      Context.$$typeof === REACT_CONSUMER_TYPE &&
        console.error(
          'Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?',
        )
      return dispatcher.useContext(Context)
    }
    exports.useDebugValue = function (value, formatterFn) {
      return resolveDispatcher().useDebugValue(value, formatterFn)
    }
    exports.useDeferredValue = function (value, initialValue) {
      return resolveDispatcher().useDeferredValue(value, initialValue)
    }
    exports.useEffect = function (create, deps) {
      create ??
        console.warn(
          'React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?',
        )
      return resolveDispatcher().useEffect(create, deps)
    }
    exports.useEffectEvent = function (callback) {
      return resolveDispatcher().useEffectEvent(callback)
    }
    exports.useId = function () {
      return resolveDispatcher().useId()
    }
    exports.useImperativeHandle = function (ref, create, deps) {
      return resolveDispatcher().useImperativeHandle(ref, create, deps)
    }
    exports.useInsertionEffect = function (create, deps) {
      create ??
        console.warn(
          'React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?',
        )
      return resolveDispatcher().useInsertionEffect(create, deps)
    }
    exports.useLayoutEffect = function (create, deps) {
      create ??
        console.warn(
          'React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?',
        )
      return resolveDispatcher().useLayoutEffect(create, deps)
    }
    exports.useMemo = function (create, deps) {
      return resolveDispatcher().useMemo(create, deps)
    }
    exports.useOptimistic = function (passthrough, reducer) {
      return resolveDispatcher().useOptimistic(passthrough, reducer)
    }
    exports.useReducer = function (reducer, initialArg, init) {
      return resolveDispatcher().useReducer(reducer, initialArg, init)
    }
    exports.useRef = function (initialValue) {
      return resolveDispatcher().useRef(initialValue)
    }
    exports.useState = function (initialState) {
      return resolveDispatcher().useState(initialState)
    }
    exports.useSyncExternalStore = function (subscribe, getSnapshot, getServerSnapshot) {
      return resolveDispatcher().useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
    }
    exports.useTransition = function () {
      return resolveDispatcher().useTransition()
    }
    exports.version = '19.2.4'
    'undefined' !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      'function' === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())
  })()
})
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react@19.2.4/node_modules/react/index.js
var require_react = /* @__PURE__ */ __commonJSMin((exports, module) => {
  module.exports = require_react_development()
})
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
var require_react_dom_development = /* @__PURE__ */ __commonJSMin((exports) => {
  ;(function () {
    function noop() {}
    function testStringCoercion(value) {
      return '' + value
    }
    function createPortal$1(children, containerInfo, implementation) {
      var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null
      try {
        testStringCoercion(key)
        var JSCompiler_inline_result = !1
      } catch (e) {
        JSCompiler_inline_result = !0
      }
      JSCompiler_inline_result &&
        (console.error(
          'The provided key is an unsupported type %s. This value must be coerced to a string before using it here.',
          ('function' === typeof Symbol && Symbol.toStringTag && key[Symbol.toStringTag]) ||
            key.constructor.name ||
            'Object',
        ),
        testStringCoercion(key))
      return {
        $$typeof: REACT_PORTAL_TYPE,
        key: null == key ? null : '' + key,
        children,
        containerInfo,
        implementation,
      }
    }
    function getCrossOriginStringAs(as, input) {
      if ('font' === as) return ''
      if ('string' === typeof input) return 'use-credentials' === input ? input : ''
    }
    function getValueDescriptorExpectingObjectForWarning(thing) {
      return null === thing
        ? '`null`'
        : void 0 === thing
          ? '`undefined`'
          : '' === thing
            ? 'an empty string'
            : 'something with type "' + typeof thing + '"'
    }
    function getValueDescriptorExpectingEnumForWarning(thing) {
      return null === thing
        ? '`null`'
        : void 0 === thing
          ? '`undefined`'
          : '' === thing
            ? 'an empty string'
            : 'string' === typeof thing
              ? JSON.stringify(thing)
              : 'number' === typeof thing
                ? '`' + thing + '`'
                : 'something with type "' + typeof thing + '"'
    }
    function resolveDispatcher() {
      var dispatcher = ReactSharedInternals.H
      null === dispatcher &&
        console.error(
          'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.',
        )
      return dispatcher
    }
    'undefined' !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      'function' === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error())
    var React = require_react(),
      Internals = {
        d: {
          f: noop,
          r: function () {
            throw Error(
              'Invalid form element. requestFormReset must be passed a form that was rendered by React.',
            )
          },
          D: noop,
          C: noop,
          L: noop,
          m: noop,
          X: noop,
          S: noop,
          M: noop,
        },
        p: 0,
        findDOMNode: null,
      },
      REACT_PORTAL_TYPE = Symbol.for('react.portal'),
      ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE
    ;('function' === typeof Map &&
      null != Map.prototype &&
      'function' === typeof Map.prototype.forEach &&
      'function' === typeof Set &&
      null != Set.prototype &&
      'function' === typeof Set.prototype.clear &&
      'function' === typeof Set.prototype.forEach) ||
      console.error(
        'React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills',
      )
    exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals
    exports.createPortal = function (children, container) {
      var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null
      if (
        !container ||
        (1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType)
      )
        throw Error('Target container is not a DOM element.')
      return createPortal$1(children, container, null, key)
    }
    exports.flushSync = function (fn) {
      var previousTransition = ReactSharedInternals.T,
        previousUpdatePriority = Internals.p
      try {
        if (((ReactSharedInternals.T = null), (Internals.p = 2), fn)) return fn()
      } finally {
        ;((ReactSharedInternals.T = previousTransition),
          (Internals.p = previousUpdatePriority),
          Internals.d.f() &&
            console.error(
              'flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.',
            ))
      }
    }
    exports.preconnect = function (href, options) {
      'string' === typeof href && href
        ? null != options && 'object' !== typeof options
          ? console.error(
              'ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.',
              getValueDescriptorExpectingEnumForWarning(options),
            )
          : null != options &&
            'string' !== typeof options.crossOrigin &&
            console.error(
              'ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.',
              getValueDescriptorExpectingObjectForWarning(options.crossOrigin),
            )
        : console.error(
            'ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.',
            getValueDescriptorExpectingObjectForWarning(href),
          )
      'string' === typeof href &&
        (options
          ? ((options = options.crossOrigin),
            (options =
              'string' === typeof options
                ? 'use-credentials' === options
                  ? options
                  : ''
                : void 0))
          : (options = null),
        Internals.d.C(href, options))
    }
    exports.prefetchDNS = function (href) {
      if ('string' !== typeof href || !href)
        console.error(
          'ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.',
          getValueDescriptorExpectingObjectForWarning(href),
        )
      else if (1 < arguments.length) {
        var options = arguments[1]
        'object' === typeof options && options.hasOwnProperty('crossOrigin')
          ? console.error(
              'ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.',
              getValueDescriptorExpectingEnumForWarning(options),
            )
          : console.error(
              'ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.',
              getValueDescriptorExpectingEnumForWarning(options),
            )
      }
      'string' === typeof href && Internals.d.D(href)
    }
    exports.preinit = function (href, options) {
      'string' === typeof href && href
        ? null == options || 'object' !== typeof options
          ? console.error(
              'ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.',
              getValueDescriptorExpectingEnumForWarning(options),
            )
          : 'style' !== options.as &&
            'script' !== options.as &&
            console.error(
              'ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".',
              getValueDescriptorExpectingEnumForWarning(options.as),
            )
        : console.error(
            'ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.',
            getValueDescriptorExpectingObjectForWarning(href),
          )
      if ('string' === typeof href && options && 'string' === typeof options.as) {
        var as = options.as,
          crossOrigin = getCrossOriginStringAs(as, options.crossOrigin),
          integrity = 'string' === typeof options.integrity ? options.integrity : void 0,
          fetchPriority = 'string' === typeof options.fetchPriority ? options.fetchPriority : void 0
        'style' === as
          ? Internals.d.S(
              href,
              'string' === typeof options.precedence ? options.precedence : void 0,
              {
                crossOrigin,
                integrity,
                fetchPriority,
              },
            )
          : 'script' === as &&
            Internals.d.X(href, {
              crossOrigin,
              integrity,
              fetchPriority,
              nonce: 'string' === typeof options.nonce ? options.nonce : void 0,
            })
      }
    }
    exports.preinitModule = function (href, options) {
      var encountered = ''
      ;('string' === typeof href && href) ||
        (encountered +=
          ' The `href` argument encountered was ' +
          getValueDescriptorExpectingObjectForWarning(href) +
          '.')
      void 0 !== options && 'object' !== typeof options
        ? (encountered +=
            ' The `options` argument encountered was ' +
            getValueDescriptorExpectingObjectForWarning(options) +
            '.')
        : options &&
          'as' in options &&
          'script' !== options.as &&
          (encountered +=
            ' The `as` option encountered was ' +
            getValueDescriptorExpectingEnumForWarning(options.as) +
            '.')
      if (encountered)
        console.error(
          'ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s',
          encountered,
        )
      else
        switch (
          ((encountered = options && 'string' === typeof options.as ? options.as : 'script'),
          encountered)
        ) {
          case 'script':
            break
          default:
            ;((encountered = getValueDescriptorExpectingEnumForWarning(encountered)),
              console.error(
                'ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)',
                encountered,
                href,
              ))
        }
      if ('string' === typeof href)
        if ('object' === typeof options && null !== options) {
          if (null == options.as || 'script' === options.as)
            ((encountered = getCrossOriginStringAs(options.as, options.crossOrigin)),
              Internals.d.M(href, {
                crossOrigin: encountered,
                integrity: 'string' === typeof options.integrity ? options.integrity : void 0,
                nonce: 'string' === typeof options.nonce ? options.nonce : void 0,
              }))
        } else options ?? Internals.d.M(href)
    }
    exports.preload = function (href, options) {
      var encountered = ''
      ;('string' === typeof href && href) ||
        (encountered +=
          ' The `href` argument encountered was ' +
          getValueDescriptorExpectingObjectForWarning(href) +
          '.')
      null == options || 'object' !== typeof options
        ? (encountered +=
            ' The `options` argument encountered was ' +
            getValueDescriptorExpectingObjectForWarning(options) +
            '.')
        : ('string' === typeof options.as && options.as) ||
          (encountered +=
            ' The `as` option encountered was ' +
            getValueDescriptorExpectingObjectForWarning(options.as) +
            '.')
      encountered &&
        console.error(
          'ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s',
          encountered,
        )
      if (
        'string' === typeof href &&
        'object' === typeof options &&
        null !== options &&
        'string' === typeof options.as
      ) {
        encountered = options.as
        var crossOrigin = getCrossOriginStringAs(encountered, options.crossOrigin)
        Internals.d.L(href, encountered, {
          crossOrigin,
          integrity: 'string' === typeof options.integrity ? options.integrity : void 0,
          nonce: 'string' === typeof options.nonce ? options.nonce : void 0,
          type: 'string' === typeof options.type ? options.type : void 0,
          fetchPriority: 'string' === typeof options.fetchPriority ? options.fetchPriority : void 0,
          referrerPolicy:
            'string' === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
          imageSrcSet: 'string' === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
          imageSizes: 'string' === typeof options.imageSizes ? options.imageSizes : void 0,
          media: 'string' === typeof options.media ? options.media : void 0,
        })
      }
    }
    exports.preloadModule = function (href, options) {
      var encountered = ''
      ;('string' === typeof href && href) ||
        (encountered +=
          ' The `href` argument encountered was ' +
          getValueDescriptorExpectingObjectForWarning(href) +
          '.')
      void 0 !== options && 'object' !== typeof options
        ? (encountered +=
            ' The `options` argument encountered was ' +
            getValueDescriptorExpectingObjectForWarning(options) +
            '.')
        : options &&
          'as' in options &&
          'string' !== typeof options.as &&
          (encountered +=
            ' The `as` option encountered was ' +
            getValueDescriptorExpectingObjectForWarning(options.as) +
            '.')
      encountered &&
        console.error(
          'ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s',
          encountered,
        )
      'string' === typeof href &&
        (options
          ? ((encountered = getCrossOriginStringAs(options.as, options.crossOrigin)),
            Internals.d.m(href, {
              as: 'string' === typeof options.as && 'script' !== options.as ? options.as : void 0,
              crossOrigin: encountered,
              integrity: 'string' === typeof options.integrity ? options.integrity : void 0,
            }))
          : Internals.d.m(href))
    }
    exports.requestFormReset = function (form) {
      Internals.d.r(form)
    }
    exports.unstable_batchedUpdates = function (fn, a) {
      return fn(a)
    }
    exports.useFormState = function (action, initialState, permalink) {
      return resolveDispatcher().useFormState(action, initialState, permalink)
    }
    exports.useFormStatus = function () {
      return resolveDispatcher().useHostTransitionStatus()
    }
    exports.version = '19.2.4'
    'undefined' !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      'function' === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())
  })()
})
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react-dom@19.2.4_react@19.2.4/node_modules/react-dom/index.js
var require_react_dom = /* @__PURE__ */ __commonJSMin((exports, module) => {
  module.exports = require_react_dom_development()
})
//#endregion
//#region \0vite/preload-helper.js
var scriptRel = 'modulepreload'
var assetsURL = function (dep) {
  return '/' + dep
}
var seen = {}
var __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve()
  if (deps && deps.length > 0) {
    const links = document.getElementsByTagName('link')
    const cspNonceMeta = document.querySelector('meta[property=csp-nonce]')
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute('nonce')
    function allSettled(promises) {
      return Promise.all(
        promises.map((p) =>
          Promise.resolve(p).then(
            (value) => ({
              status: 'fulfilled',
              value,
            }),
            (reason) => ({
              status: 'rejected',
              reason,
            }),
          ),
        ),
      )
    }
    promise = allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep, importerUrl)
        if (dep in seen) return
        seen[dep] = true
        const isCss = dep.endsWith('.css')
        const cssSelector = isCss ? '[rel="stylesheet"]' : ''
        if (!!importerUrl)
          for (let i = links.length - 1; i >= 0; i--) {
            const link = links[i]
            if (link.href === dep && (!isCss || link.rel === 'stylesheet')) return
          }
        else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return
        const link = document.createElement('link')
        link.rel = isCss ? 'stylesheet' : scriptRel
        if (!isCss) link.as = 'script'
        link.crossOrigin = ''
        link.href = dep
        if (cspNonce) link.setAttribute('nonce', cspNonce)
        document.head.appendChild(link)
        if (isCss)
          return new Promise((res, rej) => {
            link.addEventListener('load', res)
            link.addEventListener('error', () =>
              rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)),
            )
          })
      }),
    )
  }
  function handlePreloadError(err) {
    const e = new Event('vite:preloadError', { cancelable: true })
    e.payload = err
    window.dispatchEvent(e)
    if (!e.defaultPrevented) throw err
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== 'rejected') continue
      handlePreloadError(item.reason)
    }
    return baseModule().catch(handlePreloadError)
  })
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react-router@7.13.1_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1)
var PopStateEventType = 'popstate'
function isLocation(obj) {
  return (
    typeof obj === 'object' &&
    obj != null &&
    'pathname' in obj &&
    'search' in obj &&
    'hash' in obj &&
    'state' in obj &&
    'key' in obj
  )
}
function createBrowserHistory(options = {}) {
  function createBrowserLocation(window2, globalHistory) {
    let maskedLocation = globalHistory.state?.masked
    let { pathname, search, hash } = maskedLocation || window2.location
    return createLocation(
      '',
      {
        pathname,
        search,
        hash,
      },
      (globalHistory.state && globalHistory.state.usr) || null,
      (globalHistory.state && globalHistory.state.key) || 'default',
      maskedLocation
        ? {
            pathname: window2.location.pathname,
            search: window2.location.search,
            hash: window2.location.hash,
          }
        : void 0,
    )
  }
  function createBrowserHref(window2, to) {
    return typeof to === 'string' ? to : createPath(to)
  }
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options)
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === 'undefined') throw new Error(message)
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== 'undefined') console.warn(message)
    try {
      throw new Error(message)
    } catch (e) {}
  }
}
function createKey() {
  return Math.random().toString(36).substring(2, 10)
}
function getHistoryState(location, index) {
  return {
    usr: location.state,
    key: location.key,
    idx: index,
    masked: location.unstable_mask
      ? {
          pathname: location.pathname,
          search: location.search,
          hash: location.hash,
        }
      : void 0,
  }
}
function createLocation(current, to, state = null, key, unstable_mask) {
  return {
    pathname: typeof current === 'string' ? current : current.pathname,
    search: '',
    hash: '',
    ...(typeof to === 'string' ? parsePath(to) : to),
    state,
    key: (to && to.key) || key || createKey(),
    unstable_mask,
  }
}
function createPath({ pathname = '/', search = '', hash = '' }) {
  if (search && search !== '?') pathname += search.charAt(0) === '?' ? search : '?' + search
  if (hash && hash !== '#') pathname += hash.charAt(0) === '#' ? hash : '#' + hash
  return pathname
}
function parsePath(path) {
  let parsedPath = {}
  if (path) {
    let hashIndex = path.indexOf('#')
    if (hashIndex >= 0) {
      parsedPath.hash = path.substring(hashIndex)
      path = path.substring(0, hashIndex)
    }
    let searchIndex = path.indexOf('?')
    if (searchIndex >= 0) {
      parsedPath.search = path.substring(searchIndex)
      path = path.substring(0, searchIndex)
    }
    if (path) parsedPath.pathname = path
  }
  return parsedPath
}
function getUrlBasedHistory(getLocation, createHref2, validateLocation, options = {}) {
  let { window: window2 = document.defaultView, v5Compat = false } = options
  let globalHistory = window2.history
  let action = 'POP'
  let listener = null
  let index = getIndex()
  if (index == null) {
    index = 0
    globalHistory.replaceState(
      {
        ...globalHistory.state,
        idx: index,
      },
      '',
    )
  }
  function getIndex() {
    return (globalHistory.state || { idx: null }).idx
  }
  function handlePop() {
    action = 'POP'
    let nextIndex = getIndex()
    let delta = nextIndex == null ? null : nextIndex - index
    index = nextIndex
    if (listener)
      listener({
        action,
        location: history.location,
        delta,
      })
  }
  function push(to, state) {
    action = 'PUSH'
    let location = isLocation(to) ? to : createLocation(history.location, to, state)
    if (validateLocation) validateLocation(location, to)
    index = getIndex() + 1
    let historyState = getHistoryState(location, index)
    let url = history.createHref(location.unstable_mask || location)
    try {
      globalHistory.pushState(historyState, '', url)
    } catch (error) {
      if (error instanceof DOMException && error.name === 'DataCloneError') throw error
      window2.location.assign(url)
    }
    if (v5Compat && listener)
      listener({
        action,
        location: history.location,
        delta: 1,
      })
  }
  function replace2(to, state) {
    action = 'REPLACE'
    let location = isLocation(to) ? to : createLocation(history.location, to, state)
    if (validateLocation) validateLocation(location, to)
    index = getIndex()
    let historyState = getHistoryState(location, index)
    let url = history.createHref(location.unstable_mask || location)
    globalHistory.replaceState(historyState, '', url)
    if (v5Compat && listener)
      listener({
        action,
        location: history.location,
        delta: 0,
      })
  }
  function createURL(to) {
    return createBrowserURLImpl(to)
  }
  let history = {
    get action() {
      return action
    },
    get location() {
      return getLocation(window2, globalHistory)
    },
    listen(fn) {
      if (listener) throw new Error('A history only accepts one active listener')
      window2.addEventListener(PopStateEventType, handlePop)
      listener = fn
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop)
        listener = null
      }
    },
    createHref(to) {
      return createHref2(window2, to)
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to)
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
      }
    },
    push,
    replace: replace2,
    go(n) {
      return globalHistory.go(n)
    },
  }
  return history
}
function createBrowserURLImpl(to, isAbsolute = false) {
  let base = 'http://localhost'
  if (typeof window !== 'undefined')
    base = window.location.origin !== 'null' ? window.location.origin : window.location.href
  invariant(base, 'No window.location.(origin|href) available to create URL')
  let href = typeof to === 'string' ? to : createPath(to)
  href = href.replace(/ $/, '%20')
  if (!isAbsolute && href.startsWith('//')) href = base + href
  return new URL(href, base)
}
function matchRoutes(routes, locationArg, basename = '/') {
  return matchRoutesImpl(routes, locationArg, basename, false)
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
  let pathname = stripBasename(
    (typeof locationArg === 'string' ? parsePath(locationArg) : locationArg).pathname || '/',
    basename,
  )
  if (pathname == null) return null
  let branches = flattenRoutes(routes)
  rankRouteBranches(branches)
  let matches = null
  for (let i = 0; matches == null && i < branches.length; ++i) {
    let decoded = decodePath(pathname)
    matches = matchRouteBranch(branches[i], decoded, allowPartial)
  }
  return matches
}
function convertRouteMatchToUiMatch(match, loaderData) {
  let { route, pathname, params } = match
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    loaderData: loaderData[route.id],
    handle: route.handle,
  }
}
function flattenRoutes(
  routes,
  branches = [],
  parentsMeta = [],
  parentPath = '',
  _hasParentOptionalSegments = false,
) {
  let flattenRoute = (
    route,
    index,
    hasParentOptionalSegments = _hasParentOptionalSegments,
    relativePath,
  ) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || '' : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route,
    }
    if (meta.relativePath.startsWith('/')) {
      if (!meta.relativePath.startsWith(parentPath) && hasParentOptionalSegments) return
      invariant(
        meta.relativePath.startsWith(parentPath),
        `Absolute route path "${meta.relativePath}" nested under path "${parentPath}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      )
      meta.relativePath = meta.relativePath.slice(parentPath.length)
    }
    let path = joinPaths([parentPath, meta.relativePath])
    let routesMeta = parentsMeta.concat(meta)
    if (route.children && route.children.length > 0) {
      invariant(
        route.index !== true,
        `Index routes must not have child routes. Please remove all child routes from route path "${path}".`,
      )
      flattenRoutes(route.children, branches, routesMeta, path, hasParentOptionalSegments)
    }
    if (route.path == null && !route.index) return
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta,
    })
  }
  routes.forEach((route, index) => {
    if (route.path === '' || !route.path?.includes('?')) flattenRoute(route, index)
    else
      for (let exploded of explodeOptionalSegments(route.path))
        flattenRoute(route, index, true, exploded)
  })
  return branches
}
function explodeOptionalSegments(path) {
  let segments = path.split('/')
  if (segments.length === 0) return []
  let [first, ...rest] = segments
  let isOptional = first.endsWith('?')
  let required = first.replace(/\?$/, '')
  if (rest.length === 0) return isOptional ? [required, ''] : [required]
  let restExploded = explodeOptionalSegments(rest.join('/'))
  let result = []
  result.push(
    ...restExploded.map((subpath) => (subpath === '' ? required : [required, subpath].join('/'))),
  )
  if (isOptional) result.push(...restExploded)
  return result.map((exploded) => (path.startsWith('/') && exploded === '' ? '/' : exploded))
}
function rankRouteBranches(branches) {
  branches.sort((a, b) =>
    a.score !== b.score
      ? b.score - a.score
      : compareIndexes(
          a.routesMeta.map((meta) => meta.childrenIndex),
          b.routesMeta.map((meta) => meta.childrenIndex),
        ),
  )
}
var paramRe = /^:[\w-]+$/
var dynamicSegmentValue = 3
var indexRouteValue = 2
var emptySegmentValue = 1
var staticSegmentValue = 10
var splatPenalty = -2
var isSplat = (s) => s === '*'
function computeScore(path, index) {
  let segments = path.split('/')
  let initialScore = segments.length
  if (segments.some(isSplat)) initialScore += splatPenalty
  if (index) initialScore += indexRouteValue
  return segments
    .filter((s) => !isSplat(s))
    .reduce(
      (score, segment) =>
        score +
        (paramRe.test(segment)
          ? dynamicSegmentValue
          : segment === ''
            ? emptySegmentValue
            : staticSegmentValue),
      initialScore,
    )
}
function compareIndexes(a, b) {
  return a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i])
    ? a[a.length - 1] - b[b.length - 1]
    : 0
}
function matchRouteBranch(branch, pathname, allowPartial = false) {
  let { routesMeta } = branch
  let matchedParams = {}
  let matchedPathname = '/'
  let matches = []
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i]
    let end = i === routesMeta.length - 1
    let remainingPathname =
      matchedPathname === '/' ? pathname : pathname.slice(matchedPathname.length) || '/'
    let match = matchPath(
      {
        path: meta.relativePath,
        caseSensitive: meta.caseSensitive,
        end,
      },
      remainingPathname,
    )
    let route = meta.route
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index)
      match = matchPath(
        {
          path: meta.relativePath,
          caseSensitive: meta.caseSensitive,
          end: false,
        },
        remainingPathname,
      )
    if (!match) return null
    Object.assign(matchedParams, match.params)
    matches.push({
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route,
    })
    if (match.pathnameBase !== '/')
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase])
  }
  return matches
}
function matchPath(pattern, pathname) {
  if (typeof pattern === 'string')
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true,
    }
  let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end)
  let match = pathname.match(matcher)
  if (!match) return null
  let matchedPathname = match[0]
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, '$1')
  let captureGroups = match.slice(1)
  return {
    params: compiledParams.reduce((memo2, { paramName, isOptional }, index) => {
      if (paramName === '*') {
        let splatValue = captureGroups[index] || ''
        pathnameBase = matchedPathname
          .slice(0, matchedPathname.length - splatValue.length)
          .replace(/(.)\/+$/, '$1')
      }
      const value = captureGroups[index]
      if (isOptional && !value) memo2[paramName] = void 0
      else memo2[paramName] = (value || '').replace(/%2F/g, '/')
      return memo2
    }, {}),
    pathname: matchedPathname,
    pathnameBase,
    pattern,
  }
}
function compilePath(path, caseSensitive = false, end = true) {
  warning(
    path === '*' || !path.endsWith('*') || path.endsWith('/*'),
    `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, '/*')}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, '/*')}".`,
  )
  let params = []
  let regexpSource =
    '^' +
    path
      .replace(/\/*\*?$/, '')
      .replace(/^\/*/, '/')
      .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
      .replace(/\/:([\w-]+)(\?)?/g, (match, paramName, isOptional, index, str) => {
        params.push({
          paramName,
          isOptional: isOptional != null,
        })
        if (isOptional) {
          let nextChar = str.charAt(index + match.length)
          if (nextChar && nextChar !== '/') return '/([^\\/]*)'
          return '(?:/([^\\/]*))?'
        }
        return '/([^\\/]+)'
      })
      .replace(/\/([\w-]+)\?(\/|$)/g, '(/$1)?$2')
  if (path.endsWith('*')) {
    params.push({ paramName: '*' })
    regexpSource += path === '*' || path === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'
  } else if (end) regexpSource += '\\/*$'
  else if (path !== '' && path !== '/') regexpSource += '(?:(?=\\/|$))'
  return [new RegExp(regexpSource, caseSensitive ? void 0 : 'i'), params]
}
function decodePath(value) {
  try {
    return value
      .split('/')
      .map((v) => decodeURIComponent(v).replace(/\//g, '%2F'))
      .join('/')
  } catch (error) {
    warning(
      false,
      `The URL path "${value}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${error}).`,
    )
    return value
  }
}
function stripBasename(pathname, basename) {
  if (basename === '/') return pathname
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) return null
  let startIndex = basename.endsWith('/') ? basename.length - 1 : basename.length
  let nextChar = pathname.charAt(startIndex)
  if (nextChar && nextChar !== '/') return null
  return pathname.slice(startIndex) || '/'
}
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
function resolvePath(to, fromPathname = '/') {
  let { pathname: toPathname, search = '', hash = '' } = typeof to === 'string' ? parsePath(to) : to
  let pathname
  if (toPathname) {
    toPathname = toPathname.replace(/\/\/+/g, '/')
    if (toPathname.startsWith('/')) pathname = resolvePathname(toPathname.substring(1), '/')
    else pathname = resolvePathname(toPathname, fromPathname)
  } else pathname = fromPathname
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash),
  }
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, '').split('/')
  relativePath.split('/').forEach((segment) => {
    if (segment === '..') {
      if (segments.length > 1) segments.pop()
    } else if (segment !== '.') segments.push(segment)
  })
  return segments.length > 1 ? segments.join('/') : '/'
}
function getInvalidPathError(char, field, dest, path) {
  return `Cannot include a '${char}' character in a manually specified \`to.${field}\` field [${JSON.stringify(path)}].  Please separate it out to the \`to.${dest}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`
}
function getPathContributingMatches(matches) {
  return matches.filter(
    (match, index) => index === 0 || (match.route.path && match.route.path.length > 0),
  )
}
function getResolveToMatches(matches) {
  let pathMatches = getPathContributingMatches(matches)
  return pathMatches.map((match, idx) =>
    idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase,
  )
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative = false) {
  let to
  if (typeof toArg === 'string') to = parsePath(toArg)
  else {
    to = { ...toArg }
    invariant(
      !to.pathname || !to.pathname.includes('?'),
      getInvalidPathError('?', 'pathname', 'search', to),
    )
    invariant(
      !to.pathname || !to.pathname.includes('#'),
      getInvalidPathError('#', 'pathname', 'hash', to),
    )
    invariant(
      !to.search || !to.search.includes('#'),
      getInvalidPathError('#', 'search', 'hash', to),
    )
  }
  let isEmptyPath = toArg === '' || to.pathname === ''
  let toPathname = isEmptyPath ? '/' : to.pathname
  let from
  if (toPathname == null) from = locationPathname
  else {
    let routePathnameIndex = routePathnames.length - 1
    if (!isPathRelative && toPathname.startsWith('..')) {
      let toSegments = toPathname.split('/')
      while (toSegments[0] === '..') {
        toSegments.shift()
        routePathnameIndex -= 1
      }
      to.pathname = toSegments.join('/')
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : '/'
  }
  let path = resolvePath(to, from)
  let hasExplicitTrailingSlash = toPathname && toPathname !== '/' && toPathname.endsWith('/')
  let hasCurrentTrailingSlash =
    (isEmptyPath || toPathname === '.') && locationPathname.endsWith('/')
  if (!path.pathname.endsWith('/') && (hasExplicitTrailingSlash || hasCurrentTrailingSlash))
    path.pathname += '/'
  return path
}
var joinPaths = (paths) => paths.join('/').replace(/\/\/+/g, '/')
var normalizePathname = (pathname) => pathname.replace(/\/+$/, '').replace(/^\/*/, '/')
var normalizeSearch = (search) =>
  !search || search === '?' ? '' : search.startsWith('?') ? search : '?' + search
var normalizeHash = (hash) =>
  !hash || hash === '#' ? '' : hash.startsWith('#') ? hash : '#' + hash
var ErrorResponseImpl = class {
  constructor(status, statusText, data2, internal = false) {
    this.status = status
    this.statusText = statusText || ''
    this.internal = internal
    if (data2 instanceof Error) {
      this.data = data2.toString()
      this.error = data2
    } else this.data = data2
  }
}
function isRouteErrorResponse(error) {
  return (
    error != null &&
    typeof error.status === 'number' &&
    typeof error.statusText === 'string' &&
    typeof error.internal === 'boolean' &&
    'data' in error
  )
}
function getRoutePattern(matches) {
  return (
    matches
      .map((m) => m.route.path)
      .filter(Boolean)
      .join('/')
      .replace(/\/\/*/g, '/') || '/'
  )
}
var isBrowser =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
function parseToInfo(_to, basename) {
  let to = _to
  if (typeof to !== 'string' || !ABSOLUTE_URL_REGEX.test(to))
    return {
      absoluteURL: void 0,
      isExternal: false,
      to,
    }
  let absoluteURL = to
  let isExternal = false
  if (isBrowser)
    try {
      let currentUrl = new URL(window.location.href)
      let targetUrl = to.startsWith('//') ? new URL(currentUrl.protocol + to) : new URL(to)
      let path = stripBasename(targetUrl.pathname, basename)
      if (targetUrl.origin === currentUrl.origin && path != null)
        to = path + targetUrl.search + targetUrl.hash
      else isExternal = true
    } catch (e) {
      warning(
        false,
        `<Link to="${to}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
      )
    }
  return {
    absoluteURL,
    isExternal,
    to,
  }
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0')
var DataRouterContext = import_react.createContext(null)
DataRouterContext.displayName = 'DataRouter'
var DataRouterStateContext = import_react.createContext(null)
DataRouterStateContext.displayName = 'DataRouterState'
var RSCRouterContext = import_react.createContext(false)
var ViewTransitionContext = import_react.createContext({ isTransitioning: false })
ViewTransitionContext.displayName = 'ViewTransition'
var FetchersContext = import_react.createContext(/* @__PURE__ */ new Map())
FetchersContext.displayName = 'Fetchers'
var AwaitContext = import_react.createContext(null)
AwaitContext.displayName = 'Await'
var NavigationContext = import_react.createContext(null)
NavigationContext.displayName = 'Navigation'
var LocationContext = import_react.createContext(null)
LocationContext.displayName = 'Location'
var RouteContext = import_react.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false,
})
RouteContext.displayName = 'Route'
var RouteErrorContext = import_react.createContext(null)
RouteErrorContext.displayName = 'RouteError'
var ERROR_DIGEST_BASE = 'REACT_ROUTER_ERROR'
var ERROR_DIGEST_REDIRECT = 'REDIRECT'
var ERROR_DIGEST_ROUTE_ERROR_RESPONSE = 'ROUTE_ERROR_RESPONSE'
function decodeRedirectErrorDigest(digest) {
  if (digest.startsWith(`${ERROR_DIGEST_BASE}:${ERROR_DIGEST_REDIRECT}:{`))
    try {
      let parsed = JSON.parse(digest.slice(28))
      if (
        typeof parsed === 'object' &&
        parsed &&
        typeof parsed.status === 'number' &&
        typeof parsed.statusText === 'string' &&
        typeof parsed.location === 'string' &&
        typeof parsed.reloadDocument === 'boolean' &&
        typeof parsed.replace === 'boolean'
      )
        return parsed
    } catch {}
}
function decodeRouteErrorResponseDigest(digest) {
  if (digest.startsWith(`${ERROR_DIGEST_BASE}:${ERROR_DIGEST_ROUTE_ERROR_RESPONSE}:{`))
    try {
      let parsed = JSON.parse(digest.slice(40))
      if (
        typeof parsed === 'object' &&
        parsed &&
        typeof parsed.status === 'number' &&
        typeof parsed.statusText === 'string'
      )
        return new ErrorResponseImpl(parsed.status, parsed.statusText, parsed.data)
    } catch {}
}
function useHref(to, { relative } = {}) {
  invariant(
    useInRouterContext(),
    `useHref() may be used only in the context of a <Router> component.`,
  )
  let { basename, navigator } = import_react.useContext(NavigationContext)
  let { hash, pathname, search } = useResolvedPath(to, { relative })
  let joinedPathname = pathname
  if (basename !== '/')
    joinedPathname = pathname === '/' ? basename : joinPaths([basename, pathname])
  return navigator.createHref({
    pathname: joinedPathname,
    search,
    hash,
  })
}
function useInRouterContext() {
  return import_react.useContext(LocationContext) != null
}
function useLocation() {
  invariant(
    useInRouterContext(),
    `useLocation() may be used only in the context of a <Router> component.`,
  )
  return import_react.useContext(LocationContext).location
}
var navigateEffectWarning = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`
function useIsomorphicLayoutEffect(cb) {
  if (!import_react.useContext(NavigationContext).static) import_react.useLayoutEffect(cb)
}
function useNavigate() {
  let { isDataRoute } = import_react.useContext(RouteContext)
  return isDataRoute ? useNavigateStable() : useNavigateUnstable()
}
function useNavigateUnstable() {
  invariant(
    useInRouterContext(),
    `useNavigate() may be used only in the context of a <Router> component.`,
  )
  let dataRouterContext = import_react.useContext(DataRouterContext)
  let { basename, navigator } = import_react.useContext(NavigationContext)
  let { matches } = import_react.useContext(RouteContext)
  let { pathname: locationPathname } = useLocation()
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches))
  let activeRef = import_react.useRef(false)
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true
  })
  return import_react.useCallback(
    (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning)
      if (!activeRef.current) return
      if (typeof to === 'number') {
        navigator.go(to)
        return
      }
      let path = resolveTo(
        to,
        JSON.parse(routePathnamesJson),
        locationPathname,
        options.relative === 'path',
      )
      if (dataRouterContext == null && basename !== '/')
        path.pathname = path.pathname === '/' ? basename : joinPaths([basename, path.pathname])
      ;(!!options.replace ? navigator.replace : navigator.push)(path, options.state, options)
    },
    [basename, navigator, routePathnamesJson, locationPathname, dataRouterContext],
  )
}
var OutletContext = import_react.createContext(null)
function useOutlet(context) {
  let outlet = import_react.useContext(RouteContext).outlet
  return import_react.useMemo(
    () =>
      outlet &&
      /* @__PURE__ */ import_react.createElement(
        OutletContext.Provider,
        { value: context },
        outlet,
      ),
    [outlet, context],
  )
}
function useResolvedPath(to, { relative } = {}) {
  let { matches } = import_react.useContext(RouteContext)
  let { pathname: locationPathname } = useLocation()
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches))
  return import_react.useMemo(
    () => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === 'path'),
    [to, routePathnamesJson, locationPathname, relative],
  )
}
function useRoutes(routes, locationArg) {
  return useRoutesImpl(routes, locationArg)
}
function useRoutesImpl(routes, locationArg, dataRouterOpts) {
  invariant(
    useInRouterContext(),
    `useRoutes() may be used only in the context of a <Router> component.`,
  )
  let { navigator } = import_react.useContext(NavigationContext)
  let { matches: parentMatches } = import_react.useContext(RouteContext)
  let routeMatch = parentMatches[parentMatches.length - 1]
  let parentParams = routeMatch ? routeMatch.params : {}
  let parentPathname = routeMatch ? routeMatch.pathname : '/'
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : '/'
  let parentRoute = routeMatch && routeMatch.route
  {
    let parentPath = (parentRoute && parentRoute.path) || ''
    warningOnce(
      parentPathname,
      !parentRoute || parentPath.endsWith('*') || parentPath.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${parentPathname}" (under <Route path="${parentPath}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${parentPath}"> to <Route path="${parentPath === '/' ? '*' : `${parentPath}/*`}">.`,
    )
  }
  let locationFromContext = useLocation()
  let location
  if (locationArg) {
    let parsedLocationArg = typeof locationArg === 'string' ? parsePath(locationArg) : locationArg
    invariant(
      parentPathnameBase === '/' || parsedLocationArg.pathname?.startsWith(parentPathnameBase),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${parentPathnameBase}" but pathname "${parsedLocationArg.pathname}" was given in the \`location\` prop.`,
    )
    location = parsedLocationArg
  } else location = locationFromContext
  let pathname = location.pathname || '/'
  let remainingPathname = pathname
  if (parentPathnameBase !== '/') {
    let parentSegments = parentPathnameBase.replace(/^\//, '').split('/')
    remainingPathname =
      '/' + pathname.replace(/^\//, '').split('/').slice(parentSegments.length).join('/')
  }
  let matches = matchRoutes(routes, { pathname: remainingPathname })
  warning(
    parentRoute || matches != null,
    `No routes matched location "${location.pathname}${location.search}${location.hash}" `,
  )
  warning(
    matches == null ||
      matches[matches.length - 1].route.element !== void 0 ||
      matches[matches.length - 1].route.Component !== void 0 ||
      matches[matches.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${location.pathname}${location.search}${location.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
  )
  let renderedMatches = _renderMatches(
    matches &&
      matches.map((match) =>
        Object.assign({}, match, {
          params: Object.assign({}, parentParams, match.params),
          pathname: joinPaths([
            parentPathnameBase,
            navigator.encodeLocation
              ? navigator.encodeLocation(match.pathname.replace(/\?/g, '%3F').replace(/#/g, '%23'))
                  .pathname
              : match.pathname,
          ]),
          pathnameBase:
            match.pathnameBase === '/'
              ? parentPathnameBase
              : joinPaths([
                  parentPathnameBase,
                  navigator.encodeLocation
                    ? navigator.encodeLocation(
                        match.pathnameBase.replace(/\?/g, '%3F').replace(/#/g, '%23'),
                      ).pathname
                    : match.pathnameBase,
                ]),
        }),
      ),
    parentMatches,
    dataRouterOpts,
  )
  if (locationArg && renderedMatches)
    return /* @__PURE__ */ import_react.createElement(
      LocationContext.Provider,
      {
        value: {
          location: {
            pathname: '/',
            search: '',
            hash: '',
            state: null,
            key: 'default',
            unstable_mask: void 0,
            ...location,
          },
          navigationType: 'POP',
        },
      },
      renderedMatches,
    )
  return renderedMatches
}
function DefaultErrorComponent() {
  let error = useRouteError()
  let message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : JSON.stringify(error)
  let stack = error instanceof Error ? error.stack : null
  let lightgrey = 'rgba(200,200,200, 0.5)'
  let preStyles = {
    padding: '0.5rem',
    backgroundColor: lightgrey,
  }
  let codeStyles = {
    padding: '2px 4px',
    backgroundColor: lightgrey,
  }
  let devInfo = null
  console.error('Error handled by React Router default ErrorBoundary:', error)
  devInfo = /* @__PURE__ */ import_react.createElement(
    import_react.Fragment,
    null,
    /* @__PURE__ */ import_react.createElement('p', null, '💿 Hey developer 👋'),
    /* @__PURE__ */ import_react.createElement(
      'p',
      null,
      'You can provide a way better UX than this when your app throws errors by providing your own ',
      /* @__PURE__ */ import_react.createElement('code', { style: codeStyles }, 'ErrorBoundary'),
      ' or',
      ' ',
      /* @__PURE__ */ import_react.createElement('code', { style: codeStyles }, 'errorElement'),
      ' prop on your route.',
    ),
  )
  return /* @__PURE__ */ import_react.createElement(
    import_react.Fragment,
    null,
    /* @__PURE__ */ import_react.createElement('h2', null, 'Unexpected Application Error!'),
    /* @__PURE__ */ import_react.createElement('h3', { style: { fontStyle: 'italic' } }, message),
    stack ? /* @__PURE__ */ import_react.createElement('pre', { style: preStyles }, stack) : null,
    devInfo,
  )
}
var defaultErrorElement = /* @__PURE__ */ import_react.createElement(DefaultErrorComponent, null)
var RenderErrorBoundary = class extends import_react.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error,
    }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  static getDerivedStateFromProps(props, state) {
    if (
      state.location !== props.location ||
      (state.revalidation !== 'idle' && props.revalidation === 'idle')
    )
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation,
      }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation,
    }
  }
  componentDidCatch(error, errorInfo) {
    if (this.props.onError) this.props.onError(error, errorInfo)
    else console.error('React Router caught the following error during render', error)
  }
  render() {
    let error = this.state.error
    if (
      this.context &&
      typeof error === 'object' &&
      error &&
      'digest' in error &&
      typeof error.digest === 'string'
    ) {
      const decoded = decodeRouteErrorResponseDigest(error.digest)
      if (decoded) error = decoded
    }
    let result =
      error !== void 0
        ? /* @__PURE__ */ import_react.createElement(
            RouteContext.Provider,
            { value: this.props.routeContext },
            /* @__PURE__ */ import_react.createElement(RouteErrorContext.Provider, {
              value: error,
              children: this.props.component,
            }),
          )
        : this.props.children
    if (this.context)
      return /* @__PURE__ */ import_react.createElement(RSCErrorHandler, { error }, result)
    return result
  }
}
RenderErrorBoundary.contextType = RSCRouterContext
var errorRedirectHandledMap = /* @__PURE__ */ new WeakMap()
function RSCErrorHandler({ children, error }) {
  let { basename } = import_react.useContext(NavigationContext)
  if (typeof error === 'object' && error && 'digest' in error && typeof error.digest === 'string') {
    let redirect2 = decodeRedirectErrorDigest(error.digest)
    if (redirect2) {
      let existingRedirect = errorRedirectHandledMap.get(error)
      if (existingRedirect) throw existingRedirect
      let parsed = parseToInfo(redirect2.location, basename)
      if (isBrowser && !errorRedirectHandledMap.get(error))
        if (parsed.isExternal || redirect2.reloadDocument)
          window.location.href = parsed.absoluteURL || parsed.to
        else {
          const redirectPromise = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(parsed.to, { replace: redirect2.replace }),
          )
          errorRedirectHandledMap.set(error, redirectPromise)
          throw redirectPromise
        }
      return /* @__PURE__ */ import_react.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${parsed.absoluteURL || parsed.to}`,
      })
    }
  }
  return children
}
function RenderedRoute({ routeContext, match, children }) {
  let dataRouterContext = import_react.useContext(DataRouterContext)
  if (
    dataRouterContext &&
    dataRouterContext.static &&
    dataRouterContext.staticContext &&
    (match.route.errorElement || match.route.ErrorBoundary)
  )
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id
  return /* @__PURE__ */ import_react.createElement(
    RouteContext.Provider,
    { value: routeContext },
    children,
  )
}
function _renderMatches(matches, parentMatches = [], dataRouterOpts) {
  let dataRouterState = dataRouterOpts?.state
  if (matches == null) {
    if (!dataRouterState) return null
    if (dataRouterState.errors) matches = dataRouterState.matches
    else if (
      parentMatches.length === 0 &&
      !dataRouterState.initialized &&
      dataRouterState.matches.length > 0
    )
      matches = dataRouterState.matches
    else return null
  }
  let renderedMatches = matches
  let errors = dataRouterState?.errors
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex((m) => m.route.id && errors?.[m.route.id] !== void 0)
    invariant(
      errorIndex >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(errors).join(',')}`,
    )
    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1))
  }
  let renderFallback = false
  let fallbackIndex = -1
  if (dataRouterOpts && dataRouterState) {
    renderFallback = dataRouterState.renderFallback
    for (let i = 0; i < renderedMatches.length; i++) {
      let match = renderedMatches[i]
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) fallbackIndex = i
      if (match.route.id) {
        let { loaderData, errors: errors2 } = dataRouterState
        let needsToRunLoader =
          match.route.loader &&
          !loaderData.hasOwnProperty(match.route.id) &&
          (!errors2 || errors2[match.route.id] === void 0)
        if (match.route.lazy || needsToRunLoader) {
          if (dataRouterOpts.isStatic) renderFallback = true
          if (fallbackIndex >= 0) renderedMatches = renderedMatches.slice(0, fallbackIndex + 1)
          else renderedMatches = [renderedMatches[0]]
          break
        }
      }
    }
  }
  let onErrorHandler = dataRouterOpts?.onError
  let onError =
    dataRouterState && onErrorHandler
      ? (error, errorInfo) => {
          onErrorHandler(error, {
            location: dataRouterState.location,
            params: dataRouterState.matches?.[0]?.params ?? {},
            unstable_pattern: getRoutePattern(dataRouterState.matches),
            errorInfo,
          })
        }
      : void 0
  return renderedMatches.reduceRight((outlet, match, index) => {
    let error
    let shouldRenderHydrateFallback = false
    let errorElement = null
    let hydrateFallbackElement = null
    if (dataRouterState) {
      error = errors && match.route.id ? errors[match.route.id] : void 0
      errorElement = match.route.errorElement || defaultErrorElement
      if (renderFallback) {
        if (fallbackIndex < 0 && index === 0) {
          warningOnce(
            'route-fallback',
            false,
            'No `HydrateFallback` element provided to render during initial hydration',
          )
          shouldRenderHydrateFallback = true
          hydrateFallbackElement = null
        } else if (fallbackIndex === index) {
          shouldRenderHydrateFallback = true
          hydrateFallbackElement = match.route.hydrateFallbackElement || null
        }
      }
    }
    let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1))
    let getChildren = () => {
      let children
      if (error) children = errorElement
      else if (shouldRenderHydrateFallback) children = hydrateFallbackElement
      else if (match.route.Component)
        children = /* @__PURE__ */ import_react.createElement(match.route.Component, null)
      else if (match.route.element) children = match.route.element
      else children = outlet
      return /* @__PURE__ */ import_react.createElement(RenderedRoute, {
        match,
        routeContext: {
          outlet,
          matches: matches2,
          isDataRoute: dataRouterState != null,
        },
        children,
      })
    }
    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0)
      ? /* @__PURE__ */ import_react.createElement(RenderErrorBoundary, {
          location: dataRouterState.location,
          revalidation: dataRouterState.revalidation,
          component: errorElement,
          error,
          children: getChildren(),
          routeContext: {
            outlet: null,
            matches: matches2,
            isDataRoute: true,
          },
          onError,
        })
      : getChildren()
  }, null)
}
function getDataRouterConsoleError(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}
function useDataRouterContext(hookName) {
  let ctx = import_react.useContext(DataRouterContext)
  invariant(ctx, getDataRouterConsoleError(hookName))
  return ctx
}
function useDataRouterState(hookName) {
  let state = import_react.useContext(DataRouterStateContext)
  invariant(state, getDataRouterConsoleError(hookName))
  return state
}
function useRouteContext(hookName) {
  let route = import_react.useContext(RouteContext)
  invariant(route, getDataRouterConsoleError(hookName))
  return route
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName)
  let thisRoute = route.matches[route.matches.length - 1]
  invariant(thisRoute.route.id, `${hookName} can only be used on routes that contain a unique "id"`)
  return thisRoute.route.id
}
function useRouteId() {
  return useCurrentRouteId('useRouteId')
}
function useNavigation() {
  return useDataRouterState('useNavigation').navigation
}
function useMatches() {
  let { matches, loaderData } = useDataRouterState('useMatches')
  return import_react.useMemo(
    () => matches.map((m) => convertRouteMatchToUiMatch(m, loaderData)),
    [matches, loaderData],
  )
}
function useRouteError() {
  let error = import_react.useContext(RouteErrorContext)
  let state = useDataRouterState('useRouteError')
  let routeId = useCurrentRouteId('useRouteError')
  if (error !== void 0) return error
  return state.errors?.[routeId]
}
function useNavigateStable() {
  let { router } = useDataRouterContext('useNavigate')
  let id = useCurrentRouteId('useNavigate')
  let activeRef = import_react.useRef(false)
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true
  })
  return import_react.useCallback(
    async (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning)
      if (!activeRef.current) return
      if (typeof to === 'number') await router.navigate(to)
      else
        await router.navigate(to, {
          fromRouteId: id,
          ...options,
        })
    },
    [router, id],
  )
}
var alreadyWarned = {}
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true
    warning(false, message)
  }
}
import_react.useOptimistic
import_react.memo(DataRoutes)
function DataRoutes({ routes, future, state, isStatic, onError }) {
  return useRoutesImpl(routes, void 0, {
    state,
    isStatic,
    onError,
    future,
  })
}
function Navigate({ to, replace: replace2, state, relative }) {
  invariant(
    useInRouterContext(),
    `<Navigate> may be used only in the context of a <Router> component.`,
  )
  let { static: isStatic } = import_react.useContext(NavigationContext)
  warning(
    !isStatic,
    `<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`,
  )
  let { matches } = import_react.useContext(RouteContext)
  let { pathname: locationPathname } = useLocation()
  let navigate = useNavigate()
  let path = resolveTo(to, getResolveToMatches(matches), locationPathname, relative === 'path')
  let jsonPath = JSON.stringify(path)
  import_react.useEffect(() => {
    navigate(JSON.parse(jsonPath), {
      replace: replace2,
      state,
      relative,
    })
  }, [navigate, jsonPath, relative, replace2, state])
  return null
}
function Outlet(props) {
  return useOutlet(props.context)
}
function Route(props) {
  invariant(
    false,
    `A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`,
  )
}
function Router({
  basename: basenameProp = '/',
  children = null,
  location: locationProp,
  navigationType = 'POP',
  navigator,
  static: staticProp = false,
  unstable_useTransitions,
}) {
  invariant(
    !useInRouterContext(),
    `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`,
  )
  let basename = basenameProp.replace(/^\/*/, '/')
  let navigationContext = import_react.useMemo(
    () => ({
      basename,
      navigator,
      static: staticProp,
      unstable_useTransitions,
      future: {},
    }),
    [basename, navigator, staticProp, unstable_useTransitions],
  )
  if (typeof locationProp === 'string') locationProp = parsePath(locationProp)
  let {
    pathname = '/',
    search = '',
    hash = '',
    state = null,
    key = 'default',
    unstable_mask,
  } = locationProp
  let locationContext = import_react.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename)
    if (trailingPathname == null) return null
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key,
        unstable_mask,
      },
      navigationType,
    }
  }, [basename, pathname, search, hash, state, key, navigationType, unstable_mask])
  warning(
    locationContext != null,
    `<Router basename="${basename}"> is not able to match the URL "${pathname}${search}${hash}" because it does not start with the basename, so the <Router> won't render anything.`,
  )
  if (locationContext == null) return null
  return /* @__PURE__ */ import_react.createElement(
    NavigationContext.Provider,
    { value: navigationContext },
    /* @__PURE__ */ import_react.createElement(LocationContext.Provider, {
      children,
      value: locationContext,
    }),
  )
}
function Routes({ children, location }) {
  return useRoutes(createRoutesFromChildren(children), location)
}
function createRoutesFromChildren(children, parentPath = []) {
  let routes = []
  import_react.Children.forEach(children, (element, index) => {
    if (!import_react.isValidElement(element)) return
    let treePath = [...parentPath, index]
    if (element.type === import_react.Fragment) {
      routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath))
      return
    }
    invariant(
      element.type === Route,
      `[${typeof element.type === 'string' ? element.type : element.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
    )
    invariant(
      !element.props.index || !element.props.children,
      'An index route cannot have child routes.',
    )
    let route = {
      id: element.props.id || treePath.join('-'),
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
      hasErrorBoundary:
        element.props.hasErrorBoundary === true ||
        element.props.ErrorBoundary != null ||
        element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy,
    }
    if (element.props.children)
      route.children = createRoutesFromChildren(element.props.children, treePath)
    routes.push(route)
  })
  return routes
}
var defaultMethod = 'get'
var defaultEncType = 'application/x-www-form-urlencoded'
function isHtmlElement(object) {
  return typeof HTMLElement !== 'undefined' && object instanceof HTMLElement
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === 'button'
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === 'form'
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === 'input'
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && (!target || target === '_self') && !isModifiedEvent(event)
}
var _formDataSupportsSubmitter = null
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null)
    try {
      new FormData(document.createElement('form'), 0)
      _formDataSupportsSubmitter = false
    } catch (e) {
      _formDataSupportsSubmitter = true
    }
  return _formDataSupportsSubmitter
}
var supportedFormEncTypes = /* @__PURE__ */ new Set([
  'application/x-www-form-urlencoded',
  'multipart/form-data',
  'text/plain',
])
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
    warning(
      false,
      `"${encType}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${defaultEncType}"`,
    )
    return null
  }
  return encType
}
function getFormSubmissionInfo(target, basename) {
  let method
  let action
  let encType
  let formData
  let body
  if (isFormElement(target)) {
    let attr = target.getAttribute('action')
    action = attr ? stripBasename(attr, basename) : null
    method = target.getAttribute('method') || defaultMethod
    encType = getFormEncType(target.getAttribute('enctype')) || defaultEncType
    formData = new FormData(target)
  } else if (
    isButtonElement(target) ||
    (isInputElement(target) && (target.type === 'submit' || target.type === 'image'))
  ) {
    let form = target.form
    if (form == null)
      throw new Error(`Cannot submit a <button> or <input type="submit"> without a <form>`)
    let attr = target.getAttribute('formaction') || form.getAttribute('action')
    action = attr ? stripBasename(attr, basename) : null
    method = target.getAttribute('formmethod') || form.getAttribute('method') || defaultMethod
    encType =
      getFormEncType(target.getAttribute('formenctype')) ||
      getFormEncType(form.getAttribute('enctype')) ||
      defaultEncType
    formData = new FormData(form, target)
    if (!isFormDataSubmitterSupported()) {
      let { name, type, value } = target
      if (type === 'image') {
        let prefix = name ? `${name}.` : ''
        formData.append(`${prefix}x`, '0')
        formData.append(`${prefix}y`, '0')
      } else if (name) formData.append(name, value)
    }
  } else if (isHtmlElement(target))
    throw new Error(
      `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`,
    )
  else {
    method = defaultMethod
    action = null
    encType = defaultEncType
    body = target
  }
  if (formData && encType === 'text/plain') {
    body = formData
    formData = void 0
  }
  return {
    action,
    method: method.toLowerCase(),
    encType,
    formData,
    body,
  }
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0')
var ESCAPE_LOOKUP = {
  '&': '\\u0026',
  '>': '\\u003e',
  '<': '\\u003c',
  '\u2028': '\\u2028',
  '\u2029': '\\u2029',
}
var ESCAPE_REGEX = /[&><\u2028\u2029]/g
function escapeHtml(html) {
  return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match])
}
function invariant2(value, message) {
  if (value === false || value === null || typeof value === 'undefined') throw new Error(message)
}
function singleFetchUrl(reqUrl, basename, trailingSlashAware, extension) {
  let url =
    typeof reqUrl === 'string'
      ? new URL(
          reqUrl,
          typeof window === 'undefined' ? 'server://singlefetch/' : window.location.origin,
        )
      : reqUrl
  if (trailingSlashAware)
    if (url.pathname.endsWith('/')) url.pathname = `${url.pathname}_.${extension}`
    else url.pathname = `${url.pathname}.${extension}`
  else if (url.pathname === '/') url.pathname = `_root.${extension}`
  else if (basename && stripBasename(url.pathname, basename) === '/')
    url.pathname = `${basename.replace(/\/$/, '')}/_root.${extension}`
  else url.pathname = `${url.pathname.replace(/\/$/, '')}.${extension}`
  return url
}
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache) return routeModulesCache[route.id]
  try {
    let routeModule = await __vitePreload(
      () =>
        import(
          /* @vite-ignore */
          /* webpackIgnore: true */
          route.module
        ),
      [],
    )
    routeModulesCache[route.id] = routeModule
    return routeModule
  } catch (error) {
    console.error(`Error loading route module \`${route.module}\`, reloading page...`)
    console.error(error)
    if (window.__reactRouterContext && window.__reactRouterContext.isSpaMode && void 0);
    window.location.reload()
    return new Promise(() => {})
  }
}
function isPageLinkDescriptor(object) {
  return object != null && typeof object.page === 'string'
}
function isHtmlLinkDescriptor(object) {
  if (object == null) return false
  if (object.href == null)
    return (
      object.rel === 'preload' &&
      typeof object.imageSrcSet === 'string' &&
      typeof object.imageSizes === 'string'
    )
  return typeof object.rel === 'string' && typeof object.href === 'string'
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
  return dedupeLinkDescriptors(
    (
      await Promise.all(
        matches.map(async (match) => {
          let route = manifest.routes[match.route.id]
          if (route) {
            let mod = await loadRouteModule(route, routeModules)
            return mod.links ? mod.links() : []
          }
          return []
        }),
      )
    )
      .flat(1)
      .filter(isHtmlLinkDescriptor)
      .filter((link) => link.rel === 'stylesheet' || link.rel === 'preload')
      .map((link) =>
        link.rel === 'stylesheet'
          ? {
              ...link,
              rel: 'prefetch',
              as: 'style',
            }
          : {
              ...link,
              rel: 'prefetch',
            },
      ),
  )
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode) {
  let isNew = (match, index) => {
    if (!currentMatches[index]) return true
    return match.route.id !== currentMatches[index].route.id
  }
  let matchPathChanged = (match, index) => {
    return (
      currentMatches[index].pathname !== match.pathname ||
      (currentMatches[index].route.path?.endsWith('*') &&
        currentMatches[index].params['*'] !== match.params['*'])
    )
  }
  if (mode === 'assets')
    return nextMatches.filter(
      (match, index) => isNew(match, index) || matchPathChanged(match, index),
    )
  if (mode === 'data')
    return nextMatches.filter((match, index) => {
      let manifestRoute = manifest.routes[match.route.id]
      if (!manifestRoute || !manifestRoute.hasLoader) return false
      if (isNew(match, index) || matchPathChanged(match, index)) return true
      if (match.route.shouldRevalidate) {
        let routeChoice = match.route.shouldRevalidate({
          currentUrl: new URL(location.pathname + location.search + location.hash, window.origin),
          currentParams: currentMatches[0]?.params || {},
          nextUrl: new URL(page, window.origin),
          nextParams: match.params,
          defaultShouldRevalidate: true,
        })
        if (typeof routeChoice === 'boolean') return routeChoice
      }
      return true
    })
  return []
}
function getModuleLinkHrefs(matches, manifest, { includeHydrateFallback } = {}) {
  return dedupeHrefs(
    matches
      .map((match) => {
        let route = manifest.routes[match.route.id]
        if (!route) return []
        let hrefs = [route.module]
        if (route.clientActionModule) hrefs = hrefs.concat(route.clientActionModule)
        if (route.clientLoaderModule) hrefs = hrefs.concat(route.clientLoaderModule)
        if (includeHydrateFallback && route.hydrateFallbackModule)
          hrefs = hrefs.concat(route.hydrateFallbackModule)
        if (route.imports) hrefs = hrefs.concat(route.imports)
        return hrefs
      })
      .flat(1),
  )
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)]
}
function sortKeys(obj) {
  let sorted = {}
  let keys = Object.keys(obj).sort()
  for (let key of keys) sorted[key] = obj[key]
  return sorted
}
function dedupeLinkDescriptors(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set()
  let preloadsSet = new Set(preloads)
  return descriptors.reduce((deduped, descriptor) => {
    if (
      preloads &&
      !isPageLinkDescriptor(descriptor) &&
      descriptor.as === 'script' &&
      descriptor.href &&
      preloadsSet.has(descriptor.href)
    )
      return deduped
    let key = JSON.stringify(sortKeys(descriptor))
    if (!set.has(key)) {
      set.add(key)
      deduped.push({
        key,
        link: descriptor,
      })
    }
    return deduped
  }, [])
}
function useDataRouterContext2() {
  let context = import_react.useContext(DataRouterContext)
  invariant2(context, 'You must render this element inside a <DataRouterContext.Provider> element')
  return context
}
function useDataRouterStateContext() {
  let context = import_react.useContext(DataRouterStateContext)
  invariant2(
    context,
    'You must render this element inside a <DataRouterStateContext.Provider> element',
  )
  return context
}
var FrameworkContext = import_react.createContext(void 0)
FrameworkContext.displayName = 'FrameworkContext'
function useFrameworkContext() {
  let context = import_react.useContext(FrameworkContext)
  invariant2(context, 'You must render this element inside a <HydratedRouter> element')
  return context
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let frameworkContext = import_react.useContext(FrameworkContext)
  let [maybePrefetch, setMaybePrefetch] = import_react.useState(false)
  let [shouldPrefetch, setShouldPrefetch] = import_react.useState(false)
  let { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } = theirElementProps
  let ref = import_react.useRef(null)
  import_react.useEffect(() => {
    if (prefetch === 'render') setShouldPrefetch(true)
    if (prefetch === 'viewport') {
      let callback = (entries) => {
        entries.forEach((entry) => {
          setShouldPrefetch(entry.isIntersecting)
        })
      }
      let observer = new IntersectionObserver(callback, { threshold: 0.5 })
      if (ref.current) observer.observe(ref.current)
      return () => {
        observer.disconnect()
      }
    }
  }, [prefetch])
  import_react.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(true)
      }, 100)
      return () => {
        clearTimeout(id)
      }
    }
  }, [maybePrefetch])
  let setIntent = () => {
    setMaybePrefetch(true)
  }
  let cancelIntent = () => {
    setMaybePrefetch(false)
    setShouldPrefetch(false)
  }
  if (!frameworkContext) return [false, ref, {}]
  if (prefetch !== 'intent') return [shouldPrefetch, ref, {}]
  return [
    shouldPrefetch,
    ref,
    {
      onFocus: composeEventHandlers$1(onFocus, setIntent),
      onBlur: composeEventHandlers$1(onBlur, cancelIntent),
      onMouseEnter: composeEventHandlers$1(onMouseEnter, setIntent),
      onMouseLeave: composeEventHandlers$1(onMouseLeave, cancelIntent),
      onTouchStart: composeEventHandlers$1(onTouchStart, setIntent),
    },
  ]
}
function composeEventHandlers$1(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event)
    if (!event.defaultPrevented) ourHandler(event)
  }
}
function PrefetchPageLinks({ page, ...linkProps }) {
  let { router } = useDataRouterContext2()
  let matches = import_react.useMemo(
    () => matchRoutes(router.routes, page, router.basename),
    [router.routes, page, router.basename],
  )
  if (!matches) return null
  return /* @__PURE__ */ import_react.createElement(PrefetchPageLinksImpl, {
    page,
    matches,
    ...linkProps,
  })
}
function useKeyedPrefetchLinks(matches) {
  let { manifest, routeModules } = useFrameworkContext()
  let [keyedPrefetchLinks, setKeyedPrefetchLinks] = import_react.useState([])
  import_react.useEffect(() => {
    let interrupted = false
    getKeyedPrefetchLinks(matches, manifest, routeModules).then((links) => {
      if (!interrupted) setKeyedPrefetchLinks(links)
    })
    return () => {
      interrupted = true
    }
  }, [matches, manifest, routeModules])
  return keyedPrefetchLinks
}
function PrefetchPageLinksImpl({ page, matches: nextMatches, ...linkProps }) {
  let location = useLocation()
  let { future, manifest, routeModules } = useFrameworkContext()
  let { basename } = useDataRouterContext2()
  let { loaderData, matches } = useDataRouterStateContext()
  let newMatchesForData = import_react.useMemo(
    () => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, 'data'),
    [page, nextMatches, matches, manifest, location],
  )
  let newMatchesForAssets = import_react.useMemo(
    () => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, 'assets'),
    [page, nextMatches, matches, manifest, location],
  )
  let dataHrefs = import_react.useMemo(() => {
    if (page === location.pathname + location.search + location.hash) return []
    let routesParams = /* @__PURE__ */ new Set()
    let foundOptOutRoute = false
    nextMatches.forEach((m) => {
      let manifestRoute = manifest.routes[m.route.id]
      if (!manifestRoute || !manifestRoute.hasLoader) return
      if (
        !newMatchesForData.some((m2) => m2.route.id === m.route.id) &&
        m.route.id in loaderData &&
        routeModules[m.route.id]?.shouldRevalidate
      )
        foundOptOutRoute = true
      else if (manifestRoute.hasClientLoader) foundOptOutRoute = true
      else routesParams.add(m.route.id)
    })
    if (routesParams.size === 0) return []
    let url = singleFetchUrl(page, basename, future.unstable_trailingSlashAwareDataRequests, 'data')
    if (foundOptOutRoute && routesParams.size > 0)
      url.searchParams.set(
        '_routes',
        nextMatches
          .filter((m) => routesParams.has(m.route.id))
          .map((m) => m.route.id)
          .join(','),
      )
    return [url.pathname + url.search]
  }, [
    basename,
    future.unstable_trailingSlashAwareDataRequests,
    loaderData,
    location,
    manifest,
    newMatchesForData,
    nextMatches,
    page,
    routeModules,
  ])
  let moduleHrefs = import_react.useMemo(
    () => getModuleLinkHrefs(newMatchesForAssets, manifest),
    [newMatchesForAssets, manifest],
  )
  let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets)
  return /* @__PURE__ */ import_react.createElement(
    import_react.Fragment,
    null,
    dataHrefs.map((href) =>
      /* @__PURE__ */ import_react.createElement('link', {
        key: href,
        rel: 'prefetch',
        as: 'fetch',
        href,
        ...linkProps,
      }),
    ),
    moduleHrefs.map((href) =>
      /* @__PURE__ */ import_react.createElement('link', {
        key: href,
        rel: 'modulepreload',
        href,
        ...linkProps,
      }),
    ),
    keyedPrefetchLinks.map(({ key, link }) =>
      /* @__PURE__ */ import_react.createElement('link', {
        key,
        nonce: linkProps.nonce,
        ...link,
        crossOrigin: link.crossOrigin ?? linkProps.crossOrigin,
      }),
    ),
  )
}
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') ref(value)
      else if (ref != null) ref.current = value
    })
  }
}
var isBrowser2 =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
try {
  if (isBrowser2) window.__reactRouterVersion = '7.13.1'
} catch (e) {}
function BrowserRouter({ basename, children, unstable_useTransitions, window: window2 }) {
  let historyRef = import_react.useRef()
  if (historyRef.current == null)
    historyRef.current = createBrowserHistory({
      window: window2,
      v5Compat: true,
    })
  let history = historyRef.current
  let [state, setStateImpl] = import_react.useState({
    action: history.action,
    location: history.location,
  })
  let setState = import_react.useCallback(
    (newState) => {
      if (unstable_useTransitions === false) setStateImpl(newState)
      else import_react.startTransition(() => setStateImpl(newState))
    },
    [unstable_useTransitions],
  )
  import_react.useLayoutEffect(() => history.listen(setState), [history, setState])
  return /* @__PURE__ */ import_react.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
    unstable_useTransitions,
  })
}
function HistoryRouter({ basename, children, history, unstable_useTransitions }) {
  let [state, setStateImpl] = import_react.useState({
    action: history.action,
    location: history.location,
  })
  let setState = import_react.useCallback(
    (newState) => {
      if (unstable_useTransitions === false) setStateImpl(newState)
      else import_react.startTransition(() => setStateImpl(newState))
    },
    [unstable_useTransitions],
  )
  import_react.useLayoutEffect(() => history.listen(setState), [history, setState])
  return /* @__PURE__ */ import_react.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
    unstable_useTransitions,
  })
}
HistoryRouter.displayName = 'unstable_HistoryRouter'
var ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
var Link = import_react.forwardRef(function LinkWithRef(
  {
    onClick,
    discover = 'render',
    prefetch = 'none',
    relative,
    reloadDocument,
    replace: replace2,
    unstable_mask,
    state,
    target,
    to,
    preventScrollReset,
    viewTransition,
    unstable_defaultShouldRevalidate,
    ...rest
  },
  forwardedRef,
) {
  let { basename, navigator, unstable_useTransitions } = import_react.useContext(NavigationContext)
  let isAbsolute = typeof to === 'string' && ABSOLUTE_URL_REGEX2.test(to)
  let parsed = parseToInfo(to, basename)
  to = parsed.to
  let href = useHref(to, { relative })
  let location = useLocation()
  let maskedHref = null
  if (unstable_mask) {
    let resolved = resolveTo(
      unstable_mask,
      [],
      location.unstable_mask ? location.unstable_mask.pathname : '/',
      true,
    )
    if (basename !== '/')
      resolved.pathname =
        resolved.pathname === '/' ? basename : joinPaths([basename, resolved.pathname])
    maskedHref = navigator.createHref(resolved)
  }
  let [shouldPrefetch, prefetchRef, prefetchHandlers] = usePrefetchBehavior(prefetch, rest)
  let internalOnClick = useLinkClickHandler(to, {
    replace: replace2,
    unstable_mask,
    state,
    target,
    preventScrollReset,
    relative,
    viewTransition,
    unstable_defaultShouldRevalidate,
    unstable_useTransitions,
  })
  function handleClick(event) {
    if (onClick) onClick(event)
    if (!event.defaultPrevented) internalOnClick(event)
  }
  let isSpaLink = !(parsed.isExternal || reloadDocument)
  let link = /* @__PURE__ */ import_react.createElement('a', {
    ...rest,
    ...prefetchHandlers,
    href: (isSpaLink ? maskedHref : void 0) || parsed.absoluteURL || href,
    onClick: isSpaLink ? handleClick : onClick,
    ref: mergeRefs(forwardedRef, prefetchRef),
    target,
    'data-discover': !isAbsolute && discover === 'render' ? 'true' : void 0,
  })
  return shouldPrefetch && !isAbsolute
    ? /* @__PURE__ */ import_react.createElement(
        import_react.Fragment,
        null,
        link,
        /* @__PURE__ */ import_react.createElement(PrefetchPageLinks, { page: href }),
      )
    : link
})
Link.displayName = 'Link'
var NavLink = import_react.forwardRef(function NavLinkWithRef(
  {
    'aria-current': ariaCurrentProp = 'page',
    caseSensitive = false,
    className: classNameProp = '',
    end = false,
    style: styleProp,
    to,
    viewTransition,
    children,
    ...rest
  },
  ref,
) {
  let path = useResolvedPath(to, { relative: rest.relative })
  let location = useLocation()
  let routerState = import_react.useContext(DataRouterStateContext)
  let { navigator, basename } = import_react.useContext(NavigationContext)
  let isTransitioning =
    routerState != null && useViewTransitionState(path) && viewTransition === true
  let toPathname = navigator.encodeLocation
    ? navigator.encodeLocation(path).pathname
    : path.pathname
  let locationPathname = location.pathname
  let nextLocationPathname =
    routerState && routerState.navigation && routerState.navigation.location
      ? routerState.navigation.location.pathname
      : null
  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase()
    nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null
    toPathname = toPathname.toLowerCase()
  }
  if (nextLocationPathname && basename)
    nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname
  const endSlashPosition =
    toPathname !== '/' && toPathname.endsWith('/') ? toPathname.length - 1 : toPathname.length
  let isActive =
    locationPathname === toPathname ||
    (!end &&
      locationPathname.startsWith(toPathname) &&
      locationPathname.charAt(endSlashPosition) === '/')
  let isPending =
    nextLocationPathname != null &&
    (nextLocationPathname === toPathname ||
      (!end &&
        nextLocationPathname.startsWith(toPathname) &&
        nextLocationPathname.charAt(toPathname.length) === '/'))
  let renderProps = {
    isActive,
    isPending,
    isTransitioning,
  }
  let ariaCurrent = isActive ? ariaCurrentProp : void 0
  let className
  if (typeof classNameProp === 'function') className = classNameProp(renderProps)
  else
    className = [
      classNameProp,
      isActive ? 'active' : null,
      isPending ? 'pending' : null,
      isTransitioning ? 'transitioning' : null,
    ]
      .filter(Boolean)
      .join(' ')
  let style = typeof styleProp === 'function' ? styleProp(renderProps) : styleProp
  return /* @__PURE__ */ import_react.createElement(
    Link,
    {
      ...rest,
      'aria-current': ariaCurrent,
      className,
      ref,
      style,
      to,
      viewTransition,
    },
    typeof children === 'function' ? children(renderProps) : children,
  )
})
NavLink.displayName = 'NavLink'
var Form = import_react.forwardRef(
  (
    {
      discover = 'render',
      fetcherKey,
      navigate,
      reloadDocument,
      replace: replace2,
      state,
      method = defaultMethod,
      action,
      onSubmit,
      relative,
      preventScrollReset,
      viewTransition,
      unstable_defaultShouldRevalidate,
      ...props
    },
    forwardedRef,
  ) => {
    let { unstable_useTransitions } = import_react.useContext(NavigationContext)
    let submit = useSubmit()
    let formAction = useFormAction(action, { relative })
    let formMethod = method.toLowerCase() === 'get' ? 'get' : 'post'
    let isAbsolute = typeof action === 'string' && ABSOLUTE_URL_REGEX2.test(action)
    let submitHandler = (event) => {
      onSubmit && onSubmit(event)
      if (event.defaultPrevented) return
      event.preventDefault()
      let submitter = event.nativeEvent.submitter
      let submitMethod = submitter?.getAttribute('formmethod') || method
      let doSubmit = () =>
        submit(submitter || event.currentTarget, {
          fetcherKey,
          method: submitMethod,
          navigate,
          replace: replace2,
          state,
          relative,
          preventScrollReset,
          viewTransition,
          unstable_defaultShouldRevalidate,
        })
      if (unstable_useTransitions && navigate !== false)
        import_react.startTransition(() => doSubmit())
      else doSubmit()
    }
    return /* @__PURE__ */ import_react.createElement('form', {
      ref: forwardedRef,
      method: formMethod,
      action: formAction,
      onSubmit: reloadDocument ? onSubmit : submitHandler,
      ...props,
      'data-discover': !isAbsolute && discover === 'render' ? 'true' : void 0,
    })
  },
)
Form.displayName = 'Form'
function ScrollRestoration({ getKey, storageKey, ...props }) {
  let remixContext = import_react.useContext(FrameworkContext)
  let { basename } = import_react.useContext(NavigationContext)
  let location = useLocation()
  let matches = useMatches()
  useScrollRestoration({
    getKey,
    storageKey,
  })
  let ssrKey = import_react.useMemo(() => {
    if (!remixContext || !getKey) return null
    let userKey = getScrollRestorationKey(location, matches, basename, getKey)
    return userKey !== location.key ? userKey : null
  }, [])
  if (!remixContext || remixContext.isSpaMode) return null
  let restoreScroll = ((storageKey2, restoreKey) => {
    if (!window.history.state || !window.history.state.key) {
      let key = Math.random().toString(32).slice(2)
      window.history.replaceState({ key }, '')
    }
    try {
      let storedY = JSON.parse(sessionStorage.getItem(storageKey2) || '{}')[
        restoreKey || window.history.state.key
      ]
      if (typeof storedY === 'number') window.scrollTo(0, storedY)
    } catch (error) {
      console.error(error)
      sessionStorage.removeItem(storageKey2)
    }
  }).toString()
  return /* @__PURE__ */ import_react.createElement('script', {
    ...props,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: {
      __html: `(${restoreScroll})(${escapeHtml(JSON.stringify(storageKey || SCROLL_RESTORATION_STORAGE_KEY))}, ${escapeHtml(JSON.stringify(ssrKey))})`,
    },
  })
}
ScrollRestoration.displayName = 'ScrollRestoration'
function getDataRouterConsoleError2(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}
function useDataRouterContext3(hookName) {
  let ctx = import_react.useContext(DataRouterContext)
  invariant(ctx, getDataRouterConsoleError2(hookName))
  return ctx
}
function useDataRouterState2(hookName) {
  let state = import_react.useContext(DataRouterStateContext)
  invariant(state, getDataRouterConsoleError2(hookName))
  return state
}
function useLinkClickHandler(
  to,
  {
    target,
    replace: replaceProp,
    unstable_mask,
    state,
    preventScrollReset,
    relative,
    viewTransition,
    unstable_defaultShouldRevalidate,
    unstable_useTransitions,
  } = {},
) {
  let navigate = useNavigate()
  let location = useLocation()
  let path = useResolvedPath(to, { relative })
  return import_react.useCallback(
    (event) => {
      if (shouldProcessLinkClick(event, target)) {
        event.preventDefault()
        let replace2 =
          replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path)
        let doNavigate = () =>
          navigate(to, {
            replace: replace2,
            unstable_mask,
            state,
            preventScrollReset,
            relative,
            viewTransition,
            unstable_defaultShouldRevalidate,
          })
        if (unstable_useTransitions) import_react.startTransition(() => doNavigate())
        else doNavigate()
      }
    },
    [
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
      unstable_useTransitions,
    ],
  )
}
var fetcherId = 0
var getUniqueFetcherId = () => `__${String(++fetcherId)}__`
function useSubmit() {
  let { router } = useDataRouterContext3('useSubmit')
  let { basename } = import_react.useContext(NavigationContext)
  let currentRouteId = useRouteId()
  let routerFetch = router.fetch
  let routerNavigate = router.navigate
  return import_react.useCallback(
    async (target, options = {}) => {
      let { action, method, encType, formData, body } = getFormSubmissionInfo(target, basename)
      if (options.navigate === false)
        await routerFetch(
          options.fetcherKey || getUniqueFetcherId(),
          currentRouteId,
          options.action || action,
          {
            unstable_defaultShouldRevalidate: options.unstable_defaultShouldRevalidate,
            preventScrollReset: options.preventScrollReset,
            formData,
            body,
            formMethod: options.method || method,
            formEncType: options.encType || encType,
            flushSync: options.flushSync,
          },
        )
      else
        await routerNavigate(options.action || action, {
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
          viewTransition: options.viewTransition,
        })
    },
    [routerFetch, routerNavigate, basename, currentRouteId],
  )
}
function useFormAction(action, { relative } = {}) {
  let { basename } = import_react.useContext(NavigationContext)
  let routeContext = import_react.useContext(RouteContext)
  invariant(routeContext, 'useFormAction must be used inside a RouteContext')
  let [match] = routeContext.matches.slice(-1)
  let path = { ...useResolvedPath(action ? action : '.', { relative }) }
  let location = useLocation()
  if (action == null) {
    path.search = location.search
    let params = new URLSearchParams(path.search)
    let indexValues = params.getAll('index')
    if (indexValues.some((v) => v === '')) {
      params.delete('index')
      indexValues.filter((v) => v).forEach((v) => params.append('index', v))
      let qs = params.toString()
      path.search = qs ? `?${qs}` : ''
    }
  }
  if ((!action || action === '.') && match.route.index)
    path.search = path.search ? path.search.replace(/^\?/, '?index&') : '?index'
  if (basename !== '/')
    path.pathname = path.pathname === '/' ? basename : joinPaths([basename, path.pathname])
  return createPath(path)
}
var SCROLL_RESTORATION_STORAGE_KEY = 'react-router-scroll-positions'
var savedScrollPositions = {}
function getScrollRestorationKey(location, matches, basename, getKey) {
  let key = null
  if (getKey)
    if (basename !== '/')
      key = getKey(
        {
          ...location,
          pathname: stripBasename(location.pathname, basename) || location.pathname,
        },
        matches,
      )
    else key = getKey(location, matches)
  if (key == null) key = location.key
  return key
}
function useScrollRestoration({ getKey, storageKey } = {}) {
  let { router } = useDataRouterContext3('useScrollRestoration')
  let { restoreScrollPosition, preventScrollReset } = useDataRouterState2('useScrollRestoration')
  let { basename } = import_react.useContext(NavigationContext)
  let location = useLocation()
  let matches = useMatches()
  let navigation = useNavigation()
  import_react.useEffect(() => {
    window.history.scrollRestoration = 'manual'
    return () => {
      window.history.scrollRestoration = 'auto'
    }
  }, [])
  usePageHide(
    import_react.useCallback(() => {
      if (navigation.state === 'idle') {
        let key = getScrollRestorationKey(location, matches, basename, getKey)
        savedScrollPositions[key] = window.scrollY
      }
      try {
        sessionStorage.setItem(
          storageKey || SCROLL_RESTORATION_STORAGE_KEY,
          JSON.stringify(savedScrollPositions),
        )
      } catch (error) {
        warning(
          false,
          `Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${error}).`,
        )
      }
      window.history.scrollRestoration = 'auto'
    }, [navigation.state, getKey, basename, location, matches, storageKey]),
  )
  if (typeof document !== 'undefined') {
    import_react.useLayoutEffect(() => {
      try {
        let sessionPositions = sessionStorage.getItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY)
        if (sessionPositions) savedScrollPositions = JSON.parse(sessionPositions)
      } catch (e) {}
    }, [storageKey])
    import_react.useLayoutEffect(() => {
      let disableScrollRestoration = router?.enableScrollRestoration(
        savedScrollPositions,
        () => window.scrollY,
        getKey
          ? (location2, matches2) => getScrollRestorationKey(location2, matches2, basename, getKey)
          : void 0,
      )
      return () => disableScrollRestoration && disableScrollRestoration()
    }, [router, basename, getKey])
    import_react.useLayoutEffect(() => {
      if (restoreScrollPosition === false) return
      if (typeof restoreScrollPosition === 'number') {
        window.scrollTo(0, restoreScrollPosition)
        return
      }
      try {
        if (location.hash) {
          let el = document.getElementById(decodeURIComponent(location.hash.slice(1)))
          if (el) {
            el.scrollIntoView()
            return
          }
        }
      } catch {
        warning(
          false,
          `"${location.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`,
        )
      }
      if (preventScrollReset === true) return
      window.scrollTo(0, 0)
    }, [location, restoreScrollPosition, preventScrollReset])
  }
}
function usePageHide(callback, options) {
  let { capture } = options || {}
  import_react.useEffect(() => {
    let opts = capture != null ? { capture } : void 0
    window.addEventListener('pagehide', callback, opts)
    return () => {
      window.removeEventListener('pagehide', callback, opts)
    }
  }, [callback, capture])
}
function useViewTransitionState(to, { relative } = {}) {
  let vtContext = import_react.useContext(ViewTransitionContext)
  invariant(
    vtContext != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  )
  let { basename } = useDataRouterContext3('useViewTransitionState')
  let path = useResolvedPath(to, { relative })
  if (!vtContext.isTransitioning) return false
  let currentPath =
    stripBasename(vtContext.currentLocation.pathname, basename) ||
    vtContext.currentLocation.pathname
  let nextPath =
    stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname
  return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null
}
typeof window !== 'undefined' && window.document && window.document.createElement
function composeEventHandlers(
  originalEventHandler,
  ourEventHandler,
  { checkForDefaultPrevented = true } = {},
) {
  return function handleEvent(event) {
    originalEventHandler?.(event)
    if (checkForDefaultPrevented === false || !event.defaultPrevented)
      return ourEventHandler?.(event)
  }
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-compose-refs@1.1.2_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function setRef(ref, value) {
  if (typeof ref === 'function') return ref(value)
  else if (ref !== null && ref !== void 0) ref.current = value
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node)
      if (!hasCleanup && typeof cleanup == 'function') hasCleanup = true
      return cleanup
    })
    if (hasCleanup)
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i]
          if (typeof cleanup == 'function') cleanup()
          else setRef(refs[i], null)
        }
      }
  }
}
function useComposedRefs(...refs) {
  return import_react.useCallback(composeRefs(...refs), refs)
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
var require_react_jsx_runtime_development = /* @__PURE__ */ __commonJSMin((exports) => {
  ;(function () {
    function getComponentNameFromType(type) {
      if (null == type) return null
      if ('function' === typeof type)
        return type.$$typeof === REACT_CLIENT_REFERENCE
          ? null
          : type.displayName || type.name || null
      if ('string' === typeof type) return type
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return 'Fragment'
        case REACT_PROFILER_TYPE:
          return 'Profiler'
        case REACT_STRICT_MODE_TYPE:
          return 'StrictMode'
        case REACT_SUSPENSE_TYPE:
          return 'Suspense'
        case REACT_SUSPENSE_LIST_TYPE:
          return 'SuspenseList'
        case REACT_ACTIVITY_TYPE:
          return 'Activity'
      }
      if ('object' === typeof type)
        switch (
          ('number' === typeof type.tag &&
            console.error(
              'Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.',
            ),
          type.$$typeof)
        ) {
          case REACT_PORTAL_TYPE:
            return 'Portal'
          case REACT_CONTEXT_TYPE:
            return type.displayName || 'Context'
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || 'Context') + '.Consumer'
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render
            type = type.displayName
            type ||
              ((type = innerType.displayName || innerType.name || ''),
              (type = '' !== type ? 'ForwardRef(' + type + ')' : 'ForwardRef'))
            return type
          case REACT_MEMO_TYPE:
            return (
              (innerType = type.displayName || null),
              null !== innerType ? innerType : getComponentNameFromType(type.type) || 'Memo'
            )
          case REACT_LAZY_TYPE:
            innerType = type._payload
            type = type._init
            try {
              return getComponentNameFromType(type(innerType))
            } catch (x) {}
        }
      return null
    }
    function testStringCoercion(value) {
      return '' + value
    }
    function checkKeyStringCoercion(value) {
      try {
        testStringCoercion(value)
        var JSCompiler_inline_result = !1
      } catch (e) {
        JSCompiler_inline_result = !0
      }
      if (JSCompiler_inline_result) {
        JSCompiler_inline_result = console
        var JSCompiler_temp_const = JSCompiler_inline_result.error
        var JSCompiler_inline_result$jscomp$0 =
          ('function' === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag]) ||
          value.constructor.name ||
          'Object'
        JSCompiler_temp_const.call(
          JSCompiler_inline_result,
          'The provided key is an unsupported type %s. This value must be coerced to a string before using it here.',
          JSCompiler_inline_result$jscomp$0,
        )
        return testStringCoercion(value)
      }
    }
    function getTaskName(type) {
      if (type === REACT_FRAGMENT_TYPE) return '<>'
      if ('object' === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
        return '<...>'
      try {
        var name = getComponentNameFromType(type)
        return name ? '<' + name + '>' : '<...>'
      } catch (x) {
        return '<...>'
      }
    }
    function getOwner() {
      var dispatcher = ReactSharedInternals.A
      return null === dispatcher ? null : dispatcher.getOwner()
    }
    function UnknownOwner() {
      return Error('react-stack-top-frame')
    }
    function hasValidKey(config) {
      if (hasOwnProperty.call(config, 'key')) {
        var getter = Object.getOwnPropertyDescriptor(config, 'key').get
        if (getter && getter.isReactWarning) return !1
      }
      return void 0 !== config.key
    }
    function defineKeyPropWarningGetter(props, displayName) {
      function warnAboutAccessingKey() {
        specialPropKeyWarningShown ||
          ((specialPropKeyWarningShown = !0),
          console.error(
            '%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)',
            displayName,
          ))
      }
      warnAboutAccessingKey.isReactWarning = !0
      Object.defineProperty(props, 'key', {
        get: warnAboutAccessingKey,
        configurable: !0,
      })
    }
    function elementRefGetterWithDeprecationWarning() {
      var componentName = getComponentNameFromType(this.type)
      didWarnAboutElementRef[componentName] ||
        ((didWarnAboutElementRef[componentName] = !0),
        console.error(
          'Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.',
        ))
      componentName = this.props.ref
      return void 0 !== componentName ? componentName : null
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
      var refProp = props.ref
      type = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        props,
        _owner: owner,
      }
      null !== (void 0 !== refProp ? refProp : null)
        ? Object.defineProperty(type, 'ref', {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning,
          })
        : Object.defineProperty(type, 'ref', {
            enumerable: !1,
            value: null,
          })
      type._store = {}
      Object.defineProperty(type._store, 'validated', {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0,
      })
      Object.defineProperty(type, '_debugInfo', {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null,
      })
      Object.defineProperty(type, '_debugStack', {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: debugStack,
      })
      Object.defineProperty(type, '_debugTask', {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: debugTask,
      })
      Object.freeze && (Object.freeze(type.props), Object.freeze(type))
      return type
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
      var children = config.children
      if (void 0 !== children)
        if (isStaticChildren)
          if (isArrayImpl(children)) {
            for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
              validateChildKeys(children[isStaticChildren])
            Object.freeze && Object.freeze(children)
          } else
            console.error(
              'React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.',
            )
        else validateChildKeys(children)
      if (hasOwnProperty.call(config, 'key')) {
        children = getComponentNameFromType(type)
        var keys = Object.keys(config).filter(function (k) {
          return 'key' !== k
        })
        isStaticChildren =
          0 < keys.length ? '{key: someKey, ' + keys.join(': ..., ') + ': ...}' : '{key: someKey}'
        didWarnAboutKeySpread[children + isStaticChildren] ||
          ((keys = 0 < keys.length ? '{' + keys.join(': ..., ') + ': ...}' : '{}'),
          console.error(
            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
            isStaticChildren,
            children,
            keys,
            children,
          ),
          (didWarnAboutKeySpread[children + isStaticChildren] = !0))
      }
      children = null
      void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), (children = '' + maybeKey))
      hasValidKey(config) && (checkKeyStringCoercion(config.key), (children = '' + config.key))
      if ('key' in config) {
        maybeKey = {}
        for (var propName in config) 'key' !== propName && (maybeKey[propName] = config[propName])
      } else maybeKey = config
      children &&
        defineKeyPropWarningGetter(
          maybeKey,
          'function' === typeof type ? type.displayName || type.name || 'Unknown' : type,
        )
      return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask)
    }
    function validateChildKeys(node) {
      isValidElement(node)
        ? node._store && (node._store.validated = 1)
        : 'object' === typeof node &&
          null !== node &&
          node.$$typeof === REACT_LAZY_TYPE &&
          ('fulfilled' === node._payload.status
            ? isValidElement(node._payload.value) &&
              node._payload.value._store &&
              (node._payload.value._store.validated = 1)
            : node._store && (node._store.validated = 1))
    }
    function isValidElement(object) {
      return 'object' === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE
    }
    var React = require_react(),
      REACT_ELEMENT_TYPE = Symbol.for('react.transitional.element'),
      REACT_PORTAL_TYPE = Symbol.for('react.portal'),
      REACT_FRAGMENT_TYPE = Symbol.for('react.fragment'),
      REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode'),
      REACT_PROFILER_TYPE = Symbol.for('react.profiler'),
      REACT_CONSUMER_TYPE = Symbol.for('react.consumer'),
      REACT_CONTEXT_TYPE = Symbol.for('react.context'),
      REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref'),
      REACT_SUSPENSE_TYPE = Symbol.for('react.suspense'),
      REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list'),
      REACT_MEMO_TYPE = Symbol.for('react.memo'),
      REACT_LAZY_TYPE = Symbol.for('react.lazy'),
      REACT_ACTIVITY_TYPE = Symbol.for('react.activity'),
      REACT_CLIENT_REFERENCE = Symbol.for('react.client.reference'),
      ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      hasOwnProperty = Object.prototype.hasOwnProperty,
      isArrayImpl = Array.isArray,
      createTask = console.createTask
        ? console.createTask
        : function () {
            return null
          }
    React = {
      react_stack_bottom_frame: function (callStackForError) {
        return callStackForError()
      },
    }
    var specialPropKeyWarningShown
    var didWarnAboutElementRef = {}
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)()
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner))
    var didWarnAboutKeySpread = {}
    exports.Fragment = REACT_FRAGMENT_TYPE
    exports.jsx = function (type, config, maybeKey) {
      var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++
      return jsxDEVImpl(
        type,
        config,
        maybeKey,
        !1,
        trackActualOwner ? Error('react-stack-top-frame') : unknownOwnerDebugStack,
        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask,
      )
    }
    exports.jsxs = function (type, config, maybeKey) {
      var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++
      return jsxDEVImpl(
        type,
        config,
        maybeKey,
        !0,
        trackActualOwner ? Error('react-stack-top-frame') : unknownOwnerDebugStack,
        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask,
      )
    }
  })()
})
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/react@19.2.4/node_modules/react/jsx-runtime.js
var require_jsx_runtime = /* @__PURE__ */ __commonJSMin((exports, module) => {
  module.exports = require_react_jsx_runtime_development()
})
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-context@1.1.2_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-context/dist/index.mjs
var import_jsx_runtime = require_jsx_runtime()
function createContext2(rootComponentName, defaultContext) {
  const Context = import_react.createContext(defaultContext)
  const Provider = (props) => {
    const { children, ...context } = props
    const value = import_react.useMemo(() => context, Object.values(context))
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, {
      value,
      children,
    })
  }
  Provider.displayName = rootComponentName + 'Provider'
  function useContext2(consumerName) {
    const context = import_react.useContext(Context)
    if (context) return context
    if (defaultContext !== void 0) return defaultContext
    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``)
  }
  return [Provider, useContext2]
}
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = []
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = import_react.createContext(defaultContext)
    const index = defaultContexts.length
    defaultContexts = [...defaultContexts, defaultContext]
    const Provider = (props) => {
      const { scope, children, ...context } = props
      const Context = scope?.[scopeName]?.[index] || BaseContext
      const value = import_react.useMemo(() => context, Object.values(context))
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, {
        value,
        children,
      })
    }
    Provider.displayName = rootComponentName + 'Provider'
    function useContext2(consumerName, scope) {
      const Context = scope?.[scopeName]?.[index] || BaseContext
      const context = import_react.useContext(Context)
      if (context) return context
      if (defaultContext !== void 0) return defaultContext
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``)
    }
    return [Provider, useContext2]
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return import_react.createContext(defaultContext)
    })
    return function useScope(scope) {
      const contexts = scope?.[scopeName] || scopeContexts
      return import_react.useMemo(
        () => ({
          [`__scope${scopeName}`]: {
            ...scope,
            [scopeName]: contexts,
          },
        }),
        [scope, contexts],
      )
    }
  }
  createScope.scopeName = scopeName
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)]
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0]
  if (scopes.length === 1) return baseScope
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName,
    }))
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const currentScope = useScope(overrideScopes)[`__scope${scopeName}`]
        return {
          ...nextScopes2,
          ...currentScope,
        }
      }, {})
      return import_react.useMemo(
        () => ({ [`__scope${baseScope.scopeName}`]: nextScopes }),
        [nextScopes],
      )
    }
  }
  createScope.scopeName = baseScope.scopeName
  return createScope
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-slot@1.2.3_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-slot/dist/index.mjs
/* @__NO_SIDE_EFFECTS__ */
function createSlot$1(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone$1(ownerName)
  const Slot2 = import_react.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props
    const childrenArray = import_react.Children.toArray(children)
    const slottable = childrenArray.find(isSlottable$1)
    if (slottable) {
      const newElement = slottable.props.children
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (import_react.Children.count(newElement) > 1) return import_react.Children.only(null)
          return import_react.isValidElement(newElement) ? newElement.props.children : null
        } else return child
      })
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotClone, {
        ...slotProps,
        ref: forwardedRef,
        children: import_react.isValidElement(newElement)
          ? import_react.cloneElement(newElement, void 0, newChildren)
          : null,
      })
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotClone, {
      ...slotProps,
      ref: forwardedRef,
      children,
    })
  })
  Slot2.displayName = `${ownerName}.Slot`
  return Slot2
}
/* @__NO_SIDE_EFFECTS__ */
function createSlotClone$1(ownerName) {
  const SlotClone = import_react.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props
    if (import_react.isValidElement(children)) {
      const childrenRef = getElementRef$2(children)
      const props2 = mergeProps$1(slotProps, children.props)
      if (children.type !== import_react.Fragment)
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef
      return import_react.cloneElement(children, props2)
    }
    return import_react.Children.count(children) > 1 ? import_react.Children.only(null) : null
  })
  SlotClone.displayName = `${ownerName}.SlotClone`
  return SlotClone
}
var SLOTTABLE_IDENTIFIER$1 = Symbol('radix.slottable')
/* @__NO_SIDE_EFFECTS__ */
function createSlottable(ownerName) {
  const Slottable2 = ({ children }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children })
  }
  Slottable2.displayName = `${ownerName}.Slottable`
  Slottable2.__radixId = SLOTTABLE_IDENTIFIER$1
  return Slottable2
}
function isSlottable$1(child) {
  return (
    import_react.isValidElement(child) &&
    typeof child.type === 'function' &&
    '__radixId' in child.type &&
    child.type.__radixId === SLOTTABLE_IDENTIFIER$1
  )
}
function mergeProps$1(slotProps, childProps) {
  const overrideProps = { ...childProps }
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName]
    const childPropValue = childProps[propName]
    if (/^on[A-Z]/.test(propName)) {
      if (slotPropValue && childPropValue)
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args)
          slotPropValue(...args)
          return result
        }
      else if (slotPropValue) overrideProps[propName] = slotPropValue
    } else if (propName === 'style')
      overrideProps[propName] = {
        ...slotPropValue,
        ...childPropValue,
      }
    else if (propName === 'className')
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ')
  }
  return {
    ...slotProps,
    ...overrideProps,
  }
}
function getElementRef$2(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, 'ref')?.get
  let mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning
  if (mayWarn) return element.ref
  getter = Object.getOwnPropertyDescriptor(element, 'ref')?.get
  mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning
  if (mayWarn) return element.props.ref
  return element.props.ref || element.ref
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-primitive@2.1.3_@types+react-dom@19.2.3_@types+react@19.2.14__@types+re_1181ea5061ec9212248424669240e4ec/node_modules/@radix-ui/react-primitive/dist/index.mjs
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1)
var Primitive$1 = [
  'a',
  'button',
  'div',
  'form',
  'h2',
  'h3',
  'img',
  'input',
  'label',
  'li',
  'nav',
  'ol',
  'p',
  'select',
  'span',
  'svg',
  'ul',
].reduce((primitive, node) => {
  const Slot = /* @__PURE__ */ createSlot$1(`Primitive.${node}`)
  const Node = import_react.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props
    const Comp = asChild ? Slot : node
    if (typeof window !== 'undefined') window[Symbol.for('radix-ui')] = true
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, {
      ...primitiveProps,
      ref: forwardedRef,
    })
  })
  Node.displayName = `Primitive.${node}`
  return {
    ...primitive,
    [node]: Node,
  }
}, {})
function dispatchDiscreteCustomEvent(target, event) {
  if (target) import_react_dom.flushSync(() => target.dispatchEvent(event))
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-use-callback-ref@1.1.1_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function useCallbackRef(callback) {
  const callbackRef = import_react.useRef(callback)
  import_react.useEffect(() => {
    callbackRef.current = callback
  })
  return import_react.useMemo(
    () =>
      (...args) =>
        callbackRef.current?.(...args),
    [],
  )
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-use-escape-keydown@1.1.1_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs
function useEscapeKeydown(onEscapeKeyDownProp, ownerDocument = globalThis?.document) {
  const onEscapeKeyDown = useCallbackRef(onEscapeKeyDownProp)
  import_react.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onEscapeKeyDown(event)
    }
    ownerDocument.addEventListener('keydown', handleKeyDown, { capture: true })
    return () => ownerDocument.removeEventListener('keydown', handleKeyDown, { capture: true })
  }, [onEscapeKeyDown, ownerDocument])
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-dismissable-layer@1.1.11_@types+react-dom@19.2.3_@types+react@19.2.14___3d3960154a4c07d09bb90cb341135fc5/node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var DISMISSABLE_LAYER_NAME = 'DismissableLayer'
var CONTEXT_UPDATE = 'dismissableLayer.update'
var POINTER_DOWN_OUTSIDE = 'dismissableLayer.pointerDownOutside'
var FOCUS_OUTSIDE = 'dismissableLayer.focusOutside'
var originalBodyPointerEvents
var DismissableLayerContext = import_react.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set(),
})
var DismissableLayer = import_react.forwardRef((props, forwardedRef) => {
  const {
    disableOutsidePointerEvents = false,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
    onDismiss,
    ...layerProps
  } = props
  const context = import_react.useContext(DismissableLayerContext)
  const [node, setNode] = import_react.useState(null)
  const ownerDocument = node?.ownerDocument ?? globalThis?.document
  const [, force] = import_react.useState({})
  const composedRefs = useComposedRefs(forwardedRef, (node2) => setNode(node2))
  const layers = Array.from(context.layers)
  const [highestLayerWithOutsidePointerEventsDisabled] = [
    ...context.layersWithOutsidePointerEventsDisabled,
  ].slice(-1)
  const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(
    highestLayerWithOutsidePointerEventsDisabled,
  )
  const index = node ? layers.indexOf(node) : -1
  const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0
  const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex
  const pointerDownOutside = usePointerDownOutside((event) => {
    const target = event.target
    const isPointerDownOnBranch = [...context.branches].some((branch) => branch.contains(target))
    if (!isPointerEventsEnabled || isPointerDownOnBranch) return
    onPointerDownOutside?.(event)
    onInteractOutside?.(event)
    if (!event.defaultPrevented) onDismiss?.()
  }, ownerDocument)
  const focusOutside = useFocusOutside((event) => {
    const target = event.target
    if ([...context.branches].some((branch) => branch.contains(target))) return
    onFocusOutside?.(event)
    onInteractOutside?.(event)
    if (!event.defaultPrevented) onDismiss?.()
  }, ownerDocument)
  useEscapeKeydown((event) => {
    if (!(index === context.layers.size - 1)) return
    onEscapeKeyDown?.(event)
    if (!event.defaultPrevented && onDismiss) {
      event.preventDefault()
      onDismiss()
    }
  }, ownerDocument)
  import_react.useEffect(() => {
    if (!node) return
    if (disableOutsidePointerEvents) {
      if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
        originalBodyPointerEvents = ownerDocument.body.style.pointerEvents
        ownerDocument.body.style.pointerEvents = 'none'
      }
      context.layersWithOutsidePointerEventsDisabled.add(node)
    }
    context.layers.add(node)
    dispatchUpdate()
    return () => {
      if (disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1)
        ownerDocument.body.style.pointerEvents = originalBodyPointerEvents
    }
  }, [node, ownerDocument, disableOutsidePointerEvents, context])
  import_react.useEffect(() => {
    return () => {
      if (!node) return
      context.layers.delete(node)
      context.layersWithOutsidePointerEventsDisabled.delete(node)
      dispatchUpdate()
    }
  }, [node, context])
  import_react.useEffect(() => {
    const handleUpdate = () => force({})
    document.addEventListener(CONTEXT_UPDATE, handleUpdate)
    return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate)
  }, [])
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.div, {
    ...layerProps,
    ref: composedRefs,
    style: {
      pointerEvents: isBodyPointerEventsDisabled
        ? isPointerEventsEnabled
          ? 'auto'
          : 'none'
        : void 0,
      ...props.style,
    },
    onFocusCapture: composeEventHandlers(props.onFocusCapture, focusOutside.onFocusCapture),
    onBlurCapture: composeEventHandlers(props.onBlurCapture, focusOutside.onBlurCapture),
    onPointerDownCapture: composeEventHandlers(
      props.onPointerDownCapture,
      pointerDownOutside.onPointerDownCapture,
    ),
  })
})
DismissableLayer.displayName = DISMISSABLE_LAYER_NAME
var BRANCH_NAME = 'DismissableLayerBranch'
var DismissableLayerBranch = import_react.forwardRef((props, forwardedRef) => {
  const context = import_react.useContext(DismissableLayerContext)
  const ref = import_react.useRef(null)
  const composedRefs = useComposedRefs(forwardedRef, ref)
  import_react.useEffect(() => {
    const node = ref.current
    if (node) {
      context.branches.add(node)
      return () => {
        context.branches.delete(node)
      }
    }
  }, [context.branches])
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.div, {
    ...props,
    ref: composedRefs,
  })
})
DismissableLayerBranch.displayName = BRANCH_NAME
function usePointerDownOutside(onPointerDownOutside, ownerDocument = globalThis?.document) {
  const handlePointerDownOutside = useCallbackRef(onPointerDownOutside)
  const isPointerInsideReactTreeRef = import_react.useRef(false)
  const handleClickRef = import_react.useRef(() => {})
  import_react.useEffect(() => {
    const handlePointerDown = (event) => {
      if (event.target && !isPointerInsideReactTreeRef.current) {
        let handleAndDispatchPointerDownOutsideEvent2 = function () {
          handleAndDispatchCustomEvent(
            POINTER_DOWN_OUTSIDE,
            handlePointerDownOutside,
            eventDetail,
            { discrete: true },
          )
        }
        const eventDetail = { originalEvent: event }
        if (event.pointerType === 'touch') {
          ownerDocument.removeEventListener('click', handleClickRef.current)
          handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2
          ownerDocument.addEventListener('click', handleClickRef.current, { once: true })
        } else handleAndDispatchPointerDownOutsideEvent2()
      } else ownerDocument.removeEventListener('click', handleClickRef.current)
      isPointerInsideReactTreeRef.current = false
    }
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener('pointerdown', handlePointerDown)
    }, 0)
    return () => {
      window.clearTimeout(timerId)
      ownerDocument.removeEventListener('pointerdown', handlePointerDown)
      ownerDocument.removeEventListener('click', handleClickRef.current)
    }
  }, [ownerDocument, handlePointerDownOutside])
  return { onPointerDownCapture: () => (isPointerInsideReactTreeRef.current = true) }
}
function useFocusOutside(onFocusOutside, ownerDocument = globalThis?.document) {
  const handleFocusOutside = useCallbackRef(onFocusOutside)
  const isFocusInsideReactTreeRef = import_react.useRef(false)
  import_react.useEffect(() => {
    const handleFocus = (event) => {
      if (event.target && !isFocusInsideReactTreeRef.current)
        handleAndDispatchCustomEvent(
          FOCUS_OUTSIDE,
          handleFocusOutside,
          { originalEvent: event },
          { discrete: false },
        )
    }
    ownerDocument.addEventListener('focusin', handleFocus)
    return () => ownerDocument.removeEventListener('focusin', handleFocus)
  }, [ownerDocument, handleFocusOutside])
  return {
    onFocusCapture: () => (isFocusInsideReactTreeRef.current = true),
    onBlurCapture: () => (isFocusInsideReactTreeRef.current = false),
  }
}
function dispatchUpdate() {
  const event = new CustomEvent(CONTEXT_UPDATE)
  document.dispatchEvent(event)
}
function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
  const target = detail.originalEvent.target
  const event = new CustomEvent(name, {
    bubbles: false,
    cancelable: true,
    detail,
  })
  if (handler) target.addEventListener(name, handler, { once: true })
  if (discrete) dispatchDiscreteCustomEvent(target, event)
  else target.dispatchEvent(event)
}
var Root$2 = DismissableLayer
var Branch = DismissableLayerBranch
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-use-layout-effect@1.1.1_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var useLayoutEffect2 = globalThis?.document ? import_react.useLayoutEffect : () => {}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-portal@1.1.9_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react_7668895bec2444446faa4e0f4eb5244b/node_modules/@radix-ui/react-portal/dist/index.mjs
var PORTAL_NAME$1 = 'Portal'
var Portal = import_react.forwardRef((props, forwardedRef) => {
  const { container: containerProp, ...portalProps } = props
  const [mounted, setMounted] = import_react.useState(false)
  useLayoutEffect2(() => setMounted(true), [])
  const container = containerProp || (mounted && globalThis?.document?.body)
  return container
    ? import_react_dom.createPortal(
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.div, {
          ...portalProps,
          ref: forwardedRef,
        }),
        container,
      )
    : null
})
Portal.displayName = PORTAL_NAME$1
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-presence@1.1.5_@types+react-dom@19.2.3_@types+react@19.2.14__@types+rea_c01c26c80b5ab5e3ecefbda6eca51ad1/node_modules/@radix-ui/react-presence/dist/index.mjs
function useStateMachine(initialState, machine) {
  return import_react.useReducer((state, event) => {
    return machine[state][event] ?? state
  }, initialState)
}
var Presence = (props) => {
  const { present, children } = props
  const presence = usePresence(present)
  const child =
    typeof children === 'function'
      ? children({ present: presence.isPresent })
      : import_react.Children.only(children)
  const ref = useComposedRefs(presence.ref, getElementRef$1(child))
  return typeof children === 'function' || presence.isPresent
    ? import_react.cloneElement(child, { ref })
    : null
}
Presence.displayName = 'Presence'
function usePresence(present) {
  const [node, setNode] = import_react.useState()
  const stylesRef = import_react.useRef(null)
  const prevPresentRef = import_react.useRef(present)
  const prevAnimationNameRef = import_react.useRef('none')
  const [state, send] = useStateMachine(present ? 'mounted' : 'unmounted', {
    mounted: {
      UNMOUNT: 'unmounted',
      ANIMATION_OUT: 'unmountSuspended',
    },
    unmountSuspended: {
      MOUNT: 'mounted',
      ANIMATION_END: 'unmounted',
    },
    unmounted: { MOUNT: 'mounted' },
  })
  import_react.useEffect(() => {
    const currentAnimationName = getAnimationName(stylesRef.current)
    prevAnimationNameRef.current = state === 'mounted' ? currentAnimationName : 'none'
  }, [state])
  useLayoutEffect2(() => {
    const styles = stylesRef.current
    const wasPresent = prevPresentRef.current
    if (wasPresent !== present) {
      const prevAnimationName = prevAnimationNameRef.current
      const currentAnimationName = getAnimationName(styles)
      if (present) send('MOUNT')
      else if (currentAnimationName === 'none' || styles?.display === 'none') send('UNMOUNT')
      else if (wasPresent && prevAnimationName !== currentAnimationName) send('ANIMATION_OUT')
      else send('UNMOUNT')
      prevPresentRef.current = present
    }
  }, [present, send])
  useLayoutEffect2(() => {
    if (node) {
      let timeoutId
      const ownerWindow = node.ownerDocument.defaultView ?? window
      const handleAnimationEnd = (event) => {
        const isCurrentAnimation = getAnimationName(stylesRef.current).includes(
          CSS.escape(event.animationName),
        )
        if (event.target === node && isCurrentAnimation) {
          send('ANIMATION_END')
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode
            node.style.animationFillMode = 'forwards'
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === 'forwards')
                node.style.animationFillMode = currentFillMode
            })
          }
        }
      }
      const handleAnimationStart = (event) => {
        if (event.target === node)
          prevAnimationNameRef.current = getAnimationName(stylesRef.current)
      }
      node.addEventListener('animationstart', handleAnimationStart)
      node.addEventListener('animationcancel', handleAnimationEnd)
      node.addEventListener('animationend', handleAnimationEnd)
      return () => {
        ownerWindow.clearTimeout(timeoutId)
        node.removeEventListener('animationstart', handleAnimationStart)
        node.removeEventListener('animationcancel', handleAnimationEnd)
        node.removeEventListener('animationend', handleAnimationEnd)
      }
    } else send('ANIMATION_END')
  }, [node, send])
  return {
    isPresent: ['mounted', 'unmountSuspended'].includes(state),
    ref: import_react.useCallback((node2) => {
      stylesRef.current = node2 ? getComputedStyle(node2) : null
      setNode(node2)
    }, []),
  }
}
function getAnimationName(styles) {
  return styles?.animationName || 'none'
}
function getElementRef$1(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, 'ref')?.get
  let mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning
  if (mayWarn) return element.ref
  getter = Object.getOwnPropertyDescriptor(element, 'ref')?.get
  mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning
  if (mayWarn) return element.props.ref
  return element.props.ref || element.ref
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-use-controllable-state@1.2.2_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var useInsertionEffect = import_react[' useInsertionEffect '.trim().toString()] || useLayoutEffect2
function useControllableState({ prop, defaultProp, onChange = () => {}, caller }) {
  const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
    defaultProp,
    onChange,
  })
  const isControlled = prop !== void 0
  const value = isControlled ? prop : uncontrolledProp
  {
    const isControlledRef = import_react.useRef(prop !== void 0)
    import_react.useEffect(() => {
      const wasControlled = isControlledRef.current
      if (wasControlled !== isControlled) {
        const from = wasControlled ? 'controlled' : 'uncontrolled'
        const to = isControlled ? 'controlled' : 'uncontrolled'
        console.warn(
          `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
        )
      }
      isControlledRef.current = isControlled
    }, [isControlled, caller])
  }
  return [
    value,
    import_react.useCallback(
      (nextValue) => {
        if (isControlled) {
          const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue
          if (value2 !== prop) onChangeRef.current?.(value2)
        } else setUncontrolledProp(nextValue)
      },
      [isControlled, prop, setUncontrolledProp, onChangeRef],
    ),
  ]
}
function useUncontrolledState({ defaultProp, onChange }) {
  const [value, setValue] = import_react.useState(defaultProp)
  const prevValueRef = import_react.useRef(value)
  const onChangeRef = import_react.useRef(onChange)
  useInsertionEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])
  import_react.useEffect(() => {
    if (prevValueRef.current !== value) {
      onChangeRef.current?.(value)
      prevValueRef.current = value
    }
  }, [value, prevValueRef])
  return [value, setValue, onChangeRef]
}
function isFunction(value) {
  return typeof value === 'function'
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-visually-hidden@1.2.3_@types+react-dom@19.2.3_@types+react@19.2.14__@ty_fa89646d7248b32d1762bf88948f6339/node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
var VISUALLY_HIDDEN_STYLES = Object.freeze({
  position: 'absolute',
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  wordWrap: 'normal',
})
var NAME$1 = 'VisuallyHidden'
var VisuallyHidden = import_react.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.span, {
    ...props,
    ref: forwardedRef,
    style: {
      ...VISUALLY_HIDDEN_STYLES,
      ...props.style,
    },
  })
})
VisuallyHidden.displayName = NAME$1
var Root$1 = VisuallyHidden
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t,
    f,
    n = ''
  if ('string' == typeof e || 'number' == typeof e) n += e
  else if ('object' == typeof e)
    if (Array.isArray(e)) {
      var o = e.length
      for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += ' '), (n += f))
    } else for (f in e) e[f] && (n && (n += ' '), (n += f))
  return n
}
function clsx() {
  for (var e, t, f = 0, n = '', o = arguments.length; f < o; f++)
    (e = arguments[f]) && (t = r(e)) && (n && (n += ' '), (n += t))
  return n
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
 */ var falsyToString = (value) =>
  typeof value === 'boolean' ? `${value}` : value === 0 ? '0' : value
var cx = clsx
var cva = (base, config) => (props) => {
  var _config_compoundVariants
  if ((config === null || config === void 0 ? void 0 : config.variants) == null)
    return cx(
      base,
      props === null || props === void 0 ? void 0 : props.class,
      props === null || props === void 0 ? void 0 : props.className,
    )
  const { variants, defaultVariants } = config
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant]
    const defaultVariantProp =
      defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant]
    if (variantProp === null) return null
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp)
    return variants[variant][variantKey]
  })
  const propsWithoutUndefined =
    props &&
    Object.entries(props).reduce((acc, param) => {
      let [key, value] = param
      if (value === void 0) return acc
      acc[key] = value
      return acc
    }, {})
  return cx(
    base,
    getVariantClassNames,
    config === null || config === void 0
      ? void 0
      : (_config_compoundVariants = config.compoundVariants) === null ||
          _config_compoundVariants === void 0
        ? void 0
        : _config_compoundVariants.reduce((acc, param) => {
            let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param
            return Object.entries(compoundVariantOptions).every((param) => {
              let [key, value] = param
              return Array.isArray(value)
                ? value.includes(
                    {
                      ...defaultVariants,
                      ...propsWithoutUndefined,
                    }[key],
                  )
                : {
                    ...defaultVariants,
                    ...propsWithoutUndefined,
                  }[key] === value
            })
              ? [...acc, cvClass, cvClassName]
              : acc
          }, []),
    props === null || props === void 0 ? void 0 : props.class,
    props === null || props === void 0 ? void 0 : props.className,
  )
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/lucide-react@0.577.0_react@19.2.4/node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.js
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var mergeClasses = (...classes) =>
  classes
    .filter((className, index, array) => {
      return Boolean(className) && className.trim() !== '' && array.indexOf(className) === index
    })
    .join(' ')
    .trim()
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/lucide-react@0.577.0_react@19.2.4/node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.js
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/lucide-react@0.577.0_react@19.2.4/node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.js
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var toCamelCase = (string) =>
  string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) =>
    p2 ? p2.toUpperCase() : p1.toLowerCase(),
  )
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/lucide-react@0.577.0_react@19.2.4/node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.js
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var toPascalCase = (string) => {
  const camelCase = toCamelCase(string)
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1)
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/lucide-react@0.577.0_react@19.2.4/node_modules/lucide-react/dist/esm/defaultAttributes.js
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/lucide-react@0.577.0_react@19.2.4/node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.js
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var hasA11yProp = (props) => {
  for (const prop in props)
    if (prop.startsWith('aria-') || prop === 'role' || prop === 'title') return true
  return false
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/lucide-react@0.577.0_react@19.2.4/node_modules/lucide-react/dist/esm/Icon.js
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Icon = (0, import_react.forwardRef)(
  (
    {
      color = 'currentColor',
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth,
      className = '',
      children,
      iconNode,
      ...rest
    },
    ref,
  ) =>
    (0, import_react.createElement)(
      'svg',
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth,
        className: mergeClasses('lucide', className),
        ...(!children && !hasA11yProp(rest) && { 'aria-hidden': 'true' }),
        ...rest,
      },
      [
        ...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)),
        ...(Array.isArray(children) ? children : [children]),
      ],
    ),
)
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/lucide-react@0.577.0_react@19.2.4/node_modules/lucide-react/dist/esm/createLucideIcon.js
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var createLucideIcon = (iconName, iconNode) => {
  const Component = (0, import_react.forwardRef)(({ className, ...props }, ref) =>
    (0, import_react.createElement)(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className,
      ),
      ...props,
    }),
  )
  Component.displayName = toPascalCase(iconName)
  return Component
}
var X = createLucideIcon('x', [
  [
    'path',
    {
      d: 'M18 6 6 18',
      key: '1bl5f8',
    },
  ],
  [
    'path',
    {
      d: 'm6 6 12 12',
      key: 'd8bk6v',
    },
  ],
])
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/tailwind-merge@2.6.1/node_modules/tailwind-merge/dist/bundle-mjs.mjs
var CLASS_PART_SEPARATOR = '-'
var createClassGroupUtils = (config) => {
  const classMap = createClassMap(config)
  const { conflictingClassGroups, conflictingClassGroupModifiers } = config
  const getClassGroupId = (className) => {
    const classParts = className.split(CLASS_PART_SEPARATOR)
    if (classParts[0] === '' && classParts.length !== 1) classParts.shift()
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className)
  }
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    const conflicts = conflictingClassGroups[classGroupId] || []
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId])
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]]
    return conflicts
  }
  return {
    getClassGroupId,
    getConflictingClassGroupIds,
  }
}
var getGroupRecursive = (classParts, classPartObject) => {
  if (classParts.length === 0) return classPartObject.classGroupId
  const currentClassPart = classParts[0]
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart)
  const classGroupFromNextClassPart = nextClassPartObject
    ? getGroupRecursive(classParts.slice(1), nextClassPartObject)
    : void 0
  if (classGroupFromNextClassPart) return classGroupFromNextClassPart
  if (classPartObject.validators.length === 0) return
  const classRest = classParts.join(CLASS_PART_SEPARATOR)
  return classPartObject.validators.find(({ validator }) => validator(classRest))?.classGroupId
}
var arbitraryPropertyRegex = /^\[(.+)\]$/
var getGroupIdForArbitraryProperty = (className) => {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1]
    const property = arbitraryPropertyClassName?.substring(
      0,
      arbitraryPropertyClassName.indexOf(':'),
    )
    if (property) return 'arbitrary..' + property
  }
}
/**
 * Exported for testing only
 */
var createClassMap = (config) => {
  const { theme, prefix } = config
  const classMap = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: [],
  }
  getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix).forEach(
    ([classGroupId, classGroup]) => {
      processClassesRecursively(classGroup, classMap, classGroupId, theme)
    },
  )
  return classMap
}
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  classGroup.forEach((classDefinition) => {
    if (typeof classDefinition === 'string') {
      const classPartObjectToEdit =
        classDefinition === '' ? classPartObject : getPart(classPartObject, classDefinition)
      classPartObjectToEdit.classGroupId = classGroupId
      return
    }
    if (typeof classDefinition === 'function') {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme)
        return
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId,
      })
      return
    }
    Object.entries(classDefinition).forEach(([key, classGroup]) => {
      processClassesRecursively(classGroup, getPart(classPartObject, key), classGroupId, theme)
    })
  })
}
var getPart = (classPartObject, path) => {
  let currentClassPartObject = classPartObject
  path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
    if (!currentClassPartObject.nextPart.has(pathPart))
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: [],
      })
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart)
  })
  return currentClassPartObject
}
var isThemeGetter = (func) => func.isThemeGetter
var getPrefixedClassGroupEntries = (classGroupEntries, prefix) => {
  if (!prefix) return classGroupEntries
  return classGroupEntries.map(([classGroupId, classGroup]) => {
    return [
      classGroupId,
      classGroup.map((classDefinition) => {
        if (typeof classDefinition === 'string') return prefix + classDefinition
        if (typeof classDefinition === 'object')
          return Object.fromEntries(
            Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]),
          )
        return classDefinition
      }),
    ]
  })
}
var createLruCache = (maxCacheSize) => {
  if (maxCacheSize < 1)
    return {
      get: () => void 0,
      set: () => {},
    }
  let cacheSize = 0
  let cache = /* @__PURE__ */ new Map()
  let previousCache = /* @__PURE__ */ new Map()
  const update = (key, value) => {
    cache.set(key, value)
    cacheSize++
    if (cacheSize > maxCacheSize) {
      cacheSize = 0
      previousCache = cache
      cache = /* @__PURE__ */ new Map()
    }
  }
  return {
    get(key) {
      let value = cache.get(key)
      if (value !== void 0) return value
      if ((value = previousCache.get(key)) !== void 0) {
        update(key, value)
        return value
      }
    },
    set(key, value) {
      if (cache.has(key)) cache.set(key, value)
      else update(key, value)
    },
  }
}
var IMPORTANT_MODIFIER = '!'
var createParseClassName = (config) => {
  const { separator, experimentalParseClassName } = config
  const isSeparatorSingleCharacter = separator.length === 1
  const firstSeparatorCharacter = separator[0]
  const separatorLength = separator.length
  const parseClassName = (className) => {
    const modifiers = []
    let bracketDepth = 0
    let modifierStart = 0
    let postfixModifierPosition
    for (let index = 0; index < className.length; index++) {
      let currentCharacter = className[index]
      if (bracketDepth === 0) {
        if (
          currentCharacter === firstSeparatorCharacter &&
          (isSeparatorSingleCharacter ||
            className.slice(index, index + separatorLength) === separator)
        ) {
          modifiers.push(className.slice(modifierStart, index))
          modifierStart = index + separatorLength
          continue
        }
        if (currentCharacter === '/') {
          postfixModifierPosition = index
          continue
        }
      }
      if (currentCharacter === '[') bracketDepth++
      else if (currentCharacter === ']') bracketDepth--
    }
    const baseClassNameWithImportantModifier =
      modifiers.length === 0 ? className : className.substring(modifierStart)
    const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)
    return {
      modifiers,
      hasImportantModifier,
      baseClassName: hasImportantModifier
        ? baseClassNameWithImportantModifier.substring(1)
        : baseClassNameWithImportantModifier,
      maybePostfixModifierPosition:
        postfixModifierPosition && postfixModifierPosition > modifierStart
          ? postfixModifierPosition - modifierStart
          : void 0,
    }
  }
  if (experimentalParseClassName)
    return (className) =>
      experimentalParseClassName({
        className,
        parseClassName,
      })
  return parseClassName
}
/**
 * Sorts modifiers according to following schema:
 * - Predefined modifiers are sorted alphabetically
 * - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
 */
var sortModifiers = (modifiers) => {
  if (modifiers.length <= 1) return modifiers
  const sortedModifiers = []
  let unsortedModifiers = []
  modifiers.forEach((modifier) => {
    if (modifier[0] === '[') {
      sortedModifiers.push(...unsortedModifiers.sort(), modifier)
      unsortedModifiers = []
    } else unsortedModifiers.push(modifier)
  })
  sortedModifiers.push(...unsortedModifiers.sort())
  return sortedModifiers
}
var createConfigUtils = (config) => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  ...createClassGroupUtils(config),
})
var SPLIT_CLASSES_REGEX = /\s+/
var mergeClassList = (classList, configUtils) => {
  const { parseClassName, getClassGroupId, getConflictingClassGroupIds } = configUtils
  /**
   * Set of classGroupIds in following format:
   * `{importantModifier}{variantModifiers}{classGroupId}`
   * @example 'float'
   * @example 'hover:focus:bg-color'
   * @example 'md:!pr'
   */
  const classGroupsInConflict = []
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX)
  let result = ''
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index]
    const { modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition } =
      parseClassName(originalClassName)
    let hasPostfixModifier = Boolean(maybePostfixModifierPosition)
    let classGroupId = getClassGroupId(
      hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName,
    )
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        result = originalClassName + (result.length > 0 ? ' ' + result : result)
        continue
      }
      classGroupId = getClassGroupId(baseClassName)
      if (!classGroupId) {
        result = originalClassName + (result.length > 0 ? ' ' + result : result)
        continue
      }
      hasPostfixModifier = false
    }
    const variantModifier = sortModifiers(modifiers).join(':')
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier
    const classId = modifierId + classGroupId
    if (classGroupsInConflict.includes(classId)) continue
    classGroupsInConflict.push(classId)
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier)
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i]
      classGroupsInConflict.push(modifierId + group)
    }
    result = originalClassName + (result.length > 0 ? ' ' + result : result)
  }
  return result
}
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
  let index = 0
  let argument
  let resolvedValue
  let string = ''
  while (index < arguments.length)
    if ((argument = arguments[index++])) {
      if ((resolvedValue = toValue(argument))) {
        string && (string += ' ')
        string += resolvedValue
      }
    }
  return string
}
var toValue = (mix) => {
  if (typeof mix === 'string') return mix
  let resolvedValue
  let string = ''
  for (let k = 0; k < mix.length; k++)
    if (mix[k]) {
      if ((resolvedValue = toValue(mix[k]))) {
        string && (string += ' ')
        string += resolvedValue
      }
    }
  return string
}
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils
  let cacheGet
  let cacheSet
  let functionToCall = initTailwindMerge
  function initTailwindMerge(classList) {
    configUtils = createConfigUtils(
      createConfigRest.reduce(
        (previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig),
        createConfigFirst(),
      ),
    )
    cacheGet = configUtils.cache.get
    cacheSet = configUtils.cache.set
    functionToCall = tailwindMerge
    return tailwindMerge(classList)
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList)
    if (cachedResult) return cachedResult
    const result = mergeClassList(classList, configUtils)
    cacheSet(classList, result)
    return result
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments))
  }
}
var fromTheme = (key) => {
  const themeGetter = (theme) => theme[key] || []
  themeGetter.isThemeGetter = true
  return themeGetter
}
var arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i
var fractionRegex = /^\d+\/\d+$/
var stringLengths = /* @__PURE__ */ new Set(['px', 'full', 'screen'])
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/
var lengthUnitRegex =
  /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/
var imageRegex =
  /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/
var isLength = (value) => isNumber(value) || stringLengths.has(value) || fractionRegex.test(value)
var isArbitraryLength = (value) => getIsArbitraryValue(value, 'length', isLengthOnly)
var isNumber = (value) => Boolean(value) && !Number.isNaN(Number(value))
var isArbitraryNumber = (value) => getIsArbitraryValue(value, 'number', isNumber)
var isInteger = (value) => Boolean(value) && Number.isInteger(Number(value))
var isPercent = (value) => value.endsWith('%') && isNumber(value.slice(0, -1))
var isArbitraryValue = (value) => arbitraryValueRegex.test(value)
var isTshirtSize = (value) => tshirtUnitRegex.test(value)
var sizeLabels = /* @__PURE__ */ new Set(['length', 'size', 'percentage'])
var isArbitrarySize = (value) => getIsArbitraryValue(value, sizeLabels, isNever)
var isArbitraryPosition = (value) => getIsArbitraryValue(value, 'position', isNever)
var imageLabels = /* @__PURE__ */ new Set(['image', 'url'])
var isArbitraryImage = (value) => getIsArbitraryValue(value, imageLabels, isImage)
var isArbitraryShadow = (value) => getIsArbitraryValue(value, '', isShadow)
var isAny = () => true
var getIsArbitraryValue = (value, label, testValue) => {
  const result = arbitraryValueRegex.exec(value)
  if (result) {
    if (result[1]) return typeof label === 'string' ? result[1] === label : label.has(result[1])
    return testValue(result[2])
  }
  return false
}
var isLengthOnly = (value) => lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
var isNever = () => false
var isShadow = (value) => shadowRegex.test(value)
var isImage = (value) => imageRegex.test(value)
var getDefaultConfig = () => {
  const colors = fromTheme('colors')
  const spacing = fromTheme('spacing')
  const blur = fromTheme('blur')
  const brightness = fromTheme('brightness')
  const borderColor = fromTheme('borderColor')
  const borderRadius = fromTheme('borderRadius')
  const borderSpacing = fromTheme('borderSpacing')
  const borderWidth = fromTheme('borderWidth')
  const contrast = fromTheme('contrast')
  const grayscale = fromTheme('grayscale')
  const hueRotate = fromTheme('hueRotate')
  const invert = fromTheme('invert')
  const gap = fromTheme('gap')
  const gradientColorStops = fromTheme('gradientColorStops')
  const gradientColorStopPositions = fromTheme('gradientColorStopPositions')
  const inset = fromTheme('inset')
  const margin = fromTheme('margin')
  const opacity = fromTheme('opacity')
  const padding = fromTheme('padding')
  const saturate = fromTheme('saturate')
  const scale = fromTheme('scale')
  const sepia = fromTheme('sepia')
  const skew = fromTheme('skew')
  const space = fromTheme('space')
  const translate = fromTheme('translate')
  const getOverscroll = () => ['auto', 'contain', 'none']
  const getOverflow = () => ['auto', 'hidden', 'clip', 'visible', 'scroll']
  const getSpacingWithAutoAndArbitrary = () => ['auto', isArbitraryValue, spacing]
  const getSpacingWithArbitrary = () => [isArbitraryValue, spacing]
  const getLengthWithEmptyAndArbitrary = () => ['', isLength, isArbitraryLength]
  const getNumberWithAutoAndArbitrary = () => ['auto', isNumber, isArbitraryValue]
  const getPositions = () => [
    'bottom',
    'center',
    'left',
    'left-bottom',
    'left-top',
    'right',
    'right-bottom',
    'right-top',
    'top',
  ]
  const getLineStyles = () => ['solid', 'dashed', 'dotted', 'double', 'none']
  const getBlendModes = () => [
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
  ]
  const getAlign = () => ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch']
  const getZeroAndEmpty = () => ['', '0', isArbitraryValue]
  const getBreaks = () => ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column']
  const getNumberAndArbitrary = () => [isNumber, isArbitraryValue]
  return {
    cacheSize: 500,
    separator: ':',
    theme: {
      colors: [isAny],
      spacing: [isLength, isArbitraryLength],
      blur: ['none', '', isTshirtSize, isArbitraryValue],
      brightness: getNumberAndArbitrary(),
      borderColor: [colors],
      borderRadius: ['none', '', 'full', isTshirtSize, isArbitraryValue],
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
      translate: getSpacingWithArbitrary(),
    },
    classGroups: {
      aspect: [{ aspect: ['auto', 'square', 'video', isArbitraryValue] }],
      container: ['container'],
      columns: [{ columns: [isTshirtSize] }],
      'break-after': [{ 'break-after': getBreaks() }],
      'break-before': [{ 'break-before': getBreaks() }],
      'break-inside': [{ 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] }],
      'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
      box: [{ box: ['border', 'content'] }],
      display: [
        'block',
        'inline-block',
        'inline',
        'flex',
        'inline-flex',
        'table',
        'inline-table',
        'table-caption',
        'table-cell',
        'table-column',
        'table-column-group',
        'table-footer-group',
        'table-header-group',
        'table-row-group',
        'table-row',
        'flow-root',
        'grid',
        'inline-grid',
        'contents',
        'list-item',
        'hidden',
      ],
      float: [{ float: ['right', 'left', 'none', 'start', 'end'] }],
      clear: [{ clear: ['left', 'right', 'both', 'none', 'start', 'end'] }],
      isolation: ['isolate', 'isolation-auto'],
      'object-fit': [{ object: ['contain', 'cover', 'fill', 'none', 'scale-down'] }],
      'object-position': [{ object: [...getPositions(), isArbitraryValue] }],
      overflow: [{ overflow: getOverflow() }],
      'overflow-x': [{ 'overflow-x': getOverflow() }],
      'overflow-y': [{ 'overflow-y': getOverflow() }],
      overscroll: [{ overscroll: getOverscroll() }],
      'overscroll-x': [{ 'overscroll-x': getOverscroll() }],
      'overscroll-y': [{ 'overscroll-y': getOverscroll() }],
      position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
      inset: [{ inset: [inset] }],
      'inset-x': [{ 'inset-x': [inset] }],
      'inset-y': [{ 'inset-y': [inset] }],
      start: [{ start: [inset] }],
      end: [{ end: [inset] }],
      top: [{ top: [inset] }],
      right: [{ right: [inset] }],
      bottom: [{ bottom: [inset] }],
      left: [{ left: [inset] }],
      visibility: ['visible', 'invisible', 'collapse'],
      z: [{ z: ['auto', isInteger, isArbitraryValue] }],
      basis: [{ basis: getSpacingWithAutoAndArbitrary() }],
      'flex-direction': [{ flex: ['row', 'row-reverse', 'col', 'col-reverse'] }],
      'flex-wrap': [{ flex: ['wrap', 'wrap-reverse', 'nowrap'] }],
      flex: [{ flex: ['1', 'auto', 'initial', 'none', isArbitraryValue] }],
      grow: [{ grow: getZeroAndEmpty() }],
      shrink: [{ shrink: getZeroAndEmpty() }],
      order: [{ order: ['first', 'last', 'none', isInteger, isArbitraryValue] }],
      'grid-cols': [{ 'grid-cols': [isAny] }],
      'col-start-end': [
        { col: ['auto', { span: ['full', isInteger, isArbitraryValue] }, isArbitraryValue] },
      ],
      'col-start': [{ 'col-start': getNumberWithAutoAndArbitrary() }],
      'col-end': [{ 'col-end': getNumberWithAutoAndArbitrary() }],
      'grid-rows': [{ 'grid-rows': [isAny] }],
      'row-start-end': [
        { row: ['auto', { span: [isInteger, isArbitraryValue] }, isArbitraryValue] },
      ],
      'row-start': [{ 'row-start': getNumberWithAutoAndArbitrary() }],
      'row-end': [{ 'row-end': getNumberWithAutoAndArbitrary() }],
      'grid-flow': [{ 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] }],
      'auto-cols': [{ 'auto-cols': ['auto', 'min', 'max', 'fr', isArbitraryValue] }],
      'auto-rows': [{ 'auto-rows': ['auto', 'min', 'max', 'fr', isArbitraryValue] }],
      gap: [{ gap: [gap] }],
      'gap-x': [{ 'gap-x': [gap] }],
      'gap-y': [{ 'gap-y': [gap] }],
      'justify-content': [{ justify: ['normal', ...getAlign()] }],
      'justify-items': [{ 'justify-items': ['start', 'end', 'center', 'stretch'] }],
      'justify-self': [{ 'justify-self': ['auto', 'start', 'end', 'center', 'stretch'] }],
      'align-content': [{ content: ['normal', ...getAlign(), 'baseline'] }],
      'align-items': [{ items: ['start', 'end', 'center', 'baseline', 'stretch'] }],
      'align-self': [{ self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline'] }],
      'place-content': [{ 'place-content': [...getAlign(), 'baseline'] }],
      'place-items': [{ 'place-items': ['start', 'end', 'center', 'baseline', 'stretch'] }],
      'place-self': [{ 'place-self': ['auto', 'start', 'end', 'center', 'stretch'] }],
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
      'space-x': [{ 'space-x': [space] }],
      'space-x-reverse': ['space-x-reverse'],
      'space-y': [{ 'space-y': [space] }],
      'space-y-reverse': ['space-y-reverse'],
      w: [{ w: ['auto', 'min', 'max', 'fit', 'svw', 'lvw', 'dvw', isArbitraryValue, spacing] }],
      'min-w': [{ 'min-w': [isArbitraryValue, spacing, 'min', 'max', 'fit'] }],
      'max-w': [
        {
          'max-w': [
            isArbitraryValue,
            spacing,
            'none',
            'full',
            'min',
            'max',
            'fit',
            'prose',
            { screen: [isTshirtSize] },
            isTshirtSize,
          ],
        },
      ],
      h: [{ h: [isArbitraryValue, spacing, 'auto', 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
      'min-h': [{ 'min-h': [isArbitraryValue, spacing, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
      'max-h': [{ 'max-h': [isArbitraryValue, spacing, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
      size: [{ size: [isArbitraryValue, spacing, 'auto', 'min', 'max', 'fit'] }],
      'font-size': [{ text: ['base', isTshirtSize, isArbitraryLength] }],
      'font-smoothing': ['antialiased', 'subpixel-antialiased'],
      'font-style': ['italic', 'not-italic'],
      'font-weight': [
        {
          font: [
            'thin',
            'extralight',
            'light',
            'normal',
            'medium',
            'semibold',
            'bold',
            'extrabold',
            'black',
            isArbitraryNumber,
          ],
        },
      ],
      'font-family': [{ font: [isAny] }],
      'fvn-normal': ['normal-nums'],
      'fvn-ordinal': ['ordinal'],
      'fvn-slashed-zero': ['slashed-zero'],
      'fvn-figure': ['lining-nums', 'oldstyle-nums'],
      'fvn-spacing': ['proportional-nums', 'tabular-nums'],
      'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
      tracking: [
        { tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest', isArbitraryValue] },
      ],
      'line-clamp': [{ 'line-clamp': ['none', isNumber, isArbitraryNumber] }],
      leading: [
        {
          leading: [
            'none',
            'tight',
            'snug',
            'normal',
            'relaxed',
            'loose',
            isLength,
            isArbitraryValue,
          ],
        },
      ],
      'list-image': [{ 'list-image': ['none', isArbitraryValue] }],
      'list-style-type': [{ list: ['none', 'disc', 'decimal', isArbitraryValue] }],
      'list-style-position': [{ list: ['inside', 'outside'] }],
      'placeholder-color': [{ placeholder: [colors] }],
      'placeholder-opacity': [{ 'placeholder-opacity': [opacity] }],
      'text-alignment': [{ text: ['left', 'center', 'right', 'justify', 'start', 'end'] }],
      'text-color': [{ text: [colors] }],
      'text-opacity': [{ 'text-opacity': [opacity] }],
      'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
      'text-decoration-style': [{ decoration: [...getLineStyles(), 'wavy'] }],
      'text-decoration-thickness': [
        { decoration: ['auto', 'from-font', isLength, isArbitraryLength] },
      ],
      'underline-offset': [{ 'underline-offset': ['auto', isLength, isArbitraryValue] }],
      'text-decoration-color': [{ decoration: [colors] }],
      'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
      'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
      'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
      indent: [{ indent: getSpacingWithArbitrary() }],
      'vertical-align': [
        {
          align: [
            'baseline',
            'top',
            'middle',
            'bottom',
            'text-top',
            'text-bottom',
            'sub',
            'super',
            isArbitraryValue,
          ],
        },
      ],
      whitespace: [
        { whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces'] },
      ],
      break: [{ break: ['normal', 'words', 'all', 'keep'] }],
      hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
      content: [{ content: ['none', isArbitraryValue] }],
      'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
      'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
      'bg-opacity': [{ 'bg-opacity': [opacity] }],
      'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
      'bg-position': [{ bg: [...getPositions(), isArbitraryPosition] }],
      'bg-repeat': [{ bg: ['no-repeat', { repeat: ['', 'x', 'y', 'round', 'space'] }] }],
      'bg-size': [{ bg: ['auto', 'cover', 'contain', isArbitrarySize] }],
      'bg-image': [
        {
          bg: [
            'none',
            { 'gradient-to': ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] },
            isArbitraryImage,
          ],
        },
      ],
      'bg-color': [{ bg: [colors] }],
      'gradient-from-pos': [{ from: [gradientColorStopPositions] }],
      'gradient-via-pos': [{ via: [gradientColorStopPositions] }],
      'gradient-to-pos': [{ to: [gradientColorStopPositions] }],
      'gradient-from': [{ from: [gradientColorStops] }],
      'gradient-via': [{ via: [gradientColorStops] }],
      'gradient-to': [{ to: [gradientColorStops] }],
      rounded: [{ rounded: [borderRadius] }],
      'rounded-s': [{ 'rounded-s': [borderRadius] }],
      'rounded-e': [{ 'rounded-e': [borderRadius] }],
      'rounded-t': [{ 'rounded-t': [borderRadius] }],
      'rounded-r': [{ 'rounded-r': [borderRadius] }],
      'rounded-b': [{ 'rounded-b': [borderRadius] }],
      'rounded-l': [{ 'rounded-l': [borderRadius] }],
      'rounded-ss': [{ 'rounded-ss': [borderRadius] }],
      'rounded-se': [{ 'rounded-se': [borderRadius] }],
      'rounded-ee': [{ 'rounded-ee': [borderRadius] }],
      'rounded-es': [{ 'rounded-es': [borderRadius] }],
      'rounded-tl': [{ 'rounded-tl': [borderRadius] }],
      'rounded-tr': [{ 'rounded-tr': [borderRadius] }],
      'rounded-br': [{ 'rounded-br': [borderRadius] }],
      'rounded-bl': [{ 'rounded-bl': [borderRadius] }],
      'border-w': [{ border: [borderWidth] }],
      'border-w-x': [{ 'border-x': [borderWidth] }],
      'border-w-y': [{ 'border-y': [borderWidth] }],
      'border-w-s': [{ 'border-s': [borderWidth] }],
      'border-w-e': [{ 'border-e': [borderWidth] }],
      'border-w-t': [{ 'border-t': [borderWidth] }],
      'border-w-r': [{ 'border-r': [borderWidth] }],
      'border-w-b': [{ 'border-b': [borderWidth] }],
      'border-w-l': [{ 'border-l': [borderWidth] }],
      'border-opacity': [{ 'border-opacity': [opacity] }],
      'border-style': [{ border: [...getLineStyles(), 'hidden'] }],
      'divide-x': [{ 'divide-x': [borderWidth] }],
      'divide-x-reverse': ['divide-x-reverse'],
      'divide-y': [{ 'divide-y': [borderWidth] }],
      'divide-y-reverse': ['divide-y-reverse'],
      'divide-opacity': [{ 'divide-opacity': [opacity] }],
      'divide-style': [{ divide: getLineStyles() }],
      'border-color': [{ border: [borderColor] }],
      'border-color-x': [{ 'border-x': [borderColor] }],
      'border-color-y': [{ 'border-y': [borderColor] }],
      'border-color-s': [{ 'border-s': [borderColor] }],
      'border-color-e': [{ 'border-e': [borderColor] }],
      'border-color-t': [{ 'border-t': [borderColor] }],
      'border-color-r': [{ 'border-r': [borderColor] }],
      'border-color-b': [{ 'border-b': [borderColor] }],
      'border-color-l': [{ 'border-l': [borderColor] }],
      'divide-color': [{ divide: [borderColor] }],
      'outline-style': [{ outline: ['', ...getLineStyles()] }],
      'outline-offset': [{ 'outline-offset': [isLength, isArbitraryValue] }],
      'outline-w': [{ outline: [isLength, isArbitraryLength] }],
      'outline-color': [{ outline: [colors] }],
      'ring-w': [{ ring: getLengthWithEmptyAndArbitrary() }],
      'ring-w-inset': ['ring-inset'],
      'ring-color': [{ ring: [colors] }],
      'ring-opacity': [{ 'ring-opacity': [opacity] }],
      'ring-offset-w': [{ 'ring-offset': [isLength, isArbitraryLength] }],
      'ring-offset-color': [{ 'ring-offset': [colors] }],
      shadow: [{ shadow: ['', 'inner', 'none', isTshirtSize, isArbitraryShadow] }],
      'shadow-color': [{ shadow: [isAny] }],
      opacity: [{ opacity: [opacity] }],
      'mix-blend': [{ 'mix-blend': [...getBlendModes(), 'plus-lighter', 'plus-darker'] }],
      'bg-blend': [{ 'bg-blend': getBlendModes() }],
      filter: [{ filter: ['', 'none'] }],
      blur: [{ blur: [blur] }],
      brightness: [{ brightness: [brightness] }],
      contrast: [{ contrast: [contrast] }],
      'drop-shadow': [{ 'drop-shadow': ['', 'none', isTshirtSize, isArbitraryValue] }],
      grayscale: [{ grayscale: [grayscale] }],
      'hue-rotate': [{ 'hue-rotate': [hueRotate] }],
      invert: [{ invert: [invert] }],
      saturate: [{ saturate: [saturate] }],
      sepia: [{ sepia: [sepia] }],
      'backdrop-filter': [{ 'backdrop-filter': ['', 'none'] }],
      'backdrop-blur': [{ 'backdrop-blur': [blur] }],
      'backdrop-brightness': [{ 'backdrop-brightness': [brightness] }],
      'backdrop-contrast': [{ 'backdrop-contrast': [contrast] }],
      'backdrop-grayscale': [{ 'backdrop-grayscale': [grayscale] }],
      'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [hueRotate] }],
      'backdrop-invert': [{ 'backdrop-invert': [invert] }],
      'backdrop-opacity': [{ 'backdrop-opacity': [opacity] }],
      'backdrop-saturate': [{ 'backdrop-saturate': [saturate] }],
      'backdrop-sepia': [{ 'backdrop-sepia': [sepia] }],
      'border-collapse': [{ border: ['collapse', 'separate'] }],
      'border-spacing': [{ 'border-spacing': [borderSpacing] }],
      'border-spacing-x': [{ 'border-spacing-x': [borderSpacing] }],
      'border-spacing-y': [{ 'border-spacing-y': [borderSpacing] }],
      'table-layout': [{ table: ['auto', 'fixed'] }],
      caption: [{ caption: ['top', 'bottom'] }],
      transition: [
        {
          transition: [
            'none',
            'all',
            '',
            'colors',
            'opacity',
            'shadow',
            'transform',
            isArbitraryValue,
          ],
        },
      ],
      duration: [{ duration: getNumberAndArbitrary() }],
      ease: [{ ease: ['linear', 'in', 'out', 'in-out', isArbitraryValue] }],
      delay: [{ delay: getNumberAndArbitrary() }],
      animate: [{ animate: ['none', 'spin', 'ping', 'pulse', 'bounce', isArbitraryValue] }],
      transform: [{ transform: ['', 'gpu', 'none'] }],
      scale: [{ scale: [scale] }],
      'scale-x': [{ 'scale-x': [scale] }],
      'scale-y': [{ 'scale-y': [scale] }],
      rotate: [{ rotate: [isInteger, isArbitraryValue] }],
      'translate-x': [{ 'translate-x': [translate] }],
      'translate-y': [{ 'translate-y': [translate] }],
      'skew-x': [{ 'skew-x': [skew] }],
      'skew-y': [{ 'skew-y': [skew] }],
      'transform-origin': [
        {
          origin: [
            'center',
            'top',
            'top-right',
            'right',
            'bottom-right',
            'bottom',
            'bottom-left',
            'left',
            'top-left',
            isArbitraryValue,
          ],
        },
      ],
      accent: [{ accent: ['auto', colors] }],
      appearance: [{ appearance: ['none', 'auto'] }],
      cursor: [
        {
          cursor: [
            'auto',
            'default',
            'pointer',
            'wait',
            'text',
            'move',
            'help',
            'not-allowed',
            'none',
            'context-menu',
            'progress',
            'cell',
            'crosshair',
            'vertical-text',
            'alias',
            'copy',
            'no-drop',
            'grab',
            'grabbing',
            'all-scroll',
            'col-resize',
            'row-resize',
            'n-resize',
            'e-resize',
            's-resize',
            'w-resize',
            'ne-resize',
            'nw-resize',
            'se-resize',
            'sw-resize',
            'ew-resize',
            'ns-resize',
            'nesw-resize',
            'nwse-resize',
            'zoom-in',
            'zoom-out',
            isArbitraryValue,
          ],
        },
      ],
      'caret-color': [{ caret: [colors] }],
      'pointer-events': [{ 'pointer-events': ['none', 'auto'] }],
      resize: [{ resize: ['none', 'y', 'x', ''] }],
      'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
      'scroll-m': [{ 'scroll-m': getSpacingWithArbitrary() }],
      'scroll-mx': [{ 'scroll-mx': getSpacingWithArbitrary() }],
      'scroll-my': [{ 'scroll-my': getSpacingWithArbitrary() }],
      'scroll-ms': [{ 'scroll-ms': getSpacingWithArbitrary() }],
      'scroll-me': [{ 'scroll-me': getSpacingWithArbitrary() }],
      'scroll-mt': [{ 'scroll-mt': getSpacingWithArbitrary() }],
      'scroll-mr': [{ 'scroll-mr': getSpacingWithArbitrary() }],
      'scroll-mb': [{ 'scroll-mb': getSpacingWithArbitrary() }],
      'scroll-ml': [{ 'scroll-ml': getSpacingWithArbitrary() }],
      'scroll-p': [{ 'scroll-p': getSpacingWithArbitrary() }],
      'scroll-px': [{ 'scroll-px': getSpacingWithArbitrary() }],
      'scroll-py': [{ 'scroll-py': getSpacingWithArbitrary() }],
      'scroll-ps': [{ 'scroll-ps': getSpacingWithArbitrary() }],
      'scroll-pe': [{ 'scroll-pe': getSpacingWithArbitrary() }],
      'scroll-pt': [{ 'scroll-pt': getSpacingWithArbitrary() }],
      'scroll-pr': [{ 'scroll-pr': getSpacingWithArbitrary() }],
      'scroll-pb': [{ 'scroll-pb': getSpacingWithArbitrary() }],
      'scroll-pl': [{ 'scroll-pl': getSpacingWithArbitrary() }],
      'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
      'snap-stop': [{ snap: ['normal', 'always'] }],
      'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
      'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
      touch: [{ touch: ['auto', 'none', 'manipulation'] }],
      'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
      'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
      'touch-pz': ['touch-pinch-zoom'],
      select: [{ select: ['none', 'text', 'all', 'auto'] }],
      'will-change': [
        { 'will-change': ['auto', 'scroll', 'contents', 'transform', isArbitraryValue] },
      ],
      fill: [{ fill: [colors, 'none'] }],
      'stroke-w': [{ stroke: [isLength, isArbitraryLength, isArbitraryNumber] }],
      stroke: [{ stroke: [colors, 'none'] }],
      sr: ['sr-only', 'not-sr-only'],
      'forced-color-adjust': [{ 'forced-color-adjust': ['auto', 'none'] }],
    },
    conflictingClassGroups: {
      overflow: ['overflow-x', 'overflow-y'],
      overscroll: ['overscroll-x', 'overscroll-y'],
      inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
      'inset-x': ['right', 'left'],
      'inset-y': ['top', 'bottom'],
      flex: ['basis', 'grow', 'shrink'],
      gap: ['gap-x', 'gap-y'],
      p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
      px: ['pr', 'pl'],
      py: ['pt', 'pb'],
      m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
      mx: ['mr', 'ml'],
      my: ['mt', 'mb'],
      size: ['w', 'h'],
      'font-size': ['leading'],
      'fvn-normal': [
        'fvn-ordinal',
        'fvn-slashed-zero',
        'fvn-figure',
        'fvn-spacing',
        'fvn-fraction',
      ],
      'fvn-ordinal': ['fvn-normal'],
      'fvn-slashed-zero': ['fvn-normal'],
      'fvn-figure': ['fvn-normal'],
      'fvn-spacing': ['fvn-normal'],
      'fvn-fraction': ['fvn-normal'],
      'line-clamp': ['display', 'overflow'],
      rounded: [
        'rounded-s',
        'rounded-e',
        'rounded-t',
        'rounded-r',
        'rounded-b',
        'rounded-l',
        'rounded-ss',
        'rounded-se',
        'rounded-ee',
        'rounded-es',
        'rounded-tl',
        'rounded-tr',
        'rounded-br',
        'rounded-bl',
      ],
      'rounded-s': ['rounded-ss', 'rounded-es'],
      'rounded-e': ['rounded-se', 'rounded-ee'],
      'rounded-t': ['rounded-tl', 'rounded-tr'],
      'rounded-r': ['rounded-tr', 'rounded-br'],
      'rounded-b': ['rounded-br', 'rounded-bl'],
      'rounded-l': ['rounded-tl', 'rounded-bl'],
      'border-spacing': ['border-spacing-x', 'border-spacing-y'],
      'border-w': [
        'border-w-s',
        'border-w-e',
        'border-w-t',
        'border-w-r',
        'border-w-b',
        'border-w-l',
      ],
      'border-w-x': ['border-w-r', 'border-w-l'],
      'border-w-y': ['border-w-t', 'border-w-b'],
      'border-color': [
        'border-color-s',
        'border-color-e',
        'border-color-t',
        'border-color-r',
        'border-color-b',
        'border-color-l',
      ],
      'border-color-x': ['border-color-r', 'border-color-l'],
      'border-color-y': ['border-color-t', 'border-color-b'],
      'scroll-m': [
        'scroll-mx',
        'scroll-my',
        'scroll-ms',
        'scroll-me',
        'scroll-mt',
        'scroll-mr',
        'scroll-mb',
        'scroll-ml',
      ],
      'scroll-mx': ['scroll-mr', 'scroll-ml'],
      'scroll-my': ['scroll-mt', 'scroll-mb'],
      'scroll-p': [
        'scroll-px',
        'scroll-py',
        'scroll-ps',
        'scroll-pe',
        'scroll-pt',
        'scroll-pr',
        'scroll-pb',
        'scroll-pl',
      ],
      'scroll-px': ['scroll-pr', 'scroll-pl'],
      'scroll-py': ['scroll-pt', 'scroll-pb'],
      touch: ['touch-x', 'touch-y', 'touch-pz'],
      'touch-x': ['touch'],
      'touch-y': ['touch'],
      'touch-pz': ['touch'],
    },
    conflictingClassGroupModifiers: { 'font-size': ['leading'] },
  }
}
var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig)
//#endregion
//#region src/lib/utils.ts
/**
 * Merges multiple class names into a single string
 * @param inputs - Array of class names
 * @returns Merged class names
 */
function cn(...inputs) {
  return twMerge(clsx(inputs))
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-id@1.1.1_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-id/dist/index.mjs
var useReactId = import_react[' useId '.trim().toString()] || (() => void 0)
var count = 0
function useId(deterministicId) {
  const [id, setId] = import_react.useState(useReactId())
  useLayoutEffect2(() => {
    if (!deterministicId) setId((reactId) => reactId ?? String(count++))
  }, [deterministicId])
  return deterministicId || (id ? `radix-${id}` : '')
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */
var sides = ['top', 'right', 'bottom', 'left']
var min = Math.min
var max = Math.max
var round = Math.round
var floor = Math.floor
var createCoords = (v) => ({
  x: v,
  y: v,
})
var oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom',
}
function clamp(start, value, end) {
  return max(start, min(value, end))
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value
}
function getSide(placement) {
  return placement.split('-')[0]
}
function getAlignment(placement) {
  return placement.split('-')[1]
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x'
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width'
}
function getSideAxis(placement) {
  const firstChar = placement[0]
  return firstChar === 't' || firstChar === 'b' ? 'y' : 'x'
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement))
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) rtl = false
  const alignment = getAlignment(placement)
  const alignmentAxis = getAlignmentAxis(placement)
  const length = getAxisLength(alignmentAxis)
  let mainAlignmentSide =
    alignmentAxis === 'x'
      ? alignment === (rtl ? 'end' : 'start')
        ? 'right'
        : 'left'
      : alignment === 'start'
        ? 'bottom'
        : 'top'
  if (rects.reference[length] > rects.floating[length])
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide)
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)]
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement)
  return [
    getOppositeAlignmentPlacement(placement),
    oppositePlacement,
    getOppositeAlignmentPlacement(oppositePlacement),
  ]
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes('start')
    ? placement.replace('start', 'end')
    : placement.replace('end', 'start')
}
var lrPlacement = ['left', 'right']
var rlPlacement = ['right', 'left']
var tbPlacement = ['top', 'bottom']
var btPlacement = ['bottom', 'top']
function getSideList(side, isStart, rtl) {
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rlPlacement : lrPlacement
      return isStart ? lrPlacement : rlPlacement
    case 'left':
    case 'right':
      return isStart ? tbPlacement : btPlacement
    default:
      return []
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement)
  let list = getSideList(getSide(placement), direction === 'start', rtl)
  if (alignment) {
    list = list.map((side) => side + '-' + alignment)
    if (flipAlignment) list = list.concat(list.map(getOppositeAlignmentPlacement))
  }
  return list
}
function getOppositePlacement(placement) {
  const side = getSide(placement)
  return oppositeSideMap[side] + placement.slice(side.length)
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding,
  }
}
function getPaddingObject(padding) {
  return typeof padding !== 'number'
    ? expandPaddingObject(padding)
    : {
        top: padding,
        right: padding,
        bottom: padding,
        left: padding,
      }
}
function rectToClientRect(rect) {
  const { x, y, width, height } = rect
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y,
  }
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@floating-ui+core@1.7.5/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let { reference, floating } = _ref
  const sideAxis = getSideAxis(placement)
  const alignmentAxis = getAlignmentAxis(placement)
  const alignLength = getAxisLength(alignmentAxis)
  const side = getSide(placement)
  const isVertical = sideAxis === 'y'
  const commonX = reference.x + reference.width / 2 - floating.width / 2
  const commonY = reference.y + reference.height / 2 - floating.height / 2
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2
  let coords
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height,
      }
      break
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height,
      }
      break
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY,
      }
      break
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY,
      }
      break
    default:
      coords = {
        x: reference.x,
        y: reference.y,
      }
  }
  switch (getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1)
      break
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1)
      break
  }
  return coords
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
  var _await$platform$isEle
  if (options === void 0) options = {}
  const { x, y, platform, rects, elements, strategy } = state
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0,
  } = evaluate(options, state)
  const paddingObject = getPaddingObject(padding)
  const element =
    elements[
      altBoundary ? (elementContext === 'floating' ? 'reference' : 'floating') : elementContext
    ]
  const clippingClientRect = rectToClientRect(
    await platform.getClippingRect({
      element: (
        (_await$platform$isEle = await (platform.isElement == null
          ? void 0
          : platform.isElement(element))) != null
          ? _await$platform$isEle
          : true
      )
        ? element
        : element.contextElement ||
          (await (platform.getDocumentElement == null
            ? void 0
            : platform.getDocumentElement(elements.floating))),
      boundary,
      rootBoundary,
      strategy,
    }),
  )
  const rect =
    elementContext === 'floating'
      ? {
          x,
          y,
          width: rects.floating.width,
          height: rects.floating.height,
        }
      : rects.reference
  const offsetParent = await (platform.getOffsetParent == null
    ? void 0
    : platform.getOffsetParent(elements.floating))
  const offsetScale = (await (platform.isElement == null
    ? void 0
    : platform.isElement(offsetParent)))
    ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
        x: 1,
        y: 1,
      }
    : {
        x: 1,
        y: 1,
      }
  const elementClientRect = rectToClientRect(
    platform.convertOffsetParentRelativeRectToViewportRelativeRect
      ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
          elements,
          rect,
          offsetParent,
          strategy,
        })
      : rect,
  )
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom:
      (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right:
      (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x,
  }
}
var MAX_RESET_COUNT = 50
/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
var computePosition$1 = async (reference, floating, config) => {
  const { placement = 'bottom', strategy = 'absolute', middleware = [], platform } = config
  const platformWithDetectOverflow = platform.detectOverflow
    ? platform
    : {
        ...platform,
        detectOverflow,
      }
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating))
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy,
  })
  let { x, y } = computeCoordsFromPlacement(rects, placement, rtl)
  let statefulPlacement = placement
  let resetCount = 0
  const middlewareData = {}
  for (let i = 0; i < middleware.length; i++) {
    const currentMiddleware = middleware[i]
    if (!currentMiddleware) continue
    const { name, fn } = currentMiddleware
    const {
      x: nextX,
      y: nextY,
      data,
      reset,
    } = await fn({
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
        floating,
      },
    })
    x = nextX != null ? nextX : x
    y = nextY != null ? nextY : y
    middlewareData[name] = {
      ...middlewareData[name],
      ...data,
    }
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++
      if (typeof reset === 'object') {
        if (reset.placement) statefulPlacement = reset.placement
        if (reset.rects)
          rects =
            reset.rects === true
              ? await platform.getElementRects({
                  reference,
                  floating,
                  strategy,
                })
              : reset.rects
        ;({ x, y } = computeCoordsFromPlacement(rects, statefulPlacement, rtl))
      }
      i = -1
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData,
  }
}
/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
var arrow$3 = (options) => ({
  name: 'arrow',
  options,
  async fn(state) {
    const { x, y, placement, rects, platform, elements, middlewareData } = state
    const { element, padding = 0 } = evaluate(options, state) || {}
    if (element == null) return {}
    const paddingObject = getPaddingObject(padding)
    const coords = {
      x,
      y,
    }
    const axis = getAlignmentAxis(placement)
    const length = getAxisLength(axis)
    const arrowDimensions = await platform.getDimensions(element)
    const isYAxis = axis === 'y'
    const minProp = isYAxis ? 'top' : 'left'
    const maxProp = isYAxis ? 'bottom' : 'right'
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth'
    const endDiff =
      rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length]
    const startDiff = coords[axis] - rects.reference[axis]
    const arrowOffsetParent = await (platform.getOffsetParent == null
      ? void 0
      : platform.getOffsetParent(element))
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0
    if (
      !clientSize ||
      !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))
    )
      clientSize = elements.floating[clientProp] || rects.floating[length]
    const centerToReference = endDiff / 2 - startDiff / 2
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1
    const minPadding = min(paddingObject[minProp], largestPossiblePadding)
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding)
    const min$1 = minPadding
    const max = clientSize - arrowDimensions[length] - maxPadding
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference
    const offset = clamp(min$1, center, max)
    const shouldAddOffset =
      !middlewareData.arrow &&
      getAlignment(placement) != null &&
      center !== offset &&
      rects.reference[length] / 2 -
        (center < min$1 ? minPadding : maxPadding) -
        arrowDimensions[length] / 2 <
        0
    const alignmentOffset = shouldAddOffset ? (center < min$1 ? center - min$1 : center - max) : 0
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset - alignmentOffset,
        ...(shouldAddOffset && { alignmentOffset }),
      },
      reset: shouldAddOffset,
    }
  },
})
/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
var flip$2 = function (options) {
  if (options === void 0) options = {}
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip
      const { placement, middlewareData, rects, initialPlacement, platform, elements } = state
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state)
      if (
        (_middlewareData$arrow = middlewareData.arrow) != null &&
        _middlewareData$arrow.alignmentOffset
      )
        return {}
      const side = getSide(placement)
      const initialSideAxis = getSideAxis(initialPlacement)
      const isBasePlacement = getSide(initialPlacement) === initialPlacement
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))
      const fallbackPlacements =
        specifiedFallbackPlacements ||
        (isBasePlacement || !flipAlignment
          ? [getOppositePlacement(initialPlacement)]
          : getExpandedPlacements(initialPlacement))
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none'
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection)
        fallbackPlacements.push(
          ...getOppositeAxisPlacements(
            initialPlacement,
            flipAlignment,
            fallbackAxisSideDirection,
            rtl,
          ),
        )
      const placements = [initialPlacement, ...fallbackPlacements]
      const overflow = await platform.detectOverflow(state, detectOverflowOptions)
      const overflows = []
      let overflowsData =
        ((_middlewareData$flip = middlewareData.flip) == null
          ? void 0
          : _middlewareData$flip.overflows) || []
      if (checkMainAxis) overflows.push(overflow[side])
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl)
        overflows.push(overflow[sides[0]], overflow[sides[1]])
      }
      overflowsData = [
        ...overflowsData,
        {
          placement,
          overflows,
        },
      ]
      if (!overflows.every((side) => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter
        const nextIndex =
          (((_middlewareData$flip2 = middlewareData.flip) == null
            ? void 0
            : _middlewareData$flip2.index) || 0) + 1
        const nextPlacement = placements[nextIndex]
        if (nextPlacement) {
          if (
            !(checkCrossAxis === 'alignment'
              ? initialSideAxis !== getSideAxis(nextPlacement)
              : false) ||
            overflowsData.every((d) =>
              getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true,
            )
          )
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData,
              },
              reset: { placement: nextPlacement },
            }
        }
        let resetPlacement =
          (_overflowsData$filter = overflowsData
            .filter((d) => d.overflows[0] <= 0)
            .sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null
            ? void 0
            : _overflowsData$filter.placement
        if (!resetPlacement)
          switch (fallbackStrategy) {
            case 'bestFit': {
              var _overflowsData$filter2
              const placement =
                (_overflowsData$filter2 = overflowsData
                  .filter((d) => {
                    if (hasFallbackAxisSideDirection) {
                      const currentSideAxis = getSideAxis(d.placement)
                      return currentSideAxis === initialSideAxis || currentSideAxis === 'y'
                    }
                    return true
                  })
                  .map((d) => [
                    d.placement,
                    d.overflows
                      .filter((overflow) => overflow > 0)
                      .reduce((acc, overflow) => acc + overflow, 0),
                  ])
                  .sort((a, b) => a[1] - b[1])[0]) == null
                  ? void 0
                  : _overflowsData$filter2[0]
              if (placement) resetPlacement = placement
              break
            }
            case 'initialPlacement':
              resetPlacement = initialPlacement
              break
          }
        if (placement !== resetPlacement) return { reset: { placement: resetPlacement } }
      }
      return {}
    },
  }
}
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width,
  }
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0)
}
/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
var hide$2 = function (options) {
  if (options === void 0) options = {}
  return {
    name: 'hide',
    options,
    async fn(state) {
      const { rects, platform } = state
      const { strategy = 'referenceHidden', ...detectOverflowOptions } = evaluate(options, state)
      switch (strategy) {
        case 'referenceHidden': {
          const offsets = getSideOffsets(
            await platform.detectOverflow(state, {
              ...detectOverflowOptions,
              elementContext: 'reference',
            }),
            rects.reference,
          )
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets),
            },
          }
        }
        case 'escaped': {
          const offsets = getSideOffsets(
            await platform.detectOverflow(state, {
              ...detectOverflowOptions,
              altBoundary: true,
            }),
            rects.floating,
          )
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets),
            },
          }
        }
        default:
          return {}
      }
    },
  }
}
var originSides = /* @__PURE__ */ new Set(['left', 'top'])
async function convertValueToCoords(state, options) {
  const { placement, platform, elements } = state
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))
  const side = getSide(placement)
  const alignment = getAlignment(placement)
  const isVertical = getSideAxis(placement) === 'y'
  const mainAxisMulti = originSides.has(side) ? -1 : 1
  const crossAxisMulti = rtl && isVertical ? -1 : 1
  const rawValue = evaluate(options, state)
  let { mainAxis, crossAxis, alignmentAxis } =
    typeof rawValue === 'number'
      ? {
          mainAxis: rawValue,
          crossAxis: 0,
          alignmentAxis: null,
        }
      : {
          mainAxis: rawValue.mainAxis || 0,
          crossAxis: rawValue.crossAxis || 0,
          alignmentAxis: rawValue.alignmentAxis,
        }
  if (alignment && typeof alignmentAxis === 'number')
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis
  return isVertical
    ? {
        x: crossAxis * crossAxisMulti,
        y: mainAxis * mainAxisMulti,
      }
    : {
        x: mainAxis * mainAxisMulti,
        y: crossAxis * crossAxisMulti,
      }
}
/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
var offset$2 = function (options) {
  if (options === void 0) options = 0
  return {
    name: 'offset',
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow
      const { x, y, placement, middlewareData } = state
      const diffCoords = await convertValueToCoords(state, options)
      if (
        placement ===
          ((_middlewareData$offse = middlewareData.offset) == null
            ? void 0
            : _middlewareData$offse.placement) &&
        (_middlewareData$arrow = middlewareData.arrow) != null &&
        _middlewareData$arrow.alignmentOffset
      )
        return {}
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement,
        },
      }
    },
  }
}
/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
var shift$2 = function (options) {
  if (options === void 0) options = {}
  return {
    name: 'shift',
    options,
    async fn(state) {
      const { x, y, placement, platform } = state
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let { x, y } = _ref
            return {
              x,
              y,
            }
          },
        },
        ...detectOverflowOptions
      } = evaluate(options, state)
      const coords = {
        x,
        y,
      }
      const overflow = await platform.detectOverflow(state, detectOverflowOptions)
      const crossAxis = getSideAxis(getSide(placement))
      const mainAxis = getOppositeAxis(crossAxis)
      let mainAxisCoord = coords[mainAxis]
      let crossAxisCoord = coords[crossAxis]
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left'
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right'
        const min = mainAxisCoord + overflow[minSide]
        const max = mainAxisCoord - overflow[maxSide]
        mainAxisCoord = clamp(min, mainAxisCoord, max)
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left'
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right'
        const min = crossAxisCoord + overflow[minSide]
        const max = crossAxisCoord - overflow[maxSide]
        crossAxisCoord = clamp(min, crossAxisCoord, max)
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord,
      })
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis,
          },
        },
      }
    },
  }
}
/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
var limitShift$2 = function (options) {
  if (options === void 0) options = {}
  return {
    options,
    fn(state) {
      const { x, y, placement, rects, middlewareData } = state
      const {
        offset = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
      } = evaluate(options, state)
      const coords = {
        x,
        y,
      }
      const crossAxis = getSideAxis(placement)
      const mainAxis = getOppositeAxis(crossAxis)
      let mainAxisCoord = coords[mainAxis]
      let crossAxisCoord = coords[crossAxis]
      const rawOffset = evaluate(offset, state)
      const computedOffset =
        typeof rawOffset === 'number'
          ? {
              mainAxis: rawOffset,
              crossAxis: 0,
            }
          : {
              mainAxis: 0,
              crossAxis: 0,
              ...rawOffset,
            }
      if (checkMainAxis) {
        const len = mainAxis === 'y' ? 'height' : 'width'
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis
        if (mainAxisCoord < limitMin) mainAxisCoord = limitMin
        else if (mainAxisCoord > limitMax) mainAxisCoord = limitMax
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2
        const len = mainAxis === 'y' ? 'width' : 'height'
        const isOriginSide = originSides.has(getSide(placement))
        const limitMin =
          rects.reference[crossAxis] -
          rects.floating[len] +
          (isOriginSide
            ? ((_middlewareData$offse = middlewareData.offset) == null
                ? void 0
                : _middlewareData$offse[crossAxis]) || 0
            : 0) +
          (isOriginSide ? 0 : computedOffset.crossAxis)
        const limitMax =
          rects.reference[crossAxis] +
          rects.reference[len] +
          (isOriginSide
            ? 0
            : ((_middlewareData$offse2 = middlewareData.offset) == null
                ? void 0
                : _middlewareData$offse2[crossAxis]) || 0) -
          (isOriginSide ? computedOffset.crossAxis : 0)
        if (crossAxisCoord < limitMin) crossAxisCoord = limitMin
        else if (crossAxisCoord > limitMax) crossAxisCoord = limitMax
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord,
      }
    },
  }
}
/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
var size$2 = function (options) {
  if (options === void 0) options = {}
  return {
    name: 'size',
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2
      const { placement, rects, platform, elements } = state
      const { apply = () => {}, ...detectOverflowOptions } = evaluate(options, state)
      const overflow = await platform.detectOverflow(state, detectOverflowOptions)
      const side = getSide(placement)
      const alignment = getAlignment(placement)
      const isYAxis = getSideAxis(placement) === 'y'
      const { width, height } = rects.floating
      let heightSide
      let widthSide
      if (side === 'top' || side === 'bottom') {
        heightSide = side
        widthSide =
          alignment ===
          ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)))
            ? 'start'
            : 'end')
            ? 'left'
            : 'right'
      } else {
        widthSide = side
        heightSide = alignment === 'end' ? 'top' : 'bottom'
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom
      const maximumClippingWidth = width - overflow.left - overflow.right
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight)
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth)
      const noShift = !state.middlewareData.shift
      let availableHeight = overflowAvailableHeight
      let availableWidth = overflowAvailableWidth
      if (
        (_state$middlewareData = state.middlewareData.shift) != null &&
        _state$middlewareData.enabled.x
      )
        availableWidth = maximumClippingWidth
      if (
        (_state$middlewareData2 = state.middlewareData.shift) != null &&
        _state$middlewareData2.enabled.y
      )
        availableHeight = maximumClippingHeight
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0)
        const xMax = max(overflow.right, 0)
        const yMin = max(overflow.top, 0)
        const yMax = max(overflow.bottom, 0)
        if (isYAxis)
          availableWidth =
            width -
            2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right))
        else
          availableHeight =
            height -
            2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom))
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight,
      })
      const nextDimensions = await platform.getDimensions(elements.floating)
      if (width !== nextDimensions.width || height !== nextDimensions.height)
        return { reset: { rects: true } }
      return {}
    },
  }
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== 'undefined'
}
function getNodeName(node) {
  if (isNode(node)) return (node.nodeName || '').toLowerCase()
  return '#document'
}
function getWindow(node) {
  var _node$ownerDocument
  return (
    (node == null || (_node$ownerDocument = node.ownerDocument) == null
      ? void 0
      : _node$ownerDocument.defaultView) || window
  )
}
function getDocumentElement(node) {
  var _ref
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null
    ? void 0
    : _ref.documentElement
}
function isNode(value) {
  if (!hasWindow()) return false
  return value instanceof Node || value instanceof getWindow(value).Node
}
function isElement(value) {
  if (!hasWindow()) return false
  return value instanceof Element || value instanceof getWindow(value).Element
}
function isHTMLElement(value) {
  if (!hasWindow()) return false
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === 'undefined') return false
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot
}
function isOverflowElement(element) {
  const { overflow, overflowX, overflowY, display } = getComputedStyle$1(element)
  return (
    /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) &&
    display !== 'inline' &&
    display !== 'contents'
  )
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element))
}
function isTopLayer(element) {
  try {
    if (element.matches(':popover-open')) return true
  } catch (_e) {}
  try {
    return element.matches(':modal')
  } catch (_e) {
    return false
  }
}
var willChangeRe = /transform|translate|scale|rotate|perspective|filter/
var containRe = /paint|layout|strict|content/
var isNotNone = (value) => !!value && value !== 'none'
var isWebKitValue
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss
  return (
    isNotNone(css.transform) ||
    isNotNone(css.translate) ||
    isNotNone(css.scale) ||
    isNotNone(css.rotate) ||
    isNotNone(css.perspective) ||
    (!isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter))) ||
    willChangeRe.test(css.willChange || '') ||
    containRe.test(css.contain || '')
  )
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element)
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) return currentNode
    else if (isTopLayer(currentNode)) return null
    currentNode = getParentNode(currentNode)
  }
  return null
}
function isWebKit() {
  if (isWebKitValue == null)
    isWebKitValue =
      typeof CSS !== 'undefined' && CSS.supports && CSS.supports('-webkit-backdrop-filter', 'none')
  return isWebKitValue
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node))
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element)
}
function getNodeScroll(element) {
  if (isElement(element))
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop,
    }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY,
  }
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') return node
  const result =
    node.assignedSlot ||
    node.parentNode ||
    (isShadowRoot(node) && node.host) ||
    getDocumentElement(node)
  return isShadowRoot(result) ? result.host : result
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node)
  if (isLastTraversableNode(parentNode))
    return node.ownerDocument ? node.ownerDocument.body : node.body
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) return parentNode
  return getNearestOverflowAncestor(parentNode)
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2
  if (list === void 0) list = []
  if (traverseIframes === void 0) traverseIframes = true
  const scrollableAncestor = getNearestOverflowAncestor(node)
  const isBody =
    scrollableAncestor ===
    ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body)
  const win = getWindow(scrollableAncestor)
  if (isBody) {
    const frameElement = getFrameElement(win)
    return list.concat(
      win,
      win.visualViewport || [],
      isOverflowElement(scrollableAncestor) ? scrollableAncestor : [],
      frameElement && traverseIframes ? getOverflowAncestors(frameElement) : [],
    )
  } else
    return list.concat(
      scrollableAncestor,
      getOverflowAncestors(scrollableAncestor, [], traverseIframes),
    )
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@floating-ui+dom@1.7.6/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle$1(element)
  let width = parseFloat(css.width) || 0
  let height = parseFloat(css.height) || 0
  const hasOffset = isHTMLElement(element)
  const offsetWidth = hasOffset ? element.offsetWidth : width
  const offsetHeight = hasOffset ? element.offsetHeight : height
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight
  if (shouldFallback) {
    width = offsetWidth
    height = offsetHeight
  }
  return {
    width,
    height,
    $: shouldFallback,
  }
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element
}
function getScale(element) {
  const domElement = unwrapElement(element)
  if (!isHTMLElement(domElement)) return createCoords(1)
  const rect = domElement.getBoundingClientRect()
  const { width, height, $ } = getCssDimensions(domElement)
  let x = ($ ? round(rect.width) : rect.width) / width
  let y = ($ ? round(rect.height) : rect.height) / height
  if (!x || !Number.isFinite(x)) x = 1
  if (!y || !Number.isFinite(y)) y = 1
  return {
    x,
    y,
  }
}
var noOffsets = /* @__PURE__ */ createCoords(0)
function getVisualOffsets(element) {
  const win = getWindow(element)
  if (!isWebKit() || !win.visualViewport) return noOffsets
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop,
  }
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) isFixed = false
  if (!floatingOffsetParent || (isFixed && floatingOffsetParent !== getWindow(element)))
    return false
  return isFixed
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) includeScale = false
  if (isFixedStrategy === void 0) isFixedStrategy = false
  const clientRect = element.getBoundingClientRect()
  const domElement = unwrapElement(element)
  let scale = createCoords(1)
  if (includeScale)
    if (offsetParent) {
      if (isElement(offsetParent)) scale = getScale(offsetParent)
    } else scale = getScale(element)
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent)
    ? getVisualOffsets(domElement)
    : createCoords(0)
  let x = (clientRect.left + visualOffsets.x) / scale.x
  let y = (clientRect.top + visualOffsets.y) / scale.y
  let width = clientRect.width / scale.x
  let height = clientRect.height / scale.y
  if (domElement) {
    const win = getWindow(domElement)
    const offsetWin =
      offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent
    let currentWin = win
    let currentIFrame = getFrameElement(currentWin)
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame)
      const iframeRect = currentIFrame.getBoundingClientRect()
      const css = getComputedStyle$1(currentIFrame)
      const left =
        iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x
      const top =
        iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y
      x *= iframeScale.x
      y *= iframeScale.y
      width *= iframeScale.x
      height *= iframeScale.y
      x += left
      y += top
      currentWin = getWindow(currentIFrame)
      currentIFrame = getFrameElement(currentWin)
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y,
  })
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft
  if (!rect) return getBoundingClientRect(getDocumentElement(element)).left + leftScroll
  return rect.left + leftScroll
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect()
  return {
    x: htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect),
    y: htmlRect.top + scroll.scrollTop,
  }
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let { elements, rect, offsetParent, strategy } = _ref
  const isFixed = strategy === 'fixed'
  const documentElement = getDocumentElement(offsetParent)
  const topLayer = elements ? isTopLayer(elements.floating) : false
  if (offsetParent === documentElement || (topLayer && isFixed)) return rect
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0,
  }
  let scale = createCoords(1)
  const offsets = createCoords(0)
  const isOffsetParentAnElement = isHTMLElement(offsetParent)
  if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement))
      scroll = getNodeScroll(offsetParent)
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent)
      scale = getScale(offsetParent)
      offsets.x = offsetRect.x + offsetParent.clientLeft
      offsets.y = offsetRect.y + offsetParent.clientTop
    }
  }
  const htmlOffset =
    documentElement && !isOffsetParentAnElement && !isFixed
      ? getHTMLOffset(documentElement, scroll)
      : createCoords(0)
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y,
  }
}
function getClientRects(element) {
  return Array.from(element.getClientRects())
}
function getDocumentRect(element) {
  const html = getDocumentElement(element)
  const scroll = getNodeScroll(element)
  const body = element.ownerDocument.body
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth)
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight)
  let x = -scroll.scrollLeft + getWindowScrollBarX(element)
  const y = -scroll.scrollTop
  if (getComputedStyle$1(body).direction === 'rtl')
    x += max(html.clientWidth, body.clientWidth) - width
  return {
    width,
    height,
    x,
    y,
  }
}
var SCROLLBAR_MAX = 25
function getViewportRect(element, strategy) {
  const win = getWindow(element)
  const html = getDocumentElement(element)
  const visualViewport = win.visualViewport
  let width = html.clientWidth
  let height = html.clientHeight
  let x = 0
  let y = 0
  if (visualViewport) {
    width = visualViewport.width
    height = visualViewport.height
    const visualViewportBased = isWebKit()
    if (!visualViewportBased || (visualViewportBased && strategy === 'fixed')) {
      x = visualViewport.offsetLeft
      y = visualViewport.offsetTop
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html)
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument
    const body = doc.body
    const bodyStyles = getComputedStyle(body)
    const bodyMarginInline =
      doc.compatMode === 'CSS1Compat'
        ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0
        : 0
    const clippingStableScrollbarWidth = Math.abs(
      html.clientWidth - body.clientWidth - bodyMarginInline,
    )
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) width -= clippingStableScrollbarWidth
  } else if (windowScrollbarX <= SCROLLBAR_MAX) width += windowScrollbarX
  return {
    width,
    height,
    x,
    y,
  }
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed')
  const top = clientRect.top + element.clientTop
  const left = clientRect.left + element.clientLeft
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1)
  return {
    width: element.clientWidth * scale.x,
    height: element.clientHeight * scale.y,
    x: left * scale.x,
    y: top * scale.y,
  }
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect
  if (clippingAncestor === 'viewport') rect = getViewportRect(element, strategy)
  else if (clippingAncestor === 'document') rect = getDocumentRect(getDocumentElement(element))
  else if (isElement(clippingAncestor))
    rect = getInnerBoundingClientRect(clippingAncestor, strategy)
  else {
    const visualOffsets = getVisualOffsets(element)
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height,
    }
  }
  return rectToClientRect(rect)
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element)
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode))
    return false
  return (
    getComputedStyle$1(parentNode).position === 'fixed' ||
    hasFixedPositionAncestor(parentNode, stopNode)
  )
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element)
  if (cachedResult) return cachedResult
  let result = getOverflowAncestors(element, [], false).filter(
    (el) => isElement(el) && getNodeName(el) !== 'body',
  )
  let currentContainingBlockComputedStyle = null
  const elementIsFixed = getComputedStyle$1(element).position === 'fixed'
  let currentNode = elementIsFixed ? getParentNode(element) : element
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode)
    const currentNodeIsContaining = isContainingBlock(currentNode)
    if (!currentNodeIsContaining && computedStyle.position === 'fixed')
      currentContainingBlockComputedStyle = null
    if (
      elementIsFixed
        ? !currentNodeIsContaining && !currentContainingBlockComputedStyle
        : (!currentNodeIsContaining &&
            computedStyle.position === 'static' &&
            !!currentContainingBlockComputedStyle &&
            (currentContainingBlockComputedStyle.position === 'absolute' ||
              currentContainingBlockComputedStyle.position === 'fixed')) ||
          (isOverflowElement(currentNode) &&
            !currentNodeIsContaining &&
            hasFixedPositionAncestor(element, currentNode))
    )
      result = result.filter((ancestor) => ancestor !== currentNode)
    else currentContainingBlockComputedStyle = computedStyle
    currentNode = getParentNode(currentNode)
  }
  cache.set(element, result)
  return result
}
function getClippingRect(_ref) {
  let { element, boundary, rootBoundary, strategy } = _ref
  const clippingAncestors = [
    ...(boundary === 'clippingAncestors'
      ? isTopLayer(element)
        ? []
        : getClippingElementAncestors(element, this._c)
      : [].concat(boundary)),
    rootBoundary,
  ]
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy)
  let top = firstRect.top
  let right = firstRect.right
  let bottom = firstRect.bottom
  let left = firstRect.left
  for (let i = 1; i < clippingAncestors.length; i++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy)
    top = max(rect.top, top)
    right = min(rect.right, right)
    bottom = min(rect.bottom, bottom)
    left = max(rect.left, left)
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top,
  }
}
function getDimensions(element) {
  const { width, height } = getCssDimensions(element)
  return {
    width,
    height,
  }
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent)
  const documentElement = getDocumentElement(offsetParent)
  const isFixed = strategy === 'fixed'
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent)
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0,
  }
  const offsets = createCoords(0)
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement)
  }
  if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement))
      scroll = getNodeScroll(offsetParent)
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent)
      offsets.x = offsetRect.x + offsetParent.clientLeft
      offsets.y = offsetRect.y + offsetParent.clientTop
    } else if (documentElement) setLeftRTLScrollbarOffset()
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) setLeftRTLScrollbarOffset()
  const htmlOffset =
    documentElement && !isOffsetParentAnElement && !isFixed
      ? getHTMLOffset(documentElement, scroll)
      : createCoords(0)
  return {
    x: rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x,
    y: rect.top + scroll.scrollTop - offsets.y - htmlOffset.y,
    width: rect.width,
    height: rect.height,
  }
}
function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === 'static'
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === 'fixed') return null
  if (polyfill) return polyfill(element)
  let rawOffsetParent = element.offsetParent
  if (getDocumentElement(element) === rawOffsetParent)
    rawOffsetParent = rawOffsetParent.ownerDocument.body
  return rawOffsetParent
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element)
  if (isTopLayer(element)) return win
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element)
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) return svgOffsetParent
      svgOffsetParent = getParentNode(svgOffsetParent)
    }
    return win
  }
  let offsetParent = getTrueOffsetParent(element, polyfill)
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent))
    offsetParent = getTrueOffsetParent(offsetParent, polyfill)
  if (
    offsetParent &&
    isLastTraversableNode(offsetParent) &&
    isStaticPositioned(offsetParent) &&
    !isContainingBlock(offsetParent)
  )
    return win
  return offsetParent || getContainingBlock(element) || win
}
var getElementRects = async function (data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent
  const getDimensionsFn = this.getDimensions
  const floatingDimensions = await getDimensionsFn(data.floating)
  return {
    reference: getRectRelativeToOffsetParent(
      data.reference,
      await getOffsetParentFn(data.floating),
      data.strategy,
    ),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height,
    },
  }
}
function isRTL(element) {
  return getComputedStyle$1(element).direction === 'rtl'
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
  isRTL,
}
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height
}
function observeMove(element, onMove) {
  let io = null
  let timeoutId
  const root = getDocumentElement(element)
  function cleanup() {
    var _io
    clearTimeout(timeoutId)
    ;(_io = io) == null || _io.disconnect()
    io = null
  }
  function refresh(skip, threshold) {
    if (skip === void 0) skip = false
    if (threshold === void 0) threshold = 1
    cleanup()
    const elementRectForRootMargin = element.getBoundingClientRect()
    const { left, top, width, height } = elementRectForRootMargin
    if (!skip) onMove()
    if (!width || !height) return
    const insetTop = floor(top)
    const insetRight = floor(root.clientWidth - (left + width))
    const insetBottom = floor(root.clientHeight - (top + height))
    const insetLeft = floor(left)
    const options = {
      rootMargin:
        -insetTop + 'px ' + -insetRight + 'px ' + -insetBottom + 'px ' + -insetLeft + 'px',
      threshold: max(0, min(1, threshold)) || 1,
    }
    let isFirstUpdate = true
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio
      if (ratio !== threshold) {
        if (!isFirstUpdate) return refresh()
        if (!ratio)
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7)
          }, 1e3)
        else refresh(false, ratio)
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect()))
        refresh()
      isFirstUpdate = false
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        root: root.ownerDocument,
      })
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options)
    }
    io.observe(element)
  }
  refresh(true)
  return cleanup
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
  if (options === void 0) options = {}
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false,
  } = options
  const referenceEl = unwrapElement(reference)
  const ancestors =
    ancestorScroll || ancestorResize
      ? [
          ...(referenceEl ? getOverflowAncestors(referenceEl) : []),
          ...(floating ? getOverflowAncestors(floating) : []),
        ]
      : []
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener('scroll', update, { passive: true })
    ancestorResize && ancestor.addEventListener('resize', update)
  })
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null
  let reobserveFrame = -1
  let resizeObserver = null
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        resizeObserver.unobserve(floating)
        cancelAnimationFrame(reobserveFrame)
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver
          ;(_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating)
        })
      }
      update()
    })
    if (referenceEl && !animationFrame) resizeObserver.observe(referenceEl)
    if (floating) resizeObserver.observe(floating)
  }
  let frameId
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null
  if (animationFrame) frameLoop()
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference)
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) update()
    prevRefRect = nextRefRect
    frameId = requestAnimationFrame(frameLoop)
  }
  update()
  return () => {
    var _resizeObserver2
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener('scroll', update)
      ancestorResize && ancestor.removeEventListener('resize', update)
    })
    cleanupIo?.()
    ;(_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect()
    resizeObserver = null
    if (animationFrame) cancelAnimationFrame(frameId)
  }
}
/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
var offset$1 = offset$2
/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
var shift$1 = shift$2
/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
var flip$1 = flip$2
/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
var size$1 = size$2
/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
var hide$1 = hide$2
/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
var arrow$2 = arrow$3
/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
var limitShift$1 = limitShift$2
/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 */
var computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map()
  const mergedOptions = {
    platform,
    ...options,
  }
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache,
  }
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache,
  })
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@floating-ui+react-dom@2.1.8_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
var index = typeof document !== 'undefined' ? import_react.useLayoutEffect : function noop() {}
function deepEqual(a, b) {
  if (a === b) return true
  if (typeof a !== typeof b) return false
  if (typeof a === 'function' && a.toString() === b.toString()) return true
  let length
  let i
  let keys
  if (a && b && typeof a === 'object') {
    if (Array.isArray(a)) {
      length = a.length
      if (length !== b.length) return false
      for (i = length; i-- !== 0; ) if (!deepEqual(a[i], b[i])) return false
      return true
    }
    keys = Object.keys(a)
    length = keys.length
    if (length !== Object.keys(b).length) return false
    for (i = length; i-- !== 0; ) if (!{}.hasOwnProperty.call(b, keys[i])) return false
    for (i = length; i-- !== 0; ) {
      const key = keys[i]
      if (key === '_owner' && a.$$typeof) continue
      if (!deepEqual(a[key], b[key])) return false
    }
    return true
  }
  return a !== a && b !== b
}
function getDPR(element) {
  if (typeof window === 'undefined') return 1
  return (element.ownerDocument.defaultView || window).devicePixelRatio || 1
}
function roundByDPR(element, value) {
  const dpr = getDPR(element)
  return Math.round(value * dpr) / dpr
}
function useLatestRef(value) {
  const ref = import_react.useRef(value)
  index(() => {
    ref.current = value
  })
  return ref
}
/**
 * Provides data to position a floating element.
 * @see https://floating-ui.com/docs/useFloating
 */
function useFloating(options) {
  if (options === void 0) options = {}
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform,
    elements: { reference: externalReference, floating: externalFloating } = {},
    transform = true,
    whileElementsMounted,
    open,
  } = options
  const [data, setData] = import_react.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false,
  })
  const [latestMiddleware, setLatestMiddleware] = import_react.useState(middleware)
  if (!deepEqual(latestMiddleware, middleware)) setLatestMiddleware(middleware)
  const [_reference, _setReference] = import_react.useState(null)
  const [_floating, _setFloating] = import_react.useState(null)
  const setReference = import_react.useCallback((node) => {
    if (node !== referenceRef.current) {
      referenceRef.current = node
      _setReference(node)
    }
  }, [])
  const setFloating = import_react.useCallback((node) => {
    if (node !== floatingRef.current) {
      floatingRef.current = node
      _setFloating(node)
    }
  }, [])
  const referenceEl = externalReference || _reference
  const floatingEl = externalFloating || _floating
  const referenceRef = import_react.useRef(null)
  const floatingRef = import_react.useRef(null)
  const dataRef = import_react.useRef(data)
  const hasWhileElementsMounted = whileElementsMounted != null
  const whileElementsMountedRef = useLatestRef(whileElementsMounted)
  const platformRef = useLatestRef(platform)
  const openRef = useLatestRef(open)
  const update = import_react.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) return
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware,
    }
    if (platformRef.current) config.platform = platformRef.current
    computePosition(referenceRef.current, floatingRef.current, config).then((data) => {
      const fullData = {
        ...data,
        isPositioned: openRef.current !== false,
      }
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData
        import_react_dom.flushSync(() => {
          setData(fullData)
        })
      }
    })
  }, [latestMiddleware, placement, strategy, platformRef, openRef])
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false
      setData((data) => ({
        ...data,
        isPositioned: false,
      }))
    }
  }, [open])
  const isMountedRef = import_react.useRef(false)
  index(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])
  index(() => {
    if (referenceEl) referenceRef.current = referenceEl
    if (floatingEl) floatingRef.current = floatingEl
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current)
        return whileElementsMountedRef.current(referenceEl, floatingEl, update)
      update()
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted])
  const refs = import_react.useMemo(
    () => ({
      reference: referenceRef,
      floating: floatingRef,
      setReference,
      setFloating,
    }),
    [setReference, setFloating],
  )
  const elements = import_react.useMemo(
    () => ({
      reference: referenceEl,
      floating: floatingEl,
    }),
    [referenceEl, floatingEl],
  )
  const floatingStyles = import_react.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0,
    }
    if (!elements.floating) return initialStyles
    const x = roundByDPR(elements.floating, data.x)
    const y = roundByDPR(elements.floating, data.y)
    if (transform)
      return {
        ...initialStyles,
        transform: 'translate(' + x + 'px, ' + y + 'px)',
        ...(getDPR(elements.floating) >= 1.5 && { willChange: 'transform' }),
      }
    return {
      position: strategy,
      left: x,
      top: y,
    }
  }, [strategy, transform, elements.floating, data.x, data.y])
  return import_react.useMemo(
    () => ({
      ...data,
      update,
      refs,
      elements,
      floatingStyles,
    }),
    [data, update, refs, elements, floatingStyles],
  )
}
/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */
var arrow$1 = (options) => {
  function isRef(value) {
    return {}.hasOwnProperty.call(value, 'current')
  }
  return {
    name: 'arrow',
    options,
    fn(state) {
      const { element, padding } = typeof options === 'function' ? options(state) : options
      if (element && isRef(element)) {
        if (element.current != null)
          return arrow$2({
            element: element.current,
            padding,
          }).fn(state)
        return {}
      }
      if (element)
        return arrow$2({
          element,
          padding,
        }).fn(state)
      return {}
    },
  }
}
/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
var offset = (options, deps) => {
  const result = offset$1(options)
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps],
  }
}
/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
var shift = (options, deps) => {
  const result = shift$1(options)
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps],
  }
}
/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
var limitShift = (options, deps) => {
  return {
    fn: limitShift$1(options).fn,
    options: [options, deps],
  }
}
/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
var flip = (options, deps) => {
  const result = flip$1(options)
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps],
  }
}
/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
var size = (options, deps) => {
  const result = size$1(options)
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps],
  }
}
/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
var hide = (options, deps) => {
  const result = hide$1(options)
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps],
  }
}
/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */
var arrow = (options, deps) => {
  const result = arrow$1(options)
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps],
  }
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-arrow@1.1.7_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react@_e05f2c19a58a99fddf374207b5e3778c/node_modules/@radix-ui/react-arrow/dist/index.mjs
var NAME = 'Arrow'
var Arrow$1 = import_react.forwardRef((props, forwardedRef) => {
  const { children, width = 10, height = 5, ...arrowProps } = props
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.svg, {
    ...arrowProps,
    ref: forwardedRef,
    width,
    height,
    viewBox: '0 0 30 10',
    preserveAspectRatio: 'none',
    children: props.asChild
      ? children
      : /* @__PURE__ */ (0, import_jsx_runtime.jsx)('polygon', { points: '0,0 30,0 15,10' }),
  })
})
Arrow$1.displayName = NAME
var Root = Arrow$1
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-use-size@1.1.1_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-use-size/dist/index.mjs
function useSize(element) {
  const [size, setSize] = import_react.useState(void 0)
  useLayoutEffect2(() => {
    if (element) {
      setSize({
        width: element.offsetWidth,
        height: element.offsetHeight,
      })
      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) return
        if (!entries.length) return
        const entry = entries[0]
        let width
        let height
        if ('borderBoxSize' in entry) {
          const borderSizeEntry = entry['borderBoxSize']
          const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry
          width = borderSize['inlineSize']
          height = borderSize['blockSize']
        } else {
          width = element.offsetWidth
          height = element.offsetHeight
        }
        setSize({
          width,
          height,
        })
      })
      resizeObserver.observe(element, { box: 'border-box' })
      return () => resizeObserver.unobserve(element)
    } else setSize(void 0)
  }, [element])
  return size
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-popper@1.2.8_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react_13e0521d8aea7ebfbfb8bee1fb615c05/node_modules/@radix-ui/react-popper/dist/index.mjs
var POPPER_NAME = 'Popper'
var [createPopperContext, createPopperScope] = createContextScope(POPPER_NAME)
var [PopperProvider, usePopperContext] = createPopperContext(POPPER_NAME)
var Popper = (props) => {
  const { __scopePopper, children } = props
  const [anchor, setAnchor] = import_react.useState(null)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopperProvider, {
    scope: __scopePopper,
    anchor,
    onAnchorChange: setAnchor,
    children,
  })
}
Popper.displayName = POPPER_NAME
var ANCHOR_NAME = 'PopperAnchor'
var PopperAnchor = import_react.forwardRef((props, forwardedRef) => {
  const { __scopePopper, virtualRef, ...anchorProps } = props
  const context = usePopperContext(ANCHOR_NAME, __scopePopper)
  const ref = import_react.useRef(null)
  const composedRefs = useComposedRefs(forwardedRef, ref)
  const anchorRef = import_react.useRef(null)
  import_react.useEffect(() => {
    const previousAnchor = anchorRef.current
    anchorRef.current = virtualRef?.current || ref.current
    if (previousAnchor !== anchorRef.current) context.onAnchorChange(anchorRef.current)
  })
  return virtualRef
    ? null
    : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.div, {
        ...anchorProps,
        ref: composedRefs,
      })
})
PopperAnchor.displayName = ANCHOR_NAME
var CONTENT_NAME$1 = 'PopperContent'
var [PopperContentProvider, useContentContext] = createPopperContext(CONTENT_NAME$1)
var PopperContent = import_react.forwardRef((props, forwardedRef) => {
  const {
    __scopePopper,
    side = 'bottom',
    sideOffset = 0,
    align = 'center',
    alignOffset = 0,
    arrowPadding = 0,
    avoidCollisions = true,
    collisionBoundary = [],
    collisionPadding: collisionPaddingProp = 0,
    sticky = 'partial',
    hideWhenDetached = false,
    updatePositionStrategy = 'optimized',
    onPlaced,
    ...contentProps
  } = props
  const context = usePopperContext(CONTENT_NAME$1, __scopePopper)
  const [content, setContent] = import_react.useState(null)
  const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node))
  const [arrow$4, setArrow] = import_react.useState(null)
  const arrowSize = useSize(arrow$4)
  const arrowWidth = arrowSize?.width ?? 0
  const arrowHeight = arrowSize?.height ?? 0
  const desiredPlacement = side + (align !== 'center' ? '-' + align : '')
  const collisionPadding =
    typeof collisionPaddingProp === 'number'
      ? collisionPaddingProp
      : {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          ...collisionPaddingProp,
        }
  const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary]
  const hasExplicitBoundaries = boundary.length > 0
  const detectOverflowOptions = {
    padding: collisionPadding,
    boundary: boundary.filter(isNotNull),
    altBoundary: hasExplicitBoundaries,
  }
  const { refs, floatingStyles, placement, isPositioned, middlewareData } = useFloating({
    strategy: 'fixed',
    placement: desiredPlacement,
    whileElementsMounted: (...args) => {
      return autoUpdate(...args, { animationFrame: updatePositionStrategy === 'always' })
    },
    elements: { reference: context.anchor },
    middleware: [
      offset({
        mainAxis: sideOffset + arrowHeight,
        alignmentAxis: alignOffset,
      }),
      avoidCollisions &&
        shift({
          mainAxis: true,
          crossAxis: false,
          limiter: sticky === 'partial' ? limitShift() : void 0,
          ...detectOverflowOptions,
        }),
      avoidCollisions && flip({ ...detectOverflowOptions }),
      size({
        ...detectOverflowOptions,
        apply: ({ elements, rects, availableWidth, availableHeight }) => {
          const { width: anchorWidth, height: anchorHeight } = rects.reference
          const contentStyle = elements.floating.style
          contentStyle.setProperty('--radix-popper-available-width', `${availableWidth}px`)
          contentStyle.setProperty('--radix-popper-available-height', `${availableHeight}px`)
          contentStyle.setProperty('--radix-popper-anchor-width', `${anchorWidth}px`)
          contentStyle.setProperty('--radix-popper-anchor-height', `${anchorHeight}px`)
        },
      }),
      arrow$4 &&
        arrow({
          element: arrow$4,
          padding: arrowPadding,
        }),
      transformOrigin({
        arrowWidth,
        arrowHeight,
      }),
      hideWhenDetached &&
        hide({
          strategy: 'referenceHidden',
          ...detectOverflowOptions,
        }),
    ],
  })
  const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement)
  const handlePlaced = useCallbackRef(onPlaced)
  useLayoutEffect2(() => {
    if (isPositioned) handlePlaced?.()
  }, [isPositioned, handlePlaced])
  const arrowX = middlewareData.arrow?.x
  const arrowY = middlewareData.arrow?.y
  const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0
  const [contentZIndex, setContentZIndex] = import_react.useState()
  useLayoutEffect2(() => {
    if (content) setContentZIndex(window.getComputedStyle(content).zIndex)
  }, [content])
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    ref: refs.setFloating,
    'data-radix-popper-content-wrapper': '',
    style: {
      ...floatingStyles,
      transform: isPositioned ? floatingStyles.transform : 'translate(0, -200%)',
      minWidth: 'max-content',
      zIndex: contentZIndex,
      ['--radix-popper-transform-origin']: [
        middlewareData.transformOrigin?.x,
        middlewareData.transformOrigin?.y,
      ].join(' '),
      ...(middlewareData.hide?.referenceHidden && {
        visibility: 'hidden',
        pointerEvents: 'none',
      }),
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
        'data-side': placedSide,
        'data-align': placedAlign,
        ...contentProps,
        ref: composedRefs,
        style: {
          ...contentProps.style,
          animation: !isPositioned ? 'none' : void 0,
        },
      }),
    }),
  })
})
PopperContent.displayName = CONTENT_NAME$1
var ARROW_NAME$1 = 'PopperArrow'
var OPPOSITE_SIDE = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
}
var PopperArrow = import_react.forwardRef(function PopperArrow2(props, forwardedRef) {
  const { __scopePopper, ...arrowProps } = props
  const contentContext = useContentContext(ARROW_NAME$1, __scopePopper)
  const baseSide = OPPOSITE_SIDE[contentContext.placedSide]
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
    ref: contentContext.onArrowChange,
    style: {
      position: 'absolute',
      left: contentContext.arrowX,
      top: contentContext.arrowY,
      [baseSide]: 0,
      transformOrigin: {
        top: '',
        right: '0 0',
        bottom: 'center 0',
        left: '100% 0',
      }[contentContext.placedSide],
      transform: {
        top: 'translateY(100%)',
        right: 'translateY(50%) rotate(90deg) translateX(-50%)',
        bottom: `rotate(180deg)`,
        left: 'translateY(50%) rotate(-90deg) translateX(50%)',
      }[contentContext.placedSide],
      visibility: contentContext.shouldHideArrow ? 'hidden' : void 0,
    },
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
      ...arrowProps,
      ref: forwardedRef,
      style: {
        ...arrowProps.style,
        display: 'block',
      },
    }),
  })
})
PopperArrow.displayName = ARROW_NAME$1
function isNotNull(value) {
  return value !== null
}
var transformOrigin = (options) => ({
  name: 'transformOrigin',
  options,
  fn(data) {
    const { placement, rects, middlewareData } = data
    const isArrowHidden = middlewareData.arrow?.centerOffset !== 0
    const arrowWidth = isArrowHidden ? 0 : options.arrowWidth
    const arrowHeight = isArrowHidden ? 0 : options.arrowHeight
    const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement)
    const noArrowAlign = {
      start: '0%',
      center: '50%',
      end: '100%',
    }[placedAlign]
    const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2
    const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2
    let x = ''
    let y = ''
    if (placedSide === 'bottom') {
      x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`
      y = `${-arrowHeight}px`
    } else if (placedSide === 'top') {
      x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`
      y = `${rects.floating.height + arrowHeight}px`
    } else if (placedSide === 'right') {
      x = `${-arrowHeight}px`
      y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`
    } else if (placedSide === 'left') {
      x = `${rects.floating.width + arrowHeight}px`
      y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`
    }
    return {
      data: {
        x,
        y,
      },
    }
  },
})
function getSideAndAlignFromPlacement(placement) {
  const [side, align = 'center'] = placement.split('-')
  return [side, align]
}
var Root2 = Popper
var Anchor = PopperAnchor
var Content = PopperContent
var Arrow = PopperArrow
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-tooltip@1.2.8_@types+react-dom@19.2.3_@types+react@19.2.14__@types+reac_9074d9fb06315b089b2bee17c4c65951/node_modules/@radix-ui/react-tooltip/dist/index.mjs
var [createTooltipContext, createTooltipScope] = createContextScope('Tooltip', [createPopperScope])
var usePopperScope = createPopperScope()
var PROVIDER_NAME = 'TooltipProvider'
var DEFAULT_DELAY_DURATION = 700
var TOOLTIP_OPEN = 'tooltip.open'
var [TooltipProviderContextProvider, useTooltipProviderContext] =
  createTooltipContext(PROVIDER_NAME)
var TooltipProvider$1 = (props) => {
  const {
    __scopeTooltip,
    delayDuration = DEFAULT_DELAY_DURATION,
    skipDelayDuration = 300,
    disableHoverableContent = false,
    children,
  } = props
  const isOpenDelayedRef = import_react.useRef(true)
  const isPointerInTransitRef = import_react.useRef(false)
  const skipDelayTimerRef = import_react.useRef(0)
  import_react.useEffect(() => {
    const skipDelayTimer = skipDelayTimerRef.current
    return () => window.clearTimeout(skipDelayTimer)
  }, [])
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProviderContextProvider, {
    scope: __scopeTooltip,
    isOpenDelayedRef,
    delayDuration,
    onOpen: import_react.useCallback(() => {
      window.clearTimeout(skipDelayTimerRef.current)
      isOpenDelayedRef.current = false
    }, []),
    onClose: import_react.useCallback(() => {
      window.clearTimeout(skipDelayTimerRef.current)
      skipDelayTimerRef.current = window.setTimeout(
        () => (isOpenDelayedRef.current = true),
        skipDelayDuration,
      )
    }, [skipDelayDuration]),
    isPointerInTransitRef,
    onPointerInTransitChange: import_react.useCallback((inTransit) => {
      isPointerInTransitRef.current = inTransit
    }, []),
    disableHoverableContent,
    children,
  })
}
TooltipProvider$1.displayName = PROVIDER_NAME
var TOOLTIP_NAME = 'Tooltip'
var [TooltipContextProvider, useTooltipContext] = createTooltipContext(TOOLTIP_NAME)
var Tooltip$1 = (props) => {
  const {
    __scopeTooltip,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    disableHoverableContent: disableHoverableContentProp,
    delayDuration: delayDurationProp,
  } = props
  const providerContext = useTooltipProviderContext(TOOLTIP_NAME, props.__scopeTooltip)
  const popperScope = usePopperScope(__scopeTooltip)
  const [trigger, setTrigger] = import_react.useState(null)
  const contentId = useId()
  const openTimerRef = import_react.useRef(0)
  const disableHoverableContent =
    disableHoverableContentProp ?? providerContext.disableHoverableContent
  const delayDuration = delayDurationProp ?? providerContext.delayDuration
  const wasOpenDelayedRef = import_react.useRef(false)
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: (open2) => {
      if (open2) {
        providerContext.onOpen()
        document.dispatchEvent(new CustomEvent(TOOLTIP_OPEN))
      } else providerContext.onClose()
      onOpenChange?.(open2)
    },
    caller: TOOLTIP_NAME,
  })
  const stateAttribute = import_react.useMemo(() => {
    return open ? (wasOpenDelayedRef.current ? 'delayed-open' : 'instant-open') : 'closed'
  }, [open])
  const handleOpen = import_react.useCallback(() => {
    window.clearTimeout(openTimerRef.current)
    openTimerRef.current = 0
    wasOpenDelayedRef.current = false
    setOpen(true)
  }, [setOpen])
  const handleClose = import_react.useCallback(() => {
    window.clearTimeout(openTimerRef.current)
    openTimerRef.current = 0
    setOpen(false)
  }, [setOpen])
  const handleDelayedOpen = import_react.useCallback(() => {
    window.clearTimeout(openTimerRef.current)
    openTimerRef.current = window.setTimeout(() => {
      wasOpenDelayedRef.current = true
      setOpen(true)
      openTimerRef.current = 0
    }, delayDuration)
  }, [delayDuration, setOpen])
  import_react.useEffect(() => {
    return () => {
      if (openTimerRef.current) {
        window.clearTimeout(openTimerRef.current)
        openTimerRef.current = 0
      }
    }
  }, [])
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
    ...popperScope,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContextProvider, {
      scope: __scopeTooltip,
      contentId,
      open,
      stateAttribute,
      trigger,
      onTriggerChange: setTrigger,
      onTriggerEnter: import_react.useCallback(() => {
        if (providerContext.isOpenDelayedRef.current) handleDelayedOpen()
        else handleOpen()
      }, [providerContext.isOpenDelayedRef, handleDelayedOpen, handleOpen]),
      onTriggerLeave: import_react.useCallback(() => {
        if (disableHoverableContent) handleClose()
        else {
          window.clearTimeout(openTimerRef.current)
          openTimerRef.current = 0
        }
      }, [handleClose, disableHoverableContent]),
      onOpen: handleOpen,
      onClose: handleClose,
      disableHoverableContent,
      children,
    }),
  })
}
Tooltip$1.displayName = TOOLTIP_NAME
var TRIGGER_NAME = 'TooltipTrigger'
var TooltipTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
  const { __scopeTooltip, ...triggerProps } = props
  const context = useTooltipContext(TRIGGER_NAME, __scopeTooltip)
  const providerContext = useTooltipProviderContext(TRIGGER_NAME, __scopeTooltip)
  const popperScope = usePopperScope(__scopeTooltip)
  const composedRefs = useComposedRefs(
    forwardedRef,
    import_react.useRef(null),
    context.onTriggerChange,
  )
  const isPointerDownRef = import_react.useRef(false)
  const hasPointerMoveOpenedRef = import_react.useRef(false)
  const handlePointerUp = import_react.useCallback(() => (isPointerDownRef.current = false), [])
  import_react.useEffect(() => {
    return () => document.removeEventListener('pointerup', handlePointerUp)
  }, [handlePointerUp])
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, {
    asChild: true,
    ...popperScope,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.button, {
      'aria-describedby': context.open ? context.contentId : void 0,
      'data-state': context.stateAttribute,
      ...triggerProps,
      ref: composedRefs,
      onPointerMove: composeEventHandlers(props.onPointerMove, (event) => {
        if (event.pointerType === 'touch') return
        if (!hasPointerMoveOpenedRef.current && !providerContext.isPointerInTransitRef.current) {
          context.onTriggerEnter()
          hasPointerMoveOpenedRef.current = true
        }
      }),
      onPointerLeave: composeEventHandlers(props.onPointerLeave, () => {
        context.onTriggerLeave()
        hasPointerMoveOpenedRef.current = false
      }),
      onPointerDown: composeEventHandlers(props.onPointerDown, () => {
        if (context.open) context.onClose()
        isPointerDownRef.current = true
        document.addEventListener('pointerup', handlePointerUp, { once: true })
      }),
      onFocus: composeEventHandlers(props.onFocus, () => {
        if (!isPointerDownRef.current) context.onOpen()
      }),
      onBlur: composeEventHandlers(props.onBlur, context.onClose),
      onClick: composeEventHandlers(props.onClick, context.onClose),
    }),
  })
})
TooltipTrigger$1.displayName = TRIGGER_NAME
var PORTAL_NAME = 'TooltipPortal'
var [PortalProvider, usePortalContext] = createTooltipContext(PORTAL_NAME, { forceMount: void 0 })
var TooltipPortal = (props) => {
  const { __scopeTooltip, forceMount, children, container } = props
  const context = useTooltipContext(PORTAL_NAME, __scopeTooltip)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalProvider, {
    scope: __scopeTooltip,
    forceMount,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
      present: forceMount || context.open,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
        asChild: true,
        container,
        children,
      }),
    }),
  })
}
TooltipPortal.displayName = PORTAL_NAME
var CONTENT_NAME = 'TooltipContent'
var TooltipContent$1 = import_react.forwardRef((props, forwardedRef) => {
  const portalContext = usePortalContext(CONTENT_NAME, props.__scopeTooltip)
  const { forceMount = portalContext.forceMount, side = 'top', ...contentProps } = props
  const context = useTooltipContext(CONTENT_NAME, props.__scopeTooltip)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
    present: forceMount || context.open,
    children: context.disableHoverableContent
      ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContentImpl, {
          side,
          ...contentProps,
          ref: forwardedRef,
        })
      : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContentHoverable, {
          side,
          ...contentProps,
          ref: forwardedRef,
        }),
  })
})
var TooltipContentHoverable = import_react.forwardRef((props, forwardedRef) => {
  const context = useTooltipContext(CONTENT_NAME, props.__scopeTooltip)
  const providerContext = useTooltipProviderContext(CONTENT_NAME, props.__scopeTooltip)
  const ref = import_react.useRef(null)
  const composedRefs = useComposedRefs(forwardedRef, ref)
  const [pointerGraceArea, setPointerGraceArea] = import_react.useState(null)
  const { trigger, onClose } = context
  const content = ref.current
  const { onPointerInTransitChange } = providerContext
  const handleRemoveGraceArea = import_react.useCallback(() => {
    setPointerGraceArea(null)
    onPointerInTransitChange(false)
  }, [onPointerInTransitChange])
  const handleCreateGraceArea = import_react.useCallback(
    (event, hoverTarget) => {
      const currentTarget = event.currentTarget
      const exitPoint = {
        x: event.clientX,
        y: event.clientY,
      }
      const paddedExitPoints = getPaddedExitPoints(
        exitPoint,
        getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect()),
      )
      const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect())
      setPointerGraceArea(getHull([...paddedExitPoints, ...hoverTargetPoints]))
      onPointerInTransitChange(true)
    },
    [onPointerInTransitChange],
  )
  import_react.useEffect(() => {
    return () => handleRemoveGraceArea()
  }, [handleRemoveGraceArea])
  import_react.useEffect(() => {
    if (trigger && content) {
      const handleTriggerLeave = (event) => handleCreateGraceArea(event, content)
      const handleContentLeave = (event) => handleCreateGraceArea(event, trigger)
      trigger.addEventListener('pointerleave', handleTriggerLeave)
      content.addEventListener('pointerleave', handleContentLeave)
      return () => {
        trigger.removeEventListener('pointerleave', handleTriggerLeave)
        content.removeEventListener('pointerleave', handleContentLeave)
      }
    }
  }, [trigger, content, handleCreateGraceArea, handleRemoveGraceArea])
  import_react.useEffect(() => {
    if (pointerGraceArea) {
      const handleTrackPointerGrace = (event) => {
        const target = event.target
        const pointerPosition = {
          x: event.clientX,
          y: event.clientY,
        }
        const hasEnteredTarget = trigger?.contains(target) || content?.contains(target)
        const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, pointerGraceArea)
        if (hasEnteredTarget) handleRemoveGraceArea()
        else if (isPointerOutsideGraceArea) {
          handleRemoveGraceArea()
          onClose()
        }
      }
      document.addEventListener('pointermove', handleTrackPointerGrace)
      return () => document.removeEventListener('pointermove', handleTrackPointerGrace)
    }
  }, [trigger, content, pointerGraceArea, onClose, handleRemoveGraceArea])
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContentImpl, {
    ...props,
    ref: composedRefs,
  })
})
var [VisuallyHiddenContentContextProvider, useVisuallyHiddenContentContext] = createTooltipContext(
  TOOLTIP_NAME,
  { isInside: false },
)
var Slottable = /* @__PURE__ */ createSlottable('TooltipContent')
var TooltipContentImpl = import_react.forwardRef((props, forwardedRef) => {
  const {
    __scopeTooltip,
    children,
    'aria-label': ariaLabel,
    onEscapeKeyDown,
    onPointerDownOutside,
    ...contentProps
  } = props
  const context = useTooltipContext(CONTENT_NAME, __scopeTooltip)
  const popperScope = usePopperScope(__scopeTooltip)
  const { onClose } = context
  import_react.useEffect(() => {
    document.addEventListener(TOOLTIP_OPEN, onClose)
    return () => document.removeEventListener(TOOLTIP_OPEN, onClose)
  }, [onClose])
  import_react.useEffect(() => {
    if (context.trigger) {
      const handleScroll = (event) => {
        if (event.target?.contains(context.trigger)) onClose()
      }
      window.addEventListener('scroll', handleScroll, { capture: true })
      return () => window.removeEventListener('scroll', handleScroll, { capture: true })
    }
  }, [context.trigger, onClose])
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DismissableLayer, {
    asChild: true,
    disableOutsidePointerEvents: false,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside: (event) => event.preventDefault(),
    onDismiss: onClose,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
      'data-state': context.stateAttribute,
      ...popperScope,
      ...contentProps,
      ref: forwardedRef,
      style: {
        ...contentProps.style,
        '--radix-tooltip-content-transform-origin': 'var(--radix-popper-transform-origin)',
        '--radix-tooltip-content-available-width': 'var(--radix-popper-available-width)',
        '--radix-tooltip-content-available-height': 'var(--radix-popper-available-height)',
        '--radix-tooltip-trigger-width': 'var(--radix-popper-anchor-width)',
        '--radix-tooltip-trigger-height': 'var(--radix-popper-anchor-height)',
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slottable, { children }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisuallyHiddenContentContextProvider, {
          scope: __scopeTooltip,
          isInside: true,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
            id: context.contentId,
            role: 'tooltip',
            children: ariaLabel || children,
          }),
        }),
      ],
    }),
  })
})
TooltipContent$1.displayName = CONTENT_NAME
var ARROW_NAME = 'TooltipArrow'
var TooltipArrow = import_react.forwardRef((props, forwardedRef) => {
  const { __scopeTooltip, ...arrowProps } = props
  const popperScope = usePopperScope(__scopeTooltip)
  return useVisuallyHiddenContentContext(ARROW_NAME, __scopeTooltip).isInside
    ? null
    : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, {
        ...popperScope,
        ...arrowProps,
        ref: forwardedRef,
      })
})
TooltipArrow.displayName = ARROW_NAME
function getExitSideFromRect(point, rect) {
  const top = Math.abs(rect.top - point.y)
  const bottom = Math.abs(rect.bottom - point.y)
  const right = Math.abs(rect.right - point.x)
  const left = Math.abs(rect.left - point.x)
  switch (Math.min(top, bottom, right, left)) {
    case left:
      return 'left'
    case right:
      return 'right'
    case top:
      return 'top'
    case bottom:
      return 'bottom'
    default:
      throw new Error('unreachable')
  }
}
function getPaddedExitPoints(exitPoint, exitSide, padding = 5) {
  const paddedExitPoints = []
  switch (exitSide) {
    case 'top':
      paddedExitPoints.push(
        {
          x: exitPoint.x - padding,
          y: exitPoint.y + padding,
        },
        {
          x: exitPoint.x + padding,
          y: exitPoint.y + padding,
        },
      )
      break
    case 'bottom':
      paddedExitPoints.push(
        {
          x: exitPoint.x - padding,
          y: exitPoint.y - padding,
        },
        {
          x: exitPoint.x + padding,
          y: exitPoint.y - padding,
        },
      )
      break
    case 'left':
      paddedExitPoints.push(
        {
          x: exitPoint.x + padding,
          y: exitPoint.y - padding,
        },
        {
          x: exitPoint.x + padding,
          y: exitPoint.y + padding,
        },
      )
      break
    case 'right':
      paddedExitPoints.push(
        {
          x: exitPoint.x - padding,
          y: exitPoint.y - padding,
        },
        {
          x: exitPoint.x - padding,
          y: exitPoint.y + padding,
        },
      )
      break
  }
  return paddedExitPoints
}
function getPointsFromRect(rect) {
  const { top, right, bottom, left } = rect
  return [
    {
      x: left,
      y: top,
    },
    {
      x: right,
      y: top,
    },
    {
      x: right,
      y: bottom,
    },
    {
      x: left,
      y: bottom,
    },
  ]
}
function isPointInPolygon(point, polygon) {
  const { x, y } = point
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const ii = polygon[i]
    const jj = polygon[j]
    const xi = ii.x
    const yi = ii.y
    const xj = jj.x
    const yj = jj.y
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}
function getHull(points) {
  const newPoints = points.slice()
  newPoints.sort((a, b) => {
    if (a.x < b.x) return -1
    else if (a.x > b.x) return 1
    else if (a.y < b.y) return -1
    else if (a.y > b.y) return 1
    else return 0
  })
  return getHullPresorted(newPoints)
}
function getHullPresorted(points) {
  if (points.length <= 1) return points.slice()
  const upperHull = []
  for (let i = 0; i < points.length; i++) {
    const p = points[i]
    while (upperHull.length >= 2) {
      const q = upperHull[upperHull.length - 1]
      const r = upperHull[upperHull.length - 2]
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) upperHull.pop()
      else break
    }
    upperHull.push(p)
  }
  upperHull.pop()
  const lowerHull = []
  for (let i = points.length - 1; i >= 0; i--) {
    const p = points[i]
    while (lowerHull.length >= 2) {
      const q = lowerHull[lowerHull.length - 1]
      const r = lowerHull[lowerHull.length - 2]
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) lowerHull.pop()
      else break
    }
    lowerHull.push(p)
  }
  lowerHull.pop()
  if (
    upperHull.length === 1 &&
    lowerHull.length === 1 &&
    upperHull[0].x === lowerHull[0].x &&
    upperHull[0].y === lowerHull[0].y
  )
    return upperHull
  else return upperHull.concat(lowerHull)
}
var Provider = TooltipProvider$1
var Root3 = Tooltip$1
var Trigger = TooltipTrigger$1
var Content2 = TooltipContent$1
//#endregion
//#region src/components/ui/tooltip.tsx
var TooltipProvider = Provider
var Tooltip = Root3
var TooltipTrigger = Trigger
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
    'data-uid': 'src/components/ui/tooltip.tsx:17:3',
    'data-prohibitions': '[editContent]',
    ref,
    sideOffset,
    className: cn(
      'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]',
      className,
    ),
    ...props,
  }),
)
TooltipContent.displayName = Content2.displayName
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-slot@1.2.4_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-slot/dist/index.mjs
var REACT_LAZY_TYPE = Symbol.for('react.lazy')
var use = import_react[' use '.trim().toString()]
function isPromiseLike(value) {
  return typeof value === 'object' && value !== null && 'then' in value
}
function isLazyComponent(element) {
  return (
    element != null &&
    typeof element === 'object' &&
    '$$typeof' in element &&
    element.$$typeof === REACT_LAZY_TYPE &&
    '_payload' in element &&
    isPromiseLike(element._payload)
  )
}
/* @__NO_SIDE_EFFECTS__ */
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName)
  const Slot2 = import_react.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props
    if (isLazyComponent(children) && typeof use === 'function') children = use(children._payload)
    const childrenArray = import_react.Children.toArray(children)
    const slottable = childrenArray.find(isSlottable)
    if (slottable) {
      const newElement = slottable.props.children
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (import_react.Children.count(newElement) > 1) return import_react.Children.only(null)
          return import_react.isValidElement(newElement) ? newElement.props.children : null
        } else return child
      })
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotClone, {
        ...slotProps,
        ref: forwardedRef,
        children: import_react.isValidElement(newElement)
          ? import_react.cloneElement(newElement, void 0, newChildren)
          : null,
      })
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotClone, {
      ...slotProps,
      ref: forwardedRef,
      children,
    })
  })
  Slot2.displayName = `${ownerName}.Slot`
  return Slot2
}
var Slot = /* @__PURE__ */ createSlot('Slot')
/* @__NO_SIDE_EFFECTS__ */
function createSlotClone(ownerName) {
  const SlotClone = import_react.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props
    if (isLazyComponent(children) && typeof use === 'function') children = use(children._payload)
    if (import_react.isValidElement(children)) {
      const childrenRef = getElementRef(children)
      const props2 = mergeProps(slotProps, children.props)
      if (children.type !== import_react.Fragment)
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef
      return import_react.cloneElement(children, props2)
    }
    return import_react.Children.count(children) > 1 ? import_react.Children.only(null) : null
  })
  SlotClone.displayName = `${ownerName}.SlotClone`
  return SlotClone
}
var SLOTTABLE_IDENTIFIER = Symbol('radix.slottable')
function isSlottable(child) {
  return (
    import_react.isValidElement(child) &&
    typeof child.type === 'function' &&
    '__radixId' in child.type &&
    child.type.__radixId === SLOTTABLE_IDENTIFIER
  )
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps }
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName]
    const childPropValue = childProps[propName]
    if (/^on[A-Z]/.test(propName)) {
      if (slotPropValue && childPropValue)
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args)
          slotPropValue(...args)
          return result
        }
      else if (slotPropValue) overrideProps[propName] = slotPropValue
    } else if (propName === 'style')
      overrideProps[propName] = {
        ...slotPropValue,
        ...childPropValue,
      }
    else if (propName === 'className')
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ')
  }
  return {
    ...slotProps,
    ...overrideProps,
  }
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, 'ref')?.get
  let mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning
  if (mayWarn) return element.ref
  getter = Object.getOwnPropertyDescriptor(element, 'ref')?.get
  mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning
  if (mayWarn) return element.props.ref
  return element.props.ref || element.ref
}
//#endregion
//#region src/components/ui/button.tsx
var buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'text-foreground hover:bg-accent hover:text-accent-foreground',
        link: 'text-foreground underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)
var Button = import_react.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : 'button', {
      'data-uid': 'src/components/ui/button.tsx:44:7',
      'data-prohibitions': '[editContent]',
      className: cn(
        buttonVariants({
          variant,
          size,
          className,
        }),
      ),
      ref,
      ...props,
    })
  },
)
Button.displayName = 'Button'
//#endregion
//#region src/components/ui/input.tsx
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('input', {
    'data-uid': 'src/components/ui/input.tsx:9:7',
    'data-prohibitions': '[editContent]',
    type,
    className: cn(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      className,
    ),
    ref,
    ...props,
  })
})
Input.displayName = 'Input'
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-primitive@2.1.4_@types+react-dom@19.2.3_@types+react@19.2.14__@types+re_0243fb2db8a1fb85ca77b8d9e5c2d650/node_modules/@radix-ui/react-primitive/dist/index.mjs
var Primitive = [
  'a',
  'button',
  'div',
  'form',
  'h2',
  'h3',
  'img',
  'input',
  'label',
  'li',
  'nav',
  'ol',
  'p',
  'select',
  'span',
  'svg',
  'ul',
].reduce((primitive, node) => {
  const Slot = /* @__PURE__ */ createSlot(`Primitive.${node}`)
  const Node = import_react.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props
    const Comp = asChild ? Slot : node
    if (typeof window !== 'undefined') window[Symbol.for('radix-ui')] = true
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, {
      ...primitiveProps,
      ref: forwardedRef,
    })
  })
  Node.displayName = `Primitive.${node}`
  return {
    ...primitive,
    [node]: Node,
  }
}, {})
//#endregion
export {
  dispatchDiscreteCustomEvent as A,
  Navigate as B,
  Portal as C,
  Root$2 as D,
  DismissableLayer as E,
  composeRefs as F,
  useNavigate as G,
  Route as H,
  useComposedRefs as I,
  require_react as J,
  __vitePreload as K,
  composeEventHandlers as L,
  createContext2 as M,
  createContextScope as N,
  useCallbackRef as O,
  require_jsx_runtime as P,
  BrowserRouter as R,
  Presence as S,
  Branch as T,
  Routes as U,
  Outlet as V,
  useLocation as W,
  __toESM as X,
  __commonJSMin as Y,
  X as _,
  Tooltip as a,
  VisuallyHidden as b,
  TooltipTrigger as c,
  Content as d,
  Root2 as f,
  cn as g,
  useId as h,
  Slot as i,
  createSlot$1 as j,
  Primitive$1 as k,
  Anchor as l,
  useSize as m,
  Input as n,
  TooltipContent as o,
  createPopperScope as p,
  require_react_dom as q,
  Button as r,
  TooltipProvider as s,
  Primitive as t,
  Arrow as u,
  createLucideIcon as v,
  useLayoutEffect2 as w,
  useControllableState as x,
  cva as y,
  Link as z,
}

//# sourceMappingURL=dist-zdF_4_x7.js.map
