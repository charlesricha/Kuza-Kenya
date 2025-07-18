import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Header() {
    return (
        <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="container flex h-20 max-w-screen-2xl items-center justify-between px-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">Kuza Kenya</span>
            </Link>
            
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">Home</Link>
              <Link href="/about" className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4">About Us</Link>
              <Link href="/report" className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4">Report</Link>
            </nav>

             <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <div className="grid gap-4 py-6">
                        <Link href="/" className="text-lg font-medium hover:underline underline-offset-4">Home</Link>
                        <Link href="/about" className="text-lg font-medium text-muted-foreground hover:underline underline-offset-4">About Us</Link>
                        <Link href="/report" className="text-lg font-medium text-muted-foreground hover:underline underline-offset-4">Report</Link>
                    </div>
                </SheetContent>
            </Sheet>

          </div>
        </header>
    );
}
