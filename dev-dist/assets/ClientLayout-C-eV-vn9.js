import { N as require_jsx_runtime, _ as createLucideIcon } from "./dist-BII2280C.js";
import { t as LayoutDashboard } from "./layout-dashboard-s_N6klzr.js";
import { a as SidebarMenu, c as SidebarProvider, i as SidebarInset, n as SidebarContent, o as SidebarMenuButton, r as SidebarHeader, s as SidebarMenuItem, t as Sidebar } from "./sidebar-B9a-srLF.js";
import { b as useLocation, m as Leaf, v as Link, y as Outlet } from "./index--66Q1kcF.js";
var BookHeart = createLucideIcon("book-heart", [["path", {
	d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
	key: "k3hazp"
}], ["path", {
	d: "M8.62 9.8A2.25 2.25 0 1 1 12 6.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z",
	key: "9v40y5"
}]]);
var ChartLine = createLucideIcon("chart-line", [["path", {
	d: "M3 3v16a2 2 0 0 0 2 2h16",
	key: "c24i48"
}], ["path", {
	d: "m19 9-5 5-4-4-3 3",
	key: "2osh9i"
}]]);
var Zap = createLucideIcon("zap", [["path", {
	d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
	key: "1xq2db"
}]]);
//#endregion
//#region src/layouts/ClientLayout.tsx
var import_jsx_runtime = require_jsx_runtime();
function ClientLayout() {
	const location = useLocation();
	const navItems = [
		{
			title: "Início",
			icon: LayoutDashboard,
			path: "/client"
		},
		{
			title: "Meu Diário",
			icon: BookHeart,
			path: "/client/diary"
		},
		{
			title: "Produtividade",
			icon: Zap,
			path: "/client/productivity"
		},
		{
			title: "Progresso",
			icon: ChartLine,
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
				variant: "floating",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarHeader, {
					"data-uid": "src/layouts/ClientLayout.tsx:28:11",
					"data-prohibitions": "[]",
					className: "py-4 px-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/layouts/ClientLayout.tsx:29:13",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2 font-bold text-lg text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, {
							"data-uid": "src/layouts/ClientLayout.tsx:30:15",
							"data-prohibitions": "[editContent]",
							className: "h-6 w-6"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/layouts/ClientLayout.tsx:31:15",
							"data-prohibitions": "[]",
							children: "VitalApp"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContent, {
					"data-uid": "src/layouts/ClientLayout.tsx:34:11",
					"data-prohibitions": "[editContent]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, {
						"data-uid": "src/layouts/ClientLayout.tsx:35:13",
						"data-prohibitions": "[editContent]",
						className: "px-2",
						children: navItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuItem, {
							"data-uid": "src/layouts/ClientLayout.tsx:37:17",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuButton, {
								"data-uid": "src/layouts/ClientLayout.tsx:38:19",
								"data-prohibitions": "[editContent]",
								asChild: true,
								isActive: location.pathname === item.path,
								tooltip: item.title,
								className: "rounded-lg h-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									"data-uid": "src/layouts/ClientLayout.tsx:44:21",
									"data-prohibitions": "[editContent]",
									to: item.path,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
										"data-uid": "src/layouts/ClientLayout.tsx:45:23",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-4"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/layouts/ClientLayout.tsx:46:23",
										"data-prohibitions": "[editContent]",
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

//# sourceMappingURL=ClientLayout-C-eV-vn9.js.map