import { E as Skeleton, G as CardHeader, H as CardContent, K as CardTitle, Kt as __toESM, Ot as require_jsx_runtime, U as CardDescription, Ut as require_react, V as Card, X as supabase, at as cn, lt as Check, n as DashboardHeader, q as Button, t as PageContent, ut as createLucideIcon } from "./PageContent-BfFW-EY_.js";
import { t as Flame } from "./flame-BdB3ZIUm.js";
import { J as Progress, X as getFullDietDetails, Y as getClientActiveDiet, _t as Activity, i as TabsTrigger, n as TabsContent, nt as Target, ot as Plus, r as TabsList, t as Tabs } from "./index-DJOu52_V.js";
import { t as Checkbox } from "./checkbox-CaAwxCju.js";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-BG3d9Y5-.js";
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
	const [water, setWater] = (0, import_react.useState)(0);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [diet, setDiet] = (0, import_react.useState)(null);
	const [consumedMeals, setConsumedMeals] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		const fetchDiet = async () => {
			try {
				const { data: { user } } = await supabase.auth.getUser();
				if (!user) return;
				const { data: activeDiet } = await getClientActiveDiet(user.id);
				if (activeDiet) {
					const { data: fullDiet } = await getFullDietDetails(activeDiet.id);
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
		fetchDiet();
	}, []);
	const { maxes, vals } = (0, import_react.useMemo)(() => {
		const max = {
			cal: 0,
			pro: 0,
			car: 0,
			fat: 0
		};
		const val = {
			cal: 0,
			pro: 0,
			car: 0,
			fat: 0
		};
		diet?.meals.forEach((m) => {
			let mCal = 0, mPro = 0, mCar = 0, mFat = 0;
			m.meal_items.forEach((i) => {
				if (!i.food_items) return;
				const r = i.portion_g / 100;
				mCal += (i.food_items.energy_kcal || 0) * r;
				mPro += (i.food_items.protein_g || 0) * r;
				mCar += (i.food_items.carbs_g || 0) * r;
				mFat += (i.food_items.fats_g || 0) * r;
			});
			max.cal += mCal;
			max.pro += mPro;
			max.car += mCar;
			max.fat += mFat;
			if (consumedMeals[m.id]) {
				val.cal += mCal;
				val.pro += mPro;
				val.car += mCar;
				val.fat += mFat;
			}
		});
		return {
			maxes: max,
			vals: val
		};
	}, [diet, consumedMeals]);
	const macros = [
		{
			id: "cal",
			lbl: "Calorias",
			icon: Flame,
			c: "text-orange-500",
			v: Math.round(vals.cal),
			m: Math.round(maxes.cal),
			u: "kcal"
		},
		{
			id: "pro",
			lbl: "Proteínas",
			icon: Activity,
			c: "text-red-500",
			v: Math.round(vals.pro),
			m: Math.round(maxes.pro),
			u: "g"
		},
		{
			id: "car",
			lbl: "Carboidratos",
			icon: Activity,
			c: "text-blue-500",
			v: Math.round(vals.car),
			m: Math.round(maxes.car),
			u: "g"
		},
		{
			id: "fat",
			lbl: "Gorduras",
			icon: Activity,
			c: "text-amber-500",
			v: Math.round(vals.fat),
			m: Math.round(maxes.fat),
			u: "g"
		}
	];
	const shopList = (0, import_react.useMemo)(() => {
		if (!diet) return [];
		const map = /* @__PURE__ */ new Map();
		diet.meals.forEach((m) => m.meal_items.forEach((i) => {
			if (i.food_items) map.set(i.food_items.name, (map.get(i.food_items.name) || 0) + i.portion_g);
		}));
		return Array.from(map.entries()).map(([n, q]) => `${n} (${q}g)`);
	}, [diet]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientNutrition.tsx:143:7",
		"data-prohibitions": "[]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:144:9",
			"data-prohibitions": "[editContent]",
			title: "Minha Nutrição"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:145:9",
			"data-prohibitions": "[]",
			className: "max-w-4xl mx-auto w-full space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/client/ClientNutrition.tsx:146:11",
					"data-prohibitions": "[editContent]",
					className: "h-10 w-1/3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/client/ClientNutrition.tsx:147:11",
					"data-prohibitions": "[]",
					className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:148:13",
							"data-prohibitions": "[editContent]",
							className: "h-24 w-full"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:149:13",
							"data-prohibitions": "[editContent]",
							className: "h-24 w-full"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:150:13",
							"data-prohibitions": "[editContent]",
							className: "h-24 w-full"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:151:13",
							"data-prohibitions": "[editContent]",
							className: "h-24 w-full"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/client/ClientNutrition.tsx:153:11",
					"data-prohibitions": "[editContent]",
					className: "h-64 w-full"
				})
			]
		})]
	});
	if (!diet) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientNutrition.tsx:161:7",
		"data-prohibitions": "[]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:162:9",
			"data-prohibitions": "[editContent]",
			title: "Minha Nutrição"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageContent, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:163:9",
			"data-prohibitions": "[]",
			className: "max-w-4xl mx-auto w-full flex-1 flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/client/ClientNutrition.tsx:164:11",
				"data-prohibitions": "[]",
				className: "w-full max-w-md text-center py-12 border-dashed",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/client/ClientNutrition.tsx:165:13",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:166:15",
						"data-prohibitions": "[editContent]",
						className: "h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/client/ClientNutrition.tsx:167:15",
						"data-prohibitions": "[]",
						className: "text-lg font-medium text-foreground",
						children: "O teu nutricionista ainda não prescreveu uma dieta."
					})]
				})
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientNutrition.tsx:178:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:179:7",
			"data-prohibitions": "[editContent]",
			title: "Minha Nutrição"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:180:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-4xl mx-auto w-full animate-fade-in-up space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/client/ClientNutrition.tsx:181:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					"data-uid": "src/pages/client/ClientNutrition.tsx:182:11",
					"data-prohibitions": "[]",
					className: "text-2xl font-bold tracking-tight",
					children: "Visão Geral"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/client/ClientNutrition.tsx:183:11",
					"data-prohibitions": "[]",
					className: "text-muted-foreground text-sm",
					children: "Acompanhe sua dieta e metas diárias."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				"data-uid": "src/pages/client/ClientNutrition.tsx:186:9",
				"data-prohibitions": "[editContent]",
				defaultValue: "diary",
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:187:11",
						"data-prohibitions": "[]",
						className: "w-full sm:w-auto grid grid-cols-3 h-auto p-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:188:13",
								"data-prohibitions": "[]",
								value: "diary",
								className: "py-2 text-xs sm:text-sm",
								children: "Diário de Hoje"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:191:13",
								"data-prohibitions": "[]",
								value: "plan",
								className: "py-2 text-xs sm:text-sm",
								children: "Meu Plano"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:194:13",
								"data-prohibitions": "[]",
								value: "shopping",
								className: "py-2 text-xs sm:text-sm",
								children: "Lista de Compras"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:199:11",
						"data-prohibitions": "[editContent]",
						value: "diary",
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:200:13",
								"data-prohibitions": "[editContent]",
								className: "border-blue-100 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:201:15",
									"data-prohibitions": "[]",
									className: "pb-2 flex flex-row items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:202:17",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:203:19",
											"data-prohibitions": "[]",
											className: "text-base flex items-center gap-2 text-blue-700 dark:text-blue-400",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:204:21",
												"data-prohibitions": "[editContent]",
												className: "h-5 w-5"
											}), " Hidratação"]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:207:17",
										"data-prohibitions": "[]",
										onClick: () => setWater((p) => Math.min(p + 250, 2e3)),
										size: "sm",
										variant: "outline",
										className: "border-blue-200 text-blue-700",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:213:19",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-4 mr-1"
										}), " 250ml"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:216:15",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:217:17",
										"data-prohibitions": "[editContent]",
										className: "flex justify-between text-sm mb-2 text-blue-900 dark:text-blue-300",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:218:19",
											"data-prohibitions": "[editContent]",
											children: [water, "ml consumidos"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:219:19",
											"data-prohibitions": "[editContent]",
											children: [Math.round(water / 2e3 * 100), "%"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:221:17",
										"data-prohibitions": "[editContent]",
										value: water / 2e3 * 100,
										className: "h-2.5 bg-blue-100 dark:bg-blue-950 [&>div]:bg-blue-500"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/client/ClientNutrition.tsx:228:13",
								"data-prohibitions": "[editContent]",
								className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
								children: macros.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:230:17",
									"data-prohibitions": "[editContent]",
									className: "overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:231:19",
										"data-prohibitions": "[editContent]",
										className: "p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:232:21",
												"data-prohibitions": "[editContent]",
												className: "flex items-center justify-between mb-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.icon, {
													"data-uid": "src/pages/client/ClientNutrition.tsx:233:23",
													"data-prohibitions": "[editContent]",
													className: `h-5 w-5 ${m.c}`
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:234:23",
													"data-prohibitions": "[editContent]",
													className: "text-xs font-semibold text-muted-foreground",
													children: [
														m.v,
														"/",
														m.m,
														" ",
														m.u
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:238:21",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-sm mb-2",
												children: m.lbl
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:239:21",
												"data-prohibitions": "[editContent]",
												value: m.v / (m.m || 1) * 100,
												className: "h-1.5"
											})
										]
									})
								}, m.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/client/ClientNutrition.tsx:245:13",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:246:15",
									"data-prohibitions": "[]",
									className: "text-lg font-semibold mb-3 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:247:17",
										"data-prohibitions": "[editContent]",
										className: "h-5 w-5 text-primary"
									}), " Refeições do Dia"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:249:15",
									"data-prohibitions": "[editContent]",
									type: "single",
									collapsible: true,
									className: "w-full space-y-3",
									children: diet.meals.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:251:19",
										"data-prohibitions": "[editContent]",
										value: m.id,
										className: "border rounded-lg px-4 bg-card",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:252:21",
											"data-prohibitions": "[editContent]",
											className: "hover:no-underline py-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:253:23",
												"data-prohibitions": "[editContent]",
												className: "flex flex-col items-start",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:254:25",
													"data-prohibitions": "[editContent]",
													className: "font-semibold text-base",
													children: m.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:255:25",
													"data-prohibitions": "[editContent]",
													className: "text-sm text-muted-foreground font-normal",
													children: m.time.substring(0, 5)
												})]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionContent, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:260:21",
											"data-prohibitions": "[editContent]",
											className: "pt-2 pb-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:261:23",
												"data-prohibitions": "[editContent]",
												className: "space-y-2 mb-4",
												children: m.meal_items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:263:27",
													"data-prohibitions": "[editContent]",
													className: "flex items-center gap-2 text-sm text-muted-foreground",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:267:29",
															"data-prohibitions": "[editContent]",
															className: "h-1.5 w-1.5 rounded-full bg-primary/50"
														}),
														" ",
														item.portion_g,
														"g ",
														item.food_items?.name,
														" ",
														item.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:269:44",
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
												"data-uid": "src/pages/client/ClientNutrition.tsx:273:23",
												"data-prohibitions": "[editContent]",
												onClick: () => setConsumedMeals((p) => ({
													...p,
													[m.id]: !p[m.id]
												})),
												variant: consumedMeals[m.id] ? "default" : "outline",
												className: cn("w-full gap-2", consumedMeals[m.id] ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "text-emerald-600 hover:bg-emerald-50 border-emerald-200"),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
														"data-uid": "src/pages/client/ClientNutrition.tsx:283:25",
														"data-prohibitions": "[editContent]",
														className: "h-4 w-4"
													}),
													" ",
													consumedMeals[m.id] ? "Consumido" : "Marcar como consumido"
												]
											})]
										})]
									}, m.id))
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:293:11",
						"data-prohibitions": "[editContent]",
						value: "plan",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:294:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:295:15",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:296:17",
									"data-prohibitions": "[editContent]",
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:297:19",
											"data-prohibitions": "[editContent]",
											className: "h-5 w-5 text-primary"
										}),
										" ",
										diet.name
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:299:17",
									"data-prohibitions": "[]",
									children: "Consulte as opções e substituições da sua dieta."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:301:15",
								"data-prohibitions": "[editContent]",
								className: "space-y-6",
								children: diet.meals.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:303:19",
									"data-prohibitions": "[editContent]",
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:304:21",
										"data-prohibitions": "[editContent]",
										className: "font-semibold text-base border-b pb-1 flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:305:23",
											"data-prohibitions": "[editContent]",
											children: m.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:306:23",
											"data-prohibitions": "[editContent]",
											className: "text-sm font-normal text-muted-foreground",
											children: m.time.substring(0, 5)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:310:21",
										"data-prohibitions": "[editContent]",
										className: "space-y-2",
										children: m.meal_items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:312:25",
											"data-prohibitions": "[editContent]",
											className: "bg-muted/40 p-3 rounded-md border flex justify-between items-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:316:27",
												"data-prohibitions": "[editContent]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:317:29",
													"data-prohibitions": "[editContent]",
													className: "font-medium text-sm text-foreground",
													children: [
														item.portion_g,
														"g de ",
														item.food_items?.name
													]
												}), item.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:321:31",
													"data-prohibitions": "[editContent]",
													className: "text-xs text-muted-foreground mt-1",
													children: ["Nota: ", item.notes]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:326:27",
												"data-prohibitions": "[editContent]",
												className: "text-xs text-muted-foreground",
												children: [
													Math.round((item.food_items?.energy_kcal || 0) * item.portion_g / 100),
													" ",
													"kcal"
												]
											})]
										}, item.id))
									})]
								}, m.id))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:341:11",
						"data-prohibitions": "[editContent]",
						value: "shopping",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:342:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:343:15",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:344:17",
									"data-prohibitions": "[]",
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:345:19",
										"data-prohibitions": "[editContent]",
										className: "h-5 w-5 text-primary"
									}), " Lista de Compras"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:347:17",
									"data-prohibitions": "[]",
									children: "Baseado no seu plano nutricional."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:349:15",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:350:17",
									"data-prohibitions": "[editContent]",
									className: "space-y-1",
									children: shopList.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:352:21",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 cursor-pointer transition-colors border border-transparent hover:border-border",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:356:23",
											"data-prohibitions": "[editContent]",
											id: `item-${i}`
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:357:23",
											"data-prohibitions": "[editContent]",
											className: "text-sm font-medium leading-none",
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

//# sourceMappingURL=ClientNutrition-h-BJex1O.js.map