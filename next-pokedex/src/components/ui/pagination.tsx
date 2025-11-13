"use client";

import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';//ここからui引っ張ってボタンを実装する

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
  const { currentPage, totalPages, hasNext, hasPrev } = pagination;

  //  ページ番号を5つだけ表示する範囲を計算
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 4);

  return (
    <Pagination>
      <PaginationContent>

        {/* ◀ 前へボタン */}
        {hasPrev && (
          <PaginationItem>
            <PaginationPrevious href={`${basePath}?page=${currentPage - 1}`} />
          </PaginationItem>
        )}

        {/* ページ番号 */}
        {Array.from({ length: end - start + 1 }, (_, i) => {
          const page = start + i;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={`${basePath}?page=${page}`}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* ▶ 次へボタン */}
        {hasNext && (
          <PaginationItem>
            <PaginationNext href={`${basePath}?page=${currentPage + 1}`} />
          </PaginationItem>
        )}

      </PaginationContent>
    </Pagination>
  );
}
