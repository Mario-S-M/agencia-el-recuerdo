"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { ChevronDownIcon, Search, X } from "lucide-react"

interface Option {
  value: string
  label: string
}

interface SearchableSelectProps {
  options: Option[]
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
  disabled?: boolean
}

export function SearchableSelect({
  options,
  value,
  onValueChange,
  placeholder = "Seleccionar...",
  searchPlaceholder = "Buscar...",
  emptyMessage = "Sin resultados",
  className,
  disabled,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const filtered = React.useMemo(() => {
    if (!search) return options
    const q = search.toLowerCase()
    return options.filter((o) => o.label.toLowerCase().includes(q))
  }, [options, search])

  const selectedLabel = options.find((o) => o.value === value)?.label

  function handleOpenChange(open: boolean) {
    setOpen(open)
    if (open) {
      setSearch("")
    }
  }

  return (
    <SelectPrimitive.Root open={open} onOpenChange={handleOpenChange} value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectPrimitive.Trigger
        data-slot="select-trigger"
        className={cn(
          "flex h-9 w-full items-center justify-between gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm whitespace-nowrap shadow-xs outline-none transition-colors placeholder:text-white/30 focus:border-orange-500/50 focus:ring-3 focus:ring-orange-500/50 disabled:cursor-not-allowed disabled:opacity-50 text-white/60",
          className,
        )}
      >
        <SelectPrimitive.Value data-slot="select-value" placeholder={placeholder}>
          {selectedLabel && <span className="text-white">{selectedLabel}</span>}
        </SelectPrimitive.Value>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          data-slot="select-content"
          className="relative z-50 max-h-80 min-w-[8rem] overflow-hidden rounded-md border border-white/10 bg-[#0d1117] text-white shadow-md ring-1 ring-white/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-side=bottom:slide-in-from-top-2 data-side=left:slide-in-from-right-2 data-side=right:slide-in-from-left-2 data-side=top:slide-in-from-bottom-2"
          position="popper"
          sideOffset={4}
        >
          <div className="sticky top-0 z-10 bg-[#0d1117] border-b border-white/10">
            <div className="relative flex items-center px-2 py-1.5">
              <Search className="absolute left-3 h-3.5 w-3.5 text-white/30 pointer-events-none" />
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                onPointerDown={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                className="w-full rounded-md bg-white/5 border border-white/10 py-1.5 pl-8 pr-8 text-sm text-white placeholder:text-white/30 outline-none focus:border-orange-500/50"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="absolute right-3 text-white/30 hover:text-white/60"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          <SelectPrimitive.Viewport className="p-1 max-h-60 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-2 py-4 text-center text-sm text-white/40">{emptyMessage}</div>
            ) : (
              filtered.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className="relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-white/10 focus:text-white data-disabled:pointer-events-none data-disabled:opacity-50 data-[state=checked]:text-orange-400 data-[state=checked]:bg-orange-500/10"
                >
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))
            )}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
