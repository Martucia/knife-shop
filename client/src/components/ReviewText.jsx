import { useEffect, useState } from "react";

const ReviewText = (props) => {
    const [text, setText] = useState('')
    const [isOpen, setOpen] = useState(false)
    const [isNecessary, setNecessary] = useState(false)

    useEffect(() => {
        if (props.text.length > 250) {
            sliceText()
            setNecessary(true)
        } else {
            setText(props.text)
        }
    }, [])

    function sliceText() {
        let out = props.text.slice(0, 250);
        out += "...";
        setText(out)
    }


    return (
        <div className="review__inner__text">
            {text}
            <button style={{ display: isNecessary ? 'block' : 'none' }} onClick={() => {
                if (isOpen) {
                    setOpen(false)
                    sliceText();
                } else {
                    setOpen(true)
                    setText(props.text)
                }
            }}>
                {isOpen ? "Скрити" : "Показати все..."}

            </button>
        </div>
    );
}

const Button = () => {

}

export default ReviewText;