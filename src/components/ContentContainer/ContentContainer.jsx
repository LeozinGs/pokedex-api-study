import './styles.css';

const ContentContainer = ({ children, title }) => {
    return (
        <div className="content-container">
            <h2 className="title">{title}</h2>
            <ul className="content-list">
                {children}
            </ul>
        </div>
    );
}

export default ContentContainer;