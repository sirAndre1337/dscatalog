import './styles.scss';
import { useHistory } from 'react-router-dom';
import Card from '../Card';
import { useCallback, useEffect, useState } from 'react';
import { makeRequest } from 'core/utils/request';
import { ProductsResponse } from 'core/types/Product';
import ProductCardLoader from 'pages/Catalog/components/Loaders/ProductCardLoader';
import Pagination from 'core/components/Pagination';
import { toast } from 'react-toastify';

const List = () => {
    const history = useHistory();
    const [productResponse, setProductResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    const getProducts = useCallback(() => {
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

    useEffect(() => {
        getProducts();
    }, [getProducts])

    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    const onRemove = (productId: number) => {
        const confirm = window.confirm('Deseja realmente excluir este produto?');

        if (confirm) {
            makeRequest({ url: `/products/${productId}`, method: 'DELETE' }, 'headerPadrao')
                .then(() => {
                    toast.info('Produto removido com sucesso!');
                    getProducts();
                }).catch(() => {
                    toast.error('Error ao remover o produto');
                })
        }
    }

    return (
        <div className="admin-products-list">
            <button className="btn btn-primary btn-lg text-white" onClick={handleCreate}>
                ADICIONAR
            </button>
            <div className='admin-list-container'>
                {isLoading ? <ProductCardLoader /> : productResponse?.content.map(product => (
                    <Card product={product} key={product.id} onRemove={onRemove} />
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