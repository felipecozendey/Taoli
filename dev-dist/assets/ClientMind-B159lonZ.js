import { At as require_jsx_runtime, a as AvatarImage, ft as createLucideIcon, i as AvatarFallback, n as DashboardHeader, q as Button, r as Avatar, t as PageContent } from "./PageContent-DFaAkjCU.js";
import { _t as Smile, ct as Card, ft as CardHeader, lt as CardContent, pt as CardTitle, st as Label } from "./index-CJCaxbOL.js";
import { t as Checkbox } from "./checkbox-g8jML1-n.js";
var Frown = createLucideIcon("frown", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M16 16s-1.5-2-4-2-4 2-4 2",
		key: "epbg0q"
	}],
	["line", {
		x1: "9",
		x2: "9.01",
		y1: "9",
		y2: "9",
		key: "yxxnd0"
	}],
	["line", {
		x1: "15",
		x2: "15.01",
		y1: "9",
		y2: "9",
		key: "1p4y9e"
	}]
]);
var Laugh = createLucideIcon("laugh", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z",
		key: "b2q4dd"
	}],
	["line", {
		x1: "9",
		x2: "9.01",
		y1: "9",
		y2: "9",
		key: "yxxnd0"
	}],
	["line", {
		x1: "15",
		x2: "15.01",
		y1: "9",
		y2: "9",
		key: "1p4y9e"
	}]
]);
var Meh = createLucideIcon("meh", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["line", {
		x1: "8",
		x2: "16",
		y1: "15",
		y2: "15",
		key: "1xb1d9"
	}],
	["line", {
		x1: "9",
		x2: "9.01",
		y1: "9",
		y2: "9",
		key: "yxxnd0"
	}],
	["line", {
		x1: "15",
		x2: "15.01",
		y1: "9",
		y2: "9",
		key: "1p4y9e"
	}]
]);
//#endregion
//#region src/pages/client/ClientMind.tsx
var import_jsx_runtime = require_jsx_runtime();
var ProfCard = ({ n, r, img, fb }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
	"data-uid": "src/pages/client/ClientMind.tsx:11:3",
	"data-prohibitions": "[editContent]",
	className: "mb-6 bg-muted/40 border-dashed shadow-sm",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		"data-uid": "src/pages/client/ClientMind.tsx:12:5",
		"data-prohibitions": "[editContent]",
		className: "p-4 flex items-center gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
			"data-uid": "src/pages/client/ClientMind.tsx:13:7",
			"data-prohibitions": "[editContent]",
			className: "h-12 w-12 border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
				"data-uid": "src/pages/client/ClientMind.tsx:14:9",
				"data-prohibitions": "[editContent]",
				src: img
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
				"data-uid": "src/pages/client/ClientMind.tsx:15:9",
				"data-prohibitions": "[editContent]",
				children: fb
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/client/ClientMind.tsx:17:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/client/ClientMind.tsx:18:9",
				"data-prohibitions": "[editContent]",
				className: "font-semibold text-sm",
				children: n
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/client/ClientMind.tsx:19:9",
				"data-prohibitions": "[editContent]",
				className: "text-xs text-muted-foreground",
				children: r
			})]
		})]
	})
});
var CheckItem = ({ id, label, border = true }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-uid": "src/pages/client/ClientMind.tsx:34:3",
	"data-prohibitions": "[editContent]",
	className: `flex items-center space-x-3 p-4 hover:bg-muted/50 transition-colors ${border ? "border-b" : ""}`,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
		"data-uid": "src/pages/client/ClientMind.tsx:37:5",
		"data-prohibitions": "[editContent]",
		id,
		className: "h-5 w-5"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		"data-uid": "src/pages/client/ClientMind.tsx:38:5",
		"data-prohibitions": "[editContent]",
		htmlFor: id,
		className: "flex-1 cursor-pointer text-sm font-medium",
		children: label
	})]
});
function ClientMind() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientMind.tsx:46:5",
		"data-prohibitions": "[]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientMind.tsx:47:7",
			"data-prohibitions": "[editContent]",
			title: "Saúde Mental"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/client/ClientMind.tsx:48:7",
			"data-prohibitions": "[]",
			className: "max-w-4xl mx-auto w-full animate-fade-in-up",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfCard, {
					"data-uid": "src/pages/client/ClientMind.tsx:49:9",
					"data-prohibitions": "[editContent]",
					n: "Dr. Roberto",
					r: "Psicólogo",
					img: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=5",
					fb: "RO"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/client/ClientMind.tsx:55:9",
					"data-prohibitions": "[]",
					className: "mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/client/ClientMind.tsx:56:11",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/client/ClientMind.tsx:57:13",
							"data-prohibitions": "[]",
							className: "text-base text-center",
							children: "Como você está se sentindo hoje?"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/client/ClientMind.tsx:61:11",
						"data-prohibitions": "[]",
						className: "flex justify-center gap-2 sm:gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/client/ClientMind.tsx:62:13",
								"data-prohibitions": "[]",
								variant: "ghost",
								className: "h-auto flex-col gap-3 p-3 sm:p-4 hover:bg-blue-50 hover:text-blue-600",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frown, {
									"data-uid": "src/pages/client/ClientMind.tsx:66:15",
									"data-prohibitions": "[editContent]",
									className: "h-10 w-10 text-blue-400"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/client/ClientMind.tsx:67:15",
									"data-prohibitions": "[]",
									className: "text-xs font-medium",
									children: "Triste"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/client/ClientMind.tsx:69:13",
								"data-prohibitions": "[]",
								variant: "ghost",
								className: "h-auto flex-col gap-3 p-3 sm:p-4 hover:bg-slate-100 hover:text-slate-700",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meh, {
									"data-uid": "src/pages/client/ClientMind.tsx:73:15",
									"data-prohibitions": "[editContent]",
									className: "h-10 w-10 text-slate-400"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/client/ClientMind.tsx:74:15",
									"data-prohibitions": "[]",
									className: "text-xs font-medium",
									children: "Neutro"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/client/ClientMind.tsx:76:13",
								"data-prohibitions": "[]",
								variant: "ghost",
								className: "h-auto flex-col gap-3 p-3 sm:p-4 hover:bg-green-50 hover:text-green-600",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smile, {
									"data-uid": "src/pages/client/ClientMind.tsx:80:15",
									"data-prohibitions": "[editContent]",
									className: "h-10 w-10 text-green-400"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/client/ClientMind.tsx:81:15",
									"data-prohibitions": "[]",
									className: "text-xs font-medium",
									children: "Feliz"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/client/ClientMind.tsx:83:13",
								"data-prohibitions": "[]",
								variant: "ghost",
								className: "h-auto flex-col gap-3 p-3 sm:p-4 hover:bg-yellow-50 hover:text-yellow-600",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Laugh, {
									"data-uid": "src/pages/client/ClientMind.tsx:87:15",
									"data-prohibitions": "[editContent]",
									className: "h-10 w-10 text-yellow-500"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/client/ClientMind.tsx:88:15",
									"data-prohibitions": "[]",
									className: "text-xs font-medium",
									children: "Excelente"
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/client/ClientMind.tsx:92:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/pages/client/ClientMind.tsx:93:11",
						"data-prohibitions": "[]",
						className: "font-semibold text-lg mb-3 px-1",
						children: "Hábitos de Bem-estar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/pages/client/ClientMind.tsx:94:11",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/client/ClientMind.tsx:95:13",
							"data-prohibitions": "[]",
							className: "p-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckItem, {
								"data-uid": "src/pages/client/ClientMind.tsx:96:15",
								"data-prohibitions": "[editContent]",
								id: "h1",
								label: "Meditação 10 min"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckItem, {
								"data-uid": "src/pages/client/ClientMind.tsx:97:15",
								"data-prohibitions": "[editContent]",
								id: "h2",
								label: "Respiração Guiada",
								border: false
							})]
						})
					})]
				})
			]
		})]
	});
}
//#endregion
export { ClientMind as default };

//# sourceMappingURL=ClientMind-B159lonZ.js.map