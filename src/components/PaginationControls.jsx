import PropTypes from "prop-types";
import { LuArrowBigLeft, LuArrowBigRight } from "react-icons/lu";
import Button from './button/Button';

function PaginationControls({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination-controls flex justify-center gap-3 my-4">
      <Button
        variant='primary-reversed'
        extraStyles="px-4 py-2 rounded text-4xl"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <LuArrowBigLeft />
      </Button>
      <Button
        variant='primary-reversed'
        extraStyles="px-4 py-2 rounded text-4xl"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        <LuArrowBigRight />
      </Button>
    </div>
  );
}

PaginationControls.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
}

export default PaginationControls;