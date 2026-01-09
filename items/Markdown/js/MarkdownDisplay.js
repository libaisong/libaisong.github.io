function MardownDisplay(markdownContent, MarkdownFileName) {
  const markdownUrl = MarkdownFileName;
  const markdownContentDiv = document.getElementById('markdownContent');
  markdownContent.innerHTML = "如果看到了本段文字，请耐心等待或刷新页面重试，谢谢~";

  // 自定义 Marked 渲染器
  const renderer = {
    code: function (code) {
      if (code.lang == 'mermaid') return `<pre class="mermaid">${code.text}</pre>`;
      return `<pre>${code.text}</pre>`;
    }
  }
  marked.use({ renderer });

  fetch(markdownUrl)
    .then(response => response.text())
    .then(markdownText => {
      // const converter = new showdown.Converter();
      // const html = converter.makeHtml(markdownText);
      markdownContent.innerHTML = markdownText;
      markdownContent.innerHTML = marked.parse(markdownContent.innerHTML);
      tmp = markdownContent.innerHTML;

      try {
        markdownContent.innerHTML = markdownText;
        MathJax.typesetPromise(); // 让 MathJax 重新渲染页面上的数学公式
        markdownContent.innerHTML = marked.parse(markdownContent.innerHTML);
      }
      catch (error) {
        markdownContent.innerHTML = tmp + "<br>公式渲染出错，请刷新页面重试，谢谢~";
      }

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
      }

    })
    .catch(error => {
      markdownContent.innerHTML = "加载文件时出错，请刷新页面重试，谢谢~";
    })
}