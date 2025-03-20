import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Locate } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useGeolocation } from "@/hooks/use-geolocation";
import { useState } from "react";

// Form Schema
const formSchema = z.object({
    search: z.string().min(2, "Search term must be at least 2 characters"),
});

interface SearchBarProps {
    onSearch?: (query: string) => void;
    small?: boolean;
}

export function SearchBar({ onSearch, small }: SearchBarProps) {
    const [isLocating, setIsLocating] = useState<boolean>(false)
    const { getPermission } = useGeolocation()
    const router = useRouter()

    const handleLocation = async () => {
        setIsLocating(true)
        try {
            await getPermission();
        } catch (error) {
            console.log(error)
        } finally {
            setIsLocating(false)
        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        onSearch?.(values.search);
        router.push(`/search?q=${values.search}`);
    };

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
                                    className={cn("pr-20 h-12", small && "h-9 text-sm")}
                                    placeholder="Search by location..."
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div
                    className={cn(
                        "absolute top-1/2 -translate-y-1/2",
                        small ? "right-1" : "right-1.5"
                    )}
                >
                    {form.watch("search") ? (
                        <Button size="xs" type="submit">
                            Search
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            variant="ghost"
                            className="flex items-center gap-2"
                            onClick={handleLocation}
                            size={small ? "xs" : "default"}
                            disabled={isLocating}
                        >
                            <Locate className="h-4 w-4" />
                            {isLocating ? "Locating..." : "Use My Location"}
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
}
