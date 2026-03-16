import { P as require_jsx_runtime, r as Button, v as createLucideIcon } from "./dist-zdF_4_x7.js";
import "./dist-D00V14_S.js";
import { n as DashboardHeader, t as PageContent } from "./PageContent-C5S023uY.js";
import "./sidebar-CRTC7rf6.js";
import { l as CardHeader, o as Card, s as CardContent, u as CardTitle } from "./index-CdzJPMjZ.js";
var Calendar = createLucideIcon("calendar", [
	["path", {
		d: "M8 2v4",
		key: "1cmpym"
	}],
	["path", {
		d: "M16 2v4",
		key: "4m81vk"
	}],
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "4",
		rx: "2",
		key: "1hopcy"
	}],
	["path", {
		d: "M3 10h18",
		key: "8toen8"
	}]
]);
var CirclePlus = createLucideIcon("circle-plus", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M8 12h8",
		key: "1wcyev"
	}],
	["path", {
		d: "M12 8v8",
		key: "napkw2"
	}]
]);
//#endregion
//#region src/pages/professional/ProfDashboard.tsx
var import_jsx_runtime = require_jsx_runtime();
function ProfDashboard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/professional/ProfDashboard.tsx:9:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/professional/ProfDashboard.tsx:10:7",
			"data-prohibitions": "[]",
			title: "Painel do Profissional",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/pages/professional/ProfDashboard.tsx:11:9",
				"data-prohibitions": "[]",
				size: "sm",
				className: "hidden sm:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, {
					"data-uid": "src/pages/professional/ProfDashboard.tsx:12:11",
					"data-prohibitions": "[editContent]",
					className: "mr-2 h-4 w-4"
				}), " Novo Paciente"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/professional/ProfDashboard.tsx:15:7",
			"data-prohibitions": "[editContent]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/professional/ProfDashboard.tsx:16:9",
					"data-prohibitions": "[]",
					className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/professional/ProfDashboard.tsx:17:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/professional/ProfDashboard.tsx:18:13",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/professional/ProfDashboard.tsx:19:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Consultas Hoje"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
								"data-uid": "src/pages/professional/ProfDashboard.tsx:20:15",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-teal-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/professional/ProfDashboard.tsx:22:13",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/professional/ProfDashboard.tsx:23:15",
								"data-prohibitions": "[]",
								className: "text-2xl font-bold text-teal-900 dark:text-teal-100",
								children: "8"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/professional/ProfDashboard.tsx:26:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							"data-uid": "src/pages/professional/ProfDashboard.tsx:27:13",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/professional/ProfDashboard.tsx:28:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Pacientes Ativos"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/professional/ProfDashboard.tsx:30:13",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/professional/ProfDashboard.tsx:31:15",
								"data-prohibitions": "[]",
								className: "text-2xl font-bold",
								children: "142"
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					"data-uid": "src/pages/professional/ProfDashboard.tsx:36:9",
					"data-prohibitions": "[]",
					className: "font-semibold text-lg mb-4",
					children: "Próximos Atendimentos"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/professional/ProfDashboard.tsx:37:9",
					"data-prohibitions": "[editContent]",
					className: "space-y-4",
					children: [
						1,
						2,
						3
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/professional/ProfDashboard.tsx:39:13",
						"data-prohibitions": "[editContent]",
						className: "p-4 rounded-xl border bg-card flex justify-between items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/professional/ProfDashboard.tsx:43:15",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/professional/ProfDashboard.tsx:44:17",
								"data-prohibitions": "[editContent]",
								className: "font-semibold",
								children: ["Paciente de Demonstração ", i]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/professional/ProfDashboard.tsx:45:17",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground",
								children: "Hoje, 14:00 - Retorno"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/professional/ProfDashboard.tsx:47:15",
							"data-prohibitions": "[]",
							variant: "outline",
							size: "sm",
							children: "Acessar Prontuário"
						})]
					}, i))
				})
			]
		})]
	});
}
//#endregion
export { ProfDashboard as default };

//# sourceMappingURL=ProfDashboard-B1Zl8tzM.js.map