import {
  Truck,
  ShieldCheck,
  Headphones,
  FileText,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Envíos rápidos",
    text: "A toda España",
  },
  {
    icon: ShieldCheck,
    title: "Productos de calidad",
    text: "Para uso profesional",
  },
  {
    icon: Headphones,
    title: "Atención personalizada",
    text: "Te ayudamos siempre",
  },
  {
    icon: FileText,
    title: "Presupuesto gratuito",
    text: "Sin compromiso",
  },
];

export default function BottomFeatures() {
  return (
    <section className="bg-[#111111] py-8">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2 xl:grid-cols-4">

        {features.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-center gap-4 border-[#333] xl:border-r last:border-r-0"
            >
              <Icon
                size={34}
                className="text-[#C6922F]"
              />

              <div>
                <h3 className="font-semibold text-white">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-400">
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}