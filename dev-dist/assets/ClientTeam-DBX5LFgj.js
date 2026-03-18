import { At as composeEventHandlers, B as Input, Ct as Primitive, Dt as createContextScope, G as CardHeader, H as CardContent, Ot as require_jsx_runtime, V as Card, Vt as require_react, Wt as __toESM, a as AvatarImage, at as cn, c as DropdownMenuContent, f as DropdownMenuTrigger, ht as useControllableState, i as AvatarFallback, kt as useComposedRefs, l as DropdownMenuItem, n as DashboardHeader, q as Button, r as Avatar, rt as useSize, s as DropdownMenu, t as PageContent, ut as createLucideIcon } from "./PageContent-ChuXhdYa.js";
import { Z as usePrevious, at as Plus, dt as Brain, et as Trash2, ht as useToast, lt as Dumbbell, pt as Apple, rt as Search } from "./index-a8s5enpu.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, s as DialogTrigger, t as Dialog } from "./dialog-mrpRqmBB.js";
var EllipsisVertical = createLucideIcon("ellipsis-vertical", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "1",
		key: "41hilf"
	}],
	["circle", {
		cx: "12",
		cy: "5",
		r: "1",
		key: "gxeob9"
	}],
	["circle", {
		cx: "12",
		cy: "19",
		r: "1",
		key: "lyex9k"
	}]
]);
//#endregion
//#region ../../cache/modules/gerenciador-pessoal-completo-6024e/node_modules/.pnpm/@radix-ui+react-switch@1.2.6_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react_e3738c514c10df2ef7e24af5ee461853/node_modules/@radix-ui/react-switch/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var SWITCH_NAME = "Switch";
var [createSwitchContext, createSwitchScope] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSwitch, name, checked: checkedProp, defaultChecked, required, disabled, value = "on", onCheckedChange, form, ...switchProps } = props;
	const [button, setButton] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
	const hasConsumerStoppedPropagationRef = import_react.useRef(false);
	const isFormControl = button ? form || !!button.closest("form") : true;
	const [checked, setChecked] = useControllableState({
		prop: checkedProp,
		defaultProp: defaultChecked ?? false,
		onChange: onCheckedChange,
		caller: SWITCH_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwitchProvider, {
		scope: __scopeSwitch,
		checked,
		disabled,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			role: "switch",
			"aria-checked": checked,
			"aria-required": required,
			"data-state": getState(checked),
			"data-disabled": disabled ? "" : void 0,
			disabled,
			value,
			...switchProps,
			ref: composedRefs,
			onClick: composeEventHandlers(props.onClick, (event) => {
				setChecked((prevChecked) => !prevChecked);
				if (isFormControl) {
					hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
					if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
				}
			})
		}), isFormControl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchBubbleInput, {
			control: button,
			bubbles: !hasConsumerStoppedPropagationRef.current,
			name,
			value,
			checked,
			required,
			disabled,
			form,
			style: { transform: "translateX(-100%)" }
		})]
	});
});
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSwitch, ...thumbProps } = props;
	const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		"data-state": getState(context.checked),
		"data-disabled": context.disabled ? "" : void 0,
		...thumbProps,
		ref: forwardedRef
	});
});
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = import_react.forwardRef(({ __scopeSwitch, control, checked, bubbles = true, ...props }, forwardedRef) => {
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(ref, forwardedRef);
	const prevChecked = usePrevious(checked);
	const controlSize = useSize(control);
	import_react.useEffect(() => {
		const input = ref.current;
		if (!input) return;
		const inputProto = window.HTMLInputElement.prototype;
		const setChecked = Object.getOwnPropertyDescriptor(inputProto, "checked").set;
		if (prevChecked !== checked && setChecked) {
			const event = new Event("click", { bubbles });
			setChecked.call(input, checked);
			input.dispatchEvent(event);
		}
	}, [
		prevChecked,
		checked,
		bubbles
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "checkbox",
		"aria-hidden": true,
		defaultChecked: checked,
		...props,
		tabIndex: -1,
		ref: composedRefs,
		style: {
			...props.style,
			...controlSize,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0
		}
	});
});
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
	return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
//#endregion
//#region src/components/ui/switch.tsx
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	"data-uid": "src/components/ui/switch.tsx:11:3",
	"data-prohibitions": "[editContent]",
	className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
		"data-uid": "src/components/ui/switch.tsx:19:5",
		"data-prohibitions": "[editContent]",
		className: cn("pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0")
	})
}));
Switch.displayName = Root.displayName;
//#endregion
//#region src/pages/client/ClientTeam.tsx
var initialProfessionals = [{
	id: "1",
	name: "Dr. Carlos Silva",
	specialty: "Psicologia",
	avatarSeed: "carlos",
	baseArea: "mental",
	permissions: {
		nutrition: false,
		training: false,
		mental: true
	}
}, {
	id: "2",
	name: "Dra. Thaís",
	specialty: "Nutrição",
	avatarSeed: "thais",
	baseArea: "nutrition",
	permissions: {
		nutrition: true,
		training: true,
		mental: false
	}
}];
var areaDetails = {
	nutrition: {
		label: "Partilhar Nutrição",
		icon: Apple,
		color: "text-emerald-500",
		bg: "bg-emerald-100 dark:bg-emerald-500/20"
	},
	training: {
		label: "Partilhar Treinos",
		icon: Dumbbell,
		color: "text-blue-500",
		bg: "bg-blue-100 dark:bg-blue-500/20"
	},
	mental: {
		label: "Partilhar Saúde Mental",
		icon: Brain,
		color: "text-purple-500",
		bg: "bg-purple-100 dark:bg-purple-500/20"
	}
};
function ClientTeam() {
	const [professionals, setProfessionals] = (0, import_react.useState)(initialProfessionals);
	const [isConnectOpen, setIsConnectOpen] = (0, import_react.useState)(false);
	const [inviteCode, setInviteCode] = (0, import_react.useState)("");
	const { toast } = useToast();
	const togglePermission = (profId, area) => {
		setProfessionals((prev) => prev.map((prof) => {
			if (prof.id === profId) return {
				...prof,
				permissions: {
					...prof.permissions,
					[area]: !prof.permissions[area]
				}
			};
			return prof;
		}));
	};
	const handleRemove = (profId) => {
		setProfessionals((prev) => prev.filter((p) => p.id !== profId));
		toast({
			title: "Profissional removido",
			description: "O acesso aos seus dados foi revogado com sucesso."
		});
	};
	const handleConnect = () => {
		if (!inviteCode.trim()) return;
		toast({
			title: "Conexão estabelecida!",
			description: "Profissional encontrado e adicionado à sua equipe."
		});
		setIsConnectOpen(false);
		setInviteCode("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientTeam.tsx:116:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientTeam.tsx:117:7",
			"data-prohibitions": "[]",
			title: "A Minha Equipe de Saúde",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				"data-uid": "src/pages/client/ClientTeam.tsx:118:9",
				"data-prohibitions": "[]",
				open: isConnectOpen,
				onOpenChange: setIsConnectOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
					"data-uid": "src/pages/client/ClientTeam.tsx:119:11",
					"data-prohibitions": "[]",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/client/ClientTeam.tsx:120:13",
						"data-prohibitions": "[]",
						size: "sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							"data-uid": "src/pages/client/ClientTeam.tsx:121:15",
							"data-prohibitions": "[editContent]",
							className: "mr-2 h-4 w-4"
						}), " Conectar Profissional"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/client/ClientTeam.tsx:124:11",
					"data-prohibitions": "[]",
					className: "sm:max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
						"data-uid": "src/pages/client/ClientTeam.tsx:125:13",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							"data-uid": "src/pages/client/ClientTeam.tsx:126:15",
							"data-prohibitions": "[]",
							children: "Conectar Novo Profissional"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/client/ClientTeam.tsx:128:13",
						"data-prohibitions": "[]",
						className: "flex items-center space-x-2 pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/client/ClientTeam.tsx:129:15",
							"data-prohibitions": "[editContent]",
							placeholder: "Código de Convite",
							value: inviteCode,
							onChange: (e) => setInviteCode(e.target.value)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/client/ClientTeam.tsx:134:15",
							"data-prohibitions": "[]",
							onClick: handleConnect,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								"data-uid": "src/pages/client/ClientTeam.tsx:135:17",
								"data-prohibitions": "[editContent]",
								className: "mr-2 h-4 w-4"
							}), "Procurar"]
						})]
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/client/ClientTeam.tsx:143:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/client/ClientTeam.tsx:144:9",
				"data-prohibitions": "[]",
				className: "mb-8 max-w-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/client/ClientTeam.tsx:145:11",
					"data-prohibitions": "[]",
					className: "text-muted-foreground text-lg",
					children: "Tens o controlo total dos teus dados. Decide o que partilhar com cada profissional."
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/client/ClientTeam.tsx:150:9",
				"data-prohibitions": "[editContent]",
				className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3",
				children: [professionals.map((prof) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/client/ClientTeam.tsx:152:13",
					"data-prohibitions": "[editContent]",
					className: "animate-fade-in-up border-border/60 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						"data-uid": "src/pages/client/ClientTeam.tsx:153:15",
						"data-prohibitions": "[editContent]",
						className: "flex flex-row items-start justify-between space-y-0 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/client/ClientTeam.tsx:154:17",
							"data-prohibitions": "[editContent]",
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								"data-uid": "src/pages/client/ClientTeam.tsx:155:19",
								"data-prohibitions": "[editContent]",
								className: "h-12 w-12 border bg-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
									"data-uid": "src/pages/client/ClientTeam.tsx:156:21",
									"data-prohibitions": "[editContent]",
									src: `https://img.usecurling.com/ppl/thumbnail?seed=${prof.avatarSeed}`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
									"data-uid": "src/pages/client/ClientTeam.tsx:159:21",
									"data-prohibitions": "[editContent]",
									children: prof.name.charAt(0)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/client/ClientTeam.tsx:161:19",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									"data-uid": "src/pages/client/ClientTeam.tsx:162:21",
									"data-prohibitions": "[editContent]",
									className: "font-semibold text-base leading-tight",
									children: prof.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/client/ClientTeam.tsx:163:21",
									"data-prohibitions": "[editContent]",
									className: "text-sm text-muted-foreground mt-0.5",
									children: prof.specialty
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, {
							"data-uid": "src/pages/client/ClientTeam.tsx:166:17",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
								"data-uid": "src/pages/client/ClientTeam.tsx:167:19",
								"data-prohibitions": "[]",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/client/ClientTeam.tsx:168:21",
									"data-prohibitions": "[]",
									variant: "ghost",
									size: "icon",
									className: "-mr-2 -mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, {
										"data-uid": "src/pages/client/ClientTeam.tsx:169:23",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-4 text-muted-foreground"
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
								"data-uid": "src/pages/client/ClientTeam.tsx:172:19",
								"data-prohibitions": "[]",
								align: "end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									"data-uid": "src/pages/client/ClientTeam.tsx:173:21",
									"data-prohibitions": "[]",
									onClick: () => handleRemove(prof.id),
									className: "text-destructive cursor-pointer focus:text-destructive",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
										"data-uid": "src/pages/client/ClientTeam.tsx:177:23",
										"data-prohibitions": "[editContent]",
										className: "mr-2 h-4 w-4"
									}), " Remover Profissional"]
								})
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						"data-uid": "src/pages/client/ClientTeam.tsx:182:15",
						"data-prohibitions": "[editContent]",
						className: "pt-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/client/ClientTeam.tsx:183:17",
							"data-prohibitions": "[editContent]",
							className: "pt-4 border-t border-border/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								"data-uid": "src/pages/client/ClientTeam.tsx:184:19",
								"data-prohibitions": "[]",
								className: "text-sm font-medium mb-4 text-foreground/80",
								children: "Permissões de Partilha"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/client/ClientTeam.tsx:187:19",
								"data-prohibitions": "[editContent]",
								className: "space-y-4",
								children: Object.keys(areaDetails).filter((area) => area !== prof.baseArea).map((area) => {
									const detail = areaDetails[area];
									const Icon = detail.icon;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/client/ClientTeam.tsx:194:27",
										"data-prohibitions": "[editContent]",
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/client/ClientTeam.tsx:195:29",
											"data-prohibitions": "[editContent]",
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/pages/client/ClientTeam.tsx:196:31",
												"data-prohibitions": "[editContent]",
												className: `p-2 rounded-md ${detail.bg}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
													"data-uid": "src/pages/client/ClientTeam.tsx:197:33",
													"data-prohibitions": "[editContent]",
													className: `h-4 w-4 ${detail.color}`
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/client/ClientTeam.tsx:199:31",
												"data-prohibitions": "[editContent]",
												className: "text-sm font-medium text-muted-foreground",
												children: detail.label
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											"data-uid": "src/pages/client/ClientTeam.tsx:203:29",
											"data-prohibitions": "[editContent]",
											checked: prof.permissions[area],
											onCheckedChange: () => togglePermission(prof.id, area)
										})]
									}, area);
								})
							})]
						})
					})]
				}, prof.id)), professionals.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/client/ClientTeam.tsx:216:13",
					"data-prohibitions": "[]",
					className: "col-span-full p-12 text-center text-muted-foreground border rounded-xl border-dashed",
					children: "Nenhum profissional conectado no momento."
				})]
			})]
		})]
	});
}
//#endregion
export { ClientTeam as default };

//# sourceMappingURL=ClientTeam-DBX5LFgj.js.map