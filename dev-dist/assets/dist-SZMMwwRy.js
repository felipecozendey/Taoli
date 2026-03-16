import { I as useComposedRefs, J as require_react, L as composeEventHandlers, N as createContextScope, O as useCallbackRef, P as require_jsx_runtime, X as __toESM, h as useId, j as createSlot, k as Primitive, v as createLucideIcon, x as useControllableState } from "./dist-zdF_4_x7.js";
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-collection@1.1.7_@types+react-dom@19.2.3_@types+react@19.2.14__@types+r_161926fa2509d0b7370b60b8bb4eb8b0/node_modules/@radix-ui/react-collection/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function createCollection(name) {
	const PROVIDER_NAME = name + "CollectionProvider";
	const [createCollectionContext, createCollectionScope] = createContextScope(PROVIDER_NAME);
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
	const CollectionSlotImpl = createSlot(COLLECTION_SLOT_NAME);
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
	const CollectionItemSlotImpl = createSlot(ITEM_SLOT_NAME);
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
//#endregion
//#region src/contexts/AuthContext.tsx
var AuthContext = (0, import_react.createContext)(null);
var MOCK_USERS = {
	ADMIN: {
		id: "admin-1",
		name: "Master Admin",
		email: "admin@system.com",
		role: "ADMIN",
		avatarUrl: "https://img.usecurling.com/i?q=admin&shape=fill&color=gray"
	},
	PROFESSIONAL: {
		id: "prof-1",
		name: "Dra. Ana Silva",
		email: "ana.silva@clinica.com",
		role: "PROFESSIONAL",
		avatarUrl: "https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1"
	},
	CLIENT: {
		id: "client-1",
		name: "Carlos Mendes",
		email: "carlos@email.com",
		role: "CLIENT",
		avatarUrl: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=2"
	}
};
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const storedUser = localStorage.getItem("saas_user");
		if (storedUser) setUser(JSON.parse(storedUser));
		setIsLoading(false);
	}, []);
	const login = (role) => {
		const selectedUser = MOCK_USERS[role];
		setUser(selectedUser);
		localStorage.setItem("saas_user", JSON.stringify(selectedUser));
	};
	const logout = () => {
		setUser(null);
		localStorage.removeItem("saas_user");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		"data-uid": "src/contexts/AuthContext.tsx:71:5",
		"data-prohibitions": "[editContent]",
		value: {
			user,
			isLoading,
			login,
			logout
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
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(GROUP_NAME, [createCollectionScope]);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = import_react.forwardRef((props, forwardedRef) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, {
		scope: props.__scopeRovingFocusGroup,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
			scope: props.__scopeRovingFocusGroup,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RovingFocusGroupImpl, {
				...props,
				ref: forwardedRef
			})
		})
	});
});
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRovingFocusGroup, orientation, loop = false, dir, currentTabStopId: currentTabStopIdProp, defaultCurrentTabStopId, onCurrentTabStopIdChange, onEntryFocus, preventScrollOnEntryFocus = false, ...groupProps } = props;
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const direction = useDirection(dir);
	const [currentTabStopId, setCurrentTabStopId] = useControllableState({
		prop: currentTabStopIdProp,
		defaultProp: defaultCurrentTabStopId ?? null,
		onChange: onCurrentTabStopIdChange,
		caller: GROUP_NAME
	});
	const [isTabbingBackOut, setIsTabbingBackOut] = import_react.useState(false);
	const handleEntryFocus = useCallbackRef(onEntryFocus);
	const getItems = useCollection(__scopeRovingFocusGroup);
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
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
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
						focusFirst([
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
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRovingFocusGroup, focusable = true, active = false, tabStopId, children, ...itemProps } = props;
	const autoId = useId();
	const id = tabStopId || autoId;
	const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
	const isCurrentTabStop = context.currentTabStopId === id;
	const getItems = useCollection(__scopeRovingFocusGroup);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.ItemSlot, {
		scope: __scopeRovingFocusGroup,
		id,
		focusable,
		active,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
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
						candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
					}
					setTimeout(() => focusFirst(candidateNodes));
				}
			}),
			children: typeof children === "function" ? children({
				isCurrentTabStop,
				hasTabStop: currentTabStopId != null
			}) : children
		})
	});
});
RovingFocusGroupItem.displayName = ITEM_NAME;
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
function focusFirst(candidates, preventScroll = false) {
	const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
	for (const candidate of candidates) {
		if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
		candidate.focus({ preventScroll });
		if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
	}
}
function wrapArray(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
//#endregion
export { AuthProvider as a, createCollection as c, useDirection as i, Root as n, useAuth as o, createRovingFocusGroupScope as r, Sparkles as s, Item as t };

//# sourceMappingURL=dist-SZMMwwRy.js.map