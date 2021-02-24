<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                        Edits a character ability                        -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[index = getStrProp(arg(0), "index")]
[value = getStrProp(arg(0), "value")]
[Abilities = json.set(Abilities, index, value)]
