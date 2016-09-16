(function(markmon){
    var highlighter = document.querySelector(".highlighter"),
        scroller = markmon.scroller,
        contentDisplay = markmon.contentDisplay,
        changeHighlighter = markmon.changeHighlighter;

    var socket = io.connect(location.origin);
    socket.on("content", function(data){
        console.log('Got data', data);
        var r = contentDisplay.update(data.html);
        console.log('Content', r);
        if(!r) return;
        r.inserted = r.inserted.map(function(elm){
            while(elm && !elm.innerHTML) elm = elm.parentElement;
            return elm;
        }).filter(function(elm){
            return !!elm;
        });

        MathJax.Hub.Typeset(r.inserted, function(){
            setTimeout(function(){
                changeHighlighter.syncHighlighter();
                scroller.scrollTo(changeHighlighter.getMarkerY() - window.innerHeight / 2 | 0);
            }, 10);
        });
    });
})(window.markmon ? window.markmon : window.markmon = {});