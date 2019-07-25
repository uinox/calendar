/**
 * @author tmubei
 * @version 1.0.0
 * 
 * 调用方法: <input type="text" id="aaa" onfocus="calendar()" value="2018-11-10" />
 * 
 */



var dateHtml="";

// 颜色设置
var colors={
    lightColor : "#fff",
    navback:"#00b4eb",
    contentback:"#6092fa",
    weekend:"red",
    today:"#1179d1",
    darkcolor:"#000",
    disable : "#ccc",
    button : "#00cfd1"
}
var cc="<div id='datediv' style='display:none;position:absolute;'>"+
        "<iframe id='dateIframe' scrolling='no' frameborder='0' width='354' height='304'></iframe></div>";
document.write(cc);
var datediv=document.getElementById("datediv");
var frame=document.getElementById("dateIframe");
var frameDocument=frame.contentWindow;

var year,
    month,      //当前月份
    day,        //鼠标点击日期
    today,      //当前日期
    inputH;     //输入框高度

var date=new Date();
    year=date.getFullYear();
    month = date.getMonth()+1;
    today=date.getDate();
    console.log(today);

function calendar(){

    var evt=window.event||arguments.callee.caller.arguments[0];
    var target=evt.target||evt.srcElement;

    var x=target.offsetLeft;
    var y=target.offsetTop;
    
    // var id=target.id;

    //阻止点击input框事件冒泡
    target.onclick=function(event){
        if(event && event.stopPropagation){
            event.stopPropagation();
        }else if(window.event){
            window.event.cancelBubble=true;
        } 
    }
    //end
    inputH=target.offsetHeight;
    
    writeHtml(x,y,inputH);

    for (var i = 0; i < 42; i++) {
        frameDocument.document.getElementById("meizzDay"+i).onclick=function(){
            if(this.getAttribute('value')=="cli"){
                day=parseInt(this.innerHTML);
                if(frameDocument.document.getElementById("month")) 
                    month=parseInt(frameDocument.document.getElementById("month").innerHTML);
                if(frameDocument.document.getElementById("monthSelect")) 
                    month=parseInt(frameDocument.document.getElementById("monthSelect").value);
                if(frameDocument.document.getElementById("year")) 
                    year=parseInt(frameDocument.document.getElementById("year").innerHTML);
                if(frameDocument.document.getElementById("yearSelect")) 
                    year=parseInt(frameDocument.document.getElementById("yearSelect").value);
                
                
                target.value=year+'-'+month+'-'+day;
                hideDate();
            }
        };
        frameDocument.document.getElementById("meizzDay"+i).onmouseover=function(){
            if(this.getAttribute('value')=="cli"){
                this.style.backgroundColor=colors.contentback;
                this.style.color=colors.lightColor;
            }
        };
        frameDocument.document.getElementById("meizzDay"+i).onmouseout=function(){
            if(this.getAttribute('value')=="cli"){
                if(this.getAttribute('date')=="today"){
                    this.style.backgroundColor=colors.today;
                }else{
                    this.style.backgroundColor=colors.lightColor;
                    this.style.color=colors.darkcolor;
                }
            }
        };
    };
    frameDocument.document.getElementById("clearValue").onclick=function(){
        target.value="";
    };
    frameDocument.document.getElementById("quickSelect").onclick=function(){
        target.value=this.innerHTML;
        hideDate();
    
    }
    // frame.contentWindow.focus();
    frameDocument.document.onkeydown=function(event){
        var evt=event||frame.contentWindow.event;   //frame.contentWindow.event 为获取IE iframe的event对象
        switch (evt.keyCode) {
            case 37:    //左键月份递减
                prevMonth();
                break;
            case 38:    //上键年份递增
                nextYear();
                break;
            case 39:    //右键月份递增
                nextMonth();
                break;
            case 40:    //下键年份递减
                prevYear();
                break;
            default:
                break;
        }
    }
    // focus end
    document.onclick=function(){
        hideDate();
    }
}

function writeHtml(x,y,inputH){
    dateHtml=
    '<!DOCTYPE html>'+
    '<html lang="en">'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'+
        '<style type="text/css">'+
            '*{margin:0;padding:0;}'+
            'body{margin:0;cursor:default;}'+
            'table{border-collapse:collapse;border:1px solid '+colors.navback+';border-radius:5px;}'+
            'table td{text-align:center;border:none;}'+
            '.out{cursor:pointer;line-height:30px;}'+
        '#quickSelect, #month, #year, #clearValue, #close, .close, .prevMonth, .nextMonth, .prevYear, .nextYear{cursor:pointer;}'+
            '.prevMonth, .nextMonth, #yearParent, #monthParent, .prevYear, .nextYear{height:40p;line-height:40px;}'+
            '#clearValue, .close{display:inline-block;width:40px;height:22px;line-height:22px;text-align:center;'+
            'padding:3px 10px;background:'+colors.button+';border-radius:6px;color:'+colors.lightColor+';}'+
            '#clearValue{margin-left:20px;}'+
            '#quickSelect{color:'+colors.weekend+'}'+
            '.tr1{background:'+ colors.navback +';color:'+colors.lightColor+';}'+
            '.tr2{border-bottom:1px dashed '+colors.contentback+';}'+
            '.tr2 td{width:50px;}'+
            '.tr3{border-top:1px dashed '+colors.contentback+';}'+
            '.tr3 td div{height:40px;line-height:40px;}'+
        '</style>'+
        '</head>'+
        '<body>'+
            '<table border="0" width="354">'+
                '<tr height="40" class="tr1"><td colspan="7">'+
                    '<div style="float:left;width:10%;" class="prevYear" onclick="parent.prevYear()">《</div>'+
                    '<div style="float:left;width:10%;" class="prevMonth" onclick="parent.prevMonth()">\<</div>'+
                    '<div id="yearParent" style="float:left;width:30%;">'+
                        '<span id="year" onclick="parent.showYearSelect()">'+year+'年</span>'+
                    '</div>'+
                    '<div style="float:left;width:30%;" id="monthParent">'+
                        '<span id="month" onclick="parent.showMonthSelect()">'+month+'月</span>'+
                    '</div>'+
                    '<div style="float:left;width:10%;" class="nextMonth" onclick="parent.nextMonth()">\></div>'+
                    '<div style="float:left;width:10%;" class="nextYear" onclick="parent.nextYear()">》</div>'+
                    '<div style="clear:both"></div>'+
                '</td></tr>'+
                '<tr height="40" class="tr2">'+
                    '<td style="color:'+colors.weekend+'">日</td><td>一</td><td>二</td><td>三</td>'+
                    '<td>四</td><td>五</td><td style="color:'+colors.weekend+'">六</td>'+
                '</tr>';
                for(var i=0;i<6;i++){
                    dateHtml+='<tr height="30">';
                    for(var j = 0; j<7;j++){
                        
                        dateHtml+="<td class=out id='meizzDay"+ (i*7+j) +"'></td>";
                    }
                    dateHtml+='</tr>';
                }
                dateHtml+='<tr class="tr3" height="40"><td colspan="7"><div>今天：<span id="quickSelect">'+
                        (year+"-"+month+"-"+today)+
                        '</span>&nbsp;&nbsp;<span id="clearValue">清除</span>&nbsp;&nbsp;'+
                        '<span class="close" onclick="parent.hideDate()">关闭</span></div></td></tr>';
                dateHtml+='</table></body></html>';

        
    if(datediv){
        datediv.style.display="block";
        datediv.style.cssText="height:304px;width:354px;background-color:"+colors.lightColor+
        ";position: absolute; z-index: 9999; top:"+(y+inputH-1)+"px; left:"+x+"px;";
    }
    with(frame){
        frame.contentWindow.document.open();
        frame.contentWindow.document.writeln(dateHtml);
        frame.contentWindow.document.close();
    }

    showdate(year,month);
 
}

function getdays(year,month){
    var days;
    if(/("1"|"3"|"5"|"7"|"8"|"10"|"12")/.test('"'+month+'"')){
        days = 31;
    }else if(/("4"|"6"|"9"|"11")/.test('"'+month+'"')){
        days = 30;
    }else if(month==2){
        if(year%4==0&&year%100 !=0 || year%400==0){
            days = 29;
        }else {
            days = 28;
        }
    }
    return days;
}

function getWeekday(year, month) {
    var d=new Date(year, month-1, 1);
    return d.getDay();

}

function prevMonth(){
    hideYearSelect();
    hideMonthSelect();

    year=parseInt(frameDocument.document.getElementById("year").innerHTML);
    month=parseInt(frameDocument.document.getElementById("month").innerHTML);
    if(month==1){
        year=year-1;
        month=12;
    }else{
        month=month-1;
    }
    
    frameDocument.document.getElementById("year").innerHTML=year+"年";
    frameDocument.document.getElementById("month").innerHTML=month+"月";
    showdate(year,month);
}

function prevYear(){
    hideYearSelect();
    hideMonthSelect();

    year=parseInt(frameDocument.document.getElementById("year").innerHTML);
    month=parseInt(frameDocument.document.getElementById("month").innerHTML);
    year=year-1;

    frameDocument.document.getElementById("year").innerHTML=year+"年";
    showdate(year,month);

}

function nextMonth(){
    hideYearSelect();
    hideMonthSelect();

    year=parseInt(frameDocument.document.getElementById("year").innerHTML);
    month=parseInt(frameDocument.document.getElementById("month").innerHTML);
    if(month==12){
        year= year+1;
        month=1;
    }else{
        month=month+1;
    }
    
    frameDocument.document.getElementById("year").innerHTML=year+"年";
    frameDocument.document.getElementById("month").innerHTML=month+"月";
    showdate(year,month);
}

function nextYear(){
    hideYearSelect();
    hideMonthSelect();

    year=parseInt(frameDocument.document.getElementById("year").innerHTML);
    month=parseInt(frameDocument.document.getElementById("month").innerHTML);
    year=year+1;

    frameDocument.document.getElementById("year").innerHTML=year+"年";
    showdate(year,month);
}

function showdate(y,m){
    var year=y;
    var month=m;
    
    var monthdays=getdays(year,month);  //本月天数
    var weekday=getWeekday(year, month);  //本周第一天
    if(weekday==0) weekday=7;   //如果weekday==0，则自动加一周，合理排版
    
    var nextMonth,prevMonth;
    if(month==1){
        prevMonth=12;
        year=year-1;
    }else{
        prevMonth=month-1;
    }
    if(month==12){
        nextMonth=1;
        year= year+1;
    }else{
        nextMonth=month+1;
    }
    var prevMonthdays=getdays(year, prevMonth); //上月天数
    var nextMonthdays=getdays(year, nextMonth); //下月天数

    //重置上一次渲染的内容
    for (var i = 0; i < 42; i++) {
        if(frameDocument.document.getElementById("meizzDay"+i)){
            if(frameDocument.document.getElementById("meizzDay"+i).getAttribute('value')){
                frameDocument.document.getElementById("meizzDay"+i).removeAttribute("value");
            }
            if(frameDocument.document.getElementById("meizzDay"+i).getAttribute('style')){
                frameDocument.document.getElementById("meizzDay"+i).removeAttribute("style");
            }
            if(frameDocument.document.getElementById("meizzDay"+i).getAttribute('date')){
                frameDocument.document.getElementById("meizzDay"+i).removeAttribute("date");
            }
            frameDocument.document.getElementById("meizzDay"+i).innerHTML="";
        }
    }
    //重置结束
    
    for (var i = 0; i < weekday; i++) {
        frameDocument.document.getElementById("meizzDay"+i).style.color=colors.disable;
        frameDocument.document.getElementById("meizzDay"+i).innerHTML=prevMonthdays-weekday+i+1;
    }
    for(var i = 0; i<monthdays; i++){
        console.log(weekday);
        if(today+weekday-1==i){
            frameDocument.document.getElementById("meizzDay"+(today+weekday-1)).style.backgroundColor=colors.today;
            frameDocument.document.getElementById("meizzDay"+(today+weekday-1)).style.color=colors.lightColor;
            frameDocument.document.getElementById("meizzDay"+(today+weekday-1)).setAttribute("date","today");
        }
        frameDocument.document.getElementById("meizzDay"+(i+weekday)).setAttribute("value","cli");
        frameDocument.document.getElementById("meizzDay"+(i+weekday)).innerHTML=i+1;
    }
    for (var i = 0; i < 42-weekday-monthdays; i++) {
        frameDocument.document.getElementById("meizzDay"+(i+weekday+monthdays)).style.color=colors.disable;
        frameDocument.document.getElementById("meizzDay"+(i+weekday+monthdays)).innerHTML = i+1;
    }
}

function hideDate(){

    var datediv=parent.document.getElementById("datediv");
    if(datediv != null) datediv.style.display="none";
    
    // reset：
    year=date.getFullYear();
    month = date.getMonth()+1;
    today=date.getDate();
    // reset end
}

function showYearSelect(){
    var yearParent=frameDocument.document.getElementById("yearParent");
    // var monthParent=frameDocument.document.getElementById("monthParent");
    var y=parseInt(frameDocument.document.getElementById("year").innerHTML);
    var min=y-50;
    var yearSelect="<select id='yearSelect' onchange='parent.changeYear(this.value)'>";
    for (var i = 0; i < 101; i++) {
        if(min+i==y){
            yearSelect+="<option value='"+(min+i)+"' selected>"+(min+i)+"年</option>";
        }else{
            yearSelect+="<option value='"+(min+i)+"'>"+(min+i)+"年</option>";
        }
    }
    yearSelect += "</selected>";
    yearParent.innerHTML=yearSelect;

    hideMonthSelect();
}

function hideYearSelect(){
    var yearParent=frameDocument.document.getElementById("yearParent");
    if(!frameDocument.document.getElementById("year")){
        var yearSelectValue=frameDocument.document.getElementById("yearSelect").value;
        yearParent.innerHTML='<span id="year" onclick="parent.showYearSelect()">'+yearSelectValue+'年</span>'
    }
}

function showMonthSelect(){
    var m=parseInt(frameDocument.document.getElementById("month").innerHTML);
    // var yearParent=frameDocument.document.getElementById("yearParent");
    var monthParent=frameDocument.document.getElementById("monthParent");
    var monthSelect="<select id='monthSelect' onchange='parent.changeMonth(this.value)'>";
    for (var i = 1; i < 13; i++) {
        if(m==i){
            monthSelect+="<option value='"+i+"' selected>"+i+"月</option>";
        }else{
            monthSelect+="<option value='"+i+"'>"+i+"月</option>";
        }
    }
    monthSelect+="</select>";
    monthParent.innerHTML=monthSelect;

    hideYearSelect();
}

function hideMonthSelect(){
    var monthParent=frameDocument.document.getElementById("monthParent");
    if(!frameDocument.document.getElementById("month")){
        var monthSelectValue=frameDocument.document.getElementById("monthSelect").value;
        monthParent.innerHTML='<span id="month" onclick="parent.showMonthSelect()">'+monthSelectValue+'月</span>';
    }
}

function changeYear(y){
    // var yearParent=frameDocument.document.getElementById("yearParent");
    month = parseInt(frameDocument.document.getElementById("month").innerHTML);
    year=y;
    showdate(year,month);
    hideYearSelect();
}

function changeMonth(m){
    // var monthParent=frameDocument.document.getElementById("monthParent");
    year = parseInt(frameDocument.document.getElementById("year").innerHTML);
    month=m;
    showdate(year,month);
    hideMonthSelect();
}

