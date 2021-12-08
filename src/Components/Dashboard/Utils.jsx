import { useState } from "react";

const MenuIconBar = () => {
    return (
        <div style={{
            width: "25px",
            height: "4px",
            backgroundColor: "rgb(61, 61, 61)",
            margin: "4px 0",
            transition: "0.4s",
        }}></div>
    );
};

export const MenuIcon = () => {
    return (
        <div style={{ display: "inline-block", marginRight: "5px", cursor: "pointer", }}>
            <MenuIconBar />
            <MenuIconBar />
            <MenuIconBar />
        </div>
    );
};

export const SearchIcon = ({ isDarkTab }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={isDarkTab ? "grey" : "currentColor"} className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
    );
};

export const AllWorkspacesIcon = ({ isDarkTab }) => {
    return (
        <div className={`d-flex justify-content-start align-items-center p-1 text-clickable ${isDarkTab ? "dark-ws-icon-hover" : "light-ws-icon-hover"}`} style={{ marginBottom: "6px", fontSize: "1.05em" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill={isDarkTab ? "white" : "grey"} className="bi bi-exclude" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm12 2H5a1 1 0 0 0-1 1v7h7a1 1 0 0 0 1-1V4z" />
            </svg>
            <span className="mx-2"> Everything </span>
        </div>
    );
};

export const DropdownArrowIcon = ({ isDarkTab, isOpen }) => {
    if (isOpen) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill={isDarkTab ? "white" : "grey"} className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
        );
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill={isDarkTab ? "white" : "grey"} className="bi bi-caret-right-fill" viewBox="0 0 16 16">
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
        </svg>
    );
};

export const FolderIcon = ({ folderTitle }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (isOpen) {
        return (
            <div className="d-flex justify-content-start align-items-center text-clickable" onClick={() => setIsOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi bi-folder2-open" viewBox="0 0 16 16">
                    <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z" />
                </svg>
                <span className="mx-2"> {folderTitle} </span>
            </div>
        );
    }
    return (
        <div className="d-flex justify-content-start align-items-center text-clickable" onClick={() => setIsOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi bi-folder-fill" viewBox="0 0 16 16">
                <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
            </svg>
            <span className="mx-2"> {folderTitle} </span>
        </div>
    );
};

export const ListIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi bi-card-list" viewBox="0 0 16 16">
            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
            <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
        </svg>
    );
};

export const LightLeftArrow = () => {
    return (
        <>
            <div style={{
                cursor: "pointer",
                border: `solid #fff`,
                borderWidth: "0 2px 2px 0",
                display: "inline-block",
                padding: "4px",
                transform: "rotate(135deg)",
                WebkitTransform: "rotate(135deg)",
            }}></div>
            <div style={{
                cursor: "pointer",
                border: `solid #fff`,
                borderWidth: "0 2px 2px 0",
                display: "inline-block",
                padding: "4px",
                transform: "rotate(135deg)",
                WebkitTransform: "rotate(135deg)",
            }}></div>
        </>
    );
};

export const DarkLeftArrow = () => {
    return (
        <>
            <div style={{
                cursor: "pointer",
                border: `solid #111`,
                borderWidth: "0 2px 2px 0",
                display: "inline-block",
                padding: "4px",
                transform: "rotate(135deg)",
                WebkitTransform: "rotate(135deg)",
            }}></div>
            <div style={{
                cursor: "pointer",
                border: `solid #111`,
                borderWidth: "0 2px 2px 0",
                display: "inline-block",
                padding: "4px",
                transform: "rotate(135deg)",
                WebkitTransform: "rotate(135deg)",
            }}></div>
        </>
    );
};

export const ToggleSwitch = ({ isDarkTab }) => {
    return (
        <div className="form-check form-switch" style={{ marginTop: "5px" }}>
            <input
                className="form-check-input text-clickable"
                type="checkbox"
                id="flexSwitchCheckDefault"
                defaultChecked={isDarkTab}
            />
        </div>
    );
};

export const UserProfile = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="black" className="bi bi-person-circle" viewBox="0 0 17 17">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
        </svg>
    );
};
