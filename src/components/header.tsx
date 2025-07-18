'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/report", label: "Report" },
];

export function Header() {
    const pathname = usePathname();

    const getLinkClass = (href: string) => cn(
        "text-sm font-medium transition-colors hover:text-primary",
        pathname === href ? "text-primary" : "text-muted-foreground"
    );
    
    const getMobileLinkClass = (href: string) => cn(
        "text-lg font-medium transition-colors hover:text-primary",
        pathname === href ? "text-primary" : "text-muted-foreground"
    );

    return (
        <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="container flex h-20 max-w-screen-2xl items-center justify-between px-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">Kuza Kenya</span>
            </Link>
            
            <nav className="hidden md:flex gap-6">
                {navLinks.map(link => (
                    <Link key={link.href} href={link.href} className={getLinkClass(link.href)}>
                        {link.label}
                    </Link>
                ))}
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
                        {navLinks.map(link => (
                            <Link key={link.href} href={link.href} className={getMobileLinkClass(link.href)}>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>

          </div>
        </header>
    );
}
