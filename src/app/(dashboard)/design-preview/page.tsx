'use client';

/**
 * /design-preview — Liquid Glass Design System Visual Validation
 *
 * Two themes: Liquid Glass Light · Liquid Glass Dark
 * Three backgrounds: Neutral · Soft · Depth
 * Six combinations: Light+Neutral, Light+Soft, Light+Depth,
 *                   Dark+Neutral, Dark+Soft, Dark+Depth
 *
 * Theme = appearance. NEVER theme = color.
 * Accent used ONLY for semantic purposes.
 * Anti-color-soup: no multiple decorative colors simultaneously.
 *
 * Hierarchy:
 *   L0 Canvas    — page background, no glass
 *   L1 Content   — tables, forms, data (near-solid)
 *   L2 Surface   — sidebar, header, panels (glass)
 *   L3 Overlay   — dialogs, modals, sheets (glass strong)
 *   L4 Floating  — tooltips, popovers, dropdowns (elevated)
 */

import { useCallback, useState } from 'react';
import {
  Bell,
  Bot,
  Check,
  ChevronRight,
  Copy,
  FileText,
  GitBranch,
  Globe,
  Inbox,
  Loader2,
  Mail,
  MessageSquare,
  Moon,
  MoreHorizontal,
  Search,
  Send,
  Settings,
  Sparkles,
  Star,
  Sun,
  TrendingUp,
  Trash2,
  User,
  Users,
  Zap,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

/* ============================================================
 * TYPES
 * ============================================================ */

type Theme = 'light' | 'dark';
type Background = 'neutral' | 'soft' | 'depth';

/* ============================================================
 * HELPER COMPONENTS
 * ============================================================ */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
        {children}
      </h2>
      <div className="h-px flex-1 bg-border/60" />
    </div>
  );
}

function SubTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3
      className={`mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 ${className ?? ''}`}
    >
      {children}
    </h3>
  );
}

/* ============================================================
 * THEME & BACKGROUND SWITCHER
 * ============================================================ */

function PreviewControls({
  theme,
  setTheme,
  background,
  setBackground,
}: {
  theme: Theme;
  setTheme: (t: Theme) => void;
  background: Background;
  setBackground: (b: Background) => void;
}) {
  const themes: { id: Theme; label: string; icon: typeof Sun }[] = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
  ];

  const backgrounds: { id: Background; label: string }[] = [
    { id: 'neutral', label: 'Neutral' },
    { id: 'soft', label: 'Soft' },
    { id: 'depth', label: 'Depth' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Theme Switcher */}
      <div className="space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Theme
        </p>
        <div className="surface-surface inline-flex gap-1 rounded-xl p-1">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`glass-pod flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                theme === t.id
                  ? 'glass-pod-active text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <t.icon className="size-3.5" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Background Switcher */}
      <div className="space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Background
        </p>
        <div className="surface-surface inline-flex gap-1 rounded-xl p-1">
          {backgrounds.map((b) => (
            <button
              key={b.id}
              onClick={() => setBackground(b.id)}
              className={`glass-pod rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                background === b.id
                  ? 'glass-pod-active text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Combination indicator */}
      <div className="ml-auto flex items-center gap-2 rounded-lg border border-border/40 bg-muted/30 px-3 py-1.5">
        <span className="size-2 rounded-full bg-primary/60" />
        <span className="text-xs font-medium text-muted-foreground">
          {theme === 'light' ? 'Liquid Glass Light' : 'Liquid Glass Dark'} +{' '}
          {background === 'neutral' ? 'Neutral' : background === 'soft' ? 'Soft' : 'Depth'}
        </span>
      </div>
    </div>
  );
}

/* ============================================================
 * SECTION A: CANVAS (L0) — Three backgrounds
 * ============================================================ */

function CanvasShowcase() {
  const bgCards: { bg: Background; label: string; desc: string }[] = [
    { bg: 'neutral', label: 'Neutral', desc: 'Balanced, low visual noise, no dominant color' },
    { bg: 'soft', label: 'Soft', desc: 'Subtle ambient atmosphere, gentle gradients' },
    { bg: 'depth', label: 'Depth', desc: 'Spatial depth, subtle light fields' },
  ];

  return (
    <section className="space-y-6">
      <SectionTitle>A. Canvas (L0) — Backgrounds</SectionTitle>
      <p className="text-xs text-muted-foreground/70">
        Three ambient backgrounds. Not color-based — atmospheric variations.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {bgCards.map((item) => (
          <div key={item.bg} className="space-y-2">
            <SubTitle>{item.label}</SubTitle>
            <div className="relative overflow-hidden rounded-2xl border border-border/30 p-6">
              <div
                className="absolute inset-0 opacity-50"
                style={{ background: 'var(--lg-ambient-gradient, none)' }}
              />
              <div className="relative z-10">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
 * SECTION B: SURFACE HIERARCHY (L0-L4)
 * ============================================================ */

function SurfaceHierarchy() {
  return (
    <section className="space-y-6">
      <SectionTitle>B. Surface Hierarchy (L0 → L4)</SectionTitle>
      <p className="text-xs text-muted-foreground/70">
        Each layer has distinct material properties. Hierarchy is immediately perceptible.
      </p>

      <div className="relative rounded-2xl border border-border/20 bg-background p-6">
        {/* Ambient gradient overlay for Soft/Depth */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-40"
          style={{ background: 'var(--lg-ambient-gradient, none)' }}
        />

        <div className="relative z-10 space-y-4">
          {/* L0 — Canvas */}
          <div className="rounded-xl border border-dashed border-border/40 p-4">
            <SubTitle>L0 — Canvas</SubTitle>
            <p className="text-xs text-muted-foreground">
              Page background. No glass, no blur. Foundation layer.
            </p>
          </div>

          {/* L1 — Content */}
          <div className="surface-content rounded-xl p-4">
            <SubTitle>L1 — Content</SubTitle>
            <p className="text-xs text-muted-foreground">
              Near-solid (α=0.88). Tables, forms, data. No blur, maximum legibility.
            </p>
          </div>

          {/* L2 — Surface */}
          <div className="surface-surface rounded-xl p-4">
            <SubTitle>L2 — Surface (Glass)</SubTitle>
            <p className="text-xs text-muted-foreground">
              Clear glass (α=0.55, blur 10px). Sidebar, header, panels. Strong specular + rim.
            </p>
          </div>

          {/* L3 — Overlay */}
          <div className="surface-overlay rounded-2xl p-4">
            <SubTitle>L3 — Overlay</SubTitle>
            <p className="text-xs text-muted-foreground">
              Strong glass (α=0.7, blur 14px). Dialogs, modals, sheets. Deep shadow.
            </p>
          </div>

          {/* L4 — Floating */}
          <div className="surface-floating rounded-xl p-4">
            <SubTitle>L4 — Floating</SubTitle>
            <p className="text-xs text-muted-foreground">
              Light glass (α=0.65, blur 8px). Tooltips, popovers, dropdowns. Elevated.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * SECTION C: NAVIGATION (L2 — Surface Glass)
 * ============================================================ */

function NavigationShowcase() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings', label: 'Settings' },
    { id: 'team', label: 'Team' },
  ];

  const navItems = [
    { icon: MessageSquare, label: 'Inbox', count: 12 },
    { icon: Users, label: 'Contacts', active: true },
    { icon: GitBranch, label: 'Pipelines' },
    { icon: Zap, label: 'Automations' },
    { icon: Bot, label: 'AI Agents' },
  ];

  return (
    <section className="space-y-6">
      <SectionTitle>C. Navigation (L2 — Surface Glass)</SectionTitle>

      {/* Tabs */}
      <SubTitle>Tabs</SubTitle>
      <div className="surface-surface inline-flex gap-0.5 rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`glass-pod rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'glass-pod-active text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sidebar mock */}
      <SubTitle>Sidebar Items</SubTitle>
      <div className="surface-surface max-w-xs rounded-xl p-2">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
              item.active
                ? 'glass-pod-active text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <item.icon className="h-4 w-4" />
            <span className="flex-1">{item.label}</span>
            {item.count && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {item.count}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Breadcrumbs */}
      <SubTitle>Breadcrumbs</SubTitle>
      <nav className="flex items-center gap-1.5 text-sm">
        <span className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
          Dashboard
        </span>
        <ChevronRight className="size-3 text-muted-foreground/50" />
        <span className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
          Contacts
        </span>
        <ChevronRight className="size-3 text-muted-foreground/50" />
        <span className="font-medium text-foreground">John Doe</span>
      </nav>
    </section>
  );
}

/* ============================================================
 * SECTION D: CONTROLS (Buttons, Segments, Toggles, Inputs)
 * ============================================================ */

function ControlsShowcase() {
  const [activePod, setActivePod] = useState('inbox');
  const [toggleOn, setToggleOn] = useState(true);

  const pods = [
    { id: 'inbox', label: 'Inbox', count: 12 },
    { id: 'draft', label: 'Draft', count: 3 },
    { id: 'sent', label: 'Sent', count: 0 },
  ];

  return (
    <section className="space-y-6">
      <SectionTitle>D. Controls</SectionTitle>

      {/* Buttons */}
      <SubTitle>Buttons (with Rim Light)</SubTitle>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="default" className="glass-rim-light">
          <Send className="size-4" />
          Primary
        </Button>
        <Button variant="outline" className="glass-rim-light">
          <FileText className="size-4" />
          Outline
        </Button>
        <Button variant="secondary" className="glass-rim-light">
          <Copy className="size-4" />
          Secondary
        </Button>
        <Button variant="ghost">
          <MoreHorizontal className="size-4" />
          Ghost
        </Button>
        <Button variant="destructive">
          <Trash2 className="size-4" />
          Destructive
        </Button>
      </div>

      {/* Button Sizes */}
      <SubTitle>Sizes</SubTitle>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="xs" className="glass-rim-light">
          <Zap className="size-3" />
          XS
        </Button>
        <Button size="sm" className="glass-rim-light">
          <Zap className="size-3.5" />
          Small
        </Button>
        <Button size="default" className="glass-rim-light">
          <Zap className="size-4" />
          Default
        </Button>
        <Button size="lg" className="glass-rim-light">
          <Zap className="size-4" />
          Large
        </Button>
      </div>

      {/* Segment Control */}
      <SubTitle>Segmented Control (Glass Pods)</SubTitle>
      <div className="surface-surface inline-flex gap-1 rounded-2xl p-1.5">
        {pods.map((pod) => (
          <button
            key={pod.id}
            onClick={() => setActivePod(pod.id)}
            className={`glass-pod relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activePod === pod.id
                ? 'glass-pod-active text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {pod.label}
            {pod.count > 0 && (
              <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary/20 px-1 text-[10px] font-semibold text-primary">
                {pod.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Toggle Switch */}
      <SubTitle>Toggle Switch</SubTitle>
      <div className="surface-surface inline-flex items-center gap-3 rounded-full px-4 py-2">
        <button
          onClick={() => setToggleOn(!toggleOn)}
          className={`glass-pod relative h-6 w-11 rounded-full transition-all duration-200 ${
            toggleOn ? 'glass-pod-active bg-primary/30' : 'bg-muted/50'
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full transition-all duration-200 ${
              toggleOn
                ? 'left-[22px] bg-primary shadow-[0_0_8px_oklch(from_var(--primary)_l_c_h_/_0.3)]'
                : 'left-0.5 bg-muted-foreground/60'
            }`}
          />
        </button>
        <span className="text-sm text-foreground">Enable notifications</span>
      </div>

      {/* Inputs */}
      <SubTitle>Inputs</SubTitle>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Text Input</label>
          <Input placeholder="Type something..." />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">With Icon</label>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9" />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Disabled</label>
          <Input placeholder="Disabled input" disabled />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * SECTION E: CONTENT (L1 — Near-Solid Data)
 * ============================================================ */

function ContentShowcase() {
  const kpis = [
    { label: 'Total Revenue', value: 'R$ 45.230', change: '+12.5%', positive: true },
    { label: 'Active Contacts', value: '1.247', change: '+89 this week', positive: true },
    { label: 'Conversion Rate', value: '8.4%', change: 'vs 7.2% last month', positive: true },
  ];

  const rows = [
    { name: 'Maria Silva', email: 'maria@example.com', role: 'Admin', status: 'Active' },
    { name: 'João Santos', email: 'joao@example.com', role: 'Agent', status: 'Active' },
    { name: 'Ana Costa', email: 'ana@example.com', role: 'Viewer', status: 'Pending' },
  ];

  return (
    <section className="space-y-6">
      <SectionTitle>E. Content (L1 — Near-Solid Data)</SectionTitle>
      <p className="text-xs text-muted-foreground/70">
        Content layer elements stay near-solid for legibility. No glass-on-glass.
      </p>

      {/* KPIs */}
      <SubTitle>KPI Cards</SubTitle>
      <div className="grid gap-3 sm:grid-cols-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="surface-content glass-hover rounded-xl p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {kpi.label}
            </p>
            <p className="mt-1 text-2xl font-bold text-foreground">{kpi.value}</p>
            <p className={`mt-1 flex items-center gap-1 text-xs ${kpi.positive ? 'text-primary' : 'text-destructive'}`}>
              <TrendingUp className="size-3" />
              {kpi.change}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <SubTitle>Table</SubTitle>
      <div className="surface-content glass-hover max-w-2xl overflow-hidden rounded-2xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {rows.map((row) => (
              <tr key={row.name} className="transition-colors hover:bg-muted/20">
                <td className="px-4 py-3 font-medium text-foreground">{row.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.email}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline">{row.role}</Badge>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium ${
                      row.status === 'Active' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        row.status === 'Active' ? 'bg-primary' : 'bg-muted-foreground'
                      }`}
                    />
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Activity Feed */}
      <SubTitle>Activity Feed</SubTitle>
      <div className="surface-content max-w-lg rounded-2xl p-4">
        <div className="space-y-3">
          {[
            { icon: MessageSquare, text: 'New message from Maria Silva', time: '2m ago' },
            { icon: User, text: 'Contact created: João Santos', time: '15m ago' },
            { icon: Send, text: 'Campaign sent to 1,247 contacts', time: '1h ago' },
            { icon: Bot, text: 'AI agent drafted 3 responses', time: '2h ago' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-0.5 rounded-lg bg-primary/10 p-1.5 text-primary">
                <item.icon className="size-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground">{item.text}</p>
                <p className="text-[11px] text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * SECTION F: FLOATING UI (L3-L4)
 * ============================================================ */

function FloatingUIShowcase() {
  return (
    <section className="space-y-6">
      <SectionTitle>F. Floating UI (L3 Overlay · L4 Floating)</SectionTitle>

      <div className="flex flex-wrap items-start gap-4">
        {/* Dropdown */}
        <div className="space-y-2">
          <SubTitle>Dropdown Menu</SubTitle>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" className="glass-rim-light" />}>
              <Settings className="size-4" />
              Actions
              <ChevronRight className="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem>
                <User className="size-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="size-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Popover */}
        <div className="space-y-2">
          <SubTitle>Popover</SubTitle>
          <Popover>
            <PopoverTrigger render={<Button variant="outline" className="glass-rim-light" />}>
              <Bell className="size-4" />
              Notifications
            </PopoverTrigger>
            <PopoverContent className="w-72 p-0">
              <div className="border-b border-border/60 px-4 py-3">
                <p className="text-sm font-semibold text-foreground">Notifications</p>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {[
                  { icon: MessageSquare, text: 'New message from John', time: '2m ago' },
                  { icon: User, text: 'Contact created', time: '15m ago' },
                  { icon: Bell, text: 'Campaign sent successfully', time: '1h ago' },
                ].map((n, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/30">
                    <div className="mt-0.5 rounded-lg bg-primary/10 p-1.5 text-primary">
                      <n.icon className="size-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-foreground">{n.text}</p>
                      <p className="text-[11px] text-muted-foreground">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Dialog */}
        <div className="space-y-2">
          <SubTitle>Dialog (Overlay)</SubTitle>
          <Dialog>
            <DialogTrigger render={<Button className="glass-rim-light" />}>
              <Mail className="size-4" />
              Open Dialog
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation link to add a new member to your workspace.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <Input placeholder="email@company.com" />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Role:</span>
                  <Badge variant="secondary">Agent</Badge>
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
                <Button size="sm" className="glass-rim-light">
                  <Send className="size-3.5" />
                  Send Invite
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * SECTION G: STATES (Hover, Active, Selected, Focus, Disabled)
 * ============================================================ */

function StatesShowcase() {
  return (
    <section className="space-y-6">
      <SectionTitle>G. States & Feedback</SectionTitle>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Default */}
        <div className="surface-content rounded-2xl p-4">
          <p className="text-sm font-medium text-foreground">Default</p>
          <p className="text-xs text-muted-foreground">Resting state, no interaction</p>
        </div>

        {/* Hover */}
        <div className="glass-hover surface-content cursor-pointer rounded-2xl p-4">
          <p className="text-sm font-medium text-foreground">Hover</p>
          <p className="text-xs text-muted-foreground">Luminosity shift + border change. No translate.</p>
        </div>

        {/* Active/Pressed */}
        <div className="glass-active surface-content cursor-pointer rounded-2xl p-4">
          <p className="text-sm font-medium text-foreground">Active (Pressed)</p>
          <p className="text-xs text-muted-foreground">Concave feel, inset shadow deeper</p>
        </div>

        {/* Selected */}
        <div className="glass-glow-primary surface-content rounded-2xl p-4">
          <p className="text-sm font-medium text-foreground">Selected / Active</p>
          <p className="text-xs text-muted-foreground">Primary glow indicates selection</p>
        </div>

        {/* Success */}
        <div className="surface-content rounded-2xl border-l-4 border-l-primary p-4">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-1.5 text-primary">
              <Check className="size-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Success</p>
              <p className="text-xs text-muted-foreground">Campaign sent to 1,247 contacts</p>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="surface-content rounded-2xl border-l-4 border-l-amber-500 p-4">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-amber-500/10 p-1.5 text-amber-500">
              <Bell className="size-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Warning</p>
              <p className="text-xs text-muted-foreground">Template awaiting approval</p>
            </div>
          </div>
        </div>

        {/* Error */}
        <div className="surface-content rounded-2xl border-l-4 border-l-destructive p-4">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-destructive/10 p-1.5 text-destructive">
              <X className="size-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Error</p>
              <p className="text-xs text-muted-foreground">Failed to connect to API</p>
            </div>
          </div>
        </div>

        {/* Loading */}
        <div className="surface-content rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Loader2 className="size-5 animate-spin text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Loading</p>
              <p className="text-xs text-muted-foreground">Syncing conversations...</p>
            </div>
          </div>
        </div>

        {/* Disabled */}
        <div className="surface-content rounded-2xl p-4 opacity-50">
          <p className="text-sm font-medium text-foreground">Disabled</p>
          <p className="text-xs text-muted-foreground">Reduced opacity, no interaction</p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * SECTION H: MATERIAL & LIGHTING
 * ============================================================ */

function MaterialLighting() {
  return (
    <section className="space-y-6">
      <SectionTitle>H. Material & Lighting</SectionTitle>
      <p className="text-xs text-muted-foreground/70">
        Specular highlights, rim light, depth, shadows, translucency — the signature of Liquid Glass.
      </p>

      {/* Specular Highlights */}
      <SubTitle>Specular Highlights</SubTitle>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <SubTitle>Top Edge (α=0.25)</SubTitle>
          <div
            className="rounded-xl border border-border/40 bg-card/80 p-4"
            style={{ boxShadow: 'var(--specular-top)' }}
          >
            <p className="text-sm text-foreground">Highlight</p>
            <p className="text-xs text-muted-foreground">Bright top edge line</p>
          </div>
        </div>
        <div className="space-y-2">
          <SubTitle>Top Strong (α=0.35)</SubTitle>
          <div
            className="rounded-xl border border-border/40 bg-card/80 p-4"
            style={{ boxShadow: 'var(--specular-top-strong)' }}
          >
            <p className="text-sm text-foreground">Strong</p>
            <p className="text-xs text-muted-foreground">Buttons, active states</p>
          </div>
        </div>
        <div className="space-y-2">
          <SubTitle>Rim (top + bottom)</SubTitle>
          <div
            className="rounded-xl border border-border/40 bg-card/80 p-4"
            style={{ boxShadow: 'var(--specular-rim)' }}
          >
            <p className="text-sm text-foreground">Rim Light</p>
            <p className="text-xs text-muted-foreground">Top α=0.3 + Bottom α=0.1</p>
          </div>
        </div>
        <div className="space-y-2">
          <SubTitle>Inner (sculptural)</SubTitle>
          <div
            className="rounded-xl border border-border/40 bg-card/80 p-4"
            style={{ boxShadow: 'var(--specular-inner)' }}
          >
            <p className="text-sm text-foreground">Inner Shadow</p>
            <p className="text-xs text-muted-foreground">Top + depth + bottom rim</p>
          </div>
        </div>
      </div>

      {/* Shadow Escalation */}
      <SubTitle>Shadow Escalation (5 Levels)</SubTitle>
      <div className="flex flex-wrap gap-4">
        {[
          { name: 'none', token: 'none', desc: 'Canvas, Content' },
          { name: 'sm', token: 'var(--shadow-sm)', desc: 'Cards at rest' },
          { name: 'md', token: 'var(--shadow-md)', desc: 'Cards on hover' },
          { name: 'lg', token: 'var(--shadow-lg)', desc: 'Overlay' },
          { name: 'xl', token: 'var(--shadow-xl)', desc: 'Floating' },
        ].map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-2 rounded-xl bg-card/50 p-4">
            <div
              className="flex h-16 w-24 items-center justify-center rounded-lg bg-card text-xs font-medium text-foreground"
              style={{ boxShadow: s.token }}
            >
              {s.name}
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-foreground">{s.name}</p>
              <p className="text-[10px] text-muted-foreground">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Rim Light on Buttons */}
      <SubTitle>Rim Light (Buttons)</SubTitle>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="icon" className="glass-rim-light rounded-full">
          <Globe className="size-4" />
        </Button>
        <Button size="icon-lg" className="glass-rim-light rounded-full">
          <Star className="size-5" />
        </Button>
        <Button size="icon" variant="outline" className="glass-rim-light rounded-full">
          <Inbox className="size-4" />
        </Button>
        <Button size="icon-sm" className="glass-rim-light rounded-full">
          <Zap className="size-3.5" />
        </Button>
      </div>

      {/* Primary Glow + AO */}
      <SubTitle>Accent Glow & Depth</SubTitle>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass-glow-primary rounded-xl border border-primary/10 bg-card/80 p-4">
          <p className="text-sm text-foreground">Primary Glow</p>
          <p className="text-xs text-muted-foreground">Accent luminosity ring</p>
        </div>
        <div className="glass-ao rounded-xl border border-border/40 bg-card/80 p-4">
          <p className="text-sm text-foreground">Ambient Occlusion</p>
          <p className="text-xs text-muted-foreground">Bottom edge depth</p>
        </div>
        <div className="glass-highlight-edge glass-ao glass-glow-primary rounded-xl border border-primary/10 bg-card/80 p-4">
          <p className="text-sm text-foreground">Full Treatment</p>
          <p className="text-xs text-muted-foreground">Top + bottom + accent glow</p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * TOKEN REFERENCE TABLE
 * ============================================================ */

function TokenSummary() {
  const layers = [
    { name: 'Content', bg: '0.88', blur: '0', border: '0.5', highlight: '0.15' },
    { name: 'Surface', bg: '0.55', blur: '10px', border: '0.35', highlight: '0.25' },
    { name: 'Overlay', bg: '0.7', blur: '14px', border: '0.25', highlight: '0.3' },
    { name: 'Floating', bg: '0.65', blur: '8px', border: '0.3', highlight: '0.25' },
  ];

  return (
    <section className="space-y-6">
      <SectionTitle>Token Reference</SectionTitle>
      <div className="surface-content overflow-hidden rounded-2xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30">
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Layer
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                BG α
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Blur
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Border α
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Highlight α
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {layers.map((l) => (
              <tr key={l.name} className="transition-colors hover:bg-muted/20">
                <td className="px-4 py-2.5 font-medium text-foreground">{l.name}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{l.bg}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{l.blur}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{l.border}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{l.highlight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ============================================================
 * COMBINATIONS SHOWCASE
 * ============================================================ */

function CombinationsShowcase() {
  const combos: { theme: Theme; bg: Background; label: string }[] = [
    { theme: 'light', bg: 'neutral', label: 'Light + Neutral' },
    { theme: 'light', bg: 'soft', label: 'Light + Soft' },
    { theme: 'light', bg: 'depth', label: 'Light + Depth' },
    { theme: 'dark', bg: 'neutral', label: 'Dark + Neutral' },
    { theme: 'dark', bg: 'soft', label: 'Dark + Soft' },
    { theme: 'dark', bg: 'depth', label: 'Dark + Depth' },
  ];

  return (
    <section className="space-y-6">
      <SectionTitle>6 Valid Combinations</SectionTitle>
      <p className="text-xs text-muted-foreground/70">
        Two themes × three backgrounds = six valid combinations. Use the controls above to switch.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {combos.map((combo) => (
          <div key={`${combo.theme}-${combo.bg}`} className="surface-content glass-hover rounded-xl p-4">
            <p className="text-sm font-medium text-foreground">{combo.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {combo.theme === 'light' ? 'High luminosity, moderate transparency' : 'Low luminosity, calibrated transparency'}{' '}
              · {combo.bg === 'neutral' ? 'No ambient' : combo.bg === 'soft' ? 'Subtle atmosphere' : 'Deep spatial'}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
 * BADGES
 * ============================================================ */

function BadgesShowcase() {
  return (
    <section className="space-y-6">
      <SectionTitle>Badges (Semantic Accent Only)</SectionTitle>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="default">
          <Sparkles className="size-3" />
          Default
        </Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Error</Badge>
        <Badge variant="outline">
          <Globe className="size-3" />
          Outline
        </Badge>
        <Badge variant="ghost">Ghost</Badge>
      </div>

      <SubTitle>Status Badges</SubTitle>
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
          <span className="size-1.5 rounded-full bg-primary" />
          Active
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-500">
          <span className="size-1.5 rounded-full bg-amber-500" />
          Pending
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-destructive/40 bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-destructive">
          <span className="size-1.5 rounded-full bg-destructive" />
          Revoked
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span className="size-1.5 rounded-full bg-muted-foreground" />
          Offline
        </span>
      </div>
    </section>
  );
}

/* ============================================================
 * RADIUS SCALE
 * ============================================================ */

function RadiusScale() {
  return (
    <section className="space-y-6">
      <SectionTitle>Radius Scale</SectionTitle>
      <div className="flex flex-wrap items-end gap-4">
        {[
          { name: 'sm (6px)', r: 'rounded-sm' },
          { name: 'md (8px)', r: 'rounded-md' },
          { name: 'lg (10px)', r: 'rounded-lg' },
          { name: 'xl (14px)', r: 'rounded-xl' },
          { name: '2xl (18px)', r: 'rounded-2xl' },
          { name: '3xl (22px)', r: 'rounded-3xl' },
          { name: 'full', r: 'rounded-full' },
        ].map((item) => (
          <div key={item.name} className="flex flex-col items-center gap-2">
            <div className={`size-12 bg-primary/20 ${item.r}`} />
            <p className="text-[10px] text-muted-foreground">{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
 * ANIMATIONS
 * ============================================================ */

function AnimationsShowcase() {
  return (
    <section className="space-y-6">
      <SectionTitle>Animations & Motion</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <SubTitle>Fade In</SubTitle>
          <div className="animate-fade-in surface-content rounded-xl p-4 text-center text-sm text-foreground">
            Fade In (0.2s)
          </div>
        </div>
        <div className="space-y-2">
          <SubTitle>Slide Up</SubTitle>
          <div className="animate-slide-up surface-content rounded-xl p-4 text-center text-sm text-foreground">
            Slide Up (0.3s)
          </div>
        </div>
        <div className="space-y-2">
          <SubTitle>Glow Pulse</SubTitle>
          <div className="animate-glow-pulse surface-content rounded-xl p-4 text-center text-sm text-foreground">
            Glow Pulse
          </div>
        </div>
        <div className="space-y-2">
          <SubTitle>Shimmer</SubTitle>
          <div className="animate-shimmer h-10 rounded-xl" />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * MAIN PAGE
 * ============================================================ */

export default function DesignPreviewPage() {
  const [theme, setTheme] = useState<Theme>('light');
  const [background, setBackground] = useState<Background>('neutral');

  const handleThemeChange = useCallback((next: Theme) => {
    setTheme(next);
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.mode = next;
    }
  }, []);

  const handleBackgroundChange = useCallback((next: Background) => {
    setBackground(next);
    if (typeof document !== 'undefined') {
      if (next === 'neutral') {
        delete document.documentElement.dataset.background;
      } else {
        document.documentElement.dataset.background = next;
      }
    }
  }, []);

  return (
    <div className="mx-auto max-w-4xl space-y-12 pb-16">
      {/* Controls */}
      <PreviewControls
        theme={theme}
        setTheme={handleThemeChange}
        background={background}
        setBackground={handleBackgroundChange}
      />

      <Separator />

      {/* A. Canvas */}
      <CanvasShowcase />
      <Separator />

      {/* B. Surface Hierarchy */}
      <SurfaceHierarchy />
      <Separator />

      {/* C. Navigation */}
      <NavigationShowcase />
      <Separator />

      {/* D. Controls */}
      <ControlsShowcase />
      <Separator />

      {/* E. Content */}
      <ContentShowcase />
      <Separator />

      {/* F. Floating UI */}
      <FloatingUIShowcase />
      <Separator />

      {/* G. States */}
      <StatesShowcase />
      <Separator />

      {/* H. Material & Lighting */}
      <MaterialLighting />
      <Separator />

      {/* Combinations */}
      <CombinationsShowcase />
      <Separator />

      {/* Badges */}
      <BadgesShowcase />
      <Separator />

      {/* Token Summary */}
      <TokenSummary />
      <Separator />

      {/* Radius */}
      <RadiusScale />
      <Separator />

      {/* Animations */}
      <AnimationsShowcase />
    </div>
  );
}
