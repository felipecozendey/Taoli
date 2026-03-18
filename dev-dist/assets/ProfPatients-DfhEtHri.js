import { B as Input, G as CardHeader, Ot as require_jsx_runtime, V as Card, Vt as require_react, W as CardFooter, Wt as __toESM, i as AvatarFallback, n as DashboardHeader, q as Button, r as Avatar, t as PageContent, ut as createLucideIcon } from "./PageContent-ChuXhdYa.js";
import { Q as Badge, ft as ArrowRight, ht as useToast, tt as Target } from "./index-a8s5enpu.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-mrpRqmBB.js";
var Copy = createLucideIcon("copy", [["rect", {
	width: "14",
	height: "14",
	x: "8",
	y: "8",
	rx: "2",
	ry: "2",
	key: "17jyea"
}], ["path", {
	d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
	key: "zix9uf"
}]]);
var Link = createLucideIcon("link", [["path", {
	d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
	key: "1cjeqo"
}], ["path", {
	d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
	key: "19qd67"
}]]);
var UserPlus = createLucideIcon("user-plus", [
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}],
	["line", {
		x1: "19",
		x2: "19",
		y1: "8",
		y2: "14",
		key: "1bvyxn"
	}],
	["line", {
		x1: "22",
		x2: "16",
		y1: "11",
		y2: "11",
		key: "1shjgl"
	}]
]);
//#endregion
//#region src/pages/professional/ProfPatients.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ProfPatients() {
	const { toast } = useToast();
	const [patients] = (0, import_react.useState)([{
		id: "1",
		name: "João Silva",
		status: "Ativo",
		objective: "Hipertrofia"
	}, {
		id: "2",
		name: "Maria Santos",
		status: "Pendente",
		objective: "Emagrecimento"
	}]);
	const copyCode = async (code) => {
		try {
			await navigator.clipboard.writeText(code);
			toast({
				title: "Sucesso!",
				description: "Código copiado para a área de transferência!"
			});
		} catch (err) {
			toast({
				title: "Erro",
				description: "Não foi possível copiar o código.",
				variant: "destructive"
			});
		}
	};
	const handleAccess = (name) => {
		toast({ description: `A abrir perfil de ${name}...` });
	};
	const getInitials = (name) => {
		return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/professional/ProfPatients.tsx:67:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/professional/ProfPatients.tsx:68:7",
			"data-prohibitions": "[]",
			title: "Os Meus Pacientes",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				"data-uid": "src/pages/professional/ProfPatients.tsx:69:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
					"data-uid": "src/pages/professional/ProfPatients.tsx:70:11",
					"data-prohibitions": "[]",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/professional/ProfPatients.tsx:71:13",
						"data-prohibitions": "[]",
						size: "sm",
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, {
							"data-uid": "src/pages/professional/ProfPatients.tsx:72:15",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/pages/professional/ProfPatients.tsx:73:15",
							"data-prohibitions": "[]",
							className: "hidden sm:inline",
							children: "Novo Paciente"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/professional/ProfPatients.tsx:76:11",
					"data-prohibitions": "[]",
					className: "sm:max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
						"data-uid": "src/pages/professional/ProfPatients.tsx:77:13",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							"data-uid": "src/pages/professional/ProfPatients.tsx:78:15",
							"data-prohibitions": "[]",
							children: "Convidar Paciente"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							"data-uid": "src/pages/professional/ProfPatients.tsx:79:15",
							"data-prohibitions": "[]",
							children: "Envie este código para o seu paciente para se conectarem."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/professional/ProfPatients.tsx:83:13",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2 mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/professional/ProfPatients.tsx:84:15",
							"data-prohibitions": "[]",
							className: "relative flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								"data-uid": "src/pages/professional/ProfPatients.tsx:85:17",
								"data-prohibitions": "[editContent]",
								className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/professional/ProfPatients.tsx:86:17",
								"data-prohibitions": "[editContent]",
								readOnly: true,
								value: "FIT-X89B2",
								className: "pl-9 font-mono font-medium text-base tracking-wider"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/professional/ProfPatients.tsx:92:15",
							"data-prohibitions": "[]",
							onClick: () => copyCode("FIT-X89B2"),
							className: "shrink-0 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								"data-uid": "src/pages/professional/ProfPatients.tsx:93:17",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/professional/ProfPatients.tsx:94:17",
								"data-prohibitions": "[]",
								className: "hidden sm:inline",
								children: "Copiar Link"
							})]
						})]
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/professional/ProfPatients.tsx:101:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/professional/ProfPatients.tsx:102:9",
				"data-prohibitions": "[]",
				className: "mb-6 animate-fade-in-up",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/professional/ProfPatients.tsx:103:11",
					"data-prohibitions": "[]",
					className: "text-muted-foreground text-sm md:text-base",
					children: "Faça a gestão da sua lista de clientes e envie novos convites."
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/professional/ProfPatients.tsx:108:9",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up",
				style: { animationDelay: "50ms" },
				children: patients.map((patient) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/professional/ProfPatients.tsx:113:13",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col transition-all hover:shadow-md border-border/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						"data-uid": "src/pages/professional/ProfPatients.tsx:117:15",
						"data-prohibitions": "[editContent]",
						className: "flex flex-row items-start justify-between pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/professional/ProfPatients.tsx:118:17",
							"data-prohibitions": "[editContent]",
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
								"data-uid": "src/pages/professional/ProfPatients.tsx:119:19",
								"data-prohibitions": "[editContent]",
								className: "h-12 w-12 border shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
									"data-uid": "src/pages/professional/ProfPatients.tsx:120:21",
									"data-prohibitions": "[editContent]",
									className: "bg-primary/5 text-primary font-medium",
									children: getInitials(patient.name)
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/professional/ProfPatients.tsx:124:19",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									"data-uid": "src/pages/professional/ProfPatients.tsx:125:21",
									"data-prohibitions": "[editContent]",
									className: "font-semibold text-base leading-none mb-1.5 text-foreground",
									children: patient.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/professional/ProfPatients.tsx:128:21",
									"data-prohibitions": "[editContent]",
									className: "flex items-center text-xs text-muted-foreground font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {
										"data-uid": "src/pages/professional/ProfPatients.tsx:129:23",
										"data-prohibitions": "[editContent]",
										className: "h-3 w-3 mr-1 opacity-70"
									}), patient.objective]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							"data-uid": "src/pages/professional/ProfPatients.tsx:134:17",
							"data-prohibitions": "[editContent]",
							variant: "outline",
							className: patient.status === "Ativo" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900 shadow-sm" : "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border-amber-200 dark:border-amber-900 shadow-sm",
							children: patient.status
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, {
						"data-uid": "src/pages/professional/ProfPatients.tsx:145:15",
						"data-prohibitions": "[]",
						className: "mt-auto pt-2 pb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/professional/ProfPatients.tsx:146:17",
							"data-prohibitions": "[]",
							variant: "secondary",
							className: "w-full justify-between group bg-muted/50 hover:bg-muted",
							onClick: () => handleAccess(patient.name),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/professional/ProfPatients.tsx:151:19",
								"data-prohibitions": "[]",
								className: "font-medium",
								children: "Aceder ao Prontuário"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								"data-uid": "src/pages/professional/ProfPatients.tsx:152:19",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
							})]
						})
					})]
				}, patient.id))
			})]
		})]
	});
}
//#endregion
export { ProfPatients as default };

//# sourceMappingURL=ProfPatients-DfhEtHri.js.map