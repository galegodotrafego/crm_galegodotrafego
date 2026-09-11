import { BarChart3 } from 'lucide-react'
import type { ComponentType } from 'react'
import { cn } from '@/lib/utils'

import { useTranslations } from 'next-intl'

/**
 * Shared empty-state panel for charts that can't render meaningfully
 * without a minimum amount of data. Kept minimal and uniform so the
 * three empty states on the dashboard don't each feel like a
 * different widget.
 */
export function EmptyState({
  title,
  hint,
  icon: Icon = BarChart3,
  className,
}: {
  title?: string
  hint?: string
  icon?: ComponentType<{ className?: string }>
  className?: string
}) {
  const t = useTranslations('Dashboard.emptyState')
  const defaultTitle = t('title')
  
  return (
    <div
      className={cn(
        'flex h-full min-h-40 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border/40 bg-muted/10 px-4 py-6 text-center',
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-sm font-semibold text-foreground">{title || defaultTitle}</p>
      {hint && <p className="max-w-xs text-xs text-muted-foreground/70">{hint}</p>}
    </div>
  )
}
