import { E as Skeleton, Kt as __toESM, Ot as require_jsx_runtime, Ut as require_react, n as DashboardHeader, t as PageContent } from "./PageContent-Ccawl6xW.js";
import { $ as Table, Nt as useToast, Q as Badge, at as getAuditLogs, et as TableBody, it as TableRow, nt as TableHead, rt as TableHeader, tt as TableCell } from "./index-DvwOTxy2.js";
//#region src/pages/master/MasterLogs.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function MasterLogs() {
	const [logs, setLogs] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const { toast } = useToast();
	(0, import_react.useEffect)(() => {
		let mounted = true;
		const fetchLogs = async () => {
			try {
				const data = await getAuditLogs();
				if (mounted) setLogs(data);
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
	}, [toast]);
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
			"data-uid": "src/pages/master/MasterLogs.tsx:60:9",
			"data-prohibitions": "[]",
			variant: "outline",
			className: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
			children: "Acesso de Conta"
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			"data-uid": "src/pages/master/MasterLogs.tsx:68:12",
			"data-prohibitions": "[editContent]",
			variant: "outline",
			children: action
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/master/MasterLogs.tsx:72:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/master/MasterLogs.tsx:73:7",
			"data-prohibitions": "[editContent]",
			title: "Logs de Auditoria"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/master/MasterLogs.tsx:74:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/master/MasterLogs.tsx:75:9",
				"data-prohibitions": "[]",
				className: "mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/master/MasterLogs.tsx:76:11",
					"data-prohibitions": "[]",
					className: "text-sm text-muted-foreground",
					children: "Histórico de ações administrativas e acessos ao sistema."
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/master/MasterLogs.tsx:81:9",
				"data-prohibitions": "[editContent]",
				className: "rounded-md border bg-card shadow-sm overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					"data-uid": "src/pages/master/MasterLogs.tsx:82:11",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
						"data-uid": "src/pages/master/MasterLogs.tsx:83:13",
						"data-prohibitions": "[]",
						className: "bg-muted/30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/master/MasterLogs.tsx:84:15",
							"data-prohibitions": "[]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/master/MasterLogs.tsx:85:17",
									"data-prohibitions": "[]",
									children: "Data / Hora"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/master/MasterLogs.tsx:86:17",
									"data-prohibitions": "[]",
									children: "Administrador"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/master/MasterLogs.tsx:87:17",
									"data-prohibitions": "[]",
									children: "Ação"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/master/MasterLogs.tsx:88:17",
									"data-prohibitions": "[]",
									children: "Utilizador Afetado"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
						"data-uid": "src/pages/master/MasterLogs.tsx:91:13",
						"data-prohibitions": "[editContent]",
						children: isLoading ? Array.from({ length: 6 }).map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/master/MasterLogs.tsx:94:19",
							"data-prohibitions": "[]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/master/MasterLogs.tsx:95:21",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/master/MasterLogs.tsx:96:23",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-[120px]"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/master/MasterLogs.tsx:98:21",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/master/MasterLogs.tsx:99:23",
										"data-prohibitions": "[]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
											"data-uid": "src/pages/master/MasterLogs.tsx:100:25",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-[150px]"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
											"data-uid": "src/pages/master/MasterLogs.tsx:101:25",
											"data-prohibitions": "[editContent]",
											className: "h-3 w-[100px]"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/master/MasterLogs.tsx:104:21",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/master/MasterLogs.tsx:105:23",
										"data-prohibitions": "[editContent]",
										className: "h-6 w-[100px] rounded-full"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/master/MasterLogs.tsx:107:21",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/master/MasterLogs.tsx:108:23",
										"data-prohibitions": "[]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
											"data-uid": "src/pages/master/MasterLogs.tsx:109:25",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-[150px]"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
											"data-uid": "src/pages/master/MasterLogs.tsx:110:25",
											"data-prohibitions": "[editContent]",
											className: "h-3 w-[100px]"
										})]
									})
								})
							]
						}, idx)) : logs.length > 0 ? logs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/master/MasterLogs.tsx:117:19",
							"data-prohibitions": "[editContent]",
							className: "hover:bg-muted/10 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/master/MasterLogs.tsx:118:21",
									"data-prohibitions": "[editContent]",
									className: "text-sm font-medium whitespace-nowrap",
									children: formatDate(log.created_at)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/master/MasterLogs.tsx:121:21",
									"data-prohibitions": "[editContent]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/master/MasterLogs.tsx:122:23",
										"data-prohibitions": "[editContent]",
										className: "flex flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/master/MasterLogs.tsx:123:25",
											"data-prohibitions": "[editContent]",
											children: log.admin?.name || "Desconhecido"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/master/MasterLogs.tsx:124:25",
											"data-prohibitions": "[editContent]",
											className: "text-xs text-muted-foreground font-normal",
											children: log.admin?.email
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/master/MasterLogs.tsx:129:21",
									"data-prohibitions": "[editContent]",
									children: renderActionBadge(log.action)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/master/MasterLogs.tsx:130:21",
									"data-prohibitions": "[editContent]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/master/MasterLogs.tsx:131:23",
										"data-prohibitions": "[editContent]",
										className: "flex flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/master/MasterLogs.tsx:132:25",
											"data-prohibitions": "[editContent]",
											children: log.target_user?.name || "Desconhecido"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/master/MasterLogs.tsx:133:25",
											"data-prohibitions": "[editContent]",
											className: "text-xs text-muted-foreground font-normal",
											children: log.target_user?.email
										})]
									})
								})
							]
						}, log.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							"data-uid": "src/pages/master/MasterLogs.tsx:141:17",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/master/MasterLogs.tsx:142:19",
								"data-prohibitions": "[]",
								colSpan: 4,
								className: "text-center py-8 text-muted-foreground",
								children: "Nenhum registo de auditoria encontrado."
							})
						})
					})]
				})
			})]
		})]
	});
}
//#endregion
export { MasterLogs as default };

//# sourceMappingURL=MasterLogs-BTB9dxJe.js.map