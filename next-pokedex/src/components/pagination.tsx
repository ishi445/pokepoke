// src/components/pagination.tsx
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

export function PaginationComponent({ pagination, basePath }: PaginationComponentProps) {
    console.log("PaginationComponent mounted!!!");
const { currentPage, totalPages, hasNext, hasPrev } = pagination;
const router = useRouter();

const start = Math.max(1, currentPage - 2);
const end = Math.min(totalPages, start + 4);

return (
    <Pagination>
    <PaginationContent>
        {hasPrev && (
        <PaginationItem>
            <PaginationPrevious href={`${basePath}?page=${currentPage - 1}`} onClick={(e) => { e.preventDefault(); router.push(`${basePath}?page=${currentPage - 1}`); }} />
        </PaginationItem>
        )}

        {Array.from({ length: end - start + 1 }, (_, i) => {
        const page = start + i;
        return (
            <PaginationItem key={page}>
            <PaginationLink
                href={`${basePath}?page=${page}`}
                isActive={page === currentPage}
                onClick={(e) => { e.preventDefault(); router.push(`${basePath}?page=${page}`); }}
            >
                {page}
            </PaginationLink>
            </PaginationItem>
        );
        })}

        {hasNext && (
        <PaginationItem>
            <PaginationNext href={`${basePath}?page=${currentPage + 1}`} onClick={(e) => { e.preventDefault(); router.push(`${basePath}?page=${currentPage + 1}`); }} />
        </PaginationItem>
        )}
    </PaginationContent>
    </Pagination>
);
}

export default PaginationComponent;