import ButtonIcon from 'core/components/ButtonIcon';
import { Link } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';
import { useForm } from 'react-hook-form';

type FormData = {
    email: string;
    password: string;
}

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
        // Fazer a chamada a API
    }

    return (
        <div>
            <AuthCard title="Login">
                <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="email"
                        className='form-control input-base margin-bottom-30'
                        placeholder='Email'
                        {...register('email', { required: true })}
                    />
                    {errors.email && <p>email is required.</p>}
                    <input
                        type="password"
                        className='form-control input-base'
                        placeholder='Senha'
                        {...register('password')}
                    />
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