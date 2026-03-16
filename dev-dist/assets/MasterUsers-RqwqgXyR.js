import { N as require_jsx_runtime, _ as createLucideIcon, n as Input } from "./dist-DWLmTnDD.js";
import "./dropdown-menu-Cjf8XSeA.js";
import "./sidebar-DUahpy0S.js";
import { n as DashboardHeader, t as PageContent } from "./PageContent-BnUjC6CJ.js";
var Search = createLucideIcon("search", [["path", {
	d: "m21 21-4.34-4.34",
	key: "14j7rj"
}], ["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}]]);
//#endregion
//#region src/pages/master/MasterUsers.tsx
var import_jsx_runtime = require_jsx_runtime();
function MasterUsers() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/master/MasterUsers.tsx:8:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/master/MasterUsers.tsx:9:7",
			"data-prohibitions": "[]",
			title: "Gestão de Usuários",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/master/MasterUsers.tsx:10:9",
				"data-prohibitions": "[]",
				className: "relative w-64 hidden md:block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					"data-uid": "src/pages/master/MasterUsers.tsx:11:11",
					"data-prohibitions": "[editContent]",
					className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/pages/master/MasterUsers.tsx:12:11",
					"data-prohibitions": "[editContent]",
					type: "search",
					placeholder: "Buscar usuários...",
					className: "pl-8 bg-muted/50"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageContent, {
			"data-uid": "src/pages/master/MasterUsers.tsx:15:7",
			"data-prohibitions": "[editContent]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/master/MasterUsers.tsx:16:9",
				"data-prohibitions": "[editContent]",
				className: "rounded-md border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/master/MasterUsers.tsx:17:11",
					"data-prohibitions": "[]",
					className: "p-4 border-b bg-muted/20 text-sm text-muted-foreground font-medium flex justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/pages/master/MasterUsers.tsx:18:13",
							"data-prohibitions": "[]",
							children: "Nome"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/pages/master/MasterUsers.tsx:19:13",
							"data-prohibitions": "[]",
							children: "Função"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/pages/master/MasterUsers.tsx:20:13",
							"data-prohibitions": "[]",
							children: "Status"
						})
					]
				}), [
					1,
					2,
					3,
					4,
					5
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/master/MasterUsers.tsx:23:13",
					"data-prohibitions": "[editContent]",
					className: "p-4 border-b last:border-0 flex justify-between items-center hover:bg-muted/10 transition-colors",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/master/MasterUsers.tsx:27:15",
							"data-prohibitions": "[editContent]",
							className: "font-medium",
							children: ["Usuário Simulado ", i]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/master/MasterUsers.tsx:28:15",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground",
							children: "Profissional"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/master/MasterUsers.tsx:29:15",
							"data-prohibitions": "[]",
							className: "text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full",
							children: "Ativo"
						})
					]
				}, i))]
			})
		})]
	});
}
//#endregion
export { MasterUsers as default };

//# sourceMappingURL=MasterUsers-RqwqgXyR.js.map