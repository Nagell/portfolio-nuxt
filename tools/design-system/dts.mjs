// Concatenates the emitted declarations into one documentation file, components/index.d.ts.
import fs from "fs"

const SYS = process.argv[2]
let out = `// Dawid Nitka Portfolio: React mirror of the site's shadcn-vue components.
// Everything is on window.DawidNitka (e.g. DawidNitka.Button). Documentation only, not type-checked.
import * as React from "react"
`
for (const f of fs.readdirSync("types-out/ui").sort()) {
  const body = fs.readFileSync(`types-out/ui/${f}`, "utf8")
    .split("\n").filter((l) => !/^import .* from "\.\.?\//.test(l)).join("\n")
  out += `\n// ---- ${f.replace(".d.ts", "")} ----\n${body}`
}
out += `
// ---- Props aliases for components that take their primitive's props ----
export type CardProps = React.HTMLAttributes<HTMLDivElement>
export type CarouselProps = { opts?: object; plugins?: unknown[]; orientation?: "horizontal" | "vertical"; setApi?: (api: unknown) => void } & React.HTMLAttributes<HTMLDivElement>
export type CheckboxProps = React.ComponentPropsWithoutRef<typeof import("@radix-ui/react-checkbox").Root>
export type CollapsibleProps = React.ComponentPropsWithoutRef<typeof import("@radix-ui/react-collapsible").Root>
export type CommandProps = React.ComponentPropsWithoutRef<typeof import("cmdk").Command>
export type DialogProps = React.ComponentPropsWithoutRef<typeof import("@radix-ui/react-dialog").Root>
export type DropdownMenuProps = React.ComponentPropsWithoutRef<typeof import("@radix-ui/react-dropdown-menu").Root>
export type FormProps = import("react-hook-form").UseFormReturn
export type InputProps = React.ComponentProps<"input">
export type LabelProps = React.ComponentPropsWithoutRef<typeof import("@radix-ui/react-label").Root>
export type NavigationMenuProps = React.ComponentPropsWithoutRef<typeof import("@radix-ui/react-navigation-menu").Root>
export type PopoverProps = React.ComponentPropsWithoutRef<typeof import("@radix-ui/react-popover").Root>
export type SheetProps = React.ComponentPropsWithoutRef<typeof import("@radix-ui/react-dialog").Root>
export type SidebarProps = React.ComponentProps<"div"> & { side?: "left" | "right"; variant?: "sidebar" | "floating" | "inset"; collapsible?: "offcanvas" | "icon" | "none" }
export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>
export type ToasterProps = React.ComponentProps<typeof import("sonner").Toaster>
export type TableProps = React.HTMLAttributes<HTMLTableElement>
export type TextareaProps = React.ComponentProps<"textarea">
export type TooltipProps = React.ComponentPropsWithoutRef<typeof import("@radix-ui/react-tooltip").Root>
`
fs.writeFileSync(`${SYS}/components/index.d.ts`, out)
console.log("index.d.ts", (out.length / 1024).toFixed(1), "KB")
