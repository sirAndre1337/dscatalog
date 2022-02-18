import ProductPrice from 'core/components/ProductPrice';
import './styles.scss';

const Card = () => {
    return (
        <div className="card-base product-card-admin">
           <div className='row'>
            <div className='col-2 product-card-image-container'>
                <img src="https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/6-big.jpg" 
                     alt="pc"
                     className='product-card-image-admin' />
            </div>
            <div className='col-7 py-3'>
                <h3 className='product-card-name-admin'>
                    Computador i7
                </h3>
                <ProductPrice price={40.50} />
                <div>
                <span className="badge-category">Categoria 1</span>
                <span className="badge-category">Categoria 2</span>
                <span className="badge-category">Categoria 3</span>
                </div>
            </div>
            <div className='col-3 pt-3 px-5'>
            <button 
            type="button" 
            className="btn btn-edit border-radius-10 d-block w-100 mb-3"
            >
                EDITAR
            </button>
            <button 
            type="button" 
            className="btn outline-danger border-radius-10 d-block w-100"
            >
                EXCLUIR
            </button>
            </div>
           </div>
        </div>
    )
}

export default Card;