import { SearchIcon, } from "./Utils";

export default function SidebarSearch({isDarkTab}){
    return(
        <div
            className="d-flex justify-content-center align-items-center px-2"
            style={{
                backgroundColor: isDarkTab ? "rgba(43, 52, 59, 0.3)" : "rgba(215, 217, 224, 0.3)",
                borderRadius: "7px",
            }}
        >
            <SearchIcon isDarkTab={isDarkTab} />
            <input
                className="w-100 px-3 py-1"
                type="text"
                placeholder="Search"
                style={{
                    backgroundColor: isDarkTab ? "rgba(43, 52, 59, 0)" : "rgba(215, 217, 224, 0)",
                    color: isDarkTab ? "rgb(215, 217, 224)" : "rgb(43, 52, 59)",
                    border: "none",
                    outline: "none",
                }}
            />
        </div>
    )
}
