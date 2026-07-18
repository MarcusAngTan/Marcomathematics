import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CUBE_NETS, NET_KEYS } from './nets.js';

const FACE_SIZE = 1;
const FOLD_DURATION = 1200;

class CubeNetVisualizer {
  constructor(container) {
    this.container = container;
    this.currentNetKey = NET_KEYS[0];
    this.foldAmount = 0;
    this.targetFold = 0;
    this.foldStartTime = null;
    this.foldStartAmount = 0;
    this.hingeGroups = new Map();
    this.faceMeshes = new Map();

    this.initScene();
    this.buildNet(this.currentNetKey);
    this.bindUI();
    this.animate();
    this.handleResize();
    window.addEventListener('resize', () => this.handleResize());
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0f1117);

    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    this.camera.position.set(3, 2.5, 4);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.minDistance = 2;
    this.controls.maxDistance = 12;

    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    this.scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.9);
    keyLight.position.set(4, 6, 5);
    keyLight.castShadow = true;
    this.scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8899ff, 0.35);
    fillLight.position.set(-3, 2, -2);
    this.scene.add(fillLight);

    this.netGroup = new THREE.Group();
    this.scene.add(this.netGroup);

    const grid = new THREE.GridHelper(8, 16, 0x2a2f3a, 0x1a1e28);
    grid.position.y = -0.51;
    this.scene.add(grid);
  }

  clearNet() {
    while (this.netGroup.children.length) {
      this.netGroup.remove(this.netGroup.children[0]);
    }
    this.hingeGroups.clear();
    this.faceMeshes.clear();
    this.foldAmount = 0;
    this.targetFold = 0;
    this.foldStartTime = null;
  }

  createFaceMesh(face) {
    const geometry = new THREE.PlaneGeometry(FACE_SIZE, FACE_SIZE);
    const material = new THREE.MeshStandardMaterial({
      color: face.color,
      side: THREE.DoubleSide,
      roughness: 0.65,
      metalness: 0.05,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 })
    );
    mesh.add(line);

    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = `#${face.color.toString(16).padStart(6, '0')}`;
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = 'bold 36px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(face.label, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    material.map = texture;

    return mesh;
  }

  getFacePosition(face, originX, originY) {
    return new THREE.Vector3(
      (face.gridX - originX) * FACE_SIZE,
      0,
      (face.gridY - originY) * FACE_SIZE
    );
  }

  buildNet(netKey) {
    this.clearNet();
    const net = CUBE_NETS[netKey];
    const rootFace = net.faces.find((f) => f.id === net.root);
    const originX = rootFace.gridX;
    const originY = rootFace.gridY;

    const groups = new Map();

    for (const face of net.faces) {
      const mesh = this.createFaceMesh(face);
      const group = new THREE.Group();
      group.add(mesh);

      const pos = this.getFacePosition(face, originX, originY);
      mesh.position.set(pos.x, 0, pos.z);
      mesh.rotation.x = -Math.PI / 2;

      groups.set(face.id, group);
      this.faceMeshes.set(face.id, mesh);
    }

    const rootGroup = groups.get(net.root);
    this.netGroup.add(rootGroup);
    this.hingeGroups.set(net.root, { group: rootGroup, hinge: null });

    const placed = new Set([net.root]);
    const pending = [...net.hinges];

    while (pending.length > 0) {
      let progressed = false;
      for (let i = pending.length - 1; i >= 0; i--) {
        const hinge = pending[i];
        if (!placed.has(hinge.parent)) continue;

        const parentGroup = groups.get(hinge.parent);
        const childGroup = groups.get(hinge.child);
        const parentFace = net.faces.find((f) => f.id === hinge.parent);
        const childFace = net.faces.find((f) => f.id === hinge.child);

        const parentPos = this.getFacePosition(parentFace, originX, originY);
        const childPos = this.getFacePosition(childFace, originX, originY);

        const hingePivot = new THREE.Group();
        const edgeOffset = new THREE.Vector3(
          (childPos.x - parentPos.x) * 0.5,
          0,
          (childPos.z - parentPos.z) * 0.5
        );
        hingePivot.position.copy(parentPos).add(edgeOffset);

        const childLocal = childPos.clone().sub(hingePivot.position);
        childGroup.position.copy(childLocal);

        parentGroup.add(hingePivot);
        hingePivot.add(childGroup);

        this.hingeGroups.set(hinge.child, {
          group: childGroup,
          hinge: hinge,
          pivot: hingePivot,
        });

        placed.add(hinge.child);
        pending.splice(i, 1);
        progressed = true;
      }
      if (!progressed) break;
    }

    this.centerNet();
  }

  centerNet() {
    const box = new THREE.Box3().setFromObject(this.netGroup);
    const center = box.getCenter(new THREE.Vector3());
    this.netGroup.position.sub(center);
    this.netGroup.position.y = 0.5;
  }

  applyFold(amount) {
    const net = CUBE_NETS[this.currentNetKey];
    const angle = amount * (Math.PI / 2);

    for (const face of net.faces) {
      if (face.id === net.root) continue;
      const entry = this.hingeGroups.get(face.id);
      if (!entry?.hinge) continue;

      const { hinge, pivot } = entry;
      const rotation = angle * hinge.sign;

      if (hinge.axis === 'x') {
        pivot.rotation.x = rotation;
      } else {
        pivot.rotation.z = rotation;
      }
    }
  }

  setFoldTarget(target) {
    this.foldStartAmount = this.foldAmount;
    this.targetFold = target;
    this.foldStartTime = performance.now();
  }

  updateFold() {
    if (this.foldStartTime === null) return;

    const elapsed = performance.now() - this.foldStartTime;
    const t = Math.min(elapsed / FOLD_DURATION, 1);
    const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    this.foldAmount = this.foldStartAmount + (this.targetFold - this.foldStartAmount) * eased;
    this.applyFold(this.foldAmount);

    if (t >= 1) {
      this.foldAmount = this.targetFold;
      this.foldStartTime = null;
    }
  }

  bindUI() {
    const netSelect = document.getElementById('net-select');
    const foldBtn = document.getElementById('fold-btn');
    const unfoldBtn = document.getElementById('unfold-btn');
    const slider = document.getElementById('fold-slider');
    const foldLabel = document.getElementById('fold-label');

    NET_KEYS.forEach((key) => {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = CUBE_NETS[key].name;
      netSelect.appendChild(option);
    });

    netSelect.addEventListener('change', () => {
      this.currentNetKey = netSelect.value;
      this.buildNet(this.currentNetKey);
      slider.value = 0;
      foldLabel.textContent = '0%';
    });

    foldBtn.addEventListener('click', () => {
      this.setFoldTarget(1);
      slider.value = 100;
      foldLabel.textContent = '100%';
    });

    unfoldBtn.addEventListener('click', () => {
      this.setFoldTarget(0);
      slider.value = 0;
      foldLabel.textContent = '0%';
    });

    slider.addEventListener('input', () => {
      const value = Number(slider.value) / 100;
      this.foldAmount = value;
      this.targetFold = value;
      this.foldStartTime = null;
      this.applyFold(value);
      foldLabel.textContent = `${slider.value}%`;
    });
  }

  handleResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.updateFold();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

const container = document.getElementById('canvas-container');
new CubeNetVisualizer(container);
