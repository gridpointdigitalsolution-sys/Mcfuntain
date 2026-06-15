import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart | McFuntain Nutraceuticals",
  description: "Review your selected McFuntain supplements and proceed to checkout.",
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
