import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import type { Property } from "@/types/property";

interface PropertyAgentCardProps {
  property: Property;
}

/** wa.me needs digits only (with country code, no leading +). */
function buildWhatsAppLink(phone: string): string {
  const digitsOnly = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${digitsOnly}`;
}

export default function PropertyAgentCard({ property }: PropertyAgentCardProps) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
      <h2 className="text-sm font-semibold text-ink-soft">Listed by</h2>

      <div className="mt-3 flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-white">
          <Icon name="shieldCheck" className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-ink">{property.agency}</p>
          {property.agentName && <p className="truncate text-sm text-ink-soft">{property.agentName}</p>}
        </div>
      </div>

      {property.phone && (
        <p className="mt-3 flex items-center gap-2 text-sm text-ink-soft">
          <Icon name="phone" className="h-4 w-4 text-ink-muted" />
          {property.phone}
        </p>
      )}

      <div className="mt-4 space-y-2.5">
        {property.phone ? (
          <Button href={`tel:${property.phone}`} variant="secondary" fullWidth>
            <Icon name="phone" className="h-4 w-4" />
            Contact Agent
          </Button>
        ) : (
          <Button type="button" variant="secondary" fullWidth>
            <Icon name="phone" className="h-4 w-4" />
            Contact Agent
          </Button>
        )}
        {property.phone && (
          <Button href={buildWhatsAppLink(property.phone)} variant="outline" fullWidth>
            WhatsApp
          </Button>
        )}
      </div>

      {!property.phone && (
        <p className="mt-3 text-xs text-ink-muted">Contact details for this listing aren&apos;t available yet.</p>
      )}
    </div>
  );
}