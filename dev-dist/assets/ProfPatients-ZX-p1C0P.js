import { B as Input, E as Skeleton, G as CardHeader, Ot as require_jsx_runtime, V as Card, Vt as require_react, W as CardFooter, Wt as __toESM, X as supabase, Y as useAuth, i as AvatarFallback, n as DashboardHeader, q as Button, r as Avatar, t as PageContent, ut as createLucideIcon } from "./PageContent-ChuXhdYa.js";
import { Q as Badge, et as Users, gt as useToast, nt as Target, pt as ArrowRight } from "./index-BgWUsFa5.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-mrpRqmBB.js";
var Copy = createLucideIcon("copy", [["rect", {
	width: "14",
	height: "14",
	x: "8",
	y: "8",
	rx: "2",
	ry: "2",
	key: "17jyea"
}], ["path", {
	d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
	key: "zix9uf"
}]]);
var Link = createLucideIcon("link", [["path", {
	d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
	key: "1cjeqo"
}], ["path", {
	d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
	key: "19qd67"
}]]);
var UserPlus = createLucideIcon("user-plus", [
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}],
	["line", {
		x1: "19",
		x2: "19",
		y1: "8",
		y2: "14",
		key: "1bvyxn"
	}],
	["line", {
		x1: "22",
		x2: "16",
		y1: "11",
		y2: "11",
		key: "1shjgl"
	}]
]);
//#endregion
//#region src/services/patients.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var getMyPatients = async (professionalId) => {
	const { data, error } = await supabase.from("professional_client_links").select(`
      id,
      status,
      client_id,
      client:profiles!professional_client_links_client_id_fkey(id, name, email)
    `).eq("professional_id", professionalId);
	if (error) throw error;
	return data;
};
//#endregion
//#region src/pages/professional/ProfPatients.tsx
var import_jsx_runtime = require_jsx_runtime();
function ProfPatients() {
	const { user } = useAuth();
	const { toast } = useToast();
	const [patients, setPatients] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [inviteCode, setInviteCode] = (0, import_react.useState)("");
	const [isDialogOpen, setIsDialogOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!user?.id) return;
		const fetchPatients = async () => {
			setIsLoading(true);
			try {
				setPatients(await getMyPatients(user.id) || []);
			} catch (error) {
				console.error(error);
				toast({
					title: "Erro",
					description: "Não foi possível carregar os pacientes.",
					variant: "destructive"
				});
			} finally {
				setIsLoading(false);
			}
		};
		fetchPatients();
	}, [user?.id, toast]);
	const handleOpenDialog = (open) => {
		setIsDialogOpen(open);
		if (open) setInviteCode(Math.random().toString(36).substring(2, 8).toUpperCase());
	};
	const copyCode = async () => {
		try {
			await navigator.clipboard.writeText(inviteCode);
			toast({
				title: "Sucesso!",
				description: "Código copiado para a área de transferência!"
			});
		} catch {
			toast({
				title: "Erro",
				description: "Falha ao copiar código.",
				variant: "destructive"
			});
		}
	};
	const getInitials = (name) => {
		if (!name) return "??";
		return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
	};
	const formatStatus = (status) => {
		return status === "active" ? "Ativo" : status === "pending" ? "Pendente" : "Rejeitado";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/professional/ProfPatients.tsx:84:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/professional/ProfPatients.tsx:85:7",
			"data-prohibitions": "[]",
			title: "Os Meus Pacientes",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				"data-uid": "src/pages/professional/ProfPatients.tsx:86:9",
				"data-prohibitions": "[]",
				open: isDialogOpen,
				onOpenChange: handleOpenDialog,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
					"data-uid": "src/pages/professional/ProfPatients.tsx:87:11",
					"data-prohibitions": "[]",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/professional/ProfPatients.tsx:88:13",
						"data-prohibitions": "[]",
						size: "sm",
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, {
							"data-uid": "src/pages/professional/ProfPatients.tsx:89:15",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/pages/professional/ProfPatients.tsx:90:15",
							"data-prohibitions": "[]",
							className: "hidden sm:inline",
							children: "Novo Paciente"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/professional/ProfPatients.tsx:93:11",
					"data-prohibitions": "[]",
					className: "sm:max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
						"data-uid": "src/pages/professional/ProfPatients.tsx:94:13",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							"data-uid": "src/pages/professional/ProfPatients.tsx:95:15",
							"data-prohibitions": "[]",
							children: "Convidar Paciente"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							"data-uid": "src/pages/professional/ProfPatients.tsx:96:15",
							"data-prohibitions": "[]",
							children: "Envie este código para o seu paciente para se conectarem."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/professional/ProfPatients.tsx:100:13",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2 mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/professional/ProfPatients.tsx:101:15",
							"data-prohibitions": "[]",
							className: "relative flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								"data-uid": "src/pages/professional/ProfPatients.tsx:102:17",
								"data-prohibitions": "[editContent]",
								className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/professional/ProfPatients.tsx:103:17",
								"data-prohibitions": "[editContent]",
								readOnly: true,
								value: inviteCode,
								className: "pl-9 font-mono font-medium tracking-wider"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/professional/ProfPatients.tsx:109:15",
							"data-prohibitions": "[]",
							onClick: copyCode,
							className: "shrink-0 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								"data-uid": "src/pages/professional/ProfPatients.tsx:110:17",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/professional/ProfPatients.tsx:111:17",
								"data-prohibitions": "[]",
								className: "hidden sm:inline",
								children: "Copiar Link"
							})]
						})]
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/professional/ProfPatients.tsx:118:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/professional/ProfPatients.tsx:119:9",
				"data-prohibitions": "[]",
				className: "mb-6 animate-fade-in-up",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/professional/ProfPatients.tsx:120:11",
					"data-prohibitions": "[]",
					className: "text-muted-foreground text-sm md:text-base",
					children: "Faça a gestão da sua lista de clientes e envie novos convites."
				})
			}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/professional/ProfPatients.tsx:126:11",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
				children: [
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/professional/ProfPatients.tsx:128:15",
					"data-prohibitions": "[]",
					className: "flex flex-col h-[140px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						"data-uid": "src/pages/professional/ProfPatients.tsx:129:17",
						"data-prohibitions": "[]",
						className: "flex flex-row items-start gap-4 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/professional/ProfPatients.tsx:130:19",
							"data-prohibitions": "[editContent]",
							className: "h-12 w-12 rounded-full"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/professional/ProfPatients.tsx:131:19",
							"data-prohibitions": "[]",
							className: "space-y-2 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/professional/ProfPatients.tsx:132:21",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-3/4"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/professional/ProfPatients.tsx:133:21",
								"data-prohibitions": "[editContent]",
								className: "h-3 w-1/2"
							})]
						})]
					})
				}, i))
			}) : patients.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/professional/ProfPatients.tsx:140:11",
				"data-prohibitions": "[]",
				className: "flex flex-col items-center justify-center py-16 text-center animate-fade-in-up border rounded-lg bg-card/50 border-dashed",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
						"data-uid": "src/pages/professional/ProfPatients.tsx:141:13",
						"data-prohibitions": "[editContent]",
						className: "h-12 w-12 text-muted-foreground/30 mb-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/pages/professional/ProfPatients.tsx:142:13",
						"data-prohibitions": "[]",
						className: "text-lg font-medium text-foreground",
						children: "Ainda não tem pacientes."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/professional/ProfPatients.tsx:143:13",
						"data-prohibitions": "[]",
						className: "text-sm text-muted-foreground mt-1 max-w-sm mb-6",
						children: "Gere um código de convite para conectar-se ao seu primeiro paciente."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/professional/ProfPatients.tsx:146:13",
						"data-prohibitions": "[]",
						onClick: () => handleOpenDialog(true),
						variant: "secondary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, {
							"data-uid": "src/pages/professional/ProfPatients.tsx:147:15",
							"data-prohibitions": "[editContent]",
							className: "mr-2 h-4 w-4"
						}), "Convidar Paciente"]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/professional/ProfPatients.tsx:152:11",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up",
				children: patients.map((link) => {
					const clientData = Array.isArray(link.client) ? link.client[0] : link.client;
					const statusStr = formatStatus(link.status);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/professional/ProfPatients.tsx:158:17",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col transition-all hover:shadow-md border-border/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/professional/ProfPatients.tsx:162:19",
							"data-prohibitions": "[editContent]",
							className: "flex flex-row items-start justify-between pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/professional/ProfPatients.tsx:163:21",
								"data-prohibitions": "[editContent]",
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
									"data-uid": "src/pages/professional/ProfPatients.tsx:164:23",
									"data-prohibitions": "[editContent]",
									className: "h-12 w-12 border shadow-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
										"data-uid": "src/pages/professional/ProfPatients.tsx:165:25",
										"data-prohibitions": "[editContent]",
										className: "bg-primary/5 text-primary font-medium",
										children: getInitials(clientData?.name)
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/professional/ProfPatients.tsx:169:23",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										"data-uid": "src/pages/professional/ProfPatients.tsx:170:25",
										"data-prohibitions": "[editContent]",
										className: "font-semibold text-base leading-none mb-1.5 text-foreground line-clamp-1",
										children: clientData?.name || "Sem Nome"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/professional/ProfPatients.tsx:173:25",
										"data-prohibitions": "[]",
										className: "flex items-center text-xs text-muted-foreground font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {
											"data-uid": "src/pages/professional/ProfPatients.tsx:174:27",
											"data-prohibitions": "[editContent]",
											className: "h-3 w-3 mr-1 opacity-70"
										}), "Saúde Geral"]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								"data-uid": "src/pages/professional/ProfPatients.tsx:179:21",
								"data-prohibitions": "[editContent]",
								variant: "outline",
								className: link.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm" : "bg-amber-50 text-amber-700 border-amber-200 shadow-sm",
								children: statusStr
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, {
							"data-uid": "src/pages/professional/ProfPatients.tsx:190:19",
							"data-prohibitions": "[]",
							className: "mt-auto pt-2 pb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/professional/ProfPatients.tsx:191:21",
								"data-prohibitions": "[]",
								variant: "secondary",
								className: "w-full justify-between group bg-muted/50 hover:bg-muted",
								onClick: () => toast({ description: "A abrir prontuário..." }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/professional/ProfPatients.tsx:196:23",
									"data-prohibitions": "[]",
									className: "font-medium",
									children: "Aceder ao Prontuário"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
									"data-uid": "src/pages/professional/ProfPatients.tsx:197:23",
									"data-prohibitions": "[editContent]",
									className: "h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
								})]
							})
						})]
					}, link.id);
				})
			})]
		})]
	});
}
//#endregion
export { ProfPatients as default };

//# sourceMappingURL=ProfPatients-ZX-p1C0P.js.map