import { Loader2 } from "lucide-react";
import { cn } from "../../lib/cn";

/** Індикатор завантаження. */
export function Spinner({ className }) {
  return <Loader2 className={cn("h-5 w-5 animate-spin text-fg-muted", className)} />;
}
