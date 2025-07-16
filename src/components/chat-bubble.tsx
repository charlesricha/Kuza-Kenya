import Link from 'next/link';

export function ChatBubble() {
  return (
    <Link href="/#chatbot" scroll={true}>
        <div className="absolute top-10 right-0 md:right-5 transform transition-transform hover:scale-105 cursor-pointer">
            <div className="bg-primary text-primary-foreground rounded-xl rounded-br-none p-4 w-52 shadow-lg">
                <p className="font-bold">Hello, I am Kiboko</p>
                <p>Your AI assistant!</p>
                <p className="text-sm text-primary-foreground/80 mt-2">Tap to chat!</p>
            </div>
        </div>
    </Link>
  );
}
