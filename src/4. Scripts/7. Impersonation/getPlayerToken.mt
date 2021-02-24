<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--           Returns assigned token id or impersonated token id            -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[rid = ""] <!-- Returned token ID -->
[gid = getImpersonated(1)] <!-- Global token ID -->
[pid = getAssigned()] <!-- Player token ID -->
[rid = if (pid != "", pid, rid)]
[rid = if (gid != "", gid, rid)]
[return(0, rid)] <!-- Impersonated ID prevails over assigned ID -->
