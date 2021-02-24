<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--             Return localized list item string or list string            -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[str = ""]
[lst = getConst(arg(0))]
[val = if (argCount() > 1, arg(1), -1)]
[if (isNumber(val) == 1), code: {
	[if (val >= 0 && val < listCount(lst)): str = listGet(lst, val)]
};{
	[str = listFormat(lst, "%list", "<html>%item</html>", ",")]
}]
[return(0, str)]
