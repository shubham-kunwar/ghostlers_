import React from "react";

export default function ThirdwebGuideFooter() {
    const url = "https://anasah.io/";
    return (
        <>
            <div
                style={{
                    position: "fixed",
                    bottom: -120,
                    right: -80,
                    height: 300,
                    width: 150,
                    border: "1px solid #eaeaea",
                    transform: "rotate(45deg)",
                    backgroundColor: " #000000",
                    cursor: "pointer",
                }}
                role="button"
                onClick={() => window.open(url, "_blank")}
            />

            <div
                style={{
                    position: "fixed",
                    bottom: 14,
                    right: 18,
                }}
            >
                <img
                    src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg"
                    width={40}
                    height={40}
                    role="button"
                    style={{ cursor: "pointer" }}
                    onClick={() => window.open(url, "_blank")}
                />
            </div>
        </>
    );
}



