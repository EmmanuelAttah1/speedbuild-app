// import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

export const CenterPageSkeleton = (props: { children: React.ReactNode }) => (
    <div
        style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
            gap: "20px",
        }}
    >
        {props.children}
    </div>
)
