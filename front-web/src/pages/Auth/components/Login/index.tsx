import ButtonIcon from 'core/components/ButtonIcon';
import { Link, useHistory } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';
import { useForm } from 'react-hook-form';
import { saveSessionData } from 'core/utils/auth';
import { useState } from 'react';
import { makeLogin } from 'core/utils/request';

type FormData = {
    username: string;
    password: string;
}

const Login = () => {
    
    const { register, handleSubmit, formState: { errors }} = useForm<FormData>();
    const [hasError,setHasError] = useState(false);
    const history = useHistory();

    const onSubmit = (data: FormData) => {
        makeLogin(data , 'login')
        .then(response => {
            setHasError(false);
            saveSessionData(response.data);
            history.push('/admin');
        }).catch(() => {
            setHasError(true);
        });
    }

    return (
        <div>
            <AuthCard title="Login">
                {hasError && (
                    <div className='alert login-error'>
                        Usuário ou senha inválidos!
                    </div>
                )}
                <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                    <div className='margin-bottom-30'>
                    <input
                        type="email"
                        className={`form-control input-base ${errors.username ? 'is-invalid' : ''}`}
                        placeholder='Email'
                       {...register('username' , {required: 'Campo email obrigatório' , pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email inválido"
                      }})}
                    />
                   {errors.username &&
                    <div className='invalid-feedback d-block'>
                        {errors.username.message}
                    </div>}                  
                    </div>
                    <input
                        type="password"
                        className={`form-control input-base ${errors.password ? 'is-invalid' : ''}`}
                        placeholder='Senha'
                        {...register('password' , {required: 'Campo senha obrigatório'})}
                    />
                    {errors.password &&
                    <div className='invalid-feedback d-block'>
                        {errors.password.message}
                    </div>}
                    <Link to="/admin/auth/recover" className='login-link-recover'>
                        Esqueci a senha?
                    </Link>
                    <div className='login-submit'>
                        <ButtonIcon text="Logar" />
                    </div>
                    <div className='text-center'>
                        <span className='not-registered'>
                            Não tem cadastro?
                        </span>
                        <Link to="/admin/auth/register" className='login-link-register'>
                            CADASTRAR
                        </Link>
                    </div>
                </form>
            </AuthCard>
        </div>
    )
}


export default Login;