import GridScan from './GridScan';
import Header from '../Header';
import PortalOverlay from './PortailOverlay';   


export default function ArPage() {
    return (
        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
            <Header />
            <GridScan
                sensitivity={0.55}
                lineThickness={1}
                linesColor="#1E1E1E"
                gridScale={0.05}
                scanColor="#f8bc23"
                scanOpacity={0.1}
                enablePost
                bloomIntensity={1}
                chromaticAberration={0.002}
                noiseIntensity={0.01}
            />
            
            <PortalOverlay />
        </div>
    );
}