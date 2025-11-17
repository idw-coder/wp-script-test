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
 * JSONファイルからコマンドデータを読み込む関数
 */
function load_commands_from_json($filename)
{
    $plugin_dir = plugin_dir_path(__FILE__);
    $json_path = $plugin_dir . '../src/words/' . $filename;

    if (file_exists($json_path)) {
        $json_content = file_get_contents($json_path);
        $data = json_decode($json_content, true);
        return $data ? $data : array();
    }

    return array();
}

/**
 * 毎回 WP_Query で投稿があるかチェック、なければデフォルトカテゴリを作成
 */
function create_default_typing_posts()
{
    // カテゴリとJSONファイルのマッピング
    $categories = array(
        'Git' => 'git_commands.json',
        'Docker' => 'docker_commands.json',
        'SSH' => 'ssh_commands.json',
        'PowerShell' => 'powershell_commands.json',
        'cURL' => 'curl_commands.json',
        'JavaScript' => 'javascript_commands.json',
        'CMD' => 'cmd_commands.json',
        'Prompt Engineering' => 'prompt_engineering_commands.json',
        'SQL' => 'sql_commands.json',
        'ES2015' => 'es2015_commands.json',
        'Laravel' => 'laravel_commands.json',
        'PHP' => 'php_commands.json',
        'AWS' => 'aws_commands.json',
        'Mail' => 'mail_slack_phrases.json'
    );

    foreach ($categories as $category_name => $json_file) {
        $query = new WP_Query(array(
            'post_type' => 'typing_category',
            'title' => $category_name,
            'post_status' => 'publish',
            'posts_per_page' => 1
        ));

        if (!$query->have_posts()) {
            $post_id = wp_insert_post(array(
                'post_title' => $category_name,
                'post_type' => 'typing_category',
                'post_status' => 'publish'
            ));

            if ($post_id) {
                $commands = load_commands_from_json($json_file);
                if (!empty($commands)) {
                    update_post_meta($post_id, '_typing_commands', $commands);
                }
            }
        }
    }
}
add_action('init', 'create_default_typing_posts');

/**
 * 既存のカテゴリのコマンドをJSONファイルから更新する関数
 */
function update_existing_categories_from_json()
{
    // カテゴリとJSONファイルのマッピング
    $categories = array(
        'Git' => 'git_commands.json',
        'Docker' => 'docker_commands.json',
        'SSH' => 'ssh_commands.json',
        'PowerShell' => 'powershell_commands.json',
        'cURL' => 'curl_commands.json',
        'JavaScript' => 'javascript_commands.json',
        'CMD' => 'cmd_commands.json',
        'Prompt Engineering' => 'prompt_engineering_commands.json',
        'SQL' => 'sql_commands.json',
        'ES2015' => 'es2015_commands.json',
        'Laravel' => 'laravel_commands.json',
        'PHP' => 'php_commands.json',
        'AWS' => 'aws_commands.json',
        'Mail' => 'mail_slack_phrases.json'
    );

    foreach ($categories as $category_name => $json_file) {
        $posts = get_posts(array(
            'post_type' => 'typing_category',
            'title' => $category_name,
            'post_status' => 'publish',
            'posts_per_page' => 1
        ));

        if (!empty($posts)) {
            $post = $posts[0];
            $commands = load_commands_from_json($json_file);
            if (!empty($commands)) {
                update_post_meta($post->ID, '_typing_commands', $commands);
            }
        }
    }
}

// 管理画面にJSONファイルから更新するボタンを追加
function add_json_update_admin_notice()
{
    if (isset($_GET['update_from_json']) && $_GET['update_from_json'] === '1') {
        update_existing_categories_from_json();
        echo '<div class="notice notice-success"><p>JSONファイルからカテゴリを更新しました。</p></div>';
    }
}
add_action('admin_notices', 'add_json_update_admin_notice');

// 管理画面に更新ボタンを追加
function add_json_update_button()
{
    global $post_type;
    if ($post_type === 'typing_category') {
        echo '<div class="wrap">';
        echo '<a href="' . admin_url('edit.php?post_type=typing_category&update_from_json=1') . '" class="button button-primary">JSONファイルから更新</a>';
        echo '</div>';
    }
}
add_action('admin_head', 'add_json_update_button');

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
