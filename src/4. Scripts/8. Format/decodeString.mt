<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--           Decodes a string and replaces MapTool HTML entities           -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->
<!-- arg(0) => string
<!-- e.g. decodeString("&lt;test&gt;") => '<test>'
<!----------------------------------------------------------------------------->

<!-- Set string -->
[str = arg(0)]

<!-- Built-in decoding -->
[str = decode(str)]

<!-- Replace illegal characters by HTML entities -->
[str = replace(str, "&lt;", "<")]
[str = replace(str, "&gt;", ">")]
[str = replace(str, "&#91;", "\\[")]
[str = replace(str, "&#93;", "\\]")]

<!-- Return result -->
[return(0, str)]
