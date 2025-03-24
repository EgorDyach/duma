export function isDescendant(
  parent: HTMLElement | null | undefined,
  child: HTMLElement,
) {
  var node = child.parentNode;
  while (node != null) {
    if (node == parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
