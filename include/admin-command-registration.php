<?php
function register_typing_commands_post_type()
{
    $args = array(
        'labels' => array(
            'name' => 'タイピング投稿一覧',
            'singular_name' => 'タイピング投稿',
            'menu_name' => 'タイピング投稿',
            'all_items' => 'タイピング投稿一覧',
            'add_new' => '新規追加',
            'add_new_item' => '新しいタイピング投稿を追加',
            'edit_item' => 'タイピング投稿を編集',
            'new_item' => '新しいタイピング投稿',
            'view_item' => 'タイピング投稿を表示',
            'search_items' => 'タイピング投稿を検索',
            'not_found' => 'タイピング投稿が見つかりませんでした',
            'not_found_in_trash' => 'ゴミ箱にタイピング投稿が見つかりませんでした'
        ),
        'description' => 'タイピングゲームのコマンドを管理します。',
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-editor-code',
        'supports' => array('title'),
        'show_in_rest' => true,
        'rest_base' => 'typing-categories',
    );
    /**
     * タイピング投稿のカスタム投稿タイプを登録
     * @see https://developer.wordpress.org/reference/functions/register_post_type/
     * @param string $post_type
     * @param array $args
     * @return void
     */
    register_post_type('typing_category', $args);
}
add_action('init', 'register_typing_commands_post_type');

// カスタムフィールドのメタボックスを追加
function add_typing_commands_meta_box()
{
    /**
     * 管理画面にメタボックスを追加
     * @see https://developer.wordpress.org/reference/functions/add_meta_box/
     * @param string $id
     * @param string $title
     * @param callable $callback
     * @param string $screen
     * @param string $context
     * @param string $priority
     * @return void
     */
    add_meta_box(
        'typing_commands',
        'コマンド一覧',
        'typing_commands_meta_box_callback',
        'typing_category',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'add_typing_commands_meta_box');

/**
 * メタボックスのHTML
 * @param WP_Post $post
 * @return void
 */
function typing_commands_meta_box_callback($post)
{
    /**
     * セキュリティ用 nonce を hidden フィールドとして埋め込み
     */
    wp_nonce_field('typing_commands_meta_box', 'typing_commands_meta_box_nonce');

    $commands = get_post_meta($post->ID, '_typing_commands', true);
    if (!$commands) {
        $commands = array();
    }

    echo '<div id="typing-commands-container">';
    echo '<style>
        .command-row { 
            border: 1px solid #ddd; 
            padding: 15px; 
            margin-bottom: 10px; 
            background: #f9f9f9; 
            border-radius: 5px;
        }
        .command-row input[type="text"] { 
            width: 100%; 
            margin-bottom: 10px;
            padding: 8px;
            font-family: monospace;
            font-size: 14px;
        }
        .command-row textarea { 
            width: 100%; 
            height: 60px;
            padding: 8px;
        }
        .remove-command {
            background: #dc3232;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
            float: right;
            margin-bottom: 10px;
        }
        .add-command {
            background: #0073aa;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 3px;
            cursor: pointer;
            margin-top: 10px;
        }
    </style>';

    foreach ($commands as $index => $command) {
        echo '<div class="command-row">';
        echo '<button type="button" class="remove-command" onclick="removeCommand(this)">削除</button>';
        echo '<label><strong>コマンド</strong></label><br>';
        echo '<input type="text" name="typing_commands[' . $index . '][command]" value="' . esc_attr($command['command']) . '" placeholder="例: git commit -m" />';
        echo '<label><strong>説明</strong></label><br>';
        echo '<textarea name="typing_commands[' . $index . '][description]" placeholder="コマンドの説明を入力">' . esc_textarea($command['description']) . '</textarea>';
        echo '</div>';
    }

    echo '</div>';
    echo '<button type="button" class="add-command" onclick="addCommand()">コマンドを追加</button>';

    echo '<script>
        let commandIndex = ' . count($commands) . ';
        
        function addCommand() {
            const container = document.getElementById("typing-commands-container");
            const newRow = document.createElement("div");
            newRow.className = "command-row";
            newRow.innerHTML = `
                <button type="button" class="remove-command" onclick="removeCommand(this)">削除</button>
                <label><strong>コマンド</strong></label><br>
                <input type="text" name="typing_commands[${commandIndex}][command]" placeholder="例: git commit -m" />
                <label><strong>説明</strong></label><br>
                <textarea name="typing_commands[${commandIndex}][description]" placeholder="コマンドの説明を入力"></textarea>
            `;
            container.appendChild(newRow);
            commandIndex++;
        }
        
        function removeCommand(button) {
            button.parentNode.remove();
        }
    </script>';
}

// カスタムフィールドの保存
function save_typing_commands_meta_box($post_id)
{
    if (!isset($_POST['typing_commands_meta_box_nonce'])) {
        return;
    }

    if (!wp_verify_nonce($_POST['typing_commands_meta_box_nonce'], 'typing_commands_meta_box')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $commands = array();
    if (isset($_POST['typing_commands']) && is_array($_POST['typing_commands'])) {
        foreach ($_POST['typing_commands'] as $command_data) {
            if (!empty($command_data['command']) && !empty($command_data['description'])) {
                $commands[] = array(
                    'command' => sanitize_text_field($command_data['command']),
                    'description' => sanitize_textarea_field($command_data['description'])
                );
            }
        }
    }

    update_post_meta($post_id, '_typing_commands', $commands);
}
add_action('save_post', 'save_typing_commands_meta_box');

/**
 * 毎回 WP_Query で投稿があるかチェック、なければデフォルトカテゴリを作成
 */
function create_default_typing_posts()
{
    // Git カテゴリの投稿を作成
    $git_query = new WP_Query(array(
        'post_type' => 'typing_category',
        'title' => 'Git',
        'post_status' => 'publish',
        'posts_per_page' => 1
    ));

    if (!$git_query->have_posts()) {
        $git_post_id = wp_insert_post(array(
            'post_title' => 'Git',
            'post_type' => 'typing_category',
            'post_status' => 'publish'
        ));

        if ($git_post_id) {
            $git_commands = [
                ['command' => 'git init', 'description' => '新しいGitリポジトリを初期化します。現在のディレクトリに.gitフォルダを作成し、バージョン管理を開始します。'],
                ['command' => 'git clone', 'description' => 'リモートリポジトリをローカルにコピーします。GitHubやGitLabなどのリモートリポジトリから完全なコピーを作成します。'],
                ['command' => 'git add .', 'description' => '現在のディレクトリの全ての変更をステージングエリアに追加します。コミット対象に含める変更を準備します。'],
                ['command' => 'git commit -m', 'description' => 'ステージングエリアの変更をコミットします。-mオプションでコミットメッセージを指定して変更履歴を記録します。'],
                ['command' => 'git push', 'description' => 'ローカルのコミットをリモートリポジトリにアップロードします。変更をチームメンバーと共有するために使用します。']
            ];
            update_post_meta($git_post_id, '_typing_commands', $git_commands);
        }
    }

    // Docker カテゴリの投稿を作成
    $docker_query = new WP_Query(array(
        'post_type' => 'typing_category',
        'title' => 'Docker',
        'post_status' => 'publish',
        'posts_per_page' => 1
    ));

    if (!$docker_query->have_posts()) {
        $docker_post_id = wp_insert_post(array(
            'post_title' => 'Docker',
            'post_type' => 'typing_category',
            'post_status' => 'publish'
        ));

        if ($docker_post_id) {
            $docker_commands = [
                ['command' => 'docker ps', 'description' => '現在実行中のDockerコンテナの一覧を表示します。コンテナID、イメージ名、実行時間、ステータス、ポートマッピングなどの情報が確認できます。'],
                ['command' => 'docker run', 'description' => 'Dockerイメージから新しいコンテナを作成して実行します。ポートマッピング、環境変数、ボリュームマウントなどのオプションを指定できます。'],
                ['command' => 'docker build', 'description' => 'DockerfileからDockerイメージをビルドします。-tオプションでタグ名を指定し、コンテキストパスを指定してイメージを作成します。'],
                ['command' => 'docker compose up', 'description' => 'docker-compose.ymlファイルに定義された全てのサービスを起動します。-dオプションでバックグラウンド実行、--buildオプションで強制リビルドが可能です。'],
                ['command' => 'docker compose down', 'description' => 'docker-compose upで起動したサービスを停止し、コンテナ、ネットワークを削除します。-vオプションでボリュームも削除できます。']
            ];
            update_post_meta($docker_post_id, '_typing_commands', $docker_commands);
        }
    }
}
add_action('init', 'create_default_typing_posts');

/**
 * /wp-json/ で始まるURLにアクセスした時、以下のREST APIエンドポイントが有効になる
 */
function register_typing_commands_api()
{
    // URL: /wp-json/typing-game/v1/categories
    register_rest_route('typing-game/v1', '/categories', array(
        'methods' => 'GET',
        'callback' => 'get_typing_categories',
        'permission_callback' => '__return_true',
    ));

    // URL: /wp-json/typing-game/v1/commands/{slug}
    register_rest_route('typing-game/v1', '/commands/(?P<slug>[a-zA-Z0-9-]+)', array(
        'methods' => 'GET',
        'callback' => 'get_typing_commands_by_slug',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'register_typing_commands_api');

// カテゴリ一覧を取得
function get_typing_categories()
{
    $posts = get_posts(array(
        'post_type' => 'typing_category',
        'posts_per_page' => -1,
        'post_status' => 'publish'
    ));

    $categories = array();
    foreach ($posts as $post) {
        $categories[] = array(
            'slug' => sanitize_title($post->post_title),
            'name' => $post->post_title
        );
    }

    return $categories;
}

// スラッグでコマンドを取得
function get_typing_commands_by_slug($request)
{
    $slug = $request['slug'];

    $posts = get_posts(array(
        'post_type' => 'typing_category',
        'posts_per_page' => -1,
        'post_status' => 'publish'
    ));

    // タイトルベースで検索
    foreach ($posts as $post) {
        if (sanitize_title($post->post_title) === $slug) {
            $commands = get_post_meta($post->ID, '_typing_commands', true);
            return $commands ? $commands : array();
        }
    }

    return array();
}
