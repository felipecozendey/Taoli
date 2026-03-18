import { $ as Button, E as Skeleton, J as CardContent, K as Input, Pt as require_jsx_runtime, Qt as __toESM, Yt as require_react, Z as CardHeader, a as AvatarImage, c as DropdownMenuContent, f as DropdownMenuTrigger, gt as createLucideIcon, i as AvatarFallback, l as DropdownMenuItem, n as DashboardHeader, nt as supabase, q as Card, r as Avatar, s as DropdownMenu, t as PageContent, tt as useAuth } from "./PageContent-Cxm88eRr.js";
import { X as Switch, at as Search, bt as useToast, gt as Brain, nt as Trash2, pt as Dumbbell, st as Plus, tt as Users, vt as Apple } from "./index-Df7y65GX.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, s as DialogTrigger, t as Dialog } from "./dialog-DttZm_Lx.js";
var EllipsisVertical = createLucideIcon("ellipsis-vertical", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "1",
		key: "41hilf"
	}],
	["circle", {
		cx: "12",
		cy: "5",
		r: "1",
		key: "gxeob9"
	}],
	["circle", {
		cx: "12",
		cy: "19",
		r: "1",
		key: "lyex9k"
	}]
]);
//#endregion
//#region src/services/team.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var getMyTeam = async (clientId) => {
	const { data, error } = await supabase.from("professional_client_links").select(`
      id,
      professional_id,
      can_view_nutrition,
      can_view_training,
      can_view_mind,
      status,
      professional:profiles!professional_client_links_professional_id_fkey(
        id,
        name,
        is_nutritionist,
        is_trainer,
        is_psychologist
      )
    `).eq("client_id", clientId);
	if (error) throw error;
	return (data || []).map((item) => ({
		...item,
		professional: Array.isArray(item.professional) ? item.professional[0] : item.professional
	}));
};
var connectProfessional = async (clientId, professionalId) => {
	try {
		const { data, error } = await supabase.from("professional_client_links").insert({
			client_id: clientId,
			professional_id: professionalId,
			status: "active",
			can_view_nutrition: false,
			can_view_training: false,
			can_view_mind: false
		}).select().single();
		if (error) throw error;
		return data;
	} catch (error) {
		if (error.code === "23505") throw new Error("Já está conectado com este profissional.");
		if (error.code === "22P02") throw new Error("Chave de profissional inválida.");
		if (error.code === "23503") throw new Error("Profissional não encontrado.");
		throw new Error("Não foi possível conectar ao profissional.");
	}
};
var updatePermissions = async (linkId, permissions) => {
	const { error } = await supabase.from("professional_client_links").update(permissions).eq("id", linkId);
	if (error) throw error;
};
var disconnectProfessional = async (linkId) => {
	const { error } = await supabase.from("professional_client_links").delete().eq("id", linkId);
	if (error) throw error;
};
//#endregion
//#region src/pages/client/ClientTeam.tsx
var import_jsx_runtime = require_jsx_runtime();
var areas = [
	{
		key: "can_view_nutrition",
		label: "Partilhar Nutrição",
		icon: Apple,
		color: "text-emerald-500",
		bg: "bg-emerald-100 dark:bg-emerald-500/20"
	},
	{
		key: "can_view_training",
		label: "Partilhar Treinos",
		icon: Dumbbell,
		color: "text-blue-500",
		bg: "bg-blue-100 dark:bg-blue-500/20"
	},
	{
		key: "can_view_mind",
		label: "Partilhar Saúde Mental",
		icon: Brain,
		color: "text-purple-500",
		bg: "bg-purple-100 dark:bg-purple-500/20"
	}
];
function ClientTeam() {
	const { user } = useAuth();
	const { toast } = useToast();
	const [team, setTeam] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [isConnectOpen, setIsConnectOpen] = (0, import_react.useState)(false);
	const [inviteCode, setInviteCode] = (0, import_react.useState)("");
	const [isConnecting, setIsConnecting] = (0, import_react.useState)(false);
	const loadTeam = async () => {
		if (!user?.id) return;
		setIsLoading(true);
		try {
			setTeam(await getMyTeam(user.id));
		} catch (error) {
			toast({
				title: "Erro",
				description: "Falha ao carregar a sua equipa.",
				variant: "destructive"
			});
		} finally {
			setIsLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadTeam();
	}, [user?.id]);
	const handleConnect = async () => {
		if (!inviteCode.trim() || !user?.id) return;
		setIsConnecting(true);
		try {
			await connectProfessional(user.id, inviteCode.trim());
			toast({
				title: "Sucesso!",
				description: "Profissional adicionado à sua equipa."
			});
			setIsConnectOpen(false);
			setInviteCode("");
			loadTeam();
		} catch (error) {
			toast({
				title: "Erro na conexão",
				description: error.message,
				variant: "destructive"
			});
		} finally {
			setIsConnecting(false);
		}
	};
	const togglePermission = async (linkId, key, current) => {
		try {
			setTeam((prev) => prev.map((link) => link.id === linkId ? {
				...link,
				[key]: !current
			} : link));
			await updatePermissions(linkId, { [key]: !current });
			toast({ description: "Permissões atualizadas" });
		} catch (error) {
			setTeam((prev) => prev.map((link) => link.id === linkId ? {
				...link,
				[key]: current
			} : link));
			toast({
				description: "Falha ao atualizar permissões.",
				variant: "destructive"
			});
		}
	};
	const handleRemove = async (linkId) => {
		try {
			await disconnectProfessional(linkId);
			setTeam((prev) => prev.filter((link) => link.id !== linkId));
			toast({ description: "O profissional foi removido com sucesso." });
		} catch (error) {
			toast({
				description: "Erro ao remover profissional.",
				variant: "destructive"
			});
		}
	};
	const getSpecialties = (prof) => {
		const specs = [];
		if (prof.is_nutritionist) specs.push("Nutrição");
		if (prof.is_trainer) specs.push("Treino");
		if (prof.is_psychologist) specs.push("Psicologia");
		return specs.length ? specs.join(" • ") : "Profissional de Saúde";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/client/ClientTeam.tsx:143:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/client/ClientTeam.tsx:144:7",
			"data-prohibitions": "[editContent]",
			title: "A Minha Equipa de Saúde",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				"data-uid": "src/pages/client/ClientTeam.tsx:145:9",
				"data-prohibitions": "[editContent]",
				open: isConnectOpen,
				onOpenChange: setIsConnectOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
					"data-uid": "src/pages/client/ClientTeam.tsx:146:11",
					"data-prohibitions": "[]",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/client/ClientTeam.tsx:147:13",
						"data-prohibitions": "[]",
						size: "sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							"data-uid": "src/pages/client/ClientTeam.tsx:148:15",
							"data-prohibitions": "[editContent]",
							className: "mr-2 h-4 w-4"
						}), " Conectar Profissional"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/client/ClientTeam.tsx:151:11",
					"data-prohibitions": "[editContent]",
					className: "sm:max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
						"data-uid": "src/pages/client/ClientTeam.tsx:152:13",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							"data-uid": "src/pages/client/ClientTeam.tsx:153:15",
							"data-prohibitions": "[]",
							children: "Conectar Novo Profissional"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/client/ClientTeam.tsx:155:13",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col space-y-4 pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/client/ClientTeam.tsx:156:15",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground",
							children: "Insira a Chave do Profissional para dar-lhe acesso ao seu perfil."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/client/ClientTeam.tsx:159:15",
							"data-prohibitions": "[editContent]",
							className: "flex items-center space-x-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/client/ClientTeam.tsx:160:17",
								"data-prohibitions": "[editContent]",
								placeholder: "Chave do Profissional",
								value: inviteCode,
								onChange: (e) => setInviteCode(e.target.value)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/client/ClientTeam.tsx:165:17",
								"data-prohibitions": "[editContent]",
								onClick: handleConnect,
								disabled: isConnecting || !inviteCode,
								children: isConnecting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									"data-uid": "src/pages/client/ClientTeam.tsx:166:35",
									"data-prohibitions": "[editContent]",
									className: "h-4 w-4 animate-spin"
								}) : "Procurar"
							})]
						})]
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/client/ClientTeam.tsx:174:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/client/ClientTeam.tsx:175:9",
				"data-prohibitions": "[]",
				className: "mb-8 max-w-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/client/ClientTeam.tsx:176:11",
					"data-prohibitions": "[]",
					className: "text-muted-foreground text-lg",
					children: "Tens o controlo total dos teus dados. Decide o que partilhar com cada profissional."
				})
			}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/client/ClientTeam.tsx:182:11",
				"data-prohibitions": "[editContent]",
				className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3",
				children: [1, 2].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/client/ClientTeam.tsx:184:15",
					"data-prohibitions": "[]",
					className: "p-6 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/pages/client/ClientTeam.tsx:185:17",
						"data-prohibitions": "[editContent]",
						className: "h-12 w-3/4"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/pages/client/ClientTeam.tsx:186:17",
						"data-prohibitions": "[editContent]",
						className: "h-32 w-full"
					})]
				}, i))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/client/ClientTeam.tsx:191:11",
				"data-prohibitions": "[editContent]",
				className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3",
				children: [team.map((link) => {
					const prof = link.professional;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/client/ClientTeam.tsx:195:17",
						"data-prohibitions": "[editContent]",
						className: "animate-fade-in-up border-border/60 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/client/ClientTeam.tsx:196:19",
							"data-prohibitions": "[editContent]",
							className: "flex flex-row items-start justify-between space-y-0 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/client/ClientTeam.tsx:197:21",
								"data-prohibitions": "[editContent]",
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
									"data-uid": "src/pages/client/ClientTeam.tsx:198:23",
									"data-prohibitions": "[editContent]",
									className: "h-12 w-12 border bg-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
										"data-uid": "src/pages/client/ClientTeam.tsx:199:25",
										"data-prohibitions": "[editContent]",
										src: `https://img.usecurling.com/ppl/thumbnail?seed=${prof.id}`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
										"data-uid": "src/pages/client/ClientTeam.tsx:202:25",
										"data-prohibitions": "[editContent]",
										children: prof.name?.charAt(0) || "P"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/client/ClientTeam.tsx:204:23",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										"data-uid": "src/pages/client/ClientTeam.tsx:205:25",
										"data-prohibitions": "[editContent]",
										className: "font-semibold text-base leading-tight",
										children: prof.name || "Profissional"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/client/ClientTeam.tsx:208:25",
										"data-prohibitions": "[editContent]",
										className: "text-sm text-muted-foreground mt-0.5",
										children: getSpecialties(prof)
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, {
								"data-uid": "src/pages/client/ClientTeam.tsx:213:21",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
									"data-uid": "src/pages/client/ClientTeam.tsx:214:23",
									"data-prohibitions": "[]",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/client/ClientTeam.tsx:215:25",
										"data-prohibitions": "[]",
										variant: "ghost",
										size: "icon",
										className: "-mr-2 -mt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, {
											"data-uid": "src/pages/client/ClientTeam.tsx:216:27",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-4 text-muted-foreground"
										})
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
									"data-uid": "src/pages/client/ClientTeam.tsx:219:23",
									"data-prohibitions": "[]",
									align: "end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										"data-uid": "src/pages/client/ClientTeam.tsx:220:25",
										"data-prohibitions": "[]",
										onClick: () => handleRemove(link.id),
										className: "text-destructive cursor-pointer focus:text-destructive",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
											"data-uid": "src/pages/client/ClientTeam.tsx:224:27",
											"data-prohibitions": "[editContent]",
											className: "mr-2 h-4 w-4"
										}), " Remover Profissional"]
									})
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/client/ClientTeam.tsx:229:19",
							"data-prohibitions": "[editContent]",
							className: "pt-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/client/ClientTeam.tsx:230:21",
								"data-prohibitions": "[editContent]",
								className: "pt-4 border-t border-border/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									"data-uid": "src/pages/client/ClientTeam.tsx:231:23",
									"data-prohibitions": "[]",
									className: "text-sm font-medium mb-4 text-foreground/80",
									children: "Permissões de Partilha"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/client/ClientTeam.tsx:234:23",
									"data-prohibitions": "[editContent]",
									className: "space-y-4",
									children: areas.map((area) => {
										const Icon = area.icon;
										const isChecked = link[area.key];
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/client/ClientTeam.tsx:239:29",
											"data-prohibitions": "[editContent]",
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/client/ClientTeam.tsx:240:31",
												"data-prohibitions": "[editContent]",
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													"data-uid": "src/pages/client/ClientTeam.tsx:241:33",
													"data-prohibitions": "[editContent]",
													className: `p-2 rounded-md ${area.bg}`,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
														"data-uid": "src/pages/client/ClientTeam.tsx:242:35",
														"data-prohibitions": "[editContent]",
														className: `h-4 w-4 ${area.color}`
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/client/ClientTeam.tsx:244:33",
													"data-prohibitions": "[editContent]",
													className: "text-sm font-medium text-muted-foreground",
													children: area.label
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
												"data-uid": "src/pages/client/ClientTeam.tsx:248:31",
												"data-prohibitions": "[editContent]",
												checked: isChecked,
												onCheckedChange: () => togglePermission(link.id, area.key, isChecked)
											})]
										}, area.key);
									})
								})]
							})
						})]
					}, link.id);
				}), team.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/client/ClientTeam.tsx:269:15",
					"data-prohibitions": "[]",
					className: "col-span-full py-16 flex flex-col items-center justify-center text-center text-muted-foreground border rounded-xl border-dashed bg-card/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
							"data-uid": "src/pages/client/ClientTeam.tsx:270:17",
							"data-prohibitions": "[editContent]",
							className: "h-12 w-12 text-muted-foreground/30 mb-4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							"data-uid": "src/pages/client/ClientTeam.tsx:271:17",
							"data-prohibitions": "[]",
							className: "text-lg font-medium text-foreground",
							children: "Nenhum profissional conectado"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/client/ClientTeam.tsx:274:17",
							"data-prohibitions": "[]",
							className: "text-sm max-w-sm mt-1 mb-6",
							children: "Usa a chave fornecida pelo teu profissional para adicionar à tua equipa."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/client/ClientTeam.tsx:277:17",
							"data-prohibitions": "[]",
							onClick: () => setIsConnectOpen(true),
							variant: "secondary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
								"data-uid": "src/pages/client/ClientTeam.tsx:278:19",
								"data-prohibitions": "[editContent]",
								className: "mr-2 h-4 w-4"
							}), " Adicionar Profissional"]
						})
					]
				})]
			})]
		})]
	});
}
//#endregion
export { ClientTeam as default };

//# sourceMappingURL=ClientTeam-DsSDGhb8.js.map