// Vite
export const Config = {
  get: function (name: string) {
    return import.meta.env[name];
  },
};
