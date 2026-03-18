import { B as CardTitle, I as Card, It as __toESM, L as CardContent, N as useDirection, Nt as require_react, Q as cn, R as CardDescription, St as composeEventHandlers, V as Button, Z as useId, _t as createCollection, bt as require_jsx_runtime, ct as Presence, ht as Primitive, n as DashboardHeader, nt as createLucideIcon, st as useControllableState, t as PageContent, tt as Check, ut as useLayoutEffect2, xt as useComposedRefs, yt as createContextScope, z as CardHeader } from "./PageContent-cRXQOFdU.js";
import { t as Flame } from "./flame-Seuu1nWo.js";
import { J as TabsContent, K as Badge, Q as Target, W as Progress, X as TabsTrigger, Y as TabsList, it as ChevronDown, ot as Activity, q as Tabs, tt as Plus } from "./index-DLXlA1p9.js";
import { t as Checkbox } from "./checkbox-Ce-5xfTK.js";
var Droplets = createLucideIcon("droplets", [["path", {
	d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
	key: "1ptgy4"
}], ["path", {
	d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
	key: "1sl1rz"
}]]);
var ShoppingCart = createLucideIcon("shopping-cart", [
	["circle", {
		cx: "8",
		cy: "21",
		r: "1",
		key: "jimo8o"
	}],
	["circle", {
		cx: "19",
		cy: "21",
		r: "1",
		key: "13723u"
	}],
	["path", {
		d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
		key: "9zh506"
	}]
]);
var Utensils = createLucideIcon("utensils", [
	["path", {
		d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",
		key: "cjf0a3"
	}],
	["path", {
		d: "M7 2v20",
		key: "1473qp"
	}],
	["path", {
		d: "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",
		key: "j28e5"
	}]
]);
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-collapsible@1.1.12_@types+react-dom@19.2.3_@types+react@19.2.14__@types_10a2c6d0ac3bcc7422bd3020fe61e076/node_modules/@radix-ui/react-collapsible/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var COLLAPSIBLE_NAME = "Collapsible";
var [createCollapsibleContext, createCollapsibleScope] = createContextScope(COLLAPSIBLE_NAME);
var [CollapsibleProvider, useCollapsibleContext] = createCollapsibleContext(COLLAPSIBLE_NAME);
var Collapsible = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCollapsible, open: openProp, defaultOpen, disabled, onOpenChange, ...collapsibleProps } = props;
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen ?? false,
		onChange: onOpenChange,
		caller: COLLAPSIBLE_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleProvider, {
		scope: __scopeCollapsible,
		disabled,
		contentId: useId(),
		open,
		onOpenToggle: import_react.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			"data-state": getState$1(open),
			"data-disabled": disabled ? "" : void 0,
			...collapsibleProps,
			ref: forwardedRef
		})
	});
});
Collapsible.displayName = COLLAPSIBLE_NAME;
var TRIGGER_NAME$1 = "CollapsibleTrigger";
var CollapsibleTrigger = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCollapsible, ...triggerProps } = props;
	const context = useCollapsibleContext(TRIGGER_NAME$1, __scopeCollapsible);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		"aria-controls": context.contentId,
		"aria-expanded": context.open || false,
		"data-state": getState$1(context.open),
		"data-disabled": context.disabled ? "" : void 0,
		disabled: context.disabled,
		...triggerProps,
		ref: forwardedRef,
		onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
	});
});
CollapsibleTrigger.displayName = TRIGGER_NAME$1;
var CONTENT_NAME$1 = "CollapsibleContent";
var CollapsibleContent = import_react.forwardRef((props, forwardedRef) => {
	const { forceMount, ...contentProps } = props;
	const context = useCollapsibleContext(CONTENT_NAME$1, props.__scopeCollapsible);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.open,
		children: ({ present }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleContentImpl, {
			...contentProps,
			ref: forwardedRef,
			present
		})
	});
});
CollapsibleContent.displayName = CONTENT_NAME$1;
var CollapsibleContentImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCollapsible, present, children, ...contentProps } = props;
	const context = useCollapsibleContext(CONTENT_NAME$1, __scopeCollapsible);
	const [isPresent, setIsPresent] = import_react.useState(present);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const heightRef = import_react.useRef(0);
	const height = heightRef.current;
	const widthRef = import_react.useRef(0);
	const width = widthRef.current;
	const isOpen = context.open || isPresent;
	const isMountAnimationPreventedRef = import_react.useRef(isOpen);
	const originalStylesRef = import_react.useRef(void 0);
	import_react.useEffect(() => {
		const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
		return () => cancelAnimationFrame(rAF);
	}, []);
	useLayoutEffect2(() => {
		const node = ref.current;
		if (node) {
			originalStylesRef.current = originalStylesRef.current || {
				transitionDuration: node.style.transitionDuration,
				animationName: node.style.animationName
			};
			node.style.transitionDuration = "0s";
			node.style.animationName = "none";
			const rect = node.getBoundingClientRect();
			heightRef.current = rect.height;
			widthRef.current = rect.width;
			if (!isMountAnimationPreventedRef.current) {
				node.style.transitionDuration = originalStylesRef.current.transitionDuration;
				node.style.animationName = originalStylesRef.current.animationName;
			}
			setIsPresent(present);
		}
	}, [context.open, present]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		"data-state": getState$1(context.open),
		"data-disabled": context.disabled ? "" : void 0,
		id: context.contentId,
		hidden: !isOpen,
		...contentProps,
		ref: composedRefs,
		style: {
			[`--radix-collapsible-content-height`]: height ? `${height}px` : void 0,
			[`--radix-collapsible-content-width`]: width ? `${width}px` : void 0,
			...props.style
		},
		children: isOpen && children
	});
});
function getState$1(open) {
	return open ? "open" : "closed";
}
var Root = Collapsible;
var Trigger = CollapsibleTrigger;
var Content = CollapsibleContent;
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-accordion@1.2.12_@types+react-dom@19.2.3_@types+react@19.2.14__@types+r_8b3df72274e0fa0cff1629993ef7cc33/node_modules/@radix-ui/react-accordion/dist/index.mjs
var ACCORDION_NAME = "Accordion";
var ACCORDION_KEYS = [
	"Home",
	"End",
	"ArrowDown",
	"ArrowUp",
	"ArrowLeft",
	"ArrowRight"
];
var [Collection, useCollection, createCollectionScope] = createCollection(ACCORDION_NAME);
var [createAccordionContext, createAccordionScope] = createContextScope(ACCORDION_NAME, [createCollectionScope, createCollapsibleScope]);
var useCollapsibleScope = createCollapsibleScope();
var Accordion$1 = import_react.forwardRef((props, forwardedRef) => {
	const { type, ...accordionProps } = props;
	const singleProps = accordionProps;
	const multipleProps = accordionProps;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, {
		scope: props.__scopeAccordion,
		children: type === "multiple" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImplMultiple, {
			...multipleProps,
			ref: forwardedRef
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImplSingle, {
			...singleProps,
			ref: forwardedRef
		})
	});
});
Accordion$1.displayName = ACCORDION_NAME;
var [AccordionValueProvider, useAccordionValueContext] = createAccordionContext(ACCORDION_NAME);
var [AccordionCollapsibleProvider, useAccordionCollapsibleContext] = createAccordionContext(ACCORDION_NAME, { collapsible: false });
var AccordionImplSingle = import_react.forwardRef((props, forwardedRef) => {
	const { value: valueProp, defaultValue, onValueChange = () => {}, collapsible = false, ...accordionSingleProps } = props;
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? "",
		onChange: onValueChange,
		caller: ACCORDION_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionValueProvider, {
		scope: props.__scopeAccordion,
		value: import_react.useMemo(() => value ? [value] : [], [value]),
		onItemOpen: setValue,
		onItemClose: import_react.useCallback(() => collapsible && setValue(""), [collapsible, setValue]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionCollapsibleProvider, {
			scope: props.__scopeAccordion,
			collapsible,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImpl, {
				...accordionSingleProps,
				ref: forwardedRef
			})
		})
	});
});
var AccordionImplMultiple = import_react.forwardRef((props, forwardedRef) => {
	const { value: valueProp, defaultValue, onValueChange = () => {}, ...accordionMultipleProps } = props;
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? [],
		onChange: onValueChange,
		caller: ACCORDION_NAME
	});
	const handleItemOpen = import_react.useCallback((itemValue) => setValue((prevValue = []) => [...prevValue, itemValue]), [setValue]);
	const handleItemClose = import_react.useCallback((itemValue) => setValue((prevValue = []) => prevValue.filter((value2) => value2 !== itemValue)), [setValue]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionValueProvider, {
		scope: props.__scopeAccordion,
		value,
		onItemOpen: handleItemOpen,
		onItemClose: handleItemClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionCollapsibleProvider, {
			scope: props.__scopeAccordion,
			collapsible: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImpl, {
				...accordionMultipleProps,
				ref: forwardedRef
			})
		})
	});
});
var [AccordionImplProvider, useAccordionContext] = createAccordionContext(ACCORDION_NAME);
var AccordionImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, disabled, dir, orientation = "vertical", ...accordionProps } = props;
	const composedRefs = useComposedRefs(import_react.useRef(null), forwardedRef);
	const getItems = useCollection(__scopeAccordion);
	const isDirectionLTR = useDirection(dir) === "ltr";
	const handleKeyDown = composeEventHandlers(props.onKeyDown, (event) => {
		if (!ACCORDION_KEYS.includes(event.key)) return;
		const target = event.target;
		const triggerCollection = getItems().filter((item) => !item.ref.current?.disabled);
		const triggerIndex = triggerCollection.findIndex((item) => item.ref.current === target);
		const triggerCount = triggerCollection.length;
		if (triggerIndex === -1) return;
		event.preventDefault();
		let nextIndex = triggerIndex;
		const homeIndex = 0;
		const endIndex = triggerCount - 1;
		const moveNext = () => {
			nextIndex = triggerIndex + 1;
			if (nextIndex > endIndex) nextIndex = homeIndex;
		};
		const movePrev = () => {
			nextIndex = triggerIndex - 1;
			if (nextIndex < homeIndex) nextIndex = endIndex;
		};
		switch (event.key) {
			case "Home":
				nextIndex = homeIndex;
				break;
			case "End":
				nextIndex = endIndex;
				break;
			case "ArrowRight":
				if (orientation === "horizontal") if (isDirectionLTR) moveNext();
				else movePrev();
				break;
			case "ArrowDown":
				if (orientation === "vertical") moveNext();
				break;
			case "ArrowLeft":
				if (orientation === "horizontal") if (isDirectionLTR) movePrev();
				else moveNext();
				break;
			case "ArrowUp":
				if (orientation === "vertical") movePrev();
				break;
		}
		triggerCollection[nextIndex % triggerCount].ref.current?.focus();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImplProvider, {
		scope: __scopeAccordion,
		disabled,
		direction: dir,
		orientation,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
			scope: __scopeAccordion,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
				...accordionProps,
				"data-orientation": orientation,
				ref: composedRefs,
				onKeyDown: disabled ? void 0 : handleKeyDown
			})
		})
	});
});
var ITEM_NAME = "AccordionItem";
var [AccordionItemProvider, useAccordionItemContext] = createAccordionContext(ITEM_NAME);
var AccordionItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, value, ...accordionItemProps } = props;
	const accordionContext = useAccordionContext(ITEM_NAME, __scopeAccordion);
	const valueContext = useAccordionValueContext(ITEM_NAME, __scopeAccordion);
	const collapsibleScope = useCollapsibleScope(__scopeAccordion);
	const triggerId = useId();
	const open = value && valueContext.value.includes(value) || false;
	const disabled = accordionContext.disabled || props.disabled;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionItemProvider, {
		scope: __scopeAccordion,
		open,
		disabled,
		triggerId,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
			"data-orientation": accordionContext.orientation,
			"data-state": getState(open),
			...collapsibleScope,
			...accordionItemProps,
			ref: forwardedRef,
			disabled,
			open,
			onOpenChange: (open2) => {
				if (open2) valueContext.onItemOpen(value);
				else valueContext.onItemClose(value);
			}
		})
	});
});
AccordionItem$1.displayName = ITEM_NAME;
var HEADER_NAME = "AccordionHeader";
var AccordionHeader = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, ...headerProps } = props;
	const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
	const itemContext = useAccordionItemContext(HEADER_NAME, __scopeAccordion);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.h3, {
		"data-orientation": accordionContext.orientation,
		"data-state": getState(itemContext.open),
		"data-disabled": itemContext.disabled ? "" : void 0,
		...headerProps,
		ref: forwardedRef
	});
});
AccordionHeader.displayName = HEADER_NAME;
var TRIGGER_NAME = "AccordionTrigger";
var AccordionTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, ...triggerProps } = props;
	const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
	const itemContext = useAccordionItemContext(TRIGGER_NAME, __scopeAccordion);
	const collapsibleContext = useAccordionCollapsibleContext(TRIGGER_NAME, __scopeAccordion);
	const collapsibleScope = useCollapsibleScope(__scopeAccordion);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.ItemSlot, {
		scope: __scopeAccordion,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
			"aria-disabled": itemContext.open && !collapsibleContext.collapsible || void 0,
			"data-orientation": accordionContext.orientation,
			id: itemContext.triggerId,
			...collapsibleScope,
			...triggerProps,
			ref: forwardedRef
		})
	});
});
AccordionTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "AccordionContent";
var AccordionContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, ...contentProps } = props;
	const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
	const itemContext = useAccordionItemContext(CONTENT_NAME, __scopeAccordion);
	const collapsibleScope = useCollapsibleScope(__scopeAccordion);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		role: "region",
		"aria-labelledby": itemContext.triggerId,
		"data-orientation": accordionContext.orientation,
		...collapsibleScope,
		...contentProps,
		ref: forwardedRef,
		style: {
			["--radix-accordion-content-height"]: "var(--radix-collapsible-content-height)",
			["--radix-accordion-content-width"]: "var(--radix-collapsible-content-width)",
			...props.style
		}
	});
});
AccordionContent$1.displayName = CONTENT_NAME;
function getState(open) {
	return open ? "open" : "closed";
}
var Root2 = Accordion$1;
var Item = AccordionItem$1;
var Header = AccordionHeader;
var Trigger2 = AccordionTrigger$1;
var Content2 = AccordionContent$1;
//#endregion
//#region src/components/ui/accordion.tsx
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	"data-uid": "src/components/ui/accordion.tsx:14:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	"data-uid": "src/components/ui/accordion.tsx:22:3",
	"data-prohibitions": "[editContent]",
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		"data-uid": "src/components/ui/accordion.tsx:23:5",
		"data-prohibitions": "[editContent]",
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
			"data-uid": "src/components/ui/accordion.tsx:32:7",
			"data-prohibitions": "[editContent]",
			className: "h-4 w-4 shrink-0 transition-transform duration-200"
		})]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	"data-uid": "src/components/ui/accordion.tsx:42:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/ui/accordion.tsx:47:5",
		"data-prohibitions": "[editContent]",
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
//#endregion
//#region src/pages/client/ClientNutrition.tsx
var macros = [
	{
		id: "cal",
		label: "Calorias",
		icon: Flame,
		color: "text-orange-500",
		val: 1500,
		max: 2e3,
		unit: "kcal"
	},
	{
		id: "pro",
		label: "Proteínas",
		icon: Activity,
		color: "text-red-500",
		val: 110,
		max: 150,
		unit: "g"
	},
	{
		id: "car",
		label: "Carboidratos",
		icon: Activity,
		color: "text-blue-500",
		val: 180,
		max: 200,
		unit: "g"
	},
	{
		id: "fat",
		label: "Gorduras",
		icon: Activity,
		color: "text-amber-500",
		val: 45,
		max: 65,
		unit: "g"
	}
];
var meals = [
	{
		id: "m1",
		t: "Café da Manhã",
		h: "08:00",
		items: [
			"2 Ovos mexidos",
			"1 Fatia de pão integral",
			"Café sem açúcar"
		]
	},
	{
		id: "m2",
		t: "Almoço",
		h: "12:30",
		items: [
			"150g Frango grelhado",
			"100g Arroz integral",
			"Salada verde à vontade"
		]
	},
	{
		id: "m3",
		t: "Lanche",
		h: "16:00",
		items: [
			"1 Iogurte natural",
			"30g Aveia em flocos",
			"1 Maçã"
		]
	}
];
var plan = [{
	t: "Almoço e Jantar",
	i: [
		{
			main: "150g de Peito de Frango grelhado",
			sub: "OU 150g de Patinho moído OU 150g de Tilápia"
		},
		{
			main: "100g de Arroz Integral",
			sub: "OU 100g de Arroz Branco OU 100g de Macarrão"
		},
		{
			main: "Salada de folhas verdes à vontade",
			sub: "Temperar com limão e 1 col. de azeite"
		}
	]
}];
var shopping = [
	"Maçã (1kg)",
	"Peito de Frango (2kg)",
	"Ovos (30 un)",
	"Arroz Integral (1kg)",
	"Iogurte Natural (500g)",
	"Aveia (500g)"
];
function ClientNutrition() {
	const [water, setWater] = (0, import_react.useState)(0);
	const maxWater = 2e3;
	const addWater = () => setWater((prev) => Math.min(prev + 250, maxWater));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientNutrition.tsx:117:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:118:7",
			"data-prohibitions": "[editContent]",
			title: "Minha Nutrição"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:119:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-4xl mx-auto w-full animate-fade-in-up space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/client/ClientNutrition.tsx:120:9",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/client/ClientNutrition.tsx:121:11",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/client/ClientNutrition.tsx:122:13",
						"data-prohibitions": "[]",
						className: "text-2xl font-bold tracking-tight text-foreground",
						children: "Visão Geral"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/client/ClientNutrition.tsx:123:13",
						"data-prohibitions": "[]",
						className: "text-muted-foreground text-sm",
						children: "Acompanhe sua dieta e metas diárias."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					"data-uid": "src/pages/client/ClientNutrition.tsx:125:11",
					"data-prohibitions": "[]",
					variant: "secondary",
					className: "w-fit px-3 py-1 text-sm font-medium",
					children: "Nutricionista: Dra. Thaís"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				"data-uid": "src/pages/client/ClientNutrition.tsx:130:9",
				"data-prohibitions": "[editContent]",
				defaultValue: "diary",
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:131:11",
						"data-prohibitions": "[]",
						className: "w-full sm:w-auto grid grid-cols-3 h-auto p-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:132:13",
								"data-prohibitions": "[]",
								value: "diary",
								className: "py-2 whitespace-normal text-xs sm:text-sm",
								children: "Diário de Hoje"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:135:13",
								"data-prohibitions": "[]",
								value: "plan",
								className: "py-2 whitespace-normal text-xs sm:text-sm",
								children: "Meu Plano"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:138:13",
								"data-prohibitions": "[]",
								value: "shopping",
								className: "py-2 whitespace-normal text-xs sm:text-sm",
								children: "Lista de Compras"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:143:11",
						"data-prohibitions": "[editContent]",
						value: "diary",
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:144:13",
								"data-prohibitions": "[editContent]",
								className: "border-blue-100 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:145:15",
									"data-prohibitions": "[editContent]",
									className: "pb-2 flex flex-row items-start sm:items-center justify-between gap-4 space-y-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:146:17",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:147:19",
											"data-prohibitions": "[]",
											className: "text-base flex items-center gap-2 text-blue-700 dark:text-blue-400",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:148:21",
												"data-prohibitions": "[editContent]",
												className: "h-5 w-5"
											}), " Hidratação"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:150:19",
											"data-prohibitions": "[editContent]",
											className: "text-blue-600/70 dark:text-blue-400/70",
											children: [
												"Meta diária: ",
												maxWater,
												"ml"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:154:17",
										"data-prohibitions": "[]",
										onClick: addWater,
										size: "sm",
										variant: "outline",
										className: "gap-1 border-blue-200 text-blue-700 hover:bg-blue-100",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:160:19",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-4"
										}), " 250ml"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:163:15",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:164:17",
										"data-prohibitions": "[editContent]",
										className: "flex justify-between text-sm mb-2 font-medium text-blue-900 dark:text-blue-300",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:165:19",
											"data-prohibitions": "[editContent]",
											children: [water, "ml consumidos"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:166:19",
											"data-prohibitions": "[editContent]",
											children: [Math.round(water / maxWater * 100), "%"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:168:17",
										"data-prohibitions": "[editContent]",
										value: water / maxWater * 100,
										className: "h-2.5 bg-blue-100 dark:bg-blue-950 [&>div]:bg-blue-500"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/client/ClientNutrition.tsx:175:13",
								"data-prohibitions": "[editContent]",
								className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
								children: macros.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:177:17",
									"data-prohibitions": "[editContent]",
									className: "overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:178:19",
										"data-prohibitions": "[editContent]",
										className: "p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:179:21",
												"data-prohibitions": "[editContent]",
												className: "flex items-center justify-between mb-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.icon, {
													"data-uid": "src/pages/client/ClientNutrition.tsx:180:23",
													"data-prohibitions": "[editContent]",
													className: `h-5 w-5 ${m.color}`
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:181:23",
													"data-prohibitions": "[editContent]",
													className: "text-xs font-semibold text-muted-foreground",
													children: [
														m.val,
														"/",
														m.max,
														" ",
														m.unit
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:185:21",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-sm mb-2",
												children: m.label
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:186:21",
												"data-prohibitions": "[editContent]",
												value: m.val / m.max * 100,
												className: "h-1.5"
											})
										]
									})
								}, m.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/client/ClientNutrition.tsx:192:13",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:193:15",
									"data-prohibitions": "[]",
									className: "text-lg font-semibold mb-3 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:194:17",
										"data-prohibitions": "[editContent]",
										className: "h-5 w-5 text-primary"
									}), " Refeições do Dia"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:196:15",
									"data-prohibitions": "[editContent]",
									type: "single",
									collapsible: true,
									className: "w-full space-y-3",
									children: meals.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:198:19",
										"data-prohibitions": "[editContent]",
										value: m.id,
										className: "border rounded-lg px-4 bg-card",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:199:21",
											"data-prohibitions": "[editContent]",
											className: "hover:no-underline py-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:200:23",
												"data-prohibitions": "[editContent]",
												className: "flex flex-col items-start",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:201:25",
													"data-prohibitions": "[editContent]",
													className: "font-semibold text-base",
													children: m.t
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:202:25",
													"data-prohibitions": "[editContent]",
													className: "text-sm text-muted-foreground font-normal",
													children: m.h
												})]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionContent, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:205:21",
											"data-prohibitions": "[editContent]",
											className: "pt-2 pb-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:206:23",
												"data-prohibitions": "[editContent]",
												className: "space-y-2 mb-4",
												children: m.items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:208:27",
													"data-prohibitions": "[editContent]",
													className: "flex items-center gap-2 text-sm text-muted-foreground",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:212:29",
															"data-prohibitions": "[editContent]",
															className: "h-1.5 w-1.5 rounded-full bg-primary/50"
														}),
														" ",
														item
													]
												}, i))
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:216:23",
												"data-prohibitions": "[]",
												variant: "outline",
												className: "w-full gap-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
													"data-uid": "src/pages/client/ClientNutrition.tsx:220:25",
													"data-prohibitions": "[editContent]",
													className: "h-4 w-4"
												}), " Marcar como consumido"]
											})]
										})]
									}, m.id))
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:229:11",
						"data-prohibitions": "[editContent]",
						value: "plan",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:230:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:231:15",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:232:17",
									"data-prohibitions": "[]",
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:233:19",
										"data-prohibitions": "[editContent]",
										className: "h-5 w-5 text-primary"
									}), " Plano Nutricional Prescrito"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:235:17",
									"data-prohibitions": "[]",
									children: "Consulte as opções e substituições da sua dieta."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:237:15",
								"data-prohibitions": "[editContent]",
								className: "space-y-6",
								children: plan.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:239:19",
									"data-prohibitions": "[editContent]",
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:240:21",
										"data-prohibitions": "[editContent]",
										className: "font-semibold text-base border-b pb-1",
										children: p.t
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:241:21",
										"data-prohibitions": "[editContent]",
										className: "space-y-4",
										children: p.i.map((item, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:243:25",
											"data-prohibitions": "[editContent]",
											className: "bg-muted/40 p-3 rounded-md border",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:244:27",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-sm text-foreground",
												children: item.main
											}), item.sub && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:246:29",
												"data-prohibitions": "[editContent]",
												className: "text-xs text-muted-foreground mt-1.5 flex items-start gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/client/ClientNutrition.tsx:247:31",
														"data-prohibitions": "[]",
														className: "font-semibold text-primary",
														children: "Substituição:"
													}),
													" ",
													item.sub
												]
											})]
										}, j))
									})]
								}, i))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:260:11",
						"data-prohibitions": "[editContent]",
						value: "shopping",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:261:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:262:15",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:263:17",
									"data-prohibitions": "[]",
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:264:19",
										"data-prohibitions": "[editContent]",
										className: "h-5 w-5 text-primary"
									}), " Lista de Compras"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:266:17",
									"data-prohibitions": "[]",
									children: "Baseado no seu plano nutricional."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:268:15",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:269:17",
									"data-prohibitions": "[editContent]",
									className: "space-y-1",
									children: shopping.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:271:21",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 cursor-pointer transition-colors border border-transparent hover:border-border",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:275:23",
											"data-prohibitions": "[editContent]",
											id: `item-${i}`
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:276:23",
											"data-prohibitions": "[editContent]",
											className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
											children: item
										})]
									}, i))
								})
							})]
						})
					})
				]
			})]
		})]
	});
}
//#endregion
export { ClientNutrition as default };

//# sourceMappingURL=ClientNutrition-BuJAW1Hc.js.map