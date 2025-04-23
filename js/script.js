async function callAPI() {
    const inputText = document.getElementById('inputText').value;
    const responseBox = document.getElementById('responseBox');
    const button = document.querySelector('button');
    
    if (!inputText.trim()) {
        responseBox.textContent = 'Enter your vehicle model';
        return;
    }

    try {
        button.disabled = true;
        button.innerHTML = '<div class="loader"></div>  ';
        responseBox.textContent = 'Querying...';

        // 从配置获取凭证
        const { API_KEY, API_URL, API_TEXT} = DEEPSEEK_CONFIG;

        // 构造符合DeepSeek API要求的请求体
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                model: "deepseek-chat",  // 根据实际模型调整
                messages: [{
                    role: "user",
                    content: inputText+API_TEXT
                }],
                temperature: 0.7,
                max_tokens: 2000
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API错误: ${errorData.error?.message || response.status}`);
        }

        const data = await response.json();
        // 提取DeepSeek的响应内容
        const result = data.choices[0].message.content;
        responseBox.textContent = result;
    } catch (error) {
        responseBox.textContent = `请求失败: ${error.message}`;
        console.error('API Error:', error);
    } finally {
        button.disabled = false;
        button.textContent = '发送请求';
    }
}
