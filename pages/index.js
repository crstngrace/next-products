import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import classNames from 'classnames';

/* Hooks */
import { useFetchProducts } from '@/hooks/api/useProducts.hook';

/* Components */
import Backdrop from '@/components/Backdrop';
import Modal from '@/components/Modal';
import TableContent from '@/components/Datatable/TableContent';
import TableFooter from '@/components/Datatable/TableFooter';
import ScrollToTopButton from '@/components/ScrollToTopButton';

export default function Home() {
  const isBrowser = () => typeof window !== 'undefined';

  const [searchValue, setSearchValue] = useState('');
  const [search] = useDebounce(searchValue, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState({});

  /* Products Table */
  const [searchPagination, setSearchPagination] = useState({
    limit: 10,
    skip: 0
  });
  const [pagination, setPagination] = useState({
    totalPages: 0,
    currentPage: 0
  });
  const { data, error, isLoading, isFetching } = useFetchProducts({
    params: { ...searchPagination, q: search }
  });
  const headers = [
    {
      key: 'thumbnail',
      title: 'Thumbnail',
      value: ({ thumbnail, title }) => (
        <img
          className='object-contain w-full max-h-48 max-sm:mx-auto'
          src={thumbnail}
          alt={title}
        />
      ),
      width: '200px'
    },
    {
      key: 'title',
      title: 'Name',
      value: ({ title, description }) => (
        <div className='max-sm:py-0'>
          <strong className='text-lg'>{title}</strong>
          <p>{description}</p>
        </div>
      )
    },
    {
      key: 'price',
      title: 'Price',
      value: ({ price }) => (
        <div className='whitespace-nowrap max-sm:pt-0 max-sm:pb-5 max-sm:border-b max-sm:mb-5'>
          &#8369; {handlePriceFormat(price)}
        </div>
      )
    }
  ];

  /* Handles product search */
  const handleSearch = (e) => {
    setSearchPagination((prev) => ({
      ...prev,
      skip: 0
    }));
    setSearchValue(e.target.value);
  };

  /* Handles single product view */
  const handleViewProduct = (product) => {
    setActiveProduct(product);
    setIsModalOpen(true);
  };

  /* Handles price formatting e.g. 1234.00*/
  const handlePriceFormat = (number) => {
    return parseFloat(number).toFixed(2);
  };

  /* Handles modal close */
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  /* Handles table page update; Sets skip and scroll page to top */
  const handleTablePageUpdate = (page) => {
    setSearchPagination((prev) => ({
      ...prev,
      skip: (page - 1) * prev.limit
    }));

    if (isBrowser()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /* Handles table limit update */
  const handleLimitChange = (e) => {
    setSearchPagination((prev) => ({ ...prev, limit: e.target.value }));
  };

  /* Sets total and current page values */
  useEffect(() => {
    if (!data) return;

    setPagination({
      totalPages: data.total === 0 ? 0 : data.total / data.limit,
      currentPage: searchPagination.skip / searchPagination.limit + 1
    });
  }, [data]);

  /* Sets overflow of body to hidden if modal is open */
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
  }, [isModalOpen]);

  return (
    <main className='p-5 md:px-20 lg:px-56'>
      <div className='product-header'>
        <h1 className='font-bold text-center mb-2 '>Products table</h1>
        <div className='text-center uppercase bg-blue-500 text-white py-3 mb-3'>
          Products Demo
        </div>
        <input
          type='search'
          name='search'
          placeholder='Search product'
          className='form-control'
          onChange={handleSearch}
        />
      </div>

      {/* Products table */}
      <TableContent
        headers={headers}
        data={data?.products}
        numItems={searchPagination.limit}
        handleRowClick={handleViewProduct}
        search={search}
        isSearching={isFetching && search}
        isLoading={isFetching && !search}
      />

      {/* Products footer: limit and pagination */}
      <TableFooter
        limit={searchPagination.limit}
        handleLimitChange={handleLimitChange}
        totalPages={pagination.totalPages}
        currentPage={pagination.currentPage}
        handleTablePageUpdate={handleTablePageUpdate}
        isFetching={isFetching}
      />

      {/* Product modal */}
      <Modal isModalOpen={isModalOpen} handleModalClose={handleModalClose}>
        <div className='mb-5'>
          <small className='text-gray-400 uppercase'>
            {activeProduct.category}
          </small>
          <h1 className='text-2xl font-bold mb-5'>{activeProduct.title}</h1>
          <p className='text-gray-500 mb-5'>{activeProduct.description}</p>
          <span>&#8369; {activeProduct.price}</span>
        </div>

        <div className='bg-gray-50 p-3 rounded'>
          <h2 className='font-bold uppercase mb-4'>More Images</h2>
          <div className='grid grid-cols-4 gap-4 items-start min-h-48'>
            {activeProduct?.images?.length > 0 &&
              activeProduct.images
                .slice(0, 4)
                .map((image, i) => (
                  <img
                    className='object-cover max-h-48'
                    src={image}
                    alt={activeProduct.title + ' ' + i}
                    key={image + '-' + i}
                  />
                ))}
          </div>
        </div>
      </Modal>

      {/* Modal backdrop */}
      <Backdrop isModalOpen={isModalOpen} handleModalClose={handleModalClose} />

      {/* Scroll to top helper */}
      <ScrollToTopButton />
    </main>
  );
}
