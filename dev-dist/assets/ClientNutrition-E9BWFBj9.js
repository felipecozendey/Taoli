import { A as CardDescription, M as CardTitle, N as Button, O as Card, a as AvatarImage, dt as require_jsx_runtime, i as AvatarFallback, j as CardHeader, k as CardContent, n as DashboardHeader, q as Check, r as Avatar, t as PageContent } from "./PageContent-wcdRlike.js";
import { t as Progress } from "./index-56gZuXg-.js";
//#region src/pages/client/ClientNutrition.tsx
var import_jsx_runtime = require_jsx_runtime();
var ProfCard = ({ n, r, img, fb }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
	"data-uid": "src/pages/client/ClientNutrition.tsx:10:3",
	"data-prohibitions": "[editContent]",
	className: "mb-6 bg-muted/40 border-dashed shadow-sm",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		"data-uid": "src/pages/client/ClientNutrition.tsx:11:5",
		"data-prohibitions": "[editContent]",
		className: "p-4 flex items-center gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:12:7",
			"data-prohibitions": "[editContent]",
			className: "h-12 w-12 border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
				"data-uid": "src/pages/client/ClientNutrition.tsx:13:9",
				"data-prohibitions": "[editContent]",
				src: img
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
				"data-uid": "src/pages/client/ClientNutrition.tsx:14:9",
				"data-prohibitions": "[editContent]",
				children: fb
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/client/ClientNutrition.tsx:16:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/client/ClientNutrition.tsx:17:9",
				"data-prohibitions": "[editContent]",
				className: "font-semibold text-sm",
				children: n
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/client/ClientNutrition.tsx:18:9",
				"data-prohibitions": "[editContent]",
				className: "text-xs text-muted-foreground",
				children: r
			})]
		})]
	})
});
function ClientNutrition() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientNutrition.tsx:26:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:27:7",
			"data-prohibitions": "[editContent]",
			title: "Minha Nutrição"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/client/ClientNutrition.tsx:28:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-4xl mx-auto w-full animate-fade-in-up",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfCard, {
					"data-uid": "src/pages/client/ClientNutrition.tsx:29:9",
					"data-prohibitions": "[editContent]",
					n: "Dra. Thaís",
					r: "Nutricionista",
					img: "https://img.usecurling.com/ppl/thumbnail?gender=female&seed=3",
					fb: "TH"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/client/ClientNutrition.tsx:35:9",
					"data-prohibitions": "[]",
					className: "mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:36:11",
						"data-prohibitions": "[]",
						className: "pb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:37:13",
							"data-prohibitions": "[]",
							className: "text-sm font-medium",
							children: "Calorias Consumidas vs. Meta"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:39:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/client/ClientNutrition.tsx:40:13",
							"data-prohibitions": "[]",
							className: "flex justify-between text-sm mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/client/ClientNutrition.tsx:41:15",
								"data-prohibitions": "[]",
								className: "font-semibold",
								children: "1.200 kcal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/client/ClientNutrition.tsx:42:15",
								"data-prohibitions": "[]",
								className: "text-muted-foreground",
								children: "2.000 kcal"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:44:13",
							"data-prohibitions": "[editContent]",
							value: 60,
							className: "h-2"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/client/ClientNutrition.tsx:48:9",
					"data-prohibitions": "[editContent]",
					className: "grid gap-4 sm:grid-cols-2",
					children: [{
						t: "Café da Manhã",
						h: "08:00",
						i: [
							"2 Ovos mexidos",
							"1 Fatia de pão integral",
							"Café sem açúcar"
						],
						m: [
							15,
							12,
							10
						]
					}, {
						t: "Almoço",
						h: "12:30",
						i: [
							"150g Frango grelhado",
							"100g Arroz integral",
							"Salada à vontade"
						],
						m: [
							30,
							45,
							15
						]
					}].map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/client/ClientNutrition.tsx:63:13",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:64:15",
							"data-prohibitions": "[editContent]",
							className: "pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:65:17",
								"data-prohibitions": "[editContent]",
								className: "text-base",
								children: m.t
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/client/ClientNutrition.tsx:66:17",
								"data-prohibitions": "[editContent]",
								children: m.h
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/client/ClientNutrition.tsx:68:15",
							"data-prohibitions": "[editContent]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:69:17",
									"data-prohibitions": "[editContent]",
									className: "text-sm space-y-1 mb-4 text-muted-foreground",
									children: m.i.map((x, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										"data-uid": "src/pages/client/ClientNutrition.tsx:71:21",
										"data-prohibitions": "[editContent]",
										children: ["• ", x]
									}, j))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/client/ClientNutrition.tsx:74:17",
									"data-prohibitions": "[editContent]",
									className: "flex gap-3 text-xs font-medium mb-4 bg-muted/50 p-2 rounded-md justify-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:75:19",
											"data-prohibitions": "[editContent]",
											className: "text-blue-600 dark:text-blue-400",
											children: [
												"Carbo: ",
												m.m[0],
												"g"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:76:19",
											"data-prohibitions": "[editContent]",
											className: "text-red-600 dark:text-red-400",
											children: [
												"Proteína: ",
												m.m[1],
												"g"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/client/ClientNutrition.tsx:77:19",
											"data-prohibitions": "[editContent]",
											className: "text-amber-600 dark:text-amber-400",
											children: [
												"Gordura: ",
												m.m[2],
												"g"
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/pages/client/ClientNutrition.tsx:79:17",
									"data-prohibitions": "[]",
									variant: "outline",
									className: "w-full gap-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										"data-uid": "src/pages/client/ClientNutrition.tsx:83:19",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-4"
									}), " Marcar como consumido"]
								})
							]
						})]
					}, i))
				})
			]
		})]
	});
}
//#endregion
export { ClientNutrition as default };

//# sourceMappingURL=ClientNutrition-E9BWFBj9.js.map