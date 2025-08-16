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
            const commandsResponse = await fetch(`/wp-json/typing-game/v1/commands/${category.slug}`);
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
        <div className="flex gap-2 mb-4">
          {Object.entries(categories).map(([key, category]) => {
            if (key !== "none") {
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`min-w-[100px] text-sm font-bold py-3 px-6 rounded-lg transition-colors duration-200 ${
                    selectedCategory === key
                      ? "bg-green-500 text-white border-2 border-green-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:border-gray-400"
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
                  <input
                    type="text"
                    className={`text-2xl p-4 border-2 rounded-lg w-full bg-transparent text-transparent
                    focus:outline-none focus:ring-2 focus:ring-blue-300
                    ${
                      inputStatus === "miss"
                        ? "focus:ring-red-300 focus:ring-3"
                        : inputStatus === "correct"
                        ? "focus:ring-green-300 focus:ring-3"
                        : ""
                    }`}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    readOnly
                  />
                  <div className="absolute inset-0 text-2xl p-4 tracking-widest pointer-events-none">
                    <span className="text-green-500 bg-green-50 pl-1">
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
