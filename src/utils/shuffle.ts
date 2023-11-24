const shuffle = (str: string): string => {
  const stringArray = str.split('')
  for (let i = stringArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [stringArray[i], stringArray[j]] = [stringArray[j], stringArray[i]];
  }
  return stringArray.join('');
}

export default shuffle
