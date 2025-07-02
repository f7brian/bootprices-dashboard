import eye from "@/assets/dashboard/Frame 1321315215.png";
import links from "@/assets/dashboard/Frame 1321315217.png";
import Image from "next/image";

interface StatCardProps {
  icon: "eye" | "sparkles";
  title: string;
  value: string | number;
}

export function StatCard({ icon, title, value }: StatCardProps) {
  return (
    <div className="bg-[#F2F2F2] p-6 rounded-md flex flex-col items-center">
      <div className=" mb-4">
        {icon === "eye" ? (
          <Image src={eye} className="w-10 h-10 object-cover" alt="eye icons" />
        ) : (
          <Image
            src={links}
            className="w-10 h-10 object-cover"
            alt="eye icons"
          />
        )}
      </div>
      <p className="text-gray-600 mb-1">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

export function OverviewStats() {
  const stats = [
    { icon: "eye" as const, title: "Total Visitor's", value: "12,580" },
    { icon: "sparkles" as const, title: "Today's Click", value: "8" },
    { icon: "eye" as const, title: "Today's Visitor", value: "52" },
    { icon: "sparkles" as const, title: "Total Click", value: "4,526" },
  ];

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>
    </section>
  );
}
