"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SearchLayout() {
    const [searchQuery, setSearchQuery] = useState("")
    const [activeFilters, setActiveFilters] = useState<string[]>([])

    const handleAddFilter = (filter: string) => {
        if (!activeFilters.includes(filter)) {
            setActiveFilters([...activeFilters, filter])
        }
    }

    const handleRemoveFilter = (filter: string) => {
        setActiveFilters(activeFilters.filter((f) => f !== filter))
    }

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-8">
            <div className="mb-8 text-center">
                <h1 className="mb-2 text-4xl font-bold tracking-tight">Search Our Database</h1>
                <p className="text-muted-foreground">Find exactly what you re looking for with our advanced search tools</p>
            </div>

            <div className="mb-8">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search for anything..."
                        className="pl-10 py-6 text-lg"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="mb-8 flex flex-wrap items-center gap-2">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="gap-2">
                            <SlidersHorizontal className="h-4 w-4" />
                            Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full sm:max-w-md">
                        <SheetHeader>
                            <SheetTitle>Search Filters</SheetTitle>
                            <SheetDescription>Narrow down your search results with these filters.</SheetDescription>
                        </SheetHeader>
                        <div className="mt-6 space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Category</h3>
                                <Select onValueChange={(value) => handleAddFilter(`Category: ${value}`)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="technology">Technology</SelectItem>
                                        <SelectItem value="health">Health & Wellness</SelectItem>
                                        <SelectItem value="education">Education</SelectItem>
                                        <SelectItem value="finance">Finance</SelectItem>
                                        <SelectItem value="entertainment">Entertainment</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Date Range</h3>
                                <Select onValueChange={(value) => handleAddFilter(`Date: ${value}`)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select date range" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="today">Today</SelectItem>
                                        <SelectItem value="week">Past Week</SelectItem>
                                        <SelectItem value="month">Past Month</SelectItem>
                                        <SelectItem value="year">Past Year</SelectItem>
                                        <SelectItem value="all">All Time</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Sort By</h3>
                                <Select onValueChange={(value) => handleAddFilter(`Sort: ${value}`)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select sorting" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="relevance">Relevance</SelectItem>
                                        <SelectItem value="newest">Newest First</SelectItem>
                                        <SelectItem value="oldest">Oldest First</SelectItem>
                                        <SelectItem value="popular">Most Popular</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Content Type</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button variant="outline" onClick={() => handleAddFilter("Type: Articles")} className="justify-start">
                                        Articles
                                    </Button>
                                    <Button variant="outline" onClick={() => handleAddFilter("Type: Videos")} className="justify-start">
                                        Videos
                                    </Button>
                                    <Button variant="outline" onClick={() => handleAddFilter("Type: Podcasts")} className="justify-start">
                                        Podcasts
                                    </Button>
                                    <Button variant="outline" onClick={() => handleAddFilter("Type: Images")} className="justify-start">
                                        Images
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>

                {activeFilters.length > 0 && (
                    <>
                        {activeFilters.map((filter) => (
                            <Button
                                key={filter}
                                variant="secondary"
                                size="sm"
                                className="gap-1"
                                onClick={() => handleRemoveFilter(filter)}
                            >
                                {filter}
                                <X className="h-3 w-3" />
                            </Button>
                        ))}
                        <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => setActiveFilters([])}>
                            Clear all
                        </Button>
                    </>
                )}
            </div>

            <Tabs defaultValue="all" className="mb-8">
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="all">All Results</TabsTrigger>
                    <TabsTrigger value="articles">Articles</TabsTrigger>
                    <TabsTrigger value="videos">Videos</TabsTrigger>
                    <TabsTrigger value="images">Images</TabsTrigger>
                    <TabsTrigger value="people">People</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-6">
                    <div className="rounded-lg border p-8 text-center">
                        <h3 className="mb-2 text-lg font-medium">
                            {searchQuery ? `Search results for "${searchQuery}"` : "Enter a search query to get started"}
                        </h3>
                        <p className="text-muted-foreground">
                            {searchQuery
                                ? "Your search results will appear here"
                                : "Use the search bar above to find what you're looking for"}
                        </p>
                    </div>
                </TabsContent>
                <TabsContent value="articles" className="mt-6">
                    <div className="rounded-lg border p-8 text-center">
                        <h3 className="mb-2 text-lg font-medium">Articles</h3>
                        <p className="text-muted-foreground">Article results will appear here</p>
                    </div>
                </TabsContent>
                <TabsContent value="videos" className="mt-6">
                    <div className="rounded-lg border p-8 text-center">
                        <h3 className="mb-2 text-lg font-medium">Videos</h3>
                        <p className="text-muted-foreground">Video results will appear here</p>
                    </div>
                </TabsContent>
                <TabsContent value="images" className="mt-6">
                    <div className="rounded-lg border p-8 text-center">
                        <h3 className="mb-2 text-lg font-medium">Images</h3>
                        <p className="text-muted-foreground">Image results will appear here</p>
                    </div>
                </TabsContent>
                <TabsContent value="people" className="mt-6">
                    <div className="rounded-lg border p-8 text-center">
                        <h3 className="mb-2 text-lg font-medium">People</h3>
                        <p className="text-muted-foreground">People results will appear here</p>
                    </div>
                </TabsContent>
            </Tabs>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Popular Searches</h2>
                <div className="flex flex-wrap gap-2">
                    {["Web Development", "React", "Next.js", "UI Design", "Tailwind CSS", "JavaScript", "TypeScript"].map(
                        (term) => (
                            <Button key={term} variant="outline" size="sm" onClick={() => setSearchQuery(term)}>
                                {term}
                            </Button>
                        ),
                    )}
                </div>
            </div>
        </div>
    )
}

