import { makeRequest } from 'core/utils/request';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BaseForm from '../../BaseForm';
import Select from 'react-select';
import './styles.scss';
import { Category } from 'core/types/Product';


type FormState = {
    name: string;
    price: string;
    categories: Category[];
    description: string;
    imgUrl: string;
}

type ParamsType = {
    productId: string;
}

// https://www.pontofrio-imagens.com.br/Control/ArquivoExibir.aspx?IdArquivo=1377580350
const Form = () => {
    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<FormState>();
    const history = useHistory();
    const { productId } = useParams<ParamsType>();
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const isEditing = productId !== 'create';

    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/products/${productId}` })
                .then(response => {
                    setValue('name', response.data.name);
                    setValue('price', response.data.price);
                    setValue('imgUrl', response.data.imgUrl);
                    setValue('description', response.data.description);
                    setValue('categories', response.data.categories);
                })
        }
    }, [productId, isEditing, setValue]);

    useEffect(() => {
        setIsLoadingCategories(true)
        makeRequest({ url: '/categories' })
            .then(response => { setCategories(response.data.content) })
            .finally(() => setIsLoadingCategories(false));
    }, [])

    const onSubmit = (formData: FormState) => {
    
        makeRequest({
            url: isEditing ? `/products/${productId}` : '/products',
            method: isEditing ? 'PUT' : 'POST',
            data: formData
        },
            'headerPadrao')
            .then(() => {
                toast.info(isEditing ? 'Produto atualizado com sucesso!' : 'Produto salvo com sucesso!');
                history.push('/admin/products');
            })
            .catch(() => {
                toast.error('Erro ao salvar produto!');
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title={isEditing ? 'Editar produto' : 'Cadastrar um produto'}>
                <div className='row'>
                    <div className="col-6">
                        <div className='margin-bottom-30'>
                            <input
                                type="text"
                                className={`form-control input-base ${errors.name ? 'is-invalid' : ''}`}
                                placeholder='Nome do produto'
                                {...register('name', {
                                    required: 'Campo nome obrigatório',
                                    minLength: { value: 2, message: 'O Campo deve ter no mínimo 2 caracteres' },
                                    maxLength: { value: 50, message: 'O Campo deve ter no máximo 50 caracteres' }
                                })}
                            />
                            {errors.name &&
                                <div className='invalid-feedback d-block'>
                                    {errors.name.message}
                                </div>}
                        </div>
                        <div className='margin-bottom-30'>
                            <Controller
                                rules={{ required : true }}
                                name="categories"
                                control={control}
                                render={({ field }) => 
                                <Select
                                {...field}
                                    isLoading={isLoadingCategories}
                                    isMulti
                                    getOptionLabel={(option: Category) => option.name}
                                    getOptionValue={(option: Category) => String(option.id)}
                                    options={categories}
                                    placeholder="Categorias"
                                    classNamePrefix="categories-select"
                                />}
                            />                        
                            {errors.categories &&
                                <div className='invalid-feedback d-block'>
                                    Campo obrigatório
                                </div>}
                        </div>
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
                                {...register('imgUrl', { required: 'Campo imagem obrigatório' })}
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