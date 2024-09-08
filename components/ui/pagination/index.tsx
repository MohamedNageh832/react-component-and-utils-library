import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import {
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { processPaginationPages } from "./processPaginationPages";
import "./style.css";

type PaginationProps = {
  className?: string;
  numOfPages: number;
  onPageChange?: (currentPage: number) => void;
};

const Pagination: FC<PaginationProps> = (props) => {
  const { className, numOfPages, onPageChange } = props || {};
  const [currentPage, setCurrentPage] = useState(1);
  const arrOfCurrPages = useMemo(
    () => processPaginationPages(numOfPages, currentPage),
    [currentPage, numOfPages]
  );

  useEffect(() => {
    if (onPageChange) onPageChange(currentPage);
  }, [currentPage]);

  return (
    <section className={`pagination${className ? ` ${className}` : ""}`}>
      <button
        className="pagination__btn pagination__btn--arrow"
        disabled={currentPage === 1}
        onClick={() =>
          currentPage <= 1 ? false : setCurrentPage((n) => n - 1)
        }
      >
        <BiChevronRight />
      </button>
      {arrOfCurrPages.map((item: number, i: number) => (
        <button
          key={i}
          onClick={() => setCurrentPage(item)}
          disabled={typeof item === "string"}
          className={`pagination__btn${item === currentPage ? " active" : ""}`}
        >
          {item}
        </button>
      ))}
      <button
        className="pagination__btn pagination__btn--arrow"
        disabled={currentPage === numOfPages}
        onClick={() =>
          currentPage >= numOfPages ? false : setCurrentPage((n) => n + 1)
        }
      >
        <BiChevronLeft />
      </button>
    </section>
  );
};

export default Pagination;
