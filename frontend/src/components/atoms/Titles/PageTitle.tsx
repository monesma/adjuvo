import ScreenSize from "../../../helpers/ScreenSize";

export default function PageTitle({children}: {children: string}) {
    const screenW: number = ScreenSize().width;

    return (
        <div style={{
            fontSize: screenW > 768 ? '32px' : "24px",
            fontWeight: '600',
            marginBottom: 24,
            position: 'relative',
            textAlign: 'center',
            width: '100%',
            textTransform: "uppercase"
        }}>
            <p style={{ 
                margin: 0,
                paddingBottom: 8,
                opacity: 0.9,
                display: 'inline-block'
            }}>{children}</p>
        </div>
    )
}
