export const VISIBLE = ['SI', 'NO'] as const;

export type VisibleType = (typeof VISIBLE)[number];
