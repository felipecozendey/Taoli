import {
  G as useNavigate,
  P as require_jsx_runtime,
  V as Outlet,
  W as useLocation,
  r as Button,
  v as createLucideIcon,
  z as Link,
} from './dist-zdF_4_x7.js'
import { o as useAuth, s as Sparkles } from './dist-SZMMwwRy.js'
import {
  a as DropdownMenu,
  c as DropdownMenuLabel,
  d as User,
  f as LogOut,
  l as DropdownMenuSeparator,
  n as AvatarFallback,
  o as DropdownMenuContent,
  r as AvatarImage,
  s as DropdownMenuItem,
  t as Avatar,
  u as DropdownMenuTrigger,
} from './avatar-BjDF5_cL.js'
import { t as LayoutDashboard } from './layout-dashboard-3ayNq25P.js'
import {
  a as SidebarMenu,
  c as SidebarProvider,
  i as SidebarInset,
  l as SidebarTrigger,
  n as SidebarContent,
  o as SidebarMenuButton,
  r as SidebarHeader,
  s as SidebarMenuItem,
  t as Sidebar,
} from './sidebar-CRTC7rf6.js'
var Book = createLucideIcon('book', [
  [
    'path',
    {
      d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20',
      key: 'k3hazp',
    },
  ],
])
var Target = createLucideIcon('target', [
  [
    'circle',
    {
      cx: '12',
      cy: '12',
      r: '10',
      key: '1mglay',
    },
  ],
  [
    'circle',
    {
      cx: '12',
      cy: '12',
      r: '6',
      key: '1vlfrh',
    },
  ],
  [
    'circle',
    {
      cx: '12',
      cy: '12',
      r: '2',
      key: '1c9p78',
    },
  ],
])
var TrendingUp = createLucideIcon('trending-up', [
  [
    'path',
    {
      d: 'M16 7h6v6',
      key: 'box55l',
    },
  ],
  [
    'path',
    {
      d: 'm22 7-8.5 8.5-5-5L2 17',
      key: '1t1m79',
    },
  ],
])
//#endregion
//#region src/layouts/ClientLayout.tsx
var import_jsx_runtime = require_jsx_runtime()
function ClientLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const navItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/client',
    },
    {
      title: 'Meu Diário',
      icon: Book,
      path: '/client/diary',
    },
    {
      title: 'Produtividade',
      icon: Target,
      path: '/client/productivity',
    },
    {
      title: 'Meu Progresso',
      icon: TrendingUp,
      path: '/client/progress',
    },
  ]
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    'data-uid': 'src/layouts/ClientLayout.tsx:52:5',
    'data-prohibitions': '[editContent]',
    className: 'theme-client w-full bg-background font-sans',
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarProvider, {
      'data-uid': 'src/layouts/ClientLayout.tsx:53:7',
      'data-prohibitions': '[editContent]',
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sidebar, {
          'data-uid': 'src/layouts/ClientLayout.tsx:54:9',
          'data-prohibitions': '[editContent]',
          variant: 'inset',
          className: 'border-r-0',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarHeader, {
              'data-uid': 'src/layouts/ClientLayout.tsx:55:11',
              'data-prohibitions': '[]',
              className: 'py-6 px-6',
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                'data-uid': 'src/layouts/ClientLayout.tsx:56:13',
                'data-prohibitions': '[]',
                className: 'flex items-center gap-2 font-bold text-2xl text-primary',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
                    'data-uid': 'src/layouts/ClientLayout.tsx:57:15',
                    'data-prohibitions': '[editContent]',
                    className: 'h-6 w-6',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                    'data-uid': 'src/layouts/ClientLayout.tsx:58:15',
                    'data-prohibitions': '[]',
                    children: 'Taoli',
                  }),
                ],
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContent, {
              'data-uid': 'src/layouts/ClientLayout.tsx:61:11',
              'data-prohibitions': '[editContent]',
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, {
                'data-uid': 'src/layouts/ClientLayout.tsx:62:13',
                'data-prohibitions': '[editContent]',
                className: 'px-4 gap-2',
                children: navItems.map((item) =>
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    SidebarMenuItem,
                    {
                      'data-uid': 'src/layouts/ClientLayout.tsx:64:17',
                      'data-prohibitions': '[editContent]',
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuButton, {
                        'data-uid': 'src/layouts/ClientLayout.tsx:65:19',
                        'data-prohibitions': '[editContent]',
                        asChild: true,
                        isActive: location.pathname === item.path,
                        tooltip: item.title,
                        className: 'rounded-lg h-11 transition-all duration-200',
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                          'data-uid': 'src/layouts/ClientLayout.tsx:71:21',
                          'data-prohibitions': '[editContent]',
                          to: item.path,
                          className: 'flex items-center gap-3',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
                              'data-uid': 'src/layouts/ClientLayout.tsx:72:23',
                              'data-prohibitions': '[editContent]',
                              className: 'h-5 w-5',
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                              'data-uid': 'src/layouts/ClientLayout.tsx:73:23',
                              'data-prohibitions': '[editContent]',
                              className: 'text-sm font-medium',
                              children: item.title,
                            }),
                          ],
                        }),
                      }),
                    },
                    item.path,
                  ),
                ),
              }),
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarInset, {
          'data-uid': 'src/layouts/ClientLayout.tsx:81:9',
          'data-prohibitions': '[editContent]',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('header', {
              'data-uid': 'src/layouts/ClientLayout.tsx:82:11',
              'data-prohibitions': '[editContent]',
              className:
                'flex h-16 shrink-0 items-center justify-between border-b bg-background px-4 md:px-6 sticky top-0 z-10',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/layouts/ClientLayout.tsx:83:13',
                  'data-prohibitions': '[]',
                  className: 'flex items-center gap-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarTrigger, {
                      'data-uid': 'src/layouts/ClientLayout.tsx:84:15',
                      'data-prohibitions': '[editContent]',
                      className: '-ml-2',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h1', {
                      'data-uid': 'src/layouts/ClientLayout.tsx:85:15',
                      'data-prohibitions': '[]',
                      className: 'text-lg font-semibold tracking-tight hidden md:block',
                      children: 'Área do Cliente',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/layouts/ClientLayout.tsx:89:15',
                      'data-prohibitions': '[]',
                      className: 'flex items-center gap-2 font-bold text-lg text-primary md:hidden',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
                          'data-uid': 'src/layouts/ClientLayout.tsx:90:17',
                          'data-prohibitions': '[editContent]',
                          className: 'h-5 w-5',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                          'data-uid': 'src/layouts/ClientLayout.tsx:91:17',
                          'data-prohibitions': '[]',
                          children: 'Taoli',
                        }),
                      ],
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                  'data-uid': 'src/layouts/ClientLayout.tsx:95:13',
                  'data-prohibitions': '[editContent]',
                  className: 'flex items-center gap-4',
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, {
                    'data-uid': 'src/layouts/ClientLayout.tsx:96:15',
                    'data-prohibitions': '[editContent]',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
                        'data-uid': 'src/layouts/ClientLayout.tsx:97:17',
                        'data-prohibitions': '[editContent]',
                        asChild: true,
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                          'data-uid': 'src/layouts/ClientLayout.tsx:98:19',
                          'data-prohibitions': '[editContent]',
                          variant: 'ghost',
                          size: 'icon',
                          className: 'rounded-full',
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
                            'data-uid': 'src/layouts/ClientLayout.tsx:99:21',
                            'data-prohibitions': '[editContent]',
                            className: 'h-8 w-8',
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
                                'data-uid': 'src/layouts/ClientLayout.tsx:100:23',
                                'data-prohibitions': '[editContent]',
                                src: user?.avatarUrl,
                                alt: user?.name,
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
                                'data-uid': 'src/layouts/ClientLayout.tsx:101:23',
                                'data-prohibitions': '[editContent]',
                                children: user?.name?.substring(0, 2).toUpperCase(),
                              }),
                            ],
                          }),
                        }),
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
                        'data-uid': 'src/layouts/ClientLayout.tsx:105:17',
                        'data-prohibitions': '[editContent]',
                        align: 'end',
                        className: 'w-56',
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
                            'data-uid': 'src/layouts/ClientLayout.tsx:106:19',
                            'data-prohibitions': '[editContent]',
                            className: 'font-normal',
                            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                              'data-uid': 'src/layouts/ClientLayout.tsx:107:21',
                              'data-prohibitions': '[editContent]',
                              className: 'flex flex-col space-y-1',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                                  'data-uid': 'src/layouts/ClientLayout.tsx:108:23',
                                  'data-prohibitions': '[editContent]',
                                  className: 'text-sm font-medium leading-none',
                                  children: user?.name,
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                                  'data-uid': 'src/layouts/ClientLayout.tsx:109:23',
                                  'data-prohibitions': '[editContent]',
                                  className: 'text-xs leading-none text-muted-foreground',
                                  children: user?.email,
                                }),
                              ],
                            }),
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {
                            'data-uid': 'src/layouts/ClientLayout.tsx:112:19',
                            'data-prohibitions': '[editContent]',
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
                            'data-uid': 'src/layouts/ClientLayout.tsx:113:19',
                            'data-prohibitions': '[]',
                            className: 'cursor-pointer',
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
                                'data-uid': 'src/layouts/ClientLayout.tsx:114:21',
                                'data-prohibitions': '[editContent]',
                                className: 'mr-2 h-4 w-4',
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                                'data-uid': 'src/layouts/ClientLayout.tsx:115:21',
                                'data-prohibitions': '[]',
                                children: 'Meu Perfil',
                              }),
                            ],
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {
                            'data-uid': 'src/layouts/ClientLayout.tsx:117:19',
                            'data-prohibitions': '[editContent]',
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
                            'data-uid': 'src/layouts/ClientLayout.tsx:118:19',
                            'data-prohibitions': '[]',
                            onClick: handleLogout,
                            className:
                              'text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer',
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
                                'data-uid': 'src/layouts/ClientLayout.tsx:122:21',
                                'data-prohibitions': '[editContent]',
                                className: 'mr-2 h-4 w-4',
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                                'data-uid': 'src/layouts/ClientLayout.tsx:123:21',
                                'data-prohibitions': '[]',
                                children: 'Sair',
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('main', {
              'data-uid': 'src/layouts/ClientLayout.tsx:130:11',
              'data-prohibitions': '[]',
              className: 'flex flex-1 flex-col gap-4 p-4 pt-4 md:p-8',
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {
                'data-uid': 'src/layouts/ClientLayout.tsx:131:13',
                'data-prohibitions': '[editContent]',
              }),
            }),
          ],
        }),
      ],
    }),
  })
}
//#endregion
export { ClientLayout as default }

//# sourceMappingURL=ClientLayout-CXSTAezN.js.map
