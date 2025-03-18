import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"
import Logo from "@/assets/Logo"

export const metadata: Metadata = {
    title: "404: Page Not Found",
    description: "The page you are looking for doesn't exist or has been moved."
}

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
            <div className="text-center space-y-4">
                <Logo className="text-[0px]" />
                <h1 className="text-2xl font-semibold"><span className="font-light">404</span> | Page Not Found</h1>
                <p className="text-muted-foreground">
                    The page you are looking for doesn&apos;t exist or has been moved.
                </p>
                <Button asChild>
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        </div>
    )
}