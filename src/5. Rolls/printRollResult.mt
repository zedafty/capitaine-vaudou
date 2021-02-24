<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--            Outputs roll result with macro links in chat log             -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- Retrieve and format roll result -->
[h: str = arg(0)]
[h: str = replace(str, "hx0026", "&")]

<!-- Retrieve macro links -->
[h: tag1 = "macrolink_details"]
[h: lnk1 = strfind(str, tag1 + "::(.+)::" + tag1)]
[h: tag2 = "macrolink_options"]
[h: lnk2 = strfind(str, tag2 + "::(.+)::" + tag2)]

<!-- Strip roll result -->
[h: str = replace(str, tag1 + "::(.*)::" + tag1, "")]
[h: str = replace(str, tag2 + "::(.*)::" + tag2, "")]

<!-- Append roll details -->
[h: reg1 = getGroup(lnk1, 1, 1)]
[h: url1 = macroLinkText("printRollLink@Lib:Rolls", "self", reg1)]
[h: add = "<a href=" + url1 + ">" + getConst("roll_details") + "</a>"]

<!-- Append roll options -->
[h, if (getFindCount(lnk2) > 0), code: {
	[h: reg2 = getGroup(lnk2, 1, 1)]
	[h: url2 = macroLinkText("printRollLink@Lib:Rolls", "self", reg2)]
	[h: add = add + " &bull; <a href=" + url2 + " style='margin-left: 5px;'>" + getConst("roll_options") + "</a>"]
}]

<!-- Return roll result -->
[h: return(0, broadcast(str + "<div class='links'>" + add + "</div>"))]
