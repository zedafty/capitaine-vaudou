<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                Returns current player assigned token id                 -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[id = ""]
[lib = "Lib:Players"]
[name = encode(getPlayerName())]
[list = getLibPropertyNames(lib)]
[id = if (listFind(list, name) >= 0, getLibProperty(name, lib), "")] <!-- Player ID defined -->
[id = if (getTokenMap(id) != "", id, "")] <!-- Token ID exists anywhere on a map -->
[return(0, id)]
