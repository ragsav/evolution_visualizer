export function handleResourcesEffect(
  creatures,
  resources,
  resourceType,
  mouse,
  setResourcePosition
) {
  if (
    resourceType.localeCompare("none") !== 0 &&
    resources.length < 5 &&
    calamityType.localeCompare("none") === 0
  ) {
    setResourcePosition({
      x: mouse.x,
      y: mouse.y,
    });
  }
}
