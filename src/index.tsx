import { createRoot } from "react-dom/client";
import React, { useEffect, useState, KeyboardEvent } from "react";
import { Clock, Play, RotateCcw } from "lucide-react";
import "./style.css";

// WordPressのREST APIの型定義
declare global {
  interface Window {
    typingGameAPI: {
      categoriesUrl: string;
      commandsBaseUrl: string;
    };
  }
}

// カテゴリーごとのイメージカラーを定義
const getCategoryColor = (slug: string): { bg: string; text: string; selectedBg: string; selectedText: string } => {
  const colorMap: { [key: string]: { bg: string; text: string; selectedBg: string; selectedText: string } } = {
    'git': { bg: 'bg-orange-100', text: 'text-orange-700', selectedBg: 'bg-orange-500', selectedText: 'text-white' },
    'docker': { bg: 'bg-blue-100', text: 'text-blue-700', selectedBg: 'bg-blue-500', selectedText: 'text-white' },
    'ssh': { bg: 'bg-gray-100', text: 'text-gray-700', selectedBg: 'bg-gray-500', selectedText: 'text-white' },
    'powershell': { bg: 'bg-indigo-100', text: 'text-indigo-700', selectedBg: 'bg-indigo-500', selectedText: 'text-white' },
    'curl': { bg: 'bg-green-100', text: 'text-green-700', selectedBg: 'bg-green-500', selectedText: 'text-white' },
    'javascript': { bg: 'bg-yellow-100', text: 'text-yellow-700', selectedBg: 'bg-yellow-500', selectedText: 'text-white' },
    'cmd': { bg: 'bg-slate-100', text: 'text-slate-700', selectedBg: 'bg-slate-500', selectedText: 'text-white' },
    'prompt-engineering': { bg: 'bg-purple-100', text: 'text-purple-700', selectedBg: 'bg-purple-500', selectedText: 'text-white' },
    'sql': { bg: 'bg-cyan-100', text: 'text-cyan-700', selectedBg: 'bg-cyan-500', selectedText: 'text-white' },
    'es2015': { bg: 'bg-amber-100', text: 'text-amber-700', selectedBg: 'bg-amber-500', selectedText: 'text-white' },
    'laravel': { bg: 'bg-red-100', text: 'text-red-700', selectedBg: 'bg-red-500', selectedText: 'text-white' },
  };

  // 既知のカテゴリーの場合はその色を返す
  if (colorMap[slug]) {
    return colorMap[slug];
  }

  // 新しいカテゴリーの場合はslugからハッシュを生成して色を割り当て
  const colors = [
    { bg: 'bg-pink-100', text: 'text-pink-700', selectedBg: 'bg-pink-500', selectedText: 'text-white' },
    { bg: 'bg-teal-100', text: 'text-teal-700', selectedBg: 'bg-teal-500', selectedText: 'text-white' },
    { bg: 'bg-lime-100', text: 'text-lime-700', selectedBg: 'bg-lime-500', selectedText: 'text-white' },
    { bg: 'bg-emerald-100', text: 'text-emerald-700', selectedBg: 'bg-emerald-500', selectedText: 'text-white' },
    { bg: 'bg-violet-100', text: 'text-violet-700', selectedBg: 'bg-violet-500', selectedText: 'text-white' },
    { bg: 'bg-fuchsia-100', text: 'text-fuchsia-700', selectedBg: 'bg-fuchsia-500', selectedText: 'text-white' },
    { bg: 'bg-rose-100', text: 'text-rose-700', selectedBg: 'bg-rose-500', selectedText: 'text-white' },
    { bg: 'bg-sky-100', text: 'text-sky-700', selectedBg: 'bg-sky-500', selectedText: 'text-white' },
  ];

  // slugからハッシュ値を生成
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const App: React.FC = () => {
  type WordEntry = {
    command: string;
    description: string;
  };

  const [categories, setCategories] = useState<{[key: string]: {name: string, data: WordEntry[]}}>({
    none: {
      name: "None",
      data: [] as WordEntry[],
    },
  });

  const defaultTime = 120;

  /* 状態管理 */
  const [selectedCategory, setSelectedCategory] = useState<string>("none");
  const [gameStatus, setGameStatus] = useState<"ready" | "playing" | "end">("ready");
  const [shuffledList, setShuffledList] = useState<WordEntry[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [inputStatus, setInputStatus] = useState<"normal" | "miss" | "correct">("normal");
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [score, setScore] = useState(0);
  const [missCount, setMissCount] = useState(0);

  // WordPressのREST APIからカテゴリとコマンドを取得
  useEffect(() => {
    const loadCategories = async () => {
      try {
        // カテゴリ一覧を取得
        const categoriesResponse = await fetch(window.typingGameAPI.categoriesUrl);
        const categoriesData = await categoriesResponse.json();

        const newCategories: {[key: string]: {name: string, data: WordEntry[]}} = {
          none: { name: "None", data: [] },
        };

        // 各カテゴリのコマンドを取得
        for (const category of categoriesData) {
          try {
            const commandsResponse = await fetch(`${window.typingGameAPI.commandsBaseUrl}${category.slug}`);
            const commandsData = await commandsResponse.json();
            
            newCategories[category.slug] = {
              name: category.name,
              data: commandsData,
            };
          } catch (error) {
            console.error(`Error loading commands for ${category.slug}:`, error);
            newCategories[category.slug] = {
              name: category.name,
              data: [],
            };
          }
        }

        setCategories(newCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    loadCategories();
  }, []);

  // ゲーム開始
  const startGame = () => {
    if (selectedCategory === "none" || !categories[selectedCategory]?.data.length) {
      return;
    }
    if (shuffledList.length === 0) {
      const selectedCategoryList = categories[selectedCategory].data;
      const shuffledList = shuffleList(selectedCategoryList);
      setShuffledList(shuffledList);
    }
    setGameStatus("playing");
  };

  // ゲームリセット
  const resetGame = (gameStatus: "ready" | "playing" | "end" = "ready", selectedCategory: string = "none") => {
    setGameStatus(gameStatus);
    setCurrentWordIndex(0);
    setShuffledList([]);
    setTyped("");
    setTimeLeft(defaultTime);
    if (gameStatus === "ready") {
      setScore(0);
      setMissCount(0);
      setSelectedCategory(selectedCategory);
    }
  };

  /**
   * @param list - シャッフル対象のWordEntry配列
   * @returns シャッフルされた新しいWordEntry配列
   * @description
   * Fisher-Yatesアルゴリズムを使用して配列をシャッフルします。
   * このアルゴリズムは、各要素が等確率で選択される公平なシャッフルを保証します。
   * 元の配列を変更せず、新しい配列を返します。
   */
  const shuffleList = (list: WordEntry[]): WordEntry[] => {
    const array = [...list];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // カテゴリー変更
  useEffect(() => {
    resetGame("ready", selectedCategory);
    if (selectedCategory !== "none" && categories[selectedCategory]?.data) {
      const selectedCategoryList = categories[selectedCategory].data;
      const shuffledList = shuffleList(selectedCategoryList);
      setShuffledList(shuffledList);
    }
  }, [selectedCategory, categories]);

  const currentWord = shuffledList[currentWordIndex];
  // console.log("shuffledList", shuffledList);
  console.log(
    "shuffledList commands:",
    shuffledList.map((item) => `${item.command} - ${item.description}`)
  );
  console.log("currentWord", currentWord);
  console.log("currentWordIndex", currentWordIndex);
  const currentCommand = currentWord?.command || "";
  const currentDescription = currentWord?.description || "";

  // キー入力
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // スペースキーのスクロールを防ぐ
    if (e.key === " ") {
      e.preventDefault();
    }

    // シフトキーは無視
    if (e.key === "Shift") {
      return;
    }

    // SQLカテゴリの場合は大文字小文字を無視
    // const isSqlCategory = selectedCategory === 'sql';
    // const expectedChar = currentCommand[typed.length];
    // const isCorrect = isSqlCategory 
    //   ? e.key.toLowerCase() === expectedChar.toLowerCase()
    //   : e.key === expectedChar;

    // if (isCorrect) {
    if (e.key === currentCommand[typed.length]) {
      const newTyped = typed + e.key;
      setTyped(newTyped);
      setScore((prev) => prev + 1); // TODO: 調節

      // 単語完成時
      if (newTyped.length === currentCommand.length) {
        setCurrentWordIndex(currentWordIndex + 1);
        setTyped("");
        setScore((prev) => prev + 5); // TODO: 調節
        setInputStatus("correct");
        setTimeout(() => {
          setInputStatus("normal");
        }, 500);

        if (currentWordIndex === shuffledList.length - 1) {
          // 同じカテゴリーの再シャッフルした内容を追加
          const selectedCategoryList = categories[selectedCategory].data;
          const newShuffledList = shuffleList(selectedCategoryList);
          setShuffledList(prev => [...prev, ...newShuffledList]);
        }
      }
      // ミスタイピング
    } else {
      setScore((prev) => Math.max(prev - 2, 0)); // TODO: 調節
      setMissCount((prev) => prev + 1); // TODO: 調節
      setInputStatus("miss");
      setTimeout(() => {
        setInputStatus("normal");
      }, 500);
    }
  };

  // タイマー
  useEffect(() => {
    if (gameStatus === "playing") {
      const timer = setInterval(() => {
        // 関数型更新で最新の値を確実に取得
        setTimeLeft((prevTime) => {
          // 時間が0になったらゲーム終了処理も可能
          if (prevTime <= 1) {
            resetGame("end"); // ゲーム終了
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStatus]);

  return (
    <>
      <p className="text-2xl font-bold mb-4">プログラミングタイピングゲーム</p>
      <div className="typing-game min-h-[60vh] border-2 border-gray-300 p-4 flex flex-col">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-2 mb-4">
          {Object.entries(categories).map(([key, category]) => {
            if (key !== "none") {
              const colors = getCategoryColor(key);
              const isSelected = selectedCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`h-[3rem] px-2 py-2 text-sm font-medium text-center whitespace-normal leading-tight rounded shadow-sm hover:shadow active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer ${
                    isSelected
                      ? `${colors.selectedBg} ${colors.selectedText} shadow-md`
                      : `${colors.bg} ${colors.text}`
                  }`}
                >
                  {category.name}
                </button>
              );
            }
          })}
        </div>
        <div className="flex justify-between items-center mb-8">
          <div className="min-w-[200px] flex gap-2 items-center justify-start gap-2">
            <span className="text-sm text-gray-500">Score</span>
            <span className="font-bold text-2xl">{score}</span>
            <span className="ml-2 text-sm text-gray-500">Miss</span>
            <span className="font-bold text-2xl">{missCount}</span>
          </div>
          <div className="text-lg font-bold flex items-end justify-between gap-2">
            <span className="flex items-center gap-2">
              <Clock className="inline-block w-5 h-5" /> Left Time
            </span>
            <span className="text-2xl">{timeLeft}</span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          {gameStatus === "ready" && (
            <div className="flex flex-col items-center gap-4">
              <p className="text-xl">
                {selectedCategory === "none"
                  ? "カテゴリーを選択してください"
                  : <><span className="font-bold text-2xl">{categories[selectedCategory]?.name}</span>で開始します</>}
              </p>

              <button
                onClick={startGame}
                className={`font-bold text-white py-4 px-8 rounded-lg transition-colors duration-200 flex items-center gap-2 mb-4
                ${selectedCategory === "none" || !categories[selectedCategory]?.data.length
                  ? "bg-gray-200 hover:shadow-none cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                <Play className="w-5 h-5" />
                Start Game
              </button>
            </div>
          )}
          {gameStatus === "playing" && (
            <div className="w-full">
              {/* 説明 */}
              <div className="text-md text-gray-500 tracking-widest mb-4 min-h-20 flex items-end">
                {currentDescription}
              </div>
              {/* 入力エリア */}
              {currentWord && (
                <div className="relative">
                  <div
                    style={{
                      fontFamily: 'monospace',
                    }}
                    className={`text-2xl p-4 border-2 rounded-lg w-full bg-white min-h-[60px] flex items-center
                    focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-300
                    ${
                      inputStatus === "miss"
                        ? "focus-within:ring-red-300 focus-within:ring-3"
                        : inputStatus === "correct"
                        ? "focus-within:ring-green-300 focus-within:ring-3"
                        : ""
                    }`}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                  >
                    <span className="text-green-500 bg-green-50 px-1">
                      {typed}
                    </span>
                    <span className="text-gray-500">
                      {currentCommand.slice(typed.length)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
          {gameStatus === "end" && (
            <div className="flex flex-col items-center gap-4">
              <div className="text-2xl font-bold flex items-center gap-2">
                <span>Score  {score}</span>
                <span>Miss  {missCount}</span>
              </div>
              <button
                onClick={() => resetGame()}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center gap-2 mb-4"
              >
                <RotateCcw className="w-5 h-5" />
                Retry Game
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const appElement = document.getElementById("react-root");
if (appElement) {
  /**
   * @see https://ja.react.dev/reference/react-dom/client/createRoot
   * React管理下のDOMを更新するためにcreateRootを使用する
   */
  const root = createRoot(appElement);
  root.render(<App />);
}
