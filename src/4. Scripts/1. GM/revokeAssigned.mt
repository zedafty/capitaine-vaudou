<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--              Revokes token assignation from a given player              -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- Check GM -->
[h: assert(isGM(), getError("gm_only"), 0)]

<!-- Display modal -->
[h: abort(input(
	"junkVar|0|<html><b style='color:#006699'>R&eacute;voquer l&rsquo;assignation de</b></html>|LABEL|TEXT=FALSE",
	"player|" + getAllPlayerNames() + "|<html>&mdash;&nbsp;Joueur</html>|LIST|SELECT=0 VALUE=STRING",
	"all|0|<html>&mdash;&nbsp;Tous les joueurs</html>|CHECK"
))]

[h: lib = "Lib:Players"]

[h, if (all == 1), code: {
	[h: list = getLibPropertyNames(lib)]
	[h, foreach(name, list): setLibProperty(name, "", lib)]
};{
	[h: setLibProperty(encode(player), "", lib)]
}]

<!-- Force player toolbar to refresh -->
[h: target = if (all == 1, "all", player)]
[h: link = macroLinkText("ToolBar@Lib:Frames", "none")]
[h: broadcast(execlink(link, 1, player))]

<!-- Feedback to GM -->
[r: "Token assignation revoked for <b>" + if (all == 1, "ALL PLAYERS", player) + "</b>&nbsp;!"]
