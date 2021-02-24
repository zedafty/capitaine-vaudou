<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                          Publishes an handout                           -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- Check GM -->
[h: assert(isGM(), getError("gm_only"), 0)]

<!-- Check selection -->
[h: sel = getSelected()]
[h: err = if (listCount(sel) > 1, "more_than_one_token_selected", "not_selected")]
[h: assert(listCount(sel) == 1, getError(err), 0)]

<!-- Check token type -->
[h: isImg = startsWith(lower(getName(sel)), 'image:')]
[h: assert(isImg == 1, getError("not_image_token"), 0)]

<!-- Prepare output -->
[h, token(sel), code:{
	[handout = "
		<html>
			<table>
				<tr><td height='100'><img width=90 height=90 src='" + getTokenHandout() + "' /></td></tr>
				<tr><td align='center'>Handout</td></tr>
			</table>
		</html>
	"]
}]

<!-- Get Players -->
[h: userList = getAllPlayerNames()]
[h: switchToken(sel)]

[h: inputStr = "[]"]
[h: inputStr = json.append(inputStr,"picSize|500|<html><b>Taille de l&rsquo;image</b>&nbsp;(px)</html>")]
[h: inputStr = json.append(inputStr,"junk|<html><b>Joueurs</b></html>|-|LABEL|SPAN=TRUE")]
[h, foreach(player, userList): inputStr = json.append(inputStr, "player" + roll.count + "|1|" + player + "|CHECK")]
[h: inputStr = json.evaluate(inputStr)]
[h: abort(input(json.toList(inputStr, "##")))]

[h: playerList = ""]
[h, foreach(player, userList), code: {
	[if (eval("player" + roll.count)): playerList = listAppend(playerList, player)]
}]

[h: handoutID = getTokenHandout(picSize)]

[h: execAllPlayers("popupHandout@Lib:Dialogs",json.append("", handoutID, picSize), playerList)]
