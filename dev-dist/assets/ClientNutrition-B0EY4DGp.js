import { At as require_jsx_runtime, E as Skeleton, Gt as require_react, Jt as __toESM, K as Input, Z as supabase, dt as Check, n as DashboardHeader, ot as cn, q as Button, t as PageContent, ut as ChevronRight } from "./PageContent-DFaAkjCU.js";
import { t as ChevronLeft } from "./chevron-left-CgXgO8lG.js";
import { n as Droplets, t as Utensils } from "./utensils-TprPUpf0.js";
import { t as Flame } from "./flame-BaiQWJ2t.js";
import { $ as getFullDietDetails, J as addFoodLog, Q as getDailyNutritionProgress, Rt as useToast, Tt as Plus, X as deleteFoodLog, Y as addWaterLog, Z as getClientActiveDiet, _t as CardHeader, bt as Trash2, dt as Progress, et as searchFoodItems, ft as Label, i as TabsTrigger, mt as CardContent, n as TabsContent, pt as Card, r as TabsList, t as Tabs, vt as CardTitle } from "./index-BlFoc-8K.js";
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
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [searchResults, setSearchResults] = (0, import_react.useState)([]);
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
	(0, import_react.useEffect)(() => {
		const debounce = setTimeout(async () => {
			if (searchQuery.length > 2) {
				const { data } = await searchFoodItems(searchQuery);
				setSearchResults(data || []);
			} else setSearchResults([]);
		}, 300);
		return () => clearTimeout(debounce);
	}, [searchQuery]);
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
		setSearchQuery("");
	};
	const handleSelectFood = (food) => {
		setLogForm({
			name: food.name,
			cal: Math.round(Number(food.energy_kcal) || 0),
			pro: Math.round(Number(food.protein_g) || 0),
			car: Math.round(Number(food.carbs_g) || 0),
			fat: Math.round(Number(food.fats_g) || 0)
		});
		setSearchQuery("");
		setSearchResults([]);
	};
	const targetCals = progress?.targets?.calories || 2e3;
	const consumedCals = progress?.consumed?.calories || 0;
	const diferenca = targetCals - consumedCals;
	const isExceeded = diferenca < 0;
	const displayValue = Math.abs(diferenca);
	const calPercent = targetCals > 0 ? Math.min(consumedCals / targetCals * 100, 100) : 0;
	const radius = 54;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = isExceeded ? 0 : circumference - calPercent / 100 * circumference;
	const displayDate = new Intl.DateTimeFormat("pt-BR", {
		weekday: "short",
		day: "2-digit",
		month: "short"
	}).format(/* @__PURE__ */ new Date(date + "T12:00:00")).replace(".", "");
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientNutrition.tsx:213:7",
		"data-prohibitions": "[]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:214:9",
			"data-prohibitions": "[editContent]",
			title: "Minha Nutrição"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:215:9",
			"data-prohibitions": "[]",
			className: "max-w-3xl mx-auto w-full space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/client/ClientNutrition.tsx:216:11",
					"data-prohibitions": "[editContent]",
					className: "h-12 w-full"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/client/ClientNutrition.tsx:217:11",
					"data-prohibitions": "[editContent]",
					className: "h-64 w-full"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/client/ClientNutrition.tsx:218:11",
					"data-prohibitions": "[]",
					className: "grid gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:219:13",
						"data-prohibitions": "[editContent]",
						className: "h-32 w-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:220:13",
						"data-prohibitions": "[editContent]",
						className: "h-32 w-full"
					})]
				})
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientNutrition.tsx:228:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:229:7",
			"data-prohibitions": "[editContent]",
			title: "Minha Nutrição"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:230:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-3xl mx-auto w-full animate-fade-in-up space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/client/ClientNutrition.tsx:232:9",
				"data-prohibitions": "[editContent]",
				className: "flex items-center justify-between bg-card border rounded-lg p-2 px-4 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:233:11",
						"data-prohibitions": "[]",
						variant: "ghost",
						size: "icon",
						onClick: () => changeDate(-1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:234:13",
							"data-prohibitions": "[editContent]",
							className: "h-5 w-5"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/pages/client/ClientNutrition.tsx:236:11",
						"data-prohibitions": "[editContent]",
						className: "font-semibold capitalize text-base",
						children: displayDate
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:237:11",
						"data-prohibitions": "[]",
						variant: "ghost",
						size: "icon",
						onClick: () => changeDate(1),
						disabled: date === (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:243:13",
							"data-prohibitions": "[editContent]",
							className: "h-5 w-5"
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				"data-uid": "src/pages/client/ClientNutrition.tsx:247:9",
				"data-prohibitions": "[editContent]",
				defaultValue: "dashboard",
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:248:11",
						"data-prohibitions": "[]",
						className: "w-full grid grid-cols-2 h-auto p-1 bg-muted/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:249:13",
							"data-prohibitions": "[]",
							value: "dashboard",
							className: "py-2.5",
							children: "Dashboard"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:252:13",
							"data-prohibitions": "[]",
							value: "diet",
							className: "py-2.5",
							children: "Minha Dieta"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:258:11",
						"data-prohibitions": "[editContent]",
						value: "dashboard",
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:260:13",
								"data-prohibitions": "[editContent]",
								className: "shadow-sm border-border/50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:261:15",
									"data-prohibitions": "[editContent]",
									className: "p-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:262:17",
										"data-prohibitions": "[editContent]",
										className: "flex flex-col md:flex-row items-center justify-between gap-8",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:263:19",
											"data-prohibitions": "[editContent]",
											className: "relative w-36 h-36 flex items-center justify-center shrink-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:264:21",
												"data-prohibitions": "[editContent]",
												className: "w-full h-full transform -rotate-90",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:265:23",
													"data-prohibitions": "[editContent]",
													cx: "72",
													cy: "72",
													r: radius,
													stroke: "currentColor",
													strokeWidth: "12",
													fill: "transparent",
													className: "text-muted/20"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:274:23",
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
													className: cn("transition-all duration-1000 ease-out", isExceeded ? "text-red-500" : "text-primary")
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:290:21",
												"data-prohibitions": "[editContent]",
												className: cn("absolute flex flex-col items-center justify-center text-center", isExceeded ? "text-red-500" : ""),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
														"data-uid": "src/pages/client/ClientNutrition.tsx:296:23",
														"data-prohibitions": "[editContent]",
														className: cn("h-5 w-5 mb-1 opacity-80", isExceeded ? "text-red-500" : "text-primary")
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/client/ClientNutrition.tsx:302:23",
														"data-prohibitions": "[editContent]",
														className: "text-xl font-bold leading-none",
														children: isExceeded ? "Excedeu" : "Restam"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														"data-uid": "src/pages/client/ClientNutrition.tsx:305:23",
														"data-prohibitions": "[editContent]",
														className: "text-sm font-semibold tracking-wider text-muted-foreground mt-1",
														children: [displayValue, " kcal"]
													})
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:311:19",
											"data-prohibitions": "[editContent]",
											className: "flex-1 w-full space-y-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:312:21",
													"data-prohibitions": "[editContent]",
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/client/ClientNutrition.tsx:313:23",
														"data-prohibitions": "[editContent]",
														className: "flex justify-between text-xs font-medium",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:314:25",
															"data-prohibitions": "[]",
															className: "text-muted-foreground flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																"data-uid": "src/pages/client/ClientNutrition.tsx:315:27",
																"data-prohibitions": "[editContent]",
																className: "w-2 h-2 rounded-full bg-blue-500"
															}), " Proteínas"]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:317:25",
															"data-prohibitions": "[editContent]",
															children: [
																progress?.consumed?.protein || 0,
																"g / ",
																progress?.targets?.protein || 0,
																"g"
															]
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
														"data-uid": "src/pages/client/ClientNutrition.tsx:321:23",
														"data-prohibitions": "[editContent]",
														value: (progress?.consumed?.protein || 0) / (progress?.targets?.protein || 1) * 100,
														className: "h-2 [&>div]:bg-blue-500 bg-blue-100 dark:bg-blue-950"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:330:21",
													"data-prohibitions": "[editContent]",
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/client/ClientNutrition.tsx:331:23",
														"data-prohibitions": "[editContent]",
														className: "flex justify-between text-xs font-medium",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:332:25",
															"data-prohibitions": "[]",
															className: "text-muted-foreground flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																"data-uid": "src/pages/client/ClientNutrition.tsx:333:27",
																"data-prohibitions": "[editContent]",
																className: "w-2 h-2 rounded-full bg-green-500"
															}), " Carboidratos"]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:335:25",
															"data-prohibitions": "[editContent]",
															children: [
																progress?.consumed?.carbs || 0,
																"g / ",
																progress?.targets?.carbs || 0,
																"g"
															]
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
														"data-uid": "src/pages/client/ClientNutrition.tsx:339:23",
														"data-prohibitions": "[editContent]",
														value: (progress?.consumed?.carbs || 0) / (progress?.targets?.carbs || 1) * 100,
														className: "h-2 [&>div]:bg-green-500 bg-green-100 dark:bg-green-950"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:347:21",
													"data-prohibitions": "[editContent]",
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/client/ClientNutrition.tsx:348:23",
														"data-prohibitions": "[editContent]",
														className: "flex justify-between text-xs font-medium",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:349:25",
															"data-prohibitions": "[]",
															className: "text-muted-foreground flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																"data-uid": "src/pages/client/ClientNutrition.tsx:350:27",
																"data-prohibitions": "[editContent]",
																className: "w-2 h-2 rounded-full bg-amber-500"
															}), " Gorduras"]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:352:25",
															"data-prohibitions": "[editContent]",
															children: [
																progress?.consumed?.fat || 0,
																"g / ",
																progress?.targets?.fat || 0,
																"g"
															]
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
														"data-uid": "src/pages/client/ClientNutrition.tsx:356:23",
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
								"data-uid": "src/pages/client/ClientNutrition.tsx:368:13",
								"data-prohibitions": "[editContent]",
								className: "grid grid-cols-1 md:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:370:15",
									"data-prohibitions": "[editContent]",
									className: "border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:border-blue-900 dark:from-blue-950/40 dark:to-blue-900/20 shadow-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:371:17",
										"data-prohibitions": "[editContent]",
										className: "p-5 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:372:19",
											"data-prohibitions": "[editContent]",
											className: "flex items-center gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:373:21",
												"data-prohibitions": "[]",
												className: "p-3 bg-blue-500 text-white rounded-full shadow-sm",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, {
													"data-uid": "src/pages/client/ClientNutrition.tsx:374:23",
													"data-prohibitions": "[editContent]",
													className: "h-6 w-6"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:376:21",
												"data-prohibitions": "[editContent]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:377:23",
													"data-prohibitions": "[]",
													className: "text-sm font-medium text-blue-900 dark:text-blue-200",
													children: "Hidratação"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:380:23",
													"data-prohibitions": "[editContent]",
													className: "text-2xl font-bold text-blue-700 dark:text-blue-400",
													children: [
														progress?.consumed?.water || 0,
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:382:25",
															"data-prohibitions": "[]",
															className: "text-sm font-normal",
															children: "ml"
														})
													]
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:386:19",
											"data-prohibitions": "[]",
											onClick: handleAddWater,
											variant: "outline",
											className: "border-blue-200 text-blue-700 hover:bg-blue-200 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900 bg-white/50 dark:bg-black/50 backdrop-blur-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:391:21",
												"data-prohibitions": "[editContent]",
												className: "h-4 w-4 mr-1"
											}), " 250ml"]
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:397:15",
									"data-prohibitions": "[editContent]",
									open: isLogDialogOpen,
									onOpenChange: setIsLogDialogOpen,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:398:17",
										"data-prohibitions": "[]",
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:399:19",
											"data-prohibitions": "[]",
											className: "border-dashed border-2 bg-transparent hover:bg-muted/50 transition-colors cursor-pointer shadow-sm",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:400:21",
												"data-prohibitions": "[]",
												className: "p-5 flex items-center justify-center gap-3 h-full",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:401:23",
													"data-prohibitions": "[]",
													className: "p-2 bg-muted rounded-full",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, {
														"data-uid": "src/pages/client/ClientNutrition.tsx:402:25",
														"data-prohibitions": "[editContent]",
														className: "h-5 w-5 text-muted-foreground"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:404:23",
													"data-prohibitions": "[]",
													className: "font-medium text-muted-foreground",
													children: "Adicionar Alimento Avulso"
												})]
											})
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:410:17",
										"data-prohibitions": "[editContent]",
										className: "sm:max-w-[425px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:411:19",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:412:21",
												"data-prohibitions": "[]",
												children: "Registro Manual"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:414:19",
											"data-prohibitions": "[editContent]",
											className: "grid gap-4 py-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:415:21",
													"data-prohibitions": "[editContent]",
													className: "grid gap-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															"data-uid": "src/pages/client/ClientNutrition.tsx:416:23",
															"data-prohibitions": "[]",
															htmlFor: "name",
															children: "Alimento / Refeição"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															"data-uid": "src/pages/client/ClientNutrition.tsx:417:23",
															"data-prohibitions": "[editContent]",
															id: "name",
															autoComplete: "off",
															placeholder: "Ex: Maçã ou pesquise...",
															value: logForm.name,
															onChange: (e) => {
																setLogForm({
																	...logForm,
																	name: e.target.value
																});
																setSearchQuery(e.target.value);
															}
														}),
														searchResults.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:428:25",
															"data-prohibitions": "[editContent]",
															className: "mt-1 bg-background border rounded-md shadow-sm max-h-40 overflow-y-auto",
															children: searchResults.map((food) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																"data-uid": "src/pages/client/ClientNutrition.tsx:430:29",
																"data-prohibitions": "[editContent]",
																className: "w-full text-left px-3 py-2 text-sm hover:bg-muted focus:bg-muted focus:outline-none transition-colors border-b last:border-b-0",
																onClick: () => handleSelectFood(food),
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	"data-uid": "src/pages/client/ClientNutrition.tsx:435:31",
																	"data-prohibitions": "[editContent]",
																	className: "font-medium text-foreground",
																	children: food.name
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																	"data-uid": "src/pages/client/ClientNutrition.tsx:436:31",
																	"data-prohibitions": "[editContent]",
																	className: "text-xs text-muted-foreground mt-0.5",
																	children: [
																		food.energy_kcal,
																		" kcal • ",
																		food.protein_g,
																		"g P • ",
																		food.carbs_g,
																		"g C •",
																		" ",
																		food.fats_g,
																		"g G"
																	]
																})]
															}, food.id))
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:445:21",
													"data-prohibitions": "[]",
													className: "grid grid-cols-2 gap-4",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:446:23",
															"data-prohibitions": "[]",
															className: "grid gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																"data-uid": "src/pages/client/ClientNutrition.tsx:447:25",
																"data-prohibitions": "[]",
																htmlFor: "cal",
																children: "Calorias (kcal)"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																"data-uid": "src/pages/client/ClientNutrition.tsx:448:25",
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
															"data-uid": "src/pages/client/ClientNutrition.tsx:455:23",
															"data-prohibitions": "[]",
															className: "grid gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																"data-uid": "src/pages/client/ClientNutrition.tsx:456:25",
																"data-prohibitions": "[]",
																htmlFor: "pro",
																children: "Proteínas (g)"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																"data-uid": "src/pages/client/ClientNutrition.tsx:457:25",
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
															"data-uid": "src/pages/client/ClientNutrition.tsx:464:23",
															"data-prohibitions": "[]",
															className: "grid gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																"data-uid": "src/pages/client/ClientNutrition.tsx:465:25",
																"data-prohibitions": "[]",
																htmlFor: "car",
																children: "Carbos (g)"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																"data-uid": "src/pages/client/ClientNutrition.tsx:466:25",
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
															"data-uid": "src/pages/client/ClientNutrition.tsx:473:23",
															"data-prohibitions": "[]",
															className: "grid gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																"data-uid": "src/pages/client/ClientNutrition.tsx:474:25",
																"data-prohibitions": "[]",
																htmlFor: "fat",
																children: "Gorduras (g)"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																"data-uid": "src/pages/client/ClientNutrition.tsx:475:25",
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
													"data-uid": "src/pages/client/ClientNutrition.tsx:483:21",
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
								"data-uid": "src/pages/client/ClientNutrition.tsx:492:13",
								"data-prohibitions": "[editContent]",
								className: "space-y-3 pt-4 border-t",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:493:15",
									"data-prohibitions": "[]",
									className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
									children: "Consumidos Hoje"
								}), !progress?.logs || progress.logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:497:17",
									"data-prohibitions": "[]",
									className: "text-sm text-muted-foreground text-center py-6",
									children: "Nenhum alimento registrado."
								}) : progress.logs.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:502:19",
									"data-prohibitions": "[editContent]",
									className: "flex items-center justify-between bg-card border p-3 rounded-lg shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:506:21",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:507:23",
											"data-prohibitions": "[editContent]",
											className: "font-medium text-sm",
											children: l.food_name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:508:23",
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
										"data-uid": "src/pages/client/ClientNutrition.tsx:512:21",
										"data-prohibitions": "[]",
										variant: "ghost",
										size: "icon",
										onClick: () => handleDeleteLog(l.id),
										className: "text-muted-foreground hover:bg-destructive/10 hover:text-destructive h-8 w-8",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:518:23",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-4"
										})
									})]
								}, l.id))]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:527:11",
						"data-prohibitions": "[editContent]",
						value: "diet",
						className: "space-y-4",
						children: diet ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/client/ClientNutrition.tsx:529:15",
							"data-prohibitions": "[editContent]",
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/client/ClientNutrition.tsx:530:17",
								"data-prohibitions": "[editContent]",
								className: "mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:531:19",
									"data-prohibitions": "[editContent]",
									className: "text-xl font-bold flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:532:21",
											"data-prohibitions": "[editContent]",
											className: "h-5 w-5 text-primary"
										}),
										" ",
										diet.name
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:534:19",
									"data-prohibitions": "[]",
									className: "text-sm text-muted-foreground",
									children: "Marque as refeições que você já consumiu hoje para registrar os macros automaticamente."
								})]
							}), diet.meals.map((m) => {
								const isConsumed = progress?.logs?.some((l) => l.food_name === m.name);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:544:21",
									"data-prohibitions": "[editContent]",
									className: cn("overflow-hidden transition-colors duration-300", isConsumed ? "border-emerald-200 bg-emerald-50/10 dark:border-emerald-900/50" : ""),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:553:23",
										"data-prohibitions": "[editContent]",
										className: "p-4 pb-2 flex flex-row items-center justify-between bg-muted/20 border-b",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:554:25",
											"data-prohibitions": "[editContent]",
											className: "text-base flex items-center gap-2",
											children: [m.name, isConsumed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:556:42",
												"data-prohibitions": "[editContent]",
												className: "h-4 w-4 text-emerald-500"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:558:25",
											"data-prohibitions": "[editContent]",
											className: "text-sm text-muted-foreground bg-background px-2 py-0.5 rounded-full border",
											children: m.time.substring(0, 5)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:562:23",
										"data-prohibitions": "[editContent]",
										className: "p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:563:25",
											"data-prohibitions": "[editContent]",
											className: "space-y-2 mb-4",
											children: m.meal_items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:565:29",
												"data-prohibitions": "[editContent]",
												className: "flex justify-between items-center text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:566:31",
													"data-prohibitions": "[editContent]",
													className: "text-muted-foreground flex items-center gap-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:567:33",
															"data-prohibitions": "[editContent]",
															className: "h-1.5 w-1.5 rounded-full bg-primary/40"
														}),
														item.portion_g,
														"g ",
														item.food_items?.name
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:570:31",
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
											"data-uid": "src/pages/client/ClientNutrition.tsx:580:25",
											"data-prohibitions": "[editContent]",
											disabled: isConsumed,
											onClick: () => handleLogMeal(m),
											variant: isConsumed ? "secondary" : "default",
											className: cn("w-full transition-all", isConsumed ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 opacity-100" : ""),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:591:27",
												"data-prohibitions": "[editContent]",
												className: "h-4 w-4 mr-2"
											}), isConsumed ? "Consumido" : "✔️ Consumi"]
										})]
									})]
								}, m.id);
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:600:15",
							"data-prohibitions": "[]",
							className: "border-dashed",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:601:17",
								"data-prohibitions": "[]",
								className: "py-12 flex flex-col items-center justify-center text-center text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:602:19",
										"data-prohibitions": "[]",
										className: "h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:603:21",
											"data-prohibitions": "[editContent]",
											className: "h-6 w-6 opacity-50"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:605:19",
										"data-prohibitions": "[]",
										className: "font-medium text-foreground mb-1",
										children: "Nenhum plano ativo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:606:19",
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

//# sourceMappingURL=ClientNutrition-B0EY4DGp.js.map