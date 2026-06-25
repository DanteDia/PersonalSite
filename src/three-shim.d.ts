// three ships its runtime here but its type resolution doesn't satisfy the
// bundler's module check; we use it loosely inside client-only viewers.
declare module "three";
declare module "three/addons/*";
