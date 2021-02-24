<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--               Returns an integer as a signed HTML String                -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!-- Get value -->
[val = arg(0)]

<!-- Ensure number provided before continue -->
[if (!isNumber(val)): return(0, val)]

<!-- Cast integer to string -->
[str = if (val >= 0, "&#43;" + round(val), string(round(val)))]

<!-- Return result -->
[return(0, str)]
