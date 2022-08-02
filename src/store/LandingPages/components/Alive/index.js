import './index.scss';

export const Alive = () => {

    const headerLive = document.getElementById('header-alive')
    
    setInterval(() => {
        headerLive.classList.toggle('pisca')
    }, 500);

}