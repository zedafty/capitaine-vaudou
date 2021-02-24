<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                  Updates character pools or ship points                  -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[h: str = getType()]
[r, if (str == "Char"): execMacro("[macro('updatePools@Lib:Dialogs'): '']")]
[r, if (str == "Ship"): execMacro("[macro('updatePoints@Lib:Dialogs'): '']")]
