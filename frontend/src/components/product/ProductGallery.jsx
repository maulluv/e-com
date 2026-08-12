import { useState } from "react";
import { cn } from "../../lib/cn";

/**
 * Галерея товару: велике фото + рядок мініатюр.
 * Якщо у товару є масив images — беремо його. Інакше показуємо головне фото
 * + узагальнені плейсхолдери (реальні фото прийдуть із беку в product.images).
 */
export function ProductGallery({ product }) {
  const images = product.images?.length
    ? product.images
    : [product.imageUrl, "/images/gallery-box.svg", "/images/gallery-detail.svg"];

  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-muted">
        <img
          src={images[active]}
          alt={product.title}
          className="aspect-square w-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Фото ${i + 1}`}
              className={cn(
                "h-20 w-20 overflow-hidden rounded-xl border-2 bg-muted transition-colors",
                i === active ? "border-brand" : "border-border hover:border-fg-muted",
              )}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
