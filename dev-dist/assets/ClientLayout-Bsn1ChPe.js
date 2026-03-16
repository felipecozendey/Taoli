import { P as require_jsx_runtime, V as Outlet, W as useLocation, v as createLucideIcon, z as Link } from "./dist-zdF_4_x7.js";
import { t as LayoutDashboard } from "./layout-dashboard-3ayNq25P.js";
import { a as SidebarMenu, c as SidebarProvider, i as SidebarInset, n as SidebarContent, o as SidebarMenuButton, r as SidebarHeader, s as SidebarMenuItem, t as Sidebar } from "./sidebar-CRTC7rf6.js";
import { p as Sparkles } from "./index-CdzJPMjZ.js";
var Book = createLucideIcon("book", [["path", {
	d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
	key: "k3hazp"
}]]);
var Target = createLucideIcon("target", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "6",
		key: "1vlfrh"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "2",
		key: "1c9p78"
	}]
]);
var TrendingUp = createLucideIcon("trending-up", [["path", {
	d: "M16 7h6v6",
	key: "box55l"
}], ["path", {
	d: "m22 7-8.5 8.5-5-5L2 17",
	key: "1t1m79"
}]]);
//#endregion
//#region src/layouts/ClientLayout.tsx
var import_jsx_runtime = require_jsx_runtime();
function ClientLayout() {
	const location = useLocation();
	const navItems = [
		{
			title: "Dashboard",
			icon: LayoutDashboard,
			path: "/client"
		},
		{
			title: "Meu Diário",
			icon: Book,
			path: "/client/diary"
		},
		{
			title: "Produtividade",
			icon: Target,
			path: "/client/productivity"
		},
		{
			title: "Meu Progresso",
			icon: TrendingUp,
			path: "/client/progress"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/layouts/ClientLayout.tsx:25:5",
		"data-prohibitions": "[editContent]",
		className: "theme-client w-full bg-background font-sans",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarProvider, {
			"data-uid": "src/layouts/ClientLayout.tsx:26:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sidebar, {
				"data-uid": "src/layouts/ClientLayout.tsx:27:9",
				"data-prohibitions": "[editContent]",
				variant: "inset",
				className: "border-r-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarHeader, {
					"data-uid": "src/layouts/ClientLayout.tsx:28:11",
					"data-prohibitions": "[]",
					className: "py-6 px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/layouts/ClientLayout.tsx:29:13",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2 font-bold text-2xl text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							"data-uid": "src/layouts/ClientLayout.tsx:30:15",
							"data-prohibitions": "[editContent]",
							className: "h-6 w-6"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/layouts/ClientLayout.tsx:31:15",
							"data-prohibitions": "[]",
							children: "Taoli"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContent, {
					"data-uid": "src/layouts/ClientLayout.tsx:34:11",
					"data-prohibitions": "[editContent]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, {
						"data-uid": "src/layouts/ClientLayout.tsx:35:13",
						"data-prohibitions": "[editContent]",
						className: "px-4 gap-2",
						children: navItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuItem, {
							"data-uid": "src/layouts/ClientLayout.tsx:37:17",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuButton, {
								"data-uid": "src/layouts/ClientLayout.tsx:38:19",
								"data-prohibitions": "[editContent]",
								asChild: true,
								isActive: location.pathname === item.path,
								tooltip: item.title,
								className: "rounded-lg h-11 transition-all duration-200",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									"data-uid": "src/layouts/ClientLayout.tsx:44:21",
									"data-prohibitions": "[editContent]",
									to: item.path,
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
										"data-uid": "src/layouts/ClientLayout.tsx:45:23",
										"data-prohibitions": "[editContent]",
										className: "h-5 w-5"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/layouts/ClientLayout.tsx:46:23",
										"data-prohibitions": "[editContent]",
										className: "text-sm font-medium",
										children: item.title
									})]
								})
							})
						}, item.path))
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarInset, {
				"data-uid": "src/layouts/ClientLayout.tsx:54:9",
				"data-prohibitions": "[]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {
					"data-uid": "src/layouts/ClientLayout.tsx:55:11",
					"data-prohibitions": "[editContent]"
				})
			})]
		})
	});
}
//#endregion
export { ClientLayout as default };

//# sourceMappingURL=ClientLayout-Bsn1ChPe.js.map