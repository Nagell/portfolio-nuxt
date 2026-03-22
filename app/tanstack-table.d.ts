import type { RowData } from '@tanstack/vue-table'

declare module '@tanstack/vue-table' {
    interface ColumnMeta<_TData extends RowData, _TValue> {
        class?: string
    }
}
