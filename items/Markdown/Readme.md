本地调试说明

支持Markdown，latex公式以及mermaid图形

1. 先这样设置
在命令行中执行python -m http.server 8000

2. 然后在下面这个地址打开目录
http://localhost:8000/


md手动转换为html, 可以使用VScode的插件Markdown preview enhanced的Open In browser功能，效果很好，支持的mermaid版本比较高，**如需导出，生成后，右键菜单保存为html，然后删除style和script标签对应的内容即可**。需要注意的是，公式导出时，可能会显示两遍不同格式的公式，解决办法是在head中定义如下格式：
```html
<style>
.katex-html {
display: none;
}
</style>
```