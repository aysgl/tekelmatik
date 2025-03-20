import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent } from "@/components/ui/card";
import { isShopOpenNow, Shop } from '@/lib/services/shops';
import Image from 'next/image';
import { AspectRatio } from './ui/aspect-ratio';
import { Badge } from './ui/badge';
import { MapPin, Navigation, Phone, Star } from 'lucide-react';
import { ShopDistance } from './shop-distance';
import { Button } from './ui/button';


const Dialog = dynamic(() => import('@/components/ui/dialog').then(mod => mod.Dialog))
const DialogContent = dynamic(() => import('@/components/ui/dialog').then(mod => mod.DialogContent))
const DialogHeader = dynamic(() => import('@/components/ui/dialog').then(mod => mod.DialogHeader))
const DialogTitle = dynamic(() => import('@/components/ui/dialog').then(mod => mod.DialogTitle))
const DialogTrigger = dynamic(() => import('@/components/ui/dialog').then(mod => mod.DialogTrigger))

const Carousel = dynamic(() => import('@/components/ui/carousel').then(mod => mod.Carousel))
const CarouselContent = dynamic(() => import('@/components/ui/carousel').then(mod => mod.CarouselContent))
const CarouselItem = dynamic(() => import('@/components/ui/carousel').then(mod => mod.CarouselItem))
const CarouselNext = dynamic(() => import('@/components/ui/carousel').then(mod => mod.CarouselNext))
const CarouselPrevious = dynamic(() => import('@/components/ui/carousel').then(mod => mod.CarouselPrevious))

export function ShopCard({ shop, index = -1 }: { shop: Shop; index?: number }) {
    return (
        <Card key={shop.id} className='min-h-[140px]'>
            <CardContent className="grid grid-cols-[auto_1fr] gap-4 items-start">
                <Suspense fallback={null}>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="col-span-auto aspect-square md:w-[90px] md:h-[90px] w-[70px] h-[70px] bg-muted relative overflow-hidden rounded-md">
                                {shop.main_photo_url ? (
                                    <Image
                                        src={shop.main_photo_url}
                                        alt={shop.name}
                                        fill
                                        className="object-cover transition-opacity duration-300"
                                        sizes="(max-width: 768px) 70px, 90px"
                                        priority={index === 0}
                                        loading={index === 0 ? "eager" : "lazy"}
                                        quality={75}
                                        placeholder="blur"
                                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4dHBwdHx4dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0XFxodHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                        onLoad={(event) => {
                                            const img = event.currentTarget;
                                            img.classList.remove('opacity-0');
                                            img.classList.add('opacity-100');
                                        }}
                                    />

                                ) : (
                                    <div className="w-full h-full flex text-center items-center justify-center bg-accent text-[10px] p-2">
                                        {shop.name}
                                    </div>
                                )}
                            </div>
                        </DialogTrigger>
                        {shop.main_photo_url &&
                            <DialogContent className="max-w-[100vw] md:max-w-[600px]">
                                <DialogHeader>
                                    <DialogTitle className="text-lg font-semibold">
                                        {shop.name}
                                    </DialogTitle>
                                </DialogHeader>
                                <Carousel opts={{
                                    align: "start",
                                    loop: true,
                                }} className="w-full h-full" aria-label={`${shop.name} fotoğraf galerisi`}
                                >
                                    <CarouselContent>
                                        {shop.shop_photos?.length > 0 && shop.shop_photos?.map((photo, index) => (
                                            <CarouselItem key={index} role="group"
                                                aria-roledescription="slide"
                                                aria-label={`${index + 1} / ${shop.shop_photos.length}`}
                                            >
                                                <AspectRatio ratio={1} className="w-full h-full bg-muted relative">
                                                    <Image
                                                        src={photo}
                                                        alt={`${shop.name} - Photo ${index + 1}`}
                                                        className="object-cover"
                                                        width="600"
                                                        height="600"
                                                        loading="lazy"
                                                        quality={75}
                                                        style={{
                                                            objectFit: 'cover',
                                                            height: '100%',
                                                        }}
                                                    />
                                                </AspectRatio>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="md:-ms-4 ms-8" />
                                    <CarouselNext className="md:-me-4 me-8" />
                                </Carousel>
                            </DialogContent>
                        }
                    </Dialog>
                </Suspense>
                <div className='min-h-[90px]'>
                    <div className="flex items-center justify-between">
                        <p className="font-medium">{shop.name}</p>
                        <Badge
                            className={
                                isShopOpenNow(shop.shop_hours)
                                    ? "bg-green-100 text-green-800 border-green-200"
                                    : "bg-red-100 text-red-800 border-red-200"
                            }
                        >
                            {isShopOpenNow(shop.shop_hours) ? "Open" : "Closed"}
                        </Badge>
                    </div>
                    {shop?.formatted_address &&
                        <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3 hidden md:block" />
                            {shop?.formatted_address}
                        </div>
                    }
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                <span className="text-xs">{shop.rating}</span>
                            </div>
                            {shop.location_lat && shop.location_lng &&
                                <div className="flex items-center gap-1 text-sm">
                                    <Navigation className="h-3 w-3" />
                                    <ShopDistance shop={{ location_lat: shop.location_lat, location_lng: shop.location_lng }} />
                                </div>
                            }
                        </div>
                        {shop.formatted_phone_number && (
                            <Button asChild size="sm">
                                <a
                                    href={`tel:${shop.formatted_phone_number}`}
                                    className="items-center gap-2"
                                >
                                    <Phone className="h-4 w-4 md:flex hidden" />
                                    <span>{shop.formatted_phone_number}</span>
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}