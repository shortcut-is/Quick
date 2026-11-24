import React from "react";
import {
  Accordion,
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  BottomNavigation,
  Breadcrumb,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Carousel,
  Checkbox,
  CheckboxGroup,
  Collapsible,
  Combobox,
  CommandPalette,
  DataTable,
  DatePicker,
  Dialog,
  DropdownMenu,
  EmptyState,
  FileUpload,
  InputGroup,
  InputOTP,
  InputSelect,
  InputText,
  Kbd,
  ListItem,
  Notification,
  Pagination,
  ProgressBar,
  RadioGroup,
  SearchFilterBar,
  SegmentControl,
  Separator,
  Sheet,
  SidebarNavigation,
  Skeleton,
  Slider,
  Spinner,
  StatCard,
  Stepper,
  Switch,
  Tabs,
  Tag,
  TagGroup,
  Textarea,
  TimePicker,
  Toast,
  Toggle,
  ToggleGroup,
  Tooltip,
  Topbar,
  type CommandItem,
  type DataTableColumn,
  type SearchFilterChip,
} from "@/components/ui";

type CatalogSection = "all" | "primitives" | "forms" | "data" | "overlays" | "mobile";

interface PaymentRow {
  id: string;
  customer: string;
  plan: string;
  amount: string;
  status: "Pagado" | "Pendiente" | "Rechazado";
}

const SAMPLE_PAYMENTS: PaymentRow[] = [
  { id: "PAY-1042", customer: "Mariana López", plan: "Enterprise", amount: "$4,800.00", status: "Pagado" },
  { id: "PAY-1043", customer: "Carlos Mendoza", plan: "Pro Mensual", amount: "$1,250.00", status: "Pendiente" },
  { id: "PAY-1044", customer: "Sofía Herrera", plan: "Starter", amount: "$390.00", status: "Pagado" },
  { id: "PAY-1045", customer: "Diego Castro", plan: "Pro Mensual", amount: "$1,250.00", status: "Rechazado" },
];

const PAYMENT_COLUMNS: DataTableColumn<PaymentRow>[] = [
  { key: "id", header: "ID", sortable: true, render: (r) => <span className="font-medium tabular-nums">{r.id}</span> },
  { key: "customer", header: "Cliente", render: (r) => r.customer },
  { key: "plan", header: "Plan", render: (r) => r.plan },
  {
    key: "status",
    header: "Estado",
    render: (r) => (
      <Badge
        appearance="Dot"
        tone={r.status === "Pagado" ? "Success" : r.status === "Pendiente" ? "Warning" : "Danger"}
        label={r.status}
      />
    ),
  },
  { key: "amount", header: "Monto", align: "right", sortable: true, render: (r) => r.amount },
];

const MOBILE_SLIDES = [
  { title: "Balance disponible", value: "$48,920.00", tag: "+12.4% este mes", tone: "Success" as const },
  { title: "Ingresos programados", value: "$14,200.00", tag: "4 cobros pendientes", tone: "Info" as const },
  { title: "Alertas de riesgo", value: "1 revisión", tag: "Requiere atención", tone: "Warning" as const },
];

export default function App() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [section, setSection] = React.useState<CatalogSection>("all");
  const [sidebarMode, setSidebarMode] = React.useState<"Expanded" | "Collapsed">("Expanded");
  const [sandboxMode, setSandboxMode] = React.useState(false);

  const [cmdOpen, setCmdOpen] = React.useState(false);
  const [dialogVariant, setDialogVariant] = React.useState<"Default" | "Destructive" | "Form" | null>(null);
  const [sheetPosition, setSheetPosition] = React.useState<"Right (Web)" | "Bottom (Mobile)" | null>(null);
  const [showToast, setShowToast] = React.useState(true);

  const [otpValue, setOtpValue] = React.useState("482");
  const [zoomValue, setZoomValue] = React.useState(100);
  const [sliderValue, setSliderValue] = React.useState(68);
  const [selectedCity, setSelectedCity] = React.useState<string[]>(["cdmx"]);
  const [multiStack, setMultiStack] = React.useState<string[]>(["tokens", "a11y"]);
  const [radioPlan, setRadioPlan] = React.useState("pro");
  const [toggleBold, setToggleBold] = React.useState(false);
  const [viewMode, setViewMode] = React.useState(["grid"]);
  const [segmentView, setSegmentView] = React.useState("overview");
  const [page, setPage] = React.useState(2);
  const [selectedRows, setSelectedRows] = React.useState<string[]>(["PAY-1042"]);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeFilters, setActiveFilters] = React.useState<SearchFilterChip[]>([
    { id: "status-paid", label: "Estado: Pagado" },
    { id: "region-mx", label: "Región: MX" },
  ]);

  const [mobileTab, setMobileTab] = React.useState("home");

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const showBlock = (target: Exclude<CatalogSection, "all">) =>
    section === "all" || section === target;

  const commandItems: CommandItem[] = [
    { id: "nav-all", label: "Ver catálogo completo", group: "Navegación", icon: "Icon/Line / Layout", shortcut: "1", onSelect: () => setSection("all") },
    { id: "nav-forms", label: "Ir a Formularios e Inputs", group: "Navegación", icon: "Icon/Line / Edit", shortcut: "2", onSelect: () => setSection("forms") },
    { id: "nav-mobile", label: "Vista Previa Móvil 390px", group: "Navegación", icon: "Icon/Line / Dashboard", shortcut: "3", onSelect: () => setSection("mobile") },
    { id: "act-theme", label: theme === "light" ? "Activar Dark Mode" : "Activar Light Mode", group: "Acciones", icon: theme === "light" ? "Icon/Line / Moon" : "Icon/Line / Sun", shortcut: "T", onSelect: toggleTheme },
    { id: "act-dialog", label: "Abrir Dialog de Confirmación", group: "Overlays", icon: "Icon/Line / Message-square", onSelect: () => setDialogVariant("Default") },
    { id: "act-sheet", label: "Abrir Sheet Lateral (Web)", group: "Overlays", icon: "Icon/Line / Columns", onSelect: () => setSheetPosition("Right (Web)") },
  ];

  const sectionTabs = [
    { id: "all", label: "Todo", icon: "Icon/Line / Grid" as const, badge: "v1.2" },
    { id: "primitives", label: "Primitivos", icon: "Icon/Line / Zap" as const },
    { id: "forms", label: "Formularios", icon: "Icon/Line / Edit" as const },
    { id: "data", label: "Datos y Feedback", icon: "Icon/Line / Chart" as const },
    { id: "overlays", label: "Overlays y Nav", icon: "Icon/Line / Columns" as const },
    { id: "mobile", label: "Móvil 390px", icon: "Icon/Line / Layout" as const },
  ];

  const filteredPayments = SAMPLE_PAYMENTS.filter((row) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      row.customer.toLowerCase().includes(q) ||
      row.id.toLowerCase().includes(q) ||
      row.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-surface-background text-surface-foreground flex flex-col">
      <Topbar
        variant="DesktopTabs"
        brandName="⚡ Quick - v1.2"
        title="Biblioteca React + Tailwind CSS v4 (100% Tokens Semánticos)"
        tabs={sectionTabs}
        activeTab={section}
        onTabChange={(id) => setSection(id as CatalogSection)}
        onCommandClick={() => setCmdOpen(true)}
        theme={theme}
        onThemeToggle={toggleTheme}
        actions={
          <Button
            variant="Outline"
            size="XS"
            hasLeftIcon
            leftIcon="Icon/Line / Columns"
            onClick={() => setSidebarMode((m) => (m === "Expanded" ? "Collapsed" : "Expanded"))}
            className="hidden lg:inline-flex"
          >
            {sidebarMode === "Expanded" ? "Colapsar sidebar" : "Expandir"}
          </Button>
        }
      />

      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6 flex gap-6 flex-1 items-start">
        <div className="hidden lg:block sticky top-6">
          <SidebarNavigation
            mode={sidebarMode}
            brandName="Quick DS"
            activeId={section}
            onSelect={(id) => setSection(id as CatalogSection)}
            testMode={sandboxMode}
            onTestModeChange={setSandboxMode}
            items={[
              { id: "all", label: "Catálogo completo", icon: "Icon/Line / Grid", badge: "48" },
              { id: "primitives", label: "Primitivos", icon: "Icon/Line / Zap" },
              { id: "forms", label: "Formularios", icon: "Icon/Line / Edit" },
              { id: "data", label: "Datos y Feedback", icon: "Icon/Line / Chart" },
              { id: "overlays", label: "Overlays y Nav", icon: "Icon/Line / Columns" },
            ]}
            workspaceItems={[
              { id: "mobile", label: "Preview Móvil 390px", icon: "Icon/Line / Dashboard" },
            ]}
          />
        </div>

        <main className="flex-1 min-w-0 flex flex-col gap-8 pb-16">
          {/* Hero Summary Banner */}
          <Card variant="Elevated" className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge appearance="Label + Icon" tone="Bold" label="Sistema v1.2" icon="Icon/Line / Zap" />
                  <Badge tone="Outline" label={sandboxMode ? "Sandbox activo" : "Producción"} appearance="Dot" />
                  <Badge tone="Success" label="Zero @radix-ui" />
                </div>
                <h1 className="text-heading-2xl-bold text-surface-foreground">
                  Componentes Reutilizables Quick Design System
                </h1>
                <p className="text-body-sm-normal text-surface-foreground-muted max-w-2xl">
                  Implementación fiel a los contratos JSON y tokens semánticos Light/Dark, usando nativo{" "}
                  <Kbd variant="Subtle" size="SM" hasModifier={false} keyLabel="<dialog>" /> para modales y
                  tipografía accesible ≥ 16px en formularios móviles.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                <Button variant="Outline" size="SM" hasLeftIcon leftIcon="Icon/Line / Command" onClick={() => setCmdOpen(true)}>
                  Abrir ⌘K
                </Button>
                <Button variant="Primary" size="SM" hasLeftIcon leftIcon="Icon/Line / Plus" onClick={() => setDialogVariant("Form")}>
                  Nuevo registro
                </Button>
              </div>
            </div>
          </Card>

          {/* SECTION 1: PRIMITIVES */}
          {showBlock("primitives") && (
            <section className="flex flex-col gap-4" aria-labelledby="sec-primitives">
              <div className="flex items-center justify-between gap-2">
                <h2 id="sec-primitives" className="text-heading-xl-bold text-surface-foreground">
                  1. Primitivos, Acciones y Estado
                </h2>
                <Breadcrumb items={[{ label: "Quick" }, { label: "Componentes" }, { label: "Primitivos" }]} />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Buttons &amp; Jerarquía</CardTitle>
                    <CardDescription>Máximo 1 botón Primary acompañado de Outline o Ghost.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Button variant="Primary" size="MD" hasLeftIcon leftIcon="Icon/Line / Zap">Primary MD</Button>
                      <Button variant="Outline" size="MD">Outline MD</Button>
                      <Button variant="Ghost" size="MD">Ghost MD</Button>
                      <Button variant="Destructive" size="MD" hasLeftIcon leftIcon="Icon/Line / Trash">Destructive</Button>
                    </div>
                    <Separator />
                    <div className="flex flex-wrap items-center gap-2">
                      <Button variant="Primary" size="LG">LG</Button>
                      <Button variant="Outline" size="SM">SM</Button>
                      <Button variant="Ghost" size="XS">XS</Button>
                      <Button variant="Primary" size="SM" contentMode="Icon" icon="Icon/Line / Plus" aria-label="Agregar" />
                      <Button variant="Outline" size="SM" contentMode="Icon" icon="Icon/Line / Settings" aria-label="Configurar" />
                    </div>
                    <Separator />
                    <div className="flex flex-wrap items-center gap-3">
                      <ButtonGroup use="SplitAction" primaryLabel="Publicar" onPrimaryClick={() => setShowToast(true)} />
                      <ButtonGroup
                        use="StepperCounter"
                        value={zoomValue}
                        onStepChange={setZoomValue}
                      />
                      <ButtonGroup use="SegmentedActions" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Badges, Tags, Avatars &amp; Feedback</CardTitle>
                    <CardDescription>Indicadores de estado semántico, avatares y barras de progreso.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone="Bold" label="Bold" />
                      <Badge tone="Subtle" label="Subtle" />
                      <Badge tone="Outline" label="Outline" />
                      <Badge appearance="Dot" tone="Info" label="Info" />
                      <Badge appearance="Dot" tone="Success" label="Activo" />
                      <Badge appearance="Dot" tone="Warning" label="Pendiente" />
                      <Badge appearance="Label + Icon" tone="Danger" label="Error" icon="Icon/Line / Alert-Triangle" />
                    </div>

                    <TagGroup>
                      <Tag label="Design Tokens" />
                      <Tag label="Auto Layout" isDismissible />
                      <Tag label="Bloqueado" state="Disabled" />
                    </TagGroup>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar size="40" initials="SV" />
                        <Avatar size="32" type="Letter" initials="Q" />
                        <AvatarGroup
                          avatars={[
                            { id: "1", alt: "Ana", initials: "AL" },
                            { id: "2", alt: "Luis", initials: "LM" },
                            { id: "3", alt: "Sofía", initials: "SR" },
                            { id: "4", alt: "Carlos", initials: "CM" },
                            { id: "5", alt: "Extra", initials: "EX" },
                          ]}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Toggle variant="Outline" pressed={toggleBold} onPressedChange={setToggleBold} icon="Icon/Line / Bookmark" label="Favorito" />
                        <ToggleGroup
                          selection="Single"
                          value={viewMode}
                          onValueChange={setViewMode}
                          items={[
                            { value: "grid", label: "Grid", icon: "Icon/Line / Grid" },
                            { value: "list", label: "Lista", icon: "Icon/Line / List" },
                          ]}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <ProgressBar variant="Default" value={sliderValue} label="Avance del sistema" />
                      <ProgressBar variant="Success" size="LG" value={100} label="Tokens sincronizados" />
                    </div>

                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <Spinner size="SM" label="Sincronizando contratos..." />
                      <div className="flex items-center gap-1.5">
                        <Kbd variant="Outline" modifierKey="⌘" keyLabel="K" />
                        <Kbd variant="Solid" hasModifier={false} keyLabel="ESC" />
                      </div>
                    </div>
                    <Skeleton shape="AvatarRow" />
                  </CardContent>
                </Card>
              </div>
            </section>
          )}

          {/* SECTION 2: FORMS */}
          {showBlock("forms") && (
            <section className="flex flex-col gap-4" aria-labelledby="sec-forms">
              <h2 id="sec-forms" className="text-heading-xl-bold text-surface-foreground">
                2. Formularios, Fechas y Selección
              </h2>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Inputs, Grupos &amp; Verificación OTP</CardTitle>
                    <CardDescription>Anillo focus unificado (`2px + shadow-focus`) y fuente ≥ 16px en inputs móviles.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <InputText
                        label="Nombre del proyecto"
                        placeholder="Ej. Quick Checkout"
                        hint="Visible para tu equipo."
                      />
                      <InputText
                        label="Correo de soporte"
                        state="Error"
                        defaultValue="correo-invalido"
                        hint="Ingresa un correo válido."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <InputGroup
                        use="Prefix"
                        hasAddonIcon
                        addonText="https://"
                        label="Dominio personalizado"
                        defaultValue="app.quick.ds"
                      />
                      <InputGroup
                        use="Password"
                        label="Clave API"
                        defaultValue="qk_live_94a01x"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <InputSelect
                        label="Moneda base"
                        options={[
                          { value: "mxn", label: "MXN — Peso Mexicano" },
                          { value: "usd", label: "USD — Dólar" },
                          { value: "eur", label: "EUR — Euro" },
                        ]}
                      />
                      <Combobox
                        mode="Single"
                        label="Ciudad principal"
                        options={[
                          { value: "cdmx", label: "Ciudad de México" },
                          { value: "gdl", label: "Guadalajara" },
                          { value: "mty", label: "Monterrey" },
                        ]}
                        value={selectedCity}
                        onValueChange={setSelectedCity}
                      />
                    </div>

                    <Combobox
                      mode="Multi"
                      label="Capacidades habilitadas"
                      options={[
                        { value: "tokens", label: "Semantic Tokens" },
                        { value: "a11y", label: "WAI-ARIA" },
                        { value: "mobile", label: "Mobile Touch" },
                        { value: "dark", label: "Dark Mode" },
                      ]}
                      value={multiStack}
                      onValueChange={setMultiStack}
                    />

                    <InputOTP
                      digits="6"
                      value={otpValue}
                      onChange={setOtpValue}
                      hint={`Código actual: ${otpValue || "vacío"}`}
                    />

                    <Textarea
                      label="Notas de lanzamiento"
                      placeholder="Describe cambios clave del sprint..."
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Controles Booleanos, Fechas y Archivos</CardTitle>
                    <CardDescription>Checkboxes, radios, switches, slider, pickers y carga drag &amp; drop.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <CheckboxGroup label="Notificaciones">
                        <Checkbox label="Alertas en tiempo real" defaultChecked="Checked" />
                        <Checkbox
                          label="Resumen semanal"
                          hasDescription="Yes"
                          description="Envío cada lunes 9:00 AM"
                        />
                        <Checkbox label="Selección parcial" checked="Indeterminate" />
                      </CheckboxGroup>

                      <RadioGroup
                        label="Plan de facturación"
                        value={radioPlan}
                        onValueChange={setRadioPlan}
                        options={[
                          { value: "starter", label: "Starter", description: "Uso personal" },
                          { value: "pro", label: "Pro", description: "Equipos en crecimiento" },
                        ]}
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                      <Switch size="Small" label="Modo compacto" defaultSelected="On" />
                      <Switch size="Large" label="Sincronización automática" />
                    </div>

                    <Slider
                      label="Nivel de opacidad de superficie"
                      value={sliderValue}
                      onValueChange={setSliderValue}
                      hasTooltip
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <DatePicker variant="Single" label="Fecha de entrega" />
                      <TimePicker format="12h" label="Hora límite" />
                    </div>

                    <div className="flex justify-center sm:justify-start">
                      <Calendar mode="single" />
                    </div>

                    <FileUpload label="Adjuntar especificación" />
                  </CardContent>
                </Card>
              </div>
            </section>
          )}

          {/* SECTION 3: DATA & FEEDBACK */}
          {showBlock("data") && (
            <section className="flex flex-col gap-4" aria-labelledby="sec-data">
              <h2 id="sec-data" className="text-heading-xl-bold text-surface-foreground">
                3. Datos, Tarjetas y Feedback
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard title="Ingresos Netos (MXN)" value="$128,450" delta="+18.2%" icon="Icon/Line / Dollar-Sign" subtitle="vs. mes anterior" />
                <StatCard title="Tasa de Conversión" value="4.85%" delta="+0.6%" deltaTone="Info" icon="Icon/Line / Chart" subtitle="Web + iOS App" />
                <StatCard title="Incidentes Críticos" value="0" delta="Saludable" deltaTone="Success" icon="Icon/Line / Shield" subtitle="Últimos 30 días" />
              </div>

              <SearchFilterBar
                query={searchQuery}
                onQueryChange={setSearchQuery}
                activeFilters={activeFilters}
                onRemoveFilter={(id) => setActiveFilters((prev) => prev.filter((x) => x.id !== id))}
                onClearAll={() => setActiveFilters([])}
                onFilterClick={() => setSheetPosition("Right (Web)")}
              />

              <DataTable
                density="Normal"
                columns={PAYMENT_COLUMNS}
                data={filteredPayments}
                selectedIds={selectedRows}
                onSelectionChange={setSelectedRows}
                onRowAction={() => setSheetPosition("Right (Web)")}
              />

              <div className="flex justify-end">
                <Pagination currentPage={page} totalPages={9} onPageChange={setPage} />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Alert variant="Neutral" hasSecondaryAction onPrimaryAction={() => setShowToast(true)} />
                  <Alert variant="Success" title="Sincronización completa" description="Todos los 71 contratos coinciden con Figma." hasActions={false} />
                  <Notification type="Warning" onAction={() => setDialogVariant("Default")} />
                  {showToast && (
                    <Toast
                      variant="Success"
                      title="Preferencias guardadas"
                      onClose={() => setShowToast(false)}
                      onAction={() => setShowToast(false)}
                    />
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <Accordion
                    defaultOpenIds={["faq-1"]}
                    items={[
                      { id: "faq-1", title: "¿Cómo consumir botones Quick sin librerías externas?", content: "Importa Button desde @/components/ui usando variantes Primary, Outline, Ghost o Destructive." },
                      { id: "faq-2", title: "¿Cómo cambia Light y Dark mode?", content: "Alternando la clase .dark en el elemento raíz html; todas las variables semánticas actualizan automáticamente." },
                    ]}
                  />
                  <Collapsible title="Reglas estrictas de tokens" badgeLabel="2">
                    <p className="text-body-xs-normal text-surface-foreground-muted">
                      Nunca uses colores hexadecimales directos ni primitivos Neutral/* en componentes de producto.
                    </p>
                  </Collapsible>
                  <EmptyState
                    variant="Search"
                    size="SM"
                    title="Sin reportes archivados"
                    description="Cuando archives un corte mensual aparecerá aquí."
                    onPrimaryAction={() => setDialogVariant("Form")}
                  />
                </div>
              </div>

              <Carousel
                layout="WebCards"
                items={MOBILE_SLIDES}
                renderItem={(slide) => (
                  <Card className="p-4 h-full flex flex-col justify-between gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-body-xs-medium text-surface-foreground-muted">{slide.title}</span>
                      <Badge tone={slide.tone} label={slide.tag} />
                    </div>
                    <span className="text-heading-2xl-bold text-surface-foreground tabular-nums">{slide.value}</span>
                  </Card>
                )}
              />
            </section>
          )}

          {/* SECTION 4: OVERLAYS & NAVIGATION */}
          {showBlock("overlays") && (
            <section className="flex flex-col gap-4" aria-labelledby="sec-overlays">
              <h2 id="sec-overlays" className="text-heading-xl-bold text-surface-foreground">
                4. Overlays, Menús y Flujos
              </h2>

              <Card>
                <CardHeader>
                  <CardTitle>Dialogs Nativos (`showModal`), Sheets &amp; Dropdowns</CardTitle>
                  <CardDescription>
                    Modales con foco automático, cierre por Escape / backdrop click y menús con teclado.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Button variant="Primary" size="SM" onClick={() => setDialogVariant("Default")}>
                      Dialog Default
                    </Button>
                    <Button variant="Destructive" size="SM" onClick={() => setDialogVariant("Destructive")}>
                      Dialog Destructivo
                    </Button>
                    <Button variant="Outline" size="SM" onClick={() => setDialogVariant("Form")}>
                      Dialog Formulario
                    </Button>
                    <Button variant="Outline" size="SM" onClick={() => setSheetPosition("Right (Web)")}>
                      Sheet Lateral (Web)
                    </Button>
                    <Button variant="Outline" size="SM" onClick={() => setSheetPosition("Bottom (Mobile)")}>
                      Bottom Sheet (Mobile)
                    </Button>
                    <DropdownMenu
                      variant="Grouped"
                      items={[
                        { id: "edit", groupTitle: "Documento", label: "Editar contrato", icon: "Icon/Line / Edit", shortcut: "E" },
                        { id: "copy", label: "Duplicar", icon: "Icon/Line / Copy", shortcut: "D" },
                        { id: "del", separatorBefore: true, label: "Eliminar archivo", icon: "Icon/Line / Trash", destructive: true },
                      ]}
                    />
                    <Tooltip label="Soporte WAI-ARIA + Keyboard">
                      <Button variant="Ghost" size="SM" contentMode="Icon" icon="Icon/Line / Info" aria-label="Información" />
                    </Tooltip>
                  </div>

                  <Separator />

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <SegmentControl
                      value={segmentView}
                      onValueChange={setSegmentView}
                      items={[
                        { id: "overview", label: "Resumen", icon: "Icon/Line / Dashboard" },
                        { id: "tokens", label: "Tokens", icon: "Icon/Line / Zap" },
                        { id: "audit", label: "Auditoría", icon: "Icon/Line / Shield" },
                      ]}
                    />
                    <Tabs
                      value={segmentView}
                      onValueChange={setSegmentView}
                      items={[
                        { id: "overview", label: "Resumen", icon: "Icon/Line / Dashboard" },
                        { id: "tokens", label: "Tokens", icon: "Icon/Line / Zap", badge: "29" },
                        { id: "audit", label: "Auditoría", icon: "Icon/Line / Shield" },
                      ]}
                    />
                  </div>

                  <Stepper
                    orientation="→ Horizontal"
                    activeStep={1}
                    steps={[
                      { id: "s1", title: "Tokens semánticos", description: "Light y Dark listos" },
                      { id: "s2", title: "Componentes UI", description: "React + Tailwind v4" },
                      { id: "s3", title: "Verificación visual", description: "Web + 390px Móvil" },
                    ]}
                  />
                </CardContent>
                <CardFooter>
                  <Button variant="Outline" size="SM" onClick={() => setSection("mobile")}>
                    Ir a preview móvil
                  </Button>
                  <Button variant="Primary" size="SM" onClick={() => setCmdOpen(true)}>
                    Abrir Command Palette
                  </Button>
                </CardFooter>
              </Card>
            </section>
          )}

          {/* SECTION 5: 390PX MOBILE HOME PREVIEW */}
          {showBlock("mobile") && (
            <section className="flex flex-col gap-4" aria-labelledby="sec-mobile">
              <div className="flex flex-col gap-1">
                <h2 id="sec-mobile" className="text-heading-xl-bold text-surface-foreground">
                  5. Vista Previa Mobile App (390px)
                </h2>
                <p className="text-body-sm-normal text-surface-foreground-muted">
                  Composición móvil nativa con Topbar, Carousel Peek, ListItem táctiles ≥ 44px y Bottom Navigation.
                </p>
              </div>

              <div className="flex justify-center py-2">
                <div className="w-full max-w-[390px] rounded-[28px] border-4 border-surface-border bg-surface-background shadow-xl overflow-hidden flex flex-col">
                  <Topbar
                    variant="MobileAppBar"
                    title="Quick Wallet"
                    theme={theme}
                    onThemeToggle={toggleTheme}
                    actions={
                      <Button
                        variant="Ghost"
                        size="XS"
                        contentMode="Icon"
                        icon="Icon/Line / Bell"
                        aria-label="Notificaciones"
                      />
                    }
                  />

                  <div className="p-4 flex flex-col gap-4 flex-1">
                    <SearchFilterBar
                      viewport="Mobile"
                      query={searchQuery}
                      onQueryChange={setSearchQuery}
                      placeholder="Buscar movimientos..."
                      onFilterClick={() => setSheetPosition("Bottom (Mobile)")}
                    />

                    <Carousel
                      layout="MobilePeek"
                      items={MOBILE_SLIDES}
                      renderItem={(slide) => (
                        <Card className="p-4 flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-body-xs-medium text-surface-foreground-muted">{slide.title}</span>
                            <Badge tone={slide.tone} label={slide.tag} />
                          </div>
                          <span className="text-heading-2xl-bold text-surface-foreground tabular-nums">{slide.value}</span>
                        </Card>
                      )}
                    />

                    <div className="flex items-center justify-between">
                      <h3 className="text-body-sm-bold text-surface-foreground">Actividad reciente</h3>
                      <Button variant="Ghost" size="XS" onClick={() => setSheetPosition("Bottom (Mobile)")}>
                        Filtros
                      </Button>
                    </div>

                    <div className="flex flex-col gap-1">
                      <ListItem
                        title="Pago recibido — Mariana L."
                        subtitle="Transferencia SPEI · Hoy 11:42"
                        avatarInitials="ML"
                        meta="+$4,800"
                        badgeLabel="Pagado"
                        badgeTone="Success"
                        showChevron
                        onClick={() => setDialogVariant("Default")}
                      />
                      <ListItem
                        title="Suscripción Cloud Infra"
                        subtitle="Cargo recurrente · Ayer"
                        leadingIcon="Icon/Line / Credit-card"
                        meta="-$620"
                        showChevron
                        onClick={() => setSheetPosition("Bottom (Mobile)")}
                      />
                    </div>
                  </div>

                  <BottomNavigation
                    activeId={mobileTab}
                    onSelect={setMobileTab}
                    items={[
                      { id: "home", label: "Inicio", icon: "Icon/Line / Dashboard" },
                      { id: "activity", label: "Movimientos", icon: "Icon/Line / List", badge: "2" },
                      { id: "cards", label: "Tarjetas", icon: "Icon/Line / Credit-card" },
                      { id: "profile", label: "Cuenta", icon: "Icon/Line / User" },
                    ]}
                  />
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* GLOBAL OVERLAYS */}
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} items={commandItems} />

      <Dialog
        open={dialogVariant !== null}
        onOpenChange={(isOpen) => !isOpen && setDialogVariant(null)}
        variant={dialogVariant ?? "Default"}
        size={dialogVariant === "Form" ? "MD" : "SM"}
        title={
          dialogVariant === "Destructive"
            ? "¿Eliminar proyecto permanentemente?"
            : dialogVariant === "Form"
              ? "Crear nuevo workspace"
              : "Confirmar sincronización"
        }
        description={
          dialogVariant === "Destructive"
            ? "Esta acción borrará todos los tokens locales y no se puede deshacer."
            : dialogVariant === "Form"
              ? "Configura el identificador del proyecto para web y móvil."
              : "Los cambios se aplicarán inmediatamente al tema Light y Dark."
        }
        onPrimaryAction={() => setShowToast(true)}
      >
        {dialogVariant === "Form" && (
          <div className="flex flex-col gap-3">
            <InputText label="Nombre visible" placeholder="Ej. Quick App MX" />
            <InputGroup use="Prefix" addonText="quick.ds/" label="Ruta" defaultValue="app-mx" />
          </div>
        )}
      </Dialog>

      <Sheet
        open={sheetPosition !== null}
        onOpenChange={(isOpen) => !isOpen && setSheetPosition(null)}
        position={sheetPosition ?? "Right (Web)"}
        variant={sheetPosition === "Bottom (Mobile)" ? "Filter" : "Form"}
        title={sheetPosition === "Bottom (Mobile)" ? "Filtrar movimientos" : "Detalles del registro"}
        description={
          sheetPosition === "Bottom (Mobile)"
            ? "Ajusta los criterios de búsqueda móvil."
            : "Edita atributos sin salir de la tabla principal."
        }
        onConfirm={() => setShowToast(true)}
      >
        <CheckboxGroup label="Estados incluidos">
          <Checkbox label="Pagado" defaultChecked="Checked" />
          <Checkbox label="Pendiente" defaultChecked="Checked" />
          <Checkbox label="Rechazado" />
        </CheckboxGroup>
        <Slider label="Monto máximo" value={sliderValue} onValueChange={setSliderValue} />
      </Sheet>
    </div>
  );
}
