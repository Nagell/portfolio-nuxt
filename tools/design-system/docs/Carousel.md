---
category: Display
---

A horizontally (or vertically) scrolling row of slides with previous/next buttons (Embla).

- Parts: `Carousel` > `CarouselContent` > `CarouselItem`…, plus `CarouselPrevious` and `CarouselNext` (round outline buttons that sit 48px outside the track, so leave side padding).
- Set slide width with `basis-*` on `CarouselItem` (`basis-1/2`, `md:basis-1/3`).
- `opts` passes Embla options (`{ align: "start", loop: true }`); `orientation="vertical"` stacks slides.

```jsx
<Carousel className="max-w-sm">
  <CarouselContent>{items.map(i => <CarouselItem key={i.id} className="basis-1/2">…</CarouselItem>)}</CarouselContent>
  <CarouselPrevious /><CarouselNext />
</Carousel>
```

React mirror of the site's shadcn-vue `Carousel`; classes copied from `app/components/ui`.
