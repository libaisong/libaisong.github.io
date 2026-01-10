function MardownDisplay(markdownContent, MarkdownFileName) {
  const markdownUrl = MarkdownFileName;
  markdownContent.innerHTML = "加载中，请耐心等待或刷新页面重试，谢谢~";

  fetch(markdownUrl)
    .then(response => response.text())
    .then(markdownText => {

      try {
        // 自定义 Marked 渲染器
        const renderer = {
          code: function (code) {
            if (code.lang == 'mermaid') return `<pre class="mermaid">${code.text}</pre>`;
            return `<pre>${code.text}</pre>`;
          }
        }
        marked.use({ renderer });

        markdownContent.innerHTML = markdownText;
        markdownContent.innerHTML = marked.parse(markdownContent.innerHTML);
      }
      catch (error) {
        markdownContent.innerHTML = "<br>文档显示出错，请刷新页面重试，谢谢~";
      }
      tmp = markdownContent.innerHTML;

      // 用于显示行内公式
      MathJax = {
        tex: {
          inlineMath: [['$', '$'], ['\\(', '\\)']]
        },
        loader: {
          load: ['input/tex', 'output/chtml'], // 按需加载核心模块
          delayStartupUntil: 'configured'     // 延迟启动至配置完成
        },
      };

      // 加载mathjax渲染公式
      loadScript("js/mathjax/3.2.0/es5/tex-mml-chtml.js")
        .then(() => {
          try {
            markdownContent.innerHTML = markdownText;
            MathJax.typesetPromise(); // 让 MathJax 重新渲染页面上的数学公式
            markdownContent.innerHTML = marked.parse(markdownContent.innerHTML);
          }
          catch (error) {
            markdownContent.innerHTML = tmp + "<br>公式渲染出错，请刷新页面重试，谢谢~";
            tmp = markdownContent.innerHTML;
          }
        })
        .catch(error => {
          markdownContent.innerHTML = tmp;
        });

      // 加载mermaid渲染图表
      loadScript("js/mermaid/dist/mermaid.min.js")
        .then(() => {
          try {
            // 初始化 Mermaid（可选配置）
            mermaid.initialize({
              theme: 'default',
              startOnLoad: false // 禁止自动渲染
            });
            // 手动渲染 Mermaid 图表
            mermaid.run({
              querySelector: '.mermaid',
              suppressErrors: true
            });
          }
          catch (error) {
            markdownContent.innerHTML = tmp + "<br>图表渲染出错，请刷新页面重试，谢谢~";
            tmp = markdownContent.innerHTML;
          }
        })
        .catch(error => {
          markdownContent.innerHTML = tmp;
        });



    })
    .catch(error => {
      markdownContent.innerHTML = "加载文件时出错，请刷新页面重试，谢谢~";
    })
}

function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.append(script);
    });
}
