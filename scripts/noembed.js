function PreventFrame() {
    try {
        if (window.top !== window.self) {
            document.write = "";
            window.top.location = window.self.location;
            window.self.onload = function() {
                document.body.innerHTML = '';
            };
        }
    } catch (err) {}
}