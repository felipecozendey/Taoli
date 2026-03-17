import { $ as Presence, Et as __toESM, H as useSize, J as createLucideIcon, M as CardTitle, N as Button, O as Card, Q as useControllableState, W as cn, a as AvatarImage, dt as require_jsx_runtime, ft as useComposedRefs, i as AvatarFallback, j as CardHeader, k as CardContent, n as DashboardHeader, ot as Primitive, pt as composeEventHandlers, q as Check, r as Avatar, t as PageContent, ut as createContextScope, wt as require_react } from "./PageContent-wcdRlike.js";
import { n as usePrevious, s as Label } from "./index-D5FI7v-L.js";
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
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-checkbox@1.3.3_@types+react-dom@19.2.3_@types+react@19.2.14__@types+rea_a9bfe74df417688e01ae6068318bf0dd/node_modules/@radix-ui/react-checkbox/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
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
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.input, {
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
//#region src/pages/client/ClientMind.tsx
var ProfCard = ({ n, r, img, fb }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
	"data-uid": "src/pages/client/ClientMind.tsx:11:3",
	"data-prohibitions": "[editContent]",
	className: "mb-6 bg-muted/40 border-dashed shadow-sm",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		"data-uid": "src/pages/client/ClientMind.tsx:12:5",
		"data-prohibitions": "[editContent]",
		className: "p-4 flex items-center gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
			"data-uid": "src/pages/client/ClientMind.tsx:13:7",
			"data-prohibitions": "[editContent]",
			className: "h-12 w-12 border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
				"data-uid": "src/pages/client/ClientMind.tsx:14:9",
				"data-prohibitions": "[editContent]",
				src: img
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
				"data-uid": "src/pages/client/ClientMind.tsx:15:9",
				"data-prohibitions": "[editContent]",
				children: fb
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/client/ClientMind.tsx:17:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/client/ClientMind.tsx:18:9",
				"data-prohibitions": "[editContent]",
				className: "font-semibold text-sm",
				children: n
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/client/ClientMind.tsx:19:9",
				"data-prohibitions": "[editContent]",
				className: "text-xs text-muted-foreground",
				children: r
			})]
		})]
	})
});
var CheckItem = ({ id, label, border = true }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-uid": "src/pages/client/ClientMind.tsx:34:3",
	"data-prohibitions": "[editContent]",
	className: `flex items-center space-x-3 p-4 hover:bg-muted/50 transition-colors ${border ? "border-b" : ""}`,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
		"data-uid": "src/pages/client/ClientMind.tsx:37:5",
		"data-prohibitions": "[editContent]",
		id,
		className: "h-5 w-5"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		"data-uid": "src/pages/client/ClientMind.tsx:38:5",
		"data-prohibitions": "[editContent]",
		htmlFor: id,
		className: "flex-1 cursor-pointer text-sm font-medium",
		children: label
	})]
});
function ClientMind() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientMind.tsx:46:5",
		"data-prohibitions": "[]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientMind.tsx:47:7",
			"data-prohibitions": "[editContent]",
			title: "Saúde Mental"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/client/ClientMind.tsx:48:7",
			"data-prohibitions": "[]",
			className: "max-w-4xl mx-auto w-full animate-fade-in-up",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfCard, {
					"data-uid": "src/pages/client/ClientMind.tsx:49:9",
					"data-prohibitions": "[editContent]",
					n: "Dr. Roberto",
					r: "Psicólogo",
					img: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=5",
					fb: "RO"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/client/ClientMind.tsx:55:9",
					"data-prohibitions": "[]",
					className: "mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/client/ClientMind.tsx:56:11",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/client/ClientMind.tsx:57:13",
							"data-prohibitions": "[]",
							className: "text-base text-center",
							children: "Como você está se sentindo hoje?"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/client/ClientMind.tsx:61:11",
						"data-prohibitions": "[]",
						className: "flex justify-center gap-2 sm:gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/client/ClientMind.tsx:62:13",
								"data-prohibitions": "[]",
								variant: "ghost",
								className: "h-auto flex-col gap-3 p-3 sm:p-4 hover:bg-blue-50 hover:text-blue-600",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frown, {
									"data-uid": "src/pages/client/ClientMind.tsx:66:15",
									"data-prohibitions": "[editContent]",
									className: "h-10 w-10 text-blue-400"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/client/ClientMind.tsx:67:15",
									"data-prohibitions": "[]",
									className: "text-xs font-medium",
									children: "Triste"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/client/ClientMind.tsx:69:13",
								"data-prohibitions": "[]",
								variant: "ghost",
								className: "h-auto flex-col gap-3 p-3 sm:p-4 hover:bg-slate-100 hover:text-slate-700",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meh, {
									"data-uid": "src/pages/client/ClientMind.tsx:73:15",
									"data-prohibitions": "[editContent]",
									className: "h-10 w-10 text-slate-400"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/client/ClientMind.tsx:74:15",
									"data-prohibitions": "[]",
									className: "text-xs font-medium",
									children: "Neutro"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/client/ClientMind.tsx:76:13",
								"data-prohibitions": "[]",
								variant: "ghost",
								className: "h-auto flex-col gap-3 p-3 sm:p-4 hover:bg-green-50 hover:text-green-600",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smile, {
									"data-uid": "src/pages/client/ClientMind.tsx:80:15",
									"data-prohibitions": "[editContent]",
									className: "h-10 w-10 text-green-400"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/client/ClientMind.tsx:81:15",
									"data-prohibitions": "[]",
									className: "text-xs font-medium",
									children: "Feliz"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/client/ClientMind.tsx:83:13",
								"data-prohibitions": "[]",
								variant: "ghost",
								className: "h-auto flex-col gap-3 p-3 sm:p-4 hover:bg-yellow-50 hover:text-yellow-600",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Laugh, {
									"data-uid": "src/pages/client/ClientMind.tsx:87:15",
									"data-prohibitions": "[editContent]",
									className: "h-10 w-10 text-yellow-500"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/client/ClientMind.tsx:88:15",
									"data-prohibitions": "[]",
									className: "text-xs font-medium",
									children: "Excelente"
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/client/ClientMind.tsx:92:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/pages/client/ClientMind.tsx:93:11",
						"data-prohibitions": "[]",
						className: "font-semibold text-lg mb-3 px-1",
						children: "Hábitos de Bem-estar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/pages/client/ClientMind.tsx:94:11",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/client/ClientMind.tsx:95:13",
							"data-prohibitions": "[]",
							className: "p-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckItem, {
								"data-uid": "src/pages/client/ClientMind.tsx:96:15",
								"data-prohibitions": "[editContent]",
								id: "h1",
								label: "Meditação 10 min"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckItem, {
								"data-uid": "src/pages/client/ClientMind.tsx:97:15",
								"data-prohibitions": "[editContent]",
								id: "h2",
								label: "Respiração Guiada",
								border: false
							})]
						})
					})]
				})
			]
		})]
	});
}
//#endregion
export { ClientMind as default };

//# sourceMappingURL=ClientMind-JNfIo0tH.js.map