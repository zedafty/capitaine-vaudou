<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                           Pops-up an handout                            -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[id = arg(0)]
[w = arg(1) + 40]
[h = w]

[dialog("Token Handout", "width=" + w + "; height=" + h + "; temporary=1; input=0; noframe=1"): {
	<table align='center' valign='center'>
		<tr>
			<td>
				<img src='[r:id]'></img>
			</td>
		</tr>
	</table>
}]
