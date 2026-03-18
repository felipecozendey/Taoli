import { At as require_jsx_runtime, E as Skeleton, Gt as require_react, Jt as __toESM, K as Input, X as useAuth, Z as supabase, dt as Check, ft as createLucideIcon, n as DashboardHeader, ot as cn, q as Button, t as PageContent } from "./PageContent-DFaAkjCU.js";
import { Et as Dumbbell, Mt as Activity, Q as Badge, ct as Card, gt as Target, i as TabsTrigger, lt as CardContent, n as TabsContent, r as TabsList, t as Tabs } from "./index-CJCaxbOL.js";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-DNZhsLtn.js";
var CircleCheck = createLucideIcon("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]);
var HeartPulse = createLucideIcon("heart-pulse", [["path", {
	d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
	key: "mvr1a0"
}], ["path", {
	d: "M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27",
	key: "auskq0"
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
//#region src/services/training.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var getClientActivePlans = async (clientId) => {
	try {
		const { data, error } = await supabase.from("exercise_plans").select("*").eq("client_id", clientId).eq("is_active", true);
		if (error) throw error;
		return data;
	} catch (error) {
		console.error("Error in getClientActivePlans:", error);
		throw error;
	}
};
var getFullPlanDetails = async (planId) => {
	try {
		const { data, error } = await supabase.from("exercise_plans").select(`
        *,
        items:exercise_plan_items(
          *,
          exercise:exercises(
            name, 
            muscle_group, 
            video_url
          )
        )
      `).eq("id", planId).single();
		if (error) throw error;
		if (data && data.items) data.items.sort((a, b) => a.order_index - b.order_index);
		return data;
	} catch (error) {
		console.error("Error in getFullPlanDetails:", error);
		throw error;
	}
};
//#endregion
//#region src/pages/client/ClientTraining.tsx
var import_jsx_runtime = require_jsx_runtime();
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
	const { user } = useAuth();
	const [completed, setCompleted] = (0, import_react.useState)({});
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [allPlans, setAllPlans] = (0, import_react.useState)([]);
	const [activePlan, setActivePlan] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let isMounted = true;
		const loadData = async () => {
			if (!user?.id) return;
			try {
				setIsLoading(true);
				const plans = await getClientActivePlans(user.id);
				if (!isMounted) return;
				if (plans && plans.length > 0) {
					setAllPlans(plans);
					const fullDetails = await getFullPlanDetails(plans[0].id);
					if (isMounted) setActivePlan(fullDetails);
				} else {
					setAllPlans([]);
					setActivePlan(null);
				}
			} catch (error) {
				console.error("Error fetching plans:", error);
			} finally {
				if (isMounted) setIsLoading(false);
			}
		};
		loadData();
		return () => {
			isMounted = false;
		};
	}, [user?.id]);
	const toggleComplete = (id) => setCompleted((p) => ({
		...p,
		[id]: !p[id]
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientTraining.tsx:100:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col min-h-full pb-20 md:pb-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientTraining.tsx:101:7",
			"data-prohibitions": "[]",
			title: "Os Meus Treinos",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				"data-uid": "src/pages/client/ClientTraining.tsx:102:9",
				"data-prohibitions": "[]",
				variant: "secondary",
				className: "hidden sm:inline-flex bg-muted",
				children: "Área de Exercício"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageContent, {
			"data-uid": "src/pages/client/ClientTraining.tsx:107:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-3xl mx-auto w-full animate-fade-in-up px-4 py-4 md:p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				"data-uid": "src/pages/client/ClientTraining.tsx:108:9",
				"data-prohibitions": "[editContent]",
				defaultValue: "today",
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-uid": "src/pages/client/ClientTraining.tsx:109:11",
						"data-prohibitions": "[]",
						className: "grid w-full grid-cols-3 mb-6 h-auto p-1 bg-muted/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/client/ClientTraining.tsx:110:13",
								"data-prohibitions": "[]",
								value: "today",
								className: "py-2.5 text-xs sm:text-sm whitespace-normal text-center h-full",
								children: "Treino de Hoje"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/client/ClientTraining.tsx:116:13",
								"data-prohibitions": "[]",
								value: "plans",
								className: "py-2.5 text-xs sm:text-sm whitespace-normal text-center h-full",
								children: "Meus Planos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								"data-uid": "src/pages/client/ClientTraining.tsx:122:13",
								"data-prohibitions": "[]",
								value: "evolution",
								className: "py-2.5 text-xs sm:text-sm whitespace-normal text-center h-full",
								children: [
									"Evolução",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {
										"data-uid": "src/pages/client/ClientTraining.tsx:127:15",
										"data-prohibitions": "[editContent]",
										className: "sm:hidden"
									}),
									" de Cargas"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/client/ClientTraining.tsx:131:11",
						"data-prohibitions": "[editContent]",
						value: "today",
						className: "mt-0 space-y-4",
						children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/client/ClientTraining.tsx:133:15",
							"data-prohibitions": "[]",
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/pages/client/ClientTraining.tsx:134:17",
									"data-prohibitions": "[editContent]",
									className: "h-24 w-full rounded-xl"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/pages/client/ClientTraining.tsx:135:17",
									"data-prohibitions": "[editContent]",
									className: "h-40 w-full rounded-xl"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/pages/client/ClientTraining.tsx:136:17",
									"data-prohibitions": "[editContent]",
									className: "h-40 w-full rounded-xl"
								})
							]
						}) : !activePlan ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/client/ClientTraining.tsx:139:15",
							"data-prohibitions": "[]",
							className: "text-center py-16 px-4 bg-muted/30 rounded-xl border border-dashed border-muted-foreground/20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, {
									"data-uid": "src/pages/client/ClientTraining.tsx:140:17",
									"data-prohibitions": "[editContent]",
									className: "w-12 h-12 text-muted-foreground/30 mx-auto mb-4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									"data-uid": "src/pages/client/ClientTraining.tsx:141:17",
									"data-prohibitions": "[]",
									className: "text-lg font-medium text-foreground mb-1",
									children: "Nenhum plano ativo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/client/ClientTraining.tsx:142:17",
									"data-prohibitions": "[]",
									className: "text-sm text-muted-foreground",
									children: "Nenhum plano de treino ou reabilitação prescrito no momento."
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/client/ClientTraining.tsx:148:17",
								"data-prohibitions": "[editContent]",
								className: cn("border p-4 rounded-xl flex items-center justify-between mb-6", activePlan.plan_type === "workout" ? "bg-primary/10 border-primary/20 text-primary" : "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/client/ClientTraining.tsx:156:19",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										"data-uid": "src/pages/client/ClientTraining.tsx:157:21",
										"data-prohibitions": "[editContent]",
										className: "font-bold text-lg",
										children: activePlan.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/client/ClientTraining.tsx:158:21",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-1.5 opacity-80 text-sm mt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, {
											"data-uid": "src/pages/client/ClientTraining.tsx:159:23",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientTraining.tsx:160:23",
											"data-prohibitions": "[editContent]",
											children: activePlan.plan_type === "workout" ? "Treino Prescrito" : "Protocolo de Reabilitação"
										})]
									})]
								}), activePlan.plan_type === "workout" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, {
									"data-uid": "src/pages/client/ClientTraining.tsx:168:21",
									"data-prohibitions": "[editContent]",
									className: "w-10 h-10 opacity-30"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartPulse, {
									"data-uid": "src/pages/client/ClientTraining.tsx:170:21",
									"data-prohibitions": "[editContent]",
									className: "w-10 h-10 opacity-30"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/client/ClientTraining.tsx:174:17",
								"data-prohibitions": "[editContent]",
								className: "space-y-4",
								children: activePlan.items?.map((item, idx) => {
									const isCompleted = completed[item.id];
									const isWorkout = activePlan.plan_type === "workout";
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
										"data-uid": "src/pages/client/ClientTraining.tsx:180:23",
										"data-prohibitions": "[editContent]",
										className: cn("transition-all duration-300", isCompleted && "opacity-60 bg-muted/50"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
											"data-uid": "src/pages/client/ClientTraining.tsx:187:25",
											"data-prohibitions": "[editContent]",
											className: "p-4 sm:p-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientTraining.tsx:188:27",
												"data-prohibitions": "[editContent]",
												className: "flex items-start justify-between gap-4 mb-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/client/ClientTraining.tsx:189:29",
													"data-prohibitions": "[editContent]",
													className: "flex-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															"data-uid": "src/pages/client/ClientTraining.tsx:190:31",
															"data-prohibitions": "[editContent]",
															className: "flex items-center gap-2 mb-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																"data-uid": "src/pages/client/ClientTraining.tsx:191:33",
																"data-prohibitions": "[editContent]",
																className: "text-xs font-semibold bg-muted px-2 py-0.5 rounded text-muted-foreground",
																children: idx + 1
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																"data-uid": "src/pages/client/ClientTraining.tsx:194:33",
																"data-prohibitions": "[editContent]",
																className: "text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded dark:bg-blue-900/30 dark:text-blue-400",
																children: item.exercise?.muscle_group || "Geral"
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
															"data-uid": "src/pages/client/ClientTraining.tsx:198:31",
															"data-prohibitions": "[editContent]",
															className: cn("font-bold text-base sm:text-lg leading-tight mt-1", isCompleted && "line-through text-muted-foreground"),
															children: item.exercise?.name || "Exercício"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															"data-uid": "src/pages/client/ClientTraining.tsx:206:31",
															"data-prohibitions": "[editContent]",
															className: "text-sm text-muted-foreground mt-1 flex items-center gap-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {
																	"data-uid": "src/pages/client/ClientTraining.tsx:207:33",
																	"data-prohibitions": "[editContent]",
																	className: "w-3.5 h-3.5"
																}),
																" Meta: ",
																item.sets,
																"x ",
																item.reps,
																" ",
																"reps"
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															"data-uid": "src/pages/client/ClientTraining.tsx:212:31",
															"data-prohibitions": "[editContent]",
															className: "flex flex-wrap gap-2 mt-3",
															children: isWorkout ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
																"data-uid": "src/pages/client/ClientTraining.tsx:215:37",
																"data-prohibitions": "[editContent]",
																variant: "outline",
																className: "bg-background text-xs font-normal",
																children: [
																	"Carga Alvo:",
																	" ",
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		"data-uid": "src/pages/client/ClientTraining.tsx:220:39",
																		"data-prohibitions": "[editContent]",
																		className: "font-semibold ml-1",
																		children: item.target_load_kg ? `${item.target_load_kg}kg` : "-"
																	})
																]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
																"data-uid": "src/pages/client/ClientTraining.tsx:224:37",
																"data-prohibitions": "[editContent]",
																variant: "outline",
																className: "bg-background text-xs font-normal",
																children: [
																	"Descanso:",
																	" ",
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		"data-uid": "src/pages/client/ClientTraining.tsx:229:39",
																		"data-prohibitions": "[editContent]",
																		className: "font-semibold ml-1",
																		children: item.rest_seconds ? `${item.rest_seconds}s` : "-"
																	})
																]
															})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
																"data-uid": "src/pages/client/ClientTraining.tsx:236:37",
																"data-prohibitions": "[editContent]",
																variant: "outline",
																className: "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border-rose-200 text-xs font-normal",
																children: [
																	"Frequência:",
																	" ",
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		"data-uid": "src/pages/client/ClientTraining.tsx:241:39",
																		"data-prohibitions": "[editContent]",
																		className: "font-semibold ml-1",
																		children: item.frequency || "-"
																	})
																]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
																"data-uid": "src/pages/client/ClientTraining.tsx:245:37",
																"data-prohibitions": "[editContent]",
																variant: "outline",
																className: "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border-rose-200 text-xs font-normal",
																children: [
																	"Limite de Dor (EVA):",
																	" ",
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		"data-uid": "src/pages/client/ClientTraining.tsx:250:39",
																		"data-prohibitions": "[editContent]",
																		className: "font-semibold ml-1",
																		children: item.pain_limit_eva ?? "-"
																	})
																]
															})] })
														})
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													"data-uid": "src/pages/client/ClientTraining.tsx:259:29",
													"data-prohibitions": "[editContent]",
													variant: isCompleted ? "default" : "outline",
													size: "icon",
													className: cn("shrink-0 rounded-full h-12 w-12 transition-colors", isCompleted ? "bg-emerald-500 hover:bg-emerald-600 border-emerald-500 text-white" : "border-muted-foreground/30"),
													onClick: () => toggleComplete(item.id),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
														"data-uid": "src/pages/client/ClientTraining.tsx:270:31",
														"data-prohibitions": "[editContent]",
														className: cn("h-6 w-6", isCompleted ? "text-white" : "text-muted-foreground/50")
													})
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientTraining.tsx:279:27",
												"data-prohibitions": "[]",
												className: "grid grid-cols-2 gap-3 pt-3 border-t border-dashed mt-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/client/ClientTraining.tsx:280:29",
													"data-prohibitions": "[]",
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														"data-uid": "src/pages/client/ClientTraining.tsx:281:31",
														"data-prohibitions": "[]",
														className: "text-xs font-medium text-muted-foreground",
														children: "Carga Real (kg)"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/client/ClientTraining.tsx:284:31",
														"data-prohibitions": "[editContent]",
														type: "number",
														placeholder: "Ex: 20",
														className: "h-10 bg-background text-sm",
														disabled: isCompleted
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/client/ClientTraining.tsx:291:29",
													"data-prohibitions": "[]",
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														"data-uid": "src/pages/client/ClientTraining.tsx:292:31",
														"data-prohibitions": "[]",
														className: "text-xs font-medium text-muted-foreground",
														children: "Repetições Reais"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/client/ClientTraining.tsx:295:31",
														"data-prohibitions": "[editContent]",
														type: "number",
														placeholder: "Ex: 12",
														className: "h-10 bg-background text-sm",
														disabled: isCompleted
													})]
												})]
											})]
										})
									}, item.id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/client/ClientTraining.tsx:309:17",
								"data-prohibitions": "[]",
								className: "w-full h-14 text-lg mt-6",
								size: "lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									"data-uid": "src/pages/client/ClientTraining.tsx:310:19",
									"data-prohibitions": "[editContent]",
									className: "w-5 h-5 mr-2"
								}), " Finalizar Sessão"]
							})
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/client/ClientTraining.tsx:316:11",
						"data-prohibitions": "[editContent]",
						value: "plans",
						className: "mt-0",
						children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/client/ClientTraining.tsx:318:15",
							"data-prohibitions": "[]",
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/client/ClientTraining.tsx:319:17",
								"data-prohibitions": "[editContent]",
								className: "h-16 w-full rounded-xl"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/client/ClientTraining.tsx:320:17",
								"data-prohibitions": "[editContent]",
								className: "h-16 w-full rounded-xl"
							})]
						}) : allPlans.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/client/ClientTraining.tsx:323:15",
							"data-prohibitions": "[]",
							className: "text-center py-10 text-muted-foreground",
							children: "Nenhum plano encontrado."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
							"data-uid": "src/pages/client/ClientTraining.tsx:327:15",
							"data-prohibitions": "[editContent]",
							type: "single",
							collapsible: true,
							className: "w-full space-y-3",
							children: allPlans.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
								"data-uid": "src/pages/client/ClientTraining.tsx:329:19",
								"data-prohibitions": "[editContent]",
								value: plan.id,
								className: "bg-card border rounded-xl overflow-hidden px-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
									"data-uid": "src/pages/client/ClientTraining.tsx:334:21",
									"data-prohibitions": "[editContent]",
									className: "px-4 py-4 hover:no-underline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/client/ClientTraining.tsx:335:23",
										"data-prohibitions": "[editContent]",
										className: "flex flex-col items-start text-left gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientTraining.tsx:336:25",
											"data-prohibitions": "[editContent]",
											className: "font-bold text-base",
											children: plan.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											"data-uid": "src/pages/client/ClientTraining.tsx:337:25",
											"data-prohibitions": "[editContent]",
											variant: "secondary",
											className: cn("text-xs font-medium mt-1", plan.plan_type === "rehabilitation" && "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"),
											children: plan.plan_type === "workout" ? "Treino" : "Reabilitação"
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
									"data-uid": "src/pages/client/ClientTraining.tsx:349:21",
									"data-prohibitions": "[editContent]",
									className: "px-4 pb-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/client/ClientTraining.tsx:350:23",
										"data-prohibitions": "[editContent]",
										className: "bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/client/ClientTraining.tsx:351:25",
											"data-prohibitions": "[]",
											className: "font-medium text-foreground mb-2",
											children: "Para ver os exercícios, visualize este plano na aba \"Treino de Hoje\"."
										}), plan.id !== activePlan?.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/pages/client/ClientTraining.tsx:355:27",
											"data-prohibitions": "[]",
											variant: "outline",
											size: "sm",
											className: "mt-2 w-full",
											onClick: () => {},
											children: "Tornar Plano Ativo (Em Breve)"
										})]
									})
								})]
							}, plan.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/client/ClientTraining.tsx:375:11",
						"data-prohibitions": "[editContent]",
						value: "evolution",
						className: "mt-0 space-y-3",
						children: LOAD_EVOLUTION.map((evo) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/client/ClientTraining.tsx:377:15",
							"data-prohibitions": "[editContent]",
							className: "overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								"data-uid": "src/pages/client/ClientTraining.tsx:378:17",
								"data-prohibitions": "[editContent]",
								className: "p-4 sm:p-5 flex items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/client/ClientTraining.tsx:379:19",
									"data-prohibitions": "[editContent]",
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-uid": "src/pages/client/ClientTraining.tsx:380:21",
										"data-prohibitions": "[editContent]",
										className: "text-xs text-muted-foreground mb-1 font-medium flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
												"data-uid": "src/pages/client/ClientTraining.tsx:381:23",
												"data-prohibitions": "[editContent]",
												className: "w-3.5 h-3.5"
											}),
											" ",
											evo.date
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										"data-uid": "src/pages/client/ClientTraining.tsx:383:21",
										"data-prohibitions": "[editContent]",
										className: "font-bold text-base truncate",
										children: evo.name
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/client/ClientTraining.tsx:385:19",
									"data-prohibitions": "[editContent]",
									className: "flex items-center gap-2 sm:gap-3 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-2 rounded-lg shrink-0 border border-emerald-100 dark:border-emerald-900/50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientTraining.tsx:386:21",
											"data-prohibitions": "[editContent]",
											className: "text-sm font-semibold text-muted-foreground line-through decoration-emerald-300",
											children: evo.old
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientTraining.tsx:389:21",
											"data-prohibitions": "[]",
											className: "text-emerald-500 font-bold text-lg sm:text-xl",
											children: "→"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientTraining.tsx:390:21",
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
			})
		})]
	});
}
//#endregion
export { ClientTraining as default };

//# sourceMappingURL=ClientTraining-DSnoVEF7.js.map