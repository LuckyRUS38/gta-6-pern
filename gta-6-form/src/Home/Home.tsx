import {SubmitHandler, useForm} from 'react-hook-form'
import styles from './Home.module.css'
import musicFile from '/music.mp3';
import {useState, useEffect} from 'react';

interface IFormState {
    name: string
    email: string
}

function Home() {
    const { register, handleSubmit, reset } = useForm<IFormState>();
    const [isLoading, setIsLoading] = useState();
    const [isSuccess, setIsSuccess] = useState();
    useEffect(() => {
        const audio = new Audio(musicFile);
        audio.volume = 0.3;
        audio.play();

        audio.removeEventListener('load', audio.play);

        return () => audio.pause();
    }, [])

    const onSubmit: SubmitHandler<IFormState> = (data) => {
        fetch('http://localhost:5000/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response =>
            response.json()
        ).then(data => {
            if(!data) return
            setIsSuccess(true)
            reset()
        }).finally(() => setIsLoading(false));
    }

    return <div className={styles.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
        {isSuccess ? (
        <div className={styles.success}>Форма отправлена!</div>
        ) : (
        <>
            <h1>GTA 6 - Оставь заявку</h1>
            <input type="email" placeholder="Введите Email:" {... register('name')}/>
            <input type="name" placeholder="Введите имя:" {... register('email')}/>
            <button disabled={isLoading}>{isLoading ? 'Загрузка ...' : 'Хочу ГТА!'}</button>
        </>
        )}
        </form>
    </div>
}


export default Home
