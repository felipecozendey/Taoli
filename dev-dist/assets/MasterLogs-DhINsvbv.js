import { At as require_jsx_runtime, E as Skeleton, Gt as require_react, J as buttonVariants, Jt as __toESM, ft as createLucideIcon, n as DashboardHeader, ot as cn, t as PageContent, ut as ChevronRight } from "./PageContent-DFaAkjCU.js";
import { t as ChevronLeft } from "./chevron-left-CgXgO8lG.js";
import { Lt as useToast, at as TableCell, ct as TableRow, it as TableBody, lt as getAuditLogs, nt as Badge, ot as TableHead, rt as Table, st as TableHeader } from "./index-C2wTFHMV.js";
var Ellipsis = createLucideIcon("ellipsis", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "1",
		key: "41hilf"
	}],
	["circle", {
		cx: "19",
		cy: "12",
		r: "1",
		key: "1wjl8i"
	}],
	["circle", {
		cx: "5",
		cy: "12",
		r: "1",
		key: "1pcz8c"
	}]
]);
//#endregion
//#region src/components/ui/pagination.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var Pagination = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
	"data-uid": "src/components/ui/pagination.tsx:9:3",
	"data-prohibitions": "[editContent]",
	role: "navigation",
	"aria-label": "pagination",
	className: cn("mx-auto flex w-full justify-center", className),
	...props
});
Pagination.displayName = "Pagination";
var PaginationContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
	"data-uid": "src/components/ui/pagination.tsx:20:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("flex flex-row items-center gap-1", className),
	...props
}));
PaginationContent.displayName = "PaginationContent";
var PaginationItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
	"data-uid": "src/components/ui/pagination.tsx:26:37",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("", className),
	...props
}));
PaginationItem.displayName = "PaginationItem";
var PaginationLink = ({ className, isActive, size = "icon", ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
	"data-uid": "src/components/ui/pagination.tsx:36:3",
	"data-prohibitions": "[editContent]",
	"aria-current": isActive ? "page" : void 0,
	className: cn(buttonVariants({
		variant: isActive ? "outline" : "ghost",
		size
	}), className),
	...props
});
PaginationLink.displayName = "PaginationLink";
var PaginationPrevious = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationLink, {
	"data-uid": "src/components/ui/pagination.tsx:54:3",
	"data-prohibitions": "[editContent]",
	"aria-label": "Go to previous page",
	size: "default",
	className: cn("gap-1 pl-2.5", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
		"data-uid": "src/components/ui/pagination.tsx:60:5",
		"data-prohibitions": "[editContent]",
		className: "h-4 w-4"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/components/ui/pagination.tsx:61:5",
		"data-prohibitions": "[]",
		children: "Previous"
	})]
});
PaginationPrevious.displayName = "PaginationPrevious";
var PaginationNext = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationLink, {
	"data-uid": "src/components/ui/pagination.tsx:67:3",
	"data-prohibitions": "[editContent]",
	"aria-label": "Go to next page",
	size: "default",
	className: cn("gap-1 pr-2.5", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/components/ui/pagination.tsx:73:5",
		"data-prohibitions": "[]",
		children: "Next"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
		"data-uid": "src/components/ui/pagination.tsx:74:5",
		"data-prohibitions": "[editContent]",
		className: "h-4 w-4"
	})]
});
PaginationNext.displayName = "PaginationNext";
var PaginationEllipsis = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
	"data-uid": "src/components/ui/pagination.tsx:80:3",
	"data-prohibitions": "[editContent]",
	"aria-hidden": true,
	className: cn("flex h-9 w-9 items-center justify-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {
		"data-uid": "src/components/ui/pagination.tsx:85:5",
		"data-prohibitions": "[editContent]",
		className: "h-4 w-4"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/components/ui/pagination.tsx:86:5",
		"data-prohibitions": "[]",
		className: "sr-only",
		children: "More pages"
	})]
});
PaginationEllipsis.displayName = "PaginationEllipsis";
//#endregion
//#region src/pages/master/MasterLogs.tsx
function MasterLogs() {
	const [logs, setLogs] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
	const [totalCount, setTotalCount] = (0, import_react.useState)(0);
	const pageSize = 10;
	const { toast } = useToast();
	(0, import_react.useEffect)(() => {
		let mounted = true;
		const fetchLogs = async () => {
			setIsLoading(true);
			try {
				const { data, count } = await getAuditLogs(currentPage, pageSize);
				if (mounted) {
					setLogs(data);
					setTotalCount(count);
				}
			} catch (error) {
				if (mounted) toast({
					title: "Erro ao carregar logs",
					description: error.message || "Não foi possível carregar os registos de auditoria.",
					variant: "destructive"
				});
			} finally {
				if (mounted) setIsLoading(false);
			}
		};
		fetchLogs();
		return () => {
			mounted = false;
		};
	}, [currentPage, toast]);
	const formatDate = (dateString) => {
		return new Intl.DateTimeFormat("pt-BR", {
			day: "2-digit",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		}).format(new Date(dateString));
	};
	const renderActionBadge = (action) => {
		if (action === "IMPERSONATE_START") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			"data-uid": "src/pages/master/MasterLogs.tsx:74:9",
			"data-prohibitions": "[]",
			variant: "outline",
			className: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
			children: "Acesso de Conta"
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			"data-uid": "src/pages/master/MasterLogs.tsx:82:12",
			"data-prohibitions": "[editContent]",
			variant: "outline",
			children: action
		});
	};
	const totalPages = Math.ceil(totalCount / pageSize);
	const startRecord = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
	const endRecord = Math.min(currentPage * pageSize, totalCount);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/master/MasterLogs.tsx:90:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/master/MasterLogs.tsx:91:7",
			"data-prohibitions": "[editContent]",
			title: "Logs de Auditoria"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/master/MasterLogs.tsx:92:7",
			"data-prohibitions": "[editContent]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/master/MasterLogs.tsx:93:9",
					"data-prohibitions": "[]",
					className: "mb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/master/MasterLogs.tsx:94:11",
						"data-prohibitions": "[]",
						className: "text-sm text-muted-foreground",
						children: "Histórico de ações administrativas e acessos ao sistema."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/master/MasterLogs.tsx:99:9",
					"data-prohibitions": "[editContent]",
					className: "rounded-md border bg-card shadow-sm overflow-hidden flex-1 flex flex-col",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/pages/master/MasterLogs.tsx:100:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/pages/master/MasterLogs.tsx:101:13",
							"data-prohibitions": "[]",
							className: "bg-muted/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/master/MasterLogs.tsx:102:15",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/master/MasterLogs.tsx:103:17",
										"data-prohibitions": "[]",
										children: "Data / Hora"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/master/MasterLogs.tsx:104:17",
										"data-prohibitions": "[]",
										children: "Administrador"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/master/MasterLogs.tsx:105:17",
										"data-prohibitions": "[]",
										children: "Ação"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/master/MasterLogs.tsx:106:17",
										"data-prohibitions": "[]",
										children: "Utilizador Afetado"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
							"data-uid": "src/pages/master/MasterLogs.tsx:109:13",
							"data-prohibitions": "[editContent]",
							children: isLoading ? Array.from({ length: Math.min(pageSize, 6) }).map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/master/MasterLogs.tsx:112:19",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/master/MasterLogs.tsx:113:21",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
											"data-uid": "src/pages/master/MasterLogs.tsx:114:23",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-[120px]"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/master/MasterLogs.tsx:116:21",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/master/MasterLogs.tsx:117:23",
											"data-prohibitions": "[]",
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
												"data-uid": "src/pages/master/MasterLogs.tsx:118:25",
												"data-prohibitions": "[editContent]",
												className: "h-4 w-[150px]"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
												"data-uid": "src/pages/master/MasterLogs.tsx:119:25",
												"data-prohibitions": "[editContent]",
												className: "h-3 w-[100px]"
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/master/MasterLogs.tsx:122:21",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
											"data-uid": "src/pages/master/MasterLogs.tsx:123:23",
											"data-prohibitions": "[editContent]",
											className: "h-6 w-[100px] rounded-full"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/master/MasterLogs.tsx:125:21",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/master/MasterLogs.tsx:126:23",
											"data-prohibitions": "[]",
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
												"data-uid": "src/pages/master/MasterLogs.tsx:127:25",
												"data-prohibitions": "[editContent]",
												className: "h-4 w-[150px]"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
												"data-uid": "src/pages/master/MasterLogs.tsx:128:25",
												"data-prohibitions": "[editContent]",
												className: "h-3 w-[100px]"
											})]
										})
									})
								]
							}, idx)) : logs.length > 0 ? logs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/master/MasterLogs.tsx:135:19",
								"data-prohibitions": "[editContent]",
								className: "hover:bg-muted/10 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/master/MasterLogs.tsx:136:21",
										"data-prohibitions": "[editContent]",
										className: "text-sm font-medium whitespace-nowrap",
										children: formatDate(log.created_at)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/master/MasterLogs.tsx:139:21",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/master/MasterLogs.tsx:140:23",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/master/MasterLogs.tsx:141:25",
												"data-prohibitions": "[editContent]",
												children: log.admin?.name || "Desconhecido"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/master/MasterLogs.tsx:142:25",
												"data-prohibitions": "[editContent]",
												className: "text-xs text-muted-foreground font-normal",
												children: log.admin?.email
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/master/MasterLogs.tsx:147:21",
										"data-prohibitions": "[editContent]",
										children: renderActionBadge(log.action)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/master/MasterLogs.tsx:148:21",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/master/MasterLogs.tsx:149:23",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/master/MasterLogs.tsx:150:25",
												"data-prohibitions": "[editContent]",
												children: log.target_user?.name || "Desconhecido"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/master/MasterLogs.tsx:151:25",
												"data-prohibitions": "[editContent]",
												className: "text-xs text-muted-foreground font-normal",
												children: log.target_user?.email
											})]
										})
									})
								]
							}, log.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
								"data-uid": "src/pages/master/MasterLogs.tsx:159:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/master/MasterLogs.tsx:160:19",
									"data-prohibitions": "[]",
									colSpan: 4,
									className: "text-center py-8 text-muted-foreground",
									children: "Nenhum registo de auditoria encontrado."
								})
							})
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/master/MasterLogs.tsx:169:9",
					"data-prohibitions": "[editContent]",
					className: "mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/master/MasterLogs.tsx:170:11",
						"data-prohibitions": "[editContent]",
						children: [
							"A mostrar ",
							startRecord,
							" a ",
							endRecord,
							" de ",
							totalCount,
							" registos."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
						"data-uid": "src/pages/master/MasterLogs.tsx:174:11",
						"data-prohibitions": "[editContent]",
						className: "mx-0 w-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationContent, {
							"data-uid": "src/pages/master/MasterLogs.tsx:175:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, {
								"data-uid": "src/pages/master/MasterLogs.tsx:176:15",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationPrevious, {
									"data-uid": "src/pages/master/MasterLogs.tsx:177:17",
									"data-prohibitions": "[editContent]",
									href: "#",
									onClick: (e) => {
										e.preventDefault();
										if (currentPage > 1) setCurrentPage((p) => p - 1);
									},
									className: currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, {
								"data-uid": "src/pages/master/MasterLogs.tsx:188:15",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationNext, {
									"data-uid": "src/pages/master/MasterLogs.tsx:189:17",
									"data-prohibitions": "[editContent]",
									href: "#",
									onClick: (e) => {
										e.preventDefault();
										if (currentPage < totalPages) setCurrentPage((p) => p + 1);
									},
									className: currentPage === totalPages || totalPages === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"
								})
							})]
						})
					})]
				})
			]
		})]
	});
}
//#endregion
export { MasterLogs as default };

//# sourceMappingURL=MasterLogs-DhINsvbv.js.map