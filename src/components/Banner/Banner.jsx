import './styles.css';

const Banner = ({ image, children }) => {
    return (
        <div className='banner overlay'>
            <img className='logo' src={image} alt='Logo da página' />
            {children}
        </div>
    );
}

export default Banner;