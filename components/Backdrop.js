import classNames from 'classnames';

export default function Backdrop(props) {
  const { isModalOpen, handleModalClose } = props;

  return (
    <div
      className={classNames(
        'fixed top-0 right-0 left-0 first-letter:w-screen h-screen opacity-50 bg-black',
        {
          hidden: !isModalOpen
        }
      )}
      onClick={handleModalClose}
    ></div>
  );
}
