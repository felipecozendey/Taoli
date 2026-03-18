import { At as require_jsx_runtime, E as Skeleton, Gt as require_react, Jt as __toESM, K as Input, Z as supabase, dt as Check, n as DashboardHeader, ot as cn, q as Button, t as PageContent, ut as ChevronRight } from "./PageContent-DFaAkjCU.js";
import { t as ChevronLeft } from "./chevron-left-CgXgO8lG.js";
import { n as Droplets, t as Utensils } from "./utensils-TprPUpf0.js";
import { t as Flame } from "./flame-BaiQWJ2t.js";
import { $ as getFullDietDetails, J as addFoodLog, Lt as useToast, Q as getDailyNutritionProgress, X as deleteFoodLog, Y as addWaterLog, Z as getClientActiveDiet, _t as CardTitle, dt as Label, ft as Card, gt as CardHeader, i as TabsTrigger, n as TabsContent, pt as CardContent, r as TabsList, t as Tabs, ut as Progress, wt as Plus, yt as Trash2 } from "./index-C2wTFHMV.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, s as DialogTrigger, t as Dialog } from "./dialog-CvOZOltx.js";
//#region src/pages/client/ClientNutrition.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ClientNutrition() {
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [diet, setDiet] = (0, import_react.useState)(null);
	const [progress, setProgress] = (0, import_react.useState)(null);
	const [date, setDate] = (0, import_react.useState)(() => (/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
	const [isLogDialogOpen, setIsLogDialogOpen] = (0, import_react.useState)(false);
	const [logForm, setLogForm] = (0, import_react.useState)({
		name: "",
		cal: 0,
		pro: 0,
		car: 0,
		fat: 0
	});
	const { toast } = useToast();
	const fetchData = async () => {
		setIsLoading(true);
		try {
			const { data: { user } } = await supabase.auth.getUser();
			if (!user) return;
			const [activeDietRes, progData] = await Promise.all([getClientActiveDiet(user.id), getDailyNutritionProgress(user.id, date)]);
			setProgress(progData);
			if (activeDietRes.data) {
				const { data: fullDiet } = await getFullDietDetails(activeDietRes.data.id);
				if (fullDiet) {
					fullDiet.meals.sort((a, b) => a.order_index - b.order_index);
					setDiet(fullDiet);
				}
			} else setDiet(null);
		} catch (error) {
			console.error(error);
			toast({
				title: "Erro ao carregar dados",
				variant: "destructive"
			});
		} finally {
			setIsLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchData();
	}, [date]);
	const changeDate = (days) => {
		const d = new Date(date);
		d.setDate(d.getDate() + days);
		setDate(d.toISOString().split("T")[0]);
	};
	const handleAddWater = async () => {
		const { data: { user } } = await supabase.auth.getUser();
		if (!user) return;
		await addWaterLog(user.id, date, 250);
		toast({ title: "💧 250ml de água registrados!" });
		fetchData();
	};
	const handleAddLog = async (data) => {
		const { data: { user } } = await supabase.auth.getUser();
		if (!user) return;
		await addFoodLog(user.id, date, data);
		fetchData();
	};
	const handleDeleteLog = async (id) => {
		await deleteFoodLog(id);
		toast({
			title: "Registro removido",
			variant: "destructive"
		});
		fetchData();
	};
	const handleLogMeal = async (m) => {
		if (progress?.logs?.some((l) => l.food_name === m.name)) return;
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
		toast({ title: `✔️ Refeição "${m.name}" registrada com sucesso!` });
	};
	const submitManualLog = () => {
		if (!logForm.name) {
			toast({
				title: "Preencha o nome do alimento",
				variant: "destructive"
			});
			return;
		}
		handleAddLog({
			food_name: logForm.name,
			calories: logForm.cal,
			protein: logForm.pro,
			carbs: logForm.car,
			fat: logForm.fat
		});
		toast({ title: "Alimento avulso registrado!" });
		setIsLogDialogOpen(false);
		setLogForm({
			name: "",
			cal: 0,
			pro: 0,
			car: 0,
			fat: 0
		});
	};
	const targetCals = progress?.targets?.calories || 2e3;
	const consumedCals = progress?.consumed?.calories || 0;
	const remainingCals = Math.max(targetCals - consumedCals, 0);
	const calPercent = Math.min(consumedCals / targetCals * 100, 100) || 0;
	const radius = 54;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference - calPercent / 100 * circumference;
	const displayDate = new Intl.DateTimeFormat("pt-BR", {
		weekday: "short",
		day: "2-digit",
		month: "short"
	}).format(/* @__PURE__ */ new Date(date + "T12:00:00")).replace(".", "");
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientNutrition.tsx:183:7",
		"data-prohibitions": "[]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:184:9",
			"data-prohibitions": "[editContent]",
			title: "Minha Nutrição"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:185:9",
			"data-prohibitions": "[]",
			className: "max-w-3xl mx-auto w-full space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/client/ClientNutrition.tsx:186:11",
					"data-prohibitions": "[editContent]",
					className: "h-12 w-full"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/client/ClientNutrition.tsx:187:11",
					"data-prohibitions": "[editContent]",
					className: "h-64 w-full"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/client/ClientNutrition.tsx:188:11",
					"data-prohibitions": "[]",
					className: "grid gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:189:13",
						"data-prohibitions": "[editContent]",
						className: "h-32 w-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:190:13",
						"data-prohibitions": "[editContent]",
						className: "h-32 w-full"
					})]
				})
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientNutrition.tsx:198:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:199:7",
			"data-prohibitions": "[editContent]",
			title: "Minha Nutrição"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:200:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-3xl mx-auto w-full animate-fade-in-up space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/client/ClientNutrition.tsx:202:9",
				"data-prohibitions": "[editContent]",
				className: "flex items-center justify-between bg-card border rounded-lg p-2 px-4 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:203:11",
						"data-prohibitions": "[]",
						variant: "ghost",
						size: "icon",
						onClick: () => changeDate(-1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:204:13",
							"data-prohibitions": "[editContent]",
							className: "h-5 w-5"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/pages/client/ClientNutrition.tsx:206:11",
						"data-prohibitions": "[editContent]",
						className: "font-semibold capitalize text-base",
						children: displayDate
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:207:11",
						"data-prohibitions": "[]",
						variant: "ghost",
						size: "icon",
						onClick: () => changeDate(1),
						disabled: date === (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:213:13",
							"data-prohibitions": "[editContent]",
							className: "h-5 w-5"
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				"data-uid": "src/pages/client/ClientNutrition.tsx:217:9",
				"data-prohibitions": "[editContent]",
				defaultValue: "dashboard",
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:218:11",
						"data-prohibitions": "[]",
						className: "w-full grid grid-cols-2 h-auto p-1 bg-muted/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:219:13",
							"data-prohibitions": "[]",
							value: "dashboard",
							className: "py-2.5",
							children: "Dashboard"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:222:13",
							"data-prohibitions": "[]",
							value: "diet",
							className: "py-2.5",
							children: "Minha Dieta"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:228:11",
						"data-prohibitions": "[editContent]",
						value: "dashboard",
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:230:13",
								"data-prohibitions": "[editContent]",
								className: "shadow-sm border-border/50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:231:15",
									"data-prohibitions": "[editContent]",
									className: "p-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:232:17",
										"data-prohibitions": "[editContent]",
										className: "flex flex-col md:flex-row items-center justify-between gap-8",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:233:19",
											"data-prohibitions": "[editContent]",
											className: "relative w-36 h-36 flex items-center justify-center shrink-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:234:21",
												"data-prohibitions": "[]",
												className: "w-full h-full transform -rotate-90",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:235:23",
													"data-prohibitions": "[editContent]",
													cx: "72",
													cy: "72",
													r: radius,
													stroke: "currentColor",
													strokeWidth: "12",
													fill: "transparent",
													className: "text-muted/20"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:244:23",
													"data-prohibitions": "[editContent]",
													cx: "72",
													cy: "72",
													r: radius,
													stroke: "currentColor",
													strokeWidth: "12",
													fill: "transparent",
													strokeDasharray: circumference,
													strokeDashoffset,
													strokeLinecap: "round",
													className: "text-primary transition-all duration-1000 ease-out"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:257:21",
												"data-prohibitions": "[editContent]",
												className: "absolute flex flex-col items-center justify-center text-center",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
														"data-uid": "src/pages/client/ClientNutrition.tsx:258:23",
														"data-prohibitions": "[editContent]",
														className: "h-5 w-5 text-primary mb-1 opacity-80"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/client/ClientNutrition.tsx:259:23",
														"data-prohibitions": "[editContent]",
														className: "text-2xl font-bold leading-none",
														children: remainingCals
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/client/ClientNutrition.tsx:260:23",
														"data-prohibitions": "[]",
														className: "text-[10px] uppercase tracking-wider text-muted-foreground mt-1",
														children: "Restantes"
													})
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:266:19",
											"data-prohibitions": "[editContent]",
											className: "flex-1 w-full space-y-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:267:21",
													"data-prohibitions": "[editContent]",
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/client/ClientNutrition.tsx:268:23",
														"data-prohibitions": "[editContent]",
														className: "flex justify-between text-xs font-medium",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:269:25",
															"data-prohibitions": "[]",
															className: "text-muted-foreground flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																"data-uid": "src/pages/client/ClientNutrition.tsx:270:27",
																"data-prohibitions": "[editContent]",
																className: "w-2 h-2 rounded-full bg-blue-500"
															}), " Proteínas"]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:272:25",
															"data-prohibitions": "[editContent]",
															children: [
																progress?.consumed?.protein || 0,
																"g / ",
																progress?.targets?.protein || 0,
																"g"
															]
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
														"data-uid": "src/pages/client/ClientNutrition.tsx:276:23",
														"data-prohibitions": "[editContent]",
														value: (progress?.consumed?.protein || 0) / (progress?.targets?.protein || 1) * 100,
														className: "h-2 [&>div]:bg-blue-500 bg-blue-100 dark:bg-blue-950"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:285:21",
													"data-prohibitions": "[editContent]",
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/client/ClientNutrition.tsx:286:23",
														"data-prohibitions": "[editContent]",
														className: "flex justify-between text-xs font-medium",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:287:25",
															"data-prohibitions": "[]",
															className: "text-muted-foreground flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																"data-uid": "src/pages/client/ClientNutrition.tsx:288:27",
																"data-prohibitions": "[editContent]",
																className: "w-2 h-2 rounded-full bg-green-500"
															}), " Carboidratos"]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:290:25",
															"data-prohibitions": "[editContent]",
															children: [
																progress?.consumed?.carbs || 0,
																"g / ",
																progress?.targets?.carbs || 0,
																"g"
															]
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
														"data-uid": "src/pages/client/ClientNutrition.tsx:294:23",
														"data-prohibitions": "[editContent]",
														value: (progress?.consumed?.carbs || 0) / (progress?.targets?.carbs || 1) * 100,
														className: "h-2 [&>div]:bg-green-500 bg-green-100 dark:bg-green-950"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:302:21",
													"data-prohibitions": "[editContent]",
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/client/ClientNutrition.tsx:303:23",
														"data-prohibitions": "[editContent]",
														className: "flex justify-between text-xs font-medium",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:304:25",
															"data-prohibitions": "[]",
															className: "text-muted-foreground flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																"data-uid": "src/pages/client/ClientNutrition.tsx:305:27",
																"data-prohibitions": "[editContent]",
																className: "w-2 h-2 rounded-full bg-amber-500"
															}), " Gorduras"]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:307:25",
															"data-prohibitions": "[editContent]",
															children: [
																progress?.consumed?.fat || 0,
																"g / ",
																progress?.targets?.fat || 0,
																"g"
															]
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
														"data-uid": "src/pages/client/ClientNutrition.tsx:311:23",
														"data-prohibitions": "[editContent]",
														value: (progress?.consumed?.fat || 0) / (progress?.targets?.fat || 1) * 100,
														className: "h-2 [&>div]:bg-amber-500 bg-amber-100 dark:bg-amber-950"
													})]
												})
											]
										})]
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/client/ClientNutrition.tsx:323:13",
								"data-prohibitions": "[editContent]",
								className: "grid grid-cols-1 md:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:325:15",
									"data-prohibitions": "[editContent]",
									className: "border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:border-blue-900 dark:from-blue-950/40 dark:to-blue-900/20 shadow-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:326:17",
										"data-prohibitions": "[editContent]",
										className: "p-5 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:327:19",
											"data-prohibitions": "[editContent]",
											className: "flex items-center gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:328:21",
												"data-prohibitions": "[]",
												className: "p-3 bg-blue-500 text-white rounded-full shadow-sm",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, {
													"data-uid": "src/pages/client/ClientNutrition.tsx:329:23",
													"data-prohibitions": "[editContent]",
													className: "h-6 w-6"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:331:21",
												"data-prohibitions": "[editContent]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:332:23",
													"data-prohibitions": "[]",
													className: "text-sm font-medium text-blue-900 dark:text-blue-200",
													children: "Hidratação"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:335:23",
													"data-prohibitions": "[editContent]",
													className: "text-2xl font-bold text-blue-700 dark:text-blue-400",
													children: [
														progress?.consumed?.water || 0,
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:337:25",
															"data-prohibitions": "[]",
															className: "text-sm font-normal",
															children: "ml"
														})
													]
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:341:19",
											"data-prohibitions": "[]",
											onClick: handleAddWater,
											variant: "outline",
											className: "border-blue-200 text-blue-700 hover:bg-blue-200 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900 bg-white/50 dark:bg-black/50 backdrop-blur-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:346:21",
												"data-prohibitions": "[editContent]",
												className: "h-4 w-4 mr-1"
											}), " 250ml"]
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:352:15",
									"data-prohibitions": "[]",
									open: isLogDialogOpen,
									onOpenChange: setIsLogDialogOpen,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:353:17",
										"data-prohibitions": "[]",
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:354:19",
											"data-prohibitions": "[]",
											className: "border-dashed border-2 bg-transparent hover:bg-muted/50 transition-colors cursor-pointer shadow-sm",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:355:21",
												"data-prohibitions": "[]",
												className: "p-5 flex items-center justify-center gap-3 h-full",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:356:23",
													"data-prohibitions": "[]",
													className: "p-2 bg-muted rounded-full",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, {
														"data-uid": "src/pages/client/ClientNutrition.tsx:357:25",
														"data-prohibitions": "[editContent]",
														className: "h-5 w-5 text-muted-foreground"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:359:23",
													"data-prohibitions": "[]",
													className: "font-medium text-muted-foreground",
													children: "Adicionar Alimento Avulso"
												})]
											})
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:365:17",
										"data-prohibitions": "[]",
										className: "sm:max-w-[425px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:366:19",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:367:21",
												"data-prohibitions": "[]",
												children: "Registro Manual"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:369:19",
											"data-prohibitions": "[]",
											className: "grid gap-4 py-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:370:21",
													"data-prohibitions": "[]",
													className: "grid gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														"data-uid": "src/pages/client/ClientNutrition.tsx:371:23",
														"data-prohibitions": "[]",
														htmlFor: "name",
														children: "Alimento / Refeição"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/client/ClientNutrition.tsx:372:23",
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
													"data-uid": "src/pages/client/ClientNutrition.tsx:379:21",
													"data-prohibitions": "[]",
													className: "grid grid-cols-2 gap-4",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:380:23",
															"data-prohibitions": "[]",
															className: "grid gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																"data-uid": "src/pages/client/ClientNutrition.tsx:381:25",
																"data-prohibitions": "[]",
																htmlFor: "cal",
																children: "Calorias (kcal)"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																"data-uid": "src/pages/client/ClientNutrition.tsx:382:25",
																"data-prohibitions": "[editContent]",
																type: "number",
																id: "cal",
																value: logForm.cal || "",
																onChange: (e) => setLogForm({
																	...logForm,
																	cal: Number(e.target.value)
																})
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:389:23",
															"data-prohibitions": "[]",
															className: "grid gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																"data-uid": "src/pages/client/ClientNutrition.tsx:390:25",
																"data-prohibitions": "[]",
																htmlFor: "pro",
																children: "Proteínas (g)"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																"data-uid": "src/pages/client/ClientNutrition.tsx:391:25",
																"data-prohibitions": "[editContent]",
																type: "number",
																id: "pro",
																value: logForm.pro || "",
																onChange: (e) => setLogForm({
																	...logForm,
																	pro: Number(e.target.value)
																})
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:398:23",
															"data-prohibitions": "[]",
															className: "grid gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																"data-uid": "src/pages/client/ClientNutrition.tsx:399:25",
																"data-prohibitions": "[]",
																htmlFor: "car",
																children: "Carbos (g)"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																"data-uid": "src/pages/client/ClientNutrition.tsx:400:25",
																"data-prohibitions": "[editContent]",
																type: "number",
																id: "car",
																value: logForm.car || "",
																onChange: (e) => setLogForm({
																	...logForm,
																	car: Number(e.target.value)
																})
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:407:23",
															"data-prohibitions": "[]",
															className: "grid gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																"data-uid": "src/pages/client/ClientNutrition.tsx:408:25",
																"data-prohibitions": "[]",
																htmlFor: "fat",
																children: "Gorduras (g)"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																"data-uid": "src/pages/client/ClientNutrition.tsx:409:25",
																"data-prohibitions": "[editContent]",
																type: "number",
																id: "fat",
																value: logForm.fat || "",
																onChange: (e) => setLogForm({
																	...logForm,
																	fat: Number(e.target.value)
																})
															})]
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													"data-uid": "src/pages/client/ClientNutrition.tsx:417:21",
													"data-prohibitions": "[]",
													onClick: submitManualLog,
													className: "mt-4 w-full",
													children: "Salvar Registro"
												})
											]
										})]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/client/ClientNutrition.tsx:426:13",
								"data-prohibitions": "[editContent]",
								className: "space-y-3 pt-4 border-t",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:427:15",
									"data-prohibitions": "[]",
									className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
									children: "Consumidos Hoje"
								}), !progress?.logs || progress.logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:431:17",
									"data-prohibitions": "[]",
									className: "text-sm text-muted-foreground text-center py-6",
									children: "Nenhum alimento registrado."
								}) : progress.logs.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:436:19",
									"data-prohibitions": "[editContent]",
									className: "flex items-center justify-between bg-card border p-3 rounded-lg shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:440:21",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:441:23",
											"data-prohibitions": "[editContent]",
											className: "font-medium text-sm",
											children: l.food_name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:442:23",
											"data-prohibitions": "[editContent]",
											className: "text-xs text-muted-foreground mt-0.5",
											children: [
												l.calories,
												" kcal • ",
												l.protein,
												"g P • ",
												l.carbs,
												"g C • ",
												l.fat,
												"g G"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:446:21",
										"data-prohibitions": "[]",
										variant: "ghost",
										size: "icon",
										onClick: () => handleDeleteLog(l.id),
										className: "text-muted-foreground hover:bg-destructive/10 hover:text-destructive h-8 w-8",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:452:23",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-4"
										})
									})]
								}, l.id))]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:461:11",
						"data-prohibitions": "[editContent]",
						value: "diet",
						className: "space-y-4",
						children: diet ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/client/ClientNutrition.tsx:463:15",
							"data-prohibitions": "[editContent]",
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/client/ClientNutrition.tsx:464:17",
								"data-prohibitions": "[editContent]",
								className: "mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:465:19",
									"data-prohibitions": "[editContent]",
									className: "text-xl font-bold flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:466:21",
											"data-prohibitions": "[editContent]",
											className: "h-5 w-5 text-primary"
										}),
										" ",
										diet.name
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:468:19",
									"data-prohibitions": "[]",
									className: "text-sm text-muted-foreground",
									children: "Marque as refeições que você já consumiu hoje para registrar os macros automaticamente."
								})]
							}), diet.meals.map((m) => {
								const isConsumed = progress?.logs?.some((l) => l.food_name === m.name);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:478:21",
									"data-prohibitions": "[editContent]",
									className: cn("overflow-hidden transition-colors duration-300", isConsumed ? "border-emerald-200 bg-emerald-50/10 dark:border-emerald-900/50" : ""),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:487:23",
										"data-prohibitions": "[editContent]",
										className: "p-4 pb-2 flex flex-row items-center justify-between bg-muted/20 border-b",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:488:25",
											"data-prohibitions": "[editContent]",
											className: "text-base flex items-center gap-2",
											children: [m.name, isConsumed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:490:42",
												"data-prohibitions": "[editContent]",
												className: "h-4 w-4 text-emerald-500"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:492:25",
											"data-prohibitions": "[editContent]",
											className: "text-sm text-muted-foreground bg-background px-2 py-0.5 rounded-full border",
											children: m.time.substring(0, 5)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:496:23",
										"data-prohibitions": "[editContent]",
										className: "p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:497:25",
											"data-prohibitions": "[editContent]",
											className: "space-y-2 mb-4",
											children: m.meal_items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:499:29",
												"data-prohibitions": "[editContent]",
												className: "flex justify-between items-center text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:500:31",
													"data-prohibitions": "[editContent]",
													className: "text-muted-foreground flex items-center gap-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:501:33",
															"data-prohibitions": "[editContent]",
															className: "h-1.5 w-1.5 rounded-full bg-primary/40"
														}),
														item.portion_g,
														"g ",
														item.food_items?.name
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:504:31",
													"data-prohibitions": "[editContent]",
													className: "text-xs text-muted-foreground font-medium",
													children: [
														Math.round((item.food_items?.energy_kcal || 0) * item.portion_g / (item.food_items?.base_qty_g || 100)),
														" ",
														"kcal"
													]
												})]
											}, item.id))
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:514:25",
											"data-prohibitions": "[editContent]",
											disabled: isConsumed,
											onClick: () => handleLogMeal(m),
											variant: isConsumed ? "secondary" : "default",
											className: cn("w-full transition-all", isConsumed ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 opacity-100" : ""),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:525:27",
												"data-prohibitions": "[editContent]",
												className: "h-4 w-4 mr-2"
											}), isConsumed ? "Consumido" : "✔️ Consumi"]
										})]
									})]
								}, m.id);
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:534:15",
							"data-prohibitions": "[]",
							className: "border-dashed",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:535:17",
								"data-prohibitions": "[]",
								className: "py-12 flex flex-col items-center justify-center text-center text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:536:19",
										"data-prohibitions": "[]",
										className: "h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:537:21",
											"data-prohibitions": "[editContent]",
											className: "h-6 w-6 opacity-50"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:539:19",
										"data-prohibitions": "[]",
										className: "font-medium text-foreground mb-1",
										children: "Nenhum plano ativo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:540:19",
										"data-prohibitions": "[]",
										className: "text-sm",
										children: "Você não possui um plano alimentar prescrito por um profissional no momento."
									})
								]
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

//# sourceMappingURL=ClientNutrition-CL_ldKY7.js.map