
"use client";

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const navItems = [
  {
    href: "/admin",
    label: "Manage Subjects",
  },
  {
    href: "/admin/contributions",
    label: "Manage Contributions",
  },
  {
    href: "/admin/labs",
    label: "Manage Labs",
  },
   {
    href: "/admin/textbooks",
    label: "Manage Textbooks",
  },
   {
    href: "/admin/campaigns",
    label: "Manage Campaigns",
  },
  {
    href: "/admin/authors",
    label: "Manage Authors",
  },
  {
    href: "/admin/quick-links",
    label: "Manage Quick Links",
  },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
