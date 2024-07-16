import './App.css'
import {FadingContainer, useSearchParam} from "../../pat-web-utils/src";
import {useCallback, useState} from "react";

const initialRows = []
for (let i = 1; i < 10; i++) {
    initialRows.push(i)
}

function App() {
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

    const [field1, setField1] = useSearchParam<number>("field1", 0);
    const [field2, setField2] = useSearchParam<string>("field2", "");
    const [field3, setField3] = useSearchParam<boolean>("field3", false);

    return <div className="w-full text-left">
        <div className="mx-auto w-full max-w-2xl flex flex-col gap-8 mt-8">
            <div className="flex-grow h-[500px] bg-gray-200 rounded-3xl overflow-hidden">
                <FadingContainer
                    className="w-full h-full"
                    innerCls="p-8 py-[50px] text-xl"
                    fade={100}
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

            <div className="bg-gray-200 rounded-3xl flex gap-5 items-center p-8 whitespace-nowrap">
                <div className="flex gap-2 items-center flex-nowrap">
                    <span>
                        ?field1=
                    </span>
                    <input
                        type="number"
                        value={field1}
                        onChange={e => setField1(parseFloat(e.target.value))}
                    />
                </div>

                <div className="flex gap-2 items-center flex-nowrap">
                    <span>
                        ?field2=
                    </span>
                    <input
                        type="text"
                        value={field2}
                        onChange={e => setField2(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 items-center flex-nowrap">
                    <span>
                        ?field3=
                    </span>
                    <input
                        type="checkbox"
                        className="w-5 h-5"
                        checked={field3}
                        onChange={e => setField3(e.target.checked)}
                    />
                </div>
            </div>
        </div>

    </div>
}

export default App
