import { useState } from "react";

const getWords = (text: string): string[] => {
  const cleanText = text.replace(/[.,;:!?"'¡¿]/g, "").toLowerCase();
  const words = cleanText.match(/[a-záéíóúüñ]+/g) || [];

  return words;
};

function getWordCounts(text: string, count: number) {
  const words = getWords(text);
  const result: Record<string, number> = {};

  for (let i = 0; i <= words.length - count; i++) {
    const key = words.slice(i, i + count).join(" ");
    result[key] = (result[key] || 0) + 1;
  }

  const values = Object.entries(result);

  values.sort(([, countA], [, countB]) => countB - countA);

  return values;
}

function getTotalCounts(text: string) {
  const words = getWords(text);
  return words.length;
}

function App() {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(1);

  const wordCounts = getWordCounts(text, wordCount);
  const totalCount = getTotalCounts(text);

  return (
    <div className="bg-gray-50 w-full py-6 px-10 flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Word Counter</h1>
      <div className="w-full flex gap-2">
        <div className="w-2/3 ">
          <textarea
            placeholder="Paste your text here..."
            className="h-[calc(100vh-100px)] mt-2 text-sm block w-full rounded-lg border-0 py-4 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-gray-300 focus:ring-inset"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <div className="flex-1 flex flex-col gap-2 pl-2">
          <select
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-gray-500 focus:ring-inset"
            value={wordCount}
            onChange={(e) => setWordCount(+e.target.value)}
          >
            <option value={1}>1 word</option>
            <option value={2}>2 words</option>
            <option value={3}>3 words</option>
            <option value={4}>4 words</option>
            <option value={5}>5 words</option>
            <option value={6}>6 words</option>
            <option value={7}>7 words</option>
            <option value={8}>8 words</option>
            <option value={9}>9 words</option>
            <option value={10}>10 words</option>
          </select>
          <h2 className="text-md font-medium mt-2">Total Count: {totalCount}</h2>

          <div className="h-[calc(100vh-185px)] overflow-y-auto border rounded p-3 bg-white">
            <table>
              {wordCounts.map(([word, count], index) => (
                <tr key={index} className="text-xs">
                  <td align="right">{count} -</td>
                  <td>{word}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
