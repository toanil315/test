export const prefixPath = '';
export const prefixPathAdmin = '/admin';

export const ROUTES = {
  // public routes
  ERROR: `${prefixPath}/404`,

  // admin routes
  ADMIN: `${prefixPathAdmin}/some-admin-page`,

  // user routes
  HOME: `${prefixPath}`,

  NODE_BASE_EDITOR: `${prefixPath}/node-base-editor`,

  SURVEYS: `${prefixPath}/surveys`,

  get CREATE_SURVEY() {
    return `${this.SURVEYS}/create`;
  },
};
