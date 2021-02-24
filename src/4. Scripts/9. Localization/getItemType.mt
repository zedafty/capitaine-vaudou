<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--            Returns localized item type string, list or word             -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[str = ""]
[val = arg(0)]
[key = "equipment"]
[if (hasImpersonated() == 1 || getAssigned() != ""): key = if (getType() == "Ship", "shipment", key)]
[str = if (val == "word", getConst(key + "_word"), getListString(key + "_list", arg(0)))]
[return(0, str)]
