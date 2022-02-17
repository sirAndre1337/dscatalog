import { makeRequest } from 'core/utils/request';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
    name: string;
    price: string;
    category: number;
    description: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const Form = () => {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        price: '',
        category: 1,
        description: ''
    });

    const history = useHistory();

    const handleOnChange = (event: FormEvent) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData,
            imgUrl: 'https://www.pontofrio-imagens.com.br/Control/ArquivoExibir.aspx?IdArquivo=1377580350',
            categories: [{ id: formData.category }]
        }
        makeRequest({ url: '/products', method: 'POST', data: payload } , 'addProduct')
        .then(() => {
            history.push('/products')
        }).catch(() => {
            // history.push('/admin/auth')
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <BaseForm title="CADASTRAR UM PRODUTO">
                <div className='row'>
                    <div className="col-6">
                        <input
                            type="text"
                            value={formData.name}
                            name="name"
                            className='form-control mb-5'
                            onChange={handleOnChange}
                            placeholder='Nome do produto'
                        />
                        <select
                            value={formData.category}
                            name='category'
                            className='form-control mb-5'
                            onChange={handleOnChange}
                        >
                            <option value="1">Livros</option>
                            <option value="2">Eletronicos</option>
                            <option value="3">Computadores</option>
                        </select>
                        <input
                            type="text"
                            value={formData.price}
                            name='price'
                            className='form-control'
                            onChange={handleOnChange}
                            placeholder='Preço'
                        />
                    </div>
                    <div className="col-6">
                        <textarea
                            className='form-control'
                            name="description"
                            value={formData.description}
                            cols={30}
                            rows={10}
                            onChange={handleOnChange}
                        ></textarea>
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}

export default Form;