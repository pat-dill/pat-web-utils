import './App.css'
import {FadingContainer} from "../../pat-web-utils/src";

const rows = []
for (let i = 1; i < 100; i++) {
    rows.push(i)
}

function App() {
    return <div className="w-full text-left">
        <div className="mx-auto w-full max-w-lg">
            <div className="w-full h-[500px] bg-gray-200 rounded-3xl overflow-hidden">
                <FadingContainer
                    className="w-full h-full px-8 py-[50px] text-xl"
                    fade={100}
                >
                    {rows.map(i => <div key={i} className="p-5 bg-gray-800 text-white rounded-lg mb-5">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut sagittis libero.
                            Praesent tempor et ligula a auctor. Donec imperdiet leo nec magna sodales, vel tincidunt
                            velit
                            imperdiet. Phasellus ut purus commodo, aliquet eros non, pellentesque erat. Pellentesque
                            quis
                            gravida felis, nec viverra dui. Aenean commodo vel orci vitae fermentum. Curabitur
                            scelerisque
                            sed mauris sed blandit. Maecenas a placerat arcu. Sed ac dapibus orci.
                        </p>
                    </div>)}
                < /FadingContainer>
            </div>
        </div>
    </div>
}

export default App
