import Link from "next/link";

export default function Card({
  title,
  desc,
  href,
  cta,
}: {
  title: string;
  desc: string;
  href: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="text-sm font-semibold">{title}</div>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
      <div className="mt-4 text-sm font-medium text-black underline-offset-4 group-hover:underline">
        {cta}
      </div>
    </Link>
  );
}