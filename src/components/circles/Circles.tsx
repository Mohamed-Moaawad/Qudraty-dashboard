import './Circles.css';


type TCircleType = {
    sm: string;
    smText: string;
    md: string;
    mdText: string;
    lg: string;
    lgText: string;
}

const Circles = ({ sm, md, lg, smText, mdText, lgText }: TCircleType) => {
    return (
        <div className="all-circles">
            <div className="circle sm-circle">
                <div className="num">
                    <h5>{sm}%</h5>
                    <span>{smText}</span>
                </div>
            </div>
            <div className="circle lg-circle">
                <div className="num">
                    <h5>{md}%</h5>
                    <span>{mdText}</span>
                </div>
            </div>
            <div className="circle md-circle">
                <div className="num">
                    <h5>{lg}%</h5>
                    <span>{lgText}</span>
                </div>
            </div>
        </div>
    );
};

export default Circles;