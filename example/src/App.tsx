import './App.css'
import {FadingContainer} from "../../pat-web-utils/src";
import colors from "tailwindcss/colors";
import {useState} from "react";

const rows = []
for (let i = 1; i < 100; i++) {
    rows.push(i)
}

function App() {
    const [scrollTop, setScrollTop] = useState(0);

    return <div className="w-full text-left">
        <div className="mx-auto w-full max-w-5xl flex">
            <div className="flex-grow h-[500px] bg-gray-200 rounded-l-3xl overflow-hidden">
                <FadingContainer
                    className="w-full h-full"
                    innerCls="pl-8 py-[50px] text-xl"
                    mode="mask"
                    fade={100}
                    onScroll={(e) => {
                        setScrollTop(e.target.scrollTop);
                    }}
                    scrollTop={scrollTop}
                >
                    {rows.map(i => <div key={i}
                                        className="p-5 bg-gray-800 text-white rounded-l-lg mb-5 border-r border-green-500">
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
                </FadingContainer>
            </div>
            <div className="flex-grow h-[500px] bg-gray-200 rounded-r-3xl overflow-hidden">
                <FadingContainer
                    className="w-full h-full"
                    innerCls="pr-8 py-[50px] text-xl"
                    mode="overlay"
                    overlayColor={colors.gray["200"]}
                    fade={100}
                    onScroll={(e) => {
                        setScrollTop(e.target.scrollTop);
                    }}
                    scrollTop={scrollTop}
                >
                    {rows.map(i => <div key={i} className="p-5 bg-gray-800 text-white rounded-r-lg mb-5">
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
                </FadingContainer>
            </div>
        </div>
    </div>
}

export default App
