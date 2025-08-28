const reqEnv = (name:string, min=32) => {
  const v = process.env[name];
  if (!v || v.length < min) throw new Error(`Missing/weak env: ${name}`);
  return v;
};
export const SESSION_SECRET = reqEnv('SESSION_SECRET', 32);
