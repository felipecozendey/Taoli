import { At as require_jsx_runtime, Bt as useNavigate, Gt as require_react, Jt as __toESM, Vt as useParams, X as useAuth, Z as supabase, ft as createLucideIcon, i as AvatarFallback, n as DashboardHeader, q as Button, r as Avatar, t as PageContent } from "./PageContent-DFaAkjCU.js";
import { Tt as Lock, _t as CardTitle, ft as Card, gt as CardHeader, i as TabsTrigger, jt as CirclePlus, mt as CardDescription, n as TabsContent, nt as Badge, pt as CardContent, r as TabsList, t as Tabs } from "./index-F3QPN-Yl.js";
import { t as Textarea } from "./textarea-DerFmMX-.js";
var ArrowLeft = createLucideIcon("arrow-left", [["path", {
	d: "m12 19-7-7 7-7",
	key: "1l729n"
}], ["path", {
	d: "M19 12H5",
	key: "x3x0zl"
}]]);
var Send = createLucideIcon("send", [["path", {
	d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
	key: "1ffxy3"
}], ["path", {
	d: "m21.854 2.147-10.94 10.939",
	key: "12cjpa"
}]]);
//#endregion
//#region src/pages/professional/ProfPatientRecord.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ProfPatientRecord() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useAuth();
	const [patientData, setPatientData] = (0, import_react.useState)(null);
	const [permissions, setPermissions] = (0, import_react.useState)({
		can_view_nutrition: false,
		can_view_training: false,
		can_view_mind: false
	});
	const [newNote, setNewNote] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)([{
		id: 1,
		date: "2023-10-25",
		content: "Paciente relata melhora no sono após ajuste na rotina."
	}, {
		id: 2,
		date: "2023-10-10",
		content: "Primeira consulta de acompanhamento. Definidas metas iniciais."
	}]);
	(0, import_react.useEffect)(() => {
		if (!id || !user?.id) return;
		const fetchPatient = async () => {
			try {
				const { data } = await supabase.from("professional_client_links").select("*, client:profiles!professional_client_links_client_id_fkey(*)").eq("client_id", id).eq("professional_id", user.id).single();
				if (data) {
					setPatientData(Array.isArray(data.client) ? data.client[0] : data.client);
					setPermissions({
						can_view_nutrition: data.can_view_nutrition,
						can_view_training: data.can_view_training,
						can_view_mind: data.can_view_mind
					});
				} else setPatientData({ name: "Paciente Não Encontrado" });
			} catch (e) {
				console.error(e);
			}
		};
		fetchPatient();
	}, [id, user?.id]);
	const handleAddNote = () => {
		if (!newNote.trim()) return;
		const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
		setNotes([{
			id: Date.now(),
			date: today,
			content: newNote
		}, ...notes]);
		setNewNote("");
	};
	const LockedContent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		"data-uid": "src/pages/professional/ProfPatientRecord.tsx:77:5",
		"data-prohibitions": "[]",
		className: "border-dashed bg-muted/30",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			"data-uid": "src/pages/professional/ProfPatientRecord.tsx:78:7",
			"data-prohibitions": "[]",
			className: "flex flex-col items-center justify-center py-16 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
					"data-uid": "src/pages/professional/ProfPatientRecord.tsx:79:9",
					"data-prohibitions": "[editContent]",
					className: "h-12 w-12 text-muted-foreground/30 mb-4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					"data-uid": "src/pages/professional/ProfPatientRecord.tsx:80:9",
					"data-prohibitions": "[]",
					className: "text-lg font-medium text-foreground mb-2",
					children: "Acesso Restrito"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/professional/ProfPatientRecord.tsx:81:9",
					"data-prohibitions": "[]",
					className: "text-sm text-muted-foreground max-w-sm",
					children: "O paciente não compartilhou estes dados consigo. Solicite a permissão na aplicação dele."
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/professional/ProfPatientRecord.tsx:89:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
			"data-uid": "src/pages/professional/ProfPatientRecord.tsx:90:7",
			"data-prohibitions": "[editContent]",
			title: "Prontuário do Paciente"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContent, {
			"data-uid": "src/pages/professional/ProfPatientRecord.tsx:91:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-5xl mx-auto w-full animate-fade-in-up",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/professional/ProfPatientRecord.tsx:92:9",
					"data-prohibitions": "[]",
					className: "mb-6 flex items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/professional/ProfPatientRecord.tsx:93:11",
						"data-prohibitions": "[]",
						variant: "ghost",
						size: "sm",
						onClick: () => navigate("/professional/patients"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
							"data-uid": "src/pages/professional/ProfPatientRecord.tsx:94:13",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4 mr-2"
						}), "Voltar para Lista"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/professional/ProfPatientRecord.tsx:99:9",
					"data-prohibitions": "[editContent]",
					className: "mb-8 shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/professional/ProfPatientRecord.tsx:100:11",
						"data-prohibitions": "[editContent]",
						className: "p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
								"data-uid": "src/pages/professional/ProfPatientRecord.tsx:101:13",
								"data-prohibitions": "[editContent]",
								className: "h-20 w-20 border shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
									"data-uid": "src/pages/professional/ProfPatientRecord.tsx:102:15",
									"data-prohibitions": "[editContent]",
									className: "bg-primary/5 text-primary text-xl font-semibold",
									children: patientData?.name?.substring(0, 2).toUpperCase() || "PT"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/professional/ProfPatientRecord.tsx:106:13",
								"data-prohibitions": "[editContent]",
								className: "space-y-1.5 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									"data-uid": "src/pages/professional/ProfPatientRecord.tsx:107:15",
									"data-prohibitions": "[editContent]",
									className: "text-2xl font-bold tracking-tight",
									children: patientData?.name || "Carregando..."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/professional/ProfPatientRecord.tsx:110:15",
									"data-prohibitions": "[editContent]",
									className: "flex items-center gap-3 text-sm text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/professional/ProfPatientRecord.tsx:111:17",
											"data-prohibitions": "[]",
											children: "28 anos"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/professional/ProfPatientRecord.tsx:112:17",
											"data-prohibitions": "[]",
											children: "•"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/professional/ProfPatientRecord.tsx:113:17",
											"data-prohibitions": "[]",
											children: "Masculino"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/professional/ProfPatientRecord.tsx:114:17",
											"data-prohibitions": "[]",
											children: "•"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/professional/ProfPatientRecord.tsx:115:17",
											"data-prohibitions": "[editContent]",
											children: patientData?.email || "Email indisponível"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/professional/ProfPatientRecord.tsx:118:13",
								"data-prohibitions": "[]",
								className: "w-full sm:w-auto mt-4 sm:mt-0 flex justify-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									"data-uid": "src/pages/professional/ProfPatientRecord.tsx:119:15",
									"data-prohibitions": "[]",
									variant: "outline",
									className: "bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1",
									children: "Vínculo Ativo"
								})
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					"data-uid": "src/pages/professional/ProfPatientRecord.tsx:129:9",
					"data-prohibitions": "[editContent]",
					defaultValue: "geral",
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							"data-uid": "src/pages/professional/ProfPatientRecord.tsx:130:11",
							"data-prohibitions": "[]",
							className: "mb-6 grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									"data-uid": "src/pages/professional/ProfPatientRecord.tsx:131:13",
									"data-prohibitions": "[]",
									value: "geral",
									className: "py-2",
									children: "Geral / Evolução"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									"data-uid": "src/pages/professional/ProfPatientRecord.tsx:134:13",
									"data-prohibitions": "[]",
									value: "nutricao",
									className: "py-2",
									children: "Nutrição"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									"data-uid": "src/pages/professional/ProfPatientRecord.tsx:137:13",
									"data-prohibitions": "[]",
									value: "treino",
									className: "py-2",
									children: "Treino"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									"data-uid": "src/pages/professional/ProfPatientRecord.tsx:140:13",
									"data-prohibitions": "[]",
									value: "mente",
									className: "py-2",
									children: "Saúde Mental"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							"data-uid": "src/pages/professional/ProfPatientRecord.tsx:145:11",
							"data-prohibitions": "[editContent]",
							value: "geral",
							className: "animate-fade-in-up mt-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/professional/ProfPatientRecord.tsx:146:13",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
									"data-uid": "src/pages/professional/ProfPatientRecord.tsx:147:15",
									"data-prohibitions": "[]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/professional/ProfPatientRecord.tsx:148:17",
										"data-prohibitions": "[]",
										children: "Evolução Clínica"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
										"data-uid": "src/pages/professional/ProfPatientRecord.tsx:149:17",
										"data-prohibitions": "[]",
										children: "Anotações e acompanhamento contínuo das sessões."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									"data-uid": "src/pages/professional/ProfPatientRecord.tsx:151:15",
									"data-prohibitions": "[editContent]",
									className: "space-y-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/professional/ProfPatientRecord.tsx:152:17",
										"data-prohibitions": "[]",
										className: "space-y-3 bg-muted/20 p-4 rounded-lg border border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											"data-uid": "src/pages/professional/ProfPatientRecord.tsx:153:19",
											"data-prohibitions": "[editContent]",
											placeholder: "Descreva a evolução da consulta de hoje...",
											value: newNote,
											onChange: (e) => setNewNote(e.target.value),
											className: "resize-none bg-background"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/professional/ProfPatientRecord.tsx:159:19",
											"data-prohibitions": "[]",
											className: "flex justify-end",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												"data-uid": "src/pages/professional/ProfPatientRecord.tsx:160:21",
												"data-prohibitions": "[]",
												onClick: handleAddNote,
												disabled: !newNote.trim(),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
													"data-uid": "src/pages/professional/ProfPatientRecord.tsx:161:23",
													"data-prohibitions": "[editContent]",
													className: "h-4 w-4 mr-2"
												}), "Adicionar Evolução"]
											})
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/professional/ProfPatientRecord.tsx:167:17",
										"data-prohibitions": "[editContent]",
										className: "space-y-4 pt-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											"data-uid": "src/pages/professional/ProfPatientRecord.tsx:168:19",
											"data-prohibitions": "[]",
											className: "font-semibold text-sm text-muted-foreground mb-2",
											children: "Histórico"
										}), notes.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/professional/ProfPatientRecord.tsx:170:21",
											"data-prohibitions": "[editContent]",
											className: "p-4 rounded-lg border bg-card hover:bg-muted/10 transition-colors",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/pages/professional/ProfPatientRecord.tsx:174:23",
												"data-prohibitions": "[editContent]",
												className: "flex justify-between items-center mb-2",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													"data-uid": "src/pages/professional/ProfPatientRecord.tsx:175:25",
													"data-prohibitions": "[editContent]",
													variant: "secondary",
													className: "font-normal text-xs",
													children: new Intl.DateTimeFormat("pt-BR").format(new Date(note.date))
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/professional/ProfPatientRecord.tsx:179:23",
												"data-prohibitions": "[editContent]",
												className: "text-sm leading-relaxed",
												children: note.content
											})]
										}, note.id))]
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							"data-uid": "src/pages/professional/ProfPatientRecord.tsx:187:11",
							"data-prohibitions": "[editContent]",
							value: "nutricao",
							className: "animate-fade-in-up mt-0",
							children: !permissions.can_view_nutrition ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockedContent, {
								"data-uid": "src/pages/professional/ProfPatientRecord.tsx:189:15",
								"data-prohibitions": "[editContent]"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/professional/ProfPatientRecord.tsx:191:15",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
									"data-uid": "src/pages/professional/ProfPatientRecord.tsx:192:17",
									"data-prohibitions": "[]",
									className: "flex flex-row items-start justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/professional/ProfPatientRecord.tsx:193:19",
										"data-prohibitions": "[]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
											"data-uid": "src/pages/professional/ProfPatientRecord.tsx:194:21",
											"data-prohibitions": "[]",
											children: "Resumo Nutricional"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
											"data-uid": "src/pages/professional/ProfPatientRecord.tsx:195:21",
											"data-prohibitions": "[]",
											children: "Visão geral da dieta atual do paciente."
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/pages/professional/ProfPatientRecord.tsx:197:19",
										"data-prohibitions": "[]",
										size: "sm",
										onClick: () => navigate(`/professional/prescriptions?patientId=${id}`),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, {
											"data-uid": "src/pages/professional/ProfPatientRecord.tsx:201:21",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-4 mr-2"
										}), "Nova Prescrição"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/professional/ProfPatientRecord.tsx:205:17",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/professional/ProfPatientRecord.tsx:206:19",
										"data-prohibitions": "[]",
										className: "p-5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/professional/ProfPatientRecord.tsx:207:21",
											"data-prohibitions": "[]",
											className: "flex items-center gap-2 mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/pages/professional/ProfPatientRecord.tsx:208:23",
												"data-prohibitions": "[]",
												className: "h-2 w-2 rounded-full bg-emerald-500"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												"data-uid": "src/pages/professional/ProfPatientRecord.tsx:209:23",
												"data-prohibitions": "[]",
												className: "font-semibold text-emerald-900 dark:text-emerald-400",
												children: "Dieta Ativa: Hipertrofia"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/professional/ProfPatientRecord.tsx:213:21",
											"data-prohibitions": "[]",
											className: "text-sm text-emerald-700 dark:text-emerald-500 font-medium",
											children: "2500 kcal • 180g Proteína • 250g Carboidrato • 80g Gordura"
										})]
									})
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							"data-uid": "src/pages/professional/ProfPatientRecord.tsx:222:11",
							"data-prohibitions": "[editContent]",
							value: "treino",
							className: "animate-fade-in-up mt-0",
							children: !permissions.can_view_training ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockedContent, {
								"data-uid": "src/pages/professional/ProfPatientRecord.tsx:224:15",
								"data-prohibitions": "[editContent]"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/professional/ProfPatientRecord.tsx:226:15",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
									"data-uid": "src/pages/professional/ProfPatientRecord.tsx:227:17",
									"data-prohibitions": "[]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/professional/ProfPatientRecord.tsx:228:19",
										"data-prohibitions": "[]",
										children: "Módulo de Treino"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
										"data-uid": "src/pages/professional/ProfPatientRecord.tsx:229:19",
										"data-prohibitions": "[]",
										children: "Acompanhamento físico e prescrição de exercícios."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/professional/ProfPatientRecord.tsx:233:17",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/professional/ProfPatientRecord.tsx:234:19",
										"data-prohibitions": "[]",
										className: "p-8 text-center text-muted-foreground border rounded-lg border-dashed",
										children: "Nenhum treino prescrito ativamente."
									})
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							"data-uid": "src/pages/professional/ProfPatientRecord.tsx:242:11",
							"data-prohibitions": "[editContent]",
							value: "mente",
							className: "animate-fade-in-up mt-0",
							children: !permissions.can_view_mind ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockedContent, {
								"data-uid": "src/pages/professional/ProfPatientRecord.tsx:244:15",
								"data-prohibitions": "[editContent]"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/professional/ProfPatientRecord.tsx:246:15",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
									"data-uid": "src/pages/professional/ProfPatientRecord.tsx:247:17",
									"data-prohibitions": "[]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/professional/ProfPatientRecord.tsx:248:19",
										"data-prohibitions": "[]",
										children: "Acompanhamento Psicológico"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
										"data-uid": "src/pages/professional/ProfPatientRecord.tsx:249:19",
										"data-prohibitions": "[]",
										children: "Visualização do estado de humor e notas compartilhadas."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/professional/ProfPatientRecord.tsx:253:17",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/professional/ProfPatientRecord.tsx:254:19",
										"data-prohibitions": "[]",
										className: "p-8 text-center text-muted-foreground border rounded-lg border-dashed",
										children: "Nenhum dado registrado para exibição no momento."
									})
								})]
							})
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { ProfPatientRecord as default };

//# sourceMappingURL=ProfPatientRecord-Vu-d_07E.js.map