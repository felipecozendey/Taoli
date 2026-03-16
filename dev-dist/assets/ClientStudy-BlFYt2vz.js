import { A as Button, E as CardContent, G as createLucideIcon, T as Card, a as AvatarImage, ct as require_jsx_runtime, i as AvatarFallback, n as DashboardHeader, r as Avatar, t as PageContent } from "./PageContent-JaKQk1C1.js";
import { i as BookOpen, r as Label } from "./index-BV9fKYld.js";
import { t as Checkbox } from "./checkbox-CLRUOw0X.js";
var Play = createLucideIcon("play", [["path", {
	d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
	key: "10ikf1"
}]]);
//#endregion
//#region src/pages/client/ClientStudy.tsx
var import_jsx_runtime = require_jsx_runtime();
var ProfCard = ({ n, r, img, fb }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
	"data-uid": "src/pages/client/ClientStudy.tsx:11:3",
	"data-prohibitions": "[editContent]",
	className: "mb-6 bg-muted/40 border-dashed shadow-sm",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		"data-uid": "src/pages/client/ClientStudy.tsx:12:5",
		"data-prohibitions": "[editContent]",
		className: "p-4 flex items-center gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
			"data-uid": "src/pages/client/ClientStudy.tsx:13:7",
			"data-prohibitions": "[editContent]",
			className: "h-12 w-12 border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
				"data-uid": "src/pages/client/ClientStudy.tsx:14:9",
				"data-prohibitions": "[editContent]",
				src: img
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
				"data-uid": "src/pages/client/ClientStudy.tsx:15:9",
				"data-prohibitions": "[editContent]",
				children: fb
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/client/ClientStudy.tsx:17:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/client/ClientStudy.tsx:18:9",
				"data-prohibitions": "[editContent]",
				className: "font-semibold text-sm",
				children: n
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/client/ClientStudy.tsx:19:9",
				"data-prohibitions": "[editContent]",
				className: "text-xs text-muted-foreground",
				children: r
			})]
		})]
	})
});
var CheckItem = ({ id, label, border = true }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-uid": "src/pages/client/ClientStudy.tsx:34:3",
	"data-prohibitions": "[editContent]",
	className: `flex items-center space-x-3 p-4 hover:bg-muted/50 transition-colors ${border ? "border-b" : ""}`,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
		"data-uid": "src/pages/client/ClientStudy.tsx:37:5",
		"data-prohibitions": "[editContent]",
		id,
		className: "h-5 w-5"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		"data-uid": "src/pages/client/ClientStudy.tsx:38:5",
		"data-prohibitions": "[editContent]",
		htmlFor: id,
		className: "flex-1 cursor-pointer text-sm font-medium",
		children: label
	})]
});
function ClientStudy() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientStudy.tsx:46:5",
		"data-prohibitions": "[]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientStudy.tsx:47:7",
			"data-prohibitions": "[editContent]",
			title: "Estudos & Foco"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/client/ClientStudy.tsx:48:7",
			"data-prohibitions": "[]",
			className: "max-w-4xl mx-auto w-full animate-fade-in-up",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfCard, {
					"data-uid": "src/pages/client/ClientStudy.tsx:49:9",
					"data-prohibitions": "[editContent]",
					n: "Você",
					r: "Gerenciado por você",
					img: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=2",
					fb: "VC"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/client/ClientStudy.tsx:55:9",
					"data-prohibitions": "[]",
					className: "border-primary/20 bg-primary/5 shadow-sm mb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/client/ClientStudy.tsx:56:11",
						"data-prohibitions": "[]",
						className: "p-8 text-center space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/client/ClientStudy.tsx:57:13",
								"data-prohibitions": "[]",
								className: "h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
									"data-uid": "src/pages/client/ClientStudy.tsx:58:15",
									"data-prohibitions": "[editContent]",
									className: "h-8 w-8"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/client/ClientStudy.tsx:60:13",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									"data-uid": "src/pages/client/ClientStudy.tsx:61:15",
									"data-prohibitions": "[]",
									className: "font-semibold text-xl mb-2",
									children: "Sessão de Foco"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/client/ClientStudy.tsx:62:15",
									"data-prohibitions": "[]",
									className: "text-sm text-muted-foreground max-w-sm mx-auto",
									children: "Concentre-se em suas tarefas usando a técnica Pomodoro. 25 minutos de foco profundo para estudos."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/client/ClientStudy.tsx:67:13",
								"data-prohibitions": "[]",
								size: "lg",
								className: "w-full sm:w-auto gap-2 rounded-full px-8 h-12",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
									"data-uid": "src/pages/client/ClientStudy.tsx:68:15",
									"data-prohibitions": "[editContent]",
									className: "h-4 w-4 fill-current"
								}), "Iniciar Sessão de Foco"]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/client/ClientStudy.tsx:73:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/pages/client/ClientStudy.tsx:74:11",
						"data-prohibitions": "[]",
						className: "font-semibold text-lg mb-3 px-1",
						children: "Revisões e Tarefas do Dia"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/pages/client/ClientStudy.tsx:75:11",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/client/ClientStudy.tsx:76:13",
							"data-prohibitions": "[]",
							className: "p-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckItem, {
									"data-uid": "src/pages/client/ClientStudy.tsx:77:15",
									"data-prohibitions": "[editContent]",
									id: "e1",
									label: "Revisar lista de ideogramas (HSK1)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckItem, {
									"data-uid": "src/pages/client/ClientStudy.tsx:78:15",
									"data-prohibitions": "[editContent]",
									id: "e2",
									label: "Trabalho prático da faculdade"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckItem, {
									"data-uid": "src/pages/client/ClientStudy.tsx:79:15",
									"data-prohibitions": "[editContent]",
									id: "e3",
									label: "Leitura de artigo sobre Produtividade",
									border: false
								})
							]
						})
					})]
				})
			]
		})]
	});
}
//#endregion
export { ClientStudy as default };

//# sourceMappingURL=ClientStudy-BlFYt2vz.js.map