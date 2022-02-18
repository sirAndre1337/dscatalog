import './styles.scss';
import { useHistory } from 'react-router-dom';
import Card from '../Card';
import { useEffect, useState } from 'react';
import { makeRequest } from 'core/utils/request';
import { ProductsResponse } from 'core/types/Product';
import ProductCardLoader from 'pages/Catalog/components/Loaders/ProductCardLoader';
import Pagination from 'core/components/Pagination';

const List = () => {
    const history = useHistory();
    const [productResponse, setProductResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    useEffect(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            direction: 'DESC',
            orderBy: 'id'
        }
        setIsLoading(true)
        makeRequest({ url: '/products', params: params })
            .then(response => setProductResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage])

    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    return (
        <div className="admin-products-list">
            <button className="btn btn-primary btn-lg text-white" onClick={handleCreate}>
                ADICIONAR
            </button>
            <div className='admin-list-container'>
                {isLoading ? <ProductCardLoader /> : productResponse?.content.map(product => (
                                <Card product={product}  key={product.id}/>
                        ))}
            </div>
            {productResponse && <Pagination
                totalPages={productResponse.totalPages}
                activePage={activePage}
                onChange={page => setActivePage(page)}
            />}
        </div>
    )
}

export default List;