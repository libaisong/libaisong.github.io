function MarkdownAddItem(Name, Time, Content) {
Version = '3' // 3代表快速版, 2代表动态渲染版
document.writeln("        <div class=\"interval_u20px\"></div>");
document.writeln("        <div class=\"sub_item_list\" onclick=\"window.open('items/Markdown/"+Name+Version+".html','_self')\">");
document.writeln("            <a href=\"items/Markdown/"+Name+Version+".html\"><h1 class=\"item_title\">"+Name+"</h1></a>");
document.writeln("            <div class=\"item_time\">");
document.writeln("                "+Time+"");
document.writeln("            </div>");
document.writeln("            <div class=\"item_intro\">");
document.writeln("                <p>"+Content+"</p>");
document.writeln("            </div>");
document.writeln("        </div>  ");
document.writeln("        <div class=\"interval_d20px\"></div>  ");
}