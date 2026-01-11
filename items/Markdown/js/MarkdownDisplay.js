function MardownDisplay(markdownContent, MarkdownFileName, RawHtmlUrl) {
  const markdownUrl = MarkdownFileName;
  markdownContent.innerHTML = "加载中，请耐心等待或刷新页面重试，谢谢~";

  fetch(markdownUrl)
    .then(response => response.text())
    .then(markdownText => {

      markdownContent.innerHTML = markdownText;
      tmp = markdownContent.innerHTML;
      
      // loadScript("js/marked/marked.min.js")
      loadScript('https://cdn.staticfile.net/marked/11.1.1/marked.min.js')
      // loadScript('https://cdn.staticfile.net/marked/8.0.1/marked.min.js')
      // loadScript('https://cdn.staticfile.net/marked/5.0.0/marked.min.js')
        .then(() => {
          try {
            // 自定义 Marked 渲染器
            // v11.1.1版, v8.0.1版和v5.0.0版用这个, v5.0.0版以下表格显示异常
            const renderer = {
              code: function (code, type) {
                if (type === 'mermaid') return `<pre class="mermaid">${code}</pre>`;
                return `<pre>${code.text}</pre>`;
              }
            }

            // v15.0.8版用这个, 对应"js/marked/marked.min.js"
            // const renderer = {
            //   code: function (code) {
            //     if (code.lang == 'mermaid') return `<pre class="mermaid">${code.text}</pre>`;
            //     return `<pre>${code.text}</pre>`;
            //   }
            // }

            marked.use({ renderer });
            markdownContent.innerHTML = marked.parse(markdownContent.innerHTML);
            // console.log("Marked.js渲染成功")
          }
          catch (error) {
            markdownContent.innerHTML = "<br>文档显示出错，请刷新页面重试，谢谢~";
            // console.log("Marked.js渲染失败")
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
          // loadScript("js/mathjax/3.2.0/es5/tex-mml-chtml.js")
          loadScript('https://cdn.staticfile.org/mathjax/3.2.0/es5/tex-mml-chtml.js')
            .then(() => {
              MathjaxRun(markdownContent, markdownText);

              // 加载mermaid渲染图表
              // loadScript("js/mermaid/dist/mermaid.min.js")
              loadScript('https://cdn.staticfile.org/mermaid/10.7.0/mermaid.min.js')
                .then(() => {
                  MermaidRun();
                })
                .catch(error => {
                  markdownContent.innerHTML = tmp;
                });
            })
            .catch(error => {
              markdownContent.innerHTML = tmp;
            });

        })
        .catch(error => {
          // markdownContent.innerHTML = tmp +  "<br>文档渲染脚本加载异常，请刷新页面重试，谢谢~";
          ReadRawHtml(markdownContent, RawHtmlUrl);
        });

    })
    .catch(error => {
      // markdownContent.innerHTML = "加载文件时出错，请刷新页面重试，谢谢~";
      ReadRawHtml(markdownContent, RawHtmlUrl);
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

function MathjaxRun(markdownContent, markdownText) {
  try {
    markdownContent.innerHTML = markdownText;
    MathJax.typesetPromise(); // 让 MathJax 重新渲染页面上的数学公式
    markdownContent.innerHTML = marked.parse(markdownContent.innerHTML);
    // console.log("MathJax渲染成功")
  }
  catch (error) {
    markdownContent.innerHTML = tmp + "<br>公式渲染出错，请刷新页面重试，谢谢~";
    tmp = markdownContent.innerHTML;
    // console.log("MathJax渲染失败")
  }
}

function MermaidRun() {
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
    // console.log("Mermaid渲染成功")
  }
  catch (error) {
    markdownContent.innerHTML = tmp + "<br>图表渲染出错，请刷新页面重试，谢谢~";
    tmp = markdownContent.innerHTML;
    // console.log("Mermaid渲染失败")
  }
}

function ReadRawHtml(markdownContent, RawHtmlUrl) {
  fetch(RawHtmlUrl)
    .then(response => response.text())
    .then(RawHtml => {
      markdownContent.innerHTML = RawHtml;
    })
    .catch(error => {
      markdownContent.innerHTML = "加载文件时出错，请刷新页面重试，谢谢~";
    })
}
