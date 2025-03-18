import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Locate } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCallback } from "react"
import { useGeolocation } from "@/hooks/use-geolocation"
import { useRouter } from "next/navigation"
import { useShopsByLocation } from "@/hooks/use-shops"

const formSchema = z.object({
    search: z.string().min(2, "Search term must be at least 2 characters")
})
interface SearchBarProps {
    onSearch?: (query: string) => void
    small?: boolean
}

export function SearchBar({ onSearch, small }: SearchBarProps) {
    const router = useRouter()
    const { latitude, longitude } = useGeolocation();
    const { data: locationData } = useShopsByLocation({ latitude: 0, longitude: 0 })

    console.log("locationShops", locationData);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: ""
        }
    })


    const useCurrentLocation = useCallback(() => {
        if (latitude && longitude) {
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                .then(res => res.json())
                .then(data => {
                    const district = data.address.suburb?.split(' ')[0]
                    if (district) {
                        router.push(`/search?q=${district}`)
                    }
                })
                .catch(() => {
                    alert("Could not determine location name")
                })
        }
        // locationData altında adress içerisinde arama yapsın
        // if (latitude && longitude) {
        //     router.push(`/search/nearby/40.97487873063525,29.117144082696694`)
        // }
    }, [latitude, longitude, router])

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        onSearch?.(values.search)
        router.push(`/search?q=${values.search}`)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="relative w-full">
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    className={cn(
                                        "pr-20 h-12",
                                        small && "h-9 text-sm"
                                    )}
                                    placeholder="Search by location..."
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className={cn(
                    "absolute top-1/2 -translate-y-1/2",
                    small ? "right-1" : "right-1.5"
                )}>
                    {form.watch("search") ? (
                        <Button size="xs" type="submit">Search</Button>
                    ) : (
                        <Button
                            type="button"
                            variant="ghost"
                            className="flex items-center gap-2"
                            onClick={useCurrentLocation}
                            size={small ? "xs" : "default"}
                        >
                            <Locate className="h-4 w-4" />
                            Use My Location
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    )
}