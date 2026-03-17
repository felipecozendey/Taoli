import { F as Input, I as Card, L as CardContent, a as AvatarImage, i as AvatarFallback, n as DashboardHeader, r as Avatar, t as PageContent, yt as require_jsx_runtime } from "./PageContent-BJODfX7S.js";
import { s as Label } from "./index-D_61u9dO.js";
//#region src/pages/client/ClientTraining.tsx
var import_jsx_runtime = require_jsx_runtime();
var ProfCard = ({ n, r, img, fb }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
	"data-uid": "src/pages/client/ClientTraining.tsx:9:3",
	"data-prohibitions": "[editContent]",
	className: "mb-6 bg-muted/40 border-dashed shadow-sm",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		"data-uid": "src/pages/client/ClientTraining.tsx:10:5",
		"data-prohibitions": "[editContent]",
		className: "p-4 flex items-center gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
			"data-uid": "src/pages/client/ClientTraining.tsx:11:7",
			"data-prohibitions": "[editContent]",
			className: "h-12 w-12 border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
				"data-uid": "src/pages/client/ClientTraining.tsx:12:9",
				"data-prohibitions": "[editContent]",
				src: img
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
				"data-uid": "src/pages/client/ClientTraining.tsx:13:9",
				"data-prohibitions": "[editContent]",
				children: fb
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/client/ClientTraining.tsx:15:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/client/ClientTraining.tsx:16:9",
				"data-prohibitions": "[editContent]",
				className: "font-semibold text-sm",
				children: n
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/client/ClientTraining.tsx:17:9",
				"data-prohibitions": "[editContent]",
				className: "text-xs text-muted-foreground",
				children: r
			})]
		})]
	})
});
function ClientTraining() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientTraining.tsx:25:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientTraining.tsx:26:7",
			"data-prohibitions": "[editContent]",
			title: "Meu Treino"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/client/ClientTraining.tsx:27:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-4xl mx-auto w-full animate-fade-in-up",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfCard, {
					"data-uid": "src/pages/client/ClientTraining.tsx:28:9",
					"data-prohibitions": "[editContent]",
					n: "Prof. Marcos",
					r: "Educador Físico",
					img: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=4",
					fb: "MA"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/client/ClientTraining.tsx:34:9",
					"data-prohibitions": "[]",
					className: "flex items-center justify-between mb-4 px-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/pages/client/ClientTraining.tsx:35:11",
						"data-prohibitions": "[]",
						className: "text-lg font-semibold tracking-tight",
						children: "Treino de Hipertrofia"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/pages/client/ClientTraining.tsx:36:11",
						"data-prohibitions": "[]",
						className: "text-sm text-muted-foreground font-medium bg-muted px-2 py-1 rounded-md",
						children: "45 min"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/client/ClientTraining.tsx:40:9",
					"data-prohibitions": "[editContent]",
					className: "space-y-3",
					children: [
						{
							n: "Supino Reto com Barra",
							s: "3x12",
							r: "60s"
						},
						{
							n: "Desenvolvimento com Halteres",
							s: "4x10",
							r: "45s"
						},
						{
							n: "Tríceps Pulley",
							s: "3x15",
							r: "45s"
						}
					].map((ex, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/pages/client/ClientTraining.tsx:46:13",
						"data-prohibitions": "[editContent]",
						className: "overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/client/ClientTraining.tsx:47:15",
							"data-prohibitions": "[editContent]",
							className: "p-4 flex flex-col sm:flex-row sm:items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/client/ClientTraining.tsx:48:17",
								"data-prohibitions": "[editContent]",
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/client/ClientTraining.tsx:49:19",
									"data-prohibitions": "[editContent]",
									className: "font-semibold text-sm mb-1",
									children: ex.n
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/client/ClientTraining.tsx:50:19",
									"data-prohibitions": "[editContent]",
									className: "flex items-center gap-2 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/pages/client/ClientTraining.tsx:51:21",
										"data-prohibitions": "[editContent]",
										className: "bg-muted px-2 py-0.5 rounded",
										children: ["Séries: ", ex.s]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/pages/client/ClientTraining.tsx:52:21",
										"data-prohibitions": "[editContent]",
										className: "bg-muted px-2 py-0.5 rounded",
										children: ["Descanso: ", ex.r]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/client/ClientTraining.tsx:55:17",
								"data-prohibitions": "[]",
								className: "flex items-center gap-3 bg-muted/30 p-2 rounded-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/client/ClientTraining.tsx:56:19",
									"data-prohibitions": "[]",
									className: "text-xs whitespace-nowrap font-medium text-muted-foreground",
									children: "Carga (kg):"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/client/ClientTraining.tsx:59:19",
									"data-prohibitions": "[editContent]",
									type: "number",
									placeholder: "0",
									className: "w-20 h-8 text-sm bg-background"
								})]
							})]
						})
					}, idx))
				})
			]
		})]
	});
}
//#endregion
export { ClientTraining as default };

//# sourceMappingURL=ClientTraining-CQCxQydh.js.map