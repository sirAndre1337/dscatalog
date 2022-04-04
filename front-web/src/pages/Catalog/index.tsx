import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import './styles.scss';
import { makeRequest } from 'core/utils/request';
import { Category, ProductsResponse } from 'core/types/Product';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import Pagination from 'core/components/Pagination';
import ProductFilters from 'core/components/ProductFilters';

const Catalog = () => {
    const [productResponse, setProductResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [name,SetName] = useState('');
    const [category,setCategory] = useState<Category>();

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 12,
            name: name,
            categoryId: category?.id
        }
        setIsLoading(true)
        makeRequest({ url: '/products', params: params })
            .then(response => setProductResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage, name, category]) 

    useEffect(() => {
        getProducts();
    }, [getProducts])

    const handleChangeName = (name: string) => {
        setActivePage(0);
        SetName(name);
    }

    const handleChangeCategory = (category: Category) => {
        setActivePage(0);
        setCategory(category);
    }

    const clearFilters = () => {
        setActivePage(0);
        SetName('');
        setCategory(undefined);
    }

    return (

        <div className="catalog-container">
            <div className='filter-container'>
            <h1 className='catalog-title'>
                Catálogo de produtos
            </h1>
            <ProductFilters 
            name={name}
            category={category}
            handleChangeCategory={handleChangeCategory}
            handleChangeName={handleChangeName}
            clearFilters={clearFilters}
            />
            </div>
            <div className='catalog-products'>
                {isLoading ? <ProductCardLoader />
                    : productResponse?.content.map(product => (
                        <Link to={`/products/${product.id}`} key={product.id}>
                            <ProductCard product={product} />
                        </Link>))
                }
            </div>
            {productResponse && <Pagination
                totalPages={productResponse.totalPages}
                onChange={page => setActivePage(page)}
            />}
        </div>
    )
};

export default Catalog;