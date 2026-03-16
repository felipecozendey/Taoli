import { P as require_jsx_runtime, n as Input, r as Button } from "./dist-zdF_4_x7.js";
import "./dist-D00V14_S.js";
import { n as DashboardHeader, t as PageContent } from "./PageContent-C5S023uY.js";
import "./sidebar-CRTC7rf6.js";
import { a as Label, c as CardDescription, l as CardHeader, o as Card, s as CardContent, u as CardTitle } from "./index-CdzJPMjZ.js";
//#region src/pages/master/MasterSettings.tsx
var import_jsx_runtime = require_jsx_runtime();
function MasterSettings() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/master/MasterSettings.tsx:10:5",
		"data-prohibitions": "[]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/master/MasterSettings.tsx:11:7",
			"data-prohibitions": "[editContent]",
			title: "Configurações Globais"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageContent, {
			"data-uid": "src/pages/master/MasterSettings.tsx:12:7",
			"data-prohibitions": "[]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/master/MasterSettings.tsx:13:9",
				"data-prohibitions": "[]",
				className: "max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/master/MasterSettings.tsx:14:11",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/master/MasterSettings.tsx:15:13",
						"data-prohibitions": "[]",
						children: "Informações do Sistema"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/pages/master/MasterSettings.tsx:16:13",
						"data-prohibitions": "[]",
						children: "Gerencie o nome e comportamento global da plataforma."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/master/MasterSettings.tsx:18:11",
					"data-prohibitions": "[]",
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/master/MasterSettings.tsx:19:13",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/master/MasterSettings.tsx:20:15",
								"data-prohibitions": "[]",
								children: "Nome da Plataforma"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/master/MasterSettings.tsx:21:15",
								"data-prohibitions": "[editContent]",
								defaultValue: "HealthSaaS B2B2C"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/master/MasterSettings.tsx:23:13",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/master/MasterSettings.tsx:24:15",
								"data-prohibitions": "[]",
								children: "E-mail de Suporte Administrativo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/master/MasterSettings.tsx:25:15",
								"data-prohibitions": "[editContent]",
								defaultValue: "suporte@healthsaas.com"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/master/MasterSettings.tsx:27:13",
							"data-prohibitions": "[]",
							children: "Salvar Configurações"
						})
					]
				})]
			})
		})]
	});
}
//#endregion
export { MasterSettings as default };

//# sourceMappingURL=MasterSettings-DmJD94ax.js.map