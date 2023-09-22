"use client";

import { Container } from "../Container";
import { categories } from "@/data";
import { CategoryBox } from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const Categories = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const category = searchParams?.get("category");
  const isMainPage = pathname === "/";

  if (!isMainPage) return null;

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            icon={item.icon}
            label={item.label}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};
