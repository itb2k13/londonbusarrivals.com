
function Button(props) {

    const { value, ...rest } = props;

    return (

        <button {...rest} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {value}
        </button>

    );
}

export default Button;
