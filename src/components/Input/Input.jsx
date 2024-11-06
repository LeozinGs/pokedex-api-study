import './styles.css';

const Input = ({ children, getValue, submit }) => {
    return (
        <form className='container' onSubmit={submit}>
            <label htmlFor="input">{children}</label>
            <div className="input_container">
                <input id="input" type="text" className='input' onChange={getValue} />
                <button className='left' onClick={submit}>🔍︎</button>
                <div className='right'> </div>
            </div>
        </form>
    );
}

export default Input;