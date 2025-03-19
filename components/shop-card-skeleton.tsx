import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function ShopCardSkeleton() {
    return (
        <Card>
            <CardContent className="flex">
                <Skeleton className="w-[90px] h-[90px] rounded-md mr-4 min-h-[90px]" />
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-[200px]" />
                        <Skeleton className="h-6 w-[60px]" />
                    </div>
                    <Skeleton className="h-4 w-full mt-2" />
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex gap-4">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-4 w-[100px]" />
                        </div>
                        <Skeleton className="h-9 w-[100px]" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}