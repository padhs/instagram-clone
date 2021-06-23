import React from "react";
import '../App.css'


function Footer(){
    return(
        <div className="footer-links">
            <ul className="footer-class">
                About &bull;
                Help &bull;
                Press &bull;
                API &bull;
                Jobs &bull;
                Privacy &bull;
                Terms &bull;
                Locations &bull;
                Top Accounts &bull;
                Hashtags &bull;
                Language
            </ul>
            <div className="copy-insta">
                <div>
                    <h5>&#169;</h5> {/*copyright symbol*/}
                </div>
                <div className="insta-footer">
                    <h5>2021 INSTAGRAM FROM PADHS</h5>
                </div>
            </div>
        </div>
    )
}


export default Footer