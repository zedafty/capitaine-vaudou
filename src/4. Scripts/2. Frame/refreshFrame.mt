<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                            Refreshes a frame                            -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

<!--
	ARGUMENTS SYNTAX
	"Foo1"               => Refresh frame 'Foo1' with macro 'Foo1'
	"name=Foo1"          => Refresh frame 'Foo1' with macro 'Foo1' (same as above)
	"name=Foo1;src=bar3" => Refresh frame 'Foo1' with macro 'bar3'
-->

<!-- Retrieve arguments -->
[h: args = arg(0)]
[h: src = 0]
[h, if (countStrProp(args) == 0), code: {
	[h: name = args]
};{
	[h: varsFromStrProp(args)]
}]

<!-- Switch to proper sheet -->
[h: name = if (endsWith(name, "Sheet") == 1, getType() + "Sheet", name)]

<!-- Set source frame to current frame if undefined -->
[if (src == 0): src = name]

<!-- Refresh frame ONLY if opened AND pass argument "refresh" -->
[h, if (isFrameVisible(name)), code: {
	[h, macro(src + "@Lib:Frames"): "refresh"]
}]
