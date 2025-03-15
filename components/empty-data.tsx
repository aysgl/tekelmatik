import { MapPin } from "lucide-react"
import { Card, CardContent } from "./ui/card"

interface EmptyDataProps {
    title?: string
    description?: string
}

export function EmptyData({
    title = "No open liquor stores found",
    description = "Please try a different search term or check the Show All option."
}: EmptyDataProps) {
    return (
        <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
                <MapPin className="h-12 w-12 mx-auto mb-2" />
                <h3 className="text-lg font-medium mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm text-center">
                    {description}
                </p>
            </CardContent>
        </Card>
    )
}