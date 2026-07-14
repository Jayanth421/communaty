import Image from "next/image"
import Link from "next/link"

type BrandMarkProps = {
  href?: string
  compact?: boolean
}

export function BrandMark({ href = "/", compact = false }: BrandMarkProps) {
  const content = (
    <span className="flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-border bg-background">
        <Image src="/brandmark.svg" alt="COPEX logo" width={36} height={36} priority />
      </span>
      {!compact && <span className="text-sm font-bold tracking-tight">COPEX</span>}
    </span>
  )

  return href ? <Link href={href}>{content}</Link> : content
}
