import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ChatBubble } from '@/components/chat-bubble';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="absolute top-0 z-50 w-full">
        <div className="container flex h-20 max-w-screen-2xl items-center justify-between px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">Kuza Kenya</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">Home</Link>
            <Link href="#about" className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4">About Us</Link>
            <Link href="/report" className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4">Report</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex items-center">
        <div className="container px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col justify-center space-y-6">
              <div className="relative pl-8">
                 <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-full"></div>
                 <div className="absolute left-[-0.625rem] top-0 h-6 w-6 bg-primary rounded-full"></div>

                <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                  Hi, Welcome to <br /> Kuza Kenya
                </h1>
                <p className="mt-4 max-w-[600px] text-muted-foreground md:text-xl">
                  Make reports and refine your country
                </p>
              </div>
              <div className="pl-8">
                <Button asChild size="lg" className="px-10 py-6 text-lg">
                  <Link href="/report">
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative flex justify-center items-center">
               <img
                src="https://firebasestorage.googleapis.com/v0/b/firebase-studio-demos.appspot.com/o/projects%2Fkuzakenya-demo%2Fkiboko.png?alt=media&token=8955bce2-4751-455b-801c-1c099394a11f"
                width="450"
                height="450"
                alt="Kimbo the AI assistant Hippo"
                className="mx-auto"
                data-ai-hint="cute hippo mascot"
              />
              <ChatBubble />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
