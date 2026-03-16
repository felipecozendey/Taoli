import { P as require_jsx_runtime, v as createLucideIcon } from "./dist-zdF_4_x7.js";
import { o as useAuth } from "./dist-SZMMwwRy.js";
import "./avatar-BjDF5_cL.js";
import "./sidebar-CRTC7rf6.js";
import { o as Card, s as CardContent } from "./index-CYFiKKSD.js";
import { n as DashboardHeader, t as PageContent } from "./PageContent-D9uLKrw6.js";
var CircleCheck = createLucideIcon("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]);
var Droplets = createLucideIcon("droplets", [["path", {
	d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
	key: "1ptgy4"
}], ["path", {
	d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
	key: "1sl1rz"
}]]);
var Flame = createLucideIcon("flame", [["path", {
	d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
	key: "1slcih"
}]]);
var Moon = createLucideIcon("moon", [["path", {
	d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
	key: "kfwtm"
}]]);
//#endregion
//#region src/pages/client/ClientDashboard.tsx
var import_jsx_runtime = require_jsx_runtime();
function ClientDashboard() {
	const { user } = useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientDashboard.tsx:11:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientDashboard.tsx:12:7",
			"data-prohibitions": "[editContent]",
			title: `Olá, ${user?.name?.split(" ")[0] || "Visitante"} 👋`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/client/ClientDashboard.tsx:13:7",
			"data-prohibitions": "[editContent]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/client/ClientDashboard.tsx:14:9",
					"data-prohibitions": "[]",
					className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/client/ClientDashboard.tsx:15:11",
							"data-prohibitions": "[]",
							className: "bg-indigo-50 border-indigo-100 dark:bg-indigo-950/30 dark:border-indigo-900",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								"data-uid": "src/pages/client/ClientDashboard.tsx:16:13",
								"data-prohibitions": "[]",
								className: "p-4 flex flex-col items-center justify-center text-center h-28",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, {
										"data-uid": "src/pages/client/ClientDashboard.tsx:17:15",
										"data-prohibitions": "[editContent]",
										className: "h-6 w-6 text-indigo-500 mb-2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/client/ClientDashboard.tsx:18:15",
										"data-prohibitions": "[]",
										className: "font-semibold text-lg",
										children: "1.2L"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/client/ClientDashboard.tsx:19:15",
										"data-prohibitions": "[]",
										className: "text-xs text-muted-foreground",
										children: "de Água"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/client/ClientDashboard.tsx:23:11",
							"data-prohibitions": "[]",
							className: "bg-orange-50 border-orange-100 dark:bg-orange-950/30 dark:border-orange-900",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								"data-uid": "src/pages/client/ClientDashboard.tsx:24:13",
								"data-prohibitions": "[]",
								className: "p-4 flex flex-col items-center justify-center text-center h-28",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
										"data-uid": "src/pages/client/ClientDashboard.tsx:25:15",
										"data-prohibitions": "[editContent]",
										className: "h-6 w-6 text-orange-500 mb-2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/client/ClientDashboard.tsx:26:15",
										"data-prohibitions": "[]",
										className: "font-semibold text-lg",
										children: "450 kcal"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/client/ClientDashboard.tsx:27:15",
										"data-prohibitions": "[]",
										className: "text-xs text-muted-foreground",
										children: "Queimadas"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/client/ClientDashboard.tsx:31:11",
							"data-prohibitions": "[]",
							className: "bg-purple-50 border-purple-100 dark:bg-purple-950/30 dark:border-purple-900",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								"data-uid": "src/pages/client/ClientDashboard.tsx:32:13",
								"data-prohibitions": "[]",
								className: "p-4 flex flex-col items-center justify-center text-center h-28",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
										"data-uid": "src/pages/client/ClientDashboard.tsx:33:15",
										"data-prohibitions": "[editContent]",
										className: "h-6 w-6 text-purple-500 mb-2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/client/ClientDashboard.tsx:34:15",
										"data-prohibitions": "[]",
										className: "font-semibold text-lg",
										children: "7h 20m"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/client/ClientDashboard.tsx:35:15",
										"data-prohibitions": "[]",
										className: "text-xs text-muted-foreground",
										children: "Sono"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/client/ClientDashboard.tsx:39:11",
							"data-prohibitions": "[]",
							className: "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-900",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								"data-uid": "src/pages/client/ClientDashboard.tsx:40:13",
								"data-prohibitions": "[]",
								className: "p-4 flex flex-col items-center justify-center text-center h-28",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
										"data-uid": "src/pages/client/ClientDashboard.tsx:41:15",
										"data-prohibitions": "[editContent]",
										className: "h-6 w-6 text-emerald-500 mb-2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/client/ClientDashboard.tsx:42:15",
										"data-prohibitions": "[]",
										className: "font-semibold text-lg",
										children: "3/5"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/client/ClientDashboard.tsx:43:15",
										"data-prohibitions": "[]",
										className: "text-xs text-muted-foreground",
										children: "Hábitos"
									})
								]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					"data-uid": "src/pages/client/ClientDashboard.tsx:48:9",
					"data-prohibitions": "[]",
					className: "font-semibold text-lg mb-4",
					children: "Tarefas de Produtividade Hoje"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/client/ClientDashboard.tsx:49:9",
					"data-prohibitions": "[editContent]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/client/ClientDashboard.tsx:50:11",
						"data-prohibitions": "[editContent]",
						className: "divide-y",
						children: [
							"Leitura Matinal (30 min)",
							"Reunião de Alinhamento (Foco)",
							"Treino de Força (Prescrito)"
						].map((task, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/client/ClientDashboard.tsx:56:15",
							"data-prohibitions": "[editContent]",
							className: "p-4 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/client/ClientDashboard.tsx:57:17",
								"data-prohibitions": "[editContent]",
								className: "h-5 w-5 rounded-full border-2 border-muted-foreground/30 flex-shrink-0"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/client/ClientDashboard.tsx:58:17",
								"data-prohibitions": "[editContent]",
								className: "text-sm",
								children: task
							})]
						}, i))
					})
				})
			]
		})]
	});
}
//#endregion
export { ClientDashboard as default };

//# sourceMappingURL=ClientDashboard-3j_2XIBN.js.map