import * as React from 'react';
import { Toaster, toast, Button } from 'design-system-mirror';

export const SavedToast = () => {
  React.useEffect(() => {
    toast.success('Project saved', { description: 'It is now live on the homepage.', duration: Infinity });
  }, []);
  return (
    <div>
      <Button variant="outline" onClick={() => toast('Experience updated')}>Show toast</Button>
      <Toaster position="top-right" />
    </div>
  );
};
