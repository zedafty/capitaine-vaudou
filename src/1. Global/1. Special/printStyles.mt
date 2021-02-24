<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--            Outputs CSS styles (put in cache during session)             -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[r: "
	<html>
		<head>
			<style>

				div {margin-bottom: 0;}

				.icon {width: 16px; height: 16px; font-size: 0; background-repeat: no-repeat; background-image: url('" + tableImage('ui', 0) + "');}
				.pc .bg .icon {background-color: #771111;}
				.npc .bg .icon {background-color: #114444;}

				.head, .issue {font-size: 10px;}

				.head {margin-top: 4px; padding: 4px 6px; color: #222222; background-color: #f0f0f0;}
				.pc .head {color: #ffffff; background-color: #665544;}
				.npc .head {color: #ffffff; background-color: #333333;}


				.issue {margin-top: 4px; margin-left: 4px;}

				.result {margin-top: 4px; margin-left: 0;}
				.result tr td, .result tr th {text-align: center;}
				.result .th td {color: #ffffff; font-size: 8px;}
				.result .td td {font-size: 14px; font-weight: bold;}
				.result .border {border-left: 1px solid #cccccc;}
				.result .margin {text-align: right;}
				.result .margin .icon {height: 20px; margin-top: 4px;}
				.pc .result .th td {background-color: #771111;}
				.npc .result .th td {background-color: #114444;}

				.params {margin-top: 4px; margin-left: 4px;}
				.params .text {font-size: 8px; color: #222266; margin-top: 2px; margin-left: 2px; margin-right: 2px;}

				.links {margin-top: 4px; margin-left: 8px; margin-bottom: 4px;}

				.details {padding: 2px; background-color: #f0f0e0;}

				.threshold {margin-top: 2px;}

				.bonuses {margin-top: 4px; margin-left: 0; margin-bottom: 4px; list-style-type: none;}
				.bonuses li {margin-left: 2px; padding-left: 2px; font-size: 9px; background-color: #f0f0f0;}

				.options {margin-bottom: 4px; padding: 2px; background-color: #e3eee3;}

			</style>
		</head>
	</html>
"]
