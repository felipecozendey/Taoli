import { I as useComposedRefs, J as require_react, L as composeEventHandlers, N as createContextScope, P as require_jsx_runtime, S as Presence, X as __toESM, g as cn, k as Primitive$1, m as useSize, n as Input, r as Button, t as Primitive, v as createLucideIcon, x as useControllableState } from "./dist-zdF_4_x7.js";
import "./dist-D00V14_S.js";
import { a as AvatarImage, i as AvatarFallback, n as DashboardHeader, o as createContextScope$1, r as Avatar, s as Check, t as PageContent } from "./PageContent-C5S023uY.js";
import "./sidebar-CRTC7rf6.js";
import { a as Label, c as CardDescription, h as Brain, i as TabsTrigger, l as CardHeader, n as TabsContent, o as Card, r as TabsList, s as CardContent, t as Tabs, u as CardTitle } from "./index-CdzJPMjZ.js";
var Apple = createLucideIcon("apple", [["path", {
	d: "M12 6.528V3a1 1 0 0 1 1-1h0",
	key: "11qiee"
}], ["path", {
	d: "M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21",
	key: "110c12"
}]]);
var BookOpen = createLucideIcon("book-open", [["path", {
	d: "M12 7v14",
	key: "1akyts"
}], ["path", {
	d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
	key: "ruj8y"
}]]);
var Dumbbell = createLucideIcon("dumbbell", [
	["path", {
		d: "M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z",
		key: "9m4mmf"
	}],
	["path", {
		d: "m2.5 21.5 1.4-1.4",
		key: "17g3f0"
	}],
	["path", {
		d: "m20.1 3.9 1.4-1.4",
		key: "1qn309"
	}],
	["path", {
		d: "M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z",
		key: "1t2c92"
	}],
	["path", {
		d: "m9.6 14.4 4.8-4.8",
		key: "6umqxw"
	}]
]);
var Frown = createLucideIcon("frown", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M16 16s-1.5-2-4-2-4 2-4 2",
		key: "epbg0q"
	}],
	["line", {
		x1: "9",
		x2: "9.01",
		y1: "9",
		y2: "9",
		key: "yxxnd0"
	}],
	["line", {
		x1: "15",
		x2: "15.01",
		y1: "9",
		y2: "9",
		key: "1p4y9e"
	}]
]);
var Laugh = createLucideIcon("laugh", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z",
		key: "b2q4dd"
	}],
	["line", {
		x1: "9",
		x2: "9.01",
		y1: "9",
		y2: "9",
		key: "yxxnd0"
	}],
	["line", {
		x1: "15",
		x2: "15.01",
		y1: "9",
		y2: "9",
		key: "1p4y9e"
	}]
]);
var Meh = createLucideIcon("meh", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["line", {
		x1: "8",
		x2: "16",
		y1: "15",
		y2: "15",
		key: "1xb1d9"
	}],
	["line", {
		x1: "9",
		x2: "9.01",
		y1: "9",
		y2: "9",
		key: "yxxnd0"
	}],
	["line", {
		x1: "15",
		x2: "15.01",
		y1: "9",
		y2: "9",
		key: "1p4y9e"
	}]
]);
var Play = createLucideIcon("play", [["path", {
	d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
	key: "10ikf1"
}]]);
var Smile = createLucideIcon("smile", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M8 14s1.5 2 4 2 4-2 4-2",
		key: "1y1vjs"
	}],
	["line", {
		x1: "9",
		x2: "9.01",
		y1: "9",
		y2: "9",
		key: "yxxnd0"
	}],
	["line", {
		x1: "15",
		x2: "15.01",
		y1: "9",
		y2: "9",
		key: "1p4y9e"
	}]
]);
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-progress@1.1.8_@types+react-dom@19.2.3_@types+react@19.2.14__@types+rea_7258c0b550570cef5cd6f2d2227aa6b9/node_modules/@radix-ui/react-progress/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext, createProgressScope] = createContextScope$1(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeProgress, value: valueProp = null, max: maxProp, getValueLabel = defaultGetValueLabel, ...progressProps } = props;
	if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
	const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
	if (valueProp !== null && !isValidValueNumber(valueProp, max)) console.error(getInvalidValueError(`${valueProp}`, "Progress"));
	const value = isValidValueNumber(valueProp, max) ? valueProp : null;
	const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressProvider, {
		scope: __scopeProgress,
		value,
		max,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			"aria-valuemax": max,
			"aria-valuemin": 0,
			"aria-valuenow": isNumber(value) ? value : void 0,
			"aria-valuetext": valueLabel,
			role: "progressbar",
			"data-state": getProgressState(value, max),
			"data-value": value ?? void 0,
			"data-max": max,
			...progressProps,
			ref: forwardedRef
		})
	});
});
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME$1 = "ProgressIndicator";
var ProgressIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeProgress, ...indicatorProps } = props;
	const context = useProgressContext(INDICATOR_NAME$1, __scopeProgress);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		"data-state": getProgressState(context.value, context.max),
		"data-value": context.value ?? void 0,
		"data-max": context.max,
		...indicatorProps,
		ref: forwardedRef
	});
});
ProgressIndicator.displayName = INDICATOR_NAME$1;
function defaultGetValueLabel(value, max) {
	return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
	return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
	return typeof value === "number";
}
function isValidMaxNumber(max) {
	return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
	return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
	return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
	return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
//#endregion
//#region src/components/ui/progress.tsx
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	"data-uid": "src/components/ui/progress.tsx:11:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		"data-uid": "src/components/ui/progress.tsx:16:5",
		"data-prohibitions": "[editContent]",
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Root.displayName;
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-use-previous@1.1.1_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-use-previous/dist/index.mjs
function usePrevious(value) {
	const ref = import_react.useRef({
		value,
		previous: value
	});
	return import_react.useMemo(() => {
		if (ref.current.value !== value) {
			ref.current.previous = ref.current.value;
			ref.current.value = value;
		}
		return ref.current.previous;
	}, [value]);
}
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-checkbox@1.3.3_@types+react-dom@19.2.3_@types+react@19.2.14__@types+rea_a9bfe74df417688e01ae6068318bf0dd/node_modules/@radix-ui/react-checkbox/dist/index.mjs
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext, createCheckboxScope] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
	const { __scopeCheckbox, checked: checkedProp, children, defaultChecked, disabled, form, name, onCheckedChange, required, value = "on", internal_do_not_use_render } = props;
	const [checked, setChecked] = useControllableState({
		prop: checkedProp,
		defaultProp: defaultChecked ?? false,
		onChange: onCheckedChange,
		caller: CHECKBOX_NAME
	});
	const [control, setControl] = import_react.useState(null);
	const [bubbleInput, setBubbleInput] = import_react.useState(null);
	const hasConsumerStoppedPropagationRef = import_react.useRef(false);
	const isFormControl = control ? !!form || !!control.closest("form") : true;
	const context = {
		checked,
		disabled,
		setChecked,
		control,
		setControl,
		name,
		form,
		value,
		hasConsumerStoppedPropagationRef,
		required,
		defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
		isFormControl,
		bubbleInput,
		setBubbleInput
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxProviderImpl, {
		scope: __scopeCheckbox,
		...context,
		children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
	});
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = import_react.forwardRef(({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
	const { control, value, disabled, checked, required, setControl, setChecked, hasConsumerStoppedPropagationRef, isFormControl, bubbleInput } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
	const composedRefs = useComposedRefs(forwardedRef, setControl);
	const initialCheckedStateRef = import_react.useRef(checked);
	import_react.useEffect(() => {
		const form = control?.form;
		if (form) {
			const reset = () => setChecked(initialCheckedStateRef.current);
			form.addEventListener("reset", reset);
			return () => form.removeEventListener("reset", reset);
		}
	}, [control, setChecked]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.button, {
		type: "button",
		role: "checkbox",
		"aria-checked": isIndeterminate(checked) ? "mixed" : checked,
		"aria-required": required,
		"data-state": getState(checked),
		"data-disabled": disabled ? "" : void 0,
		disabled,
		value,
		...checkboxProps,
		ref: composedRefs,
		onKeyDown: composeEventHandlers(onKeyDown, (event) => {
			if (event.key === "Enter") event.preventDefault();
		}),
		onClick: composeEventHandlers(onClick, (event) => {
			setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
			if (bubbleInput && isFormControl) {
				hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
				if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
			}
		})
	});
});
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCheckbox, name, checked, defaultChecked, required, disabled, value, onCheckedChange, form, ...checkboxProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxProvider, {
		__scopeCheckbox,
		checked,
		defaultChecked,
		disabled,
		required,
		onCheckedChange,
		name,
		form,
		value,
		internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxTrigger, {
			...checkboxProps,
			ref: forwardedRef,
			__scopeCheckbox
		}), isFormControl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxBubbleInput, { __scopeCheckbox })] })
	});
});
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
	const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || isIndeterminate(context.checked) || context.checked === true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.span, {
			"data-state": getState(context.checked),
			"data-disabled": context.disabled ? "" : void 0,
			...indicatorProps,
			ref: forwardedRef,
			style: {
				pointerEvents: "none",
				...props.style
			}
		})
	});
});
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = import_react.forwardRef(({ __scopeCheckbox, ...props }, forwardedRef) => {
	const { control, hasConsumerStoppedPropagationRef, checked, defaultChecked, required, disabled, name, value, form, bubbleInput, setBubbleInput } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
	const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
	const prevChecked = usePrevious(checked);
	const controlSize = useSize(control);
	import_react.useEffect(() => {
		const input = bubbleInput;
		if (!input) return;
		const inputProto = window.HTMLInputElement.prototype;
		const setChecked = Object.getOwnPropertyDescriptor(inputProto, "checked").set;
		const bubbles = !hasConsumerStoppedPropagationRef.current;
		if (prevChecked !== checked && setChecked) {
			const event = new Event("click", { bubbles });
			input.indeterminate = isIndeterminate(checked);
			setChecked.call(input, isIndeterminate(checked) ? false : checked);
			input.dispatchEvent(event);
		}
	}, [
		bubbleInput,
		prevChecked,
		checked,
		hasConsumerStoppedPropagationRef
	]);
	const defaultCheckedRef = import_react.useRef(isIndeterminate(checked) ? false : checked);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive$1.input, {
		type: "checkbox",
		"aria-hidden": true,
		defaultChecked: defaultChecked ?? defaultCheckedRef.current,
		required,
		disabled,
		name,
		value,
		form,
		...props,
		tabIndex: -1,
		ref: composedRefs,
		style: {
			...props.style,
			...controlSize,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0,
			transform: "translateX(-100%)"
		}
	});
});
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
	return typeof value === "function";
}
function isIndeterminate(checked) {
	return checked === "indeterminate";
}
function getState(checked) {
	return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
//#endregion
//#region src/components/ui/checkbox.tsx
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	"data-uid": "src/components/ui/checkbox.tsx:12:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		"data-uid": "src/components/ui/checkbox.tsx:20:5",
		"data-prohibitions": "[editContent]",
		className: cn("flex items-center justify-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
			"data-uid": "src/components/ui/checkbox.tsx:21:7",
			"data-prohibitions": "[editContent]",
			className: "h-4 w-4"
		})
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
//#endregion
//#region src/pages/client/ClientDiary.tsx
var ProfCard = ({ n, r, img, fb }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
	"data-uid": "src/pages/client/ClientDiary.tsx:25:3",
	"data-prohibitions": "[editContent]",
	className: "mb-6 bg-muted/40 border-dashed shadow-sm",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		"data-uid": "src/pages/client/ClientDiary.tsx:26:5",
		"data-prohibitions": "[editContent]",
		className: "p-4 flex items-center gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
			"data-uid": "src/pages/client/ClientDiary.tsx:27:7",
			"data-prohibitions": "[editContent]",
			className: "h-12 w-12 border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
				"data-uid": "src/pages/client/ClientDiary.tsx:28:9",
				"data-prohibitions": "[editContent]",
				src: img
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
				"data-uid": "src/pages/client/ClientDiary.tsx:29:9",
				"data-prohibitions": "[editContent]",
				children: fb
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/client/ClientDiary.tsx:31:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/client/ClientDiary.tsx:32:9",
				"data-prohibitions": "[editContent]",
				className: "font-semibold text-sm",
				children: n
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/client/ClientDiary.tsx:33:9",
				"data-prohibitions": "[editContent]",
				className: "text-xs text-muted-foreground",
				children: r
			})]
		})]
	})
});
var CheckItem = ({ id, label, border = true }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-uid": "src/pages/client/ClientDiary.tsx:48:3",
	"data-prohibitions": "[editContent]",
	className: `flex items-center space-x-3 p-4 hover:bg-muted/50 transition-colors ${border ? "border-b" : ""}`,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
		"data-uid": "src/pages/client/ClientDiary.tsx:51:5",
		"data-prohibitions": "[editContent]",
		id,
		className: "h-5 w-5"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		"data-uid": "src/pages/client/ClientDiary.tsx:52:5",
		"data-prohibitions": "[editContent]",
		htmlFor: id,
		className: "flex-1 cursor-pointer text-sm font-medium",
		children: label
	})]
});
function ClientDiary() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientDiary.tsx:60:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientDiary.tsx:61:7",
			"data-prohibitions": "[editContent]",
			title: "Meu Diário"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageContent, {
			"data-uid": "src/pages/client/ClientDiary.tsx:62:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-4xl mx-auto w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				"data-uid": "src/pages/client/ClientDiary.tsx:63:9",
				"data-prohibitions": "[editContent]",
				defaultValue: "nutricao",
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-uid": "src/pages/client/ClientDiary.tsx:64:11",
						"data-prohibitions": "[]",
						className: "grid w-full grid-cols-4 mb-8 h-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								"data-uid": "src/pages/client/ClientDiary.tsx:65:13",
								"data-prohibitions": "[]",
								value: "nutricao",
								className: "gap-2 h-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Apple, {
									"data-uid": "src/pages/client/ClientDiary.tsx:66:15",
									"data-prohibitions": "[editContent]",
									className: "h-4 w-4 hidden sm:block"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/client/ClientDiary.tsx:67:15",
									"data-prohibitions": "[]",
									children: "Nutrição"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								"data-uid": "src/pages/client/ClientDiary.tsx:69:13",
								"data-prohibitions": "[]",
								value: "treino",
								className: "gap-2 h-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, {
									"data-uid": "src/pages/client/ClientDiary.tsx:70:15",
									"data-prohibitions": "[editContent]",
									className: "h-4 w-4 hidden sm:block"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/client/ClientDiary.tsx:71:15",
									"data-prohibitions": "[]",
									children: "Treino"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								"data-uid": "src/pages/client/ClientDiary.tsx:73:13",
								"data-prohibitions": "[]",
								value: "mente",
								className: "gap-2 h-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, {
									"data-uid": "src/pages/client/ClientDiary.tsx:74:15",
									"data-prohibitions": "[editContent]",
									className: "h-4 w-4 hidden sm:block"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/client/ClientDiary.tsx:75:15",
									"data-prohibitions": "[]",
									children: "Mente"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								"data-uid": "src/pages/client/ClientDiary.tsx:77:13",
								"data-prohibitions": "[]",
								value: "estudos",
								className: "gap-2 h-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
									"data-uid": "src/pages/client/ClientDiary.tsx:78:15",
									"data-prohibitions": "[editContent]",
									className: "h-4 w-4 hidden sm:block"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/client/ClientDiary.tsx:79:15",
									"data-prohibitions": "[]",
									children: "Estudos"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						"data-uid": "src/pages/client/ClientDiary.tsx:83:11",
						"data-prohibitions": "[editContent]",
						value: "nutricao",
						className: "space-y-4 animate-fade-in-up",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfCard, {
								"data-uid": "src/pages/client/ClientDiary.tsx:84:13",
								"data-prohibitions": "[editContent]",
								n: "Dra. Thaís",
								r: "Nutricionista",
								img: "https://img.usecurling.com/ppl/thumbnail?gender=female&seed=3",
								fb: "TH"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/client/ClientDiary.tsx:90:13",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/client/ClientDiary.tsx:91:15",
									"data-prohibitions": "[]",
									className: "pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/client/ClientDiary.tsx:92:17",
										"data-prohibitions": "[]",
										className: "text-sm font-medium",
										children: "Calorias Consumidas vs. Meta"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									"data-uid": "src/pages/client/ClientDiary.tsx:94:15",
									"data-prohibitions": "[]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/client/ClientDiary.tsx:95:17",
										"data-prohibitions": "[]",
										className: "flex justify-between text-sm mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientDiary.tsx:96:19",
											"data-prohibitions": "[]",
											className: "font-semibold",
											children: "1.200 kcal"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientDiary.tsx:97:19",
											"data-prohibitions": "[]",
											className: "text-muted-foreground",
											children: "2.000 kcal"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
										"data-uid": "src/pages/client/ClientDiary.tsx:99:17",
										"data-prohibitions": "[editContent]",
										value: 60,
										className: "h-2"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/client/ClientDiary.tsx:103:13",
								"data-prohibitions": "[editContent]",
								className: "grid gap-4 sm:grid-cols-2",
								children: [{
									t: "Café da Manhã",
									h: "08:00",
									i: [
										"2 Ovos mexidos",
										"1 Fatia de pão integral",
										"Café sem açúcar"
									],
									m: [
										15,
										12,
										10
									]
								}, {
									t: "Almoço",
									h: "12:30",
									i: [
										"150g Frango grelhado",
										"100g Arroz integral",
										"Salada à vontade"
									],
									m: [
										30,
										45,
										15
									]
								}].map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
									"data-uid": "src/pages/client/ClientDiary.tsx:118:17",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
										"data-uid": "src/pages/client/ClientDiary.tsx:119:19",
										"data-prohibitions": "[editContent]",
										className: "pb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
											"data-uid": "src/pages/client/ClientDiary.tsx:120:21",
											"data-prohibitions": "[editContent]",
											className: "text-base",
											children: m.t
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
											"data-uid": "src/pages/client/ClientDiary.tsx:121:21",
											"data-prohibitions": "[editContent]",
											children: m.h
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										"data-uid": "src/pages/client/ClientDiary.tsx:123:19",
										"data-prohibitions": "[editContent]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												"data-uid": "src/pages/client/ClientDiary.tsx:124:21",
												"data-prohibitions": "[editContent]",
												className: "text-sm space-y-1 mb-4 text-muted-foreground",
												children: m.i.map((x, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													"data-uid": "src/pages/client/ClientDiary.tsx:126:25",
													"data-prohibitions": "[editContent]",
													children: ["• ", x]
												}, j))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientDiary.tsx:129:21",
												"data-prohibitions": "[editContent]",
												className: "flex gap-3 text-xs font-medium mb-4 bg-muted/50 p-2 rounded-md justify-center",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														"data-uid": "src/pages/client/ClientDiary.tsx:130:23",
														"data-prohibitions": "[editContent]",
														className: "text-blue-600 dark:text-blue-400",
														children: [
															"Carbo: ",
															m.m[0],
															"g"
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														"data-uid": "src/pages/client/ClientDiary.tsx:131:23",
														"data-prohibitions": "[editContent]",
														className: "text-red-600 dark:text-red-400",
														children: [
															"Proteína: ",
															m.m[1],
															"g"
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														"data-uid": "src/pages/client/ClientDiary.tsx:132:23",
														"data-prohibitions": "[editContent]",
														className: "text-amber-600 dark:text-amber-400",
														children: [
															"Gordura: ",
															m.m[2],
															"g"
														]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												"data-uid": "src/pages/client/ClientDiary.tsx:134:21",
												"data-prohibitions": "[]",
												variant: "outline",
												className: "w-full gap-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
													"data-uid": "src/pages/client/ClientDiary.tsx:138:23",
													"data-prohibitions": "[editContent]",
													className: "h-4 w-4"
												}), " Marcar como consumido"]
											})
										]
									})]
								}, i))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						"data-uid": "src/pages/client/ClientDiary.tsx:146:11",
						"data-prohibitions": "[editContent]",
						value: "treino",
						className: "space-y-4 animate-fade-in-up",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfCard, {
								"data-uid": "src/pages/client/ClientDiary.tsx:147:13",
								"data-prohibitions": "[editContent]",
								n: "Prof. Marcos",
								r: "Educador Físico",
								img: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=4",
								fb: "MA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/client/ClientDiary.tsx:153:13",
								"data-prohibitions": "[]",
								className: "flex items-center justify-between mb-2 px-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									"data-uid": "src/pages/client/ClientDiary.tsx:154:15",
									"data-prohibitions": "[]",
									className: "text-lg font-semibold tracking-tight",
									children: "Treino de Hipertrofia"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/client/ClientDiary.tsx:155:15",
									"data-prohibitions": "[]",
									className: "text-sm text-muted-foreground font-medium bg-muted px-2 py-1 rounded-md",
									children: "45 min"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/client/ClientDiary.tsx:159:13",
								"data-prohibitions": "[editContent]",
								className: "space-y-3",
								children: [
									{
										n: "Supino Reto com Barra",
										s: "3x12",
										r: "60s"
									},
									{
										n: "Desenvolvimento com Halteres",
										s: "4x10",
										r: "45s"
									},
									{
										n: "Tríceps Pulley",
										s: "3x15",
										r: "45s"
									}
								].map((ex, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									"data-uid": "src/pages/client/ClientDiary.tsx:165:17",
									"data-prohibitions": "[editContent]",
									className: "overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										"data-uid": "src/pages/client/ClientDiary.tsx:166:19",
										"data-prohibitions": "[editContent]",
										className: "p-4 flex flex-col sm:flex-row sm:items-center gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/client/ClientDiary.tsx:167:21",
											"data-prohibitions": "[editContent]",
											className: "flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/client/ClientDiary.tsx:168:23",
												"data-prohibitions": "[editContent]",
												className: "font-semibold text-sm mb-1",
												children: ex.n
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientDiary.tsx:169:23",
												"data-prohibitions": "[editContent]",
												className: "flex items-center gap-2 text-xs text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/pages/client/ClientDiary.tsx:170:25",
													"data-prohibitions": "[editContent]",
													className: "bg-muted px-2 py-0.5 rounded",
													children: ["Séries: ", ex.s]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/pages/client/ClientDiary.tsx:171:25",
													"data-prohibitions": "[editContent]",
													className: "bg-muted px-2 py-0.5 rounded",
													children: ["Descanso: ", ex.r]
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/client/ClientDiary.tsx:174:21",
											"data-prohibitions": "[]",
											className: "flex items-center gap-3 bg-muted/30 p-2 rounded-lg",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												"data-uid": "src/pages/client/ClientDiary.tsx:175:23",
												"data-prohibitions": "[]",
												className: "text-xs whitespace-nowrap font-medium text-muted-foreground",
												children: "Carga (kg):"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												"data-uid": "src/pages/client/ClientDiary.tsx:178:23",
												"data-prohibitions": "[editContent]",
												type: "number",
												placeholder: "0",
												className: "w-20 h-8 text-sm bg-background"
											})]
										})]
									})
								}, idx))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						"data-uid": "src/pages/client/ClientDiary.tsx:190:11",
						"data-prohibitions": "[]",
						value: "mente",
						className: "space-y-6 animate-fade-in-up",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfCard, {
								"data-uid": "src/pages/client/ClientDiary.tsx:191:13",
								"data-prohibitions": "[editContent]",
								n: "Dr. Roberto",
								r: "Psicólogo",
								img: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=5",
								fb: "RO"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/client/ClientDiary.tsx:197:13",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/client/ClientDiary.tsx:198:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/client/ClientDiary.tsx:199:17",
										"data-prohibitions": "[]",
										className: "text-base text-center",
										children: "Como você está se sentindo hoje?"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									"data-uid": "src/pages/client/ClientDiary.tsx:203:15",
									"data-prohibitions": "[]",
									className: "flex justify-center gap-2 sm:gap-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											"data-uid": "src/pages/client/ClientDiary.tsx:204:17",
											"data-prohibitions": "[]",
											variant: "ghost",
											className: "h-auto flex-col gap-3 p-3 sm:p-4 hover:bg-blue-50 hover:text-blue-600",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frown, {
												"data-uid": "src/pages/client/ClientDiary.tsx:208:19",
												"data-prohibitions": "[editContent]",
												className: "h-10 w-10 text-blue-400"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/client/ClientDiary.tsx:209:19",
												"data-prohibitions": "[]",
												className: "text-xs font-medium",
												children: "Triste"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											"data-uid": "src/pages/client/ClientDiary.tsx:211:17",
											"data-prohibitions": "[]",
											variant: "ghost",
											className: "h-auto flex-col gap-3 p-3 sm:p-4 hover:bg-slate-100 hover:text-slate-700",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meh, {
												"data-uid": "src/pages/client/ClientDiary.tsx:215:19",
												"data-prohibitions": "[editContent]",
												className: "h-10 w-10 text-slate-400"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/client/ClientDiary.tsx:216:19",
												"data-prohibitions": "[]",
												className: "text-xs font-medium",
												children: "Neutro"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											"data-uid": "src/pages/client/ClientDiary.tsx:218:17",
											"data-prohibitions": "[]",
											variant: "ghost",
											className: "h-auto flex-col gap-3 p-3 sm:p-4 hover:bg-green-50 hover:text-green-600",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smile, {
												"data-uid": "src/pages/client/ClientDiary.tsx:222:19",
												"data-prohibitions": "[editContent]",
												className: "h-10 w-10 text-green-400"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/client/ClientDiary.tsx:223:19",
												"data-prohibitions": "[]",
												className: "text-xs font-medium",
												children: "Feliz"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											"data-uid": "src/pages/client/ClientDiary.tsx:225:17",
											"data-prohibitions": "[]",
											variant: "ghost",
											className: "h-auto flex-col gap-3 p-3 sm:p-4 hover:bg-yellow-50 hover:text-yellow-600",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Laugh, {
												"data-uid": "src/pages/client/ClientDiary.tsx:229:19",
												"data-prohibitions": "[editContent]",
												className: "h-10 w-10 text-yellow-500"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/client/ClientDiary.tsx:230:19",
												"data-prohibitions": "[]",
												className: "text-xs font-medium",
												children: "Excelente"
											})]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/client/ClientDiary.tsx:234:13",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									"data-uid": "src/pages/client/ClientDiary.tsx:235:15",
									"data-prohibitions": "[]",
									className: "font-semibold text-lg mb-3 px-1",
									children: "Hábitos Diários"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									"data-uid": "src/pages/client/ClientDiary.tsx:236:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										"data-uid": "src/pages/client/ClientDiary.tsx:237:17",
										"data-prohibitions": "[]",
										className: "p-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckItem, {
												"data-uid": "src/pages/client/ClientDiary.tsx:238:19",
												"data-prohibitions": "[editContent]",
												id: "h1",
												label: "Meditação 10 min"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckItem, {
												"data-uid": "src/pages/client/ClientDiary.tsx:239:19",
												"data-prohibitions": "[editContent]",
												id: "h2",
												label: "Leitura (15 páginas)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckItem, {
												"data-uid": "src/pages/client/ClientDiary.tsx:240:19",
												"data-prohibitions": "[editContent]",
												id: "h3",
												label: "Respiração Guiada",
												border: false
											})
										]
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						"data-uid": "src/pages/client/ClientDiary.tsx:246:11",
						"data-prohibitions": "[]",
						value: "estudos",
						className: "space-y-6 animate-fade-in-up",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfCard, {
								"data-uid": "src/pages/client/ClientDiary.tsx:247:13",
								"data-prohibitions": "[editContent]",
								n: "Você",
								r: "Gerenciado por você",
								img: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=2",
								fb: "VC"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								"data-uid": "src/pages/client/ClientDiary.tsx:253:13",
								"data-prohibitions": "[]",
								className: "border-primary/20 bg-primary/5 shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									"data-uid": "src/pages/client/ClientDiary.tsx:254:15",
									"data-prohibitions": "[]",
									className: "p-8 text-center space-y-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/client/ClientDiary.tsx:255:17",
											"data-prohibitions": "[]",
											className: "h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
												"data-uid": "src/pages/client/ClientDiary.tsx:256:19",
												"data-prohibitions": "[editContent]",
												className: "h-8 w-8"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/client/ClientDiary.tsx:258:17",
											"data-prohibitions": "[]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												"data-uid": "src/pages/client/ClientDiary.tsx:259:19",
												"data-prohibitions": "[]",
												className: "font-semibold text-xl mb-2",
												children: "Sessão de Foco"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/client/ClientDiary.tsx:260:19",
												"data-prohibitions": "[]",
												className: "text-sm text-muted-foreground max-w-sm mx-auto",
												children: "Concentre-se em suas tarefas usando a técnica Pomodoro. 25 minutos de foco profundo para estudos."
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											"data-uid": "src/pages/client/ClientDiary.tsx:265:17",
											"data-prohibitions": "[]",
											size: "lg",
											className: "w-full sm:w-auto gap-2 rounded-full px-8 h-12",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
												"data-uid": "src/pages/client/ClientDiary.tsx:266:19",
												"data-prohibitions": "[editContent]",
												className: "h-4 w-4 fill-current"
											}), "Iniciar Sessão de Foco"]
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/client/ClientDiary.tsx:271:13",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									"data-uid": "src/pages/client/ClientDiary.tsx:272:15",
									"data-prohibitions": "[]",
									className: "font-semibold text-lg mb-3 px-1",
									children: "Revisões do Dia"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									"data-uid": "src/pages/client/ClientDiary.tsx:273:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										"data-uid": "src/pages/client/ClientDiary.tsx:274:17",
										"data-prohibitions": "[]",
										className: "p-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckItem, {
												"data-uid": "src/pages/client/ClientDiary.tsx:275:19",
												"data-prohibitions": "[editContent]",
												id: "e1",
												label: "Revisar lista de ideogramas (HSK1)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckItem, {
												"data-uid": "src/pages/client/ClientDiary.tsx:276:19",
												"data-prohibitions": "[editContent]",
												id: "e2",
												label: "Trabalho prático da faculdade"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckItem, {
												"data-uid": "src/pages/client/ClientDiary.tsx:277:19",
												"data-prohibitions": "[editContent]",
												id: "e3",
												label: "Leitura de artigo sobre Produtividade",
												border: false
											})
										]
									})
								})]
							})
						]
					})
				]
			})
		})]
	});
}
//#endregion
export { ClientDiary as default };

//# sourceMappingURL=ClientDiary-C4Qvsaw7.js.map