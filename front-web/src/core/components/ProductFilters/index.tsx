import './styles.scss';
import { ReactComponent as SearchIcon } from 'core/assets/images/search-icon.svg';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { makeRequest } from 'core/utils/request';
import { Category } from 'core/types/Product';

export type FilterForm = {
    name?: string;
    categoryId?: number;
}

type Props = {
    onSearch: (filter: FilterForm) => void;
}

const ProductFilters = ({ onSearch } : Props) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [name,SetName] = useState('');
    const [category,setCategory] = useState<Category>();
    console.log(category);
    

    useEffect(() => {
        setIsLoadingCategories(true)
        makeRequest({ url: '/categories' })
            .then(response => { setCategories(response.data.content) })
            .finally(() => setIsLoadingCategories(false));
    }, [])

    const handleChangeName = (name: string) => {
        SetName(name);
        onSearch({ name, categoryId: category?.id })
    }

    const handleChangeCategory = (category: Category) => {
        setCategory(category);
        onSearch({ name, categoryId: category?.id })
    }

    const clearFilters = () => {
        SetName('');
        setCategory(undefined);
        onSearch({ name: '', categoryId: undefined })
    }

    return (
        <div className="card-base product-filters-container">
            <div className='input-search'>
                <input
                    value={name}
                    type="text"
                    className='form-control'
                    placeholder='Pesquisar Produto'
                    onChange={event => handleChangeName(event.target.value)}
                />
                <SearchIcon />
            </div>
            <Select
                key={`select-${category?.id}`}
                value={category}
                isLoading={isLoadingCategories}
                getOptionLabel={(option: Category) => option.name}
                getOptionValue={(option: Category) => String(option.id)}
                options={categories}
                placeholder="Categorias"
                className='filter-select-container'
                classNamePrefix="product-categories-select"
                onChange={value => handleChangeCategory(value as Category)}
                isClearable
            />
            <button
                className='btn btn-edit border-radius-10'
                onClick={clearFilters}
            >
                LIMPAR FILTRO
            </button>
        </div>
    )
}

export default ProductFilters; 