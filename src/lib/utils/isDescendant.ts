export function isDescendant(
  parent: HTMLElement | null | undefined,
  child: HTMLElement,
) {
  var node = child.parentNode;
  while (node != null) {
    console.log(node, parent, child);
    if (node == parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
