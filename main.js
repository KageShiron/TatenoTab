function createTabList(){
    wins = [];
    chrome.windows.getAll( w => {
        wins.push(w);
        if(w.tabs)alert(w.tabs); else w.tabs = [];
        var wli = $("<li>").addClass("window");
        wli.append( $("<h3>").text(w.id));
        var tul = $("<ul>").addClass("tabs");
        chrome.tabs.getAllInWindow(w.id,t => {
            for( var i = 0 ; i < t.length ; i++){
                var tli = $("<li>").addClass("tab").addClass( t[i].selected ? "selected" : "" )
                    .append( 
                            $("<a>").data("tabid",t[i].id).attr("href",t[i].url).append(
                                $("<img>").attr("src","chrome://favicon/" + t[i].url ),
                                $("<span>").text(t[i].title)
                                ).on("click",tabClick)
                           );
                tul.append(tli);
            }
        });
        wli.append(tul);
        $("#tablist").empty().append(wli);
    });
}

function tabClick(e)
{
    e.preventDefault();
    chrome.tabs.update($(this).data("tabid"),{"selected":true});
}

chrome.tabs.onHighlighted.addListener(createTabList);
chrome.tabs.onUpdated.addListener( createTabList);
$(createTabList);
