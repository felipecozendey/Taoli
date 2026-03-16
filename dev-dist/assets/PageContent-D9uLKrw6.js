import { G as useNavigate, P as require_jsx_runtime, r as Button } from "./dist-zdF_4_x7.js";
import { o as useAuth, s as Sparkles } from "./dist-SZMMwwRy.js";
import { a as DropdownMenu, c as DropdownMenuLabel, d as User, f as LogOut, l as DropdownMenuSeparator, n as AvatarFallback, o as DropdownMenuContent, r as AvatarImage, s as DropdownMenuItem, t as Avatar, u as DropdownMenuTrigger } from "./avatar-BjDF5_cL.js";
import { l as SidebarTrigger } from "./sidebar-CRTC7rf6.js";
//#region src/components/shared/DashboardHeader.tsx
var import_jsx_runtime = require_jsx_runtime();
function DashboardHeader({ title, children }) {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const handleLogout = () => {
		logout();
		navigate("/login");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		"data-uid": "src/components/shared/DashboardHeader.tsx:32:5",
		"data-prohibitions": "[editContent]",
		className: "sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/shared/DashboardHeader.tsx:33:7",
			"data-prohibitions": "[editContent]",
			className: "flex items-center gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarTrigger, {
					"data-uid": "src/components/shared/DashboardHeader.tsx:34:9",
					"data-prohibitions": "[editContent]",
					className: "-ml-2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/components/shared/DashboardHeader.tsx:35:9",
					"data-prohibitions": "[editContent]",
					className: "text-lg font-semibold tracking-tight hidden md:block",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/shared/DashboardHeader.tsx:38:9",
					"data-prohibitions": "[]",
					className: "flex items-center gap-2 font-bold text-lg text-primary md:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
						"data-uid": "src/components/shared/DashboardHeader.tsx:39:11",
						"data-prohibitions": "[editContent]",
						className: "h-5 w-5"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/components/shared/DashboardHeader.tsx:40:11",
						"data-prohibitions": "[]",
						children: "Taoli"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/shared/DashboardHeader.tsx:44:7",
			"data-prohibitions": "[editContent]",
			className: "flex items-center gap-4",
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, {
				"data-uid": "src/components/shared/DashboardHeader.tsx:47:9",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					"data-uid": "src/components/shared/DashboardHeader.tsx:48:11",
					"data-prohibitions": "[editContent]",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/shared/DashboardHeader.tsx:49:13",
						"data-prohibitions": "[editContent]",
						variant: "ghost",
						size: "icon",
						className: "rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
							"data-uid": "src/components/shared/DashboardHeader.tsx:50:15",
							"data-prohibitions": "[editContent]",
							className: "h-8 w-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
								"data-uid": "src/components/shared/DashboardHeader.tsx:51:17",
								"data-prohibitions": "[editContent]",
								src: user?.avatarUrl,
								alt: user?.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
								"data-uid": "src/components/shared/DashboardHeader.tsx:52:17",
								"data-prohibitions": "[editContent]",
								children: user?.name?.substring(0, 2).toUpperCase()
							})]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					"data-uid": "src/components/shared/DashboardHeader.tsx:56:11",
					"data-prohibitions": "[editContent]",
					align: "end",
					className: "w-56",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
							"data-uid": "src/components/shared/DashboardHeader.tsx:57:13",
							"data-prohibitions": "[editContent]",
							className: "font-normal",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/shared/DashboardHeader.tsx:58:15",
								"data-prohibitions": "[editContent]",
								className: "flex flex-col space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/shared/DashboardHeader.tsx:59:17",
									"data-prohibitions": "[editContent]",
									className: "text-sm font-medium leading-none",
									children: user?.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/shared/DashboardHeader.tsx:60:17",
									"data-prohibitions": "[editContent]",
									className: "text-xs leading-none text-muted-foreground",
									children: user?.email
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {
							"data-uid": "src/components/shared/DashboardHeader.tsx:63:13",
							"data-prohibitions": "[editContent]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							"data-uid": "src/components/shared/DashboardHeader.tsx:64:13",
							"data-prohibitions": "[]",
							className: "cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
								"data-uid": "src/components/shared/DashboardHeader.tsx:65:15",
								"data-prohibitions": "[editContent]",
								className: "mr-2 h-4 w-4"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/shared/DashboardHeader.tsx:66:15",
								"data-prohibitions": "[]",
								children: "Configurações do Perfil"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {
							"data-uid": "src/components/shared/DashboardHeader.tsx:68:13",
							"data-prohibitions": "[editContent]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							"data-uid": "src/components/shared/DashboardHeader.tsx:69:13",
							"data-prohibitions": "[]",
							onClick: handleLogout,
							className: "text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
								"data-uid": "src/components/shared/DashboardHeader.tsx:73:15",
								"data-prohibitions": "[editContent]",
								className: "mr-2 h-4 w-4"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/shared/DashboardHeader.tsx:74:15",
								"data-prohibitions": "[]",
								children: "Sair"
							})]
						})
					]
				})]
			})]
		})]
	});
}
//#endregion
//#region src/components/shared/PageContent.tsx
function PageContent({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/shared/PageContent.tsx:10:10",
		"data-prohibitions": "[editContent]",
		className: `flex-1 p-4 md:p-6 lg:p-8 animate-fade-in ${className}`,
		children
	});
}
//#endregion
export { DashboardHeader as n, PageContent as t };

//# sourceMappingURL=PageContent-D9uLKrw6.js.map