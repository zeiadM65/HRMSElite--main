import argon2 from 'argon2';
export const hash = (p:string)=> argon2.hash(p, { type: argon2.argon2id, timeCost: 3, memoryCost: 19456, parallelism: 1 });
export const verify = (h:string,p:string)=> argon2.verify(h,p);
