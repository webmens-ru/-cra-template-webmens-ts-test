export function randomString(length: number = 4) {
  let result = '';
  let counter = 0;

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  
  return result;
}

export function randomizeString(text: string, length?: number) {
  return `${text}-${randomString(length)}`
}
