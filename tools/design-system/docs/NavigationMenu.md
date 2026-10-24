---
category: Navigation
---

The site header: a sticky bar floating 16px from the top, with a rounded-xl border, a blurred translucent background, the logo and section links.

- `NavigationMenu` already renders the floating bar, its blurred backdrop and the `container` width. Put one or more `NavigationMenuList`s inside; with two, the second is pushed to the right (the site's Login link, hidden below the `xs` breakpoint with `hidden xs:flex`).
- Links: `NavigationMenuItem` > `NavigationMenuLink asChild` > your `<a className={navigationMenuTriggerStyle()}>`. Text is `accent-foreground` at 80% opacity, full on hover.
- The first item is the logo mark at 24px (`mark-ink.svg` / `mark-white.svg` from Logos).
- `NavigationMenuTrigger` + `NavigationMenuContent` give dropdown panels, but the site uses plain links only.

```jsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem><NavigationMenuLink asChild><a href="#about" className={navigationMenuTriggerStyle()}>About</a></NavigationMenuLink></NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

React mirror of the site's shadcn-vue `NavigationMenu`; classes copied from `app/components/ui`.
