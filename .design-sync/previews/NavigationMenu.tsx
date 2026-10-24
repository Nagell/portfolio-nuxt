import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle, cn } from 'design-system-mirror';

const Link = ({ name, extra }: { name: string; extra?: string }) => (
  <NavigationMenuItem>
    <NavigationMenuLink asChild>
      <a href={`#${name.toLowerCase()}`} className={cn(navigationMenuTriggerStyle(), extra)}>{name}</a>
    </NavigationMenuLink>
  </NavigationMenuItem>
);

const Mark = () => (
  <svg viewBox="0 0 2134 2134" className="w-6 h-6" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M1959.42,552.146l-0,1029.04l-892.754,514.433l-892.755,-514.433l0,-1029.04l892.755,-514.433l892.754,514.433Zm-892.754,-394.21c-0,0 -788.588,454.409 -788.588,454.409l0,908.643l788.588,454.409l788.587,-454.409l0,-908.643l-788.587,-454.409Z" />
    <path d="M1577.16,1300.96l0,-588.613l104.167,-60.024l-0,828.693l-1125.15,-648.345l0,588.321l-104.166,60.024l-0,-828.693l1125.15,648.637Z" />
    <path d="M660.343,1240.74l197.926,-114.051l104.231,60.162l-302.157,174.112l-0,-120.223Z" />
  </svg>
);

export const SiteHeader = () => (
  <div className="min-h-24">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <a href="#" className="px-2 py-3 block" aria-label="Navigate to the homepage"><Mark /></a>
        </NavigationMenuItem>
        <Link name="About" />
        <Link name="Experience" />
        <Link name="Projects" />
      </NavigationMenuList>
      <NavigationMenuList className="hidden xs:flex">
        <Link name="Login" extra="pr-3" />
      </NavigationMenuList>
    </NavigationMenu>
  </div>
);
