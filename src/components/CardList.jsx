import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';

const CardList = ({ data }) => {
  // define the limit state variable and set it to 10
  const limit = 10;
  // define the default dataset, using slice to get the first 10 products
  const defaultDataset = data.slice(0, limit);

  // define the offset state variable and set it to 0
  const [offset, setOffset] = useState(0);
  // define the products state variable and set it to the default dataset
  const [products, setProducts] = useState(defaultDataset);
  // define the filteredData state variable and set it to the full dataset
  const [filteredData, setFilteredData] = useState(data);

  // Task 1b — filter the data prop by tags
  const filterTags = (searchTerm) => {
    const term = searchTerm.toLowerCase().trim();
    const filtered = term
      ? data.filter(p => p.tags.some(tag => tag.toLowerCase().includes(term)))
      : data;
    setFilteredData(filtered);
    setOffset(0);
  };

  // Task 2a — refactor handlePrevious and handleNext into a single function
  const handlePageChange = (direction) => {
    if (direction === 'prev') {
      setOffset(offset - 10);
    } else {
      setOffset(offset + 10);
    }
  };

  // define the useEffect hook
  // this hook will run every time the offset or limit state variables change
  // it will update the products state variable to the next 10 products
  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, limit, filteredData]);

  // Task 2b — disable Next when at end
  const isAtEnd = offset + limit >= filteredData.length;
  const isAtStart = offset === 0;

  return (
    <div className="cf pa2">
      {/* Task 1a — import Search and place it above the cards */}
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => handlePageChange('prev')} disabled={isAtStart} />
        <Button text="Next" handleClick={() => handlePageChange('next')} disabled={isAtEnd} />
      </div>
    </div>
  );
};

export default CardList;