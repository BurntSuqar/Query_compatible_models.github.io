// 阻止浏览器缓存配置文件
window.addEventListener('beforeunload', () => {
    delete window.DEEPSEEK_CONFIG;
});
const DEEPSEEK_CONFIG  = {
  API_KEY: 'sk-92e5dd2058534d93b95c96c66cfb39ed',  // 在此处填写你的实际API密钥
  API_URL: 'https://api.deepseek.com/v1/chat/completions' // DeepSeek官方API地址
};