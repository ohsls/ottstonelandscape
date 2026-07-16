import { type Package } from '@/data/packages'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ContactOptions from '@/components/ui/ContactOptions'
import { Check } from 'lucide-react'

interface PackageCardProps {
  pkg: Package
}

export default function PackageCard({ pkg }: PackageCardProps) {
  return (
    <Card
      className={`relative flex flex-col ${
        pkg.highlighted
          ? 'border-2 border-brand-gold md:scale-105'
          : 'border border-gray-200'
      }`}
    >
      {pkg.highlighted && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-white hover:bg-brand-gold">
          Most Popular
        </Badge>
      )}

      <CardHeader>
        <h3 className="font-display text-xl font-bold text-brand-green">
          {pkg.name}
        </h3>
        <p className="text-sm italic text-brand-muted">{pkg.tagline}</p>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="mb-6">
          <span className="text-sm text-brand-muted">Starting at</span>
          <p className="text-3xl font-bold text-brand-green">{pkg.startingAt}</p>
        </div>

        <ul className="space-y-3">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <ContactOptions
          whatsappMessage={pkg.whatsappMsg}
          layout="stack"
          className="w-full"
        />
      </CardFooter>
    </Card>
  )
}
