import { B as Input, H as CardContent, Ot as require_jsx_runtime, V as Card, Vt as require_react, Wt as __toESM, at as cn, lt as Check, n as DashboardHeader, q as Button, t as PageContent, ut as createLucideIcon } from "./PageContent-ChuXhdYa.js";
import { Q as Badge, ht as Activity, i as TabsTrigger, n as TabsContent, nt as Target, r as TabsList, t as Tabs, ut as Dumbbell } from "./index-CS3Ee0Ro.js";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-CShmbrjJ.js";
var CircleCheck = createLucideIcon("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]);
var Timer = createLucideIcon("timer", [
	["line", {
		x1: "10",
		x2: "14",
		y1: "2",
		y2: "2",
		key: "14vaq8"
	}],
	["line", {
		x1: "12",
		x2: "15",
		y1: "14",
		y2: "11",
		key: "17fdiu"
	}],
	["circle", {
		cx: "12",
		cy: "14",
		r: "8",
		key: "1e1u0o"
	}]
]);
//#endregion
//#region src/pages/client/ClientTraining.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var TODAY_EXERCISES = [
	{
		id: "1",
		name: "Supino Reto com Barra",
		m: "Peito",
		sets: "3x",
		reps: "10-12"
	},
	{
		id: "2",
		name: "Desenvolvimento com Halteres",
		m: "Ombros",
		sets: "4x",
		reps: "10"
	},
	{
		id: "3",
		name: "Tríceps Pulley",
		m: "Tríceps",
		sets: "3x",
		reps: "15"
	}
];
var WEEKLY_PLANS = [
	{
		id: "A",
		title: "Treino A",
		desc: "Peito, Ombro e Tríceps"
	},
	{
		id: "B",
		title: "Treino B",
		desc: "Costas, Bíceps e Abdômen"
	},
	{
		id: "C",
		title: "Treino C",
		desc: "Pernas Completas e Panturrilha"
	},
	{
		id: "D",
		title: "Descanso Ativo",
		desc: "Cardio leve 30 min + Alongamento"
	}
];
var LOAD_EVOLUTION = [
	{
		id: "1",
		name: "Supino Reto com Barra",
		old: "60kg",
		new: "70kg",
		date: "Há 2 semanas"
	},
	{
		id: "2",
		name: "Leg Press 45°",
		old: "150kg",
		new: "180kg",
		date: "Há 1 mês"
	},
	{
		id: "3",
		name: "Remada Curvada",
		old: "40kg",
		new: "50kg",
		date: "Há 3 semanas"
	}
];
function ClientTraining() {
	const [completed, setCompleted] = (0, import_react.useState)({});
	const toggleComplete = (id) => setCompleted((p) => ({
		...p,
		[id]: !p[id]
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientTraining.tsx:43:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col min-h-full pb-20 md:pb-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientTraining.tsx:44:7",
			"data-prohibitions": "[]",
			title: "Os Meus Treinos",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				"data-uid": "src/pages/client/ClientTraining.tsx:45:9",
				"data-prohibitions": "[]",
				variant: "secondary",
				className: "hidden sm:inline-flex bg-muted",
				children: "Treinador: Prof. Marcos"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/client/ClientTraining.tsx:50:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-3xl mx-auto w-full animate-fade-in-up px-4 py-4 md:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/client/ClientTraining.tsx:51:9",
				"data-prohibitions": "[]",
				className: "flex sm:hidden mb-4 items-center gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					"data-uid": "src/pages/client/ClientTraining.tsx:52:11",
					"data-prohibitions": "[]",
					variant: "secondary",
					className: "bg-muted w-full justify-center py-1.5 text-sm",
					children: "Treinador: Prof. Marcos"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				"data-uid": "src/pages/client/ClientTraining.tsx:57:9",
				"data-prohibitions": "[editContent]",
				defaultValue: "today",
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-uid": "src/pages/client/ClientTraining.tsx:58:11",
						"data-prohibitions": "[]",
						className: "grid w-full grid-cols-3 mb-6 h-auto p-1 bg-muted/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/client/ClientTraining.tsx:59:13",
								"data-prohibitions": "[]",
								value: "today",
								className: "py-2.5 text-xs sm:text-sm whitespace-normal text-center h-full",
								children: "Treino de Hoje"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/client/ClientTraining.tsx:65:13",
								"data-prohibitions": "[]",
								value: "plans",
								className: "py-2.5 text-xs sm:text-sm whitespace-normal text-center h-full",
								children: "Meus Planos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								"data-uid": "src/pages/client/ClientTraining.tsx:71:13",
								"data-prohibitions": "[]",
								value: "evolution",
								className: "py-2.5 text-xs sm:text-sm whitespace-normal text-center h-full",
								children: [
									"Evolução",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {
										"data-uid": "src/pages/client/ClientTraining.tsx:76:15",
										"data-prohibitions": "[editContent]",
										className: "sm:hidden"
									}),
									" de Cargas"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						"data-uid": "src/pages/client/ClientTraining.tsx:80:11",
						"data-prohibitions": "[editContent]",
						value: "today",
						className: "mt-0 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/client/ClientTraining.tsx:81:13",
								"data-prohibitions": "[]",
								className: "bg-primary/10 border border-primary/20 p-4 rounded-xl flex items-center justify-between mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/client/ClientTraining.tsx:82:15",
									"data-prohibitions": "[]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										"data-uid": "src/pages/client/ClientTraining.tsx:83:17",
										"data-prohibitions": "[]",
										className: "font-bold text-primary text-lg",
										children: "Treino A - Peito e Tríceps"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/client/ClientTraining.tsx:84:17",
										"data-prohibitions": "[]",
										className: "flex items-center gap-1.5 text-primary/80 text-sm mt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, {
											"data-uid": "src/pages/client/ClientTraining.tsx:85:19",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientTraining.tsx:86:19",
											"data-prohibitions": "[]",
											children: "Duração estimada: 55 min"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, {
									"data-uid": "src/pages/client/ClientTraining.tsx:89:15",
									"data-prohibitions": "[editContent]",
									className: "w-10 h-10 text-primary/30"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/client/ClientTraining.tsx:92:13",
								"data-prohibitions": "[editContent]",
								className: "space-y-4",
								children: TODAY_EXERCISES.map((ex, idx) => {
									const isCompleted = completed[ex.id];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
										"data-uid": "src/pages/client/ClientTraining.tsx:96:19",
										"data-prohibitions": "[editContent]",
										className: cn("transition-all duration-300", isCompleted && "opacity-60 bg-muted/50"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
											"data-uid": "src/pages/client/ClientTraining.tsx:103:21",
											"data-prohibitions": "[editContent]",
											className: "p-4 sm:p-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientTraining.tsx:104:23",
												"data-prohibitions": "[editContent]",
												className: "flex items-start justify-between gap-4 mb-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/client/ClientTraining.tsx:105:25",
													"data-prohibitions": "[editContent]",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															"data-uid": "src/pages/client/ClientTraining.tsx:106:27",
															"data-prohibitions": "[editContent]",
															className: "flex items-center gap-2 mb-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																"data-uid": "src/pages/client/ClientTraining.tsx:107:29",
																"data-prohibitions": "[editContent]",
																className: "text-xs font-semibold bg-muted px-2 py-0.5 rounded text-muted-foreground",
																children: idx + 1
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																"data-uid": "src/pages/client/ClientTraining.tsx:110:29",
																"data-prohibitions": "[editContent]",
																className: "text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded dark:bg-blue-900/30 dark:text-blue-400",
																children: ex.m
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
															"data-uid": "src/pages/client/ClientTraining.tsx:114:27",
															"data-prohibitions": "[editContent]",
															className: cn("font-bold text-base sm:text-lg leading-tight", isCompleted && "line-through text-muted-foreground"),
															children: ex.name
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															"data-uid": "src/pages/client/ClientTraining.tsx:122:27",
															"data-prohibitions": "[editContent]",
															className: "text-sm text-muted-foreground mt-1 flex items-center gap-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {
																	"data-uid": "src/pages/client/ClientTraining.tsx:123:29",
																	"data-prohibitions": "[editContent]",
																	className: "w-3.5 h-3.5"
																}),
																" Meta: ",
																ex.sets,
																" ",
																ex.reps,
																" reps"
															]
														})
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													"data-uid": "src/pages/client/ClientTraining.tsx:126:25",
													"data-prohibitions": "[editContent]",
													variant: isCompleted ? "default" : "outline",
													size: "icon",
													className: cn("shrink-0 rounded-full h-12 w-12 transition-colors", isCompleted ? "bg-emerald-500 hover:bg-emerald-600 border-emerald-500 text-white" : "border-muted-foreground/30"),
													onClick: () => toggleComplete(ex.id),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
														"data-uid": "src/pages/client/ClientTraining.tsx:137:27",
														"data-prohibitions": "[editContent]",
														className: cn("h-6 w-6", isCompleted ? "text-white" : "text-muted-foreground/50")
													})
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientTraining.tsx:146:23",
												"data-prohibitions": "[]",
												className: "grid grid-cols-2 gap-3 pt-3 border-t border-dashed",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/client/ClientTraining.tsx:147:25",
													"data-prohibitions": "[]",
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														"data-uid": "src/pages/client/ClientTraining.tsx:148:27",
														"data-prohibitions": "[]",
														className: "text-xs font-medium text-muted-foreground",
														children: "Carga (kg)"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/client/ClientTraining.tsx:151:27",
														"data-prohibitions": "[editContent]",
														type: "number",
														placeholder: "Ex: 20",
														className: "h-11 bg-background text-sm",
														disabled: isCompleted
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/client/ClientTraining.tsx:158:25",
													"data-prohibitions": "[]",
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														"data-uid": "src/pages/client/ClientTraining.tsx:159:27",
														"data-prohibitions": "[]",
														className: "text-xs font-medium text-muted-foreground",
														children: "Repetições"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/client/ClientTraining.tsx:162:27",
														"data-prohibitions": "[editContent]",
														type: "number",
														placeholder: "Ex: 12",
														className: "h-11 bg-background text-sm",
														disabled: isCompleted
													})]
												})]
											})]
										})
									}, ex.id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/client/ClientTraining.tsx:176:13",
								"data-prohibitions": "[]",
								className: "w-full h-14 text-lg mt-6",
								size: "lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									"data-uid": "src/pages/client/ClientTraining.tsx:177:15",
									"data-prohibitions": "[editContent]",
									className: "w-5 h-5 mr-2"
								}), " Finalizar Treino"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/client/ClientTraining.tsx:181:11",
						"data-prohibitions": "[editContent]",
						value: "plans",
						className: "mt-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
							"data-uid": "src/pages/client/ClientTraining.tsx:182:13",
							"data-prohibitions": "[editContent]",
							type: "single",
							collapsible: true,
							className: "w-full space-y-3",
							children: WEEKLY_PLANS.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
								"data-uid": "src/pages/client/ClientTraining.tsx:184:17",
								"data-prohibitions": "[editContent]",
								value: plan.id,
								className: "bg-card border rounded-xl overflow-hidden px-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
									"data-uid": "src/pages/client/ClientTraining.tsx:189:19",
									"data-prohibitions": "[editContent]",
									className: "px-4 py-4 hover:no-underline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/client/ClientTraining.tsx:190:21",
										"data-prohibitions": "[editContent]",
										className: "flex flex-col items-start text-left gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientTraining.tsx:191:23",
											"data-prohibitions": "[editContent]",
											className: "font-bold text-base",
											children: plan.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientTraining.tsx:192:23",
											"data-prohibitions": "[editContent]",
											className: "text-sm text-muted-foreground font-normal",
											children: plan.desc
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
									"data-uid": "src/pages/client/ClientTraining.tsx:195:19",
									"data-prohibitions": "[]",
									className: "px-4 pb-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/client/ClientTraining.tsx:196:21",
										"data-prohibitions": "[]",
										className: "bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/client/ClientTraining.tsx:197:23",
											"data-prohibitions": "[]",
											className: "font-medium text-foreground mb-2",
											children: "Exercícios previstos:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
											"data-uid": "src/pages/client/ClientTraining.tsx:198:23",
											"data-prohibitions": "[]",
											className: "list-disc list-inside space-y-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
													"data-uid": "src/pages/client/ClientTraining.tsx:199:25",
													"data-prohibitions": "[]",
													children: "Exercício Exemplo 1"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
													"data-uid": "src/pages/client/ClientTraining.tsx:200:25",
													"data-prohibitions": "[]",
													children: "Exercício Exemplo 2"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
													"data-uid": "src/pages/client/ClientTraining.tsx:201:25",
													"data-prohibitions": "[]",
													children: "Exercício Exemplo 3"
												})
											]
										})]
									})
								})]
							}, plan.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/client/ClientTraining.tsx:210:11",
						"data-prohibitions": "[editContent]",
						value: "evolution",
						className: "mt-0 space-y-3",
						children: LOAD_EVOLUTION.map((evo) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/client/ClientTraining.tsx:212:15",
							"data-prohibitions": "[editContent]",
							className: "overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								"data-uid": "src/pages/client/ClientTraining.tsx:213:17",
								"data-prohibitions": "[editContent]",
								className: "p-4 sm:p-5 flex items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/client/ClientTraining.tsx:214:19",
									"data-prohibitions": "[editContent]",
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-uid": "src/pages/client/ClientTraining.tsx:215:21",
										"data-prohibitions": "[editContent]",
										className: "text-xs text-muted-foreground mb-1 font-medium flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
												"data-uid": "src/pages/client/ClientTraining.tsx:216:23",
												"data-prohibitions": "[editContent]",
												className: "w-3.5 h-3.5"
											}),
											" ",
											evo.date
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										"data-uid": "src/pages/client/ClientTraining.tsx:218:21",
										"data-prohibitions": "[editContent]",
										className: "font-bold text-base truncate",
										children: evo.name
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/client/ClientTraining.tsx:220:19",
									"data-prohibitions": "[editContent]",
									className: "flex items-center gap-2 sm:gap-3 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-2 rounded-lg shrink-0 border border-emerald-100 dark:border-emerald-900/50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientTraining.tsx:221:21",
											"data-prohibitions": "[editContent]",
											className: "text-sm font-semibold text-muted-foreground line-through decoration-emerald-300",
											children: evo.old
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientTraining.tsx:224:21",
											"data-prohibitions": "[]",
											className: "text-emerald-500 font-bold text-lg sm:text-xl",
											children: "→"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientTraining.tsx:225:21",
											"data-prohibitions": "[editContent]",
											className: "text-emerald-700 dark:text-emerald-400 font-bold text-lg sm:text-xl",
											children: evo.new
										})
									]
								})]
							})
						}, evo.id))
					})
				]
			})]
		})]
	});
}
//#endregion
export { ClientTraining as default };

//# sourceMappingURL=ClientTraining-KIF9xoiy.js.map