import { ImageResponse } from "next/server";

export const runtime = "edge";

export const size = {
    width: 32,
    height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 28,
                    background: "#000",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#22C55E",
                    borderRadius: "5px",
                }}
            >
                M
            </div>
        ),
        {
            ...size,
        },
    );
}
