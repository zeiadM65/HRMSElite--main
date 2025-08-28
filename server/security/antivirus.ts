import NodeClam from 'clamscan';

const cl = await new NodeClam().init({
  clamdscan: { socket: process.env.CLAMAV_SOCKET || false },
  debug_mode: false,
});

export async function assertClean(buf: Buffer) {
  const { isInfected, viruses } = await cl.isInfected(buf);
  if (isInfected) throw new Error(`infected: ${viruses?.join(',')}`);
}
