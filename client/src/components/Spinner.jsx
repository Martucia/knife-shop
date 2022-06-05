import PuffLoader from "react-spinners/PuffLoader"

const Spinner = () => {

    return (
        <div className="spinner">
            <PuffLoader style={{ transform: `translate(-50%, -50%)` }} color="#fff" size={150} />
        </div>

    );
};

export default Spinner;
