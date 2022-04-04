import './styles.scss';
import { useHistory } from 'react-router-dom';
import Card from '../Card';
import { useCallback, useEffect, useState } from 'react';
import { makeRequest } from 'core/utils/request';
import { Category, ProductsResponse } from 'core/types/Product';
import Pagination from 'core/components/Pagination';
import { toast } from 'react-toastify';
import CardLoader from '../Loaders/ProductCardLoader';
import ProductFilters from 'core/components/ProductFilters';

const List = () => {
    const history = useHistory();
    const [productResponse, setProductResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [name,SetName] = useState('');
    const [category,setCategory] = useState<Category>();

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            name: name,
            categoryId: category?.id,
            direction: 'DESC',
            orderBy: 'id'
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
        <div className="admin-products-list">
            <div className='admin-product-btn-filter'>
                <button className="admin-product-btn btn btn-primary btn-lg text-white" onClick={handleCreate}>
                    ADICIONAR
                </button>
                <ProductFilters 
                name={name}
                category={category}
                handleChangeCategory={handleChangeCategory}
                handleChangeName={handleChangeName}
                clearFilters={clearFilters}
                />
            </div>
            <div className='admin-list-container'>
                {isLoading ? <CardLoader /> :
                    productResponse?.content.map(product => (
                        <Card product={product} key={product.id} onRemove={onRemove} />
                    ))}
            </div>
            {productResponse && <Pagination
                totalPages={productResponse.totalPages}
                onChange={page => setActivePage(page)}
            />}
        </div>
    )
}

export default List;