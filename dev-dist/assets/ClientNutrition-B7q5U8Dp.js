import { B as CardTitle, I as Card, It as __toESM, L as CardContent, Nt as require_react, R as CardDescription, V as Button, bt as require_jsx_runtime, n as DashboardHeader, nt as createLucideIcon, t as PageContent, tt as Check, z as CardHeader } from "./PageContent-cRXQOFdU.js";
import { t as Flame } from "./flame-Seuu1nWo.js";
import { J as TabsContent, K as Badge, Q as Target, W as Progress, X as TabsTrigger, Y as TabsList, q as Tabs, st as Activity, tt as Plus } from "./index-CJQyrjWo.js";
import { t as Checkbox } from "./checkbox-B4V37j6Z.js";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-Dug_vfKP.js";
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
var macros = [
	{
		id: "cal",
		label: "Calorias",
		icon: Flame,
		color: "text-orange-500",
		val: 1500,
		max: 2e3,
		unit: "kcal"
	},
	{
		id: "pro",
		label: "Proteínas",
		icon: Activity,
		color: "text-red-500",
		val: 110,
		max: 150,
		unit: "g"
	},
	{
		id: "car",
		label: "Carboidratos",
		icon: Activity,
		color: "text-blue-500",
		val: 180,
		max: 200,
		unit: "g"
	},
	{
		id: "fat",
		label: "Gorduras",
		icon: Activity,
		color: "text-amber-500",
		val: 45,
		max: 65,
		unit: "g"
	}
];
var meals = [
	{
		id: "m1",
		t: "Café da Manhã",
		h: "08:00",
		items: [
			"2 Ovos mexidos",
			"1 Fatia de pão integral",
			"Café sem açúcar"
		]
	},
	{
		id: "m2",
		t: "Almoço",
		h: "12:30",
		items: [
			"150g Frango grelhado",
			"100g Arroz integral",
			"Salada verde à vontade"
		]
	},
	{
		id: "m3",
		t: "Lanche",
		h: "16:00",
		items: [
			"1 Iogurte natural",
			"30g Aveia em flocos",
			"1 Maçã"
		]
	}
];
var plan = [{
	t: "Almoço e Jantar",
	i: [
		{
			main: "150g de Peito de Frango grelhado",
			sub: "OU 150g de Patinho moído OU 150g de Tilápia"
		},
		{
			main: "100g de Arroz Integral",
			sub: "OU 100g de Arroz Branco OU 100g de Macarrão"
		},
		{
			main: "Salada de folhas verdes à vontade",
			sub: "Temperar com limão e 1 col. de azeite"
		}
	]
}];
var shopping = [
	"Maçã (1kg)",
	"Peito de Frango (2kg)",
	"Ovos (30 un)",
	"Arroz Integral (1kg)",
	"Iogurte Natural (500g)",
	"Aveia (500g)"
];
function ClientNutrition() {
	const [water, setWater] = (0, import_react.useState)(0);
	const maxWater = 2e3;
	const addWater = () => setWater((prev) => Math.min(prev + 250, maxWater));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientNutrition.tsx:117:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:118:7",
			"data-prohibitions": "[editContent]",
			title: "Minha Nutrição"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:119:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-4xl mx-auto w-full animate-fade-in-up space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/client/ClientNutrition.tsx:120:9",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/client/ClientNutrition.tsx:121:11",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/client/ClientNutrition.tsx:122:13",
						"data-prohibitions": "[]",
						className: "text-2xl font-bold tracking-tight text-foreground",
						children: "Visão Geral"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/client/ClientNutrition.tsx:123:13",
						"data-prohibitions": "[]",
						className: "text-muted-foreground text-sm",
						children: "Acompanhe sua dieta e metas diárias."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					"data-uid": "src/pages/client/ClientNutrition.tsx:125:11",
					"data-prohibitions": "[]",
					variant: "secondary",
					className: "w-fit px-3 py-1 text-sm font-medium",
					children: "Nutricionista: Dra. Thaís"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				"data-uid": "src/pages/client/ClientNutrition.tsx:130:9",
				"data-prohibitions": "[editContent]",
				defaultValue: "diary",
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:131:11",
						"data-prohibitions": "[]",
						className: "w-full sm:w-auto grid grid-cols-3 h-auto p-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:132:13",
								"data-prohibitions": "[]",
								value: "diary",
								className: "py-2 whitespace-normal text-xs sm:text-sm",
								children: "Diário de Hoje"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:135:13",
								"data-prohibitions": "[]",
								value: "plan",
								className: "py-2 whitespace-normal text-xs sm:text-sm",
								children: "Meu Plano"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:138:13",
								"data-prohibitions": "[]",
								value: "shopping",
								className: "py-2 whitespace-normal text-xs sm:text-sm",
								children: "Lista de Compras"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:143:11",
						"data-prohibitions": "[editContent]",
						value: "diary",
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:144:13",
								"data-prohibitions": "[editContent]",
								className: "border-blue-100 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:145:15",
									"data-prohibitions": "[editContent]",
									className: "pb-2 flex flex-row items-start sm:items-center justify-between gap-4 space-y-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:146:17",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:147:19",
											"data-prohibitions": "[]",
											className: "text-base flex items-center gap-2 text-blue-700 dark:text-blue-400",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:148:21",
												"data-prohibitions": "[editContent]",
												className: "h-5 w-5"
											}), " Hidratação"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:150:19",
											"data-prohibitions": "[editContent]",
											className: "text-blue-600/70 dark:text-blue-400/70",
											children: [
												"Meta diária: ",
												maxWater,
												"ml"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:154:17",
										"data-prohibitions": "[]",
										onClick: addWater,
										size: "sm",
										variant: "outline",
										className: "gap-1 border-blue-200 text-blue-700 hover:bg-blue-100",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:160:19",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-4"
										}), " 250ml"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:163:15",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:164:17",
										"data-prohibitions": "[editContent]",
										className: "flex justify-between text-sm mb-2 font-medium text-blue-900 dark:text-blue-300",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:165:19",
											"data-prohibitions": "[editContent]",
											children: [water, "ml consumidos"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:166:19",
											"data-prohibitions": "[editContent]",
											children: [Math.round(water / maxWater * 100), "%"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:168:17",
										"data-prohibitions": "[editContent]",
										value: water / maxWater * 100,
										className: "h-2.5 bg-blue-100 dark:bg-blue-950 [&>div]:bg-blue-500"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/client/ClientNutrition.tsx:175:13",
								"data-prohibitions": "[editContent]",
								className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
								children: macros.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:177:17",
									"data-prohibitions": "[editContent]",
									className: "overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:178:19",
										"data-prohibitions": "[editContent]",
										className: "p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:179:21",
												"data-prohibitions": "[editContent]",
												className: "flex items-center justify-between mb-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.icon, {
													"data-uid": "src/pages/client/ClientNutrition.tsx:180:23",
													"data-prohibitions": "[editContent]",
													className: `h-5 w-5 ${m.color}`
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:181:23",
													"data-prohibitions": "[editContent]",
													className: "text-xs font-semibold text-muted-foreground",
													children: [
														m.val,
														"/",
														m.max,
														" ",
														m.unit
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:185:21",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-sm mb-2",
												children: m.label
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:186:21",
												"data-prohibitions": "[editContent]",
												value: m.val / m.max * 100,
												className: "h-1.5"
											})
										]
									})
								}, m.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/client/ClientNutrition.tsx:192:13",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:193:15",
									"data-prohibitions": "[]",
									className: "text-lg font-semibold mb-3 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:194:17",
										"data-prohibitions": "[editContent]",
										className: "h-5 w-5 text-primary"
									}), " Refeições do Dia"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:196:15",
									"data-prohibitions": "[editContent]",
									type: "single",
									collapsible: true,
									className: "w-full space-y-3",
									children: meals.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:198:19",
										"data-prohibitions": "[editContent]",
										value: m.id,
										className: "border rounded-lg px-4 bg-card",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:199:21",
											"data-prohibitions": "[editContent]",
											className: "hover:no-underline py-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:200:23",
												"data-prohibitions": "[editContent]",
												className: "flex flex-col items-start",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:201:25",
													"data-prohibitions": "[editContent]",
													className: "font-semibold text-base",
													children: m.t
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:202:25",
													"data-prohibitions": "[editContent]",
													className: "text-sm text-muted-foreground font-normal",
													children: m.h
												})]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionContent, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:205:21",
											"data-prohibitions": "[editContent]",
											className: "pt-2 pb-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:206:23",
												"data-prohibitions": "[editContent]",
												className: "space-y-2 mb-4",
												children: m.items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													"data-uid": "src/pages/client/ClientNutrition.tsx:208:27",
													"data-prohibitions": "[editContent]",
													className: "flex items-center gap-2 text-sm text-muted-foreground",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															"data-uid": "src/pages/client/ClientNutrition.tsx:212:29",
															"data-prohibitions": "[editContent]",
															className: "h-1.5 w-1.5 rounded-full bg-primary/50"
														}),
														" ",
														item
													]
												}, i))
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												"data-uid": "src/pages/client/ClientNutrition.tsx:216:23",
												"data-prohibitions": "[]",
												variant: "outline",
												className: "w-full gap-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
													"data-uid": "src/pages/client/ClientNutrition.tsx:220:25",
													"data-prohibitions": "[editContent]",
													className: "h-4 w-4"
												}), " Marcar como consumido"]
											})]
										})]
									}, m.id))
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:229:11",
						"data-prohibitions": "[editContent]",
						value: "plan",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:230:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:231:15",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:232:17",
									"data-prohibitions": "[]",
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:233:19",
										"data-prohibitions": "[editContent]",
										className: "h-5 w-5 text-primary"
									}), " Plano Nutricional Prescrito"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:235:17",
									"data-prohibitions": "[]",
									children: "Consulte as opções e substituições da sua dieta."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:237:15",
								"data-prohibitions": "[editContent]",
								className: "space-y-6",
								children: plan.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:239:19",
									"data-prohibitions": "[editContent]",
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:240:21",
										"data-prohibitions": "[editContent]",
										className: "font-semibold text-base border-b pb-1",
										children: p.t
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:241:21",
										"data-prohibitions": "[editContent]",
										className: "space-y-4",
										children: p.i.map((item, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:243:25",
											"data-prohibitions": "[editContent]",
											className: "bg-muted/40 p-3 rounded-md border",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:244:27",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-sm text-foreground",
												children: item.main
											}), item.sub && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												"data-uid": "src/pages/client/ClientNutrition.tsx:246:29",
												"data-prohibitions": "[editContent]",
												className: "text-xs text-muted-foreground mt-1.5 flex items-start gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/client/ClientNutrition.tsx:247:31",
														"data-prohibitions": "[]",
														className: "font-semibold text-primary",
														children: "Substituição:"
													}),
													" ",
													item.sub
												]
											})]
										}, j))
									})]
								}, i))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:260:11",
						"data-prohibitions": "[editContent]",
						value: "shopping",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:261:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:262:15",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:263:17",
									"data-prohibitions": "[]",
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:264:19",
										"data-prohibitions": "[editContent]",
										className: "h-5 w-5 text-primary"
									}), " Lista de Compras"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:266:17",
									"data-prohibitions": "[]",
									children: "Baseado no seu plano nutricional."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:268:15",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:269:17",
									"data-prohibitions": "[editContent]",
									className: "space-y-1",
									children: shopping.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:271:21",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 cursor-pointer transition-colors border border-transparent hover:border-border",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											"data-uid": "src/pages/client/ClientNutrition.tsx:275:23",
											"data-prohibitions": "[editContent]",
											id: `item-${i}`
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:276:23",
											"data-prohibitions": "[editContent]",
											className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
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

//# sourceMappingURL=ClientNutrition-B7q5U8Dp.js.map