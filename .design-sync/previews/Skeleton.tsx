import { Skeleton } from 'design-system-mirror';

export const ProfileLoading = () => (
  <div className="flex items-center gap-4">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-60" />
      <Skeleton className="h-4 w-44" />
    </div>
  </div>
);

export const CardLoading = () => (
  <div className="max-w-sm space-y-3 rounded-lg border p-6">
    <Skeleton className="h-6 w-48" />
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-20 w-full" />
  </div>
);
