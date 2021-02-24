<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                Assigns selected token to a given player                 -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- Check GM -->
[h: assert(isGM(), getError("gm_only"), 0)]

<!-- Check selection -->
[h: sid = getSelected()]
[h: err = if (listCount(sid) > 1, "more_than_one_token_selected", "not_selected")]
[h: assert(listCount(sid) == 1, getError(err), 0)]

<!-- Check token type -->
[h: assert(isPC(sid) == 1, getError("not_pc_token"), 0)]

<!-- Get players list -->
[h: list = getAllPlayerNames()]

<!-- Display modal -->
[h: abort(input(
	"junkVar|<html><span style='color: #996600'>" + getName(sid) + "</span></html>|<html><b style='color:#006699'>Assigner pion</b></html>|LABEL|TEXT=true",
	"player|" + list + "|<html>&mdash;&nbsp;Joueur</html>|LIST|SELECT=0 VALUE=STRING"
))]

<!-- Reset token properties -->
[h: setLayer("TOKEN", sid)]
[h: setOwner(player, sid)]
[h: setVisible(1, sid)]
[h: setOwnerOnlyVisible(0, sid)]
[h: setTokenOpacity(1.0, sid)]
[h: setPlayerToken(sid, player)]

<!-- Feedback to GM -->
[r: "<b>" + getName(sid)+ "</b> token is now assigned to player <b>" + player  + "</b>"]

<!-- Force player to retrieve token if map not hidden -->
[h: map = getTokenMap(sid)]
[h: link = macroLinkText("fetchToken@Lib:Scripts", "none", 1)]
[h, if (getMapVisible(map) == 1): broadcast(execlink(link, 1, player), player)]

<!-- Force player Toolbar to refresh -->
[h: link = macroLinkText("ToolBar@Lib:Frames", "none")]
[h: broadcast(execlink(link, 1, player))]
