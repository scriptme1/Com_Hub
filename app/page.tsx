import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 space-y-8">
      <div className="flex items-center space-x-4">
        <ShoppingBag className="h-12 w-12" />
        <h1 className="text-4xl font-bold">Commerce Hub</h1>
      </div>
      <p className="text-xl text-muted-foreground text-center max-w-2xl">
        Manage all your online stores in one place. Connect your Facebook, Instagram, LINE, 
        Shopee, and Lazada stores to streamline your e-commerce operations.
      </p>
      <Button asChild size="lg">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span>Get Started</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}