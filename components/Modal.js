import classNames from 'classnames';
import { FaTimes } from 'react-icons/fa';

export default function Modal({ isModalOpen, handleModalClose, children }) {
  return (
    <div
      className={classNames('modal', {
        show: isModalOpen
      })}
    >
      <span className='float-right cursor-pointer' onClick={handleModalClose}>
        <FaTimes size={20} />
      </span>
      {children}
    </div>
  );
}
