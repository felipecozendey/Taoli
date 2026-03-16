import { B as Outlet, N as require_jsx_runtime, R as Link, U as useLocation, _ as createLucideIcon } from "./dist-DWLmTnDD.js";
import { t as LayoutDashboard } from "./layout-dashboard-DmOAbry_.js";
import { a as SidebarMenu, c as SidebarProvider, i as SidebarInset, n as SidebarContent, o as SidebarMenuButton, r as SidebarHeader, s as SidebarMenuItem, t as Sidebar } from "./sidebar-DUahpy0S.js";
import { f as Users, h as Building2 } from "./index-DrO53AR6.js";
var Settings = createLucideIcon("settings", [["path", {
	d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
	key: "1i5ecw"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]);
//#endregion
//#region src/layouts/MasterLayout.tsx
var import_jsx_runtime = require_jsx_runtime();
function MasterLayout() {
	const location = useLocation();
	const navItems = [
		{
			title: "Dashboard",
			icon: LayoutDashboard,
			path: "/master"
		},
		{
			title: "Usuários",
			icon: Users,
			path: "/master/users"
		},
		{
			title: "Configurações Globais",
			icon: Settings,
			path: "/master/settings"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/layouts/MasterLayout.tsx:24:5",
		"data-prohibitions": "[editContent]",
		className: "theme-master w-full bg-background font-sans",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarProvider, {
			"data-uid": "src/layouts/MasterLayout.tsx:25:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sidebar, {
				"data-uid": "src/layouts/MasterLayout.tsx:26:9",
				"data-prohibitions": "[editContent]",
				variant: "inset",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarHeader, {
					"data-uid": "src/layouts/MasterLayout.tsx:27:11",
					"data-prohibitions": "[]",
					className: "py-4 px-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/layouts/MasterLayout.tsx:28:13",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2 font-bold text-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
							"data-uid": "src/layouts/MasterLayout.tsx:29:15",
							"data-prohibitions": "[editContent]",
							className: "h-6 w-6 text-primary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/layouts/MasterLayout.tsx:30:15",
							"data-prohibitions": "[]",
							children: "HealthSaaS Admin"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContent, {
					"data-uid": "src/layouts/MasterLayout.tsx:33:11",
					"data-prohibitions": "[editContent]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, {
						"data-uid": "src/layouts/MasterLayout.tsx:34:13",
						"data-prohibitions": "[editContent]",
						className: "px-2",
						children: navItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuItem, {
							"data-uid": "src/layouts/MasterLayout.tsx:36:17",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuButton, {
								"data-uid": "src/layouts/MasterLayout.tsx:37:19",
								"data-prohibitions": "[editContent]",
								asChild: true,
								isActive: location.pathname === item.path,
								tooltip: item.title,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									"data-uid": "src/layouts/MasterLayout.tsx:42:21",
									"data-prohibitions": "[editContent]",
									to: item.path,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
										"data-uid": "src/layouts/MasterLayout.tsx:43:23",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-4"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/layouts/MasterLayout.tsx:44:23",
										"data-prohibitions": "[editContent]",
										children: item.title
									})]
								})
							})
						}, item.path))
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarInset, {
				"data-uid": "src/layouts/MasterLayout.tsx:52:9",
				"data-prohibitions": "[]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {
					"data-uid": "src/layouts/MasterLayout.tsx:53:11",
					"data-prohibitions": "[editContent]"
				})
			})]
		})
	});
}
//#endregion
export { MasterLayout as default };

//# sourceMappingURL=MasterLayout-CAwwXw9z.js.map