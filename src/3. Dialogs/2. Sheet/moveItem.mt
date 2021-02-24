<!----------------------------------------------------------------------------->
<!--                                                                         -->
<!--                     Moves an item from an inventory                     -->
<!--                                                                         -->
<!----------------------------------------------------------------------------->

[h: varsFromStrProp(arg(0))]

[h: temp = Inventory]
[h: item = json.get(temp, index)]

[h: arr1 = json.append("", "")]
[h, if (before > 0): arr1 = json.get(temp, 0, before - 1)]

[h, if (index > before): temp = json.remove(temp, index)]
[h, if (index < before): arr1 = json.remove(arr1, index)]

[h: arr2 = json.get(temp, max(before - 1, 0), json.length(temp) - 1))]

[h, if (before > 0): arr2 = json.set(arr2, 0, item)]
[h: Inventory = json.merge(arr1, arr2)]
[h, if (before == 0): Inventory = json.set(Inventory, 0, item)]
