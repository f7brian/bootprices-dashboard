import { Package, Info, Store, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

interface QuickLinkCardProps {
  icon: "package" | "info" | "store" | "file"
  title: string
  href: string
}

export function QuickLinkCard({ icon, title, href }: QuickLinkCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "package":
        return <Package className="h-5 w-5 text-gray-700 mr-2" />
      case "info":
        return <Info className="h-5 w-5 text-gray-700 mr-2" />
      case "store":
        return <Store className="h-5 w-5 text-gray-700 mr-2" />
      case "file":
        return <FileText className="h-5 w-5 text-gray-700 mr-2" />
    }
  }

  return (
    <div className="bg-[#F2F2F2] p-6 rounded-md">
      <div className="flex items-center mb-4">
        {getIcon()}
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-600">Go to {title}</p>
        <Link href={href}>
          <ArrowRight className="h-5 w-5 text-gray-600" />
        </Link>
      </div>
    </div>
  )
}

export function QuickLinks() {
  const links = [
    { icon: "package" as const, title: "All Product's", href: "/dashboard/products" },
    { icon: "info" as const, title: "About Us", href: "/about" },
    { icon: "store" as const, title: "All Store's", href: "/dashboard/stores" },
    { icon: "file" as const, title: "Blog's", href: "/blog" },
  ]

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Links</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {links.map((link, index) => (
          <QuickLinkCard key={index} icon={link.icon} title={link.title} href={link.href} />
        ))}
      </div>
    </section>
  )
}
