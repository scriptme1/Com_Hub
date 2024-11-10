"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShoppingBag, BarChart2, Settings, Store, Users } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

const Navigation = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  const routes = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: BarChart2,
      active: pathname === '/dashboard',
    },
    {
      href: '/orders',
      label: 'Orders',
      icon: ShoppingBag,
      active: pathname === '/orders',
    },
    {
      href: '/products',
      label: 'Products',
      icon: Store,
      active: pathname === '/products',
    },
    {
      href: '/customers',
      label: 'Customers',
      icon: Users,
      active: pathname === '/customers',
    },
    {
      href: '/settings',
      label: 'Settings',
      icon: Settings,
      active: pathname === '/settings',
    },
  ];

  if (!session && (pathname === '/auth/login' || pathname === '/auth/register' || pathname === '/')) {
    return null;
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <ShoppingBag className="h-6 w-6" />
          <span className="font-bold">Commerce Hub</span>
        </Link>
        <div className="flex items-center space-x-4 lg:space-x-6 mx-6">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={route.active ? "default" : "ghost"}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-primary" : "text-muted-foreground"
              )}
              asChild
            >
              <Link href={route.href} className="flex items-center space-x-2">
                <route.icon className="h-4 w-4" />
                <span>{route.label}</span>
              </Link>
            </Button>
          ))}
        </div>
        {session && (
          <div className="ml-auto">
            <Button variant="ghost" onClick={() => signOut({ callbackUrl: "/" })}>
              Sign out
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;