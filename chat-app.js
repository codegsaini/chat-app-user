(() => {
    const loadChatWidget = () => {
        const widget = document.createElement("div");
        widget.style.position = "fixed";
        widget.style.bottom = 0;
        widget.style.right = "50px";
        widget.style.width = "350px";
        widget.style.height = 0;
        widget.style.boxSizing = "borderBox";
        widget.style.backgroundColor = "#000000";
        widget.style.borderRadius = "5px";
        widget.style.overflow = "hidden";
        widget.style.boxShadow = "0 0 20px 1px #00000011";

        const frame = document.createElement("iframe");
        frame.style.width = "100%";
        frame.style.height = "100%";
        frame.style.boxSizing = "borderBox";
        frame.style.margin = 0;
        frame.style.padding = 0;
        frame.style.border = 0;
        frame.style.position = "absolute";
        frame.style.top = 0;
        frame.style.left = 0;
        frame.style.backgroundColor = "#000000";

        widget.appendChild(frame);

        frame.addEventListener("load", () => widget.style.height = "450px");

        const widgetUrl = "https://chat-app-user.tiiny.site";
        frame.src = widgetUrl;

        document.body.appendChild(widget);
    }

    if (document.readyState == "complete") {
        loadChatWidget();
    } else {
        document.addEventListener("readystatechange", () => {
            if (document.readyState == "complete")
                loadChatWidget();
        })
    };

})()