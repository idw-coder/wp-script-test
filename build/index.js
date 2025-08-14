/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/lucide-react/dist/esm/Icon.js":
/*!****************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/Icon.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Icon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _defaultAttributes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultAttributes.js */ "./node_modules/lucide-react/dist/esm/defaultAttributes.js");
/* harmony import */ var _shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/src/utils.js */ "./node_modules/lucide-react/dist/esm/shared/src/utils.js");
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */





const Icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
    "svg",
    {
      ref,
      ..._defaultAttributes_js__WEBPACK_IMPORTED_MODULE_1__["default"],
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: (0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.mergeClasses)("lucide", className),
      ...!children && !(0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.hasA11yProp)(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);


//# sourceMappingURL=Icon.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/createLucideIcon.js":
/*!****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/createLucideIcon.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createLucideIcon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_src_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/src/utils.js */ "./node_modules/lucide-react/dist/esm/shared/src/utils.js");
/* harmony import */ var _Icon_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icon.js */ "./node_modules/lucide-react/dist/esm/Icon.js");
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */





const createLucideIcon = (iconName, iconNode) => {
  const Component = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(
    ({ className, ...props }, ref) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Icon_js__WEBPACK_IMPORTED_MODULE_2__["default"], {
      ref,
      iconNode,
      className: (0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.mergeClasses)(
        `lucide-${(0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.toKebabCase)((0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.toPascalCase)(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = (0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.toPascalCase)(iconName);
  return Component;
};


//# sourceMappingURL=createLucideIcon.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/defaultAttributes.js":
/*!*****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/defaultAttributes.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ defaultAttributes)
/* harmony export */ });
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};


//# sourceMappingURL=defaultAttributes.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/play.js":
/*!**********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/play.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Play)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
];
const Play = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("play", __iconNode);


//# sourceMappingURL=play.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/shared/src/utils.js":
/*!****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/shared/src/utils.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasA11yProp: () => (/* binding */ hasA11yProp),
/* harmony export */   mergeClasses: () => (/* binding */ mergeClasses),
/* harmony export */   toCamelCase: () => (/* binding */ toCamelCase),
/* harmony export */   toKebabCase: () => (/* binding */ toKebabCase),
/* harmony export */   toPascalCase: () => (/* binding */ toPascalCase)
/* harmony export */ });
/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};


//# sourceMappingURL=utils.js.map


/***/ }),

/***/ "./node_modules/react-dom/client.js":
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var m = __webpack_require__(/*! react-dom */ "react-dom");
if (false) // removed by dead control flow
{} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/play.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _words_git_commands_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./words/git_commands.json */ "./src/words/git_commands.json");
/* harmony import */ var _words_docker_commands_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./words/docker_commands.json */ "./src/words/docker_commands.json");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







const App = () => {
  const categories = {
    git: {
      name: "Git",
      data: _words_git_commands_json__WEBPACK_IMPORTED_MODULE_4__
    },
    docker: {
      name: "Docker",
      data: _words_docker_commands_json__WEBPACK_IMPORTED_MODULE_5__
    }
  };

  /* 状態管理 */
  const [selectedCategory, setSelectedCategory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("git"); // カテゴリー
  const [gameStarted, setGameStarted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false); // ゲーム開始フラグ
  const [shuffledList, setShuffledList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]); // シャッフルされたリスト
  const [currentWordIndex, setCurrentWordIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0); // 現在の単語のインデックス
  const [typed, setTyped] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(""); // どの文字まで正しくタイプされたか
  const [inputStatus, setInputStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("normal"); // 入力状態
  const [timeLeft, setTimeLeft] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(20); // 残り時間

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
  const shuffleList = list => {
    const array = [...list];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // カテゴリー変更
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
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
  const handleKeyDown = e => {
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
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        // 関数型更新で最新の値を確実に取得
        setTimeLeft(prevTime => {
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

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "typing-game min-h-[60vh] border-2 border-gray-300 p-4",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
        className: "mb-4",
        children: "\u30AB\u30C6\u30B4\u30EA\u30FC\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "flex gap-2 mb-4",
        children: Object.entries(categories).map(([key, category]) => {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
            onClick: () => setSelectedCategory(key),
            className: `text-sm font-bold py-3 px-6 rounded-lg transition-colors duration-200 ${selectedCategory === key ? "bg-green-500 text-white border-2 border-green-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:border-gray-400"}`,
            children: category.name
          }, key);
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "flex justify-between items-center mb-8",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "bg-gray-200 px-6 py-2 rounded-full min-w-[200px] text-center",
          children: selectedCategory
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "text-lg font-bold flex items-center justify-between gap-2",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
            children: "Left Time"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
            children: timeLeft
          })]
        })]
      }), !gameStarted ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("button", {
        onClick: startGame,
        className: "bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center gap-2 mb-4",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
          className: "w-5 h-5"
        }), "Start Game"]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "text-md text-gray-500 tracking-widest mb-4 min-h-20 flex items-end",
          children: currentDescription
        }), currentWord && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "relative",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
            type: "text",
            className: `text-2xl p-4 border-2 rounded-lg w-full bg-transparent text-transparent
                    focus:outline-none focus:ring-2 focus:ring-blue-300
                    ${inputStatus === "miss" ? "focus:ring-red-300 focus:ring-3" : inputStatus === "correct" ? "focus:ring-green-300 focus:ring-3" : ""}`,
            onKeyDown: handleKeyDown,
            autoFocus: true,
            readOnly: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "absolute inset-0 text-2xl p-4 tracking-widest pointer-events-none",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              className: "text-green-500 bg-green-50 pl-1",
              children: typed
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              className: "text-gray-500",
              children: currentCommand.slice(typed.length)
            })]
          })]
        })]
      })]
    })
  });
};
const appElement = document.getElementById("react-root");
if (appElement) {
  /**
   * @see https://ja.react.dev/reference/react-dom/client/createRoot
   * React管理下のDOMを更新するためにcreateRootを使用する
   */
  const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_0__.createRoot)(appElement);
  root.render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(App, {}));
}

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/words/docker_commands.json":
/*!****************************************!*\
  !*** ./src/words/docker_commands.json ***!
  \****************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"command":"docker ps","description":"現在実行中のDockerコンテナの一覧を表示します。コンテナID、イメージ名、実行時間、ステータス、ポートマッピングなどの情報が確認できます。"},{"command":"docker run","description":"Dockerイメージから新しいコンテナを作成して実行します。ポートマッピング、環境変数、ボリュームマウントなどのオプションを指定できます。"},{"command":"docker build","description":"DockerfileからDockerイメージをビルドします。-tオプションでタグ名を指定し、コンテキストパスを指定してイメージを作成します。"},{"command":"docker push","description":"ローカルのDockerイメージをDocker Hubやプライベートレジストリなどのリモートリポジトリにアップロードします。"},{"command":"docker pull","description":"Docker HubやプライベートレジストリからDockerイメージをローカル環境にダウンロードします。指定されたタグのイメージを取得します。"},{"command":"docker stop","description":"実行中のDockerコンテナを停止します。コンテナIDまたはコンテナ名を指定して、グレースフルシャットダウンを実行します。"},{"command":"docker exec","description":"実行中のDockerコンテナ内で新しいコマンドを実行します。-itオプションと組み合わせて対話的にコンテナ内に入ることができます。"},{"command":"docker-compose build","description":"docker-compose.ymlファイルに定義されたサービスのDockerイメージをビルドします。複数のサービスを一括でビルドできます。"},{"command":"docker-compose up","description":"docker-compose.ymlファイルに定義された全てのサービスを起動します。-dオプションでバックグラウンド実行、--buildオプションで強制リビルドが可能です。"},{"command":"docker-compose down","description":"docker-compose upで起動したサービスを停止し、コンテナ、ネットワークを削除します。-vオプションでボリュームも削除できます。"},{"command":"docker-compose restart","description":"docker-compose.ymlで定義されたサービスを再起動します。設定変更後の反映や、サービスの問題解決に使用します。"},{"command":"docker-compose start","description":"停止中のdocker-composeサービスを開始します。docker-compose upとは異なり、既存のコンテナを再開始します。"},{"command":"docker-compose stop","description":"実行中のdocker-composeサービスを停止します。コンテナは削除されず、docker-compose startで再開できます。"},{"command":"docker-compose ps","description":"docker-compose.ymlで定義されたサービスの現在の状態を表示します。各サービスのステータス、ポート情報などが確認できます。"},{"command":"docker-compose logs","description":"docker-composeで管理されているサービスのログを表示します。特定のサービス名を指定して個別のログも確認できます。"},{"command":"docker-compose logs -f","description":"docker-composeサービスのログをリアルタイムで監視します。新しいログエントリが自動的に表示され続けます。"},{"command":"docker-compose logs -f --tail 10","description":"docker-composeサービスのログの最新10行を表示し、その後リアルタイムでログを監視します。デバッグ時に最新の状況を素早く確認できます。"},{"command":"docker-compose logs -f --tail 100","description":"docker-composeサービスのログの最新100行を表示し、その後リアルタイムでログを監視します。より多くの履歴を確認したい場合に使用します。"},{"command":"docker-compose exec","description":"実行中のdocker-composeサービス内でコマンドを実行します。サービス名を指定して、そのコンテナ内でシェルやその他のコマンドを実行できます。"},{"command":"docker-compose exec -it","description":"docker-composeサービス内で対話的にコマンドを実行します。-itオプションによりターミナルの対話機能が有効になり、シェルセッションが開始できます。"}]');

/***/ }),

/***/ "./src/words/git_commands.json":
/*!*************************************!*\
  !*** ./src/words/git_commands.json ***!
  \*************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"command":"git init","description":"新しいGitリポジトリを初期化します。現在のディレクトリに.gitフォルダを作成し、バージョン管理を開始します。"},{"command":"git clone","description":"リモートリポジトリをローカルにコピーします。GitHubやGitLabなどのリモートリポジトリから完全なコピーを作成します。"},{"command":"git add .","description":"現在のディレクトリの全ての変更をステージングエリアに追加します。コミット対象に含める変更を準備します。"},{"command":"git commit -m","description":"ステージングエリアの変更をコミットします。-mオプションでコミットメッセージを指定して変更履歴を記録します。"},{"command":"git push","description":"ローカルのコミットをリモートリポジトリにアップロードします。変更をチームメンバーと共有するために使用します。"},{"command":"git pull","description":"リモートリポジトリの最新の変更をローカルにダウンロードしてマージします。他の開発者の変更を取得します。"},{"command":"git status","description":"現在の作業ディレクトリとステージングエリアの状態を表示します。変更されたファイルや未追跡のファイルを確認できます。"},{"command":"git branch","description":"ブランチの一覧を表示します。現在のブランチにはアスタリスク（*）が表示されます。新しいブランチの作成も可能です。"},{"command":"git checkout","description":"ブランチを切り替えたり、特定のコミットに移動します。-bオプションで新しいブランチを作成しながら切り替えることもできます。"},{"command":"git merge","description":"指定したブランチの変更を現在のブランチにマージします。機能ブランチをメインブランチに統合する際に使用します。"},{"command":"git log","description":"コミット履歴を表示します。各コミットのハッシュ、作成者、日時、メッセージを確認できます。"},{"command":"git diff","description":"ファイルの変更内容を表示します。ステージング前の変更や異なるコミット間の差分を確認できます。"},{"command":"git reset","description":"コミットやステージングの状態をリセットします。--hardオプションで作業ディレクトリの変更も破棄できます。"},{"command":"git stash","description":"現在の変更を一時的に保存します。別のブランチで作業する前に、未完成の変更を退避させる際に使用します。"},{"command":"git remote -v","description":"リモートリポジトリの一覧とそのURLを表示します。pushとfetchのURLが確認できます。"},{"command":"git fetch","description":"リモートリポジトリの情報を取得しますが、ローカルブランチにはマージしません。リモートの状態を確認する際に使用します。"},{"command":"git rebase","description":"コミット履歴を書き換えて、別のブランチの変更を統合します。線形的なコミット履歴を維持したい場合に使用します。"},{"command":"git tag","description":"特定のコミットにタグを付けます。リリースバージョンなどの重要なポイントをマークする際に使用します。"},{"command":"git cherry-pick","description":"他のブランチの特定のコミットを現在のブランチに適用します。必要な変更のみを選択的に取り込む際に使用します。"},{"command":"git config --global","description":"Gitの全体設定を行います。ユーザー名やメールアドレスなど、全リポジトリで共通の設定を指定します。"}]');

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

module.exports = window["ReactDOM"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkwp_script_test"] = globalThis["webpackChunkwp_script_test"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map