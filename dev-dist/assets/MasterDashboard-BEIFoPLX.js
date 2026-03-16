import { N as require_jsx_runtime, _ as createLucideIcon } from "./dist-DWLmTnDD.js";
import { n as DashboardHeader, t as PageContent } from "./PageContent-BBeBVggZ.js";
import "./sidebar-DUahpy0S.js";
import { f as Users, g as Activity, l as CardHeader, o as Card, s as CardContent, u as CardTitle } from "./index-OrvDH0l8.js";
var CreditCard = createLucideIcon("credit-card", [["rect", {
	width: "20",
	height: "14",
	x: "2",
	y: "5",
	rx: "2",
	key: "ynyp8z"
}], ["line", {
	x1: "2",
	x2: "22",
	y1: "10",
	y2: "10",
	key: "1b3vmo"
}]]);
//#endregion
//#region src/pages/master/MasterDashboard.tsx
var import_jsx_runtime = require_jsx_runtime();
function MasterDashboard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/master/MasterDashboard.tsx:8:5",
		"data-prohibitions": "[]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/master/MasterDashboard.tsx:9:7",
			"data-prohibitions": "[editContent]",
			title: "Master Admin Dashboard"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/master/MasterDashboard.tsx:10:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/master/MasterDashboard.tsx:11:9",
				"data-prohibitions": "[]",
				className: "grid gap-4 md:grid-cols-3 mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/master/MasterDashboard.tsx:12:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/master/MasterDashboard.tsx:13:13",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/master/MasterDashboard.tsx:14:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Total de Usuários"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
								"data-uid": "src/pages/master/MasterDashboard.tsx:15:15",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-muted-foreground"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/master/MasterDashboard.tsx:17:13",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/master/MasterDashboard.tsx:18:15",
								"data-prohibitions": "[]",
								className: "text-2xl font-bold",
								children: "10,234"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/master/MasterDashboard.tsx:19:15",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "+180 desde o mês passado"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/master/MasterDashboard.tsx:23:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/master/MasterDashboard.tsx:24:13",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/master/MasterDashboard.tsx:25:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Profissionais Ativos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
								"data-uid": "src/pages/master/MasterDashboard.tsx:26:15",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-muted-foreground"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/master/MasterDashboard.tsx:28:13",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/master/MasterDashboard.tsx:29:15",
								"data-prohibitions": "[]",
								className: "text-2xl font-bold",
								children: "423"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/master/MasterDashboard.tsx:30:15",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "+12 aprovações pendentes"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/master/MasterDashboard.tsx:34:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/master/MasterDashboard.tsx:35:13",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/master/MasterDashboard.tsx:36:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Receita Estimada"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, {
								"data-uid": "src/pages/master/MasterDashboard.tsx:37:15",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-muted-foreground"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/master/MasterDashboard.tsx:39:13",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/master/MasterDashboard.tsx:40:15",
								"data-prohibitions": "[]",
								className: "text-2xl font-bold",
								children: "R$ 124.500"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/master/MasterDashboard.tsx:41:15",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "+8.2% de crescimento"
							})]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/master/MasterDashboard.tsx:46:9",
				"data-prohibitions": "[]",
				className: "rounded-xl border bg-card text-card-foreground shadow-sm h-64 flex items-center justify-center text-muted-foreground",
				children: "[Gráfico de Crescimento de Usuários - Placeholder]"
			})]
		})]
	});
}
//#endregion
export { MasterDashboard as default };

//# sourceMappingURL=MasterDashboard-BEIFoPLX.js.map