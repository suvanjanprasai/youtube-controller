# HOW IT WORKS\
The Chrome extension has a background.js file that runs in the background when the browser starts.\ The background.js constantly sends requests to a http(s) server.\ If control query such as resume, pause, mute, unmute, forward, rewind, is received by the background.js, then it does the operation that is in the control query, such as pause.\\
## NOTE: Even though content.js file does not contain anything, it is necessary when uploading as an extension of a browser. It so because the browser prefers the specified structure i.e. containing content.js file.
