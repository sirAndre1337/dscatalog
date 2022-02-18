import ProductPrice from 'core/components/ProductPrice';
import { Product } from 'core/types/Product';
import { Link } from 'react-router-dom';
import './styles.scss';

type Props = {
    product: Product
    onRemove: (productId: number) => void;
}

const Card = ({ product, onRemove }: Props) => {

    return (
        <div className="card-base product-card-admin">
            <div className='row'>
                <div className='col-2 product-card-image-container'>
                    <img src={product.imgUrl}
                        alt={product.name}
                        className='product-card-image-admin' />
                </div>
                <div className='col-7 py-3'>
                    <h3 className='product-card-name-admin'>
                        {product.name}
                    </h3>
                    <ProductPrice price={product.price} />
                    <div>
                        {product.categories.map(cat => (
                            <span className="badge-category" key={cat.id}>
                                {cat.name}
                            </span>
                        ))}
                    </div>
                </div>
                <div className='col-3 pt-3 px-5'>
                    <Link
                        to={`/admin/products/${product.id}`}
                        type="button"
                        className="btn btn-edit border-radius-10 d-block w-100 mb-3"
                    >
                        EDITAR
                    </Link>
                    <button
                        type="button"
                        className="btn outline-danger border-radius-10 d-block w-100"
                        onClick={() => onRemove(product.id)}
                    >
                        EXCLUIR
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card;