import Logo from "@/assets/Logo";
import { ModeToggle } from "../combined/mode-toggle";
import { SearchBar } from "../search-bar";

export function Header() {
    return (
        <header className="fixed w-full top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Logo className="text-3xl" />
                <SearchBar />
                <ModeToggle />
            </div>
        </header>
    )
}