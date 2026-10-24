import * as React from "react"
import { X } from "lucide-react"

import { cn } from "../lib/utils"

export interface TagsInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Controlled list of tags. */
  value?: string[]
  /** Initial tags when uncontrolled. */
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
}

/**
 * A field that collects free-text tags: type and press Enter (or comma) to add,
 * Backspace on an empty field to remove the last one. React counterpart of the
 * site's reka-ui TagsInput; the parts are built in, so pass only `value`/`onValueChange`.
 */
const TagsInput = React.forwardRef<HTMLDivElement, TagsInputProps>(
  ({ className, value, defaultValue = [], onValueChange, placeholder, disabled, ...props }, ref) => {
    const [inner, setInner] = React.useState<string[]>(defaultValue)
    const tags = value ?? inner
    const [draft, setDraft] = React.useState("")
    const set = (next: string[]) => {
      if (value === undefined) setInner(next)
      onValueChange?.(next)
    }
    const add = () => {
      const t = draft.trim()
      if (t && !tags.includes(t)) set([...tags, t])
      setDraft("")
    }
    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap gap-2 items-center rounded-md border border-input bg-background px-3 py-2 text-sm", className)}
        {...props}
      >
        {tags.map((tag) => (
          <TagsInputItem key={tag}>
            <TagsInputItemText>{tag}</TagsInputItemText>
            <TagsInputItemDelete disabled={disabled} onClick={() => set(tags.filter((x) => x !== tag))} />
          </TagsInputItem>
        ))}
        <TagsInputInput
          value={draft}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={add}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add() }
            else if (e.key === "Backspace" && !draft && tags.length) set(tags.slice(0, -1))
          }}
        />
      </div>
    )
  }
)
TagsInput.displayName = "TagsInput"

const TagsInputItem = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex h-6 items-center rounded bg-secondary data-[state=active]:ring-ring data-[state=active]:ring-2 data-[state=active]:ring-offset-2 ring-offset-background", className)}
    {...props}
  />
)
TagsInputItem.displayName = "TagsInputItem"

const TagsInputItemText = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("py-1 px-2 text-sm rounded bg-transparent", className)} {...props} />
)
TagsInputItemText.displayName = "TagsInputItemText"

const TagsInputItemDelete = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button type="button" aria-label="Remove tag" className={cn("flex rounded bg-transparent mr-1", className)} {...props}>
    <X className="w-4 h-4" />
  </button>
)
TagsInputItemDelete.displayName = "TagsInputItemDelete"

const TagsInputInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn("text-sm min-h-6 focus:outline-hidden flex-1 bg-transparent px-1", className)} {...props} />
  )
)
TagsInputInput.displayName = "TagsInputInput"

export { TagsInput, TagsInputItem, TagsInputItemText, TagsInputItemDelete, TagsInputInput }
