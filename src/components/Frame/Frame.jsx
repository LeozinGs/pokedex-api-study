import './styles.css';

const Frame = ({ children }) => {
    return (
        <div className="frame">
            {children}
        </div>
    );
}

export default Frame;