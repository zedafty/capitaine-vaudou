<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--        Encodes a string and replaces MapTool illegal characters         -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->
<!-- arg(0) => string, arg(1) => maximum length (optional)
<!-- Note that '0' returns empty string (not number)
<!-- e.g. encodeString("<test>", 4) => '%26lt%26semi%3Btes' i.e.'<tes'
<!----------------------------------------------------------------------------->

<!-- Set string -->
[str = arg(0)]

<!-- Prompt if string equals to zero and returns empty string -->
[if (str == 0): return(0, "")]

<!-- Reduce string length if second argument defined  -->
[if (json.length(macro.args) > 1), code: {
	[if (length(str) > arg(1)): str = substring(str, 0, arg(1))]
}]

<!-- Strip illegal characters -->
[str = replace(str, "\\|", "-")]
[str = replace(str, "<", "&lt;")]
[str = replace(str, ">", "&gt;")]

<!-- Built-in encoding -->
[str = encode(str)]

<!-- Return result -->
[return(0, str)]
