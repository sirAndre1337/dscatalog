import { makeRequest } from 'core/utils/request';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
    name: string;
    price: string;
    category: number;
    description: string;
    imgUrl: string;
}

// https://www.pontofrio-imagens.com.br/Control/ArquivoExibir.aspx?IdArquivo=1377580350
const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormState>();

    const onSubmit = (formData: FormState) => {
        console.log(formData);
        const payload = {
            ...formData,
            categories: [{ id: 1 }]
        }
        makeRequest({ url: '/products', method: 'POST', data: payload }, 'addProduct')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title="CADASTRAR UM PRODUTO">
                <div className='row'>
                    <div className="col-6">
                        <div className='margin-bottom-30'>
                            <input
                                type="text"
                                className={`form-control input-base ${errors.name ? 'is-invalid' : ''}`}
                                placeholder='Nome do produto'
                                {...register('name', {
                                    required: 'Campo nome obrigatório',
                                    minLength: { value: 2, message: 'O Campo deve ter no mínimo 2 caracteres'},
                                    maxLength: { value: 50, message: 'O Campo deve ter no máximo 50 caracteres'}
                                })}
                            />
                            {errors.name &&
                                <div className='invalid-feedback d-block'>
                                    {errors.name.message}
                                </div>}
                        </div>
                        {/* <select
                            value={formData.category}
                            name='category'
                            className='form-control margin-bottom-30 input-base'
                            onChange={handleOnChange}
                        >
                            <option value="1">Livros</option>
                            <option value="2">Eletronicos</option>
                            <option value="3">Computadores</option>
                        </select> */}
                        <div className='margin-bottom-30'>
                            <input
                                type="number"
                                className={`form-control input-base ${errors.price ? 'is-invalid' : ''}`}
                                placeholder='Preço'
                                {...register('price', { required: 'Campo preço obrigatório' })}
                            />
                            {errors.price &&
                                <div className='invalid-feedback d-block'>
                                    {errors.price.message}
                                </div>}
                        </div>
                        <div className='margin-bottom-30'>
                            <input
                                type="text"
                                className={`form-control input-base ${errors.imgUrl ? 'is-invalid' : ''}`}
                                placeholder='Imagem do produto'
                                {...register('imgUrl', { required: 'Campo imagem obrigatório'})}
                            />
                            {errors.imgUrl &&
                                <div className='invalid-feedback d-block'>
                                    {errors.imgUrl.message}
                                </div>}
                        </div>
                    </div>
                    <div className="col-6">
                        <textarea
                            className='form-control input-base h-auto'
                            cols={30}
                            rows={10}
                            placeholder="Descrição"
                            {...register('description')}
                        ></textarea>
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}

export default Form;