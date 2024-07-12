import './App.css'
import {FadingContainer} from "../../pat-web-utils/src";
import colors from "tailwindcss/colors";
import {useCallback, useState} from "react";

const initialRows = []
for (let i = 1; i < 10; i++) {
    initialRows.push(i)
}

function App() {
    const [scrollTop, setScrollTop] = useState(0);

    const [rows, setRows] = useState(initialRows);
    const loadMore = useCallback(() => new Promise<void>((resolve) => {
        setTimeout(() => {
            const newRows = [...rows];
            for (let i = 1; i < 10; i++) {
                newRows.push(i)
            }
            setRows(newRows);
            resolve(null);
        }, Math.random() * 200 + 50);
    }), [rows]);

    return <div className="w-full text-left">
        <div className="mx-auto w-full max-w-2xl flex mt-8">
            <div className="flex-grow h-[500px] bg-gray-200 rounded-3xl overflow-hidden">
                <FadingContainer
                    className="w-full h-full"
                    innerCls="p-8 py-[50px] text-xl"
                    fade={100}
                    onScroll={(v) => {
                        console.log(v);
                    }}
                    scrollTop={scrollTop}
                    loadMore={loadMore}
                >
                    {rows.map((_, idx) => <div key={idx} className="p-5 bg-gray-800 text-white rounded-lg mb-5">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut sagittis libero.
                            Praesent tempor et ligula a auctor. Donec imperdiet leo nec magna sodales, vel tincidunt
                        </p>
                    </div>)}
                </FadingContainer>
            </div>
        </div>
    </div>
}

export default App
