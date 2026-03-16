import { N as require_jsx_runtime, _ as createLucideIcon } from "./dist-BII2280C.js";
import { t as LayoutDashboard } from "./layout-dashboard-s_N6klzr.js";
import { a as SidebarMenu, c as SidebarProvider, i as SidebarInset, n as SidebarContent, o as SidebarMenuButton, r as SidebarHeader, s as SidebarMenuItem, t as Sidebar } from "./sidebar-B9a-srLF.js";
import { b as useLocation, f as Users, p as Stethoscope, v as Link, y as Outlet } from "./index--66Q1kcF.js";
var CalendarDays = createLucideIcon("calendar-days", [
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
	}],
	["path", {
		d: "M8 14h.01",
		key: "6423bh"
	}],
	["path", {
		d: "M12 14h.01",
		key: "1etili"
	}],
	["path", {
		d: "M16 14h.01",
		key: "1gbofw"
	}],
	["path", {
		d: "M8 18h.01",
		key: "lrp35t"
	}],
	["path", {
		d: "M12 18h.01",
		key: "mhygvu"
	}],
	["path", {
		d: "M16 18h.01",
		key: "kzsmim"
	}]
]);
var FileText = createLucideIcon("file-text", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M10 9H8",
		key: "b1mrlr"
	}],
	["path", {
		d: "M16 13H8",
		key: "t4e002"
	}],
	["path", {
		d: "M16 17H8",
		key: "z1uh3a"
	}]
]);
//#endregion
//#region src/layouts/ProfessionalLayout.tsx
var import_jsx_runtime = require_jsx_runtime();
function ProfessionalLayout() {
	const location = useLocation();
	const navItems = [
		{
			title: "Painel",
			icon: LayoutDashboard,
			path: "/professional"
		},
		{
			title: "Pacientes",
			icon: Users,
			path: "/professional/patients"
		},
		{
			title: "Agenda",
			icon: CalendarDays,
			path: "/professional/calendar"
		},
		{
			title: "Prescrições",
			icon: FileText,
			path: "/professional/prescriptions"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/layouts/ProfessionalLayout.tsx:25:5",
		"data-prohibitions": "[editContent]",
		className: "theme-professional w-full bg-background font-sans",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarProvider, {
			"data-uid": "src/layouts/ProfessionalLayout.tsx:26:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sidebar, {
				"data-uid": "src/layouts/ProfessionalLayout.tsx:27:9",
				"data-prohibitions": "[editContent]",
				variant: "inset",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarHeader, {
					"data-uid": "src/layouts/ProfessionalLayout.tsx:28:11",
					"data-prohibitions": "[]",
					className: "py-4 px-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/layouts/ProfessionalLayout.tsx:29:13",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2 font-bold text-lg text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, {
							"data-uid": "src/layouts/ProfessionalLayout.tsx:30:15",
							"data-prohibitions": "[editContent]",
							className: "h-6 w-6"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/layouts/ProfessionalLayout.tsx:31:15",
							"data-prohibitions": "[]",
							children: "Portal Pro"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContent, {
					"data-uid": "src/layouts/ProfessionalLayout.tsx:34:11",
					"data-prohibitions": "[editContent]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, {
						"data-uid": "src/layouts/ProfessionalLayout.tsx:35:13",
						"data-prohibitions": "[editContent]",
						className: "px-2",
						children: navItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuItem, {
							"data-uid": "src/layouts/ProfessionalLayout.tsx:37:17",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuButton, {
								"data-uid": "src/layouts/ProfessionalLayout.tsx:38:19",
								"data-prohibitions": "[editContent]",
								asChild: true,
								isActive: location.pathname === item.path,
								tooltip: item.title,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									"data-uid": "src/layouts/ProfessionalLayout.tsx:43:21",
									"data-prohibitions": "[editContent]",
									to: item.path,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
										"data-uid": "src/layouts/ProfessionalLayout.tsx:44:23",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-4"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/layouts/ProfessionalLayout.tsx:45:23",
										"data-prohibitions": "[editContent]",
										children: item.title
									})]
								})
							})
						}, item.path))
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarInset, {
				"data-uid": "src/layouts/ProfessionalLayout.tsx:53:9",
				"data-prohibitions": "[]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {
					"data-uid": "src/layouts/ProfessionalLayout.tsx:54:11",
					"data-prohibitions": "[editContent]"
				})
			})]
		})
	});
}
//#endregion
export { ProfessionalLayout as default };

//# sourceMappingURL=ProfessionalLayout-C2IioQh2.js.map