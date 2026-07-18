/**
 * The eleven distinct nets of a cube.
 * Each net defines face layout on a 2-D grid and hinge relationships for folding.
 */
export const CUBE_NETS = {
  cross: {
    name: 'Cross',
    faces: [
      { id: 'bottom', label: 'Bottom', color: 0x4a90d9, gridX: 1, gridY: 1 },
      { id: 'top', label: 'Top', color: 0x1abc9c, gridX: 1, gridY: 0 },
      { id: 'left', label: 'Left', color: 0x2ecc71, gridX: 0, gridY: 1 },
      { id: 'right', label: 'Right', color: 0xf39c12, gridX: 2, gridY: 1 },
      { id: 'back', label: 'Back', color: 0x9b59b6, gridX: 3, gridY: 1 },
      { id: 'front', label: 'Front', color: 0xe74c3c, gridX: 1, gridY: 2 },
    ],
    hinges: [
      { parent: 'bottom', child: 'top', axis: 'x', sign: -1 },
      { parent: 'bottom', child: 'left', axis: 'y', sign: -1 },
      { parent: 'bottom', child: 'right', axis: 'y', sign: 1 },
      { parent: 'right', child: 'back', axis: 'y', sign: 1 },
      { parent: 'bottom', child: 'front', axis: 'x', sign: 1 },
    ],
    root: 'bottom',
  },

  tShape: {
    name: 'T-Shape',
    faces: [
      { id: 'bottom', label: 'Bottom', color: 0x4a90d9, gridX: 1, gridY: 1 },
      { id: 'top', label: 'Top', color: 0x1abc9c, gridX: 1, gridY: 0 },
      { id: 'left', label: 'Left', color: 0x2ecc71, gridX: 0, gridY: 1 },
      { id: 'right', label: 'Right', color: 0xf39c12, gridX: 2, gridY: 1 },
      { id: 'back', label: 'Back', color: 0x9b59b6, gridX: 2, gridY: 0 },
      { id: 'front', label: 'Front', color: 0xe74c3c, gridX: 1, gridY: 2 },
    ],
    hinges: [
      { parent: 'bottom', child: 'top', axis: 'x', sign: -1 },
      { parent: 'bottom', child: 'left', axis: 'y', sign: -1 },
      { parent: 'bottom', child: 'right', axis: 'y', sign: 1 },
      { parent: 'right', child: 'back', axis: 'x', sign: -1 },
      { parent: 'bottom', child: 'front', axis: 'x', sign: 1 },
    ],
    root: 'bottom',
  },

  zigzag: {
    name: 'Zigzag',
    faces: [
      { id: 'bottom', label: 'Bottom', color: 0x4a90d9, gridX: 1, gridY: 1 },
      { id: 'top', label: 'Top', color: 0x1abc9c, gridX: 0, gridY: 0 },
      { id: 'left', label: 'Left', color: 0x2ecc71, gridX: 0, gridY: 1 },
      { id: 'right', label: 'Right', color: 0xf39c12, gridX: 2, gridY: 1 },
      { id: 'back', label: 'Back', color: 0x9b59b6, gridX: 3, gridY: 1 },
      { id: 'front', label: 'Front', color: 0xe74c3c, gridX: 1, gridY: 2 },
    ],
    hinges: [
      { parent: 'left', child: 'top', axis: 'x', sign: -1 },
      { parent: 'bottom', child: 'left', axis: 'y', sign: -1 },
      { parent: 'bottom', child: 'right', axis: 'y', sign: 1 },
      { parent: 'right', child: 'back', axis: 'y', sign: 1 },
      { parent: 'bottom', child: 'front', axis: 'x', sign: 1 },
    ],
    root: 'bottom',
  },

  staircase: {
    name: 'Staircase',
    faces: [
      { id: 'bottom', label: 'Bottom', color: 0x4a90d9, gridX: 1, gridY: 1 },
      { id: 'top', label: 'Top', color: 0x1abc9c, gridX: 2, gridY: 0 },
      { id: 'left', label: 'Left', color: 0x2ecc71, gridX: 0, gridY: 1 },
      { id: 'right', label: 'Right', color: 0xf39c12, gridX: 2, gridY: 1 },
      { id: 'back', label: 'Back', color: 0x9b59b6, gridX: 3, gridY: 1 },
      { id: 'front', label: 'Front', color: 0xe74c3c, gridX: 1, gridY: 2 },
    ],
    hinges: [
      { parent: 'right', child: 'top', axis: 'x', sign: -1 },
      { parent: 'bottom', child: 'left', axis: 'y', sign: -1 },
      { parent: 'bottom', child: 'right', axis: 'y', sign: 1 },
      { parent: 'right', child: 'back', axis: 'y', sign: 1 },
      { parent: 'bottom', child: 'front', axis: 'x', sign: 1 },
    ],
    root: 'bottom',
  },

  column: {
    name: 'Column',
    faces: [
      { id: 'bottom', label: 'Bottom', color: 0x4a90d9, gridX: 0, gridY: 2 },
      { id: 'top', label: 'Top', color: 0x1abc9c, gridX: 0, gridY: 0 },
      { id: 'left', label: 'Left', color: 0x2ecc71, gridX: 1, gridY: 2 },
      { id: 'right', label: 'Right', color: 0xf39c12, gridX: 1, gridY: 1 },
      { id: 'back', label: 'Back', color: 0x9b59b6, gridX: 1, gridY: 0 },
      { id: 'front', label: 'Front', color: 0xe74c3c, gridX: 0, gridY: 1 },
    ],
    hinges: [
      { parent: 'back', child: 'top', axis: 'x', sign: -1 },
      { parent: 'right', child: 'back', axis: 'x', sign: -1 },
      { parent: 'bottom', child: 'right', axis: 'x', sign: -1 },
      { parent: 'bottom', child: 'left', axis: 'y', sign: 1 },
      { parent: 'bottom', child: 'front', axis: 'x', sign: -1 },
    ],
    root: 'bottom',
  },

  lShape: {
    name: 'L-Shape',
    faces: [
      { id: 'bottom', label: 'Bottom', color: 0x4a90d9, gridX: 1, gridY: 1 },
      { id: 'top', label: 'Top', color: 0x1abc9c, gridX: 1, gridY: 0 },
      { id: 'left', label: 'Left', color: 0x2ecc71, gridX: 0, gridY: 1 },
      { id: 'right', label: 'Right', color: 0xf39c12, gridX: 2, gridY: 1 },
      { id: 'back', label: 'Back', color: 0x9b59b6, gridX: 0, gridY: 0 },
      { id: 'front', label: 'Front', color: 0xe74c3c, gridX: 1, gridY: 2 },
    ],
    hinges: [
      { parent: 'bottom', child: 'top', axis: 'x', sign: -1 },
      { parent: 'left', child: 'back', axis: 'x', sign: -1 },
      { parent: 'bottom', child: 'left', axis: 'y', sign: -1 },
      { parent: 'bottom', child: 'right', axis: 'y', sign: 1 },
      { parent: 'bottom', child: 'front', axis: 'x', sign: 1 },
    ],
    root: 'bottom',
  },

  snake: {
    name: 'Snake',
    faces: [
      { id: 'bottom', label: 'Bottom', color: 0x4a90d9, gridX: 0, gridY: 1 },
      { id: 'top', label: 'Top', color: 0x1abc9c, gridX: 0, gridY: 0 },
      { id: 'left', label: 'Left', color: 0x2ecc71, gridX: 1, gridY: 1 },
      { id: 'right', label: 'Right', color: 0xf39c12, gridX: 2, gridY: 1 },
      { id: 'back', label: 'Back', color: 0x9b59b6, gridX: 3, gridY: 1 },
      { id: 'front', label: 'Front', color: 0xe74c3c, gridX: 3, gridY: 2 },
    ],
    hinges: [
      { parent: 'bottom', child: 'top', axis: 'x', sign: -1 },
      { parent: 'bottom', child: 'left', axis: 'y', sign: 1 },
      { parent: 'left', child: 'right', axis: 'y', sign: 1 },
      { parent: 'right', child: 'back', axis: 'y', sign: 1 },
      { parent: 'back', child: 'front', axis: 'x', sign: 1 },
    ],
    root: 'bottom',
  },

  hook: {
    name: 'Hook',
    faces: [
      { id: 'bottom', label: 'Bottom', color: 0x4a90d9, gridX: 1, gridY: 1 },
      { id: 'top', label: 'Top', color: 0x1abc9c, gridX: 1, gridY: 0 },
      { id: 'left', label: 'Left', color: 0x2ecc71, gridX: 0, gridY: 1 },
      { id: 'right', label: 'Right', color: 0xf39c12, gridX: 2, gridY: 1 },
      { id: 'back', label: 'Back', color: 0x9b59b6, gridX: 2, gridY: 2 },
      { id: 'front', label: 'Front', color: 0xe74c3c, gridX: 1, gridY: 2 },
    ],
    hinges: [
      { parent: 'bottom', child: 'top', axis: 'x', sign: -1 },
      { parent: 'bottom', child: 'left', axis: 'y', sign: -1 },
      { parent: 'bottom', child: 'right', axis: 'y', sign: 1 },
      { parent: 'right', child: 'back', axis: 'x', sign: 1 },
      { parent: 'bottom', child: 'front', axis: 'x', sign: 1 },
    ],
    root: 'bottom',
  },

  parallel: {
    name: 'Parallel',
    faces: [
      { id: 'bottom', label: 'Bottom', color: 0x4a90d9, gridX: 1, gridY: 1 },
      { id: 'top', label: 'Top', color: 0x1abc9c, gridX: 1, gridY: 0 },
      { id: 'left', label: 'Left', color: 0x2ecc71, gridX: 0, gridY: 1 },
      { id: 'right', label: 'Right', color: 0xf39c12, gridX: 2, gridY: 1 },
      { id: 'back', label: 'Back', color: 0x9b59b6, gridX: 0, gridY: 0 },
      { id: 'front', label: 'Front', color: 0xe74c3c, gridX: 2, gridY: 0 },
    ],
    hinges: [
      { parent: 'bottom', child: 'top', axis: 'x', sign: -1 },
      { parent: 'left', child: 'back', axis: 'x', sign: -1 },
      { parent: 'bottom', child: 'left', axis: 'y', sign: -1 },
      { parent: 'right', child: 'front', axis: 'x', sign: -1 },
      { parent: 'bottom', child: 'right', axis: 'y', sign: 1 },
    ],
    root: 'bottom',
  },

  offset: {
    name: 'Offset',
    faces: [
      { id: 'bottom', label: 'Bottom', color: 0x4a90d9, gridX: 1, gridY: 1 },
      { id: 'top', label: 'Top', color: 0x1abc9c, gridX: 2, gridY: 0 },
      { id: 'left', label: 'Left', color: 0x2ecc71, gridX: 0, gridY: 1 },
      { id: 'right', label: 'Right', color: 0xf39c12, gridX: 2, gridY: 1 },
      { id: 'back', label: 'Back', color: 0x9b59b6, gridX: 3, gridY: 1 },
      { id: 'front', label: 'Front', color: 0xe74c3c, gridX: 1, gridY: 2 },
    ],
    hinges: [
      { parent: 'right', child: 'top', axis: 'x', sign: -1 },
      { parent: 'bottom', child: 'left', axis: 'y', sign: -1 },
      { parent: 'bottom', child: 'right', axis: 'y', sign: 1 },
      { parent: 'right', child: 'back', axis: 'y', sign: 1 },
      { parent: 'bottom', child: 'front', axis: 'x', sign: 1 },
    ],
    root: 'bottom',
  },

  split: {
    name: 'Split',
    faces: [
      { id: 'bottom', label: 'Bottom', color: 0x4a90d9, gridX: 1, gridY: 1 },
      { id: 'top', label: 'Top', color: 0x1abc9c, gridX: 1, gridY: 0 },
      { id: 'left', label: 'Left', color: 0x2ecc71, gridX: 0, gridY: 2 },
      { id: 'right', label: 'Right', color: 0xf39c12, gridX: 2, gridY: 1 },
      { id: 'back', label: 'Back', color: 0x9b59b6, gridX: 3, gridY: 1 },
      { id: 'front', label: 'Front', color: 0xe74c3c, gridX: 1, gridY: 2 },
    ],
    hinges: [
      { parent: 'bottom', child: 'top', axis: 'x', sign: -1 },
      { parent: 'front', child: 'left', axis: 'y', sign: -1 },
      { parent: 'bottom', child: 'right', axis: 'y', sign: 1 },
      { parent: 'right', child: 'back', axis: 'y', sign: 1 },
      { parent: 'bottom', child: 'front', axis: 'x', sign: 1 },
    ],
    root: 'bottom',
  },
};

export const NET_KEYS = Object.keys(CUBE_NETS);
