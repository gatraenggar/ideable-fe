import { LightLeftArrow, DarkLeftArrow } from "../Utils";
import IdeableLogo from "../../../Assets/ideable-logo.svg";
import IdeableLogoLight from "../../../Assets/ideable-logo-light.svg";

export default function SidebarHeader({isDarkTab, showTab, setShowTab}){
    return(
        <div className="d-flex justify-content-between align-items-center px-2 py-3">
            <div>
                <img src={isDarkTab ? IdeableLogoLight : IdeableLogo} alt="Ideable Logo" width="42px" />
            </div>

            <div className="d-flex">
                <div onClick={() => setShowTab(!showTab)}>
                    {isDarkTab ? <LightLeftArrow /> : <DarkLeftArrow />}
                </div>
            </div>
        </div>
    )
}
