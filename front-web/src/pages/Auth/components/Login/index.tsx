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
        makeLogin(data)
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
                    <input
                        type="email"
                        className='form-control input-base margin-bottom-30'
                        placeholder='Email'
                       {...register('username' , {required: true})}
                    />
                    {errors.username && <p>email is required.</p>}
                    <input
                        type="password"
                        className='form-control input-base'
                        placeholder='Senha'
                        {...register('password' , {required: true})}
                    />
                    {errors.password && <p>password is required</p>}
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