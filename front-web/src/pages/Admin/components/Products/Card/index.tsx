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
                <div className='product-card-image-container border-img'>
                    <img src={product.imgUrl}
                        alt={product.name}
                        className='product-card-image-admin' />
                </div>
                <div className='card-content'>
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
                <div className='buttons-container'>
                    <Link
                        to={`/admin/products/${product.id}`}
                        type="button"
                        className="btn btn-edit border-radius-10 d-block w-100 btn-product"
                    >
                        EDITAR
                    </Link>
                    <button
                        type="button"
                        className="btn outline-danger border-radius-10 d-block w-100 btn-product"
                        onClick={() => onRemove(product.id)}
                    >
                        EXCLUIR
                    </button>
                </div>
        </div>
    )
}

export default Card;