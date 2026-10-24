import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button, Icons } from 'design-system-mirror';

export const IconButtonHint = () => (
  <TooltipProvider>
    <div className="pt-10">
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Add project"><Icons.Plus /></Button>
        </TooltipTrigger>
        <TooltipContent side="right">Add project</TooltipContent>
      </Tooltip>
    </div>
  </TooltipProvider>
);
