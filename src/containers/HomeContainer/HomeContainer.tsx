import { Select } from '@/components';
import { SelectOptionProps } from '@/components/Select/Select';
import { useIntersectionObserver } from '@/hooks';
import React, { useEffect, useState } from 'react';

const LIMIT = 10;

const HomeContainer = () => {
  const [selectedOption, setSelectedOption] = useState<SelectOptionProps>({ label: '', value: '' });
  const [productOptions, setProductOptions] = useState<SelectOptionProps[]>([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  const handleSelect = (option: SelectOptionProps) => {
    setSelectedOption(option);
  };

  const transformProductToSelectOptions = (products: { title: string; id: number }[]) => {
    if (!products) return [];

    return products?.map((product) => {
      return {
        label: product?.title,
        value: product?.id,
      };
    });
  };

  const { lastEntryRef, setHasMore, setPage, page } = useIntersectionObserver(isFetchingProducts);

  useEffect(() => {
    if (totalItems === 0) return;
    if (!isFetchingProducts) {
      setHasMore(productOptions?.length < totalItems);
    }
  }, [productOptions, totalItems]);

  const getSkipValue = () => {
    return (page - 1) * LIMIT;
  };

  const fetchAndSetProducts = async () => {
    try {
      setIsFetchingProducts(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${getSkipValue()}`,
      );
      const data = await response.json();

      setProductOptions(
        (prev) =>
          [
            ...prev,
            ...transformProductToSelectOptions(data?.products),
          ] as unknown as SelectOptionProps[],
      );
      setTotalItems(data?.total);
    } catch (error) {
      alert('Something went wrong');
      console.log({ error });
    } finally {
      setIsFetchingProducts(false);
    }
  };

  useEffect(() => {
    fetchAndSetProducts();
  }, [page]);

  return (
    <div className='p-20'>
      <div className='block w-52'>
        <span className='block mb-2 text-sm'>Select product</span>
        <Select
          options={productOptions}
          selected={selectedOption}
          placeholder='Select product'
          onSelect={handleSelect}
          isLoading={isFetchingProducts}
          lastOptionRef={lastEntryRef}
        />
      </div>
    </div>
  );
};

export default HomeContainer;
