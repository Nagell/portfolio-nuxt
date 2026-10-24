import { Avatar, AvatarFallback } from 'design-system-mirror';

export const Sizes = () => (
  <div className="flex items-end gap-4">
    <Avatar><AvatarFallback>DN</AvatarFallback></Avatar>
    <Avatar size="base"><AvatarFallback>DN</AvatarFallback></Avatar>
    <Avatar size="lg"><AvatarFallback>DN</AvatarFallback></Avatar>
  </div>
);

export const Square = () => (
  <div className="flex items-end gap-4">
    <Avatar shape="square"><AvatarFallback>DN</AvatarFallback></Avatar>
    <Avatar size="base" shape="square"><AvatarFallback>DN</AvatarFallback></Avatar>
  </div>
);
