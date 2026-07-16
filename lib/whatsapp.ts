export function buildWhatsAppUrl(message: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '16135550123'
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

export const WA_MESSAGES = {
  hero:      'Hi! I saw your website and would like a free hardscape assessment for my property.',
  scarcity:  "Hi! I'd like to claim one of your remaining project slots for this season.",
  contact:   'Hi! I would like to request a free site assessment.',
}
