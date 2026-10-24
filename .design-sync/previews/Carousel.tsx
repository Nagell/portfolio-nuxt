import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, Card, CardContent } from 'design-system-mirror';

export const Slides = () => (
  <div className="px-12">
    <Carousel className="w-full max-w-sm" opts={{ align: 'start' }}>
      <CarouselContent>
        {[1, 2, 3, 4, 5].map((n) => (
          <CarouselItem key={n} className="basis-1/2">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-3xl font-semibold">{n}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
);
