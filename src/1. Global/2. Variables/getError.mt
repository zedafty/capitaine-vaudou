<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                        Returns Error HTML String                        -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[val = ""]
[st1 = "style='color: #222222'"]
[st2 = "style='color: #bb2222'"]
[switch(arg(0)), code:
	case "no_player_token_id"               : {[val = "<b " + st1 + ">Aucun <u " + st2 + ">Pion de joueur</u> d&eacute;fini &nbsp;!</b>"]};
	case "no_player_token_map"              : {[val = "<b " + st1 + ">Le <u " + st2 + ">Pion de joueur</u> n&rsquo;existe pas&nbsp;!</b>"]};
	case "player_token_map_not_visible"     : {[val = "<b " + st1 + ">La <u " + st2 + ">Carte</u> du pion de joueur n&rsquo;est pas visible&nbsp;!</b>"]};
	case "not_impersonated"                 : {[val = "<b " + st1 + ">Pas de pion <u " + st2 + ">Personnifi&eacute;</u> sur cette carte&nbsp;!</b>"]};
	case "more_than_one_token_impersonated" : {[val = "<b " + st1 + ">Plus d&rsquo;un seul pion <u " + st2 + ">Personnifi&eacute;</u>&nbsp;!</b>"]};
	case "not_selected"                     : {[val = "<b " + st1 + ">Pas de pion <u " + st2 + ">S&eacute;lectionn&eacute;</u>&nbsp;!</b>"]};
	case "more_than_one_token_selected"     : {[val = "<b " + st1 + ">Plus d&rsquo;un seul pion <u " + st2 + ">S&eacute;lectionn&eacute;</u>&nbsp;!</b>"]};
	case "library_token"                    : {[val = "<b " + st1 + ">Pion de <u " + st2 + ">Librairie</u> (ou similaire)&nbsp;!</b>"]};
	case "not_pc_token"                     : {[val = "<b " + st1 + ">Le pion s&eacute;lectionn&eacute; n&rsquo;est pas un pion de <u " + st2 + ">Personnage</u>&nbsp;!</b>"]};
	case "not_image_token"                  : {[val = "<b " + st1 + ">Le pion s&eacute;lectionn&eacute; n&rsquo;est pas un pion d&rsquo;<u " + st2 + ">Image</u>&nbsp;!</b>"]};
	case "not_character_token"              : {[val = "<b " + st1 + ">Le pion s&eacute;lectionn&eacute; n&rsquo;est pas un pion de <u " + st2 + ">Personnage</u>&nbsp;!</b>"]};
	case "not_token_layer"                  : {[val = "<b " + st1 + ">Pion en-dehors de la <u " + st2 + ">Couche des pions ou du MJ</u>&nbsp;!</b>"]};
	case "not_token_owner"                  : {[val = "<b " + st1 + ">Vous n&rsquo;&ecirc;tes pas le <u " + st2 + ">Propri&eacute;taire</u> de ce pion&nbsp;!</b>"]};
	case "char_only"                        : {[val = "<b " + st1 + ">Seulement pour un pion de <u " + st2 + ">Personnage</u>&nbsp;!</b>"]};
	case "gm_only"                          : {[val = "<b " + st1 + ">Seulement pour le <u " + st2 + ">MJ</u>&nbsp;!</b>"]};
	default                                 : {[val = "<b " + st1 + ">Le script a g&eacute;n&eacute;r&eacute; une <u " + st2 + ">ERREUR</u>&nbsp;!</b>"]}
]
[return(0, val)]
