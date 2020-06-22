import {OrbitControls} from '../../../libs/OrbitControls/OrbitControls';
import {Box3, OrthographicCamera, WebGLRenderer} from 'three';

export function setViewToBoundaries(
  controls: OrbitControls,
  camera: OrthographicCamera,
  gl: WebGLRenderer,
  boundaries: Box3,
  setZoomAndPanBoundaries: boolean = false
) {
  if (!boundaries) return;

  const container = gl.domElement;
  const zoomToBoundaries =
    Math.min(
      container.offsetWidth / (boundaries.max.x - boundaries.min.x),
      container.offsetHeight / (boundaries.max.y - boundaries.min.y)
    ) * 0.8;

  camera.zoom = zoomToBoundaries;
  camera.position.z = boundaries.max.z + Math.abs(camera.bottom);
  console.log(camera.position.z)

  if (setZoomAndPanBoundaries) {
    controls.panBoundaries = boundaries;
    controls.minZoom = zoomToBoundaries * 0.8;
    controls.maxZoom = zoomToBoundaries * 6;
    controls.maxAzimuthAngle = Math.PI/6;
    controls.minAzimuthAngle = -Math.PI/6;
    controls.dampingFactor = 0.15;
    controls.update();
  }

  camera.updateProjectionMatrix();
  controls.update();
  controls.saveState();
}
