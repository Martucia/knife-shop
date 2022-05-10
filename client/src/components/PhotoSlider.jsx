import { useState } from "react"
import i1 from "../images/i1.png"
import i2 from "../images/i2.png"
import i3 from "../images/i3.png"
import i4 from "../images/i4.png"
import i5 from "../images/i5.png"

const PhotoSlider = () => {
    const [mainPhoto, setMainPhoto] = useState(i1)

    const changePhoto = (e) => {
        setMainPhoto(e.target.currentSrc)
    }

    return (
        <div className="swiper">
            <div className="main-photo">
                <img src={mainPhoto} alt="" />
            </div>
            <div className="photo-row">
                <div className="photo" onClick={changePhoto}>
                    <img src={i2} alt="" />
                </div>
                <div className="photo" onClick={changePhoto}>
                    <img src={i3} alt="" />

                </div>
                <div className="photo" onClick={changePhoto}>
                    <img src={i4} alt="" />

                </div>
                <div className="photo" onClick={changePhoto}>
                    <img src={i5} alt="" />

                </div>


            </div>
        </div>
    );
}

export default PhotoSlider;