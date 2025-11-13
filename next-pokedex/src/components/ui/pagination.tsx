// src/components/ui/pagination.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils"; // cn がないなら後で短い代替を入れる

export function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav role="navigation" aria-label="pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props} />
  );
}

export function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("flex flex-row items-center gap-1", className)} {...props} />;
}

export function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("", className)} {...props} />;
}

export function PaginationLink({ className, isActive, ...props }: React.ComponentProps<"a"> & { isActive?: boolean }) {
  return (
    <a
      className={cn(
        "px-3 py-1 text-sm rounded-md border transition-colors",
        isActive ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100",
        className
      )}
      {...props}
    />
  );
}

export function PaginationPrevious(props: React.ComponentProps<"a">) {
  return <PaginationLink {...props}>◀ 前へ</PaginationLink>;
}

export function PaginationNext(props: React.ComponentProps<"a">) {
  return <PaginationLink {...props}>次へ ▶</PaginationLink>;
}
