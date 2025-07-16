import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ChatInterface } from '@/components/chat-interface';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="font-bold">Kiboko Kuza</span>
          </Link>
          <Button asChild>
            <Link href="/report">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Improve Your Community, One Report at a Time
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    See a pothole? Overflowing rubbish? Let us know. KuzaKenya makes it easy to report local issues and track their resolution.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/report">Report an Issue</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                     <Link href="#chatbot">Ask Kiboko</Link>
                  </Button>
                </div>
              </div>
              <img
                src="https://placehold.co/600x600.png"
                width="600"
                height="600"
                alt="Community improvement"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                data-ai-hint="happy community"
              />
            </div>
          </div>
        </section>
        <section id="chatbot" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
           <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Have Questions? Ask Kiboko!</h2>
                      <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                          Our AI assistant, Kiboko, is here to help. Ask anything about the reporting process, our platform, or how you can contribute.
                      </p>
                  </div>
              </div>
               <div className="mx-auto w-full max-w-2xl pt-10">
                  <ChatInterface />
              </div>
           </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 KuzaKenya. All rights reserved.</p>
     </footer>
    </div>
  );
}
