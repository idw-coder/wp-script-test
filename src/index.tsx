import { createRoot } from "react-dom/client";
import React, { useEffect, useState, KeyboardEvent } from "react";
import { Play } from "lucide-react";
import "./style.css";
import gitCommands from "./words/git_commands.json";
import dockerCommands from "./words/docker_commands.json";

const App: React.FC = () => {
  type WordEntry = {
    command: string;
    description: string;
  };

  const categories = {
    git: {
      name: "Git",
      data: gitCommands as WordEntry[],
    },
    docker: {
      name: "Docker",
      data: dockerCommands as WordEntry[],
    },
  };

  /* 状態管理 */
  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof categories>("git"); // カテゴリー
  const [gameStarted, setGameStarted] = useState(false); // ゲーム開始フラグ
  const [shuffledList, setShuffledList] = useState<WordEntry[]>([]); // シャッフルされたリスト
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // 現在の単語のインデックス
  const [typed, setTyped] = useState(""); // どの文字まで正しくタイプされたか
  const [inputStatus, setInputStatus] = useState<"normal" | "miss" | "correct">(
    "normal"
  ); // 入力状態
  const [timeLeft, setTimeLeft] = useState(20); // 残り時間

  // ゲーム開始
  const startGame = () => {
    if (shuffledList.length === 0) {
      const selectedCategoryList = categories[selectedCategory].data;
      const shuffledList = shuffleList(selectedCategoryList);
      setShuffledList(shuffledList);
    }
    setGameStarted(true);
  };

  // ゲームリセット
  const resetGame = () => {
    setGameStarted(false);
    setCurrentWordIndex(0);
    setShuffledList([]);
    setTyped("");
    setTimeLeft(20);
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
    const selectedCategoryList = categories[selectedCategory].data;
    const shuffledList = shuffleList(selectedCategoryList);
    setShuffledList(shuffledList);
    resetGame();
  }, [selectedCategory]);

  const currentWord = shuffledList[currentWordIndex];
  // console.log("shuffledList", shuffledList);
  console.log("shuffledList commands:", shuffledList.map(item => `${item.command} - ${item.description}`));
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

      // newTyped を使用して最後の文字の入力時に判定
      if (newTyped.length === currentCommand.length) {
        setCurrentWordIndex(currentWordIndex + 1);
        setTyped("");
        setInputStatus("correct");
        setTimeout(() => {
          setInputStatus("normal");
        }, 500);
      }
      // ミスタイピング
    } else {
      setInputStatus("miss");
      setTimeout(() => {
        setInputStatus("normal");
      }, 500);
    }
  };

  // 改善されたタイマー実装
  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        // 関数型更新で最新の値を確実に取得
        setTimeLeft((prevTime) => {
          // 時間が0になったらゲーム終了処理も可能
          if (prevTime <= 1) {
            resetGame(); // ゲーム終了
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted]); // timeLeftを依存配列から除去

  return (
    <>
      <div className="typing-game min-h-[60vh] border-2 border-gray-300 p-4">
        <p className="mb-4">カテゴリーを選択してください</p>
        <div className="flex gap-2 mb-4">
          {Object.entries(categories).map(([key, category]) => {
            return (
              <button
                key={key}
                onClick={() =>
                  setSelectedCategory(key as keyof typeof categories)
                }
                className={`text-sm font-bold py-3 px-6 rounded-lg transition-colors duration-200 ${
                  selectedCategory === key
                    ? "bg-green-500 text-white border-2 border-green-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:border-gray-400"
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
        <div className="flex justify-between items-center mb-8">
          <div className="bg-gray-200 px-6 py-2 rounded-full min-w-[200px] text-center">
            {selectedCategory}
          </div>
          <div className="text-lg font-bold flex items-center justify-between gap-2">
            <span>Left Time</span>
            <span>{timeLeft}</span>
          </div>
        </div>

        {!gameStarted ? (
          <button
            onClick={startGame}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center gap-2 mb-4"
          >
            <Play className="w-5 h-5" />
            Start Game
          </button>
        ) : (
          <>
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
          </>
        )}
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
