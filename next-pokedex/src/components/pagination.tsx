"use client";

import { useRouter } from "next/navigation";
import {
Pagination,
PaginationContent,
PaginationItem,
PaginationLink,
PaginationNext,
PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationInfo {
currentPage: number;
totalPages: number;
hasNext: boolean;
hasPrev: boolean;
}

interface PaginationComponentProps {
pagination: PaginationInfo;
basePath: string;
}

export default function PaginationComponent({
pagination,
basePath,
}: PaginationComponentProps) {
const { currentPage, totalPages, hasNext, hasPrev } = pagination;
const router = useRouter();

  // ページ番号 5個だけ表示
const start = Math.max(1, currentPage - 2);
const end = Math.min(totalPages, start + 4);

const goTo = (page: number) => {
    router.push(`${basePath}?page=${page}`);
};

return (
    <Pagination>
    <PaginationContent>
        {/* ◀ 前へ */}
        {hasPrev && (
        <PaginationItem>
            <PaginationPrevious
            href="#"
            onClick={(e) => {
                e.preventDefault();
                goTo(currentPage - 1);
            }}
            />
        </PaginationItem>
        )}

        {/* ページ番号 */}
        {Array.from({ length: end - start + 1 }, (_, i) => {
        const page = start + i;
        return (
            <PaginationItem key={page}>
            <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                e.preventDefault();
                goTo(page);
                }}
            >
                {page}
            </PaginationLink>
            </PaginationItem>
        );
        })}

        {/* ▶ 次へ */}
        {hasNext && (
        <PaginationItem>
            <PaginationNext
            href="#"
            onClick={(e) => {
                e.preventDefault();
                goTo(currentPage + 1);
            }}
            />
        </PaginationItem>
        )}
    </PaginationContent>
    </Pagination>
);
}