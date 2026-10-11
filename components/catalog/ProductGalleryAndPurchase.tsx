
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import ProductPurchase from "@/components/catalog/ProductPurchase";

type ProductImage = {
  url: string;
  altText?: string | null;
};

type SelectedOption = {
  name: string;
  value: string;
};

type ProductVariant = {
  id: string;
  title: string;
  sku?: string | null;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  price: {
    amount: string;
    currencyCode: string;
  };
};

type ProductOption = {
  name: string;
  values: string[];
};

type Collection = {
  id: string;
  handle: string;
  title: string;
};

type Props = {
  title: string;
  description: string;
  images: ProductImage[];
  variants: ProductVariant[];
  options: ProductOption[];
  collections: Collection[];
  pickupOnly: boolean;
};

function cleanText(text: string) {
  return text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export default function ProductGalleryAndPurchase({
  title,
  description,
  images,
  variants,
  options,
  collections,
  pickupOnly,
}: Props) {
  const galleryImages = useMemo(() => {
    const unique = new Map<string, ProductImage>();

    images.forEach((image) => {
      if (image.url && !unique.has(image.url)) {
        unique.set(image.url, image);
      }
    });

    return Array.from(unique.values());
  }, [images]);

  const displayOptions = options.filter(
    (option) =>
      option.values.length > 1 &&
      !option.values.every((value) => value === "Default Title")
  );

  const initialVariant = variants[0] ?? null;

  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(() => {
    const initial: Record<string, string> = {};

    initialVariant?.selectedOptions.forEach((option) => {
      initial[option.name] = option.value;
    });

    return initial;
  });

  const selectedVariant = useMemo(() => {
    return (
      variants.find((variant) =>
        variant.selectedOptions.every(
          (option) => selectedOptions[option.name] === option.value
        )
      ) ?? initialVariant
    );
  }, [variants, selectedOptions, initialVariant]);

  function handleOptionChange(name: string, value: string) {
    const nextOptions = {
      ...selectedOptions,
      [name]: value,
    };

    const matchingVariant = variants.find((variant) =>
      variant.selectedOptions.every(
        (option) => nextOptions[option.name] === option.value
      )
    );

    const alternativeVariant =
      matchingVariant ??
      variants.find((variant) =>
        variant.selectedOptions.some(
          (option) => option.name === name && option.value === value
        )
      );

    if (!alternativeVariant) return;

    const correctedOptions: Record<string, string> = {};

    alternativeVariant.selectedOptions.forEach((option) => {
      correctedOptions[option.name] = option.value;
    });

    setSelectedOptions(correctedOptions);
  }

  const currentImage = galleryImages[activeImage];

  return (
    <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12">
        {/* GALERÍA: IMAGEN GRANDE Y MINIATURAS A SU DERECHA */}
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_64px] items-start gap-2.5 sm:grid-cols-[minmax(0,1fr)_82px] sm:gap-3.5 lg:grid-cols-[minmax(0,1fr)_88px]">
          {/* IMAGEN PRINCIPAL */}
          <div className="min-w-0 overflow-hidden rounded-2xl border border-[#E9E2D9] bg-white">
            <div className="relative aspect-square w-full">
              {currentImage ? (
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  aria-label={`Ampliar imagen de ${title}`}
                  className="absolute inset-0 block h-full w-full cursor-zoom-in"
                >
                  <Image
                    key={currentImage.url}
                    src={currentImage.url}
                    alt={currentImage.altText || title}
                    fill
                    priority
                    sizes="(max-width: 1023px) 80vw, 43vw"
                    className="object-contain p-3 sm:p-5"
                  />
                </button>
              ) : (
                <div className="flex aspect-square items-center justify-center bg-[#F5F0E8] text-sm text-gray-500">
                  Imagen no disponible
                </div>
              )}
            </div>
          </div>

          {/* MINIATURAS VERTICALES */}
          {galleryImages.length > 1 && (
            <div className="flex max-h-[650px] min-w-0 flex-col gap-2.5 overflow-y-auto pr-0.5 sm:gap-3">
              {galleryImages.map((image, index) => (
                <button
                  key={image.url}
                  type="button"
                  aria-label={`Ver imagen ${index + 1} de ${title}`}
                  aria-pressed={activeImage === index}
                  onClick={() => setActiveImage(index)}
                  className={`relative aspect-square w-full shrink-0 overflow-hidden rounded-xl border bg-white transition ${
                    activeImage === index
                      ? "border-[#8B5E34] ring-2 ring-[#8B5E34]/20"
                      : "border-[#E9E2D9] hover:border-[#B99A7A]"
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.altText || `${title}, imagen ${index + 1}`}
                    fill
                    sizes="88px"
                    className="object-contain p-1.5"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INFORMACIÓN DEL PRODUCTO */}
        <div className="min-w-0">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#8B5E34]">
            Estantería Sevilla
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#2C241C] sm:text-4xl">
            {title}
          </h1>

          <div className="mt-5 h-1 w-20 rounded-full bg-[#A36A33]" />

          {/* DESCRIPCIÓN */}
          <div
            className="mt-5 max-w-2xl text-sm leading-6 text-[#4B5563] [&_p]:my-1 [&_ul]:my-2 [&_li]:my-0.5 [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          {/* OPCIONES Y VARIANTES */}
          {displayOptions.length > 0 && (
            <div className="mt-6 space-y-5">
              {displayOptions.map((option) => (
                <fieldset key={option.name}>
                  <legend className="mb-3 text-sm font-semibold text-[#2C241C]">
                    {option.name}
                    {selectedOptions[option.name] && (
                      <span className="ml-2 font-normal text-[#8B5E34]">
                        {selectedOptions[option.name]}
                      </span>
                    )}
                  </legend>

                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => {
                      const selected = selectedOptions[option.name] === value;

                      const available = variants.some(
                        (variant) =>
                          variant.availableForSale &&
                          variant.selectedOptions.some(
                            (item) =>
                              item.name === option.name &&
                              item.value === value
                          )
                      );

                      return (
                        <button
                          key={value}
                          type="button"
                          aria-pressed={selected}
                          onClick={() =>
                            handleOptionChange(option.name, value)
                          }
                          className={`inline-flex min-h-10 items-center gap-2 rounded-xl border px-3.5 py-2 text-sm transition ${
                            selected
                              ? "border-[#8B5E34] bg-[#F6F1EA] font-semibold text-[#2C241C]"
                              : "border-[#E9E2D9] bg-white text-[#4B5563] hover:border-[#B99A7A]"
                          } ${!available ? "opacity-60" : ""}`}
                        >
                          {selected && <Check size={15} />}
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
          )}

          {/* PRECIO Y CARRITO */}
          {selectedVariant ? (
            <>
              <div className="mt-6">
                <p className="text-2xl font-bold text-[#2C241C]">
                  {Number(selectedVariant.price.amount).toLocaleString(
                    "es-ES",
                    {
                      style: "currency",
                      currency: selectedVariant.price.currencyCode || "EUR",
                    }
                  )}
                </p>

                {selectedVariant.sku && (
                  <p className="mt-2 text-sm text-[#4B5563]">
                    Ref. {selectedVariant.sku}
                  </p>
                )}
              </div>

              <div className="mt-5">
                <ProductPurchase
                  variantId={selectedVariant.id}
                  price={selectedVariant.price.amount}
                  currency={selectedVariant.price.currencyCode || "EUR"}
                  availableForSale={selectedVariant.availableForSale}
                  pickupOnly={pickupOnly}
                />
              </div>
            </>
          ) : (
            <p className="mt-6 text-sm text-[#6B6259]">
              Este producto no tiene variantes disponibles.
            </p>
          )}

          {/* INFORMACIÓN DE ENVÍO */}
 
          {/* PRECIO POR UNIDAD */}
   


          {/* CATEGORÍAS */}
          {collections.length > 0 && (
            <div className="mt-6 border-t border-[#E9E2D9] pt-5">
              <p className="mb-3 font-semibold text-[#2C241C]">
                Categorías
              </p>

              <div className="flex flex-wrap gap-2">
                {collections.map((collection) => (
                  <a
                    key={collection.id}
                    href={`/catalogo/${collection.handle}`}
                    className="rounded-full border border-[#E5DED4] bg-white px-4 py-2 text-sm text-[#8B5E34] transition hover:bg-[#F6F1EA]"
                  >
                    {collection.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {lightboxOpen && currentImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada: ${title}`}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Cerrar imagen"
            className="absolute right-3 top-3 z-[101] flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-3xl leading-none text-white hover:bg-white/25 sm:right-6 sm:top-6"
          >
            ×
          </button>
          <div
            className="relative h-[85dvh] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={currentImage.url}
              alt={currentImage.altText || title}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}
