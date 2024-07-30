import React from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import './PaginationButton.scss';

type Props = {
  total: number;
  itemOnPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const PaginationButton: React.FC<Props> = ({
  total, setCurrentPage, currentPage, itemOnPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(total / itemOnPage);
  const maxPagesToShow = 5;

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      const params = new URLSearchParams(searchParams);
      params.set('currentPage', page.toString());
      setSearchParams(params);
      setCurrentPage(page);
    }
  };

  const generatePagination = (totalPages: number, currentPage: number) => {
    const pagination = [];
    const half = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - half);
    let endPage = Math.min(totalPages, currentPage + half);

    if (currentPage - half < 1) {
      endPage = Math.min(maxPagesToShow, totalPages);
    }

    if (currentPage + half > totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pagination.push(i);
    }
  
    return pagination;
  };

  const pagination = generatePagination(totalPages, currentPage);

  return (
    <ul className="pagination__button">
      <li className={cn('pagination__item', { disabled: currentPage === 1 })}>
        <button
          data-cy="prevLink"
          className="pagination__link"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          «
        </button>
      </li>
      {pagination.map((page) => (
        <li
          className={cn('pagination__item', {
            'pagination__item-active': page === currentPage,
          })}
          key={page}
        >
          <button
            data-cy="pageLink"
            className={cn('pagination__link', {
              'pagination__link-active': page === currentPage,
            })}
            onClick={() => handlePageChange(page)}
          >
            {`${page}`}
          </button>
        </li>
      ))}
      <li className={cn('pagination__item', {
        disabled: currentPage === totalPages,
      })}
      >
        <button
          data-cy="nextLink"
          className="pagination__link"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          »
        </button>
      </li>
    </ul>
  );
};
