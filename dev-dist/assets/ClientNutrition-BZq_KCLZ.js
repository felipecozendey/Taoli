import { At as require_jsx_runtime, E as Skeleton, Gt as require_react, Jt as __toESM, K as Input, Z as supabase, dt as Check, ft as createLucideIcon, n as DashboardHeader, ot as cn, q as Button, t as PageContent } from "./PageContent-DFaAkjCU.js";
import { t as Flame } from "./flame-DXHs-D-_.js";
import { $ as getFullDietDetails, It as Activity, J as addFoodLog, Q as getDailyNutritionProgress, X as deleteFoodLog, Y as addWaterLog, Z as getClientActiveDiet, _t as CardTitle, bt as Target, dt as Label, ft as Card, gt as CardHeader, i as TabsTrigger, mt as CardDescription, n as TabsContent, pt as CardContent, r as TabsList, t as Tabs, ut as Progress, wt as Plus, yt as Trash2 } from "./index-F3QPN-Yl.js";
import { t as Checkbox } from "./checkbox-V8Y1Qv2A.js";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-Dle6lAMG.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, s as DialogTrigger, t as Dialog } from "./dialog-CvOZOltx.js";
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
//#region src/pages/client/ClientNutrition.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ClientNutrition() {
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [diet, setDiet] = (0, import_react.useState)(null);
	const [progress, setProgress] = (0, import_react.useState)(null);
	const [isLogDialogOpen, setIsLogDialogOpen] = (0, import_react.useState)(false);
	const [logForm, setLogForm] = (0, import_react.useState)({
		name: "",
		cal: 0,
		pro: 0,
		car: 0,
		fat: 0
	});
	const fetchData = async () => {
		try {
			const { data: { user } } = await supabase.auth.getUser();
			if (!user) return;
			const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
			const [activeDietRes, progData] = await Promise.all([getClientActiveDiet(user.id), getDailyNutritionProgress(user.id, today)]);
			setProgress(progData);
			if (activeDietRes.data) {
				const { data: fullDiet } = await getFullDietDetails(activeDietRes.data.id);
				if (fullDiet) {
					fullDiet.meals.sort((a, b) => a.order_index - b.order_index);
					setDiet(fullDiet);
				}
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchData();
	}, []);
	const macros = progress ? [
		{
			id: "cal",
			lbl: "Calorias",
			icon: Flame,
			c: "text-orange-500",
			v: progress.consumed.calories,
			m: progress.targets.calories,
			u: "kcal"
		},
		{
			id: "pro",
			lbl: "Proteínas",
			icon: Activity,
			c: "text-red-500",
			v: progress.consumed.protein,
			m: progress.targets.protein,
			u: "g"
		},
		{
			id: "car",
			lbl: "Carboidratos",
			icon: Activity,
			c: "text-blue-500",
			v: progress.consumed.carbs,
			m: progress.targets.carbs,
			u: "g"
		},
		{
			id: "fat",
			lbl: "Gorduras",
			icon: Activity,
			c: "text-amber-500",
			v: progress.consumed.fat,
			m: progress.targets.fat,
			u: "g"
		}
	] : [];
	const shopList = (0, import_react.useMemo)(() => {
		if (!diet) return [];
		const map = /* @__PURE__ */ new Map();
		diet.meals.forEach((m) => m.meal_items.forEach((i) => {
			if (i.food_items) map.set(i.food_items.name, (map.get(i.food_items.name) || 0) + i.portion_g);
		}));
		return Array.from(map.entries()).map(([n, q]) => `${n} (${q}g)`);
	}, [diet]);
	const handleAddWater = async () => {
		const { data: { user } } = await supabase.auth.getUser();
		if (!user) return;
		const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
		await addWaterLog(user.id, today, 250);
		fetchData();
	};
	const handleAddLog = async (data) => {
		const { data: { user } } = await supabase.auth.getUser();
		if (!user) return;
		const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
		await addFoodLog(user.id, today, data);
		fetchData();
	};
	const handleDeleteLog = async (id) => {
		await deleteFoodLog(id);
		fetchData();
	};
	const handleToggleMeal = async (m) => {
		const existingLog = progress?.logs.find((l) => l.food_name === m.name);
		if (existingLog) await handleDeleteLog(existingLog.id);
		else {
			let cal = 0, pro = 0, car = 0, fat = 0;
			m.meal_items.forEach((i) => {
				if (!i.food_items) return;
				const r = i.portion_g / (i.food_items.base_qty_g || 100);
				cal += (i.food_items.energy_kcal || 0) * r;
				pro += (i.food_items.protein_g || 0) * r;
				car += (i.food_items.carbs_g || 0) * r;
				fat += (i.food_items.fats_g || 0) * r;
			});
			await handleAddLog({
				food_name: m.name,
				calories: Math.round(cal),
				protein: Math.round(pro),
				carbs: Math.round(car),
				fat: Math.round(fat)
			});
		}
	};
	const submitManualLog = () => {
		handleAddLog({
			food_name: logForm.name || "Consumo Avulso",
			calories: logForm.cal,
			protein: logForm.pro,
			carbs: logForm.car,
			fat: logForm.fat
		});
		setIsLogDialogOpen(false);
		setLogForm({
			name: "",
			cal: 0,
			pro: 0,
			car: 0,
			fat: 0
		});
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientNutrition.tsx:208:7",
		"data-prohibitions": "[]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:209:9",
			"data-prohibitions": "[editContent]",
			title: "Minha Nutrição"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:210:9",
			"data-prohibitions": "[]",
			className: "max-w-4xl mx-auto w-full space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/client/ClientNutrition.tsx:211:11",
					"data-prohibitions": "[editContent]",
					className: "h-10 w-1/3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/client/ClientNutrition.tsx:212:11",
					"data-prohibitions": "[]",
					className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:213:13",
							"data-prohibitions": "[editContent]",
							className: "h-24 w-full"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:214:13",
							"data-prohibitions": "[editContent]",
							className: "h-24 w-full"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:215:13",
							"data-prohibitions": "[editContent]",
							className: "h-24 w-full"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:216:13",
							"data-prohibitions": "[editContent]",
							className: "h-24 w-full"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/client/ClientNutrition.tsx:218:11",
					"data-prohibitions": "[editContent]",
					className: "h-64 w-full"
				})
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientNutrition.tsx:225:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:226:7",
			"data-prohibitions": "[editContent]",
			title: "Minha Nutrição"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:227:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-4xl mx-auto w-full animate-fade-in-up space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/client/ClientNutrition.tsx:228:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					"data-uid": "src/pages/client/ClientNutrition.tsx:229:11",
					"data-prohibitions": "[]",
					className: "text-2xl font-bold tracking-tight",
					children: "Visão Geral"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/client/ClientNutrition.tsx:230:11",
					"data-prohibitions": "[]",
					className: "text-muted-foreground text-sm",
					children: "Acompanhe sua dieta e metas diárias."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				"data-uid": "src/pages/client/ClientNutrition.tsx:233:9",
				"data-prohibitions": "[editContent]",
				defaultValue: "diary",
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:234:11",
						"data-prohibitions": "[]",
						className: "w-full sm:w-auto grid grid-cols-3 h-auto p-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:235:13",
								"data-prohibitions": "[]",
								value: "diary",
								className: "py-2 text-xs sm:text-sm",
								children: "Diário de Hoje"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:238:13",
								"data-prohibitions": "[]",
								value: "plan",
								className: "py-2 text-xs sm:text-sm",
								children: "Meu Plano"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:241:13",
								"data-prohibitions": "[]",
								value: "shopping",
								className: "py-2 text-xs sm:text-sm",
								children: "Lista de Compras"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:246:11",
						"data-prohibitions": "[editContent]",
						value: "diary",
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:247:13",
								"data-prohibitions": "[editContent]",
								className: "border-blue-100 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:248:15",
									"data-prohibitions": "[]",
									className: "pb-2 flex flex-row items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:249:17",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:250:19",
											"data-prohibitions": "[]",
											className: "text-base flex items-center gap-2 text-blue-700 dark:text-blue-400",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:251:21",
												"data-prohibitions": "[editContent]",
												className: "h-5 w-5"
											}), " Hidratação"]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:254:17",
										"data-prohibitions": "[]",
										onClick: handleAddWater,
										size: "sm",
										variant: "outline",
										className: "border-blue-200 text-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:260:19",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-4 mr-1"
										}), " 250ml"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:263:15",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:264:17",
										"data-prohibitions": "[editContent]",
										className: "flex justify-between text-sm mb-2 text-blue-900 dark:text-blue-300",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:265:19",
											"data-prohibitions": "[editContent]",
											children: [progress?.consumed?.water || 0, "ml consumidos"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:266:19",
											"data-prohibitions": "[editContent]",
											children: [Math.round((progress?.consumed?.water || 0) / 2e3 * 100), "%"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:268:17",
										"data-prohibitions": "[editContent]",
										value: (progress?.consumed?.water || 0) / 2e3 * 100,
										className: "h-2.5 bg-blue-100 dark:bg-blue-950 [&>div]:bg-blue-500"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/client/ClientNutrition.tsx:275:13",
								"data-prohibitions": "[editContent]",
								className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
								children: macros.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:277:17",
									"data-prohibitions": "[editContent]",
									className: "overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:278:19",
										"data-prohibitions": "[editContent]",
										className: "p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:279:21",
												"data-prohibitions": "[editContent]",
												className: "flex items-center justify-between mb-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.icon, {
													"data-uid": "src/pages/client/ClientNutrition.tsx:280:23",
													"data-prohibitions": "[editContent]",
													className: `h-5 w-5 ${m.c}`
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:281:23",
													"data-prohibitions": "[editContent]",
													className: "text-xs font-semibold text-muted-foreground",
													children: [
														m.v,
														"/",
														m.m || 0,
														" ",
														m.u
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:285:21",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-sm mb-2",
												children: m.lbl
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:286:21",
												"data-prohibitions": "[editContent]",
												value: (m.v || 0) / (m.m || 1) * 100,
												className: "h-1.5"
											})
										]
									})
								}, m.id))
							}),
							diet ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/client/ClientNutrition.tsx:293:15",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:294:17",
									"data-prohibitions": "[]",
									className: "text-lg font-semibold mb-3 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:295:19",
										"data-prohibitions": "[editContent]",
										className: "h-5 w-5 text-primary"
									}), " Refeições do Plano"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:297:17",
									"data-prohibitions": "[editContent]",
									type: "single",
									collapsible: true,
									className: "w-full space-y-3",
									children: diet.meals.map((m) => {
										const isConsumed = progress?.logs?.some((l) => l.food_name === m.name);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:301:23",
											"data-prohibitions": "[editContent]",
											value: m.id,
											className: cn("border rounded-lg px-4 bg-card transition-colors", isConsumed && "border-emerald-200 bg-emerald-50/10"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:309:25",
												"data-prohibitions": "[editContent]",
												className: "hover:no-underline py-4",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:310:27",
													"data-prohibitions": "[editContent]",
													className: "flex flex-col items-start text-left",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														"data-uid": "src/pages/client/ClientNutrition.tsx:311:29",
														"data-prohibitions": "[editContent]",
														className: "font-semibold text-base flex items-center gap-2",
														children: [m.name, isConsumed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
															"data-uid": "src/pages/client/ClientNutrition.tsx:313:46",
															"data-prohibitions": "[editContent]",
															className: "h-4 w-4 text-emerald-500"
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/client/ClientNutrition.tsx:315:29",
														"data-prohibitions": "[editContent]",
														className: "text-sm text-muted-foreground font-normal",
														children: m.time.substring(0, 5)
													})]
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionContent, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:320:25",
												"data-prohibitions": "[editContent]",
												className: "pt-2 pb-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:321:27",
													"data-prohibitions": "[editContent]",
													className: "space-y-2 mb-4",
													children: m.meal_items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
														"data-uid": "src/pages/client/ClientNutrition.tsx:323:31",
														"data-prohibitions": "[editContent]",
														className: "flex items-center gap-2 text-sm text-muted-foreground",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																"data-uid": "src/pages/client/ClientNutrition.tsx:327:33",
																"data-prohibitions": "[editContent]",
																className: "h-1.5 w-1.5 rounded-full bg-primary/50"
															}),
															" ",
															item.portion_g,
															"g ",
															item.food_items?.name,
															" ",
															item.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																"data-uid": "src/pages/client/ClientNutrition.tsx:329:48",
																"data-prohibitions": "[editContent]",
																className: "italic",
																children: [
																	"(",
																	item.notes,
																	")"
																]
															})
														]
													}, item.id))
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													"data-uid": "src/pages/client/ClientNutrition.tsx:333:27",
													"data-prohibitions": "[editContent]",
													onClick: () => handleToggleMeal(m),
													variant: isConsumed ? "default" : "outline",
													className: cn("w-full gap-2 transition-colors", isConsumed ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "text-emerald-600 hover:bg-emerald-50 border-emerald-200"),
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
															"data-uid": "src/pages/client/ClientNutrition.tsx:343:29",
															"data-prohibitions": "[editContent]",
															className: "h-4 w-4"
														}),
														" ",
														isConsumed ? "Consumido" : "Marcar como consumido"
													]
												})]
											})]
										}, m.id);
									})
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:353:15",
								"data-prohibitions": "[]",
								className: "border-dashed bg-muted/30",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:354:17",
									"data-prohibitions": "[]",
									className: "py-8 text-center text-muted-foreground",
									children: "Você não possui um plano alimentar ativo, mas pode registrar seus consumos manualmente."
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/client/ClientNutrition.tsx:361:13",
								"data-prohibitions": "[editContent]",
								className: "mt-8 space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:362:15",
									"data-prohibitions": "[]",
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:363:17",
										"data-prohibitions": "[]",
										className: "text-lg font-semibold flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:364:19",
											"data-prohibitions": "[editContent]",
											className: "h-5 w-5 text-primary"
										}), " Histórico Diário"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:366:17",
										"data-prohibitions": "[]",
										open: isLogDialogOpen,
										onOpenChange: setIsLogDialogOpen,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:367:19",
											"data-prohibitions": "[]",
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:368:21",
												"data-prohibitions": "[]",
												variant: "outline",
												size: "sm",
												className: "gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
													"data-uid": "src/pages/client/ClientNutrition.tsx:369:23",
													"data-prohibitions": "[editContent]",
													className: "h-4 w-4"
												}), " Adicionar Consumo"]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:372:19",
											"data-prohibitions": "[]",
											className: "sm:max-w-[425px]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:373:21",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
													"data-uid": "src/pages/client/ClientNutrition.tsx:374:23",
													"data-prohibitions": "[]",
													children: "Registro Avulso"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:376:21",
												"data-prohibitions": "[]",
												className: "grid gap-4 py-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/client/ClientNutrition.tsx:377:23",
														"data-prohibitions": "[]",
														className: "grid gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															"data-uid": "src/pages/client/ClientNutrition.tsx:378:25",
															"data-prohibitions": "[]",
															htmlFor: "name",
															children: "Alimento / Refeição"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															"data-uid": "src/pages/client/ClientNutrition.tsx:379:25",
															"data-prohibitions": "[editContent]",
															id: "name",
															placeholder: "Ex: Maçã ou Almoço Extra",
															value: logForm.name,
															onChange: (e) => setLogForm({
																...logForm,
																name: e.target.value
															})
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/client/ClientNutrition.tsx:386:23",
														"data-prohibitions": "[]",
														className: "grid grid-cols-2 gap-4",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																"data-uid": "src/pages/client/ClientNutrition.tsx:387:25",
																"data-prohibitions": "[]",
																className: "grid gap-2",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																	"data-uid": "src/pages/client/ClientNutrition.tsx:388:27",
																	"data-prohibitions": "[]",
																	htmlFor: "cal",
																	children: "Calorias (kcal)"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																	"data-uid": "src/pages/client/ClientNutrition.tsx:389:27",
																	"data-prohibitions": "[editContent]",
																	type: "number",
																	id: "cal",
																	value: logForm.cal,
																	onChange: (e) => setLogForm({
																		...logForm,
																		cal: Number(e.target.value)
																	})
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																"data-uid": "src/pages/client/ClientNutrition.tsx:398:25",
																"data-prohibitions": "[]",
																className: "grid gap-2",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																	"data-uid": "src/pages/client/ClientNutrition.tsx:399:27",
																	"data-prohibitions": "[]",
																	htmlFor: "pro",
																	children: "Proteínas (g)"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																	"data-uid": "src/pages/client/ClientNutrition.tsx:400:27",
																	"data-prohibitions": "[editContent]",
																	type: "number",
																	id: "pro",
																	value: logForm.pro,
																	onChange: (e) => setLogForm({
																		...logForm,
																		pro: Number(e.target.value)
																	})
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																"data-uid": "src/pages/client/ClientNutrition.tsx:409:25",
																"data-prohibitions": "[]",
																className: "grid gap-2",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																	"data-uid": "src/pages/client/ClientNutrition.tsx:410:27",
																	"data-prohibitions": "[]",
																	htmlFor: "car",
																	children: "Carboidratos (g)"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																	"data-uid": "src/pages/client/ClientNutrition.tsx:411:27",
																	"data-prohibitions": "[editContent]",
																	type: "number",
																	id: "car",
																	value: logForm.car,
																	onChange: (e) => setLogForm({
																		...logForm,
																		car: Number(e.target.value)
																	})
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																"data-uid": "src/pages/client/ClientNutrition.tsx:420:25",
																"data-prohibitions": "[]",
																className: "grid gap-2",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																	"data-uid": "src/pages/client/ClientNutrition.tsx:421:27",
																	"data-prohibitions": "[]",
																	htmlFor: "fat",
																	children: "Gorduras (g)"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																	"data-uid": "src/pages/client/ClientNutrition.tsx:422:27",
																	"data-prohibitions": "[editContent]",
																	type: "number",
																	id: "fat",
																	value: logForm.fat,
																	onChange: (e) => setLogForm({
																		...logForm,
																		fat: Number(e.target.value)
																	})
																})]
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/pages/client/ClientNutrition.tsx:432:23",
														"data-prohibitions": "[]",
														onClick: submitManualLog,
														className: "mt-2 w-full",
														children: "Salvar Registro"
													})
												]
											})]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:440:15",
									"data-prohibitions": "[editContent]",
									className: "space-y-2",
									children: !progress?.logs || progress.logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:442:19",
										"data-prohibitions": "[]",
										className: "text-sm text-muted-foreground bg-muted/40 p-6 rounded-md text-center border border-dashed",
										children: "Nenhum registro de consumo para hoje."
									}) : progress.logs.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:447:21",
										"data-prohibitions": "[editContent]",
										className: "flex items-center justify-between bg-card border p-4 rounded-lg shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:451:23",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:452:25",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-sm text-foreground",
												children: l.food_name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:453:25",
												"data-prohibitions": "[editContent]",
												className: "text-xs text-muted-foreground mt-1",
												children: [
													l.calories,
													"kcal • ",
													l.protein,
													"g P • ",
													l.carbs,
													"g C • ",
													l.fat,
													"g G"
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:457:23",
											"data-prohibitions": "[]",
											variant: "ghost",
											size: "icon",
											onClick: () => handleDeleteLog(l.id),
											className: "text-muted-foreground hover:bg-destructive/10 hover:text-destructive shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:463:25",
												"data-prohibitions": "[editContent]",
												className: "h-4 w-4"
											})
										})]
									}, l.id))
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:472:11",
						"data-prohibitions": "[editContent]",
						value: "plan",
						className: "space-y-4",
						children: diet ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:474:15",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:475:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:476:19",
									"data-prohibitions": "[editContent]",
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:477:21",
											"data-prohibitions": "[editContent]",
											className: "h-5 w-5 text-primary"
										}),
										" ",
										diet.name
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:479:19",
									"data-prohibitions": "[]",
									children: "Consulte as opções e substituições da sua dieta."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:483:17",
								"data-prohibitions": "[editContent]",
								className: "space-y-6",
								children: diet.meals.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:485:21",
									"data-prohibitions": "[editContent]",
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:486:23",
										"data-prohibitions": "[editContent]",
										className: "font-semibold text-base border-b pb-1 flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:487:25",
											"data-prohibitions": "[editContent]",
											children: m.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:488:25",
											"data-prohibitions": "[editContent]",
											className: "text-sm font-normal text-muted-foreground",
											children: m.time.substring(0, 5)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:492:23",
										"data-prohibitions": "[editContent]",
										className: "space-y-2",
										children: m.meal_items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:494:27",
											"data-prohibitions": "[editContent]",
											className: "bg-muted/40 p-3 rounded-md border flex justify-between items-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:498:29",
												"data-prohibitions": "[editContent]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:499:31",
													"data-prohibitions": "[editContent]",
													className: "font-medium text-sm text-foreground",
													children: [
														item.portion_g,
														"g de ",
														item.food_items?.name
													]
												}), item.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:503:33",
													"data-prohibitions": "[editContent]",
													className: "text-xs text-muted-foreground mt-1",
													children: ["Nota: ", item.notes]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:508:29",
												"data-prohibitions": "[editContent]",
												className: "text-xs text-muted-foreground",
												children: [
													Math.round((item.food_items?.energy_kcal || 0) * item.portion_g / (item.food_items?.base_qty_g || 100)),
													" ",
													"kcal"
												]
											})]
										}, item.id))
									})]
								}, m.id))
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:523:15",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:524:17",
								"data-prohibitions": "[]",
								className: "py-12 text-center text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:525:19",
									"data-prohibitions": "[editContent]",
									className: "h-12 w-12 text-muted-foreground/30 mx-auto mb-4"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:526:19",
									"data-prohibitions": "[]",
									children: "Você não possui um plano alimentar prescrito."
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:532:11",
						"data-prohibitions": "[editContent]",
						value: "shopping",
						className: "space-y-4",
						children: diet ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:534:15",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:535:17",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:536:19",
									"data-prohibitions": "[]",
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:537:21",
										"data-prohibitions": "[editContent]",
										className: "h-5 w-5 text-primary"
									}), " Lista de Compras"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:539:19",
									"data-prohibitions": "[]",
									children: "Baseado no seu plano nutricional."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:541:17",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:542:19",
									"data-prohibitions": "[editContent]",
									className: "space-y-1",
									children: shopList.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:544:23",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 cursor-pointer transition-colors border border-transparent hover:border-border",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:548:25",
											"data-prohibitions": "[editContent]",
											id: `item-${i}`
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:549:25",
											"data-prohibitions": "[editContent]",
											className: "text-sm font-medium leading-none",
											children: item
										})]
									}, i))
								})
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:556:15",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:557:17",
								"data-prohibitions": "[]",
								className: "py-12 text-center text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:558:19",
									"data-prohibitions": "[editContent]",
									className: "h-12 w-12 text-muted-foreground/30 mx-auto mb-4"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:559:19",
									"data-prohibitions": "[]",
									children: "Uma lista de compras será gerada quando você tiver um plano ativo."
								})]
							})
						})
					})
				]
			})]
		})]
	});
}
//#endregion
export { ClientNutrition as default };

//# sourceMappingURL=ClientNutrition-BZq_KCLZ.js.map